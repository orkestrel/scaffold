#!/bin/bash
# F8c SERVICE design round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-f8b.
# Brief: /home/user/veneer-f8b/tmp/units/f8c-design-brief.md  Journal: tmp/codex/f8c-design-analyst.jsonl  Last message: tmp/codex/f8c-design-analyst-last.md
# Cap: 2100 s.
cd /home/user/scaffold
timeout 2100 codex exec --json -C /home/user/veneer-f8b --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/f8c-design-analyst-last.md "Read and execute the design brief at /home/user/veneer-f8b/tmp/units/f8c-design-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Read /home/user/scaffold/AGENTS.md and the rule files the brief names before ruling. Your final message must be the proposal in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/f8c-design-analyst.jsonl 2> tmp/codex/f8c-design-analyst.err
echo "exit=$?" >> tmp/codex/f8c-design-analyst.err
