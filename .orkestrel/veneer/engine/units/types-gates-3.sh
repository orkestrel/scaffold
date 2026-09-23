#!/usr/bin/env bash
# The Orchestrator's own runs over the J-TYPES round-3 worktree: the scoped browser build (the gate that failed on main) first, then the scoped checks.
set -u
LOG="$(dirname "$0")/types-gates-3.log"
: > "$LOG"
cd /c/Users/mikes/WebstormProjects/veneer-types || exit 1
git log --oneline -1 >> "$LOG" 2>&1
git status --short >> "$LOG" 2>&1
npm run build:src:browser >> "$LOG" 2>&1; echo "build:src:browser exit=$?" >> "$LOG"
npm run check:src:browser >> "$LOG" 2>&1; echo "check:src:browser exit=$?" >> "$LOG"
npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts >> "$LOG" 2>&1; echo "oxlint exit=$?" >> "$LOG"
npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md >> "$LOG" 2>&1; echo "oxfmt exit=$?" >> "$LOG"
npm run test:guides >> "$LOG" 2>&1; echo "test:guides exit=$?" >> "$LOG"
npm run test:policy >> "$LOG" 2>&1; echo "test:policy exit=$?" >> "$LOG"
grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS\|Unable to follow\|rollup" "$LOG" | head -30
