#!/bin/bash
# U1 acceptance evidence: build the source tree, reproduce the mutation probe,
# then run the hostile/read records, both parity forms, and the 6-process A/B.
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd /home/user/contract
echo "=== build ==="
npm run build > $S/results/u1-build.out 2>&1; echo "build exit=$?"; tail -2 $S/results/u1-build.out
mkdir -p $S/dists/u1 && cp dist/src/core/index.js $S/dists/u1/index.js
echo "=== mutation reproduction ==="
BEFORE=$(git diff src/core/helpers.ts | md5sum)
grep -c "if (key === undefined || !INTRINSICS.own(value, key)) {" src/core/helpers.ts
sed -i 's/if (key === undefined || !INTRINSICS.own(value, key)) {/if (key === undefined) {/' src/core/helpers.ts
echo "-- mutated (own corroboration removed) --"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts 2>&1 | grep -E 'Tests|FAIL|✗|×' | head -8
sed -i 's/if (key === undefined) {/if (key === undefined || !INTRINSICS.own(value, key)) {/' src/core/helpers.ts
AFTER=$(git diff src/core/helpers.ts | md5sum)
echo "restore check: $([ "$BEFORE" = "$AFTER" ] && echo RESTORED-EXACTLY || echo RESTORE-MISMATCH)"
echo "-- restored --"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts 2>&1 | grep -E 'Tests' | head -2
echo "=== hostile-array record (u1 vs base) ==="
node $S/instruments/array-hostile.mjs $S/dists/u1/index.js > $S/results/array-hostile-u1.out 2>&1
diff $S/results/array-hostile-base015.out $S/results/array-hostile-u1.out && echo "hostile record: IDENTICAL"
echo "=== trap-count record (u1 vs base) ==="
node $S/instruments/array-reads.mjs $S/dists/u1/index.js > $S/results/array-reads-u1.out 2>&1
diff $S/results/array-reads-base015-full.out $S/results/array-reads-u1.out && echo "trap counts: IDENTICAL"
echo "=== parity (identity form) ==="
node $S/instruments/parity.mjs $S/dists/base015/index.js $S/dists/u1/index.js 2>&1 | tail -1 | tee $S/results/parity-u1.out
echo "=== parity (content form) ==="
node $S/instruments/parity-content.mjs $S/dists/base015/index.js $S/dists/u1/index.js 2>&1 | tail -1 | tee $S/results/parity-content-u1.out
echo "=== 6-process A/B (u1 source build vs base015) ==="
bash $S/instruments/ab-multi.sh u1 $S/dists/base015/index.js $S/dists/u1/index.js is-medium,parse-medium,is-deep,is-list48,audit-list48 3
echo "U1 ACCEPTANCE EVIDENCE COMPLETE"
