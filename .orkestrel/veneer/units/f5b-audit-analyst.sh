#!/bin/bash
# F5b ACCOUNTING-LEDGER audit round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at the worktree /home/user/veneer-f5b (over 07fc3c3).
# Brief: tmp/audit/f5b-audit-analyst-brief.md (claims: tmp/audit/f5b-audit-claims.md; evidence: tmp/audit/f5b-audit-evidence.md)
# Journal: tmp/codex/f5b-audit-analyst.jsonl  Last message: tmp/codex/f5b-audit-analyst-last.md
# Cap: 5400 s (the F5d lane is the comparable run).
cd /home/user/scaffold
timeout 5400 codex exec --json -C /home/user/veneer-f5b --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/f5b-audit-analyst-last.md "Read and execute the lane brief at /home/user/scaffold/tmp/audit/f5b-audit-analyst-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the verdict in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/f5b-audit-analyst.jsonl 2> tmp/codex/f5b-audit-analyst.err
echo "exit=$?" >> tmp/codex/f5b-audit-analyst.err
