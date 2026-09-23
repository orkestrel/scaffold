#!/usr/bin/env bash
# Builds or refreshes the probe copy: every tracked file at the worktree's state plus the unit's
# untracked owned files, and a hard-linked node_modules. Shared-file edits live only in the copy.
set -euo pipefail
root=/home/user/veneer-ud
tree=$root/tmp/probe/tree
if [ ! -d "$tree" ]; then
	mkdir -p "$tree"
	(cd "$root" && git ls-files -z | xargs -0 cp --parents -t "$tree")
	cp -al "$root/node_modules" "$tree/node_modules"
fi
# Owned files: copy the worktree's state over the copy.
for path in \
	src/styles/utilities/_display.scss src/styles/utilities/_flex.scss \
	src/styles/utilities/_vertical-align.scss src/styles/components/_stacks.scss \
	tests/src/styles/utilities/display.test.ts tests/src/styles/utilities/flex.test.ts \
	tests/src/styles/utilities/vertical-align.test.ts tests/src/styles/components/stacks.test.ts \
	app/browser/sections/DisplaySection.ts app/browser/sections/FlexSection.ts \
	tests/app/browser/sections/DisplaySection.test.ts tests/app/browser/sections/FlexSection.test.ts; do
	if [ -f "$root/$path" ]; then
		mkdir -p "$(dirname "$tree/$path")"
		cp "$root/$path" "$tree/$path"
	fi
done
echo synced
