# E-ID-CODE round 2 report — `opus` on Opus 5.5, worktree `/home/user/veneer-eic`, baseline `ca83afb`

## Deviation state: none

Every criterion in `eic-brief-2.md` is met, and every gate exits 0. Round 1's changes stand unchanged. This round adds
the release tag pairs, the guide exception, and the Content section patch.

## Changes

- `tests/setupStyles.ts` (shared): adds `RELEASE_TAG_PAIRS` after `MANDATED_TAG_PAIRS`. It holds `pre`/`code`,
  `a`/`code`, and `kbd`/`kbd`, and each pair is frozen. Its TSDoc names Bootstrap 5.3.8's reboot as the source. A pair
  belongs in the table only when the release's `scss/_reboot.scss` file writes it. The pairs were checked against
  `node_modules/bootstrap/scss/_reboot.scss` (5.3.8): the nested `code` under `pre`, the `a > &` under `code`, and
  the nested `kbd` under `kbd`.
- `tests/setupStyles.test.ts` (shared):
  - imports `RELEASE_TAG_PAIRS` and adds it to the sorted export list;
  - adds the case "holds the tag pairs the release reboot writes, frozen, and none of them a mandated pair". It pins
    the value, checks that the table and each pair are frozen, and checks that no release pair repeats a mandated
    pair.
- `tests/src/styles/index.test.ts` (owned): passes `[...MANDATED_TAG_PAIRS, ...RELEASE_TAG_PAIRS]` to
  `scanPositionalPairs`. The case title becomes "gives every styled tag the same treatment wherever the markup puts
  it, outside the mandated and release pairs", which names what the assertion proves.
- `guides/veneer.md` (shared): the paragraph that opens "A rule in the `elements` layer treats a tag by its name" names
  both exceptions: the mandated pairs, and the pairs Bootstrap 5.3.8's reboot writes a contextual rule for. It points
  at the `RELEASE_TAG_PAIRS` constant and names each pair. The wording avoids "first" and "second" exception, because
  `AGENTS.md` § Writing forbids naming an item by its position.
- `tests/app/browser/sections/ContentSection.test.ts` (owned): applies `tmp/units/eic-contentsection.patch` unchanged.
  It pins the `Linked code`, `Code block`, and `Key combination` specimens by name, markup, and rendered element
  names.

## Failing-first proofs

The driver is `tmp/units/eic2-red.sh <stage>`. It runs
`npx vitest run --config vite.config.ts --no-cache --project setup tests/setupStyles.test.ts` and then
`tmp/units/eic-run.sh <log> tests/src/styles/index.test.ts`. The tests were edited before the constant existed.

| Proof | Red before the change | Green after | Logs |
| --- | --- | --- | --- |
| setup: export list and the release-pair pin | `Tests 2 failed \| 151 passed (153)` | `Tests 153 passed (153)` | `tmp/units/logs/r2-setup-red.log.txt`, `tmp/units/logs/r2-setup-green.log.txt` |
| styles: positional scan (`index.test.ts`) | exit 1, the module "does not provide an export named 'RELEASE_TAG_PAIRS'". Round 1 took the assertion-level red on the same case, `["a > code", "kbd > kbd", "pre > code"]` against `[]`: `tmp/units/logs/gate-test-src-styles.log.txt` | `Tests 5 passed (5)` | `tmp/units/logs/r2-index-red.log.txt`, `tmp/units/logs/r2-index-green.log.txt` |
| app: Content section and integration | round 1, `Tests 1 failed \| 1 passed (2)` with the specimens added and the section test unpatched | `Tests 2 passed (2)` | `tmp/units/logs/app-content.log.txt`, `tmp/units/logs/r2-gate-app-content.log.txt` |

## Mutations

The driver is `tmp/units/eic2-mutate.py`, and its summary is `tmp/units/logs/r2-mutation-summary.log.txt`. The driver
saves the file's bytes before each mutation, restores them, and compares SHA-256 digests. Both rows read `identical`.
The restored digests are in `tmp/units/logs/r2-mutated-files.sha256.txt`.

