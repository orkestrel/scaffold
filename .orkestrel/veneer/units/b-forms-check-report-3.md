# Unit B-FORMS-CHECK, round 2 — report

Every carried finding of `tmp/units/b-forms-check-brief-3.md` is closed in the owned files. The
`@each` change compiles byte-identical (`cmp` exit 0). The attribute-only host reddens under the
split-rule plant and passes after the exact reverse edit. The D28 reading is the dark knob. Every
acceptance gate exits 0 except `npm run test:setup`. Its one red is the shipped-key Set literal in
`tests/setupServer.test.ts`, which is off-limits here and is the Orchestrator's integration edit.
Executed natively on Opus 5.5 in `/home/user/veneer-bfc` (detached at `2c10329`, uncommitted), so no
bench journal applies.

## Touched files

This round edited only the following owned files. The tree's status is the round-1 set, unchanged.

| File | Change this round |
| --- | --- |
| `src/styles/components/_form-check.scss` | The checkbox and radio glyph rules are one `@each` over the top-level map `$glyphs: (checkbox: 'check', radio: 'radio')`, with a comment in the `_form-range.scss` `$engines` form. |
| `tests/src/styles/components/form-check.test.ts` | The case `dims a disabled box and its label, whether the attribute or a disabled fieldset disables it` gains the attribute-only host `#check-marked`, asserts it matches `[disabled]` and not `:disabled`, and reads its label's `opacity` and `cursor`. The `it.each` destructure reads `mode`. |
| `tests/setupStyles.ts` | `FORM_CHECK_ICON_CASES`: the `theme` field is `mode` in every row and in the remarks. |
| `tests/setupStyles.test.ts` | `binds each check glyph…`: `entry.mode` and `({ mode }) => mode === 'dark'`. |
| `guides/veneer.md` | `### Form check classes`: the focus bullet, the light-and-dark wording, the print sentence, and the D28 sentence. § Compatibility: the `form-check` variable row. |
| `tmp/units/b-forms-check-report-3.md` | This report. |

Diffstat of the owned files against `2c10329` (`git diff --stat 2c10329 -- <owned files>`; the new
files carry round-1 intent-to-add entries): `guides/veneer.md` 89, `_form-check.scss` 157,
`tests/setupStyles.test.ts` 80, `tests/setupStyles.ts` 164, `form-check.test.ts` 477; 967
insertions, 0 deletions.

## Carried findings

1. **Claim 2, the attribute half of the disabled-label rule.** `form-check.test.ts`, case `dims a
   disabled box and its label…`: the mount appends
   `<div class="form-check"><span class="form-check-input" id="check-marked" disabled></span><span class="form-check-label">Marked</span></div>`.
   The case asserts `marked.matches('[disabled]')` is true and `marked.matches(':disabled')` is
   false, then reads the sibling label at `opacity` `0.5` and `cursor` `default`. The comment names
   which host separates which half of the grouped selector. See the plant table for the red and
   green readings.
2. **Claim 8, the repeated glyph structure.** `_form-check.scss`: `$glyphs` is declared before
   `@layer components`, and `@each $control, $glyph in $glyphs` emits
   `.form-check-input:checked[type='#{$control}']` with `map.get(tokens.$icons, $glyph)`, checkbox
   then radio. See the compile comparison.
3. **Claim 5(a), the focus bullet.** The lead reads "**The focus ring binds the focus tokens, and
   the focus border tints the blue palette entry.**" The mix sentence and the ring sentence stay.
   The added last sentence reads "A `--vn-color-primary-base` retune moves the ring and leaves the
   border on the release's tint." The reading under § Supporting reading backs it.
4. **Claim 5(b).** "the resting fill in the light and dark modes".
5. **Claim 5(c).** "No proof prints, so the proof reads the `print-color-adjust` declaration as its
   resolved value alone."
6. **F1, `theme` to `mode`.** Rows and remarks in `tests/setupStyles.ts`; the `it.each` destructure
   and the `data-bs-theme="${mode}"` interpolation in `form-check.test.ts`; `entry.mode` and
   `({ mode }) => mode === 'dark'` in `tests/setupStyles.test.ts`. The search-bound grep and its
   rulings are in § F1 search.
