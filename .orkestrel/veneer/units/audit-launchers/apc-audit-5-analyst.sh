#!/bin/bash
# AP-COLOR audit round 5, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-apc.
# Derived from apc-audit-4-analyst.sh for the AP-COLOR round-5 audit (the title rule across the color proof). Launched through codex-queue-2.sh; the cap is 1500 s (the round-3 objective lane ran about 12 min on a wider subject, plus slack).
# Brief: .orkestrel/veneer/units/apc-audit-5-analyst-brief.md  Claims: .orkestrel/veneer/units/apc-audit-5-claims.md  Journal: tmp/codex/apc-audit-5-analyst.jsonl  Last message: tmp/codex/apc-audit-5-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1500 codex exec --json -C /home/user/veneer-apc --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/apc-audit-5-analyst-last.md "Your working directory is /home/user/veneer-apc. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/apc-audit-5-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/apc-audit-5-analyst.jsonl 2> /home/user/scaffold/tmp/codex/apc-audit-5-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/apc-audit-5-analyst.err
