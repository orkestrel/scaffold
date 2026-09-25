#!/usr/bin/env bash
# Builds a scratch copy of the worktree under tmp/j-motion-proofs-b/probe, copies one probe file into
# it as tests/src/browser/<Name>.test.ts, runs it, and removes the copy. The worktree's own files are
# only read.
#
# Usage: bash tmp/j-motion-proofs-b/probe.sh <probe file> <Name> [planter]
# The planter, when given, plants the scratch copy's cascade before the run.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
here="$worktree/tmp/j-motion-proofs-b"
probe="$1"
name="$2"
planter="${3:-none}"
scratch="$here/probe"
logs="$here/plant-logs"
rm -rf "$scratch"
mkdir -p "$scratch" "$logs"
for entry in app configs guides scripts src tests package.json package-lock.json tsconfig.json vite.config.ts; do
	cp -r "$worktree/$entry" "$scratch/$entry"
done
if [ "$planter" != "none" ]; then
	python "$planter" "$scratch" || exit 1
fi
cp "$probe" "$scratch/tests/src/browser/$name.test.ts"
cd "$scratch" || exit 1
node "$worktree/node_modules/vitest/vitest.mjs" run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$name.test.ts" > "$logs/probe-$name.log.txt" 2>&1
echo "$name exit $?"
sed 's/\x1b\[[0-9;]*m//g' "$logs/probe-$name.log.txt" | grep -E "Test Files|Tests  |FAIL |^AssertionError|^[-+] |^ +\[|^ +\"|^ +[0-9]" | head -40
cd "$worktree" || exit 1
rm -rf "$scratch"
echo "scratch removed: $([ -e "$scratch" ] && echo no || echo yes)"
