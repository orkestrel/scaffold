#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 2 mutation run (successor of mutate-3.sh, whose -t filter names the
# guard case's round-1 title): the backdrop listens for `click` rather than `mousedown`, so the press
# dismisses the panel later than Bootstrap's does. Writes the fixed file back from a backup after the
# run.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
SOURCE=src/browser/Offcanvas.ts
OUT=tmp/j-oracle-fix-offcanvas
BACKUP=$OUT/Offcanvas.ts.fixed-5
cp "$SOURCE" "$BACKUP"
FILTER="press on the backdrop hides the panel, at the hidden|keeps the press.s default action"
sed -i "s/addEventListener('mousedown', (event) => this.#press(event)/addEventListener('click', (event) => this.#press(event)/" "$SOURCE"
grep -c "addEventListener('click', (event) => this.#press(event)" "$SOURCE"
LOG=$OUT/mutation-5-click.log.txt
npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts -t "$FILTER" > "$LOG" 2>&1
echo "click exit $?"
grep -E "^ +(×|✓)|Tests +[0-9]|^[A-Za-z]*Error|❯ tests/src/browser/Offcanvas.test.ts" "$LOG"
cp "$BACKUP" "$SOURCE"
cmp "$SOURCE" "$BACKUP" && echo "source restored"
