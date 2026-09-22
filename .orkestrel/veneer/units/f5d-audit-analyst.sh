#!/bin/bash
# F5d audit round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at the Veneer checkout (working tree over 3ff4e9a).
# Brief: tmp/audit/f5d-audit-analyst-brief.md (claims: tmp/audit/f5d-audit-claims.md; evidence: tmp/audit/f5d-audit-evidence.md)
# Journal: tmp/codex/f5d-audit-analyst.jsonl  Last message: tmp/codex/f5d-audit-analyst-last.md
# Cap: 5400 s (twelve claims over a wide source diff with a compile walk; the F5a lane ran about 25 minutes under this cap).
cd /home/user/scaffold
timeout 5400 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/f5d-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/f5d-audit-analyst-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/f5d-audit-analyst.jsonl 2> tmp/codex/f5d-audit-analyst.err
echo "exit=$?" >> tmp/codex/f5d-audit-analyst.err
