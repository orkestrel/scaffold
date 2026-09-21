# Unit CL3 — the reset partial and the text Reboot tags (brief 2)

Supersedes `cl3-brief.md`, which is left unedited. What changed and why: the scope read
(`cl3-scope-read-brief.md`, 2026-09-21) found four rows to amend and took the launch
readings brief 1 deferred. The app barrel re-exports each section file directly (no `sections/`
aggregate exists). The guide's Compatibility table carries no `reboot` row, so nothing here
"stays accepted": the table is left unchanged and CL4 adds the row as `shipped`. The departure
rows go under `### Departures from Bootstrap`. The design reports live under
`.orkestrel/veneer/units/` in the scaffold checkout. The readings are folded into Context.

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `9f5ffda` (the CL2 landing),
tracked tree clean. You are the bench engine reading the brief inside your own CLI: perform the
assignment directly and spawn nothing.

## Objective

The document-wide rules that select no tag land in a new `src/styles/_reset.scss` partial in the
declared `reset` layer, and the text Reboot tags land one partial per bare tag in the `elements`
layer, each bound to the Content/layout calibration record where Elements carries the specimen
and to Bootstrap's retained value where it does not, with the mirrored styles proofs, a
`ContentSection` in the showcase rendering every text specimen, and the guide's parity rows. The
guide's Compatibility table and `listed` in `tests/conformance.test.ts` (`['btn']`) stay
unchanged; CL4 adds the `reboot` row.

## Context

Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/styles.md` (layers,
one partial per tag, the elements-layer guard that admits one bare tag per selector plus the
mandated pairs, the physical-axis guard), `tests.md`, `architecture.md`, `names.md`,
`application.md`, `browser.md`, `documentation.md` (the parity minimum). The design record under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`: `content-layout-design-verdict.md`
(the rulings: `_reset.scss` in the `reset` layer for box sizing, `[hidden]`, and the `:root`
scroll behaviour; one partial per bare tag, `_heading.scss` for the heading family, mandated
pairs from `MANDATED_TAG_PAIRS`; `a:not([href]):not([class])` and its hover twin in `_a.scss`;
body-compatible variables affecting rendered consumers; the fixed heading scale as a departure),
`units/content-layout-design-planner-report.md` (§ 2, § 3, § 7, and the CL3 criteria),
`units/content-layout-design-analyst-report.md` (unit 2, unit 3, § Risk register),
`units/content-layout-scout-report.md` (§ 1 Reboot tags, § 5). Values:
`research/calibration-content.md` under the same folder (one table per surface, light and dark on
both browsers: the heading, paragraph, list, `dl`, blockquote, `hr`, anchor, code family, `small`,
`mark`, `abbr`, `address`, `sub`, `sup` readings) and the accepted `research/calibration.md`
(type sizes, weights, line heights). Bootstrap's own rules: `node_modules/bootstrap/scss/_reboot.scss`
in the Veneer checkout and the pinned inventory's `reboot` entries (`tests/fixtures/oracle/inventory.json`,
projected by `readOracleInventory` in `tests/setupConformance.ts:741-773`): derive the selector
set from the fixture, never from a ledger's counts. The presence scan reads only the guide's
Compatibility rows (`tests/conformance.test.ts:52-61`), so the bare-tag selectors this unit ships
are not scanned until CL4 adds the `reboot` row.

Readings taken on the live tree at `9f5ffda` (verified 2026-09-21; a line that has moved is a
re-read, never a stop):

- `src/styles/_tokens.scss:4` declares `@layer theme, reset, base, elements, components, utilities`.
  `src/styles/index.scss:1-6` loads `tokens`, `theme`, `elements/html`, `elements/body`,
  `elements/button`, `components/button`. The partials present: `elements/_html.scss`,
  `elements/_body.scss`, `elements/_button.scss`, `components/_button.scss`.
- Tokens this unit binds to, all present: `--vn-space-12` (`_tokens.scss:240`), `--vn-space-24`
  (`:241`), `--vn-display-1` to `-6` (`:220-225`), `--vn-line-heading` (`:228`),
  `--vn-weight-heading` (`:230`), the `--vn-size-*` and `--vn-space-*` ramps (`:208-241`);
  `--vn-state-stripe` (`_mixins.scss:136`), `--vn-text-code` (`_mixins.scss:151`),
  `--vn-link-rgb` (`_mixins.scss:162`) with `--vn-link-base`, `--vn-link-hover-base`,
  `--vn-link-hover-rgb`, and `--vn-link-decoration` beside it, each valued from the `$light` and
  `$dark` maps in `_tokens.scss`.
