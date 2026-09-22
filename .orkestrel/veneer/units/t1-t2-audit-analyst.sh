#!/bin/bash
# T1/T2 audit round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at the Test checkout (four-file working tree over 774ba14).
# Brief: tmp/audit/t1-t2-audit-analyst-brief.md (claims: tmp/audit/t1-t2-audit-claims.md; evidence: tmp/audit/t1-t2-audit-evidence.md)
# Journal: tmp/codex/t1-t2-audit-analyst.jsonl  Last message: tmp/codex/t1-t2-audit-analyst-last.md
# Cap: 3600 s (twelve claims over an 864-line diff).
cd /home/user/scaffold
timeout 3600 codex exec --json -C /home/user/test --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/t1-t2-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/t1-t2-audit-analyst-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/t1-t2-audit-analyst.jsonl 2> tmp/codex/t1-t2-audit-analyst.err
echo "exit=$?" >> tmp/codex/t1-t2-audit-analyst.err
