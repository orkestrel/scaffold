# E-IDENTITY design verdict — the element departures and the table stripe (2026-09-24)

Lanes that ran blind on `units/e-identity-design-brief.md`: the subjective lane, `planner` on Opus 5.5
(`units/e-identity-design-planner-proposal.md`), and the objective lane, `analyst` on GPT-6 Astra
(`units/e-identity-design-analyst-proposal.md`, thread `01a0d599-8bc5-7f13-be31-304366e622d5`). Evidence: the Grok
terrain (`units/e-identity-terrain-report.md`) and the Orchestrator's probes in Chromium at 390 and 1280 pixels
against Bootstrap 5.3.8's cascade (`units/e-identity-instruments/`).

## The house rule

A bare element takes Veneer's look; markup built with Bootstrap's classes lays out as Bootstrap lays it out. The bare
`button` rule (`src/styles/elements/_button.scss`, `button:not([class], [data-bs-target])`) already follows it.

## Rulings

| Site | Ruling | Measured reason | Unit |
| --- | --- | --- | --- |
| Table stripe | Keep Bootstrap's 5% through `--vn-state-stripe`; Elements' 12% is not adopted, because the stripe must stay under the hover (0.075) and active (0.1) overlays. The guide's token row states this ruling. | Both lanes. | E-ID-RECORD |
| `dl`, `dt`, `dd` | Scope the grid to `dl:not([class])`, pair each `dt` and `dd` to their columns with `grid-column`, drop `row-gap`, and restore Bootstrap's `dd` bottom margin (0.5rem, through the space scale) and zero left margin. Keep the 600 term weight and the muted description color. | A `dl.row` with `.col-sm-3` and `.col-sm-9` wraps each `dd` under its `dt` (`dd x=70 y=29` against Bootstrap's `x=355 y=0`); a bare list with repeated definitions reflows into the wrong columns. | E-ID-LAYOUT |
| `blockquote`, `.blockquote`, `figure` | Scope the bar, inset, and italics to `blockquote:not([class])`; `.blockquote` keeps Bootstrap's rules. Keep the `figure` column layout from reaching Bootstrap's attributed quotation, whether or not the `figure` carries a class. | `.blockquote` reads a 4px bar, 16px inset, and italics; the `figure` gap moves the footer 8px down (`y=38` against `y=30`). | E-ID-LAYOUT |
| `code`, `pre`, `kbd`, `samp` | Keep the bare elements' look (chip, block surface, keycap). Ship Bootstrap's contextual rules `pre code`, `a > code`, and `kbd kbd`, each cancelling the chip it inherits, recorded as additions, and delete their Excluded rows. Give `samp` the chip radius the rest of the family carries. | `pre code` paints a chip inside the block at 11.025px inside 12.25px; `a > code` takes the body color; a nested key draws a keycap inside a keycap at 10.72px. | E-ID-CODE |
| `hr` and border widths | Keep `hr`'s opacity 0.2. Every border width outside the alias declaration reads `--bs-border-width`, so a retune of Bootstrap's hook moves `hr`, `pre`, `kbd`, `tr`, and `.btn`. | The six direct `--vn-border-width` reads bypass the alias the other 47 sites read. | E-ID-RECORD |
| `.btn-check` | Revert to Bootstrap's `position: absolute`, `clip: rect(0, 0, 0, 0)`, and `pointer-events: none`, the technique Veneer's `.visually-hidden` already uses: one concept, one technique. | The departure's stated reason contradicts `.visually-hidden`. | E-ID-RECORD |
| The dropped flow margins (`p`, the headings, the lists, `dl`, `pre`, `hr`) | Not ruled here. Both lanes flag it as its own question: Bootstrap's documented pages space content with these margins, and Veneer drops them. The user rules it. | `p` reads margin 0 against Bootstrap's `0 0 16px` in every fixture. | The user |

The objective lane's proposal to revert the code family's sizes and the `dl` grid outright is not adopted: both break
no Bootstrap pattern once the contextual rules ship and the grid is scoped, and the house rule keeps a bare element's
look. Its native-toggle keyboard proof is adopted into E-ID-RECORD.

## Units

Three units run in parallel worktrees cut from Veneer `main` `ca83afb`, each owning disjoint partials and tests and
returning a patch for the shared files (`guides/veneer.md`, `tests/setupStyles.ts`, `app/browser/constants.ts`). They
land after APPEARANCE, serially, with the shared patches applied three-way. Each audit runs `analyst` on Astra,
`reviewer` on Opus 5.5, and `checker` on Sonnet.

- **E-ID-LAYOUT** (`opus` on Opus 5.5): `dl`, `blockquote`, and `figure`.
- **E-ID-CODE** (`opus` on Opus 5.5): `code`, `pre`, `kbd`, and `samp`.
- **E-ID-RECORD** (`builder` on Sonnet): the border-width reads, `.btn-check`, and the stripe row.

## Addendum after round 1 (2026-09-24)

