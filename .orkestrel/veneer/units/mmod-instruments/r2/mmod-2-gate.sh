#!/usr/bin/env bash
# Round 2 of E-ID-MOTION-MODAL. Runs one command as a gate; logs to tmp/units/mmod-2-NAME.log.txt
# with the command echoed first. usage: mmod-2-gate.sh NAME COMMAND [ARGS...]
source /home/user/veneer-mmod/tmp/units/mmod-env.sh
name=$1; shift
log=/home/user/veneer-mmod/tmp/units/mmod-2-$name.log.txt
{ echo "+ $*"; "$@"; echo "exit=$?"; cat /proc/loadavg; } > "$log" 2>&1
tail -25 "$log"
