#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 2: runs the same-shadow-root case and the temporary shadow probe case
# against the source as it stands, and records the log.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
OUT=tmp/j-oracle-fix-offcanvas
LOG=${1:-$OUT/red-2.log.txt}
npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts -t "shadow" > "$LOG" 2>&1
echo "exit $?"
grep -E "^ +(×|✓|↓)|Tests +[0-9]" "$LOG"
