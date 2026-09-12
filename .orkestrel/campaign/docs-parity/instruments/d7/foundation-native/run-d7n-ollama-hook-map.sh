#!/usr/bin/env bash
# Launch d7n-ollama-hook-map; journal: tmp/cursor/d7n-ollama-hook-map.jsonl.
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
pin="$(awk '/^CURSOR_GROK_MODEL=/{sub(/^CURSOR_GROK_MODEL=/, ""); print; exit}' .claude/agents/grok.md)"
test -n "$pin"
test ! -e tmp/cursor/d7n-ollama-hook-map.jsonl
git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all > tmp/cursor/d7n-ollama-hook-map.before.txt
status=0
if timeout --kill-after=15s 600s \
  C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.10-fd3934a/node.exe \
  C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.10-fd3934a/index.js \
  -p --trust --mode=ask --model "$pin" --output-format stream-json \
  'Read tmp/units/d7n-ollama-hook-map-brief.md. The rejected provisioner candidate has now been removed by root; read the stable existing source. Return only the requested bounded evidence.' \
  > tmp/cursor/d7n-ollama-hook-map.jsonl 2> tmp/cursor/d7n-ollama-hook-map.err; then
  status=0
else
  status=$?
fi
printf '%s\n' "$status" > tmp/cursor/d7n-ollama-hook-map.exit.txt
git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all > tmp/cursor/d7n-ollama-hook-map.after.txt
exit "$status"
