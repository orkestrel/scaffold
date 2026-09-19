#!/usr/bin/env bash
# Successor to tmp/codex/run-analyst.sh. Changed: model gpt-5.6-sol -> gpt-6-astra,
# on the user's instruction mid-campaign. Own log: tmp/codex/redesign-analyst-astra.jsonl.
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
timeout 2700 codex exec --json -C . --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message tmp/codex/redesign-analyst-last.md "Read and execute the brief at tmp/codex/redesign-design-brief.md exactly. You hold the OBJECTIVE lane. Your final message must be the design argument that brief's Output section specifies, in its exact section order." < /dev/null > tmp/codex/redesign-analyst-astra.jsonl 2>&1
echo "exit=$?"
