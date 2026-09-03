#!/usr/bin/env bash
# Orchestrator capture unit after the layer's height fix is re-staged: film every variant under
# the capture flag, then decode every frame and report its floor and trailing uniform rows.
set -uo pipefail
cd /c/Users/mikes/WebstormProjects/terrain
for variant in light-1280 dark-1280 light-390 dark-390; do
	echo "=== VITE_CAPTURE=true VITE_VARIANT=$variant"
	VITE_CAPTURE=true VITE_VARIANT=$variant npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts > "tmp/units/refilm-$variant.log" 2>&1
	echo "EXIT=$?"
	grep -E 'Tests |FAIL|AssertionError' "tmp/units/refilm-$variant.log" | tail -n 3
done
echo '=== frames:'
node tmp/frame.mjs tmp/capture/states
echo '=== status:'
git status --porcelain