- Guards: `tests/src/styles/index.test.ts:21` asserts the layer order; `:23-27` is the
  elements-layer guard (`matchesLooseTagPair`, defined at `tests/setupStyles.ts:1633-1652` over
  `MANDATED_TAG_PAIRS`); `:28-38` is the physical-axis guard. Both run over every rule of the
  shipped cascade, so a new partial feeds them with no edit. `MANDATED_TAG_PAIRS`
  (`tests/setupStyles.ts:437-456`): `details/summary`, `dl/dt`, `dl/dd`, `fieldset/legend`,
  `figure/figcaption`, `ol/li`, `optgroup/option`, `ruby/rp`, `ruby/rt`, `select/option`,
  `table/caption`, `table/colgroup`, `table/tbody`, `table/tfoot`, `table/thead`, `tr/td`,
  `tr/th`, `ul/li`. This unit needs no new export from `tests/setupStyles.ts` or
  `tests/setupBrowser.ts`; those files and their proofs are off-limits, and a fix that needs one
  is a stop.
- Showcase: `app/browser/sections/ButtonSection.ts` (77 lines) implements `SectionInterface`
  (`app/browser/types.ts:10-15`), takes `host: HTMLElement` in its constructor and mounts there,
  exposes `destroy()` and `get host()`, and reads the frozen `BUTTON_SPECIMENS` table
  (`app/browser/constants.ts:29-232`) typed by `ButtonSpecimen` (`types.ts:18-33`, button-shaped:
  a `ContentSpecimen` interface is needed in `types.ts`). `app/browser/Showcase.ts:59-66` appends
  `#main` and returns `[new ButtonSection(this.#main)]`. `app/browser/index.ts:4` re-exports
  `./sections/ButtonSection.js` directly; there is no `sections/` aggregate, so `ContentSection`
  gets its own re-export line. `tests/app/browser/index.test.ts:8-15` asserts the export set
  `['BUTTON_COPY', 'BUTTON_GRID', 'BUTTON_SPECIMENS', 'ButtonSection', 'SHOWCASE_COPY', 'Showcase']`,
  which grows with every new export. `tests/app/browser/sections/ButtonSection.test.ts` and
  `tests/app/browser/Showcase.test.ts` are the section and shell proofs to mirror.
- Guide: § Styles files table at `guides/veneer.md:122-135`; `### Departures from Bootstrap` at
  `:616` (the carrier of the three departure rows; `### Departures from the workspace rows` at
  `:240` is a different table); § Showcase's region sentence at `:740-741` ("a Buttons region
  carrying every declared button specimen"); § Compatibility at `:686-719` carries `btn` and
  `engine` rows only and is not edited here.

Host: Windows, Git Bash; `npm.cmd run <name>`; managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge` (a `.cmd` launcher under `tmp/` as earlier units did); the `prove`
tool is blocked, so red-then-green pairs come from real runs; a nested `git` or `npm install` is
denied; `vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, and
`tests/setupPolicy.ts` are vendored and never edited. The `src:styles` project loads the built
cascade, so rebuild with `npm.cmd run build:src:styles` after every `.scss` edit before a styles
proof is read.

Standing clauses: audits cover implementation only (no wording, comment, or guide-prose change
beyond what a code change requires; a guide row is the parity minimum); an enumerating assertion
in an owned file that your change grows (the app barrel's export set, the specimen tables, the
styles files table in the guide) is yours to update in the same step, recorded, never a stop;
the scoped formatter and a lint diagnostic's canonical rewrite are granted; a plant proves an
instrument and is removed before you return.

## Unknowns

Whether `scroll-behavior: smooth` at `:root` destabilises the journey harness's scroll-into-view
verbs: probe first (item 1) on both receipts with the rule planted and the existing journey
suite; where it fires, record the affected journeys as a bound for CL11 (stage reduced motion
there), never drop the rule. Which text specimens the section renders where Elements carries
none (`abbr` with a title, `address`, `sub` and `sup`): Bootstrap's markup, recorded.

## Scope

