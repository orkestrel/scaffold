#!/usr/bin/env bash
# Unit U-styles-config: Astra (sol) through codex exec workspace-write rooted at the Veneer
# checkout, the sole writer there. The brief is staged at veneer/tmp/units/u-styles-config-brief.md
# (the Orchestrator copies it from scaffold/tmp/units before launch and verifies the copy); the
# report is written inside the unit's own root at u-styles-config-report.md and also
# returned as the last message. Journal: u-styles-config.jsonl.
VENEER="C:/Users/mikes/WebstormProjects/veneer"
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 5400 codex exec --json -C "$VENEER" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "units/u-styles-config-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/veneer, whose HEAD is $HEAD_SHA (the U1-conform landing commit). Open and follow ./tmp/units/u-styles-config-brief.md exactly; it is the whole assignment, and it names the law to read from C:/Users/mikes/WebstormProjects/scaffold before editing. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/u-styles-config-report.md and return its full content as your final message, nothing else." < /dev/null > "units/u-styles-config.jsonl" 2> "units/u-styles-config.err"
echo "exit=$?" >> "units/u-styles-config.err"
