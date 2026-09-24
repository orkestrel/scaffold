# Unit APPEARANCE-TERRAIN — the sites the user's appearance ruling touches

## Role and engine

`grok` bridge driving Cursor Grok, read-only. The driver carries this brief across unaltered and returns the journal
path, the session id, and Grok's answer. Grok performs the reading itself and spawns nothing.

## Objective

Map every site in Veneer that the user's appearance ruling changes, so the design round can fix units and ownership.
The ruling (Veneer `ROADMAP.md` § Rulings, the APPEARANCE-RULING bullet): P7 option C, colored text on the page takes
Elements' on-canvas tier in both modes (`color-mix(in oklab, <role> 70%, <text color>)`, as Elements'
`src/styles/_theme.scss` defines `--color-<role>-on-canvas`); P8 option B, the 14-pixel base and the 600 heading
weight stay, and the heading, `fs-*`, and `display-*` sizes scale down below 1200 pixels the way Bootstrap 5.3.8's
responsive font sizes do.

## Context

**Evidence.** Veneer checkout `/home/user/veneer` at `712ae72`: source `src/styles/`, built cascade
`dist/src/styles/index.css` (built from the last styles commit), guide `guides/veneer.md`, tests `tests/`. Elements
checkout `/home/user/elements` (`src/styles/`). Bootstrap 5.3.8 at `/home/user/veneer/node_modules/bootstrap/`
(`scss/` and `dist/css/bootstrap.css`). The earlier terrain `/home/user/scaffold/.orkestrel/veneer/units/appearance-instruments/appearance-terrain-grok.md`
already cites the palette and type departure rows; build on it and do not repeat it.

**Law.** Read-only. `/home/user/scaffold/AGENTS.md` § Writing governs the answer's prose.

**Host.** Linux. Read files and run `grep` only. Write nothing.

## Unknowns

None.

## Scope

Read-only. Write nothing.

## Execution

Answer with `file:line` citations and no raw dumps, in these sections.

**P7.**
1. The source that emits `.text-primary`, `.text-secondary`, `.text-success`, `.text-info`, `.text-warning`,
   `.text-danger`, and the `.text-opacity-*` utilities, and the exact value each color declaration takes in the built
   cascade (for example `rgba(var(--bs-danger-rgb), var(--bs-text-opacity))`). Name how the opacity variants depend
   on the `--bs-<role>-rgb` channel tokens.
2. Every other Veneer selector that paints a role color as text on the page canvas: `--bs-link-color` and
   `.link-<role>`, `.invalid-feedback` and `.valid-feedback` with `--bs-form-invalid-color` and
   `--bs-form-valid-color`, `.text-<role>-emphasis` with `--bs-<role>-text-emphasis`, and any other you find. For each:
   the token it reads and that token's light and dark value.
3. The Veneer tokens that already hold a mix of a role color and the text color (a `-text-emphasis` or `on-canvas`
   form), with their definitions.
4. Every test under `tests/` and every guide row that pins the current color of any selector in items 1 and 2: file,
   line, and the value pinned.
5. Every Elements selector that uses a `--color-<role>-on-canvas` token, and whether Elements has its own text-color
   utility classes and what they read.

**P8.**
1. The source and built values for `h1` to `h6`, `.h1` to `.h6`, `.fs-1` to `.fs-6`, and `.display-1` to `.display-6`,
   and the `--vn-size-*` tokens they read.
2. Bootstrap 5.3.8's compiled declarations for the same selectors in `dist/css/bootstrap.css`: the `calc()` value and
   the `@media (min-width: 1200px)` cap for each, and which sizes Bootstrap leaves fixed.
3. Every guide departure row for those selectors (the `fs-*`, `display-*`, and heading rows) and how the guide's
   machine-checked ledger represents a declaration inside an `@media` block.
4. Every test under `tests/` that pins a font size for those selectors, with the value pinned.
5. Veneer's existing breakpoint mixins and any function that computes a fluid size.

End with a list of anything you could not locate and the search you ran for it.

## Output

The sections above, then the unlocated list. No process diary.

## Deviation contract

Stop and report if a named checkout is missing.

## Acceptance criteria

Every item carries a citation or an entry in the unlocated list.

## Review evidence

The Orchestrator samples the cited lines before briefing the design round.
