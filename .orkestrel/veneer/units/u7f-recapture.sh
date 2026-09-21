#!/usr/bin/env bash
# The Orchestrator's own tracked capture run, taken last before the portfolio verdict's round-2
# evidence is assembled: every journey run rewrites tmp/capture/<variant>.txt and only a capture
# run fills it with the frame paths, so the verifier's later runs leave the artifacts out of step
# with the frames. Log: u7f-recapture.log.txt.txt (scaffold).
VENEER="C:/Users/mikes/WebstormProjects/veneer"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u7f-recapture.log.txt.txt"
cd "$VENEER" || exit 9
{
  echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) recapture start at $(git log --oneline -1)"
  CAPTURE=1 npm run test:journey 2>&1 | tail -12
  echo "exit=${PIPESTATUS[0]}"
  for v in light-1280 light-390 dark-1280 dark-390; do
    echo "$v: $(grep -c 'capture/states/' "tmp/capture/$v.txt") frame paths; last: $(tail -1 "tmp/capture/$v.txt")"
  done
  echo "frames: $(ls tmp/capture/states | wc -l)"
  echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) recapture end"
} > "$LOG" 2>&1
cat "$LOG"
