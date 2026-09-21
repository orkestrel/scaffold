# Content/layout — design verdict

Subject: the design round for the `Content/layout` unit of the compatibility ledger, on
`units/content-layout-design-brief.md` over the Grok terrain map
`units/content-layout-scout-report.md`. Two lanes, blind to each other: `planner` on native
Opus 5 (subjective; `units/content-layout-design-planner-report.md`) and `analyst` on Astra
(objective; `units/content-layout-design-analyst-report.md`, thread
`01a0c308-48b7-7c51-b08b-57909eabce19`). Reconciled 2026-09-21.

## Where the lanes agree

- The inventory key is the shipping unit: the conformance gate admits a key only when every
  row reads `shipped` and then requires every official selector, so a unit that flips a key
  carries the key whole (planner § 1; analyst unit 1). A contract unit lands first.
- Permanent exclusions get a first-class treatment in the conformance scanner: validated
  against the inventory and required absent from the whole compiled cascade, distinct from a
  temporary deferral (both lanes).
- The breakpoint axis is `page.viewport` from `vitest/browser` in the styles suite, with the
  viewport restored on every path; `stagePane` stays capture staging (both lanes, from the
  installed Test declaration).
- Containers, the grid, and the gutters take Bootstrap's own values as the source, recorded as
  retained; no exclusion (both lanes). Elements has no grid and skips `.container` by design.
- The eight compound bare-tag selectors stay excluded; `::-moz-focus-inner` is unreachable on
  both receipts; the opt-in CSS Grid classes are outside the pinned inventory; RTL rows are out
  by the user's ruling. The fixed heading scale and the `[hidden]` layer placement are recorded
  departures (planner § 8; analyst § Exclusions).
- `[hidden]` lands in the `reset` layer and is proven against later-layer important
  declarations as well as ordinary class overrides (planner tension 3; analyst risk register).
- Every brief derives its owned set from the assertions the change makes false (the `listed`
  array, the token registry, the setup export inventories, the specimen tables, the guide
  rows), the lesson of U7a's stops (both lanes).

## Rulings where they differ

| Question | Planner | Analyst | Ruling |
| --- | --- | --- | --- |
| Reboot decomposition | Two Reboot units (CL3 text tags with the reset partial; CL4 forms, tables, media, interactive tags), flipping the `reboot` key at CL4 | One Reboot foundation, the tag partials distributed to their mechanism units, the aggregate row open until every mechanism closes | The planner's two units: the key flips earlier, which arms the presence gate for the family's largest surface sooner, and each tag partial has one owner. The analyst's constraint stands: the key is never half-shipped, only unshipped then shipped. |
| Token names | `--vn-space-9` and `-10` for 1.5rem and 3rem; `--vn-size-9` to `-14` for the display sizes | `--vn-space-12` and `-24` (the ramp is index × 0.125rem); `--vn-display-1` to `-6` | The analyst's names: `--vn-space-12` and `--vn-space-24` keep the ramp's index law (`_tokens.scss:222-229`), and a `display` group maps one-to-one onto Bootstrap's class numbers. |
| Table tokens | `--bs-table-*` declared on `.table`, bound to existing canonical tokens plus one new `--vn-state-stripe`; striped, hover, and active as `color-mix` of the state mixer | A full `--vn-table-*` group (text, surface, border, category and state slots) | The planner's shape, for a small registry and one state vocabulary; the analyst's acceptance stands: the category and state fallback slots are preserved as Bootstrap's mechanism, the painted cell background and inset shadow are read (not the property strings), state precedence is proven from independent expectations, and composed contrast is verified on every tint. If CL0's Elements reading shows the shared percentages too coarse, the fallback is per-component percentages on `.table`. |
| Link opacity | Consumer fallbacks (`var(--bs-link-opacity, 1)`), no canonical token | `--vn-link-opacity: 1` canonical, utilities derive from it | The planner's: the name is a consumer knob the `.link-opacity-*` rules write, and a root value would also replace the icon-link helper's own `.5` fallback (the analyst's own caution). |
| `--bs-body-text-align` | Declare nothing; `_body.scss` reads it with the `start` fallback; a departure row | `--vn-text-align: start` canonical | The planner's: Bootstrap emits no root value, so the fallback is the contract; recorded as a departure. |
| Showcase sections | Six by concern (`Content`, `Type`, `Link`, `Media`, `Table`, `Layout`) | One per mechanism (ten) | The planner's six: the guide's grouping, fewer files, and the analyst leaves presentation to the subjective lane. `ratio`, `vr`, and `icon-link` sit in `MediaSection`; grid and gutters in `LayoutSection`. |
| Exclusion grammar | One table, `Owner` carries `Excluded`, the reason in `Reason` | Exclusions separate from deferrals, never disguised as deferrals | One table and one reader, with `Excluded` as a terminal owner the scanner treats differently: membership validated, absence required across the cascade, and a planted present name reddens. The distinct owner word and the absence requirement are what keep an exclusion from reading as a deferral. The two-table grammar question (`### Deferred names` under § Tokens) stays open for the user. |
| The portfolio's second side for the grid | The pinned official Bootstrap page rendered by the conformance harness | A Bootstrap comparison cannot satisfy the exit criterion's Elements clause by itself; obtain an accepted difference | Both: the Bootstrap page is the second side where Elements carries no specimen, and that is reported to the user as an accepted difference at CL13's acceptance. |
| Calibration | CL0 reads Elements' content specimens (rhythm, anchors, tables, figures, code) before the units author them | Treat Elements values as candidates until a rendered reading supports them; adapt values, never selectors | CL0 as the planner shapes it, with the analyst's rule that Elements' contextual selectors (`p + p`, nested code and list treatments) are never imported: values only, under Veneer's bare-tag composition. |
| The `driveOracle` root bound (U7c reviewer 10) | Not raised | Complete root scoping before another section lands | Carried into CL1 with a duplicate-name isolation proof. |
| Breakpoint proof depth | Media conditions read from the built cascade against the `--vn-breakpoint-*` tokens | Below, at, and above each boundary; the actual viewport asserted | Both. |

## Probes before the briefs that need them

Each is taken by the unit that owns the file it touches, as its first execution item, and its
reading fixes that unit's criteria: viewport leakage across styles files (CL1, with the restore
discipline as its closing proof); `scroll-behavior: smooth` against the journey harness on both
receipts (CL3, before landing the rule; reduced motion staged where it fires, never the rule
dropped); vendor pseudo-element selectors surviving the Sass and CSS build string for string
(CL4); logical declarations against the physical-axis guard's symmetric-pair admission (CL7).

