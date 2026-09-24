# J-CAROUSEL round 4 (the landing round) — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the carousel worktree, briefed by `j-carousel-brief-4.md`; 56 tool uses, 2166 s; retained verbatim from the subagent's return; the merge of Veneer `main` `e75608b` into `unit/carousel` was left open for the Orchestrator to commit after its replay and an objective lane; the instrument is `j-carousel-mutations-4.py` with `j-carousel-mutations-4.log.txt`, the gates `j-carousel-gates-4.log.txt`, the landing diff `j-carousel-4.diff` with `j-carousel-4-status.txt`)

The merge is resolved and nothing is committed. No conflicts remain (`git diff --diff-filter=U` is empty), every gate exits 0, and the round-4 instrument ends `receipt: restored byte for byte` with no missed row.

## A. A mouse release ends the tap exemption
- **Red run:** `npm run test:src:browser -- tests/src/browser/Carousel.test.ts` gave `Tests 1 failed | 57 passed (58)`. The failing case was "holds the timer under the hover after a mouse held inside the host is released following a trusted tap, and arms it when the pointer leaves", with `expected 20 to be +0`. The log is `tmp/j-carousel/red-4.log.txt`.
  - The case drives everything as trusted input over CDP: it hovers a control inside the host, presses the mouse there, taps with touch emulation on, turns emulation off, and releases the mouse without moving it.
  - It first confirms that the host saw a touch `pointerup` and then a mouse `pointerup`, and that `:hover` still matches.
  - Before the fix, the touch deferral armed the timer past the hover and the carousel slid 20 times within 900 ms.
- **As landed:** `pointerup` is registered to `#notice` beside `pointermove` and `pointerdown`, only when `touch` and `pause` are both true.
  - `#notice` acts only on a `mouse` pointer while the exemption is set. It clears the exemption and clears the timer when the host matches `:hover`.
  - The touch and pen deferral in `#defer` is unchanged. A tap's compatibility mouse events fire no pointer event, and the trusted-tap guard case still passes.
- **Prose:** the `#touched` comment, the `#notice` comment, the class remarks, and the `#### Carousel` hover sentence now name the mouse release beside the move and the press.

## B. The two titles
- "skips a tick while the host is not rendered, and cycles again after it renders"
- "holds the timer under the hover after the mouse moves inside the host following a trusted tap, and arms it when the pointer leaves"

## C. Conflict resolution, per file
- **`index.ts`:** main's barrel, with `Swipe` and `Carousel` after `Dropdown`.
- **`constants.ts`:** main's file, the Carousel and Swipe type imports merged in, and the carousel and swipe tables appended after main's.
- **`validators.ts`:** main's file with `CarouselEventMap`, `isNonNegativeInteger`, and `isRecord` imported, and `isCarouselEvent` appended.
- **`parsers.ts`:** main's file with `CarouselRide` imported and `parseRide` appended.
- **`helpers.ts`:** main's file with `matchesReducedMotion` appended after `isDisabled`.
- **`types.ts`:** main's Alert, Tab, and Dropdown vocabularies, then `CarouselVocabulary`. The rest merged cleanly, the carousel sentence of the `DelegateOptions` remarks included.
- **`tests/src/browser/Delegate.test.ts`:** main's file, including its listener-count case, with the carousel imports added and every carousel case appended.
- **`helpers.test.ts`, `parsers.test.ts`, `validators.test.ts`:** main's files with the carousel imports added and the carousel describe blocks appended.
- **`index.test.ts`:** main's type case extended with `CarouselVocabulary`, and main's export list merged with the carousel and swipe names in `sort()` order.
- **`guides/veneer.md`:**
  - The `CarouselVocabulary` row sits after main's vocabulary rows.
  - The Carousel example fence follows main's fences.
  - `#### Carousel` follows `#### Dropdown`.
  - § Delegation keeps main's paragraph with the attribute-routing and scan sentences where round 2 placed them. I added one qualification: the carousel route reads no disabled state, because Bootstrap's carousel data API reads none. Without it, main's "Every route reads … through `isDisabled`" sentence would be false.
  - The Collapse, Dropdown, Tab, ScrollSpy, Alert, and Carousel `plugin` rows all read `shipped` with their Proof paths.

