#!/bin/bash
# Cuts one unit worktree from the Veneer head $1: unit $2 with brief file $3 (derived from wave1-worktrees.sh).
H=$1
[ -n "$H" ] || { echo "usage: unit-worktree.sh <head> <unit> <brief>"; exit 1; }
R=/home/user/scaffold/.orkestrel/veneer/units
cd /home/user/veneer || exit 1
[ "$(git rev-parse HEAD:package-lock.json)" = "$(git rev-parse $H:package-lock.json)" ] || { echo "lockfile differs"; exit 2; }
for pair in $2:$3; do
  u=${pair%%:*}; b=${pair#*:}; W=/home/user/veneer-$u
  git worktree add -q -b unit/$u $W $H && cp -al /home/user/veneer/node_modules $W/node_modules || exit 3
  rm -rf $W/node_modules/.vite
  mkdir -p $W/tmp/units/logs
  sed "s/LANDING_HEAD/$H/g" $R/$b > $W/tmp/units/$u-brief.md
  echo "worktree $u $(git -C $W log --oneline -1) brief=$(grep -c "$H" $W/tmp/units/$u-brief.md) placeholders=$(grep -c LANDING_HEAD $W/tmp/units/$u-brief.md)"
done
