#!/bin/bash
# AP-TYPE audit round 5, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-apt.
# Derived from apt-audit-4-analyst.sh for the AP-TYPE round-5 audit (the partial sentences and the infix term). Launched through codex-queue-2.sh; the cap is 1500 s (the round-3 objective lane ran about 12 min on a wider subject, plus slack).
# Brief: .orkestrel/veneer/units/apt-audit-5-analyst-brief.md  Claims: .orkestrel/veneer/units/apt-audit-5-claims.md  Journal: tmp/codex/apt-audit-5-analyst.jsonl  Last message: tmp/codex/apt-audit-5-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1500 codex exec --json -C /home/user/veneer-apt --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/apt-audit-5-analyst-last.md "Your working directory is /home/user/veneer-apt. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/apt-audit-5-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/apt-audit-5-analyst.jsonl 2> /home/user/scaffold/tmp/codex/apt-audit-5-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/apt-audit-5-analyst.err
