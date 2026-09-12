#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
CURSOR_GROK_MODEL=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md" | tr -d '\r')
test -n "$CURSOR_GROK_MODEL"
out="$SCAFFOLD/tmp/cursor/d7n-agent-probe-scout"
test ! -e "$out.jsonl"
git -C "$FLEET/agent" status --porcelain=v1 > "$out.agent-before.txt"
git -C "$FLEET/probe" status --porcelain=v1 > "$out.probe-before.txt"
status=0
if timeout --kill-after=15s 900s /c/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.10-fd3934a/node.exe /c/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.10-fd3934a/index.js -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" --output-format stream-json 'Read C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/d7n-agent-probe-scout-brief.md and perform that scout directly.' > "$out.jsonl" 2> "$out.err"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out.exit.txt"
git -C "$FLEET/agent" status --porcelain=v1 > "$out.agent-after.txt"
git -C "$FLEET/probe" status --porcelain=v1 > "$out.probe-after.txt"
cmp "$out.agent-before.txt" "$out.agent-after.txt"
cmp "$out.probe-before.txt" "$out.probe-after.txt"
exit "$status"
