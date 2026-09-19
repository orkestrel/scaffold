#!/usr/bin/env bash
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
timeout 2700 codex exec --json -C . --sandbox read-only --model gpt-5.6-sol -c "model_reasoning_effort=\"high\"" --output-last-message tmp/codex/redesign-analyst-last.md "Read and execute the brief at tmp/codex/redesign-design-brief.md exactly. You hold the OBJECTIVE lane. Your final message must be the design argument that brief's Output section specifies, in its exact section order." < /dev/null > tmp/codex/redesign-analyst.jsonl 2>&1
echo "exit=$?"
