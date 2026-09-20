#!/usr/bin/env bash
# Unit U6: Astra adds the journey verbs, the pseudo-element readers, and the media stage to the
# Test package. Engine gpt-6-astra, codex exec workspace-write in the test checkout.
# Journal: scaffold/units/u6.jsonl. Answer: scaffold/units/u6-last.md.
cd "C:/Users/mikes/WebstormProjects/test" || exit 9
timeout 7200 codex exec --json -C "C:/Users/mikes/WebstormProjects/test" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "u6-last.md" "Read and execute the brief at u6-brief.md exactly. Your final message must be the report it specifies." < /dev/null > "u6.jsonl" 2> "u6.err"
echo "exit=$?" >> "u6.err"
