#!/bin/bash
# F8a PROFILES round-3 audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-f8.
# Brief: .orkestrel/veneer/units/f8a-fix-3-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/f8a-fix-3-audit-claims.md  Journal: tmp/codex/f8a-fix-3-audit-analyst.jsonl  Last message: tmp/codex/f8a-fix-3-audit-analyst-last.md
# Cap: 1200 s.
cd /home/user/scaffold
timeout 1200 codex exec --json -C /home/user/veneer-f8 --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/f8a-fix-3-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/f8a-fix-3-audit-analyst-brief.md exactly, ruling on every claim in /home/user/scaffold/tmp/audit/f8a-fix-3-audit-claims.md. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/f8a-fix-3-audit-analyst.jsonl 2> tmp/codex/f8a-fix-3-audit-analyst.err
echo "exit=$?" >> tmp/codex/f8a-fix-3-audit-analyst.err
