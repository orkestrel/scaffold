<!-- Subjective lane: planner on Opus 5.5, agent a22eb74c0402273a7, brief label-contrast-design-brief.md. -->

# LABEL-CONTRAST design proposal: subjective lane (`planner` on Opus 5.5)

I held the **subjective** lane. The `Constraints`, `Refusals`, and `Measurements` sections belong to the objective lane, so they are empty. I ran no command, because this lane is read-only. Every value here comes from a file read at the cited line, and I computed every contrast ratio by hand from WCAG 2.2 relative luminance. The ratios match the readings the campaign already recorded (see "Values relied on").

## Design

### Summary
Each role gets two closure tokens per mode, chosen at compile time from that role's sRGB triplet by one Sass contrast function:
- `--vn-color-{role}-label` is the text on the fill.
- `--vn-color-{role}-mixer` is the endpoint its hover and active tiers mix toward.

Every filled site reads these two tokens. The bare-button veil keeps `--vn-state-mixer` unchanged. The result is one contrast rule, one direction rule, and two token names per role.

### Where the label is chosen
- **Input: each role's `-rgb` triplet, per mode.** WCAG luminance is defined over sRGB, and the `text-bg-*` background paints exactly that triplet (`RGBA(var(--bs-{role}-rgb), …)`, `utilities/_color-bg.scss:19`). The case "resolves each channel triplet to the color its own token paints, in each mode" (`tests/src/styles/tokens.test.ts:166`) already proves each triplet within one channel step of its painted fill. Using the triplet adds no new copy of a literal. Integer lists also serialize byte-identically, so the emitted `--vn-color-*-rgb` text does not change.
  - In the `$light` and `$dark` maps, the `primary-rgb` and `secondary-rgb` entries change from quoted strings to Sass lists (`_tokens.scss:25,27,80,82`).
  - The triplets of the mode-independent roles move from `:root` text (`_tokens.scss:257-269`) into a `$channels` map (role to list) that the `:root` block emits from.
- **Rule: the release's `color-contrast`, exact.** Try the light candidate, then the dark one, and return the first that reaches 4.5 to 1; otherwise return the one with the higher ratio (`bootstrap/scss/_functions.scss:153-171`).
  - The candidates come from `_tokens.scss` as a map from CSS value to triplet: `'var(--vn-palette-white-base)': (255, 255, 255)`, then `'var(--vn-palette-black-base)': (0, 0, 0)`. `_mixins.scss` then holds no literal color (`.claude/rules/styles.md` § Prohibitions).
  - Luminance uses `math.pow` directly, not the release's 4-decimal lookup table.
- **Functions in `_mixins.scss`** (the rule names a function form `tint`, `clamp`):
  - `luminance($channels)` returns the WCAG relative luminance of an sRGB triplet.
  - `ratio($channels, $other)` returns the WCAG contrast ratio.
  - `contrast($channels, $candidates, $minimum: 4.5)` returns the chosen candidate's CSS value. The name echoes the release's `color-contrast()` and CSS `contrast-color()`.

### How the direction follows the label
- **Rule:** a role's states move away from its label: shade when the label is the light candidate, tint when it is the dark candidate. The exception is a role in `$extremes: light, dark`, the roles whose fill is an end of the gray ramp. Those move toward their label. This matches the release's `@if $color == "light"` / `"dark"` branches (`bootstrap/scss/_buttons.scss:133-150`) by name, for the release's reason: a move past the end of the ramp is invisible (THEME measured 1.055 and 1.099 for `.btn-dark` under a black mixer).
- **Endpoints: the two values the veil already uses.** No new literal is needed.
  - Shade is the `$light` `state-mixer` entry, Elements' measured near-black `color(srgb 0.00742457 0.0232852 0.0925134)` (`_tokens.scss:20`).
  - Tint is the `$dark` entry, `var(--vn-palette-white-base)` (`_tokens.scss:75`).
  - Light-mode filled variants therefore keep their calibrated run-6 shade exactly. The one exception is `.btn-dark`, which moves to tint as the release does.
