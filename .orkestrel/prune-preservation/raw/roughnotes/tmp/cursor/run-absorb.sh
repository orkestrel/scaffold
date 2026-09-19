#!/usr/bin/env bash
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
BASE="$LOCALAPPDATA/cursor-agent/versions"
NEWEST=$(ls -1d "$BASE"/*/ 2>/dev/null | grep -E '[0-9]{4}\.[0-9]{2}\.[0-9]{2}' | sort | tail -1)
NEWEST="${NEWEST%/}"
echo "entry: $NEWEST" >&2
"$NEWEST/node.exe" "$NEWEST/index.js" -p --trust --mode=ask --model "cursor-grok-4.6-high" --output-format stream-json "Read and execute the brief at tmp/cursor/absorb-ui-brief.md exactly. Your final message must be the distillate it specifies." > tmp/cursor/absorb-ui.jsonl 2> tmp/cursor/absorb-ui.err
echo "exit=$?" >&2
