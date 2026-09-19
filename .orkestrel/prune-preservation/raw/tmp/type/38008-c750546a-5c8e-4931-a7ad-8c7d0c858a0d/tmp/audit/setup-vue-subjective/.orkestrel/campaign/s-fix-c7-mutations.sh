#!/usr/bin/env bash
# Orchestrator closure of audit claim 7 against the pin unit S4 landed: apply each named mutation to the emitted
# appJourney factory, run the S1 control commands, restore, and confirm the tree is clean. A green
# reading under a mutation proves the gap the lane named.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
file="src/core/templates.ts"
log="tmp/audit/s-fix-c7-mutations.log.txt"
: > "$log"
controls() {
	local label="$1"
	npm run test:src:core -- --testNamePattern "emits journey wiring|advises a journey selection|partitions root setup|typechecks journey variants" >> "$log" 2>&1
	echo "${label}_core_EXIT=$?"
	npm run test:src:bin -- --testNamePattern "infers journey and setup runtimes" >> "$log" 2>&1
	echo "${label}_bin_EXIT=$?"
	npm run test:config -- --testNamePattern "requires and validates every selected target wrapper" >> "$log" 2>&1
	echo "${label}_config_EXIT=$?"
}
echo "== mutation A: appJourney include widened to the glob =="
line_a="$(grep -n "include: \['tests/app/browser/integration.test.ts'\]" "$file" | cut -d: -f1 | head -1)"
echo "include line: $line_a"
sed -i "${line_a}s#include: \['tests/app/browser/integration.test.ts'\]#include: ['tests/app/browser/**/*.test.ts']#" "$file"
git diff --stat -- "$file"
controls A
sed -i "${line_a}s#include: \['tests/app/browser/\*\*/\*.test.ts'\]#include: ['tests/app/browser/integration.test.ts']#" "$file"
echo "restored A: $(git diff --stat -- "$file" | wc -l) diff lines"
echo "== mutation B: appJourney browser enabled set false =="
line_b="$(awk 'NR>=345 && NR<=375 && /enabled: true/ {print NR; exit}' "$file")"
echo "enabled line: $line_b"
sed -i "${line_b}s#enabled: true#enabled: false#" "$file"
git diff --stat -- "$file"
controls B
sed -i "${line_b}s#enabled: false#enabled: true#" "$file"
echo "restored B: $(git diff --stat -- "$file" | wc -l) diff lines"
echo "== baseline (no mutation) =="
controls base
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end)"