- **Emission:** the `theme-tokens` mixin emits `--vn-color-{role}-label` and `--vn-color-{role}-mixer` for every role in every mode scope. The closure is required here, as the mixin's own note states (`_mixins.scss:295-297`): a `:root`-only declaration would freeze the light pick inside a dark island. The implementer settles how the per-mode triplets, candidates, `$extremes`, and endpoints reach the mixin, as parameters or as one map.

### Where the bare-button veil keeps its own mixer
- `--vn-state-mixer` stays mode-wide (near-black in light, white in dark) and is read only by the transparent-ground veils:
  - the bare `button` rule (`elements/_button.scss:44-56`)
  - the bare `.btn` hover and active background (`components/_button.scss:28-39`)
- Nothing else reads it after this change. This meets THEME's constraint that the variant mixer and the veil are two things.

### Sites, by file and symbol
- `src/styles/components/_button.scss`, the `@each $role in tokens.$roles` loop:
  - Delete the `$foreground` local.
  - `.btn-{role}`: `--bs-btn-color`, `-hover-color`, `-active-color`, and `-disabled-color` become `var(--vn-color-{role}-label)`. The `-hover-bg` and `-active-bg` mixes read `var(--vn-color-{role}-mixer)`.
  - `.btn-outline-{role}`: `--bs-btn-hover-color` and `-active-color` become the label. The `-active-bg` mix reads the role mixer, which also covers the checked outline.
- `src/styles/utilities/_color-bg.scss`: delete the `$dark-labels` list. Each `.text-bg-{role}` `color` becomes `var(--vn-color-{role}-label)` with its `!important` kept.
- `src/styles/components/_validation.scss`, the `.#{$state}-tooltip` `color`: becomes `var(--vn-color-{role}-label)`. The release picks this color with `color-contrast` (`bootstrap/scss/mixins/_forms.scss:22`). The value does not change: white on success reads 4.95, white on danger 6.42.
- `src/styles/_tokens.scss`: the triplet lists, `$channels`, the candidate map, and `$extremes`.
- `src/styles/_mixins.scss`: the functions and the closure emission.
- `src/styles/_theme.scss`: the mode scopes pass the mode's triplets.
- Not adopted, because none of these has the same shape:
  - Nav pills, pagination, the dropdown active link, the list-group active row, and the progress bar fill with the fixed `--vn-palette-blue`, not a role fill. That matches the release's fixed `$component-active-*`, and white reads 4.50 there in both modes.
  - The badge's label is fixed white in the release.
  - Table variants mix the role 20% into white, and the labels they already carry equal the rule's pick. That label is chosen against a mix, not a role fill. See Tensions.
  - The colored-link hover. See Tensions.

### Tokens and functions added
- **Tokens:** `--vn-color-{role}-label` and `--vn-color-{role}-mixer` for every role in `tokens.$roles`.
- **Registry request to the engine session (D43):** add `label` and `mixer` leaves to each role group of `TOKEN_NAMES.color` in `src/core/constants.ts`, giving `TOKEN_NAMES.color.primary.label === '--vn-color-primary-label'`. No design with compile-time picks avoids new names, because a mode-varying pick needs a declaration in the mode closure, and that declaration is a canonical token.
- **Sass:** `luminance`, `ratio`, and `contrast` in `_mixins.scss`, plus `$channels`, the candidate map, and `$extremes` in `_tokens.scss`.

### Resolved label and direction per role and mode
The table uses these conventions:
- White and black give the ratio of each candidate against the fill.
- Shade mixes toward the near-black endpoint; tint mixes toward white.
- Each triplet was read at the `_tokens.scss` line cited.

