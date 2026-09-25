# TOKEN-PROOFS round 2 report

**Stopped at Execution step 3.** A placement reading contradicts D51, so § Customization is unedited. D51 says an override of a canonical token on a `[data-bs-theme]` element moves every derived tier and `--bs-*` alias. In this tree it moves only the aliases the mode scope re-declares. The aliases declared on `:root` alone stay on their root value. Steps 1 and 2 are complete: every assertion in the `ancestor token overrides` block now fails under its own plant. The gates in Acceptance 1, 2, and 4 read green. Acceptance 4's prose half needs the Orchestrator's ruling.

## The contradiction (stop condition)

- **Expected (D51):** "An override of a canonical token therefore moves a derived tier or alias only where it is declared on `:root` or on a `[data-bs-theme]` element." Brief step 3 asks the guide to say that such an override "moves every tier and `--bs-*` alias derived from it".
- **Found:** I overrode a set of canonical tokens inline on a `data-bs-theme="light"` element and read each alias on a child. The log is `tmp/units/tkp-2-probe-mode-scope.log.txt`, which holds the temporary case's source. The case was removed afterwards and `cmp` confirmed the test file identical. The readings split into two groups:
  - **Moved:** `--bs-primary` read `rgb(4, 5, 6)`. `--bs-primary-bg-subtle` and `--vn-color-primary-subtle` read `color-mix(in oklab, rgb(4, 5, 6) 12%, #fff)`. `--bs-form-valid-color` read `rgb(7, 8, 9)`.
  - **Held:** `--bs-success` read `oklch(52.7% .154 150.069)` with `--vn-color-success-base: rgb(1, 2, 3)` set. `--bs-border-radius` read `calc(.375rem * 1)` with `--vn-radius-base: 20px` set. `--bs-body-font-weight` read `400` with `--vn-weight-body: 800` set. `--bs-link-decoration` read `underline` with `--vn-link-decoration: overline` set.
- **Why:** the `theme-tokens` mixin is included at `:root` and at each `[data-bs-theme]` scope. The `_tokens.scss` partial's second `:root` block declares a further set of aliases, and no mode scope re-declares them. `tmp/units/tkp-2-probe-scopes.py` reads the built `dist/src/styles/index.css` and lists both sets in `tmp/units/tkp-2-probe-scopes.log.txt`.
  - **Declared on `:root` only:** among others, `--bs-success`, `--bs-success-rgb`, `--bs-info`, `--bs-warning`, `--bs-danger`, `--bs-light`, `--bs-dark`, `--bs-body-font-*`, `--bs-border-radius*`, `--bs-box-shadow*`, `--bs-link-decoration`, and `--bs-focus-ring-width`.
  - **Re-declared at the mode scope:** among others, `--bs-primary`, the `-bg-subtle`, `-border-subtle`, and `-text-emphasis` tiers, `--bs-body-color`, `--bs-border-color`, `--bs-link-color`, and the `--bs-form-*` pair.
- **Done:** steps 1, 2, and 4. **Not done:** step 3.
- **Hypothesis:** the root-only block predates the mode scopes. That would explain why `--bs-primary` follows a mode-scope override while `--bs-success` does not.

The Orchestrator has these options for the guide:

- **Narrow the prose to the tree.** An override on `:root` moves every derived tier and alias. An override on a `[data-bs-theme]` element moves the tiers and aliases the mode scope re-declares, and leaves the root-only aliases on their root value. An override on any other element moves only the rules that read the token directly. Cost: the sentence has to say which aliases are root-only, or point to where they are listed. The Reference map has no column for it.
- **Change the cascade so every alias resolves at each mode scope.** Cost: a `src/styles` unit, and a design ruling on why the success, info, warning, danger, light, and dark fills sit outside the mode scope when primary sits inside it.
- **Recommendation:** decide the cascade question first. The prose either way is a short unit that owns § Customization. The part of D51 about any other element holds, and so does the part about rules that read an alias. Both are measured in this round.

