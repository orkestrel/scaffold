#!/bin/bash
# AP-COLOR audit round 1, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-apc.
# Derived from appearance-design-analyst.sh for the AP-COLOR audit. Launched through codex-queue-2.sh; the cap is 1800 s (comparable objective audit lanes ran 7 to 15 min, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/apc-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/apc-audit-claims.md  Journal: tmp/codex/apc-audit-analyst.jsonl  Last message: tmp/codex/apc-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C /home/user/veneer-apc --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/apc-audit-analyst-last.md "Your working directory is /home/user/veneer-apc. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/apc-audit-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/apc-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/apc-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/apc-audit-analyst.err
