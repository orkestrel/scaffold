#!/usr/bin/env bash
# Unit A2: `sol` route on GPT 6 Astra, workspace-write, rooted at the agent checkout.
# Cap: 5400 s. Journal: scaffold/tmp/codex/a2.jsonl. Report: agent/tmp/units/a2-report.md (and a2-last.md).
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
AGENT="C:/Users/mikes/WebstormProjects/agent"
cd "$SCAF" || exit 9
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a2.status-before.txt"
git -C "$ROOT/agent" rev-parse --short HEAD >> "$SCAF/tmp/codex/a2.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a2.launch.txt"
timeout 5400 codex exec --json -C "$AGENT" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$AGENT/tmp/units/a2-last.md" "Read and execute the brief at tmp/units/a2-brief.md exactly. It is unit A2. Your final message must be the report it specifies, and you also write that report to tmp/units/a2-report.md." < /dev/null > "$SCAF/tmp/codex/a2.jsonl" 2> "$SCAF/tmp/codex/a2.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a2.launch.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a2.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a2.launch.txt"
