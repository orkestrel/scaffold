#!/usr/bin/env bash
# The Orchestrator's second Grok queue (2026-09-25), launched only after run-recon.sh ends (Bench law 4): SWIPE-TERRAIN,
# then EXIT-EVIDENCE, one lane at a time, from the parent of every repository they read. Successor of run-swipe.sh,
# which it replaces unrun; same launch form and containment check.
set -u
DIR=/c/Users/mikes/WebstormProjects/scaffold/tmp/cursor
ROOT=/c/Users/mikes/WebstormProjects
CURSOR_GROK_MODEL=grok-4.7-high
V=$(ls -t "$LOCALAPPDATA/cursor-agent/versions/" | head -1)
E="$LOCALAPPDATA/cursor-agent/versions/$V"
cd "$ROOT" || exit 1
{ for r in scaffold veneer elements mailbox; do echo "== $r"; git -C "$r" status --porcelain; done; } > "$DIR/queue2-status-before.txt"
for lane in swipe-terrain exit-evidence; do
	echo "$lane start $(date -u +%H:%M:%S)"
	"$E/node.exe" "$E/index.js" -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" --output-format stream-json "Read and execute the brief at scaffold/tmp/cursor/$lane-brief.md exactly. Your final message must be the return shape it specifies." > "$DIR/$lane.jsonl" 2> "$DIR/$lane.err"
	echo "$lane exit=$? end $(date -u +%H:%M:%S) journal $(wc -c < "$DIR/$lane.jsonl") err $(wc -c < "$DIR/$lane.err")"
done
{ for r in scaffold veneer elements mailbox; do echo "== $r"; git -C "$r" status --porcelain; done; } > "$DIR/queue2-status-after.txt"
diff "$DIR/queue2-status-before.txt" "$DIR/queue2-status-after.txt" > /dev/null && echo "containment: every repository unchanged" || echo "CONTAINMENT: status changed"
