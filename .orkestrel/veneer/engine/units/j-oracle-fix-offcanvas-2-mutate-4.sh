#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 2 mutation run (successor of mutate-2.sh). Round 2 renamed the cancel
# line's reader from `document` to `scope` and retitled the guard case, so mutate-2.sh's sed pattern
# and its -t filter no longer match; this file applies the same five mutations to the round-2 line,
# adds the `document` mutation for the shadow case, runs the three press proofs (the light-tree case,
# the shadow-root case, and the guard), and writes the fixed file back from a backup after each run.
# The bases are eaf3908 (round 1) and 63eabbd (before round 1).
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
SOURCE=src/browser/Offcanvas.ts
OUT=tmp/j-oracle-fix-offcanvas
BACKUP=$OUT/Offcanvas.ts.fixed-4
cp "$SOURCE" "$BACKUP"
FILTER="press on the backdrop hides the panel, at the hidden|keeps the press.s default action"

run() {
	name=$1
	vitest_log=$OUT/mutation-4-$name.log.txt
	npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts -t "$FILTER" > "$vitest_log" 2>&1
	echo "$name exit $?"
	grep -E "^ +(×|✓)|Tests +[0-9]|^[A-Za-z]*Error|❯ tests/src/browser/Offcanvas.test.ts" "$vitest_log"
	cp "$BACKUP" "$SOURCE"
}

# M0: the press reads the document's active element in place of its root's.
sed -i "s/^\t\tconst scope = isInstance(root, ShadowRoot) ? root : this.#host.ownerDocument$/\t\tconst scope = this.#host.ownerDocument/" "$SOURCE"
grep -cP "^\t\tconst scope = this.#host.ownerDocument$" "$SOURCE"
run document

# M1: the press never cancels its default action.
sed -i "s/^\t\tif (scope.activeElement !== focused) event.preventDefault()$/\t\tvoid focused/" "$SOURCE"
grep -c "void focused" "$SOURCE"
run never

# M2: the dismissing press always cancels its default action.
sed -i "s/^\t\tif (scope.activeElement !== focused) event.preventDefault()$/\t\tevent.preventDefault()/" "$SOURCE"
grep -cP "^\t\tevent.preventDefault\(\)$" "$SOURCE"
run always

# M3: the press cancels when its hide released the isolation, whether or not focus moved.
sed -i "s/^\t\tif (scope.activeElement !== focused) event.preventDefault()$/\t\tif (this.#isolation === undefined) event.preventDefault()/" "$SOURCE"
grep -c "this.#isolation === undefined) event.preventDefault" "$SOURCE"
run released

# M4: the press cancels whenever focus sits outside the panel after its hide call.
sed -i "s/^\t\tif (scope.activeElement !== focused) event.preventDefault()$/\t\tif (!this.#host.contains(document.activeElement)) event.preventDefault()/" "$SOURCE"
grep -c "contains(document.activeElement)) event.preventDefault" "$SOURCE"
run outside

# M5: a static backdrop's press cancels its default action too.
sed -i "s/^\t\t\tthis.#prevent()$/\t\t\tevent.preventDefault()\n\t\t\tthis.#prevent()/" "$SOURCE"
grep -cP "^\t\t\tevent.preventDefault\(\)$" "$SOURCE"
run static

cmp "$SOURCE" "$BACKUP" && echo "source restored"

# Bases: round 1's file, then the file before round 1.
git show eaf3908:src/browser/Offcanvas.ts > "$SOURCE"
run base-eaf3908
git show 63eabbd:src/browser/Offcanvas.ts > "$SOURCE"
run base-63eabbd
cmp "$SOURCE" "$BACKUP" && echo "source restored after bases"
