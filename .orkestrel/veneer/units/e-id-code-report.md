# E-ID-CODE report — `opus` on Opus 5.5, worktree `/home/user/veneer-eic`, baseline `ca83afb`

## Deviation state: stopped on an unowned change

The unit met every owned criterion. The following off-limits files require changes that the unit did not make.

1. **`tests/src/styles/index.test.ts` (off-limits).** The case "gives every styled tag the same treatment wherever
   the markup puts it" rejects the contextual rules the verdict ordered.
   - Expected: `npm run test:src:styles` exits 0.
   - Found: exit 1, `Tests 1 failed | 1439 passed (1440)`. `scanPositionalPairs` returns
     `["a > code", "kbd > kbd", "pre > code"]` against `[]`. Log: `tmp/units/logs/gate-test-src-styles.log.txt`.
   - Cause: the proof enforces the guide's paragraph (§ the styles axis, around line 3140, "A rule in the `elements`
     layer treats a tag by its name, never by where the markup puts that tag"). That paragraph allows only
     `MANDATED_TAG_PAIRS`, the pairs the HTML content model mandates. None of the verdict, the brief, or the
     common terms addresses the paragraph or the proof.
   - Done: the `pre code`, `a > code`, and `kbd kbd` rules ship, and their proofs and ledger rows are in place. Not done: the positional proof and
     the guide paragraph still state the old law. The unit edited neither.
   - Hypothesis: allow the release's own contextual pairs in the scan. For example, add a `RELEASE_TAG_PAIRS`
     table beside `MANDATED_TAG_PAIRS` in `tests/setupStyles.ts` (shared) holding `pre`/`code`, `a`/`code`, and
     `kbd`/`kbd`. Pass `[...MANDATED_TAG_PAIRS, ...RELEASE_TAG_PAIRS]` to `scanPositionalPairs` in the
     off-limits file. List the new export in `tests/setupStyles.test.ts`, and name the second exception in the
     guide paragraph. This is a design decision about the elements-layer law, so the unit did not apply it.
2. **`tests/app/browser/sections/ContentSection.test.ts` (off-limits).** This file lists every Content specimen's
   name, markup, and rendered element names. The brief asked for the Code block, Linked code, and Key combination
   specimens in `app/browser/constants.ts`, and adding them reddens that list.
   - Found: `npx vitest run --config vite.config.ts --no-cache --project app:browser
     tests/app/browser/sections/ContentSection.test.ts tests/app/browser/integration.test.ts` exits 1:
     `Tests 1 failed | 1 passed (2)`. Log: `tmp/units/logs/app-content.log.txt`.
   - Exact patch, not applied: `tmp/units/eic-contentsection.patch`. It passes `oxfmt --check`. Chromium's parser
     returns the patched markup and element names unchanged (`tmp/units/eic-specimen-check.mjs`, log
     `tmp/units/logs/specimen-check.log.txt`).

## Changes

- `src/styles/elements/_code.scss`:
  - Adds `pre code`: `font-size: inherit`, `color: inherit`, `word-break: normal`, and the chip cancelled with
    `padding: 0`, `background-color: transparent`, and `border-radius: 0`.
  - Adds `a > code`: `color: inherit`.
- `src/styles/elements/_kbd.scss`:
  - The keycap border reads `var(--bs-border-width)`.
  - Adds `kbd kbd`: `padding: 0` and `font-size: 1em`, and the keycap cancelled with
    `background-color: transparent` and `border: 0`.
- `src/styles/elements/_pre.scss`: the block border reads `var(--bs-border-width)`.
- `src/styles/elements/_samp.scss`: `samp` includes `code-surface(var(--vn-surface-raised))`, so it carries the
  family's chip corner, `--vn-radius-small`.
- `src/styles/_mixins.scss` (shared): `code-surface` takes a `$surface` parameter, defaulting to
  `var(--vn-surface-code)`. It answers the brief's unknown: the chip corner is one family decision, so `samp` reads
  it from the mixin rather than repeating it. The cancelling declarations need no mixin change and sit in the
  element partials.
- `tests/src/styles/elements/code.test.ts`: adds the linked-code case and the block-code case. Each compares the
  child with its parent.
