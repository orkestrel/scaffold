#!/bin/bash
# Copies the TOGGLES unit's owned files from the worktree into the validation copy tmp/probe/base
# (a658879 extracted with git archive, node_modules hard-linked, the shared edits written in place).
W=/home/user/veneer-tg
T=$W/tmp/probe/base
for f in src/styles/components/_button-group.scss src/styles/components/_input-group.scss tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts; do
	cp "$W/$f" "$T/$f"
done
echo synced
