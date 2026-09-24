# J-CAROUSEL round 1 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, native subagent, 192 tool uses, 4229 s; retained from the subagent's return text with the mutation table replaced by a pointer to the retained log `j-carousel-mutations.log.txt`, which carries it row for row; the tree is the worktree `veneer/tmp/worktrees/carousel` on `unit/carousel` from `e24e2c3`, uncommitted)

The unit is complete, and every acceptance command exits 0 on Chromium 153.0.8010.12. The mutation log has one row for each of the 89 mutations, each run over the whole test file, and every named case reddens. The instrument's receipt reads `restored byte for byte`. Four decisions need your ruling: points 1, 2, 3, and 5 under "Deviation state".

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/`.

- `src/browser/Carousel.ts` (new): the `Carousel` engine. It has a door read after every write, a queued `slide`, a native timeout chain, the keys, the hover pause, the touch delay, and `HostSnapshot` restoration.
- `src/browser/Swipe.ts` (new): the `Swipe` mechanism. It reads touch and pen pointers, pairs each release with the pointer that went down, discards a cancelled pointer, and swipes past the threshold of 40.
- `src/browser/Delegate.ts`: adds the carousel route, the scan at construction for load rides (it destroys itself and rethrows when a scanned carousel refuses construction), and the carousel same-host refusal under E12.
- `src/browser/constants.ts`: adds `CAROUSEL_EVENTS/CLASSES/ATTRIBUTES/SELECTORS/DEFAULTS`, `CAROUSEL_TOUCH_DELAY`, `SWIPE_CLASSES`, and `SWIPE_DEFAULTS`.
- `src/browser/validators.ts`: adds `isCarouselEvent`.
- `src/browser/parsers.ts`: adds `parseRide`.
- `src/browser/helpers.ts`: adds `matchesReducedMotion` and nothing else.
- `src/browser/index.ts`: exports `Swipe` and `Carousel` from the barrel.
- Tests: `Carousel.test.ts` (new, 43 cases) and `Swipe.test.ts` (new, 6 cases). Carousel cases added to `Delegate.test.ts`, `validators.test.ts`, `parsers.test.ts`, and `helpers.test.ts`. The export list in `index.test.ts` grows.
- `guides/veneer.md`: 13 Surface rows, the Carousel fence under Examples, and the `#### Carousel` subsection with its tables, events, takeover reading, delegate route, and departures. The plugin row reads `shipped` with Proof `tests/src/browser/Carousel.test.ts`, and its Obligation wording is unchanged.

## Obligations

**Red reading, taken before any implementation.** The command was `npm run test:src:browser -- Carousel Swipe Delegate validators parsers helpers index` (the seven test files): `Test Files  7 failed (7)` / `Tests  1 failed | 2 passed (3)`. Each file failed at import, for example `SyntaxError: The requested module '/src/browser/index.ts' does not provide an export named 'CAROUSEL_ATTRIBUTES'`. `index.test.ts` failed with `expected [ 'BUTTON_CLASSES', …(31) ] to strictly equal [ 'BUTTON_CLASSES', …(44) ]`. This red is at file level, not per case; the mutation table is what binds each case.

**Green reading, from the final `npm run test:src:browser`:** `Test Files 12 passed (12)`, `Tests 270 passed (270)`. Per file: Carousel 43, Swipe 6, Delegate 45, validators 12, parsers 5, helpers 32, index 3.

- **CAROUSEL1** (engine, queue, timer, reduced motion, destroy): pinned by, among others, "slides to the following item through its order and direction tokens under the shipped cascade…", "…queues each slide call until slid…", "arms no timer under staged reduced motion while a call still moves the items", "abandons a slide in flight on destruction…", and the door cases starting "stops a slide whose…".
- **CAROUSEL2** (keys and hover): "slides with the arrow keys as trusted input…" and "pauses on pointer hover and resumes when the pointer leaves…".
- **CAROUSEL3** (swipe and touch): the six `Swipe` cases, plus "slides next on a leftward touch swipe…", "refuses the native drag…", "arms no swipe… when touch is off", and "defers its restart by the touch delay…".
- **CAROUSEL4** (delegate route): 11 cases in `Delegate.test.ts`, starting "slides the carousel a control names…" and ending "refuses a carousel group value…".
- **CAROUSEL5** (guard, tables, parser, barrel): the `isCarouselEvent`, `parseRide`, and `matchesReducedMotion` rows, the frozen-tables case, and the export list.

## Unknowns
1. **Touch delay: kept.** It is a native timeout of `CAROUSEL_TOUCH_DELAY` (500) plus the active item's interval, not a transition fallback. It runs on a touch or pen release when `touch` and `pause` are both true, and it restarts only a timer that `start` started.

## Deviation state

