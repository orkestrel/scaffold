#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
log="$SCR/d7n-probe-heavy-host.log.txt"
test ! -e "$log"
exec > "$log" 2>&1
trap 'status=$?; printf "exit=%s\n" "$status"' EXIT
git -C "$FLEET/probe" rev-parse HEAD
git -C "$FLEET/probe" status --short
test -z "$(git -C "$FLEET/probe" status --porcelain --untracked-files=all)"
cd "$FLEET/probe"
printf '%s\n' 'npm run test:src:server -- tests/src/server/Probe.test.ts -t "replaces a type stage its deadline destroyed|serializes project resolution against a live type inspection"'
timeout 600 npm run test:src:server -- tests/src/server/Probe.test.ts -t 'replaces a type stage its deadline destroyed|serializes project resolution against a live type inspection'
