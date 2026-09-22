#!/bin/bash
# F5d fix-round audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer (fix over 07fc3c3).
# Brief: tmp/audit/f5d-fix-audit-analyst-brief.md  Journal: tmp/codex/f5d-fix-audit-analyst.jsonl  Last message: tmp/codex/f5d-fix-audit-analyst-last.md
# Cap: 1200 s (a four-claim bounded audit).
cd /home/user/scaffold
timeout 1200 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/f5d-fix-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/f5d-fix-audit-analyst-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/f5d-fix-audit-analyst.jsonl 2> tmp/codex/f5d-fix-audit-analyst.err
echo "exit=$?" >> tmp/codex/f5d-fix-audit-analyst.err
