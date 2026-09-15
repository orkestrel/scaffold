#!/usr/bin/env bash
# Unit A1-fix, second run on the successor brief (a1-fix-brief-2.md supersedes a1-fix-brief.md after the pipe-cancellation deviation).
# Cap: 3600 s. Journal: scaffold/tmp/codex/a1-fix-2.jsonl. Report: agent/tmp/units/a1-fix-report-2.md (and a1-fix-2-last.md).
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
AGENT="C:/Users/mikes/WebstormProjects/agent"
cd "$SCAF" || exit 9
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-fix-2.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a1-fix-2.launch.txt"
timeout 3600 codex exec --json -C "$AGENT" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$AGENT/tmp/units/a1-fix-2-last.md" "Read tmp/units/a1-fix-brief.md, then tmp/units/a1-fix-report.md, then tmp/units/a1-fix-brief-2.md, which supersedes the first brief, and execute them exactly. It is unit A1-fix, second run, on a tree where the first run's work is already landed. Your final message must be the report the successor specifies, and you also write that report to tmp/units/a1-fix-report-2.md." < /dev/null > "$SCAF/tmp/codex/a1-fix-2.jsonl" 2> "$SCAF/tmp/codex/a1-fix-2.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a1-fix-2.launch.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-fix-2.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a1-fix-2.launch.txt"
