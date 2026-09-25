# TOKEN-PROOFS report

Every group the brief names has an ancestor-override case in `tests/src/styles/tokens.test.ts`, and each case goes red under its mutation. The form group moves its shipped consumers only when the override sits on a mode scope. An override on any other ancestor leaves the `.is-valid`, `.is-invalid`, and feedback paint unchanged. The cases set the form token on a `data-bs-theme` ancestor and record why. The duplicate stacking rows in § Tokens are merged into one. Every acceptance gate reads green; `npm run test:policy` needed a re-run after a timeout under load (see the gate table).

## Evidence re-readings

I re-ran the brief's search, `grep -rln -- "var(--TOKEN)" src/styles`, in `/home/user/veneer-tkp` at `2376710`. The following readings differ from the brief:

- `--vn-link-base` and `--vn-link-decoration` are also read in `src/styles/_tokens.scss`: a `link-hover` map value and the `--bs-link-decoration` alias. `--vn-link-decoration` is not read in `_mixins.scss`.
- `--vn-form-valid` and `--vn-form-invalid` have no validation mixin in `_mixins.scss`. Their only readers there are the `--bs-form-{valid,invalid}-color` and `-border-color` alias declarations inside the `theme-tokens` mixin. That mixin is emitted at `:root` and at each `[data-bs-theme]` scope. The `.is-valid`, `.is-invalid`, `.valid-feedback`, and `.invalid-feedback` rules are in `src/styles/components/_validation.scss`, and they read those aliases rather than the token.
- `--vn-state-mixer` is also declared by the `theme-tokens` mixin (the `_mixins.scss` hit), and its readers are the partials the brief names.
- `--vn-ease-standard` is read by `_form-select.scss`, `_form-range.scss`, `_form-control.scss`, `_form-check.scss`, `_carousel.scss`, and `_icon-link.scss`, besides `elements/_button.scss` and `components/_button.scss`. This matches the brief's "form, carousel, and icon-link partials".
- The brief's command `npx vitest run --project src:styles tests/src/styles/tokens.test.ts` exits with `No projects matched the filter "src:styles"`, because the root `vite.config.ts` registers no `src:styles` project. I ran `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts` in its place. That file names its project `src:styles`.
- The factor override cases and the duplicate stacking rows match the brief.

Baseline before any edit: the tokens command passed 32 cases.

## Unknowns

- **Consumer of `--vn-weight-heading`:** I chose the `dt` tag. `elements/_dl.scss` declares its weight in one rule that reads the token directly, with no shared mixin. The browser's default `dt` weight is `normal`, so a missing rule can't match either asserted value. By contrast, a `th` and a heading tag have a browser default of `bold` (700). The heading mixin also feeds `.h1`–`.h6`, so a plant there would affect every class that includes it.
- **`--vn-state-mixer` on `.btn:hover`:** it moves a resolved paint. With `--vn-state-mixer: rgb(255, 0, 0)` on the ancestor, the hovered inside `.btn` paints `rgb(255 0 0 / 0.12)`. The hovered twin paints `color(srgb 0.00742457 0.0232852 0.0925134 / 0.12)`.
- **Form reach (found while measuring):** I set `--vn-form-valid: rgb(200, 30, 40)` on a plain `div` ancestor. The inside `.is-valid` border and `.valid-feedback` color stayed at `oklab(0.4313 -0.0943551 0.0412221)`, the same as the twin. The same inline override on a `data-bs-theme="light"` ancestor moved the border and the feedback to `rgb(200, 30, 40)`. The invalid pair behaves the same way. The `--bs-form-*` alias resolves where it is declared (each mode scope), so an override reaches it only from a mode scope. That matches where § Customization places overrides. The form cases use a mode-scope ancestor and say why in a comment. Every other group moves from a plain ancestor.

## Cases

The cases are in `describe('ancestor token overrides')` in `tests/src/styles/tokens.test.ts`:

- repaints a link and a link button inside an ancestor that overrides the link color, and leaves a twin on the rest color
- repaints a hovered link and link button inside an ancestor that overrides the link hover color, and leaves a hovered twin on the rest hover color
- redecorates a link and a link button at rest and under hover inside an ancestor that overrides the link decoration, and leaves a twin underlined
- recolors the border and the feedback of a valid control inside a mode scope that overrides the valid color, and leaves a twin on the rest color
- recolors the border and the feedback of an invalid control inside a mode scope that overrides the invalid color, and leaves a twin on the rest color
- deepens the hover fill of a button inside an ancestor that overrides the hover mix, and leaves a hovered twin on the rest mix
- deepens the pressed fill of a button inside an ancestor that overrides the active mix, and leaves a pressed twin on the rest mix
- retints the hover fill of a button inside an ancestor that overrides the state mixer, and leaves a hovered twin on the rest mixer
- fades a disabled button inside an ancestor that overrides the button opacity, and leaves a disabled twin at the rest opacity
- reweights a description term inside an ancestor that overrides the heading weight, and leaves a twin at the rest weight
- retimes the transitions of a button inside an ancestor that overrides the standard easing, and leaves a twin on the rest easing

