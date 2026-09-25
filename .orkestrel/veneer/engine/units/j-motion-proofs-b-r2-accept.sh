#!/usr/bin/env bash
# Round 2 acceptance: runs the read-only gates, the scoped Carousel proof, the guides project, and
# the app suite one after another, writing each log under r2-logs/ and printing each exit status
# with its summary lines.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
logs="$worktree/tmp/j-motion-proofs-b/r2-logs"
mkdir -p "$logs"
cd "$worktree" || exit 1
strip() { sed 's/\x1b\[[0-9;]*m//g' "$1"; }
npm run check > "$logs/accept-check.log.txt" 2>&1
echo "npm run check exit $?"
npm run lint:check > "$logs/accept-lint.log.txt" 2>&1
echo "npm run lint:check exit $?"
strip "$logs/accept-lint.log.txt" | grep -E "Found|warning|error" | head -5
npm run format:check > "$logs/accept-format.log.txt" 2>&1
echo "npm run format:check exit $?"
strip "$logs/accept-format.log.txt" | tail -3
git diff --check
echo "git diff --check exit $?"
npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Carousel.test.ts > "$logs/accept-carousel.log.txt" 2>&1
echo "Carousel exit $?"
strip "$logs/accept-carousel.log.txt" | grep -E "Test Files|Tests  "
npm run test:guides > "$logs/accept-guides.log.txt" 2>&1
echo "npm run test:guides exit $?"
strip "$logs/accept-guides.log.txt" | grep -E "Test Files|Tests  "
npm run test:app > "$logs/accept-app.log.txt" 2>&1
echo "npm run test:app exit $?"
strip "$logs/accept-app.log.txt" | grep -E "Test Files|Tests  |FAIL "
