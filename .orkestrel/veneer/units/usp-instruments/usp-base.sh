#!/usr/bin/env bash
# Builds the validation copy at tmp/probe/base from 2a3f223, hard-links node_modules, and syncs the
# owned files over it. Shared-file edits are made in the copy itself and extracted as a patch.
set -euo pipefail
cd /home/user/veneer-usp
if [ ! -d tmp/probe/base ]; then
	mkdir -p tmp/probe/base
	git archive 2a3f223 | tar -x -C tmp/probe/base
	cp -al node_modules tmp/probe/base/node_modules
fi
for f in src/styles/utilities/_spacing.scss src/styles/utilities/_interaction.scss \
	tests/src/styles/utilities/spacing.test.ts tests/src/styles/utilities/interaction.test.ts \
	app/browser/sections/SpacingSection.ts app/browser/sections/InteractionSection.ts \
	tests/app/browser/sections/SpacingSection.test.ts tests/app/browser/sections/InteractionSection.test.ts; do
	if [ -f "$f" ]; then mkdir -p "tmp/probe/base/$(dirname "$f")"; cp "$f" "tmp/probe/base/$f"; fi
done
echo synced
