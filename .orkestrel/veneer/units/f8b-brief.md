# Unit F8b SHARED-PREFLIGHT — brief

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-f8b`, a git worktree detached at `0783b2b` (the session branch after F8a
PROFILES landed). Perform the assignment directly and spawn nothing. Do not commit, push, install,
or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Seven sibling units
run in parallel in their own worktrees; write nothing outside yours.

## Objective

The `tailwind` recipe the guide ships is executed as written, with a markup fixture in place of the
consumer's markup directory and the trailing cascade import resolved, and the browser proves
Bootstrap wins every shared class name under it while a Tailwind-only utility still overrides a
component declaration; the `preflight` profile is proved to keep every property Veneer's `elements`
layer declares for each overlapping element and to move nothing the guide's preflight departure
table does not record; the guide-table readers the browser proofs and the Node readers share live
in `tests/setupStyles.ts`; and the guide's § Tailwind states the executed recipe, the shared-name
proof, and the preflight ruling with its table.

## Context

**Ruling.** `./tmp/units/f8-design-verdict.md` is the design. Rulings 4, 5, 9, 10, and 11 bind this
unit; ruling 2's reason (a Tailwind-only utility such as `px-8` overrides a component declaration
under the one order line) is a proof obligation here. Where this brief and the verdict disagree,
the verdict wins; where the verdict and the tree disagree, stop and report.

**Evidence: what F8a landed at `0783b2b`.** Read each in the tree, located by symbol or heading:

- `tests/tailwind/profiles.test.ts`: the cases `declares the one order line…`, `fills Tailwind
  reset only under the preflight profile`, `composes the theme and utilities imports…`, `places the
  generated properties layer…`, `withholds every shared class name the exclusion line names, and
  emits them without it` (it derives the shared set inline as the class names the built cascade
  and the unexcluded instrument both declare, with `FLOOR_SELECTORS`), `holds every written copy of
  the exclusion line equal…` (it splits the guide's `css` fences inline and reads
  `tests/fixtures/tailwind/preflight.css` as a copy), `declares the Tailwind parts…`, `reads
  Veneer's sheet while a Tailwind stylesheet is loaded`. Each profile is imported twice, `?inline`
  for the compiled text loaded through `loadSheet` and `?raw` for the source.
- `tests/setupBrowser.ts` exports the sheet readers: `readCascadeSheet` (keyed on `TOKEN_PREFIX`
  inside a `theme` block), `loadSheet`, `readLayerStatement`, `collectLayerOrder`,
  `collectFilledLayers`, `collectLayerRules(name, sheets)`, `collectSheetRules`, `collectSelectors`,
  `collectClassNames`, `collectCustomProperties`, `collectInlineSources`, and `scene`
  (`scene.load` appends a `<style>` element to `document.head`; `scene.clear` removes every node it
  recorded).
