# J-OFFCANVAS report: the `opus` unit on Opus 5.5, worktree `tmp/worktrees/offcanvas`

Retained 2026-09-24 from the writer's returned report (agent a502a18f5baae1a22, round 1, base `afae42c`). The mutation table the report carried verbatim is retained beside it as `j-offcanvas-mutations.log.txt`, copied byte for byte from the worktree's `tmp/j-offcanvas/mutations.log.txt`; the report's copy is replaced by that pointer and nothing else is changed.

The Offcanvas engine, its delegate routes, its declarations, its guide subsection, and its mutation instrument are in place. Everything is green on Chromium 153:

- The whole `src:browser` suite passes: 23 files, 704 tests.
- All 57 instrument rows redden their named case, and the log ends with `receipt: restored byte for byte`.
- The `plugin` row reads `shipped`, with Proof `tests/src/browser/Offcanvas.test.ts` and the Obligation wording unchanged.

One decision needs your ruling: how a press on the backdrop is detected. It is the first item under the deviation state.

## Files touched (all owned)

- `src/browser/Offcanvas.ts` (new): the engine.
- `tests/src/browser/Offcanvas.test.ts` (new): 42 cases.
- `src/browser/types.ts`: `OffcanvasVocabulary`, plus the takeover clause added to the `show` and `hide` `@returns` (diff below).
- `src/browser/constants.ts`: the `OFFCANVAS_EVENTS`, `_CLASSES`, `_ATTRIBUTES`, `_SELECTORS`, and `_DEFAULTS` tables, appended after the toast rows. All are frozen.
- `src/browser/validators.ts`: `isOffcanvasEvent`.
- `src/browser/index.ts`: `export * from './Offcanvas.js'`.
- `src/browser/Delegate.ts`: the offcanvas group, `#routeOffcanvas`, `#dismissOffcanvas`, the `#conflicts` entries, the unions and `#discard`, and the class TSDoc.
- `tests/src/browser/Delegate.test.ts`: 18 offcanvas cases.
- `tests/src/browser/validators.test.ts`: the `isOffcanvasEvent` rows.
- `tests/src/browser/index.test.ts`: the export list and the `OffcanvasVocabulary` type check.
- `guides/veneer.md`: the § Surface rows, the Offcanvas fence, `#### Offcanvas`, the § Delegation sentences, and the plugin row's Proof and Status cells.
- `tmp/j-offcanvas/**`: the instrument, `acceptance.sh`, and the logs.

## Obligations

- **OFF1, construction.** The constructor validates the host, resolves the groups (it validates `selectors` and keeps none), and resolves `backdrop` through `parseBackdrop`, feeding both paths, and `escape` and `scroll` through `parseBoolean`. It then claims the host and binds the hooks, host `keydown`, document `mousedown`, and window `resize`. It writes nothing, and `shown` reads the token on every access.
  - Cases: "writes nothing at construction, binds its hooks, Escape, and press listeners, and reads the shown token on every access", "resolves the backdrop, the dismissal, and scrolling from the attributes…", "refuses an attribute value that fails coercion…", "refuses a group value…", and "refuses an invalid host and a second owner…".
- **OFF2, show and hide.** The sequence follows `Modal.ts` door by door, and a takeover or a destruction at any door resolves `false`.
  - Show: `show.vn.offcanvas`, then the scroll lock when `scroll` is `false`, then the backdrop in the host's parent, then `aria-modal` and `role`, a layout read, the `showing` and `shown` tokens, and a wait for the slide and the fade. It then removes `showing`, isolates and focuses the host when `backdrop || !scroll`, and dispatches `shown`.
  - Hide: the isolation is released, then `hiding` is added, the fade out starts, and `shown` is removed. After the wait it removes `hiding` and `showing`, removes the attributes, destroys the backdrop, releases the lock, and dispatches `hidden`.
  - Refusals: Escape or a backdrop press with dismissal off dispatches `prevent.vn.offcanvas` with the modal's detail shape, and only while the panel is shown.
  - Cases: "shows over the backdrop and hides…", "slides in under the showing token…", "fades the backdrop in and out beside the slide…", "hides on a trusted Escape…", "hides on a trusted press beside the panel…", "isolates the page and takes focus…", both door matrices, and the destruction, focus, re-entry, and customized-body cases.
- **OFF3, the responsive hide.** This is Unknown 1; the answer is in the Unknowns section.
  - Cases: the three "responsive hide >" cases.
- **OFF4, the routes.**
  - The toggle route prevents an anchor's or an area's default, then refuses a trigger `matchesDisabled` reads as disabled. It reads its target with `readTarget` bounded by the root. It hides the first `.host.shown` panel in the root that is not the named one, arms the focus return, and calls `toggle(trigger)`.
  - The dismiss route runs through `#reach` and `#locate`.
  - `#conflicts` counts one set: the panel an enabled toggle names and the panel an enabled dismiss trigger reaches, each while no engine sits on it. A panel both routes reach counts once.
  - Both routes run after the toast route.
