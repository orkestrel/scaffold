#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 4 probe: appends the focusin probe block to Offcanvas.test.ts from a
# backup, runs the probe case against the source at hand, and writes the test file back from the
# backup. The log lands beside this file.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
TEST=tests/src/browser/Offcanvas.test.ts
BACKUP=tmp/probe/Offcanvas.test.ts.backup-4
LOG=tmp/probe/focusin-probe.log.txt
cp "$TEST" "$BACKUP"
cat tmp/probe/focusin.block.ts.txt >> "$TEST"
npx vitest run --config vite.config.ts --no-cache --project src:browser "$TEST" -t "probe focusin" > "$LOG" 2>&1
echo "probe exit $?"
cp "$BACKUP" "$TEST"
cmp "$TEST" "$BACKUP" && echo "test restored"
grep -E "^ +(×|✓)|Tests +[0-9]|^[A-Za-z]*Error" "$LOG"
