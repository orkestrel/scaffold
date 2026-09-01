#!/bin/bash
# Re-pin @orkestrel/contract to ^$V in every fleet dependent, regenerate the lockfile,
# typecheck, and commit+push only the rows that pass. Failed rows stay dirty for inspection.
V=${1:?version}
LOG=/home/user/work/contract-repin.log
: > "$LOG"
npm view "@orkestrel/contract@$V" version >/dev/null 2>&1 || { echo "REFUSE: $V not on registry" | tee -a "$LOG"; exit 1; }
REPOS="abort agent brief browser budget console csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware ndjson ollama probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal timeout tool toolbox websocket worker workflow workspace scaffold"
for r in $REPOS; do
  if [ "$r" = scaffold ]; then dir=/home/user/scaffold; else dir=/home/user/fleet/$r; fi
  cd "$dir" || { echo "$r MISSING" >> "$LOG"; continue; }
  if [ -n "$(git status --porcelain)" ]; then echo "$r DIRTY-SKIP" >> "$LOG"; continue; fi
  node -e '
    const fs=require("fs"); const m=JSON.parse(fs.readFileSync("package.json","utf8")); let hit=false;
    for (const k of ["dependencies","devDependencies","peerDependencies","optionalDependencies"]) {
      if (m[k] && m[k]["@orkestrel/contract"]) { m[k]["@orkestrel/contract"]="^"+process.argv[1]; hit=true }
    }
    if (!hit) { console.log("nopin"); process.exit(0) }
    fs.writeFileSync("package.json", JSON.stringify(m,null,"\t")+"\n"); console.log("pinned")
  ' "$V" | grep -q pinned || { echo "$r NOPIN" >> "$LOG"; continue; }
  if ! npm install --no-audit --no-fund >/home/user/work/logs/repin-$r.log 2>&1; then echo "$r INSTALL-FAIL" >> "$LOG"; continue; fi
  if ! npm run check >>/home/user/work/logs/repin-$r.log 2>&1; then echo "$r CHECK-FAIL" >> "$LOG"; continue; fi
  git add package.json package-lock.json
  git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F /home/user/work/msg-contract-repin.txt || { echo "$r COMMIT-FAIL" >> "$LOG"; continue; }
  git push -q origin claude/orkestrel-npm-audit-deps-14ibta >>/home/user/work/logs/repin-$r.log 2>&1 || { echo "$r PUSH-FAIL" >> "$LOG"; continue; }
  echo "$r OK" >> "$LOG"
done
echo "CONTRACT-REPIN-COMPLETE" >> "$LOG"
