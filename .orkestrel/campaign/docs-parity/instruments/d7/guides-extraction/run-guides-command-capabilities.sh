#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
cursor_entry=/c/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.08-6caf4ff
cursor_model=$(sed -n 's/^CURSOR_GROK_MODEL=//p' .claude/agents/grok.md)
test -n "$cursor_model"
out="$SCR/guides-command-capabilities"
test ! -e "$out"
mkdir -p "$out"
git -C "$SCAFFOLD" status --porcelain > "$out/scaffold.before.status.txt"
git -C "$FLEET/guide" status --porcelain > "$out/guide.before.status.txt"
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/scaffold.before.diff.txt"
git -C "$FLEET/guide" diff HEAD -- . > "$out/guide.before.diff.txt"
status=0
timeout --kill-after=15s 900 "$cursor_entry/node.exe" "$cursor_entry/index.js" -p --trust --mode=ask --model "$cursor_model" --output-format stream-json 'Read and follow C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-guides-command-capabilities-carrier-brief.md. Return its bounded read-only capability evidence, not product acceptance.' > "$SCAFFOLD/tmp/cursor/d7n-guides-command-capabilities.jsonl" 2> "$SCAFFOLD/tmp/cursor/d7n-guides-command-capabilities.err" || status=$?
printf '%s\n' "$status" > "$out/exit.txt"
git -C "$SCAFFOLD" status --porcelain > "$out/scaffold.after.status.txt"
git -C "$FLEET/guide" status --porcelain > "$out/guide.after.status.txt"
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/scaffold.after.diff.txt"
git -C "$FLEET/guide" diff HEAD -- . > "$out/guide.after.diff.txt"
cmp "$out/scaffold.before.diff.txt" "$out/scaffold.after.diff.txt"
cmp "$out/guide.before.diff.txt" "$out/guide.after.diff.txt"
printf 'mechanical evidence exit %s\n' "$status"
exit "$status"
