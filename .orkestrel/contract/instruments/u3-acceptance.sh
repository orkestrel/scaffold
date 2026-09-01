#!/bin/bash
# U3 acceptance evidence: build, mutation reproduction (the helper ignores its
# supplied pattern), pattern-fault record vs baseline, both parity forms, and
# 6-process A/B against the U2 checkpoint (isolation) and the 0.0.15 dist.
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd /home/user/contract
HELPERS="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts"
COMPILERS="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/compilers.test.ts"
echo "=== build ==="
npm run build > $S/results/u3-build.out 2>&1; echo "build exit=$?"
mkdir -p $S/dists/u3 && cp dist/src/core/index.js $S/dists/u3/index.js
echo "=== mutation: helper ignores the supplied pattern ==="
BEFORE=$(sha256sum src/core/helpers.ts | cut -c1-16)
MUTLINE=$(grep -n 'pattern ?? (shape.pattern === undefined' src/core/helpers.ts | head -1 | cut -d: -f1)
echo "stateless line: $MUTLINE"
if [ -n "$MUTLINE" ]; then
  sed -i "${MUTLINE}s/pattern ?? (shape.pattern === undefined ? undefined : readPattern(shape.pattern))/(shape.pattern === undefined ? undefined : readPattern(shape.pattern))/" src/core/helpers.ts
  $HELPERS 2>&1 | grep -E 'FAIL|Tests ' | head -6
  sed -i "${MUTLINE}s/(shape.pattern === undefined ? undefined : readPattern(shape.pattern))/pattern ?? (shape.pattern === undefined ? undefined : readPattern(shape.pattern))/" src/core/helpers.ts
  AFTER=$(sha256sum src/core/helpers.ts | cut -c1-16)
  echo "restore: $([ "$BEFORE" = "$AFTER" ] && echo RESTORED-EXACTLY || echo RESTORE-MISMATCH)"
else
  echo "mutation anchor not found: inspect the diff and mutate by hand"
fi
$HELPERS 2>&1 | grep -E 'Tests ' | head -1
$COMPILERS 2>&1 | grep -E 'Tests |Duration' | head -2
echo "=== pattern-fault record (u3 vs base) ==="
node $S/instruments/pattern-faults.mjs $S/dists/u3/index.js > $S/results/pattern-faults-u3.out 2>&1
diff $S/results/pattern-faults-base015.out $S/results/pattern-faults-u3.out && echo "pattern record: IDENTICAL"
echo "=== parity identity form ==="
node $S/instruments/parity.mjs $S/dists/base015/index.js $S/dists/u3/index.js 2>&1 | tail -1 | tee $S/results/parity-u3.out
echo "=== parity content form ==="
node $S/instruments/parity-content.mjs $S/dists/base015/index.js $S/dists/u3/index.js 2>&1 | tail -1 | tee $S/results/parity-content-u3.out
FAM=audit-deep,explain-deep,audit-medium,explain-medium
echo "=== 6-process A/B: u2f checkpoint (A) vs u3 (B) — isolates U3 ==="
bash $S/instruments/ab-multi.sh u3-vs-u2f $S/dists/u2f/index.js $S/dists/u3/index.js $FAM 3
echo "=== 6-process A/B: base015 (A) vs u3 (B) — cumulative ==="
bash $S/instruments/ab-multi.sh u3 $S/dists/base015/index.js $S/dists/u3/index.js $FAM 3
echo "U3 ACCEPTANCE EVIDENCE COMPLETE"
