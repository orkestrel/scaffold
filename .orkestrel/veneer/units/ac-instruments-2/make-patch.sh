#!/usr/bin/env bash
# Writes the shared-file patch tmp/units/ac-shared-2.patch: the validation copy's diff against its
# base commit (the tree at a658879), limited to the shared files, with an index line per file. Then
# checks that it applies to the worktree, whose tracked files sit at a658879 unchanged.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
WT=/home/user/veneer-ac
OUT="$WT/tmp/units/ac-shared-2.patch"
SHARED=(
	app/browser/Showcase.ts app/browser/constants.ts app/browser/index.ts guides/veneer.md
	src/styles/_tokens.scss src/styles/index.scss tests/app/browser/Showcase.test.ts
	tests/app/browser/index.test.ts tests/app/browser/integration.test.ts tests/conformance.test.ts
	tests/setup.ts tests/setupServer.test.ts tests/setupStyles.test.ts tests/setupStyles.ts
)
cd "$HERE/../../probe/base"
git diff HEAD -- "${SHARED[@]}" > "$OUT"
echo "diff --git headers: $(grep -c '^diff --git' "$OUT"); index lines: $(grep -c '^index ' "$OUT")"
git -C "$WT" apply --check "$OUT"
echo "git apply --check in the worktree: exit $?"
sha256sum "$OUT"
git apply --numstat "$OUT"
