#!/usr/bin/env bash
# Unit Test-paint: Astra (sol) through codex exec workspace-write rooted at the Test checkout, the
# sole writer there. The brief is staged at test/tmp/units/test-paint-brief.md (copied from
# scaffold/tmp/units and verified identical before launch); the report is written inside the
# unit's own root at test-paint-report.md and returned as the last message.
# Journal: test-paint.jsonl. Cap: 2 hours.
TEST="C:/Users/mikes/WebstormProjects/test"
HEAD_SHA=$(git -C "$TEST" rev-parse --short HEAD)
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 9
timeout 7200 codex exec --json -C "$TEST" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "units/test-paint-last.md" "You are the sol role on Astra, the sole writer in this checkout, C:/Users/mikes/WebstormProjects/test, whose HEAD is $HEAD_SHA. Open and follow ./tmp/units/test-paint-brief.md exactly; it is the whole assignment, and it names the law to read from C:/Users/mikes/WebstormProjects/scaffold before editing. You are the bench engine reading the brief inside your own CLI: perform the assignment directly and spawn nothing. Write the report the brief names at ./tmp/units/test-paint-report.md and return its full content as your final message, nothing else." < /dev/null > "units/test-paint.jsonl" 2> "units/test-paint.err"
echo "exit=$?" >> "units/test-paint.err"
