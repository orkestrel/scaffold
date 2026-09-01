#!/bin/bash
# Commit and push finished fix units. Usage: commit-fix.sh pkg [pkg...]
set -u
BRANCH=claude/orkestrel-npm-audit-deps-14ibta
for p in "$@"; do
  dir=/home/user/fleet/$p
  cd "$dir" || { echo "$p: NO DIR"; continue; }
  if [ -z "$(git status --porcelain)" ]; then echo "$p: clean, skip"; continue; fi
  git add -A
  git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F /home/user/work/msg-fix.txt || { echo "$p: COMMIT FAILED"; continue; }
  ok=""
  for delay in 0 2 4 8 16; do
    [ "$delay" -gt 0 ] && sleep "$delay"
    if git push -q -u origin "$BRANCH" 2>/tmp/pushrr.log; then ok=1; break; fi
  done
  if [ -n "$ok" ]; then echo "$p: committed and pushed $(git rev-parse --short HEAD)"; else echo "$p: PUSH FAILED $(cat /tmp/pushrr.log | head -2)"; fi
done
