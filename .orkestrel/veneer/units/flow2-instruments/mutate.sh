#!/usr/bin/env bash
# Applies one mutation of unit E-ID-FLOW-2, rebuilds the styles, runs the owned element tests, and
# restores the mutated file byte for byte from a copy, checking the digest.
# Usage: mutate.sh <label> <file> <old> <new>
set -u
source /home/user/veneer-flow2/tmp/units/flow2-instruments/env.sh
label=$1; file=$2; old=$3; new=$4
log=tmp/units/flow2-instruments/logs/mutation-$label.log.txt
copy=tmp/units/flow2-instruments/logs/mutation-$label.orig
cp "$file" "$copy"
before=$(sha256sum "$file" | cut -d' ' -f1)
python3 -c 'import sys;p,o,n=sys.argv[1:4];s=open(p).read();assert s.count(o)==1,o;open(p,"w").write(s.replace(o,n))' "$file" "$old" "$new"
{
	echo "mutation: $file: '$old' -> '$new'"
	npm run build:src:styles > /dev/null 2>&1
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/dl.test.ts tests/src/styles/elements/pre.test.ts tests/src/styles/elements/hr.test.ts tests/src/styles/elements/figure.test.ts 2>&1
	echo "exit $?"
} > "$log"
cp "$copy" "$file"
rm "$copy"
after=$(sha256sum "$file" | cut -d' ' -f1)
echo "restore: before $before after $after" >> "$log"
[ "$before" = "$after" ] && echo "restore identical" >> "$log"
echo "== $label"
grep -a "FAIL \|AssertionError\|Tests \|^exit\|restore" "$log" | sort -u
