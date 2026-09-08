#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/units/d7n-guide-path-bootstrap-check-brief.md"
journal="$SCAFFOLD/tmp/cursor/d7n-guide-path-bootstrap-check.jsonl"
stderr="$SCAFFOLD/tmp/cursor/d7n-guide-path-bootstrap-check.err"
model=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md" | tr -d '\r')
test -n "$model"
test -f "$brief"
test ! -e "$journal"
test ! -e "$stderr"
cd "$SCAFFOLD"
timeout 900 C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.02-c22c1a3/node.exe C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.02-c22c1a3/index.js -p --trust --mode=ask --model "$model" --output-format stream-json "Read $brief and perform only its mechanical checker assignment. Return concise evidence per named claim and your actual journal/session provenance. Read files only. Do not execute, edit, install, collect fleet state, inspect credentials, decide acceptance or delegate." > "$journal" 2> "$stderr"
