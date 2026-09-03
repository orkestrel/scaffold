#!/usr/bin/env bash
UNIT=audit-lloyds
ROOT="C:/Users/mikes/WebstormProjects/scaffold"
ENTRY="$LOCALAPPDATA/cursor-agent/versions/2026.08.25-3e8eec8"
cd "C:/Users/mikes/WebstormProjects"
"$ENTRY/node.exe" "$ENTRY/index.js" -p --trust --mode=ask --model cursor-grok-4.6-high "You hold the OBJECTIVE lane of an adversarial audit: correctness, constraints, and what the code, the skills, and the test layer actually permit. Read and execute the brief at $ROOT/tmp/units/audit-lloyds-brief.md exactly, attacking every numbered claim rather than confirming it. The diffs are under $ROOT/tmp/units/diffs/ with the lloyds- prefix; the frames and artifacts are under C:/Users/mikes/WebstormProjects/lloyds/tmp/. Read-only: write nothing, run no command that changes any tree. Your final message must be the orkestrel-falsify verdict shape the brief fixes, with exactly one terminal VERDICT line." 2>&1 | tee "$ROOT/tmp/cursor/$UNIT.log"
echo "[launcher] exit=${PIPESTATUS[0]}"
