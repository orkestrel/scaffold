# Unit T4 report — `isReachable` models an open modal dialog

## Outcome

`isReachable` refuses an element that a shown `[aria-modal="true"]` element does not contain, so
`resolveRendered`, `resolveAccessible`, the ambiguity count, `traverseAccessible`'s population,
`readRefusal`, `clickAccessible`, `clickAccessibleWithin`, and `clickDisclosure` inherit the rule
with no second gate. Touched files:

- `src/browser/helpers.ts` — the modal clause inside `isReachable`, its `@returns` list, and two new
  `@remarks` paragraphs.
- `tests/src/browser/helpers.test.ts` — the proofs under `describe('isReachable')` for the ruling, the
  negative control, containment, and the bound.
- `guides/test.md` — Contract item 16, a new Bounds bullet, and the coverage sentence for
  `tests/src/browser/helpers.test.ts`.

Diffstat:

```text
 guides/test.md                    | 45 ++++++++++++++------
 src/browser/helpers.ts            | 32 ++++++++++++--
 tests/src/browser/helpers.test.ts | 87 +++++++++++++++++++++++++++++++++++++++
 3 files changed, 149 insertions(+), 15 deletions(-)
```

## The unknown the brief named

No existing proof mounts `aria-modal`. `grep -rn "aria-modal" tests/ src/` exits 1 with no output, and
a widened `grep -rn "aria-modal" tests/ src/ guides/ README.md` exits 1 the same way. The only dialog
in the suite is `<dialog id="subject" open>` in the `IMPLICIT_ROLE_CASES` table, which carries no
`aria-modal` attribute and is not modal, so no proof rested on the old reading and none moved.

## What landed

The clause, in `src/browser/helpers.ts`:

```ts
	const chain: Element[] = [element]
	let root = element.getRootNode()
	while (root instanceof ShadowRoot) {
		chain.push(root.host)
		root = root.host.getRootNode()
	}
```

and, as the last term of the existing return expression:

```ts
		[...element.ownerDocument.querySelectorAll('[aria-modal="true"]')].every(
			(dialog) => !isRendered(dialog) || chain.some((node) => dialog.contains(node)),
		)
```

The judgments inside that clause:

- **The dialog's visibility is `isRendered`, not a bare `checkVisibility` call.** A drawer parked at
  `visibility: hidden` is still laid out, and `checkVisibility()` with no options reports it visible.
  `isRendered` reads the computed `visibility` as well, which is the reading a closed Bootstrap
  offcanvas needs. The negative control pins both a `display: none` and a `visibility: hidden` modal.
- **Containment reads the flat tree.** `Node.contains` stops at a shadow boundary, so a subject
  inside a shadow tree whose host sits inside the dialog would otherwise read unreachable — a false
  negative that takes a real control away from every verb, with no repair available at the call site.
  The host chain is walked and judged beside the subject.
- **The clause is the last term.** The document query runs only for an element that already passed
  its own facts.

Doc block, as landed:

```text
 * @returns True if the element is connected, visible, laid out with a non-zero box, in the
 * sequential focus order, neither disabled nor marked `aria-disabled="true"`, outside every
 * `[inert]` subtree, and inside every shown `[aria-modal="true"]` element its document carries;
 * false otherwise.
 ...
 * An open modal dialog takes the page behind it away, and the element's own facts cannot report
 * that: the covered control stays connected, laid out, focusable, and outside every `[inert]`
 * subtree while a pointer, a Tab, and a reader honouring `aria-modal` all stop at the dialog. So
 * this asks the document for its `[aria-modal="true"]` elements, puts each through
 * {@link isRendered}, and refuses the subject wherever a shown one does not contain it. A closed
 * dialog is hidden and excludes nothing, which is why the visibility reading is the announced one
 * rather than a bare `checkVisibility` call: a drawer parked at `visibility: hidden` is still laid
 * out. Nesting needs no separate rule, because an element inside the innermost dialog sits inside
 * every dialog around it.
 *
 * Containment follows the flat tree, so a subject inside a shadow tree is judged by its host chain
 * as well as itself and a dialog holding the host holds its shadow content too. Two arrangements
 * stay outside the read: a native `<dialog>` opened with `showModal` carries no `aria-modal`
 * attribute, and a dialog declared inside a shadow tree is not in what a document query returns.
 * Each leaves the page behind it reachable here.
```

