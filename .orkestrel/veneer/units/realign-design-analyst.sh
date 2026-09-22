#!/bin/bash
# Design round, objective lane: `analyst` on GPT-6 Astra (user ruling 2026-09-22), read-only, rooted at scaffold.
# Brief: .orkestrel/veneer/units/realign-design-brief.md  Journal: .orkestrel/veneer/units/realign-design-analyst.jsonl  Last message: .orkestrel/veneer/units/realign-design-analyst-last.md
# Cap: 5400 s (a whole-campaign design read; the previous session's Astra lanes ran under 7200).
cd /home/user/scaffold
timeout 5400 codex exec --json -C /home/user/scaffold --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message /home/user/scaffold/.orkestrel/veneer/units/realign-design-analyst-last.md "Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/realign-design-brief.md exactly. You are the analyst lane on GPT-6 Astra and you hold the objective lane. Your final message must be the answer that brief's Output section specifies, under exactly its headings." < /dev/null > .orkestrel/veneer/units/realign-design-analyst.jsonl 2> .orkestrel/veneer/units/realign-design-analyst.err
echo "exit=$?" >> .orkestrel/veneer/units/realign-design-analyst.err