7. **F2, the § Compatibility variable row.** The row reads "The input carries the
   `--bs-form-check-bg`, `--bs-form-check-bg-image`, and `--bs-form-switch-bg` properties, each glyph
   read from the `$icons` map and the dark knob from the `$dark` map; overrides are proved in
   `tests/src/styles/components/form-check.test.ts`." The prescribed clause is verbatim. The
   leading clause was recast, as § Deviations records.
8. **D28, the nested light island.** The dark-rule paragraph of `### Form check classes` gains,
   after "…any value a theme scope passes down to it.": "The descendant rule also reaches a resting
   switch inside a light island nested in a dark one, as the release's own rule does, and the
   partial adds no light-scope reset." No proof case was added. The reading is in § D28 reading.
9. **F3, the ROADMAP patch.** Applied in § `ROADMAP.md` patch.
10. **The exchange plant.** Re-run as an exchange of both bindings. See the plant table.

## F1 search

The command was `grep -nw "theme" tests/setupStyles.ts tests/setupStyles.test.ts
tests/src/styles/components/form-check.test.ts`, run before the rename. Each hit is ruled as follows.

- **Renamed:** every `theme: 'light'` and `theme: 'dark'` field in `FORM_CHECK_ICON_CASES`; the
  remark "`theme` names the mode island…"; `entry.theme` and `({ theme }) => theme === 'dark'` in `setupStyles.test.ts`; the destructured `theme` and its
  `${theme}` interpolation in `form-check.test.ts`.
- **Kept as data:** `key: 'theme'` and the remark "recorded under the `theme` key" (the inventory
  key name); the `FORM_CHECK_SELECTORS` remark naming the same key; every `data-bs-theme` attribute
  and selector string.
- **Outside the table, not this finding's:** the button case remarks and the `BUTTON_FILLED_CASES`
  destructure in `tests/setupStyles.ts`, the Bootstrap scope-pattern remarks, and the `@use 'theme'`
  module strings in `setupStyles.test.ts`.

The only other consumer of `FORM_CHECK_ICON_CASES`, `tests/app/browser/integration.test.ts`, reads
`name` and `image` alone (`grep -rn FORM_CHECK_ICON_CASES` over the tree outside `node_modules` and
`dist`).

## Plant table

Each plant ran through the scratchpad script `bfc3/plant.py` as an exact string exchange on
`_form-check.scss`, then `bfc3/run.sh`: `npm run build:src:styles`, then
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-check.test.ts`.
The revert is the exact reverse exchange. After each revert the partial's SHA-256 read
`652738b0d2bae1382ff07c74843b2a806d66b5ccf62f254116c09803700021b7`, the value taken before the plant.
The partial's map comment was reworded after both plants; the gate run of the proof on the final
partial read 23 passed.

| Plant | Mutation | Reading under the plant | Red cases | Exact revert |
| --- | --- | --- | --- | --- |
| Attribute-label split | The grouped rule becomes `.form-check-input[disabled] ~ .form-check-label { cursor: default; opacity: 1; }` followed by `.form-check-input:disabled ~ .form-check-label { cursor: default; opacity: 0.5; }` | 1 failed, 22 passed | `dims a disabled box and its label, whether the attribute or a disabled fieldset disables it`: `expected '1' to be '0.5'` at the marked host's label `opacity` read (`form-check.test.ts:369` at the time of the run) | The two rules replaced by the original grouped rule; hash equal; 23 passed |
| Checked and indeterminate exchange | `checkbox: 'check'` becomes `checkbox: 'indeterminate'` in `$glyphs`, and the mixed rule's `map.get(tokens.$icons, 'indeterminate')` becomes `map.get(tokens.$icons, 'check')` | 3 failed, 20 passed | `paints the 'checked checkbox' glyph the recorded site declares`; `paints the 'indeterminate checkbox' glyph the recorded site declares`; `shows the mixed glyph over the checked one on a box that is both, and the checked one after` | Both exchanges reversed in reverse order; hash equal; no rerun at that hash, and the later gate run read 23 passed |

**Negative controls for the attribute-label plant.**

- In the red run, the failing read comes after the loop over `#check-disabled` and the fieldset
  host, so every existing label reading in that loop passed under the plant.
