#!/usr/bin/env bash
# Unit U6 successor 2 (supersedes u6.sh; brief u6-brief-2.md): Astra adds the journey verbs, the pseudo-element readers, and the media stage to the
# Test package. Engine gpt-6-astra, codex exec workspace-write in the test checkout.
# Journal: scaffold/units/u6-2.jsonl. Answer: scaffold/units/u6-2-last.md.
cd "C:/Users/mikes/WebstormProjects/test" || exit 9
timeout 7200 codex exec --json -C "C:/Users/mikes/WebstormProjects/test" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "u6-2-last.md" "Read and execute the brief at u6-brief-2.md exactly. Your final message must be the report it specifies." < /dev/null > "u6-2.jsonl" 2> "u6-2.err"
echo "exit=$?" >> "u6-2.err"
