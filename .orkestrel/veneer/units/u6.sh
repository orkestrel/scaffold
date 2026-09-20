#!/usr/bin/env bash
# Unit U6: Astra adds the journey verbs, the pseudo-element readers, and the media stage to the
# Test package. Engine gpt-6-astra, codex exec workspace-write in the test checkout.
# Journal: scaffold/tmp/codex/u6.jsonl. Answer: scaffold/tmp/codex/u6-last.md.
cd "C:/Users/mikes/WebstormProjects/test" || exit 9
timeout 7200 codex exec --json -C "C:/Users/mikes/WebstormProjects/test" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "units/u6-last.md" "Read and execute the brief at tmp/codex/u6-brief.md exactly. Your final message must be the report it specifies." < /dev/null > "units/u6.jsonl" 2> "units/u6.err"
echo "exit=$?" >> "units/u6.err"
