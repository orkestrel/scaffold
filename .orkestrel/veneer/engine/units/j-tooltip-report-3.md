# J-TOOLTIP round 3 — the writer's returned report (retained 2026-09-24; the mutation table is the retained log)

Writer: `opus` on Opus 5.5, native subagent `a48b1f17b0f574e7a`, resumed in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip`. Brief: `j-tooltip-brief-3.md`. Instrument: `j-tooltip-mutations-3.py` with its log `j-tooltip-mutations-3.log.txt` (74 rows, each `EXACT` or `JOINED`, each with the failing assertion's first line, the seven `GREEN?` rows at 0 failed of 39, 18, 7, 45, 28, 24, and 3, the digests before and after equal, `receipt: restored byte for byte`), the first round-3 run `j-tooltip-mutations-3-first.log.txt` (the build-door row `MISSED` before the case gained its observer assertion), the red log `j-tooltip-round3-red.log.txt`, the chain `j-tooltip-acceptance-3.sh`, and the empty-configuration probe `j-tooltip-probe-empty.log.txt`, retained beside this file. The writer's round-2 instrument survives as the retained `j-tooltip-mutations-2.py`. The scoped-chain decision reached the writer after this round returned and applies from round 4.

---

Round 3 is complete: every item from A to N is built. Items A to F, J, K, and L each went red on the counterexample the brief names before their fix. The final instrument has 74 rows, each EXACT or JOINED against the case it names, and ends with `restored byte for byte`. The whole acceptance chain exits 0 on Chromium 153.0.8010.12, `npm run check` included.

Three points need your attention; the deviation state at the end has the detail:
- **The item E premise is inverted.** An empty sanitizer configuration keeps more than the omitted default, not less, so the proof asserts it that way round.
- **I overwrote the round-2 instrument in place.** Its log is kept as `mutations-round2.log.txt`, and your retained `j-tooltip-mutations-2.py` is the only copy of the script.
- **Two `PlacementInput` summaries changed after the instrument's final run.** Both are doc-only; I reran the whole chain after them, but not the instrument.

## Files touched this round
- `src/browser/Tooltip.ts`:
  - **Build doors (A):** the build takes the show's change and reads the door after the template write, after the tokens and id, after each content function, and after each slot write.
  - **Hide (A, J):** hide is now `#conceal(forced)`. It reads that the tip is still in the container it went into. After a prevented hide it promotes the tip again once per shown tip (`#promoted`).
  - **Slot writes (B, C):** `#occupy` returns the slot's current engine-placed occupant, then writes the new element's origin record, then moves it.
  - **`fill` (D):** it reads its lifetime after returning displaced content.
  - **Descendants (K):** `#acquire` builds a descendant's tooltip inside containment, records a refusal once in `#failed`, and drives only the tooltips it built (`#owned`).
  - **Shape (N):** `#entered` is a plain boolean; the origin record is a readonly `{ parent, sibling, slot, selector }`; renames `#context`→`#acquire`, `#describe`→`#link`, `#parent`→`#container`, `#return`→`#release`; the `container` option's field is `#receiver`; the class remarks are rewritten.
- `src/browser/Placement.ts` (L): the arrow points at the reference's center, measured from the tip's padding edge and clamped to `[0, clientWidth − arrow]`; the TSDoc says so.
- `src/browser/parsers.ts`: F: `parseFallbacks` contains a hostile iterator or accessor and returns `undefined`; N: `parsePosition` reads `keyOf(PLACEMENT_AREAS)` instead of an inline list.
- `src/browser/types.ts`: the owned sentences (the diff block below).
- `tests/src/browser/Tooltip.test.ts`: the new cases for A to D and J to M; the hidden-hide case records hide events; the default distance is a measured 6px; the tables case title is plural.
- `tests/src/browser/Placement.test.ts`: a standalone case for an invalid arrow.
- `tests/src/browser/sanitizers/NativeSanitizer.test.ts`: the E cases, with an independent WAI-ARIA 1.2 list.
- `tests/src/browser/parsers.test.ts`: the hostile-array control.
- `guides/veneer.md`, inside `#### Tooltip`: the door paragraph (G); the E13 bound (G); the move-back, overlapping-selector, and fill-after-destruction sentences; the arrow's reference point (L); the re-promotion bound (J) in the hint paragraph and the departures; the descendant containment and ownership (K); new departures for `toggle`'s immediacy and the `aria-*` limit; the rewritten empty-`title` bullet. Outside `#### Tooltip`, the `PlacementInput` Surface row summary changed.

