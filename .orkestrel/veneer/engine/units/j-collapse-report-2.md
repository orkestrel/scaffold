# J-COLLAPSE round 2 — the writer's report (returned 2026-09-24 by the resumed `opus` writer on Opus 5.5, native subagent, 49 tool uses, 1179 s; retained verbatim from the subagent's return text; the tree is the worktree `veneer-collapse` on `unit/collapse` at `eab447e` with the round-2 edits uncommitted)

Round 2 is done: C1 to C9 are in place, and every round-1 acceptance command passes, including conformance now that the three builds are permitted. One brief instruction couldn't be followed as written: C9 asked me to apply the guide hunks of the delegate-prose and destroy-summary patches here. Some of those hunks change the guide text that `test:guides` compares against `types.ts`. Applying them without the `types.ts` sentences turns `test:guides` red. So I kept those guide rows with their `types.ts` hunks as report-only patches, and applied only the hunks that don't depend on `types.ts`.

All round-2 edits are uncommitted on top of `eab447e`; no new files were added this round.

## C1 to C9

**C1 (claim 4): the panel is read at every write door.**
- `#taken` is replaced by `#holds(change, present, absent)`, which checks the collapse is live, the call still owns `#change`, and the panel's tokens. `#apply` calls it after every write, and so does `#writeTriggers`.
- The expected tokens depend on the phase:
  - From the transition-token write until its removal, the panel must carry `[transition]`.
  - At show completion it must carry `[host, shown]` without `transition`; the write that adds them also requires `transition`.
  - At hide completion it must carry `[host]` without `shown` or `transition`.
  - At hide's size write, before the token write, it must carry `[shown]` without `transition`.
  - After each sibling hide it must carry neither `shown` nor `transition`.
- A call that finds anything else stops, writes and dispatches nothing more, and resolves `false`.
- Five new proofs:
  - show: the transition token is removed during its first write;
  - show: the shown token is removed at the completing write;
  - hide: the shown token is removed at the size write;
  - hide: the transition token is removed during its write;
  - hide: the shown token is added back at the completing write.

**C2 (claim 6): the collapse mark is keyed on the panel.**
- `#routeCollapse` now calls `#mark(event, Collapse, panel)` inside the loop, after the aborted check and the containment check.
- An inner delegate that skips a panel outside its root leaves the panel for an outer delegate. A destroyed delegate marks nothing more.
- New proofs: an outer root holding the panel while an inner root holds the trigger; a live outer delegate taking over the panels a destroyed inner delegate never reached.
- Because the marks now land on different elements, the button-plus-collapse proof no longer tests the route half of the mark. A new case restores that proof: the button host is the panel itself.

**C3 (claim 7): `parseElement` returns the first HTML match.**
- It now returns `Array.from(document.querySelectorAll(value)).find(instanceOf(HTMLElement))`.
- Its TSDoc bounds the `getElement` comparison: a non-HTML match is skipped where Bootstrap would return it, and the id is not escaped where Bootstrap's `parseSelector` escapes it.
- New proof: an SVG `.vn-parse-mixed` before an HTML one.

**C4 (claims 1, 2, 8, and R2): the guide's sentences.**
- The methods sentence now says `hide` resolves `false` on the panel's own transition, and `show` also on an open sibling's.
- The nesting sentence, in the guide and in the `#siblings` comment, now says "sits inside no other panel carrying the `host` or `transition` token".
- The § Examples fence now builds an open sibling and appends the accordion to `document.body`; the lead-in says what the fence does.
- The takeover paragraph now states the per-phase reads.
- The delegate paragraph now states the per-panel mark.
- Departures added: triggers read at each change; refusals read before and after the event; a transitioning ancestor counts as nesting; sibling collapses acquired after the accepted event; the token write order; completion on running finite animations; the constructor `parent` overriding an invalid attribute.
- The `dispose` clause is replaced with what `base-component.js` shows: `dispose` removes data and handlers and restores nothing.
- Tables (R2): the Collapse classes, attributes, and selectors tables now sit in `#### Collapse` beside the attribute table. The `### Vocabulary` table is back to its three original rows (Button, ColorMode).
- The `plugin` row now has Proof `tests/src/browser/Collapse.test.ts`, its original full Obligation wording, and Status `shipped`. The Proof column of the Compatibility table is re-padded to 34 characters; the formatter check passes.

