#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 3 red-first run: the residual case, a trigger inside a shadow root the
# light-tree panel carries, first against `dcff520`'s Offcanvas.ts (written over the fixed file from a
# backup), then against the fixed file. Logs land beside this file as `<label>-base.log.txt` and
# `<label>-fixed.log.txt`, where the first argument is the label.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
OUT=tmp/j-oracle-fix-offcanvas
SOURCE=src/browser/Offcanvas.ts
BACKUP=$OUT/Offcanvas.ts.fixed-r3
cp "$SOURCE" "$BACKUP"

run() {
	log=$OUT/$1-$2.log.txt
	npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts -t "in a shadow root the panel carries" > "$log" 2>&1
	echo "$2 exit $?"
	grep -E "^ +(×|✓)|Tests +[0-9]|^[A-Za-z]*Error|❯ tests/src/browser/Offcanvas.test.ts" "$log"
}

git show dcff520:src/browser/Offcanvas.ts > "$SOURCE"
run "$1" base
cp "$BACKUP" "$SOURCE"
cmp "$SOURCE" "$BACKUP" && echo "source restored"
run "$1" fixed
