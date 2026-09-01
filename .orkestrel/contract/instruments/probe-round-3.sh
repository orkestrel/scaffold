#!/bin/bash
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd $S
for u in a3b a11; do
  echo "=== $u vs base015 ==="
  node instruments/ab-inproc2.mjs $S/dists/base015/index.js $S/dists/$u/index.js audit-medium,explain-medium,audit-deep,explain-deep | tee results/ab-$u.out
  echo "=== parity $u ==="
  node instruments/parity.mjs $S/dists/base015/index.js $S/dists/$u/index.js 2>&1 | tail -2 | tee results/parity-$u.out
done
