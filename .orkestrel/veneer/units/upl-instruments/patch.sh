#!/usr/bin/env bash
# Writes the shared-file patch (unified diff against e4e6a40) from the validation copy, and the
# unlisted consumer-proof patch beside it.
set -euo pipefail
cd /home/user/veneer-upl/tmp/probe
out=/home/user/veneer-upl/tmp/units/upl-shared.patch
extra=/home/user/veneer-upl/tmp/units/upl-consumer.patch
: > "$out"
for path in \
	src/styles/index.scss \
	app/browser/constants.ts \
	app/browser/Showcase.ts \
	app/browser/index.ts \
	tests/setup.ts \
	tests/conformance.test.ts \
	tests/setupServer.test.ts \
	tests/app/browser/Showcase.test.ts \
	tests/app/browser/index.test.ts \
	tests/app/browser/integration.test.ts \
	tests/setup.css \
	tests/fixtures/tailwind/consumer.css \
	tests/fixtures/tailwind/preflight.css \
	tests/fixtures/tailwind/markup.html \
	guides/veneer.md; do
	diff -u --label "a/$path" --label "b/$path" "base/$path" "land/$path" >> "$out" || true
done
path=tests/service/tailwind/consumer.test.ts
diff -u --label "a/$path" --label "b/$path" "base/$path" "land/$path" > "$extra" || true
wc -l "$out" "$extra"
