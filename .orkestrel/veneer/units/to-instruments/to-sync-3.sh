#!/usr/bin/env bash
# Round 3: rebuilds the validation copy from 2a3f223, the owned files, and to-shared-2.patch.
set -euo pipefail
W=/home/user/veneer-to
B=$W/tmp/probe/base
if [ ! -d "$B" ]; then
  mkdir -p "$B"
  git -C "$W" archive 2a3f223 | tar -x -C "$B"
  cp -al "$W/node_modules" "$B/node_modules"
  (cd "$B" && git apply "$W/tmp/units/to-shared-2.patch")
fi
for f in src/styles/components/_toast.scss tests/src/styles/components/toast.test.ts app/browser/sections/ToastSection.ts tests/app/browser/sections/ToastSection.test.ts; do
  cp "$W/$f" "$B/$f"
done
