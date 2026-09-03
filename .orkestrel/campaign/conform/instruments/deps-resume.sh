#!/usr/bin/env bash
# Resume a dependency pass that stopped after its manifest edit and install (the closure stage refused
# because a dependency's tree was dirty). Continues from the stage: re-stage the full closure, run the
# gate chain, commit the staged manifest and lockfile, push. Usage: deps-resume.sh <pkg>
p=$1; d=/home/user/fleet/$p; [ "$p" = scaffold ] && d=/home/user/scaffold
LOG=/home/user/work/logs/deps-pass.log; W=/home/user/scaffold/tmp/work
cd "$d" || { echo "$p NO DIR" >> $LOG; exit 1; }
other=$(git status --short | grep -v '^?? tmp/' | grep -v ' package.json$' | grep -v ' package-lock.json$')
[ -n "$other" ] && { echo "$p RESUME REFUSED: tree carries other changes: $(echo "$other" | tr '\n' ' ')" >> $LOG; exit 1; }
git add package.json package-lock.json
changes=$(git diff --cached -- package.json | grep -E '^[-+]\s+"' | tr -d '\n' | tr -s ' ')
node -e '
const fs=require("fs"); const p="/home/user/scaffold/.orkestrel/campaign/fix/tarballs.json"; const c=process.argv[1];
const a=JSON.parse(fs.readFileSync(p,"utf8")); fs.writeFileSync(p, JSON.stringify(a.filter(x=>x.consumer!==c),null,1)+"\n")' "$p"
$W/stage-closure.sh "$p" > /home/user/work/logs/deps-stage-$p.log 2>&1 || { echo "$p STAGE FAILED (resume): $(grep -E 'RED|REFUSE|FAILED' /home/user/work/logs/deps-stage-$p.log | head -1)" >> $LOG; exit 1; }
if ! bash $W/gates.sh "$d" "deps-$p"; then echo "$p GATES RED (resume): $(grep -E 'FAILED' /home/user/work/logs/gates-deps-$p.log | head -1)" >> $LOG; exit 1; fi
MSG=/home/user/work/logs/deps-msg-$p.txt
{ echo "Align the @orkestrel ranges to the registry and drop the unused browser runner"; echo; echo "The Orchestrator's fleet dependency pass of 2026-09-03: every @orkestrel/* range moves to the caret of the"; echo "version the registry serves, and @vitest/browser-playwright leaves a workspace with no browser environment"; echo "(msg-obj-5 and the fleet pattern the refuter named). The lockfile is regenerated from that manifest, the"; echo "campaign closure is re-staged from the packed tips, and the gate chain (format:check, lint:check, check,"; echo "build, test) exits 0 on the re-staged tree."; echo; echo "Manifest diff lines: $changes"; echo; echo "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"; echo "Claude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB"; } > $MSG
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F $MSG || { echo "$p COMMIT FAILED (resume)" >> $LOG; exit 1; }
pushed=no; for delay in 0 2 4 8 16; do [ $delay -gt 0 ] && sleep $delay; git push -q -u origin claude/orkestrel-npm-audit-deps-14ibta 2>/dev/null && { pushed=yes; break; }; done
echo "$p DONE (resume) $(git rev-parse --short HEAD) pushed=$pushed" >> $LOG
bash $W/records-commit.sh $W/msgs/records-register.txt >> $LOG 2>&1
