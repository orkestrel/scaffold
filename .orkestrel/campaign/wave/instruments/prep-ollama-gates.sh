#!/bin/bash
# Ollama's gates on a host with no Ollama daemon: run prepublishOnly's members one by one, require every member green
# except test:service, whose reading is recorded (its suite drives a daemon this host lacks). Stage for the release commit. Log prep-ollama-gates.log.
set -u
export PATH=/opt/npm11/bin:$PATH
W=/home/user/work/wave; LOG=$W/prep-ollama-gates.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) ollama $*" >> "$LOG"; }
cd /home/user/fleet/ollama || exit 2
npm run format > "$W/prep-ollama-format2.log" 2>&1; say "format exit=$?"
for g in format:check lint:check check build; do npm run "$g" > "$W/prep-ollama-$g.log" 2>&1; rc=$?; say "$g exit=$rc"; [ $rc -eq 0 ] || { say "PREP-ollama-RED $g"; exit 1; }; done
npm test > "$W/prep-ollama-test.log" 2>&1; rc=$?; say "test exit=$rc: $(grep -E 'Tests  ' "$W/prep-ollama-test.log" | tail -n 1 | sed 's/^ *//')"; [ $rc -eq 0 ] || { say "PREP-ollama-RED test"; exit 1; }
npm run test:distribution -- --mode release > "$W/prep-ollama-test-distribution.log" 2>&1; rc=$?; say "test:distribution exit=$rc"; [ $rc -eq 0 ] || { say "PREP-ollama-RED test:distribution"; exit 1; }
git add -A . > /dev/null 2>&1; git status --porcelain >> "$LOG"
npm run test:service > "$W/prep-ollama-test-service.log" 2>&1; rc=$?; say "test:service exit=$rc (recorded, not a gate on this host): $(grep -E 'Tests  |Error|ECONNREFUSED' "$W/prep-ollama-test-service.log" | head -2 | tr '\n' ' ' | cut -c1-160)"
say "PREP-ollama-GATES-GREEN-EXCEPT-SERVICE"
