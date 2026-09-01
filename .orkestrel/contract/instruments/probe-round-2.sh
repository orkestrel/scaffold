#!/bin/bash
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd $S
FAM=audit-medium,explain-medium,audit-deep,audit-list48
for u in a6bound a7; do
  echo "=== $u vs base015 ==="
  node instruments/ab-inproc.mjs $S/dists/base015/index.js $S/dists/$u/index.js $FAM | tee results/ab-$u.out
done
echo "=== parity a7 ==="
node instruments/parity.mjs $S/dists/base015/index.js $S/dists/a7/index.js 2>&1 | tail -2 | tee results/parity-a7.out
