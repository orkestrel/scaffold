#!/usr/bin/env bash
# Orchestrator capture unit: film the two variants the successor unit did not, so the portfolio
# under terrain/tmp/capture/states/ covers every declared variant. Read-only against the tree.
set -uo pipefail
cd /c/Users/mikes/WebstormProjects/terrain
for variant in light-390 dark-1280; do
	echo "=== VITE_CAPTURE=true VITE_VARIANT=$variant"
	VITE_CAPTURE=true VITE_VARIANT=$variant npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts > "tmp/units/capture-$variant.log" 2>&1
	echo "EXIT=$?"
	grep -E 'Tests|Test Files' "tmp/units/capture-$variant.log" | tail -n 2
done
echo '=== portfolio:'
ls -la --time-style=+%H:%M:%S tmp/capture/states/
echo '=== status:'
git status --porcelain
