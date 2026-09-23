#!/bin/bash
# Writes the shared files at 72fdde4 (main after B-PASSIVE-ORDER) into nv-base, for the nv unit's patches.
set -e
B=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-base
for f in src/styles/index.scss tests/setup.ts tests/setup.test.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupServer.test.ts app/browser/constants.ts app/browser/Showcase.ts app/browser/index.ts guides/veneer.md ROADMAP.md; do
  mkdir -p "$(dirname "$B/$f")"; git -C /home/user/veneer show "72fdde4:$f" > "$B/$f"
done
echo based
