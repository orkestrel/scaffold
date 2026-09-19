#!/usr/bin/env bash
# Unit 8b - nested scope repaint leak. Writer, workspace-write, sole serial writer from 1930afb.
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
timeout 3600 codex exec --json -C . --sandbox workspace-write --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message tmp/codex/u8b-last.md "Read and execute the brief at tmp/codex/u8b-brief.md exactly. Your final message must be the report its Output section specifies." < /dev/null > tmp/codex/u8b.jsonl 2>&1
echo "exit=$?"
