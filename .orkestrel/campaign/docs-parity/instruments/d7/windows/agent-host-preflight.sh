#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

TARGET="$FLEET/agent"
LOG="$SCR/d7n-agent-host-preflight.log.txt"
HEAD=54e71991c6189b8fd1e5895421f3f3723407bf1b
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
node "$SCR/agent-audit-controls.mjs" "$TARGET"
