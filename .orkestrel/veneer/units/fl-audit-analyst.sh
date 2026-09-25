#!/bin/bash
# FACTORS-LEDGER audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer. Launched through codex-queue-2.sh; the cap is 1500 s (one sentence and its ledgers, plus slack).
# Brief: .orkestrel/veneer/units/factors-ledger-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/factors-ledger-audit-claims.md  Journal: tmp/codex/fl-audit-analyst.jsonl  Last message: tmp/codex/fl-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1500 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/fl-audit-analyst-last.md "Your working directory is /home/user/veneer. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/factors-ledger-audit-analyst-brief.md exactly. You hold the objective lane of this audit round. Make your final message the verdict the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/fl-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/fl-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/fl-audit-analyst.err
