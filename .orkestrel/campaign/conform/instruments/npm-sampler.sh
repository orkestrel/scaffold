#!/bin/bash
# Sample the process table for npm/npx processes with their cwd and parent, for 25 minutes.
end=$((SECONDS+1500))
while [ $SECONDS -lt $end ]; do
  for p in $(pgrep -f "npm-cli.js|npm exec|npm install|npm ci|npx-cli.js" 2>/dev/null); do
    [ "$p" = "$$" ] && continue
    a=$(tr "\0" " " < /proc/$p/cmdline 2>/dev/null | cut -c1-160)
    [ -n "$a" ] || continue
    pp=$(awk "/^PPid/{print \$2}" /proc/$p/status 2>/dev/null)
    pa=$(tr "\0" " " < /proc/$pp/cmdline 2>/dev/null | cut -c1-100)
    echo "$(date -u +%T) pid=$p ppid=$pp cwd=$(readlink /proc/$p/cwd 2>/dev/null) :: $a :: parent: $pa"
  done
  sleep 1
done
