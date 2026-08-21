# Design round 2: the comprehensive `@orkestrel/test` 0.0.8 surface

## Role and engine

This brief goes independently to the subjective lane (`planner`, Opus 5) and the objective lane
(`analyst`, GPT-5.6 Sol). Each lane works blind to the other. Read-only; propose, never edit;
spawn nothing.

## Objective

Rule on the adoption of supervisor's shareable test helpers into `@orkestrel/test`, and on the
`waitForCondition` addition, so implementation units can dispatch. Every adopted helper ends with
an exact name, signature, placement, test plan, and guide obligation; every excluded helper ends
with the sentence that excludes it.

## User ruling, authoritative

Pull into `@orkestrel/test` every helper from supervisor's setup modules whose logic is not
specific to that package or application. Do not gate on consumer count — the user has ruled the
adoption in. Exclusion grounds that remain valid: the logic encodes supervisor domain knowledge,
or adoption would require a new npm dependency (forbidden without explicit user authorization).

## Context

- Inventory with classifications, overlaps, and file:line pointers:
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/absorb-supervisor.log` — read it in full.
- The adopting package: `C:/Users/mikes/WebstormProjects/test` (0.0.7, zero runtime dependencies,
  devDependencies WITHOUT Vue; `vitest` is a peerDependency; browser tests run under
  `@vitest/browser-playwright`).
- Authority: `AGENTS.md`, `.claude/rules/names.md` (single-word entity APIs, `{verb}{Noun}`
  helpers, no domain prefixes), `.claude/rules/typescript.md`, `.claude/rules/architecture.md`
  (placement by kind and environment), `.claude/rules/patterns.md`, `.claude/rules/tests.md`
  (performance.now for elapsed intervals; a bounded wait fails with the condition's description;
  no silent non-rejecting waits), `.claude/rules/documentation.md`, `.claude/rules/writing.md`.
  Guide: `test/guides/test.md`. Skill: none.
- An existing accepted plan: `C:/Users/mikes/WebstormProjects/test/.orkestrel/test/wait-for-condition-plan.md`
  — read it; it fixes `performance.now`, poses the sync-vs-async condition question, the
  throw-or-return question, and core placement. `scaffold/ROADMAP.md` carries the matching row
  ("test: publish waitForCondition") with the same shape. The user's comprehensive-bump
  instruction schedules it now.
- Wave-A design round 1 (running separately) already owns `createScratch().link` on Windows; do
  NOT redesign it here. If a helper you adopt interacts with scratch (the destroy-retry), state
  the interaction as a dependency on that round's outcome.

## Subjects

### D. Which helpers adopt, as what, where

Work family by family. For each family: the adopted export names and signatures (rules-conformant
— supervisor's `Application*`/`Provider*` prefixes are domain residue and must generalize), the
environment placement (core / server / browser, by what the helper touches), the kind file
(helpers/factories/types/constants), consolidation with test's existing exports (one general form
per concept — never two near-duplicates), the test plan, and the guide section.

Families, from the inventory:

1. **Wait/retry**: `waitForEvent`, `waitForRecorder` (currently a silent non-rejecting poll —
   redesign against the tests.md law), `waitForSocketClose`, `retryUntil` (attempt-bounded),
   supervisor's `Date.now`-budget waiters (`waitForApplicationStderr`, `waitForApplicationProcess`,
   `waitForApplicationResponse`, `destroyApplicationScratch`'s retry) — rule which generalize,
   which collapse into `waitForCondition` call sites instead of surviving as exports, and whether
   attempt-bounded and time-bounded retry are one concept or two.
2. **Process (server)**: `hasProcess`, `stopApplicationProcess` (SIGTERM-then-SIGKILL),
   `spawnApplicationCommand` (spawn with a cleaned environment), `parseProviderFrames` (JSON
   Lines), the generic process/exit interfaces. Check overlap with `@orkestrel/process` — test
   must not duplicate a capability that package publishes (read its installed declarations under
   supervisor's node_modules if needed).
3. **Accessibility resolution (browser)**: `IMPLICIT_ROLES`/`IMPLICIT_HEADERS`/`IMPLICIT_FIELDS`/
   `CONTENT_ROLES`/`FOCUSABLE`, `isRendered`, `collapseText`, `resolveRole`/`resolveName`/
   `resolveStates`, `describeTree`/`describeFocus`/`describeSurface` — against test's existing
   `resolveAccessible`/`clickAccessible`/`fillAccessible`/`ACCESSIBLE_ROLES`. One coherent layer,
   not two vocabularies.
4. **Visual measurement (browser)**: the `Tint` family (`parseTint`, `blendTint`, `readBackdrop`,
   `measureLuminance`, `measureContrast`, `readContrast`, `readFocus`, `readRing`) against test's
   existing `contrast()`. The inventory notes semantic differences (composite onto white vs throw
   on unpainted background).
5. **Pane and capture (browser)**: `stagePane`/`releasePane`/`captureFrame` against test's
   `createPortfolio`.
6. **DOM querying and interaction (browser)**: `findControl`/`findLabelled`/`findField`/
   `findRow`/`findText`, `pressControl`/`pressLabelled`/`fillField`/`pressRow`, `buildElement`
   vs `render`, `recordArrival`/`driveArrival`, `extractControls`, `extractOrphans` (rule whether
   Bootstrap-class detection is framework policy that stays out), `clearBrowserStorage`.
7. **Journal/step recorder (browser)**: `Step`/`Channels`/`Journal` — a console+step recorder;
   against test's `createRecorder`.
8. **HTTP fixtures (server/core)**: `ApplicationCookieJar` (a fetch `Set-Cookie` jar).
9. **Vue-coupled**: `mountComponent`, `createContextApp`, `waitForBrowserState` (Vue `watch`).
   test carries no Vue dependency and none may be added without explicit user authorization.
   Rule each: exclude, or redesign framework-free with the mechanism named.
10. **Scratch destroy retry**: `destroyApplicationScratch`'s bounded retry over
    `ScratchInterface.destroy` — rule whether `destroy` itself gains the bounded retry (it
    already routes through `removeTree`'s synchronous `EPERM` retry), a new helper adopts it, or
    it collapses into a `waitForCondition` call site.

### E. `waitForCondition`

Close the plan's open questions with a ruling: exact signature (sync vs async condition), throw
behaviour and message shape (label parameter?), defaults, core placement, its relation to
`waitForDelay` and to `retryUntil`, tests, and the guide section. The plan document is the
starting point, not the boundary — improve it where the rules demand.

## Constraints

- Types first: every adopted export's contract lands in the owning `types.ts` before
  implementation. Name which types.ts each touches.
- test's package surface is import-only for browser (`./browser` ESM); server is ESM+CJS; core is
  ESM+CJS. Placement must respect what each environment may import.
- No new dependency, no Vue, no vitest-runtime import in core.
- Naming: no `Application`, `Provider`, `Supervisor` residue; single-word members on any
  interface; `{verb}{Noun}` module helpers; constants UPPER_SNAKE_CASE.
- Supervisor keeps working: the adoption does not edit supervisor in this campaign, so nothing
  adopted may be shaped so supervisor could not later re-pin and delete its locals.

## Output

Exactly: `Design` (per family: adopt/exclude table with names, signatures, placement), 
`Alternatives`, `Units` (bounded, role AND engine, ownership, dependencies, acceptance criteria
— split by environment so writers can serialize sensibly), `Tensions`, `Risks`. Number every
claim about existing code with file:line.

## Deviation contract

Read-only design unit. Report file/line mismatches as findings and continue.
