#!/usr/bin/env bash
# The Orchestrator's reconciliation run (2026-09-25): five Cursor Grok lanes in ask mode, launched one at a time (Bench
# law 4), each from the parent of both repositories so a lane reads scaffold and veneer. Each journals to
# scaffold/tmp/cursor/<lane>.jsonl with its .err beside it; the status of both repositories is captured before and after.
set -u
DIR=/c/Users/mikes/WebstormProjects/scaffold/tmp/cursor
ROOT=/c/Users/mikes/WebstormProjects
CURSOR_GROK_MODEL=grok-4.7-high
V=$(ls -t "$LOCALAPPDATA/cursor-agent/versions/" | head -1)
E="$LOCALAPPDATA/cursor-agent/versions/$V"
cd "$ROOT" || exit 1
{ git -C scaffold status --porcelain; echo "--"; git -C veneer status --porcelain; } > "$DIR/recon-status-before.txt"
for lane in recon-records recon-roadmap recon-styles recon-src recon-tests; do
	echo "$lane start $(date -u +%H:%M:%S)"
	"$E/node.exe" "$E/index.js" -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" --output-format stream-json "Read and execute the brief at scaffold/tmp/cursor/$lane-brief.md exactly. Your final message must be the return shape it specifies." > "$DIR/$lane.jsonl" 2> "$DIR/$lane.err"
	echo "$lane exit=$? end $(date -u +%H:%M:%S) journal $(wc -c < "$DIR/$lane.jsonl") err $(wc -c < "$DIR/$lane.err")"
done
{ git -C scaffold status --porcelain; echo "--"; git -C veneer status --porcelain; } > "$DIR/recon-status-after.txt"
diff "$DIR/recon-status-before.txt" "$DIR/recon-status-after.txt" > /dev/null && echo "containment: both repositories unchanged" || echo "CONTAINMENT: status changed"
