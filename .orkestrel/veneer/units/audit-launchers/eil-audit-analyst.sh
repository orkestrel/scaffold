#!/bin/bash
# E-ID audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-eil. Launched through codex-queue-2.sh; the cap is 1800 s (comparable objective audit lanes ran 10 to 20 min, plus slack).
# Brief: .orkestrel/veneer/units/eil-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/eil-audit-claims.md  Journal: tmp/codex/eil-audit-analyst.jsonl  Last message: tmp/codex/eil-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C /home/user/veneer-eil --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/eil-audit-analyst-last.md "Your working directory is /home/user/veneer-eil. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/eil-audit-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/eil-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/eil-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/eil-audit-analyst.err