## Plant table

- **Driver:** `tmp/units/tkp-2-plant-worktree.py`. It keeps every backup under `tmp/units/tkp-2-backup/`, restores from it, and confirms each restore with `cmp` and `git diff --stat -- src`.
- **Command:** each plant runs `npm run build:src:styles`, then `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts -t '<pattern>'`.
- **Logs:** each plant logs to `tmp/units/tkp-2-plant-<name>.log.txt`, with `cat /proc/loadavg`.
- **In-loop plants:** an `@if $state == '…'` wrapper rewrites one state's declaration inside `_validation.scss`'s `@each` loop and leaves the other state's declaration alone.

The `-t` pattern for each plant is:

- `overrides the link decoration` for the link-decoration-hover plant;
- `holds the validation paint on the rest color under a plain ancestor` for every placement plant;
- `inside a plain ancestor that sets the validation aliases` for the alias plants.

Every plant log reads `AssertionError` and `Tests 1 failed | 44 skipped (45)`. Each log names the assertion the plant targets as the failing line, and every earlier assertion in the case passed. Every restore reads `restored-byte-identical` and `src-diffstat-lines=0`.

| Plant | Partial: occurrence → planted | Failing assertion (line: reading) |
| --- | --- | --- |
| link-decoration-hover | `components/_button.scss`: 2nd `text-decoration: var(--vn-link-decoration);`, the `.btn-link:hover` rule → `text-decoration: underline;` | 776: hovered `insideButton` text-decoration-line, `expected 'underline' to be 'overline'`, the case's last assertion |
| placement-plain-valid-border | `components/_validation.scss`: 1st `border-color: var(--bs-form-#{$state}-border-color);` (`.form-control.is-#{$state}`) → valid reads `var(--vn-form-valid)` | 878: `plainValid` border-top-color |
| placement-plain-valid-feedback | `_validation.scss`: 1st `color: var(--bs-form-#{$state}-color);` (`.#{$state}-feedback`) → valid reads `var(--vn-form-valid)` | 881: `plainValidFeedback` color |
| placement-plain-invalid-border | `_validation.scss`: the same border occurrence → invalid reads `var(--vn-form-invalid)` | 884: `plainInvalid` border-top-color |
| placement-plain-invalid-feedback | `_validation.scss`: the same color occurrence → invalid reads `var(--vn-form-invalid)` | 887: `plainInvalidFeedback` color |
| placement-mode-valid-border | `_mixins.scss`: `--bs-form-valid-border-color: var(--vn-form-valid);` → `oklab(0.4313 -0.0943551 0.0412221)` | 888: `modeValid` border-top-color |
| placement-mode-valid-feedback | `_mixins.scss`: `--bs-form-valid-color: var(--vn-form-valid);` → the same literal | 889: `modeValidFeedback` color |
| placement-mode-invalid-border | `_mixins.scss`: `--bs-form-invalid-border-color: var(--vn-form-invalid);` → `oklab(0.4159 0.131299 0.0563228)` | 890: `modeInvalid` border-top-color |
| placement-mode-invalid-feedback | `_mixins.scss`: `--bs-form-invalid-color: var(--vn-form-invalid);` → the same literal | 891: `modeInvalidFeedback` color |
| alias-border | `_validation.scss`: the border occurrence → valid writes `oklab(0.4313 -0.0943551 0.0412221)` | 918: `insideControl` border-top-color |
| alias-feedback | `_validation.scss`: the color occurrence → valid writes `oklab(0.4313 -0.0943551 0.0412221)` | 921: `insideFeedback` color |

The placement-plain plants make the validation rule read the canonical token directly. That is the change the plain-ancestor assertions exist to catch. Each alias plant writes the rest value in place of the alias, so the consumer stops following it.

## New cases

The new cases are in `describe('ancestor token overrides')` in `tests/src/styles/tokens.test.ts`:

