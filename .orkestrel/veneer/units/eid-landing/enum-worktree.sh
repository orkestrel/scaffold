#!/bin/bash
# Cuts the ENUM-TITLES unit worktree /home/user/veneer-enum, detached at Veneer origin/main 0865c67, hardlinks Veneer's
# node_modules, drops the hardlinked Vite pre-bundle, and stages the brief. Derived from erm-worktree.sh.
W=/home/user/veneer-enum
cd /home/user/veneer || exit 1
git fetch -q origin main || exit 1
[ "$(git rev-parse HEAD:package-lock.json)" = "$(git rev-parse 0865c67:package-lock.json)" ] || { echo "lockfile differs"; exit 2; }
git worktree add -q -b unit/enum $W 0865c67 && cp -al /home/user/veneer/node_modules $W/node_modules || exit 1
rm -rf $W/node_modules/.vite
mkdir -p $W/tmp/units/logs && cp /home/user/scaffold/.orkestrel/veneer/units/enum-titles-brief.md $W/tmp/units/enum-brief.md
echo "worktree $(git -C $W log --oneline -1)"