| Id | Mutation | Reddened assertion | Reading | Log | Restore |
| --- | --- | --- | --- | --- | --- |
| m16 | adds `kbd code { color: inherit }` to `src/styles/elements/_code.scss`, a positional rule outside both tables | the positional scan in `index.test.ts`; `Tests 1 failed \| 4 passed (5)` | `expected [ 'kbd > code' ] to deeply equal []` | `tmp/units/logs/r2-mutation-m16-added-pair-kbd-code.log.txt` | identical |
| m17 | drops `['kbd', 'kbd']` from `RELEASE_TAG_PAIRS` | the positional scan, and the setup pin; setup reads `Tests 1 failed \| 152 passed (153)` | `expected [ 'kbd > kbd' ] to deeply equal []`, and the pin reads `[ [ 'pre', 'code' ], [ 'a', 'code' ] ]` against the full table | `tmp/units/logs/r2-mutation-m17-dropped-release-pair.log.txt` | identical |

## Gates

The driver is `tmp/units/eic2-gates.sh`, and its summary is `tmp/units/logs/r2-gates-summary.log.txt`.

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | — | `tmp/units/logs/r2-gate-format-check.log.txt` |
| `npm run lint:check` | 0 | — | `tmp/units/logs/r2-gate-lint-check.log.txt` |
| `npm run check` | 0 | — | `tmp/units/logs/r2-gate-check.log.txt` |
| owned styles files (`index`, `code`, `pre`, `kbd`, `samp`) | 0 | `Tests 21 passed (21)` | `tmp/units/logs/r2-gate-owned-styles-run.log.txt` |
| `npm run test:src:styles` | 0 | `Tests 1440 passed (1440)` | `tmp/units/logs/r2-gate-test-src-styles.log.txt` |
| `npm run test:setup` | 0 | `Tests 320 passed (320)` | `tmp/units/logs/r2-gate-test-setup.log.txt` |
| `npm run test:conformance` | 0 | `Tests 26 passed (26)` | `tmp/units/logs/r2-gate-test-conformance.log.txt` |
| `npm run test:guides` | 0 | `Tests 20 passed (20)` | `tmp/units/logs/r2-gate-test-guides.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/ContentSection.test.ts tests/app/browser/integration.test.ts` | 0 | `Tests 2 passed (2)` | `tmp/units/logs/r2-gate-app-content.log.txt` |

No timing failure occurred.

## Shared-file hunks

Each patch is taken against `ca83afb` and supersedes the round-1 patch for the same file.

- `tmp/units/eic2-shared-setupStyles.patch` (`tests/setupStyles.ts`):
  - `radius: 4` in `TEXT_SAMP_CASES` (round 1)
  - `RELEASE_TAG_PAIRS` and its TSDoc, after `MANDATED_TAG_PAIRS`
- `tmp/units/eic2-shared-setupStyles-test.patch` (`tests/setupStyles.test.ts`):
  - the `RELEASE_TAG_PAIRS` import, after `REFERENCE_MARKUP`
  - the `'RELEASE_TAG_PAIRS'` export-list entry, after `'REFERENCE_MARKUP'`
  - the release-pair case, after "freezes each mandated pair as a distinct ancestor and descendant written once"
- `tmp/units/eic2-shared-veneer.patch` (`guides/veneer.md`):
  - the `_code.scss` and `_kbd.scss` partial-table rows (round 1)
  - the positional-law paragraph in § the styles axis, which names both exceptions
  - the deletion of the `pre code`, `a > code`, and `kbd kbd` Excluded rows (round 1)
  - the addition rows (round 1)
- `tmp/units/eic2-shared-_mixins.patch` (`src/styles/_mixins.scss`): unchanged from round 1. AP-TYPE also edits this
  file, so apply this hunk three-way.
- `tmp/units/eic2-shared-constants.patch` (`app/browser/constants.ts`): unchanged from round 1.

## Observation for the Orchestrator: off-limits patch, not applied

The TSDoc for the `mandated` parameter of `scanPositionalPairs` in `tests/setupBrowser.ts` (off-limits) describes only
the content-model pairs. It says "the markup has nowhere else to write that child", which is false for a release pair.
The patch `tmp/units/eic2-setupBrowser.patch` rewrites that TSDoc to name both tables, and `git apply --check`
accepts it. Hypothesis: renaming the parameter to `exempt` would fit the widened meaning. That rename is an API-shape
decision, so this unit left it out of the patch.

## Artifacts

- Diff: `tmp/units/eic-2.diff` (`git diff ca83afb`)
- Status: `tmp/units/eic-2-status.txt`. Every modified path is an owned or shared file from round 1 or round 2.
