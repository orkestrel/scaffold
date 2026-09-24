#!/bin/bash
# Uploads @orkestrel/test 0.0.24 from /home/user/test (960dd75), per orkestrel-publish window.md: script -qfc for a TTY,
# --browser=false, the one-time code from the OTP environment variable passed as npm_config_otp so it reaches no
# argument list, no log line, and no file. Log: t5-publish.log.txt; pid: t5-publish.pid.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
[ -n "$OTP" ] || { echo "no OTP in the environment" >&2; exit 2; }
cd /home/user/test || exit 1
export npm_config_otp="$OTP"
PATH="$S/npm11/node_modules/.bin:$PATH" script -qfc 'npm publish --ignore-scripts --browser=false' $S/t5-publish.log.txt < /dev/null &
echo $! > $S/t5-publish.pid
wait $!
echo "publish exit=$?" >> $S/t5-publish.log.txt
