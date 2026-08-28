#!/bin/bash
# Re-pin @orkestrel/process across its runtime dependents after the refactored
# release lands on the registry. Usage: process-repin.sh <new-version>
# Direct dependents: lsp, mcp, sea (fleet checkouts) and scaffold (/home/user/scaffold).
# probe follows in a second round AFTER lsp and mcp republish (it pins those, not process).
set -u
V="${1:?usage: process-repin.sh <new-version>}"
if ! npm view "@orkestrel/process@$V" version >/dev/null 2>&1; then
  echo "ABORT: @orkestrel/process@$V is not on the registry yet"; exit 1
fi
for d in /home/user/fleet/lsp /home/user/fleet/mcp /home/user/fleet/sea /home/user/scaffold; do
  n=$(basename "$d")
  node -e '
    const fs=require("fs"); const p=process.argv[1]+"/package.json"
    const m=JSON.parse(fs.readFileSync(p,"utf8"))
    if (!m.dependencies || !m.dependencies["@orkestrel/process"]) { console.log(process.argv[3], "SKIP no runtime dep"); process.exit(0) }
    m.dependencies["@orkestrel/process"]="^"+process.argv[2]
    fs.writeFileSync(p, JSON.stringify(m, null, "\t")+"\n")
    console.log(process.argv[3], "pinned ^"+process.argv[2])
  ' "$d" "$V" "$n"
  (cd "$d" && npm install --no-audit --no-fund >/dev/null 2>&1 && echo "$n lockfile regenerated" || echo "$n INSTALL FAILED")
done
echo "Now run the gates per repo (format:check lint:check check build test), refresh each"
echo "guides/process.md mirror per the orkestrel-publish wave procedure (Retention was removed"
echo "from process, and the current mirrors still document it), then bump and publish lsp, mcp,"
echo "sea in layer order; scaffold bumps on its own account. probe re-pins lsp and mcp after"
echo "their releases and publishes last."
