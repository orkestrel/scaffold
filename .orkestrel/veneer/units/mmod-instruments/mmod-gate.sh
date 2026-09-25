#!/usr/bin/env bash
# Runs one npm script as a gate; usage: mmod-gate.sh NAME SCRIPT [ARGS...]; logs to tmp/units/mmod-NAME.log.txt
source /home/user/veneer-mmod/tmp/units/mmod-env.sh
name=$1; shift
log=/home/user/veneer-mmod/tmp/units/mmod-$name.log.txt
{ "$@"; echo "exit=$?"; cat /proc/loadavg; } > "$log" 2>&1
tail -40 "$log"
