#!/usr/bin/env bash
# Measures the close-control style proof at the baseline's tip a658879 in a throwaway detached
# checkout, removed after.
set -u
LOG="$(dirname "$0")/baseline-reds-2.log"
: > "$LOG"
VENEER=/c/Users/mikes/WebstormProjects/veneer
TREE=/c/Users/mikes/WebstormProjects/veneer-base
git -C "$VENEER" worktree add --detach "$TREE" a658879 >> "$LOG" 2>&1 || { echo "worktree add failed" >> "$LOG"; cat "$LOG"; exit 1; }
cd "$TREE" || exit 1
npm ci --ignore-scripts >> "$LOG" 2>&1
echo "ci exit=$?" >> "$LOG"
git log --oneline -1 >> "$LOG" 2>&1
npm run build:src:styles >> "$LOG" 2>&1
echo "build:src:styles exit=$?" >> "$LOG"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/close.test.ts >> "$LOG" 2>&1
echo "close exit=$?" >> "$LOG"
cd "$VENEER" || exit 1
git worktree remove --force "$TREE" >> "$LOG" 2>&1
echo "worktree remove exit=$?" >> "$LOG"
grep -n "exit=\|Tests \|Test Files\|FAIL \|AssertionError\|expected" "$LOG" | head -20
