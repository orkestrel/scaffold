# Design round 1 — subjective lane report (planner, Opus 5, native subagent)

Ran on the superseded `design-brief.md`. Retained unedited as round-1 evidence; the round of record
is round 2 on `design-brief-2.md`. The subagent's transcript file reported zero bytes, so this copy
was written from the returned message by the Orchestrator, with the harness's HTML escaping of `<`
and `>` reversed and nothing else changed.

The lane's own dispatch-defect finding at the end is real: `planner` holds `Read`, `Grep`, and `Glob`
and no command tool, so the `git show` reads the brief directed could not run. The Orchestrator
extracted those records to `tmp/units/retained/` after this report returned.

---

# Design round report — the journey skill, its tools, and what scaffold propagates

## Ruling summary

I held the **subjective lane** (`planner`, Opus 5). The design's spine: each of the three layers leaks work into the consumer, and each leak closes at its own layer.

- The journey layer shipped its **acts** and its **readings** and never shipped its **waits**. Every convergence the skill mandates is hand-rolled today. The wait family is the largest single repair.
- The consumer's closed readiness gaps are not open defects. They are the evidence of what the package owes: each repair produced an instrument the package should have published.
- The statechart family ships a table, a runner, and attribute names, and stops one export short of usable. Publish the **gate reader** — the half that runs outside the page. Refuse a published harness builder: a page cannot import a test package.
- Scaffold owns the bytes of a generated root `vite.config.ts`, so every browser workspace's journey fan-out is drift by construction. Generate it behind a `journey` blueprint axis.
- The skill's reach-past law binds the journey family and leaves the matrix and transport families free. That split is the deepest defect in the skill, and it is what let a style proof drive the store directly.
- Refuse the keyboard verb, refuse the stalled-read `Storage`, refuse a generated harness page, and hold the browser matrix at Chromium with a stated reopening condition.

## Matrix

Every in-scope ROADMAP item and every retained finding named in the brief occupies exactly one row. The `Owner` column names the single unit that carries it.