The description paragraph is unchanged, so the guide's Summary cell for `isReachable` still equals
it: `Determines whether a person can click one element where it sits.` `npm run test:guides` asserts
that equality and exits 0.

The Bounds bullet added under § Bounds a shipped helper carries:

```text
- **`isReachable` finds an open modal through the `aria-modal` attribute in the element's own
  document.** Two arrangements carry no such attribute there, and each leaves the page behind it
  reachable: a native `<dialog>` opened with `showModal`, which a browser makes modal without
  marking it, and a dialog declared inside a shadow tree, which a document query does not return.
  Containment itself does cross a boundary, because the subject's host chain is judged beside the
  subject, so a dialog holding a host holds that host's shadow content too. Read `:modal` or the
  dialog's own root where a native or shadow-declared dialog is the subject.
```

Contract item 16 gained the modal clause in its enumeration of what `isReachable` adds over
`isRendered`, and the coverage entry for `tests/src/browser/helpers.test.ts` names the readings the
new proofs take.

## Controls, with their red and green readings

Every reading below ran `npm run test:src:browser -- tests/src/browser/helpers.test.ts -t "modal"`,
which collects exactly the new proofs. Red means the modal clause absent from
`src/browser/helpers.ts`; green means it present.

| Control | Test | Red | Green |
| ------- | ---- | --- | ----- |
| T4-C1 | `refuses a control an open modal leaves behind and resolves the one the dialog holds` | fails: `expected true to be false` at `expect(isReachable(masthead)).toBe(false)` | passes |
| T4-C2 | `accepts a control beside a dialog that is not modal and beside a modal the page withholds` | passes | passes |
| — | `follows containment through a nested modal and across a shadow boundary` | fails: `expected 'page reachable=true' to be 'page reachable=false'` | passes |
| — | `reports a control reachable beside a native modal and beside a shadow-declared modal` | passes | passes |

Counts from the run, scoped command, first-written test shape, before the clause landed:

```text
 Test Files  1 failed (1)
      Tests  2 failed | 2 passed | 260 skipped (264)
```

Same command after the clause landed:

```text
 Test Files  1 passed (1)
      Tests  4 passed | 260 skipped (264)
```

T4-C1 asserts, in order: `isReachable(masthead)` is `false` while an open `[aria-modal="true"]`
sibling holds an identically named link; `isReachable(menu)` is `true`; `resolveAccessible('Get started')` returns the dialog's link though the masthead carries the same
name;
`readRefusal('Get started')` is `undefined`; and `traverseAccessible('Get started')` returns the
dialog's link, so forward Tab never lands on the masthead copy.

T4-C2 is the negative control and stays green in every reading: a `role="dialog"` element without the
attribute, a `[aria-modal="true"]` element at `display: none`, and one at `visibility: hidden` each
leave the masthead reachable and resolvable.

## Mutation reading

The clause was disabled by replacing
`[...element.ownerDocument.querySelectorAll('[aria-modal="true"]')]` with `[]`, leaving every other
term and the whole doc block in place. The file was restored from a copy taken before the mutation,
and `grep -c "ownerDocument.querySelectorAll" src/browser/helpers.ts` reads 1 afterwards.

Scoped command, clause disabled, final test shape:

```text
 FAIL  tests/src/browser/helpers.test.ts:468:2 > isReachable > refuses a control an open modal leaves behind and resolves the one the dialog holds
 FAIL  tests/src/browser/helpers.test.ts:505:2 > isReachable > follows containment through a nested modal and across a shadow boundary
 Test Files  1 failed (1)
      Tests  2 failed | 2 passed | 260 skipped (264)
```

`npm run test:src`, clause disabled, whole source suite:

