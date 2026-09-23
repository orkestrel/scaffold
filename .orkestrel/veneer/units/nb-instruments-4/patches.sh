#!/usr/bin/env bash
# Writes the shared and off-limits patches as unified diffs with an index line per file: a scratch
# repository stages each file at `a658879` in its index, the stage's copy replaces it in the working
# tree, and `git diff` reads the difference. Nothing is committed anywhere.
set -euo pipefail
WT=/home/user/veneer-nb
STAGE=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb4/stage
REPO=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb4/patchrepo
SHARED=(src/styles/index.scss src/styles/_tokens.scss app/browser/constants.ts app/browser/Showcase.ts app/browser/index.ts tests/setup.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupServer.test.ts guides/veneer.md ROADMAP.md)
OFFLIMITS=(src/styles/_mixins.scss src/styles/components/_nav.scss)
rm -rf "$REPO"
git init -q "$REPO"
for path in "${SHARED[@]}" "${OFFLIMITS[@]}"; do
	mkdir -p "$REPO/$(dirname "$path")"
	git -C "$WT" show "a658879:$path" > "$REPO/$path"
done
git -C "$REPO" add -A
for path in "${SHARED[@]}" "${OFFLIMITS[@]}"; do cp "$STAGE/$path" "$REPO/$path"; done
git -C "$REPO" diff --no-color -- "${SHARED[@]}" > "$WT/tmp/units/nb-shared-4.patch"
git -C "$REPO" diff --no-color -- "${OFFLIMITS[@]}" > "$WT/tmp/units/nb-offlimits-4.patch"
git -C "$REPO" diff --no-color --stat -- "${SHARED[@]}"
git -C "$REPO" diff --no-color --stat -- "${OFFLIMITS[@]}"
rm -rf "$REPO"
