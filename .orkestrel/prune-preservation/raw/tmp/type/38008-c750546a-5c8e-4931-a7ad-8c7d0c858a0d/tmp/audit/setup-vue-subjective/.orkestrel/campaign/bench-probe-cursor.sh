#!/usr/bin/env bash
# Bench liveness probe for the Cursor Grok bench through the versioned entry, per
# .agents/transports/cursor.md: never the agent/agent.cmd/agent.ps1 shims on Windows.
set -u
here="$(cd "$(dirname "$0")" && pwd)"
cd "$here" || exit 1
versions="$LOCALAPPDATA/cursor-agent/versions"
entry="$(ls -d "$versions"/*/ 2>/dev/null | sort | tail -1)"
echo "versioned entry: $entry"
ls "$entry" | head -20
node="$entry/node.exe"
index="$entry/index.js"
[ -x "$node" ] || { echo "no node.exe under the versioned entry"; exit 2; }
[ -f "$index" ] || { echo "no index.js under the versioned entry"; exit 2; }
start=$(date +%s)
timeout 240 "$node" "$index" -p --trust --mode=ask --model cursor-grok-4.6-high \
	--output-format stream-json "Reply with exactly the single word: ready" \
	> "$here/cursor-probe.jsonl" 2> "$here/cursor-probe.err"
echo "cursor_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- journal head ---"
head -c 800 "$here/cursor-probe.jsonl"
echo
echo "--- result event ---"
grep -o '"type":"result".\{0,400\}' "$here/cursor-probe.jsonl" | head -2
echo "--- err tail ---"
tail -5 "$here/cursor-probe.err"
