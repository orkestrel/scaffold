#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 5 probe (successor of round 4's focusin-probe.sh, which records the
# document's capture `focusin`): appends holds.block.ts.txt to Offcanvas.test.ts from a backup, runs
# the probe case against the source at hand, and writes the test file back from the backup. The log
# lands beside this file.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
TEST=tests/src/browser/Offcanvas.test.ts
BACKUP=tmp/probe/Offcanvas.test.ts.backup-5
LOG=tmp/probe/holds-probe.log.txt
cp "$TEST" "$BACKUP"
cat tmp/probe/holds.block.ts.txt >> "$TEST"
npx vitest run --config vite.config.ts --no-cache --project src:browser "$TEST" -t "probe holds" > "$LOG" 2>&1
echo "probe exit $?"
cp "$BACKUP" "$TEST"
cmp "$TEST" "$BACKUP" && echo "test restored"
grep -E "^ +(×|✓)|Tests +[0-9]|^[A-Za-z]*Error" "$LOG"
