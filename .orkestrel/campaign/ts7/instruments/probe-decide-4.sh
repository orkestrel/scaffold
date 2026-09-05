#!/usr/bin/env bash
# Orchestrator deciding chain 4 over the final probe tree, on the idle host after the round-4 unit exits:
# check, then the two timing-sensitive files alone, then the guides project alone. Logs under tmp/units/.
set -u
cd /home/user/fleet/probe || exit 1
log=tmp/units/decide-4
printf '== deciding chain 4, %s, node-count=%s\n' "$(date -u +%H:%M:%S)" "$(ps -eo comm | grep -c '^node$')" > $log-head.log.txt
for step in "format:check" "lint:check" "check" "build"; do
  npm run "$step" > "$log-$step.log.txt" 2>&1; echo "== npm run $step → exit $?" | tee -a $log-head.log.txt
done
npx vitest run --config vite.config.ts --no-cache --project src:bin tests/src/bin/main.test.ts > $log-bin-solo.log.txt 2>&1; echo "== bin solo → exit $?" | tee -a $log-head.log.txt
npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/Probe.test.ts > $log-probe-solo.log.txt 2>&1; echo "== Probe solo → exit $?" | tee -a $log-head.log.txt
npm run test:guides > $log-guides.log.txt 2>&1; echo "== test:guides → exit $?" | tee -a $log-head.log.txt
npm run test:setup > $log-setup.log.txt 2>&1; echo "== test:setup → exit $?" | tee -a $log-head.log.txt
npm run test:policy > $log-policy.log.txt 2>&1; echo "== test:policy → exit $?" | tee -a $log-head.log.txt
npm run test:config > $log-config.log.txt 2>&1; echo "== test:config → exit $?" | tee -a $log-head.log.txt
npx vitest run --config vite.config.ts --no-cache --project src:core --project src:server --exclude tests/src/server/Probe.test.ts > $log-src-rest.log.txt 2>&1; echo "== src:core + src:server minus Probe.test.ts → exit $?" | tee -a $log-head.log.txt
git status --short | tee -a $log-head.log.txt
