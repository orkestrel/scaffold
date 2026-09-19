#!/usr/bin/env bash
set -u
cd /c/Users/mikes/WebstormProjects/roughnotes
for M in gpt-5.6-sol gpt-6-astra; do
  echo "=== MODEL $M ==="
  timeout 180 codex exec --json -C . --sandbox read-only --model "$M" \
    --output-last-message "tmp/codex/probe-$M-last.md" \
    "Reply with exactly: LIVE $M" < /dev/null > "tmp/codex/probe-$M.jsonl" 2>&1
  echo "exit=$?"
  tail -c 400 "tmp/codex/probe-$M-last.md" 2>/dev/null
  echo
done