**C5 (F1): one term per concept.** `#open` is now `#siblings`, `#close` is `#hideSiblings`, and the set of constructed engines is `#owned`. `#moving` is now `#transitioning`, and `#taken` is gone (replaced by `#holds`).

**C6 (claim 3 and R7): whole-file mutation runs.**
- The instrument `tmp/j-collapse/mutations-2.py` runs each mutation over the whole test file, with no `-t`. It reads Vitest's JSON report and records every failing case.
- Its log `tmp/j-collapse/mutations-round-2.log.txt` records the SHA-256 digest of every owned source before and after the run. It ends: `receipt: restored byte for byte`.

**C7 (R6): a removed sibling is destroyed.**
- `#prune()` runs at the start of every `show()` and `hide()` call. It drops owned engines that were already destroyed, and destroys and drops those whose panel `!isConnected`.
- `#acquire` no longer prunes.
- New proof: a constructed sibling's panel is removed, and the next `hide()` destroys its engine and restores the panel.

**C8: the landed binder follow-ups are adopted.**
- The constructor uses `readTag`.
- `Delegate.#collapse` is typed `CollapseVocabulary`.
- Events dispatch `null` as the detail, and the `isCollapseEvent` TSDoc names `CustomEvent<null>`.
- The destroy proof now checks `hasAttribute('style') === false`.
- The second overlap case takes the flip and title from `j-collapse-precedence-proof.diff`. The round-1 red on `eab447e` is now green.
- A constructor `parent` over an invalid `data-bs-parent` is proved.

**C9: the patches.**
- Applied here: the `Delegate.ts` summary change ("Activates data-attribute hosts…"), the matching `Delegate` Surface row, and the § Delegation paragraph.
- Kept as patches: each `types.ts` hunk together with the guide rows that must equal it (the `DelegateInterface` Surface row and Methods row, and the `CollapseInterface` Methods table).

## Red and green readings for the new proofs

Every red reading comes from a mutation that puts the round-1 code back at that door, run over the whole file. I wrote the fixes before the tests in this round, so these mutation runs are the red-first evidence. Every new proof is green in the final whole-file runs.

| New proof | Red reading (mutation) |
|---|---|
| show: token removed during its first write; hide: token removed during its write | "the token read is dropped at the write doors": exactly these 2 of 31 fail |
| show: shown removed at completion; hide: shown added back at completion | "the completion read is dropped": exactly these 2 of 31 fail |
| hide: shown removed at the size write | "the hide size-write read is dropped": exactly this one fails, 1 of 31 |
| a removed sibling is destroyed at the next change | "an owned sibling whose panel left the document is kept": exactly this one fails, 1 of 31 |
| outer root drives a panel outside the inner root | "the collapse mark comes before the containment check": 1 of 32 fails; "the collapse mark is keyed on the trigger": 2 of 32 fail |
| a live outer delegate drives what a destroyed inner one skipped | fails under "keyed on the trigger" and under "the panel loop runs after the delegate is destroyed" |
| the button host is the panel itself | "the per-click mark ignores the route": exactly this one fails, 1 of 32 |
| SVG match before an HTML match | "the parser type-checks the first match only": exactly this one fails, 1 of 3 |

The final whole-file runs read: Collapse 0 failed of 31, Delegate 0 of 32, validators 0 of 10, parsers 0 of 3, index 0 of 3.

## Answers to the Unknowns

1. **The completion read.** It checks the panel's tokens: `host` and `shown` present and `transition` absent after a show; `host` present and `shown` and `transition` absent after a hide. The inline size is not part of the read: it marks no state, and a consumer's own inline size would otherwise refuse a completion. A reaction that puts the transition token back at completion does stop the call, because the panel then reads as mid-transition, and a completed event would contradict what the host shows.
2. **R2's split.** R18 as amended puts each component's default tables beside its attribute table under its `####` subsection. So the `### Vocabulary` table holds no Collapse row. It keeps the rows for Button and ColorMode, the entities that have no `### Components` subsection.

## Mutation table

