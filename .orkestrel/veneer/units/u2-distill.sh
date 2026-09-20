#!/usr/bin/env bash
# Unit U2-distill: Grok reads both browsers' calibration.json and returns the foundation-value
# tables. Engine cursor-grok-4.6-high through the versioned Cursor entry, --mode=ask, read-only.
# Journal: scaffold/units/u2-distill.jsonl.
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
ENTRY="$LOCALAPPDATA/cursor-agent/versions/2026.09.18-9a7762b"
timeout 2400 "$ENTRY/node.exe" "$ENTRY/index.js" -p --trust --mode=ask --model "cursor-grok-4.6-high" --output-format stream-json "Read and execute the brief at .orkestrel/veneer/units/u2-distill-brief.md exactly. Your final message must be the Output it specifies and nothing else." > u2-distill.jsonl 2> u2-distill.err
echo "exit=$?" >> u2-distill.err
