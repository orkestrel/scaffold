# Design round 2 — subjective lane report (planner, Opus 5, native subagent)

Ran on `design-brief-2.md`. Retained unedited. The subagent's transcript file reported zero bytes,
so this copy was written from the returned message by the Orchestrator, with the harness's HTML
escaping of `<` and `>` reversed and nothing else changed. The lane's dispatch-defect finding
(no command tool, so the `git show` reads could not run) is real and was met after this report
returned by extracting those records to `tmp/units/retained/`.

---

I hold the **subjective lane** (`planner`, Opus 5). Report follows the design brief's § Output.

# Ruling summary

- Strike the "no `src/core` import" clause from the test package's Contract rule 13. One self-imposed clause blocks a text wait, an announced-state wait, and the statechart harness, while the root project model sanctions the direction. Remove the clause, not the capabilities.
- Publish the statechart harness as a test-side mechanism in `@orkestrel/test/browser`, and drop the deep-linked application harness page from the skill. A page an app route serves cannot import a devDependency that imports `vitest/browser`, which is why no harness exists anywhere in the fleet.
- Publish an instrument with the negative control that certifies it. `readContrast`, `extractStyles`, and the class census each ship a `build*` fixture, because an instrument whose control cannot fail is not evidence and every workspace owes the same control.
- Ship the journey verbs the consumer hand-rolled: `pressKeys`, `waitForPage`, `waitForState`, `waitForMotion`, `readRefusal`, `createStorage`, `readCensus`. Each carries an invariant, a translation, or a refusal that its parts do not.
- Refuse the role tables, gradient registries, viewport folds, and contrast bars. Those describe one markup and one product's policy.
- Generate the per-variant journey fan-out and a browser-runtime proof for `tests/setupBrowser.ts`. Exclude a browser matrix past Chromium, with the condition that reopens it named.
- Narrow the skill-API sweep to fenced imports, and give the skill's references the fences that give the sweep a population.
- The journey laws bind every family. A matrix reading that navigates with the application's own router proves the router.

# Matrix