```text
 Test Files  1 failed | 6 passed (7)
      Tests  2 failed | 579 passed | 9 skipped (590)
```

T4-C1 reddens and T4-C2 stays green in each. Nothing outside the new proofs moved.

## Gates

| Gate | Command | Result |
| ---- | ------- | ------ |
| Format, scoped | `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --check src/browser/helpers.ts tests/src/browser/helpers.test.ts guides/test.md` | exit 0, `All matched files use the correct format.` |
| Lint, scoped | `./node_modules/.bin/oxlint.cmd --config .oxlintrc.json --deny-warnings src/browser/helpers.ts tests/src/browser/helpers.test.ts` | exit 0, no diagnostic |
| Typecheck | `npm run check` | exit 0 |
| Browser project | `npm run test:src:browser` | exit 0, `Test Files 2 passed (2)`, `Tests 318 passed (318)` |
| Guide parity | `npm run test:guides` | exit 0, `Tests 50 passed \| 1 skipped (51)` |
| Policy sweep | `npm run test:policy` | exit 0, `Tests 101 passed \| 1 skipped (102)` |

The lint instrument was proved able to fail before its clean reading was trusted: a throwaway
`tmp/lintprobe.ts` carrying a banned term reported
`policy(no-banned-term): Replace should in this comment` and exited 1. The probe file was deleted.

`npm run test:policy` is outside the brief's gate table and was run because the change edits an
authored Markdown file the prose sweep reads.

**Observation, not a criterion.** `npm test` exits 0: `Tests 581 passed | 9 skipped (590)` for the
source projects, `101 passed | 1 skipped` policy, `173 passed | 1 skipped` config, `24 passed` setup,
`50 passed | 1 skipped` guides.

## One correction made mid-unit

T4-C1's traversal assertion first ran from whatever held focus, and it passed under
`npm run test:src:browser` while failing under `npm run test:src` with
`Interactive target "Get started" is not reachable through forward Tab traversal: A:Get started`.
A temporary diagnostic in the test — restored from a copy afterwards — recorded
`document.activeElement` after each `userEvent.tab()` under the failing run:

```text
BODY#|reach=false|refusal=undefined >> BODY#|reach=false|refusal=undefined >> BODY#|reach=false|refusal=undefined >> BODY#|reach=false|refusal=undefined
```

Focus never left the body, so the Tab moved nothing — the condition `traverseAccessible`'s own
comment names, and the `refusal=undefined` column shows the resolver answering correctly throughout.
The proof now clicks a `Close` control inside the dialog first, which is how an open dialog offers
focus and what gives the page the real input focus a Tab needs. The traversal then starts inside the
dialog, which is also the truer journey. The correction changes nothing about the ruling: with the
clause disabled, T4-C1 still reddens, because `traverseAccessible` calls `resolveRendered` before its
loop and that call raises the ambiguity refusal.

## Claims I flag as least certain

1. **Crossing the shadow boundary for containment is my judgment, not the brief's wording.** The
   brief said an element is unreachable while a visible `[aria-modal="true"]` element "does not
   contain it". I read `contain` as the flat tree and walk the subject's host chain, so a dialog
   holding a shadow host holds that host's shadow content. The alternative — plain `Node.contains` —
   reports every control inside a shadow-hosted dialog unreachable, which breaks a working journey
   with no call-site repair. Reverse it by deleting the `chain` walk and comparing
   `dialog.contains(element)` directly; the containment proof's last assertion is what would redden.
2. **A native `<dialog>` opened with `showModal` is left reachable, and that is a real gap this unit
   did not close.** The browser makes the page behind such a dialog inert without writing any
   attribute, so the ruling's selector does not see it and the layer reports the covered control
   reachable — the same defect the audit found, reached through a different mechanism.
   `document.querySelectorAll(':modal')` would cover it, and `:modal` also matches a fullscreen
   element, so the trigger set is a contract decision rather than an implementation detail. I
   implemented the attribute the brief named, recorded the gap in the doc block and the guide's
   Bounds bullet, and pinned it with an executed assertion
   (`expect(native.matches(':modal')).toBe(true)` beside
   `expect(isReachable(page)).toBe(true)`), so the prose reddens if the behaviour changes. **Route
   `:modal` as a successor unit if the campaign wants the gap closed.**