| Row | Surface | Capability or defect | Evidence site | Ruling | Owner |
| --- | ------- | -------------------- | ------------- | ------ | ----- |
| S1 | Skill | No mutation is named for a journey assertion or a refusal assertion, so neither instrument has failed (ROADMAP 11) | `.agents/skills/orkestrel-prove-journey/SKILL.md:186-203`; `.claude/rules/quality.md` § Instruments | Implement: delete the act for a journey assertion, rename the target for a refusal assertion | U3 |
| S2 | Skill | The `prove` browser limit is pinned to `@orkestrel/probe` 0.0.11 and reads as current (ROADMAP 12) | `references/decide.md:30`; installed 0.0.16 still pins `pool: "threads"` per the brief's measurement | Implement: instruct the reader to read the installed runtime stage's pool and record the version | U3 |
| S3 | Skill | `pressKeys` named a verb the package does not export (ROADMAP 21) | `grep pressKeys` over the skill matches nothing; commit `94200507` | Retain: closed. The recurrence guard is row P4 | U3 |
| S4 | Skill | The reach-past law binds the journey family alone, so the matrix and transport families drive `app.open`, `app.theme`, and `app.dark.value` legally | `SKILL.md:66-92` places the laws under the journey family; G1 distillate § Distillate, defect 2 | Implement: state the reach-past law over every declared family, and give the matrix family a role-first population rule | U3 |
| S5 | Skill | Named reach-past sites the consumer committed: `#site-menu` by id, Bootstrap `show`/`showing`/`hiding`, `document.elementFromPoint` beside a published `readHit`, `element.focus()` instead of `traverseAccessible` | G1 distillate § 2, `setup.ts:724`, `setup.ts:727-729`, `integration.test.ts:218`, `theme.test.ts:57,123,163,214,232` | Implement: name each banned door in `layer.md` with the published verb that replaces it | U3 |
| S6 | Skill | `clickDisclosure` reaches a native `<summary>` alone, so a consumer settles an ARIA disclosure by reading a framework's transition classes | G1 distillate § Distillate, defect 1; `setup.ts:723-731` | Implement: settle through `waitForSettled` and the announced `expanded` state. Refuse a published ARIA-disclosure settle — a settle keyed to one framework's classes is that framework's policy | U3 |
| S7 | Skill | The intent set omits arrival, an unknown route, a miss screen, the document title, and a render error | Field pass, carried in the brief § Questions, item 5 | Implement: name the intents every browser surface owes, and stop before each screen's copy | U3 |
| S8 | Skill | A retained readiness verdict must be re-verified rather than resumed | `SKILL.md:29-30` | Retain: landed, and it is what makes row C1 a re-verification rather than a repair list | — |
| S9 | Skill | ROADMAP 17 directs a re-run against `references/field-testing.md`, a file this skill does not carry | Glob of `.agents/skills/orkestrel-prove-journey/**` returns `SKILL.md`, `agents/openai.yaml`, and `captures.md`, `decide.md`, `layer.md`, `statechart.md`, `styles.md` | Repair the item: restate ROADMAP 17 against the files that exist, or strike it. As written it cannot be executed | U6 |
| S10 | Skill | A bare accessible name answering for more than one reachable element (ROADMAP 34) | `SKILL.md:132-133` already states the skill half; `integration.test.ts:517` routes around the collision | Retain the skill half; the product half is row C2. The skill stops at reporting, per `AGENTS.md` § Design laws → Mechanism, not product policy | — |
| S11 | Skill | The Accept list does not state that the gate renders one engine | `SKILL.md:186-203`; `roughnotes/vite.config.ts:212` declares one instance | Implement: state the engine limit in the Accept list beside the capture and matrix rows | U3 |
| T1 | Test package | A keys-only keyboard verb (ROADMAP 18) | `integration.test.ts` never calls `userEvent.keyboard`; `theme.test.ts` calls it only with `'{Tab}'`, which `traverseAccessible` already owns | Intentionally exclude: no consumer sends a non-Tab sequence anywhere in the fleet, and a wrapper over a declared dependency's own export adds no boundary | U1 |
| T2 | Test package | A text-convergence wait (ROADMAP 19) | `integration.test.ts:208-213`; `setup.ts:688-691`; `SKILL.md:117-119` mandates convergence on every asynchronous fact | Implement `waitForPerception`, region-scoped, so a needle already painted elsewhere cannot satisfy it | U1 |
| T3 | Test package | `readRefusal` against `captureError` (ROADMAP 20) | `setup.ts:637-644`; `test/guides/test.md:1014-1021` states what `captureError` declines | Implement: it translates a thrown value into the message, narrows the thunk to the resolver, and rethrows a non-`Error`. That is the boundary the wrapper rule asks for | U1 |
| T4 | Test package | The shadow-tree boundary is documented on `readHit` alone (ROADMAP 31) | `test/guides/test.md:1445-1448`; `test/src/browser/helpers.ts:96-102` carries no such remark | Implement: state the retargeting on `isRendered` and `isReachable`, and prove each sentence with an executed assertion | U1 |
| T5 | Test package | Failing `Storage` implementations the transport family requires | `setup.ts:448` and `setup.ts:535`; `SKILL.md:149-151` | Implement `createQuotaStorage` and `createDeniedStorage`, each wrapping a caller-supplied store. Intentionally exclude a stalled-read store: `Storage` is synchronous, so a stall is a busy loop. Repair the skill sentence in row S6's unit | U1 |
| T6 | Test package | An animation-settle wait | `setup.ts:354` and `setup.ts:373-381`; `roughnotes/guides/README.md:394-397` states why an unsettled reading is meaningless | Implement `waitForSettled`, bounded, treating an animation that never finishes as a refusal rather than a hang | U1 |
| T7 | Test package | A census reading that reports its population | `setup.ts:910`; `styles.md:66-67` requires the population and the ordinary run cannot enforce it | Implement `readCensus`, returning the elements walked, the tokens found, and the undeclared difference. The expected undeclared set stays the suite's | U1 |
| T8 | Test package | The negative controls the composited-contrast and style-escape instruments need | `setup.ts:842` and `setup.ts:943`; readiness R4 and R6 record both controls as having never failed | Implement `buildComposite` and `buildEscapes`. A control is a property of the reader that publishes it, on the `createHostileValues` precedent in `test/guides/test.md:1370` | U1 |
| T9 | Test package | No published predicate answers for a non-interactive painted population, so a consumer wrote one | `setup.ts:404`; `isReachable` demands `tabIndex >= 0` (`helpers.ts:66`) and `isRendered` reads no geometry (`helpers.ts:96-102`) | Implement `isPainted`, and document the trio: announced, painted, reachable | U1 |
| T10 | Test package | `CaptureVariant` carries `apply`, which Vitest `provide` cannot serialize, so a generated config cannot type its provided variant | `test/src/browser/types.ts:63-75`; `styles.md:33-35`; `roughnotes/vite.config.ts:40-44` redeclares the serializable half | Implement: extract `JourneyVariant` and let `CaptureVariant` extend it | U1 |
| T11 | Test package | `readHit` and `readPerception` have no consumer while a consumer reimplements the hit reading inline | `integration.test.ts:218`; `test/guides/test.md:1381` records `readHit` shipping for exactly this composition | Repair in the consumer; the skill names the door in row S5 | C3 |
| X1 | Statechart | The `StateTransition` declaration has no filled instance to copy (ROADMAP 10) | `references/statechart.md:9-13` | Implement: a worked table on a real entity, with a row for the event that leaves the state unchanged | U3 |
| X2 | Statechart | The `pending` to `idle` boundary is unobservable (ROADMAP 13) | `references/statechart.md:55-59`; `test/src/core/constants.ts:30-46` | Implement: redefine `pending` as the harness before it has mounted a row per declared transition, and `idle` as a mounted inventory standing ready. Both are readable from the tally attributes a gate already reads | U1 and U3 — see § Statechart ruling |
| X3 | Statechart | No harness exists, no `executeScenarios` consumer exists, and no fleet browser entity publishes a state and event vocabulary a harness could render | The brief's measurement; my own search found `StateTransition` only in the package and in vendored guide mirrors; `@orkestrel/browser`'s `BrowserStatus` sits in `src/server` and mounts nothing | Implement the gate reader; intentionally exclude the published harness builder and the generated harness page. See § Statechart ruling | U1 |
| X4 | Statechart | The reason the harness cannot be published is stated nowhere a reader meets it | `references/statechart.md:47-50` states the published set and not the boundary that fixes it | Implement: state it on the `Limits` row and in `statechart.md` | U1 and U3 |
| P1 | Propagation | The per-variant journey fan-out is the consumer's, and the root `vite.config.ts` is content-owned, so the fan-out is drift by design | `src/core/compilers.ts:894-898` declares `ownership: 'content'`; `roughnotes/vite.config.ts:53-58, 364-387` | Implement a `journey` blueprint axis emitting `JOURNEY_VARIANTS`, `appJourney(variant)`, and one project per variant | U2 |
| P2 | Propagation | The generated `tests/setupBrowser.ts` is empty and its paired proof cannot run in a browser (ROADMAP 1) | `src/core/templates.ts:1157`; `src/core/compilers.ts:1185-1194`; `templates.ts:458-470` runs the `setup` project in Node with the browser disabled | Implement: a `setup:browser` project, the generated proof beside the module, and the `setup` project excluding that path | U2 |
| P3 | Propagation | The gate renders Chromium alone | `src/core/templates.ts:216, 341`; `configs/browsers.ts` resolves Chromium layouts only (`templates.ts:806-1070`) | Intentionally exclude widening. Close the row by stating the limit in the emitted `configs/browsers.ts` doc block. Reopen on a recorded reading where a journey or style assertion resolves differently on a second engine | U2 |
| P4 | Propagation | The skill sweep proves file existence, not API existence (ROADMAP 16) | `tests/setupPolicy.ts:889-1144`; nothing there reads a symbol against a package entry | Implement a bounded API reading over fenced imports and table-cell identifiers, with its coverage stated and its blind spot named | U2 |
| P5 | Propagation | A local refusal case duplicates the stronger vendored proof (ROADMAP 30) | `.claude/rules/tests.md:177-179` fixes the vendored set; the exact local site did not resolve from the brief's named files | Implement the placement ruling: a case proving a vendored helper's refusal lives in the vendored `tests/policy.test.ts`, because that is the only copy every target runs. Keep a local case only where it names a discrimination the vendored case cannot stage | U2 |
| P6 | Propagation | `.claude/rules/tests.md` and `.claude/rules/workspace.md` fix the `setup` project as the sole home of every `tests/setup*.test.ts` proof, which is what blocks row P2 | `.claude/rules/tests.md:62-64`; `.claude/rules/workspace.md` § Test project matrix | Implement the rule edit in the same change as P2. A propagation change that leaves the rule stale reports the new project as a policy violation | U2 |
| C1 | Consumer | The readiness verdict's journey, refusal, and style gaps | `roughnotes/.orkestrel/roughnotes/journey-readiness-verdict.md`; `u11-report.md:3` and `u12-report.md:60-99` record them closed | Retain as closed, and re-verify at the current tip under `SKILL.md:29-30` rather than resuming the list. The one condition still open is the visible half of the storage-failure leg: `PermissionStorage` is built and no journey drives it (G1 § 6) | C1 |
| C2 | Consumer | A listing entry and the footer share an accessible name, and a screen action collides with the masthead action (ROADMAP 34) | `integration.test.ts:517` asserts the ambiguity voice rather than resolving it | Implement in the application: distinct names | C2 |
| C3 | Consumer | The consumer's hand-rolled instruments are superseded by the package's new exports | G1 distillate § 1, the rows ruled generic | Repair: delete each superseded helper and adopt the published export. The consumer's `vite.config.ts` fan-out is replaced by the generated one | C3 |

