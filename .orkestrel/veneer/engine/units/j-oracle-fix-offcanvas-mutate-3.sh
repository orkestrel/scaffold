#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS mutation run 3 (adds to mutate-2.sh): the backdrop listens for `click` rather
# than `mousedown`, so the press dismisses the panel later than Bootstrap's does. Writes the fixed file
# back from a backup after the run.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
SOURCE=src/browser/Offcanvas.ts
OUT=tmp/j-oracle-fix-offcanvas
BACKUP=$OUT/Offcanvas.ts.fixed-3
cp "$SOURCE" "$BACKUP"
FILTER='press on the backdrop hides the panel, at the hidden|keeps the press focus change'
sed -i "s/addEventListener('mousedown', (event) => this.#press(event)/addEventListener('click', (event) => this.#press(event)/" "$SOURCE"
grep -c "addEventListener('click', (event) => this.#press(event)" "$SOURCE"
npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts -t "$FILTER" > "$OUT/mutation-3-click.log.txt" 2>&1
echo "click exit $?"
grep -E "^ +(×|✓)|Tests +[0-9]" "$OUT/mutation-3-click.log.txt"
cp "$BACKUP" "$SOURCE"
cmp "$SOURCE" "$BACKUP" && echo "source restored"
