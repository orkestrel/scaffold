#!/usr/bin/env bash
# Unit CL4, brief 6 (the ruling on the fourth stop: the ledger-population assumption, granted as a class): the remaining Reboot tags and the reboot key: the reset partial and the text Reboot tags on Astra, the sole
# writer there. The brief is staged at veneer/tmp/units/cl4-brief-6.md (copied from
# scaffold/tmp/units and verified identical before launch); the report is written inside the
# unit's own root at cl4-report-5.md and returned as the last message.
# Journal: tmp/codex/cl4-5.jsonl. Cap: 2 hours.
VENEER="C:/Users/mikes/WebstormProjects/veneer"
HEAD_SHA=$(git -C "$VENEER" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 7200 codex exec --json -C "$VENEER" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-5-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/veneer, whose HEAD is $HEAD_SHA (the CL3b landing commit); the working tree carries your own CL4 work from briefs 2 to 5 (the partials and their proofs, the canonicalization, the exclusion rows, the guide rows, listed, and the five granted setup sites), and you continue from it without restoring or resetting anything. Open and follow ./tmp/units/cl4-brief-6.md exactly; it is the effective brief over ./tmp/units/cl4-brief-5.md and briefs 4 to 1 beneath it, which you also open and follow for every section brief 6 does not change; together they are the whole assignment, and they name the law to read from C:/Users/mikes/WebstormProjects/scaffold before editing. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/cl4-report-5.md and return its full content as your final message, nothing else." < /dev/null > "C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl4-5.jsonl" 2> "C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl4-5.err"
echo "exit=$?" >> "C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl4-5.err"
