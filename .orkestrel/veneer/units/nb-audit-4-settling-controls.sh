#!/bin/bash
# nb-audit-4-settling-controls.sh: build the NAVBAR round-4 stage (a658879 extracted with git archive, the owned files
# from the unit's worktree, the round-4 shared and off-limits patches, node_modules hard-linked) under the scratchpad
# and run nb-audit-4-settling-controls.py over it. Log: the script's stdout, kept as nb-audit-4-settling-controls.txt;
# the per-control outputs under nb-audit-4-settling-logs/.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units; W=/home/user/veneer-nb
ST=$S/nb4-settle/stage; LOGS=$U/nb-audit-4-settling-logs; rm -rf $S/nb4-settle $LOGS; mkdir -p $ST $LOGS
echo "=== stage build $(date -u +%H:%M:%S)"
git -C $W archive a658879 | tar -x -C $ST
for f in $(git -C $W status --porcelain | awk '{print $2}'); do mkdir -p "$ST/$(dirname $f)"; cp "$W/$f" "$ST/$f"; done
cd $ST && git init -q && git apply $U/nb-shared-4.patch && git apply $U/nb-offlimits-4.patch && echo "patches applied" || exit 2
cp -al $W/node_modules node_modules
echo "=== controls $(date -u +%H:%M:%S)"; python3 $U/nb-audit-4-settling-controls.py $ST $LOGS
echo "=== done $(date -u +%H:%M:%S)"
