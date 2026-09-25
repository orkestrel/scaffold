#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 2: waits, up to the number of seconds the second argument names, for
# the line the first argument names to appear in accept-2.log.txt, then prints the log.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
LOG=tmp/j-oracle-fix-offcanvas/accept-2.log.txt
for _ in $(seq 1 "$2"); do
	grep -q "$1" "$LOG" && break
	sleep 1
done
cat "$LOG"
