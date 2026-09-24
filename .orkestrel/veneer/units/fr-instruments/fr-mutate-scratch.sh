#!/usr/bin/env bash
# Applies one mutation inside the unit's scratch copy, runs the journey's light-1280 project over the
# cases a name pattern selects, logs the result, and restores the file. The scratch copy is
# tmp/probe/fr-guides, a copy of this worktree's tracked files, so no file outside the unit's owned
# set is written in the worktree itself.
# Usage: fr-mutate-scratch.sh <label> <file> <old> <new> <test-name-pattern>
LABEL="$1"; FILE="$2"; OLD="$3"; NEW="$4"; PATTERN="$5"
ROOT=/home/user/veneer-fr/tmp/probe/fr-guides
LOG=/home/user/veneer-fr/tmp/units/fr-mutations.log.txt
OUT=/home/user/veneer-fr/tmp/units/fr-mutate-scratch-test.log.txt
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd "$ROOT" || exit 99
cp "$FILE" "$FILE.fr-backup"
python3 - "$FILE" "$OLD" "$NEW" <<'PY' || { echo "mutation site not found once"; mv "$FILE.fr-backup" "$FILE"; exit 98; }
import sys
p, old, new = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(p).read()
if s.count(old) != 1:
    raise SystemExit(1)
open(p, 'w').write(s.replace(old, new))
PY
{
	echo "=== MUTATION: $LABEL"
	echo "site (scratch copy tmp/probe/fr-guides): $FILE"
	echo "replaced: $OLD"
	echo "with: $NEW"
} >> "$LOG"
timeout 1200 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:light-1280*" -t "$PATTERN" > "$OUT" 2>&1
TEXIT=$?
mv "$FILE.fr-backup" "$FILE"
{
	echo "command: npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project \"journey:light-1280*\" -t \"$PATTERN\""
	echo "build exit: skipped (the journey compiles the source styles itself)"
	echo "test exit: $TEXIT"
	grep -E "Tests +[0-9]" "$OUT" | tail -1 | sed 's/^/summary: /'
	grep -E "^ FAIL " "$OUT" | sed 's/^/failing: /'
	grep -E "^(AssertionError|Error):" "$OUT" | head -3 | sed 's/^/reason: /'
	echo
} >> "$LOG"
tail -9 "$LOG"
