#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
limit=${1:?root must supply timeout duration}
grace=${2:?root must supply kill grace duration}
cursor_entry=/c/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.10-fd3934a
cursor_model=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md")
out="$SCR/d7n-upper-layer-scout"
test ! -e "$out"
mkdir "$out"
"$cursor_entry/node.exe" "$cursor_entry/index.js" --version > "$out/cursor.version.txt"
git -C "$SCAFFOLD" status --porcelain > "$out/scaffold.before.status.txt"
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/scaffold.before.diff.txt"
status=0
timeout --kill-after="$grace" "$limit" "$cursor_entry/node.exe" "$cursor_entry/index.js" -p --trust --mode=ask --model "$cursor_model" --output-format stream-json 'Read every instruction referenced by C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-upper-layer-scout-brief.md completely before task actions, then execute the saved brief as the bounded read-only evidence collection it specifies. Return only its requested evidence distillate. This is evidence, never acceptance.' > "$SCAFFOLD/tmp/cursor/d7n-upper-layer-scout.jsonl" 2> "$SCAFFOLD/tmp/cursor/d7n-upper-layer-scout.err" || status=$?
printf '%s\n' "$status" > "$out/exit.txt"
git -C "$SCAFFOLD" status --porcelain > "$out/scaffold.after.status.txt"
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/scaffold.after.diff.txt"
cmp "$out/scaffold.before.status.txt" "$out/scaffold.after.status.txt"
cmp "$out/scaffold.before.diff.txt" "$out/scaffold.after.diff.txt"
exit "$status"
