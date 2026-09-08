#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
log="$SCR/d7n-heading-direct-proof.log.txt"
test ! -e "$log"
exec > "$log" 2>&1
trap 'status=$?; printf "exit=%s\n" "$status"' EXIT
git -C "$FLEET/guide" rev-parse HEAD
test -z "$(git -C "$FLEET/guide" status --porcelain --untracked-files=all)"
timeout 600 node "$SCR/prove-heading-host.mjs" "$FLEET/guide" "$SCR/d7n-heading-claim.json"
