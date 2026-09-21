<!-- Retained from the planner's returned result (native Opus 5, Agent dispatch, clean context, subjective lane, 2026-09-21) for content-layout-design-brief.md. The objective lane ran on Astra, blind. -->

## Lane

I held the **subjective** lane: shape, naming, ergonomics, the decomposition's feel, and the guide's ledger shape. The objective lane ran on another engine and I did not see it.

# Design

## 1. The organising rule: the inventory key is the shipping unit

The conformance gate keys on the inventory component, not on the partial. `collectShippedComponents` admits a key only when every `selector` and `variable` row it carries reads `shipped` (`C:/Users/mikes/WebstormProjects/veneer/tests/setupConformance.ts:596-609`), and `scanCompatibilityPresence` then requires every official selector string of that key, less the deferrals, to appear in the built cascade (`tests/setupConformance.ts:623-674`). So a unit boundary that cuts a key in half cannot flip that key, and a unit that flips a key must carry the key whole.

Three readings make that rule cheap to follow:

- The gate compares **distinct selector strings in a set**, not rules and not declarations (`tests/setupConformance.ts:637-639`). Shipping `h1` needs one rule whose selector is `h1`; the declarations are proved by the styles suite instead.
- The bare tag and its class twin are **different keys**. The `reboot` key carries `h1` (`tests/fixtures/oracle/inventory.json:3097`, `:3127`, `:3141`) and the `h1` key carries `.h1` (`:5452`). So the Reboot tag work and the typography-class work can land in different units.
- `readOracleInventory` projects each entry to its selector string (`tests/setupConformance.ts:752-757`), and the pinned fixture is what the gate reads, not the campaign ledger.

Everything following is ordered by that rule.

## 2. Where each mechanism lives

`.claude/rules/styles.md` maps a folder to its own cascade layer, so Veneer keeps the two folders it has and adds no third. The `reset` layer is declared (`src/styles/_tokens.scss:3`) and empty; it is the home for the document-wide rules that select no tag.

| Mechanism | Partials | Layer |
| --- | --- | --- |
| Universal box model, `[hidden]`, `:root` scroll behaviour | `src/styles/_reset.scss` (new) | `reset` |
| Reboot tag rules | `src/styles/elements/_<tag>.scss`, one partial per bare tag | `elements` |
| Typography, list, quote, image classes | `src/styles/components/_type.scss`, `_list.scss`, `_quote.scss`, `_image.scss` | `components` |
| Links | `elements/_a.scss` and `components/_link.scss` | `elements`, `components` |
| Containers, grid, gutters | `components/_container.scss`, `components/_grid.scss` | `components` |
| Tables | `elements/_table.scss` (tag) and `components/_table.scss` (class) | `elements`, `components` |
| `icon-link`, `ratio`, `vr` | `components/_icon-link.scss`, `_ratio.scss`, `_vr.scss` | `components` |

**Partial naming.** One partial per bare tag, named exactly as the selector spells the tag, which is the convention `_html.scss`, `_body.scss`, and `_button.scss` already set and which the policy mirror rule reads through the leading underscore. A partial carries a second tag only where the HTML content model mandates the pairing — the set `MANDATED_TAG_PAIRS` already names (`tests/setupStyles.ts:427-446`), so `_dl.scss` carries `dt` and `dd`, `_table.scss` carries `caption`, `thead`, `tr`, `th`, `td`, `_figure.scss` carries `figcaption`, `_fieldset.scss` carries `legend` — or where Bootstrap ships one rule for a fixed tag family, which is the heading family alone and takes the plain name `_heading.scss`. That keeps the elements-layer guard at `tests/src/styles/index.test.ts:23-27` green without a single exemption.

## 3. The variable contract: two tiers, already established

U7a fixed the direction and this family follows it without amendment. A component partial declares `--bs-{component}-*` on the component root bound to a `--vn-*` value, then reads the `--bs-*` name in its own declarations (`src/styles/components/_button.scss:6-58`), so a consumer writing the documented knob changes the paint. A root-scope `--bs-*` name is an alias of a canonical token and is read-direction only; the customization contract tells the consumer to override the canonical token (`guides/veneer.md:570-572`).

The family's missing bindings resolve against that contract:

