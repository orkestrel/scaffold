#!/bin/bash
# Audit round 1 — RESIDUE (`dr`), objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-dr.
# Launched through codex-queue-2.sh; the bench round-tripped at 02:57 (ue-audit-2 returned exit 0); the cap is 900 s for a two-file subject.
# Brief: .orkestrel/veneer/units/dr-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/dr-audit-claims.md  Journal: tmp/codex/dr-audit-analyst.jsonl  Last message: tmp/codex/dr-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 900 codex exec --json -C /home/user/veneer-dr --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/dr-audit-analyst-last.md "Your working directory is /home/user/veneer-dr. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/dr-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/dr-audit-claims.md holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/dr-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/dr-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/dr-audit-analyst.err
