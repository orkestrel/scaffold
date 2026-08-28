#!/bin/bash
BR=claude/orkestrel-npm-audit-deps-14ibta
for name in "$@"; do
  d=/home/user/fleet/$name
  for attempt in 1 2 3 4 5; do
    out=$(git -C "$d" push -u origin $BR 2>&1); rc=$?
    if [ $rc -eq 0 ]; then echo "$name PUSHED"; break; fi
    if echo "$out" | grep -qi 'access denied\|403'; then echo "$name DENIED"; break; fi
    if [ $attempt -eq 5 ]; then echo "$name FAIL: $(echo "$out" | tail -1)"; break; fi
    sleep $((2 ** attempt))
  done
done