| ID  | Surface     | Capability or defect                                                                   | Ruling                | Evidence                                                                                                          | Unit    |
| --- | ----------- | -------------------------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| P1  | Test tools  | Contract rule 9 states `dependencies` is empty and stays empty                          | repair                | `test/guides/test.md:1143`; `test/package.json:85-87`; Limits row `An outcome triple` at `test/guides/test.md:1388` | T1      |
| P2  | Test tools  | Contract rule 13's no-core clause blocks three proposed capabilities                    | repair                | `test/guides/test.md:1201-1206`; `AGENTS.md` § Project model permits browser→core                                   | T1      |
| P3  | Test tools  | Keys-only keyboard verb (ROADMAP 18)                                                    | implement             | `references/layer.md:114-118` carves a `userEvent` exception no other act needs                                    | T2      |
| P4  | Test tools  | Text-convergence wait (ROADMAP 19)                                                      | implement             | `roughnotes/tests/app/browser/integration.test.ts:208`                                                             | T2      |
| P5  | Test tools  | Refusal reader against `captureError` (ROADMAP 20)                                      | implement             | `roughnotes/tests/app/browser/setup.ts:637`; `test/src/core/helpers.ts:424`                                        | T2      |
| P6  | Test tools  | Inert configurable `Storage` for the transport family                                   | implement             | `roughnotes/tests/app/browser/setup.ts:448,535`                                                                    | T2      |
| P7  | Test tools  | Wait for a control's announced state                                                    | implement             | `roughnotes/tests/app/browser/setup.ts:723-731`                                                                    | T2      |
| P8  | Test tools  | Animation-settle wait                                                                   | implement             | `roughnotes/tests/app/browser/setup.ts:354,373`                                                                    | T2      |
| P9  | Test tools  | Census reading that reports its population (verdict R5)                                 | implement             | `roughnotes/.orkestrel/roughnotes/journey-readiness-verdict.md:40`; `test/src/browser/helpers.ts:1563`             | T3      |
| P10 | Test tools  | Composited-contrast negative control (verdict R4)                                       | implement             | `journey-readiness-verdict.md:35`; `roughnotes/tests/app/browser/setup.ts:809-882`                                 | T3      |
| P11 | Test tools  | Style-escape control covering the `<style>` half (verdict R6)                            | implement             | `journey-readiness-verdict.md:43`; `roughnotes/tests/app/browser/setup.ts:925-953`                                | T3      |
| P12 | Test tools  | Census control carrying the SVG `className` trap                                        | implement             | `roughnotes/tests/app/browser/integration.test.ts:167-168`                                                        | T3      |
| P13 | Test tools  | Shadow-tree boundary documented on `readHit` alone (ROADMAP 31)                          | implement             | `test/src/browser/helpers.ts:140-143`; `isRendered` at `:96`, `isReachable` at `:58` carry no such line            | T3      |
| P14 | Test tools  | `readPerception` and `readHit` published and unconsumed                                 | repair by adoption    | `roughnotes/tests/app/browser/integration.test.ts:218` writes `elementFromPoint` inline                            | C1      |
| P15 | Test tools  | `clickDisclosure` covers a native `<summary>` alone (G1 defect 1)                        | retain                | `references/layer.md:102-104`; the gap is the settle, which P7 and P8 close                                        | T2, S3  |
| P16 | Test tools  | Role tables, gradient registries, viewport folds, contrast bars, `isPainted`, `selectRole` | intentionally exclude | G1 distillate rows marked specific, `setup.ts:87-245,390-417`; § Limits refuses one suite's policy                 | C1      |
| P17 | Test tools  | A `Storage` that stalls a read                                                          | intentionally exclude | `Storage` is synchronous; a stall is a property of the application's own async store                               | S3      |
| X1  | Statechart  | No harness exists anywhere in the fleet                                                 | implement             | Orchestrator's fleet grep; `test/tests/src/core/helpers.test.ts:941-1095` drives the runner and mounts nothing     | T4      |
| X2  | Statechart  | Published gate reader polling `STATECHART_ATTRIBUTES.status`                             | intentionally exclude | The harness hands back its own tally; no page consumer exists (§ Limits consumer gate)                            | T4      |
| X3  | Statechart  | Scaffold-generated harness page                                                         | intentionally exclude | `AGENTS.md` § Design laws → Mechanism, not product policy                                                          | S3      |
| X4  | Statechart  | Home of the transition table and its runner                                             | retain in core        | `test/src/core/helpers.ts:549,590` walk closures and read no DOM; P2 makes them reachable from browser             | T1      |
| X5  | Statechart  | `STATECHART_ATTRIBUTES` and `STATECHART_STATUSES` asserted as constants and never written | repair                | `test/tests/guides.test.ts` is their only reader                                                                  | T4      |
| X6  | Statechart  | Status union published only as an expression a consumer must rewrite                    | implement             | `test/src/core/constants.ts:38-40`                                                                                | T4      |
| K1  | Skill       | The harness a person watches is specified as an application page                        | repair                | `references/statechart.md:46-72`; `@orkestrel/test/browser` imports `vitest/browser` at module scope               | S3      |
| K2  | Skill       | Worked `StateTransition` example (ROADMAP 10)                                           | implement             | `references/statechart.md:9-13`                                                                                   | S3      |
| K3  | Skill       | Observable `pending`→`idle` trigger (ROADMAP 13)                                        | implement             | `test/src/core/constants.ts:30-46`; `references/statechart.md:56-58`                                              | S3      |
| K4  | Skill       | Mutation against a journey assertion and a refusal assertion (ROADMAP 11)               | implement             | `SKILL.md:186-203` names no mutation; `.claude/rules/quality.md` § Instruments                                     | S3      |
| K5  | Skill       | `prove` limit stated against a version pin (ROADMAP 12)                                 | repair                | `references/decide.md:28-38`; limit reproduced at `@orkestrel/probe` 0.0.16                                       | S3      |
| K6  | Skill       | Store and router calls inside the matrix and transport families                         | repair                | `integration.test.ts:131,976,987,1084`; `styles/theme.test.ts:154,205,209,247`                                    | S3, C1  |
| K7  | Skill       | Targets and matrix populations resolved by selector, id, and class                      | repair                | `setup.ts:119-233,724`; `styles/theme.test.ts:158-256`                                                            | S3, C1  |
| K8  | Skill       | Settling on a framework's class list                                                    | repair                | `setup.ts:727-729`                                                                                                | S3, C1  |
| K9  | Skill       | `document.elementFromPoint` written beside a published `readHit`                        | repair                | `integration.test.ts:218`                                                                                         | S3, C1  |
| K10 | Skill       | `element.focus()` placing focus in the style matrix                                     | repair                | `styles/theme.test.ts:57,123,163,214,232`                                                                          | S3, C1  |
| K11 | Skill       | Accessible-name collision routed around (ROADMAP 34)                                    | repair                | `journey-readiness-verdict.md` disposition; `integration.test.ts:517` asserts the ambiguity voice                  | S3, C1  |
| K12 | Skill       | Arrival, unknown-route, miss-screen, document-title, and render-error journeys          | implement             | Named in the design brief's question on the skill's instructions                                                  | S3, C1  |
| K13 | Skill       | `pressKeys` taught by the skill and absent from the package (ROADMAP 21)                | implement             | `ROADMAP.md:21`; the skill no longer names it, and P3 gives the name a real export                                | T2, S3  |
| K14 | Skill       | Field pass re-run from a checkout carrying no campaign verdicts (ROADMAP 17)            | retain                | `ROADMAP.md:17` names `references/field-testing.md`, which the skill does not carry                               | Exit    |
| K15 | Skill       | Retained-verdict clause (debrief Field-2)                                               | retain                | `SKILL.md:28-30`                                                                                                  | —       |
| K16 | Skill       | Routing a person-watching question to a harness deep link                               | repair                | `references/decide.md:9,64-68`                                                                                    | S3      |
| G1  | Propagation | Per-variant journey fan-out is the consumer's                                           | implement             | `roughnotes/vite.config.ts:53-58,364-387`; `scaffold/src/core/templates.ts:316-348`                               | S1      |
| G2  | Propagation | Generated `tests/setupBrowser.ts` has no proof that runs in a browser (ROADMAP 1)       | implement             | `scaffold/src/core/templates.ts:1157,458-470`; `scaffold/src/core/compilers.ts:1185-1194`                         | S1      |
| G3  | Propagation | Browser matrix wider than Chromium                                                      | intentionally exclude | `roughnotes/configs/browsers.ts:19-70,285-311`; Contract rule 18 at `test/guides/test.md:1268-1292`               | —       |
| G4  | Propagation | Skill sweep proves file existence, not API existence (ROADMAP 16)                       | implement             | `scaffold/tests/setupPolicy.ts:889-897,1046-1064`                                                                 | S2      |
| G5  | Propagation | Local refusal case against the vendored proof it duplicates (ROADMAP 30)                | repair                | `ROADMAP.md:30`; the site is unresolved from the files this brief names                                           | S2      |
| G6  | Propagation | `repair` over `configs` deletes the consumer's fan-out                                  | repair                | `scaffold/src/core/compilers.ts:894-897` (`ownership: 'content'`)                                                  | S1      |
| C2  | Consumer    | Keyboard reachability proven on a minority of surfaces (verdict R1)                     | repair                | `journey-readiness-verdict.md:12-20`                                                                              | C1      |
| C3  | Consumer    | Refusal assertions accepting more than one voice (verdict R2)                           | retain                | G1 distillate § 3: no site accepts a wider voice                                                                  | C1      |
| C4  | Consumer    | Arrival asserted with text already on the prior screen (verdict R3)                     | repair                | `integration.test.ts:522-523,738-739,826-827`                                                                      | C1      |
| C5  | Consumer    | Storage-failure leg: the permission half drives no journey (verdict R7)                 | repair                | G1 distillate § 6                                                                                                 | C1      |
| C6  | Consumer    | `aria-pressed` filter no journey presses (verdict R8)                                   | repair                | `journey-readiness-verdict.md:55-56`                                                                              | C1      |
| C7  | Consumer    | Announced state never asserted beside the drive that sets it (verdict R9)               | repair                | `journey-readiness-verdict.md:58-60`                                                                              | C1      |
| C8  | Consumer    | `home` placed after intervening interactions (verdict R10)                              | repair                | `journey-readiness-verdict.md:64-65`                                                                              | C1      |

# Contracts

Each declaration lands in the named `types.ts` before its implementation, per TTTDD.

