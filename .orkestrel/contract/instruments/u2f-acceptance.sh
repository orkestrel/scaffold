#!/bin/bash
# U2f acceptance evidence: build, mutation reproduction for the subject
# read-once pin, hostile records (one intended difference on the alternating
# vector), both parity forms, and the scoped suite.
S=/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad
cd /home/user/contract
SUITE="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts"
echo "=== build ==="
npm run build > $S/results/u2f-build.out 2>&1; echo "build exit=$?"
mkdir -p $S/dists/u2f && cp dist/src/core/index.js $S/dists/u2f/index.js
BEFORE=$(sha256sum src/core/helpers.ts | cut -c1-16)
echo "=== mutation: subject read twice again (pre-fix shape) ==="
echo "read-once lines: $(grep -c 'subject: isString(subject) ? subject : ' src/core/helpers.ts)"
sed -i "s/subject: isString(subject) ? subject : 'value'/subject: isString(options?.subject) ? options.subject : 'value'/" src/core/helpers.ts
$SUITE 2>&1 | grep -E 'FAIL|Tests ' | head -6
sed -i "s/subject: isString(options?.subject) ? options.subject : 'value'/subject: isString(subject) ? subject : 'value'/" src/core/helpers.ts
AFTER=$(sha256sum src/core/helpers.ts | cut -c1-16)
echo "restore: $([ "$BEFORE" = "$AFTER" ] && echo RESTORED-EXACTLY || echo RESTORE-MISMATCH)"
$SUITE 2>&1 | grep -E 'Tests ' | head -1
echo "=== readValue hostile record (u2f vs base; exactly the alternating line must differ) ==="
node $S/instruments/readvalue-hostile.mjs $S/dists/u2f/index.js > $S/results/readvalue-hostile-u2f.out 2>&1
diff $S/results/readvalue-hostile-base015.out $S/results/readvalue-hostile-u2f.out | cut -c1-200
echo "=== preview boundary record (u2f vs base) ==="
node $S/instruments/preview-boundary.mjs $S/dists/u2f/index.js > $S/results/preview-boundary-u2f.out 2>&1
diff $S/results/preview-boundary-base015.out $S/results/preview-boundary-u2f.out && echo "preview record: IDENTICAL"
echo "=== parity identity form ==="
node $S/instruments/parity.mjs $S/dists/base015/index.js $S/dists/u2f/index.js 2>&1 | tail -1 | tee $S/results/parity-u2f.out
echo "=== parity content form ==="
node $S/instruments/parity-content.mjs $S/dists/base015/index.js $S/dists/u2f/index.js 2>&1 | tail -1 | tee $S/results/parity-content-u2f.out
echo "=== bare stringify tokens in preview TSDoc ==="
grep -n -E '[^.]`stringify`' src/core/helpers.ts | head -3; echo "count: $(grep -c -E '[^.]`stringify`' src/core/helpers.ts)"
echo "=== superseded sentence present? ==="; grep -c 'One bounded indexed encoder appends only' src/core/helpers.ts
echo "U2F ACCEPTANCE EVIDENCE COMPLETE"