## D. One delegate
- **Kept, extended to the carousel:** main's `#closest`, the generic `#construct(engine)` (its comment now names the carousel's swipe-token write), one `#conflicts` over a `Set`, one `#scan(group)`, and `#discard`. The `#driven`, `#owned`, `#mark`, `#construct`, and `#acquire` unions all include `Carousel`, and `#discard` reads `Carousel.find`.
- **Deleted:** my `#conflictsCarousel` and my standalone `#scan()`. `#conflicts` now also adds the carousel a slide control names, through `#slideControl` and `#slideHost`, when `Carousel.find` returns no engine for it.
- **Route order:** `#routeCarousel` runs after `#routeDropdown`, in the component order. It reads the delegate's lifetime before it marks anything, like the routes landed before it.
- **Scan shape:** one `try` block acquires the scrollspies first, then each element whose ride attribute `parseRide` reads as `load` and that no carousel owns. Any refusal destroys every acquired engine and rethrows. This matches main's scan-before-listeners order.
- **`isDisabled`:** the carousel route and its conflict reading test no disabled token or attribute, and neither does Bootstrap's carousel data API, so `isDisabled` has no site to replace.
- **Class remarks:** main's summary is kept. The remarks merge main's description with the carousel route, its conflict entry, its once-per-click nesting, and its scan.

## E. Gates (`tmp/j-carousel/acceptance-4.sh`, logs in `tmp/j-carousel/acceptance-4/`)

I ran the chain again after the final `Delegate.ts` change; these are the second run's results.

| Gate | Exit | Summary |
|---|---|---|
| `check:src:browser` | 0 | — |
| oxlint | 0 | — |
| oxfmt `--write guides/veneer.md` | 0 | — |
| oxfmt `--check` | 0 | All matched files use the correct format. |
| `test:src:browser` | 0 | 17 files, 490 passed |
| `test:guides` | 0 | 19 passed |
| `test:policy` | 0 | 109 passed, 1 skipped |
| three builds | 0 / 0 / 0 | — |
| `test:conformance` | 0 | 22 passed |
| `test:setup` | 0 | 281 passed |

## The instrument (`tmp/j-carousel/mutations-4.py` → `mutations-4.log.txt`, one full run)
- **Rows:** all 108 round-3 rows are kept and item A's row is added: 67 EXACT, 42 JOINED, none missed. The new row, "a mouse release does not end the tap exemption", drops only the `pointerup` line and reddens its named case EXACT.
- **Followed the renamed title:** "mouse activity does not end the tap exemption" and "ending the tap exemption leaves the timer armed".
- **Re-anchored to the merged `Delegate.ts`:** "the delegate has no carousel route", "the construction scan is dropped" (the carousel loop iterates nothing), "the scan acquires every ride" (drops the `parseRide` guard), and "the discard ignores carousels".
- **Re-aimed at the shared `#conflicts` Set:**
  - "the carousel same-host conflict is not refused" drops the carousel entry from the Set.
  - "the carousel collapse conflict is not refused" now makes the shared collapse-panel half of the Set admit nothing (`=== null`). The collapse-conflict case is its named case; main's button and collapse conflict cases join it.
- **`GREEN?`:** Carousel 0 of 58, Swipe 0/6, Delegate 0/93, validators 0/20, parsers 0/15, helpers 0/41, index 0/3.
- **Receipt:** `receipt: restored byte for byte`. `_carousel.scss` hashes equal HEAD's (`19299617…`).

