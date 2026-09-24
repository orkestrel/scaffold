# J-CAROUSEL round 5 (the landing round's second pass) — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, resumed in the carousel worktree, briefed by `j-carousel-brief-5.md`; 18 tool uses, 1622 s; retained verbatim from the subagent's return; the merge of `e75608b` stays open with every file staged; the instrument is `j-carousel-mutations-5.py` with `j-carousel-mutations-5.log.txt`, the gates `j-carousel-gates-5.log.txt`, the landing diff `j-carousel-5.diff` with `j-carousel-5-status.txt`)

Both round-5 items are closed in the open merge, and every gate exits 0. The instrument ran all 110 rows (the 109 from round 4 plus item A's): 67 EXACT, 43 JOINED, none missed, ending `receipt: restored byte for byte`. Nothing is committed.

## A. The tab entry in `#conflicts` now reads the disabled state
- **Red run:** `npm run test:src:browser -- tests/src/browser/Delegate.test.ts` gave `Tests 1 failed | 93 passed (94)`. The log is `tmp/j-carousel/red-5.log.txt`.
  - The failing case was "constructs and slides the carousel alone when its host is also a disabled tab control, and refuses the click when that tab control is enabled", with `expected true to be false`. Before the fix, the click was refused and not prevented.
  - The case uses the lane's markup: `#gallery`, with classes `carousel disabled`, `data-bs-toggle="tab"`, `data-bs-target="#gallery"`, and `data-bs-slide="next"`.
  - Its enabled neighbour, `#enabled`, is the same markup without `disabled`.
  - The disabled host's click must be prevented, construct and slide the carousel to index 1, construct no tab, and record only the carousel's `slide.vn.carousel` event.
  - The enabled host's click must be refused: not prevented, no carousel, no tab, no event, and the first item still active.
- **Predicate as landed:** `#routeTab` reads `isDisabled(control, this.#tab.classes.disabled)`, and the `#conflicts` entry now reads the same thing:
  ```ts
  ...(control !== undefined &&
  !isDisabled(control, this.#tab.classes.disabled) &&
  Tab.find(control) === undefined
  	? [control]
  	: []),
  ```
  The class remarks and the `#conflicts` comment now say that the tab control and the dropdown toggle each count only when not disabled. No other route changed.

## B. The § Delegation sentence
- **Before:** "Every route but the carousel's, which reads no disabled state as Bootstrap's carousel data API reads none, reads a trigger or a control as disabled through the `isDisabled` function: it carries its entity's `disabled` token, it matches the platform's `:disabled` state, or it carries a `disabled` attribute whose value is not `false`, as Bootstrap's `isDisabled` function reads it."
- **After:** "The alert, tab, and dropdown routes read a trigger or a control as disabled through the `isDisabled` function: it carries its entity's `disabled` token, it matches the platform's `:disabled` state, or it carries a `disabled` attribute whose value is not `false`, as Bootstrap's `isDisabled` function reads it. The button, collapse, and carousel routes read no disabled state, as Bootstrap's data API for those components reads none."

## C. Gates (`tmp/j-carousel/acceptance-5.sh`, logs in `tmp/j-carousel/acceptance-5/`)

| Gate | Exit | Summary |
|---|---|---|
| `check:src:browser` | 0 | — |
| oxlint | 0 | — |
| oxfmt `--write guides/veneer.md` | 0 | — |
| oxfmt `--check` | 0 | All matched files use the correct format. |
| `test:src:browser` | 0 | 17 files, 491 passed |
| `test:guides` | 0 | 19 passed |
| `test:policy` | 0 | 109 passed, 1 skipped |
| three builds | 0 / 0 / 0 | — |
| `test:conformance` | 0 | 22 passed |
| `test:setup` | 0 | 281 passed |

## Instrument (`tmp/j-carousel/mutations-5.py` → `mutations-5.log.txt`, one full run)
- **Rows:** every round-4 row is kept, and "the disabled tab control joins the conflict set" is added. That row drops only the new `!isDisabled(control, …) &&` line and reads EXACT (1 failed of 94, its named case).
- **Re-anchored rows:** none. The carousel and collapse entries of `#conflicts` kept their text, and the dry check reports 0 mismatches over 110 rows.
- **GREEN?:** Carousel 0 of 58, Swipe 0/6, Delegate 0/94, validators 0/20, parsers 0/15, helpers 0/41, index 0/3.
- **Receipt:** `receipt: restored byte for byte`.

## `git status --short` over `src/browser`, `tests/src/browser`, and the guide
Everything is staged. I staged `Delegate.ts`, `Delegate.test.ts`, and the guide this round; `Carousel.ts` and `Carousel.test.ts` show as staged although I did not stage them this round.
```
M  guides/veneer.md
A  src/browser/Alert.ts
M  src/browser/Button.ts
M  src/browser/Carousel.ts
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
A  tests/src/browser/Alert.test.ts
M  tests/src/browser/Carousel.test.ts
M  tests/src/browser/Delegate.test.ts
A  tests/src/browser/Dropdown.test.ts
A  tests/src/browser/Placement.test.ts
A  tests/src/browser/ScrollSpy.test.ts
A  tests/src/browser/Tab.test.ts
M  tests/src/browser/helpers.test.ts
M  tests/src/browser/index.test.ts
M  tests/src/browser/parsers.test.ts
M  tests/src/browser/validators.test.ts
```

## Deviation state
No deviations.
- I edited only owned files: `Delegate.ts`, `Delegate.test.ts`, the guide sentence, and `tmp/j-carousel/**`.
- `Delegate.test.ts` now imports `isInstance` from `@orkestrel/contract` so the event recorder narrows the event target the landed way.
- I made no `prove` call, and ran no commit, install, merge abort, or discarding git command.
