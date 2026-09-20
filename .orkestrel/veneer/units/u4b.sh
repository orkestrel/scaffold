#!/usr/bin/env bash
# Unit U4b: Astra (sol) through codex exec workspace-write rooted at the Veneer checkout, the sole
# writer there. The brief is staged at veneer/tmp/units/u4b-brief.md (the Orchestrator copies it
# from scaffold/tmp/units before launch and verifies the copy); the report is written inside the
# unit's own root at u4b-report.md and also returned as the last message.
# Journal: u4b.jsonl. Cap: 2 hours (a recorder unit launches browsers and runs controls).
VENEER="C:/Users/mikes/WebstormProjects/veneer"
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 7200 codex exec --json -C "$VENEER" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "units/u4b-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/veneer, whose HEAD is $HEAD_SHA (the U-styles-guide landing commit). Open and follow ./tmp/units/u4b-brief.md exactly; it is the whole assignment, and it names the law to read from C:/Users/mikes/WebstormProjects/scaffold before editing. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/u4b-report.md and return its full content as your final message, nothing else." < /dev/null > "units/u4b.jsonl" 2> "units/u4b.err"
echo "exit=$?" >> "units/u4b.err"