- **The positional law** (superseded by § Addendum 2). `guides/veneer.md` § the styles axis says an `elements` rule
  treats a tag by its name, never by where the markup puts it. Round 2 admitted the pairs Bootstrap 5.3.8's reboot
  writes (`RELEASE_TAG_PAIRS`); Addendum 2 withdraws that.
- **Specimens.** The Content and Type sections' tests pin every specimen, so a unit adding a specimen owns the section
  test that pins it: E-ID-CODE owns `tests/app/browser/sections/ContentSection.test.ts`, and E-ID-LAYOUT owns
  `tests/app/browser/sections/TypeSection.test.ts`.
- **Command.** The styles project lives in `configs/src/vite.styles.config.ts`, not in the root `vite.config.ts`
  that `e-id-common.md` named; both units found it and used it.

## Addendum 2: realigned on the tenets (2026-09-24, after the user's pointer to them)

The user ruled the dropped flow margins restored, and pointed to the tenets for these decisions. Two tenets bind here:
"Give semantic tags useful defaults without inferring components … Do not create component styling from combinations
of tags or their surrounding structure … The meaning of a tag must not change unpredictably because it appears beside
or inside another semantic tag", and "Preserve direct control through classes … Useful defaults and explicit control
must coexist." The house rule stands, and it is realized with tag-only defaults and classes that carry Bootstrap's
layout, never with selectors that read a tag's context or strip a default whenever any class appears:

- **Contextual code rules withdrawn.** `pre code`, `a > code`, and `kbd kbd` style a tag by the tag around it, so they
  do not ship; their Excluded rows stay, `RELEASE_TAG_PAIRS` goes, and the positional law keeps its single exception
  for the pairs the content model mandates. Code keeps its treatment inside a block, a link, or a key, which is the
  tenet's stated behavior. The border-width hook and the `samp` corner stand. E-ID-CODE round 3.
- **No `:not([class])` scoping.** A `dl` or `blockquote` carrying any class keeps its default look; the Bootstrap class
  that composes a component writes what Bootstrap's layout needs. `dl` keeps its grid with no `gap` (column spacing
  through the term's inline-end padding, which a `.row` column's gutter padding overrides), so `.row` lays out the
  horizontal description list. `blockquote` keeps its bar, inset, and italics, and `.blockquote` writes the resets.
  E-ID-LAYOUT round 3.
- **No `:has()` on `figure`.** The `figure` column layout drops its `gap`; `figcaption` carries its own top margin, and
  `.blockquote-footer`'s margins lay out the attributed quotation as Bootstrap does. Bootstrap's `.figure` pattern
  lays out as Bootstrap's. E-ID-LAYOUT round 3.
- **Flow margins restored** (the user's ruling): `p`, the headings, the lists, `dl`, `pre`, `hr`, `figure`, and every
  other element whose reboot margin Veneer dropped take Bootstrap's reboot margins. E-ID-FLOW, after the E-ID units
  land, so one unit owns every margin.

## Addendum 3: the figure, nested lists, and the bare button (2026-09-25)

Ruled on the round-3 and E-ID-FLOW audit evidence, against the same two tenets as Addendum 2.

- **`figure` returns to block flow.** With its `gap` gone, the flex column differs from block flow only in that it
  keeps a child's margins inside the figure. Under Bootstrap's attributed quotation, the flex figure encloses the
  footer's 1rem end margin, so the figure box reads 63.14px against Bootstrap's 51px, and once `figure` takes its
  reboot margin the following content would sit 16px lower than Bootstrap places it
  (`units/eil-instruments/r3/eil-3-probe.log.txt`; the E-ID-LAYOUT round-3 subjective lane, claim 3). A block figure
  gives the same 8px caption space (`figure.test.ts`, the `d-block` holder). `figure` drops `display: flex` and
  `flex-direction`, and `figcaption` keeps its top margin. E-ID-LAYOUT round 4.
- **Nested lists keep their margin.** Bootstrap zeroes an inner list's bottom margin with `ol ol, ul ul, ol ul, ul ol`,
  a rule that changes a tag by the tag around it, so it stays Excluded. An inner list keeps the list's 1rem bottom
  margin, and `.mb-0` removes it (`units/flow-instruments/orchestrator-components-probe.log.txt`: every other
  documented component margin under E-ID-FLOW equals Bootstrap's).
- **The bare `button` rule contradicts Addendum 2.** `button:not([class], [data-bs-target])` strips the bare default
  whenever any class appears, which Addendum 2 rules out for `dl` and `blockquote`, and this verdict's house rule cites
  it as its model. The fix is a design question: a tag-only `button` default must leave every Bootstrap class built on
  `<button>` (`.btn`, `.btn-close`, `.navbar-toggler`, `.accordion-button`, `.dropdown-item`, `.nav-link`,
  `.list-group-item-action`, `.carousel-control-*`, `.page-link`) laid out as Bootstrap lays it out, with a utility
  class keeping the default. Carrier: the E-ID-BUTTON design round (`planner` on Opus 5.5, `analyst` on GPT-6 Astra),
  after the E-ID landing.
