# E-ID-CODE round 3 report — `opus` on Opus 5.5, worktree `/home/user/veneer-eic`, baseline `ca83afb`

## Deviation state: none

Every criterion in `eic-brief-3.md` is met, and every gate exits 0. The `pre code`, `a > code`, and `kbd kbd` rules no
longer ship, and the positional law and its proof read as at `ca83afb`. The border-width hook, the `samp` corner, the
`code-surface` parameter, and the Content specimens stand.

## Changes

- `src/styles/elements/_code.scss` (owned): restored to its `ca83afb` text. The `pre code` and `a > code` rules are
  gone.
- `src/styles/elements/_kbd.scss` (owned): the `kbd kbd` rule is gone. The keycap border still reads
  `var(--bs-border-width)`.
- `tests/src/styles/elements/code.test.ts` (owned): restored to its `ca83afb` text. The linked-code and block-code
  cases are gone.
- `tests/src/styles/elements/kbd.test.ts` (owned): the nested-key case and its `TEXT_MODES` import are gone. The
  border-width hook case stays.
- `tests/src/styles/index.test.ts` (owned): restored to its `ca83afb` text. `git diff ca83afb` on this file is empty.
- `tests/setupStyles.ts` (shared): `RELEASE_TAG_PAIRS` and its TSDoc are gone. `radius: 4` in `TEXT_SAMP_CASES`
  stays.
- `tests/setupStyles.test.ts` (shared): restored to its `ca83afb` text. The import, the export-list entry, and the
  release-pair case are gone, so this file carries no hunk.
- `guides/veneer.md` (shared), rebuilt from its `ca83afb` text by `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-guide.py`:
  - The positional-law paragraph in § the styles axis and the `_code.scss` and `_kbd.scss` partial-table rows read as
    at `ca83afb`.
  - The `pre code`, `a > code`, and `kbd kbd` Excluded rows sit where `ca83afb` has them. Each reason keeps its
    `ca83afb` clause and adds "which the semantic-tags tenet in the `ROADMAP.md` file refuses".
  - The `pre code { padding }`, `pre code { background-color }`, `pre code { border-radius }`,
    `kbd kbd { background-color }`, and `kbd kbd { border }` addition rows are gone. The `samp { border-radius }`
    addition row stays.
- Unchanged from round 2: `src/styles/elements/_pre.scss` and its hook case, `src/styles/elements/_samp.scss` and
  `tests/src/styles/elements/samp.test.ts`, `src/styles/_mixins.scss`, `app/browser/constants.ts`, and
  `tests/app/browser/sections/ContentSection.test.ts`. No pinned specimen name changed. The `Linked code`,
  `Code block`, and `Key combination` specimens now show each tag's own treatment in its context.
- The round-2 observation about the `scanPositionalPairs` TSDoc (`/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/eic2-setupBrowser.patch`) is withdrawn.
  With only the mandated pairs exempt, the TSDoc is accurate as written.

## Failing-first proofs

Each proof was restored or edited before the rules were removed. The same command then ran green.

| Proof | Command | Red before the removal | Green after | Logs |
| --- | --- | --- | --- | --- |
| Positional scan, restored to `ca83afb` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/eic-run.sh <log> tests/src/styles/index.test.ts` | `Tests 1 failed \| 4 passed (5)`: `expected [ 'a > code', 'kbd > kbd', …(1) ] to deeply equal []` | `Tests 15 passed (15)` over the owned styles files | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-index-red.log.txt`, `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-owned-green.log.txt` |
| Deferral ledger, Excluded rows restored | `npm run test:conformance` | `Tests 7 failed \| 19 passed (26)`: `Excluded name pre code is present in …`, and `expected [ 'pre code', 'a > code', 'kbd kbd' ] to deeply equal []` | `Tests 26 passed (26)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-conformance-red.log.txt`, `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-conformance-green.log.txt` |

The hook and corner proofs keep their round-1 red readings (`/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/logs/red.log.txt`). This round re-ran their
mutations against the round-3 tree.

## Mutations