| Missing binding | Ruling | Value and its source |
| --- | --- | --- |
| `--bs-link-opacity` | No canonical token. `elements/_a.scss` writes `color: rgba(var(--vn-link-rgb), var(--bs-link-opacity, 1))`, matching Bootstrap's own expression (`node_modules/bootstrap/dist/css/bootstrap.css:352`), because the name is a consumer knob the `.link-opacity-*` rules write rather than a Veneer value. | Bootstrap's `1` fallback, retained and recorded. Elements' anchors are opaque and calibrate nothing here. |
| `--bs-link-underline-opacity` | Same shape. Declared by the `.link-underline-*` and `.link-underline-opacity-*` rules in the Links unit, read by the anchor's `text-decoration-color`. | Bootstrap retained. Elements has no counterpart. |
| `--bs-body-text-align` | Declare nothing. Bootstrap emits no `:root` value for it, so `elements/_body.scss` writes `text-align: var(--bs-body-text-align, start)` and the explicit fallback replaces Bootstrap's invalid-at-computed-value-time path. Recorded as a departure. | No value declared; `start` is the fallback. |
| `--bs-gutter-x`, `--bs-gutter-y` | Canonical `--vn-space-9`. `.container` and `.row` declare `--bs-gutter-x: var(--vn-space-9)` and `--bs-gutter-y: 0` and read them; `.g-*`, `.gx-*`, `.gy-*` rewrite them from the space ramp. | Bootstrap's `1.5rem` retained; Elements ships no container and no gutter mechanism (`C:/Users/mikes/WebstormProjects/elements/src/styles/components/_div.scss:25-28`). |
| The `--bs-table-*` family | Declared on `.table`, bound to existing canonical tokens: colour to `--vn-text-body-base`, border to `--vn-border-color`, background and accent to `transparent`, and the striped, hover, and active backgrounds to a `color-mix` of `--vn-state-mixer` at `--vn-state-stripe`, `--vn-state-hover`, and `--vn-state-active`. | The mixer and the hover and active percentages already exist in the theme closure (`src/styles/_mixins.scss:83-85`). `--vn-state-stripe` is new and takes Elements' measured table row tint; where Elements' table carries no striping, Bootstrap's `0.05` alpha is retained as the percentage. |
| `--bs-aspect-ratio` | Declared on `.ratio` and rewritten by the `.ratio-*` family, read by the `::before` padding. No canonical token: it is a per-instance knob. | Bootstrap's `$aspect-ratios` retained; Elements has none. |
| `--bs-icon-link-transform` | Declared on the `.icon-link-hover:hover > .bi` rule as Bootstrap declares it, read with Bootstrap's own fallback. No canonical token. | Bootstrap retained; Elements has none. |
| Spacers at `1.5rem` and `3rem` | `--vn-space-9: calc(1.5rem * var(--vn-factor-density))` and `--vn-space-10: calc(3rem * var(--vn-factor-density))`, continuing the ramp at `src/styles/_tokens.scss:222-229`. The step widens above `--vn-space-8`, and § Tokens records why: layout spacing is coarser than control spacing, and these two steps exist because the gutter scale reads them. | Bootstrap's `$spacers` 4 and 5, retained. |
| Display heading sizes | `--vn-size-9: 2.5rem` through `--vn-size-14: 5rem`, continuing the ramp at `src/styles/_tokens.scss:208-215`; `.display-6` reads `--vn-size-9` and `.display-1` reads `--vn-size-14`. | Bootstrap's `$display-font-sizes`, retained. Elements renders no display heading. |

The heading tags need no new token: Elements' calibrated `36/30/24/20/18/16 px` at weight 600 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.md:25-34`) is exactly `--vn-size-8` through `--vn-size-3`. Veneer's fixed scale replaces Bootstrap's fluid `calc(1.375rem + 1.5vw)` and its `1200px` step, which is a departure row, not an exclusion: the selector `h1` stays present either way.

Every new `--vn-*` name moves the published registry, because `tokens.test.ts` asserts bidirectional equality between the cascade's `--vn-` partition and the leaves of `TOKEN_NAMES`. The family therefore moves `src/core/types.ts` and `src/core/constants.ts` **once**, in one early token unit, and every later unit only consumes.

## 4. Containers and the grid without an Elements calibration

**Ruling: Bootstrap's own values are the source, recorded in the guide as retained.** Not an exclusion.

