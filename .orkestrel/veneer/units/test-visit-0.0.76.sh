#!/usr/bin/env bash
# Test visit after the 0.0.76 re-pin: declare the planned script, repair the five stale planned
# paths, refresh the guide mirror, audit. Orchestrator's tracked command; gates follow by verifier.
cd "C:/Users/mikes/WebstormProjects/test" || exit 9
LOG="C:/Users/mikes/WebstormProjects/test/tmp/test-visit-0.0.76.log.txt"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) visit start" > "$LOG"
node tmp/test-visit-0.0.76.mjs >> "$LOG" 2>&1
echo "exit[manifest]=$?" >> "$LOG"
node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --target . >> "$LOG" 2>&1
echo "exit[repair]=$?" >> "$LOG"
node node_modules/@orkestrel/scaffold/dist/bin/main.js catalog --target . >> "$LOG" 2>&1
echo "exit[catalog]=$?" >> "$LOG"
node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target . >> "$LOG" 2>&1
echo "exit[audit]=$?" >> "$LOG"
echo "== status" >> "$LOG"
git status --porcelain | grep -v '^??' >> "$LOG"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) visit end" >> "$LOG"
grep -E "^exit\[|written|drifted|manifest:" "$LOG"