- `tests/setupStyles.ts` takes no `node:*` import (its header comment states why: the Node `setup`
  project and the browser `src:styles` project both load it) and already imports
  `extractCellText`, `findColumnIndex`, `selectSectionBlocks` from `@orkestrel/guide` and
  `createMarkdown`, `flattenText` from `@orkestrel/markdown`; it exports `ELEMENT_TAGS` (the tags
  each of Veneer's elements partials styles), `walkSelector`, `readIdentifier`, `splitTopLevelList`,
  and `normalizeComplexSelector`.
- `tests/setupServer.ts` exports `selectSubsectionTables(source, section, subsection, subject)`,
  `selectTableColumns(table, headers, subject)`, `readTableCells(row, columns)`, and
  `describeIncompleteRow(subject, index, cells)`. Each takes text or a Markdown node and no path,
  reads no file, and uses only `@orkestrel/guide` and `@orkestrel/markdown` symbols
  `tests/setupStyles.ts` already imports. `readDepartures`, `readAdditions`, `readCompatibility`,
  and `readDeferrals` call them after `readFileSync`. `tests/setupServer.test.ts` carries their
  cases and the export inventory.
- `configs/src/vite.tailwind.config.ts`: the `src:tailwind` project (`include:
  ['tests/tailwind/**/*.test.ts']`, setup files ending in `./dist/src/styles/index.css`), the
  `@tailwindcss/postcss` plugin under `css.postcss`, and the `veneer-tailwind-candidates` plugin
  writing `tmp/tailwind/candidates.txt` on `configResolved`.
- `tests/setup.css` (the `tailwind` profile), `tests/fixtures/tailwind/preflight.css`,
  `tests/fixtures/tailwind/unexcluded.css` (the candidates source, no exclusion line, the
  `@source inline("px-8 font-bold")` control).
- `package.json` `exports["./styles"]` is `./dist/src/styles/index.css`; `test:src:tailwind` builds
  the cascade first. Scripts: `test:setup` (the Node `setup` project: `tests/setup.test.ts`,
  `tests/setupServer.test.ts`, `tests/setupStyles.test.ts`), `test:setup:browser`,
  `test:conformance`, `test:guides`, `test:policy`, `test:src:styles`.
- `guides/veneer.md` § Styles › `### Tailwind` (after `### Files`): the profile table (columns
  Profile, Entry, Layers Tailwind fills in a consumer build, Tailwind parts, Proof); the emission
  paragraphs; the `tailwind` recipe fence and the `preflight` recipe fence; the paragraph
  `No proof compiles either recipe in the shape it ships here. The executed consumer-shaped profile,
  with a markup fixture and the trailing cascade import, lands with the shared-name proof.`; the
  order-line paragraph; the exclusion-line paragraphs; the workspace-execution paragraph. `### Files`
  rows for `tests/fixtures/tailwind/` and `tests/tailwind/`. `## Tests` names the profiles proof.
  Locate every passage by heading and text, never by line number.

**Measurements.** `./tmp/units/f8-tailwind-intersection.json` records, measured 2026-09-22 with
`tailwindcss` 4.3.3 against Bootstrap 5.3.8's compiled reboot: `preflightRebootOverlap` (31 tags:
`a abbr b button code h1 h2 h3 h4 h5 h6 hr iframe img input kbd ol optgroup pre progress samp select
small strong sub summary sup svg table textarea ul`). It is a calibration floor for the preflight
proof's derived overlap, never the proof's input. `./tmp/units/f8p-probe-readings.md` records the
compiler's behaviour (text files are scanned, CSS files are ignored as sources, `@source not
inline(...)` withholds names). The built cascade's class names Tailwind 4.3.3 also generates are the
exclusion line's members; every one is a normal declaration in Veneer, so no shipped shared name is
important today and the shared proof's importance branch is exercised only by its floor and its
derivation, not by a shipped member. Take every other measurement yourself, under the `src:tailwind`
project, before asserting it.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,workspace,tests,typescript,architecture,names,documentation,writing,portability}.md`.
Skill: none. Guide: `guides/veneer.md`. Plan of record: `ROADMAP.md` (read, never edit).

