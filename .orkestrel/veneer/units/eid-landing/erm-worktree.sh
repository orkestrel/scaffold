#!/bin/bash
# Cuts the ER-MECH unit worktree /home/user/veneer-erm on branch unit/erm from Veneer 873f715 (the E-ID-FLOW-2 landing),
# hardlinks Veneer's node_modules, drops the hardlinked Vite pre-bundle, and stages the brief. Derived from
# rp-worktree.sh without its tarball step. The lockfile at 873f715 equals the one node_modules was installed from.
W=/home/user/veneer-erm
cd /home/user/veneer || exit 1
[ "$(git rev-parse HEAD:package-lock.json)" = "$(git rev-parse 873f715:package-lock.json)" ] || { echo "lockfile differs"; exit 2; }
git worktree add -q -b unit/erm $W 873f715 && cp -al /home/user/veneer/node_modules $W/node_modules || exit 1
rm -rf $W/node_modules/.vite
mkdir -p $W/tmp/units && cp /home/user/scaffold/.orkestrel/veneer/units/er-mech-brief.md $W/tmp/units/erm-brief.md
echo "worktree $(git -C $W log --oneline -1)"
