#!/usr/bin/env bash
# The Orchestrator's own gate run over the J-DEMO worktree after its writer returns: the tree-wide
# typecheck, lint, format, the app project, guide parity, policy, and the app build, then the review
# evidence (git diff HEAD with new files intent-to-add, the status). Usage: bash demo-gates.sh
set -u
S="$(dirname "$0")"
LOG="$S/demo-gates.log"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/demo
: > "$LOG"
cd "$TREE" || exit 1
echo "# J-DEMO round 1 — the Orchestrator's own gate run (2026-09-24)" >> "$LOG"
git log --oneline -1 >> "$LOG" 2>&1
git status --short >> "$LOG" 2>&1
npm run check >> "$LOG" 2>&1; echo "check exit=$?" >> "$LOG"
npm run lint:check >> "$LOG" 2>&1; echo "lint:check exit=$?" >> "$LOG"
npm run format:check >> "$LOG" 2>&1; echo "format:check exit=$?" >> "$LOG"
npm run test:app >> "$LOG" 2>&1; echo "test:app exit=$?" >> "$LOG"
npm run test:guides >> "$LOG" 2>&1; echo "test:guides exit=$?" >> "$LOG"
npm run test:policy >> "$LOG" 2>&1; echo "test:policy exit=$?" >> "$LOG"
npm run build:app >> "$LOG" 2>&1; echo "build:app exit=$?" >> "$LOG"
echo "--- review evidence" >> "$LOG"
git add -N -- app/browser tests/app/browser guides/veneer.md >> "$LOG" 2>&1
git diff HEAD > "$U/j-demo.diff"; echo "diff lines: $(grep -c '' "$U/j-demo.diff")" >> "$LOG"
git status --short > "$U/j-demo-status.txt"; cat "$U/j-demo-status.txt" >> "$LOG"
sed 's/\x1b\[[0-9;]*m//g' "$LOG" > "$U/j-demo-gates.log.txt"
sed 's/\x1b\[[0-9;]*m//g' "$LOG" | grep -n "exit=\|Tests \|Test Files\|FAIL \|error TS\|✗\|×\|diff lines\|^[0-9]*:[ AM?][ AMD?] " | head -40
