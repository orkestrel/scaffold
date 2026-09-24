#!/usr/bin/env bash
# Applies one mutation to one file of the validation copy at tmp/probe/base, optionally rebuilds the
# styles, runs one command, appends the mutated site, the command, the exits, the summary line, and
# the failing case names to tmp/units/ufl-mutations-2.log.txt, and restores the file.
# Usage: ufl-mutate-2.sh <name> <file> <from> <to> <build: styles|none> <command...>
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
units="$(cd "$(dirname "$0")" && pwd)"
base="$units/../probe/base"
log="$units/ufl-mutations-2.log.txt"
name=$1; file=$2; from=$3; to=$4; build=$5; shift 5
cd "$base"
cp "$file" "$units/ufl-mutate-2.orig"
python3 -c "import sys;p=sys.argv[1];s=open(p).read();a=sys.argv[2].replace('\\\\n','\n');b=sys.argv[3].replace('\\\\n','\n');assert a in s,a;open(p,'w').write(s.replace(a,b,1))" "$file" "$from" "$to"
build_exit=skipped
if [ "$build" = styles ]; then npm run build:src:styles > "$units/ufl-mutate-2.build.txt" 2>&1; build_exit=$?; fi
"$@" > "$units/ufl-mutate-2.run.txt" 2>&1
run_exit=$?
{
	echo "=== mutation: $name"
	echo "site: $file"
	echo "--- replaced"; printf '%b\n' "$from"; echo "--- with"; printf '%b\n' "$to"; echo "---"
	echo "command: $*"
	echo "build exit: $build_exit"
	echo "command exit: $run_exit"
	echo "summary: $(grep -E 'Tests  ' "$units/ufl-mutate-2.run.txt" | tail -1 | sed 's/^ *//')"
	echo "failing cases:"
	grep -E '^ +×' "$units/ufl-mutate-2.run.txt" | sed 's/^ *× |[^|]*| //' | sed 's/ [0-9]*ms$//'
	echo
} >> "$log"
cp "$units/ufl-mutate-2.orig" "$file"
rm -f "$units/ufl-mutate-2.orig" "$units/ufl-mutate-2.run.txt" "$units/ufl-mutate-2.build.txt"
if [ "$build" = styles ]; then npm run build:src:styles > /dev/null 2>&1; fi
echo "$name: build $build_exit, command $run_exit"
