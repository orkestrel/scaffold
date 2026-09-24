# J-CAROUSEL round 3 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the carousel worktree, briefed by `j-carousel-brief-3.md`; 21 tool uses, 1580 s; retained verbatim from the subagent's return; the tree is `veneer/tmp/worktrees/carousel` on `unit/carousel` from `e24e2c3`, uncommitted, `main` not merged)

I closed all five round-3 items (A to E) in the carousel worktree, and every gate exits 0. The round-3 instrument ran all 108 rows (105 kept from round 2, plus 3 new): 69 read EXACT and 39 JOINED, none missed, and it ends `receipt: restored byte for byte`. Round 3 changed only `Carousel.ts`, `Carousel.test.ts`, `guides/veneer.md`, and files under `tmp/j-carousel/`.

## A. The pause tally
- **Red run:** `npm run test:src:browser -- tests/src/browser/Carousel.test.ts` → `Tests 2 failed | 55 passed (57)`. The item A case failing was "keeps a pause a slide listener made under an interaction ride" (`expected 2 to be 1`). The case uses an interaction ride, `pause: false`, a 10 ms interval, and a `slide` listener that calls `pause()`. The log is `tmp/j-carousel/red-3.log.txt`.
- **As landed:** `#move` now reads `#pauses` beside the slide tally, before the `slide.vn.carousel` dispatch. The completion comparison is unchanged: `interactive && ride === 'interaction' && this.#pauses === pauses`. The existing `slid`-listener case and its row are kept.

## B. The tap exemption
- **Red run** (same run as A): "holds the timer under the hover once the mouse moves inside the host after a trusted tap, and arms it when the pointer leaves" failed with `expected 9 to be 1`.
  - The case taps over CDP and waits for the touch delay's slide.
  - It then turns touch emulation off and sends a trusted `mouseMoved` inside the host, with no boundary crossing.
  - A `pointermove` of type `mouse` is recorded and `:hover` stays true.
  - Before the fix, the carousel went on cycling under the pointer.
- **As landed:** `pointermove` and `pointerdown` listeners call a new `#notice(event)`. They are registered only when `touch` and `pause` are both true, the only case where the flag can be set. `pointerup` is not used: a mouse press always fires `pointerdown` first.
  - `#notice` acts only when the event's `pointerType` is `mouse` and `#touched` is set.
  - It clears `#touched`; if the host matches `:hover`, it also clears the timer, as `mouseenter` does.
  - A tap's compatibility `mouseenter` and `mouseover` fire no pointer event, so they end nothing. The existing trusted-tap case still passes and guards this: it cycles after the touch delay while `:hover` is true.
- **No `Swipe` change was needed.**

## C. The sentences

Timer paragraph, pause sentence:
- **Before:** "…it arms the timer again where it was running when the slide began, so a `pause` call made during the slide, a `slid` listener's included, and a pointer that entered the host during it keep the timer clear. … An `interaction` ride starts it after each slide … which is how a slide control's click starts it, unless a `pause` call came during that slide."
- **After:** "…it arms the timer again where it was running when the slide began, so a pointer that entered the host during the slide keeps the timer clear. … which is how a slide control's click starts it. A `pause` call made during a slide, a `slide.vn.carousel` or `slid.vn.carousel` listener's included, holds through both: the slide arms no timer after it, and the `interaction` ride does not start."

Hover sentence:
- **Before:** "The hover a tap leaves behind holds nothing: after a touch or pen release, `:hover` holds the timer again only after the pointer has left the host."
- **After:** "The hover a tap leaves behind holds nothing until the pointer leaves the host or a mouse moves or presses inside it; at that mouse movement or press, with the pointer over the host, the timer clears as it does when the pointer enters."

Delegate paragraph:
- **Before:** "A listener that destroys the delegate during a click leaves the carousel unmarked and undriven, for a live delegate whose root contains it to drive, and a carousel the delegate constructs … is destroyed and driven nowhere."
- **After:** "A listener in an earlier route that destroys the delegate during a click, before the carousel is marked, leaves the carousel unmarked and undriven, for a live delegate whose root contains it to drive. A destruction from the carousel's own `slide.vn.carousel` listener comes after the mark, so the mark stays and an outer delegate refuses that carousel for the click. A carousel the delegate constructs while a reaction to that construction destroys the delegate is destroyed and driven nowhere."

Code comments: the `Carousel` class remarks and the `#pauses` and `#touched` field comments now state both rules.

## D. The fixture
The refusal loop in `Carousel.test.ts` used `] as const)`. It now uses `const refusals: ReadonlyArray<readonly [string, string]> = [...]` followed by `for (const [attribute, value] of refusals)`. A grep finds no `as const` left under `tests/src/browser`.

## E. The instrument
- **Files:** `tmp/j-carousel/mutations-3.py` (built by `make-mutations-3.py`) writes `tmp/j-carousel/mutations-3.log.txt`. `mutations-3-dry.py` checks every row's source match.
- **Re-anchored rows: none.** All 105 round-2 patterns still match the round-3 text; the dry check reports 0 problems.
- **New rows, each EXACT (1 failed of 57, the named case):**
  - "the pause tally is read after the dispatch", naming the `slide`-listener case.
  - "mouse activity does not end the tap exemption", naming the mouse-move case.
  - "ending the tap exemption leaves the timer armed", naming the same mouse-move case. I added this row beyond the brief; it drops the `:hover` disarm.
- **GREEN? rows:** Carousel 0 failed of 57, Swipe 0/6, Delegate 0/47, validators 0/12, parsers 0/5, helpers 0/32, index 0/3.
- **Receipt:** `receipt: restored byte for byte`. `_carousel.scss` hashes to `19299617…`, the same value that matched HEAD in round 2; the pan-y row edits and restores it again.

## Gates (`tmp/j-carousel/acceptance-3.sh`, logs in `tmp/j-carousel/acceptance-3/`)

| Gate | Exit | Summary |
|---|---|---|
| `check:src:browser` | 0 | — |
| oxlint | 0 | — |
| oxfmt `--check` | 0 | All matched files use the correct format. |
| `test:src:browser` | 0 | 12 files, 286 passed |
| `test:guides` | 0 | 19 passed |
| `test:policy` | 0 | 109 passed, 1 skipped |
| `build:src:core` / `styles` / `browser` | 0 / 0 / 0 | — |
| `test:conformance` | 0 | 22 passed |
| `test:setup` | 0 | 267 passed |

The browser run prints one `SyntaxError … 'toggle'` diagnostic from `HostSnapshot.test.ts`, which throws by design.

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
 17 files changed, 4242 insertions(+), 46 deletions(-)
```

## Deviation state
There are no deviations:
- I made no merge, commit, install, or discarding git command.
- I made no `prove` call.
- I changed no files outside the owned set; the instrument's `_carousel.scss` edit is transient and restored.
