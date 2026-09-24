#!/bin/bash
# npm login for the 0.0.24 upload, per orkestrel-publish window.md: script -qfc for a TTY, --browser=false, stdin a fifo
# held open by a long sleep and never written. Log: t5-login.log.txt; pid: t5-login.pid.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
F=$S/t5-login.fifo; rm -f $F; mkfifo $F
sleep 900 > $F &
echo $! > $S/t5-login-sleep.pid
cd /home/user/test
PATH="$S/npm11/node_modules/.bin:$PATH" setsid script -qfc 'npm login --browser=false' $S/t5-login.log.txt < $F &
echo $! > $S/t5-login.pid
