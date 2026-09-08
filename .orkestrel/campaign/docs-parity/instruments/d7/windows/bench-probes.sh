#!/usr/bin/env bash
set -u
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
timeout 150 claude -p 'Read-only liveness probe. Use no tools. Return exactly LIVE.' --model opus --effort high --permission-mode default --output-format stream-json --verbose > "$SCAFFOLD/tmp/claude/d7n-session-liveness.jsonl" 2> "$SCAFFOLD/tmp/claude/d7n-session-liveness.err"
printf 'claude exit=%s\n' "$?"
CURSOR_ENTRY=/c/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.02-c22c1a3
"$CURSOR_ENTRY/node.exe" "$CURSOR_ENTRY/index.js" --version
"$CURSOR_ENTRY/node.exe" "$CURSOR_ENTRY/index.js" status
timeout 150 "$CURSOR_ENTRY/node.exe" "$CURSOR_ENTRY/index.js" -p --trust --mode=ask --model cursor-grok-4.6-high --output-format stream-json 'Read-only liveness probe. Use no tools. Return exactly LIVE.' > "$SCAFFOLD/tmp/cursor/d7n-session-liveness.jsonl" 2> "$SCAFFOLD/tmp/cursor/d7n-session-liveness.err"
printf 'cursor exit=%s\n' "$?"