## Contracts

Every declaration lives in `@orkestrel/test`. The types sit in `src/browser/types.ts` unless a note says otherwise; the functions sit in `src/browser/helpers.ts`, the factories in `src/browser/factories.ts`, and the two store classes in `src/browser/storages/`.

The wait family. Each takes the core `WaitOptions` the package already publishes, so a budget, an interval, and a signal reach it the way they reach every other bounded wait.

```ts
/**
 * Polls one named region until its rendered text contains `text`, then returns that text.
 *
 * @param name - The region's accessible name.
 * @param text - The sentence the region must come to carry.
 * @param options - The budget, the interval, and the signal bounding the wait.
 * @returns The region's rendered text at the reading that satisfied the poll.
 * @throws When the region never carries the text inside the budget, naming the region and the text.
 */
export function waitForPerception(
	name: string,
	text: string,
	options?: WaitOptions,
): Promise<string>
```

- Voice: `Named region "<name>" never carried "<text>" within <n>ms`. The region's own refusals reach the caller unchanged, so a hidden or ambiguous region names itself rather than timing out.
- Adopted by `roughnotes/tests/app/browser/integration.test.ts:208` in place of `waitForText`, and by the arrival and miss-screen journeys row S7 adds.
- Region scope is the point. The whole-page form is what produced readiness R3, where a detail journey asserted text the listing already carried.

```ts
/**
 * Waits until every animation running on one element and its descendants has finished.
 *
 * @param element - The element whose animations must settle.
 * @param options - The budget and the signal bounding the wait.
 * @throws When an animation is still running at the end of the budget, naming the element's role and name.
 */
export function waitForSettled(element: Element, options?: WaitOptions): Promise<void>
```

- Voice: `Element "<name>" still animates after <n>ms`. An animation with an infinite iteration count reports through the same voice, because an interface that never settles is a finding rather than a wait to lengthen.
- Adopted by `roughnotes/tests/app/browser/setup.ts:373` in place of `readSettled` and `isRunning`, and by the disclosure settle row S6 substitutes for `readMenuSettled`.

```ts
/**
 * Polls one statechart harness until its status reads a terminal value, then returns the reading.
 *
 * @param element - The harness root carrying the status and tally attributes.
 * @param options - The budget, the interval, and the signal bounding the wait.
 * @returns The terminal reading, tally and failing rows included.
 * @throws When the harness mounted no transition, and when no terminal status arrives inside the budget.
 */
export function waitForStatechart(
	element: Element,
	options?: WaitOptions,
): Promise<StatechartReading>
```

- Voices: `Statechart harness mounted no transition` and `Statechart harness never reached a terminal status within <n>ms`. The empty-harness refusal is the whole reason this ships as a wait rather than as a poll a workspace writes: a harness that mounted nothing passes every tally assertion, which `references/statechart.md:80-81` records and no workspace can be relied on to assert.
- Adopted by the first harness gate any browser workspace writes. It has no consumer today, which § Statechart ruling addresses directly.

The readings.

```ts
/** Reports one statechart harness's status, its tally, and the rows that failed. */
export interface StatechartReading {
	readonly status: StatechartStatus
	readonly passed: number
	readonly failed: number
	readonly total: number
	readonly failures: readonly string[]
}

/**
 * Reads one statechart harness's published attributes.
 *
 * @param element - The harness root.
 * @returns The status, the tally, and the scenario name of every row whose result reads failed.
 * @throws When the element carries no status attribute, and when a tally attribute does not parse.
 */
export function readStatechart(element: Element): StatechartReading
```

- `StatechartStatus` is a new named union in `src/core/types.ts`, so a published signature can name what `STATECHART_STATUSES` holds. Keep the frozen tuple as it stands and add an assertion in the package's own suite comparing the tuple's members against the union, so the two mechanisms can disagree.
- Voices: `Statechart harness carries no "<attribute>" attribute` and `Statechart harness reports a non-numeric "<attribute>"`. Each names the attribute from `STATECHART_ATTRIBUTES` rather than a literal.
- Adopted by the inventory assertion `references/statechart.md:80-81` requires, taken before the run.

