# Unit CL3 — the reset partial and the text Reboot tags

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `9f5ffda` (the CL2
landing), tracked tree clean. You are the bench engine reading the brief inside your own CLI:
perform the assignment directly and spawn nothing.

## Objective

The document-wide rules that select no tag land in a new `src/styles/_reset.scss` partial in
the declared `reset` layer, and the text Reboot tags land one partial per bare tag in the
`elements` layer, each bound to the Content/layout calibration record where Elements carries
the specimen and to Bootstrap's retained value where it does not, with the mirrored styles
proofs, a `ContentSection` in the showcase rendering every text specimen, and the guide's
parity rows. The `reboot` inventory key stays `accepted` (CL4 flips it), and `listed` stays
unchanged.

## Context

Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/styles.md` (layers,
one partial per tag, the elements-layer guard that admits one bare tag per selector plus the
mandated pairs, the physical-axis guard), `tests.md`, `architecture.md`, `names.md`,
`application.md`, `browser.md`, `documentation.md` (the parity minimum). The design record:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/content-layout-design-verdict.md`
(the rulings: `_reset.scss` in the `reset` layer for box sizing, `[hidden]`, and the `:root`
scroll behaviour; one partial per bare tag, `_heading.scss` for the heading family, mandated
pairs from `MANDATED_TAG_PAIRS` in `tests/setupStyles.ts`; `a:not([href]):not([class])` and its
hover twin in `_a.scss`; body-compatible variables affecting rendered consumers; the fixed
heading scale as a departure), the planner's § 2, § 3, § 7 and CL3 criteria
(`units/content-layout-design-planner-report.md`), the analyst's unit 2 and unit 3 and § Risk
register (`units/content-layout-design-analyst-report.md`), the Grok map
(`units/content-layout-scout-report.md` § 1 Reboot tags and § 5). Values: the Content/layout
calibration record `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration-content.md`
(one table per surface, light and dark on both browsers; the heading, paragraph, list, `dl`,
blockquote, `hr`, anchor, code family, `small`, `mark`, `abbr`, `address`, `sub`, `sup`
readings) and the accepted `research/calibration.md` (type sizes, weights, line heights).
Bootstrap's own rules: `node_modules/bootstrap/scss/_reboot.scss` and the pinned inventory's
`reboot` entries (`tests/fixtures/oracle/inventory.json`, projected by `readOracleInventory`
in `tests/setupConformance.ts`), which is the population the presence scan will read when CL4
flips the key: derive the selector set from the fixture, never from the ledger's counts.

Readings the Orchestrator takes at launch and states in the dispatch message: the CL2 landing
sha and the token names it landed (`--vn-space-12`, `--vn-space-24`, `--vn-display-1` to `-6`,
`--vn-state-stripe`); the current `src/styles/index.scss` load order (`_tokens`, `_theme`,
`elements/html`, `elements/body`, `elements/button`, `components/button`); the elements-layer
guard's site in `tests/src/styles/index.test.ts`; the `MANDATED_TAG_PAIRS` set in
`tests/setupStyles.ts`; the `ButtonSection` shape (`app/browser/sections/ButtonSection.ts` over a
frozen specimen table in `app/browser/constants.ts`, mounted by `Showcase.ts` into `main`) and
the `sections/` export from `app/browser/index.ts`; the export-set assertions in
`tests/app/browser/index.test.ts` and `tests/setupStyles.test.ts`; the guide's § Styles files
table and § Tokens rows.

Host: Windows, Git Bash; `npm.cmd run <name>`; managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge` (a `.cmd` launcher under `tmp/` as earlier units did); the `prove`
tool is blocked, so red-then-green pairs come from real runs; a nested `git` or `npm install`
is denied; `vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, and
`tests/setupPolicy.ts` are vendored and never edited.

Standing clauses: audits cover implementation only (no wording, comment, or guide-prose change
beyond what a code change requires; a guide row is the parity minimum); an enumerating
assertion in an owned file that your change grows (the app barrel's export set, the specimen
tables, the styles files table in the guide, an export inventory) is yours to update in the same
step, recorded, never a stop; the scoped formatter and a lint diagnostic's canonical rewrite are
granted; a plant proves an instrument and is removed before you return.

## Unknowns

Whether `scroll-behavior: smooth` at `:root` destabilises the journey harness's scroll-into-view
verbs: probe first (item 1) on both receipts with the rule planted and the existing journey
suite; where it fires, stage reduced motion for the affected journeys in your report as a bound
for CL11, never drop the rule. Which text specimens the section renders where Elements carries
none (`abbr` with a title, `address`, `sub` and `sup`): Bootstrap's markup, recorded.

## Scope

