# Unit RP round 2 report

## Changes by site

- `tests/app/browser/integration.test.ts`, the new case (claim 5/6 fixes):
  - Retitled to "takes no mouseover event from the parked pointer, on a lifted copy whose first
    element touches the document's origin" (one origin — the document's — named once).
  - Rewrote the comment to state the origin fact and the release's role as two separate sentences,
    with no clause claiming the pointer would otherwise land there.
  - Replaced the `FRAMES.place('primary-parked', clone, wrapper)` call with
    `await stagePane(window.innerWidth, window.innerHeight)` followed by `await releasePane()` in
    the `finally` block, both already imported from `@orkestrel/test/browser`.
  - Deleted the descendant `:hover` assertion (`clone.querySelectorAll('*')...`) — the copied
    button has no descendants, so that assertion could never fail (subjective F2).
  - Replaced the `Set<string>` entry-recorder with a boolean `entered` flag, since no scenario name
    is placed or needed any more.
  - Kept the unpadded lift, the origin assertions (`box.top`/`box.left` both `0`), and the recorder
    armed before `releasePointer`.
- `tests/app/browser/integration.test.ts`, the cascade-key comment (claim 2, one of three sites):
  split the release's role ("The release parks the pointer outside the page.") from the padding's
  role ("Each copy is lifted below the wrapper's top padding, and the padding is deeper than the
  widest negative gutter a specimen's first row pulls up by, so no row starts above the document.")
  into two sentences that no longer share a clause.
- `tests/setup.ts` (claim 2, second site — the `CASCADE_KEYS` remarks the round-1 audit found,
  around line 628, which round 1 never touched): split "The journey releases the pointer before
  these shots and lifts each copy below a padded top, so the pointer rests off every copy while its
  frame is shot and no resting frame carries a hover paint." into "The journey releases the pointer
  before these shots, so no resting frame carries a hover paint. Each copy is lifted below a padded
  top." — the release's consequence and the padding's existence no longer share a clause.
- `tests/setup.ts` (claim 5 — the census): reverted every round-1 addition — the `parked` member of
  `CaptureState`, its remarks sentence, and the `primary-parked` row in `DRIVEN_KEYS`. `git diff
  1ee0faf -- tests/setup.ts` now shows only the padding-sentence split above; no other line moved.
- `guides/veneer.md` (claim 2, third site, around line 10557): split "The journey shoots each
  resting element frame on a copy of its specimen lifted to the document's start below a padded
  top, after releasing the pointer, so the released pointer rests off every copy and no resting
  frame carries a hover paint." into "...after releasing the pointer, so no resting frame carries a
  hover paint." with the padded-top clause left as a plain fact, carrying no pointer consequence.

The round-1 `setupBrowser.ts` `FrameManager.focus` remarks and the round-1 guide `focus`-method
paragraph already named the release's role alone ("parks the pointer outside the page") with no
padding link, so neither needed a further edit this round; both are unchanged from round 1.

## Red and green runs

- Red proof: swapped the case's `releasePointer()` for
  `await page.elementLocator(document.body).hover({ position: { x: 1, y: 1 } })`, with the
  `mouseover` listener already armed before that call. Ran
  `./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache
  --reporter=dot --project "journey:light-390" -t "takes no mouseover event from the parked
  pointer"` (`CAPTURE` unset) — failed: `expect(entered).toBe(false)` received `true`. Log:
  `.orkestrel/veneer/units/rp-instruments/rp2-red-light390.log.txt`.
- Restored `releasePointer()`. Green runs, same command, `CAPTURE` unset, scoped by `-t`:
  - `--project "journey:light-390"` — 1 passed. Log: `.orkestrel/veneer/units/rp-instruments/rp2-green-light390.log.txt`.
  - `--project "journey:dark-1280"` — 1 passed. Log: `.orkestrel/veneer/units/rp-instruments/rp2-green-dark1280.log.txt`.

## Gate table

| Gate | Command | Result | Log |
| --- | --- | --- | --- |
| Format | `npm run format:check` (npm 11 on `PATH`) | exit 0 | `.orkestrel/veneer/units/rp-instruments/rp2-format.log.txt` |
| Lint | `npm run lint:check` (npm 11 on `PATH`) | exit 0 | `.orkestrel/veneer/units/rp-instruments/rp2-lint.log.txt` |
| Typecheck (chained) | `npm run check` (npm 11 on `PATH`; chains `tsc --noEmit --project tsconfig.json`, `check:src:core`, `check:src:browser`, `check:src:styles`, `check:app:browser`) | exit 0 | `.orkestrel/veneer/units/rp-instruments/rp2-check.log.txt` |
| Journey `journey:light-390` (scoped, `CAPTURE` unset) | see Red and green runs | exit 0, 1 passed | `.orkestrel/veneer/units/rp-instruments/rp2-green-light390.log.txt` |
| Journey `journey:dark-1280` (scoped, `CAPTURE` unset) | see Red and green runs | exit 0, 1 passed | `.orkestrel/veneer/units/rp-instruments/rp2-green-dark1280.log.txt` |
| Red proof | see Red and green runs | exit 1 (expected failure) | `.orkestrel/veneer/units/rp-instruments/rp2-red-light390.log.txt` |

Ran every package script through `npm` 11 on `PATH`
(`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`),
resolving round 1's `EBADDEVENGINES` gap (round 1 ran the direct binaries instead of the package
scripts; this round runs `npm run format:check`, `npm run lint:check`, and `npm run check` directly,
closing claim 1).

## Verification against acceptance criteria

- `grep -n -E "parked|primary-parked" tests/setup.ts` returns four lines, all pre-existing
  (`the parked pointer entered ...`, lines around 3434-3573, part of the `FocusOptions`/
  `scanFocusReading` machinery `git diff 1ee0faf` confirms is untouched) — none added by this unit.
- `grep -rn -i -E "pointer (rests|resting) off|rests over none" tests/ guides/veneer.md` returns
  nothing.
- `git diff 1ee0faf -- tests/setup.ts` shows only the padding-sentence split; the `parked` state,
  its remarks sentence, and the `primary-parked` row are gone.

## Diff and status

`git diff 1ee0faf` (the whole change over that base) captured to `.orkestrel/veneer/units/rp-2.diff` (125 lines).
`git status --short` captured to `.orkestrel/veneer/units/rp-2-status.txt`: four modified files —
`guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`,
`tests/setupBrowser.ts`.

## Deviations

None. `node_modules` and `node_modules/.vite` were not touched. Every log from round 1 remains
under `.orkestrel/veneer/units/rp-instruments/`; nothing was deleted. The case's sentence wording (Deviation contract) is
settled as shown above.
