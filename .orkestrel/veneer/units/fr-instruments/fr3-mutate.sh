#!/usr/bin/env bash
# Applies one mutation inside the round-3 scratch copy (tmp/probe/fr3-scratch, a copy of this
# worktree's tracked files with the round-3 changes and fr-shared-3.patch applied), runs the named
# command there, logs every failing case, and restores the file.
# Usage: fr2-mutate.sh <label> <file> <old> <new> <build:0|1> <command...>
LABEL="$1"; FILE="$2"; OLD="$3"; NEW="$4"; BUILD="$5"; shift 5
ROOT=/home/user/veneer-fr/tmp/probe/fr3-scratch
LOG=/home/user/veneer-fr/tmp/units/fr-mutations-3.log.txt
OUT=/home/user/veneer-fr/tmp/units/fr3-mutate-$(echo "$LABEL" | tr -c 'a-zA-Z0-9' '-' | tr -s '-' | cut -c1-60).log.txt
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
	echo "site (scratch copy tmp/probe/fr3-scratch): $FILE"
	echo "replaced: $OLD"
	echo "with: $NEW"
} >> "$LOG"
BEXIT=skipped
if [ "$BUILD" = "1" ]; then npm run build:src > /dev/null 2>&1; BEXIT=$?; fi
"$@" > "$OUT" 2>&1
TEXIT=$?
mv "$FILE.fr-backup" "$FILE"
if [ "$BUILD" = "1" ]; then npm run build:src > /dev/null 2>&1; fi
{
	echo "command: $*"
	echo "output: tmp/units/$(basename "$OUT")"
	echo "build exit: $BEXIT"
	echo "test exit: $TEXIT"
	grep -E "Tests +[0-9]" "$OUT" | tail -1 | sed 's/^/summary: /'
	grep -E "^ FAIL " "$OUT" | sed 's/^/failing: /'
	grep -E "^(AssertionError|Error):" "$OUT" | head -4 | sed 's/^/reason: /'
	echo
} >> "$LOG"
tail -n 12 "$LOG"
