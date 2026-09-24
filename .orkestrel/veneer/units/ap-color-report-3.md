# Unit AP-COLOR round 3 report

`opus` on Opus 5.5, native, in `/home/user/veneer-apc` (uncommitted over `712ae72`). Brief: `/home/user/scaffold/.orkestrel/veneer/units/ap-color-brief-3.md`. Status: done, no stop.

H1 to H6 are closed:
- Every acceptance gate exits 0.
- Both mutations in step 3 reddened their named proofs, and each file was restored byte-identical.
- `git diff 712ae72 -- src` still equals the `src/` hunks of the round-1 `apc.diff` (`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-src-check.txt`: `src equals round-1: True`).

## Changes by site

Owned files:

- **H1:** `tests/src/styles/utilities/color.test.ts`, the retune test. The single retune `it.each` is split into four `it.each(TEXT_MODES)` cases. Each case mounts its own fixture on a painted scope. Every assertion of the round-2 test is kept in one of the four:
  - **"leaves a role color on its tier when the role channels or the density factor are retuned, in %s mode"** holds the density check and the `-rgb` check. The `.text-bg-primary` consumer moves to `rgb(20, 80, 140)` and `.text-primary` stays unchanged.
  - **"moves a role color to the tier of a fill or body text retuned at the scope declaring the %s theme"** holds the fill check and the body-text check. Each is asserted against its independent `color-mix()` twin, and `.text-primary-emphasis` must match the retuned fill.
  - **"moves a role color to an emphasis token retuned at the scope declaring the %s theme, and to an alias retuned on its own element"** holds `token at the theme scope` and `alias on the element`. The sibling `.text-primary` stays unchanged. A pre-check asserts that the resting color is not the override color.
  - **"leaves a role color and moves the colored link when the emphasis token is retuned below the scope declaring the %s theme"** holds `token below the theme scope leaves the text` and `token below the theme scope moves the link`. A pre-check asserts that the link does not already paint the override color.
- **H6:** `tests/src/styles/utilities/color.test.ts` gains the case "keeps each emphasis class opaque under an opacity step and fades the role class beside it, in %s mode". It runs in each mode on a painted scope and covers every tier role. It asserts that `.text-<role>-emphasis.text-opacity-50` paints alpha `1` and that `.text-<role>.text-opacity-50` paints alpha `0.5`.
- **Mutation runner:** `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-mutate-2.py` is extended:
  - The `retune` proof selects the four split cases by title.
  - Added: the `release record` and `emphasis opacity` proofs, the `danger-channel-record` and `emphasis-opacity` mutations, and an optional log-prefix argument (default `apc-2`, so its round-2 log names are unchanged).
  - Every round-2 log remains as retained.

Shared files, report-only, rewritten into `/home/user/scaffold/.orkestrel/veneer/units/apc-shared-3.patch` from the final tree:

- **H3:** `guides/veneer.md`, the anchor proof sentence in § Tokens, now ends "…against the recorded readings of `--vn-link-base` and `--vn-link-hover-base`, and its resting color against the `.text-primary` class in each mode". The paragraph is rewrapped to the guide's 100-column width.
- **H4:** `guides/veneer.md`, the `color.test.ts` proof paragraph in § Color utilities. The retune sentence is split into one-idea sentences, following the round-2 subjective verdict's G2:
  - "It also reads each such role color at or above 4.5 to 1 against the page and equal to its emphasis class, the neutral roles on their own channels, the opacity steps over the tier's channels, and the emphasis class staying opaque under an opacity step."
  - "In each mode it retunes the role fill, the body text, and the emphasis token at the scope that declares the theme, and the alias on the element, and reads each one moving the role color."
  - "It reads a retuned role channel leaving the role color, and the emphasis token retuned below the theme scope leaving the role color and moving the colored link."
- **H4:** G2 names further paragraphs, all rewrapped to 100 columns: the `link.test.ts` proof paragraph that follows, the anchor paragraph in § Tokens, and the outline-button paragraph in § Button.
- `tests/setupStyles.ts` and `tests/setupStyles.test.ts` are unchanged since round 2.

## H2: where the retune overrides sit

The round-2 report said every override sat on the element that declares the mode's theme, and that the proof set no root override. Both statements were too wide. The overrides sit as follows:
- **Theme-dependent color overrides** sit on the scope that declares the mode's theme, the `[data-bs-theme]` element: `--vn-color-primary-rgb`, `--vn-color-primary-base`, `--vn-text-body-base`, and the theme-scope `--vn-color-primary-emphasis`.
- **The density control** keeps its root override. `TOKEN_NAMES.factor.density` is set on `document.documentElement`, where the factor is declared, and removed in a `finally` block.
- **The F7 overrides** sit on descendants of the theme scope by design, because their subject is the element-level path: `--bs-primary-text-emphasis` on `#local`, and `--vn-color-primary-emphasis` on `#local` and `#local-link`.

