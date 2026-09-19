#!/usr/bin/env bash
# G1 launch: the Cursor Grok absorption lane over the roughnotes journey instruments.
# Form taken from .agents/transports/cursor.md; the versioned entry, never the shim.
set -u
scaffold="C:/Users/mikes/WebstormProjects/scaffold"
subject="C:/Users/mikes/WebstormProjects/roughnotes"
versions="$LOCALAPPDATA/cursor-agent/versions"
entry="$(ls -d "$versions"/*/ | sort | tail -1)"
export CURSOR_GROK_MODEL=cursor-grok-4.6-high
cd "$subject" || exit 1
start=$(date +%s)
"$entry/node.exe" "$entry/index.js" -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" \
	--output-format stream-json \
	"Read and answer the brief at $scaffold/tmp/cursor/g1-brief.md exactly. Your final message must be the Output section it specifies." \
	> "$scaffold/tmp/cursor/g1.jsonl" 2> "$scaffold/tmp/cursor/g1.err"
echo "g1_EXIT=$? elapsed=$(( $(date +%s) - start ))s"
echo "--- init ---"
head -c 400 "$scaffold/tmp/cursor/g1.jsonl"
echo
echo "--- result ---"
grep -o '"type":"result".\{0,300\}' "$scaffold/tmp/cursor/g1.jsonl" | head -1
echo "--- err tail ---"
tail -5 "$scaffold/tmp/cursor/g1.err"
