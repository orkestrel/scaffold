#!/usr/bin/env bash
# Unit U2-map: Grok reads the Elements showcase and partials and returns the calibration specimen map.
# Engine cursor-grok-4.6-high through the versioned Cursor entry, --mode=ask, read-only.
# Journal: scaffold/units/u2-map.jsonl; errors: u2-map.err.
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
ENTRY="$LOCALAPPDATA/cursor-agent/versions/2026.09.18-9a7762b"
timeout 1500 "$ENTRY/node.exe" "$ENTRY/index.js" -p --trust --mode=ask --model "cursor-grok-4.6-high" --output-format stream-json "Read and execute the brief at C:/Users/mikes/WebstormProjects/scaffold/units/u2-map-brief.md exactly. Your final message must be the Output it specifies and nothing else." > units/u2-map.jsonl 2> units/u2-map.err
echo "exit=$?" >> units/u2-map.err
