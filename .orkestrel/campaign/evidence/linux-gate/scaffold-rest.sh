#!/bin/bash
# scaffold's `test` script is an && chain, so the failure in test:src:server
# short-circuited every project after it. Run each remaining project on its own
# so no failure can hide another.
set -u
cd /home/user/scaffold || exit 1
S=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/logs/scaffold-rest.status.txt
: > "$S"
for g in test:src:core test:src:bin test:policy test:config test:setup test:guides; do
  echo ""
  echo "########## $g ##########"
  start=$SECONDS
  timeout 1800 npm run "$g"
  code=$?
  printf '%s\texit=%s\telapsed=%ss\n' "$g" "$code" "$((SECONDS-start))" >> "$S"
  echo "########## $g exit=$code ##########"
done
echo ""
echo "SCAFFOLD-REST-DONE"
cat "$S"
