#!/bin/bash
# UTIL-PLACEMENT (`upl`) audit round 2, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-upl.
# Probe: codex-queue-13.sh round-trips the bench immediately before this exec. Cap 1500 s (comparable objective lanes ran 7 to 12 min; the writer's logs are retained so the lane reads rather than runs).
# Brief: .orkestrel/veneer/units/upl-audit-2-analyst-brief.md  Claims: .orkestrel/veneer/units/upl-audit-2-claims.md  Journal: tmp/codex/upl-audit-2-analyst.jsonl  Last message: tmp/codex/upl-audit-2-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1500 codex exec --json -C /home/user/veneer-upl --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/upl-audit-2-analyst-last.md "Your working directory is /home/user/veneer-upl. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/upl-audit-2-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/upl-audit-2-claims.md holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/upl-audit-2-analyst.jsonl 2> /home/user/scaffold/tmp/codex/upl-audit-2-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/upl-audit-2-analyst.err
