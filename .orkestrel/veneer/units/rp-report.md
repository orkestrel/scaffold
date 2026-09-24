# Unit RP report

## Changes by site

- `tests/setupBrowser.ts`, `FrameManager.focus` remarks (around line 992): rewrote "The pointer is
  parked at the page's origin, on the wrapper's padding" to "The pointer is parked outside the
  page", keeping the `releasePointer` call and the `entered` recorder in the method unchanged.
- `tests/app/browser/integration.test.ts`, the comment before the `releasePointer` call in the
  cascade-key case (around lines 716-723): rewrote "The release parks the pointer at the page's
  origin, and each copy is lifted below the wrapper's top padding … so the parked pointer rests on
  the wrapper rather than on anything the frame shows" to state the release parks the pointer
  outside the page, and kept the padding's stated role — it stays deeper than the widest negative
  gutter a specimen's first row pulls up by, so no row starts above the document, and the parked
  pointer, being outside the page, rests over none of the copies. Every `releasePointer` call and
  `entered` recorder in that case is unchanged.
- `guides/veneer.md`, the paragraph on `FrameManager.focus` (around line 10590): rewrote "The
  `focus` method parks the pointer on the wrapper's padding" to "The `focus` method parks the
  pointer outside the page".
- `tests/setup.ts` (the census file the Unknowns search returned, matching
  `list-group-actions-focus`):
  - Added a `parked` member to the `CaptureState` union, with a remarks sentence naming it a
    reading taken with the pointer parked outside the page on a lifted copy whose first element
    touches the document's origin.
  - Added `Object.freeze({ scenario: 'primary-parked', subject: 'Primary' })` to `DRIVEN_KEYS`,
    beside the existing `primary-active` row. `Primary` stays in `EXEMPT_SUBJECTS` (unchanged: it
    still has no `CASCADE_KEYS` resting row, only driven rows), so no other census invariant
    changed.
- `tests/app/browser/integration.test.ts`: added one new journey case, "takes no mouseover event
  from the parked pointer, on a lifted copy whose first element touches the page's origin", placed
  directly after the cascade-key case (its own registered census row and the same file's registry
  make it self-contained; no other file needed the new scenario name).

## New case

Title: `takes no mouseover event from the parked pointer, on a lifted copy whose first element
touches the page's origin`.

It clones the `Primary` button (`readButton(mounted.section, 'Primary')`), lifts the clone through
`FrameManager.lift` with `{ padded: false }` so the clone is the wrapper's only, unpadded child at
the document's start — its first element touches the page's origin, confirmed by asserting
`getBoundingClientRect().top === 0` and `.left === 0`. Inside the lift's action it attaches a
capturing `mouseover` listener before calling `releasePointer`, then places a resting frame on the
clone under the newly registered `primary-parked` scenario, then asserts no `mouseover` entered the
wrapper and that neither the clone nor any of its descendants matches `:hover`.

## Red and green runs

- Red proof: temporarily replaced the case's `releasePointer()` call with
  `await page.elementLocator(document.body).hover({ position: { x: 1, y: 1 } })`, with the
  `mouseover` listener attached before that call (unchanged from the final structure) so the
  substituted pointer verb is caught the same way a genuinely parked-on-page pointer would be. Run:
  `CAPTURE=1 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache
  --reporter=dot --project "journey:light-390" -t "takes no mouseover event from the parked
  pointer"` — failed with `AssertionError: expected [ 'primary-parked' ] to strictly equal []`. Log:
  `.orkestrel/veneer/units/rp-instruments/rp-red-light390.log.txt`.
- Restored the `releasePointer()` call. Green runs, same command, scoped by `-t` to the case's
  title:
  - `--project "journey:light-390"` — 1 passed. Log: `.orkestrel/veneer/units/rp-instruments/rp-green-light390.log.txt`.
  - `--project "journey:dark-1280"` — 1 passed. Log: `.orkestrel/veneer/units/rp-instruments/rp-green-dark1280.log.txt`.

## Gate table

| Gate | Command | Result | Log |
| --- | --- | --- | --- |
| Format | `./node_modules/.bin/oxfmt --check tests/app/browser/integration.test.ts tests/setup.ts tests/setupBrowser.ts guides/veneer.md` | exit 0, "All matched files use the correct format." | inline, not separately logged |
| Lint | `./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings tests/app/browser/integration.test.ts tests/setup.ts tests/setupBrowser.ts` | exit 0, no output | inline |
| Typecheck (root) | `./node_modules/.bin/tsc --noEmit --project tsconfig.json` | exit 0, no output | inline |
| Typecheck (`check:src:core`) | `./node_modules/.bin/tsc --noEmit -p configs/src/tsconfig.core.json` | exit 0, no output | inline |
| Typecheck (`check:src:browser`) | `./node_modules/.bin/tsc --noEmit -p configs/src/tsconfig.browser.json` | exit 0, no output | inline |
| Typecheck (`check:src:styles`) | `./node_modules/.bin/tsc --noEmit -p configs/src/tsconfig.styles.json` | exit 0, no output | inline |
| Typecheck (`check:app:browser`) | `./node_modules/.bin/vue-tsc --noEmit -p configs/app/tsconfig.browser.json` | exit 0, no output | inline |
| Journey (`journey:light-390`, scoped) | see Red and green runs | exit 0, 1 passed \| 62 skipped | `.orkestrel/veneer/units/rp-instruments/rp-green-light390.log.txt` |
| Journey (`journey:dark-1280`, scoped) | see Red and green runs | exit 0, 1 passed \| 62 skipped | `.orkestrel/veneer/units/rp-instruments/rp-green-dark1280.log.txt` |

`npx` is blocked on this host by an `EBADDEVENGINES` npm-version mismatch, so every command above
ran through the local `node_modules/.bin/` binary directly instead of `npx`/`npm run`, per the
brief's Host section allowing that path implicitly (only `oxfmt` is named explicitly; the same
constraint applies to `tsc`, `vue-tsc`, `oxlint`, and `vitest`).

`grep -rn -i -E "page's origin|wrapper's padding" tests/ guides/veneer.md` now returns only the new
case's own title and comment (describing the copy's geometry, not a parked pointer's location) and
one unrelated "wrapper's padding" hit in `guides/veneer.md` about a color-swatch wrapper — no line
describes the parked pointer as sitting at the page's origin or the wrapper's padding.

Whole-suite gate (`npm run test:src:browser`, `npm run test:setup:browser`) was not run beyond what
the brief's standing conditions already exempt (Chromium 141 lacks `Element.setHTML`; the showcase
carries two "Dark mode" controls); those reds belong to the engine session and were not diagnosed.

## Diff and status

`git diff` captured to `.orkestrel/veneer/units/rp.diff` (134 lines); `git status --short` captured to
`.orkestrel/veneer/units/rp-status.txt`, showing four modified files: `guides/veneer.md`,
`tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`.

## Deviations

None. The Unknowns search found `tests/setup.ts` as the census file (matched
`list-group-actions-focus`), which the brief's Scope already anticipates ("plus any census file the
Unknowns search returns"), and it was edited to register the `parked` state and the
`primary-parked` `DRIVEN_KEYS` row the new case needs to call `FRAMES.place` without the portfolio
refusing an unregistered scenario. No case took a `mouseover` event with `releasePointer` in place.
