#!/usr/bin/env bash
# Watch for the CL6 audit analyst lane (cl6-audit-analyst.sh): one line per completed journal
# item; exits when the exec records its exit in the .err file.
JOURNAL="C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl6-audit-analyst.jsonl"
ERR="C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/cl6-audit-analyst.err"
seen=0
while true; do
  if [ -f "$JOURNAL" ]; then
    count=$(grep -c '"type":"item.completed"' "$JOURNAL" 2>/dev/null || echo 0)
    if [ "$count" -gt "$seen" ]; then
      grep -o '"type":"item.completed","item":{"id":"[^"]*","type":"[a-z_]*"' "$JOURNAL" | tail -n +"$((seen + 1))"
      seen=$count
    fi
  fi
  if grep -q '^exit=' "$ERR" 2>/dev/null; then
    echo "analyst finished: $(grep '^exit=' "$ERR") items=$seen"
    exit 0
  fi
  sleep 30
done
