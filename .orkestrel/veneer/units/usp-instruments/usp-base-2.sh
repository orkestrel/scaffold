#!/usr/bin/env bash
# Round 2: builds the validation copy at tmp/probe/base from 2a3f223 with the round-1 shared patch
# applied (once, at creation) and a pristine extract at tmp/probe/orig, then syncs the owned files.
set -euo pipefail
cd /home/user/veneer-usp
if [ ! -d tmp/probe/base ]; then
	mkdir -p tmp/probe/base tmp/probe/orig
	git archive 2a3f223 | tar -x -C tmp/probe/orig
	git archive 2a3f223 | tar -x -C tmp/probe/base
	(cd tmp/probe/base && patch -p1 -s < /home/user/veneer-usp/tmp/units/usp-shared.patch)
	cp -al node_modules tmp/probe/base/node_modules
fi
for f in src/styles/utilities/_spacing.scss src/styles/utilities/_interaction.scss \
	tests/src/styles/utilities/spacing.test.ts tests/src/styles/utilities/interaction.test.ts \
	app/browser/sections/SpacingSection.ts app/browser/sections/InteractionSection.ts \
	tests/app/browser/sections/SpacingSection.test.ts tests/app/browser/sections/InteractionSection.test.ts; do
	mkdir -p "tmp/probe/base/$(dirname "$f")"; cp "$f" "tmp/probe/base/$f"
done
echo synced