- **OFF5, the declarations** are the tables, the guard, the barrel row, and `OffcanvasVocabulary`. `DelegateOptions.offcanvas` already existed in `types.ts`.
- **OFF6, the guide.** `#### Offcanvas` sits after `#### Toast`, because `#### Tooltip` is absent from this worktree. The other guide edits are the § Surface rows, the fence, the § Delegation sentences, and the plugin row.
- **OFF7, the instrument** is `tmp/j-offcanvas/mutations.py`. Its table is retained as `j-offcanvas-mutations.log.txt`.

### Red and green readings

Every run used `npm run test:src:browser -- <file>`.

- **Offcanvas, red.** Taken against a skeleton that claims the host and changes nothing:
  ```
   Test Files  1 failed (1)
        Tests  30 failed | 4 passed (34)
  ```
  The 4 that passed are the tables case, the cascade reading case, and 2 takeover cases that pass trivially on a class that never writes.
- **Offcanvas, green:**
  ```
   Test Files  1 passed (1)
        Tests  42 passed (42)
  ```
- **Delegate, red:**
  ```
   Test Files  1 failed (1)
        Tests  15 failed | 122 passed (137)
  ```
  The 15 failures are every offcanvas route case except the two that pass trivially without a route: the dismiss route after a destroyed delegate, and the disabled-toggle button case.
- **Delegate, green:**
  ```
   Test Files  1 passed (1)
        Tests  138 passed (138)
  ```
- **Shared test files, green:**
  ```
   Test Files  2 passed (2)
        Tests  29 passed (29)
  ```
- Some cases have no red reading against the skeleton, because I wrote them after the implementation: both door matrices, the focus, focus-return, re-entrant hide, customized-body, and slide-out destruction cases, the hide-event outer-delegate case, and the validator rows. The instrument rows show that each one reddens.

## Unknowns

1. **The responsive hide.** The panel listens for the window's `resize` event, as `types.ts` states. When the event arrives, the panel does nothing unless it is live and shown.
   - During a change in flight, the resize is recorded. The show applies it after it dispatches `shown`, reading `getComputedStyle(host).position` again at that point.
   - Otherwise a position other than `fixed` calls `hide()`, and the hide's prevention is honoured.
   - Proof: `visitBreakpoint(600, …)` on a `.offcanvas-sm` panel in the 414px tester. A bare panel stays shown, a prevented hide keeps the panel shown, and a slide-in held at 2s applies the resize after `shown`.
2. **Settling on Chromium 153.** The shipped transform transition (`0.3s`) settles under `settleAnimations`. Under staged reduced motion the panel reads `transition-property: none` and `0s`, and no animation is created. The offcanvas key alone gives the backdrop no transition. With `_tokens.scss` and `_fade.scss` loaded, the backdrop reads `opacity` at `0.15s`.

## `types.ts` changes

```diff
@@ -151,6 +151,16 @@ export interface ModalVocabulary {
 	readonly selectors: ModalSelectorMap
 }

+/** Carries an offcanvas panel's resolved markup vocabulary: each group with every key present. */
+export interface OffcanvasVocabulary {
+	/** Names the class tokens the panel writes and tests and the delegate's offcanvas routes match with. */
+	readonly classes: OffcanvasClassMap
+	/** Names the attributes the panel and its triggers read. */
+	readonly attributes: OffcanvasAttributeMap
+	/** Names the selectors the delegate's offcanvas routes match with. */
+	readonly selectors: OffcanvasSelectorMap
+}
+
```

```diff
-	 * @returns Resolves true after the `shown` event; false when the panel was shown, a transition was in flight, a listener prevented `show`, or the panel is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the panel was shown, a transition was in flight, a listener prevented `show`, the panel is destroyed, or another write changed the host's `shown` token at a door the call read before it dispatched its completed event.
```

```diff
-	 * @returns Resolves true after the `hidden` event; false when the panel was hidden, a transition was in flight, a listener prevented `hide`, or the panel is destroyed.
+	 * @returns Resolves true after the `hidden` event; false when the panel was hidden, a transition was in flight, a listener prevented `hide`, the panel is destroyed, or another write changed the host's `shown` token at a door the call read before it dispatched its completed event.
```

## Mutation table

Retained as `j-offcanvas-mutations.log.txt` (57 rows, every row `exit=1` with its named case failing; the digests before and after agree; `receipt: restored byte for byte`). Each row ran against the whole test file its case sits in.

## Acceptance commands

The chain is `tmp/j-offcanvas/acceptance.sh` (retained as `j-offcanvas-acceptance.sh`). This summary is `acceptance.log.txt` (retained as `j-offcanvas-acceptance.log.txt`), verbatim:

