#!/usr/bin/env bash
# Unit CL1, the Content/layout proof contract (the first unit of the family, over the U7f-fix landing 060ce02):
# writer there. The brief is staged at veneer/tmp/units/cl1-brief.md (copied from
# scaffold/tmp/units and verified identical before launch); the report is written inside the
# unit's own root at cl1-report.md and returned as the last message.
# Journal: cl1.jsonl. Cap: 2 hours.
VENEER="C:/Users/mikes/WebstormProjects/veneer"
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 7200 codex exec --json -C "$VENEER" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/veneer, whose HEAD is $HEAD_SHA (the U7f-fix landing commit, U7 closed). Open and follow ./tmp/units/cl1-brief.md exactly; it is the whole assignment, and it names the law to read from C:/Users/mikes/WebstormProjects/scaffold before editing. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/cl1-report.md and return its full content as your final message, nothing else." < /dev/null > "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1.jsonl" 2> "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1.err"
echo "exit=$?" >> "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1.err"
