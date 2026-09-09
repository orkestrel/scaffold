#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

limit=${1:?root must supply the timeout duration}
grace=${2:?root must supply the kill grace duration}
cursor_versions=/c/Users/mikes/AppData/Local/cursor-agent/versions
cursor_version=$(find "$cursor_versions" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort -V | tail -n 1)
test -n "$cursor_version"
cursor_entry="$cursor_versions/$cursor_version"
cursor_model=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md")
test -n "$cursor_model"
out="$SCR/d7n-publish-foundation-scout-liveness"
test ! -e "$out"
mkdir -p "$out" "$SCAFFOLD/tmp/cursor"
"$cursor_entry/node.exe" "$cursor_entry/index.js" --version > "$out/cursor.version.txt"
git -C "$SCAFFOLD" status --porcelain > "$out/scaffold.before.status.txt"
status=0
timeout --kill-after="$grace" "$limit" "$cursor_entry/node.exe" "$cursor_entry/index.js" -p --trust --mode=ask --model "$cursor_model" --output-format stream-json 'Return exactly LIVENESS.' > "$SCAFFOLD/tmp/cursor/d7n-publish-foundation-scout-liveness.jsonl" 2> "$SCAFFOLD/tmp/cursor/d7n-publish-foundation-scout-liveness.err" || status=$?
printf '%s\n' "$status" > "$out/exit.txt"
git -C "$SCAFFOLD" status --porcelain > "$out/scaffold.after.status.txt"
cmp "$out/scaffold.before.status.txt" "$out/scaffold.after.status.txt"
printf 'foundation scout liveness exit %s\n' "$status"
exit "$status"
