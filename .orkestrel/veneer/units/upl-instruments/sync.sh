#!/usr/bin/env bash
# Copies every owned file from the worktree into the validation copy.
set -euo pipefail
cd /home/user/veneer-upl
for path in \
	src/styles/utilities/_sizing.scss \
	src/styles/utilities/_position.scss \
	src/styles/utilities/_visually-hidden.scss \
	src/styles/utilities/_visibility.scss \
	src/styles/components/_position.scss \
	app/browser/styles/_shell.scss \
	tests/src/styles/utilities/sizing.test.ts \
	tests/src/styles/utilities/position.test.ts \
	tests/src/styles/utilities/visually-hidden.test.ts \
	tests/src/styles/utilities/visibility.test.ts \
	tests/src/styles/components/position.test.ts \
	app/browser/sections/SizingSection.ts \
	app/browser/sections/PositionSection.ts \
	app/browser/sections/VisibilitySection.ts \
	tests/app/browser/sections/SizingSection.test.ts \
	tests/app/browser/sections/PositionSection.test.ts \
	tests/app/browser/sections/VisibilitySection.test.ts; do
	if [ -f "$path" ]; then
		mkdir -p "tmp/probe/land/$(dirname "$path")"
		cp "$path" "tmp/probe/land/$path"
	fi
done
echo synced
