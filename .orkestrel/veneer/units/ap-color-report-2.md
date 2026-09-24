# Unit AP-COLOR round 2 report

`opus` on Opus 5.5, native, in `/home/user/veneer-apc` (uncommitted over `712ae72`). Brief: `/home/user/scaffold/.orkestrel/veneer/units/ap-color-brief-2.md`. Status: done, no stop.

Findings F1 to F7 are closed:
- Every acceptance gate exits 0.
- The journey's composed-contrast case passes in all four variants.
- Every mutation in Execution step 6 reddened its named proof, and each file was restored byte-identical.

The source is unchanged from round 1. `git diff 712ae72 -- src` matches the `src/` hunks of the round-1 `/home/user/scaffold/.orkestrel/veneer/units/apc.diff` exactly.

## Changes by file

Owned files:

- `tests/setup.ts` (F1): `UNDER_BAR` becomes `['dark|Outline dark|rest', 'light|Outline light|rest']`. Its remarks now state two things:
  - Each outline rest outside the neutral roles paints its role's on-canvas tier, which clears the bar in both modes.
  - The list therefore holds only the neutral outline rests, each on the canvas of its own tone.

  No other line changed.
- `tests/src/styles/utilities/color.test.ts`:
  - **Release-record case (F5).** Non-tier keys still compare against the release's recorded twin. Each tier key now compares, with `matchesColor`, against an independent twin painting the ruling's own mix: `color-mix(in oklab, var(--vn-color-<key>-base) 70%, var(--vn-text-body-base))`. The case also asserts that each tier key no longer equals the release's channel twin.
  - **Painted canvas (F4).** The identity and opacity fixtures now paint `background-color: var(--bs-body-bg)`.
  - **Retune proof (F4, F7).** It runs in each mode on a painted scope, with every override on the element that declares that mode's theme. It adds the following assertions, each a labeled `expect.soft`:
    - `token at the theme scope`: `--vn-color-primary-emphasis` at the theme scope moves `.text-primary`.
    - `alias on the element`: `--bs-primary-text-emphasis` on an element moves that element's `.text-primary`. A hard assertion confirms the sibling `.text-primary` stays unchanged.
    - `token below the theme scope leaves the text`.
    - `token below the theme scope moves the link`: the same element-level token override moves `.link-primary`. A pre-check asserts the link does not already paint the override color.
  - `afterEach` no longer clears root overrides, because the proof no longer sets any.
- `tests/src/styles/utilities/link.test.ts` (F3): the tier-link hover proof iterates `TEXT_TIER_CASES`. It computes the expected 80/20 sRGB weighting from an independent twin of the ruling's tier in the same scope, not from the link's own resting color. The contrast, focus, and opacity assertions are unchanged.
- `tests/src/styles/components/validation.test.ts` (F4): the tier proof's fixture paints the body background.
- `tests/src/styles/elements/a.test.ts` (F4): the anchor identity fixture paints the body background.

Shared files, report-only, rewritten into `/home/user/scaffold/.orkestrel/veneer/units/apc-shared-2.patch` from the final tree:

- `tests/setupStyles.ts` (F5):
  - `TEXT_TIER_SHARE` moves above `TEXT_TIER_CASES`.
  - `TEXT_TIER_CASES` values become the ruling's mix, `color-mix(in oklab, var(--vn-color-<key>-base) ${TEXT_TIER_SHARE}, var(--vn-text-body-base))`, and the doc block says why.
- `tests/setupStyles.test.ts` (F5):
  - Deleted: the template comparison, the `TEXT_TIER_SHARE` literal assertion, and the `indexOf('tertiary')` pin. The `TEXT_TIER_SHARE` import goes with them.
  - Added: `BUTTON_TIER_ROLES` equals, as a set, the tier keys plus `tertiary`, and it holds no neutral role.
  - Kept: the `LINK_ROLES` split, the tier-key membership in `TEXT_COLOR_CASES`, and the frozen checks.
- `guides/veneer.md` (F6):
  - The count "the two neutral links" is deleted.
  - The identity sentence reads "a role class outside the neutral roles and its emphasis class paint one color".
  - The link proof sentence is scoped to "each colored link outside the neutral roles".
  - The departure sentence reads "retune the `--vn-color-primary-base` fill or the `--vn-color-primary-emphasis` token at the scope that declares the theme, or the `--bs-primary-text-emphasis` alias, to move the text".
  - The `color.test.ts` proof sentence names the per-mode retune paths.

## Answer to the brief's unknown

`matchesColor` does separate an oklab hover mix from the sRGB one. The `hover-oklab` mutation turned the hover proof red for all six tier roles in both modes, at the weighting assertion (`link.test.ts:87`).

The tightening was needed for a different mutation, `tier-80-dark`. With the expected weighting taken from the link's own resting color, the hover proof stayed green under that mutation: every dark hover case passed. The reason is that the 80 percent hover still clears the bar and still moves the right way from its own rest. I observed that reading, and the first `hover-oklab` run (red at the old weighting assertion), in runs whose logs the reruns overwrote under the same names. Neither pre-tightening reading is retained.

The tightening computes the weighting from an independent twin of the ruling's tier instead. The proof's subject is unchanged: the hover is the tier moved 20 percent toward the emphasis text.

## Mutation table

The runner is `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-mutate-2.py`, a successor to `apc-mutate.py`. For each mutation it copies the file, applies the mutation, rebuilds the styles bundle, and runs the named proofs in one verbose Vitest run filtered by title. It then restores the copy and confirms the file is byte-identical.

The two mutations whose rows say "Run on the final test tree" ran after every test edit. The other six ran before the hover tightening; the tightening touched only the link hover proof, which none of those six runs. `oxfmt` ran over the changed files after every mutation run, before the final gates. Every log below ends with `restored …: byte-identical to pre-mutation copy = True`.

