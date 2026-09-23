#!/bin/bash
# CONTROL round-5 landing: land-unit.sh bfo5 (base f82de43, the session tip, so the cherry-pick applies cleanly), the checks, and the session-branch push. The chain (verify-bfo-3.sh, with regeneration) and the main push follow separately.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; export PATH="$S/npm11/node_modules/.bin:$PATH"; LOG=$S/land-bfo5-all.log.txt; : > $LOG
cd /home/user/veneer || exit 1
bash $S/land-unit.sh bfo5 $S/bfo5-landing-message.txt f82de43 >> $LOG 2>&1; echo "=== land-unit exit=$? head=$(git rev-parse --short HEAD)" >> $LOG
if git status --porcelain | grep -qE '^(UU|DU|AA|UD)'; then echo "=== CONFLICT REMAINS" >> $LOG; exit 3; fi
for g in format:check lint:check check; do npm run $g > $S/bfo5-$g.log.txt 2>&1; echo "=== $g exit=$?" >> $LOG; done
git push -q -u origin claude/inspiring-allen-t4qzv1 && echo "=== session branch pushed $(git rev-parse --short HEAD)" >> $LOG
cat $LOG
