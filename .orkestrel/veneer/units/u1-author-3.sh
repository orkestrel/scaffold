#!/usr/bin/env bash
# Unit U1-author, run 3 (successor brief 3): Astra authors the Veneer setup modules, proofs, styles
# axis, theme engine, shell, boundary controls, and distribution stage. Engine gpt-6-astra, codex
# exec workspace-write in the veneer checkout. Supersedes u1-author-2.sh (run 2 stopped on the
# guards.ts placement). Journal: scaffold/units/u1-author-3.jsonl.
cd "C:/Users/mikes/WebstormProjects/veneer" || exit 9
timeout 7200 codex exec --json -C "C:/Users/mikes/WebstormProjects/veneer" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "u1-author-3-last.md" "Read u1-author-brief.md, then u1-author-brief-2.md, then u1-author-brief-3.md; each later file amends the earlier ones. Execute them exactly. Your final message must be the report they specify." < /dev/null > "u1-author-3.jsonl" 2> "u1-author-3.err"
echo "exit=$?" >> "u1-author-3.err"