Each case asserts the twin first and the inside consumer second. Under a plant, the twin's rest reading passes before the inside reading fails. Hover and press use the real pointer (`hoverAccessible`, `holdAccessible`) with motion reduced through `stageMedia`. The block's `afterEach` calls `releasePointer` and `releaseMedia`. Every asserted literal is a reading taken in this worktree. No helper was needed, so the shared setup files are unchanged.

## Mutation table

- **Driver:** `tmp/units/tkp-plant.py`. For each plant it backs up the partial, writes the consumer's declaration as a literal equal to its resolved rest value, runs `npm run build:src:styles`, and runs `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t '<title pattern>'`. It then restores from the backup and records `cmp` and `git diff --stat -- src/styles`.
- **Logs:** each plant logs to `tmp/units/tkp-plant-<name>.log.txt`. `tmp/units/tkp-plant-rebuild.log.txt` records the final rebuild of the restored cascade.
- **Split plants:** where a case asserts a link and a link button, or a control and its feedback, each consumer has its own plant, so each assertion is shown to be load-bearing.

| Group · plant | Plant (partial: declaration → literal) | `-t` pattern | Failing assertion (line: reading) | Restored |
| --- | --- | --- | --- | --- |
| link-base-anchor | `elements/_a.scss`: `rgb(from var(--vn-link-base) …` → `rgb(from color(srgb 0.0510206 0.212902 0.672726) …` | `overrides the link color` | 711: `insideLink` color, `expected false to be true` | `cmp` identical; diffstat empty |
| link-base-button | `components/_button.scss`: `--bs-btn-color: var(--vn-link-base)` → the same literal | `overrides the link color` | 712: `insideButton` color | identical; empty |
| link-hover-anchor | `elements/_a.scss`: `rgb(from var(--vn-link-hover-base) …` → `color(srgb 0.0331634 0.138386 0.437272)` | `overrides the link hover color` | 740: hovered `insideLink` color | identical; empty |
| link-hover-button | `components/_button.scss`: `--bs-btn-hover-color: var(--vn-link-hover-base)` → the same literal | `overrides the link hover color` | 743: hovered `insideButton` color | identical; empty |
| link-decoration-anchor | `elements/_a.scss`: `text-decoration: var(--vn-link-decoration)` → `underline` | `overrides the link decoration` | 760: `expected 'underline' to be 'overline'` (`insideLink`) | identical; empty |
| link-decoration-button | `components/_button.scss`: each `text-decoration: var(--vn-link-decoration)` → `underline` | `overrides the link decoration` | 761: `expected 'underline' to be 'overline'` (`insideButton`) | identical; empty |
| form-valid-border | `_mixins.scss`: `--bs-form-valid-border-color: var(--vn-form-valid)` → `oklab(0.4313 -0.0943551 0.0412221)` | `overrides the valid color` | 804: `insideControl` border-top-color | identical; empty |
| form-valid-feedback | `_mixins.scss`: `--bs-form-valid-color: var(--vn-form-valid)` → the same literal | `overrides the valid color` | 807: `insideFeedback` color | identical; empty |
| form-invalid-border | `_mixins.scss`: `--bs-form-invalid-border-color: var(--vn-form-invalid)` → `oklab(0.4159 0.131299 0.0563228)` | `overrides the invalid color` | 831: `insideControl` border-top-color | identical; empty |
| form-invalid-feedback | `_mixins.scss`: `--bs-form-invalid-color: var(--vn-form-invalid)` → the same literal | `overrides the invalid color` | 834: `insideFeedback` color | identical; empty |
| state-hover | `components/_button.scss` `.btn`: `--bs-btn-hover-bg` mix weight `var(--vn-state-hover)` → `12%` | `overrides the hover mix` | 861: hovered `inside` background-color | identical; empty |
| state-active | `components/_button.scss` `.btn`: `--bs-btn-active-bg` mix weight `var(--vn-state-active)` → `22%` | `overrides the active mix` | 889: pressed `inside` background-color | identical; empty |
| state-mixer | `components/_button.scss` `.btn`: `--bs-btn-hover-bg` mixer `var(--vn-state-mixer)` → `color(srgb 0.00742457 0.0232852 0.0925134)` | `overrides the state mixer` | 911: hovered `inside` background-color | identical; empty |
| button-opacity | `components/_button.scss`: `--bs-btn-disabled-opacity: var(--vn-button-opacity)` → `0.65` | `overrides the button opacity` | 923: `expected '0.65' to be '0.3'` | identical; empty |
| weight-heading | `elements/_dl.scss`: `font-weight: var(--vn-weight-heading)` → `600` | `overrides the heading weight` | 935: `expected '600' to be '800'` | identical; empty |
| ease-standard | `components/_button.scss`: every `var(--vn-ease-standard)` in `.btn` → `ease` | `overrides the standard easing` | 947: `expected 'ease, ease, ease, ease, ease' to be 'linear, …'` | identical; empty |

