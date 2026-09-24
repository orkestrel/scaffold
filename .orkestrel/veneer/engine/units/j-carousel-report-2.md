# J-CAROUSEL round 2 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the carousel worktree, briefed by `j-carousel-brief-2.md`; 70 tool uses, 2596 s; retained verbatim from the subagent's return; the tree is `veneer/tmp/worktrees/carousel` on `unit/carousel` from `e24e2c3`, uncommitted, `main` not merged)

I closed all eight items (A to H) in the worktree, and every acceptance command exits 0. The round-2 instrument ran all 105 rows: each of the 89 round-1 rows is kept, 16 rows are new, and every row reddens its named case. The receipt reads `restored byte for byte`.

Four things need your attention before landing:

- **Sticky hover after a tap.** Item C's letter would break the touch delay. A probe on Chromium 153 with touch emulation showed that after a tap, `:hover` stays true and a compatibility `mouseenter` fires. So if the touch timer calls `#arm` and `#arm` reads `:hover`, the carousel stays paused, which is the failure the delay exists to prevent. I added a `#touched` flag. A touch or pen release sets it, and the pointer leaving the host clears it. While it is set, `:hover` does not hold the timer. A trusted-tap case over CDP pins this, with its own instrument row.
- **I deleted `types.ts` by accident, then restored it.** `git apply` of my round-1 `types.patch.txt` read it as a rename, deleted `src/browser/types.ts`, and wrote the patch output under `tmp/`. I restored the file with `git show HEAD:src/browser/types.ts`; its SHA-256 matched HEAD (`bc6fd488…`) before I applied the patched content. Nothing else was touched.
- **The instrument edits one file outside the owned set.** The item H shipped-declarations row removes `touch-action: pan-y;` from `src/styles/components/_carousel.scss` for the length of that row, then restores it. The file is in the digest set, the receipt covers it, and its SHA-256 now equals HEAD's.
- **Merge note for the Delegate.** `#closest` is byte-identical to the one in `j-tab-2.diff`. My `#construct` is generic and takes the engine (`#construct(new Carousel(…))`), where Tab's version takes a control. The landing round can fold them into one. Only my carousel route and `#conflictsCarousel` use `#closest`.

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/`.

- **`src/browser/Carousel.ts`**
  - **Item A:** after construction, the constructor reads its own lifetime and destroys a swipe built while the carousel was destroyed.
  - **Item B:** a slide tally is read across the `slide` dispatch. The post-dispatch check also refuses an incoming item that already carries `active`. Every door reads membership through `#holds(pair, present, absent, marks)`. Indicator doors read `aria-current` through `marks`. From the order-token write on, doors require the outgoing item to lack the order token.
  - **Item C:** `#arm`/`#disarm` replace `#suspend`/`#resume` and `#arm` reads the standing conditions; a `#pauses` tally keeps a pause made during a slide.
  - **Item D:** the carousel's snapshot restores before the swipe's.
  - **Item F:** the carousel passes its `pointer` token to the swipe.
