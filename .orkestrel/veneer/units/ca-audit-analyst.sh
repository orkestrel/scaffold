#!/bin/bash
# CAROUSEL (ca) audit round 1, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-ca.
# Probe: codex-cli 0.155.1, `Logged in using ChatGPT`, bounded round trip at 15:18 UTC (thread 01a0ced9-1af4-7260-b880-adf089965967). Cap 1500 s (the NAV round-2 lane ran 6.5 min; the unit's logs are retained so the lane reads rather than runs).
# Brief: .orkestrel/veneer/units/ca-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/ca-audit-claims.md  Journal: tmp/codex/ca-audit-analyst.jsonl  Last message: tmp/codex/ca-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1500 codex exec --json -C /home/user/veneer-ca --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/ca-audit-analyst-last.md "Your working directory is /home/user/veneer-ca. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/ca-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/ca-audit-claims.md holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/ca-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/ca-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/ca-audit-analyst.err
