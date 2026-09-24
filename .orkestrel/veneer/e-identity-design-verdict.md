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
