#!/bin/bash
# F5e audit round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at the Veneer checkout (working tree over a162c91).
# Brief: .orkestrel/veneer/units/f5e-audit-analyst-brief.md (claims: .orkestrel/veneer/units/f5e-audit-claims.md; evidence: .orkestrel/veneer/units/f5e-audit-evidence.md)
# Journal: .orkestrel/veneer/units/f5e-audit-analyst.jsonl  Last message: .orkestrel/veneer/units/f5e-audit-analyst-last.md
# Cap: 3600 s (ten mechanical claims over a rename-heavy diff; the F5a lane ran about 25 minutes under a 5400 s cap).
cd /home/user/scaffold
timeout 3600 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/.orkestrel/veneer/units/f5e-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/.orkestrel/veneer/units/f5e-audit-analyst-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > .orkestrel/veneer/units/f5e-audit-analyst.jsonl 2> .orkestrel/veneer/units/f5e-audit-analyst.err
echo "exit=$?" >> .orkestrel/veneer/units/f5e-audit-analyst.err
