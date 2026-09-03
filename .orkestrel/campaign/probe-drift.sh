#!/usr/bin/env bash
UNIT=probe-drift
ROOT="C:/Users/mikes/WebstormProjects/scaffold"
ENTRY="$LOCALAPPDATA/cursor-agent/versions/2026.08.25-3e8eec8"
cd "C:/Users/mikes/WebstormProjects"
"$ENTRY/node.exe" "$ENTRY/index.js" -p --trust --mode=ask --model cursor-grok-4.6-high "You are the grok absorption lane: read-only scouting and distillation, no decisions. Read and execute the brief at $ROOT/tmp/units/probe-drift-brief.md exactly, over the three repositories it names, and return the distillate in the shape its Return section fixes, with file:line pointers and the scope each search covered. Write nothing and run no command that changes any tree." 2>&1 | tee "$ROOT/tmp/cursor/$UNIT.log"
echo "[launcher] exit=${PIPESTATUS[0]}"
