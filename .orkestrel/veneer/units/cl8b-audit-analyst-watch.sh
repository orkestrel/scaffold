#!/usr/bin/env bash
# Milestone watch over CL8b round-1 subjective audit lane on Astra: thread start, commands, agent
# messages, errors, terminal events. Exits when tmp/codex/cl8b-audit-analyst.err records the exit code.
J="C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl8b-audit-analyst.jsonl"
E="C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl8b-audit-analyst.err"
n=0
while true; do
  total=$(wc -l < "$J" 2>/dev/null || echo 0)
  if [ "$total" -gt "$n" ]; then
    sed -n "$((n+1)),${total}p" "$J" | grep -oE '"type":"item\.completed","item":\{"id":"[^"]*","type":"[a-z_]*"|"type":"(error|turn\.failed|thread\.started)"' | cut -c1-200
    n=$total
  fi
  if grep -q '^exit=' "$E" 2>/dev/null; then
    echo "cl8b analyst finished: $(grep '^exit=' "$E") lines=$total"
    exit 0
  fi
  sleep 20
done
