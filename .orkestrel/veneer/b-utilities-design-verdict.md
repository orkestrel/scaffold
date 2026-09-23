# B-UTILITIES design verdict (2026-09-23)

Subject: the utilities family. Brief: `units/b-utilities-design-brief.md`. Terrain:
`units/b-utilities-terrain-report.md`. Lanes, blind on one brief: `planner` on Opus 5.5 (native,
clean context; proposal `units/b-utilities-design-planner-proposal.md`) and `analyst` on GPT-6
Astra (thread `01a0ce3f-33eb-7b23-8d27-58bfdf51e2d4`, journal
`tmp/codex/b-utilities-design-analyst.jsonl`; proposal `units/b-utilities-design-analyst-proposal.md`).
Both lanes ran; no substitution in this round. (The Codex bench went dark on quota after this
round returned; the audit rounds of this family run their objective lane on Opus 5.5 until it
round-trips again, per ROADMAP § Standing conditions.)

## Units and routing

| Unit | Mechanism and keys | Role and engine | Wave |
| --- | --- | --- | --- |
| UTIL-SPACER (`us`) | the `utility` and `utility-variable` mixins; `gap` and `column-gap` beside the shipped `row-gap` in `_gap.scss`; the Tailwind profiles and consumer proofs restated to the derived exclusion contract; the conformance utilities-order case (report-only patch) | `opus` on Opus 5 | 1 |
| UTIL-PAINT (`up`) | `bg`, `border`, `rounded` with their opacity, subtle, gradient, and width entries | `opus` on Opus 5 | 2 |
| UTIL-TEXT (`ut`) | `text` whole (alignment, wrap, transform, decoration, role colours, opacity, `.text-bg-*`), `text-truncate`, the `link` partial's relocation to the utilities layer | `opus` on Opus 5 | 2 |
| UTIL-FONT (`uf`) | `font`, `fs`, `fst`, `fw`, `lh` | `opus` on Opus 5 | 2 |
| UTIL-SPACING (`usp`) | `m`, `mx`, `my`, `mt`, `me`, `mb`, `ms`, `p`, `px`, `py`, `pt`, `pe` (padding-end and pointer-events together), `pb`, `ps`, `user-select` | `opus` on Opus 5 | 2 |
| UTIL-DISPLAY (`ud`) | `d` with its print pass, `flex`, `justify-content`, `align-items`, `align-content`, `align-self`, `order`, `align`, `hstack`, `vstack` | `opus` on Opus 5 | 2 |
| UTIL-PLACEMENT (`upl`) | `w`, `h`, `mw`, `mh`, `vw`, `vh`, `min`, `position`, `top`, `bottom`, `start`, `end`, `translate-middle`, `z`, `fixed`, `sticky`, `visually-hidden`, `visible`, `invisible` | `opus` on Opus 5 | 2 |
| UTIL-FLOW (`ufl`) | `float`, `clearfix`, `overflow` with `-x` and `-y`, `object-fit`, `stretched-link` | `opus` on Opus 5 | 2 |
| UTIL-EFFECT (`ue`) | `shadow`, `opacity`, `focus-ring` | `opus` on Opus 5 | 2 |
| UTIL-VERIFY | the assembled family | `verifier` on Sonnet: the landing chain per landing, `test:service`, one capture-portfolio verdict round | last |

Each unit is audited by the objective lane (`analyst` on Astra when the bench round-trips, else
`reviewer` on Opus 5.5 told it holds that lane), `reviewer` on Opus 5.5 (subjective), and
`checker` on Sonnet. Wave 1 dispatches from the session branch in its own worktree; wave 2
dispatches in parallel worktrees from the commit on which UTIL-SPACER has landed. Shared-file
patches integrate serially at each landing; no separate integration unit. Family record:
`units/b-utilities-family.md`.

## Rulings

