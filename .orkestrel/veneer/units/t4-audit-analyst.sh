#!/bin/bash
# T4 TEST-CLIP audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/test.
# Probe: codex-queue-24.sh round-trips the bench immediately before this exec. Cap 1200 s (a bounded repair; the gate logs are retained so the lane reads rather than runs).
# Brief: .orkestrel/veneer/units/t4-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/t4-audit-claims.md  Journal: tmp/codex/t4-audit-analyst.jsonl  Last message: tmp/codex/t4-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1200 codex exec --json -C /home/user/test --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/t4-audit-analyst-last.md "Your working directory is /home/user/test. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/t4-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/t4-audit-claims.md holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/t4-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/t4-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/t4-audit-analyst.err
