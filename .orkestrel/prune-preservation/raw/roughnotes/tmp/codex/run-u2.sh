#!/usr/bin/env bash
# Unit 2 - variant gate. Writer unit, workspace-write, sole serial writer from b20d049.
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
timeout 3000 codex exec --json -C . --sandbox workspace-write --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message tmp/codex/u2-last.md "Read and execute the brief at tmp/codex/u2-variant-gate-brief.md exactly. Your final message must be the report its Output section specifies." < /dev/null > tmp/codex/u2.jsonl 2>&1
echo "exit=$?"
