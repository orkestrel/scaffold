#!/bin/bash
# Deciding readings, taken alone (no bench lane running): identity, then every
# parity-preserving candidate, over the extended family list.
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd $S
FAM=is-medium,parse-medium,audit-medium,explain-medium,is-deep,parse-deep,audit-deep,explain-deep,is-list48,audit-list48
for u in identity015 a1 a2 a3b a7 a10 a11; do
  echo "=== $u vs base015 (idle) ==="
  node instruments/ab-inproc2.mjs $S/dists/base015/index.js $S/dists/$u/index.js $FAM | tee results/ab-idle-$u.out
done
echo "IDLE ROUND COMPLETE"
