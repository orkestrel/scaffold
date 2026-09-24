#!/bin/bash
# AP-TYPE audit round 2, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-apt.
# Derived from apc-audit-2-analyst.sh for the AP-TYPE round-2 audit. Launched through codex-queue-2.sh; the cap is 1800 s (comparable objective audit lanes ran 7 to 15 min, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/apt-audit-2-analyst-brief.md  Claims: .orkestrel/veneer/units/apt-audit-2-claims.md  Journal: tmp/codex/apt-audit-2-analyst.jsonl  Last message: tmp/codex/apt-audit-2-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C /home/user/veneer-apt --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/apt-audit-2-analyst-last.md "Your working directory is /home/user/veneer-apt. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/apt-audit-2-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/apt-audit-2-analyst.jsonl 2> /home/user/scaffold/tmp/codex/apt-audit-2-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/apt-audit-2-analyst.err