Owned: `src/styles/_reset.scss` (new), `src/styles/index.scss` (the load order), the text tag
partials under `src/styles/elements/` (`_heading.scss`, `_p.scss`, `_hr.scss`, `_a.scss`,
`_ul.scss`, `_ol.scss`, `_dl.scss`, `_blockquote.scss`, `_address.scss`, `_abbr.scss`,
`_strong.scss`, `_small.scss`, `_mark.scss`, `_sub.scss`, `_sup.scss`, `_code.scss`, `_pre.scss`,
`_kbd.scss`, `_samp.scss`, `_var.scss`, all new, and `_html.scss` and `_body.scss` where the
Reboot obligations they own change), their mirrored proofs under `tests/src/styles/elements/`
(one per partial, new) plus `tests/src/styles/reset.test.ts` (new), `tests/src/styles/index.test.ts`
(only where the layer order or the guard's admitted set must grow), `app/browser/sections/ContentSection.ts`
(new), `app/browser/constants.ts` (the text specimen table and copy), `app/browser/types.ts`
(the `ContentSpecimen` interface), `app/browser/index.ts`, `app/browser/Showcase.ts` (mounting
the section after `ButtonSection`), `tests/app/browser/sections/ContentSection.test.ts` (new),
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `guides/veneer.md`
(§ Styles files table rows for the new partials, `### Departures from Bootstrap` rows for the
fixed heading scale, the `[hidden]` layer placement, and the `--bs-body-text-align` fallback,
§ Showcase's region sentence), `cl3-report.md`.
Off-limits: `src/styles/components/**`, `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`,
`src/core/**`, `src/browser/**`, `tests/setup*.ts` and their proofs, `tests/conformance.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/fixtures/**`, the guide's § Compatibility,
`package.json`, `configs/**`, the vendored files.

## Execution

1. Probe `scroll-behavior: smooth` at `:root` under `prefers-reduced-motion: no-preference`:
   plant the rule, rebuild, run `npm.cmd run test:journey` on Chromium and Edge, record the
   reading, restore. Then land `_reset.scss` (universal `box-sizing: border-box` with its
   pseudo-elements, `[hidden] { display: none !important }`, the scroll-behaviour rule inline)
   in the `reset` layer and load it after the theme in `index.scss`.
2. Land the text tag partials one bare tag each (the heading family in `_heading.scss`; `dl`
   with `dt` and `dd` in `_dl.scss` by the mandated pairs), bound to the calibration record's
   values through the `--vn-*` tokens (a heading's size to `--vn-size-*`, weight to
   `--vn-weight-heading`, line height to `--vn-line-heading`, margins to `--vn-space-*`; the
   code family's paint to `--vn-text-code` and the surface tokens; the anchor to the link tokens
   with `color: rgba(var(--vn-link-rgb), var(--bs-link-opacity, 1))`, the no-`href` reset and its
   hover twin); `_body.scss` reads `text-align: var(--bs-body-text-align, start)` and the
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
4. `ContentSection`: the text specimens from a frozen `CONTENT_SPECIMENS` table typed by
   `ContentSpecimen`, mounted after `ButtonSection` and destroyed before the nodes, with the
   section proof (rendering in table order, release, idempotent destruction) and the shell proof
   updated; the app barrel's export set updated in `tests/app/browser/index.test.ts`.
5. Guide: the parity minimum (the files table rows, the three departure rows under
   `### Departures from Bootstrap`, the region sentence).
6. Gates, in order: `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run build`, `npm.cmd run test:src:styles`, `npm.cmd run test:conformance`,
   `npm.cmd run test:app:browser`, `npm.cmd run test:journey`, `npm.cmd run test:guides`,
   `npm.cmd run test:policy`, `npm.cmd run test:setup`, then
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` and
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser`.

## Output

Write `cl3-report.md` in the Veneer checkout and return it: the scroll-behaviour probe
reading on both receipts; per partial the values bound and their source (record row or
retained); the red-then-green pairs (command and counts); each gate's exit code and final lines
on both engines; the actual `git diff --stat` and `git status --porcelain --untracked-files=all`;
every plant's removal; any guide bound for CL12; any journey bound for CL11.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: a partial's internal order, a
specimen's markup, a proof's case-table shape, where the retained-value note sits, the
`ContentSpecimen` fields. Stop on: a gate red after your own fix inside owned files; the
elements-layer guard refusing a selector the inventory requires and no mandated pair admits
(report the selector; it is CL4's or an exclusion's); a token the calibration needs that CL2 did
not land; a fix that needs a `tests/setup*.ts` export.

## Acceptance criteria

1. `_reset.scss` and every text partial listed under Scope exist, load in `index.scss`, and the
   cascade's layer order is unchanged.
2. Every partial's proof reads its values on both receipts equal to the record or the retained
   value, red on its plant; the `[hidden]`, no-`href`, body-variable, and scroll-behaviour proofs
   hold as item 3 states.
3. `ContentSection` renders every text specimen through `SectionInterface`, proven.
4. The guide's Compatibility table is unchanged and `listed` stays `['btn']`; `test:conformance`
   is green.
5. Every gate in item 6 exits 0 on managed Chromium and Edge.
6. The status shows only the owned files and the report.

## Review evidence

The actual `git diff` and `git status` at return; this report.
