#!/usr/bin/env bash
# Unit U7b, brief 4 (supersedes u7b-3.sh: the prune key is root membership; the tree carries the brief-3 result):
# writer there. The brief is staged at veneer/tmp/units/u7b-brief-4.md (copied from
# scaffold/tmp/units and verified identical before launch); the report is written inside the
# unit's own root at u7b-report-4.md and returned as the last message.
# Journal: u7b-4.jsonl. Cap: 2 hours.
VENEER="C:/Users/mikes/WebstormProjects/veneer"
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 7200 codex exec --json -C "$VENEER" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7b-4-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/veneer, whose HEAD is $HEAD_SHA (the u7-setup-tidy landing commit, which follows the U7a landing). Open and follow ./tmp/units/u7b-brief-4.md exactly; it is the whole assignment, and it names the law to read from C:/Users/mikes/WebstormProjects/scaffold before editing. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/u7b-report-4.md and return its full content as your final message, nothing else." < /dev/null > "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7b-4.jsonl" 2> "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7b-4.err"
echo "exit=$?" >> "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7b-4.err"
