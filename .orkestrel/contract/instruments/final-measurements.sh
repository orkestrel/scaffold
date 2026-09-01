#!/bin/bash
# Final measurements on the accepted tree: build, ops and heap restated,
# cumulative 6-process A/B against the 0.0.15 dist over every family, parity.
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd /home/user/contract
echo "=== build ==="; npm run build > $S/results/final-build.out 2>&1; echo "build exit=$?"
mkdir -p $S/dists/final && cp dist/src/core/index.js $S/dists/final/index.js
echo "=== ops (accepted tree) ==="; node $S/instruments/ops-baseline.mjs 2>&1 | tee $S/results/ops-final.out
echo "=== heap (accepted tree) ==="; node --expose-gc $S/instruments/heap-baseline.mjs 2>&1 | tee $S/results/heap-final.out
echo "=== parity vs 0.0.15 ==="; node $S/instruments/parity.mjs $S/dists/base015/index.js $S/dists/final/index.js 2>&1 | tail -1 | tee $S/results/parity-final.out
node $S/instruments/parity-content.mjs $S/dists/base015/index.js $S/dists/final/index.js 2>&1 | tail -1 | tee $S/results/parity-content-final.out
FAM=is-medium,parse-medium,audit-medium,explain-medium,is-deep,parse-deep,audit-deep,explain-deep,is-list48,audit-list48
echo "=== 6-process A/B: base015 (A) vs final (B) ==="
bash $S/instruments/ab-multi.sh final $S/dists/base015/index.js $S/dists/final/index.js $FAM 3
echo "=== identity control, same session ==="
bash $S/instruments/ab-multi.sh final-identity $S/dists/base015/index.js $S/dists/identity015/index.js is-medium,audit-medium,audit-deep 3
echo "FINAL MEASUREMENTS COMPLETE"
