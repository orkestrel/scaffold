#!/bin/bash
# Design round APPEARANCE, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer.
# Derived from rp-audit-2-analyst.sh for the APPEARANCE design round. Launched through codex-queue-2.sh after a bounded probe; the cap is 1800 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/appearance-design-brief.md  Claims: .orkestrel/veneer/units/appearance-design-brief.md  Journal: tmp/codex/appearance-design-analyst.jsonl  Last message: tmp/codex/appearance-design-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/appearance-design-analyst-last.md "Your working directory is /home/user/veneer. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/appearance-design-brief.md exactly. You hold the objective lane of this design round. Make your final message the proposal the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/appearance-design-analyst.jsonl 2> /home/user/scaffold/tmp/codex/appearance-design-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/appearance-design-analyst.err
