#!/usr/bin/env bash
# Unit A1: `sol` route on GPT 6 Astra, workspace-write, rooted at the agent checkout.
# Cap: 5400 s. Journal: scaffold/tmp/codex/a1.jsonl. Report: agent/tmp/units/a1-report.md (and a1-last.md).
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
AGENT="C:/Users/mikes/WebstormProjects/agent"
cd "$SCAF" || exit 9
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1.status-before.txt"
git -C "$ROOT/agent" rev-parse --short HEAD >> "$SCAF/tmp/codex/a1.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a1.launch.txt"
timeout 5400 codex exec --json -C "$AGENT" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$AGENT/tmp/units/a1-last.md" "Read and execute the brief at tmp/units/a1-brief.md exactly. It is unit A1. Your final message must be the report it specifies, and you also write that report to tmp/units/a1-report.md." < /dev/null > "$SCAF/tmp/codex/a1.jsonl" 2> "$SCAF/tmp/codex/a1.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a1.launch.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a1.launch.txt"
