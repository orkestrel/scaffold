#!/usr/bin/env bash
# Unit U1-author, run 4 (successor brief 4): Astra continues from the landed styles axis with the
# ColorMode engine, shell, setup modules, journeys, boundary controls, distribution stage, and
# guides. Engine gpt-6-astra, codex exec workspace-write in the veneer checkout. Supersedes
# u1-author-3.sh (run 3 stopped on the surface policy and on console-owned names).
# Journal: scaffold/tmp/codex/u1-author-4.jsonl.
cd "C:/Users/mikes/WebstormProjects/veneer" || exit 9
timeout 7200 codex exec --json -C "C:/Users/mikes/WebstormProjects/veneer" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "units/u1-author-4-last.md" "Read tmp/codex/u1-author-brief.md, then tmp/codex/u1-author-brief-2.md, then tmp/codex/u1-author-brief-3.md, then tmp/codex/u1-author-brief-4.md; each later file amends the earlier ones. Execute them exactly. Your final message must be the report they specify." < /dev/null > "units/u1-author-4.jsonl" 2> "units/u1-author-4.err"
echo "exit=$?" >> "units/u1-author-4.err"
