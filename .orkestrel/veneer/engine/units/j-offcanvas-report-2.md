# J-OFFCANVAS round 2 report: the `opus` unit on Opus 5.5, worktree `tmp/worktrees/offcanvas`

Retained 2026-09-24 from the writer's returned report (agent a502a18f5baae1a22, round 2 under `j-offcanvas-brief-2.md`). The instrument table the report carried verbatim is retained beside it as `j-offcanvas-mutations-2.log.txt` (its first run as `j-offcanvas-mutations-2-first.log.txt`), copied byte for byte from the worktree; the report's copy is replaced by that pointer and nothing else is changed.

All five obligations are closed and the scoped gates are green. A hide that a reaction stops now removes no backdrop. The backdrop stays interactive under the isolation and receives the press itself. The contract and guide wording is corrected. The round-2 instrument's 64 rows all redden their named case (EXACT or JOINED, each with its first failure line), and the log ends with `receipt: restored byte for byte`. I made no call to the `prove` MCP server.

## Files touched (all owned)

- `src/browser/Backdrop.ts`: `hide()` fades and resolves without removing the element; `destroy()` removes it. The class remarks state the split.
- `src/browser/Isolation.ts`: the `spare` option. It skips spared elements at construction and at each observer delivery, and copies the list.
- `src/browser/Offcanvas.ts`:
  - The press listener sits on the backdrop element; there is no containment reading and no document listener.
  - The panel passes `spare: [backdrop.element]` to the isolation.
  - The backdrop's removal is an `#apply(false, …)` step after the post-settle door and the attribute removals.
  - The class remarks match.
- `src/browser/Delegate.ts`: the `#conflicts` locals are now `offcanvasTrigger` and `offcanvasDismiss`. The class TSDoc wrap is repaired, and the route term is "toggle route".
- `src/browser/parsers.ts`: the `parseBackdrop` remarks now name "A modal or an offcanvas panel".
- `src/browser/types.ts`: `IsolationOptions.spare`, the `BackdropInterface` hide split, and the Offcanvas contract sentences (diff below).
- `guides/veneer.md`:
  - § Surface rows for `IsolationOptions` and `OffcanvasSelectorMap`.
  - § Methods rows for `BackdropInterface.hide` and `OffcanvasInterface.destroy`.
  - The fence lead-in, and "offcanvas toggle" in § Delegation.
  - The Backdrop and Isolation bullets under `#### Modal`.
  - `#### Offcanvas`.
- `tests/src/browser/Offcanvas.test.ts`, `Backdrop.test.ts`, `Isolation.test.ts`: the new and rewritten cases.
- `tmp/j-offcanvas/mutations-2.py`, `acceptance-2.sh`, and their logs.

`Modal.ts` is unchanged and `Modal.test.ts` is green (40/40).

## Obligations

**O1: the backdrop's removal is a step of the hide.**
- New case: "removes no backdrop when a reaction to the shown removal takes the hide over, writing nothing through the fade".
  - A custom-element host's reaction to the `shown` removal adds the token back.
  - A document observer (attributes, child-list, subtree) runs through the backdrop's settled fade.
  - The case asserts no records, the backdrop still connected, no `hidden` event, and removal on `destroy()`.
- Backdrop split cases:
  - "…fades it out on hide, and removes it only on destruction": no writes after the hide, and the element stays connected until `destroy()`.
  - The non-animated case: `hide()` leaves the element in place, a second `show()` reuses it, and `destroy()` removes it.

**O2: the interactive backdrop.**
- Isolation case: "leaves a spared sibling as it is and claims no spared element inserted beside the chain". It also mutates the caller's array after construction, which proves the copy.
- Offcanvas case: "hides on a trusted press on the backdrop, through an inert element painted above it and over an SVG element beneath it, dispatches prevent under a static backdrop, and counts no press elsewhere".
  - The case sends `sendProtocol` presses at points (407, 200), (407, 20) over an inert fixed element at `z-index` 1090, and (407, 70) over an SVG painted beneath the backdrop.
  - Each row records `event.target` and asserts it is the backdrop.
  - The static and no-backdrop variants are covered.
  - A trusted press inside the panel and a `mousedown` dispatched on the backdrop's container count for nothing.
  - The tokens are loaded so the panel's rung (1045) sits above the backdrop's (1040).
