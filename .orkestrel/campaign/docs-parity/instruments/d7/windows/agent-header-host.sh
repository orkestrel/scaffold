#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
test -s "$FLEET/agent/tests/guides.test.ts"
test -s "$FLEET/abort/tests/guides.test.ts"
log="$SCR/d7n-agent-header-host.log.txt"
test ! -e "$log"
exec > "$log" 2>&1
trap 'status=$?; printf "exit=%s\n" "$status"' EXIT
printf '%s\n' 'Compare the canonical opening header from agent and abort.'
cmp <(head -n 3 "$FLEET/agent/tests/guides.test.ts") <(head -n 3 "$FLEET/abort/tests/guides.test.ts")
