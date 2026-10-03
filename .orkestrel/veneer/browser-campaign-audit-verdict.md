# Browser campaign audit verdict — falsify round `browser-campaign`

Subject: the browser engine of `@orkestrel/veneer` at veneer `main` `ea9c731` (2026-10-02), after the fix campaign `browser-convention-audit-verdict.md` opened. Claims: the 20 in veneer `tmp/units/browser-campaign-claims.md`.

Ruling: `FAIL`. One fix round of two parallel units carries § Carried; the browser chunk's verdicts close after it lands green.

## Lanes

| Lane | Role | Engine | Mode | Verdict |
| --- | --- | --- | --- | --- |
| subjective | `reviewer` | Claude Opus 5.5 | native Agent tool, read-only | `FAIL 6, 15, 16, 17, 18, 19, 20; outside: O1 to O5` |
| objective | `analyst` | GPT-6 Astra | `codex exec`, effort high; probes preserved in `tmp/codex/browser-campaign-audit-evidence.md` and `-boot-evidence.md`, deleted from the tree; 116 citations, 0 unresolved | `FAIL 2, 3, 4, 10, 12, 16, 18, 20; outside: O1` |

The verdicts are kept at veneer `tmp/units/browser-campaign-reviewer-verdict.md` and `tmp/codex/browser-campaign-audit-verdict.md`.

## Reproduction

Two Opus agents reproduced every finding in scratch worktrees at `ea9c731` (`veneer-wt-repro-campaign`, `-campaign2`, both clean at return); records veneer `tmp/units/repro-campaign-reviewer.md` and `tmp/units/repro-campaign-analyst.md`. Every finding confirmed. Bounds:

