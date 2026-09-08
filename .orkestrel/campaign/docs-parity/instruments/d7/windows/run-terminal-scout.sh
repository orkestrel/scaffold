#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
export CURSOR_GROK_MODEL
CURSOR_GROK_MODEL=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md")
test -n "$CURSOR_GROK_MODEL"
cd "$SCAFFOLD"
timeout 1200 /c/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.02-c22c1a3/node.exe /c/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.02-c22c1a3/index.js -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" --output-format stream-json 'Read C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-terminal-reconciliation-scout-brief.md and return its bounded evidence. Read-only, no decisions or edits.' > "$SCAFFOLD/tmp/cursor/d7n-terminal-reconciliation-scout.jsonl" 2> "$SCAFFOLD/tmp/cursor/d7n-terminal-reconciliation-scout.err"
