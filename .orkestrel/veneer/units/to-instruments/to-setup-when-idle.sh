#!/usr/bin/env bash
# Waits up to 25 minutes for the one-minute load average to drop below 8, then runs test:setup on the copy.
end=$((SECONDS+1500))
while [ $SECONDS -lt $end ]; do
  load=$(cut -d' ' -f1 /proc/loadavg)
  awk "BEGIN{exit !($load < 8)}" && break
  sleep 15
done
echo "load at start: $(cat /proc/loadavg)"
/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to/gates.sh setup
grep -v externalized /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to/logs/setup.txt | grep -E "^ FAIL|timed out" | head
echo "load at end: $(cat /proc/loadavg)"