- **R1 Key closure by unit.** Each inventory key ships whole in one unit (`text` in UTIL-TEXT,
  `pe` in UTIL-SPACING), never split across units by cross-unit deferral rows. (Planner; the
  analyst's TYPE and PAINT split of `text` and SPACING and ACCESS split of `pe` refused.)
- **R2 Token binding.** Margin and padding steps read `--vn-space-2`, `-4`, `-8`, `-12`, and `-24`
  (density-scaled, as the components' internal space is); the gap keys and the gutters keep the
  density-independent `--vn-gap-*` scale, which is not renamed and whose `TOKEN_NAMES.gap` export
  stands; `.fs-N` reads `--vn-size-{9-N}` (the heading treatment, R7); `.lh-base` reads
  `--vn-line-body`; `.fixed-*` and `.sticky-*` read `--vn-stack-fixed` and `--vn-stack-sticky`;
  every release `var(--bs-*)` reference is written byte for byte; everything else is a literal
  (opacity steps, position percentages, `.z-*`, `.fw-*`, the other line heights, the widths, the
  border widths). No token is added. (The analyst's binding table, with the planner's `.fs` and
  stack bindings; the planner's spacer rename refused: a public rename and a ledger regeneration for
  no contract change, and density reaching the spacing utilities matches the components.)
- **R3 The gap partial stays.** `_gap.scss` is extended with `gap` and `column-gap` at every step and
  infix; the gutters `g`, `gx`, and `gy` stay where they ship and keep their layer. (Analyst; the
  planner's move to `_grid.scss` refused.)
- **R4 The mixins.** `utility($class, $properties, $values, $infix, $responsive, $locals)` writes
  `!important` on every property and its locals normal; `utility-variable($class, $variable,
  $values)` writes `--bs-{variable}` normal; each partial walks `breakpoint-each` once and calls its
  entries in the release's `$utilities` map order; the fixture proof under `mixins.test.ts` proves
  every branch. UTIL-SPACER lands them and is the only unit that edits `_mixins.scss`. (Planner.)
  Amended 2026-09-23 by the UTIL-SPACER round-1 audit (`units/us-audit-verdict.md` F1 and F2, as
  round 2 landed them): each mixin takes `$state: ()` last and emits `.NAME-PSEUDO:PSEUDO` after the
  base rule for each pseudo-class in it, as the release's `state` entries do; an empty `$class`
  drops the infix's leading hyphen. The family record's ruling 2 carries the landed signatures.
- **R5 Layer by importance.** A helper the release writes with `!important` sits in the `utilities`
  layer ahead of the utility partials (`_link` relocated by UTIL-TEXT, `_visually-hidden`, and the
  `.text-bg-*` rules at the head of `_color`), because an important declaration in an earlier layer
  beats one in a later layer and the `components` placement inverts the release's resolution
  against `.text-*`; a helper with normal declarations sits in `components` under the release's
  helper filename in `_helpers.scss` order (`clearfix`, `focus-ring`, `icon-link`, `ratio`,
  `position`, `stacks`, `stretched-link`, `text-truncation`, `vr`); the utilities block loads in
  the release's `$utilities` map order; a conformance case asserts both subsequences. (Planner; a
  cascade-correctness ruling.)
- **R6 Priorities.** Ordinary utility properties carry Bootstrap's `!important`; local variables and
  `css-var` declarations stay normal; helpers keep their recorded priorities; D39a keeps ledger
  values priority-free and the compiled-release priority case proves priority. (Both lanes.)
- **R7 Font size is heading size.** `.fs-N` resolves what `.hN` resolves and drops the release's
  fluid scaling and its `(min-width: 1200px)` cap the way the `#### h1` rows do, recorded as
  `tokenized` and `dropped` rows. (Planner; the analyst's preserved fluid scale refused for
  consistency with the landed heading treatment.)
- **R8 Foregrounds on a role fill.** `.text-bg-*` ships the release's recorded foregrounds; a shared
  `foreground($role)` function is admitted only where it reproduces those recorded values and the
  `_button.scss` compile stays byte-identical (the D40 method); a foreground departure needs a
  concrete ruling and is not this family's. (Analyst; the planner's warning and info departures
  refused.)
- **R9 Negative margins.** None ship; the release default emits none and the inventory records none;
  the guide states it in one sentence. (Both lanes.)
- **R10 Tailwind contract.** A shared name whose Veneer `!important` covers every longhand Tailwind
  declares for it leaves the exclusion line; every other shared name joins it; the profiles proof
  asserts the executed profile emits exactly the names off the line; each unit measures its names,
  adds them to `markup.html`, and returns its line names; integration writes the line and its copies
  as a set union (the one named exception to append-only shared edits); the consumer proof reads
  the importance branch on a real utility (`gap-3` first). The two lanes' per-name predictions are
  inputs each owning unit measures. UTIL-VERIFY carries the "all normal" row's closure and the
  helper-home row's closure. (Both lanes.)
- **R11 Dark axis.** No utility partial carries a mode rule; the subtle, emphasis, and body tiers
  read the `--bs-*` aliases `theme-tokens` re-declares per mode; each proof reads inside a
  `data-bs-theme="dark"` island. (Both lanes.)
- **R12 Showcase.** A region per mechanism, named for the release's documentation page; a specimen
  shows a value ramp, a responsive behaviour, or a driven state, never one class alone; a specimen
  composes only classes shipped at the unit's launch commit plus its own, and draws its box with
  the shell's frame or its own classes; utility regions are constructed after every component
  region in barrel order. (Planner.)
- **R13 Captures.** One resting `CASCADE_KEYS` row per specimen; focus reveals as `DRIVEN_KEYS`
  rows; the print pass is read by the proof and takes no frame. (Both lanes.)
- **R14 Proof shape.** Each proof reads the token and its retune, the factor or its absence, the
  mode, every infix at its boundary, the cross-entry order, the priority over an unlayered rule, and
  the `@layer utilities` escape; the report carries the coverage matrix (every inventory selector
  and condition against proof case, specimen, and scenario), the shared-name table, and the
  precedence cases with their mutations. (Both lanes.)
- **R15 Guide.** One `### <Page> utilities` section per region in the voice of `### Table classes`,
  documenting the helpers of its mechanism beside its utilities; a § Files row per partial; the
  compatibility rows; the ledger tables; the Additions rows; the § Tests links. (Planner.)
- **R16 Forced colours.** `.focus-ring:focus` includes `forced-ring` as an Additions row (the D37
  precedent). (Planner; the analyst's open disposition settled.)
- **R17 Unlisted entries** ship with their keys: `overflow-x` and `-y` (UTIL-FLOW), `text-decoration`,
  `text-opacity`, and `.text-bg-*` (UTIL-TEXT), `bg-opacity` (UTIL-PAINT), `border-opacity`
  (UTIL-PAINT), `pointer-events` (UTIL-SPACING), the `link-*` entries (already shipped, relocated by
  UTIL-TEXT), `.visually-hidden-focusable` (UTIL-PLACEMENT), the focus-ring map (UTIL-EFFECT).
  Nothing is excluded. (Both lanes.)

## Exit criterion

The family ends when: every queue key and every unlisted entry ships whole with the ledger,
deferral, priority, and compatibility gates green and each key in `listed`; `gap` and `column-gap`
ship beside `row-gap` and the CL8b row closes; a spacing retune of `--vn-space-*` moves every
spacing utility and a `--vn-gap-*` retune every gap; every key renders in a mechanism region and
every helper has a real-consumer specimen; every specimen is registered or declined with a reason
and the frames are written; every partial has a mirrored proof carrying the R14 readings and every
named mutation reddens it; the consumer and profiles proofs are green over every shared name with
the line and its copies equal and the "all normal" row closed; the important helpers sit in the
utilities layer with the release's precedence proved; the guide states the shipped state; the
verifier chain is green.

## Deviations

None. Both lanes ran on the one brief. The terrain's corrections the lanes agreed on: the
recorded stacking utilities are `.z-n1` to `.z-3`; the position helpers sit under the `fixed` and
`sticky` keys; the inventory records no negative margin and one `(min-width: 1200px)` block for
`.fs-1` to `.fs-4`; `TOKEN_NAMES.gap` is a public export; the profiles proof's universal-exclusion
assumption must change before an important shared utility ships.
