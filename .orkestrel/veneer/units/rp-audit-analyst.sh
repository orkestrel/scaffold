#!/bin/bash
# Audit — RP (Veneer re-pin), objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-rp.
# Derived from t5-audit-5-analyst.sh by hand for the RP subject. Launched through codex-queue-2.sh after a bounded probe; the cap is 1500 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/rp-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/rp-audit-claims.md  Journal: tmp/codex/rp-audit-analyst.jsonl  Last message: tmp/codex/rp-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1500 codex exec --json -C /home/user/veneer-rp --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/rp-audit-analyst-last.md "Your working directory is /home/user/veneer-rp. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/rp-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/rp-audit-claims.md holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/rp-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/rp-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/rp-audit-analyst.err