| Role | Mode | Triplet (line) | L | White | Black | Label | Direction |
| --- | --- | --- | --- | --- | --- | --- | --- |
| primary | light | 8, 65, 234 (25) | 0.0977 | 7.11 | 2.95 | white | shade |
| primary | dark | 0, 172, 236 (80) | 0.3556 | 2.59 | 8.11 | **black** | **tint** |
| secondary | light | 69, 85, 108 (27) | 0.0884 | 7.58 | 2.77 | white | shade |
| secondary | dark | 108, 117, 125 (82) | 0.1739 | 4.69 | 4.48 | white | **shade** |
| tertiary | both | 127, 34, 254 (257) | 0.1281 | 5.90 | 3.56 | white | shade (dark: **shade**) |
| success | both | 0, 130, 54 (259) | 0.1623 | 4.95 | 4.25 | white | shade (dark: **shade**) |
| info | both | 0, 105, 168 (261) | 0.1293 | 5.86 | 3.59 | white (text-bg: **white**) | shade (dark: **shade**) |
| warning | both | 187, 77, 0 (263) | 0.1587 | 5.03 | 4.17 | white (text-bg: **white**) | shade (dark: **shade**) |
| danger | both | 193, 0, 7 (265) | 0.1135 | 6.42 | 3.27 | white | shade (dark: **shade**) |
| light | both | 248, 249, 250 (267) | 0.9461 | 1.05 | 19.92 | black | shade (extreme) |
| dark | both | 33, 37, 41 (269) | 0.0181 | 15.43 | 1.36 | white | tint (extreme; light: **tint**) |

Bold marks a change from the tree:
- The dark primary label.
- `text-bg-info` and `text-bg-warning`.
- The dark mode, where every non-extreme role but primary now shades; today the white mixer tints them all.
- Light `.btn-dark`, which today shades.

The dark-mode shading also closes a failure the tree already carries and the verdict does not list. White labels on the lightened dark hover and active fills read 3.43 to 4.14 for success, info, warning, and tertiary. The rows are `BUTTON_CONTRAST_RATIO_CASES` in `tests/setupStyles.ts:3039-3081`, and `tests/setupStyles.ts:3021-3028` for tertiary.

**Values relied on.** Every triplet was read from `/home/user/veneer-ct/src/styles/_tokens.scss` at the lines in the table. The release rule and amounts were read from `/home/user/veneer-ct/node_modules/bootstrap/scss/_functions.scss:153-202` and `_variables.scss:72-76,855-862`. The hand arithmetic agrees with recorded readings:
- Dark primary white: mine 2.589; `BUTTON_CONTRAST_RATIO_CASES` 2.586 (`tests/setupStyles.ts:2991`).
- Dark secondary white: mine 4.689; THEME's re-read 4.689.
- Info and warning black: mine 3.59 and 4.17; verdict P9 "about 3.6 and 4.2".
- Light primary white: mine 7.11; recorded 7.132.

### Proofs that redden on each defect
Each proof ran red on the tree without the fix, and each named mutation is retained.
- **P-A, the rule itself.** A Sass fixture beside `tests/src/styles/fixtures/mixins.scss` runs `contrast()` over the release's `$theme-colors` triplets. It asserts the release's own `.text-bg-*` color for each, read from `node_modules/bootstrap/dist/css/bootstrap.css`. The boundary case is `#0d6efd`: white at 4.5008, black at 4.67.
  - Mutation: black-first candidate order, which turns primary black. Red.
  - Mutation: `$minimum` 4.6. Red.
- **P-B, label floor (P7, P9).** In light and dark scopes, every label reaches 4.5 to 1 against these fills:
  - each `.btn-{role}`'s rest, hover, and active fills;
  - each `.btn-outline-{role}`'s hover and active fills, the checked state included;
  - each `.text-bg-{role}` fill.

  The tree reddens on the dark primary at 2.59, the checked outline at 2.16, `text-bg-info` at 3.59, `text-bg-warning` at 4.17, and the dark success press at 3.43. Mutation: the primary label pinned to white.
- **P-C, direction (V11/P6).** In both modes, for filled and outline variants, each non-extreme role's label ratio rises from rest to hover to active, and each role in `$extremes` falls.
  - The tree reddens on the dark primary (white label, lightening) and on light `.btn-dark` (an extreme that shades).
  - Mutation: the role mixer replaced by `var(--vn-state-mixer)`.
