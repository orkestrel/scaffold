#!/usr/bin/env bash
UNIT=apps-design-objective
ROOT="C:/Users/mikes/WebstormProjects/scaffold"
ENTRY="$LOCALAPPDATA/cursor-agent/versions/2026.08.25-3e8eec8"
cd "C:/Users/mikes/WebstormProjects"
"$ENTRY/node.exe" "$ENTRY/index.js" -p --trust --mode=ask --model cursor-grok-4.6-high "You hold the OBJECTIVE lane of an adversarial design pass: correctness, constraints, and what the code, the packages, the visit procedure, and the rules actually permit. Read and execute the design brief at $ROOT/tmp/units/apps-design-brief.md exactly: read every evidence file it names under $ROOT/.orkestrel/scaffold/, the two skills, the wave reference, and $ROOT/AGENTS.md and $ROOT/.agents/orchestration.md, then return the plan in the shape the brief's Return section fixes, arguing for the shape you hold and attacking any unit whose acceptance criterion the evidence cannot check. Read-only: write nothing, run no command that changes any tree." 2>&1 | tee "$ROOT/tmp/cursor/$UNIT.log"
echo "[launcher] exit=${PIPESTATUS[0]}"
