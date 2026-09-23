#!/bin/bash
# B-FORMS-CHECK audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-bfc.
# Command as the analyst driver resolved it; the Orchestrator sized the cap (2100 s: the observed high mark of comparable lanes is ~25 min, plus slack).
# Brief: .orkestrel/veneer/units/bfc-audit-analyst-brief.md (the lane brief copied unaltered)  Claims: .orkestrel/veneer/units/bfc-audit-claims.md  Journal: tmp/codex/bfc-audit-analyst.jsonl  Last message: tmp/codex/bfc-audit-analyst-last.md
cd /home/user/scaffold
timeout 2100 codex exec --json -C /home/user/veneer-bfc --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/bfc-audit-analyst-last.md "Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/bfc-audit-analyst-brief.md exactly. Hold the objective lane and rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/bfc-audit-claims.md, per that brief. Your final message must be exactly the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/bfc-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/bfc-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/bfc-audit-analyst.err
