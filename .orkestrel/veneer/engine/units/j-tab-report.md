# J-TAB round 1 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, native subagent, 172 tool uses, 2671 s; retained verbatim from the subagent's return text except the mutation table, which the retained log `j-tab-mutations.log.txt` carries row for row; the tree is the worktree `veneer/tmp/worktrees/tab` on `unit/tab` from `e24e2c3`, uncommitted)

## J-TAB report

The unit is done and every acceptance command exits 0 on Chromium 153.0.8010.12. One finding needs a decision from you: the delegate restores a tab list wrongly when it drove more than one tab in that list. I kept the fix out of the tree because it changes shared `Delegate.destroy` code, and I return it as patch C, proven red then green.

### Files touched (worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab`)
- `src/browser/Tab.ts` (new): the `Tab` engine, covering construction, initial ARIA writes, `show` with the per-phase write doors, the fade wait, the dropdown writes, `destroy`, and `find`.
- `src/browser/Delegate.ts`: adds the `tab` group, the tab click route, the E12 tab refusal (`#contends`), a root `keydown` listener carrying the tab key route, and `Tab` in the mark, owned-set, acquire and discard unions. The class TSDoc was extended with minimal line changes.
- `src/browser/constants.ts`: adds `TAB_EVENTS`, `TAB_CLASSES`, `TAB_ATTRIBUTES` and `TAB_SELECTORS`, all frozen. There is no `TAB_DEFAULTS`.
- `src/browser/validators.ts`: adds `isTabEvent`.
- `src/browser/helpers.ts`: adds `computeNeighbor`.
- `src/browser/index.ts`: exports `Tab.js`.
- `tests/src/browser/Tab.test.ts` (new): 30 cases.
- `tests/src/browser/Delegate.test.ts`: 7 tab cases. The listener-count case now expects `[root, root]` and its title changed to match.
- `tests/src/browser/validators.test.ts`, `helpers.test.ts`, `index.test.ts`: the guard rows, the `computeNeighbor` rows, and the longer export list.
- `guides/veneer.md`: the Tab rows under § Surface plus the `computeNeighbor` row, the Tab fence, the `#### Tab` subsection, and the plugin row set to `shipped` with Proof `tests/src/browser/Tab.test.ts` and the Obligation wording unchanged.

### Red and green readings
The new behaviours were red first at collection. Command: `npm run test:src:browser -- tests/src/browser/Tab.test.ts tests/src/browser/validators.test.ts tests/src/browser/helpers.test.ts tests/src/browser/index.test.ts tests/src/browser/Delegate.test.ts`
- **Red:** `Test Files  5 failed (5)` / `Tests  1 failed | 2 passed (3)`. The cause was `SyntaxError: The requested module '/src/browser/index.ts' does not provide an export named 'TAB_ATTRIBUTES'`, plus the same error for `computeNeighbor`, `isTabEvent` and `TAB_SELECTORS`.
- **Green, same command:** `Test Files  5 passed (5)` / `Tests  120 passed (120)`.

Each behaviour's own red reading is its row in the mutation table further down.

### Per obligation (behaviour and the case that pins it)
- **TAB1.** Construction checks the host with `isInstance`, resolves the three groups, reads the pane through `readTarget` (target attribute, then `href`), claims the host, binds hooks, and honours `signal`. A control with no list still constructs.
  - Pinned by: `refuses an invalid host and a second owner…` (the "host is not claimed" mutation reddens it), `claims the host and resolves its pane…`, `constructs a control with no list…`.
- **TAB2.** Both pre-change events are dispatched before either is read. After them the call checks again that the control is still inactive and that the same sibling is still active. Every write goes through `#apply`/`#holds`: the control's `active` token must hold from its write on, and the pane's `active`, then `shown`, from theirs.
  - Pinned by: the swap, no-sibling, dual-veto, fade-wait, dropdown, takeover (pane write, fade, control write, sibling during the fade), reentry, and hide/hidden-listener cases.
- **TAB3.** Construction writes, each only where the markup lacks that value:
  - `role="tablist"` on the list when it has no role;
  - on each control: `aria-selected`, `tabindex="-1"` when inactive, and `role="tab"` when it has no role;
  - `role="presentation"` on a wrapper that has no role;
  - on each pane: `role="tabpanel"` when it has no role, and `aria-labelledby` set to the control's id when it has none.

  All targets are saved before the first write and restored by `destroy`. Pinned by: `writes the initial roles and states … and destruction restores them` and `writes each list-group item its own wrapper…`.
- **TAB4.** The keyboard lives on the delegate's `keydown` route. It handles the arrow keys, `Home` and `End`: it calls `stopPropagation` and `preventDefault`, skips controls with the disabled token or attribute, wraps through `computeNeighbor`, focuses with `preventScroll`, then shows the control. On click, anchors and areas have their default prevented.
  - Pinned by the 7 Delegate cases, including the E12 refusal and the case where a consumer already built a `Button` on the control.
