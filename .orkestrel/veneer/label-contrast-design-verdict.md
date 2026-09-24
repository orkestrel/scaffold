# LABEL-CONTRAST design verdict (2026-09-24)

The Orchestrator's reconciliation of the LABEL-CONTRAST design round on one brief,
`units/label-contrast-design-brief.md`. The subjective lane was `planner` on Opus 5.5 (agent
`a22eb74c0402273a7`); its proposal is retained as `units/label-contrast-design-planner-proposal.md`. The
objective lane was `analyst` on GPT-6 Astra (thread `01a0d381-0b83-7111-9ae6-1b48c951e6a1`); its proposal
is retained as `units/label-contrast-design-analyst-proposal.md`. Both lanes ran blind and clean-contexted.

## Rulings

- **L1 One contrast rule, the release's.** A fill's label is the release's `color-contrast` pick: the
  white palette entry when it reaches 4.5 to 1 against the fill, otherwise the black entry, with the
  higher ratio as the fallback (`node_modules/bootstrap/scss/_functions.scss`, `color-contrast`). The
  functions `luminance`, `ratio`, and `contrast` in `src/styles/_mixins.scss` hold it, and no second
  list of labels exists. The `$dark-labels` list in `src/styles/utilities/_color-bg.scss` is deleted.
  (Both lanes; the planner's names.)
- **L2 The input is each role's channel triplet, per mode.** The `-rgb` triplets are the fills the
  `text-bg-*` classes paint, and the `tests/src/styles/tokens.test.ts` proof holds each within one
  channel step of its token's painted fill. They become Sass lists in `src/styles/_tokens.scss`: the
  `primary-rgb` and `secondary-rgb` entries of the `$light` and `$dark` maps, and a `$channels` map for
  the mode-independent roles, from which the `:root` block emits. The emitted `--vn-color-*-rgb` text
  stays byte-identical. The candidates are the white and black palette entries, carried as a map from
  each CSS value to its triplet in `_tokens.scss`, so `_mixins.scss` writes no color literal. (Planner;
  the analyst's route through converted canonical fills picks the same labels, measured in both
  proposals, and needs a larger refactor of the palette literals.)
- **L3 The direction follows the label.** A role's hover and active tiers move away from its label:
  toward the shade endpoint when the label is white, toward the tint endpoint when it is black. The
  `light` and `dark` roles are named exceptions, as in the release's `_buttons.scss` loop: each moves
  toward its own label, because a move past the end of the gray ramp is invisible. The shade endpoint
  is the `$light` map's `state-mixer` value, Elements' near-black, read from the tokens module, so every
  light-mode filled variant but `.btn-dark` keeps its calibrated fills; the tint endpoint is the white
  palette entry. The hover and active weights stay `--vn-state-hover` and `--vn-state-active`. One label
  serves each role's rest, hover, active, and disabled states; the floor proof reads every state.
  (Both lanes; the planner's endpoints.)
- **L4 A mode-varying pick reaches its island through `light-dark()`.** Where a role's light and dark
  picks differ, the partial writes `light-dark(<light pick>, <dark pick>)`; where they agree, it writes
  the one value. No new token name is added, and nothing is asked of the engine session under D43. The
  Orchestrator's probe on the installed Chromium 141 (`/opt/pw-browsers/chromium`) read a
  `light-dark()` label and a `color-mix()` hover resolving per island: white at the default root, black
  in a `data-bs-theme="dark"` island, white in a light island nested in it, and white on a button that
  carries `data-bs-theme="light"` itself. The pick follows the used `color-scheme`, which every Veneer
  mode scope sets; the guide states that a consumer who sets `color-scheme` apart from `data-bs-theme`
  splits the label from the fill. (Analyst. The planner's two closure tokens per role need a registry
  change in `src/core/**` and a joint landing with the engine session, and its claim that no
  compile-time design avoids new names does not hold: `light-dark()` selects between compile-time
  picks.)
- **L5 The veil keeps its mixer.** `--vn-state-mixer` stays near-black in light and white in dark, and
  after this change only the bare `button` rule (`src/styles/elements/_button.scss`) and the bare
  `.btn` hover and active background read it. No filled or outline variant reads it. (Both lanes.)
- **L6 The sites.** Every site whose release value is a `color-contrast` pick or a contrast-directed
  shade or tint reads the rule:
  - `src/styles/components/_button.scss`, the role loop: `.btn-{role}` `--bs-btn-color`,
    `-hover-color`, `-active-color`, and `-disabled-color`; `-hover-bg` and `-active-bg` mixing toward
    the role's endpoint; `.btn-outline-{role}` `--bs-btn-hover-color`, `-active-color`, and
    `-active-bg` (which covers the checked outline). The outline active background keeps Veneer's mix,
    a recorded departure, with its direction corrected.
  - `src/styles/utilities/_color-bg.scss`: each `.text-bg-{role}` `color`.
  - `src/styles/components/_validation.scss`: each `.{state}-tooltip` `color`, whose value does not
    change (white on success 4.95, on danger 6.42), so the tree carries one rule.
  - `src/styles/utilities/_link.scss`: the colored-link `:hover` and `:focus` color and underline
    color, which Veneer holds at the resting color and the release shades or tints by 20% toward the
    direction its contrast pick names (`helpers/_colored-links.scss`). The `--bs-link-opacity` and
    `--bs-link-underline-opacity` variables keep working.
  - Not adopted: the nav, pagination, dropdown, list-group, and progress active fills, which read the
    fixed `--vn-palette-blue` as the release reads its fixed `$component-active-bg`; the badge, whose
    label the release fixes; the table variants, whose labels already equal the pick against their own
    mixes. (Both lanes; the analyst's exclusions, the planner's tooltip, the link hover added here.)
- **L7 V11 and P6 close as "the direction follows the label."** Under L1 the dark primary, a light cyan,
  carries a black label (8.11 to 1) and tints when hovered and pressed, as the release's own `info` and
  `warning` variants do. Darkening it would need a white label, which reads 2.59 to 1 and fails P7. The
  row's closing condition is the direction proof, not the release's darkened value, which the release
  computes for its own darker fill. If the user's APPEARANCE-RULING darkens the dark primary until white
  reaches 4.5 to 1, the same rule shades it with no further change. (Both lanes.)
- **L8 Named proofs.** Each runs red first against the tree without the change:
  - **The rule.** A Sass fixture beside `tests/src/styles/fixtures/mixins.scss` runs `contrast` over the
    release's `$theme-colors` triplets and asserts the release's own `.text-bg-*` color for each, read
    from `node_modules/bootstrap/dist/css/bootstrap.css`, with `#0d6efd` as the boundary case (white at
    about 4.50). Mutations: the candidate order reversed; the minimum raised to 4.6.
  - **The floor (P7, P9).** In each mode, every label reaches 4.5 to 1 against each filled variant's
    rest, hover, and active fills, each outline variant's hover and active fills (the checked state
    included), each `text-bg-*` fill, and each validation tooltip fill. Mutation: the primary label
    pinned to white.
  - **The direction (V11, P6).** In each mode, for filled and outline variants, each role's label ratio
    rises from rest to hover to active, and falls for the `light` and `dark` roles. Mutation: the
    variants read `--vn-state-mixer` again.
  - **The agreement (P9).** Each `.text-bg-{role}` carries the label its `.btn-{role}` carries, in each
    mode. Mutation: the `$dark-labels` list restored.
  - **The islands.** The dark primary's label reads black in a dark island, white in a light island
    nested inside it, and white on a button that carries its own light attribute. Mutation: the dark
    pick written for both modes.
  - **The veil.** The `BUTTON_BARE_CASES` table stays green unedited, and a case reads the dark bare
    `button` and bare `.btn` hover step at 1.4 or more against rest (THEME read 1.421). Mutation: the
    veil reads the black palette entry (THEME read 1.028).
  - **The colored links.** Each `.link-{role}` hover differs from its rest in the direction its pick
    names, and the opacity variables still scale it. Mutation: the hover written as the resting color.
- **L9 Ledger.** Each changed declaration keeps its status; its Veneer column and reason change. The
  `.text-bg-info` and `.text-bg-warning` rows record the white label against Veneer's fills, and the
  dark primary rows record the tint as the rule's result for a fill that takes a black label. The
  `--vn-state-mixer` binding narrows to the veils, and the guide states the consumer's obligation: a
  runtime retune of a role's fill keeps the compiled label and direction, so the retune sets
  `--bs-btn-color` and the state fills with it.

## Units

| Unit | Role and engine | Owns | Depends on |
| --- | --- | --- | --- |
| LABEL (`lc`) | `opus` on Opus 5.5, native | `src/styles/_tokens.scss` (the triplet lists, `$channels`, the candidate map, the named exceptions), `src/styles/_mixins.scss` (the functions and the mode pick), `components/_button.scss` (the role loop), `utilities/_color-bg.scss`, `utilities/_link.scss` (the colored-link rule), `components/_validation.scss` (the tooltip `color`), and their proofs | THEME's landing |

- **Routing.** The work class is objective, which routes to `sol` on Astra. The proofs run in Chromium,
  and the bench sandbox denies the browser launch (the analyst's own probe failed with `EROFS`), so the
  unit runs native on `opus`. Recorded as a deviation with that reason.
- **The frames units.** No frames unit's status lists a partial LABEL owns (read 13:20 UTC).
  UTIL-FRAMES dropped P9 at the Orchestrator's mid-campaign decision and changed no style partial. The
  frames that show a changed face — PASSIVE-FRAMES's filled and outline states, UTIL-FRAMES's text-bg and
  link frames, OVERLAY-FRAMES's text-bg toasts, FORMS-FRAMES's tooltips, and THEME's Color modes
  region — are read after LABEL lands and the capture chain regenerates them.
- **Audit.** `analyst` on Astra (the objective lane, an engine that did not write the unit), `reviewer` on
  Opus 5.5 (the subjective lane), and `checker` for the ledger rows against the emitted cascade.

## Carried and dropped

- The planner's registry request (two tokens per role) is not carried: L4 needs no name.
- The analyst's typed `$palette`, `$grays`, and `$fills` maps are not carried: L2 reads the triplets the
  tree already proves.
- THEME's report option of a per-variant literal pair in `_button.scss` is refused: `styles.md` keeps
  color literals in `_tokens.scss` (THEME audit referral R5).
