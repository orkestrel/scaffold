#!/bin/bash
# B-FORMS-RENAME landing: land-unit.sh bfr (base 53628aa, the session tip), the checks, fold 33, and the session-branch push. The chain (verify-bfr.sh, without regeneration because the compile is byte-identical) and the main push follow separately.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; export PATH="$S/npm11/node_modules/.bin:$PATH"; LOG=$S/land-bfr-all.log.txt; : > $LOG
cd /home/user/veneer || exit 1
bash $S/land-unit.sh bfr $S/bfr-landing-message.txt 53628aa >> $LOG 2>&1; echo "=== land-unit exit=$? head=$(git rev-parse --short HEAD)" >> $LOG
if git status --porcelain | grep -qE '^(UU|DU|AA|UD)'; then echo "=== CONFLICT REMAINS" >> $LOG; exit 3; fi
for g in format:check lint:check check; do npm run $g > $S/bfr-$g.log.txt 2>&1; echo "=== $g exit=$?" >> $LOG; done
python3 $S/fold-33.py >> $LOG 2>&1 && npx oxfmt --config .oxfmtrc.json --write ROADMAP.md > /dev/null && git add ROADMAP.md && git commit -q -m "Roadmap fold 33: B-FORMS-RENAME (D40a) landed; its carrier row closes" && echo "=== fold committed $(git rev-parse --short HEAD)" >> $LOG
git push -q -u origin claude/inspiring-allen-t4qzv1 && echo "=== session branch pushed $(git rev-parse --short HEAD)" >> $LOG
cat $LOG
