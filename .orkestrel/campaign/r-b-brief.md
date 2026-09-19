# Unit R-B — the roughnotes test layer adopts the published journey layer

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/roughnotes` checkout. You open this brief
yourself; every later section is written for you.

## Objective

Replace every hand-rolled instrument in roughnotes' browser test layer that `@orkestrel/test`
0.0.17 now publishes with the published one, move the surviving application-specific helpers into
the workspace's browser test setup module and prove them there, route every reach-past site in the
journey suite through the interface, read the run's axis through `inject`, and write the intents
every surface owes where the product has the state — so the suite is the one the
`orkestrel-prove-journey` skill describes, green under every variant with and without `CAPTURE`.

## Context

**Evidence.** Read, in order:

1. The skill, at its scaffold home: `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/SKILL.md`
   and every reference under `references/` (`layer.md`, `captures.md`, `styles.md`,
   `statechart.md`, `decide.md`). It is the workflow this unit follows; where it and this brief
   differ, stop and report.
2. The Grok distillate of the terrain, retained at
   `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/r1-terrain-distillate.md`: for
   every export of `tests/app/browser/setup.ts` the published match or `none`, with the semantic
   difference, and the reach-past sites in `tests/app/browser/integration.test.ts` by line. The
   line numbers predate unit R-A; re-derive each site by its text.
3. The visit findings at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/findings-roughnotes-visit.md`
   (V1–V6): the standing `format:check` red on the regenerated root, the `capture` key already
   added to the `ProvidedContext` augmentation, the base `optimizeDeps` list that moves to the
   browser wrapper, and the fact that a fleet target carries no rules or skills of its own.
4. Unit R-A's report at `tmp/units/r-a-report.md` (the menu trigger's `aria-expanded`, the
   accessible-name repairs, the names it moved), and the checkpoint it landed at.
5. The installed declarations: `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and
   `dist/src/core/index.d.ts`, and the guide mirror `guides/test.md` § Limits and § Bounds a shipped
   helper carries. Read each helper's declaration before replacing a local one with it.
6. The product guide `guides/README.md` (the route table, the `Frame`, `Entry`, `ShellGroup`
   shapes, each screen's vocabulary and states). Every expected outcome comes from it; invent no
   copy, no redirect, no title scheme.

**The replacements the distillate names**, each a published helper whose semantics match; where
the difference column names a behaviour the published helper refuses, follow the skill's ruling
for it rather than keeping the local variant:

| Local (`tests/app/browser/setup.ts`) | Published | Ruling |
| --- | --- | --- |
| `QuotaOptions`, `QuotaStorage`, `PermissionOptions`, `PermissionStorage` | `createStorage({ values?, reads?, writes?, quota? })` → `WebStorageInterface` with `permit()` | Replace; assert the withheld voice on `name` (`SecurityError`, `QuotaExceededError`) and message per `SKILL.md` → Declare the transport family |
| `readRefusal` (name only) | `readRefusal(name)` and `readRefusal(role, name)` | Replace |
| `readAnnounced` (name, hardcoded `button`) | `readStates(element)` | Replace, resolving the element first |
| `readMenuSettled` (`#site-menu` by id, Bootstrap `show`/`showing`/`hiding`) | `waitForState(name, state)` on the trigger's `aria-expanded` R-A authored | Replace; the class-list settle is a named ban |
| `buildMarkControl` | `buildCensus()` | Replace |
| `CompositeStack`, `buildCompositeStack`, `STACK_BASE`, `STACK_TINT`, `STACK_REFUSED`, `STACK_ACCEPTED`, `readFlat` | `buildContrast(bar)` → `ContrastFixture` with `refused` and `accepted`, `CANVAS_COLOR` | Replace; the control must straddle its declared bar in the same run |
| `CensusReading`, `readCensus`, `CENSUS_RULE` | `readCensus(root)` → `CensusReading` with `tokens: readonly string[]` | Replace; assert the population it walked |
| `EscapeFixtures`, `buildEscapeFixtures` | `buildEscapes(permitted)` → `EscapeFixture` | Replace |
| `isPainted` | none — `element.checkVisibility()` and a non-zero `getBoundingClientRect()` | Replace with the platform reads the skill names |
| `SETTLE_BUDGET`, `SETTLE_INTERVAL`, `PAINT_BUDGET` | `WaitOptions.budget`, `.interval`; `waitForAnimations` | Replace; pass a budget where the surface needs more than the default |
| `readSettled` | `waitForAnimations(element)` then `readContrast(element)` | Replace |
| `readSurface` (gradient minimum over token stops) | `readContrast` composites translucent layers | Read the declaration and the guide's Bounds; keep a gradient-stop reading only if `readContrast` provably reads a gradient wrongly, and then as a setup-module helper named for the act, with the measured difference in its doc block |
| `mountView`, `openSurface`, `startSubscription`, `followSite`, `openSite`, `closeSite`, `toggleThemeControl`, `readCompact`, `readThemeControl`, `readIsland`, `readGradient`, `selectRole`, `clearSurface`, `THEME_PROBE`, `DETAIL_SLUGS`, the role tables, the control names, the contrast bars, the voices | none | Keep; move to `tests/setupBrowser.ts` under `.claude/rules/tests.md` (browser helpers and setup CSS live there), name each for the act, and prove each in `tests/setupBrowser.test.ts` |

