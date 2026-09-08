#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

TARGET="$FLEET/ollama"
LOG="$SCR/d7n-ollama-host-preflight.log.txt"
HEAD=98e9c3402f4ce7ac45c4d5b16b37da42399f9ca9
test ! -e "$LOG"
exec > "$LOG" 2>&1
trap 'status=$?; printf "exit=%s\n" "$status"' EXIT
actual=$(git -C "$TARGET" rev-parse HEAD)
printf 'HEAD %s\n' "$actual"
test "$actual" = "$HEAD"
git -C "$TARGET" status --short
test -z "$(git -C "$TARGET" status --porcelain --untracked-files=all)"
hash=$(sha256sum "$TARGET/node_modules/@orkestrel/guide/dist/src/core/index.js" | awk '{print $1}')
printf 'guide sha256 %s\n' "$hash"
test "${hash:0:8}" = 2b76b363
node "$SCR/ollama-audit-controls.mjs" "$TARGET"
