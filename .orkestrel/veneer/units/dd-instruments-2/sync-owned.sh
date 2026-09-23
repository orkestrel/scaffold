#!/bin/bash
# Copies the unit's owned source and proof files from the worktree into the validation copy.
W=/home/user/veneer-dd
C=$W/tmp/probe/base
for f in src/styles/components/_dropdown.scss tests/src/styles/components/dropdown.test.ts app/browser/sections/DropdownSection.ts tests/app/browser/sections/DropdownSection.test.ts; do
	mkdir -p "$(dirname "$C/$f")"
	cp "$W/$f" "$C/$f"
done