**The reach-past sites** (re-derive by text): `document.elementFromPoint` → `readHit`;
`host.querySelectorAll('*').length` → the population `readCensus` reports; `app.open(<path>)` in
the empty-result and unindexed journeys → the visible link or control that navigates, or the entry
mount at that route where the intent is arrival; `app.theme(variantDark(name))` → the masthead
color-mode control the application ships, applied inside the journey from the variant's name;
`app.dark.value` and `storage.getItem(THEME_STORAGE)` in the transport family → corroboration
beside a rendered assertion, never in its place; `import.meta.env.VITE_CAPTURE` → `inject('capture')`;
`page.viewport(width, height)` in the matrix loop → a setup-module helper named for the act (the
layer publishes no viewport verb); `commands.readFile`/`writeFile` for the written artifact → keep
(`decide.md` → the run's written artifact).

**The families and the intents.** Declare the families per `SKILL.md` → Declare the families and
assert the declaration. Write the intents every surface owes (arrival, an unknown route, an empty
result, the document title per screen, a render failure) where the product has the state; where the
product guide names no outcome — the shared `<title>`, the unknown route landing on home with no
notice, the blank page on a render error, the unreached miss screens — write the journey to what the
guide says and report each missing outcome as a product finding with its evidence site, per D25 and
D28 (`.orkestrel/campaign/design-verdict.md` in the scaffold checkout). Rule on the statechart
family: read `app/core/types.ts` and `app/browser/types.ts` for an entity carrying its own state
and event vocabulary; declare the family and drive the table where one exists, and record the
ruling with the unions you read where none does.

**The configuration moves.** The hand-rolled root's `optimizeDeps.include` list
(`['vue', 'bootstrap', '@popperjs/core', '@orkestrel/test', '@orkestrel/test/browser']`, visible in
`git show 43939b8:vite.config.ts`) moves to the birth-owned `configs/app/vite.browser.config.ts` as
an override to `appBrowser`, and `tests/conformance.test.ts` asserts the wrapper's configuration
rather than the base. `configs/app/vite.journey.config.ts` keeps the four variants; rename or
extend them only through the interface the skill names.

**The modal-aware layer.** This checkout is re-pinned to `@orkestrel/test` 0.0.18, whose
`isReachable` refuses an element a shown `[aria-modal="true"]` element does not contain (unit T4;
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/t4-report.md`), so the compact
masthead's `Get started, Site` no longer counts while the offcanvas menu is open. The provisional
split unit R-A made — the menu's copy announcing `Get started, Menu` — is no longer needed: set the
menu action's `aria-label` in `app/browser/App.vue` back to `buildName(COPY.started, COPY.site)`,
delete the comment that stated the split's reason, update the shell-name pin in the census setup
module and the guide's sentences naming `Get started, Menu`, and prove through the census at 390
with the menu open that the one name resolves the menu's copy alone. That `App.vue` line and the
guide's sentences are the only application edits this unit owns.

**The setup runtime.** Write `tests/setupBrowser.test.ts` proving `tests/setupBrowser.ts`, add
`npm run test:setup:browser` to the `test` chain, then run
`node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --groups configs,manifests` (read
the order and the refusal in `layer.md` → Import, never implement). `repair` restores every
vendored file; edit none.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and the rules there:
`.claude/rules/tests.md`, `browser.md`, `application.md`, `names.md`, `typescript.md`,
`architecture.md`, `writing.md`, `quality.md` § Instruments; `.agents/orchestration.md`
§ Deviation protocol. Skill: `orkestrel-prove-journey` (item 1). Guide: `guides/README.md`.

**Installed primitives.** `@orkestrel/test` 0.0.17; `@orkestrel/scaffold` 0.0.74 (vendored files
restored by `repair`; `scaffold audit` lists them; never edit one).

**Host.** Windows 11; Bash; browser runs through `npm run test:app:browser`, `npm run test:journey`
(four variant projects, Playwright Chromium), and, after activation, `npm run test:setup:browser`;
the capture run sets `CAPTURE` to `1` in your shell (`CAPTURE=1 npm run test:journey` in Bash)
and writes the frames under the directory `createPortfolio` is given. Edit through your editor
tools so no non-ASCII code point round-trips through cp1252.

**Measurements.** Baseline: the checkpoint the dispatch message names, carrying units R-A and the
visit, with the Orchestrator's gate reading the dispatch message records. `npm run format:check`
reddens on `vite.config.ts` alone (V1) until scaffold 0.0.75; treat that file's reading as the
standing condition and never edit it.

**Control identifiers.** `R-B-C1` through `R-B-C8`. Name a test for what it proves, never for the
control label.

**Standing conditions.** V1 (`format:check` on `vite.config.ts`); `.orkestrel/` in this checkout is
a prior campaign's retained folder; `tmp/units/` holds briefs and reports; `tmp/capture/` receives
frames.

## Unknowns

- Whether `readContrast` reads a gradient surface the way `readSurface` did. Measure it on the
  gradient surfaces `GRADIENT_SURFACES` names before deleting the local reading, and report the
  readings side by side.
- Whether the product carries an entity with its own state and event vocabulary. Report the unions
  you read and the ruling.
- Which intents the product guide supplies an outcome for. Report each of the five with the guide
  line that names its outcome, or the product finding where none does.

## Scope

**Owned.** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts` (new), `tests/app/browser/**`
(the suite, its setup module — which this unit empties into `tests/setupBrowser.ts` and deletes
with its proof, or keeps only for what `.claude/rules/tests.md` places there — and its component
tests), `tests/conformance.test.ts`, `configs/app/vite.browser.config.ts`,
`configs/app/vite.journey.config.ts`, `package.json` (the `test` chain's `test:setup:browser`
invocation alone), `tmp/capture/**`.

**Shared (report-only).** `guides/README.md` — return a patch where a proof changes a name the
guide states. `app/**` — report a product finding; change no application code (R-A owned the
semantics).

**Off-limits.** Every vendored file, `vite.config.ts`, `configs/browsers.ts`, `tsconfig.json`,
`package-lock.json`, `app/**` except the menu action's `aria-label` line and its comment in
`app/browser/App.vue` (see The modal-aware layer), `.orkestrel/**`.

**What asserts the state this change ends.** `tests/app/browser/integration.test.ts` under every
variant, `tests/setupBrowser.test.ts` in `setup:browser`, `tests/conformance.test.ts`,
`tests/config.test.ts` (vendored; reads the wrapper), `tests/policy.test.ts` (vendored; the
banned-term sweep over authored Markdown, the mirror rule over `tests/app/**`).

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`. `repair --groups configs,manifests` alone
among the scaffold verbs. Format and lint only your owned files with
`./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write <files>` and
`./node_modules/.bin/oxlint.cmd --config .oxlintrc.json --deny-warnings <files>`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/r-b-report.md` (retained as `.orkestrel/campaign/r-b-report.md` in the scaffold checkout): the replacement table with each local export's fate and the
published helper's declaration line; the reach-past sites with their routings; the families
declared and the statechart ruling with the unions read; the five intents with their guide lines
or product findings; the `readContrast`-versus-gradient readings; each control's command with its
red and green readings; the mutation readings the skill requires (one per assertion class); the
gate table; the guide patches; the claims you flag as least certain; the diff stat and
`git status --short`. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol (the scaffold copy). You settle helper
names, where a helper sits in `tests/setupBrowser.ts`, the shape of the setup proof, the order of
the journeys, and the capture registry's placement. Stop and report if a published helper refuses
a reading the suite needs and the skill names no door, if a product finding blocks a journey the
skill requires (report the finding and write the journey to what the guide says), if `repair`
refuses after the chain invocation is in place, or if a vendored file must change.

## Acceptance criteria

Cheap first.

- **R-B-C1.** `grep -n "class QuotaStorage\|class PermissionStorage\|function readMenuSettled\|function isPainted\|function buildCompositeStack\|function buildEscapeFixtures\|function buildMarkControl\|function readAnnounced\|elementFromPoint\|VITE_CAPTURE\|classList" tests/`
  matches nothing.
- **R-B-C2.** `grep -c "from '@orkestrel/test/browser'" tests/setupBrowser.ts tests/app/browser/integration.test.ts`
  reports at least one import in each, and every published replacement in the table is imported by
  name where the suite uses it.
- **R-B-C3.** `tests/setupBrowser.test.ts` exists, `package.json`'s `test` chain invokes
  `npm run test:setup:browser`, `vite.config.ts` registers `setup:browser` after the repair, and
  `npm run test:setup:browser` exits 0 with its totals line.
- **R-B-C4.** `npm run test:journey` exits 0 under every variant without `CAPTURE`, and with
  `CAPTURE` set to `1` writes every registered file (the disk-membership proof green) — record
  both totals lines and the frame count on disk.
- **R-B-C5.** The mutation readings the skill requires: the journey mutation (omit the act) reddens
  the destination assertion, and the refusal mutation (make the withheld control reachable)
  changes the asserted voice; each recorded with its command, its failing count, and its green
  after restore.
- **R-B-C6.** `npm run test:conformance` exits 0 with the wrapper's configuration asserted.
- **R-B-C7.** `npm run test:policy` and `npm run test:config` exit 0.
- **R-B-C8.** Scoped format and lint over owned files exit 0; `npm run check` exits 0;
  `npm run lint:check` exits 0; `npm run format:check` reports `vite.config.ts` alone.

**Observations, not criteria.** The whole `npm test` chain; the product findings' count.

## Review evidence

The actual diff and the actual `git status --short` output, in the report; the capture run's
frame listing.