- **TAB5.** `destroy` aborts the lifetime, releases the claim, and restores through `HostSnapshot`. A swap in flight resolves `false` with no completed event.
  - Pinned by: `abandons a swap in flight…`, `restores the controls and panes after a completed swap…`, `destroys the tab when its signal aborts…`.
- **TAB6.** `isTabEvent` uses `isInstance(value, CustomEvent)`, which the typecheck accepts, and catches a throwing accessor. The tables are frozen, and the barrel and export list are updated.

### Unknowns
1. **Which element the fade wait watches:** the pane only. The shipped `_nav.scss` animates neither element (the pane reads `transitionDuration 0s`). A consumer's `.fade` animates the pane's opacity, and a control never takes `show`. The pane is laid out with `reflow` after it takes `active`, then takes `show`, then `settleAnimations(pane)` runs.
   - Measured: an `opacity` transition is running, `finished` arrives before `hidden` and `shown`, and 0 animations remain at `shown`.
   - Without the layout step no transition exists (mutation row 27). Bootstrap's order (a wait, then `show`) would leave nothing for the wait to watch.
2. **The dropdown writes:** this unit writes them. The toggle gets `active`, the menu gets `shown` and the wrapper gets `aria-expanded`, only for a control whose role is `tab`, as tab.js does. Pinned by the dropdown case and mutation row 25.

### Mutation table
The return carried `tmp/j-tab/mutations.log.txt` verbatim; the retained copy `j-tab-mutations.log.txt` beside this report is that log (72 `EXACT` or `JOINED` rows, five `GREEN?` rows at Tab 0 of 30, Delegate 0 of 42, validators 0 of 12, helpers 0 of 33, index 0 of 3, and the receipt `restored byte for byte` over identical digests). An earlier run had 2 MISSED rows: the entry wrapper, and the hide-listener door, whose hook stopped seeing events after `destroy` released it. It also had one row that reddened its named case only through a second edit, the hidden-door read. I fixed those cases and reran the whole table, and the log above is that second run. The first run is kept at `tmp/j-tab/mutations-1.log.txt` (retained as `j-tab-mutations-first-run.log.txt`).

### Acceptance commands
- `npm run check:src:browser`: exit 0; `tsc --noEmit -p configs/src/tsconfig.browser.json` printed no diagnostic.
- `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`: exit 0 with no output. A control file containing `any` and `!` produced 3 errors and exit 1, so the linter is live.
- `npx oxfmt … --check src/browser tests/src/browser guides/veneer.md`: `All matched files use the correct format.` / `Finished in 8946ms on 26 files using 16 threads.`
- `npm run test:src:browser`: `Test Files  11 passed (11)` / `Tests  247 passed (247)`, exit 0. The browser was `Chrome/153.0.8010.12`, read from `navigator.userAgent`. The expected `HostSnapshot` `SyntaxError` diagnostic was printed.
- `npm run test:guides`: `Test Files  1 passed (1)` / `Tests  19 passed (19)`.
- `npm run test:policy`: `Test Files  1 passed (1)` / `Tests  109 passed | 1 skipped (110)`. The skipped case is the vendored conditional `denylist currency > registers every substitution-table term…`.
- `npm run build:src:core`, `npm run build:src:styles`, `npm run build:src:browser`: exit 0, 0, 0.
- `npm run test:conformance`: `Test Files  1 passed (1)` / `Tests  22 passed (22)`.
- `npm run test:setup`: `Test Files  4 passed (4)` / `Tests  267 passed (267)`.

### Status and diffstat
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Tab.ts
?? tests/src/browser/Tab.test.ts
```
```
 guides/veneer.md                     | 188 ++++++++++++++++++-
 src/browser/Delegate.ts              | 163 +++++++++++++++--
 src/browser/constants.ts             |  37 ++++
 src/browser/helpers.ts               |  30 +++
 src/browser/index.ts                 |   1 +
 src/browser/validators.ts            |  32 +++-
 tests/src/browser/Delegate.test.ts   | 344 ++++++++++++++++++++++++++++++++++-
 tests/src/browser/helpers.test.ts    |  29 +++
 tests/src/browser/index.test.ts      |   7 +
 tests/src/browser/validators.test.ts |  58 ++++++
 10 files changed, 866 insertions(+), 23 deletions(-)
