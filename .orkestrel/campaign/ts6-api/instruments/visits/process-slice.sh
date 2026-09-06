#!/usr/bin/env bash
# After a phase A slice returns: retain each checkout's report and verify report, read the verifier's terminal line and the report's deviation state, and commit a green checkout by path on its branch. A red or deviating checkout is named and left uncommitted.
# Usage: process-slice.sh <package> [package ...]
set -u
SP=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
REC=/home/user/scaffold/.orkestrel/campaign/ts6-api/visits
for n in "$@"; do
  d=/home/user/fleet/$n
  r="$d/tmp/units/ts6-u12-visit-report.md"; v="$d/tmp/units/ts6-u12-visit-verify-report.md"
  [ -f "$r" ] && cp "$r" "$REC/u12-visit-$n-report.md"
  [ -f "$v" ] && cp "$v" "$REC/u12-visit-$n-verify-report.md"
  ( cd "$d" && git status --short > "$REC/u12-visit-$n.status.txt" && git diff --stat > "$REC/u12-visit-$n.diffstat.txt" )
  gates=$( [ -f "$v" ] && grep -E "^GATES:" "$v" | tail -1 || echo "GATES: (no verify report)" )
  dev=$( [ -f "$r" ] && { grep -A3 -i "^## Deviation" "$r" | grep -qi "none" && echo none || echo "see report"; } || echo "no report" )
  fails=$( [ -f "$r" ] && grep -c "FAIL" "$r" || echo "?" )
  echo "== $n: $gates; deviations: $dev; FAIL mentions in the report: $fails"
  if [ "$gates" = "GATES: GREEN" ] && [ "$dev" = "none" ] && [ "$fails" = "0" ]; then
    bash "$SP/visits/commit-visit.sh" "$d" 2>&1 | sed "s/^/   /"
  else
    echo "   refused: left uncommitted for the Orchestrator's reading"
  fi
done
