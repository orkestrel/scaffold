#!/usr/bin/env bash
# U5 instrument probes: place the temporary probe suite in the veneer checkout, run the src:browser
# project on managed Chromium and on Edge, keep the readings, delete the suite.
# Logs: scaffold/tmp/units/u5-probe-chromium.log.txt and u5-probe-msedge.log.txt.
S="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/8082b48a-b39d-4cfd-ae0c-2f5c853292c4/scratchpad"
cd "C:/Users/mikes/WebstormProjects/veneer" || exit 9
cp "$S/u5-integration.test.ts" tests/src/browser/integration.test.ts
echo "--- chromium ---"
npx vitest run --config vite.config.ts --project src:browser --reporter=verbose tests/src/browser/integration.test.ts > ".orkestrel/veneer/units/u5-probe-chromium.log.txt" 2>&1
echo "exit=$?" >> ".orkestrel/veneer/units/u5-probe-chromium.log.txt"
echo "--- msedge ---"
PLAYWRIGHT_CHANNEL=msedge npx vitest run --config vite.config.ts --project src:browser --reporter=verbose tests/src/browser/integration.test.ts > ".orkestrel/veneer/units/u5-probe-msedge.log.txt" 2>&1
echo "exit=$?" >> ".orkestrel/veneer/units/u5-probe-msedge.log.txt"
rm -f tests/src/browser/integration.test.ts
git status --short -- tests/src/browser
grep -h "U5 \|exit=\|✓\|×\|FAIL\|Error" ".orkestrel/veneer/units/u5-probe-chromium.log.txt" | head -40
echo "=== edge ==="
grep -h "U5 \|exit=\|✓\|×\|FAIL\|Error" ".orkestrel/veneer/units/u5-probe-msedge.log.txt" | head -40