## A to F: red before the fixes, green after
**Red.** `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Tooltip.test.ts tests/src/browser/Placement.test.ts tests/src/browser/parsers.test.ts tests/src/browser/sanitizers/NativeSanitizer.test.ts` exited 1 (`round3-red.log.txt`):
```
     × stops a build whose content function destroys the tooltip on its second call, leaving the element in its original parent 4ms
     × resolves a hide false and leaves the tip where a reaction moved it during the wait 159ms
     × returns a custom element content home when its disconnection reaction destroys the tooltip during the move 1ms
     × returns both elements home when overlapping selectors fill one slot 2ms
     × resolves fill false when the connection reaction of a returned element destroys the tooltip 2ms
     × hides a tip at its second platform close after a prevented hide promoted it again, so two tooltips that prevent every hide settle 1014ms
     × drives nothing for a descendant whose own attribute fails coercion, and no error reaches a listener 253ms
     × leaves a tooltip a consumer constructed on a descendant to its own listeners 127ms
     × points the arrow at the centre of a narrow trigger at a start and an end placement 4ms
     × refuses an unknown member, an empty list, an empty member, and a value of another type 0ms
 Test Files  2 failed | 2 passed (4)
      Tests  10 failed | 78 passed (88)
```
The first line of each failure, in log order (parsers, then A1, A2, B, C, D, J, K1, K2, L):
```
Error: Unreadable
AssertionError: expected <div class="tooltip-inner">…(1)</div> to be <div id="home"></div> // Object.is equality
AssertionError: expected true to be false // Object.is equality
AssertionError: expected <div class="tooltip-inner">…(1)</div> to be <div id="home"><i …(1)></i></div> // Object.is equality
AssertionError: expected null to be <div id="first-home"></div> // Object.is equality
AssertionError: expected true to be false // Object.is equality
Error: Condition "the pair settles" did not hold within 1000ms (waited 1010.1000000089407ms)
AssertionError: expected [ [ …(1) ], [ …(1) ], [ …(1) ] ] to deeply equal []
AssertionError: expected true to be false // Object.is equality
AssertionError: expected [ 32, -85 ] to deeply equal [ +0, +0 ]
```

The E cases and the M vocabulary case prove behaviour that already existed, so no red reading is owed; their instrument rows bind them. After its red reading, the A1 case gained a mutation-observer assertion that nothing moved out of the original parent. Without it, the door row was MISSED in the first instrument run, because the build's stop path returned the element home anyway.

**Green.** The same files plus `Dropdown.test.ts`: `Test Files  5 passed (5)` / `Tests  120 passed (120)`. The whole browser project (`browser-round3.log.txt`): `Test Files  24 passed (24)` / `Tests  683 passed (683)`.

## G: the guide
- **Door paragraph:** each write, dispatch, content function call, element move, and await is followed by a lifetime and identity read. The show's and the hide's doors are listed. A build that stops returns every element it moved.
- **E13 bound:** "A `destroy` call made from a custom element's reaction to one of the restoration's own attribute writes returns before the restoration's remaining writes land, because a nested call on the shared snapshot restores only the records saved since; J-SNAPSHOT-SHARED closes that bound." `HostSnapshot` is unchanged.

## H: the mutation table
The retained `j-tooltip-mutations-3.log.txt`, row for row. The rows added in round 3: "the build reads no door between a content function and its move", "hide removes a relocated tip", "no record precedes the move", "an engine-displaced element is not restored", "fill resolves after destruction", "the allowlist admits a global href", "the allowlist loses an ARIA name", "the allowlist admits data attributes", "the unsupported refusal is removed", "the constructor placement is ignored (precedence reversed)", "an invalid descendants selector is accepted", "the promotion compensation is omitted", "the offset is not passed", "update is not forwarded", "a prevented hide proceeds", "a hide on a hidden tip proceeds", "a refused promotion is not cleaned up", "a refused promotion rejects the show", "an arrow that is not an HTML element is accepted", "a second platform close is prevented again", "the arrow ignores the trigger center", "the hide wait is dropped", "a failing descendant throws out of the listener", "a consumer's descendant tooltip is driven", "the class group is ignored", "the selector group is ignored", the six helper rows over `helpers.test.ts`, the three guard rows over `validators.test.ts`, and the five parser rows over `parsers.test.ts`; "the native sanitizer drops its configuration" now runs `NativeSanitizer.test.ts`; "the default offset is zero" now reddens the measured-distance case.

