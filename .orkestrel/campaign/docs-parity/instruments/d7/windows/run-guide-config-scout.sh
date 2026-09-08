#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/cursor/d7n-guide-config-scout-brief.md"
journal="$SCAFFOLD/tmp/cursor/d7n-guide-config-scout.jsonl"
stderr="$SCAFFOLD/tmp/cursor/d7n-guide-config-scout.err"
model=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md" | tr -d '\r')
test -n "$model"
test -f "$brief"
test ! -e "$journal"
test ! -e "$stderr"
cd "$SCAFFOLD"
git -C "$SCAFFOLD" status --porcelain > "$SCAFFOLD/tmp/cursor/d7n-guide-config-scout.before.txt"
trap 'status=$?; git -C "$SCAFFOLD" status --porcelain > "$SCAFFOLD/tmp/cursor/d7n-guide-config-scout.after.txt"; exit "$status"' EXIT
timeout 900 C:/Users/mikes/AppData/Local/cursor-agent/versions/dist-package/node.exe C:/Users/mikes/AppData/Local/cursor-agent/versions/dist-package/index.js -p --trust --mode=ask --model "$model" --output-format stream-json "Read $brief and return only the bounded read-only evidence map. Do not edit, run tests, or inspect credentials." > "$journal" 2> "$stderr"