- The construction case now expects `[host, host, host, lifetime.signal]`, because no document listener is bound.

**O3: the policy clauses.**
- The local `hook` arrow is gone; each hook is an anonymous callback passed directly.
- `OffcanvasDetail` names `show` and `shown` as the events that carry the trigger.
- The hide-sequence text in the class remarks and in the guide says the backdrop is removed "as a step of its own", after the attribute removals.

**O4: the contract and the departures.** The four F1 sentences are rewritten in the Toast shape. The other changes:
- The § Surface row for `OffcanvasSelectorMap` equals the new summary.
- The F2 timeline bullet is added.
- The agreement statement moved to a sentence before the departures list.
- "toggle route" is used throughout `#### Offcanvas` and the offcanvas sentence of § Delegation.
- "removes the backdrop" is used in the destruction bullet, in `OffcanvasInterface.destroy`, and in its § Methods row.
- The fence lead-in reads "Construct an `Offcanvas` engine over a start-edge `.offcanvas` element…".
- The press departure bullet is rewritten.

**O5: the missing control.** The row "the dismiss resolution reads no lifetime" drops `#reach`'s lifetime check. The offcanvas case "acquires and hides nothing through the offcanvas dismiss route after a listener to the button route destroys the delegate" reddens, and the modal and toast siblings redden with it (JOINED).

### Red readings against round 1's source

The `types.ts` changes were already in place for these runs. Each file ran through `npm run test:src:browser -- <file>`.

| File | Result | Failing cases |
| --- | --- | --- |
| `Offcanvas.test.ts` | `Tests  3 failed \| 40 passed (43)` | The construction listener case; the trusted-press case (first failure `expected true to be false` at `expect(backdrop?.inert ?? false).toBe(false)`); the O1 case (`expected [ MutationRecord{} ] to deeply equal []`) |
| `Backdrop.test.ts` | `Tests  2 failed \| 5 passed (7)` | Both split cases |
| `Isolation.test.ts` | `Tests  1 failed \| 7 passed (8)` | The spare case |

### Green readings

These come from `acceptance-2.sh`:

| Gate | Result |
| --- | --- |
| Offcanvas | `Tests  43 passed (43)` |
| Backdrop | `Tests  7 passed (7)` |
| Isolation | `Tests  8 passed (8)` |
| Modal | `Tests  40 passed (40)` |
| Delegate | `Tests  138 passed (138)` |
| Whole `test:src:browser` | `Test Files  23 passed (23)`, `Tests  706 passed (706)` |
| `test:guides` | `Tests  19 passed (19)` |
| `test:policy` | `Tests  109 passed \| 1 skipped (110)` |

## Unknown: the inert-above press

On Chromium 153, a trusted press on an inert element painted above the interactive backdrop reaches the backdrop. The press case's row at y 20 records `event.target === backdrop` and the panel hides. The press over the SVG beneath the backdrop also lands on the backdrop. Under round 1's source, the backdrop was inert, so neither press could reach it.

## `types.ts` diff (round 2 hunks)

