#!/bin/bash
# Probe round 1: identity control, then A1/A2/A3 paired A/B against base015.
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
FAM=is-medium,parse-medium,audit-medium,explain-medium,is-deep,audit-deep,is-list48,audit-list48
cd $S
echo "=== identity control (base015 vs identity015) ==="
node instruments/ab-inproc.mjs $S/dists/base015/index.js $S/dists/identity015/index.js $FAM | tee results/ab-identity-015.out
for u in a1 a2 a3; do
  echo "=== $u vs base015 ==="
  node instruments/ab-inproc.mjs $S/dists/base015/index.js $S/dists/$u/index.js $FAM | tee results/ab-$u.out
done
