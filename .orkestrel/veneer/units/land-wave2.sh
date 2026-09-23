#!/bin/bash
# land-wave2.sh: push the wave-2 landings (UTIL-PLACEMENT ac96f81, NAVBAR 009b95a, the specimen band 5d7f3b9, the re-pin
# ec87654, merged with Veneer main at 17dac23) to Veneer `main` after veneer-021-2.sh reads green. Steps: refuse unless the
# chain log closes with "gates done" and no step exit other than 0; fold the roadmap (fold-63.py) and re-pad it with the
# formatter, then format:check; commit the fold; fetch origin/main and, where it moved, merge it and run format:check,
# lint:check, check, and test:app over the merge; push the branch, then HEAD to main. Stops at the first red step.
# Log: land-wave2.log.txt (under units).
set -u
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
LOG=$U/land-wave2.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
CHAIN=$U/veneer-021-2.log.txt
cd /home/user/veneer || exit 1
stop() { echo "=== stopped: $1 ($(date -u +%H:%M:%S))" >> $LOG; exit 1; }
gate() { echo "=== $1 ($(date -u +%H:%M:%S))" >> $LOG; timeout 1500 npm run $1 >> $LOG 2>&1; local code=$?; echo "=== $1 exit=$code" >> $LOG; [ $code -eq 0 ] || stop "$1"; }
grep -q "^=== gates done" $CHAIN || stop "the chain log has no gates-done line"
grep -E "^=== .* exit=[1-9]" $CHAIN >> $LOG && stop "the chain log records a red step"
echo "=== chain green: $(grep -cE '^=== .* exit=0' $CHAIN) steps at exit 0 (the chain log)" >> $LOG
[ -z "$(git status --porcelain)" ] || stop "tree dirty"
python3 $U/fold-63.py /home/user/veneer >> $LOG 2>&1 || stop "fold-63.py"
npx oxfmt --write ROADMAP.md >> $LOG 2>&1
gate format:check
git add ROADMAP.md && git commit -q -m "Fold the UTIL-PLACEMENT and NAVBAR landings into the roadmap" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK" || stop "fold commit"
echo "=== fold commit $(git rev-parse --short HEAD)" >> $LOG
git fetch -q origin main || stop "fetch"
if git merge-base --is-ancestor origin/main HEAD; then
  echo "=== origin/main $(git rev-parse --short origin/main) is an ancestor; no merge" >> $LOG
else
  echo "=== origin/main moved to $(git rev-parse --short origin/main); merging" >> $LOG
  git merge --no-edit origin/main >> $LOG 2>&1 || stop "merge conflict"
  for g in format:check lint:check check test:app; do gate $g; done
fi
git push -q origin HEAD:claude/inspiring-allen-t4qzv1 >> $LOG 2>&1 || stop "branch push"
git push -q origin HEAD:main >> $LOG 2>&1 || stop "main push"
echo "=== pushed $(git rev-parse --short HEAD) to the branch and main; remote main $(git ls-remote --heads origin main | cut -c1-7) ($(date -u +%H:%M:%S))" >> $LOG
echo "=== land-wave2 done" >> $LOG
