# Unit RP round 3 report

## Changes by site

All four sites were rewritten with the brief's exact sentences (verified by direct comparison
against the brief text after formatting), re-wrapped only for the formatter.

- `tests/setup.ts`, the `CASCADE_KEYS` remarks (around line 627, claim 4): replaced "The journey
  releases the pointer before these shots, so no resting frame carries a hover paint. Each copy is
  lifted below a padded top." with "The journey releases the pointer before these shots, and the
  release parks the pointer outside the page, so no resting frame carries a hover paint. Each copy
  is lifted below a padded top, and the padding is deeper than the widest negative gutter a
  specimen's first row pulls up by, so no row starts above the document."
- `guides/veneer.md` (around line 10556, claim 4): replaced "The journey shoots each resting
  element frame on a copy of its specimen lifted to the document's start below a padded top, after
  releasing the pointer, so no resting frame carries a hover paint." with "The journey shoots each
  resting element frame on a copy of its specimen lifted to the document's start. It releases the
  pointer first, and the release parks the pointer outside the page, so no resting frame carries a
  hover paint. Each copy sits below a padded top, and the padding is deeper than the widest negative
  gutter a specimen's first row pulls up by, so no row starts above the document."
- `tests/app/browser/integration.test.ts`, the cascade-key comment (around line 721, F2): deleted
  its last sentence pair ("Each copy is lifted below the wrapper's top padding, and the padding is
  deeper … so no row starts above the document."), keeping "The release parks the pointer outside
  the page." Added the comment line "The lifted element's top padding is deeper than the widest
  negative gutter a specimen's first row pulls up by, so no row starts above the document."
  immediately above `const lifted = build('div', { classes: 'pt-5' })` (around line 742).
- `tests/app/browser/integration.test.ts`, the case's title and comment (around line 871, F1/F3):
  title changed to "takes no mouseover event from the parked pointer while the pane is staged, on a
  lifted copy whose box touches the document's origin". Comment replaced with: "An unpadded lift
  puts its wrapper first in the document with the "Primary" button's copy as its only child, so the
  copy's box touches the document's origin. The release parks the pointer outside the page. The
  pane is staged after the release, because staging repositions the document under a pointer that
  does not move with it, and a pointer parked at the origin would then enter the copy."

No assertion, call, or import changed this round — every edit is prose or the case's title, per the
brief.

## Gate table

| Gate | Command | Result | Log |
| --- | --- | --- | --- |
| Format | `npm run format:check` (npm 11 on `PATH`) | exit 0 | `.orkestrel/veneer/units/rp-instruments/rp3-format.log.txt` |
| Lint | `npm run lint:check` (npm 11) | exit 0 | `.orkestrel/veneer/units/rp-instruments/rp3-lint.log.txt` |
| Typecheck (chained) | `npm run check` (npm 11; chains root `tsc`, `check:src:{core,browser,styles}`, `check:app:browser`) | exit 0 | `.orkestrel/veneer/units/rp-instruments/rp3-check.log.txt` |
| Journey `journey:light-390` (scoped `-t "while the pane is staged"`, `CAPTURE` unset) | see Green runs | exit 0, 1 passed | `.orkestrel/veneer/units/rp-instruments/rp3-green-light390.log.txt` |
| Journey `journey:dark-1280` (scoped `-t "while the pane is staged"`, `CAPTURE` unset) | see Green runs | exit 0, 1 passed | `.orkestrel/veneer/units/rp-instruments/rp3-green-dark1280.log.txt` |

## Green runs

- `./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache
  --reporter=dot --project "journey:light-390" -t "while the pane is staged"` — 1 passed, no
  timeout, single run. Log: `.orkestrel/veneer/units/rp-instruments/rp3-green-light390.log.txt`.
- Same command with `--project "journey:dark-1280"` — 1 passed, no timeout, single run. Log:
  `.orkestrel/veneer/units/rp-instruments/rp3-green-dark1280.log.txt`.
- Neither run hit a timeout, so no re-run was needed; each ran once alone.

## Verification against acceptance criteria

- `grep -rn -i -E "pointer (rests|resting) off|first element touches|as the document's first
  element" tests/ guides/veneer.md` returns nothing (exit 1, no matches).
- `git diff 1ee0faf -- tests/setup.ts` shows only the `CASCADE_KEYS` remarks change (confirmed
  inline above).

## Diff and status

`git diff 1ee0faf` (whole change over that base) captured to `.orkestrel/veneer/units/rp-3.diff` (140 lines).
`git status --short` captured to `.orkestrel/veneer/units/rp-3-status.txt`: four modified files —
`guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`,
`tests/setupBrowser.ts` (the last unchanged since round 1; still holding round 1's `FrameManager.focus`
remarks edit, untouched this round).

## Deviations

None. Every given sentence fit the site it named. `node_modules` was not touched. Every log from
rounds 1 through 3 remains under `.orkestrel/veneer/units/rp-instruments/`; nothing was deleted.
