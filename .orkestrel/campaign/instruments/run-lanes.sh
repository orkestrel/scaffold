#!/usr/bin/env bash
set -u
cd /home/user
OUT=/home/user/scaffold/tmp/fleet
mkdir -p "$OUT/reports"
MODEL="cursor-grok-4.6-high"
pids=""
for lane in A1 A2 A3 A4 B1 B2 C1 C2 D1; do
  (
    timeout 2400 agent -p --trust --mode=ask --model "$MODEL" \
      "Read and execute the brief at $OUT/briefs/${lane}-brief.md exactly. Your reply must be the report that brief specifies, and nothing else." \
      > "$OUT/reports/${lane}.md" 2> "$OUT/reports/${lane}.err"
    echo "lane $lane exit=$? bytes=$(wc -c < "$OUT/reports/${lane}.md")" >> "$OUT/reports/status.log"
  ) &
  pids="$pids $!"
  sleep 2
done
echo "launched pids:$pids" >> "$OUT/reports/status.log"
wait
echo "=== ALL LANES DONE ===" >> "$OUT/reports/status.log"