```ts
/** Reports one authored-class census: the population it walked and the tokens no stylesheet declares. */
export interface CensusReading {
	readonly elements: number
	readonly tokens: number
	readonly undeclared: readonly string[]
}

/**
 * Reads the class tokens one mounted subtree authors against the tokens the loaded cascade declares.
 *
 * @param root - The mounted subtree to walk.
 * @returns The elements walked, the tokens found, and the undeclared difference in sorted order.
 * @throws When the walk reaches no element at all.
 */
export function readCensus(root: ParentNode): CensusReading
```

- Voice: `Class census walked no element`. That refusal is what `styles.md:66` asks each suite to write and what readiness R5 found missing.
- Adopted by `roughnotes/tests/app/browser/setup.ts:910`, whose local `readCensus` is deleted.

```ts
/**
 * Reads the refusal one interactive target raises, or `undefined` where it resolves.
 *
 * @param name - The target's accessible name.
 * @returns The refusal sentence, or `undefined` where the target resolved.
 * @throws Whatever the resolver threw, where that value is not an `Error`.
 */
export function readRefusal(name: string): string | undefined
export function readRefusal(role: string, name: string): string | undefined
```

- It drives `resolveAccessible`, so it covers the unreachable-after-scrolling voice a reader built on `resolveRendered` can never produce. The scroll is documented, and it is what a person's reach actually does.
- Rethrowing a non-`Error` is the invariant that separates it from `captureError`: the resolver throws `Error` values, so anything else is a layer defect rather than a refusal, and swallowing it into a string hides it.
- Adopted by `roughnotes/tests/app/browser/setup.ts:637`.

```ts
/**
 * Determines whether one element occupies a visible box a reader can see.
 *
 * @param element - The element to judge.
 * @returns True if the element is connected, passes a visibility check honouring opacity, and
 * measures a non-zero box; false otherwise.
 */
export function isPainted(element: Element): boolean
```

- It completes the trio: `isRendered` answers what the accessibility tree presents, `isPainted` what the page paints, `isReachable` what a person can click and tab to. A matrix population of paragraphs and headings fails `isReachable` on `tabIndex` alone, which is why a consumer wrote this.
- Adopted by `roughnotes/tests/app/browser/setup.ts:404`.

The controls. Each returns detached nodes, so the caller decides where they attach — which is what `styles.md:67-68` and `styles.md:79-80` require.

```ts
/** Holds one composited-contrast control: an opaque floor, a foreground that fails, one that clears. */
export interface CompositeFixture {
	readonly base: HTMLElement
	readonly refused: HTMLElement
	readonly accepted: HTMLElement
}

/**
 * Builds the translucent stack whose flat reading and composited reading disagree.
 *
 * @returns The floor and the two foregrounds, detached, for the caller to mount.
 */
export function buildComposite(): CompositeFixture

/** Holds one style-escape control: an inline escape, an embedded escape, and a permitted element. */
export interface EscapeFixture {
	readonly inline: HTMLElement
	readonly embedded: HTMLElement
	readonly permitted: HTMLElement
}

/**
 * Builds the elements a style-escape reading must find and the one it must leave alone.
 *
 * @returns The two escapes and the permitted element, detached, for the caller to mount.
 */
export function buildEscapes(): EscapeFixture
```

- Neither throws. Both are values.
- `buildEscapes` plants no exemption identifier: which stylesheet a workspace permits is that workspace's policy and stays in its suite.
- Adopted by `roughnotes/tests/app/browser/setup.ts:842` and `setup.ts:943`.
- The census control is refused: an undeclared token is `build('div', { classes: 'absent-token' })` and an SVG sibling, which the published `build` already produces. The skill names the SVG element, because a naive census reader misses it and `readClasses` is the reason this one does not.

The transport stores. Each wraps a store the caller supplies, so the package publishes no second in-memory `Storage` and collides with no application's own.

```ts
/** Declares how many writes a quota-limited store accepts, and what it wraps. */
export interface QuotaOptions {
	readonly store: Storage
	readonly writes: number
}

/**
 * Creates a real `Storage` whose quota runs out after a declared number of writes.
 *
 * @param options - The store to wrap and the writes it accepts.
 * @returns A `Storage` refusing every later write the way a full origin does.
 * @throws A `QuotaExceededError` from `setItem` after the declared writes are spent.
 */
export function createQuotaStorage(options: QuotaOptions): Storage

/** Declares which operations a host's storage permission covers, and what it wraps. */
export interface DeniedOptions {
	readonly store: Storage
	readonly reads?: boolean
	readonly writes?: boolean
}

/** Holds a store behind a permission the host can later grant. */
export interface DeniedStorageInterface extends Storage {
	/** Grants the reads and the writes the host withheld, the way a person allowing site data does. */
	permit(): void
}

/**
 * Creates a real `Storage` the host holds behind a permission.
 *
 * @param options - The store to wrap and which operations the permission covers. Default: withheld.
 * @returns A `Storage` refusing each withheld operation, with `permit` to grant them.
 * @throws A `SecurityError` from every operation the permission withholds.
 */
export function createDeniedStorage(options: DeniedOptions): DeniedStorageInterface
```

- Voices: `No room is left for <key>` on the quota refusal and `Access is denied for <detail>` on the permission refusal, matching what Chromium raises, so a journey reads the sentence a real refusal carries.
- Both classes stay interned, matching `createPortfolio` and `createJournal`, and both appear in the package's parity `INTERNAL` list.
- Adopted by `roughnotes/tests/app/browser/setup.ts:448` and `setup.ts:535`.
- A stalled-read store is refused: `Storage` is synchronous, so the only stall available is a busy loop, which `AGENTS.md` bars. The skill's sentence at `SKILL.md:149-151` moves the stall onto the asynchronous store contract that can carry it.

