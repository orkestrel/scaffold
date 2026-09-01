#!/bin/bash
# Harness measurements for the breaking phase (see tmp/units/breaking/harness-brief.md).
# Every step prints its command, its wall time, and its exit code. Restores every consumer at the end.
set -u
W=/home/user/work
T=/home/user/scaffold/tmp/tarballs
step() { echo; echo "### $*"; }
timed() { local s=$(date +%s); "$@"; local rc=$?; echo "[exit $rc, $(( $(date +%s) - s ))s] $*"; return $rc; }

step "1. build+pack contract (timed)"
timed $W/pack-dep.sh contract
CT=$(ls $T/contract-*.tgz | head -1)

step "2. one-tarball install into budget (timed) + verify"
timed $W/stage-deps.sh budget "$CT"
timed node $W/verify-stage.mjs budget
(cd /home/user/fleet/budget && git status --short -- package.json package-lock.json && echo "manifest/lockfile: $(git diff --quiet -- package.json package-lock.json && echo clean || echo MOVED)")

step "3. negative control: plain npm install in budget, then verify (expect RED)"
(cd /home/user/fleet/budget && timed npm install --no-audit --no-fund >/home/user/work/logs/control-budget.log 2>&1)
timed node $W/verify-stage.mjs budget
echo "control expectation: RED above"

step "4. re-stage budget, verify (expect OK)"
timed $W/stage-deps.sh budget "$CT"
timed node $W/verify-stage.mjs budget

step "5. second --no-save install preserves the first? (database: contract, then emitter)"
timed $W/pack-dep.sh emitter
ET=$(ls $T/emitter-*.tgz | head -1)
timed $W/stage-deps.sh database "$CT"
timed $W/stage-deps.sh database "$ET"
timed node $W/verify-stage.mjs database
(cd /home/user/fleet/database && npm ls @orkestrel/contract 2>&1 | head -12)

step "6. npm run check in database against the staged tree (timed)"
(cd /home/user/fleet/database && timed npm run check >/home/user/work/logs/check-database-staged.log 2>&1; tail -3 /home/user/work/logs/check-database-staged.log)

step "7. worker: contract tarball alone -> npm ls + check"
timed $W/stage-deps.sh worker "$CT"
(cd /home/user/fleet/worker && npm ls @orkestrel/contract 2>&1 | head -20)
(cd /home/user/fleet/worker && timed npm run check >/home/user/work/logs/check-worker-contract-only.log 2>&1; grep -c "error TS" /home/user/work/logs/check-worker-contract-only.log; grep "error TS" /home/user/work/logs/check-worker-contract-only.log | head -5)

step "8. worker: changed closure in one install -> npm ls + check"
for p in database queue emitter pool indexeddb sqlite abort timeout; do timed $W/pack-dep.sh $p; done
CLOSURE="$CT $(for p in database queue emitter pool indexeddb sqlite abort timeout; do ls $T/$p-*.tgz | head -1; done | tr '\n' ' ')"
timed $W/restore-dep.sh worker
timed $W/stage-deps.sh worker $CLOSURE
timed node $W/verify-stage.mjs worker
(cd /home/user/fleet/worker && npm ls @orkestrel/contract 2>&1 | head -30)
(cd /home/user/fleet/worker && timed npm run check >/home/user/work/logs/check-worker-closure.log 2>&1; grep -c "error TS" /home/user/work/logs/check-worker-closure.log; grep "error TS" /home/user/work/logs/check-worker-closure.log | head -5)

step "9. restore every consumer (timed)"
for c in budget database worker; do timed $W/restore-dep.sh $c; (cd /home/user/fleet/$c && git status --short | head -3); done
node -e 'const a=require("/home/user/scaffold/.orkestrel/campaign/fix/tarballs.json");console.log("register rows left:",a.length)'
echo "HARNESS-DONE"
