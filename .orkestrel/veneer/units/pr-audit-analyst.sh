#!/bin/bash
# PROOF-RESOLVER (`pr`) verification, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-pr.
# Probe: codex-queue-16.sh round-trips the bench immediately before this exec. Cap 1200 s (a small delta; comparable lanes ran 7 to 12 min).
# Brief: .orkestrel/veneer/units/pr-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/pr-check-brief.md  Journal: tmp/codex/pr-audit-analyst.jsonl  Last message: tmp/codex/pr-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1200 codex exec --json -C /home/user/veneer-pr --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/pr-audit-analyst-last.md "Your working directory is /home/user/veneer-pr. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/pr-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/pr-check-brief.md section Claims holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/pr-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/pr-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/pr-audit-analyst.err
