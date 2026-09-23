#!/bin/bash
# FLOATING landing finish: the TSDoc lint fix is applied; re-run the checks, amend the landing, fold 24, commit, push the session branch, then the verification chain.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/bff-finish.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers; cd /home/user/veneer || exit 1
npx oxfmt --config .oxfmtrc.json --write tests/setupStyles.ts >> $LOG 2>&1
for g in format:check lint:check check; do npm run $g >> $LOG 2>&1; r=$?; echo "=== $g exit=$r" >> $LOG; [ $r -ne 0 ] && { echo "=== stopping on $g" >> $LOG; exit 1; }; done
git add -A && git commit -q --amend --no-edit && echo "=== amended $(git rev-parse --short HEAD)" >> $LOG
python3 $S/fold-24.py >> $LOG 2>&1 || { echo "=== fold failed" >> $LOG; exit 1; }
npx oxfmt --config .oxfmtrc.json --write ROADMAP.md >> $LOG 2>&1; npm run format:check >> $LOG 2>&1; echo "=== format:check after fold exit=$?" >> $LOG
git add ROADMAP.md && git commit -q -m "Roadmap fold 24: B-FORMS-FLOATING landed with FLOOR" -m "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK" && echo "=== fold committed $(git rev-parse --short HEAD)" >> $LOG
git push -q -u origin claude/inspiring-allen-t4qzv1 && echo "=== session branch pushed" >> $LOG
bash $S/verify-bff.sh; echo "=== verify exit=$?" >> $LOG; cat $S/verify-bff.log.txt >> $LOG
