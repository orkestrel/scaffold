#!/bin/bash
# Audit round 5 — T5 TEST-FRAME (`t5`), objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/test-tf.
# Derived from t5-audit-4-analyst.sh by t5-audit-5-briefs.py. Launched through codex-queue-2.sh after a bounded probe; the cap is 1800 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/t5-audit-5-analyst-brief.md  Claims: .orkestrel/veneer/units/t5-audit-5-claims.md  Journal: tmp/codex/t5-audit-5-analyst.jsonl  Last message: tmp/codex/t5-audit-5-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C /home/user/test-tf --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/t5-audit-5-analyst-last.md "Your working directory is /home/user/test-tf. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/t5-audit-5-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/t5-audit-5-claims.md holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/t5-audit-5-analyst.jsonl 2> /home/user/scaffold/tmp/codex/t5-audit-5-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/t5-audit-5-analyst.err
