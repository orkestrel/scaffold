#!/bin/bash
# Diagnose the web-login poll: egress address per connection, the 202's retry-after, npm's own poll log for 30 s.
set -u
export PATH=/opt/npm11/bin:$PATH
W=/home/user/work/wave
echo '--- egress address per connection'
for i in 1 2 3 4 5 6; do curl -sS --max-time 10 https://api.ipify.org; echo; done | sort | uniq -c
echo '--- 202 headers'
R=$(curl -sS -X POST https://registry.npmjs.org/-/v1/login -H 'content-type: application/json' -H 'npm-auth-type: web' -d '{"hostname":"probe"}')
DONE=$(echo "$R" | grep -o '"doneUrl":"[^"]*"' | cut -d'"' -f4)
for i in 1 2 3; do curl -sS -i "$DONE" | grep -i -E '^HTTP|retry-after|cf-ray' | tr '\n' ' '; echo; done
echo '--- npm-profile poll loop'
grep -n -A10 'retry-after' /opt/npm11/lib/node_modules/npm/node_modules/npm-profile/lib/index.js | head -24 | cut -c1-150
echo '--- npm login poll diagnostic, 75 s at loglevel http'
rm -f "$W/login.fifo"; mkfifo "$W/login.fifo"
( sleep 600 > "$W/login.fifo" ) & echo $! > "$W/diag.sleep.pid"
: > "$W/login-diag.log"
setsid bash -c "script -qfc 'npm login --browser=false --loglevel=http --registry=https://registry.npmjs.org/ < $W/login.fifo' $W/login-diag.log" < /dev/null > /dev/null 2>&1 &
echo $! > "$W/diag.pid"
sleep 75
pkill -P "$(cat $W/diag.pid)" 2>/dev/null; kill "$(cat $W/diag.pid)" 2>/dev/null; kill "$(cat $W/diag.sleep.pid)" 2>/dev/null
for p in $(ps -eo pid,ppid,comm | awk '$3=="npm login" || $3=="npm" {print $1}'); do kill $p 2>/dev/null; done
tr -d '\r' < "$W/login-diag.log" | sed 's/\x1b\[[0-9;]*[A-Za-z]//g' | grep -E 'http fetch|Username|login/cli|notice' | sed 's/[a-f0-9-]\{36\}/<id>/g' | cut -c1-150 | head -30