## Mutation logs

The runner is `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-mutate-2.py <name> apc-3`. Every log below ends with `restored …: byte-identical to pre-mutation copy = True`.

The first two rows are the mutations step 3 requires:

| Mutation | Proof | Reading | Log |
| --- | --- | --- | --- |
| `.text-danger` back on the channel | release-record case | Red in light and dark. `danger tier` and `danger channel` each read the wrong value (`expected false to be true`, `expected true to be false`). | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-mutation-danger-channel-record.log.txt` |
| The emphasis class reads `rgb(from var(--bs-<role>-text-emphasis) r g b / var(--bs-text-opacity, 1))` | emphasis-opacity proof | Red in light and dark. The emphasis alpha reads `0.5` where `1` is required, for primary, secondary, success, info, warning, and danger. | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-mutation-emphasis-opacity.log.txt` |

I also re-ran the four round-2 retune mutations against the split cases. The brief did not require these runs. They show that each path still reddens under its new title:

| Mutation | Split cases red, in both modes | Split cases green | Log |
| --- | --- | --- | --- |
| `.text-primary` back on the channel | Channels-and-density (`-rgb`). Fill-and-body (`expected 'rgb(8, 65, 234)' not to be …`). Token-and-alias (both soft labels). | the below-scope case | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-mutation-primary-channel.log.txt` |
| `.text-<role>` inlines the tier mix | Token-and-alias (`token at the theme scope`, `alias on the element`) | the other three cases | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-mutation-text-inline-tier.log.txt` |
| `.text-<role>` reads `--vn-color-<role>-emphasis` directly | Token-and-alias (`alias on the element`). Below-scope (`token below the theme scope leaves the text`). | channels-and-density, fill-and-body | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-mutation-text-reads-token.log.txt` |
| `.link-<role>` reads `--bs-<role>-text-emphasis` | Below-scope (`token below the theme scope moves the link`) | the other three cases | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-mutation-link-reads-alias.log.txt` |

The logs support only these claims. Each mutation reddened the proofs in its row, in both modes, and no other proofs were selected.

## Gate table

The chain is `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final.sh`, run with `CAPTURE` unset.

| Gate | Result | Log |
| --- | --- | --- |
| `npm run format:check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final-format-check.log.txt` |
| `npm run lint:check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final-lint-check.log.txt` |
| `npm run check` | exit 0 | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final-check.log.txt` |
| `npm run test:src:styles` | exit 0; 1456 passed, 115 files | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final-test-src-styles.log.txt` |
| `npm run test:setup` | exit 0; 320 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final-test-setup.log.txt` |
| `npm run test:conformance` | exit 0; 26 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final-test-conformance.log.txt` |
| `npm run test:guides` | exit 0; 20 passed | `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final-test-guides.log.txt` |

A scoped run of `color.test.ts` after the split also passed: 23 passed (`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-scoped-1.log.txt`).

`git diff 712ae72 --stat` names only owned and shared files: 15 files, 883 insertions, 274 deletions (`/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-diffstat.txt`). The journey and `npm test` were not run, as the brief directs.

## Artifacts

- `/home/user/scaffold/.orkestrel/veneer/units/apc-3.diff`: `git diff 712ae72` over the owned files. It reverse-applies cleanly.
- `/home/user/scaffold/.orkestrel/veneer/units/apc-shared-3.patch`: `git diff 712ae72 -- tests/setupStyles.ts tests/setupStyles.test.ts guides/veneer.md`, rewritten from the final tree. It reverse-applies cleanly.
- `/home/user/scaffold/.orkestrel/veneer/units/apc-3-status.txt`: `git status --short`.
- Instruments:
  - `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-final.sh`, which succeeds `apc-2-final.sh` without the journey step.
  - `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-mutate-2.py`, as extended.
  - `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-src.diff` with its check file `/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-src-check.txt`.

## Deviation state

No stop. Choices settled within scope:

- **Fixtures.** Each split case mounts only the elements its path reads.
- **Guide wrapping.** The rewrap used a 100-column fill that keeps every code span unbroken, then `oxfmt`. `format:check` and `test:guides` pass on the result.
- **Runner.** I extended `apc-mutate-2.py` in place, as step 3 names it, rather than writing a successor file. The file's header records what round 3 changed.
