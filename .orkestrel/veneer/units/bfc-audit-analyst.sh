#!/bin/bash
# B-FORMS-CHECK audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-bfc.
# Brief: tmp/audit/bfc-audit-analyst-brief.md  Claims: tmp/audit/bfc-audit-claims.md  Journal: tmp/codex/bfc-audit-analyst.jsonl  Last message: tmp/codex/bfc-audit-analyst-last.md
# Cap: 2100 s. Launched through codex-queue.sh (at most two codex lanes).
cd /home/user/scaffold
timeout 2100 codex exec --json -C /home/user/veneer-bfc --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/bfc-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/bfc-audit-analyst-brief.md exactly, ruling on every claim in /home/user/scaffold/tmp/audit/bfc-audit-claims.md. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/bfc-audit-analyst.jsonl 2> tmp/codex/bfc-audit-analyst.err
echo "exit=$?" >> tmp/codex/bfc-audit-analyst.err
