#!/bin/bash
# F5a audit round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at the Veneer checkout (65-entry working tree over d93bb85).
# Brief: .orkestrel/veneer/units/f5a-audit-analyst-brief.md (claims: .orkestrel/veneer/units/f5a-audit-claims.md; evidence: .orkestrel/veneer/units/f5a-audit-evidence.md)
# Journal: .orkestrel/veneer/units/f5a-audit-analyst.jsonl  Last message: .orkestrel/veneer/units/f5a-audit-analyst-last.md
# Cap: 5400 s (seventeen claims over a bounded diff; the F4 analyst lane ran under that cap on 2026-09-22).
cd /home/user/scaffold
timeout 5400 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/.orkestrel/veneer/units/f5a-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/.orkestrel/veneer/units/f5a-audit-analyst-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > .orkestrel/veneer/units/f5a-audit-analyst.jsonl 2> .orkestrel/veneer/units/f5a-audit-analyst.err
echo "exit=$?" >> .orkestrel/veneer/units/f5a-audit-analyst.err
