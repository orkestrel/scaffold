#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 5 red-first run (successor of red-3.sh, which swaps Offcanvas.ts alone
# and runs one case): writes `43fa73d`'s Offcanvas.ts and helpers.ts over the fixed files from
# backups, runs the whole Offcanvas.test.ts, restores both fixed files, and runs the file again. The
# fixed Offcanvas.ts imports `holdsFocus`, which `43fa73d`'s helpers.ts lacks, so both files swap
# together. Logs land beside this file as `red-5-base.log.txt` and `red-5-fixed.log.txt`.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
OUT=tmp/j-oracle-fix-offcanvas
cp src/browser/Offcanvas.ts "$OUT/Offcanvas.ts.fixed-5"
cp src/browser/helpers.ts "$OUT/helpers.ts.fixed-5"

run() {
	log=$OUT/red-5-$1.log.txt
	npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts > "$log" 2>&1
	echo "$1 exit $?"
	grep -E "^ +×|Tests +[0-9]|^AssertionError|❯ tests/src/browser/Offcanvas.test.ts:[0-9]+" "$log"
}

git show 43fa73d:src/browser/Offcanvas.ts > src/browser/Offcanvas.ts
git show 43fa73d:src/browser/helpers.ts > src/browser/helpers.ts
run base
cp "$OUT/Offcanvas.ts.fixed-5" src/browser/Offcanvas.ts
cp "$OUT/helpers.ts.fixed-5" src/browser/helpers.ts
cmp src/browser/Offcanvas.ts "$OUT/Offcanvas.ts.fixed-5" && cmp src/browser/helpers.ts "$OUT/helpers.ts.fixed-5" && echo "sources restored"
run fixed