- `tests/src/styles/elements/kbd.test.ts`: adds the nested-key case and the border-width hook case.
- `tests/src/styles/elements/pre.test.ts`: adds the border-width hook case.
- `tests/src/styles/elements/samp.test.ts`: pins the chip corner from the case table.
- `tests/setupStyles.ts` (shared): `TEXT_SAMP_CASES` carries `radius: 4`.
- `guides/veneer.md` (shared):
  - Deletes the `pre code`, `a > code`, and `kbd kbd` Excluded rows.
  - Adds the addition rows `pre code { padding }`, `pre code { background-color }`, `pre code { border-radius }`,
    `kbd kbd { background-color }`, `kbd kbd { border }`, and `samp { border-radius }`.
  - Updates the partial-table rows for `_code.scss` and `_kbd.scss`.
  - The rules `a > code`, `pre code { font-size, color, word-break }`, and `kbd kbd { padding, font-size }` write
    what the release writes, so the ledger measures no addition for them.
- `app/browser/constants.ts` (shared): adds the `Linked code`, `Code block`, and `Key combination` Content
  specimens beside `Code`, `Preformatted`, and `Keyboard`.

## Failing-first proofs

The command is `tmp/units/eic-run.sh <log> tests/src/styles/elements/{code,pre,kbd,samp}.test.ts`. It runs
`npm run build:src:styles`, then `npx vitest run --config configs/src/vite.styles.config.ts --no-cache <files>`.

| Stage | Result | Log |
| --- | --- | --- |
| Baseline, before the proofs | `Tests 8 passed (8)` | `tmp/units/logs/baseline.log.txt` |
| Proofs added, before the change | `Tests 10 failed \| 6 passed (16)` | `tmp/units/logs/red.log.txt` |
| After the change | `Tests 16 passed (16)` | `tmp/units/logs/green.log.txt` |

These proofs failed first, in the light and dark modes where the case runs per mode:

- code: "gives code inside a link the link color at rest and on hover in light/dark mode"
- code: "gives code inside a block the block size, color, and word breaking with no chip in light/dark mode"
- kbd: "sizes a nested key as its outer key and draws no keycap inside it in light/dark mode"
- kbd: "reads its border width from the release hook a scope retunes"
- pre: "reads its border width from the release hook a scope retunes"
- samp: "resolves the samp values in 'light'/'dark' mode", which gained the corner pin

## Mutations

The driver is `tmp/units/eic-mutate.py`, and its summary is `tmp/units/logs/mutation-summary.log.txt`. Each row's
log is `tmp/units/logs/mutation-<id>.log.txt`. Every mutation reddens only its named case, and every other case passes. The driver restores each partial from its saved bytes and checks the SHA-256. Every row reads
`identical`, and `sha256sum -c tmp/units/logs/owned-partials.sha256.txt` returns OK for every owned partial.

| Id | Mutation | Reddened case | Reading |
| --- | --- | --- | --- |
| m01 | drop `pre code { font-size }` | block code | `expected 11.025 to be 12.25` |
| m02 | drop `pre code { color }` | block code | color match `false` |
| m03 | drop `pre code { word-break }` | block code | `word-break: break-all` against `normal` |
| m04 | drop `pre code { padding }` | block code | padding `1.53125px 3.0625px` against `0px` |
| m05 | drop `pre code { background-color }` | block code | code surface `oklab(… / 0.12)` against transparent |
| m06 | drop `pre code { border-radius }` | block code | `4px` against `0px` |
| m07 | drop the `a > code` rule | linked code, resting assertion (code.test.ts, around line 46) | match `false` |
| m08 | `a > code` becomes `a:not(:hover) > code` | linked code, hover assertion (around line 50) | match `false` |
| m09 | drop `kbd kbd { font-size }` | nested key | `expected 10.7188 to be 12.25` |
| m10 | drop `kbd kbd { padding }` | nested key | padding `0.765625px 4.59375px` against `0px` |
| m11 | drop `kbd kbd { border }` | nested key | border widths `1px` against `0px` |
| m12 | drop `kbd kbd { background-color }` | nested key | keycap surface against transparent |
| m13 | `kbd` border reads `--vn-border-width` | kbd hook | `expected '1px' to be '3px'` |
| m14 | `pre` border reads `--vn-border-width` | pre hook | `expected '1px' to be '3px'` |
| m15 | `samp` restores its bare `background-color` line | samp values | `expected +0 to be 4` |

## Probe readings beside Bootstrap 5.3.8

