#!/bin/bash
# B-PASSIVE-C audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-bc.
# Brief: tmp/audit/bc-audit-analyst-brief.md  Claims: tmp/audit/bc-audit-claims.md  Journal: tmp/codex/bc-audit-analyst.jsonl  Last message: tmp/codex/bc-audit-analyst-last.md
# Cap: 2100 s. Queued behind the VALIDATION analyst lane by bc-audit-queue.sh.
cd /home/user/scaffold
timeout 2100 codex exec --json -C /home/user/veneer-bc --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/bc-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/bc-audit-analyst-brief.md exactly, ruling on every claim in /home/user/scaffold/tmp/audit/bc-audit-claims.md. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/bc-audit-analyst.jsonl 2> tmp/codex/bc-audit-analyst.err
echo "exit=$?" >> tmp/codex/bc-audit-analyst.err
