#!/bin/bash
# Lands one accepted wave-2 or wave-3 unit on the Veneer session branch.
# Usage: w23-land.sh <unit> <message-file> <patch> [<patch> ...]
# Applies the unit's accepted patches, in the order given, to its worktree over the owned files, then
# runs land-unit.sh (commit on unit/<unit>, cherry-pick onto the session branch, diff3 resolution of
# the shared append-heavy files against the base 2a3f223), then formats the files the landing touched
# and runs the fast checks. The caller reads the log before the next unit lands. The refresh loop, the
# portfolio regeneration, and the authoritative chain run once per batch, after its last unit.
set -u
U=$1; MSG=$2; shift 2
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
R=/home/user/scaffold/.orkestrel/veneer/units
WT=/home/user/veneer-$U; MAIN=/home/user/veneer
LOG=$R/land-$U.log.txt; : > "$LOG"
export PATH="$S/npm11/node_modules/.bin:$PATH"
{
  echo "=== $U landing at $(date -u +%H:%M:%S) over $(git -C $MAIN rev-parse --short HEAD)"
  for p in "$@"; do git -C "$WT" apply --check "$p" && git -C "$WT" apply "$p" && echo "=== applied $p" || { echo "=== APPLY FAILED $p"; exit 2; }; done
  bash "$R/land-unit.sh" "$U" "$MSG" 2a3f223; rc=$?; echo "=== land-unit exit=$rc"
  [ $rc -eq 0 ] || exit $rc
  cd "$MAIN" || exit 1
  files=$(git diff --name-only HEAD~1 HEAD | grep -E '\.(ts|scss|md|css|html|json)$' | grep -v '^ROADMAP.md$')
  npx oxfmt $files > /dev/null 2>&1; echo "=== oxfmt exit=$?"
  git status --porcelain
  npx oxlint --deny-warnings $(echo "$files" | grep '\.ts$') ; echo "=== oxlint exit=$?"
  npm run check > /dev/null 2>&1; echo "=== check exit=$?"
} >> "$LOG" 2>&1
tail -8 "$LOG"
