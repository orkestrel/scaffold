#!/usr/bin/env bash
# Applies one mutation to one owned file, runs the named commands, logs, and restores the file.
# Usage: fr-mutate.sh <label> <file> <python-literal-old> <python-literal-new> <build:0|1> <test command...>
LABEL="$1"; FILE="$2"; OLD="$3"; NEW="$4"; BUILD="$5"; shift 5
LOG=/home/user/veneer-fr/tmp/units/fr-mutations.log.txt
RUN=/home/user/veneer-fr/tmp/units/fr-run.sh
cd /home/user/veneer-fr || exit 99
cp "$FILE" "tmp/units/fr-mutate.backup"
python3 - "$FILE" "$OLD" "$NEW" <<'PY' || { echo "mutation site not found once" ; exit 98; }
import sys
p, old, new = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(p).read()
if s.count(old) != 1:
    raise SystemExit(1)
open(p, 'w').write(s.replace(old, new))
PY
{
	echo "=== MUTATION: $LABEL"
	echo "site: $FILE"
	echo "replaced: $OLD"
	echo "with: $NEW"
} >> "$LOG"
BEXIT=skipped
if [ "$BUILD" = "1" ]; then
	"$RUN" npm run build:src > tmp/units/fr-mutate-build.log.txt 2>&1
	BEXIT=$?
fi
"$RUN" "$@" > tmp/units/fr-mutate-test.log.txt 2>&1
TEXIT=$?
cp "tmp/units/fr-mutate.backup" "$FILE"
rm -f "tmp/units/fr-mutate.backup"
{
	echo "command: $*"
	echo "build exit: $BEXIT"
	echo "test exit: $TEXIT"
	grep -E "Tests +[0-9]" tmp/units/fr-mutate-test.log.txt | tail -1 | sed 's/^/summary: /'
	grep -E "^ FAIL " tmp/units/fr-mutate-test.log.txt | sed 's/^/failing: /'
	echo
} >> "$LOG"
if [ "$BUILD" = "1" ]; then "$RUN" npm run build:src > tmp/units/fr-mutate-build.log.txt 2>&1; echo "rebuilt restored tree: $?" >> "$LOG"; echo >> "$LOG"; fi
tail -12 "$LOG"
