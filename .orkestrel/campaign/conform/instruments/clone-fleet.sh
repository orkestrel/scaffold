#!/usr/bin/env bash
# Serial full clones of every fleet package at the campaign branch. One at a time (proxy cap). Log per repo.
BR=claude/orkestrel-npm-audit-deps-14ibta
LOG=/home/user/work/logs/clone-fleet.log
: > "$LOG"
for p in agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace; do
  d=/home/user/fleet/$p
  if git -C "$d" rev-parse HEAD >/dev/null 2>&1; then echo "$p present $(git -C $d rev-parse --short HEAD)" >> "$LOG"; continue; fi
  if git clone --quiet --branch "$BR" "https://github.com/orkestrel/$p" "$d" >> "$LOG" 2>&1; then
    echo "$p cloned $(git -C $d rev-parse --short HEAD) $(git -C $d rev-list --count HEAD) commits" >> "$LOG"
  else
    echo "$p CLONE FAILED (retrying once after 10s)" >> "$LOG"; sleep 10; rm -rf "$d"
    if git clone --quiet --branch "$BR" "https://github.com/orkestrel/$p" "$d" >> "$LOG" 2>&1; then echo "$p cloned on retry $(git -C $d rev-parse --short HEAD)" >> "$LOG"; else echo "$p CLONE FAILED TWICE" >> "$LOG"; fi
  fi
done
echo "DONE $(date -u +%FT%TZ)" >> "$LOG"