- The round-1 form of the case, written into the proof by the exact reverse of this round's test
  edit (`bfc3/round1.py`), ran under the same plant and read 23 passed. That is the gap this host
  closes. The proof file was then restored from its snapshot, and its SHA-256 read
  `944385668e40d6bfe12b4a0fff8f05d59e17472467b99faf2615d20a4f3cb3ef` before and after.

## Compile comparison

The comparison used the command the brief names.

| Step | Command | Exit |
| --- | --- | --- |
| Before the `@each` edit | `npx --no-install sass --no-source-map src/styles/components/_form-check.scss > tmp/probe/before.css` | 0 (22893 bytes) |
| After the edit | the same command `> tmp/probe/after.css` | 0 |
| Compare | `cmp tmp/probe/before.css tmp/probe/after.css` | 0 |

The map's comment was reworded after that comparison, so the comparison was taken again.

- The round-1 partial was reconstructed as the exact reverse of the `@each` edit
  (`bfc3/round1-partial.py`) and compiled with
  `npx --no-install sass --no-source-map --stdin --load-path=src/styles/components`. Exit 0.
- The current file was compiled with the brief's command. Exit 0.
- `cmp` of the two exited 0.
- Method control: the current file compiled through `--stdin` is `cmp`-equal to the path compile
  (exit 0).
- Instrument control: the same stdin compile with `radio: 'check'` differs from the before file
  (`cmp` exit 1, first difference at line 537).

`tmp/probe/` was removed afterwards and is absent.

## D28 reading

The nesting was mounted once through a transient case inserted at the head of the proof's
`describe` (`bfc3/nested.py`) and run with
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/form-check.test.ts -t "TRANSIENT"`
(1 passed, 23 skipped). The proof file was restored from its snapshot, and its SHA-256 read
`944385668e40d6bfe12b4a0fff8f05d59e17472467b99faf2615d20a4f3cb3ef` before and after. Each resting
switch's `background-image` matched a `FORM_CHECK_ICON_CASES` row as follows.

| Mount | Matched row | URI |
| --- | --- | --- |
| `[data-bs-theme="dark"] > [data-bs-theme="light"] > .form-check.form-switch > input` | `dark resting switch` | `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28255, 255, 255, 0.25%29'/%3e%3c/svg%3e")` |
| Control: `[data-bs-theme="light"]` alone | `resting switch` | `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e")` |
| Control: `[data-bs-theme="dark"]` alone | `dark resting switch` | the dark URI in the first row |

The expected dark knob was read, so no deviation arises.

## Supporting reading for the focus bullet

A transient case (`bfc3/retune.py`, the same `-t "TRANSIENT"` command, then restored with the hash
check) focused `#check-box` by keyboard and set `--vn-color-primary-base: rgb(200, 0, 0)` on the
document element.

- Before the retune: ring `oklab(0.48 -0.0266547 -0.253603 / 0.45) 0px 0px 0px 3px`, border
  `color(srgb 0.52549 0.715686 0.996078)`.
- After the retune: ring `oklab(0.522943 0.18727 0.10481 / 0.45) 0px 0px 0px 3px`, border
  `color(srgb 0.52549 0.715686 0.996078)`.

The ring moves and the border does not, as the added sentence states.

## `ROADMAP.md` patch (report-only)

Apply the following replacements, then run `oxfmt --write ROADMAP.md` to realign the tables. Locate
each row by its text; the line numbers are approximate.

- **B-FORMS row (around line 278):** replace ``RANGE's fix rounds by `analyst`); GROUP is next``
  with ``RANGE's fix rounds by `analyst`); CHECK's fix round returned from `/home/user/veneer-bfc`
  (report `units/b-forms-check-report-3.md`), and GROUP is next``.
- **Carrier row "Theme-scope select caret and switch knob" (around line 375):** replace
  ``B-FORMS-SELECT removes `select-indicator` and B-FORMS-CHECK removes `switch-knob` from `$assets`,
  each with the `tokens.test.ts`, `theme.test.ts`, and guide patch the VALIDATION report carries, in
  the change that ships the component rule declaring the dark value`` with ``B-FORMS-ASSETS removes
  `select-indicator` and `switch-knob` from `$assets` after B-FORMS-CHECK and B-FORMS-SELECT land
  their component-level dark rules (D26), with the `tokens.test.ts` case, the § Tokens paragraph,
  and the `$assets` doc comment``.
