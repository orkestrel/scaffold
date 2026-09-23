#!/usr/bin/env bash
# The Orchestrator's own runs over the J-BINDER worktree for the audit briefs' "Already established".
set -u
LOG="$(dirname "$0")/binder-gates.log"
: > "$LOG"
cd /c/Users/mikes/WebstormProjects/veneer-binder || exit 1
git log --oneline -1 >> "$LOG" 2>&1
git status --short >> "$LOG" 2>&1
npm run check:src:browser >> "$LOG" 2>&1; echo "check:src:browser exit=$?" >> "$LOG"
npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser >> "$LOG" 2>&1; echo "oxlint exit=$?" >> "$LOG"
npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md >> "$LOG" 2>&1; echo "oxfmt exit=$?" >> "$LOG"
npm run test:src:browser >> "$LOG" 2>&1; echo "test:src:browser exit=$?" >> "$LOG"
npm run test:guides >> "$LOG" 2>&1; echo "test:guides exit=$?" >> "$LOG"
npm run test:policy >> "$LOG" 2>&1; echo "test:policy exit=$?" >> "$LOG"
npm run build:src:browser >> "$LOG" 2>&1; echo "build:src:browser exit=$?" >> "$LOG"
grep -n "exit=\|Tests \|Test Files\|FAIL \|surface name\|error TS\|Unable to follow" "$LOG" | head -40
