#!/usr/bin/env bash
# supervisor s1: the fresh clone's dependencies from its own lockfile (npm ci), then the readings a P.1 brief needs on its own pins.
set -u
export PATH=/opt/npm11/bin:$PATH
cd /home/user/fleet/supervisor || exit 9
echo "== npm ci $(date -u +%FT%TZ)"; npm ci --ignore-scripts --no-audit --no-fund 2>&1 | tail -3; echo "exit ${PIPESTATUS[0]}"
echo "== installed"; node -p "['scaffold','guide','contract','test'].map(n => n + ' ' + require('./node_modules/@orkestrel/' + n + '/package.json').version).join(' ')"
echo "== check"; timeout 600 npm run check 2>&1 | grep -E 'error TS' | head -10; echo "exit ${PIPESTATUS[0]}"
echo "== test:guides"; timeout 300 npm run test:guides 2>&1 | grep -E 'Tests |Test Files|failed' | tail -3; echo "exit ${PIPESTATUS[0]}"
echo "== test:policy"; timeout 300 npm run test:policy 2>&1 | grep -E 'Tests |Test Files|FAIL' | tail -4; echo "exit ${PIPESTATUS[0]}"
echo "== s1 done $(date -u +%FT%TZ)"
