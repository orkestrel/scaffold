#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/cursor/d7n-scaffold-path-map-brief.md"
journal="$SCAFFOLD/tmp/cursor/d7n-scaffold-path-map.jsonl"
stderr="$SCAFFOLD/tmp/cursor/d7n-scaffold-path-map.err"
model=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md" | tr -d '\r')
test -n "$model"
test -f "$brief"
test ! -e "$journal"
test ! -e "$stderr"
cd "$SCAFFOLD"
git -C "$SCAFFOLD" status --porcelain > "$SCAFFOLD/tmp/cursor/d7n-scaffold-path-map.before.txt"
trap 'status=$?; git -C "$SCAFFOLD" status --porcelain > "$SCAFFOLD/tmp/cursor/d7n-scaffold-path-map.after.txt"; exit "$status"' EXIT
timeout 1800 C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.02-c22c1a3/node.exe C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.02-c22c1a3/index.js -p --trust --mode=ask --model "$model" --output-format stream-json "Read $brief and return only the bounded read-only evidence map. Do not edit, run tests, or inspect credentials." > "$journal" 2> "$stderr"