- **P-D, agreement (P9).** `.text-bg-{role}` and `.btn-{role}` carry the same label in each mode. Mutation: restore `$dark-labels`.
- **P-E, veil kept.** `BUTTON_BARE_CASES` (`tests/setupStyles.ts:2781-2796`) stays green unedited: the bare hover and active endpoints are near-black in light and white in dark.
  - Add a case: the dark bare `button` and bare `.btn` hover steps at least 1.4 against rest (THEME: 1.421).
  - Mutation: the veil reads the black palette token. Red at 1.028.

### Ledger rows it changes
Every row keeps its status (`tokenized`, or its current one). Only the Veneer column changes.
- `btn` `.btn-{role}`:
  - `--bs-btn-color`, `--bs-btn-hover-color`, `--bs-btn-active-color`, and `--bs-btn-disabled-color`: `var(--vn-palette-white-base)` becomes `var(--vn-color-{role}-label)` (`guides/veneer.md:6207` onward).
  - `--bs-btn-hover-bg` and `--bs-btn-active-bg`: the mixer term becomes `var(--vn-color-{role}-mixer)`.
- `btn` `.btn-outline-{role}`: `--bs-btn-hover-color`, `--bs-btn-active-color`, and `--bs-btn-active-bg`, the same way.
- `text` `.text-bg-{role}` `color` (`guides/veneer.md:7941` onward): becomes the label token. For `info` and `warning`, the resolved value moves from the release's `#000` to white, which the row's Veneer column records.
- The validation tooltip `color` rows: become the label token.
- Prose and token tables:
  - § Button states and bindings: `--vn-state-mixer` Alias narrowed to the bare veils (`guides/veneer.md:6008`); the base-class `.btn-light overrides` cells (6040, 6048, 6051, 6055); the filled-role paragraph (6060-6065).
  - The role Tier table gains the label and mixer rows, Source `derived`: the release's `color-contrast` over the role's triplet, and its shade-or-tint branch.
  - The § text-bg paragraph.
- The new closure declarations add no Additions rows, as long as they are registered (X3, `collectAdditions`).

## Alternatives

- **A1: Runtime relative color, no new names.** Each site would compute the label in CSS, for example as a `color(from var(--vn-color-{role}-base) srgb-linear …)` expression. Each channel would be `clamp(0, (0.18333 - (0.2126r + 0.7152g + 0.0722b)) * 1e9, 1)`, because white reaches 4.5 exactly when L ≤ 1.05/4.5 − 0.05. That reproduces the release's rule exactly for the black and white candidates. The label would follow nested islands and a consumer's runtime retune of a fill, and the registry would not change.
  - It loses on four counts. It breaks the brief's "computed where it can be computed" constraint. The extreme-role direction needs banded thresholds the release never states. Every ledger value becomes a long expression. Veneer's browser floor for relative color in custom properties is unread.
  - The design wins because it honors the compile-time constraint and gives consumers a named value to read.
- **A2: A hand-recorded label table.** This is `$dark-labels`, extended per mode. It is the smallest diff.
  - It is the "second contrast rule" the brief forbids, it computes nothing, and it goes stale silently on the next palette ruling.
  - The design wins because the pick is computed from the proven triplet.

## Constraints

## Refusals

## Measurements

## Units

- **REGISTRY.** The engine session's writer (D43); `builder` on Sonnet is the recommended route, because the unit is fully specified and taste-free.
  - **Owns:** the role groups of `TOKEN_NAMES.color` in `src/core/constants.ts`, the `src/core` types that declare that tree if any, and the core tests that enumerate role leaves.
  - **Acceptance:** `TOKEN_NAMES.color.{role}.label` and `.mixer` exist for every role in `tokens.$roles`, carrying the `--vn-color-{role}-label` and `-mixer` strings. The core tests exit 0.
  - **Depends on:** nothing.
  - **Integration:** it integrates in the same landing as LABEL (see Risks).
