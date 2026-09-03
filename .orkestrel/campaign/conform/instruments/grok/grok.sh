#!/usr/bin/env bash
# Launch one Cursor Grok lane from a brief file, journaled under tmp/cursor/, one lane at a time per bench.
# Usage: bash tmp/work/grok.sh <unit> <abs brief path> [<cwd>]
# Writes tmp/cursor/<unit>.jsonl (event stream), <unit>.err, <unit>.result.md (the result event's text),
# <unit>.status-before.txt / <unit>.status-after.txt (containment), and prints the session id and result path.
set -u
UNIT=${1:?unit}
BRIEF=${2:?brief}
CWD=${3:-/home/user/scaffold}
MODEL=${CURSOR_GROK_MODEL:-cursor-grok-4.6-high}
OUT=/home/user/scaffold/tmp/cursor
mkdir -p "$OUT"
[ -f "$BRIEF" ] || { echo "REFUSE: brief $BRIEF missing" >&2; exit 2; }
exec 9>"$OUT/.bench.lock"
flock 9
git -C "$CWD" status --porcelain > "$OUT/$UNIT.status-before.txt" 2>/dev/null
POINTER="Read the brief at $BRIEF in full and perform it exactly as written. Work read-only: never create, edit, or delete a file, and never run a command that changes the tree. Return only the sections the brief names."
cd "$CWD" || exit 2
START=$(date -u +%H:%M:%S)
timeout "${GROK_CAP:-1500}" agent -p --trust --mode=ask --model "$MODEL" --output-format stream-json "$POINTER" > "$OUT/$UNIT.jsonl" 2> "$OUT/$UNIT.err"
EXIT=$?
git -C "$CWD" status --porcelain > "$OUT/$UNIT.status-after.txt" 2>/dev/null
SESSION=$(grep -m1 '"type":"init"' "$OUT/$UNIT.jsonl" 2>/dev/null | grep -o '"session_id":"[^"]*"' | head -1)
node -e '
const fs = require("node:fs");
const lines = fs.readFileSync(process.argv[1], "utf8").split("\n").filter(Boolean);
let text = "";
for (const line of lines) {
	let ev; try { ev = JSON.parse(line) } catch { continue }
	if (ev.type === "result") text = typeof ev.result === "string" ? ev.result : JSON.stringify(ev.result, null, 1);
}
fs.writeFileSync(process.argv[2], text);
console.log(text.length + " chars");
' "$OUT/$UNIT.jsonl" "$OUT/$UNIT.result.md"
DIRTY=$(diff "$OUT/$UNIT.status-before.txt" "$OUT/$UNIT.status-after.txt" >/dev/null && echo clean || echo DIRTY)
echo "grok $UNIT exit=$EXIT start=$START end=$(date -u +%H:%M:%S) $SESSION containment=$DIRTY result=$OUT/$UNIT.result.md"
[ -s "$OUT/$UNIT.result.md" ] || { echo "EMPTY result; err tail:"; tail -n 5 "$OUT/$UNIT.err"; exit 3; }