- **Carrier row "§ Customization's claim…" (around line 379):** replace ``(the pagination and
  list-group active fills and the range thumb read the palette entry)`` with ``(the pagination and
  list-group active fills, the range thumb, and the check fill and focus border read the palette
  entry)``.

## Shipped key for the Set literal

`tests/setupServer.test.ts` › `skips engine and CSS obligations whose Proof cell is a dash` must gain
`'form-check'` between `'figure'` and `'form-range'`:

```diff
 				'figure',
+				'form-check',
 				'form-range',
```

## Gate table

Every command ran from `/home/user/veneer-bfc` with npm 11.19.1 on `PATH` and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, on 2026-09-23, after the last edit to a source or test
file.

| Command | Exit | Reading |
| --- | --- | --- |
| `cmp` of the compiled partial before and after the `@each` edit | 0 | byte-identical; `tmp/probe/` absent afterwards |
| `npx oxfmt --config .oxfmtrc.json --check` over `_form-check.scss`, `form-check.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `guides/veneer.md` | 0 | All matched files use the correct format |
| `npx oxlint --config .oxlintrc.json --deny-warnings` over `form-check.test.ts`, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts` | 0 | no diagnostics |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | — |
| `npm run test:setup` | 1 | 185 passed, 1 failed, 3 files: the shipped-key Set literal alone (received gains `"form-check"` between `"figure"` and `"form-range"`); `binds each check glyph…` passes |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-check.test.ts` | 0 | 23 passed |
| The same command under the attribute-label plant | 1 | 1 failed, 22 passed; 23 passed after the exact revert |
| `npm run test:conformance` | 0 | 17 passed |
| `npm run test:guides` | 0 | 18 passed |
| `npm run test:src:styles` (observation) | 0 | 657 passed, 71 files, 70.11 s |
| `npm run test:journey` (observation) | 0 | 136 passed, 4 files, 88.86 s; load average 1.11 at launch |

No capture run was taken this round: no specimen, scenario, or rendered rule changed, and the
partial compiles byte-identical.

## Deviations

No stop condition arose. The following ancillary choices were settled under the deviation contract,
plus the criterion this scope cannot reach.

- **The `npm run build:src && npm run test:setup` criterion cannot reach exit 0 inside this scope.** `npm run test:setup` reds only
  on the Set literal in `tests/setupServer.test.ts`, which this brief holds off-limits and names as
  the Orchestrator's landing edit. The patch is in § Shipped key for the Set literal.
- **The variable row's leading clause was recast.** With the prescribed clause inserted into "The …
  properties are declared on the input, …", the cell overflowed the Obligation column. `oxfmt
  --write` then re-padded every row of the § Compatibility table, rows outside this unit's owned
  row. The row reads "The input carries the … properties, …" instead. The prescribed clause stays
  verbatim, and `oxfmt --check` passes with only this row changed.
- **Names and markup.** The map is `$glyphs` and the loop reads `$control, $glyph`. The
  attribute-only host is a `<span class="form-check-input" id="check-marked" disabled>` followed by
  a `<span class="form-check-label">Marked</span>`, in its own `.form-check` row. The case title is
  unchanged, because "the attribute" now has a host of its own.
- **Placement.** The D28 sentence sits after the sentence ending "…any value a theme scope passes
  down to it." and before "Retune one control's glyph…". The retune sentence closes the focus
  bullet, as the retune sentence closes the fill bullet.
- **The `ROADMAP.md` patch goes beyond finding 9 on one row.** The carrier row "Theme-scope select
  caret and switch knob" names B-FORMS-ASSETS as D26 rules, in place of the round-1 text that asked
  the Orchestrator to name the unit later.

## Claims flagged unverified

- The patched `npm run test:setup` reading is not run: the Set literal file is off-limits here.
- The earlier `cmp` pair and the second comparison both exit 0, but the second one's before file
  is a reconstruction, not the round-1 bytes on disk. The first comparison used the round-1 file
  itself.
- The journey and whole-styles readings are single runs on a quiet host. The authoritative runs
  remain the Orchestrator's.
- The scratchpad instruments `plant.py`, `run.sh`, `round1.py`, `round1-partial.py`, `nested.py`,
  and `retune.py` sit under
  `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfc3/`, outside the
  tree, for retention.
