#!/usr/bin/env bash
UNIT=fix-audit-b
ROOT="C:/Users/mikes/WebstormProjects/scaffold"
ENTRY="$LOCALAPPDATA/cursor-agent/versions/2026.08.25-3e8eec8"
cd "C:/Users/mikes/WebstormProjects"
git -C "$ROOT" status --porcelain > "$ROOT/tmp/cursor/$UNIT-status-before.txt"
"$ENTRY/node.exe" "$ENTRY/index.js" -p --trust --mode=ask --model cursor-grok-4.6-high "You hold the OBJECTIVE lane of a fix-round audit: correctness, constraints, and what the code, the skills, and the rules actually permit. Read and execute the brief at $ROOT/tmp/units/fix-audit-brief.md exactly, attacking every numbered claim rather than confirming it. This lane rules on claims 8, 14, 16, 17, and 19 only; claims 15 and 22 wait on a re-film and belong to a later lane, so mark them UNRESOLVED with the words 'later lane', and every other claim was ruled by an earlier lane, so mark each of them UNRESOLVED with the words 'earlier lane'. Claim 8 is re-read at scaffold commit 1a7602e, where four bare instrument-sense hits were closed after the earlier lane. The diffs are under $ROOT/tmp/units/diffs/ with the fix- prefix: fix-scaffold.patch is 3df4e22..1a7602e, fix-test.patch is c98f3ba..e13f5d5, fix-terrain.patch covers the terrain fix and its successor over tests (93677fb..7a27ee8), and fix-terrain.status is the terrain tree's status. Read-only: write nothing, run no command that changes any tree. Your final message must be the orkestrel-falsify verdict shape the brief fixes, with exactly one terminal VERDICT line." 2>&1 | tee "$ROOT/tmp/cursor/$UNIT.log"
git -C "$ROOT" status --porcelain > "$ROOT/tmp/cursor/$UNIT-status-after.txt"
echo "[launcher] exit=${PIPESTATUS[0]}"
