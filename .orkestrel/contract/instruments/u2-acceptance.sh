#!/bin/bash
# U2 acceptance evidence: build, two mutation reproductions, hostile records,
# both parity forms, and 6-process A/B against the U1 checkpoint (isolation)
# and against the 0.0.15 dist (cumulative).
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd /home/user/contract
SUITE="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts"
echo "=== build ==="
npm run build > $S/results/u2-build.out 2>&1; echo "build exit=$?"
mkdir -p $S/dists/u2 && cp dist/src/core/index.js $S/dists/u2/index.js
BEFORE=$(sha256sum src/core/helpers.ts | cut -c1-16)
echo "=== mutation A: readValue spread removed ==="
echo "spread lines: $(grep -c '^\s*\.\.\.source,$' src/core/helpers.ts)"
sed -i '/^\s*\.\.\.source,$/d' src/core/helpers.ts
$SUITE 2>&1 | grep -E 'FAIL|Tests ' | head -8
# restore: re-insert the spread line after the `received: undefined,` line inside the owned literal
sed -i '0,/^\t\t\t\t\t\treceived: undefined,$/s//\t\t\t\t\t\treceived: undefined,\n\t\t\t\t\t\t...source,/' src/core/helpers.ts
AFTER_A=$(sha256sum src/core/helpers.ts | cut -c1-16)
echo "restore A: $([ "$BEFORE" = "$AFTER_A" ] && echo RESTORED-EXACTLY || echo RESTORE-MISMATCH)"
$SUITE 2>&1 | grep -E 'Tests ' | head -1
echo "=== mutation B: preview length gate removed ==="
sed -i 's/if (quoted \&\& source.length <= PREVIEW_LIMIT) {/if (quoted) {/' src/core/helpers.ts
$SUITE 2>&1 | grep -E 'FAIL|Tests |expected' | head -6
sed -i 's/if (quoted) {/if (quoted \&\& source.length <= PREVIEW_LIMIT) {/' src/core/helpers.ts
AFTER_B=$(sha256sum src/core/helpers.ts | cut -c1-16)
echo "restore B: $([ "$BEFORE" = "$AFTER_B" ] && echo RESTORED-EXACTLY || echo RESTORE-MISMATCH)"
$SUITE 2>&1 | grep -E 'Tests ' | head -1
echo "=== readValue hostile record (u2 vs base) ==="
node $S/instruments/readvalue-hostile.mjs $S/dists/u2/index.js > $S/results/readvalue-hostile-u2.out 2>&1
diff $S/results/readvalue-hostile-base015.out $S/results/readvalue-hostile-u2.out && echo "readValue record: IDENTICAL"
echo "=== preview boundary record (u2 vs base) ==="
node $S/instruments/preview-boundary.mjs $S/dists/u2/index.js > $S/results/preview-boundary-u2.out 2>&1
diff $S/results/preview-boundary-base015.out $S/results/preview-boundary-u2.out && echo "preview record: IDENTICAL"
echo "=== parity identity form ==="
node $S/instruments/parity.mjs $S/dists/base015/index.js $S/dists/u2/index.js 2>&1 | tail -1 | tee $S/results/parity-u2.out
echo "=== parity content form ==="
node $S/instruments/parity-content.mjs $S/dists/base015/index.js $S/dists/u2/index.js 2>&1 | tail -1 | tee $S/results/parity-content-u2.out
FAM=audit-medium,audit-deep,explain-medium,explain-deep,parse-medium
echo "=== 6-process A/B: u1f checkpoint (A) vs u2 (B) — isolates U2 ==="
bash $S/instruments/ab-multi.sh u2-vs-u1f $S/dists/u1f/index.js $S/dists/u2/index.js $FAM 3
echo "=== 6-process A/B: base015 (A) vs u2 (B) — cumulative ==="
bash $S/instruments/ab-multi.sh u2 $S/dists/base015/index.js $S/dists/u2/index.js $FAM 3
echo "U2 ACCEPTANCE EVIDENCE COMPLETE"