## Boundary and status alias

```ts
// test/src/core/types.ts
/**
 * Names the run state a statechart harness reports through its status attribute.
 *
 * @remarks Derived from the constant tuple, so a harness and its gate share one type rather than
 * rewriting the indexed-access expression.
 */
export type StatechartStatus = (typeof STATECHART_STATUSES)[number]
```

Location: `test/src/core/types.ts`. Throws nothing. Adopted at `test/src/browser/types.ts` (`HarnessInterface.status`) and by every gate that reads a harness tally.

## Journey verbs

```ts
// test/src/browser/helpers.ts
/**
 * Sends a key sequence to whatever holds focus, refusing a send that would land on the document.
 *
 * @param keys - The provider's key syntax, such as `{Enter}` or `{Shift>}{Tab}{/Shift}`.
 * @throws When nothing but the document body holds focus.
 */
export function pressKeys(keys: string): Promise<void>
```

Location: `test/src/browser/helpers.ts`. Voice: `Key sequence "<keys>" was sent with nothing focused`. Adopted at the Enter commits SKILL.md law 6 requires and at the Escape journey that closes the drawer, both written in C1; it replaces the direct `userEvent` import `references/layer.md:114-118` carves out.

```ts
// test/src/browser/types.ts
/** Configures a bounded wait over the text the whole page renders. */
export interface PageOptions extends WaitOptions {
	/** Holds the sentence the page must no longer render when the wait resolves. */
	readonly absent?: string
}
```

```ts
// test/src/browser/helpers.ts
/**
 * Waits until the page's rendered text carries one sentence and, where asked, has lost another.
 *
 * @param text - The sentence the page must render.
 * @param options - The wait bounds and the sentence that must be gone.
 * @returns The page perception read at the moment the wait resolved.
 * @throws When the budget ends before both conditions hold.
 */
export function waitForPage(text: string, options?: PageOptions): Promise<string>
```

Location: `test/src/browser/helpers.ts`. Voice: the wait family's timeout carrying the description `page to render "<text>"`, extended to `page to render "<text>" and drop "<absent>"` where `absent` is set. Adopted at `roughnotes/tests/app/browser/integration.test.ts:208`, deleting the local `waitForText`; the `absent` arm closes verdict R3 at `:522-523`, `:738-739`, and `:826-827`.

```ts
// test/src/browser/types.ts
/** Configures a bounded wait over the states a named control announces. */
export interface StateOptions extends WaitOptions {
	/** Determines the direction. If `true`, waits until the state is gone; if `false`, until it appears. */
	readonly absent?: boolean
}
```

```ts
// test/src/browser/helpers.ts
/**
 * Waits until a named control announces a state, or stops announcing it.
 *
 * @param name - The accessible name of the control, matched exactly.
 * @param state - The announced state, as `readStates` reports it.
 * @param options - The wait bounds and the direction.
 * @returns The states the control announced when the wait resolved.
 * @throws The resolver's own voice when no reachable control carries the name, and the wait
 * family's timeout when the budget ends first.
 */
export function waitForState(
	name: string,
	state: string,
	options?: StateOptions,
): Promise<readonly string[]>
```

Location: `test/src/browser/helpers.ts`. Voices: every `resolveRendered` voice in `references/layer.md:69-83`, plus `"<name>" to announce "<state>"` on timeout. Adopted at `roughnotes/tests/app/browser/setup.ts:723-731`, deleting `readMenuSettled` and the Bootstrap `show`/`showing`/`hiding` read at `:727-729`.

```ts
// test/src/browser/helpers.ts
/**
 * Waits until every finite animation on an element and its subtree has finished.
 *
 * @param element - The element whose own and descendant animations are awaited.
 * @param options - The wait bounds.
 * @remarks An animation declaring infinite iterations never finishes, so it is excluded rather
 * than waited on: a spinner that runs forever is not an unsettled reading.
 * @throws When the budget ends with a finite animation still running.
 */
export function waitForMotion(element: Element, options?: WaitOptions): Promise<void>
```

Location: `test/src/browser/helpers.ts`. Voice: `Element still runs the animations <names> after <budget> ms`. Adopted at `roughnotes/tests/app/browser/setup.ts:354,373`, deleting `isRunning` and the polling half of `readSettled`.

```ts
// test/src/browser/helpers.ts
/**
 * Reads the refusal a resolver would throw for a target, as its message.
 *
 * @param name - The accessible name, matched exactly.
 * @returns The thrown message, or `undefined` when the target resolves.
 */
export function readRefusal(name: string): string | undefined
/**
 * Reads the refusal a resolver would throw for a target inside one role.
 *
 * @param role - The role the match is confined to.
 * @param name - The accessible name, matched exactly.
 * @returns The thrown message, or `undefined` when the target resolves.
 */
export function readRefusal(role: string, name: string): string | undefined
```

Location: `test/src/browser/helpers.ts`. Throws nothing; it hands back the voice `resolveRendered` raised. Adopted at `roughnotes/tests/app/browser/setup.ts:637`, deleting the local reader, and at every `readRefusal` call site the G1 distillate § 3 lists. Its contract over `captureError`: the resolver is fixed rather than a caller's thunk, and the `unknown` a capture returns becomes a `string | undefined` without an assertion the non-negotiables bar.

## Transport family

```ts
// test/src/browser/types.ts
/** Configures an inert `Storage` that refuses after a fixed number of successful operations. */
export interface StorageOptions {
	/** Holds how many `getItem` calls succeed before the fault. Omit it to let every read succeed. */
	readonly reads?: number
	/** Holds how many `setItem` calls succeed before the fault. Omit it to let every write succeed. */
	readonly writes?: number
	/** Holds the `DOMException` name the fault raises. Default: `'QuotaExceededError'`. */
	readonly fault?: string
}
```

```ts
// test/src/browser/factories.ts
/**
 * Creates an inert `Storage` backed by its own map, which refuses after the configured operations.
 *
 * @param options - The operation budgets and the `DOMException` name a refusal raises.
 * @returns A real `Storage` implementation the application takes unchanged.
 */
export function createStorage(options?: StorageOptions): Storage
```

