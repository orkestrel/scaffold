#!/bin/bash
# CONTROL landing: land-unit.sh bfo (base 2c10329), the shipped-key Set literal, the integration script, oxfmt over the touched files, the checks, the amend, then fold 31, the commit, and the session-branch push. The chain (verify-bfo.sh, with regeneration) and the main push follow separately.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; export PATH="$S/npm11/node_modules/.bin:$PATH"; LOG=$S/land-bfo-all.log.txt; : > $LOG
cd /home/user/veneer || exit 1
bash $S/land-unit.sh bfo $S/bfo-landing-message.txt 2c10329 >> $LOG 2>&1; echo "=== land-unit exit=$? head=$(git rev-parse --short HEAD)" >> $LOG
if git status --porcelain | grep -qE '^(UU|DU|AA|UD)'; then echo "=== CONFLICT REMAINS" >> $LOG; exit 3; fi
python3 $S/sort-inventories.py /home/user/veneer form-control >> $LOG 2>&1; echo "=== sort-inventories exit=$?" >> $LOG
python3 $S/bfo-integration.py >> $LOG 2>&1; echo "=== integration exit=$?" >> $LOG
npx oxfmt --config .oxfmtrc.json --write $(git diff --name-only HEAD~1 -- . ':!tmp' | tr '\n' ' ') ROADMAP.md tests/setupServer.test.ts >> $LOG 2>&1; echo "=== oxfmt exit=$?" >> $LOG
for g in format:check lint:check check; do npm run $g > $S/bfo-$g.log.txt 2>&1; echo "=== $g exit=$?" >> $LOG; done
git add -A -- . ':!tmp' && git commit -q --amend --no-edit && echo "=== amended $(git rev-parse --short HEAD)" >> $LOG
python3 $S/fold-31.py >> $LOG 2>&1 && npx oxfmt --config .oxfmtrc.json --write ROADMAP.md > /dev/null && git add ROADMAP.md && git commit -q -m "Roadmap fold 31: B-FORMS-CONTROL landed; its two carrier rows close" && echo "=== fold committed $(git rev-parse --short HEAD)" >> $LOG
git push -q -u origin claude/inspiring-allen-t4qzv1 && echo "=== session branch pushed" >> $LOG
cat $LOG