The variant split.

```ts
/** Represents one theme-and-viewport pair, in the form a project configuration can serialize. */
export interface JourneyVariant {
	readonly name: string
	readonly width: number
	readonly height: number
}

/** Adds the document change a capture run applies before the viewport is resized. */
export interface CaptureVariant extends JourneyVariant {
	readonly apply?: () => void
}
```

- This is the change that lets a generated configuration and a consumer's test agree by type instead of by convention. The configuration provides `readonly JourneyVariant[]`; the test composes each `apply` locally, which `styles.md:33-35` already requires and no type expressed.
- It deletes `roughnotes/vite.config.ts:40-44`.

The scaffold contracts.

```ts
/** Selects the per-variant journey fan-out for a generated browser workspace. */
export interface Blueprint {
	// existing members unchanged
	readonly journey: boolean
}
```

```ts
// Emitted into a journey workspace's root vite.config.ts.
export const JOURNEY_VARIANTS: readonly JourneyVariant[]
export function appJourney(variant: JourneyVariant): UserConfig
```

- `appJourney` names the project `journey:<variant>`, includes the browser environment's `integration.test.ts` alone, clears the browser project's exclusion, and provides `variant`, `variants`, and `capture` on the one channel. `capture` arrives through `provide` rather than through `import.meta.env`, so the whole axis has one door and a test reads no environment record.
- `JourneyVariant` is imported from `@orkestrel/test`, which a journey workspace already declares. The generated file declares no second variant type.

## Statechart ruling

**Publish the gate reader. Keep the harness page in the application. Pay the instruction debt.**

The boundary decides it. A harness is a page a person watches and deep-links, so it ships in `app/browser`. `@orkestrel/test` is a development dependency, `src/browser` imports `vitest/browser` at module scope, and an application importing it pulls the test runner into the shipped bundle. So a published harness **builder** is unreachable for the thing it would build, whatever its shape. `references/statechart.md:16-18` already records the sibling half of this — a page cannot import from `tests/` — and the general rule is stated nowhere a reader meets it. Row X4 fixes that.

What each option costs:

- **A published harness builder that mounts framework-free markup and exposes `run`.** Refused. It cannot be imported by the code that must render it. Building it anyway means a workspace mounts the harness from a test file, which makes the deep link `decide.md:64-68` promises impossible, and the harness's whole purpose is that a person can open it.
- **A published gate reader.** Ships. It runs in the browser project, outside the page, which is inside the boundary. It is the half every workspace writes identically, and it is where the silent failure lives: a harness that mounted nothing satisfies every tally assertion. A published reader that refuses a zero-total harness closes that by construction, which is the invariant the superfluous-wrapper rule asks for.
- **A scaffold-generated harness page.** Refused. The harness renders the application's own entity — its states, its events, its widget. Generating it is generating product, against `AGENTS.md` § Design laws → Mechanism, not product policy, and an empty generated harness is a template TODO the policy sweep bars.
- **A worked example alone.** Insufficient, and owed regardless. Row X1.

**ROADMAP 10 — the worked example.** `statechart.md` gets a filled table on an entity that publishes a real state union and a real event union, with a row for the event that leaves the state unchanged, and a `name` naming the door each row used. Write it against a disclosure, matching the guide's own fence at `test/guides/test.md:1880-1913`, so a reader meets one vocabulary in both places.

**ROADMAP 13 — the `pending` to `idle` trigger.** The published meaning makes the boundary unobservable, because "before a run has a result for every row" also describes a run in flight, which `running` already names. Redefine against what a gate can read:

- `pending` — the harness has not yet mounted a row per declared transition. Observable as a total that reads below the table's length, zero included.
- `idle` — the inventory is mounted and no run is in flight. Observable as a total equal to the table's length with the passed and failed tallies both reading zero.

That makes `pending` the state the inventory assertion fails on, so the empty-harness hole and the unobservable boundary close with one definition. The tuple's members do not move, so no value changes; the doc block in `test/src/core/constants.ts:30-46`, the guide, and `statechart.md:55-59` do. No consumer exists to break, which makes this the cheapest moment in the package's life to correct the semantics — and the reason to do it now rather than after the first harness ships.

**On the missing consumer.** The family has no harness and no `executeScenarios` caller anywhere outside the package's own suite, and I found no fleet browser entity that could render one. That is not evidence the family is wrong; the readiness verdict's refutation shows why a surface can meet the trigger in appearance and not in form. It is evidence that the family's cost must stay at the gate reader and the instructions, and that no scaffold axis, no generated page, and no further published shape is owed until a real entity appears. Record the reopening condition: a fleet package publishing a browser entity with its own state and event unions.

## Propagation ruling

**Generate the fan-out.** The consumer did not choose to hand-roll it. `src/core/compilers.ts:894-898` declares the root `vite.config.ts` as `ownership: 'content'`, so scaffold owns its bytes, `scaffold audit` reports the consumer's fan-out as drift forever, and a `repair` over the `configs` group deletes it. Every browser workspace that adopts the skill inherits that trap. A `journey` boolean on `Blueprint` joins `bin`, `setup`, `guides`, `integration`, `conformance`, `service`, `global`, and `showcase`, which is the vocabulary the axis already speaks. The emitted block sits in the root `vite.config.ts` beside the other factories, because `.claude/rules/workspace.md` § Configuration authority caps the permitted leaves under `configs/` at `helpers.ts`, `browsers.ts`, and `policy.ts` — so no `configs/journeys.ts` may exist. Obliges: a `Blueprint` member, a `CONFIG_TEMPLATES.root.vite` addition, a `blueprintToMachinery` selection, and the generated file's own config proof.

