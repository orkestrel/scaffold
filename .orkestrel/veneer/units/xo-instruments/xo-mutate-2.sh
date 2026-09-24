#!/usr/bin/env bash
# Usage: xo-mutate-2.sh LABEL FILE SED_EXPR COMMAND...
# Applies one sed mutation to FILE, runs COMMAND, appends the reading to the mutation log, and
# restores FILE byte for byte from the copy taken before the mutation.
source /home/user/veneer-xo/tmp/units/xo-env.sh
label="$1"; file="$2"; expr="$3"; shift 3
log=/home/user/veneer-xo/tmp/units/xo-mutations-2.log.txt
out=/home/user/veneer-xo/tmp/units/xo-mutation-$label.log.txt
backup=/home/user/veneer-xo/tmp/units/xo-mutation-$label.orig
cp "$file" "$backup"
sed -i "$expr" "$file"
{
	echo "=== mutation: $label"
	echo "site: $file"
	echo "sed: $expr"
	echo "diff:"
	diff "$backup" "$file"
	echo "command: $*"
} >> "$log"
"$@" 2>&1 | sed 's/\x1b\[[0-9;]*m//g' > "$out"
status=${PIPESTATUS[0]}
cp "$backup" "$file"
rm "$backup"
{
	echo "exit: $status"
	grep -E "built in|Error:" "$out" | head -5 | sed 's/^/line: /'
	grep -E "Test Files|Tests  " "$out"
	grep -E "^ FAIL " "$out" | sort -u
	echo "restored: the pre-mutation copy was written back over the site"
	echo
} >> "$log"
echo "$label exit $status"
