#!/usr/bin/env bash
# Runs one named gate, logging the command, its output, its exit, and the load to tmp/units/mcol-<name>.log.txt.
. /home/user/veneer-mcol/tmp/units/env.sh
name="$1"; shift
log="tmp/units/mcol-$name.log.txt"
{ echo "\$ $*"; "$@"; echo "exit=$?"; cat /proc/loadavg; } > "$log" 2>&1
echo "$name: $(grep -E '^exit=' "$log" | tail -1)"
