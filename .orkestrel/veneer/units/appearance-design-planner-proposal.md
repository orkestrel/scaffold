**Lane:** subjective (shape, naming, the consumer's override contract, and how the rulings read in the guide), `planner` on Opus 5.5. The brief's Output asks for one ruling per question, a units table and risks. I placed the rulings under `Design`, the table under `Units` and the risks under `Risks`, which merges the brief's shape with the lane's section list. The objective-lane sections are left empty.

## Design

**The shared vocabulary.**
- A role's text on the page reads the role's **on-canvas tier**. That tier is the existing emphasis tier, `--vn-color-<role>-emphasis`, reached through its `--bs-<role>-text-emphasis` alias.
- A size is **fluid** below the `xl` boundary and **capped** at and above it. The guide already uses "fluid formula" and "cap" (`guides/veneer.md:6161-6163`).
- The design introduces no other terms.

**P7-1, the population.** Recommendation: move every role-colored text mark that sits on the canvas to the tier. Leave the neutral roles and the tinted surfaces as they are.
- **In, text utilities.** `.text-{primary,secondary,success,info,warning,danger}`, which today read the channel at `src/styles/utilities/_color.scss:11-12`.
- **In, link helpers.** `.link-<role>` for those same roles, covering the resting `color` and its `text-decoration-color`, so the link keeps one color (`src/styles/utilities/_link.scss:27-32`).
- **In, link hover.** The hover of `.link-<role>` moves the tier away from the canvas, toward `--vn-text-emphasis-base`, by the release's 20% share (`_link.scss:7`). Today it moves the fill toward the label's endpoint (`_link.scss:22-26`). The new direction matches the Veneer `a` hover, which moves toward black in light and toward white in dark (`src/styles/_tokens.scss:66,133`). It also keeps hover contrast at or above the resting contrast.
- **In, outline buttons.** `.btn-outline-<role>` resting and disabled text for every role in `$roles` except `light` and `dark`, `tertiary` included, because the button loop walks `tokens.$roles` (`src/styles/components/_button.scss:141,174,186`). The border stays on the fill, because a border is non-text.
- **In, validation.** `.valid-feedback`, `.invalid-feedback`, and the checked labels, reached through the token rather than the selectors. `--vn-form-valid` and `--vn-form-invalid` become `var(--vn-color-success-emphasis)` and `var(--vn-color-danger-emphasis)` in light as well; dark already reads them (`_tokens.scss:70-71,137-138`). Write each once inside `theme-tokens` (`src/styles/_mixins.scss:443-444`) and drop the duplicate map keys. The consumer contract stays `--bs-form-valid-color` (`src/styles/components/_validation.scss:19,115`).
- **Out, neutral roles.** `.text-light`, `.text-dark`, `.link-light`, `.link-dark`, `.btn-outline-light`, and `.btn-outline-dark`. These are surface-contrast colors meant for a surface of the opposite tone. Their tiers are gray steps (`_tokens.scss:39-45,103-109`), so moving them would turn `.text-light` gray-700 on a light canvas.
- **Out, other.** `.text-black`, `.text-white`, `.text-body`, and `.link-body-emphasis`. `.text-bg-*` is text on a fill. `.link-underline-<role>` is a decoration utility, not text.
- **Out, already on the tier.** `.alert-*`, `.list-group-item-*`, and `.accordion-button:not(.collapsed)` already read the tier on tinted surfaces (terrain sites §Other role-colored text).
- **Naming.** Add one list beside `$aliased` in `_tokens.scss:11`: `$neutrals: light, dark;`. Each walker in `_color.scss`, `_link.scss`, and `_button.scss` skips a neutral, so the exclusion has one home.
- **The `a` link and its readers** (`.nav-link`, `.page-link`, `.btn-link`) are the one user choice; see Tensions. The recommendation is `--vn-link-base: var(--vn-color-primary-emphasis)` in light and in dark. Light does not change, because it is already the 70% mix (`_tokens.scss:64`). Dark moves from 80% to 70% (`_tokens.scss:131`).

**P7-2, the mechanism.** Recommendation: write `.text-<role>` as `rgb(from var(--bs-<role>-text-emphasis) r g b / var(--bs-text-opacity))`.
- This is the relative-color form the `a` rule already uses (`src/styles/elements/_a.scss:3`).
- The alpha slot keeps `.text-opacity-*` working, and the `--bs-*` alias keeps the partial's convention of reading the release's compatibility names (`_color.scss:7-9`).
- `.link-<role>` uses the same form over `--vn-color-<role>-emphasis`, keeping that partial's convention of reading Veneer tokens (`_link.scss:28`).
- Cost: the ledger gains `.text-<role>` `color` rows with the departure `aliased`, "reads another compatibility variable" (`guides/veneer.md:7136-7137`).
- Refused alternative: a bare `color-mix()` loses the alpha slot, so the opacity steps would stop working (terrain sites:26).

**P7-3, the override contract.**
- To move a role's text on the page, retune `--vn-color-<role>-emphasis`, or `--bs-<role>-text-emphasis` on a scope.
- To move the whole role (fill, tiers, and text), retune `--vn-color-<role>-base` at the root.
- `--vn-color-<role>-rgb` and `--bs-<role>-rgb` move fills, underlines, and focus rings, and do not move `.text-<role>`. The guide states this as a departure, because a Bootstrap consumer expects `--bs-primary-rgb` to recolor `.text-primary`.
- The retune proof at `tests/src/styles/utilities/color.test.ts:113-114` changes in three ways:
  - Setting `--vn-color-primary-base: rgb(200, 0, 0)` at the root makes `.text-primary` match an inline twin painting `color-mix(in oklab, rgb(200 0 0) 70%, var(--vn-text-body-base))`.
  - `.text-primary` equals `.text-primary-emphasis`.
  - A negative case: setting `--vn-color-primary-rgb: 20, 80, 140` leaves `.text-primary` unchanged, and that is the assertion that separates the tier from the channel.

**P7-4, emphasis identity.** Recommendation: accept that `.text-<role>` and `.text-<role>-emphasis` are the same color, and make that structural by having both read one alias.
- Reasons: the ruling defines on-page role text as exactly the 70% mix, and the emphasis tier already is that mix (`_mixins.scss:376-380`).
- A second token holding the same value is state that can drift.
- Moving the emphasis tier instead would recolor the alert, list-group, and accordion text, which the ruling does not touch.
- The one remaining difference is opacity: `.text-<role>` honours `.text-opacity-*`, while `.text-<role>-emphasis` sets the color alone, as the release writes it (`guides/veneer.md:6266`).
- Cost: the release's gradation, where the emphasis class is darker than the role class, is lost. The guide says so in one sentence, and a proof asserts the equality so any later divergence is deliberate.

**P8-1, the formula.** Recommendation: send every heading level, `.h*`, `.fs-*`, `.display-*`, and `legend` through one Sass function over the size token, and cap each with a `breakpoint-up(xl)` declaration of the token itself.
- The arithmetic is the release's responsive font size rule (base 1.25rem, factor 10, boundary 1200px, which is `breakpoint(xl)`, `_mixins.scss:137-138`). In words: the size, less its excess over the floor, scaled by how far the viewport sits below 1200px:
  `calc(S - max(S * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px))`
- The `max(…, 0px)` guard is what keeps a size at or under 1.25rem fixed, whatever value a consumer retunes it to.
- Proposed Sass shape:
  - A function `fluid($size)` in `_mixins.scss`, using the release's term.
  - A mixin `font-size($size)`, named after the release's own responsive-font-size mixin, which emits the fluid value and the `xl` cap. `_heading.scss`, `_type.scss`, and `_fieldset.scss` include it.
  - `_font.scss` writes the fluid values through the `utility` mixin, then writes the caps in one trailing `breakpoint-up(xl)` block after the walk, where the release places its cap block.
  - `heading-size` stays as it is (`_mixins.scss:156-158`).
- The following figures are computed from the formula, not measured:

| Selectors | Token (default) | 390px | 1280px |
| --- | --- | --- | --- |
| `h1` `.h1` `.fs-1` | `--vn-size-8` 36px | 26.28px | 36px |
| `h2` `.h2` `.fs-2` | `--vn-size-7` 30px | 23.925px | 30px |
| `h3` `.h3` `.fs-3` | `--vn-size-6` 24px | 21.57px | 24px |
| `h4` `.h4` `.fs-4` | `--vn-size-5` 20px | 20px | 20px |
| `h5` `.h5` `.fs-5` | `--vn-size-4` 18px | 18px | 18px |
| `h6` `.h6` `.fs-6` | `--vn-size-3` 16px | 16px | 16px |
| `.display-1` to `.display-6` | 80, 72, 64, 56, 48, 40px | 43.55, 40.41, 37.27, 34.13, 30.99, 27.85px | 80, 72, 64, 56, 48, 40px |
| `legend` | `--vn-size-6` 24px | 21.57px | 24px |

- The display values equal Bootstrap's own, because the display tokens hold the release's sizes (`guides/veneer.md:7658-7674`).
- `legend` moves onto the shared function from its own hand formula (`src/styles/elements/_fieldset.scss:15`). At the default it resolves the same value, and the stylesheet keeps one fluid term.

**P8-2, token retunability.**
- **With typed arithmetic** (`100vw / 1200px` resolving to a number), the slope follows the token.
  - Example: `--vn-size-8: 101px` reads 51.79px at 390 and 101px at 1280, continuous across 1200.
- **Without typed arithmetic**, the viewport's contribution must be a fixed number of `vw`, which the CSS cannot scale by a length.
  - The best form is then a shift: `calc(S + k·1vw − k·12px)`, with `k` computed in Sass from the default. For `h1` that is `calc(var(--vn-size-8) + 1.2vw - 0.9rem)`.
  - It stays continuous at 1200 for any retune, but the slope is frozen. The same retune then reads 91.28px at 390.
  - Sass would also need the default sizes as a map, which does not exist.
  - This beats the `legend` precedent's `S * 0.85 + 0.3vw` form, which jumps at 1200 when retuned.
- Retune proofs read two viewports:
  - At 1280 the class equals the retuned token.
  - At 390 it equals a TypeScript oracle of the release rule applied to the retuned value.
  - A continuity reading compares 1199 with 1200 under a retuned token.

**P8-3, the ledger.**
- Every `@media (min-width: 1200px)` row that reads `dropped` becomes a kept row: Veneer `var(--vn-size-N)` or `var(--vn-display-N)`, departure `tokenized`. Its Condition cell uses Veneer's query text, following the `legend` row (`guides/veneer.md:9209`).
  - Affected rows: `.h1`–`.h4` (`guides/veneer.md:8124,8135,8146,8157`), `h1`–`h4` (`9146-9155`), `.fs-1`–`.fs-4` (`7904-7913`), and `.display-*` (`7659-7674`).
- Every base `font-size` row, and the `legend` row at `9208`, keeps `tokenized` with the fluid expression as its Veneer value.
- Rows added where Bootstrap writes nothing: the cap rows for `h5`, `h6`, `.h5`, `.h6`, `.fs-5`, and `.fs-6`, with Bootstrap `—`.
- Rewrite the prose at `6158-6163` and the departure bullet at `6196-6202`. The departure becomes: "the size classes follow the release's rule over Veneer's heading scale".
- Proposed guide sentence: "Below a 1200px viewport a heading, size, or display class shrinks by the release's responsive rule over its size token; from 1200px it resolves the token. A size at or under 1.25rem holds at every viewport, so `h4` to `h6` hold 20px, 18px, and 16px."

## Alternatives

- **Emit the fluid value and cap only where Bootstrap emits them** (`h1`–`h4`, `.fs-1`–`.fs-4`, `.display-*`).
  - Gain: the ledger maps 1:1 with no added cap rows, and Bootstrap's order quirk survives: at 1200px and wider, `.fs-1` beats `.fs-6` on one element, because the release's trailing cap block comes later.
  - Cost: retuning `h5` or `h6` never makes them fluid, although the release's rule would. Retunability then depends on the level in a way a consumer cannot see. It also needs a hard-coded "levels 1 to 4" constant.
  - Rejected, because the tokens are runtime knobs and only the uniform rule behaves like the release's rule under a retune.
- **A single `min(S, fluid)` declaration with no media query.**
  - Gain: fewer declarations.
  - Cost: the ledger would still mark the cap row `dropped` while the cap holds, which is a misleading row, and it diverges from the release's two-declaration shape a Bootstrap reader expects in DevTools.
  - Rejected.

## Constraints

## Refusals

## Measurements

## Units

The source units are Astra work because they are constraint-heavy: arithmetic, cascade, and the ledger gate. The guide voice goes to Opus. Every writer runs in the one Veneer checkout, one at a time, in the order U0 → U1 → U2 → U1b (after the user's answer) → U3 → U4.

| Unit | Role / engine | Owned files | Shared files (report-only unless owned here) | Depends on | Acceptance | Proofs | Mutation that must redden |
| --- | --- | --- | --- | --- | --- | --- | --- |
| U0 PROBE | `builder` / Sonnet writes the probe script; the Orchestrator runs it on host Chromium 141 | a probe script under `appearance-instruments/` | none | none | The script records four readings: typed arithmetic for `S = 36px` and `S = var(--s) = 101px` at 390 and 1280; the tertiary tier's contrast in light and in dark; the `.link-<role>` hover contrast under the proposed hover rule; and the vitest default viewport width | readings in its log | not applicable |
| U1 P7-TEXT | `sol` / GPT-6 Astra | `src/styles/utilities/_color.scss`, `src/styles/utilities/_link.scss`, `src/styles/components/_button.scss`, `tests/src/styles/utilities/color.test.ts`, `tests/src/styles/utilities/link.test.ts`, the button and validation test files | `src/styles/_tokens.scss` (`$neutrals`, valid/invalid), `src/styles/_mixins.scss` (`theme-tokens`), `tests/setupStyles.ts` (text, link, and validation case tables), the ledger rows in `guides/veneer.md` for this unit's selectors | U0 (tertiary and hover readings) | Conformance ledger green; scoped suites green; `$neutrals` is the only home of the exclusion | An executed contrast of at least 4.5 to 1 against the scope's `--bs-body-bg`, per role, in light and in dark, for `.text-<role>`, `.link-<role>` at rest and on hover, `.btn-outline-<role>` resting, and the feedback text and checked labels; `.text-X` equals `.text-X-emphasis`; each opacity step's alpha over the tier's channels; the P7-3 retune and negative cases | Tier mix set to 80% (dark info 4.30, danger 3.95); `.text-danger` reverted to the channel (dark 2.75); a bare `color-mix()` (opacity alpha stays 1); `$neutrals` removed (`.text-light` resolves gray-700) |
| U2 P8-TYPE | `sol` / GPT-6 Astra | `src/styles/elements/_heading.scss`, `src/styles/components/_type.scss`, `src/styles/utilities/_font.scss`, `src/styles/elements/_fieldset.scss`, `tests/src/styles/elements/heading.test.ts`, `tests/src/styles/components/type.test.ts`, `tests/src/styles/utilities/font.test.ts`, the fieldset test file | `src/styles/_mixins.scss` (`fluid`, `font-size`), `tests/setupStyles.ts` (the tables at 3183-3232 gain their 390px values), the size ledger rows in `guides/veneer.md` | U0 (typed arithmetic), U1 | Ledger green; every heading, `.h*`, `.fs-*`, `.display-*`, and `legend` reading matches the P8-1 table | Per selector at 390 and 1280 against a TypeScript oracle of the release rule; retunes at 390 and 1280; 1199 against 1200 continuity under a retune; `fs-6 fs-1` resolves `fs-1` at 390 and 1280 | A literal size (1280 reads 36, not 101); a missing cap (1280 reads 36.96); a frozen slope (390 reads 91.28, not 51.79); the boundary set to 1400 (1280 reads fluid); the guard removed with `--vn-size-3` retuned to 12px (390 reads above 12) |
| U1b P7-LINK | `sol` / GPT-6 Astra; runs after the user answers the link choice | none beyond shared | `_tokens.scss` (dark `link`, `link-rgb`, `link-hover-rgb`), `tests/setupStyles.ts` `TEXT_A_CASES`, the token rows in `guides/veneer.md` | U1 and the user's answer | `a` equals `--vn-color-primary-emphasis` in light and in dark | `a` contrast of at least 4.5 in light and in dark; `a` equals `.text-primary` | Dark `link` restored to 80% (colors differ) |
| U3 GUIDE | `opus` / Opus 5.5 | prose in `guides/veneer.md`: § Color utilities 6253-6273, § Font utilities 6158-6202, type and heading prose, link, button, and validation prose, § Tokens 6712, 6806, 6916-6917 | ledger rows (owned by U1, U1b, U2; read-only here) | U1, U2, U1b | Guide parity green; the override contract stated per P7-3; the identity sentence per P7-4; the fluid sentence and 390/1280 figures per P8-1; no banned terms | Parity test; prose checked against the shipped readings | Parity plant |
| U4 GATES | `verifier` / Sonnet | none | none | U3 | `format:check`, `lint:check`, `check`, `build`, and `test` run and read | the gate logs | not applicable |

The audit of U1, U2, and U1b needs an auditor whose engine did not write them: the objective lane goes to `analyst` on Opus 5.5 and the subjective lane to `reviewer` on Astra, per the lane-swap rule. Add a capture portfolio at 390 and 1280, in light and in dark, for headings, outline buttons, and links.

## Tensions

- **User choice (deviation contract).** The ruling says colored text takes "Elements' on-canvas tier … mixed in oklab at 70 percent" (`/home/user/veneer/ROADMAP.md:183`). Elements' own dark tier mixes at 80% (terrain sites:88), and Veneer's `a` link already follows it (`_tokens.scss:131`).
  - The two clauses conflict only for the `a` link and its readers.
  - I recommend 70%, the clause that carries the number and the contrast reason. Dark 80% already clears 8.01 to 1 (`oncanvas-probe-2.log.txt:2`), so both are legal.
  - U1b waits for the answer, and nothing else blocks on it.
- **Link hover direction.** Moving away from the canvas departs from the release's label-driven shade and tint (`tests/src/styles/utilities/link.test.ts:61-63`). Under the release's rule, a dark-mode shade darkens the tier toward the dark canvas, so contrast drops. The U0 hover readings settle whether that drop falls below 4.5.
- **Uniform fluid set.** The recommended design gives up the release's `.fs-1`-over-`.fs-6` cap-order quirk at 1200px and wider, and adds cap rows for `h5`, `h6`, `.h5`, `.h6`, `.fs-5`, and `.fs-6`.
- **Emphasis identity.** It loses the release's darker `.text-*-emphasis` gradation.
- **Legend folded into P8.** This is consolidation of the same mechanism, not the ruling's named selectors.
- **Outline buttons.** The label sits on the tier while the border stays on the fill, so the two differ slightly in color.
- **Readings the design needs and the dispatch did not supply:**
  - typed arithmetic in Chromium 141 (the brief's Unknown);
  - the tertiary tier's contrast in light and in dark, which is absent from the table at brief lines 34-41;
  - `.link-<role>` hover contrast;
  - the vitest default viewport, which decides whether today's 36px pins go red at rest.

## Risks

- **No typed arithmetic.** U2 switches to the shift form, which needs a Sass size map and freezes the slope. Settle this with U0's typed-arithmetic reading.
- **Light-mode validation change spreads.** `--vn-form-valid` also colors the valid border and the checked-input fill (`_validation.scss:45,100,105`), so light-mode borders and checked checkboxes darken. Settle this with captures.
- **Heading pins at other viewports.** Pixel pins beyond the named tables may read a heading, display, or legend size at a viewport under 1200px. The objective lane or U0 must derive that set by running the suite, not by reasoning.
- **Retune contract for Bootstrap migrants.** A migrating consumer who retunes `--bs-primary-rgb` no longer moves `.text-primary`. The guide departure sentence is the only mitigation, so the U3 audit must confirm it.