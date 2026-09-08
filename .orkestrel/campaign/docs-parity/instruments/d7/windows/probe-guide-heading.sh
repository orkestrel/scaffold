#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

LOG="$SCR/d7n-guide-heading.log.txt"
test ! -e "$LOG"
node "$FLEET/mcp/tmp/d7n-guide-heading/probe.mjs" > "$LOG" 2>&1
