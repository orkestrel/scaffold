#!/bin/bash
# Copies the NAV unit's owned files from the worktree into the validation copy tmp/probe/base.
set -e
W=/home/user/veneer-nv
T=$W/tmp/probe/base
for f in src/styles/components/_nav.scss tests/src/styles/components/nav.test.ts app/browser/sections/NavSection.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/CardSection.test.ts; do
  mkdir -p "$(dirname "$T/$f")"; cp "$W/$f" "$T/$f"
done
echo synced
