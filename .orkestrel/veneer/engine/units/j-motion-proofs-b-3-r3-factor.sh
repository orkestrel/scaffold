#!/usr/bin/env bash
# Round 3: builds a scratch copy of the worktree under tmp/j-motion-proofs-b/plant-factor, plants a
# shipped motion factor of 2 through r3-factor-plant.py, and runs the Toast and Tab proofs there, one
# file at a time. The worktree's own files are only read.
#
# Usage: bash tmp/j-motion-proofs-b/r3-factor.sh [label] [base]
# The label prefixes the log names under plant-logs. A base commit, when given, replaces the Toast
# and Tab proofs in the copy with that commit's copies, so a control runs the factor cases that read
# the shipped factor without setting it.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
here="$worktree/tmp/j-motion-proofs-b"
label="${1:-r3-factor}"
base="${2:-}"
scratch="$here/plant-factor"
logs="$here/plant-logs"
rm -rf "$scratch"
mkdir -p "$scratch" "$logs"
for entry in app configs guides scripts src tests package.json package-lock.json tsconfig.json vite.config.ts; do
	cp -r "$worktree/$entry" "$scratch/$entry"
done
python "$here/r3-factor-plant.py" "$scratch" || exit 1
if [ -n "$base" ]; then
	for file in tests/src/browser/Toast.test.ts tests/src/browser/Tab.test.ts; do
		git -C "$worktree" show "$base:$file" > "$scratch/$file" || exit 1
		echo "base $base $file"
	done
fi
cd "$scratch" || exit 1
for name in Toast Tab; do
	node "$worktree/node_modules/vitest/vitest.mjs" run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$name.test.ts" > "$logs/$label-$name.log.txt" 2>&1
	echo "$name exit $?"
	sed 's/\x1b\[[0-9;]*m//g' "$logs/$label-$name.log.txt" | grep -E "Test Files|Tests  |FAIL |^AssertionError|^[-+] |Number " | head -24
done
cd "$worktree" || exit 1
rm -rf "$scratch"
echo "scratch removed: $([ -e "$scratch" ] && echo no || echo yes)"
