#!/bin/bash
# The Orchestrator's deciding run of probe's gates on the idle host, after both probe units exited.
set -u
cd /home/user/fleet/probe || exit 2
for step in "format:check" "lint:check" "check" "build" "test"; do T0=$(date +%s); npm run $step > "tmp/units/decide-$(echo $step | tr ':' '-').log.txt" 2>&1; E=$?; echo "== npm run $step → exit $E in $(( $(date +%s) - T0 ))s"; [ $E -ne 0 ] && grep -E "FAIL |Tests |Error:" "tmp/units/decide-$(echo $step | tr ':' '-').log.txt" | cut -c1-160 | head -12; done
echo "== solo re-run of the bin file"; npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin tests/src/bin/main.test.ts > tmp/units/decide-bin-solo.log.txt 2>&1; echo "exit=$?"; grep -E "Tests " tmp/units/decide-bin-solo.log.txt
git diff --stat | tail -n 1; git status --short