3. **A dialog declared inside a shadow tree is invisible to the read.** `ownerDocument.querySelectorAll`
   does not descend into a shadow root, so such a dialog excludes nothing. This one is permissive in
   the same direction the existing `[inert]` bound already is, and it is documented beside it. An
   `aria-modal` attribute on a shadow **host** is found normally, which is the common web-component
   shape.
4. **The `Close` control in T4-C1's fixture exists for the focus reason stated earlier.** Without it
   the proof is order-dependent across Vitest projects. I judged a real in-dialog click truer than a
   traversal begun from the body; a reviewer may prefer the traversal assertion moved to a later
   position in the file instead.

## Deviation state

No deviation raised. No stop condition in the brief's deviation contract fired: no existing proof
whose subject is not reachability broke, and no caller gates reachability a second time — every
caller filters through `isReachable` alone. The ancillary choices I settled within the owned scope
are the fixtures' shape, the doc block's wording, the placement of the guide's new Bounds bullet, and
the `Close` control described earlier.

Files written: `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`,
`tmp/units/t4-report.md`. Nothing off-limits was touched; `tmp/pack/` is untouched. Temporary copies
taken for the mutation and diagnostic readings were removed, and `tmp/` holds no file this unit
created beyond this report.

## `git status --short`

```text
 M guides/test.md
 M src/browser/helpers.ts
 M tests/src/browser/helpers.test.ts
```

## `git diff`

