#!/usr/bin/env bash
# Unit CL3, brief 4 (the fix round after audit round 1): the reset partial and the text Reboot tags on Astra, the sole
# writer there. The brief is staged at veneer/tmp/units/cl3-brief-4.md (copied from
# scaffold/tmp/units and verified identical before launch); the report is written inside the
# unit's own root at cl3-report-3.md and returned as the last message.
# Journal: tmp/codex/cl3-3.jsonl. Cap: 2 hours.
VENEER="C:/Users/mikes/WebstormProjects/veneer"
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 7200 codex exec --json -C "$VENEER" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl3-3-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/veneer, whose HEAD is $HEAD_SHA (the CL2 landing commit); the working tree carries the complete, uncommitted result of CL3 briefs 2 and 3, and you continue from it without restoring or resetting anything. Open and follow ./tmp/units/cl3-brief-4.md exactly; it is the whole assignment, and it names the law to read from C:/Users/mikes/WebstormProjects/scaffold before editing. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/cl3-report-3.md and return its full content as your final message, nothing else." < /dev/null > "C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl3-3.jsonl" 2> "C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl3-3.err"
echo "exit=$?" >> "C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl3-3.err"
