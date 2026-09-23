#!/usr/bin/env bash
# Settles J-BINDER audit claim 10's red-first sub-claim: runs the binder's rewritten Delegate proof
# against the seed implementation at 1868007 in a throwaway detached checkout (the negative
# control), then removes the checkout. The green side is the Orchestrator's binder-gates run.
set -u
LOG="$(dirname "$0")/binder-seed-red.log"
: > "$LOG"
VENEER=/c/Users/mikes/WebstormProjects/veneer
TREE=/c/Users/mikes/WebstormProjects/veneer-seedcheck
git -C "$VENEER" worktree add --detach "$TREE" 1868007 >> "$LOG" 2>&1 || { echo "worktree add failed" >> "$LOG"; cat "$LOG"; exit 1; }
cd "$TREE" || exit 1
npm ci --ignore-scripts >> "$LOG" 2>&1
echo "ci exit=$?" >> "$LOG"
git log --oneline -1 >> "$LOG" 2>&1
cp /c/Users/mikes/WebstormProjects/veneer-binder/tests/src/browser/Delegate.test.ts tests/src/browser/Delegate.test.ts
git status --short >> "$LOG" 2>&1
npm run test:src:browser -- tests/src/browser/Delegate.test.ts >> "$LOG" 2>&1
echo "seed delegate exit=$?" >> "$LOG"
cd "$VENEER" || exit 1
git worktree remove --force "$TREE" >> "$LOG" 2>&1
echo "worktree remove exit=$?" >> "$LOG"
grep -n "exit=\|Tests \|Test Files\|FAIL \|AssertionError\|Error:" "$LOG" | sed 's/\x1b\[[0-9;]*m//g' | head -40
