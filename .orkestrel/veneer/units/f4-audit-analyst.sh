#!/bin/bash
# F4 audit round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at the Veneer checkout (66-file working tree over 751c3ed).
# Brief: tmp/audit/f4-audit-analyst-brief.md (claims: tmp/audit/f4-audit-claims.md; evidence: tmp/audit/f4-audit-evidence.md)
# Journal: tmp/codex/f4-audit-analyst.jsonl  Last message: tmp/codex/f4-audit-analyst-last.md
# Cap: 5400 s (sixteen claims over a bounded diff; the veneer-audit analyst lane over the whole tree ran under that cap on 2026-09-22).
cd /home/user/scaffold
timeout 5400 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/f4-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/f4-audit-analyst-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/f4-audit-analyst.jsonl 2> tmp/codex/f4-audit-analyst.err
echo "exit=$?" >> tmp/codex/f4-audit-analyst.err
