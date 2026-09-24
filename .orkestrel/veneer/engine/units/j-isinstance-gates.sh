#!/usr/bin/env bash
# The Orchestrator's own gate run over Veneer main after the J-ISINSTANCE builder returned (the unit's
# edits uncommitted): the scoped gates, then the landing-grade chain for a src/browser-only change
# (format, lint, the tree-wide typecheck, the build, test:src, test:app, test:guides, test:policy,
# test:conformance, test:setup), each exit read; the standing host rows (E5) are the only admitted reds.
set -u
S="$(dirname "$0")"
LOG="$S/isinstance-gates.log"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
: > "$LOG"
cd /c/Users/mikes/WebstormProjects/veneer || exit 1
echo "# J-ISINSTANCE — the Orchestrator's own gate run on main (2026-09-24)" >> "$LOG"
git log --oneline -1 >> "$LOG" 2>&1
git status --short >> "$LOG" 2>&1
npm run check:src:browser >> "$LOG" 2>&1; echo "check:src:browser exit=$?" >> "$LOG"
npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser >> "$LOG" 2>&1; echo "oxlint exit=$?" >> "$LOG"
npm run format:check >> "$LOG" 2>&1; echo "format:check exit=$?" >> "$LOG"
npm run lint:check >> "$LOG" 2>&1; echo "lint:check exit=$?" >> "$LOG"
npm run check >> "$LOG" 2>&1; echo "check exit=$?" >> "$LOG"
npm run build >> "$LOG" 2>&1; echo "build exit=$?" >> "$LOG"
npm run test:src >> "$LOG" 2>&1; echo "test:src exit=$?" >> "$LOG"
npm run test:app >> "$LOG" 2>&1; echo "test:app exit=$?" >> "$LOG"
npm run test:guides >> "$LOG" 2>&1; echo "test:guides exit=$?" >> "$LOG"
npm run test:policy >> "$LOG" 2>&1; echo "test:policy exit=$?" >> "$LOG"
npm run test:conformance >> "$LOG" 2>&1; echo "test:conformance exit=$?" >> "$LOG"
npm run test:setup >> "$LOG" 2>&1; echo "test:setup exit=$?" >> "$LOG"
sed 's/\x1b\[[0-9;]*m//g' "$LOG" > "$U/j-isinstance-gates.log.txt"
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS\|×" | head -60
