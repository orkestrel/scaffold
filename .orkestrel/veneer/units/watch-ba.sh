#!/bin/bash
LOG=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/verify-ba.log.txt
for i in $(seq 1 120); do grep -q "^=== verify done" "$LOG" 2>/dev/null && break; sleep 30; done
cat "$LOG"