Location: `test/src/browser/factories.ts`. Voice: a `DOMException` whose `name` is `fault` and whose message names the key — `No room is left for "<key>"` for a write, `Access is denied for "<key>"` for a read. Adopted at `roughnotes/tests/app/browser/setup.ts:448` and `:535`, deleting `QuotaStorage`, `QuotaOptions`, `PermissionStorage`, and `PermissionOptions`; the read budget gives verdict R7's permission half its first journey in C1.

## Style instruments and their controls

```ts
// test/src/browser/types.ts
/** Reports an authored-class census: what it walked, what it found, and what no stylesheet declares. */
export interface CensusReading {
	/** Holds how many elements the walk read, reported with the result rather than assumed. */
	readonly elements: number
	/** Lists every class token the markup carries, in first-sighting order. */
	readonly tokens: readonly string[]
	/** Lists the tokens the loaded cascade declares nowhere. */
	readonly undeclared: readonly string[]
}
```

```ts
// test/src/browser/helpers.ts
/**
 * Reads the difference between the classes a mounted surface carries and the classes its cascade
 * declares, and reports the population it walked.
 *
 * @param root - The mounted surface to walk.
 * @returns The census: the elements walked, the tokens found, and the undeclared remainder.
 * @throws When the walk reads no element, because an empty population passes every difference check.
 */
export function readCensus(root: ParentNode): CensusReading
```

Location: `test/src/browser/helpers.ts`. Voice: `Class census walked no elements`. Adopted at `roughnotes/tests/app/browser/setup.ts:885-922`, deleting `CENSUS_RULE`, `CensusReading`, and `readCensus`, and at `integration.test.ts:331`. It sits beside `readClasses` and `readCascade` the way `readContrast` sits beside `readLayers` and `measureContrast`, and closes verdict R5.

```ts
// test/src/browser/types.ts
/** Holds a mounted composite stack whose flat and composited readings disagree across one bar. */
export interface ContrastFixture {
	/** Holds the mounted stack's own root. */
	readonly root: HTMLElement
	/** Holds the foreground whose composited reading falls under the bar. */
	readonly refused: HTMLElement
	/** Holds the foreground whose composited reading clears the bar. */
	readonly accepted: HTMLElement
	/** Holds the opaque color the stack is painted onto. */
	readonly floor: Color
	/** Removes the stack from the document. Repeated calls do nothing. */
	destroy(): void
}
```

```ts
// test/src/browser/factories.ts
/**
 * Builds and mounts the negative control `readContrast`'s compositing needs: a translucent stack
 * straddling one bar, where a flat reading and a composited reading disagree.
 *
 * @param bar - The contrast bar the caller's own policy declares.
 * @returns The mounted stack, its two foregrounds, and the opaque floor beneath them.
 * @throws When the host's own rendering leaves the two foregrounds on the same side of the bar.
 */
export function buildContrast(bar: number): ContrastFixture
```

Location: `test/src/browser/factories.ts`. Voice: `Contrast control did not straddle the bar <bar>`. Adopted at `roughnotes/tests/app/browser/setup.ts:809-882`, deleting `STACK_BASE`, `STACK_TINT`, `STACK_REFUSED`, `STACK_ACCEPTED`, `CompositeStack`, `buildCompositeStack`, and `readFlat`, and at `integration.test.ts:383`. Taking `bar` keeps the policy with the consumer and the mechanism here, which closes verdict R4.

```ts
// test/src/browser/types.ts
/** Holds the mounted markup a style-escape reading must find, and the one it must leave alone. */
export interface EscapeFixture {
	/** Holds the fixture's own root. */
	readonly root: HTMLElement
	/** Holds the element carrying an inline `style` attribute. */
	readonly inline: HTMLElement
	/** Holds the embedded `style` element. */
	readonly block: HTMLElement
	/** Holds the permitted stylesheet the reading exempts. */
	readonly permitted: HTMLElement
	/** Removes the fixture from the document. Repeated calls do nothing. */
	destroy(): void
}
```

```ts
// test/src/browser/factories.ts
/**
 * Builds and mounts the negative control `extractStyles` needs: an inline escape, an embedded
 * style block, and one permitted sheet the reading must not report.
 *
 * @param permitted - The element id the reading exempts.
 * @returns The mounted fixture and each of its three elements.
 */
export function buildEscapes(permitted: string): EscapeFixture
```

Location: `test/src/browser/factories.ts`. Throws nothing. Adopted at `roughnotes/tests/app/browser/setup.ts:925-953`, deleting `EscapeFixtures` and `buildEscapeFixtures`, and at `integration.test.ts:352`. It closes verdict R6's uncovered `<style>` branch and its missing permitted fixture.

```ts
// test/src/browser/types.ts
/** Holds the mounted markup an authored-class census must report as undeclared. */
export interface CensusFixture {
	/** Holds the fixture's own root. */
	readonly root: HTMLElement
	/** Holds the undeclared class on an HTML element. */
	readonly token: string
	/** Holds the undeclared class on an SVG element, where `className` is no string. */
	readonly mark: string
	/** Removes the fixture from the document. Repeated calls do nothing. */
	destroy(): void
}
```

```ts
// test/src/browser/factories.ts
/**
 * Builds and mounts the negative control an authored-class census needs, carrying an undeclared
 * class on an HTML element and another on an SVG element.
 *
 * @returns The mounted fixture and the two tokens the census must report.
 */
export function buildCensus(): CensusFixture
```

Location: `test/src/browser/factories.ts`. Throws nothing. Adopted at `roughnotes/tests/app/browser/setup.ts:802` and `integration.test.ts:167-168`, deleting `buildMarkControl`, `ABSENT_CLASS`, and `ABSENT_MARK`.

## The statechart harness

