#!/bin/bash
# Authoritative serial gate sweep over the fleet: format:check → lint:check → check → build → test per repo,
# results appended to /home/user/work/fleet-gates.log as they finish. Commits nothing. Usage: fleet-gates.sh [repos...]
LOG=/home/user/work/fleet-gates.log
REPOS="${*:-abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace scaffold}"
for r in $REPOS; do
  dir=/home/user/fleet/$r; [ "$r" = scaffold ] && dir=/home/user/scaffold
  cd "$dir" || { echo "$r MISSING" >> "$LOG"; continue; }
  status="OK"
  for g in format:check lint:check check build test; do
    if ! npm run "$g" > "/home/user/work/logs/gates-$r-${g//:/-}.log" 2>&1; then status="FAIL $g"; break; fi
  done
  echo "$r $status" >> "$LOG"
done
echo "FLEET-GATES-COMPLETE" >> "$LOG"