## I: the acceptance chain
```
chromium 153.0.8010.12
check exit=0 | npm run check:src:browser
check-tree exit=0 | npm run check
lint exit=0 | npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
format exit=0 | npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
browser exit=0 | npm run test:src:browser
guides exit=0 | npm run test:guides
policy exit=0 | npm run test:policy
core exit=0 | npm run build:src:core
styles exit=0 | npm run build:src:styles
build exit=0 | npm run build:src:browser
conformance exit=0 | npm run test:conformance
setup exit=0 | npm run test:setup
```
`browser`: `Tests  683 passed (683)`; `guides`: `Tests  19 passed (19)`; `policy`: `Tests  109 passed | 1 skipped (110)`; `conformance`: `Tests  22 passed (22)`; `setup`: `Tests  281 passed (281)`; the builds and the checks print no diagnostics.

## J to N
- **J:** a shown tip is promoted again after a prevented hide only once. The platform's next close of that tip hides it, with the hide event dispatched and its prevention ignored. Two tooltips whose listeners prevent every hide settle with one tip shown and one `hidden` event. The guide states this in the hint paragraph and the departures list.
- **K:** a descendant whose construction throws an `AppError` is recorded once in `#failed`, driven no further, and no error reaches a listener. A consumer-constructed descendant tooltip is left to its own listeners.
- **L:** at `top-start` and `bottom-end`, the arrow's center lies within 1px of a 30px trigger's center. Before the fix it was off by 32px and −85px.
- **M:** the case "writes, tests, reads, and matches only the replacing values when every group is replaced" is added. It replaces every class, attribute, and selector. It also sets an invalid `data-bs-*` value for every default attribute name, so construction throws if any default name is read. Two rows bind it: "the class group is ignored" and "the selector group is ignored".
- **N:** covered under Files touched and in the `types.ts` diff. The departures list gains `toggle`'s immediacy and the `aria-*` limit, and the empty-`title` bullet now says `show` refuses unless another slot has content.

## Status and diffstat
```
 M guides/veneer.md
 M src/browser/Placement.ts
 A src/browser/Tooltip.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 A src/browser/sanitizers/NativeSanitizer.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Placement.test.ts
 A tests/src/browser/Tooltip.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 A tests/src/browser/sanitizers/NativeSanitizer.test.ts
 M tests/src/browser/validators.test.ts
```
```
 guides/veneer.md                                   |  294 +++-
 src/browser/Placement.ts                           |   46 +-
 src/browser/Tooltip.ts                             |  764 +++++++++
 src/browser/constants.ts                           |  181 +++
 src/browser/helpers.ts                             |  108 +-
 src/browser/index.ts                               |    2 +
 src/browser/parsers.ts                             |  137 +-
 src/browser/sanitizers/NativeSanitizer.ts          |   45 +
 src/browser/types.ts                               |   29 +-
 src/browser/validators.ts                          |   55 +
 tests/src/browser/Placement.test.ts                |   54 +
 tests/src/browser/Tooltip.test.ts                  | 1622 ++++++++++++++++++++
 tests/src/browser/helpers.test.ts                  |  115 +-
 tests/src/browser/index.test.ts                    |   18 +
 tests/src/browser/parsers.test.ts                  |  102 ++
 .../src/browser/sanitizers/NativeSanitizer.test.ts |  182 +++
 tests/src/browser/validators.test.ts               |   75 +
 17 files changed, 3802 insertions(+), 27 deletions(-)
```

