#!/usr/bin/env bash
# Unit T3 mutation runs. Each pass reverts one load-bearing edit, runs the narrowest suite that
# carries its control, and is restored before the next pass starts. The tail of each run is the
# recorded reading.
set -u

cd "$(dirname "$0")/../.." || exit 1
LOG=tmp/probe/mutations3.log.txt
: >"$LOG"

run() {
	local pass=$1
	local script=$2
	{
		echo "=== pass: $pass ($script) ==="
		python tmp/probe/mutate3.py "$pass"
		npm run "$script" 2>&1 | grep -E "Tests |Test Files |FAIL |AssertionError|error TS|Error: " | head -25
		python tmp/probe/mutate3.py restore
		echo
	} >>"$LOG" 2>&1
}

python tmp/probe/mutate3.py backup >>"$LOG" 2>&1

run context test:src:browser
run terminal test:src:browser
run rerun test:src:browser
run proxy test:src:browser
run quota test:src:browser
run refusal test:src:browser
run departure test:src:core
run elided test:src:browser
run readme test:guides
run playstate test:src:browser
run spelling test:src:browser
run pause test:src:browser
run order test:src:browser
run augment test:src:browser
run census test:src:browser
run byname check

echo "=== restored tree ===" >>"$LOG"
git -C . status --short >>"$LOG" 2>&1
echo "done"
