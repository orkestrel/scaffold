#!/bin/bash
# E-ID-MOTION-MODAL audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-mmod. Launched through codex-queue-2.sh; the cap is 2100 s (an audit round over one unit, plus slack).
# Brief: .orkestrel/veneer/units/mmod-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/mmod-audit-claims.md  Journal: tmp/codex/mmod-audit-analyst.jsonl  Last message: tmp/codex/mmod-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 2100 codex exec --json -C /home/user/veneer-mmod --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/mmod-audit-analyst-last.md "Your working directory is /home/user/veneer-mmod. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/mmod-audit-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/mmod-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/mmod-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/mmod-audit-analyst.err
