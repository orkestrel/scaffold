#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 2: runs the whole Offcanvas.test.ts file against the source as it
# stands and records the log at the path the first argument names.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
LOG=$1
npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts > "$LOG" 2>&1
echo "exit $?"
grep -E "^ +(×)|Test Files|Tests +[0-9]|AssertionError|Error:" "$LOG"
