#!/usr/bin/env bash
# Unit U7a, brief 5 (supersedes u7a-4.sh: an enumerating assertion the change grows is the unit's to update; the tree carries the brief-3 and brief-4 work): Astra (sol) through codex exec workspace-write rooted at the Veneer checkout, the sole
# writer there. The brief is staged at veneer/tmp/units/u7a-brief-5.md (copied from
# scaffold/tmp/units and verified identical before launch); the report is written inside the
# unit's own root at u7a-report-5.md and returned as the last message.
# Journal: u7a-5.jsonl. Cap: 2 hours.
VENEER="C:/Users/mikes/WebstormProjects/veneer"
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 7200 codex exec --json -C "$VENEER" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7a-5-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/veneer, whose HEAD is $HEAD_SHA (the u7d-bounds landing commit, which follows the U7d landing 7da6bb1). Open and follow ./tmp/units/u7a-brief-5.md exactly; it is the whole assignment, and it names the law to read from C:/Users/mikes/WebstormProjects/scaffold before editing. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/u7a-report-5.md and return its full content as your final message, nothing else." < /dev/null > "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7a-5.jsonl" 2> "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7a-5.err"
echo "exit=$?" >> "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7a-5.err"
