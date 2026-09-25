#!/bin/bash
# E-ID-BUTTON-CASCADE fix-round audit 3, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-ebc. Launched through codex-queue-2.sh; the cap is 1800 s (a fix-round audit, plus slack).
# Brief: .orkestrel/veneer/units/ebc-audit-3-analyst-brief.md  Claims: .orkestrel/veneer/units/ebc-audit-3-claims.md  Journal: tmp/codex/ebc-audit-3-analyst.jsonl  Last message: tmp/codex/ebc-audit-3-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C /home/user/veneer-ebc --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/ebc-audit-3-analyst-last.md "Your working directory is /home/user/veneer-ebc. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/ebc-audit-3-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/ebc-audit-3-analyst.jsonl 2> /home/user/scaffold/tmp/codex/ebc-audit-3-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/ebc-audit-3-analyst.err