These are whole-file runs. "Exact" means only the named case failed. Every mutation turns its named case red.

| Mutation | Result | Other cases that also fail |
|---|---|---|
| show writes no transition token | 21 of 31 | almost every lifecycle, motion, door, and overlap case, because show can no longer complete |
| show writes no pixel size | 6 of 31 | horizontal; mid-flight refusal; motion order; destroy mid-flight; vocabulary |
| the triggers are read once | exact, 1 of 31 | — |
| the dimension is always height | 2 of 31 | vocabulary (the replaced horizontal token) |
| a trigger reads its first panel alone | exact | — |
| the sibling is hidden without its engine and events | 4 of 31 | consumer-owned sibling; vocabulary; removed sibling |
| a constructed sibling is not destroyed with its owner | exact | — |
| the sibling owner is not looked up | exact | — |
| the pre-change return value is ignored | exact | — |
| the mid-flight guard is dropped | 2 of 31 | re-entered show |
| the panel takes focus | exact | — |
| a zero timer replaces the settle | exact | — |
| a transitionend wait replaces the settle | 15 of 31 | every case with no cascade loaded, because none of them fires `transitionend` |
| destruction omits the abort | 3 of 31 | the signal case; destroy from the show listener |
| the triggers are not saved | 5 of 31 | accordion; destroy mid-flight; both overlap cases |
| the signal is ignored | 28 of 31 | nearly all, because every engine without a signal destroys itself |
| an owned sibling whose panel left the document is kept | exact | — |
| a completed event is cancelable | exact | — |
| the event guard admits every custom event | exact | — |
| the classes, attributes, or selectors group is ignored (three mutations) | each 2 of 31 | the refusal case |
| a class replacement is not validated | exact | — |
| the parent attribute is not coerced | 5 of 31 | the accordion, mid-flight, vocabulary, and removed-sibling cases |
| a default table is left unfrozen | exact | — |
| the host is not claimed | 7 of 31 | sibling-lookup cases; destroy mid-flight; vocabulary; refusal |
| the collapse records no trigger token | 4 of 31 (both overlap cases are named) | accordion; destroy mid-flight |
| a write is not followed by a read | 6 of 31 | all five C1 door cases |
| the show dispatch is not followed by a read | 2 of 31 | re-entered show |
| the change identity is not read | exact | — |
| the token read is dropped at the write doors | exact, 2 of 31 | — |
| the completion read is dropped | exact, 2 of 31 | — |
| the hide size-write read is dropped | exact | — |
| no collapse route | 7 of 32 | every collapse delegate case |
| no anchor click is prevented | exact | — |
| only the first named panel is driven | 3 of 32 | outside root; destroyed-inner outer case |
| routing by the default collapse selector; the collapse classes group ignored (two mutations) | each 2 of 32 | the delegate refusal case |
| the per-click mark ignores the route | exact | — |
| the per-click mark is dropped | 4 of 32 | two nested-root Button cases; destroyed-inner outer case |
| a panel outside the root is driven | 2 of 32 | the outer-root case |
| the collapse mark is keyed on the trigger | 2 of 32 | destroyed-inner outer case |
| the collapse mark comes before the containment check | exact | — |
| the panel loop runs after the delegate is destroyed | 2 of 32 | destroyed-inner outer case |
| the delegate does not validate the collapse classes | exact | — |
| the collapse event guard admits a payload | 2 of 10 | the throwing-accessor case |
| the collapse event guard reads detail uncontained | exact | — |
| the parser returns the first match whatever it is | 2 of 3 | the first-HTML-match case |
| the parser type-checks the first match only | exact | — |
| the parser refuses an element | exact | — |
| the barrel omits Collapse and the parser | exact | — |

## Acceptance criteria

