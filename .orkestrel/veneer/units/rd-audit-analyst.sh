#!/bin/bash
# Audit round 1 — RAMP-DOWN (`rd`), objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-rd.
# Written by rd-audit-briefs.py. Launched through codex-queue-2.sh after a bounded probe; the cap is 1800 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/rd-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/rd-audit-claims.md  Journal: tmp/codex/rd-audit-analyst.jsonl  Last message: tmp/codex/rd-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C /home/user/veneer-rd --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/rd-audit-analyst-last.md "Your working directory is /home/user/veneer-rd. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/rd-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/rd-audit-claims.md holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/rd-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/rd-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/rd-audit-analyst.err
