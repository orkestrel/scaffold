#!/bin/bash
# E-ID-MOTION-REDUCED audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-mred. Launched through codex-queue-2.sh; the cap is 2100 s (an audit round over one unit, plus slack).
# Brief: .orkestrel/veneer/units/mred-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/mred-audit-claims.md  Journal: tmp/codex/mred-audit-analyst.jsonl  Last message: tmp/codex/mred-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 2100 codex exec --json -C /home/user/veneer-mred --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/mred-audit-analyst-last.md "Your working directory is /home/user/veneer-mred. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/mred-audit-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/mred-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/mred-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/mred-audit-analyst.err