```
The new files are `Tab.ts` (419 lines) and `Tab.test.ts` (1240 lines).

### Shared-file patches (report-only, apply as whole diffs)
**A. `types.ts` summaries that are false or incomplete.** With patch B they keep guide parity. `TabInterface` claimed arrow-key focus and a key listener, but the tab has neither under R5. The `show` `@returns` sentence left out the takeover case, and `DelegateInterface.destroy` left out the key listener. Full text: `tmp/j-tab/patches/types.ts.patch` (retained as `j-tab-patches/j-tab-types.diff`).
```diff
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -137,7 +137,7 @@
-	/** Releases the click listener and destroys every engine it owns. */
+	/** Releases the click and key listeners and destroys every engine it owns. */
@@ -969,7 +969,7 @@
-/** Activates a tab control and its pane, and moves focus between sibling controls with the arrow keys. */
+/** Activates a tab control and its pane, deactivating the active sibling control and its pane. */
@@ -980,7 +980,7 @@
-	 * @returns Resolves true after the `shown` event; false when the control was active, a listener prevented `show` or the sibling's `hide`, or the tab is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the control was active, a listener prevented `show` or the sibling's `hide`, the tab is destroyed, or the control's or the pane's tokens read the change as taken over.
@@ -988,7 +988,7 @@
-	 * Releases hooks and the key listener and restores the control's roles and attributes.
+	 * Releases hooks, abandons a swap in flight, and restores every role, state, and token the tab wrote.
```
**B. Guide rows paired with A, plus § Delegation.** § Delegation is outside my guide scope. Full diff, formatter-aligned: `tmp/j-tab/patches/veneer.md.patch` (retained as `j-tab-patches/j-tab-guide.diff`). It changes:
- the `TabInterface` Surface row, to A's text;
- the `DelegateInterface` Methods table: `destroy` becomes "Releases the click and key listeners and destroys every engine it owns.";
- the `TabInterface` Methods table: `destroy` becomes "Releases hooks, abandons a swap in flight, and restores every role, state, and token the tab wrote.";
- § Delegation: "listens for clicks and keys on its root", adds "; the `tab` option carries the tab's groups, and § Components states its click and key routes under Tab", and changes "removes the listeners and the observer".

**C. Delegate destruction order (proven).** The delegate destroys and releases engines in the order it acquired them. A list whose controls it drove through two tabs therefore keeps the first swap's state. A probe showed that destroying in the reverse order restores the original markup exactly.

The patch reverses the order in `Delegate.destroy` and `#release`, adds a proof case, and replaces my guide sentence that documents the bound. Evidence from `tmp/j-tab/delegate-order.log.txt` (retained as `j-tab-delegate-order.log.txt`):
- with the proof case alone: `1 failed of 43`;
- with the source change added: `0 failed of 43`;
- receipt: `restored byte for byte`.

Full text: `tmp/j-tab/patches/delegate-order.patch` (retained as `j-tab-patches/j-tab-delegate-order.diff`).
```diff
--- a/src/browser/Delegate.ts
+++ b/src/browser/Delegate.ts
@@ -167,7 +167,9 @@
 		this.#observer.disconnect()
-		for (const engine of this.#owned) engine.destroy()
+		// Engines are destroyed in the reverse of their acquisition, so each restoration writes back
+		// what its engine found before the engines acquired after it wrote over the same markup.
+		for (const engine of [...this.#owned].reverse()) engine.destroy()
 		this.#owned.clear()
@@ -348,9 +350,10 @@
-	// Destroys and releases every owned engine whose host the root no longer contains.
+	// Destroys and releases every owned engine whose host the root no longer contains, in the reverse
+	// of their acquisition.
 	#release(): void {
-		for (const engine of this.#owned) {
+		for (const engine of [...this.#owned].reverse()) {
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -895,9 +895,8 @@
-list carried. A delegate destroys the tabs it acquired in the order it acquired them, so after its
-destruction a list whose controls it drove through more than one tab keeps the values the later tabs
-found when they first wrote, rather than the markup the list carried.
+list carried. A delegate destroys the tabs it acquired in that reverse order, so its destruction
+restores the markup of a list whose controls it drove through more than one tab.
```
It also adds the `Delegate.test.ts` case `restores a list whose controls it drove through several tabs to the markup the list carried`, whose exact text is in the patch file.

### Deviation state
I did not stop. Decisions I settled and recorded:
- **Brief contradiction.** TAB5 says `destroy` releases "the keydown listener". R5, TAB4 and the brief's Departures put the keyboard on the delegate instead. I followed R5, so the tab has no key listener, and patch A corrects `types.ts`.
- **Duplicated selector.** The controls selector `:is({link}, {entry}):not({toggle}), {trigger}` is built in both `Tab.#controls` and `Delegate.#routeTabKey`. `helpers.ts` is closed to me except for `computeNeighbor`, so the next unit granted `helpers.ts` needs to add one shared export.
- **No `TabVocabulary` type.** `types.ts` has none, so the delegate's `#tab` field is typed inline. A `TabVocabulary` beside `CollapseVocabulary` would match the pattern; no sentence is false, so no patch.
- **Unrun claim.** The guide departure "Bootstrap's `show` throws when the control has no list" comes from reading `tab.js` and `selector-engine.js`, not from a run.
- No `prove` call was made; the MCP server is not reachable from this subagent. No install, commit, or discarding git command was run.

Instruments and logs are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tab/tmp/j-tab/`.

---

The Orchestrator's retention note: the instrument and its logs are retained beside this report as `j-tab-mutations.py`, `j-tab-mutations.log.txt`, and `j-tab-mutations-first-run.log.txt`; the three patches under `j-tab-patches/`; the destruction-order proof log as `j-tab-delegate-order.log.txt`; the review evidence is `j-tab.diff` and `j-tab-status.txt`, captured by `w2-gates.sh tab`, whose log is `j-tab-gates.log.txt`.