Three reasons, in order of weight. The value-source law U3 already runs says calibration row, else Bootstrap's own value recorded as retained, else not declared; the grid is the ordinary second case. Elements' layout identity is not merely absent but inadmissible: its shell is a `body:has(main)` named-area grid (`C:/Users/mikes/WebstormProjects/elements/src/styles/components/_body.scss:3-19`) that infers layout from document structure, which Veneer's own Semantics decision forbids (`plan.md:102`), and it skips `.container` deliberately (`_div.scss:25-28`). And an exclusion would strike the `container`, `row`, `col`, `offset`, `g`, `gx`, and `gy` rows the ledger assigns to this family (`ledger.md:43-49`, `:64`, `:67`), which the exit criterion requires implemented, excluded, or retained — and none of them has a reason to be excluded.

**The consequence for captured acceptance, and the answer.** The exit criterion asks for captured acceptance against Elements' specimens, and for these keys there is no Elements specimen to photograph. The portfolio's second side becomes the pinned official Bootstrap rendering instead: `tests/setupConformance.ts` already launches a Playwright page carrying the pinned official `bootstrap.css`, so the same harness renders the official container, row, column, offset, and gutter markup and produces the comparison frames. Stated as a rule the family reuses: **the portfolio's second side is Elements where Elements carries the specimen, and the pinned official Bootstrap page where it does not.** That also supplies the geometry evidence the grid actually needs — the twelve-column arithmetic, the gutter halving, and the breakpoint switch points — which an Elements frame could never have supplied.

## 5. The proofs

**The breakpoint axis needs no new package surface.** The installed Test package rules on this directly: `stagePane` is capture staging alone, and "a suite that resizes the tester for a journey — a breakpoint to drive, a variant to act at — calls `page.viewport` from `vitest/browser` and leaves the tester there" (`C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2715-2718`). That function exists on the installed context (`node_modules/@vitest/browser/context.d.ts:814-816`) and the journey file already imports `page` from `vitest/browser` (`tests/app/browser/integration.test.ts:39`). So the styles suite drives `page.viewport(width, height)` at `375`, `576`, `768`, `992`, `1200`, and `1400 px`, from a frozen case table in `tests/setupStyles.ts`, with an `afterEach` restoring the file's starting viewport — the same discipline the journey file applies to `releasePane` (`tests/app/browser/integration.test.ts:104-120`). No Test release unit is a prerequisite for this family.

**The media condition must be proved against the token.** The Sass `$breakpoints` map that authors `@media (min-width: …)` and the published `--vn-breakpoint-*` tokens (`src/styles/_tokens.scss:275-280`) are two sources for one value. The token proof reads each `CSSMediaRule` condition out of the built cascade and compares it against the resolved token, so a drift between the map and the tokens reddens rather than silently splitting the grid from its published breakpoints.

**Capture states, in `<mechanism>-<state>` form**, each with the `-dark` twin the registry convention already uses (`tests/setup.ts:39-44`): `content-rest`, `type-scale-rest`, `link-rest`, `link-hover`, `link-focus`, `list-rest`, `quote-rest`, `media-rest`, `ratio-16x9`, `table-rest`, `table-striped`, `table-hover`, `layout-390`, `layout-1280`, `grid-gutters`. The two viewport-named layout states are the family's reason to photograph at both registered widths rather than to apply a state.

**Showcase sections**, one `sections/` member per showcase concern rather than per unit, so a reader meets the same grouping the guide uses: `ContentSection` (bare-tag specimens), `TypeSection` (the class twins, display, lead), `LinkSection`, `ListSection` folded into `TypeSection`, `MediaSection` (images, figures, ratio, `vr`, icon links), `TableSection`, `LayoutSection` (container, grid, gutters, offsets). Each is a `SectionInterface` over a frozen specimen table in `app/browser/constants.ts`, exactly as `ButtonSection` is (`app/browser/sections/ButtonSection.ts:22-59`). A section created by one unit and grown by a later one is normal here, because the checkout serializes writers anyway.

**Guide rows.** Each shipped key gains a `selector` row, and a `variable` row where the key declares official custom properties. The Reboot documentation obligations become `reboot` rows with the kinds `obligations.md:232-241` already assigns and a dash in Proof, because no Button-style interaction recording can drive them.

## 6. Withholding vocabulary: deferred, and excluded