**Give the generated browser setup module a proof that runs in a browser (ROADMAP 1).** Two things block it today and each must move in one change. `ARTIFACT_TEMPLATES.tests.setup` is the empty string at `templates.ts:1157`, and the `setup` project runs `tests/setup*.test.ts` in Node with the browser disabled at `templates.ts:458-470`. The repair is a `setup:browser` project running `tests/setupBrowser.test.ts` in the browser, the `setup` project excluding that exact path, and a generated proof shaped like `ARTIFACT_TEMPLATES.tests.entry` — asserting the module's exports rather than inventing content. Obliges: a template moves, a project is added, a script is added to the `test` chain, and `.claude/rules/tests.md` and `.claude/rules/workspace.md` § Test project matrix both move in the same change, because each fixes the `setup` project as the sole home of every root setup proof and would otherwise report the new project as a violation.

**Hold the browser matrix at Chromium.** `configs/browsers.ts` resolves Chromium executable layouts specifically, so a wider matrix means resolving each additional engine's layout, installing it in every target and in every environment that runs the gate, and multiplying every browser suite's wall time. Against that stands a real capability gap: computed styles, role computation, focus order, and hit testing are exactly where engines differ. `.claude/rules/quality.md` § Production hardening settles it — grade the matrix on coverage of applicable seams, not on polishing one seam past its row. No reading in this repository records a journey or style assertion resolving differently on a second engine, so widening is speculation that every target pays for. Close the row by **stating the limit** in the emitted `configs/browsers.ts` doc block and in the skill's Accept list, and name the reopening condition: one recorded divergence. Obliges: a template moves and a vendored skill file moves.

**Prove that an API a skill names exists (ROADMAP 16).** `inspectSkill` reads backticked paths and checks each resolves; nothing reads a symbol against a package entry, which is how `pressKeys` survived. Match the instrument to the question and bound it:

- **Fenced imports.** Every `import { … } from '<specifier>'` inside a fenced block in a skill file names only identifiers that specifier's installed entry exports.
- **Table-cell identifiers.** Every backticked identifier inside a Markdown table cell in a skill file resolves against the union of the entries those fenced specifiers name. That is where the dangling verbs actually live — `layer.md` carries its whole vocabulary in tables.
- **Stated coverage.** An identifier in a prose sentence outside a table and outside a fence is unreached. State that beside the rule rather than implying completeness, per `.claude/rules/quality.md` § Instruments.
- **The negative control.** A planted table cell naming a symbol the entry does not export, drawn from outside the population the reading covers.

One constraint governs the implementation: the sweep runs in Node in the `policy` project, and `@orkestrel/test/browser` imports `vitest/browser` at module scope, so importing that entry throws. The reading takes the installed declaration file the package's `exports` map names and collects its exported names. Obliges: `tests/setupPolicy.ts` and `tests/policy.test.ts` move, both vendored, so a scaffold bump, a publish, and a `repair` visit to every target.

**Rule the vendored placement (ROADMAP 30).** A case proving a vendored helper's refusal belongs in the vendored `tests/policy.test.ts`, because that file ships with the helper and is the only copy every target runs. Keep a local case in the scaffold checkout only where it names a discrimination the vendored case cannot stage. This binds the ROADMAP 16 work directly: the new sweep's refusals need one home before they are written, not after.

## Skill instructions

Each lesson is carried by one instruction, and each instruction names its file.

**One reach-past law over every family.** `SKILL.md` places the journey laws under the journey family, so a matrix or transport proof that drives `app.open`, `app.theme`, or reads `app.dark.value` breaks no stated rule. Lift the law to bind every declared family, and give the matrix family the door it genuinely needs: a style reading takes an element, so the family must select a population, and the resolver refuses a selector. **The sanctioned door is the accessible tree** — role and name, the vocabulary a journey already speaks. A declared selector is admitted only where the population carries no role, and that declaration sits in the setup module with the reason written beside it. That single rule is what stops `#main p:not(.text-body-secondary)` from reading as ordinary practice.

**The banned doors, named.** In `layer.md`, name each door and the published verb that replaces it: an element resolved by id or class; a class-list read standing in for a settle; `document.elementFromPoint` where `readHit` ships; `element.focus()` where `traverseAccessible` ships; a read of an application store or a route method where `readPerception`, `readValue`, and `readStates` ship. Each has a committed site in the consumer, so the rule is written against evidence rather than against imagination.

**The disclosure settle.** `clickDisclosure` reaches a native `<summary>` alone, which is why a consumer polled Bootstrap's `show`, `showing`, and `hiding`. Refuse a published ARIA-disclosure settle — a settle keyed to one framework's transition classes teaches the test package that framework. Instruct instead: settle a disclosure with `waitForSettled` on its own element, and assert the `expanded` state `readStates` reads. That is framework-free, it is what the interface announces, and it gives the new wait its second consumer.

**The mutation each assertion class owes (ROADMAP 11).** In `SKILL.md`, beside the Accept list:

- **A journey assertion.** Delete the act the journey performs — the click, the keystroke, the submit — and confirm the assertion reddens. That proves the assertion binds the act rather than the state the surface was already in. It is the mutation that would have caught readiness R3.
- **A refusal assertion.** Rename the target to a name the surface does render and confirm the asserted voice changes. That proves the assertion binds one exact voice rather than the fact that something threw. It is the mutation that would have caught readiness R2.

Each is one line, reversible, and drawn from outside the population the assertion covers.

**The `prove` limit against the installed version (ROADMAP 12).** Replace the pin in `decide.md` with the reading: before routing a rendered question to `prove`, read the installed `@orkestrel/probe` runtime stage's pool and the project lookup it performs, and record the version read beside the routing decision. The limit holds at 0.0.16, and a pin dates a limitation the reader meets as current.

**The intents every surface owes.** In `SKILL.md` → Derive journeys from intents, name the intents no surface escapes: arrival at the entry route, a route the application does not know, a search or filter matching nothing, the document title following the route, and a render error reaching the person. Name the intents and stop before the copy — what each screen says is product policy the skill has no business fixing.

