#!/usr/bin/env bash
# Unit A1, second run on the successor brief (a1-brief-2.md supersedes a1-brief.md after a contract-equality deviation).
# Cap: 5400 s. Journal: scaffold/tmp/codex/a1-2.jsonl. Report: agent/tmp/units/a1-report-2.md (and a1-2-last.md).
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
AGENT="C:/Users/mikes/WebstormProjects/agent"
cd "$SCAF" || exit 9
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-2.status-before.txt"
git -C "$ROOT/agent" rev-parse --short HEAD >> "$SCAF/tmp/codex/a1-2.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a1-2.launch.txt"
timeout 5400 codex exec --json -C "$AGENT" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$AGENT/tmp/units/a1-2-last.md" "Read tmp/units/a1-brief.md and then tmp/units/a1-brief-2.md, which supersedes it, and execute them exactly. It is unit A1, second run. Your final message must be the report the successor specifies, and you also write that report to tmp/units/a1-report-2.md." < /dev/null > "$SCAF/tmp/codex/a1-2.jsonl" 2> "$SCAF/tmp/codex/a1-2.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a1-2.launch.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-2.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a1-2.launch.txt"
