#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
log="$SCR/d7n-guide-config-host.log.txt"
test ! -e "$log"
cd "$FLEET/guide"
exec > "$log" 2>&1
trap 'status=$?; printf "exit=%s\n" "$status"' EXIT
printf '%s\n' '+ npm run test:config -- tests/config.test.ts -t "loads every configured policy rule through the real binary"'
timeout 300 npm run test:config -- tests/config.test.ts -t "loads every configured policy rule through the real binary"
