#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
target="$SCR/scaffold-guides-entry"
test "$(git -C "$target" rev-parse HEAD)" = 9b3003d14ca73c5218a7cb2a968f8b35600d3280
git -C "$target" diff --binary HEAD > "$SCR/d7n-guides-entry-final.diff.txt"
set +e
git -C "$target" diff --no-index -- /dev/null scripts/guides.ts >> "$SCR/d7n-guides-entry-final.diff.txt"
entry_status=$?
set -e
test "$entry_status" = 1
git -C "$target" status --short > "$SCR/d7n-guides-entry-final.status.txt"
git -C "$target" diff --stat HEAD > "$SCR/d7n-guides-entry-final.stat.txt"
git -C "$target" diff --check
sha256sum "$target/scripts/guides.ts" > "$SCR/d7n-guides-entry-final.entry.sha256"