Output as run:
```
== check:src:browser            exit=0
== oxlint --deny-warnings src/browser tests/src/browser   exit=0   (--format=default: Found 0 warnings and 0 errors.)
== oxfmt --check src/browser tests/src/browser guides/veneer.md
All matched files use the correct format.   exit=0
== test:src:browser   (Chromium 153.0.8010.12)
 Test Files  10 passed (10)
      Tests  198 passed (198)                exit=0
== test:guides        Tests  19 passed (19)  exit=0
== test:policy        Tests  109 passed | 1 skipped (110)  exit=0
== build:src:core / build:src:styles / build:src:browser   exit=0 each
== test:conformance   Test Files  1 passed (1)  Tests  22 passed (22)  exit=0
== root tsc --noEmit -p tsconfig.json   exit=0
== grep -n "#open\|#close" src/browser/Collapse.ts          → no hit (exit=1)
== grep -n "started first" guides/veneer.md src/browser/Collapse.ts → no hit (exit=1)
Collapse plugin row → Proof: tests/src/browser/Collapse.test.ts  Status: shipped
```

The `test:src:browser` run also prints a stack trace and an "Unhandled error … token must not be empty" message. It comes from the landed binder test "withdraws an overlapping earliest recording when its restoration throws inside a reaction" in `HostSnapshot.test.ts`, which throws on purpose. The run still passes, and it isn't a file this unit owns.

I made no `prove` call: that MCP server isn't available to this subagent.

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/Collapse.ts
 M src/browser/Delegate.ts
 M src/browser/parsers.ts
 M src/browser/validators.ts
 M tests/src/browser/Collapse.test.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/parsers.test.ts
```
```
 guides/veneer.md                   | 573 ++++++++++++++++++++-----------------
 src/browser/Collapse.ts            | 241 ++++++++++------
 src/browser/Delegate.ts            |  31 +-
 src/browser/parsers.ts             |  19 +-
 src/browser/validators.ts          |   5 +-
 tests/src/browser/Collapse.test.ts | 232 ++++++++++++++-
 tests/src/browser/Delegate.test.ts |  79 +++++
 tests/src/browser/parsers.test.ts  |  10 +
 8 files changed, 807 insertions(+), 383 deletions(-)
```
Most of the guide's line count is the Compatibility table re-padding its Proof column.

## Remaining shared-file patches

They're in `tmp/j-collapse/patches-2/`, and `git apply --check tmp/j-collapse/patches-2/*.diff` passes with all of them together. The two guide-bearing patches must each land whole, `types.ts` and guide together, or guide parity breaks.

**`j-collapse-delegate-interface.diff`**
```diff
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -134,10 +134,10 @@
 	readonly carousel?: Pick<CarouselOptions, 'classes' | 'attributes' | 'selectors'>
 }
 
-/** Owns delegated activation and the button engines it constructs. */
+/** Owns delegated activation and the engines it constructs. */
 export interface DelegateInterface {
 	readonly root: ParentNode
-	/** Releases the click listener and destroys every owned button engine. */
+	/** Releases the click listener and destroys every engine it owns. */
 	destroy(): void
 }
 
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -38,7 +38,7 @@
 | `ButtonVocabulary`                        | interface | Carries a button's resolved markup vocabulary: each group with every key present.                                                                      |
 | `CollapseVocabulary`                      | interface | Carries a collapse's resolved markup vocabulary: each group with every key present.                                                                    |
 | `Delegate`                                | class     | Activates data-attribute hosts through a root's delegated click listener.                                                                              |
-| `DelegateInterface`                       | interface | Owns delegated activation and the button engines it constructs.                                                                                        |
+| `DelegateInterface`                       | interface | Owns delegated activation and the engines it constructs.                                                                                               |
 | `DelegateOptions`                         | interface | Configures the root of delegated activation and the markup vocabulary of each entity it routes.                                                        |
 | `bindEventMap`                            | function  | Binds an entity's hooks to the wire events its table names until the signal aborts.                                                                    |
 | `emitEvent`                               | function  | Dispatches a bubbling DOM event carrying the supplied detail.                                                                                          |
@@ -223,9 +223,9 @@
 
 #### `DelegateInterface`
 
-| Method    | Summary                                                             |
-| --------- | ------------------------------------------------------------------- |
-| `destroy` | Releases the click listener and destroys every owned button engine. |
+| Method    | Summary                                                        |
+| --------- | -------------------------------------------------------------- |
+| `destroy` | Releases the click listener and destroys every engine it owns. |
 
 #### `RegistryInterface`
 
