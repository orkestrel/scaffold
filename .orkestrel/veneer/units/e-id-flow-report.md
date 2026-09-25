# Unit E-ID-FLOW report: Bootstrap's reboot flow margins restored

The headings, the `.h1` to `.h6` classes, `p`, `address`, `ol`, and `ul` now take Bootstrap 5.3.8's reboot margins through the space scale. The guide's ledger rows for those margin-bottom declarations read `tokenized`. Every gate the brief names exits 0, and the `app:browser` project exits 0 with no red. Worktree: `/home/user/veneer-flow`, branch `unit/flow`, base `6882751`. Nothing is committed.

## Changes

- `src/styles/_mixins.scss` (shared): the `heading-text` mixin replaces `margin: 0` with `margin-top: 0; margin-bottom: var(--vn-space-4)`. The `list-space` mixin replaces `margin: 0` with `margin-top: 0; margin-bottom: var(--vn-space-8)`. The only callers are `elements/_heading.scss` and `components/_type.scss` for `heading-text`, and `elements/_ol.scss` and `elements/_ul.scss` for `list-space`. So the headings, the `.h1` to `.h6` classes, and both lists take their margins from the mixins, and those partials needed no edit.
- `src/styles/elements/_p.scss`: `margin: 0` becomes `margin-top: 0; margin-bottom: var(--vn-space-8)`.
- `src/styles/elements/_address.scss`: `margin: 0 0 var(--vn-space-7)` becomes `margin-bottom: var(--vn-space-8)`. The release writes only this longhand, and the user agent gives `address` no top margin.
- Longhands, not the blockquote's shorthand. The release writes block longhands on these tags. The ledger compares each property as text, so a shorthand would leave the `margin-bottom` rows `dropped` and the `{ margin }` rows as additions. With longhands, each `margin-bottom` row reads `tokenized`, and each `margin-top` row disappears because both sides write `0`.
- `guides/veneer.md` (shared): the `margin-bottom` rows for `h1` to `h6`, `.h1` to `.h6`, `p`, `address`, `ol`, and `ul` move from `dropped` to `tokenized` (`var(--vn-space-4)` for headings, `var(--vn-space-8)` for the rest). The matching `margin-top` rows are struck. The `{ margin }` addition rows for those selectors are struck. The `dl`, `dd`, and `pre` rows are untouched. The Excluded rows for `ol ol`, `ul ul`, `ol ul`, and `ul ol` stay.
- `tests/setupStyles.ts` (shared): adds `HEADING_MARGIN` (`0.5rem`, the release's `$headings-margin-bottom`) and `FLOW_MARGIN` (`1rem`, the release's `$paragraph-margin-bottom` and its address and list literal). It also updates the calibration tables the change made false.
- New proofs: `tests/src/styles/elements/{heading,p,address,ol,ul}.test.ts` and `tests/src/styles/components/type.test.ts`. Each proof mounts the tag or class beside a plain specimen carrying the release literal. It asserts that `margin-top` is 0, that `margin-bottom` equals the specimen's resolved length (8px or 16px at the default density), and that `margin-bottom` doubles when `--vn-factor-density` is 2 on the document element.

## Failing-first table

Host: the npm11 shim first on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, and styles rebuilt with `npm run build:src:styles` before each run.

Command: `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/heading.test.ts tests/src/styles/elements/p.test.ts tests/src/styles/elements/address.test.ts tests/src/styles/elements/ol.test.ts tests/src/styles/elements/ul.test.ts tests/src/styles/components/type.test.ts`

| Stage | Reading | Log |
| --- | --- | --- |
| Proofs added, source at base | 11 failed, 49 passed. Every failure is a new proof: `takes the release block margins …` on each tag and each `.h*` class | `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/logs/owned-red.log.txt` |
| Source fixed, calibrations not yet updated | New proofs green. The calibration cases the change made false are red: 16 failed, 44 passed | overwritten by the next run in the same log path; the list is in § Tests the change made false |
| Calibrations updated | 60 passed | `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/logs/owned-green.log.txt` |

## Mutation table

`/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/flow-mutate.sh` runs each mutation. The script copies the file, applies the mutation, rebuilds the styles, runs the named files, copies the file back, and compares the SHA-256 digests.