- **`src/browser/Delegate.ts`:** `#carousel: CarouselVocabulary`, plus `#closest`, a lifetime read before the route marks anything, and a generic `#construct`.
- **`src/browser/types.ts`:** adds the `CarouselClassMap.pointer` key and `CarouselVocabulary`, and applies the round-1 patch without "mirroring Bootstrap's `ride` option". It also updates the `CarouselRide` summary and the `DelegateOptions` `@remarks` (the carousel routes by its resolved `step` and `index` attributes).
- **`src/browser/constants.ts`:** `CAROUSEL_CLASSES.pointer = 'pointer-event'`.
- **Tests:** 12 new cases in `Carousel.test.ts` (plus the reduced-motion case extended), 2 new cases in `Delegate.test.ts`, a `CarouselVocabulary` type assertion in `index.test.ts`, and `pointer` threaded into the frozen-table and vocabulary cases.
- **`guides/veneer.md`:**
  - § Surface: a `CarouselVocabulary` row and the updated `CarouselRide` row.
  - § Methods: the `start` and `destroy` rows.
  - § Delegation: the attribute-routing sentence and one sentence on the construction scan and its rethrow.
  - `#### Carousel`:
    - rewritten paragraphs: timer, input, swipe, takeover and restoration (with the J-SNAPSHOT-SHARED bound), and the delegate's lifetime;
    - tables: a `pointer` class row and a corrected `entry` selector row;
    - departures: the `load`-ride click after `pause` (F1), `start` under hover, and the wait target (incoming versus Bootstrap's outgoing), plus the corrected destruction order.
- **`tmp/j-carousel/`:** `mutations-2.py`, `mutations-2.log.txt`, `mutations-first-run.py`, `acceptance-2.sh`, and the red and green logs.

## Per item, red then green

**Red** (after the tests, before any fix), from `npm run test:src:browser -- tests/src/browser/Carousel.test.ts tests/src/browser/Delegate.test.ts`: `Tests 13 failed | 89 passed (102)`. The log is `tmp/j-carousel/red-2.log.txt`.

| Item | Case | Red reading |
|---|---|---|
| A | destroys the swipe it constructed when a reaction to the swipe token destroys the carousel… | `expected [ 'carousel', 'pointer-event' ] to deeply equal [ 'carousel' ]` |
| B(i) | refuses the slide whose event a listener answered with newer slides… | `expected true to be false` |
| B(ii) | stops a slide whose indicator attribute write a reaction answers by rewriting that attribute… | `expected true to be false` |
| B(iii) | …giving the outgoing item the order token… | `expected true to be false` |
| B(iii) | …taking the incoming item out of the host… | `expected true to be false` |
| C | keeps a pause a slid listener made under an interaction ride | `expected 2 to be 1` |
| C | arms no timer after an animated slide during which the pointer entered the host | `expected 2 to be 1` |
| C | leaves the restart to the touch deferral when a touch lifts during an animated slide | `expected 215.9… to be greater than or equal to 520` |
| C | arms no timer for an interaction ride a key starts while the pointer is inside the host… | `expected 7 to be 1` |
| D | restores the items before the swipe token… | `expected [ 'carousel-item', 'active' ] to deeply equal [ 'carousel-item' ]` |
| E | leaves a carousel unmarked when a listener to an earlier route destroys the delegate… | `expected Carousel{} to be undefined` |
| E | destroys a carousel it constructed while a reaction to the construction destroyed the delegate… | `expected Carousel{} to be undefined` |
| F | writes, tests, reads, and matches only the replacing values… | `expected false to be true` |

The cases for the trusted tap and for the key and swipe arms of the interaction ride were green before the fixes. They guard behaviour rather than a defect, and their instrument rows prove they bind.

**Green**, from `npm run test:src:browser`: `Test Files 12 passed (12)`, `Tests 284 passed (284)`.

## Unknowns: the first-run rows
The retained first-run log is `tmp/j-carousel/mutations-1-full.log.txt`. I reconstructed its instrument as `tmp/j-carousel/mutations-first-run.py` by reversing the two instrument edits in `fix-round-2.py`.

- **Rows 28 and 69:** the mutation text was identical in both runs; only the tests changed.
- **Row 25:** the mutation text was identical, but the named case differed. The test was renamed and changed from a `slide` listener to a `slid` listener.
- **Row 54:** the mutation text changed. The first run emptied one indicator door; the accepted run empties all four.

## Instrument: `tmp/j-carousel/mutations-2.py`
The log is `tmp/j-carousel/mutations-2.log.txt`. Each row runs over the whole test file.

- **Round-1 rows rewritten:** 20 round-1 rows had their patterns rewritten where the source text changed, with the intent kept.
  - `the timer restarts whether or not it was running` now names the extended reduced-motion case, because arming now reads the hover and the hover case no longer distinguishes it.
  - `a pause during the slide is ignored` now drops the `!this.#started` read.
- **Round-1 rows: EXACT.** backward order token; wrapping; slide event return value; slide refusing in flight; next queuing; nested items; shared detail object; completed event cancelable; event guard; item interval; pause leaves the timer armed; reduced motion; visibility; load ride; timer restarts whether or not running; pause during slide; taken-over slide; hover does not pause; mouse release defers; earlier touch deferral kept; arrow keys swapped; text-control guard; key default kept; keyboard option; swipe direction; image selector scope; class validation; unfrozen default table; indicator doors read no item; order door; read after the transition; completion door; all 9 Swipe rows except the two pointer-token rows; carousel route prevents nothing; control naming no move; host token; outside root; failing scan; collapse conflict; carousel mark; delegate class validation; both validator rows; both parser rows; both helper rows; barrel.
- **Round-1 rows: JOINED.** direction token (8 failed of 55); indicator not moved (4); indicator position (7); settle skipped (8); settle always runs (2); zero-timer settle (2); interaction ride never starts (3); every interactive slide starts (5); pointer leaving resumes nothing (3); touch release defers nothing (3); drag refusal (2); touch off still swipes (2); destruction omits the abort (4); destruction leaves the swipe (4); items not saved (6); indicator attribute not saved (3); signal ignored (49); host not claimed (4); each vocabulary group ignored (2 each); ride not coerced (3); write not followed by a read (8); dispatch not followed by a read (3); both Swipe pointer-token rows (2 of 6); no carousel route (7 of 47); position ignored (2); every step read as next (2); scan dropped (2); scan acquires every ride (2); same-host conflict (2); default attributes (2); classes group (2); discard ignores carousels (2).
- **Round-2 rows: EXACT.** a swipe constructed while the carousel was destroyed is kept; the dispatch reads no slide count; the indicator doors read no indicator; the outgoing order token is not read; the doors read no membership; arming reads no pending touch deferral; a pause during the slide does not hold over the ride; the hover a tap leaves holds the timer; the swipe arm starts no ride; the swipe restores before the items; the carousel route reads no lifetime; a carousel built while the delegate was destroyed is acquired; the swipe writes its default pointer token; the shipped cascade leaves horizontal panning to the browser.
- **Round-2 rows: JOINED.** arming reads no hover (2 of 55: its named case plus the key-under-hover case); the key arm starts no ride (2 of 55).
- **Controls:** `GREEN? exit=0` for all seven files (55 / 6 / 47 / 12 / 5 / 32 / 3 cases, 0 failed).
- **Receipt:** `receipt: restored byte for byte`.

## Acceptance (`tmp/j-carousel/acceptance-2.sh`, in the brief's order)
```
check exit 0 | lint exit 0 | format exit 0 | browser exit 0 | guides exit 0 | policy exit 0
build-core exit 0 | build-styles exit 0 | build-browser exit 0 | conformance exit 0 | setup exit 0
```
- **format:** `All matched files use the correct format.`
- **browser:** `Test Files 12 passed (12)`, `Tests 284 passed (284)`. The one `SyntaxError … 'toggle'` diagnostic comes from `HostSnapshot.test.ts:308`, which throws by design.
- **guides:** `Tests 19 passed (19)`.
- **policy:** `Tests 109 passed | 1 skipped (110)`.
- **builds:** `✓ built in 70ms`, `748ms`, and `138ms`.
- **conformance:** `Tests 22 passed (22)`.
- **setup:** `Tests 267 passed (267)`.
- **Extra check:** the root `npx tsc --noEmit -p tsconfig.json` exits 0.

## Status and diffstat
```
 M guides/veneer.md
 A src/browser/Carousel.ts
 M src/browser/Delegate.ts
 A src/browser/Swipe.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 A tests/src/browser/Carousel.test.ts
 M tests/src/browser/Delegate.test.ts
 A tests/src/browser/Swipe.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
 17 files changed, 4148 insertions(+), 46 deletions(-)
```

## Deviation state (besides the four points at the top)
1. **Item D fixture.** The replacement carousel is constructed in reaction to the host's `pointer` token being restored, which is the objective lane's interleaving. A reaction to an item's `active` restoration passes before the fix too, because `HostSnapshot`'s handoff already covers it, so it could not be red first.
2. **`start` and the interaction ride under hover.** Both now arm nothing while `pause` is true and the host matches `:hover`. This closes R2, and the guide lists it as a departure.
3. **Delegate class TSDoc left unchanged.** I made no edit after the mutation run, so its digests match the tree; the lifetime sentence is in the guide instead.
4. **Checks I invoke use `isInstance`.** `instanceOf` appears only as a `filter` predicate.
5. **No `prove` call was made**, because that MCP server is not reachable from a subagent.
