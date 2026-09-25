#!/usr/bin/env bash
# Builds a scratch copy of the worktree under tmp/j-motion-proofs-b/plant, plants the motion ruling's
# values in the copy's cascade, and runs there, one file at a time, the plant's value probe
# (plant-probe.test.ts.txt, copied in as tests/src/browser/PlantProbe.test.ts) and the four owned
# proofs. The worktree's own files are only read. Node resolves the copy's packages from the
# worktree's node_modules by walking up, so vitest runs through its own entry rather than through npx.
#
# Usage: bash tmp/j-motion-proofs-b/plant.sh [planter] [label] [base]
# The planter defaults to plant.py beside this script, and "none" plants nothing. The label prefixes
# the log names under plant-logs, so each run's logs stay. A base commit, when given, replaces the four
# owned proofs and src/browser/Toast.ts in the copy with that commit's copies, so a control runs the
# unconverted proofs.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
here="$worktree/tmp/j-motion-proofs-b"
planter="${1:-$here/plant.py}"
label="${2:-plant}"
base="${3:-}"
scratch="$here/plant"
logs="$here/plant-logs"
rm -rf "$scratch"
mkdir -p "$scratch" "$logs"
for entry in app configs guides scripts src tests package.json package-lock.json tsconfig.json vite.config.ts; do
	cp -r "$worktree/$entry" "$scratch/$entry"
done
if [ "$planter" != "none" ]; then
	python "$planter" "$scratch" || exit 1
fi
if [ -n "$base" ]; then
	for file in src/browser/Toast.ts tests/src/browser/Collapse.test.ts tests/src/browser/Toast.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Carousel.test.ts; do
		git -C "$worktree" show "$base:$file" > "$scratch/$file" || exit 1
		echo "base $base $file"
	done
fi
cp "$here/plant-probe.test.ts.txt" "$scratch/tests/src/browser/PlantProbe.test.ts"
cd "$scratch" || exit 1
for name in PlantProbe Collapse Toast Tab Carousel; do
	node "$worktree/node_modules/vitest/vitest.mjs" run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$name.test.ts" > "$logs/$label-$name.log.txt" 2>&1
	echo "$name exit $?"
	sed 's/\x1b\[[0-9;]*m//g' "$logs/$label-$name.log.txt" | grep -E "Test Files|Tests  |FAIL |^AssertionError|^[-+] " | head -24
done
cd "$worktree" || exit 1
rm -rf "$scratch"
echo "scratch removed: $([ -e "$scratch" ] && echo no || echo yes)"
