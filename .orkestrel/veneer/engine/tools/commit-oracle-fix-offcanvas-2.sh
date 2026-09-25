#!/usr/bin/env bash
# Commits J-ORACLE-FIX-OFFCANVAS round 2 in its worktree and retains the round under units/ in the same action
# (2026-09-25): the status, the diff, the successor instruments, and the logs, with the j-oracle-fix-offcanvas-2-
# prefix. The report is retained already. Usage: bash commit-oracle-fix-offcanvas-2.sh <message-file>
set -u
MESSAGE="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-oracle-fix-offcanvas
cd "$TREE" || exit 1
git status --short > "$UNITS/j-oracle-fix-offcanvas-2-status.txt"
git add -- guides/veneer.md src/browser/Offcanvas.ts tests/src/browser/Offcanvas.test.ts
git commit -q -F "$MESSAGE"; echo "commit exit=$?"
git log --oneline -1
git diff eaf3908 HEAD > "$UNITS/j-oracle-fix-offcanvas-2.diff"
for f in red-2.sh file-2.sh mutate-4.sh mutate-5.sh accept-2.sh compare-2.py wait-2.sh probe-2-case.ts.txt; do cp "$T/$f" "$UNITS/j-oracle-fix-offcanvas-2-$f"; done
for f in red-first-2.log.txt mutate-4.log.txt mutate-5.log.txt accept-2.log.txt compare-2.log.txt probe-2.log.txt; do cp "$T/$f" "$UNITS/j-oracle-fix-offcanvas-2-$f"; done
ls "$UNITS" | grep -c "^j-oracle-fix-offcanvas-2-"
