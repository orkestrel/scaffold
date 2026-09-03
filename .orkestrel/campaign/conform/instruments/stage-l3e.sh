#!/bin/bash
for p in mcp server; do
  echo "== $p $(date -u +%H:%M:%S)"
  bash /home/user/work/stage-closure.sh "$p" 2>&1 | tail -n 8
done
echo "== done $(date -u +%H:%M:%S)"
