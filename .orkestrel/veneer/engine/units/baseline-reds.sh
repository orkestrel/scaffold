#!/usr/bin/env bash
# Measures whether the red rows the J-SEED landing chain reported are pre-existing at the
# baseline's own tip a658879 on this host: a throwaway detached checkout, installed from the
# lockfile, running the three failing style files and the preflight service file. Removed after.
set -u
LOG="$(dirname "$0")/baseline-reds.log"
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
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-select.test.ts tests/src/styles/components/validation.test.ts >> "$LOG" 2>&1
echo "styles files exit=$?" >> "$LOG"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project service tests/service/tailwind/preflight.test.ts >> "$LOG" 2>&1
echo "preflight exit=$?" >> "$LOG"
cd "$VENEER" || exit 1
git worktree remove --force "$TREE" >> "$LOG" 2>&1
echo "worktree remove exit=$?" >> "$LOG"
grep -n "exit=\|Tests \|Test Files\|FAIL \|AssertionError" "$LOG" | head -40
