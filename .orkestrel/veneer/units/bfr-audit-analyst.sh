#!/bin/bash
# B-FORMS-RANGE audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-bfr.
# Brief: tmp/audit/bfr-audit-analyst-brief.md  Claims: tmp/audit/bfr-audit-claims.md  Journal: tmp/codex/bfr-audit-analyst.jsonl  Last message: tmp/codex/bfr-audit-analyst-last.md
# Cap: 2100 s. Queued behind the VALIDATION analyst lane by bfr-audit-queue.sh.
cd /home/user/scaffold
timeout 2100 codex exec --json -C /home/user/veneer-bfr --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/bfr-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/bfr-audit-analyst-brief.md exactly, ruling on every claim in /home/user/scaffold/tmp/audit/bfr-audit-claims.md. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/bfr-audit-analyst.jsonl 2> tmp/codex/bfr-audit-analyst.err
echo "exit=$?" >> tmp/codex/bfr-audit-analyst.err
