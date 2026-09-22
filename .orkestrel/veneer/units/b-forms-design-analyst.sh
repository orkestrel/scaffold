#!/bin/bash
# B-FORMS design round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer.
# Brief: tmp/units/b-forms-design-brief.md  Journal: tmp/codex/b-forms-design-analyst.jsonl  Last message: tmp/codex/b-forms-design-analyst-last.md
# Cap: 2400 s.
cd /home/user/scaffold
timeout 2400 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/tmp/codex/b-forms-design-analyst-last.md "Read and execute the design brief at /home/user/scaffold/tmp/units/b-forms-design-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the proposal in the shape that brief's Output section specifies, and nothing else." < /dev/null > tmp/codex/b-forms-design-analyst.jsonl 2> tmp/codex/b-forms-design-analyst.err
echo "exit=$?" >> tmp/codex/b-forms-design-analyst.err
