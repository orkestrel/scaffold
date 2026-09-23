#!/bin/bash
# Copies the unit's owned files from the worktree into the staging copy.
set -e
W=/home/user/veneer-nv
T=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-stage
for f in src/styles/components/_nav.scss tests/src/styles/components/nav.test.ts app/browser/sections/NavSection.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/CardSection.test.ts; do
  if [ -f "$W/$f" ]; then mkdir -p "$(dirname "$T/$f")"; cp "$W/$f" "$T/$f"; fi
done
echo synced
