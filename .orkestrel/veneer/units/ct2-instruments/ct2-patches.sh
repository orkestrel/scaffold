#!/usr/bin/env bash
# Writes the round-2 review evidence: the shared patch against ac74459 from the scratch copy, the
# owned diff and status from the worktree, and checks that the shared patch applies to the worktree.
set -euo pipefail
root=/home/user/veneer-ct2
base="$root/tmp/probe/ct2-base"
copy="$root/tmp/probe/ct2-copy"
units="$root/tmp/units"
test -d "$base" && test -d "$copy" || { echo 'refusing: a scratch tree is missing' >&2; exit 2; }
shared=(guides/veneer.md tests/conformance.test.ts tests/setup.ts tests/setup.test.ts tests/setupStyles.ts tests/setupStyles.test.ts)
: > "$units/ct2-shared.patch"
for file in "${shared[@]}"; do
	diff -u --label "a/$file" --label "b/$file" "$base/$file" "$copy/$file" >> "$units/ct2-shared.patch" || test $? -eq 1
done
git -C "$root" diff ac74459 > "$units/ct2.diff"
git -C "$root" status --short > "$units/ct2-status.txt"
git -C "$root" apply --check "$units/ct2-shared.patch" && echo 'shared patch applies to the worktree'
# Every owned file in the copy matches the worktree.
for file in tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts tests/setupServer.ts tests/setupServer.test.ts tests/app/browser/sections/ColorModeSection.test.ts; do
	cmp "$root/$file" "$copy/$file"
done
# Every other file in the copy matches the base, so the copy is ac74459 plus the two sets.
diff -rq --exclude=node_modules --exclude=dist --exclude=.git --exclude=tmp "$base" "$copy" | sort || true
sha256sum "$units/ct2-shared.patch" "$units/ct2.diff" "$units/ct2-status.txt"
