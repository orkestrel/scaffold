#!/usr/bin/env bash
# Launch one Cursor bench lane from a brief file, journaled under tmp/cursor/, one lane at a time per bench.
# Usage: bash tmp/work/grok4.sh <unit> <abs brief path> [<cwd>]
# Writes tmp/cursor/<unit>.jsonl (event stream), <unit>.err, <unit>.result.md (the result event's text),
# <unit>.status-before.txt / <unit>.status-after.txt (containment), and prints the session id and result path.
# Successor of grok3.sh (which added the shim and the npm logs); of grok2.sh: the lane runs behind tmp/work/shim (an npm/npx PATH shim that logs every invocation
# to tmp/cursor/npm-shim.log and refuses an install-class npm subcommand inside a checkout), and npm keeps
# 500 debug logs so an install the shim did not see still leaves its argv and cwd under ~/.npm/_logs.
set -u
UNIT=${1:?unit}
BRIEF=${2:?brief}
CWD=${3:-/home/user/scaffold}
MODEL=${CURSOR_GROK_MODEL:-cursor-grok-4.6-high}
OUT=/home/user/scaffold/tmp/cursor
mkdir -p "$OUT"
[ -f "$BRIEF" ] || { echo "REFUSE: brief $BRIEF missing" >&2; exit 2; }
export PATH=/home/user/scaffold/tmp/work/shim:$PATH
export npm_config_logs_max=500
# The installer: every target vendors a SessionStart hook (.claude/settings.json → scripts/deps.sh) that runs
# `npm ci` when CLAUDE_CODE_REMOTE=true and node_modules/.orkestrel-lock.sha256 does not match the lockfile;
# the Cursor CLI runs Claude-format hooks at launch with the lane environment, so the hook fired once per
# checkout (the marker it writes makes later lanes skip). The lane runs with the variable cleared.
export CLAUDE_CODE_REMOTE=false
exec 9>"$OUT/.bench.lock"
git -C "$CWD" status --porcelain > "$OUT/$UNIT.status-before.txt" 2>/dev/null
LOCK_BEFORE=$(stat -c '%Y' "$CWD/node_modules/.package-lock.json" 2>/dev/null || echo none)
POINTER="Read the brief at $BRIEF in full and perform it exactly as written. Work read-only: never create, edit, or delete a file, and never run a command that changes the tree. Return only the sections the brief names."
cd "$CWD" || exit 2
START=$(date -u +%H:%M:%S)
printf '%s LANE-START unit=%s cwd=%s lock-before=%s\n' "$START" "$UNIT" "$CWD" "$LOCK_BEFORE" >> "$OUT/npm-shim.log"
# --skip-worktree-setup only skips .cursor/worktrees.json scripts in worktree mode and is inert here; the
# reinstalls of table (15:30), template (15:35), and form (15:40) happened within 11 s of launch with no
# install command in the journal, so the shim on PATH is the containment and the log is the diagnosis.
timeout "${GROK_CAP:-1500}" agent -p --trust --skip-worktree-setup --mode=ask --model "$MODEL" --output-format stream-json "$POINTER" > "$OUT/$UNIT.jsonl" 2> "$OUT/$UNIT.err"
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
# node_modules never enters git status; read the install marker's mtime so a reinstall by the bench shows here.
LOCK_AFTER=$(stat -c '%Y' "$CWD/node_modules/.package-lock.json" 2>/dev/null || echo none)
[ "$LOCK_BEFORE" = "$LOCK_AFTER" ] || DIRTY="DIRTY-NODE_MODULES(before=$LOCK_BEFORE after=$LOCK_AFTER)"
printf '%s LANE-END unit=%s exit=%s containment=%s\n' "$(date -u +%H:%M:%S)" "$UNIT" "$EXIT" "$DIRTY" >> "$OUT/npm-shim.log"
echo "grok $UNIT exit=$EXIT start=$START end=$(date -u +%H:%M:%S) $SESSION containment=$DIRTY result=$OUT/$UNIT.result.md"
[ -s "$OUT/$UNIT.result.md" ] || { echo "EMPTY result; err tail:"; tail -n 5 "$OUT/$UNIT.err"; exit 3; }