```ts
// test/src/browser/types.ts
/** Configures the harness that renders one transition table and drives it. */
export interface HarnessOptions<TState extends string, TEvent extends string, TContext> {
	/** Lists every scenario the harness renders a row for, in the order it drives them. */
	readonly scenarios: readonly StateScenario<TState, TEvent, TContext>[]
	/** Builds the fixture one row drives, receiving the row it is building for. */
	readonly build: (scenario: StateScenario<TState, TEvent, TContext>) => TContext | Promise<TContext>
	/** Reads the entity's current state from the fixture, for the state the harness renders. */
	readonly state: (context: TContext) => TState
	/** Holds the pause between rows in milliseconds, for a person watching. Default: `0`. */
	readonly pause?: number
}

/** Holds a mounted statechart harness, its published tally, and the run it drives. */
export interface HarnessInterface {
	/** Holds the harness root, which carries the status and the tally attributes. */
	readonly root: HTMLElement
	/** Holds the run state the root publishes. */
	readonly status: StatechartStatus
	/** Holds how many rows the harness rendered. */
	readonly total: number
	/** Holds how many rows the last run drove to their asserted state. */
	readonly passed: number
	/** Holds how many rows the last run failed. */
	readonly failed: number
	/** Lists the name of every row the last run failed, in run order; a snapshot. */
	readonly failures: readonly string[]
	/**
	 * Drives every row to completion and resolves after the status reaches its terminal reading.
	 *
	 * @remarks A failing row does not stop the walk: the harness records it and continues, so one
	 * run reports every failure rather than the first.
	 */
	execute(): Promise<void>
	/** Unmounts the harness and removes its root. Repeated calls do nothing. */
	destroy(): void
}
```

```ts
// test/src/browser/factories.ts
/**
 * Creates and mounts a statechart harness over one transition table, publishing every attribute
 * the statechart contract names.
 *
 * @param options - The scenarios, the fixture builder, the state reader, and the pacing.
 * @returns The mounted harness, standing at `idle` with its rows rendered.
 * @throws When the scenario list is empty, because a harness with no row passes every tally check.
 */
export function createHarness<TState extends string, TEvent extends string, TContext>(
	options: HarnessOptions<TState, TEvent, TContext>,
): HarnessInterface
```

Location: `test/src/browser/factories.ts`. Voice: `Statechart harness mounted no transition`. Adopted by the statechart family the skill declares and by the test package's own `tests/src/browser/factories.test.ts`, which mounts it and drives a table through its rendered attributes — the proof `test/tests/src/core/helpers.test.ts:941-1095` cannot give, because it drives the runner and mounts nothing.

# Statechart ruling

**The family's shape.** Publish the harness builder. Refuse the separate gate reader and the generated page.

**Why the page cannot be built as specified.** `references/statechart.md:46-72` places the harness in the repository that owns the surface, renders it with play controls and a deep link from the route, and forbids a workspace from spelling a `data-statechart-*` string of its own. Those instructions are jointly unsatisfiable. The attribute map and the runner live in `@orkestrel/test`, which every consumer declares as a devDependency — `roughnotes/package.json:53` — and whose browser entry imports `vitest/browser` at module scope (`test/guides/test.md:1201-1206`). An application route importing either pulls a test package into `dist/app/browser` and fails the build on a specifier the application graph does not resolve. That is why no harness exists in any checkout, and it is a defect in the instruction rather than a gap in anyone's diligence.

**What ships instead.** `createHarness` in `@orkestrel/test/browser` mounts framework-free markup, renders one row per transition, writes every attribute from `STATECHART_ATTRIBUTES`, walks the rows through `executeScenarios`, and hands back `status`, `total`, `passed`, `failed`, and `failures`. The test holds the object, so the gate reads the tally from the return value and needs no poll. The person-watchable half comes from what the run already produces: the capture portfolio photographs the harness at each terminal reading, `describeTree` of the harness root enters the written artifact, and a headed run with a `pause` lets a person watch the rows move. A deep-linked page stays an optional product surface a workspace can ship on its own account; the skill names the attribute contract it must honour and stops there, per `AGENTS.md` § Design laws → Mechanism, not product policy.

**Where the runner lives.** The runner stays in core. `test/src/core/helpers.ts:549,590` walk closures and touch no DOM, so core is the correct home and the alternative — relocating the whole family into `src/browser` — would put host-independent logic in a host environment and move its tests into a Playwright project for no gain. What moves is the rule: strike "no `src/core` import" from Contract rule 13 at `test/guides/test.md:1201-1206`, keep every other clause of that rule (no framework, no `node:*`, no `import.meta.env`), and externalize `@orkestrel/test` from the browser build so `dist/src/browser/index.js` imports the core entry rather than bundling a second copy of it. The root project model at `AGENTS.md` § Project model already sanctions browser→core; the package narrowed it past what its own stated purpose needs, and that narrowing blocks `waitForPage`, `waitForState`, and the harness alike.

**The harness takes no runner parameter.** Handing the runner in as an argument was the alternative that preserves the clause. It fails on shape: the runner walks rows opaquely, so a harness that cannot call it per row cannot publish `STATECHART_ATTRIBUTES.result` on each one, and the attribute-writing contract falls back to the consumer — which is the drift publishing the harness exists to stop.

**ROADMAP 10 — the worked example.** `references/statechart.md` § Declare the table gains one fence, typed on a real entity's unions, which also gives the API sweep in G4 a population:

```ts
import type { StateTransition } from '@orkestrel/test'

type DrawerState = 'closed' | 'open'
type DrawerEvent = 'summon' | 'dismiss'

const TRANSITIONS: readonly StateTransition<DrawerState, DrawerEvent>[] = Object.freeze([
	Object.freeze({ name: 'a person summons the drawer', from: 'closed', event: 'summon', to: 'open' }),
	Object.freeze({ name: 'a person dismisses the drawer', from: 'open', event: 'dismiss', to: 'closed' }),
	Object.freeze({ name: 'the drawer ignores a second summon', from: 'open', event: 'summon', to: 'open' }),
])
```

**ROADMAP 13 — the `pending` to `idle` trigger.** `pending` is what the harness root publishes from construction until every declared row has rendered its `STATECHART_ATTRIBUTES.scenario` element and `STATECHART_ATTRIBUTES.total` carries the row count. Completing that inventory is the observable trigger, and `idle` is what the root publishes after it. A gate that finds `pending` has found a harness whose rows never mounted, which is exactly the case `references/statechart.md:80` already tells a gate to assert before the tally.

# Propagation ruling

**Generate the journey fan-out.** `scaffold/src/core/templates.ts:316-348` emits `appBrowser` and a `{{showcaseFactory}}` token; add a `{{journeyFactory}}` token beside it, carrying a `JOURNEY_VARIANTS` constant, an `appJourney(variant)` factory providing `variant` and `variants` through Vitest `provide`, and the spread that gives each variant its own project. `scaffold/src/core/compilers.ts:894-897` marks `vite.config.ts` `ownership: 'content'`, so the consumer's hand-rolled copy at `roughnotes/vite.config.ts:53-58,364-387` is stale to `scaffold audit` by construction and a `repair` over the `configs` group deletes it. Generating the fan-out closes both rows at once. What it obliges: a template edit, a compiler edit deciding which blueprints receive it (derive from `app: ['browser']` rather than adding a blueprint axis), a `dist/src` move and therefore a `@orkestrel/scaffold` bump, a re-pin and a `repair` visit per target. It moves no vendored byte.

