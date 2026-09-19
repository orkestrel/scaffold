#!/usr/bin/env bash
# Unit R1-terrain: grok lane (read-only absorption) through the Cursor CLI's Windows versioned
# entry, model cursor-grok-4.6-high, print mode, stream-json journal beside the brief under the
# scaffold checkout's tmp/cursor/. The working directory is the roughnotes checkout the brief reads.
set -u
scaffold="C:/Users/mikes/WebstormProjects/scaffold"
target="C:/Users/mikes/WebstormProjects/roughnotes"
entry="C:/Users/mikes/AppData/Local/cursor-agent/versions/2026.09.15-d2fe57e"
cd "$target" || exit 1
echo "status before: $(git status --porcelain | wc -l) lines"
start=$(date +%s)
"$entry/node.exe" "$entry/index.js" -p --trust --mode=ask --model cursor-grok-4.6-high --output-format stream-json \
	"Read and execute the brief at C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/r1-terrain-brief.md exactly. It is read-only. Your final answer is only the shape its Output section specifies." \
	> "$scaffold/tmp/cursor/r1-terrain.jsonl" 2> "$scaffold/tmp/cursor/r1-terrain.err"
echo "r1_terrain_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "status after: $(git status --porcelain | wc -l) lines"
grep -o '"session_id":"[^"]*"' "$scaffold/tmp/cursor/r1-terrain.jsonl" | head -1
wc -c "$scaffold/tmp/cursor/r1-terrain.jsonl"
tail -3 "$scaffold/tmp/cursor/r1-terrain.err"
