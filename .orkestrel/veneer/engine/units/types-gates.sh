#!/usr/bin/env bash
# The Orchestrator's own scoped runs over the J-TYPES worktree, for the audit briefs' "Already established" section.
set -u
LOG="$(dirname "$0")/types-gates.log"
: > "$LOG"
cd /c/Users/mikes/WebstormProjects/veneer-types || exit 1
git log --oneline -1 >> "$LOG" 2>&1
git status --short >> "$LOG" 2>&1
npm run check:src:browser >> "$LOG" 2>&1; echo "check:src:browser exit=$?" >> "$LOG"
npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts >> "$LOG" 2>&1; echo "oxlint exit=$?" >> "$LOG"
npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md >> "$LOG" 2>&1; echo "oxfmt exit=$?" >> "$LOG"
npm run test:guides >> "$LOG" 2>&1; echo "test:guides exit=$?" >> "$LOG"
npm run test:policy >> "$LOG" 2>&1; echo "test:policy exit=$?" >> "$LOG"
npm run test:src:browser -- tests/src/browser/index.test.ts >> "$LOG" 2>&1; echo "index exit=$?" >> "$LOG"
grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS" "$LOG" | head -40
