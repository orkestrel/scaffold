#!/bin/bash
# Mint npm login attempts until one survives its first poll (a keep-alive connection that answers 202), then
# print that attempt's URL and leave it polling. An attempt that drops to the legacy Username: prompt is killed
# by process id. Log per attempt: /home/user/work/wave/login-<n>.log. Usage: login-retry.sh [max attempts]
set -u
export PATH=/opt/npm11/bin:$PATH
W=/home/user/work/wave; MAX=${1:-8}
for n in $(seq 1 "$MAX"); do
  rm -f "$W/login.fifo"; mkfifo "$W/login.fifo"
  ( sleep 7200 > "$W/login.fifo" ) & echo $! > "$W/login.sleep.pid"
  LOG=$W/login-$n.log; : > "$LOG"
  setsid bash -c "script -qfc 'npm login --browser=false --registry=https://registry.npmjs.org/ < $W/login.fifo' $LOG; echo LOGIN-EXIT=\$? >> $LOG" < /dev/null > /dev/null 2>&1 &
  sleep 9
  if grep -q 'Username:' "$LOG"; then
    for p in $(ps -eo pid,args | grep -E '[n]pm login|[s]cript -qfc' | awk '{print $1}'); do kill $p 2>/dev/null; done
    kill "$(cat $W/login.sleep.pid)" 2>/dev/null; sleep 1
    echo "attempt $n: dropped to the legacy prompt (first poll 403); killed"
    continue
  fi
  URL=$(grep -o 'https://www.npmjs.com/login?next=[^ [:space:]]*' "$LOG" | tail -n 1)
  if [ -n "$URL" ]; then echo "attempt $n: live after its first poll"; echo "URL $URL"; echo "$n" > "$W/login.live"; exit 0; fi
  echo "attempt $n: no URL yet; log tail: $(tail -c 200 "$LOG" | tr -d '\r\n' | cut -c1-120)"
done
echo "no attempt survived"; exit 1
