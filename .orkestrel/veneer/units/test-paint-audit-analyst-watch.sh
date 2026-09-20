#!/usr/bin/env bash
# Watch for the Test-paint audit analyst lane (test-paint-audit-analyst.sh): emits one
# line per completed journal item and exits when the exec records its exit in the .err file.
JOURNAL="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/test-paint-audit-analyst.jsonl"
ERR="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/test-paint-audit-analyst.err"
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
    echo "analyst finished: $(grep '^exit=' "$ERR") lines=$(wc -l < "$JOURNAL")"
    break
  fi
  sleep 5
done
