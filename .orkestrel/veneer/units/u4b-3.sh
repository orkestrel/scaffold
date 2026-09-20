#!/usr/bin/env bash
# Unit U4b brief 3: Astra (sol) through codex exec workspace-write rooted at the Veneer checkout,
# the sole writer there. The brief is staged at veneer/tmp/units/u4b-brief-3.md (copied from
# scaffold/tmp/units and verified identical before launch); the report is written inside the
# unit's own root at u4b-report-3.md and returned as the last message.
# Journal: u4b-3.jsonl. Cap: 2 hours.
VENEER="C:/Users/mikes/WebstormProjects/veneer"
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 7200 codex exec --json -C "$VENEER" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "units/u4b-3-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/veneer, whose HEAD is $HEAD_SHA; U4b briefs 1 and 2 and the Orchestrator's declaration of @orkestrel/markdown are uncommitted in the working tree and stay as they are. Open and follow ./tmp/units/u4b-brief-3.md exactly; it is the whole assignment and it supersedes the briefs it names. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/u4b-report-3.md and return its full content as your final message, nothing else." < /dev/null > "units/u4b-3.jsonl" 2> "units/u4b-3.err"
echo "exit=$?" >> "units/u4b-3.err"
