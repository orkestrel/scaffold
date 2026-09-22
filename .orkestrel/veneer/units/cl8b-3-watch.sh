#!/usr/bin/env bash
# Milestone watch over unit CL8b brief 3 journal: thread start, file changes, gate commands, errors, and
# terminal events. Exits when tmp/codex/cl8b-3.err records the launch script's exit code.
J="C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl8b-3.jsonl"
E="C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl8b-3.err"
n=0
while true; do
  total=$(wc -l < "$J" 2>/dev/null || echo 0)
  if [ "$total" -gt "$n" ]; then
    sed -n "$((n+1)),${total}p" "$J" | grep -E '"type":"(file_change|error|turn\.completed|turn\.failed|thread\.started)"|"command":"[^"]*(npm\.cmd run|vite build|git diff --stat)' | cut -c1-260
    n=$total
  fi
  if grep -q '^exit=' "$E" 2>/dev/null; then
    echo "cl8b brief 3 finished: $(grep '^exit=' "$E") lines=$total"
    exit 0
  fi
  sleep 30
done
