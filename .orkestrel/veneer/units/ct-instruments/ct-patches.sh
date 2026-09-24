#!/usr/bin/env bash
# Writes the THEME unit's review evidence: ct-shared.patch and ct-unscoped.patch as unified diffs of
# the scratch copy tmp/probe/ct-copy against the pristine 2bf1142 extract tmp/probe/ct-base, ct.diff
# as the worktree's owned changes (tracked edits and the untracked owned files), and ct-status.txt.
set -u
ROOT=/home/user/veneer-ct
OUT=$ROOT/tmp/units
cd "$ROOT/tmp/probe" || exit 2
# Refuse to write anything when either tree is missing, so a run after the copies are deleted cannot
# truncate the patches it was run to refresh.
[ -d ct-base ] && [ -d ct-copy ] || { echo "ct-base or ct-copy is missing" >&2; exit 3; }
SHARED="app/browser/Showcase.ts app/browser/constants.ts app/browser/index.ts guides/veneer.md tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/app/browser/integration.test.ts tests/conformance.test.ts tests/setup.ts tests/setupStyles.test.ts tests/setupStyles.ts"
UNSCOPED="tests/src/styles/components/alert.test.ts tests/src/styles/components/button.test.ts tests/src/styles/elements/a.test.ts"
: > "$OUT/ct-shared.patch"
for f in $SHARED; do
	diff -u --label "a/$f" --label "b/$f" "ct-base/$f" "ct-copy/$f" >> "$OUT/ct-shared.patch"
done
: > "$OUT/ct-unscoped.patch"
for f in $UNSCOPED; do
	diff -u --label "a/$f" --label "b/$f" "ct-base/$f" "ct-copy/$f" >> "$OUT/ct-unscoped.patch"
done
cd "$ROOT" || exit 2
git diff > "$OUT/ct.diff"
for f in $(git ls-files --others --exclude-standard); do
	diff -u --label /dev/null --label "b/$f" /dev/null "$f" >> "$OUT/ct.diff"
done
git status --short > "$OUT/ct-status.txt"
