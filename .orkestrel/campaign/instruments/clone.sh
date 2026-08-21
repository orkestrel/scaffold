#!/usr/bin/env bash
# Serial fleet clone. One clone at a time — the session git proxy caps concurrency at 2.
set -u
REPOS="abort agent brief browser budget console contract csv database emitter form guide html indexeddb interpret markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse supervisor table template terminal timeout tool toolbox websocket worker workflow workspace"
OUT=/home/user/scaffold/tmp/fleet/clone.log
: > "$OUT"
for r in $REPOS; do
  dest="/home/user/$r"
  if git -C "$dest" rev-parse HEAD >/dev/null 2>&1; then
    echo "SKIP $r (already cloned)" >> "$OUT"
    continue
  fi
  echo "CLONE $r ..." >> "$OUT"
  if timeout 600 git clone --depth 1 "https://github.com/orkestrel/$r" "$dest" >> "$OUT" 2>&1; then
    echo "OK $r $(git -C "$dest" rev-parse --short HEAD 2>/dev/null)" >> "$OUT"
  else
    echo "RETRY $r after 10s" >> "$OUT"
    sleep 10
    rm -rf "$dest"
    if timeout 600 git clone --depth 1 "https://github.com/orkestrel/$r" "$dest" >> "$OUT" 2>&1; then
      echo "OK $r $(git -C "$dest" rev-parse --short HEAD 2>/dev/null)" >> "$OUT"
    else
      echo "FAIL $r" >> "$OUT"
    fi
  fi
done
echo "=== CLONE PASS COMPLETE ===" >> "$OUT"
grep -c '^OK ' "$OUT" >> "$OUT"