The presence scan has one withholding mechanism, the `### Deferred selectors` table, whose `Owner` column names the unit that deletes the row when it ships the name (`guides/veneer.md:171-239`, read by `tests/setupConformance.ts:527-573`). Content/layout meets a second kind: a name that no unit will ever ship.

**Ruling: keep one table and one reader; let `Owner` carry `Excluded` for a permanently withheld official name, with the ledger's own reason in the `Reason` cell.** The reader already requires all three cells non-empty and nothing more, the presence scan already refuses a withheld name that appears in the cascade, and the exclusion prose already sits at the end of § Compatibility (`guides/veneer.md:719-725`). The contract unit adds the planted control that an `Excluded` name present in the cascade reddens. I keep the two-grammar question the U7d round raised — `### Deferred selectors` under § Styles against `### Deferred names` under § Tokens — open for the user rather than settling it inside this family.

## 7. The Reboot obligations the tree lacks

| Obligation | Unit | Home |
| --- | --- | --- |
| `[hidden] { display: none !important }` (`obligations.md:240`) | CL3 | `src/styles/_reset.scss`, in the `reset` layer |
| `a:not([href]):not([class])` and its `:hover` twin (`obligations.md:239`) | CL3 | `src/styles/elements/_a.scss`; the selector carries one bare tag, so the elements-layer guard admits it |
| `*`, `*::before`, `*::after` box sizing | CL3 | `src/styles/_reset.scss` |
| `:root { scroll-behavior: smooth }` under `prefers-reduced-motion: no-preference` (`bootstrap.css:190-194`) | CL3 | `src/styles/_reset.scss`, written inline because `.claude/rules/styles.md` refuses a mixin for one caller |
| The eight compound selectors | Never | Excluded rows in the deferral table with `Owner` `Excluded`, quoting `ledger.md:585` |

`[hidden]` in the `reset` layer carries one consequence worth stating plainly: an important declaration in a lower layer outranks an important declaration in a higher one, so Veneer's `[hidden]` will beat a later `.d-block` utility where Bootstrap's source-ordered pair lets the utility win. I land it in `reset` now, record the difference in § Departures, and give the Helpers/utilities unit the standing obligation to prove the documented override and to relocate the rule if the proof fails.

## 8. Exclusions to report to the user

| Row | Reason |
| --- | --- |
| `ol ol`, `ul ul`, `ol ul`, `ul ol`, `pre code`, `a > code`, `kbd kbd`, `legend + *` | Already excluded at `ledger.md:585`; the product decision infers no treatment from a tag combination, and `tests/src/styles/index.test.ts:23-27` refuses such a selector in the elements layer. Reported again at this family's acceptance because this is the unit that owns them. |
| `::-moz-focus-inner` (`bootstrap.css:499`) | Names a Gecko-only pseudo-element. Veneer records receipts on managed Chromium and Edge, so no instrument on either receipt can reach it and the row can never pass. |
| The opt-in CSS Grid classes `.grid`, `.g-col-*`, `.g-start-*` | `$enable-cssgrid` is off in the tracked release, so the shipped stylesheet carries no such vocabulary and the ledger has no row. The plan's queue asks for them to be classified separately (`plan.md:586`); they stay out unless the user asks for the opt-in build. |
| Every RTL difference in this family, including the `icon-link` RTL rows (`ledger.md:56`) | The user's standing ruling that no time goes to RTL. |

Two rows that are departures rather than exclusions, and are reported the same way: the fixed heading scale replacing Bootstrap's fluid sizes, and `[hidden]`'s layer placement.

# Alternatives

**Alternative A — one unit per inventory key.** Twenty-six units, each flipping its own key the moment it lands, which is the strongest possible gate arming. Refused: the audit round is the fixed cost here, not the writing, and this multiplies rounds by roughly two and a half for no design gain. The mechanism grouping keeps every key whole — which is the property that actually matters to the gate — while bundling keys that share one partial, one showcase section, and one token decision. It buys back most of the arming by landing the contract unit first, the way U7d ran before U7a.

**Alternative B — one Reboot unit rather than two.** Flips the family's largest key in a single landing and never leaves a key half-authored. Refused on the size evidence the campaign already has: U7a carried 103 selectors and one component and needed ten briefs, four of which stopped on scope alone (`plan.md:1003-1036`); the `reboot` row records 117 selectors (`ledger.md:66`) across roughly two dozen partials, plus the vendor pseudo-element rules that must be reproduced string for string. The split keeps the `reboot` row `accepted` across both units and flips it in the second, so the key is never half-shipped — only unshipped and then shipped.

