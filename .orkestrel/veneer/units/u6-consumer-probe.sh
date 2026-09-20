#!/usr/bin/env bash
# U6 consumer probe in Veneer: run the temporary integration test on managed Chromium and Edge,
# then delete the probe file. Logs land in the Orchestrator's scratchpad.
set -u
VENEER="C:/Users/mikes/WebstormProjects/veneer"
OUT="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/8082b48a-b39d-4cfd-ae0c-2f5c853292c4/scratchpad"
cd "$VENEER" || exit 9
echo "== chromium" > "$OUT/u6-consumer-probe.log.txt"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/integration.test.ts >> "$OUT/u6-consumer-probe.log.txt" 2>&1
echo "exit=$?" >> "$OUT/u6-consumer-probe.log.txt"
echo "== edge" >> "$OUT/u6-consumer-probe.log.txt"
PLAYWRIGHT_CHANNEL=msedge npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/integration.test.ts >> "$OUT/u6-consumer-probe.log.txt" 2>&1
echo "exit=$?" >> "$OUT/u6-consumer-probe.log.txt"
cp tests/src/browser/integration.test.ts "$OUT/u6-consumer-probe.test.ts"
rm -f tests/src/browser/integration.test.ts
git status --porcelain -- tests/src/browser/integration.test.ts >> "$OUT/u6-consumer-probe.log.txt"
echo "== done" >> "$OUT/u6-consumer-probe.log.txt"