```diff
-/** Configures where focus returns when an isolation ends, and the lifetime that ends it. */
+/** Configures where focus returns when an isolation ends, the elements it spares, and the lifetime that ends it. */
 export interface IsolationOptions {
 	/** Receives focus when the isolation ends, if connected and visible. Default: the element focused at construction. */
 	readonly trigger?: HTMLElement
+	/** Lists the elements beside the host's ancestor chain the isolation leaves as they are, at construction and at each observer delivery, such as the backdrop an offcanvas panel paints beside itself. Default: none. */
+	readonly spare?: readonly HTMLElement[]
```
```diff
-	/** Carries the backdrop element, appended to the parent while shown. */
+	/** Carries the backdrop element, appended to the parent from a show until destruction. */
```
```diff
-	 * Removes its `shown` token and removes the backdrop element after its fade settles.
+	 * Removes its `shown` token and waits for its fade to settle, leaving the element for `destroy` to remove.
 	 *
-	 * @returns Resolves true after the element is removed; false when the backdrop was hidden, is destroyed, or a later call started before the fade settled.
+	 * @returns Resolves true after the fade settles; false when the backdrop was hidden, is destroyed, or a later call started before the fade settled.
+	 * @remarks
+	 * The hide writes nothing after the fade, so the owner decides whether the element leaves: a modal
+	 * or an offcanvas panel calls `destroy` as a step of its own hide, after its own door reads.
 	 * @example
 	 * ```ts