| Mutation | Proof | Reading | Log |
| --- | --- | --- | --- |
| The tier at 80 percent in dark: every tier role's emphasis token is overridden through `$retuned`, at 70% in light and 80% in dark. Run on the final test tree. | link rest | dark info 4.29 and dark danger 3.97, both under 4.5. The other dark roles and all light roles stay green. | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-mutation-tier-80-dark.log.txt` |
| same | link hover | all 6 dark cases red at the weighting assertion; light green | same |
| same | outline rest | dark: info 4.29, danger 3.97; light green | same |
| same | feedback and label | `invalid` dark: feedback 3.97 and checked label 3.97. `valid` stays green, because the dark success tier at 80% clears the bar. | same |
| `.text-danger` back on the channel | identity | red in light and dark (`danger: expected false to be true`) | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-mutation-danger-channel.log.txt` |
| `.text-primary` back on the channel | retune | Red in each mode at the `-rgb` assertion. `.text-primary` follows the channel to `rgb(20, 80, 140)`, where light should stay `rgb(8, 65, 234)` and dark `rgb(0, 172, 236)`. | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-mutation-primary-channel.log.txt` |
| The dark `'link'` back on `color-mix(in oklab, var(--vn-color-primary-base) 80%, var(--vn-text-body-base))` | anchor identity | dark red, light green | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-mutation-dark-link-80.log.txt` |
| The tier-link hover mixed `in oklab`. Run on the final test tree. | link hover | all 12 cases red in both modes, at the weighting assertion | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-mutation-hover-oklab.log.txt` |
| F7: `.text-<role>` inlines the tier mix, which removes the emphasis-token and alias paths | retune | Each mode: `token at the theme scope` red and `alias on the element` red. The fill, body, and channel assertions stay green. | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-mutation-text-inline-tier.log.txt` |
| F7: `.text-<role>` reads `--vn-color-<role>-emphasis` directly, which removes the alias path and the theme-scope substitution | retune | Each mode: `alias on the element` red, and `token below the theme scope leaves the text` red because the text moved to `color(srgb 0 0.352941 0.235294)` | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-mutation-text-reads-token.log.txt` |
| F7: `.link-<role>` reads `--bs-<role>-text-emphasis`, which removes the link's direct token read | retune | each mode: `token below the theme scope moves the link` red | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-mutation-link-reads-alias.log.txt` |

The logs support only these claims. Each mutation reddened the proofs named in its row, in the modes and for the roles listed, and no others were selected. The round-1 mutation logs (`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutation-*.log.txt`) remain as retained. They cover the text-contrast, opacity, neutral, and validation-tier proofs, and round 2 did not change those proofs' assertions.

## Gate table

The chain is `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final.sh`, run with `CAPTURE` unset. `tmp/capture/` was left in place.

| Gate | Result | Log |
| --- | --- | --- |
| `npm run format:check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final-format-check.log.txt` |
| `npm run lint:check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final-lint-check.log.txt` |
| `npm run check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final-check.log.txt` |
| `npm run test:src:styles` | exit 0; 1448 passed, 115 files | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final-test-src-styles.log.txt` |
| `npm run test:setup` | exit 0; 320 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final-test-setup.log.txt` |
| `npm run test:conformance` | exit 0; 26 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final-test-conformance.log.txt` |
| `npm run test:guides` | exit 0; 20 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final-test-guides.log.txt` |
| `npm run test:journey -- --reporter=verbose -t "measures the composed contrast"` | exit 0; the case passes in `journey:light-1280`, `journey:dark-1280`, `journey:light-390`, and `journey:dark-390` (4 passed, 244 skipped) | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final-test-journey.log.txt` |

An earlier dot-reporter journey run after the F1 edit alone also exited 0 with 4 passed (`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-journey.log.txt`). The failing reading before F1 is the Orchestrator's `apc-instruments/apc-capture.log.txt`.

`git diff 712ae72 --stat` names only owned and shared files: 15 files, 790 insertions, 253 deletions (`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-diffstat.txt`). `tests/setup.ts` is the one file added since round 1, and it is owned in this round. The whole journey and `npm test` were not run.

## Artifacts

- `/home/user/scaffold/.orkestrel/veneer/units/apc-2.diff`: `git diff 712ae72` over the owned files, `tests/setup.ts` included. It reverse-applies cleanly.
- `/home/user/scaffold/.orkestrel/veneer/units/apc-shared-2.patch`: `git diff 712ae72 -- tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md`, rewritten from the final tree. It reverse-applies cleanly.
- `/home/user/scaffold/.orkestrel/veneer/units/apc-2-status.txt`: `git status --short`.
- Instruments: `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-mutate-2.py`, `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-2/apc-2-final.sh`, and the round-1 `apc-run.sh` and `apc-scoped.sh`. Scoped runs are in `apc-2-scoped-1.log.txt` and `apc-2-scoped-2.log.txt`.

## Deviation state

No stop. Choices settled within scope:

- **Hover tightening.** The hover proof's expected weighting now starts from the ruling's tier, painted by an independent twin in the same scope, instead of from the link's own rest. That is what makes `tier-80-dark` redden it, and the proof's subject is unchanged.
- **`TEXT_TIER_CASES` values.** They changed from the class's own relative-color expression to the ruling's mix. This removes the self-comparison in the release-record case rather than deleting that check.
- **Soft assertions.** The F7 assertions are labeled `expect.soft`, so each mutation's log shows exactly which path went red.
- **Test titles.** The hover proof's title renders the role quoted (for example `'primary'`), because Vitest formats the `$key` interpolation that way. The `-t` substrings are unaffected.
