#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 5 mutation run (successor of mutate-6.sh, which mutates round 3's
# deep-read press): for each mutant of the press's cancellation line, written by mutant.mjs over the
# fixed Offcanvas.ts from a backup, runs the whole Offcanvas.test.ts and prints each failing case, its
# assertion, and its line; then restores the fixed file and confirms it with `cmp`. Logs land beside
# this file as `mutation-7-<label>.log.txt`.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
OUT=tmp/j-oracle-fix-offcanvas
SOURCE=src/browser/Offcanvas.ts
BACKUP=$OUT/Offcanvas.ts.fixed-7
cp "$SOURCE" "$BACKUP"
for label in document release always never focus; do
	cp "$BACKUP" "$SOURCE"
	node "$OUT/mutant.mjs" "$label" || continue
	log=$OUT/mutation-7-$label.log.txt
	npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts > "$log" 2>&1
	echo "$label exit $?"
	grep -E "^ +×|Tests +[0-9]|^AssertionError|❯ tests/src/browser/Offcanvas.test.ts:[0-9]+" "$log"
done
cp "$BACKUP" "$SOURCE"
cmp "$SOURCE" "$BACKUP" && echo "source restored"