# Constraints

Not my lane.

# Refusals

Not my lane.

# Measurements

Not my lane. The readings I relied on are cited inline with their `file:line`.

# Units

Serial in Veneer, one writer per checkout, except CL0 which runs in the Elements checkout and can run beside CL1 and CL2. Each unit takes one audit round with the lanes swapped by writer — `reviewer` on Opus objective and `analyst` on Astra subjective after an Astra unit, the reverse after an Opus unit — plus `checker` where the criteria are mechanical, then `verifier`. Record the Astra substitution against the transport pin in every routing ledger.

**Standing scope clauses every brief in this family carries**, derived from what each change makes false rather than from what it declares:

- `tests/conformance.test.ts:55` holds the explicit `listed` array; a unit that flips a key owns that line.
- `src/core/types.ts` and `src/core/constants.ts` hold the token registry; a unit that adds a `--vn-*` name owns both, and `tokens.test.ts` reddens otherwise.
- `tests/setupStyles.test.ts` and `tests/setupBrowser.test.ts` carry export-inventory cases that any new setup export grows; that assertion is the unit's to update.
- `app/browser/constants.ts` is the single home for specimen tables (`.claude/rules/architecture.md:218` bars a centralized file inside an entity subfolder); each unit owns the rows it adds and nothing else in the file.
- `tests/setup.ts` holds `PORTFOLIO_STATES`; only the journey unit writes it.
- Every vendored path `scaffold repair` restores is off-limits.

| Unit | Role and engine | Owns | Depends on |
| --- | --- | --- | --- |
| CL0 Content calibration | `grok` for the specimen map, `builder` for the instrument, Orchestrator for the runs and the record | Elements checkout only: `research/calibration-content.mjs`, `research/calibration-content.md` | None |
| CL1 Contract | `sol` on Astra | `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/conformance.test.ts`, `guides/veneer.md` § Styles deferral table header sentence | None |
| CL2 Tokens and breakpoints | `opus` on Opus 5 | `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/core/types.ts`, `src/core/constants.ts`, `tests/src/styles/tokens.test.ts`, `mixins.test.ts`, `tests/src/styles/fixtures/mixins.scss`, `guides/veneer.md` § Tokens rows | CL1 |
| CL3 Reset and text Reboot | `sol` on Astra | `src/styles/_reset.scss`, `elements/_html.scss`, `_body.scss`, `_heading.scss`, `_p.scss`, `_hr.scss`, `_a.scss`, `_ul.scss`, `_ol.scss`, `_dl.scss`, `_blockquote.scss`, `_address.scss`, `_abbr.scss`, `_strong.scss`, `_small.scss`, `_mark.scss`, `_sub.scss`, `_sup.scss`, `_code.scss`, `_pre.scss`, `_kbd.scss`, `_samp.scss`, `_var.scss`, `index.scss`, their mirrored proofs, `app/browser/sections/ContentSection.ts` and its proof | CL0, CL2 |
| CL4 Reboot forms, tables, media, interactive | `sol` on Astra | `elements/_table.scss`, `_fieldset.scss`, `_label.scss`, `_input.scss`, `_select.scss`, `_textarea.scss`, `_button.scss` (Reboot additions), `_img.scss`, `_svg.scss`, `_iframe.scss`, `_figure.scss`, `_summary.scss`, `_progress.scss`, `_output.scss`, their proofs, the `reboot` rows in the guide, `ContentSection` rows | CL3 |
| CL5 Typography and content classes | `opus` on Opus 5 | `components/_type.scss`, `_list.scss`, `_quote.scss`, `_image.scss`, their proofs, `app/browser/sections/TypeSection.ts` and `MediaSection.ts` with their proofs, the guide rows for those keys | CL4 |
| CL6 Links | `sol` on Astra | `components/_link.scss`, its proof, `elements/_a.scss` opacity expression, `app/browser/sections/LinkSection.ts` and its proof, the `link` guide rows | CL5 |
| CL7 Containers | `sol` on Astra | `components/_container.scss`, its proof, the breakpoint case table in `tests/setupStyles.ts`, `app/browser/sections/LayoutSection.ts` and its proof, the `container` guide rows | CL2, CL6 |
| CL8 Grid and gutters | `sol` on Astra | `components/_grid.scss`, its proof, `LayoutSection` rows, the `row`, `col`, `offset`, `g`, `gx`, `gy` guide rows | CL7 |
| CL9 Tables | `sol` on Astra | `components/_table.scss`, its proof, `--vn-state-stripe` in `_tokens.scss` and `_mixins.scss` with the registry leaves, `app/browser/sections/TableSection.ts` and its proof, the `table` guide rows | CL0, CL8 |
| CL10 Helpers | `opus` on Opus 5 | `components/_icon-link.scss`, `_ratio.scss`, `_vr.scss`, their proofs, `MediaSection` rows, the `icon-link`, `ratio`, `vr` guide rows | CL9 |
| CL11 Journeys and captures | `opus` on Opus 5 | `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/distribution.test.ts` consumer case | CL10 |
| CL12 Guide | `opus` on Opus 5 | `guides/veneer.md`, `guides/README.md` | CL11 |
| CL13 Portfolio verdict | `reviewer` on Opus 5 subjective design fit, `analyst` on Astra objective state truth, `checker` on Sonnet mechanical inventory, under `orkestrel-polish-surface`; `builder` for the Elements and Bootstrap harness | Nothing in Veneer; the harness and the verdict record | CL12 |