## `git status --short`
Every merge-resolved file is staged. The Carousel item A and B edits are unstaged (` M src/browser/Carousel.ts`, ` M tests/src/browser/Carousel.test.ts`).
```
M  ROADMAP.md
M  app/browser/Showcase.ts
M  app/browser/constants.ts
M  app/browser/index.ts
A  app/browser/sections/FloatSection.ts
A  app/browser/sections/FocusRingSection.ts
A  app/browser/sections/ModalSection.ts
A  app/browser/sections/ObjectFitSection.ts
A  app/browser/sections/OpacitySection.ts
A  app/browser/sections/OverflowSection.ts
A  app/browser/sections/PopoverSection.ts
A  app/browser/sections/ShadowSection.ts
A  app/browser/sections/TooltipSection.ts
M  app/browser/sections/TypeSection.ts
M  guides/veneer.md
A  src/browser/Alert.ts
M  src/browser/Button.ts
 M src/browser/Carousel.ts
M  src/browser/Collapse.ts
M  src/browser/Delegate.ts
A  src/browser/Dropdown.ts
A  src/browser/Placement.ts
A  src/browser/ScrollSpy.ts
A  src/browser/Tab.ts
M  src/browser/constants.ts
M  src/browser/helpers.ts
M  src/browser/index.ts
M  src/browser/parsers.ts
M  src/browser/types.ts
M  src/browser/validators.ts
M  src/styles/_mixins.scss
M  src/styles/components/_card.scss
A  src/styles/components/_clearfix.scss
A  src/styles/components/_focus-ring.scss
A  src/styles/components/_modal.scss
A  src/styles/components/_popover.scss
A  src/styles/components/_stretched-link.scss
A  src/styles/components/_tooltip.scss
M  src/styles/index.scss
A  src/styles/utilities/_float.scss
A  src/styles/utilities/_font.scss
A  src/styles/utilities/_object-fit.scss
A  src/styles/utilities/_opacity.scss
A  src/styles/utilities/_overflow.scss
A  src/styles/utilities/_shadow.scss
M  tests/app/browser/Showcase.test.ts
M  tests/app/browser/index.test.ts
M  tests/app/browser/integration.test.ts
A  tests/app/browser/sections/FloatSection.test.ts
A  tests/app/browser/sections/FocusRingSection.test.ts
M  tests/app/browser/sections/LinkSection.test.ts
A  tests/app/browser/sections/ModalSection.test.ts
A  tests/app/browser/sections/ObjectFitSection.test.ts
A  tests/app/browser/sections/OpacitySection.test.ts
A  tests/app/browser/sections/OverflowSection.test.ts
A  tests/app/browser/sections/PopoverSection.test.ts
A  tests/app/browser/sections/ShadowSection.test.ts
A  tests/app/browser/sections/TooltipSection.test.ts
M  tests/app/browser/sections/TypeSection.test.ts
M  tests/conformance.test.ts
M  tests/fixtures/tailwind/consumer.css
M  tests/fixtures/tailwind/markup.html
M  tests/fixtures/tailwind/preflight.css
M  tests/setup.css
M  tests/setup.test.ts
M  tests/setup.ts
M  tests/setupServer.test.ts
M  tests/setupStyles.test.ts
M  tests/setupStyles.ts
A  tests/src/browser/Alert.test.ts
 M tests/src/browser/Carousel.test.ts
M  tests/src/browser/Delegate.test.ts
A  tests/src/browser/Dropdown.test.ts
A  tests/src/browser/Placement.test.ts
A  tests/src/browser/ScrollSpy.test.ts
A  tests/src/browser/Tab.test.ts
M  tests/src/browser/helpers.test.ts
M  tests/src/browser/index.test.ts
M  tests/src/browser/parsers.test.ts
M  tests/src/browser/validators.test.ts
A  tests/src/styles/components/clearfix.test.ts
A  tests/src/styles/components/focus-ring.test.ts
A  tests/src/styles/components/modal.test.ts
A  tests/src/styles/components/popover.test.ts
A  tests/src/styles/components/stretched-link.test.ts
A  tests/src/styles/components/tooltip.test.ts
M  tests/src/styles/fixtures/mixins.scss
M  tests/src/styles/mixins.test.ts
A  tests/src/styles/utilities/float.test.ts
A  tests/src/styles/utilities/font.test.ts
A  tests/src/styles/utilities/object-fit.test.ts
A  tests/src/styles/utilities/opacity.test.ts
A  tests/src/styles/utilities/overflow.test.ts
A  tests/src/styles/utilities/shadow.test.ts
```

## Deviation state
No deviations.
- I resolved the conflicts by editing the files and staged the resolved ones with `git add`. I ran no commit, install, merge abort, or discarding git command, and edited no off-limits file.
- I made no `prove` call.
- **Fixture over CDP:** the mouse-release case turns touch emulation on only between the mouse press and the mouse release, because Chromium turns mouse input into touch while emulation is on. The case asserts that the release reaches the host as a `mouse` `pointerup` before it reads the timer.
- **Line shape in the merged scan:** the load-ride guard is two `continue` lines, so the formatter keeps each under the line limit, and the instrument drops the `parseRide` line alone.
