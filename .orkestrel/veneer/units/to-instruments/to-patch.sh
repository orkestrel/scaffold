#!/usr/bin/env bash
# Writes the unit's shared-file patch: each shared file in the validation copy diffed against 2a3f223.
set -euo pipefail
W=/home/user/veneer-to
B=$W/tmp/probe/base
O=$W/tmp/units/to-shared.patch
R=$(mktemp -d)
git -C "$W" archive 2a3f223 | tar -x -C "$R"
FILES="src/styles/index.scss tests/setupStyles.ts tests/setupStyles.test.ts tests/setup.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupServer.test.ts app/browser/constants.ts app/browser/Showcase.ts app/browser/index.ts guides/veneer.md"
: > "$O"
for f in $FILES; do
  (cd / && diff -u --label "a/$f" --label "b/$f" "$R/$f" "$B/$f") >> "$O" || true
done
rm -rf "$R"
grep -c '^+++ ' "$O"
