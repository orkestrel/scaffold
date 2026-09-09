#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

cd "$SCAFFOLD"
cursor_entry=/c/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.08-6caf4ff
cursor_model=$(sed -n 's/^CURSOR_GROK_MODEL=//p' .claude/agents/grok.md)
test -n "$cursor_model"
out="$SCR/d7n-guides-api-check-probe"
test ! -e "$out"
mkdir -p "$out" "$SCAFFOLD/tmp/cursor"
status=0
timeout --kill-after=15s 120 "$cursor_entry/node.exe" "$cursor_entry/index.js" -p --trust --mode=ask --model "$cursor_model" --output-format stream-json 'Reply exactly GROK_READY.' > "$SCAFFOLD/tmp/cursor/d7n-guides-api-check-probe.jsonl" 2> "$SCAFFOLD/tmp/cursor/d7n-guides-api-check-probe.err" || status=$?
printf '%s\n' "$status" > "$out/exit.txt"
printf 'liveness probe exit %s\n' "$status"
exit "$status"
