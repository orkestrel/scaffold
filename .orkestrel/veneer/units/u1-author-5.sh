#!/usr/bin/env bash
# Unit U1-author, run 5 (successor brief 5): Astra finishes the distribution stage, the guides,
# the README, and the final gate chain from the 9d64c66 checkpoint. Engine gpt-6-astra, codex
# exec workspace-write in the veneer checkout. Supersedes u1-author-4.sh (run 4 stopped on the
# package.json plant the sandbox refused). Journal: scaffold/units/u1-author-5.jsonl.
cd "C:/Users/mikes/WebstormProjects/veneer" || exit 9
timeout 7200 codex exec --json -C "C:/Users/mikes/WebstormProjects/veneer" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "u1-author-5-last.md" "Read u1-author-brief.md, then -2.md, -3.md, -4.md, and -5.md in that directory; each later file amends the earlier ones. Execute them exactly. Your final message must be the report they specify." < /dev/null > "u1-author-5.jsonl" 2> "u1-author-5.err"
echo "exit=$?" >> "u1-author-5.err"
