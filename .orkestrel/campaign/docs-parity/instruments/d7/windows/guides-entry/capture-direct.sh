#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
git -C "$SCAFFOLD" rev-parse HEAD > "$SCR/d7n-guides-entry-direct.head.txt"
git -C "$SCAFFOLD" diff --binary HEAD -- . ':!.orkestrel/campaign/docs-parity' > "$SCR/d7n-guides-entry-direct.diff.txt"
set +e
git -C "$SCAFFOLD" diff --no-index -- /dev/null scripts/guides.ts >> "$SCR/d7n-guides-entry-direct.diff.txt"
entry_status=$?
set -e
test "$entry_status" = 1
git -C "$SCAFFOLD" status --short > "$SCR/d7n-guides-entry-direct.status.txt"
git -C "$SCAFFOLD" ls-files --stage -- package.json package-lock.json > "$SCR/d7n-guides-entry-direct.index.txt"
git -C "$SCAFFOLD" diff --check
sha256sum "$SCAFFOLD/scripts/guides.ts" > "$SCR/d7n-guides-entry-direct.entry.sha256"

