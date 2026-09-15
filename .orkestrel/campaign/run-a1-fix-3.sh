#!/usr/bin/env bash
# Unit A1-fix, third run (a1-fix-brief-3.md rules the F8 seam: the headers hook receives the combined signal).
# Cap: 3600 s. Journal: scaffold/tmp/codex/a1-fix-3.jsonl. Report: agent/tmp/units/a1-fix-report-3.md (and a1-fix-3-last.md).
ROOT=/c/Users/mikes/WebstormProjects
SCAF="$ROOT/scaffold"
AGENT="C:/Users/mikes/WebstormProjects/agent"
cd "$SCAF" || exit 9
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-fix-3.status-before.txt"
date -u +%FT%TZ > "$SCAF/tmp/codex/a1-fix-3.launch.txt"
timeout 3600 codex exec --json -C "$AGENT" --sandbox workspace-write --model gpt-6-astra -c 'model_reasoning_effort="high"' --output-last-message "$AGENT/tmp/units/a1-fix-3-last.md" "Read tmp/units/a1-fix-brief.md, tmp/units/a1-fix-report.md, tmp/units/a1-fix-brief-2.md, tmp/units/a1-fix-report-2.md, and then tmp/units/a1-fix-brief-3.md, which supersedes the earlier briefs, and execute them exactly. It is unit A1-fix, third run, on a tree carrying the first run's landed work. Complete every item; the third brief rules the F8 seam and restates the deviation contract. Your final message must be the report the third brief specifies, and you also write that report to tmp/units/a1-fix-report-3.md." < /dev/null > "$SCAF/tmp/codex/a1-fix-3.jsonl" 2> "$SCAF/tmp/codex/a1-fix-3.err"
echo "exit=$?" >> "$SCAF/tmp/codex/a1-fix-3.launch.txt"
git -C "$ROOT/agent" status --porcelain > "$SCAF/tmp/codex/a1-fix-3.status-after.txt"
date -u +%FT%TZ >> "$SCAF/tmp/codex/a1-fix-3.launch.txt"
