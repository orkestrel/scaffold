#!/usr/bin/env bash
# Builds a scratch copy of the worktree under tmp/j-motion-proofs-a/plant, plants the motion ruling's
# values in the copy's cascade, and runs there, one file at a time, the plant's value probe
# (plant-probe.test.ts.txt, copied in as tests/src/browser/PlantProbe.test.ts) and the four owned
# proofs. The worktree's own files are only read. Node resolves the copy's packages from the
# worktree's node_modules by walking up, so vitest runs through its own entry rather than through npx.
#
# Usage: bash tmp/j-motion-proofs-a/plant.sh [planter] [label]
# The planter defaults to plant.py beside this script; a control passes another planter and a label,
# which prefixes its log names under plant-logs so the plant run's logs stay.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
here="$worktree/tmp/j-motion-proofs-a"
planter="${1:-$here/plant.py}"
label="${2:-plant}"
scratch="$here/plant"
logs="$here/plant-logs"
rm -rf "$scratch"
mkdir -p "$scratch" "$logs"
for entry in app configs guides scripts src tests package.json package-lock.json tsconfig.json vite.config.ts; do
	cp -r "$worktree/$entry" "$scratch/$entry"
done
python "$planter" "$scratch" || exit 1
cp "$here/plant-probe.test.ts.txt" "$scratch/tests/src/browser/PlantProbe.test.ts"
cd "$scratch" || exit 1
for name in PlantProbe Modal Offcanvas Backdrop Alert; do
	node "$worktree/node_modules/vitest/vitest.mjs" run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$name.test.ts" > "$logs/$label-$name.log.txt" 2>&1
	echo "$name exit $?"
	sed 's/\x1b\[[0-9;]*m//g' "$logs/$label-$name.log.txt" | grep -E "Test Files|Tests  |^AssertionError|^[-+] " | head -20
done
cd "$worktree" || exit 1
rm -rf "$scratch"
echo "scratch removed: $([ -e "$scratch" ] && echo no || echo yes)"