**Installed primitives.** `@orkestrel/test` browser exports
(`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`: `scene`-adjacent helpers, `build`,
`mount`, `requireValue`, the cascade readers); `@orkestrel/guide` and `@orkestrel/markdown` (the
table and section projections `tests/setupStyles.ts` and `tests/setupServer.ts` already use);
`@orkestrel/contract` guards. A helper whose job an installed export does is a defect; the audit's
checker probes the diff for export names.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
Chromium 141 at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`),
`node_modules` installed from this worktree's lockfile with `--ignore-scripts`. `tailwindcss` and
`@tailwindcss/postcss` 4.3.3 are development dependencies (D2); add no package. Seven sibling units
and the Orchestrator's gate chains run beside you: a timeout in `test:journey`, `test:policy`, or
`test:setup` is a timing reading the Orchestrator re-takes alone, never a defect you diagnose.
`tmp/` is gitignored and holds the candidates file and your probes (`tmp/probe/`).

**Control identifiers.** none; name every test for what it proves.

**Standing conditions.**

- The vendored `tests/setupPolicy.ts` mirror law requires every `tests/{app,src}/**/*.test.ts` file
  to name a source sibling; the Tailwind proofs therefore live under `tests/tailwind/`, never
  `tests/src/tailwind/`.
- `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.ts`,
  `tests/setupBrowser.test.ts`, and `guides/veneer.md` are also written by the sibling units, each in
  its own worktree, and every tree integrates by cherry-pick. Keep each edit localized: a new
  function with its own cases appended, a new subsection or paragraph, an edited row, never a
  reflow of surrounding text.
- The `attributeSelector` ladder and its remark in `tests/setupServer.ts`, and its plant in
  `tests/setupServer.test.ts`, are owned by a sibling unit: leave that region untouched.
- `src/styles/**` is off-limits (ruling 9): no rule whose reason is Tailwind, and no reversal of a
  preflight move.
- `prettier` is not the repository formatter and must never run; `oxfmt` is (`npx oxfmt <file>`
  scoped to owned files, then `npm run format:check`).

## Unknowns

1. Whether `@import '@orkestrel/veneer/styles';` resolves inside a PostCSS-processed fixture under
   the `src:tailwind` project (the package's own `exports["./styles"]`, a self-reference). Settle it
   first with a throwaway case under `tmp/probe/` (delete it before reporting) and record the
   command and reading. If it does not resolve, add one `resolve.alias` entry to
   `configs/src/vite.tailwind.config.ts` mapping that specifier to the built cascade path, record
   the deviation, and keep the recipe text as the guide ships it.
2. Whether Tailwind scans an `.html` fixture named by a relative `@source` the way it scans the
   candidates text file. Settle it by the consumer sheet emitting the control utility the fixture
   uses; record the reading.
3. Whether every property preflight moves on an overlapping element reads as a stable computed
   value in the pinned browser across the standalone and `preflight` documents (a font stack
   string, an `rgb(...)` color, a `px` length). Record the values as read; the guide table carries
   them as read, with the sentence that they are what Chromium 141 resolves.

## Obligations

### Obligation 1 — the executed consumer recipe (rulings 5 and 10; referral R3)

`tests/fixtures/tailwind/consumer.css` is the guide's `tailwind` recipe fence with one line changed:
`@source './markup.html';` in place of `@source './src';`. Everything else — the order line, the two
composable imports without `source(none)`, the exclusion line, and the trailing
`@import '@orkestrel/veneer/styles';` — is the shipped text. `tests/fixtures/tailwind/markup.html` is
one root element of consumer markup: at least one element per shared class name the shared proof
derives (a `div.container`, a `table.table` with a `caption.caption-top` and a second table with
`caption.caption-bottom`, a `div.row` holding a `div.col-1` and a `div.col-auto`, and so on for
every member), and one component element carrying a Tailwind-only utility (`button.btn.px-8`). The
proof holds the fixture to the derived set (obligation 2), so the fixture is a copy the gate keeps
honest rather than a list anyone maintains by hand.

### Obligation 2 — `tests/tailwind/shared.test.ts`

Each case mounts the markup fixture (`?raw`, through the installed `build`/`mount` or `scene`),
loads the consumer sheet (`?inline` through `loadSheet`) where the case needs it, and clears in
`afterEach`. Prove, with `file:line`-citable assertions:

- **Recipe equality.** The consumer fixture's lines, minus its `@source` line, equal the guide's
  `tailwind` recipe fence's lines minus its `@source` line, in order (read the guide through `?raw`
  and its `css` fences through the shared fence reader of obligation 4). A guide recipe that drifts
  from the executed one reddens here.
- **The trailing import resolved.** The consumer sheet opens with the order line
  (`readLayerStatement`), declares the Veneer signature (`TOKEN_PREFIX` inside `theme`), and fills
  `utilities` with the control utility's rule (`.px-8`).
- **The shared set, derived with a floor.** The shared names are the class names the built cascade
  and the unexcluded instrument both declare — route the derivation `profiles.test.ts` inlines
  through one exported reader (obligation 4) and use it in both files. Assert the set contains
  `container`, `table`, `col-1`, `caption-top`, and `caption-bottom`, and that the markup fixture
  carries at least one element per member (`querySelectorAll` with `CSS.escape`).
- **Bootstrap wins.** Take a computed snapshot of every element carrying a shared name in the
  standalone document (the setup-file cascade alone), load the consumer sheet, and take it again:
  every non-custom longhand the computed style enumerates is unchanged for every such element. Then
  the importance branch of ruling 4: for every shared name whose Veneer declaration is important
  (none shipped today; derive it from the cascade's declarations rather than assuming), the same
  equality holds without the exclusion line — write the branch so it runs over the derived members
  and record that it iterates an empty set today.
- **A Tailwind-only utility still overrides a component.** The `button.btn.px-8` element's
  `padding-left` and `padding-right` under the consumer sheet equal Tailwind's `px-8` value (read
  the value from the sheet's own `.px-8` rule and `--spacing` variable rather than hardcoding `2rem`)
  and differ from the standalone `.btn` padding.
- **The negative control.** Under `tests/fixtures/tailwind/unexcluded.css` loaded over the
  standalone document, at least one shared-name element's snapshot moves (name the floor you
  measure, such as `.col-1`'s `grid-column-start`), which is what proves the equality reading can
  see a Tailwind rule winning.

### Obligation 3 — `tests/tailwind/preflight.test.ts` (ruling 9)

- **The overlap, derived with a floor.** The tags Tailwind's preflight styles are the type
  selectors of the style rules in the `base` layer of the compiled `preflight` profile
  (`collectLayerRules('base', [sheet])`, selectors split on top-level commas, the leading tag
  identifier of each compound read through the existing selector readers); the tags Veneer's
  `elements` layer styles are `ELEMENT_TAGS`. The overlap is their intersection. Assert it contains
  `a`, `button`, `h1`, `hr`, `img`, `input`, `table`, and `textarea`.
- **The property set, derived.** The union of every non-custom property the `base` layer's style
  rules declare.
- **Per element.** Mount each overlapping tag inside one neutral wrapper (an `img` without a
  source, an `input`, a `select` with one `option`, a `table` with one row and cell, a `summary`
  inside `details`, and text content where the tag takes it), read the property set's computed
  values in the standalone document, load the `preflight` profile (`?inline` through `loadSheet`,
  after the setup-file cascade so the cascade's order line places `base` before `elements`), and
  read them again.
- **Reboot wins.** Every property Veneer's `elements` layer declares for that tag
  (`collectLayerRules('elements', [cascade])` filtered to rules whose selector list names the tag)
  keeps its standalone value.
- **Every move is a recorded row.** Every (tag, property) whose value moved is a row of the guide's
  preflight departure table with that tag, that property, the standalone value, and the `preflight`
  value as read; every row of the table is a moved pair with those values. Read the table through
  the shared reader of obligation 4 from the guide's `?raw` text.
- **Plants.** Live controls inside the case: the read table with one observed row removed makes the
  reading refuse, and with one fabricated row added makes it refuse. Recorded readings, command and
  count: the guide's table with one row removed → red; a row's value edited → red. Restore the guide
  after each.

### Obligation 4 — the shared readers

- Move `selectSubsectionTables`, `selectTableColumns`, `readTableCells`, and
  `describeIncompleteRow` from `tests/setupServer.ts` to `tests/setupStyles.ts` unchanged in
  signature and TSDoc; import them into `tests/setupServer.ts` from `./setupStyles.js`; move their
  cases from `tests/setupServer.test.ts` to `tests/setupStyles.test.ts`; update both export
  inventories. `tests/setupStyles.ts` already imports every symbol those functions use.
- Add to `tests/setupStyles.ts`, exported and tested: a fence reader (the guide's fenced blocks of
  one language, replacing the inline split in `profiles.test.ts`'s copy-equality case, which you
  reroute) and the preflight departure table reader (rows of tag, property, standalone value,
  profile value; selects the one table in § Styles › Tailwind carrying those column headers and
  refuses zero or several; refuses an incomplete row through `describeIncompleteRow`).
- Add to `tests/setupBrowser.ts`, exported and tested: the shared-name derivation
  `profiles.test.ts` inlines (reroute that case), a reader for the tags a rule list's type
  selectors name, a reader for the non-custom property names a rule list declares, and a computed
  snapshot reader (an element's non-custom longhands, or a named property list, as a map). Module
  helpers use `{verb}{Noun}`; no nested functions; no hidden helpers.
- `profiles.test.ts`'s copy-equality case adds `tests/fixtures/tailwind/consumer.css` to the
  population it holds equal to `tests/setup.css`'s exclusion line.

### Obligation 5 — the guide

§ Styles › `### Tailwind`:

- Replace the paragraph `No proof compiles either recipe in the shape it ships here…` with the
  executed-recipe statement: the consumer fixture pair, what changes between the shipped recipe and
  the executed copy (the `@source` line alone), and what the shared proof reads (the recipe held
  equal to the fence, the trailing import resolved, every shared name's computed style unchanged
  from standalone, the control utility overriding the component, the instrument's negative control).
- After the exclusion-line paragraphs, the shared-name rule's proof prose: every shared name is
  important in Veneer or excluded by the recipe, the set derived from the built cascade and the
  unexcluded instrument at run time with a floor, and the importance branch iterating an empty set
  while no shipped shared name is important.
- The preflight ruling: Veneer's `elements` layer sits after `base`, so every property Veneer's
  reboot declares keeps its value under the `preflight` profile, and every property preflight adds
  on an overlapping element is a row of the following table. Introduce the table with a complete
  sentence naming its columns (`Tag`, `Property`, `Standalone`, `Preflight`), one row per moved
  pair as the proof reads them in Chromium 141, and the sentence that the proof reddens on an
  unrecorded move and on a stale row.
- The profile table's Proof column: the `tailwind` row links the shared proof beside the profiles
  proof; the `preflight` row links the preflight proof beside it.
- § Files: edit the `tests/fixtures/tailwind/` row to name the consumer profile and the markup
  fixture, and the `tests/setupStyles.ts` row to name the guide-table readers; edit the
  `tests/setupServer.ts` row so it no longer claims the table readers. § Tests names the two proof
  files beside the profiles proof.

Write nothing as a placeholder. `ROADMAP.md` is report-only: return the patch for the F8 row (F8b
landed) and the § Carriers row `A later unit that ships a shared class name…`, which gains the
markup fixture as a third copy the gates hold.

## Scope

- Owned: `tests/tailwind/shared.test.ts`, `tests/tailwind/preflight.test.ts`,
  `tests/tailwind/profiles.test.ts` (the two reroutes and the copy-equality population only),
  `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/markup.html`,
  `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.ts`,
  `tests/setupBrowser.test.ts`, `tests/setupServer.ts` (the four readers' removal and the import
  only), `tests/setupServer.test.ts` (their cases' removal and the inventory only),
  `configs/src/vite.tailwind.config.ts` (the alias of unknown 1 only, if needed), `guides/veneer.md`
  (§ Tailwind, the § Files rows named, § Tests).
- Shared, report-only: `ROADMAP.md`.
- Off-limits: `src/**`, `tests/setup.css`, `tests/fixtures/tailwind/preflight.css`,
  `tests/fixtures/tailwind/unexcluded.css`, `tests/src/**`, `tests/app/**`, `tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/conformance.test.ts`, `package.json`, `package-lock.json`,
  `vite.config.ts`, `app/**`, the `attributeSelector` region of `tests/setupServer.ts` and its plant,
  every other file. No git command that discards a working-tree change.
- What asserts the state this change ends: the export inventories in `tests/setupBrowser.test.ts`,
  `tests/setupStyles.test.ts`, and `tests/setupServer.test.ts` (owned); the copy-equality case in
  `profiles.test.ts` (owned); `readDepartures`, `readAdditions`, `readCompatibility`, and
  `readDeferrals` in `tests/setupServer.ts`, which keep working through the moved import
  (`npm run test:conformance` proves it); `tests/guides.test.ts` parity over § Files and § Tests
  (`npm run test:guides`); the policy sweep (`npm run test:policy`).
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src:styles`.

## Execution

Perform the assignment directly and spawn nothing. Settle the unknowns first. Validate with scoped
`npx oxfmt` over owned files, then `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run test:src:tailwind`, `npm run test:setup`, `npm run test:setup:browser`,
`npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, and `npm run test:src:styles`;
then `npm test` once as an observation.

## Output

Write `tmp/units/f8b-report.md` and return the same text: the unknowns' measurements with their
commands, every red-then-green reading with its command and count, the derived overlap and the
moved pairs as read, the touched files, the guide wording added, the `ROADMAP.md` patch,
`git status --porcelain`, `git diff 0783b2b --stat`, the gate exits, deviations per § Deviation
protocol in `/home/user/scaffold/.agents/orchestration.md`, and the claims you flag unverified. No
process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: the reader names, the
snapshot's shape, the markup fixture's element choices beyond the members named, the case titles,
the departure table's placement inside § Tailwind, and the wording of the guide paragraphs. Stop and
report when the trailing import resolves by neither path unknown 1 names, when a vendored policy
sweep refuses a file this brief names, or when a preflight move cannot be recorded as a stable value.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:tailwind` exits 0 with the cases obligations 2 and 3 name present; the negative
   control of obligation 2 is a live case; the plants of obligation 3 are live cases, and the two
   recorded red readings carry command and count.
3. `npm run test:setup` and `npm run test:setup:browser` exit 0 with the moved readers' cases in
   `tests/setupStyles.test.ts`, the new readers' cases, and every inventory updated.
4. `npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, and
   `npm run test:src:styles` exit 0.
5. `grep -n 'selectSubsectionTables\|readTableCells' tests/setupServer.ts` matches only the import
   and the call sites.
6. `git status --porcelain` lists only owned files.

**Observations, not criteria.** `npm test`; any timeout in `test:journey`, `test:policy`, or
`test:setup` under load.

## Review evidence

The report, `git diff 0783b2b --stat`, `git status --porcelain`, and the diff of every owned file.
