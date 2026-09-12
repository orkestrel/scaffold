#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCAFFOLD/tmp/cursor/d7n-ollama-toolbox-scout"
test ! -e "$out.jsonl"
test ! -e "$out.err"
CURSOR_GROK_MODEL=$(sed -n 's/^CURSOR_GROK_MODEL=//p' "$SCAFFOLD/.claude/agents/grok.md")
test -n "$CURSOR_GROK_MODEL"
export CURSOR_GROK_MODEL
git -C "$FLEET/ollama" status --porcelain=v1 --untracked-files=all > "$out.ollama-before.txt"
git -C "$FLEET/toolbox" status --porcelain=v1 --untracked-files=all > "$out.toolbox-before.txt"
status=0
if timeout --kill-after=15s 900s 'C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.10-fd3934a/node.exe' 'C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.10-fd3934a/index.js' -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" --output-format stream-json 'Read C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/d7n-ollama-toolbox-scout-brief.md and perform that bounded read-only assignment. Return the required concise distillate.' > "$out.jsonl" 2> "$out.err"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out.exit.txt"
git -C "$FLEET/ollama" status --porcelain=v1 --untracked-files=all > "$out.ollama-after.txt"
git -C "$FLEET/toolbox" status --porcelain=v1 --untracked-files=all > "$out.toolbox-after.txt"
exit "$status"