1. **When the swipe token is written.** The brief says the token is added "while a pointer is down". `SwipeClassMap`, `SwipeInterface.destroy`, the terrain record (`swipe.js:128`), and the cascade (`touch-action: pan-y` must apply before the gesture) all put it at construction. Following the brief's rule that the record wins, I write the token at construction and remove it on destroy.
2. **Who starts an interaction ride.** `CarouselInterface` exposes no `ride`, so the delegate cannot read the ride of a carousel a consumer constructed. The carousel therefore starts itself under `interaction` after each slide a call, a key, or a swipe asks for. The delegate's click is such a call, so the observable result is the brief's. The departure from Bootstrap is listed in the guide.
3. **Swipe token cannot be replaced (type gap outside my row).** `CarouselClassMap` has no `pointer` key, so a carousel whose `classes` group is replaced still writes `pointer-event`. The vocabulary case asserts this bound and the guide states it. The proposed types patch is in point 3 under "Shared-file patches". With it, `CAROUSEL_CLASSES.pointer = 'pointer-event'` and `new Swipe(host, { handler, classes: { pointer: this.#classes.pointer } })` would close the gap.
4. **Delegate field typed inline.** The delegate's carousel field is typed inline as `{ classes; attributes; selectors }`, because no `CarouselVocabulary` exists and adding one is outside my row.
5. **Exports beyond the named rows.** `SWIPE_CLASSES`, `SWIPE_DEFAULTS`, and `CAROUSEL_TOUCH_DELAY` exist so that `resolveVocabulary` has a default table and no magic numbers are left. None collides with a fleet guide.
6. **Destroy clears timers no case can observe.** Every timer path reads the aborted signal first, so the clears in `destroy` only release callbacks. No mutation row covers them.
7. **Pointer finding that bears on sibling units.** A stationary test pointer over a freshly mounted host receives `mouseenter` from Chromium. With `pause` on, that pauses cycling. The timing cases set `pause: false` unless the hover is their subject, and the touch case first moves the pointer away through `hoverAccessible`.
8. **Standing conditions.** Every check I invoke uses `isInstance`, and `instanceOf(HTMLElement)` appears only as a `filter` predicate. `isInstance(value, CustomEvent)` typechecks and narrows to `CustomEvent<unknown>`. I made no `prove` call, because that server is not reachable from a subagent.

## Acceptance output
Each command's log is `tmp/j-carousel/acceptance-<step>.log.txt`, and `tmp/j-carousel/acceptance.log.txt` (retained as `j-carousel-writer-acceptance.log.txt`) records the exit codes:
```
check exit 0 | lint exit 0 | format exit 0 | browser exit 0 | guides exit 0 | policy exit 0
build-core exit 0 | build-styles exit 0 | build-browser exit 0 | conformance exit 0 | setup exit 0
```
- **format:** `All matched files use the correct format.`
- **browser:** `Test Files 12 passed (12)`, `Tests 270 passed (270)`. The one `SyntaxError … 'toggle'` diagnostic comes from `HostSnapshot.test.ts:308`, which throws by design.
- **guides:** `Tests 19 passed (19)`.
- **policy:** `Tests 109 passed | 1 skipped (110)`.
- **conformance:** `Tests 22 passed (22)`.
- **setup:** `Tests 267 passed (267)`.
- **Carousel plugin row:** `… Owner: J-ENGINE. | tests/src/browser/Carousel.test.ts | shipped |`
- **Extra check:** the root `npx tsc --noEmit -p tsconfig.json` exits 0.

## Mutation table
Retained verbatim as `j-carousel-mutations.log.txt` (89 rows, each `EXACT` or `JOINED`, the seven `GREEN?` rows at 0 failed, `receipt: restored byte for byte`). Row 44 has 37 joined cases because the mutated signal read destroys every carousel constructed without a signal. The rows with the most joined cases after that are 3, 7, 42, 52, and 67. The first full run missed four rows because of test defects; I corrected those tests and reran the whole instrument, and the retained log is that final run. The first log is kept as `tmp/j-carousel/mutations-1-full.log.txt` (retained as `j-carousel-mutations-first-run.log.txt`).

## Status and diffstat
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Carousel.ts
?? src/browser/Swipe.ts
?? tests/src/browser/Carousel.test.ts
?? tests/src/browser/Swipe.test.ts
 12 files changed, 1024 insertions(+), 23 deletions(-)   (untracked: Carousel.ts 561, Swipe.ts 107, Carousel.test.ts 1603, Swipe.test.ts 170 lines)
```

## Shared-file patches (report-only; none applied)

**1. `src/browser/types.ts`** (retained as `j-carousel-patches/j-carousel-types.diff`). Each sentence this patch replaces is incomplete or false against the implementation: the `DelegateOptions.carousel` summary (routes by the `step` and `index` attributes), `CarouselOptions.ride` (for `interaction`, after each slide a call, a key, or a swipe asks for), the `next`, `previous`, and `slide` `@returns` sentences (adding "no item is active" and the tokens' takeover reading), `start` (the active item's interval or the configured interval; a `@remarks` that nothing is armed under reduced motion), and `destroy` (abandons a slide in flight and restores the items, the indicators, and the host).

**2. The guide row paired with patch 1** (retained as `j-carousel-patches/j-carousel-guide-methods.diff`): the `start` and `destroy` rows of the `CarouselInterface` Methods table, re-padded by the formatter.

**3. `pointer` key for `CarouselClassMap`** (deviation point 3; outside my row): `readonly pointer: string` with the summary "Marks a carousel whose swipes are read from pointer events, the token its swipe writes. Default: `pointer-event`."

**`ROADMAP.md`:** no change needed.

## Key paths
- Instrument: `tmp/j-carousel/mutations.py` (retained as `j-carousel-mutations.py`; the dry check is `mutations-dry.py`)
- Acceptance chain: `tmp/j-carousel/acceptance.sh` (retained as `j-carousel-acceptance.sh`)
- Chromium version probe: `tmp/j-carousel/version.ts`, which printed `chromium 153.0.8010.12`

---

The Orchestrator's retention note: the review evidence is `j-carousel.diff` and `j-carousel-status.txt`, captured by `w2-gates.sh carousel`, whose log is `j-carousel-gates.log.txt` (every gate exit 0, 270 browser proofs).
