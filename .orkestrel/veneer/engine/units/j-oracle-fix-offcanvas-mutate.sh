#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS mutation run: applies each mutation to src/browser/Offcanvas.ts in turn, runs
# the two press proofs, records the log, and writes the fixed file back from a backup after each run.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
SOURCE=src/browser/Offcanvas.ts
OUT=tmp/j-oracle-fix-offcanvas
BACKUP=$OUT/Offcanvas.ts.fixed
cp "$SOURCE" "$BACKUP"
FILTER='press on the backdrop hides the panel, at the hidden|keeps the press focus change'
CANCEL='		if (document.activeElement !== focused) event.preventDefault()'

run() {
	name=$1
	vitest_log=$OUT/mutation-$name.log.txt
	npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts -t "$FILTER" > "$vitest_log" 2>&1
	echo "$name exit $?"
	grep -E "^ +(×|✓)|Tests +[0-9]" "$vitest_log"
	cp "$BACKUP" "$SOURCE"
}

# M1: the press never cancels its default action.
sed -i "s/^\t\tif (document.activeElement !== focused) event.preventDefault()$/\t\tvoid focused/" "$SOURCE"
grep -c "void focused" "$SOURCE"
run never

# M2: the dismissing press always cancels its default action.
sed -i "s/^\t\tif (document.activeElement !== focused) event.preventDefault()$/\t\tevent.preventDefault()/" "$SOURCE"
grep -cP "^\t\tevent.preventDefault\(\)$" "$SOURCE"
run always

# M3: the press cancels when its hide released the isolation, whether or not focus moved.
sed -i "s/^\t\tif (document.activeElement !== focused) event.preventDefault()$/\t\tif (this.#isolation === undefined) event.preventDefault()/" "$SOURCE"
grep -c "this.#isolation === undefined) event.preventDefault" "$SOURCE"
run released

# M4: the press cancels whenever focus sits outside the panel after its hide call.
sed -i "s/^\t\tif (document.activeElement !== focused) event.preventDefault()$/\t\tif (!this.#host.contains(document.activeElement)) event.preventDefault()/" "$SOURCE"
grep -c "contains(document.activeElement)) event.preventDefault" "$SOURCE"
run outside

# M5: a static backdrop's press cancels its default action too.
sed -i "s/^\t\t\tthis.#prevent()$/\t\t\tevent.preventDefault()\n\t\t\tthis.#prevent()/" "$SOURCE"
grep -cP "^\t\t\tevent.preventDefault\(\)$" "$SOURCE"
run static

cmp "$SOURCE" "$BACKUP" && echo "source restored"
