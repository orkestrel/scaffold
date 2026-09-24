#!/usr/bin/env bash
# Applies one mutation to one file of the validation copy under tmp/probe/base, runs one command,
# records the mutated site, the command, the exits, the summary line, and the failing case names in
# tmp/units/ufl-mutation-<name>.log.txt, and restores the file.
# Usage: ufl-mutate.sh <name> <file> <from> <to> <build: styles|none> <command...>
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
units="$(cd "$(dirname "$0")" && pwd)"
base="$units/../probe/base"
name=$1; file=$2; from=$3; to=$4; build=$5; shift 5
log="$units/ufl-mutation-$name.log.txt"
cd "$base"
cp "$file" "$units/ufl-mutation-$name.orig"
python3 -c "import sys;p=sys.argv[1];s=open(p).read();a=sys.argv[2].replace('\\\\n','\n');b=sys.argv[3].replace('\\\\n','\n');assert a in s,a;open(p,'w').write(s.replace(a,b,1))" "$file" "$from" "$to"
{
	echo "mutation: $name"
	echo "site: $file"
	echo "--- replaced"; printf '%b\n' "$from"; echo "--- with"; printf '%b\n' "$to"; echo "---"
	echo "command: $*"
} > "$log"
build_exit=skipped
if [ "$build" = styles ]; then npm run build:src:styles > "$units/ufl-mutation-$name.build.log.txt" 2>&1; build_exit=$?; fi
"$@" > "$units/ufl-mutation-$name.run.log.txt" 2>&1
run_exit=$?
{
	echo "build exit: $build_exit"
	echo "command exit: $run_exit"
	echo "summary: $(grep -E 'Tests  ' "$units/ufl-mutation-$name.run.log.txt" | tail -1 | sed 's/^ *//')"
	echo "failing cases:"
	grep -E '^ +×' "$units/ufl-mutation-$name.run.log.txt" | sed 's/^ *× |[^|]*| //' | sed 's/ [0-9]*ms$//'
} >> "$log"
rm -f "$units/ufl-mutation-$name.run.log.txt" "$units/ufl-mutation-$name.build.log.txt"
cp "$units/ufl-mutation-$name.orig" "$file"
rm "$units/ufl-mutation-$name.orig"
tail -n +2 "$log" | grep -E "exit|summary"