| Mutation | Assertion it reddens | Reading | Log | Restore |
| --- | --- | --- | --- | --- |
| `_p.scss` `var(--vn-space-8)` → `1rem` | p density proof (`release * 2`) | 1 failed, 2 passed | `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/logs/mutation-p-literal.log.txt` | identical, `439d1157…0423` |
| `heading-text` `var(--vn-space-4)` → `0.5rem` | heading density proof, each `.h*` class density proof | 7 failed, 41 passed. The calibrations stay green | `mutation-heading-literal.log.txt` | identical, `aeb473b8…e2` |
| `heading-text` `var(--vn-space-4)` → `var(--vn-space-8)` | heading and `.h*` default-density proofs, heading calibration, `.h*` twin margin | 15 failed, 33 passed | `mutation-heading-step.log.txt` | identical |
| `_address.scss` `var(--vn-space-8)` → `var(--vn-space-7)` (the old value) | address proof and calibration | 3 failed | `mutation-address-old.log.txt` | identical, `95351988…2011` |
| `list-space` `margin-top: 0` → `var(--vn-space-4)` | ol and ul proofs and calibrations (`margin-top`) | 6 failed | `mutation-list-top.log.txt` | identical |
| `list-space` `var(--vn-space-8)` → `1rem` | ol and ul density proofs | 2 failed, 4 passed | `mutation-list-literal.log.txt` | identical |

## Probe readings against Bootstrap

The probe `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/flow-probe.mjs` renders the same markup under the built Veneer cascade and under `bootstrap/dist/css/bootstrap.css` in Chromium at 390 and 1280 pixels, then doubles the density on the Veneer page. Log: `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/logs/probe.log.txt`, exit 0. At both widths, every row reads the same on both sides:

- `h1` to `h6` and `div.h1` to `div.h6`: 0px top and 8px bottom. At density 2, Veneer reads 16px.
- `p`, `address`, `ol`, and `ul`: 0px top and 16px bottom. At density 2, Veneer reads 32px.
- `p.mb-0`: 0px on both sides, so the class keeps control. `ul.list-unstyled`: 16px on both sides.

## Tests the change made false and each fix

Each of these tests was found by running the suites after the change:

- `tests/setupStyles.ts` `TEXT_P_CASES`: `margin-bottom` goes from `0px` to `16px`.
- `tests/setupStyles.ts` `TEXT_ADDRESS_CASES`: `margin-bottom` goes from `14px` to `16px`, and `margin-top: 0px` is added.
- `tests/setupStyles.ts` `TEXT_OL_CASES` and `TEXT_UL_CASES`: `margin: 0px` becomes `margin-top: 0px` and `margin-bottom: 16px`.
- `tests/src/styles/elements/heading.test.ts` (`resolves the calibrated heading family …`): `margin` goes from `0px` to `0px 0px 8px`.
- `tests/src/styles/components/type.test.ts` (`resolves the $twin class to the size and line …`): `margin` goes from `0px` to `0px 0px 8px`.
- `tests/src/styles/components/card.test.ts` (`paints an already active header tab into the cap and pulls each header navigation flush`):
  - Change: the pills `margin-bottom` expectation goes from `0` to `16`, with a comment.
  - Cause: the fixture is a bare `ul.card-header-pills` with no `.nav` class. `.card-header-pills` writes no block-end margin, so the list keeps the `ul` element's 1rem. The same markup reads 16px under Bootstrap's reboot.
  - Scope: the assertion still separates the pills, which write no bottom margin, from the tabs, which pull -8px.
- `tests/setupStyles.test.ts` (shared) export inventory: adds `FLOW_MARGIN` and `HEADING_MARGIN`.
- `tests/app/**` and `app/browser/**`: the `app:browser` project was green before any app edit, so no app test or layout changed.

## Gate table

Logs sit under `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/logs/`. The final run is `/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/flow-gates-2.sh`.

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | — | `format-check.log.txt` |
| `npm run lint:check` | 0 | — | `lint-check.log.txt` |
| `npm run check` | 0 | — | `check.log.txt` |
| `npm run build:src` | 0 | — | `build-src-2.log.txt` |
| Owned files plus `card.test.ts` (styles project) | 0 | 84 passed | `owned-final.log.txt` |
| `npm run test:conformance` | 0 | 26 passed | `conformance-2.log.txt` |
| `npm run test:src:styles` | 0 | 1474 passed | `src-styles-2.log.txt` |
| `npm run test:setup` | 0 | 321 passed | `setup-2.log.txt` |
| `npm run test:guides` | 0 | 20 passed | `guides-2.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser` | 0 | 222 passed | `app-browser-2.log.txt` |

