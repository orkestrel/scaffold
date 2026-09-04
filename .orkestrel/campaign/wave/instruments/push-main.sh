#!/bin/bash
# Push every checkout's release branch to main as a fast-forward. A main that is not an ancestor of the branch tip is
# reported as NONFF and left alone. Usage: push-main.sh; log /home/user/work/wave/push-main.log; ends PUSH-MAIN-DONE.
set -u
W=/home/user/work/wave; LOG=$W/push-main.log; : > "$LOG"
for d in /home/user/fleet/* /home/user/scaffold; do
  n=$(basename "$d"); cd "$d" || { echo "$n MISSING" >> "$LOG"; continue; }
  [ -z "$(git status --porcelain)" ] || { echo "$n DIRTY" >> "$LOG"; continue; }
  git fetch -q origin main 2>/dev/null || { echo "$n FETCH-FAILED" >> "$LOG"; continue; }
  if git merge-base --is-ancestor origin/main HEAD; then
    if git push -q origin HEAD:main 2>>"$W/push-main-errors.log"; then echo "$n main=$(git rev-parse --short HEAD) pushed" >> "$LOG"; else echo "$n PUSH-FAILED" >> "$LOG"; fi
  else
    echo "$n NONFF (origin/main $(git rev-parse --short origin/main) is not an ancestor of $(git rev-parse --short HEAD); $(git rev-list --count HEAD..origin/main) commits on main are not on the branch)" >> "$LOG"
  fi
done
echo "PUSH-MAIN-DONE $(grep -c ' pushed' "$LOG") pushed, $(grep -cE 'NONFF|FAILED|DIRTY|MISSING' "$LOG") not" >> "$LOG"
