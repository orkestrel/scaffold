#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

cursor_entry=/c/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.08-6caf4ff
cursor_model=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md")
test -n "$cursor_model"
test -f "$SCAFFOLD/tmp/units/d7n-guide-native-tooling-scout-brief.md"
out="$SCR/d7n-guide-native-tooling-scout"
test ! -e "$out"
mkdir -p "$out" "$SCAFFOLD/tmp/cursor"
git -C "$SCAFFOLD" status --porcelain > "$out/scaffold.before.status.txt"
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/scaffold.before.diff.txt"
status=0
timeout --kill-after=15s 900s "$cursor_entry/node.exe" "$cursor_entry/index.js" -p --trust --mode=ask --model "$cursor_model" --output-format stream-json 'Read every instruction referenced by C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-guide-native-tooling-scout-brief.md completely before task actions, then execute the saved brief as the bounded read-only evidence collection it specifies. Return only its requested evidence distillate. This is evidence, never acceptance.' > "$SCAFFOLD/tmp/cursor/d7n-guide-native-tooling-scout.jsonl" 2> "$SCAFFOLD/tmp/cursor/d7n-guide-native-tooling-scout.err" || status=$?
printf '%s\n' "$status" > "$out/exit.txt"
git -C "$SCAFFOLD" status --porcelain > "$out/scaffold.after.status.txt"
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/scaffold.after.diff.txt"
cmp "$out/scaffold.before.status.txt" "$out/scaffold.after.status.txt"
cmp "$out/scaffold.before.diff.txt" "$out/scaffold.after.diff.txt"
printf 'tooling scout exit %s\n' "$status"
exit "$status"
