#!/usr/bin/env bash
# Writes the report-only patches from the edited copies under tmp/j-motion-proofs-b/patched, applies
# them to a scratch copy of the worktree, and runs there the format check and lint on the patched
# files, the typecheck, the guide parity project, and the showcase file the test patch changes. The
# worktree's own files are only read, and the scratch copy is removed at the end.
#
# Usage: bash tmp/j-motion-proofs-b/verify-patches.sh
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
here="$worktree/tmp/j-motion-proofs-b"
patched="$here/patched"
scratch="$here/verify"
logs="$here/plant-logs"
files="guides/veneer.md src/browser/types.ts tests/app/browser/sections/EngineSection.test.ts"
for file in $files; do
	name="$(basename "$file")"
	diff -u --label "a/$file" --label "b/$file" "$worktree/$file" "$patched/$file" > "$here/$name.patch"
	echo "$name.patch $(wc -l < "$here/$name.patch") lines"
done
rm -rf "$scratch"
mkdir -p "$scratch" "$logs"
for entry in app configs guides scripts src tests package.json package-lock.json tsconfig.json vite.config.ts .oxfmtrc.json .oxlintrc.json README.md; do
	cp -r "$worktree/$entry" "$scratch/$entry"
done
cd "$scratch" || exit 1
for file in $files; do
	patch -p1 --quiet < "$here/$(basename "$file").patch" || exit 1
	echo "applied $file"
done
node "$worktree/node_modules/oxfmt/bin/oxfmt" --config .oxfmtrc.json --check $files > "$logs/verify-format.log.txt" 2>&1
echo "format check exit $?"
tail -2 "$logs/verify-format.log.txt"
node "$worktree/node_modules/oxlint/bin/oxlint" --config .oxlintrc.json --deny-warnings src/browser/types.ts tests/app/browser/sections/EngineSection.test.ts > "$logs/verify-lint.log.txt" 2>&1
echo "lint exit $?"
tail -2 "$logs/verify-lint.log.txt"
npm run check > "$logs/verify-check.log.txt" 2>&1
echo "npm run check exit $?"
node "$worktree/node_modules/vitest/vitest.mjs" run --config vite.config.ts --no-cache --project guides > "$logs/verify-guides.log.txt" 2>&1
echo "guides exit $?"
sed 's/\x1b\[[0-9;]*m//g' "$logs/verify-guides.log.txt" | grep -E "Test Files|Tests  |FAIL |^AssertionError" | head -10
npm run test:guides > "$logs/verify-test-guides.log.txt" 2>&1
echo "npm run test:guides exit $?"
tail -4 "$logs/verify-test-guides.log.txt"
node "$worktree/node_modules/vitest/vitest.mjs" run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/EngineSection.test.ts > "$logs/verify-engine-section.log.txt" 2>&1
echo "EngineSection exit $?"
sed 's/\x1b\[[0-9;]*m//g' "$logs/verify-engine-section.log.txt" | grep -E "Test Files|Tests  |FAIL |^AssertionError" | head -10
cd "$worktree" || exit 1
rm -rf "$scratch"
echo "scratch removed: $([ -e "$scratch" ] && echo no || echo yes)"