The driver is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-mutate.py`, and its summary is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-mutation-summary.log.txt`. Each row's
log is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-mutation-<id>.log.txt`. The driver saves the file's bytes before each mutation, restores
them afterwards, and compares SHA-256 digests.

| Id | Mutation | Reddened assertion | Reading | Restore |
| --- | --- | --- | --- | --- |
| m13 | the `kbd` border reads `--vn-border-width` | kbd: "reads its border width from the release hook a scope retunes"; `Tests 1 failed \| 2 passed (3)` | `expected '1px' to be '3px'` | identical |
| m14 | the `pre` border reads `--vn-border-width` | pre: "reads its border width from the release hook a scope retunes"; `Tests 1 failed \| 2 passed (3)` | `expected '1px' to be '3px'` | identical |
| m15 | `samp` restores its bare `background-color` line | samp: "resolves the samp values in 'light'/'dark' mode"; `Tests 2 failed (2)` | `expected +0 to be 4` | identical |
| m18 | re-adds `pre code { font-size: inherit; color: inherit }` | the positional scan, `Tests 1 failed \| 4 passed (5)`; conformance, `Tests 7 failed \| 19 passed (26)` | `expected [ 'pre > code' ] to deeply equal []`; `Excluded name pre code is present in …` | identical |
| m19 | re-adds `a > code { color: inherit }` | the positional scan, `Tests 1 failed \| 4 passed (5)`; conformance, `Tests 5 failed \| 21 passed (26)` | `expected [ 'a > code' ] to deeply equal []`; `Excluded name a > code is present in …` | identical |
| m20 | re-adds `kbd kbd { font-size: 1em }` | the positional scan, `Tests 1 failed \| 4 passed (5)`; conformance, `Tests 7 failed \| 19 passed (26)` | `expected [ 'kbd > kbd' ] to deeply equal []`; `Excluded name kbd kbd is present in …` | identical |

## Probe readings beside Bootstrap 5.3.8

The instrument is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/eic-breakage-probe.mjs`, unchanged from round 1, run against the round-3 cascade. The log
is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-breakage-probe.log.txt`. The 390 and 1280 readings are identical.

| Fixture | Veneer | Bootstrap |
| --- | --- | --- |
| preformatted code | code 11.025 / pre 12.25; color equal; `word-break: normal`; chip kept (padding `1.37812px 2.75625px`, code surface) | code 14 / pre 14; color equal; `normal`; padding 0; transparent |
| linked code | code keeps the code color, `oklch(0.208 0.042 265.755)`, against the anchor's `color(srgb 0.0510206 0.212902 0.672726)` | code color equals the anchor, `rgb(13, 110, 253)` |
| keyboard composition | inner 10.7188 / outer 12.25; padding `0.669922px 4.01953px`; border 1px; keycap surface | inner 14 / outer 14; padding 0; border 0; `rgb(33, 37, 41)` |

These readings are Addendum 2's stated behavior: code and keys keep their own treatment inside a block, a link, or a
key. Observation: the code family sizes by percentage, so nested code and keys compound. Code inside a block reads
0.9 of the block's size, and a nested key reads 0.875 of its outer key's size.

## Gates

The driver is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-gates.sh`, and its summary is `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gates-summary.log.txt`.

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | — | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gate-format-check.log.txt` |
| `npm run lint:check` | 0 | — | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gate-lint-check.log.txt` |
| `npm run check` | 0 | — | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gate-check.log.txt` |
| owned styles files (`index`, `code`, `pre`, `kbd`, `samp`) | 0 | `Tests 15 passed (15)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gate-owned-styles-run.log.txt` |
| `npm run test:src:styles` | 0 | `Tests 1434 passed (1434)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gate-test-src-styles.log.txt` |
| `npm run test:setup` | 0 | `Tests 319 passed (319)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gate-test-setup.log.txt` |
| `npm run test:conformance` | 0 | `Tests 26 passed (26)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gate-test-conformance.log.txt` |
| `npm run test:guides` | 0 | `Tests 20 passed (20)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gate-test-guides.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/ContentSection.test.ts tests/app/browser/integration.test.ts` | 0 | `Tests 2 passed (2)` | `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/r3-gate-app-content.log.txt` |

Acceptance checks:

- `git diff ca83afb --quiet -- tests/src/styles/index.test.ts` exits 0.
- `grep -nE '^\s*[a-z][a-z0-9]*\s*(>|\s)\s*[a-z]' src/styles/elements/_{code,pre,kbd,samp}.scss` matches nothing.
- `RELEASE_TAG_PAIRS` appears in no `.ts` or `.md` file outside `node_modules`, `dist`, and `tmp`.

No timing failure occurred.

## Shared-file hunks

Each patch is taken against `ca83afb` and supersedes the round-1 and round-2 patches for the same file.

- `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-shared-veneer.patch` (`guides/veneer.md`):
  - the `pre code`, `a > code`, and `kbd kbd` Excluded reasons in § Deferred selectors, each citing the semantic-tags
    tenet
  - the `samp { border-radius }` addition row, after `samp { background-color }`
- `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-shared-setupStyles.patch` (`tests/setupStyles.ts`): `radius: 4` in `TEXT_SAMP_CASES`.
- `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-shared-_mixins.patch` (`src/styles/_mixins.scss`): the `code-surface($surface)` parameter and its
  comment, unchanged from round 1. AP-TYPE also edits this file, so apply this hunk three-way.
- `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-shared-constants.patch` (`app/browser/constants.ts`): the `Linked code`, `Code block`, and
  `Key combination` Content specimens, unchanged from round 1.
- `tests/setupStyles.test.ts`: no hunk. The file matches `ca83afb`.

## Artifacts

- Diff: `/home/user/scaffold/.orkestrel/veneer/units/eic-3.diff` (`git diff ca83afb`)
- Status: `/home/user/scaffold/.orkestrel/veneer/units/eic-3-status.txt`. Every modified path is an owned or shared file from an earlier round.
- Instruments: `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-guide.py`, `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-mutate.py`, `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r3/eic3-gates.sh`
