#!/usr/bin/env bash
# Commits J-ORACLE-FIX-OFFCANVAS round 1 in its worktree and retains the round in the same action (2026-09-25): the
# status, the diff, the instruments, and the acceptance and mutation logs, copied under units/ with the
# j-oracle-fix-offcanvas- prefix. The report is retained already. Usage: bash commit-oracle-fix-offcanvas-1.sh <message-file>
set -u
MESSAGE="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-oracle-fix-offcanvas
cd "$TREE" || exit 1
git status --short > "$UNITS/j-oracle-fix-offcanvas-status.txt"
git add -- guides/veneer.md src/browser/Offcanvas.ts tests/src/browser/Offcanvas.test.ts
git commit -q -F "$MESSAGE"; echo "commit exit=$?"
git log --oneline -1
git diff 63eabbd HEAD > "$UNITS/j-oracle-fix-offcanvas.diff"
for f in accept.sh compare.py mutate.sh mutate-2.sh mutate-3.sh; do cp "$T/$f" "$UNITS/j-oracle-fix-offcanvas-$f"; done
cp "$T/measure-2-case.ts.txt" "$UNITS/j-oracle-fix-offcanvas-measure-2-case.ts.txt"
cp "$TREE/tmp/probe/static.test.ts" "$UNITS/j-oracle-fix-offcanvas-static.test.ts"
for f in accept.log.txt census-before.log.txt census-after.log.txt compare.log.txt measure-2.log.txt mutate-2.log.txt mutate-3.log.txt; do cp "$T/$f" "$UNITS/j-oracle-fix-offcanvas-$f"; done
ls "$UNITS" | grep -c "^j-oracle-fix-offcanvas-"
