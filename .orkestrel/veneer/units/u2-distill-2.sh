#!/usr/bin/env bash
# Unit U2-distill, run 2 (successor brief 2): Grok reads run 5's calibration.json files and returns
# the foundation-value tables with the settled check. Engine cursor-grok-4.6-high, --mode=ask.
# Journal: scaffold/units/u2-distill-2.jsonl.
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
ENTRY="$LOCALAPPDATA/cursor-agent/versions/2026.09.18-9a7762b"
timeout 2400 "$ENTRY/node.exe" "$ENTRY/index.js" -p --trust --mode=ask --model "cursor-grok-4.6-high" --output-format stream-json "Read the brief at .orkestrel/veneer/units/u2-distill-brief.md and then .orkestrel/veneer/units/u2-distill-brief-2.md, which amends it, and execute them exactly. Your final message must be the Output they specify and nothing else." > units/u2-distill-2.jsonl 2> units/u2-distill-2.err
echo "exit=$?" >> units/u2-distill-2.err
