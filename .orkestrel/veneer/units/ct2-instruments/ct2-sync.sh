#!/usr/bin/env bash
# Copies the unit's owned files from the worktree into the scratch copy.
set -euo pipefail
root=/home/user/veneer-ct2
copy="$root/tmp/probe/ct2-copy"
for file in tests/src/styles/theme.test.ts tests/src/styles/tokens.test.ts tests/src/styles/components/alert.test.ts tests/setupServer.ts tests/setupServer.test.ts tests/app/browser/sections/ColorModeSection.test.ts; do
	cp "$root/$file" "$copy/$file"
done
echo synced
