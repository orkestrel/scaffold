#!/usr/bin/env bash
# The Orchestrator's mutation for J-TYPES audit claim 15: removes every `@example` block from
# CollapseInterface's methods in the J-TYPES worktree, runs the guide parity proof, and restores the
# file from a copy, checking the digest before and after.
set -u
DIR="$(dirname "$0")"
LOG="$DIR/mutate-types-example.log"
: > "$LOG"
cd /c/Users/mikes/WebstormProjects/veneer-types || exit 1
cp src/browser/types.ts "$DIR/types.before.ts"
sha256sum src/browser/types.ts >> "$LOG"
node "$DIR/mutate-types-example.js" >> "$LOG" 2>&1
echo "mutate exit=$?" >> "$LOG"
git diff --stat -- src/browser/types.ts >> "$LOG" 2>&1
npm run test:guides >> "$LOG" 2>&1
echo "test:guides (mutated) exit=$?" >> "$LOG"
cp "$DIR/types.before.ts" src/browser/types.ts
sha256sum src/browser/types.ts >> "$LOG"
git diff --stat -- src/browser/types.ts >> "$LOG" 2>&1
grep -n "exit=\|Tests \|Test Files\|no example\|FAIL\|^[0-9a-f]\{64\}" "$LOG" | cut -c1-200 | head -30
