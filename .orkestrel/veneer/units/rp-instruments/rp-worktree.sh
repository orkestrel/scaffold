#!/bin/bash
# Cuts the RP unit worktree /home/user/veneer-rp on branch unit/rp from Veneer 1ee0faf, hardlinks Veneer's node_modules,
# and extracts the round-5 @orkestrel/test tarball from t5-pack-5 over the registry copy (0.0.23), per the ruling's P6
# unit. Run after t5-veneer-probe-5.sh has packed the tarball.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
W=/home/user/veneer-rp
T=$(ls $S/t5-pack-5/orkestrel-test-*.tgz | head -1) || exit 1
cd /home/user/veneer && git worktree add -q -b unit/rp $W 1ee0faf && cp -al /home/user/veneer/node_modules $W/node_modules || exit 1
rm -rf $W/node_modules/@orkestrel/test && mkdir -p $W/node_modules/@orkestrel/test && tar -xzf $T --strip-components=1 -C $W/node_modules/@orkestrel/test
mkdir -p $W/tmp/units && cp /home/user/scaffold/.orkestrel/veneer/units/rp-repin-brief.md $W/tmp/units/rp-brief.md
echo "worktree $(git -C $W log --oneline -1) tarball $(basename $T) $(sha256sum $T | cut -c1-16) offsetParent=$(grep -c offsetParent $W/node_modules/@orkestrel/test/dist/src/browser/index.js)"