- holds the validation paint on the rest color under a plain ancestor that overrides the form tokens, and moves it under a mode scope that does
- recolors the border and the feedback of a valid control inside a plain ancestor that sets the validation aliases, and leaves a twin on the rest color

The placement case asserts the plain ancestor's four readings first, at the rest values. It then asserts the mode scope's four readings at the override. The alias case sets `--bs-form-valid-border-color` and `--bs-form-valid-color` to different colors, so a consumer reading the wrong alias fails. Its twin is asserted first. I also reworded the block comment and the comment on the form cases. Both had said that § Customization states the placement rule, and it doesn't yet. The line count is unchanged, so every line number in the plant logs still holds.

## § Customization, before and after

Not edited, per the stop. The paragraph still reads: "Override a canonical token in your own unlayered rule. Veneer declares its tokens inside the `@layer theme` block, so an unlayered rule wins, and every tier and every `--bs-*` alias derived from the token you changed follows the override, because each one is an expression over that token."

The § Tests link text from round 1, `token parity, values, and ancestor overrides`, still fits, so § Tests is unchanged.

## Gate table

The gates ran through `tmp/units/tkp-2-gates.sh`.

| Gate | Log | Reading |
| --- | --- | --- |
| `npm run check` | `tmp/units/tkp-2-check.log.txt` | `exit=0` |
| `npm run lint:check` | `tmp/units/tkp-2-lint-check.log.txt` | `exit=0` |
| oxfmt on `tokens.test.ts` and `veneer.md`, with before and after `sha256sum -c` | `tmp/units/tkp-2-oxfmt.log.txt` | `exit=0`; both files `OK`; `unchanged-exit=0` |
| `npm run build:src:styles` then `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts --reporter=verbose` | `tmp/units/tkp-2-tokens.log.txt` | `Tests 45 passed (45)`, `exit=0` |
| `npm run test:guides` | `tmp/units/tkp-2-test-guides.log.txt` | `Tests 20 passed (20)`, `exit=0` |
| `npm run test:policy` | `tmp/units/tkp-2-test-policy.log.txt` | `Tests 109 passed \| 1 skipped (110)`, `exit=0` |
| Observation: `npm run test:src:styles` | not run | This round changed only `tests/src/styles/tokens.test.ts`, and the tokens row covers it. |

No gate timed out.

## Diff and status

- `tmp/units/tkp-2.diff` holds `git diff 2376710`. Diffstat: `guides/veneer.md | 31 ++--` (round 1's changes, untouched this round) and `tests/src/styles/tokens.test.ts | 362 +++`.
- `tmp/units/tkp-2-status.txt` holds ` M guides/veneer.md` and ` M tests/src/styles/tokens.test.ts`.
- `git diff --stat -- src` is empty.

## Scratchpad use (Orchestrator instruction)

Before the instruction arrived, I made a first driver run, `tmp/units/tkp-2-plant.py`, with its backups under the scratchpad's `plant-2-backup/`. That run's logs are in `tmp/units/tkp-2-run-scratchpad/`, and each restore there read `src/styles` diffstat empty. After the instruction, `tmp/units/tkp-2-plant-worktree.py` re-ran every plant with worktree backups. The plant table cites that re-run.

This round also left these copies in the scratchpad: the test-file snapshots `tokens.test.ts.round1` and `tokens.test.ts.round2`, and the probe source `measure.ts`. I restored the test file from `tokens.test.ts.round2` once, before the instruction, and `cmp` confirmed it. The probe source is transcribed in `tmp/units/tkp-2-probe-mode-scope.log.txt`. I did not delete anything in the scratchpad. The Orchestrator can remove those files.

## Deviation state

Stopped at step 3 under the contract clause "a placement reading contradicts D51". Settled myself: the case titles, the in-loop `@if` plant form, and the comment rewording. Carrier needed: a ruling on the options under "The contradiction", then a unit that owns § Customization. If the Orchestrator chooses the cascade change, that unit also owns `src/styles`.
