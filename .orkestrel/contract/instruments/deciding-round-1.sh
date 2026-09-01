#!/bin/bash
# Deciding 6-process readings for the candidate rows on their target families.
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd $S
bash instruments/ab-multi.sh a1 $S/dists/base015/index.js $S/dists/a1/index.js is-medium,parse-medium,is-deep,is-list48,audit-list48 3
bash instruments/ab-multi.sh a2 $S/dists/base015/index.js $S/dists/a2/index.js audit-medium,audit-deep,parse-medium,audit-list48 3
bash instruments/ab-multi.sh a3b $S/dists/base015/index.js $S/dists/a3b/index.js audit-deep,explain-deep,audit-medium 3
bash instruments/ab-multi.sh a11 $S/dists/base015/index.js $S/dists/a11/index.js explain-medium,audit-medium 3
bash instruments/ab-multi.sh a7 $S/dists/base015/index.js $S/dists/a7/index.js audit-medium,audit-deep 3
echo "DECIDING ROUND 1 COMPLETE"