**Give the browser setup module a proof in a browser.** `scaffold/src/core/templates.ts:1157` makes `ARTIFACT_TEMPLATES.tests.setup` the empty string and `compilers.ts:1185-1194` emits `tests/setupBrowser.ts` from it, while the `setup` project at `templates.ts:458-470` runs in Node with the browser disabled. Emit a paired `tests/setup*.test.ts` artifact per emitted setup module, and register a `setup:browser` project that collects `tests/setupBrowser.test.ts` under the Playwright provider while `setup` keeps the Node pair. Keeping the browser proof in a setup-named project preserves the placement law at `.claude/rules/tests.md:62-64` rather than folding the module's proof into an environment project whose subject is source. What it obliges: template and compiler edits, a row each in `.claude/rules/workspace.md` § Test project matrix and `.claude/rules/tests.md` § Cross-cutting proofs, and a `test:setup:browser` script the `test` chain runs.

**Exclude a browser matrix past Chromium.** `roughnotes/configs/browsers.ts` is Chromium-shaped end to end: `CHROMIUM_LAYOUTS` at `:19`, `CHROMIUM_ENTRY_PATTERN` at `:31`, `BUNDLED_CHROMIUM_LAYOUTS` at `:46`, and `SYSTEM_BROWSER_CHANNELS` at `:53` naming Chrome and Edge. Widening it rewrites that leaf and installs engines nobody has proven. The capture layer is worse: `test/guides/test.md:1268-1292` pins `stagePane` to one Vitest tester layout, and `readRing` reports what one engine paints for `:focus-visible`. The condition that reopens this row: a second Playwright engine installed and launching on this host, and a frame shot through `captureFrame` reading back at the declared size on that engine. Name that condition in the row rather than the phrase "wider coverage".

**Prove the skill's API claims from fences.** `scaffold/tests/setupPolicy.ts:889-897` extracts reference paths and `:1046-1064` checks each resolves; nothing reads a symbol against an installed entry. Add one check to `inspectSkill`: for every fenced `ts` block in a skill document, read each `import { … } from '@orkestrel/<package>'` or `'@orkestrel/<package>/<environment>'` statement and refuse a named symbol the installed package's declaration entry does not export. Scope it to fenced imports and say so — a sweep over backticked prose tokens matches sentences, which is the instrument gap `.claude/rules/quality.md` § Instruments refuses to document as a limit. Pair the sweep with the skill edits that give it a population: the worked `StateTransition` fence, and one import fence per reference naming the verbs that reference teaches. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored, so this moves `dist/host`, obliges a bump and a publish, and every target re-pins and runs `repair`.

**What a first adopter still supplies.** The variant list's names and viewports, the capture state registry, the contrast bars its product declares, the application's own store contract for the transport family, and the transition table typed on its own entity's unions. Everything else arrives generated or imported.

# Skill instructions

Each retained lesson gets one carrying instruction. Where a lesson is product policy, the skill states the mechanism and stops.

- **Store and router calls inside a family.** `SKILL.md` § Apply the journey laws law 1 gains: *The journey laws bind every declared family. A matrix reading and a transport assertion reach their surface through the same verbs a journey uses; a family that navigates with the application's own router proves the router.* Sanctioned exception, stated in the same law: a transport family constructs the store it hands the application, because that is the fixture rather than the drive. Sites: `integration.test.ts:131,976,987,1084`; `styles/theme.test.ts:154,205,209,247`.
- **Selector, id, and class resolution.** Law 1 gains: *Never resolve a target, a region, or a matrix population by CSS selector, id, or class. Where a matrix population has no name to resolve by, the finding is that the surface exposes none.* Sites: `setup.ts:119-233,724`; `styles/theme.test.ts:158-256`.
- **Framework class-list settling.** `references/layer.md` § Input and traversal gains: *Never settle on a framework's class list. Wait on the state the control announces with `waitForState`, and on the element's own animations with `waitForMotion`. An ARIA disclosure is a button: drive it with `clickAccessible` and settle it with `waitForState`. `clickDisclosure` drives a native `<summary>` alone, because the provider's role locators do not resolve one.* Site: `setup.ts:727-729`.
- **`elementFromPoint`.** § Import the journey layer gains: *`readHit` is the hit reading. Never call `elementFromPoint` beside it.* Site: `integration.test.ts:218`.
- **Programmatic focus.** `references/styles.md` § Contrast and focus chrome gains: *Place focus with `traverseAccessible`, `pressKeys`, or a real click, in every family. `readRing` reports `undefined` for a control the browser painted no `:focus-visible` ring on, and a focus placed by calling the element's focus method is the case that produces it.* Sites: `styles/theme.test.ts:57,123,163,214,232`.
- **The mutation an executor performs (ROADMAP 11).** `SKILL.md` § Accept gains a block: *Before accepting, break each assertion class once. For a journey assertion, change one word of the sentence it quotes and confirm that journey reddens naming the changed sentence. For a refusal assertion, render the control the refusal withholds and confirm that assertion reddens naming a different voice from the voice table. Record the exact command and its failing count for each, restore both, and record the same command green.*
- **The `prove` limit (ROADMAP 12).** `references/decide.md` § The limit that decides the split drops the `0.0.11` pin: *Confirm the limit against the installed `@orkestrel/probe` before routing a rendered question to `prove`. Read the runtime stage's pool pin in the installed server entry and read the probe guide for a browser project, and record the version you read.* The limit reproduces at 0.0.16: the installed stage pins `pool: "threads"`, and `scaffold/guides/probe.md` names no browser.
- **Accessible-name collisions (ROADMAP 34).** § Derive journeys from intents gains: *Never re-target around a collision to make a run green. Re-targeting by role or region is the temporary measure; the finding is the deliverable and it closes in the application.* Site: `integration.test.ts:517`. The application fix is a consumer unit.
- **The journeys the field pass found missing.** § Derive journeys from intents gains one line per intent, each conditioned on the surface having it: the arrival a person lands on, an address the application routes nowhere, a screen whose query matches nothing, the document title each screen sets, and the sentence the application paints when a render fails. Each is a rendered fact a person perceives, so none is product policy.
- **The harness page and its deep link.** `references/statechart.md` § Build the harness a person watches is replaced by § Mount the harness, which names `createHarness`, the table it takes, and the capture and artifact readings that make the run watchable. `references/decide.md:9` routes a person watching a widget move to the harness run's captures and its artifact, and names a deep link only where the workspace ships a harness page on its own account. The demo step, the route, and the play-all press through `clickAccessible` are struck: instrument chrome driven through the interface proves the instrument.