- Claim 2 (an invalid route selector `[` silences later families): confirmed; only routes after the bad one, for that event type; Bootstrap isolates each delegated handler in its own listener (`event-handler.js:102-121`).
- Claims 3 and 4 (the scope's `settle` bypasses the destroyed-scope guard and ownership): confirmed wider: the clear handler's registry has the same `settle`, and a component settled through a live scope also survives its destroy; reachable only from a raw plugin's route, boot, create, or clear.
- Claim 10 (a hide that completes while a hovered re-show is pending, then a disable, keeps the id): confirmed bounded: Bootstrap keeps the id too (`tooltip.js:269` returns before `:277`), so the fix departs from Bootstrap.
- Claim 12: two live `Swipe` instances on one host (only by direct construction or a second carousel under another plugin name), and `Hold` keying `ROLE` and `role` separately on an HTML element (only from a consumer's mixed-case names).
- Claim 15: two Proof cells name a non-consuming case; a null node reading renders `<absent>` like a missing reading (bounded: a full transcript usually differs elsewhere); a widened repeat drop in the normalization passes the suite.
- Claim 16: four mutations pass all 731 `src:browser` tests: the horizontal collapse's width hold, `restricted` on the collapse or modal toggle route, the destroyed check in the clear walk, and the report of a failed boot's teardown error.
- Claim 18: the error-code list misses two codes; four paragraphs name no proof; the tip containment sentence claims an offcanvas trap no case drives; the guide and `write` docs call an omitted first-render slot empty where a custom template keeps its own content (rendering equals Bootstrap).
- Claim 20, the placement cost: on a page of 10 018 elements, a tooltip show takes 16.1 ms and a dropdown show 19.2 ms against 1.3 and 1.5 ms on an empty page; the whole-document `getComputedStyle` scan in `Placement` is about 13 and 16 ms of them.
- Outside: the test titles and one guide sentence name audit items by position (`G`, `P`, `S`, `C` prefixes); the `Hold` heading swallows unrelated paragraphs; `PLACEMENT_PROPERTIES.reference` is an empty key; `readTipTranscript` selects among three algorithms by a string; "hold" names two concepts; `Trap.activate` resumes after an autofocus listener destroys it (reached through `Modal` and `Offcanvas` too).

## Rulings per claim

1, 5, 7, 8, 9, 11, 13, 14: `CONFIRMED` by both lanes. 6: `CONFIRMED` on leaf capture; the `this` half is ruled: route and plugin callbacks run with no receiver, the docs say so, and a case pins it. 19: `CONFIRMED` (the analyst read every selector expression; every operand is a string leaf). 2, 3, 4, 10, 12, 15, 16, 17, 18, 20: `BROKEN`, carried.

## Carried

The fix round runs two units in parallel worktrees from `ea9c731`.

- **`browser-repair` (source behavior).**
  - R1, claim 2: a route's selector match and owner check run inside the same per-route `attempt` as its handler; a failure is reported once and the walk continues.
  - R2, claims 3 and 4: the scope's `settle` builds through the scope's guarded component context, so it refuses after destroy and the scope owns what it settles; plain `Registry.settle` is unchanged. Regressions for a retained route registry, a clear's registry, and a failed boot (immediate and deferred) that settled a component.
  - R3, claim 10: a completed hide removes its panel's id before the active-trigger return, under a new departure row against `tooltip.js:269` and `:277`.
  - R4, claim 12: `Swipe` acquires `pointer-event` through a `Hold`; `Hold` canonicalizes an attribute name the way the element's `getAttribute` reads it (lowercase for an HTML element in an HTML document).
  - R5, claim 17: `HoldSlots` becomes a singular name.
  - R6, claim 20: `Placement` reads no computed style of the document's elements; it skips names that inline `anchor-name` declarations hold, the only place another copy of the entry writes them. Measure the 10 018-element show before and after.
  - R7, outside O1 (analyst): `Trap.activate` returns when its autofocus destroyed it, before it replaces the owner or binds a listener; regressions for `Trap` and `Modal`.
  - R8, claim 16: cases for the horizontal collapse destroyed mid-show (with its width departure row), a disabled collapse and a disabled modal toggle served as Bootstrap serves them, a clear that destroys its own scope, and a failed boot whose teardown throws.
  - R9, claim 6: the route and plugin callback docs state they run with no receiver; a case pins it.
  - R10, claim 18 (analyst): the guide and the `write` docs say an omitted first-render slot keeps the template's own content; a custom-template oracle case.
  - R11, claim 18c: a tip inside an offcanvas trap, beside the modal row.
  - R12, outside O3: the empty `PLACEMENT_PROPERTIES.reference` key and the loops over it go.
- **`browser-ledger` (proof harness, titles, and prose).**
  - L1, claim 15a: a consumed departure row records the consuming case's title; each family proof asserts that every row's Proof cell names a consuming case; the two wrong cells are corrected.
  - L2, claim 15b: a null node reading renders `<none>`; the affected rows are regenerated; a control shows a `<none>` row does not match a missing reading.
  - L3, claim 15c: the normalization sample carries a non-adjacent same-path repeat that survives.
  - L4, outside O4: `readTipTranscript` keeps the raw reading; normalization and placement dropping become separate exported functions callers compose.
  - L5, outside O1 (reviewer): every test title and guide citation drops its `G`, `P`, `S`, or `C` prefix and names the behavior; the Proof cells follow.
  - L6, claim 18a and 18b and outside O2: the error-code list names all seven codes; the four paragraphs gain a See sentence naming each proof; the `Hold` section moves before `### Compose browser plugins`.
  - L7, outside O5: "hold" names only `Hold`; `Trap`, `Carousel`, and `Toast` docs say what they mean.

Bound for both: no change to ruled behavior beyond § Carried; Bootstrap parity everywhere the oracle defines behavior; the departure table regenerated only from measured comparisons.

## Dropped on the record

- Claim 19's type probe: the analyst read every selector operand; no class-name object remains.
- The reviewer's ancestor `fieldset[disabled]` dropdown note, referred under claim 1: neither lane substantiated a difference.

## Closed

Closed 2026-10-03 at veneer `959ed49`. `browser-ledger` landed L1 to L7 as `b44e11a`; `browser-repair` landed R1 to R12 as `7b61d60`, merged in `52f25e4`.

- **Review pass.** A Claude Opus 5.5 reviewer, objective lane, confirmed R1 to R5 and R7 to R12 and ruled R6 broken: an inline `anchor-name` written through `var()` left its substituted name free. `de317b1` reads the computed value for a matched inline declaration that uses a substitution function; `reserves an inline anchor name supplied through a custom property` failed before it (1 failed, 4 passed, 195 skipped under `-t 'reserves'`) and passes after.
- **Claim 20, the placement cost.** Settled as matched layout. On 10 018 elements the final source's tooltip show reads 20.2 ms against 17.3 ms for Bootstrap through Popper's first microtask; the computed-width read after the positioning writes takes 16.3 ms of it, and Popper's layout pays the same. A dropdown show fell from 10.6 to 2.0 ms and a direct `Placement` from 9.7 to 1.5 ms. Medians of 5 runs, the writer's diagnostic on this host.
- **Test isolation.** The hovered tip case moved the real cursor through CDP and left it over the page, so the carousel cases that `src:browser` runs after it paused on hover (`npm run test:src:browser` failed 5 of 770). `959ed49` moves the cursor to (-1, -1) in the case's `finally` block; the same command passes 770 of 770.
- **Recorded, not carried.** `Hold` treats a document as HTML when its `contentType` is `text/html`, so a plain-text or media document keeps attribute-name case; the `HoldSlotInterface.acquire` TSDoc and the guide state that contract.

Gates on Windows 11 at `959ed49`: format, lint, check, and build exit 0; `npm test` exits 0 in 525 s (`src:core` and `src:browser` 784, `setup:browser` 98, `journey` 60 of 60); distribution passes 16 with 7 skipped.