**The accessible-name collision (ROADMAP 34).** The skill already reports a colliding bare name as a surface finding and targets by role or region until the surface is fixed. That is the correct stopping line: a duplicate accessible name is an accessibility defect in the product, and the skill supplies the mechanism that finds it. The repair is the application's, and it is unit C2.

**The engine limit.** State in the Accept list that the gate renders one engine, and that a claim about a second engine is unproven until a reading records it. A skill whose acceptance list reads as complete while resting on one engine overstates what the run established.

**What stays out.** The `pressKeys` verb, an ARIA-disclosure settle, a stalled-read `Storage`, and any instruction naming a framework's class list. Each is either a wrapper over a declared dependency, one framework's policy, or a shape the underlying interface cannot carry.

## Units

One writer per checkout, ordered by the release shape: the test package publishes, scaffold re-pins and carries the skill edits, the consumer adopts last.

| Unit | Role and engine | Owns | Depends on | Acceptance criterion |
| ---- | --------------- | ---- | ---------- | -------------------- |
| U1 | `sol` on GPT-5.6 Sol | `test/src/browser/types.ts`, `test/src/browser/helpers.ts`, `test/src/browser/factories.ts`, `test/src/browser/storages/**`, `test/src/browser/index.ts`, `test/src/core/types.ts`, `test/src/core/constants.ts`, `test/guides/test.md`, `test/tests/**` | — | `npm run check` and `npm run test:guides` green in the test checkout, and the guide's Surface table holds a row for each added export with its executed fence asserting the value the fence claims. The Limits table holds a ruling row for each refused candidate — the keyboard verb, the stalled-read store, the census control builder, the harness builder — each naming its evidence |
| U2 | `sol` on GPT-5.6 Sol | `scaffold/src/core/types.ts`, `scaffold/src/core/templates.ts`, `scaffold/src/core/compilers.ts`, `scaffold/tests/setupPolicy.ts`, `scaffold/tests/policy.test.ts`, `scaffold/tests/config.test.ts`, `scaffold/host.json`, `scaffold/.claude/rules/tests.md`, `scaffold/.claude/rules/workspace.md`, `scaffold/guides/scaffold.md` | U1 for `JourneyVariant` | A generated journey workspace's `vite.config.ts` registers one project per declared variant and `scaffold audit` reports no drift against it; the generated `tests/setupBrowser.test.ts` runs in the `setup:browser` project and the `setup` project does not collect it; the skill API reading fails on a planted table cell naming an unexported symbol and passes with it removed; `npm run check` and `npm run test:policy` green |
| U3 | `opus` on Opus 5 | `scaffold/.agents/skills/orkestrel-prove-journey/SKILL.md` and every file under its `references/` | U1 for the exports it names, U2 for the sweep that checks it | Every verb, reader, wait, and builder the skill names resolves in the installed `@orkestrel/test` entry, proven by U2's reading rather than by inspection; `npm run test:policy` green; the reach-past law binds every declared family and the matrix family's role-first population rule is stated |
| U4 | `verifier` on the cheap native tier | Nothing | U1, U2, U3 | The gate chain green in the scaffold checkout, read bare, with the actual output recorded |
| U5 | Orchestrator | The release chain | U4 | `@orkestrel/test` publishes, scaffold re-pins and refreshes the vendored mirror, scaffold publishes, each target re-pins and runs `repair` |
| U6 | `builder` on the cheap native tier | `scaffold/ROADMAP.md` | U1, U2, U3 | Each in-scope item is struck where closed, restated where its subject moved, and item 17 no longer names a file the skill does not carry |
| C1 | `opus` on Opus 5, roughnotes checkout | `roughnotes/tests/app/browser/integration.test.ts` | U5 | Each readiness ruling this run's acceptance depends on is re-taken at the current tip with the commit named, and the storage-failure leg's visible half — the sentence a person reads and the control that clears it — is driven by a journey |
| C2 | `application` on the cheap native tier, roughnotes checkout | `roughnotes/app/browser/**` | — | The listing entry and the footer carry distinct accessible names, and the screen action is distinguishable from the masthead action; the ambiguity assertion at `integration.test.ts:517` is replaced by one that resolves the target |
| C3 | `opus` on Opus 5, roughnotes checkout | `roughnotes/tests/app/browser/setup.ts`, `roughnotes/vite.config.ts`, `roughnotes/guides/README.md` | U5, C1, C2 | No helper the package now publishes remains declared locally; the hand-rolled fan-out and `JourneyVariant` are gone and the generated ones are in use; `scaffold audit` reports no drift on `vite.config.ts`; the browser gate green at each declared variant |

C1, C2, and C3 own overlapping files in one checkout and run serially in that order.

**Exit criterion.** The campaign ends when each of these capabilities is implemented, repaired, retained, or intentionally excluded on recorded evidence, and the gates are green:

- the journey layer's wait family, refusal reader, painted predicate, census reading, negative-control builders, and failing stores published, documented, and proven;
- the statechart gate reader published, the `pending` boundary observable, the worked table written, and the page boundary stated;
- the journey fan-out generated behind a blueprint axis, with a generated workspace reporting no drift;
- the generated browser setup module carrying a proof that runs in a browser, with the rule files moved in the same change;
- the skill API reading landed in the vendored sweep with its coverage and its blind spot stated;
- the skill's reach-past law binding every family, its named bans written, its mutations named, its `prove` limit read from the installed version, its intent set complete, and its engine limit stated;
- the browser matrix held at one engine with the limit stated and the reopening condition recorded;
- the consumer adopting every published export, its name collisions resolved, and its storage-failure journey driven;
- `ROADMAP.md` reconciled against what landed.

## Risks

