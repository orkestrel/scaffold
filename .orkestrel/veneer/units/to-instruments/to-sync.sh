#!/usr/bin/env bash
# Copies the unit's owned files from the worktree into the validation copy.
set -euo pipefail
W=/home/user/veneer-to
B=$W/tmp/probe/base
for f in src/styles/components/_toast.scss tests/src/styles/components/toast.test.ts app/browser/sections/ToastSection.ts tests/app/browser/sections/ToastSection.test.ts; do
  if [ -f "$W/$f" ]; then mkdir -p "$(dirname "$B/$f")"; cp "$W/$f" "$B/$f"; fi
done
