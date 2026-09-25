#!/usr/bin/env bash
# Runs one gate for the tret unit: tret-gate.sh NAME COMMAND... logs to tmp/units/tret-NAME.log.txt
# with the command echoed first, then its exit status and the load average appended.
cd /home/user/veneer-tret || exit 1
. tmp/units/tret-env.sh
name=$1
shift
log=tmp/units/tret-$name.log.txt
echo "\$ $*" > "$log"
"$@" >> "$log" 2>&1
status=$?
echo "exit=$status" >> "$log"
cat /proc/loadavg >> "$log"
echo "$name exit=$status"
