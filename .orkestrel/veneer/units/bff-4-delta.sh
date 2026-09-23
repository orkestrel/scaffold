#!/bin/bash
# Produce the bff round-4 delta: rebuild the round-3 tree (ccb10a7 + bff-2.diff) in the scratchpad, then diff it against the worktree over the files rounds 1 to 4 own. Outputs: units/bff-4.diff, units/bff-4-status.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
FILES="guides/veneer.md src/styles/_mixins.scss src/styles/components/_form-check.scss src/styles/components/_form-control.scss src/styles/components/_form-range.scss src/styles/components/_form-select.scss src/styles/components/_validation.scss tests/setupStyles.test.ts tests/conformance.test.ts tests/src/styles/components/form-check.test.ts tests/src/styles/components/form-control.test.ts tests/src/styles/components/form-range.test.ts tests/src/styles/components/form-select.test.ts tests/src/styles/components/validation.test.ts tests/src/styles/mixins.test.ts"
rm -rf "$S/bff-r3"; mkdir -p "$S/bff-r3"
git -C /home/user/veneer archive ccb10a7 $FILES | tar -x -C "$S/bff-r3"
(cd "$S/bff-r3" && git apply "$U/bff-2.diff") || { echo "apply failed"; exit 1; }
: > "$U/bff-4.diff"
for f in $FILES; do diff -u --label "round3/$f" --label "round4/$f" "$S/bff-r3/$f" "/home/user/veneer-bff/$f" >> "$U/bff-4.diff"; done
git -C /home/user/veneer-bff status --short > "$U/bff-4-status.txt"
git -C /home/user/veneer-bff diff --stat | tail -1 >> "$U/bff-4-status.txt"
grep -c '^--- round3/' "$U/bff-4.diff"; wc -l "$U/bff-4.diff"; cat "$U/bff-4-status.txt"
