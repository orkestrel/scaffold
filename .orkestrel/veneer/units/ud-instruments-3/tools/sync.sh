#!/usr/bin/env bash
# Copies the worktree's owned files over the landing copy. Shared-file edits live only in the copy.
set -euo pipefail
root=/home/user/veneer-ud
land=$root/tmp/probe/land
for path in \
	src/styles/utilities/_display.scss src/styles/utilities/_flex.scss \
	src/styles/utilities/_vertical-align.scss src/styles/components/_stacks.scss \
	tests/src/styles/utilities/display.test.ts tests/src/styles/utilities/flex.test.ts \
	tests/src/styles/utilities/vertical-align.test.ts tests/src/styles/components/stacks.test.ts \
	app/browser/sections/DisplaySection.ts app/browser/sections/FlexSection.ts \
	tests/app/browser/sections/DisplaySection.test.ts tests/app/browser/sections/FlexSection.test.ts; do
	mkdir -p "$(dirname "$land/$path")"
	cp "$root/$path" "$land/$path"
done
echo synced
