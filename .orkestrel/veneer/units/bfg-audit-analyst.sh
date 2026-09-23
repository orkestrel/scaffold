#!/bin/bash
# B-FORMS-GROUP audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-bfg.
# Command as the analyst driver resolved it; the Orchestrator sized the cap (2100 s: the observed high mark of comparable lanes is ~25 min, plus slack).
# Brief: .orkestrel/veneer/units/bfg-audit-analyst-brief.md (the lane brief copied unaltered)  Claims: .orkestrel/veneer/units/bfg-audit-claims.md  Journal: tmp/codex/bfg-audit-analyst.jsonl  Last message: tmp/codex/bfg-audit-analyst-last.md
cd /home/user/scaffold
timeout 2100 codex exec --json -C /home/user/veneer-bfg --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/bfg-audit-analyst-last.md "Read and execute the brief at .orkestrel/veneer/units/bfg-audit-analyst-brief.md exactly, ruling on every numbered claim in .orkestrel/veneer/units/bfg-audit-claims.md, holding the objective lane. Your final message must be the report the brief's Output section specifies and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/bfg-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/bfg-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/bfg-audit-analyst.err
