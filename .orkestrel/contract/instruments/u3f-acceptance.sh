#!/bin/bash
# U3 acceptance evidence: build, mutation reproduction (the helper ignores its
# supplied pattern), pattern-fault record vs baseline, both parity forms, and
# 6-process A/B against the U2 checkpoint (isolation) and the 0.0.15 dist.
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd /home/user/contract
HELPERS="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts"
COMPILERS="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/compilers.test.ts"
echo "=== build ==="
npm run build > $S/results/u3f-build.out 2>&1; echo "build exit=$?"
mkdir -p $S/dists/u3f && cp dist/src/core/index.js $S/dists/u3f/index.js
$HELPERS 2>&1 | grep -E 'Tests ' | head -1
$COMPILERS 2>&1 | grep -E 'Tests |Duration' | head -2
echo "=== pattern-fault record (u3 vs base) ==="
node $S/instruments/pattern-faults.mjs $S/dists/u3f/index.js > $S/results/pattern-faults-u3f.out 2>&1
diff $S/results/pattern-faults-base015.out $S/results/pattern-faults-u3f.out && echo "pattern record: IDENTICAL"
echo "=== parity identity form ==="
node $S/instruments/parity.mjs $S/dists/base015/index.js $S/dists/u3f/index.js 2>&1 | tail -1 | tee $S/results/parity-u3f.out
echo "=== parity content form ==="
node $S/instruments/parity-content.mjs $S/dists/base015/index.js $S/dists/u3f/index.js 2>&1 | tail -1 | tee $S/results/parity-content-u3f.out
FAM=audit-deep,explain-deep,audit-medium,explain-medium
echo "=== 6-process A/B: u2f checkpoint (A) vs u3 (B) — isolates U3 ==="
bash $S/instruments/ab-multi.sh u3f-vs-u2f $S/dists/u2f/index.js $S/dists/u3f/index.js $FAM 3
echo "=== 6-process A/B: base015 (A) vs u3 (B) — cumulative ==="
bash $S/instruments/ab-multi.sh u3f $S/dists/base015/index.js $S/dists/u3f/index.js $FAM 3
echo "U3F ACCEPTANCE EVIDENCE COMPLETE"