The earlier run (`/home/user/scaffold/.orkestrel/veneer/units/flow-instruments/flow-gates.sh`, logs without the `-2` suffix) read two reds, and both are fixed in the preceding section:

- `src-styles`: `card.test.ts` failed.
- `setup`: the `setupStyles.test.ts` inventory failed.

The first `test:conformance` run (`conformance-1.log.txt`) printed the ledger rows to add and strike. It also failed `bundles no forbidden runtime …` because `dist/src/core` did not exist in the fresh worktree. `npm run build:src` created that output in the ignored `dist/` directory, which the guide names as the ledger refresh step. This is recorded as a choice that goes beyond the common file's `build:src:styles`.

## Shared-file hunks

The exact bytes are in `/home/user/scaffold/.orkestrel/veneer/units/flow.diff`.

- `src/styles/_mixins.scss`:

  ```diff
  @@ -17,7 +17,8 @@
   @mixin heading-text {
  -	margin: 0;
  +	margin-top: 0;
  +	margin-bottom: var(--vn-space-4);
  @@ -109,7 +110,8 @@
   @mixin list-space {
  -	margin: 0;
  +	margin-top: 0;
  +	margin-bottom: var(--vn-space-8);
   	padding-left: calc(var(--vn-space-8) * 2);
  ```

- `tests/setupStyles.test.ts`: adds `'FLOW_MARGIN',` after `'FLOAT_VALUES',` and `'HEADING_MARGIN',` after `'GRID_OFFSET_STEPS',` in the export inventory.
- `tests/setupStyles.ts` has two hunks:
  - `HEADING_MARGIN` and `FLOW_MARGIN`, with TSDoc, after `TEXT_MODES`.
  - The `TEXT_ADDRESS_CASES`, `TEXT_OL_CASES`, `TEXT_P_CASES`, and `TEXT_UL_CASES` value edits listed in the preceding section.
- `guides/veneer.md` changes three places:
  - Per-class tables `h1` to `h6` (§ Departures): each `.hN` `margin-top` row is struck. Each `.hN` `margin-bottom` row becomes ``| `0.5rem` | `var(--vn-space-4)` | tokenized |``.
  - `reboot` departures table: the `margin-top` rows for `h1` to `h6`, `p`, `ol`, and `ul` are struck. The `margin-bottom` rows become `tokenized`: `var(--vn-space-4)` for the headings, and `var(--vn-space-8)` for `p`, `address`, `ol`, and `ul`.
  - Additions table: the `h1 { margin }` to `h6 { margin }`, `p { margin }`, `ul { margin }`, `ol { margin }`, `address { margin }`, and `.h1 { margin }` to `.h6 { margin }` rows are struck.
- `app/browser/**`: untouched.

## Diff and status

- `/home/user/scaffold/.orkestrel/veneer/units/flow.diff` is `git diff 6882751`. It changes 13 files: 235 insertions and 67 deletions.
- `/home/user/scaffold/.orkestrel/veneer/units/flow-status.txt` is `git status --short`. It lists `M` for `guides/veneer.md`, `src/styles/_mixins.scss`, `src/styles/elements/_address.scss`, `src/styles/elements/_p.scss`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/components/card.test.ts`, `tests/src/styles/components/type.test.ts`, and `tests/src/styles/elements/{address,heading,ol,p,ul}.test.ts`.

## Deviation state

No stop. The unit settled these choices itself:

- It used longhands rather than the blockquote shorthand, so the ledger rows read `tokenized`.
- It dropped the `address` element's `margin-top: 0`, which matches the release.
- It fixed `card.test.ts` by correcting the expectation rather than by adding `.nav` to the fixture.
- It ran `npm run build:src` for the conformance runtime-boundary case.

Out of scope and left untouched: the `dl`, `dd`, `pre`, `hr`, and `figure` margins, which belong to the later unit.
