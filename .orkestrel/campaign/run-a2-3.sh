#!/usr/bin/env bash
# Unit A2, third run (a2-brief-3.md rules F9: readText reports completion so the relay can answer 413).
# Cap: 5400 s. Journal: scaffold/tmp/codex/a2-3.jsonl. Report: agent/tmp/units/a2-report-3.md (and a2-3-last.md).
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
AGENT="C:/Users/mikes/WebstormProjects/agent"
cd "$SCAF" || exit 9
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a2-3.status-before.txt"
git -C "$ROOT/agent" rev-parse --short HEAD >> "$SCAF/tmp/codex/a2-3.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a2-3.launch.txt"
timeout 5400 codex exec --json -C "$AGENT" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$AGENT/tmp/units/a2-3-last.md" "Read tmp/units/a2-brief.md, tmp/units/a2-report.md, tmp/units/a2-brief-2.md, tmp/units/a2-report-2.md, and then tmp/units/a2-brief-3.md, which supersedes the earlier briefs, and execute them exactly. It is unit A2, third run. Complete the whole unit; the third brief rules the readText widening and restates the deviation contract. Your final message must be the report the third brief specifies, and you also write that report to tmp/units/a2-report-3.md." < /dev/null > "$SCAF/tmp/codex/a2-3.jsonl" 2> "$SCAF/tmp/codex/a2-3.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a2-3.launch.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a2-3.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a2-3.launch.txt"
