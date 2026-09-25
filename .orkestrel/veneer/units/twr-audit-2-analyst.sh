#!/bin/bash
# TAILWIND-RECIPE audit round 2, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-twr. Launched through codex-queue-2.sh; the cap is 2100 s (an audit round over one unit, plus slack).
# Brief: .orkestrel/veneer/units/twr-audit-2-analyst-brief.md  Claims: .orkestrel/veneer/units/twr-audit-2-claims.md  Journal: tmp/codex/twr-audit-2-analyst.jsonl  Last message: tmp/codex/twr-audit-2-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 2100 codex exec --json -C /home/user/veneer-twr --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/twr-audit-2-analyst-last.md "Your working directory is /home/user/veneer-twr. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/twr-audit-2-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/twr-audit-2-analyst.jsonl 2> /home/user/scaffold/tmp/codex/twr-audit-2-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/twr-audit-2-analyst.err
