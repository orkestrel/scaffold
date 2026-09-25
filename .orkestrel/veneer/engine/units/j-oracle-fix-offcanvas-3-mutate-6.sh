#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 3 mutation run (successor of mutate-4.sh and mutate-5.sh). Round 3
# changed the cancel line to compare `readFocusedElement(scope)`, so mutate-4.sh's and mutate-5.sh's
# sed patterns and their -t filters no longer match. This file applies round 1's and round 2's
# mutations to the round-3 lines, adds round 3's own (the reader reading no shadow root, the reader
# descending one shadow root and stopping, and the press reading the panel's root, which is round 2's
# behaviour), runs the press proofs (round 1's light-tree case, round 2's shadow-root case, round 3's
# residual case, and the guard) and the reader's proofs, and writes each mutated file back from a
# backup after each run. The bases are dcff520 (round 2), eaf3908 (round 1), and 63eabbd (before
# round 1).
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
SOURCE=src/browser/Offcanvas.ts
HELPERS=src/browser/helpers.ts
OUT=tmp/j-oracle-fix-offcanvas
BACKUP=$OUT/Offcanvas.ts.fixed-6
HELPERS_BACKUP=$OUT/helpers.ts.fixed-6
cp "$SOURCE" "$BACKUP"
cp "$HELPERS" "$HELPERS_BACKUP"
FILTER="press on the backdrop hides the panel, at the hidden|keeps the press.s default action|in a shadow root the panel carries"
CANCEL="^\t\tif (readFocusedElement(scope) !== focused) event.preventDefault()$"

run() {
	name=$1
	log=$OUT/mutation-6-$name.log.txt
	npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts -t "$FILTER" > "$log" 2>&1
	echo "$name exit $?"
	grep -E "^ +(×|✓)|Tests +[0-9]|^[A-Za-z]*Error|❯ tests/src/browser/Offcanvas.test.ts" "$log"
	cp "$BACKUP" "$SOURCE"
}

run_reader() {
	name=$1
	log=$OUT/mutation-6-$name-helpers.log.txt
	npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/helpers.test.ts -t "readFocusedElement" > "$log" 2>&1
	echo "$name helpers exit $?"
	grep -E "^ +(×|✓)|Tests +[0-9]|^[A-Za-z]*Error|❯ tests/src/browser/helpers.test.ts" "$log"
	run "$name"
	cp "$HELPERS_BACKUP" "$HELPERS"
}

# R1: the reader reads the root's active element alone, descending into no shadow root.
sed -i "s/^\tlet inner = focused?.shadowRoot?.activeElement ?? undefined$/\tlet inner = undefined/" "$HELPERS"
grep -cP "^\tlet inner = undefined$" "$HELPERS"
run_reader reader-root

# R2: the reader descends one shadow root and stops there.
sed -i "s/^\twhile (inner !== undefined) {$/\tif (inner !== undefined) {/" "$HELPERS"
grep -cP "^\tif \(inner !== undefined\) \{$" "$HELPERS"
run_reader reader-one

# R3: the press compares the panel's root's own active element, round 2's behaviour.
sed -i "s/readFocusedElement(scope)/scope.activeElement/g" "$SOURCE"
grep -c "scope.activeElement" "$SOURCE"
run panel-root

# M0: the press reads from the document in place of the panel's root.
sed -i "s/^\t\tconst scope = isInstance(root, ShadowRoot) ? root : this.#host.ownerDocument$/\t\tconst scope = this.#host.ownerDocument/" "$SOURCE"
grep -cP "^\t\tconst scope = this.#host.ownerDocument$" "$SOURCE"
run document

# M1: the press never cancels its default action.
sed -i "s/$CANCEL/\t\tvoid focused/" "$SOURCE"
grep -c "void focused" "$SOURCE"
run never

# M2: the dismissing press always cancels its default action.
sed -i "s/$CANCEL/\t\tevent.preventDefault()/" "$SOURCE"
grep -cP "^\t\tevent.preventDefault\(\)$" "$SOURCE"
run always

# M3: the press cancels when its hide released the isolation, whether or not focus moved.
sed -i "s/$CANCEL/\t\tif (this.#isolation === undefined) event.preventDefault()/" "$SOURCE"
grep -c "this.#isolation === undefined) event.preventDefault" "$SOURCE"
run released

# M4: the press cancels whenever focus sits outside the panel after its hide call.
sed -i "s/$CANCEL/\t\tif (!this.#host.contains(document.activeElement)) event.preventDefault()/" "$SOURCE"
grep -c "contains(document.activeElement)) event.preventDefault" "$SOURCE"
run outside

# M5: a static backdrop's press cancels its default action too.
sed -i "s/^\t\t\tthis.#prevent()$/\t\t\tevent.preventDefault()\n\t\t\tthis.#prevent()/" "$SOURCE"
grep -cP "^\t\t\tevent.preventDefault\(\)$" "$SOURCE"
run static

# M6: the backdrop listens for `click` rather than `mousedown`.
sed -i "s/addEventListener('mousedown', (event) => this.#press(event)/addEventListener('click', (event) => this.#press(event)/" "$SOURCE"
grep -c "addEventListener('click', (event) => this.#press(event)" "$SOURCE"
run click

cmp "$SOURCE" "$BACKUP" && echo "source restored"
cmp "$HELPERS" "$HELPERS_BACKUP" && echo "helpers restored"

# Bases: round 2's file, round 1's file, then the file before round 1.
for base in dcff520 eaf3908 63eabbd; do
	git show "$base:src/browser/Offcanvas.ts" > "$SOURCE"
	run "base-$base"
done
cmp "$SOURCE" "$BACKUP" && echo "source restored after bases"
