#!/usr/bin/env bash
# Unit U1-author: Astra authors the Veneer setup modules, proofs, styles axis, shell, boundary
# controls, and distribution stage. Engine gpt-6-astra, codex exec workspace-write in the veneer
# checkout. Journal: scaffold/units/u1-author.jsonl. Answer: scaffold/units/u1-author-last.md.
cd "C:/Users/mikes/WebstormProjects/veneer" || exit 9
timeout 7200 codex exec --json -C "C:/Users/mikes/WebstormProjects/veneer" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "u1-author-last.md" "Read and execute the brief at u1-author-brief.md exactly. Your final message must be the report it specifies." < /dev/null > "u1-author.jsonl" 2> "u1-author.err"
echo "exit=$?" >> "u1-author.err"
