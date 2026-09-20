#!/usr/bin/env bash
# Unit plan-v2-analyst: objective lane of the Veneer plan design round.
# Engine gpt-6-astra through codex exec, read-only, rooted at the WebstormProjects folder so the
# lane can read scaffold, veneer, elements, mailbox, test, and roughnotes by relative path.
# Journal: scaffold/.orkestrel/veneer/plan-v2-analyst.jsonl. Answer: scaffold/.orkestrel/veneer/plan-v2-analyst-last.md.
cd "C:/Users/mikes/WebstormProjects" || exit 9
timeout 2700 codex exec --json -C "C:/Users/mikes/WebstormProjects" --skip-git-repo-check --sandbox read-only --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message scaffold/.orkestrel/veneer/plan-v2-analyst-last.md "Read and execute the brief at scaffold/.orkestrel/veneer/plan-v2-design-brief.md exactly. You hold the OBJECTIVE lane. Your final message must be the verdict it specifies and nothing else." < /dev/null > scaffold/.orkestrel/veneer/plan-v2-analyst.jsonl 2> scaffold/.orkestrel/veneer/plan-v2-analyst.err
echo "exit=$?" >> scaffold/.orkestrel/veneer/plan-v2-analyst.err
