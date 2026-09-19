# Unit T1 — the journey layer's waits, refusal reader, storage fixture, census, and controls

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/test` checkout. You open this brief
yourself; every later section is written for you.

Routing note, recorded for the ledger: this unit's proofs run in Playwright Chromium, and the Codex
bench cannot launch a browser, so the objective route cannot run its own tests. The audit round
that follows runs its objective lane on the Codex bench.

## Objective

Publish, document, and prove in `@orkestrel/test` the mechanisms the design round admitted for the
journey layer — a text wait, a keyboard verb, an announced-state wait, an animation wait, a refusal
reader, an inert `Storage` fixture, a class census, and the three control builders — plus the
`JourneyVariant` split, the shadow-tree boundary on `isRendered` and `isReachable`, and the two
guide Contract rules the design found stale. The statechart harness is unit T2's and is not yours.

## Context

**Evidence.** Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/design-verdict.md` first: it
is the design authority for this unit, and rulings D1, D2, D6–D16 are yours. The two lane reports it
reconciles sit beside it (`design-planner-report-2.md`, `design-analyst-report-2.md`), and the
consumer evidence is `g1-distillate.md`, whose instrument table names the roughnotes site each
export replaces.

Measured directly by the Orchestrator:

- `test/package.json` declares `@orkestrel/contract@^0.0.17` under `dependencies`;
  `src/core/helpers.ts:1,22`, `src/core/validators.ts:2`, `src/server/factories.ts:8`, and
  `src/server/helpers.ts:28` import it at runtime. `guides/test.md:1143` (Contract rule 9) still
  says `dependencies` is empty; rule 10 and rule 13 repeat "zero-dependency" phrasing; the Limits row
  `An outcome triple` (`guides/test.md:1388`) records the adoption. Rule 9's second half — no
  exported signature names an `@orkestrel/*` type — stays true and stays.
- No file under `src/browser/` imports `@src/core` today (grep). The build already externalizes
  it: `vite.config.ts:137-141` (`external: id === '@src/core' || id.startsWith('@orkestrel/') …`,
  `paths: { '@src/core': '../core/index.js' }`) and `configs/helpers.ts:618`
  (`rewriteCoreSpecifier`) rewrite core specifiers in the roll-up to the package name. Five fleet
  packages' `src/browser` already import `@src/core` under the same generated
  `configs/src/tsconfig.browser.json` (`console`, `database`, `mcp`, `router`, `workflow`), so the
  scoped typecheck admits it; `tsc` follows imports past `include`.
- `waitForCondition`'s timeout voice (`src/core/helpers.ts:179-181`):
  `Condition "<description>" did not hold within <budget>ms (waited <elapsed>ms)`. It propagates a
  condition's throw unchanged; `retryUntil` counts a producer throw as unsatisfied.
- `createPortfolio` (`src/browser/factories.ts:106-171`) returns an object literal with getters
  handing out snapshots; no class is exported, and `tests/guides.test.ts:40` keeps
  `INTERNAL: readonly string[]` for names the guide need not document.
- `tests/src/browser/helpers.test.ts` already builds fixtures with `buildFixture('<details>…')`
  (lines 126, 415, 705, 713) and an open and a closed shadow root (`host.attachShadow({ mode })`,
  line 544) — reuse those doors.
- `readStates` (`src/browser/helpers.ts:770`) reads a native disclosure's expansion from the
  parent `details` element's `open`; `isReachable` (`:58`) demands `tabIndex >= 0`; `isRendered`
  (`:96`) reads no geometry.
- Consumer sites the exports replace (all under `C:/Users/mikes/WebstormProjects/roughnotes/tests/app/browser/`):
  `integration.test.ts:208` (`waitForText`), `setup.ts:637` (`readRefusal`), `setup.ts:723-731`
  (`readMenuSettled` polling Bootstrap classes), `setup.ts:354,373` (`isRunning`, `readSettled`),
  `setup.ts:448,535` (`QuotaStorage`, `PermissionStorage`), `setup.ts:910` (`readCensus`),
  `setup.ts:842` (`buildCompositeStack`), `setup.ts:943` (`buildEscapeFixtures`),
  `setup.ts:802` and `integration.test.ts:167-168` (`buildMarkControl`, the two undeclared tokens).
  Read them for the semantics a real consumer needs; copy nothing.