## Units and routing

Serial in Veneer, one writer per checkout; CL0 runs in the Elements checkout beside CL1 and
CL2. Each unit takes a scope read before dispatch and an audit round with the lanes swapped by
writer, plus `checker` where the criteria are mechanical, then `verifier`.

| Unit | Role, engine | Owns | Depends on |
| --- | --- | --- | --- |
| CL0 Content calibration | `grok` (specimen map), `builder` (instrument), Orchestrator (runs, record) | Elements: `research/calibration-content.mjs`, `research/calibration-content.md` in scaffold's record | — |
| CL1 Contract | `sol`, Astra | `tests/setupConformance.ts`, its proof, `tests/conformance.test.ts`, `tests/setupStyles.ts` and its proof (the breakpoint helper and the viewport probe), `tests/setupBrowser.ts` and its proof (`driveOracle` root scoping), the guide's deferral-table header sentence | — |
| CL2 Tokens and breakpoints | `opus` | `src/styles/_tokens.scss`, `_mixins.scss`, `src/core/types.ts`, `src/core/constants.ts`, `tests/src/styles/tokens.test.ts`, `mixins.test.ts`, its fixture, the guide's § Tokens rows | CL1 |
| CL3 Reset and text Reboot | `sol`, Astra | `src/styles/_reset.scss`, the text tag partials (one per tag, `_heading.scss` for the family, mandated pairs), `_a.scss`, `index.scss`, mirrored proofs, `ContentSection` | CL0, CL2 |
| CL4 Reboot forms, tables, media, interactive | `sol`, Astra | the remaining tag partials, mirrored proofs, the `reboot` rows, `listed`, the excluded rows, `ContentSection` rows | CL3 |
| CL5 Typography and content classes | `opus` | `components/_type.scss`, `_list.scss`, `_quote.scss`, `_image.scss`, proofs, `TypeSection`, `MediaSection`, the guide rows | CL4 |
| CL6 Links | `sol`, Astra | `components/_link.scss`, `_a.scss` opacity expression, proofs, `LinkSection`, the `link` rows | CL5 |
| CL7 Containers | `sol`, Astra | `components/_container.scss`, proofs, the breakpoint case table, `LayoutSection`, the `container` rows and navigation deferrals | CL2, CL6 |
| CL8 Grid and gutters | `sol`, Astra | `components/_grid.scss`, proofs, `LayoutSection` rows, the `row`, `col`, `offset`, `g`, `gx`, `gy` rows | CL7 |
| CL9 Tables | `sol`, Astra | `components/_table.scss` (with `.caption-top`, wrappers, variants), `--vn-state-stripe`, proofs, `TableSection`, the `table` rows | CL0, CL8 |
| CL10 Helpers | `opus` | `components/_icon-link.scss`, `_ratio.scss`, `_vr.scss`, proofs, `MediaSection` rows, their rows | CL9 |
| CL11 Journeys and captures | `opus` | `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, the distribution consumer page | CL10 |
| CL12 Guide | `opus` | `guides/veneer.md`, `guides/README.md` | CL11 |
| CL13 Portfolio verdict | `reviewer`, `analyst`, `checker`; `builder` for the harness | the harness and the record | CL12 |

Acceptance criteria per unit: the planner's cheap-first list (`units/content-layout-design-planner-report.md`
§ Acceptance criteria) with the analyst's additions named in the rulings table. The family's
exit: every `Content/layout` row of the ledger implemented, excluded with a reason the user has
seen, or retained as an accepted difference; every capture state placed; the guide claiming only
what the proofs show; the gate chain green on both receipts; the portfolio verdict converged.

## Reported to the user at the family's acceptance

The eight compound selectors; `::-moz-focus-inner`; the RTL rows; the fixed heading scale; the
`[hidden]` layer placement; the grid judged against the pinned Bootstrap page rather than an
Elements specimen; the `--bs-body-text-align` fallback; the Tailwind collision surface the guide
records for the deferred profile unit.
