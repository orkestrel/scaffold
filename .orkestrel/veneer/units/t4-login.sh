#!/bin/bash
# t4-login.sh: authenticate npm for the @orkestrel/test 0.0.21 upload (references/window.md § Arm the terminal).
# `npm login --browser=false` under `script -qfc`, stdin a fifo held open by a long sleep, detached with setsid; prints
# the process ids and the log path. The approval URL is read from the log in the foreground and relayed to the user.
# Log: t4-login.log.txt (under units; the URL dies with the session and carries no credential).
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
export PATH="$S/npm11/node_modules/.bin:$PATH"
LOG=$U/t4-login.log.txt; FIFO=$S/t4-login.fifo
rm -f $FIFO; mkfifo $FIFO
setsid sleep 900 > $FIFO &
echo "hold $!"
setsid script -qfc 'npm login --browser=false --registry=https://registry.npmjs.org' $LOG < $FIFO > /dev/null 2>&1 &
echo "login $! log $LOG"