**What the skill must stop before.** The harness page and its route, the demo step's final resting state, the contrast bar values, the variant list, the capture state registry, and the set of screens a portfolio covers are product decisions. The skill names the mechanism, the attribute contract, and the proof each family owes, and the workspace decides the rest. `references/styles.md:3-5` already points the bar and the population at the `enterprise-bootstrap` instruments reference; keep that split.

# Units

One writer per checkout. The release shape forces the checkout order: the test package publishes, scaffold re-pins and refreshes its mirror, the consumer re-pins and runs `repair`.

| Unit | Role / engine     | Checkout   | Owns                                                                                                                                                 | Depends on | Acceptance criterion the Orchestrator can check without the report                                                                                                                                                                                  |
| ---- | ----------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T1   | `sol` / Sol       | `test`     | `guides/test.md` (Contract 9, Contract 13), `configs/src/vite.browser.config.ts`, `src/core/types.ts`                                                  | —          | `npm run check:src:browser` passes with a `../core/index.js` import present in `src/browser`; `dist/src/browser/index.js` names `@orkestrel/test` as an import rather than inlining `executeScenarios`; Contract 9 states the `@orkestrel/contract` boundary; `StatechartStatus` resolves from the core entry |
| T2   | `opus` / Opus 5   | `test`     | `src/browser/types.ts`, `src/browser/helpers.ts`, `src/browser/factories.ts`, `tests/src/browser/*`, `guides/test.md` (Surface, Voices, Limits)        | T1         | `pressKeys`, `waitForPage`, `waitForState`, `waitForMotion`, `readRefusal`, `createStorage` each resolve from `@orkestrel/test/browser`; `npm run test:guides` passes; each has a Surface row, a Voices row where it throws, and a Limits row; `npm run test:src:browser` passes |
| T4   | `opus` / Opus 5   | `test`     | `src/browser/types.ts` (harness), `src/browser/factories.ts` (harness), `tests/src/browser/factories.test.ts`, `guides/test.md`                        | T2         | `createHarness` resolves from `@orkestrel/test/browser`; a test mounts it over a table and reads `passed` equal to `total` from the mounted root's own attributes; the empty-table refusal has a test; the status reads `idle` before `execute` and a terminal value after |
| T3   | `sol` / Sol       | `test`     | `src/browser/helpers.ts` (`readCensus`), `src/browser/factories.ts` (`buildContrast`, `buildEscapes`, `buildCensus`), `src/browser/helpers.ts` doc blocks for `isRendered` and `isReachable`, tests, `guides/test.md` | T4         | `readCensus`, `buildContrast`, `buildEscapes`, `buildCensus` resolve from the browser entry; each fixture has a test proving the control reports failure under its own reading; the `isRendered` and `isReachable` doc blocks each name the shadow-tree retarget; `npm test` passes |
| S1   | `sol` / Sol       | `scaffold` | `src/core/templates.ts`, `src/core/compilers.ts`, `tests/src/core/*`, `.claude/rules/workspace.md`, `.claude/rules/tests.md`                            | T3         | A generated browser blueprint emits a `vite.config.ts` carrying `JOURNEY_VARIANTS`, `appJourney`, and one project per variant; the same blueprint emits `tests/setupBrowser.test.ts` and registers a browser-enabled `setup:browser` project with a `test:setup:browser` script the `test` chain runs; `npm run test:config` and `npm test` pass |
| S2   | `sol` / Sol       | `scaffold` | `tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`, `tests/policy.test.ts`                                                                            | S1         | A fenced `ts` import in a skill document naming a symbol the installed package does not export is reported by `npm run test:policy`, and a planted control proves it fails; the ROADMAP 30 duplicate is ruled and the losing copy deleted, with the surviving proof named |
| S3   | `opus` / Opus 5   | `scaffold` | `.agents/skills/orkestrel-prove-journey/**`, `.claude/skills/orkestrel-prove-journey/**`, `guides/test.md` mirror refresh, `ROADMAP.md`               | S2         | Every instruction in § Skill instructions resolves to a line in the skill; `references/statechart.md` carries the worked fence and the `pending`→`idle` trigger; `references/decide.md` names no version pin; `npm run test:policy` passes including the S2 sweep over the added fences; ROADMAP items 10, 11, 12, 13, 16, 18, 19, 20, 21, 30, 31 are struck |
| C1   | `opus` / Opus 5   | `roughnotes` | `tests/app/browser/setup.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/styles/theme.test.ts`, `app/browser/**` (name collisions), `vite.config.ts`, `guides/README.md`, `package.json` | S3         | No file under `tests/app/browser/` calls `querySelector`, `getElementById`, `elementFromPoint`, `element.focus`, `app.open`, `app.theme`, or reads `app.dark.value`; every deleted local instrument the matrix names is gone and its published replacement imported; every surface the journeys cover has a `traverseAccessible` walk; `scaffold audit` reports `vite.config.ts` clean; `npm test` passes |

**Exit criterion.** The campaign ends when each of these capabilities is implemented, repaired, retained, or excluded on evidence, and the gates are green in each checkout: the test package's browser entry reaching core; the journey verbs `pressKeys`, `waitForPage`, `waitForState`, `waitForMotion`, `readRefusal`, `createStorage`; the style instruments `readCensus`, `buildContrast`, `buildEscapes`, `buildCensus` with the control each certifies; the statechart harness with its inventory refusal and its terminal tally; the shadow-tree boundary on both predicates; the generated journey fan-out; the browser-runtime setup proof; the fenced-import API sweep; the excluded browser matrix with its reopening condition named; every skill instruction in § Skill instructions landed; and the consumer's suite carrying no reach-past site and no hand-rolled instrument a published export replaces. ROADMAP 17's field pass runs last, from a checkout carrying no verdict of this campaign, and its ruling on whether the tightened statechart trigger fires is the acceptance reading.

