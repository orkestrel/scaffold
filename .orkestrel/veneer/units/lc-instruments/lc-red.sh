#!/usr/bin/env bash
# lc-red.sh: runs every owned proof, one file at a time, against the tree without the fix. It
# mirrors the worktree into the scratch copy with the shared patch, puts back each owned style
# partial at ac74459, and logs each file's run to tmp/units/lc-red-<file>.log.txt.
set -uo pipefail
root=/home/user/veneer-lc
scratch=$root/tmp/probe/lc-scratch
bash "$root/tmp/units/lc-sync.sh"
cd "$root"
for partial in src/styles/_tokens.scss src/styles/_mixins.scss src/styles/_theme.scss src/styles/components/_button.scss src/styles/utilities/_color-bg.scss src/styles/utilities/_link.scss src/styles/components/_validation.scss; do
	git show "ac74459:$partial" > "$scratch/$partial"
done
for file in tests/src/styles/mixins.test.ts tests/src/styles/components/button.test.ts tests/src/styles/elements/button.test.ts tests/src/styles/utilities/color-bg.test.ts tests/src/styles/utilities/link.test.ts tests/src/styles/components/validation.test.ts; do
	name=$(basename "$(dirname "$file")")-$(basename "$file" .test.ts)
	bash "$root/tmp/units/lc-run.sh" "lc-red-$name.log.txt" "$file"
done
