#!/bin/bash
# Audit round, objective lane: `analyst` on GPT-6 Astra (user ruling 2026-09-22), read-only, rooted at the Veneer checkout.
# Brief: tmp/audit/veneer-audit-analyst-brief.md (claims: tmp/audit/veneer-audit-claims.md)
# Journal: tmp/codex/veneer-audit-analyst.jsonl  Last message: tmp/codex/veneer-audit-analyst-last.md
# Cap: 5400 s (twenty-five claims over the whole tree with read-only measurements; the previous session's Astra audit lanes ran under 7200).
cd /home/user/scaffold
timeout 5400 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/veneer-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/veneer-audit-analyst-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/veneer-audit-analyst.jsonl 2> tmp/codex/veneer-audit-analyst.err
echo "exit=$?" >> tmp/codex/veneer-audit-analyst.err