```

**`j-collapse-destroy-summary.diff`**
```diff
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -727,7 +727,8 @@
 	 */
 	toggle(): Promise<boolean>
 	/**
-	 * Releases hooks, abandons a transition in flight, and restores the panel and its triggers.
+	 * Releases hooks, abandons a transition in flight, restores the panel and its triggers, and
+	 * destroys each sibling collapse it constructed.
 	 *
 	 * @example
 	 * ```ts
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -289,12 +289,12 @@
 
 #### `CollapseInterface`
 
-| Method    | Summary                                                                                   |
-| --------- | ----------------------------------------------------------------------------------------- |
-| `show`    | Shows the panel and hides its open accordion siblings.                                    |
-| `hide`    | Hides the panel.                                                                          |
-| `toggle`  | Hides the panel when it is shown and shows it otherwise.                                  |
-| `destroy` | Releases hooks, abandons a transition in flight, and restores the panel and its triggers. |
+| Method    | Summary                                                                                                                                  |
+| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
+| `show`    | Shows the panel and hides its open accordion siblings.                                                                                   |
+| `hide`    | Hides the panel.                                                                                                                         |
+| `toggle`  | Hides the panel when it is shown and shows it otherwise.                                                                                 |
+| `destroy` | Releases hooks, abandons a transition in flight, restores the panel and its triggers, and destroys each sibling collapse it constructed. |
 
 #### `DropdownInterface`
```

**`j-collapse-returns.diff`.** This one is new this round: `show` and `hide` now also resolve `false` when the panel shows the change was taken over (C1). No guide table carries `@returns`, so this patch has no guide hunk.
```diff
--- a/src/browser/types.ts
+++ b/src/browser/types.ts
@@ -699,7 +699,7 @@
 	/**
 	 * Shows the panel and hides its open accordion siblings.
 	 *
-	 * @returns Resolves true after the `shown` event; false when the panel was shown, a transition was in flight on the panel or on an open accordion sibling, a listener prevented `show`, or the collapse is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the panel was shown, a transition was in flight on the panel or on an open accordion sibling, a listener prevented `show`, the collapse is destroyed, or the panel showed the change was taken over.
 	 * @example
 	 * ```ts
 	 * const opened = await collapse.show()
@@ -709,7 +709,7 @@
 	/**
 	 * Hides the panel.
 	 *
-	 * @returns Resolves true after the `hidden` event; false when the panel was hidden, a transition was in flight, a listener prevented `hide`, or the collapse is destroyed.
+	 * @returns Resolves true after the `hidden` event; false when the panel was hidden, a transition was in flight, a listener prevented `hide`, the collapse is destroyed, or the panel showed the change was taken over.
 	 * @example
 	 * ```ts
 	 * const closed = await collapse.hide()
```

**`j-collapse-roadmap.diff`** is unchanged from round 1. Its rows are about 2,700 characters wide, so the full-context diff is only in the file. It changes one cell: in the Route cell of `| J-ENGINE |`, after `` …its records sit under `/home/user/scaffold/.orkestrel/veneer/engine/` ``, it appends `` ; J-COLLAPSE carries the Collapse engine, its delegate route, and its `plugin` row ``. The padding shrinks by the same amount, so the cell width stays the same.

## Deviation state

The only deviation is the C9 split described at the top. The instruments and logs are in `C:/Users/mikes/WebstormProjects/veneer-collapse/tmp/j-collapse/`: `round2-delegate.py`, `round2-tests.py`, `round2-guide.py`, `mutations-2.py` with `mutations-round-2.log.txt`, `patches-2.py`, and the three `build:*.log.txt` logs.

---

The Orchestrator's retention note: the instruments and the patches named in the deviation state are retained beside this report as `j-collapse-mutations-2.py`, `j-collapse-mutations-round-2.log.txt`, `j-collapse-round2-{delegate,tests,guide}.py`, `j-collapse-patches-2.py`, and `j-collapse-patches-2/*.diff`; the review evidence is `j-collapse-2.diff` (`git diff HEAD`, the round-2 edits), `j-collapse-2-unit.diff` (the whole unit against Veneer `main` `468a118`), and `j-collapse-2-status.txt`, captured by `collapse-gates-2.sh`, whose log is `j-collapse-gates-2.log.txt`.
