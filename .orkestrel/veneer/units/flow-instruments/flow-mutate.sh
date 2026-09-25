#!/usr/bin/env bash
# Applies one mutation of unit E-ID-FLOW, rebuilds the styles, runs the named test files, and
# restores the mutated file byte for byte from a copy, checking the digest.
# Usage: flow-mutate.sh <label> <file> <old> <new> <test files...>
set -u
cd /home/user/veneer-flow
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
label=$1; file=$2; old=$3; new=$4; shift 4
log=tmp/units/flow-logs/mutation-$label.log.txt
copy=tmp/units/flow-logs/mutation-$label.orig
cp "$file" "$copy"
before=$(sha256sum "$file" | cut -d' ' -f1)
python3 -c 'import sys;p,o,n=sys.argv[1:4];s=open(p).read();assert s.count(o)==1,o;open(p,"w").write(s.replace(o,n))' "$file" "$old" "$new"
{
	echo "mutation: $file: '$old' -> '$new'"
	npm run build:src:styles > /dev/null 2>&1
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache "$@" 2>&1
	echo "exit $?"
} > "$log"
cp "$copy" "$file"
rm "$copy"
after=$(sha256sum "$file" | cut -d' ' -f1)
echo "restore: before $before after $after" >> "$log"
[ "$before" = "$after" ] && echo "restore identical" >> "$log"
echo "== $label"
grep -a "FAIL\|Tests \|^exit\|restore" "$log" | sort -u
