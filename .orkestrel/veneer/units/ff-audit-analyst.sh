#!/bin/bash
# Audit round 1 — FOCUS-FRAME (`ff`), objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-ff.
# Written by pb-audit-briefs.py. Launched through codex-queue-2.sh after a bounded probe; the cap is 1800 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/ff-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/ff-audit-claims.md  Journal: tmp/codex/ff-audit-analyst.jsonl  Last message: tmp/codex/ff-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C /home/user/veneer-ff --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/ff-audit-analyst-last.md "Your working directory is /home/user/veneer-ff. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/ff-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/ff-audit-claims.md holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/ff-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/ff-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/ff-audit-analyst.err
