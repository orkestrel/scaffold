#!/usr/bin/env bash
# Unit U4a-obligations: Grok reads the installed Bootstrap 5.3.8 JavaScript source and returns the
# behavior obligations per component. Engine cursor-grok-4.6-high through the versioned Cursor
# entry, --mode=ask, read-only. Journal: scaffold/units/u4a-obligations.jsonl.
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
ENTRY="$LOCALAPPDATA/cursor-agent/versions/2026.09.18-9a7762b"
timeout 2400 "$ENTRY/node.exe" "$ENTRY/index.js" -p --trust --mode=ask --model "cursor-grok-4.6-high" --output-format stream-json "Read and execute the brief at .orkestrel/veneer/units/u4a-obligations-brief.md exactly. Your final message must be the Output it specifies and nothing else." > units/u4a-obligations.jsonl 2> units/u4a-obligations.err
echo "exit=$?" >> units/u4a-obligations.err
