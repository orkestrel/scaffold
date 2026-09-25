#!/usr/bin/env bash
# Builds a scratch copy of the worktree under tmp/j-motion-proofs-a/plant, plants the motion ruling's
# values in the copy's cascade, and runs the four owned proofs there one file at a time. The worktree's
# own files are only read. Node resolves the copy's packages from the worktree's node_modules by walking
# up, so vitest runs through its own entry rather than through npx.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
scratch="$worktree/tmp/j-motion-proofs-a/plant"
logs="$worktree/tmp/j-motion-proofs-a/plant-logs"
rm -rf "$scratch" "$logs"
mkdir -p "$scratch" "$logs"
for entry in app configs guides scripts src tests package.json package-lock.json tsconfig.json vite.config.ts; do
	cp -r "$worktree/$entry" "$scratch/$entry"
done
python "$worktree/tmp/j-motion-proofs-a/plant.py" "$scratch" || exit 1
cd "$scratch" || exit 1
for name in Modal Offcanvas Backdrop Alert; do
	node "$worktree/node_modules/vitest/vitest.mjs" run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$name.test.ts" > "$logs/$name.log.txt" 2>&1
	echo "$name exit $?"
	grep -E "Test Files|Tests  " "$logs/$name.log.txt"
done
