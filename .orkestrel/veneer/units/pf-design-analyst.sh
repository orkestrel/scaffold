#!/bin/bash
# PAGE-FRAME design round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer.
# Command in the form the wave-2 and wave-3 audit lanes use; the bench round-tripped at 04:48 (rd-audit-analyst returned exit 0); the Orchestrator sized the cap (2100 s: design lanes ran about 25 min, plus slack). Launched through codex-queue-2.sh.
# Brief: .orkestrel/veneer/units/pf-design-brief.md  Journal: tmp/codex/pf-design-analyst.jsonl  Last message: tmp/codex/pf-design-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 2100 codex exec --json -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/pf-design-analyst-last.md "Your working directory is /home/user/veneer. Read and execute the design brief at /home/user/scaffold/.orkestrel/veneer/units/pf-design-brief.md exactly, holding the objective lane. Make your final message the proposal the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/pf-design-analyst.jsonl 2> /home/user/scaffold/tmp/codex/pf-design-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/pf-design-analyst.err
