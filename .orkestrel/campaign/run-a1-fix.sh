#!/usr/bin/env bash
# Unit A1-fix: `sol` route on GPT 6 Astra, workspace-write, rooted at the agent checkout.
# Cap: 3600 s. Journal: scaffold/tmp/codex/a1-fix.jsonl. Report: agent/tmp/units/a1-fix-report.md (and a1-fix-last.md).
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
AGENT="C:/Users/mikes/WebstormProjects/agent"
cd "$SCAF" || exit 9
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-fix.status-before.txt"
git -C "$ROOT/agent" rev-parse --short HEAD >> "$SCAF/tmp/codex/a1-fix.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a1-fix.launch.txt"
timeout 3600 codex exec --json -C "$AGENT" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$AGENT/tmp/units/a1-fix-last.md" "Read and execute the brief at tmp/units/a1-fix-brief.md exactly. It is unit A1-fix. Your final message must be the report it specifies, and you also write that report to tmp/units/a1-fix-report.md." < /dev/null > "$SCAF/tmp/codex/a1-fix.jsonl" 2> "$SCAF/tmp/codex/a1-fix.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a1-fix.launch.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-fix.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a1-fix.launch.txt"
