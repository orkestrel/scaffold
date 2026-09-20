#!/usr/bin/env bash
# Unit U6 successor 4 (supersedes u6-3.sh; brief u6-brief-4.md): Astra applies the audit round 2 fixes to the
# Test package. Engine gpt-6-astra, codex exec workspace-write in the test checkout.
# Journal: scaffold/tmp/codex/u6-4.jsonl. Answer: scaffold/tmp/codex/u6-4-last.md.
cd "C:/Users/mikes/WebstormProjects/test" || exit 9
timeout 7200 codex exec --json -C "C:/Users/mikes/WebstormProjects/test" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "units/u6-4-last.md" "Read and execute the brief at tmp/codex/u6-brief-4.md exactly. Your final message must be the report it specifies." < /dev/null > "units/u6-4.jsonl" 2> "units/u6-4.err"
echo "exit=$?" >> "units/u6-4.err"