The instrument is `tmp/units/eic-breakage-probe.mjs`, a copy of the design breakage probe. The copy points at this
worktree, keeps the code-family fixtures, and adds a child-against-parent relation line. The log is
`tmp/units/logs/eic-breakage-probe.log.txt`. The 390 and 1280 readings are identical.

| Fixture | Veneer | Bootstrap |
| --- | --- | --- |
| preformatted code | code 12.25 / pre 12.25; color equal; `word-break: normal`; padding 0; transparent | code 14 / pre 14; color equal; `normal`; 0; transparent |
| long preformatted line | same as preformatted code | same as preformatted code |
| linked code | code color equals anchor, `color(srgb 0.0510206 0.212902 0.672726)`; the chip stays (padding `1.575px 3.15px`, code surface) | code color equals anchor, `rgb(13, 110, 253)`; no chip |
| keyboard composition | inner 12.25 / outer 12.25; padding 0; border 0; transparent | inner 14 / outer 14; padding 0; border 0; `rgb(33, 37, 41)`, which matches the outer key |
| inline code and output | bare `code` and `samp` keep Veneer's chip (padding `1.575px 3.15px`, their surfaces) | no chip |

Every relationship matches Bootstrap's. The absolute differences that remain are Veneer's bare-element look under
the house rule: the size scale, the `pre` surface and inset, the linked code's chip, and the keycap.

The design round measured the pre-change relations at 11.025 against 12.25 for block code, the body color for
linked code, and 10.72 for a nested key. See `/home/user/scaffold/.orkestrel/veneer/units/e-identity-instruments/breakage-probe.log.txt`.

## Gates

The driver is `tmp/units/eic-gates.sh`, and its summary is `tmp/units/logs/gates-summary.log.txt`. The unit also ran
`npm run build:src:core` and `npm run build:src:browser`, because the conformance boundary case reads
`dist/src/core/index.js`. Log: `tmp/units/logs/build-src-core-browser.log.txt`.

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | all files formatted | `tmp/units/logs/gate-format-check.log.txt` |
| `npm run lint:check` | 0 | — | `tmp/units/logs/gate-lint-check.log.txt` |
| `npm run check` | 0 | — | `tmp/units/logs/gate-check.log.txt` |
| owned test files | 0 | `Tests 16 passed (16)` | `tmp/units/logs/gate-owned-files-run.log.txt` |
| `npm run test:src:styles` | **1** | `Tests 1 failed \| 1439 passed (1440)`, the positional case only | `tmp/units/logs/gate-test-src-styles.log.txt` |
| `npm run test:setup` | 0 | `Tests 319 passed (319)` | `tmp/units/logs/gate-test-setup.log.txt` |
| `npm run test:conformance` | 0 | `Tests 26 passed (26)` | `tmp/units/logs/gate-test-conformance.log.txt` |
| `npm run test:guides` | 0 | `Tests 20 passed (20)` | `tmp/units/logs/gate-test-guides.log.txt` |

Observation: `app:browser` reddens `ContentSection.test.ts` until its patch lands. See `tmp/units/logs/app-content.log.txt`.

## Shared-file hunks

Each shared file has one patch against `ca83afb`:

- `tmp/units/eic-shared-veneer.patch` (`guides/veneer.md`):
  - the `_code.scss` and `_kbd.scss` partial-table rows
  - the deletion of the `pre code`, `a > code`, and `kbd kbd` Excluded rows in § Deferred selectors
  - the addition rows after `code { overflow-wrap }` and `kbd { border }`, and the `samp { border-radius }` row
    after `samp { background-color }`
- `tmp/units/eic-shared-setupStyles.patch` (`tests/setupStyles.ts`): `radius: 4` in `TEXT_SAMP_CASES`.
- `tmp/units/eic-shared-_mixins.patch` (`src/styles/_mixins.scss`): the `code-surface($surface)` parameter and its
  comment. AP-TYPE also edits this file, so apply this hunk three-way.
- `tmp/units/eic-shared-constants.patch` (`app/browser/constants.ts`): the `Linked code`, `Code block`, and `Key combination` Content specimens.

Off-limits patch, not applied: `tmp/units/eic-contentsection.patch`.

## Artifacts

- Diff: `tmp/units/eic.diff` (`git diff ca83afb`)
- Status: `tmp/units/eic-status.txt`