- **LABEL (`lc`).** `opus` on Opus 5.5, native, in its own worktree from the post-THEME head.
  - **Routing deviation to record:** by work class this is objective work for `sol` on Astra. But its proofs run in Chromium, and the bench sandbox denies a grandchild process (orchestration § Bench laws rule 5). THEME and the frames units ran native for the same reason.
  - **Owns:** `src/styles/_tokens.scss`, `_mixins.scss`, `_theme.scss`, `components/_button.scss`, `utilities/_color-bg.scss`, and `components/_validation.scss` (the tooltip `color` only). Also `tests/src/styles/fixtures/mixins.scss` plus the P-A fixture, `tests/src/styles/components/button.test.ts`, `tests/src/styles/utilities/color-bg.test.ts`, the tooltip case in `tests/src/styles/components/validation.test.ts`, `tests/src/styles/theme.test.ts`, and `tests/src/styles/tokens.test.ts` wherever a role enumeration goes false.
  - **Shared, report-only:** `tests/setupStyles.ts` (the `BUTTON_FILLED_CASES`, `BUTTON_CONTRAST_RATIO_CASES`, and `BUTTON_CONTRAST_FLOOR_CASES` rows re-read) and `guides/veneer.md` (the ledger rows and prose listed earlier).
  - **Off-limits:** `src/styles/elements/_button.scss`, every other partial, `src/core/**`, and the frames units' specimen tables and registry rows.
  - **Depends on:** THEME landed; REGISTRY ready in the same integration; UTIL-FRAMES's struck P9 received; FOCUS-FRAME landed if its diff touches `_validation.scss` (the Orchestrator checks that diff before dispatch).
  - **Acceptance, cheap first:**
    1. `oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
    2. `npm run build:src` exits 0, and the emitted `--vn-color-*-rgb` text is byte-identical to the pre-change build.
    3. P-A through P-E each ran red first and are green, with their mutation log.
    4. `npm run test:setup` and `npm run test:conformance` exit 0 with the shared patch.
    5. `npm run test:guides` exits 0 in a scratch copy with the shared patch.
  - **Observations:** the whole styles suite and the captures.
- **Mid-campaign decision to UTIL-FRAMES (`fu`).** Strike brief item 1 (P9), strike the `src/styles/utilities/_color-bg.scss` ownership and its style proof, and strike the `text-bg` ledger row from its shared patch. LABEL carries P9. Its `/home/user/veneer-fu/tmp/units/` shows only build logs, so check its status for a `_color-bg.scss` edit before sending. Its text-bg frames stay its own.
- **Audit of LABEL:**
  - `analyst` on GPT-6 Astra, the objective lane and an engine that did not write the work.
  - `reviewer` on Opus 5.5, the subjective lane.
  - `checker` through the Grok ladder, for ledger-row parity against the emitted cascade and count-free prose.
- **Recapture.** The Orchestrator's capture run after LABEL lands, before these frames are read:
  - PASSIVE-FRAMES P14 (every role's filled and outline hover and active face);
  - UTIL-FRAMES's text-bg frames;
  - OVERLAY-FRAMES frames of a `text-bg-*` toast;
  - FORMS-FRAMES's grouped buttons and tooltips;
  - THEME's `Nested islands` buttons.

  None of those units' specimens or scenarios goes false, so they run in parallel with LABEL. Only their frames wait.

## Tensions

- **P6 closes as "direction follows the label," not as "darkens like the release."** With a black label, the rule tints the dark primary, so it still lightens when pressed, as the release's own `info` and `warning` do. The pre-fix defect was a white label on a lightening fill (the label ratio falls from 2.59 to 2.16). Darkening would need either a white label, which fails P7, or a break from the rule the brief asks for. I chose the rule. Rule P6's close condition as P-C.
- **Role-keyed `$extremes` vs a computed threshold.** A threshold such as "flip when the fill reads below about 2 to 1 against the away endpoint" also separates the cases (dark 1.36, light 1.05, lowest normal case 2.59). But it invents a constant the release never states. I chose the release's own name-keyed branch.
- **Shade endpoint.** Elements' near-black keeps light mode unchanged. Pure `--vn-palette-black-base` would match the release's `shade-color` and give a slightly more neutral dark-mode press. I chose continuity.
- **Two new public names per role (a D43 request) vs A1 with none.** The brief's "prefer no new name" and "compute at compile time" conflict. Compile time wins here; the Orchestrator rules.
- **Name `label`.** It matches the verdict's and the brief's vocabulary. The alternatives are `foreground` (the partial's local and shadcn's term) and `contrast` (Radix's term, but it reads as a ratio in this campaign's reports).
- **One label per role across rest, hover, active, and disabled.** The release recomputes the pick per tier. Because every non-extreme state moves away from the label, its ratio only rises. The extremes stay at 12 or more (light) and 7.5 (dark). P-B proves this.
- **The outline `--bs-btn-active-bg` keeps Veneer's mix.** The release uses the fill itself. Only the mix's direction is corrected here. Restoring the release value is a separate ruling.
- **Scope edges.**
  - The tooltip is included even though its value does not change, so the tree carries one rule.
  - Table variants are excluded; their labels already equal the pick.
  - The colored-link hover (`bootstrap/scss/helpers/_colored-links.scss:10`, shade or tint by contrast) is excluded. It is the natural next reader of `--vn-color-{role}-mixer`, and it needs a carrier named by the Orchestrator.
- **Readings the design needs that the dispatch did not supply:**
  - A run of `contrast()` over the triplets, to confirm the hand-computed table.
  - The painted-fill contrast in Chromium for every role and mode. P-B is that run.
  - Veneer's browser floor, only if A1 is weighed.

## Risks

- **Precision at the boundary.** `math.pow` can differ from the release's 4-decimal table at `#0d6efd`, which sits at 4.5008 for white. Veneer's nearest margin is the dark secondary at 4.69. Evidence: P-A's boundary case.
- **Triplet vs painted fill.** The oklch fills are out of gamut, and the triplet is the clamped rendering. The painted ratio can differ slightly from the triplet ratio, for example success at 4.95. Evidence: P-B reads the painted fill.
- **Landing order of registry and emission.** Registry-first reddens any case asserting that every registered name is declared. Emission-first reddens X3 `collectAdditions`. Evidence: the unit searches the tests for a case over every `TOKEN_NAMES` leaf. Both then integrate in one landing, and `npm run test:conformance` and the tokens proof run on the combined tree.
- **UTIL-FRAMES may already have edited `_color-bg.scss` its own way.** Evidence: `git -C /home/user/veneer-fu status` before the decision is sent.
- **Frames captured before LABEL show superseded faces.** Evidence: the recapture run.
- **Consumer retune.** A consumer who retunes `--vn-color-{role}-base` at runtime keeps the compiled label and mixer. The guide's Tier rows must say that the label and mixer are retuned with the fill. A1 is the design that removes this cost.

Files read, all under `/home/user/veneer-ct/` unless another path is given:
- `/home/user/scaffold/.orkestrel/veneer/units/label-contrast-design-brief.md`
- `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md`
- `/home/user/scaffold/.orkestrel/veneer/units/b-cross-ct-report.md`
- `/home/user/scaffold/.orkestrel/veneer/units/b-util-frames-brief.md`
- `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/styles/_theme.scss`
- `src/styles/components/_button.scss`, `src/styles/elements/_button.scss`, `src/styles/utilities/_color-bg.scss`, `src/styles/components/_validation.scss`
- `src/core/constants.ts`
- `tests/setupStyles.ts`, `tests/src/styles/tokens.test.ts`
- `guides/veneer.md`
- `node_modules/bootstrap/scss/{_functions.scss,_buttons.scss,mixins/_buttons.scss,helpers/_color-bg.scss}`
