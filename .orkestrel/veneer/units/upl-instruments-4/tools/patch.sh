#!/usr/bin/env bash
# Writes the shared-file patch and the unlisted-file patch as `git diff` output from the land copy,
# whose base commit carries e4e6a40's tree, so every file section carries an `index` line.
set -euo pipefail
W=/home/user/veneer-upl
cd "$W/tmp/probe/land"
git diff -- \
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
	tests/service/tailwind/consumer.test.ts \
	tests/setupStyles.ts \
	tests/setupStyles.test.ts \
	tests/setupBrowser.ts \
	guides/veneer.md > "$W/tmp/units/upl-shared-4.patch"
git diff -- tests/setupBrowser.test.ts > "$W/tmp/units/upl-unlisted-4.patch"
git diff --stat -- . ':!tests/setupBrowser.test.ts' | tail -1
git diff --name-only | sort
