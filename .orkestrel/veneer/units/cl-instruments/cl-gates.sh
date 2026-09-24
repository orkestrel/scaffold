#!/usr/bin/env bash
# LEDGER (cl) scoped gate chain over the scratch copy carrying the owned files and the shared patch.
# Usage: bash tmp/units/cl-gates.sh <label>; each gate's command, exit, and tail land in
# tmp/units/cl-gates-<label>.log.txt.
set -u
. /home/user/veneer-cl/tmp/units/cl-env.sh
cd /home/user/veneer-cl/tmp/probe/cl-scratch || exit 2
log=/home/user/veneer-cl/tmp/units/cl-gates-${1:-run}.log.txt
: > "$log"
for gate in "format:check" "lint:check" "check" "build:src" "test:setup" "test:conformance" "test:guides" "test:policy"; do
	echo "=== npm run $gate" >> "$log"
	npm run "$gate" > /home/user/veneer-cl/tmp/units/cl-gate-${1:-run}-${gate//:/-}.log.txt 2>&1
	code=$?
	echo "exit $code" >> "$log"
	tail -6 /home/user/veneer-cl/tmp/units/cl-gate-${1:-run}-${gate//:/-}.log.txt | sed 's/\x1b\[[0-9;]*m//g' >> "$log"
done