## Acceptance criteria, cheap-first

**CL0.** `research/calibration-content.md` records, per specimen and per mode and on both receipts, the resolved type rhythm of a paragraph, a list, a definition list, a blockquote, and a horizontal rule; the anchor's colour, decoration, thickness, and underline offset at rest and hover; the table's cell padding, border, caption, and any row tint; the figure and image treatments; and the code family's paint. Every reading names the browser, the run, and the date. The record is indexed from `research.md`. No Veneer file changes.

**CL1.** `npm run test:conformance` green with `dist/` absent. A key whose official property set is empty qualifies as shipped on its selector row alone, proved by a planted key that has selectors and no properties. An `Excluded` owner is a terminal owner: a planted `Excluded` row whose name is present in the cascade reddens, and the restored tree is green. `readDeferrals` still refuses an incomplete row by position. `test:guides` green.

**CL2.** `check:src:core` green. `TOKEN_NAMES` carries the new leaves and `tokens.test.ts` proves bidirectional equality against the cascade's `--vn-` partition, red on a planted unmapped name and restored. `--vn-space-9`, `--vn-space-10`, and `--vn-size-9` through `--vn-size-14` resolve to their recorded values at density `1` and rescale at density `1.25`. The `breakpoint-up` and `breakpoint-down` mixins emit conditions equal to the resolved `--vn-breakpoint-*` tokens, proved from the built cascade's media conditions and red on a planted disagreement. The `### Deferred names` row for the `breakpoint-down` mixin is deleted. Whole chain green on managed Chromium and Edge.

**CL3.** `npm run build:src:styles` green and the cascade's layer order unchanged. The elements-layer guard and the physical-axis guard stay green with the new partials. Resolved readings on both receipts: `box-sizing` on an arbitrary element and its pseudo-elements; `[hidden]` hides an element the layer order would otherwise paint; a bare `a` with no `href` and no class reads the default colour and decoration while a linked `a` reads the link tokens; `scroll-behavior` reads `smooth` under no-preference emulation and `auto` under reduce; each text tag's rhythm equals CL0's record. The `reboot` selector row stays `accepted` and `listed` is unchanged. Whole chain green on both receipts.

**CL4.** `scanCompatibilityPresence` returns undefined with the `reboot` selector row flipped to `shipped` and `listed` naming `reboot`, red on any one reboot selector removed from the SCSS and restored. Every excluded row sits in the deferral table with `Owner` `Excluded`. The form and table tag rules read their calibrated or retained values on both receipts. `test:guides` green. Whole chain green on both receipts.

**CL5.** The `h1` through `h6`, `lead`, `display`, `small`, `mark`, `initialism`, `blockquote`, `list-unstyled`, `list-inline`, `img`, and `figure` keys read `shipped` and `listed` names each, with the presence scan green and red on one removed selector. `.display-1` through `.display-6` resolve to the new size tokens. `TypeSection` and `MediaSection` mount, render every declared specimen, and destroy in construction order, proved through the section interface. Whole chain green on both receipts.

