#!/usr/bin/env bash
# Writes the shared-file patch: each shared file in the validation copy against the same file at c3ac297.
set -u
ROOT=/home/user/veneer-ca/tmp/probe
OUT=/home/user/veneer-ca/tmp/units/ca-shared.patch
: > "$OUT"
for f in src/styles/index.scss app/browser/constants.ts app/browser/Showcase.ts app/browser/index.ts \
	tests/setup.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/app/browser/integration.test.ts \
	tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts \
	tests/setupServer.test.ts guides/veneer.md; do
	diff -u --label "a/$f" --label "b/$f" "$ROOT/pristine/$f" "$ROOT/base/$f" >> "$OUT"
done
wc -l "$OUT"