```diff
diff --git a/guides/test.md b/guides/test.md
index e2d9469..e18c814 100644
--- a/guides/test.md
+++ b/guides/test.md
@@ -1356,13 +1356,22 @@ These hold across `src/core`, `src/browser`, `src/server`, and this guide.
     element, the `hidden` attribute, a hidden input, and a `display` or `visibility` that takes it
     off the page. `isReachable` reads geometry, and adds connectedness, a visibility check that
     honours opacity, a non-zero box, the sequential focus order, `:disabled` and `aria-disabled`, and
-    the `[inert]` ancestor. A control clipped to a
-    zero-size rectangle is the case that separates them: the accessibility tree still announces it,
-    so `isRendered` accepts it and `isReachable` refuses it. `isReachable` is the one reachability
-    filter the layer applies — `resolveRendered`, `clickAccessibleWithin`, and `clickDisclosure` each
-    narrow their own candidates and then keep the ones it accepts — so a journey meets one rule
-    rather than near-copies of it. Neither asks about the viewport; `resolveAccessible` scrolls a
-    wholly off-viewport target into view and measures that separately with `isOutsideViewport`.
+    the `[inert]` ancestor. It adds one reading the element's own facts cannot carry: an open modal
+    dialog. A shown `[aria-modal="true"]` element that does not contain the subject refuses it,
+    because a pointer, a Tab, and a reader honouring that attribute all stop at the dialog while the
+    covered control stays connected, laid out, and focusable. The dialog is put through `isRendered`,
+    so a drawer parked at `visibility: hidden` excludes nothing, and containment follows the flat
+    tree, so the innermost dialog rules and a host it holds carries its shadow content with it.
+    Applying that inside the predicate is what keeps the resolver, the ambiguity count, the Tab
+    trail, and every acting verb agreeing with the person in front of the dialog, and it is what
+    takes away the name splitting a consumer writes to keep a covered control out of the count. A
+    control clipped to a zero-size rectangle is the case that separates them: the accessibility tree
+    still announces it, so `isRendered` accepts it and `isReachable` refuses it. `isReachable` is the
+    one reachability filter the layer applies — `resolveRendered`, `clickAccessibleWithin`, and
+    `clickDisclosure` each narrow their own candidates and then keep the ones it accepts — so a
+    journey meets one rule rather than near-copies of it. Neither asks about the viewport;
+    `resolveAccessible` scrolls a wholly off-viewport target into view and measures that separately
+    with `isOutsideViewport`.
     `readHit` reads beside that pair rather than filtering with it. It hit-tests one point — the
     element's own bounding-box centre — which is how it sees what neither predicate can: a cover
     over a control they both accept, and a wrapped inline target whose centre falls between its line
@@ -1597,6 +1606,13 @@ the helper rather than to the host, and each names what to reach for instead.
   subject: a host the document does not lay out takes the element off the page, and both predicates
   refuse it. Read a `true` for a shadow subject as the element's own answer, and ask the host
   separately where an ancestor attribute is the subject.
+- **`isReachable` finds an open modal through the `aria-modal` attribute in the element's own
+  document.** Two arrangements carry no such attribute there, and each leaves the page behind it
+  reachable: a native `<dialog>` opened with `showModal`, which a browser makes modal without
+  marking it, and a dialog declared inside a shadow tree, which a document query does not return.
+  Containment itself does cross a boundary, because the subject's host chain is judged beside the
+  subject, so a dialog holding a host holds that host's shadow content too. Read `:modal` or the
+  dialog's own root where a native or shadow-declared dialog is the subject.
 - **`waitForAnimations` waits on the animations a browser reports as running.** A finished animation
   filling its target stays in the list and is already at rest, a paused one is at rest too and
   nothing here resumes it, and an animation declaring infinite iterations never finishes. Each is
@@ -3332,11 +3348,16 @@ Each entry names the contracts its file proves. The test names carry the cases.
   that stays there, and `isOutsideViewport` takes a rectangle wholly beyond each edge and one
   straddling an edge. `isReachable` takes a plain control and each condition it drops, a control the
   document no longer holds, a focusable SVG against an element from a foreign namespace, and the
-  refused summary that proves it is the one filter the acting verbs apply; `isRendered` takes each
-  removal a browser honours and, as the split from `isReachable`, a zero-size announced control. Each
-  predicate also takes a subject inside an open and a closed shadow root beside a host that carries
-  its own ancestor attribute — `[inert]` for one and `aria-hidden` for the other — and a host the flat
-  tree does not lay out, which pins where the boundary falls for each.
+  refused summary that proves it is the one filter the acting verbs apply. It takes the open modal
+  dialog through the readings that fix it: the masthead control the dialog leaves behind against the
+  same name inside it, which resolves and traverses unambiguously; the control a plain dialog, a
+  folded modal, and a blanked modal each leave standing, as the control; the nested dialog and the
+  shadow subject that pin containment on the flat tree; and the native `showModal` dialog and the
+  shadow-declared modal it reports nothing about, which is the bound the guide states. `isRendered`
+  takes each removal a browser honours and, as the split from `isReachable`, a zero-size announced
+  control. Each predicate also takes a subject inside an open and a closed shadow root beside a host
+  that carries its own ancestor attribute — `[inert]` for one and `aria-hidden` for the other — and a
+  host the flat tree does not lay out, which pins where the boundary falls for each.
   `pressKeys` takes a sequence reaching the control a traversal focused and, as the control, the same
   sequence refused while the document body holds focus with no keystroke recorded. `waitForState`
   takes a state a timer flips after the act, a node replaced mid-wait and still resolved by role and
diff --git a/src/browser/helpers.ts b/src/browser/helpers.ts
index 3be5a83..3ceebec 100644
--- a/src/browser/helpers.ts
+++ b/src/browser/helpers.ts
@@ -51,8 +51,9 @@ export function isOutsideViewport(rectangle: DOMRectReadOnly): boolean {
  *
  * @param element - The element to judge.
  * @returns True if the element is connected, visible, laid out with a non-zero box, in the
- * sequential focus order, neither disabled nor marked `aria-disabled="true"`, and outside every
- * `[inert]` subtree; false otherwise.
+ * sequential focus order, neither disabled nor marked `aria-disabled="true"`, outside every
+ * `[inert]` subtree, and inside every shown `[aria-modal="true"]` element its document carries;
+ * false otherwise.
  *
  * @remarks
  * This is the one reachability filter the layer applies. `resolveRendered`, `clickAccessibleWithin`,
@@ -64,6 +65,22 @@ export function isOutsideViewport(rectangle: DOMRectReadOnly): boolean {
  * refuses it. Nothing here asks about the viewport: `resolveAccessible` scrolls a wholly
  * off-viewport target into view and measures that separately with {@link isOutsideViewport}.
  *
+ * An open modal dialog takes the page behind it away, and the element's own facts cannot report
+ * that: the covered control stays connected, laid out, focusable, and outside every `[inert]`
+ * subtree while a pointer, a Tab, and a reader honouring `aria-modal` all stop at the dialog. So
+ * this asks the document for its `[aria-modal="true"]` elements, puts each through
+ * {@link isRendered}, and refuses the subject wherever a shown one does not contain it. A closed
+ * dialog is hidden and excludes nothing, which is why the visibility reading is the announced one
+ * rather than a bare `checkVisibility` call: a drawer parked at `visibility: hidden` is still laid
+ * out. Nesting needs no separate rule, because an element inside the innermost dialog sits inside
+ * every dialog around it.
+ *
+ * Containment follows the flat tree, so a subject inside a shadow tree is judged by its host chain
+ * as well as itself and a dialog holding the host holds its shadow content too. Two arrangements
+ * stay outside the read: a native `<dialog>` opened with `showModal` carries no `aria-modal`
+ * attribute, and a dialog declared inside a shadow tree is not in what a document query returns.
+ * Each leaves the page behind it reachable here.
+ *
  * Inside a shadow tree it answers for the element's own facts, in an open root and a closed one
  * alike: the box, the focus order, `:disabled`, and `aria-disabled` are all the element's. The
  * `[inert]` ancestor is the one read that stops at the boundary, because `closest` never leaves the
@@ -78,6 +95,12 @@ export function isOutsideViewport(rectangle: DOMRectReadOnly): boolean {
  */
 export function isReachable(element: Element): boolean {
 	if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) return false
+	const chain: Element[] = [element]
+	let root = element.getRootNode()
+	while (root instanceof ShadowRoot) {
+		chain.push(root.host)
+		root = root.host.getRootNode()
+	}
 	const rectangle = element.getBoundingClientRect()
 	return (
 		element.isConnected &&
@@ -86,7 +109,10 @@ export function isReachable(element: Element): boolean {
 		rectangle.height > 0 &&
 		element.tabIndex >= 0 &&
 		!element.matches(':disabled, [aria-disabled="true"]') &&
-		element.closest('[inert]') === null
+		element.closest('[inert]') === null &&
+		[...element.ownerDocument.querySelectorAll('[aria-modal="true"]')].every(
+			(dialog) => !isRendered(dialog) || chain.some((node) => dialog.contains(node)),
+		)
 	)
 }
 
diff --git a/tests/src/browser/helpers.test.ts b/tests/src/browser/helpers.test.ts
index 3f1c558..6799803 100644
--- a/tests/src/browser/helpers.test.ts
+++ b/tests/src/browser/helpers.test.ts
@@ -460,6 +460,93 @@ describe('isReachable', () => {
 			)
 		}
 	})
+
+	// A dialog announcing `aria-modal="true"` promises that the rest of the page is out of reach, so
+	// the control a person cannot get to is the one the resolver used to count. The name is carried
+	// twice deliberately: splitting one control's name across the page and the dialog is the
+	// workaround a consumer writes when the layer counts the covered copy.
+	it('refuses a control an open modal leaves behind and resolves the one the dialog holds', async () => {
+		const container = buildFixture(
+			'<header><a id="masthead" href="#start">Get started</a></header>' +
+				'<div role="dialog" aria-modal="true" aria-label="Menu">' +
+				'<button type="button">Close</button>' +
+				'<a id="menu" href="#start">Get started</a>' +
+				'</div>',
+		)
+		const masthead = requireValue(container.querySelector('#masthead'))
+		const menu = requireValue(container.querySelector('#menu'))
+		expect(isReachable(masthead)).toBe(false)
+		expect(isReachable(menu)).toBe(true)
+		expect(resolveAccessible('Get started')).toBe(menu)
+		expect(readRefusal('Get started')).toBeUndefined()
+		// Focus arrives the way an open dialog offers it, which is also what gives the page the real
+		// input focus a Tab needs: the dialog holds focus, and forward traversal from there reaches
+		// the dialog's own control rather than the masthead carrying the same name.
+		await clickAccessible('Close')
+		expect(await traverseAccessible('Get started')).toBe(menu)
+	})
+
+	it('accepts a control beside a dialog that is not modal and beside a modal the page withholds', () => {
+		const container = buildFixture(
+			'<header><a id="masthead" href="#start">Get started</a></header>' +
+				'<div role="dialog" aria-label="Plain"><a href="#start">Plain</a></div>' +
+				'<div role="dialog" aria-modal="true" aria-label="Folded" style="display: none">' +
+				'<a href="#start">Folded</a></div>' +
+				'<div role="dialog" aria-modal="true" aria-label="Blanked" style="visibility: hidden">' +
+				'<a href="#start">Blanked</a></div>',
+		)
+		const masthead = requireValue(container.querySelector('#masthead'))
+		expect(isReachable(masthead)).toBe(true)
+		expect(resolveAccessible('Get started')).toBe(masthead)
+	})
+
+	// Containment is the flat tree's, so the innermost open modal rules and a host inside it carries
+	// its own shadow content along.
+	it('follows containment through a nested modal and across a shadow boundary', () => {
+		const container = buildFixture(
+			'<a id="page" href="#start">Page</a>' +
+				'<div role="dialog" aria-modal="true" aria-label="Outer">' +
+				'<a id="outer" href="#start">Outer</a>' +
+				'<div role="dialog" aria-modal="true" aria-label="Inner">' +
+				'<a id="inner" href="#start">Inner</a>' +
+				'<div id="host" style="width: 200px; height: 60px"></div>' +
+				'</div></div>',
+		)
+		const root = requireValue(container.querySelector('#host')).attachShadow({ mode: 'closed' })
+		root.innerHTML = '<button type="button" style="width: 120px; height: 40px">Shadow</button>'
+		const rows: ReadonlyArray<{ readonly id: string; readonly reachable: boolean }> = [
+			{ id: 'page', reachable: false },
+			{ id: 'outer', reachable: false },
+			{ id: 'inner', reachable: true },
+		]
+		for (const row of rows) {
+			const element = requireValue(container.querySelector(`#${row.id}`))
+			expect(`${row.id} reachable=${String(isReachable(element))}`).toBe(
+				`${row.id} reachable=${String(row.reachable)}`,
+			)
+		}
+		expect(isReachable(requireValue(root.querySelector('button')))).toBe(true)
+	})
+
+	// The two arrangements the read cannot see, recorded here so the documented bound reddens with
+	// the code. A native dialog opened through `showModal` carries no `aria-modal` attribute, and a
+	// modal declared inside a shadow tree is outside what a document query returns.
+	it('reports a control reachable beside a native modal and beside a shadow-declared modal', () => {
+		const container = buildFixture(
+			'<a id="page" href="#start">Page</a>' +
+				'<dialog><a href="#start">Native</a></dialog>' +
+				'<div id="host" style="width: 200px; height: 60px"></div>',
+		)
+		const root = requireValue(container.querySelector('#host')).attachShadow({ mode: 'open' })
+		root.innerHTML =
+			'<div role="dialog" aria-modal="true" aria-label="Sealed" style="width: 120px; height: 40px">' +
+			'<a href="#start">Sealed</a></div>'
+		const native = requireValue(container.querySelector('dialog'))
+		native.showModal()
+		expect(native.matches(':modal')).toBe(true)
+		expect(isReachable(requireValue(container.querySelector('#page')))).toBe(true)
+		native.close()
+	})
 })
 
 describe('isRendered', () => {
```