**Law.** `AGENTS.md`; `.claude/rules/names.md`, `.claude/rules/typescript.md`,
`.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`,
`.claude/rules/browser.md`, `.claude/rules/documentation.md`, `.claude/rules/quality.md`
§ Instruments, `.claude/rules/writing.md` — all in the test checkout, which vendors them. Skill:
none. Guide: `guides/test.md` in the test checkout, whose § Contract, § Voices, § Limits, and
§ Patterns are the parity surface `tests/guides.test.ts` gates.

**Installed primitives.** `@orkestrel/test` itself (`guides/test.md` § Surface — reuse
`waitForCondition`, `retryUntil`, `readStates`, `resolveRendered`, `readClasses`, `readCascade`,
`build`, `parseColor`, `blendColor`, `measureContrast` rather than re-deriving any of them) and
`@orkestrel/contract` 0.0.17 (`C:/Users/mikes/WebstormProjects/scaffold/guides/contract.md` § Surface
— its `Result`, guards, and `attempt`). A helper whose job an installed export does is a defect. The
checker probes the diff for such names.

**Host.** Windows 11; run commands through Bash (Git Bash). Working path
`C:/Users/mikes/WebstormProjects/test`. Playwright Chromium is installed. No sandbox; network is
available but nothing here needs it. Write every multi-line program to a file and run the file —
a heredoc or a `node -e` carrying `${…}` trips the shell classifier.

**Measurements.** The checkout is clean at `abedca2` (`git status --short` empty). `npm test`
runs `test:src` (core, browser, server), `test:policy`, `test:config`, `test:setup`, and
`test:guides`; the `distribution` project is outside it. `npm run check` runs the root project and
the three scoped `configs/src/tsconfig.*.json` projects.

**Control identifiers.** `T1-C1` through `T1-C11` below. Name each test for what it proves, never
for the control label.

