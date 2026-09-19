#!/usr/bin/env bash
# Unit 4 - Bootstrap system. Writer, workspace-write, sole serial writer from fd959fb.
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
timeout 3600 codex exec --json -C . --sandbox workspace-write --model gpt-6-astra -c "model_reasoning_effort=\"high\"" --output-last-message tmp/codex/u4-last.md "Read and execute the brief at tmp/codex/u4-brief.md exactly. Your final message must be the report its Output section specifies." < /dev/null > tmp/codex/u4.jsonl 2>&1
echo "exit=$?"
