#!/bin/sh
# U6 design round, objective lane on Astra (codex exec, read-only), rooted at the Test checkout.
# Journal: scaffold/tmp/codex/u6-design-analyst.jsonl.
timeout 3000 codex exec --json -C "C:/Users/mikes/WebstormProjects/test" --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "units/u6-design-analyst-last.md" "Read and execute the brief at units/u6-design-brief.md exactly, holding the OBJECTIVE lane (correctness, what the tester environment permits, what the installed package already does). Your final message must be the Output it specifies." < /dev/null > "units/u6-design-analyst.jsonl" 2> "units/u6-design-analyst.err"
echo "exit=$?" >> "units/u6-design-analyst.err"