**CL6.** The `link` key reads `shipped`. A `.link-opacity-50` host resolves to half the anchor's alpha and a `.link-underline-opacity-25` host to a quarter of its decoration alpha, each read from the composed colour rather than from the declaration. An anchor with no utility class reads full opacity through the `1` fallback. Whole chain green on both receipts.

**CL7.** The `container` key reads `shipped`. At each of `375`, `576`, `768`, `992`, `1200`, and `1400 px` driven through `page.viewport`, `.container` resolves the recorded maximum inline size and its inline padding equals half the resolved gutter; `.container-fluid` resolves full width at every width. The suite restores the starting viewport after each case, proved by a following case reading the original width. Whole chain green on both receipts.

**CL8.** The `row`, `col`, `offset`, `g`, `gx`, and `gy` keys read `shipped`. At each breakpoint width, a twelve-column row lays out its columns at the arithmetic widths, `.offset-*` shifts by the matching fraction, and `.g-4` and `.g-5` resolve to `1.5rem` and `3rem` on the row's own negative margin and on the column padding. A column's resolved gutter is unaffected by an unrelated neighbouring row, proved on an unchanged sibling. Whole chain green on both receipts.

**CL9.** The `table` key reads `shipped` with its variable row. Every `--bs-table-*` name is declared on `.table`, and overriding each one on a mounted island changes the consumer property on the island and leaves an unchanged neighbour alone. Striped, hovered, and active rows resolve to the mixer at the recorded percentages in light and in dark. Whole chain green on both receipts.

**CL10.** The `icon-link`, `ratio`, and `vr` keys read `shipped`. `.ratio-16x9` resolves the recorded padding from `--bs-aspect-ratio` and an instance override changes it. `.icon-link-hover:hover` resolves the recorded transform and reads the declared fallback without it. Whole chain green on both receipts.

**CL11.** Every registered capture state is placed by the journey that reaches it, with the placement and filename proofs and the capture-run membership proof green. The refusal family carries the exact voice read from the installed module. The layout states are photographed at both registered widths. A planted failing journey retains its journal and tree artifacts while the run stays red. `npm run test:journey` green on the four variant projects, and the distribution stage renders a packed-CSS consumer page carrying a container, a row, a table, and a link. Whole chain green on both receipts.

**CL12.** Guide parity green. Every shipped key has its rows, every withheld name has its table row, the token rows carry each new name with its value and source, § Departures carries the fixed heading scale, the `[hidden]` layer placement, the table row tints, and the `--bs-body-text-align` fallback, and no sentence claims a reading the tree does not produce.

**CL13.** Each portfolio item carries a per-lane verdict with evidence, the second side named per key as Elements or the pinned official Bootstrap page, and one terminal line per lane. Frames preflighted for non-blank content, non-empty accessibility trees, step logs, and empty console logs, with the capture run taken last.

# Tensions

Named for the other lane to challenge.

1. **One partial per bare tag.** This lands roughly two dozen small partials and their mirrored proofs where one `_reboot.scss` would land one file. I hold it because the tree's own convention is one tag, one partial, one test, and because a mechanism-sized partial makes the mirror rule produce one unreadable test file. The cost is real and it is paid in file count.
2. **`_reset.scss` as a new root partial occupying the declared `reset` layer.** The alternative is to put the universal box model on `elements/_html.scss`, where it does not belong, because `*` is not a tag.
3. **`[hidden]` in the `reset` layer.** Layer order reverses for important declarations, so Veneer's `[hidden]` will outrank a later display utility where Bootstrap's lets the utility win. I record the difference and hand the proof to the Helpers/utilities unit rather than relocating the rule into the `utilities` layer now.
4. **`Owner` carries `Excluded` rather than a second table.** One reader, one grammar, one prose home for the reason. The objective lane may read the column's vocabulary as overloaded.
5. **The contract unit amends `collectShippedComponents` instead of the guide carrying a vacuous variable row per property-free key.** I prefer the amendment because a row promising variables for `.vr` is a sentence the guide cannot make useful.
6. **The grid's second portfolio side is the pinned official Bootstrap page.** This is the first time the campaign compares Veneer against Bootstrap's rendering rather than Elements'. It follows from Elements having no specimen, and it needs the user to accept that the identity claim for these keys is Bootstrap's geometry rather than Elements' taste.
7. **`--vn-state-stripe` is global while the hover and active percentages are reused for table rows.** One state vocabulary across button and table may prove too coarse once CL0 reads Elements' table; the fallback is per-component percentages on the component root.
8. **The space ramp's step widens above `--vn-space-8`.** The alternative is a separate layout scale that duplicates values the ramp already carries.
9. **The family adds no published TypeScript export.** Content/layout is CSS and tokens only, so no fleet name check applies beyond the token names.

