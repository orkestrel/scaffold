#!/usr/bin/env bash
# Unit CL1, brief 2 (supersedes cl1.sh: the fix round for the audit findings; the tree carries the brief-1 result):
# writer there. The brief is staged at veneer/tmp/units/cl1-brief-2.md (copied from
# scaffold/tmp/units and verified identical before launch); the report is written inside the
# unit's own root at cl1-report-2.md and returned as the last message.
# Journal: cl1-2.jsonl. Cap: 2 hours.
VENEER="C:/Users/mikes/WebstormProjects/veneer"
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 7200 codex exec --json -C "$VENEER" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1-2-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/veneer, whose HEAD is $HEAD_SHA (the U7f-fix landing commit); the working tree carries the complete, uncommitted result of CL1 brief 1, and you continue from it without restoring or resetting anything. Open and follow ./tmp/units/cl1-brief-2.md exactly; it is the whole assignment, and it names the law to read from C:/Users/mikes/WebstormProjects/scaffold before editing. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/cl1-report-2.md and return its full content as your final message, nothing else." < /dev/null > "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1-2.jsonl" 2> "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1-2.err"
echo "exit=$?" >> "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl1-2.err"
