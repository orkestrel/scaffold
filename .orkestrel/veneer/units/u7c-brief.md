# Unit U7c — the Button section, the journeys, the captures, and the consumer

## Role and engine

`opus` on Opus 5, reached as a native Claude Code subagent (the Agent tool, `subagent_type: opus`,
`model: opus`, high effort). You are a native subagent reading this brief: perform the assignment
directly and spawn nothing. Sole writer in the Veneer checkout at
`C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; run no `scaffold repair`,
no tree-wide `format`, no lint `--fix`; never run `git checkout`, `git restore`, `git stash`,
`git reset`, `git clean`, or `git add`.

## Objective

Drive the first component through the rendered surface: the showcase gains a `sections/` family
whose first member renders every Button specimen, the showcase entry constructs the `Delegate`
that drives the `data-bs-toggle="button"` specimens, the journey axis proves Button's states,
access, paint, motion, coordinates, and artifacts on the mounted page and compares the same
markup and actions against the oracle fixture through one projection, and the distribution stage
gains one consumer case that imports `./browser` from the packed archive and constructs a
`Delegate`. The package's surface stays `.`, `./browser`, `./server`, and `./styles`.

## Context

**Evidence.** Taken 2026-09-20 in the Veneer checkout before U7d, U7a, and U7b landed; the
Orchestrator re-takes the marked readings at launch and states the HEAD in the dispatch message.

```text
$ ls app/browser app/browser/styles tests/app/browser
app/browser: Showcase.ts constants.ts index.html index.ts main.ts public styles types.ts
app/browser/styles: _shell.scss index.scss
tests/app/browser: Showcase.test.ts index.test.ts integration.test.ts
$ cat app/browser/index.ts
export * from './types.js'
export * from './constants.js'
export * from './Showcase.js'
$ grep -n "it(" tests/app/browser/index.test.ts
5:	it('exports the showcase surface', () => {
6:		expect(Object.keys(entry).sort()).toStrictEqual(['SHOWCASE_COPY', 'Showcase'])
$ grep -n "describe(\|it(" tests/app/browser/integration.test.ts
63:describe('journey', () => {
64:	it('arrives at the showcase through its named region', async () => {
76:	it('switches the announced and painted mode through the control', async () => {
95:	it('reaches and operates the mode control through the keyboard', async () => {
108:describe('refusal', () => {
109:	it('reports the absent sign-in control with the absence voice', () => {
117:describe('matrix', () => {
118:	it('reads the settled background at every declared mode and viewport', async () => {
143:	it('reads the mounted class and style populations with their published controls', () => {
170:describe('portfolio', () => {
171:	it('expands unique filenames and places every registered state from a journey', () => {
189:	it('proves every declared family and declares every proven family', () => {
$ sed -n '26,36p' tests/app/browser/integration.test.ts
const VARIANT = inject('variant')
const VARIANTS = inject('variants')
const CAPTURE = inject('capture')
const FAMILIES = Object.freeze(['journey', 'refusal', 'matrix', ...(CAPTURE ? ['capture'] : [])])
const PROVEN = new Set<string>()
const STATES = Object.freeze(['home', 'home-dark'])
const PLACED = new Set<string>()
const PORTFOLIO = createPortfolio({ states: STATES, variants: VARIANTS, variant: VARIANT,
  directory: '../../../tmp/capture/states', enabled: CAPTURE })
$ grep -n "^export " tests/setup.ts
4:export const TOKEN_PREFIX = '--vn-'
20:export function collectTokenNodes(
46:export function normalizeSelectorText(selector: string): string {
$ grep -n "^export " tests/setupBrowser.ts
27:export async function mountShowcase(): Promise<{
51:export async function recordListeners(
78:export async function applyTheme(variant: string): Promise<void> {
123:export class SpecimenManager {
216:export function readPaintedColor(
284:export function readCascadeSheet(
377:export function collectLayer(
$ grep -n "describe(\|it(" tests/distribution.test.ts | sed -n '1,12p'
833:describe('distribution classifiers', () => {
910:describe('installed package consumer', () => {
911:	it('loads standalone styles with the declared cascade order [requires the registry]', ...
939:	it('packs one archive and installs it in isolation [requires the registry]', ...
946:	it('ships every relative target its exports map names [requires the registry]', ...
1002:	it('refuses a subpath its exports map does not name [requires the registry]', ...
1015:	it('compiles a consumer under every module resolution [requires the registry]', ...
1044:	describe(`installed entry ${entry.subpath}`, () => {
$ grep -n -A4 "^export interface OracleStep\b" tests/setupConformance.ts
53:export interface OracleStep {
54-	readonly name: string
55-	readonly before: OracleReading
56-	readonly after: OracleReading
$ head -c 400 tests/fixtures/oracle/button.json
{ "version": "5.3.8", "component": "btn", "steps": [ { "name": "button.initial", "before": {
  "events": [], "classes": ["btn", "btn-primary"], "attributes": { "type": "button", "class":
  "btn btn-primary", "data-bs-toggle": "button" }, "mutations": [], "clicks": [],
  "accessibility": "- button \"Toggle\"", "identity": { ... } }, "after": { ... } }, ...
```

RE-TAKEN AT LAUNCH (the dispatch message states each): the HEAD sha (the U7b landing commit); the
`src/browser/index.ts` export list after U7b (`Button`, `Delegate`, `BUTTON_TOGGLE`,
`BUTTON_SELECTOR`, `BUTTON_ACTIVE`, the guards, `emitEvent`, `bindEventMap`, beside `ColorMode`);
the `### Deferred selectors` rows under `guides/veneer.md` § Styles after U7a; the installed
`@orkestrel/test` version after the Test-paint tarball (`node_modules/@orkestrel/test/package.json`).

**Law.** `AGENTS.md`; `.claude/rules/application.md`, `browser.md`, `tests.md` (§ Browser tests,
§ Cross-cutting proofs, § Shared test infrastructure, § Expensive proofs), `names.md`,
`architecture.md` (§ Entity subfolders: a family opens in a lowercase plural folder when the second
member lands, and this unit opens `sections/` because the section is a sibling of the shell's
existing per-region behaviour that `Showcase` composes), `typescript.md`, `styles.md` (for any
shell layout the grid needs), `documentation.md`, `writing.md`; skill: none; guide:
`guides/veneer.md` (§ Browser, § Styles, § Compatibility as U7a and U7b left them; you edit none of
it, U7e owns the guide). The design that fixes this unit:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7-design-verdict.md` (questions 6 and 7,
§ The chain, § The user's correction), `units/u7-design-planner-report.md` § 6, and
`units/u7-design-analyst-report.md` (the journeys and captures; its `mount()` proposal is refused,
its capture-staging and failure-safe-teardown requirements stand). The plan's scope for this unit is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md` § U7 Button, the Journeys and
Consumers items, and § Close each component on browser evidence.

**Installed primitives.** `@orkestrel/test` (read
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` first): `mount`, `build`,
`clickAccessible`, `clickAccessibleWithin`, `resolveAccessible`, `traverseAccessible`,
`pressKeys`, `readStates`, `readRefusal`, `waitForState`, `waitForAnimations`, `readRing`,
`readContrast`, `buildContrast`, `hoverAccessible`, `holdAccessible`, `releasePointer`,
`stageMedia`, `releaseMedia`, `createPortfolio`, `expandCaptures`, `captureFrame`,
`createJournal`, `readPage`, `readPerception`, `describeFocus`, `describeTree`, `parseColor`,
`readLayers`, `readPixels`. `@orkestrel/contract` (devDependency; read
`node_modules/@orkestrel/contract/dist/src/index.d.ts`) for any guard a helper needs. A helper,
guard, wait, recorder, or deferred whose job an installed export does is a defect; the audit's
checker probes every helper name in the diff against those declaration files.

**Host.** Windows 11; the Bash tool runs Git Bash; `npm run <script>` resolves; Playwright's
managed Chromium and the `msedge` channel launch (`PLAYWRIGHT_CHANNEL=msedge` selects Edge). No
network is needed. Write instruments under `tmp/u7c/`; runtime probes go under `tmp/probe/`.

**Measurements.** `npm run test:app:browser` at the baseline is green on managed Chromium with the
families `journey`, `refusal`, `matrix`, and (under `CAPTURE`) `capture` (re-taken at launch; the
dispatch message states the count and the wall time). The capture run is selected by the
`capture` injection (`configs/src/vite.browser.config.ts` and `tests/setupBrowser.ts` own the
injection; read them). The oracle fixture's steps and the `ORACLE_BINDINGS` table in
`tests/setupConformance.ts` fix which official steps have a Veneer counterpart.

**Control identifiers.** `PLANT-RED`: a journey asserting a state the surface does not reach; its
journal and tree artifacts must be retained under `tmp/capture/` while the run is red; restore.
`PLANT-PLACE`: remove one `PLACED.add(...)` from a journey; the placement proof must red; restore.
`PLANT-PROJECT`: swap the mutation order inside the projection helper; the oracle comparison must
red; restore. Name every test for what it proves, never for a control.

**Standing conditions.** `tmp/` is untracked and dirty; leave it. The `[requires the registry]`
distribution cases skip when the registry stage is absent and run from the packed archive when
present; the stage's setup owns that, and you add a case to it rather than a second stage. A
whole-suite timing failure under your own exec is an observation, not a criterion (the
Orchestrator re-runs it alone). The `prove` tool is not on your allowlist; record each red run with
its command and its failing count instead.

## Unknowns

- The exact refusal sentence a disabled `data-bs-toggle` host produces under `Delegate` and the
  sentence `readRefusal` reads for a native `disabled` button: read both from the installed
  module and from U7b's `src/browser/constants.ts` at run time, and report the strings you
  asserted against.
- Whether the `oklch()` foregrounds the calibrated tokens paint resolve through `readContrast`
  after the Test-paint tarball: run the contrast journey first; if a reading refuses, stop with the
  reading and the exact command (the Orchestrator owns the Test dependency).

## Scope

**Owned.** `app/browser/types.ts` (`SectionInterface`), `app/browser/constants.ts` (the Button
specimen table and copy), `app/browser/sections/ButtonSection.ts` (new),
`app/browser/sections/index.ts` (new, star exports), `app/browser/Showcase.ts`,
`app/browser/main.ts`, `app/browser/index.ts`, `app/browser/styles/_shell.scss` and
`index.scss` (grid layout only); `tests/app/browser/Showcase.test.ts`,
`tests/app/browser/sections/ButtonSection.test.ts` (new), `tests/app/browser/index.test.ts`,
`tests/app/browser/integration.test.ts`; `tests/setup.ts` (the projection helper) and
`tests/setup.test.ts`; `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` (only where
`mountShowcase` must expose the section); `tests/distribution.test.ts` (the consumer case);
`u7c-report.md`.

**Shared (report-only).** None; no other unit is live in this checkout.

**Off-limits.** `src/**`, `guides/**`, `README.md`, `package.json`, `package-lock.json`, every
`configs/**` file, `tests/setupConformance.ts`, `tests/conformance.test.ts`,
`tests/setupStyles.ts`, `tests/setupListeners.ts`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/fixtures/**`, every vendored path under `.claude/`, `.agents/`,
`.codex/`, and `.cursor/`. A guide sentence this unit's mechanism changes is a bound you record
in the report for U7e, never an edit.

**What asserts the state this change ends.** `tests/app/browser/index.test.ts` (the export set
gains `ButtonSection`, `SectionInterface` is a type, and the specimen constant); `tests/app/browser/Showcase.test.ts`
(the shell's nodes and listeners at destruction); `tests/app/browser/integration.test.ts` (the
`STATES` set, the families, the placement and filename proofs); `tests/setup.test.ts` (the
projection helper); `tests/distribution.test.ts` (the consumer case). Bound: a word-boundary
sweep over `SHOWCASE_COPY`, `STATES`, `PLACED`, and `mountShowcase` across `tests/**` and
`app/**`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No installs, no commits, no
`git add`, no tree-wide mutating command. `git diff` and `git status --porcelain` for evidence.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

Types first, then constants, then the section and the shell, then the projection helper, then the
journeys, then the consumer case; run `npm run check:app:browser` and `npm run test:app:browser`
after each item.

1. **Types.** `SectionInterface { readonly host: HTMLElement; destroy(): void }` in
   `app/browser/types.ts`, doc-blocked; `ShowcaseInterface` unchanged.
2. **Specimens.** In `app/browser/constants.ts`, one frozen specimen table the section renders
   from: every variant U7a ships (the solid and outline variants, `btn-link`), the sizes, the
   hosts (`button`, anchor with `role="button"`), and the states that are markup (`disabled`,
   `aria-disabled="true"` on the anchor, `active`). Each specimen carries its accessible name;
   the oracle specimens carry the oracle fixture's names verbatim (`Toggle` and the others the
   fixture's `accessibility` lines read) and `data-bs-toggle="button"`; no host carries both
   `data-bs-toggle` and an engine the section constructs.
3. **`ButtonSection`.** `app/browser/sections/ButtonSection.ts`, `implements SectionInterface`:
   `constructor(host: HTMLElement)` renders the variant grid and the oracle specimens into a
   `section` with an accessible name from the copy, constructs `new Button(host)` for every
   specimen without `data-bs-toggle`, binds nothing on the `data-bs-toggle` hosts (the entry's
   `Delegate` drives them), and appends to `host`; `destroy()` destroys its engines in
   construction order, then removes the section. No `mount()`; a constructed section is a
   mounted section (design ruling, U1-conform bound 13 refused).
4. **The shell and the entry.** `Showcase` holds `readonly #sections: readonly SectionInterface[]`
   constructed in `#mount` after the region, and `destroy()` destroys them in order before removing
   the nodes. `main.ts` keeps `void new Showcase(document.body)` and adds
   `void new Delegate()` beside it, each with the entry comment's reason; the entry imports
   `Delegate` from `@src/browser`. `app/browser/index.ts` exports `./sections/index.js`.
5. **The projection.** In `tests/setup.ts`, one exported helper that reads a host into the
   comparable projection the planner fixed: ordered classes, `aria-pressed`, ordered attribute
   mutations, click cancellation, focused accessible name, and refusal — never `identity` or
   `events`; and one exported helper that reduces an `OracleReading` to the same shape. Type the
   shape in the same file's `interface` declarations (a tests-only type stays in the setup file
   per `tests.md` § Shared test infrastructure). Prove both in `tests/setup.test.ts` with fixture
   readings, including a reading whose mutation order is reversed.
6. **The journeys.** In `tests/app/browser/integration.test.ts`, on the `journey` family, driving
   the mounted showcase's Button section:
   - click toggling of a `data-bs-toggle` specimen through `clickAccessible` on a child element
     (the label text node's span), read through `readStates` and `waitForState` (`aria-pressed`
     and the `active` class through the rendered surface), the default prevented on the click;
   - keyboard toggling through `traverseAccessible` and `pressKeys` (Space and Enter) on a
     native host and on an anchor host;
   - a native `disabled` specimen and an `aria-disabled` anchor refused through `readRefusal`
     against the exact sentence;
   - a covered specimen refused through the exact covered voice, uncovered through the
     interface, then activated;
   - the focus ring through `readRing` after real focus, per variant;
   - contrast per variant and per state through `readContrast` with `buildContrast` as its
     control, the variant naming the theme (`applyTheme`);
   - hover through `hoverAccessible` and active through `holdAccessible` and `releasePointer`,
     each read while held;
   - reduced motion through `stageMedia` and `releaseMedia` around the feedback transition;
   - the oracle comparison: for every step `ORACLE_BINDINGS` binds, drive the same markup with the
     same action and compare the projection of the live host to the projection of the fixture's
     `after` reading; report an excluded step as skipped by name.
   No statechart table. `STATES` gains every Button capture state (`button-{variant}-{state}` for
   rest, pressed, disabled, outline, focus, hover, active, and their dark twins), each placed from
   the journey that reaches it; `PLACED` equals `STATES`; the filename and placement proofs and the
   capture-run membership proof stay always-on. Capture from the state the journey verified: a
   hover or active frame is captured before the pointer is released, a focus frame while focus
   is held, and the theme read before the frame.
7. **The consumer case.** In `tests/distribution.test.ts`, inside the installed-consumer stage's
   entry walk, one case that imports `Button` and `Delegate` from the installed `./browser`
   entry, constructs a `Delegate` over a detached root, toggles a `data-bs-toggle` host through
   a dispatched click, reads `aria-pressed`, and destroys it; the case runs under the same
   `[requires the registry]` guard as its siblings.
8. **Controls.** Run `PLANT-RED`, `PLANT-PLACE`, and `PLANT-PROJECT`, record each red reading
   with its command and failing count, and restore each with a byte comparison against the
   committed file (`git diff --stat -- <file>` empty).
9. **Gates.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`,
   `npm run test:setup`, `npm run test:app:browser`, `CAPTURE=1 npm run test:app:browser` (or the
   capture selection the config names; read it), `PLAYWRIGHT_CHANNEL=msedge npm run
   test:app:browser`, `npm run test:distribution`; record each command's final lines.

## Output

Write `u7c-report.md` in the Veneer checkout and return its content as your final
message: the diff per owned file; the specimen table as rendered; the projection shape; each
journey's reading (the strings and values asserted); the `STATES` list and the capture paths a
capture run wrote; each control's red reading and restore proof; each gate's final lines on both
engines; the guide bounds for U7e; deviations in the shape § Deviation contract names.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Stop and report (expected, found, exact
evidence, done or not done, one hypothesis) on: a gate red after your own fix inside owned files;
a need to edit an off-limits file; a paint reader that refuses a calibrated colour; a
`data-bs-toggle` specimen the `Delegate` does not drive from the entry. Decide, record, and carry
on from: the grid's markup and layout, the copy's wording, specimen order, the projection helper's
names within the prefix table, doc-block wording, capture state names within the
`button-{variant}-{state}` form.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npm run lint:check` and `npm run format:check` exit 0.
3. `tests/app/browser/index.test.ts` asserts the export set with `ButtonSection` and the
   specimen constant, and passes.
4. `tests/setup.test.ts` proves the projection helpers, including the reversed-order reading,
   and passes.
5. Every journey in item 6 passes on managed Chromium and on Edge; `PLACED` equals `STATES`; a
   capture run writes one frame per state per variant and the membership proof passes.
6. The oracle comparison passes over every bound step and names each excluded step.
7. The consumer case in item 7 passes from the packed archive.
8. The three controls reddened and are restored byte-for-byte.
9. `git status --porcelain` shows only the owned files and the report; `src/**`, `guides/**`,
   and `package.json` are untouched.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the capture paths and
the retained journal of the `PLANT-RED` run (copied under `tmp/u7c/` before restoring).
