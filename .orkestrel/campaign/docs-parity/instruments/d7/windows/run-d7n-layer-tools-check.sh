#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/cursor/d7n-layer-tools-check-brief.md"
journal="$SCAFFOLD/tmp/cursor/d7n-layer-tools-check.jsonl"
stderr="$SCAFFOLD/tmp/cursor/d7n-layer-tools-check.err"
model=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md" | tr -d '\r')
test -n "$model"
test -f "$brief"
test ! -e "$journal"
test ! -e "$stderr"
cd "$SCAFFOLD"
timeout 900 C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.02-c22c1a3/node.exe C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.02-c22c1a3/index.js -p --trust --mode=ask --model "$model" --output-format stream-json "Read $brief and perform only the mechanical checker lane. Read files only. Do not edit, run commands, collect fleet state, inspect other lanes or credentials, or delegate. Return the per-claim result and actual journal/session provenance." > "$journal" 2> "$stderr"