- **The export set is large enough to read as speculation.** Each addition names a consumer site, and each closes a gap a readiness pass already found. The risk is that reviewers read the aggregate rather than the rows. **Settle it early:** before U1 starts, list each proposed export beside the exact `roughnotes` site it deletes, and drop any export whose site turns out to be one suite's policy. An export with no deletion is not owed.
- **`waitForPerception` may over-narrow.** Scoping to a named region is what kills the readiness R3 class, and a surface whose outcome sentence sits outside every named region cannot use it. **Settle it:** run the consumer's arrival, miss-screen, and detail journeys against a region-scoped wait and count the journeys that cannot express their outcome. If a real intent has no region, the design owes a whole-page form beside it, not instead of it.
- **`readRefusal` driving `resolveAccessible` mutates the page during a read.** The scroll is what makes the unreachable-after-scrolling voice reachable, and it also means a refusal read changes scroll position mid-journey. **Settle it:** drive one refusal family with each resolver and compare the voices produced and the scroll positions left. If the scroll changes a later assertion's reading, the reader takes `resolveRendered` and the scrolling voice stays the caller's.
- **The `setup:browser` project may collide with the rule that fixes one home for setup proofs.** The rule edit and the template move must land together, and a target that repairs before re-pinning gets a project its rule files do not admit. **Settle it:** generate a workspace with the axis on, run its `test:policy` and `test:setup` before the rule edit, and read what fails. The failure list is the rule edit's scope.
- **The skill API reading's blind spot is the population where the original defect lived.** `pressKeys` appeared in prose. Fenced imports and table cells cover the vocabulary tables, and a verb named only in a sentence is unreached. **Settle it:** run the reading against the skill as it stood at the commit before `94200507` and confirm it reports `pressKeys`. If it does not, the membership rule is wrong and the table-cell population must widen before the sweep ships.
- **Redefining `pending` moves a published meaning with no consumer to break — and with no consumer to prove it either.** The definition is settled by argument rather than by a harness. **Settle it:** write the harness gate's inventory assertion against a fixture harness that mounts no row, and confirm it reads `pending` and fails. That fixture is the regression guard and the proof of the definition in one artifact.
- **Holding at one engine is the row most likely to be wrong.** Contrast composition, focus chrome, and hit testing are where engines diverge, and the design's evidence for the exclusion is the absence of a reading rather than a reading. **Settle it cheaply:** run the consumer's matrix family once against a second engine in a throwaway probe, off the gate. A divergence reopens row P3 immediately; no divergence makes the exclusion evidenced rather than assumed.

## Unknowns overturned or confirmed

- **A fleet browser entity with a real state and event vocabulary: confirmed absent.** `StateTransition`, `StateScenario`, `executeScenario`, `executeScenarios`, and `STATECHART_ATTRIBUTES` appear under `C:/Users/mikes/WebstormProjects` only in `@orkestrel/test`'s own source and suite, in `ROADMAP.md`, in the skill, in the campaign artifacts, and in each package's vendored `guides/test.md` mirror. `@orkestrel/browser` publishes `BrowserStatus` and `BrowserEventMap`, and both sit in `src/server` driving a remote browser over CDP, so nothing there mounts in a page. The `elements` and `veneer` packages the Limits table names as the prior consumers of the transition pair have no checkout on this host, so their evidence could not be re-read. The design assumes no renderable entity exists and names the reopening condition.
- **The readiness verdict's gaps: confirmed closed, which overturns the brief's framing of them as outstanding.** `u11-report.md:3` records R1, R2, R3, R8, R9, and R10 closed and R7 built; `u12-report.md:60-99` records R4, R5, and R6 addressed. I verified the instruments exist in `roughnotes/tests/app/browser/setup.ts` — `QuotaStorage` at 448, `PermissionStorage` at 535, `readCensus` at 910, `buildCompositeStack` at 842, `buildEscapeFixtures` at 943. That changes the matrix's shape: the retained findings are the evidence of what the package owes, not a repair list. Row C1 carries the one condition still open — the G1 distillate reports `PermissionStorage` driven by no journey in the named files.
- **The G1 distillate: adopted, with corrections.** Its `isPainted` row overlaps `isRendered`/`isReachable`, and I overturned the overlap: `isRendered` reads no geometry (`test/src/browser/helpers.ts:96-102`) and `isReachable` demands `tabIndex >= 0` (`helpers.ts:66`), so neither answers for a non-interactive painted population and the consumer's predicate fills a real gap. Its `readCensus` row names an SVG trap; I overturned the implied reader defect — `readClasses` reads `classList` and already counts an SVG element (`helpers.ts:1544-1572`), so the SVG element is the control rather than a repair. Its `QuotaStorage`/`PermissionStorage` rows note both wrap `createMemoryStorage`; I verified that helper is roughnotes' production fallback (`app/browser/controllers/ApplicationController.ts:87`), not test infrastructure, which is why the published factories take the backing store from the caller.
- **ROADMAP 17 names a file that does not exist.** `.agents/skills/orkestrel-prove-journey/references/field-testing.md` is absent; the skill carries `captures.md`, `decide.md`, `layer.md`, `statechart.md`, and `styles.md`. The item cannot be executed as written. Row S9 carries the restatement.
- **ROADMAP 30's exact site did not resolve** from the brief's named files. A search of `scaffold/tests` for the duplicated local refusal case returned nothing conclusive. Row P5 states the placement ruling, which binds regardless of which case it lands on, and names the site as the unit's first reading.
- **Dispatch defect.** The brief's § Context, item 7 directs me to read four retained records through `git show <commit>:<path>`. My tool allowlist holds `Read`, `Grep`, and `Glob` and no command tool, so the field pass at `bebf4d31:.orkestrel/campaign/field-pass-journey-skill.md`, the debrief verdict at `bebf4d31:.orkestrel/campaign/debrief-verdict.md`, and the commit message of `94200507` were unreachable — none survives in the working tree, which `d6ef2689` pruned. The readiness verdict at `roughnotes/.orkestrel/roughnotes/journey-readiness-verdict.md` was readable from the tree and I read it. Every finding the brief attributes to the unreachable records is carried on a matrix row from the brief's own restatement of it, and rows S1, S3, S4, S7, and S8 rest on that restatement rather than on the source. Supply those files as text to the lane that needs them re-read, or send the round to a lane that holds a command tool.