# Risks

- **The boundary strike duplicates core into the browser bundle.** If the browser build inlines rather than externalizes core, a consumer importing both entries holds two copies of the wait family and two frozen attribute maps. The probe that catches it early: build the browser entry and read `dist/src/browser/index.js` for a literal `data-statechart-status` string. A hit means the map was inlined.
- **Surface growth outruns the consumer gate.** This design adds many browser exports at once, and `AGENTS.md` § Minimal public API admits a capability with its first real consumer. Each export names a consumer site in § Contracts, but three of them — `pressKeys`, the read budget on `createStorage`, and `buildEscapes`'s permitted arm — are adopted by journeys C1 writes rather than by journeys that exist. The evidence that settles it: run C1's adoption before the test package publishes, against a packed tarball installed into roughnotes, and drop any export the adoption does not reach.
- **`readRefusal` may be the wrapper ROADMAP 20 suspects.** Its case rests on the `unknown`-to-`string` translation and the fixed resolver. A reviewer who reads that as a rename of `captureError` is reading it the way § Limits read `extractControls`. The evidence: write both forms at one consumer site and compare what each costs without a type assertion.
- **The fence-import sweep proves less than ROADMAP 16 asks.** The item says prove that an API a skill instructs an executor to call exists; the sweep proves that a fenced import resolves. A skill naming a symbol in prose still passes. Record the coverage beside the result, and settle the residue by moving each taught symbol into a fence rather than by widening the matcher into prose.
- **`waitForMotion` excludes infinite animations and might exclude the animation the reading needs.** A design using an infinite subtle animation on a surface under contrast reading would never settle, and the exclusion makes that silent. The probe: build a fixture carrying one finite and one infinite animation and assert the wait resolves while the infinite one still runs, and assert a reading taken after it is stable across repeats.
- **The generated fan-out collides with a consumer that already hand-rolled one.** roughnotes carries `VARIANTS`, `JourneyVariant`, and `journey` at `vite.config.ts:40-58,364`. The generated names differ, so a `repair` after S1 lands both and the file fails to typecheck on a duplicate project spread. Sequence C1's `vite.config.ts` deletion in the same visit as the `repair`, and probe it by running `scaffold repair` against a copy of the consumer before the real visit.
- **A new export claims a bare name another fleet package owns.** `createStorage`, `StorageOptions`, and `readCensus` are the exposed candidates. The check is mechanical and cheap: run the `surface` policy rule in the test checkout after the barrel lands, before the publish.
- **Excluding the harness page loses evidence a person actually wanted.** decide.md routed a look to a moving widget for a reason. If the captures and the artifact do not carry it, the row reopens as a product unit in the consumer rather than as a mechanism here. The reading that settles it: generate a harness capture set in C1 and put it in front of the owner before acceptance.

# Unknowns overturned or confirmed

- **Dispatch defect — named files I could not open.** My tool allowlist holds `Read`, `Grep`, and `Glob` and no shell. The brief's § Files to read item 7 instructs `git show <commit>:<path>` for `bebf4d31:.orkestrel/campaign/field-pass-journey-skill.md`, `bebf4d31:.orkestrel/campaign/debrief-verdict.md`, and the commit message of `94200507`. Those are unread. Every claim I make about the field pass and the debrief is carried from the brief's own § Measurements rather than from those files, and the rows K12 and K15 name the brief as their evidence for that reason. The roughnotes readiness verdict was readable from the working tree at `C:/Users/mikes/WebstormProjects/roughnotes/.orkestrel/roughnotes/journey-readiness-verdict.md` and is cited directly.
- **Stale reference found, recorded rather than stopped on.** `ROADMAP.md:17` names `.agents/skills/orkestrel-prove-journey/references/field-testing.md` § fresh state. That file does not exist: the skill's references directory holds `captures.md`, `decide.md`, `layer.md`, `statechart.md`, and `styles.md`. The rule the item invokes has no home in the skill. Row K14 carries it, and S3 either lands the rule in `SKILL.md` § Load authority or restates item 17 against the file that owns it.
- **G1 distillate rows verified against source.** `setup.ts:723-731` (`readMenuSettled` polling `show`/`showing`/`hiding`), `setup.ts:448,535` (the two `Storage` implementations), `setup.ts:637` (`readRefusal`), and `integration.test.ts:208` (`waitForText`) each carry a matrix row, and each was read in the distillate's own table rather than at the source line. I overturned one distillate inference: its note that a published census must handle "the SVG trap" as an addition is confirmed unnecessary at the reader level, because `readClasses` already reads through `classList` for that reason (`test/src/browser/helpers.ts:1551-1572`). `readCensus` therefore earns its place on the population report and the empty-walk refusal alone, not on the SVG handling, and P9's justification is written that way.
- **Confirmed: the statechart contract has no consumer and no harness.** A grep for `StateTransition`, `StateScenario`, and `executeScenario` across every `tests/**/*.ts` in `C:/Users/mikes/WebstormProjects` matches `test/tests/guides.test.ts` and `test/tests/src/core/helpers.test.ts` and nothing else. The `elements` and `veneer` packages the § Limits row at `test/guides/test.md:1389` cites as prior demand have no checkout in this workspace set, so that row's evidence is unverifiable here and X4's ruling rests on the runner's own shape rather than on that row.
- **Confirmed: the consumer's `vite.config.ts` is stale by construction.** `scaffold/src/core/compilers.ts:894-897` declares `ownership: 'content'` for that path, so `audit` compares content and `repair` restores it. G1 and G6 are one defect with one fix.
- **Open: ROADMAP 30's site.** "The local refusal case" and "the stronger vendored proof it duplicates" resolve to no file from the set this brief names. S2 owns the ruling because S2 is the unit that opens the vendored policy set, and its acceptance criterion names the surviving proof and the deleted duplicate. I did not guess which is which.
- **Open: whether a workspace beyond roughnotes adopts the skill this cycle.** The design propagates for the general browser workspace, and § Propagation ruling names what a first adopter supplies. Nothing in the units turns on the answer.