**Standing conditions.** None known to fail. Do not run `npm run test:distribution`. Do not touch
the vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`) or
`package.json`.

## Unknowns

- **Whether `element.getAnimations({ subtree: true })` reports a CSS transition on a descendant
  before its first frame under the installed Chromium.** Probe it in `tmp/probe/` before writing
  `waitForAnimations`, and record what the probe showed in the report.
- **Whether a `details` element's `toggle` under `clickDisclosure` settles synchronously enough that
  `waitForState` needs a real transition to be exercised.** Build the `waitForState` proof on a
  control whose state changes after a delay you control (a button flipping `aria-pressed` on a
  timer), so the poll goes false-to-true after the act.
- **The exact TSDoc sentence for the shadow-tree boundary on each predicate.** Derive it from a
  probe over an open and a closed shadow root; the report states what each predicate returned.

## Scope

**Owned.** `src/core/types.ts`, `src/core/helpers.ts`, `src/browser/types.ts`,
`src/browser/helpers.ts`, `src/browser/factories.ts`, `src/browser/constants.ts` (only if a voice
or a default constant is needed), `tests/src/core/helpers.test.ts`, `tests/src/browser/helpers.test.ts`,
`tests/src/browser/factories.test.ts`, `tests/setupBrowser.ts` and `tests/setup.ts` (shared
fixtures, per `.claude/rules/tests.md` § Shared test infrastructure), `tests/guides.test.ts`
(`INTERNAL`, fence transcriptions), `guides/test.md`, `README.md`.

**Shared (report-only).** None; you are the only writer in this checkout.

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`, `package.json`, `package-lock.json`, `vite.config.ts`, `configs/**`,
`tsconfig.json`, `.claude/**`, `.agents/**`, anything under `src/server/`, and `src/core/constants.ts`
(the statechart docs there are T2's).

**What asserts the state this change ends.** `tests/guides.test.ts` (Surface bijection: every
new export needs a Surface row; every fence import must resolve; the `INTERNAL` list), the guide's
Contract rules 9, 10, and 13, and the browser `index.ts` barrel export order the policy `surface`
rule reads. Derive the full set by running `npm run test:guides` and `npm run test:policy` after
the barrel lands.

**Tools and limits.** All of your tools. No commit, no push, no install, no `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`. Run `npm run format` and `npm run lint`
only on your own files' behalf and before the checks, never as a tree-wide gate run beside another
unit (there is none).

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## The contracts

Land these in `types.ts` first (TTTDD), then implement, then prove. Keep the names; write the TSDoc
in the package's voice (read three existing doc blocks before writing one).

```ts
// src/core/types.ts
/** Represents one theme-and-viewport pair in the form a project configuration can serialize. */
export interface JourneyVariant {
	readonly name: string
	readonly width: number
	readonly height: number
}

/** Configures a bounded wait over a reading of text. */
export interface TextWaitOptions extends WaitOptions {
	/** Determines whether the reading must equal the text rather than contain it. */
	readonly exact?: boolean
	/** Holds a sentence the reading must no longer carry when the wait resolves. */
	readonly absent?: string
}
```

```ts
// src/core/helpers.ts
export function waitForText(
	description: string,
	read: () => string,
	text: string,
	options?: TextWaitOptions,
): Promise<string>
```

Semantics: reuses `waitForCondition` (its bound validation, its timeout voice, its abort-reason
identity); a reader throw propagates unchanged; returns the reading that satisfied the poll;
refuses an empty `text` with `Text expectation must not be empty`; `absent` refuses the same way
when empty.

```ts
// src/browser/types.ts
/** Adds to a journey variant the document change a capture run applies before resizing. */
export interface CaptureVariant extends JourneyVariant {
	readonly apply?: () => void
}

/** Configures a bounded wait over the states a control announces. */
export interface StateOptions extends WaitOptions {
	/** Determines the direction: `true` waits until the state is gone, `false` until it appears. */
	readonly absent?: boolean
}

/** Configures an inert `Storage`: its seed, which operations the host permits, and its quota. */
export interface StorageOptions {
	readonly values?: Readonly<Record<string, string>>
	readonly reads?: boolean
	readonly writes?: boolean
	readonly quota?: number
}

/** Holds a store the host can withhold and later grant. */
export interface StorageInterface extends Storage {
	permit(): void
}

/** Reports an authored-class census: the population walked, the tokens found, the undeclared. */
export interface CensusReading {
	readonly elements: number
	readonly tokens: readonly string[]
	readonly undeclared: readonly string[]
}

/** Holds a detached translucent stack whose flat and composited readings disagree across one bar. */
export interface ContrastFixture {
	readonly root: HTMLElement
	readonly refused: HTMLElement
	readonly accepted: HTMLElement
}

/** Holds detached markup a style-escape reading must find, and the one it must leave alone. */
export interface EscapeFixture {
	readonly root: HTMLElement
	readonly inline: HTMLElement
	readonly embedded: HTMLElement
	readonly permitted: HTMLElement
}

/** Holds detached markup an authored-class census must report as undeclared. */
export interface CensusFixture {
	readonly root: HTMLElement
	readonly token: string
	readonly mark: string
}
```

```ts
// src/browser/helpers.ts
export function pressKeys(keys: string): Promise<void>
export function waitForState(name: string, state: string, options?: StateOptions): Promise<readonly string[]>
export function waitForState(role: string, name: string, state: string, options?: StateOptions): Promise<readonly string[]>
export function waitForAnimations(element: Element, options?: WaitOptions): Promise<void>
export function readRefusal(name: string): string | undefined
export function readRefusal(role: string, name: string): string | undefined
export function readCensus(root: ParentNode): CensusReading
```

```ts
// src/browser/factories.ts
export function createStorage(options?: StorageOptions): StorageInterface
export function buildContrast(bar: number): ContrastFixture
export function buildEscapes(permitted: string): EscapeFixture
export function buildCensus(): CensusFixture
```

Semantics, one line each; the verdict's rulings D6–D13 carry the rest:

- `pressKeys` sends through `userEvent.keyboard` to the focused element and refuses when
  `document.activeElement` is `null` or the body: `Key sequence "<keys>" was sent with nothing focused`.
- `waitForState` resolves the control afresh on every reading through `resolveRendered`, reads
  `readStates`, resolves with the states read; the resolver's own voices propagate; the timeout
  description reads `"<name>" to announce "<state>"` (or `stop announcing`), and the thrown message
  carries the last states observed.
- `waitForAnimations` awaits every finite animation `element.getAnimations({ subtree: true })`
  reports, excludes an animation whose effect declares infinite iterations, re-reads after each
  completion or cancellation, refuses a disconnected subject with `Animation subject is not
  connected`, and times out through the wait family naming the subject (`readRole` and `readName`)
  and the still-running animations. Parks on `animation.finished` rather than polling; the
  interval option is validated and unused, as `waitForEvent` documents.
- `readRefusal` drives `resolveRendered` inside `captureError`, returns the `Error` message,
  `undefined` on success, and rethrows anything that is not an `Error`.
- `createStorage` is backed by its own `Map` seeded from `values`; `reads` and `writes` default
  `true`; a withheld operation throws `new DOMException('Access is denied for <detail>', 'SecurityError')`
  where `<detail>` names the operation and key; `length`, `key`, and `getItem` are reads; `clear`,
  `removeItem`, and `setItem` are writes; `quota` counts accepted `setItem` calls and exhaustion
  throws `new DOMException('No room is left for <key>', 'QuotaExceededError')`; `removeItem` never
  consumes quota; `permit()` lifts both permission refusals and never replenishes quota; a
  non-integer or negative quota is refused with `Storage quota must be a non-negative integer`.
  Patches nothing, dispatches no `storage` event.
- `readCensus` walks `root` (the root itself when it is an element, then descendants) through
  `readClasses` against `readCascade`, reports `elements`, sorted `tokens`, sorted `undeclared`,
  and refuses an empty walk with `Class census walked no element`.
- `buildContrast(bar)` returns a detached stack — an opaque floor, a translucent tint, and two
  foregrounds — such that, once the caller appends `root` to the document, `readContrast(refused)`
  reads under `bar` and `readContrast(accepted)` reads at or over it, while a flat reading against
  the first painted background alone disagrees for at least one of them; refuses with
  `Contrast control cannot straddle the bar <bar>` where no such pair exists for the bar.
- `buildEscapes(permitted)` returns a detached root holding an element with an inline `style`
  attribute, an embedded `<style>` element, and a `<style id="<permitted>">` the caller's reading
  exempts.
- `buildCensus()` returns a detached root holding an HTML element carrying one undeclared class
  token and an SVG element carrying another (SVG `className` is not a string, which is the trap).

## The guide

- Contract rule 9: state the verified boundary (D2). Rules 10 and 13: remove the zero-dependency
  phrasing; in rule 13 strike the "no `src/core` import" sentence and keep the no-framework,
  no-`node:*`, no-`import.meta.env` clauses, stating that the browser environment imports core
  through the package's own root export and that the build externalizes it.
- § Surface: one row per new export, in the barrel's order. § Voices: one row per new voice, with
  the thrower. § Limits: one row per candidate the design ruled — the keyboard verb (ships, and why
  it is not a rename), the text wait (ships, and what separates it from `waitForCondition` and
  `retryUntil`), the announced-state wait, the animation wait, the refusal reader against
  `captureError`, the storage fixture, the census, the control builders, and the refusals: a
  stalled-read store, `isPainted`, an ARIA-disclosure settle keyed to a framework's classes.
- § Patterns: a fence per new mechanism that the package's own runtime can run, transcribed and
  executed in `tests/guides.test.ts` where the fence claims a value; a fence naming a browser is
  left to the browser suite, per rule 1.
- `README.md`: the pitch stays the guide's tagline; touch it only where the guide's tagline moves.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/t1-report.md` and return its path as your
final message. The report holds, in this order: the exports landed with file and line; each
control below with the command that ran it and the failing count before and the passing count
after; the probes you ran for the unknowns with what they showed; every gate command you ran with
its exit code and the totals line it printed; what you could not close and why; the claims of
your own you flag as least certain. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — where a contract above cannot be implemented as declared, where a scoped check or a
scoped project cannot go green without touching an off-limits file, or where the guide parity gate
demands a row this brief forbids. Decide, record, and carry on on: the TSDoc wording, the order
of new rows within a section, which existing fixture builder a proof reuses, the exact fixture
markup, and the name of an interned helper no export names.

## Acceptance criteria

1. `npm run check` exits 0.
2. `npm run format:check` and `npm run lint:check` exit 0 (run `npm run lint` then `npm run format`
   first to converge, in that order).
3. `npm run test:src:core` exits 0 and includes the `waitForText` cases: contains, `exact`,
   `absent`, empty-text refusal, reader-throw propagation, timeout voice, abort-reason identity.
4. `npm run test:src:browser` exits 0 and includes, for each export, the cases that pin the
   semantics above, plus these controls, each drawn from outside the population the instrument
   covers and each recorded red before the mechanism admitted it:
   - `T1-C1` `pressKeys` with the body focused refuses with the stated voice; with a button focused
     the key reaches the button.
   - `T1-C2` `waitForState` on a control whose `aria-pressed` flips on a timer resolves after the
     flip and times out naming the last states observed when it never flips; `absent: true`
     resolves on the reverse.
   - `T1-C3` `waitForAnimations` resolves after a finite descendant transition ends, times out
     naming a still-running finite animation, resolves while an infinite-iteration animation still
     runs, and refuses a detached element.
   - `T1-C4` `readRefusal` returns each `resolveRendered` voice for an absent, a hidden, and an
     ambiguous target, `undefined` for a resolving one, and rethrows a planted non-`Error`.
   - `T1-C5` `createStorage`: seeded reads; a withheld read and a withheld write each throw the
     `SecurityError` voice; `permit()` lifts both; quota exhaustion throws the `QuotaExceededError`
     voice on the write after the allowance; `removeItem` does not consume quota; `permit()` does
     not replenish it; an invalid quota is refused; the thrown values are `DOMException` instances
     with the stated `name`.
   - `T1-C6` `readCensus` reports the walked count and the undeclared tokens for a root carrying
     `buildCensus()`'s fixture, refuses an empty root, and reports nothing undeclared for a root
     whose every class the loaded cascade declares.
   - `T1-C7` `buildContrast(bar)`: appended to the document, `readContrast(refused) < bar`,
     `readContrast(accepted) >= bar`, and a flat reading (first painted background, alpha
     ignored) disagrees for at least one; a bar no stack can straddle is refused.
   - `T1-C8` `buildEscapes`: `extractStyles(root)` reports the inline and the embedded escape and
     not the permitted sheet once the caller exempts its id.
   - `T1-C9` `isRendered` and `isReachable` on an element inside an open and a closed shadow root:
     the case pins what each returns, and the TSDoc sentence states it.
   - `T1-C10` `CaptureVariant` still satisfies every existing `createPortfolio` case unchanged;
     `JourneyVariant` resolves from the root entry.
   - `T1-C11` the barrel: every new name resolves from `@orkestrel/test/browser` (or the root entry
     for `waitForText`, `JourneyVariant`, `TextWaitOptions`).
5. `npm run test:guides` exits 0: Surface bijection holds, every added fence's import resolves,
   every executable fence's claimed value is transcribed and asserted, and `INTERNAL` names
   nothing the guide should document.
6. `npm run test:policy` exits 0.
7. `npm run build` exits 0, and `dist/src/browser/index.js` carries `from '../core/index.js'`
   (or the package name) and no inlined body of `waitForCondition` (grep for the timeout voice's
   literal text in that file: it must be absent).

**Observations, not criteria.** The whole `npm test` chain's wall time and result, reported with
your reading; the Orchestrator takes the authoritative run after you exit.

## Review evidence

The audit lane receives `git diff` and `git status --short` of this checkout, taken by the
Orchestrator after you return, plus your report. Where a claim rests on a browser reading, the
proof is the test that pins it; name the test.
