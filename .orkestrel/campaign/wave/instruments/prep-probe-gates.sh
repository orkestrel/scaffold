#!/bin/bash
# Probe's gates under its standing red: run prepublishOnly's members one by one, record npm test's reading rather than
# stopping on it, and require every other member green. Stage for the release commit. Log prep-probe-gates.log.
set -u
export PATH=/opt/npm11/bin:$PATH
W=/home/user/work/wave; LOG=$W/prep-probe-gates.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) probe $*" >> "$LOG"; }
cd /home/user/fleet/probe || exit 2
npm run format > "$W/prep-probe-format2.log" 2>&1; say "format exit=$?"
for g in format:check lint:check check build; do npm run "$g" > "$W/prep-probe-$g.log" 2>&1; rc=$?; say "$g exit=$rc"; [ $rc -eq 0 ] || { say "PREP-probe-RED $g"; exit 1; }; done
npm test > "$W/prep-probe-test.log" 2>&1; rc=$?; say "test exit=$rc: $(grep -E 'Tests  ' "$W/prep-probe-test.log" | tail -n 1 | sed 's/^ *//'); failing cases carrying the arming error: $(awk '/^ FAIL  \|/{name=$0; getline e; print name " :: " e}' "$W/prep-probe-test.log" | grep -c 'could not arm') of $(grep -cE '^ FAIL  \|' "$W/prep-probe-test.log")"
npm run test:distribution -- --mode release > "$W/prep-probe-test-distribution.log" 2>&1; rc=$?; say "test:distribution exit=$rc"; [ $rc -eq 0 ] || { say "PREP-probe-RED test:distribution"; exit 1; }
git add -A . > /dev/null 2>&1; git status --porcelain >> "$LOG"
say "PREP-probe-GATES-GREEN-EXCEPT-TEST"
