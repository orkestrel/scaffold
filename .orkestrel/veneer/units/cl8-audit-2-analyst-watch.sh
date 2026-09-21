#!/usr/bin/env bash
# Milestone watch over CL8 round-2 subjective audit lane on Astra: thread start, commands, agent
# messages, errors, terminal events. Exits when tmp/codex/cl8-audit-2-analyst.err records the exit code.
J="C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl8-audit-2-analyst.jsonl"
E="C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl8-audit-2-analyst.err"
n=0
while true; do
  total=$(wc -l < "$J" 2>/dev/null || echo 0)
  if [ "$total" -gt "$n" ]; then
    sed -n "$((n+1)),${total}p" "$J" | grep -oE '"type":"item\.completed","item":\{"id":"[^"]*","type":"[a-z_]*"|"type":"(error|turn\.failed|thread\.started)"' | cut -c1-200
    n=$total
  fi
  if grep -q '^exit=' "$E" 2>/dev/null; then
    echo "cl8 round-2 analyst finished: $(grep '^exit=' "$E") lines=$total"
    exit 0
  fi
  sleep 20
done