**A reading the design needs and the dispatch did not supply.** Elements' content specimens are not calibrated: `research/calibration.md` records type sizes, weights, and line heights (`:22-35`) and control spacing (`:37-52`), and nothing for paragraph and list rhythm, anchor decoration and underline offset, table cell treatment, figure and image treatment, or code paint. CL0 exists to take that reading, and without it CL3, CL6, and CL9 would author Bootstrap's values while claiming Elements' identity. A second reading I could not take: whether a `page.viewport` call in one styles file leaks its size into the next file of the same project. The design answers it with a mandatory restore and a following-case assertion, but the behaviour itself is unmeasured here.

# Risks

| Risk | Evidence that settles it |
| --- | --- |
| The viewport leaks across files in the `src:styles` project, so a breakpoint case silently changes an unrelated proof's readings. | A probe running two styles files in one project, the first calling `page.viewport(1400, 800)` without restoring, the second reading `window.innerWidth`. Take it before CL7's brief is written. |
| `scroll-behavior: smooth` at `:root` destabilises the journey harness, whose accessible-traversal helpers scroll off-viewport targets into view, and the capture run with it. | Run the existing journey suite with the rule planted, on both receipts, before CL3 lands. The mitigation if it fires is to stage reduced motion for the affected journeys, not to drop the rule. |
| Reproducing the vendor pseudo-element selectors string for string — `[list]:not([type=date])…::-webkit-calendar-picker-indicator`, `::-webkit-datetime-edit-*`, `::file-selector-button` — through Sass and the CSS build, where a minifier or parser may drop or rewrite an unknown selector. | Build the cascade with one such rule authored and read the selector back out of `dist/src/styles/index.css` before CL4's brief fixes its criteria. |
| The ledger's Selectors column and the pinned fixture's entries disagree — the ledger records 3 for `h1` (`ledger.md:50`) while the fixture holds more `.h1` entries (`tests/fixtures/oracle/inventory.json:5452-5543`) — so a brief sized from the ledger under-scopes its unit. | Derive every unit's selector set from `readOracleInventory`'s projection of the pinned fixture, never from the ledger's counts, and say so in each brief. |
| The gate compares selectors and custom-property names only, so a unit can flip a key to `shipped` with correct selectors and wrong declarations and the conformance suite stays green. | The styles suite's resolved-value readings per mechanism are the only evidence that closes this; each unit's criteria name them explicitly, and each carries a planted wrong value that must redden. |
| Authoring logically (`padding-inline`, `margin-inline`) while Bootstrap ships physical pairs interacts with the physical-axis guard's symmetric-pair admission, which U7a had to widen once already (`plan.md:1017-1026`). | Compile one container rule and one row rule and read `filterAsymmetricDeclarations` over the built cascade before CL7's brief fixes its criteria. |
| The `reboot` key stays `accepted` across CL3 and CL4, so the presence gate is unarmed for the family's largest surface until CL4 lands. | CL3's own styles proofs assert its authored selectors resolve and paint; the gate's first firing is CL4's criterion, red on one removed selector and restored. |
| The grid's breakpoint matrix generates several hundred selectors, and a single missing one fails the whole key with one opaque message. | The presence scanner names the first missing selector and its component (`tests/setupConformance.ts:670`), which makes the failure diagnosable; CL8's brief requires the unit to run the scan before it runs the suite. |
| The Tailwind profile question the plan defers touches this family harder than Button: `.container`, the display utilities, and the gap and spacing utilities all collide with Tailwind's own. | Not settled here. CL12 records the collision surface in the guide so the Tailwind unit inherits a written list rather than rediscovering it. |
| Brief scope omissions, the defect that cost U7a four stops and U7b two. | Every brief in this family derives its owned set by running the suite against the change's shape — the export-inventory cases, the token registry, the `listed` array, the parity rows — and names the standing clauses in § Units. |