Owned: `src/styles/_reset.scss` (new), `src/styles/index.scss` (the load order), the text tag
partials under `src/styles/elements/` (`_heading.scss`, `_p.scss`, `_hr.scss`, `_a.scss`,
`_ul.scss`, `_ol.scss`, `_dl.scss`, `_blockquote.scss`, `_address.scss`, `_abbr.scss`,
`_strong.scss`, `_small.scss`, `_mark.scss`, `_sub.scss`, `_sup.scss`, `_code.scss`, `_pre.scss`,
`_kbd.scss`, `_samp.scss`, `_var.scss`, and `_html.scss` and `_body.scss` where the Reboot
obligations they own change), their mirrored proofs under `tests/src/styles/` (one per partial,
plus `tests/src/styles/reset.test.ts`), `tests/src/styles/index.test.ts` (only where the layer
order or the guard's admitted set must grow), `app/browser/sections/ContentSection.ts` (new),
`app/browser/constants.ts` (the text specimen table and copy), `app/browser/types.ts` (a
specimen interface if the button one does not fit), `app/browser/index.ts`,
`app/browser/Showcase.ts` (mounting the section after `ButtonSection`),
`tests/app/browser/sections/ContentSection.test.ts` (new), `tests/app/browser/Showcase.test.ts`,
`tests/app/browser/index.test.ts`, `guides/veneer.md` (§ Styles files table rows for the new
partials, § Departures rows for the fixed heading scale and the `[hidden]` layer placement and
the `--bs-body-text-align` fallback, § Showcase's region sentence), `cl3-report.md`.
Off-limits: `src/styles/components/**`, `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`,
`src/core/**`, `src/browser/**`, `tests/setup*.ts` and their proofs, `tests/conformance.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, the
vendored files.

## Execution

1. Probe `scroll-behavior: smooth` at `:root` under `prefers-reduced-motion: no-preference`:
   plant the rule, run `npm.cmd run test:journey` on Chromium and Edge, record the reading,
   restore. Then land `_reset.scss` (universal `box-sizing: border-box` with its pseudo-elements,
   `[hidden] { display: none !important }`, the scroll-behaviour rule inline) in the `reset`
   layer and load it after the theme in `index.scss`.
2. Land the text tag partials one bare tag each (the heading family in `_heading.scss`; `dl`
   with `dt` and `dd` in `_dl.scss` by the mandated pairs), bound to the calibration record's
   values through the `--vn-*` tokens (a heading's size to `--vn-size-*`, weight to
   `--vn-weight-heading`, line height to `--vn-line-heading`, margins to `--vn-space-*`; the
   code family's paint to `--vn-text-code` and the surface tokens; the anchor to the link
   tokens with `color: rgba(var(--vn-link-rgb), var(--bs-link-opacity, 1))`, the no-`href` reset
   and its hover twin); `_body.scss` reads `text-align: var(--bs-body-text-align, start)` and the
   body-compatible variables (`--bs-body-*`) affect the rendered consumers (a proof overrides one
   on an island and reads the consumer property). Where Elements carries no specimen, Bootstrap's
   value, recorded as retained in the proof's case table.
3. Proofs, mirrored per partial: the resolved values on both receipts equal the record's (or the
   retained value), the layer order unchanged, the elements-layer guard and the physical-axis
   guard green with the new partials, `[hidden]` hiding an element an ordinary class and an
   unlayered rule would paint and one a later-layer important declaration would paint (recorded
   either way), the no-`href` anchor reading the default colour and decoration while a linked
   anchor reads the link tokens, `scroll-behavior` reading `smooth` under no-preference emulation
   and `auto` under reduce; each with a planted wrong value that reddens and is restored.
4. `ContentSection`: the text specimens from a frozen table, mounted after `ButtonSection` and
   destroyed before the nodes, with the section proof (rendering in table order, release,
   idempotent destruction) and the shell proof updated; the app barrel's export set updated.
5. Guide: the parity minimum (the files table rows, the three departure rows, the region
   sentence).
6. Gates, in order: `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run build`, `npm.cmd run test:src:styles`, `npm.cmd run test:conformance`,
   `npm.cmd run test:app:browser`, `npm.cmd run test:journey`, `npm.cmd run test:guides`,
   `npm.cmd run test:policy`, `npm.cmd run test:setup`, then
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` and
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser`.

## Output

Write `cl3-report.md` in the Veneer checkout and return it: the scroll-behaviour
probe reading on both receipts; per partial the values bound and their source (record row or
retained); the red-then-green pairs (command and counts); each gate's exit code and final lines
on both engines; the actual `git diff --stat` and `git status --porcelain --untracked-files=all`;
every plant's removal; any guide bound for CL12.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: a partial's internal order,
a specimen's markup, a proof's case-table shape, where the retained-value note sits. Stop on: a
gate red after your own fix inside owned files; the elements-layer guard refusing a selector the
inventory requires and no mandated pair admits (report the selector; it is CL4's or an
exclusion's); a token the calibration needs that CL2 did not land.

## Acceptance criteria

1. `_reset.scss` and every text partial listed under Scope exist, load in `index.scss`, and the
   cascade's layer order is unchanged.
2. Every partial's proof reads its values on both receipts equal to the record or the retained
   value, red on its plant; the `[hidden]`, no-`href`, body-variable, and scroll-behaviour
   proofs hold as item 3 states.
3. `ContentSection` renders every text specimen through the section interface, proven.
4. The `reboot` row stays `accepted` and `listed` is unchanged; `test:conformance` is green.
5. Every gate in item 6 exits 0 on managed Chromium and Edge.
6. The status shows only the owned files and the report.

## Review evidence

The actual `git diff` and `git status` at return; this report.
