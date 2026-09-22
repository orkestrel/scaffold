#!/bin/bash
# L1 LEDGER-HOME audit, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-ledger.
# Brief: .orkestrel/veneer/units/l1-audit-analyst-brief.md  Claims: tmp/audit/l1-audit-claims.md  Journal: tmp/codex/l1-audit-analyst.jsonl  Last message: tmp/codex/l1-audit-analyst-last.md
# Cap: 1800 s.
cd /home/user/scaffold
timeout 1200 codex exec --json -C /home/user/veneer-ledger --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/l1-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/l1-audit-analyst-brief.md exactly, ruling on every claim in /home/user/scaffold/tmp/audit/l1-audit-claims.md. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/l1-audit-analyst.jsonl 2> tmp/codex/l1-audit-analyst.err
echo "exit=$?" >> tmp/codex/l1-audit-analyst.err