Every plant log reads `AssertionError` and `Tests 1 failed | 42 skipped (43)`. In every plant log, the failing line is the inside consumer the plant cut, and the twin's assertions come before it in the case. After the final restore, `git status --short` lists only the owned files.

## Gate table

| Gate | Log | Reading |
| --- | --- | --- |
| `npm run check` | `tmp/units/tkp-check.log.txt` | `exit=0` |
| `npm run lint:check` | `tmp/units/tkp-lint-check.log.txt` | `exit=0` |
| `./node_modules/.bin/oxfmt --config .oxfmtrc.json` on the owned files, with before and after `sha256sum -c` | `tmp/units/tkp-oxfmt.log.txt` | `exit=0`; `tokens.test.ts` and `veneer.md` read `OK` (unchanged) |
| `npm run build:src:styles` then `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts --reporter=verbose` | `tmp/units/tkp-tokens.log.txt` | `Tests 43 passed (43)`, `exit=0` |
| `npm run test:guides` | `tmp/units/tkp-test-guides.log.txt` | `Tests 20 passed (20)`, `exit=0` |
| `npm run test:policy` (first run) | `tmp/units/tkp-test-policy.log.txt` | `exit=1`: `enforces the workspace policy laws including surface ownership` hit `Test timed out in 5000ms` while the host load average was about 20 on 4 CPUs. Recorded as a timing observation and not diagnosed. |
| `npm run test:policy` (re-run) | `tmp/units/tkp-test-policy-2.log.txt` | `Tests 109 passed \| 1 skipped (110)`, `exit=0` |
| Observation: `npm run test:src:styles` | `tmp/units/tkp-test-src-styles.log.txt` | `Test Files 115 passed (115)`, `Tests 1516 passed (1516)`, `exit=0` |

The stacking-row merge broke no case. The reference-map value case and the `test:guides` parity case pass after the merge.

## Diff and status

- `tmp/units/tkp.diff` holds `git diff 2376710`. Diffstat: `guides/veneer.md | 31 +++--`, `tests/src/styles/tokens.test.ts | 275 +++`. The totals are 290 insertions and 16 deletions.
- `tmp/units/tkp-status.txt` holds `git status --short`: ` M guides/veneer.md` and ` M tests/src/styles/tokens.test.ts`.

Touched files:

- `/home/user/veneer-tkp/tests/src/styles/tokens.test.ts`: adds the `ancestor token overrides` block and the pointer and media imports it uses. It changes no existing case.
- `/home/user/veneer-tkp/guides/veneer.md`: merges the stacking rows into one row whose Alias cell is `` `--bs-popover-zindex`, `--bs-tooltip-zindex`, `--bs-toast-zindex` ``. oxfmt re-padded that table's columns. The § Tests link text becomes `token parity, values, and ancestor overrides`.

## Deviation state

No stop. I settled the following ancillary choices myself:

- the vitest command form, because the brief's `--project src:styles` resolves no project;
- a mode-scope ancestor for the form cases, which falls under ancestor markup, a choice the brief leaves to the unit;
- separate plants per consumer where a case asserts more than one consumer.

Findings for the Orchestrator to route (outside Owned):

- **Customization prose:** § Customization says "every tier and every `--bs-*` alias derived from the token you changed follows the override." That holds only at `:root` and mode scopes. An override of `--vn-form-valid` or `--vn-form-invalid` on any other element leaves the validation paint unchanged, per the readings under Unknowns. Unverified inference: the same limit applies to any other token whose consumers read a mode-scope `--bs-*` alias rather than the token. I measured only the form pair. The sentence could name that limit, or the aliases could be re-declared where they are consumed. That is a design choice for a successor unit.
- **Brief command:** the brief's command `npx vitest run --project src:styles …` needs `--config configs/src/vite.styles.config.ts` in this tree. Any later brief that reuses it will stop on the same error.