## `types.ts` changes (the unit's full diff)
```diff
-/** Names the elements a placement anchors and the popover mode it promotes the positioned element with. */
+/** Names the elements a placement anchors, the popover mode it promotes the positioned element with, and the arrow it points at the reference. */
-	/** Names the value of the HTML `popover` attribute the element is promoted with: `manual` for a menu or a popover tip, `hint` for a tooltip tip. Default: `manual`. */
+	/** Names the value of the HTML `popover` attribute the element is promoted with: `manual` for a menu or a Popover component's tip, `hint` for a tooltip tip. Default: `manual`. */
+	/** Carries the element inside the positioned element that points at the reference, which the placement positions absolutely on the edge facing the reference, pointing at the reference's center and kept inside that edge, each time it writes the side. */
+	readonly arrow?: HTMLElement
-/** Names the selector a tooltip matches with; its default is Bootstrap's selector. */
+/** Names the selectors a tooltip matches inside its tip; each default is Bootstrap's selector. */
+	/** Selects the tip's arrow, which the placement points at the trigger's center from the edge facing it. Default: `.tooltip-arrow`. */
+	readonly arrow: string
-		/** If `true`, pointer hover shows the tip; if `false`, it does not. Default: `true`. */
+		/** If `true`, pointer hover shows the tip; if `false`, it does not. Default: `true`, and `false` for a popover. */
-		/** If `true`, focus shows the tip; if `false`, it does not. Default: `true`. */
+		/** If `true`, focus shows the tip; if `false`, it does not. Default: `true`, and `false` for a popover. */
-		/** If `true`, a click toggles the tip; if `false`, it does not. Default: `false`. */
+		/** If `true`, a click toggles the tip; if `false`, it does not. Default: `false`, and `true` for a popover. */
-	/** Fills the tip's text slot, mirroring Bootstrap's `title` option. Default: the trigger's `title` attribute. */
+	/** Fills the tip's text slot, mirroring Bootstrap's `title` option. Default: the trigger's `title` attribute, which a tooltip with `descendants` set leaves unread. */
-		/** Sets the markup the tip is built from, mirroring Bootstrap's `template` option. Default: Bootstrap's tooltip template. */
+		/** Sets the markup the tip is built from, mirroring Bootstrap's `template` option. Default: Bootstrap's tooltip template, and its popover template for a popover. */
-	 * @returns Resolves true after the `shown` event; false when the tooltip is disabled or has no content, the trigger is not connected to its document, a listener prevented `show`, a transition was in flight, or the tooltip is destroyed.
+	 * @returns Resolves true after the `shown` event; false when the tooltip is disabled or has no content, the trigger is not connected to its document or its inline `display` is `none`, a change was in flight, a listener prevented `show`, or the tooltip is destroyed.
-	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap throws for a trigger
-	 * whose inline `display` is `none`; this contract resolves false there instead.
+	 * A settled shown tip is rebuilt, as Bootstrap's `show` rebuilds it. Bootstrap's `show` also runs
+	 * again while a change is in flight; this contract resolves false there. Bootstrap throws for a
+	 * trigger whose inline `display` is `none`; this contract resolves false there instead.
-	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the tooltip is destroyed, or when the tip is shown and the rebuild's `show` is refused because the tooltip is disabled or has no content, the trigger is not connected to its document, or a listener prevented `show`.
+	 * @returns Resolves true after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; false when the tooltip is destroyed, or when a shown tip's rebuild is refused because the tooltip is disabled or has no content, the trigger is not connected to its document or its inline `display` is `none`, a listener prevented `show`, or a change is in flight.
```
The `Popover*` mirror stays report-only and is carried to J-POPOVER as round 2 returned it, with the `PopoverSelectorMap.arrow` override and the default `.popover-arrow`.

## Deviation state
Every item from A to N is done. I made no `prove` call. These points depart from the brief or its record:
- **D1: item E's premise is inverted by the platform.** `new NativeSanitizer({ config: {} })` keeps *more* than the omitted configuration, not less. The probe (`tmp/j-tooltip/probe-empty.log.txt`) gave `{}` → `<p class="c" title="t" data-x="1" style="color: red">…<mark>m</mark>…<span href="h">…` against the allowlist's `<p class="c"><b>b</b><a …>a</a><span>s</span><img …></p>`. The case asserts that difference, and its row reddens.
- **D2: I overwrote the round-2 instrument in place.** Its log is kept as `mutations-round2.log.txt`, and the script survives only as your retained `j-tooltip-mutations-2.py`. The first round-3 run, where the door row was MISSED, is kept as `mutations-round3-first.log.txt`.
- **D3: two summary sentences changed after the instrument's final run.** The `PlacementInput` summary in `types.ts` and in its guide row now says "the arrow it points at the reference" instead of "the arrow it centers". The change is doc-only. The acceptance chain was rerun whole afterwards; the table in section I is from that rerun.
- **D4: the guide spells it "center".** The guide spells the word that way throughout, so "centre" in the brief is written "center" in the source, the tests, and the guide.
- **D5: naming choices made for item N.** The `container` option's field became `#receiver`, so that `#container` could name the container the tip went into. `#describe` became `#link`.
- **Carried by the verdict, not built here:** the `#### Placement` section and the R12 seam belong to J-POPOVER.