-	 * const removed = await backdrop.hide()
+	 * const faded = await backdrop.hide()
+	 * backdrop.destroy()
```
```diff
-	/** Carries the trigger passed to `show`, as Bootstrap's `relatedTarget` field does, or undefined on every other event. */
+	/** Carries the trigger passed to `show` on the `show` and `shown` events, as Bootstrap's `relatedTarget` field does, or undefined on every other event. */
```
```diff
-	/** Names the trigger attribute that selects the panel it shows, read before `href`. Default: `data-bs-target`. */
+	/** Names the trigger attribute that selects the panel it toggles or hides, read before `href`. Default: `data-bs-target`. */
```
```diff
-/** Names the selectors an offcanvas panel matches with; each default is Bootstrap's selector. */
+/** Names the selectors the delegate routes offcanvas clicks by; a panel constructed directly matches with none, and each default is Bootstrap's selector. */
 export interface OffcanvasSelectorMap {
-	/** Selects the triggers that show a panel. Default: `[data-bs-toggle="offcanvas"]`. */
+	/** Selects the triggers that toggle a panel. Default: `[data-bs-toggle="offcanvas"]`. */
```
```diff
-	/** Replaces the selectors the panel matches with, read from the constructor alone; an absent key keeps its default. */
+	/** Replaces the selectors the delegate routes offcanvas clicks by, read from the constructor alone; a panel constructed directly matches with none, and an absent key keeps its default. */
```
```diff
-	 * Releases hooks and the resize listener, abandons a transition in flight, and restores the panel, the backdrop, scrolling, and focus.
+	 * Releases hooks and the resize listener, abandons a transition in flight, removes the backdrop, and restores the panel, scrolling, and focus.
```

Round 1's `OffcanvasVocabulary` hunk and the `show`/`hide` `@returns` hunks are unchanged.

## Guide sentences (key ones)

- **The press:** "The panel listens for `mousedown` on the backdrop element it creates, as Bootstrap's `Backdrop` utility does, and the isolation spares the backdrop, so a press beside the panel lands on the backdrop itself. A press on any other element, a container of the backdrop included, counts for nothing."
- **The stopped hide:** "A hide the host took over removes no backdrop: the backdrop's fade writes nothing past its settle, and the hide removes the element only as a step after its own door reads."
- **The timeline departure:** "The engine adds the `shown` token with the `showing` token before the slide in, and removes it before the slide out… Bootstrap's panel carries `showing` alone while it slides in and `show hiding` while it slides out, and a style or a query on `.offcanvas.show` sees the two timelines apart."
- **The press departure:** "Everything outside the panel except its backdrop is inert, so a press on an element painted above the backdrop, such as a toast container or a menu, falls through to the backdrop and dismisses the panel. Under Bootstrap's `FocusTrap` that element stays interactive and receives the press itself."
- **The Backdrop bullet under `#### Modal`:** "…hiding removes the token, waits for the fade to settle, and writes nothing after it, so the element stays in its parent until destruction removes it. The owner removes the element as a step of its own hide, after its own door reads…"

## Instrument table

Retained as `j-offcanvas-mutations-2.log.txt` (64 rows, every row `EXACT` or `JOINED` with its named case and first failure line; `GREEN?` rows at 0 failed for `Offcanvas.test.ts` (43), `Delegate.test.ts` (138), `validators.test.ts` (26), `index.test.ts` (3), `Backdrop.test.ts` (7), `Isolation.test.ts` (8), `Modal.test.ts` (40); matching digests over seven source files; `receipt: restored byte for byte`).

The first full run of this instrument (kept as `mutations-2-first.log.txt`, retained as `j-offcanvas-mutations-2-first.log.txt`) had one invalid row. "The press counts a target inside the panel" reddened on `TypeError: (intermediate value) is not a function`, an automatic-semicolon break in the mutated line rather than a behavioural failure. I prefixed that mutation with `void` and reran the whole instrument; the retained table is that rerun. The source digests match the files the acceptance chain ran on.

## Scoped chain

`tmp/j-offcanvas/acceptance-2.log.txt` (retained as `j-offcanvas-acceptance-2.log.txt`):

```
check-src-browser exit=0 :: npm run check:src:browser
check exit=0 :: npm run check
oxlint exit=0 :: npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
oxfmt exit=0 :: npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
offcanvas exit=0 :: npm run test:src:browser -- tests/src/browser/Offcanvas.test.ts
backdrop exit=0 :: npm run test:src:browser -- tests/src/browser/Backdrop.test.ts
isolation exit=0 :: npm run test:src:browser -- tests/src/browser/Isolation.test.ts
modal exit=0 :: npm run test:src:browser -- tests/src/browser/Modal.test.ts
delegate exit=0 :: npm run test:src:browser -- tests/src/browser/Delegate.test.ts
test-src-browser exit=0 :: npm run test:src:browser
test-guides exit=0 :: npm run test:guides
test-policy exit=0 :: npm run test:policy
```

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/Backdrop.ts
 M src/browser/Delegate.ts
 M src/browser/Isolation.ts
 A src/browser/Offcanvas.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Backdrop.test.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/Isolation.test.ts
 A tests/src/browser/Offcanvas.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
```
```
 16 files changed, 3378 insertions(+), 78 deletions(-)
```

This is `git diff HEAD --stat` over rounds 1 and 2 together. Round 2 added `Backdrop.ts` (15), `Isolation.ts` (13), `parsers.ts` (8), `Backdrop.test.ts` (15), and `Isolation.test.ts` (26).

## Deviation state

No stop. These choices were settled inside the brief's latitude:

- **Press listener placement.** The listener sits on the backdrop element, which Bootstrap's shape uses. Construction therefore binds no document listener, and the construction case now expects `[host, host, host, lifetime.signal]`.
- **Press fixture.**
  - An inert `div` at `z-index` 1090 and an SVG under the backdrop, both beside the panel.
  - The panel and backdrop rungs come from the shipped `_tokens.scss`.
  - The container-press check dispatches `mousedown` on the backdrop's container, because no trusted press can land on an ancestor of an interactive full-viewport backdrop.
- **Containment row.** "The press counts any target containing the backdrop" reddens through that container dispatch, not through the inert-above or SVG presses. With the backdrop spared, those two land on the backdrop under either reading.
- **Guide placement.** The Backdrop and Isolation mechanisms have no `####` heading of their own; their sentences are the bullets under `#### Modal`, and I edited those bullets there.
- **Unpinned door.** The new backdrop-removal step's door is proved by no instrument row. No reaction can run inside removing the panel's own `div`, so removing that door would change nothing any test can observe. It is kept because the brief names the removal an `#apply` step.
- **Spare scope.** `spare` applies only to elements beside the host's ancestor chain; the chain elements themselves are still claimed as not inert. The isolation copies the list at construction.

The Modal's own stopped-hide path now leaves its backdrop connected until a later show or destruction, where round 1's source removed it at the end of the fade. That matches the "held until a later show" rule. The Modal suite is green, and no Modal source changed.