```
check-src-browser exit=0 :: npm run check:src:browser
check exit=0 :: npm run check
oxlint exit=0 :: npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
oxfmt exit=0 :: npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
test-src-browser exit=0 :: npm run test:src:browser
test-guides exit=0 :: npm run test:guides
test-policy exit=0 :: npm run test:policy
build-src-core exit=0 :: npm run build:src:core
build-src-styles exit=0 :: npm run build:src:styles
build-src-browser exit=0 :: npm run build:src:browser
test-conformance exit=0 :: npm run test:conformance
test-setup exit=0 :: npm run test:setup
```

- The typecheck and oxlint gates print nothing past their `npm notice` lines.
- `oxfmt` prints `All matched files use the correct format.`
- `test:src:browser` prints `Test Files  23 passed (23)` and `Tests  704 passed (704)`.
- `test:guides` prints `Tests  19 passed (19)`.
- `test:policy` prints `Tests  109 passed | 1 skipped (110)`.
- `test:conformance` prints `Tests  24 passed (24)`.
- `test:setup` prints `Test Files  4 passed (4)` and `Tests  299 passed (299)`.
- Each build prints `✓ built in …`.

Each gate's full log is `tmp/j-offcanvas/gate-<name>.log.txt`. This chain ran on the final sources before your scope message arrived, so the three builds, `test:conformance`, and `test:setup` count as observations for this round.

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Offcanvas.ts
?? tests/src/browser/Offcanvas.test.ts
```

```
 guides/veneer.md                     | 247 +++++++++++++-
 src/browser/Delegate.ts              | 163 ++++++++--
 src/browser/constants.ts             |  48 +++
 src/browser/index.ts                 |   1 +
 src/browser/types.ts                 |  14 +-
 src/browser/validators.ts            |  30 ++
 tests/src/browser/Delegate.test.ts   | 605 +++++++++++++++++++++++++++++++++++
 tests/src/browser/index.test.ts      |  16 +-
 tests/src/browser/validators.test.ts |  70 ++++
 9 files changed, 1166 insertions(+), 28 deletions(-)
```

The two new files are untracked, so the diffstat leaves them out.

## Shared-file patches

None. I left `tests/setupBrowser.ts` and `ROADMAP.md` untouched.

## Deviation state

I did not stop. These choices were settled inside owned files and recorded:

1. **Backdrop press (needs your ruling).** `Isolation` makes the backdrop inert, because the backdrop is a sibling of the panel. A press beside the panel therefore lands on the nearest non-inert ancestor; a probe recorded it landing on the fixture container and on `BODY`.
   - The panel listens for `mousedown` on the document. It counts a press whose target is the backdrop or an element that contains it.
   - No mechanism changed. The alternative is an `Isolation` exemption option, which is outside this unit's files.
   - The guide lists this as a departure.
2. **Layout read placement.** The layout read sits before the `showing` write. The brief's order was "adds `showing`, reflows". Without the earlier read, a panel inserted in the same task starts no slide; the case "slides in a panel inserted in the same task" pins it.
3. **Backdrop timing.** The backdrop fades beside the slide, as Bootstrap's does. Each completed event waits for both, so the backdrop's fade out starts with `hiding` rather than after the attributes are removed.
4. **No door after backdrop writes.** None follows the backdrop's own writes: it is a plain `div` the panel created, so no reaction can run inside them. A code comment and the guide state this.
5. **Stale `showing` token.** The hide also removes a `showing` token a stopped show left behind. The instrument's "the hide leaves a showing token behind" row pins it.
6. **Focus return in the toggle route.** The route arms a focus return, as Bootstrap's data API does, and disarms it on a `false` toggle. The contract does not name this; the guide states it.
7. **Disabled toggle and conflicts.** A disabled toggle's panel does not count in `#conflicts`, because it constructs nothing.
8. **Test-local fixtures.**
   - The fade case loads the shipped `_tokens.scss` and `_fade.scss`, plus a one-rule sheet that lengthens the backdrop fade to 0.5s, so the wait on the fade is observable.
   - Trusted presses go through `sendProtocol` with the frame-scale translation the Carousel test uses, because `userEvent.click` with `position` misplaced repeat clicks in the scaled frame.
9. **Guide placement.** `#### Offcanvas` sits after `#### Toast`, because no `#### Tooltip` exists in this worktree.

## Observations

- The whole-suite log carries a stderr `Failed to execute 'toggle' on 'DOMTokenList'`. It comes from the existing `HostSnapshot.test.ts` case "withdraws an overlapping earliest recording when its restoration throws inside a reaction", not from this unit. The suite still exits 0.
- `isOffcanvasEvent` repeats `isModalEvent`'s body. Merging the two into one shared guard would edit `isModalEvent`, which is outside the owned rows.
- The `parseBackdrop` remarks name only the modal. Adding the offcanvas panel there is outside the owned `parsers.ts` scope.
- I made no call to the `prove` MCP server.
