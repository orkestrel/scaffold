#!/bin/bash
# LABEL-CONTRAST design round, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at /home/user/veneer-ct (THEME's worktree, which carries the landing token values).
# Derived from pf-design-analyst.sh with every subject field rewritten; the bench round-tripped at 12:59 (ct-audit-analyst launched through this queue); the cap is 2100 s (design lanes ran about 25 min, plus slack). Launched through codex-queue-2.sh.
# Brief: .orkestrel/veneer/units/label-contrast-design-brief.md  Journal: tmp/codex/label-contrast-design-analyst.jsonl  Last message: tmp/codex/label-contrast-design-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 2100 codex exec --json -C /home/user/veneer-ct --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message /home/user/scaffold/tmp/codex/label-contrast-design-analyst-last.md "Your working directory is /home/user/veneer-ct. Read and execute the design brief at /home/user/scaffold/.orkestrel/veneer/units/label-contrast-design-brief.md exactly, holding the objective lane. Make your final message the proposal the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/label-contrast-design-analyst.jsonl 2> /home/user/scaffold/tmp/codex/label-contrast-design-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/label-contrast-design-analyst.err
