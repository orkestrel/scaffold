# Unit CL5 — typography and content classes

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), at the CL4b landing. Perform the assignment directly
and spawn nothing.

Read before acting, in this order: `AGENTS.md` at the Veneer checkout root; `.claude/rules/`
files `styles.md`, `tests.md`, `architecture.md`, `names.md`, `application.md`,
`browser.md`, `documentation.md`, and `writing.md`; then `guides/veneer.md`. This unit names no
skill.

## Objective

Ship the typography and content component classes Bootstrap's pinned inventory records under the
keys this unit owns, each with a mirrored proof and a guide row, and add the two showcase
sections that render them, so every one of those keys reads `shipped` and joins `listed`.

## Terrain already mapped

`.orkestrel/veneer/units/cl5-scout-report.md` in the orchestrator's repository is the retained
terrain map for this unit, taken by a Grok lane over the pinned inventory, the styles folder, the
showcase, and the guide. It carries every key's selector list with `file:line` pointers, the
section contract, the component folder's state, and which mixins exist. Read it and do not
re-derive what it already records; verify a fact against the tree only where you rely on it.

## The keys and their partials

The inventory's `components` object is keyed by the guide's compatibility keys. This unit owns
`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `small`, `mark`, `lead`, `display`, `list-unstyled`,
`list-inline`, `initialism`, `blockquote`, `img`, and `figure`. Every selector under those keys
is a class, so none collides with a tag selector a CL3 or CL4 partial already emits.

Place them in four new partials under `src/styles/components/`, each wrapping its rules in
`@layer components`, mirroring `src/styles/components/_button.scss` for file shape and for how a
partial reads tokens and mixins:

- `_type.scss` — the heading classes, `lead`, the display classes, `small`, `mark`, `initialism`
- `_list.scss` — `list-unstyled`, `list-inline`
- `_quote.scss` — `blockquote`
- `_image.scss` — `img`, `figure`

Load each from `src/styles/index.scss` beside the existing component load, in the order the file
already establishes.

## The ruling this unit carries

**The heading and display class twins read the same tokens their tag partials read.** Bootstrap's
`.h1` through `.h6` carry a fluid size that caps at a large-viewport value, and its `.display-*`
do the same. CL2 landed a fixed scale in `src/styles/_tokens.scss` and CL3's `_heading.scss`
reads it, so reproducing Bootstrap's fluid sizes here would make a heading tag and its own class
twin disagree on the same page, which Bootstrap's own contract does not do.

Ship each `.h1` through `.h6` reading the size token its tag reads, and each `.display-1` through
`.display-6` reading the matching `--vn-display-*` token that already exists in the token file.
Record the departure from Bootstrap's fluid sizes as a guide row. The fixed heading scale is
already an open question the user has been told about; this unit does not reopen it.

Every other value in this unit's scope is bound to the calibration record
(`.orkestrel/veneer/research/calibration-content.md`) where that record measures it, and retained
from Bootstrap's own line where it does not. Name which for each value in your report.

## Unknowns

The Orchestrator has not ruled these; settle each yourself within this brief's scope and record
what you chose and why in your report:

- Whether the elements-layer guard or any conformance predicate refuses a compound selector this
  unit must ship, such as `.blockquote > :last-child`, `.list-inline-item:not(:last-child)`, or
  `.blockquote-footer::before`. If one is refused, record it as a departure row with its reason
  rather than working around the guard.
- Whether `.img-fluid` ships the physical `max-width` and `height` Bootstrap writes or the
  logical properties the styles rule requires and `elements/_img.scss` already uses. Follow the
  rule and record the difference.
- How the two showcase sections divide the keys between them, and what each specimen's markup is.

## Scope

Owned:

- `src/styles/components/_type.scss`, `_list.scss`, `_quote.scss`, `_image.scss` (new)
- `src/styles/index.scss` (the loads for those partials only)
- `tests/src/styles/components/type.test.ts`, `list.test.ts`, `quote.test.ts`, `image.test.ts`
  (new, mirroring the existing component proof)
- `tests/setupStyles.ts` (new case tables for those families only; change no existing table)
- `tests/setupStyles.test.ts` (the export-name list, which the new tables extend)
- `app/browser/sections/TypeSection.ts`, `app/browser/sections/MediaSection.ts` (new)
- `app/browser/constants.ts` (the new specimen tables and their copy)
- `app/browser/types.ts` (a specimen type, only if the existing `ContentSpecimen` does not fit)
- `app/browser/Showcase.ts` (constructing and destroying the two new sections)
- `app/browser/index.ts` (exporting the two new sections and their specimen tables)
- `tests/app/browser/sections/TypeSection.test.ts`, `MediaSection.test.ts` (new)
- `tests/app/browser/sections/ContentSection.test.ts` and
  `tests/app/browser/Showcase.test.ts` (only where adding sections makes an assertion false)
- `tests/conformance.test.ts` (the `listed` expectation)
- `tests/setupConformance.test.ts` (only where a ledger-derived case's population changes)
- `guides/veneer.md` (the compatibility rows for this unit's keys, any departure row, and any
  deferred row this unit adds)

Off-limits: `tests/setupConformance.ts`, `src/styles/_reset.scss`, `src/styles/_tokens.scss`,
`src/styles/_mixins.scss`, `src/styles/elements/**`, `tests/fixtures/**`, `package.json`,
`configs/**`, and every vendored file. If closing a criterion needs one of these, stop and report.

## Execution

1. Read the terrain map and the law, then write the types and the case tables before the partials.
2. The four partials, each loaded from the barrel, then `npm run build:src:styles`.
3. The four styles proofs, each reading resolved values from the built cascade.
4. The two sections and their proofs, then the showcase wiring and its proof.
5. The guide rows, then `npm run test:guides`.
6. The `listed` expectation and the conformance run.
7. The ordered chain from the checkout root: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`, then the Edge runs of `test:src:styles`,
   `test:setup:browser`, and `test:app:browser` with `PLAYWRIGHT_CHANNEL=msedge`.

## Output

Write `cl5-report.md` in the Veneer checkout and return it: each key with the selectors
it ships and the partial that owns it; each value marked bound to the record or retained from
Bootstrap, with its source; every ruling you settled from the Unknowns with your reason; the
departure rows you wrote; each proof's red-then-green pair where you planted one; each step's
exit code and final lines on both engines; the actual `git diff --stat` and
`git status --porcelain --untracked-files=all`; every plant's removal.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: each partial's internal order;
each proof's case-table shape; how the sections divide the keys; each specimen's markup; the
guide rows' placement. **Stop and report** if a conformance predicate refuses a selector this
unit must ship, if a value the calibration record measures disagrees with what the cascade
resolves, or if closing a criterion needs an off-limits file.

## Acceptance criteria

1. Every key this unit owns reads `shipped` in the guide's compatibility table, and
   `tests/conformance.test.ts` reads `listed` with those keys present.
2. The presence scan is green, and removing one shipped selector from a partial reddens it.
3. Each `.h1` through `.h6` resolves to the size its tag resolves to, and each `.display-*`
   resolves to its `--vn-display-*` token, proved by a reading rather than by the source.
4. Each new partial has a mirrored proof that reads resolved values from the built cascade.
5. The two sections mount, render every declared specimen, and destroy in construction order,
   proved through the section interface.
6. Every gate exits 0 on managed Chromium and Edge.
7. The status lists only the files this brief owns.
