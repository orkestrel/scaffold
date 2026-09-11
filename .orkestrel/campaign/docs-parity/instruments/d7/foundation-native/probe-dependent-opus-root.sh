#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
status=0
if timeout --kill-after=15s 120s /c/Users/mikes/scoop/shims/claude.exe -p 'Read C:/Users/mikes/WebstormProjects/scaffold/tmp/claude/d7n-dependent-opus-probe-brief.md and reply only as requested.' --model opus --effort high --permission-mode acceptEdits --verbose --output-format stream-json > "$SCAFFOLD/tmp/claude/d7n-dependent-opus-root.jsonl" 2> "$SCAFFOLD/tmp/claude/d7n-dependent-opus-root.stderr"; then
  status=0
else
  status=$?
fi
printf '%s\n' "$status" > "$SCAFFOLD/tmp/claude/d7n-dependent-opus-root.exit.txt"
exit "$status"
