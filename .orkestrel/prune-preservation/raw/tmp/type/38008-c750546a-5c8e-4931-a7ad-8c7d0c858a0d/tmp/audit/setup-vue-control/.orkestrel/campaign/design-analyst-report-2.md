## Ruling summary

Publish bounded, reusable mechanisms with named consumer adoptions.
Retain native keyboard input and the existing refusal-capture primitive.
Keep synchronous storage faults separate from asynchronous transport stalls.
Repair the browser import rule explicitly if browser waits reuse core machinery.
Retain the statechart runner; supply an executable, test-only worked harness before publishing another abstraction.
Generate journey projects from recoverable configuration so `repair` preserves them.
Partition setup proofs by runtime and prove actual discovery.
Keep product decisions in the consuming application.
This report is a source-based design proposal; no browser suite or mutation proof ran.

## Matrix

Evidence paths use `S` for scaffold, `T` for the test package, and `R` for roughnotes. Roadmap identifiers refer to `S/ROADMAP.md`; readiness identifiers refer to the retained `43f9429` verdict.

| Surface | Capability and carried finding | Evidence | Closure | Disposition |
|---|---|---|---|---|
| Test package | Dependency documentation; stale Contract rule 9 | `T/package.json`; `T/guides/test.md:1143,1388`; runtime imports from contract | State the actual contract dependency and the prohibition on foreign public signature types. Remove the stale empty-dependencies explanations in Contract rules 10 and 13 too. | **repair** |
| Test package | Keys-only keyboard verb; Roadmap 18 | `R/tests/app/browser/styles/theme.test.ts:56,97,156,211,226`; skill `layer.md` | Reject `pressKeys(keys: string): Promise<void>` as a rename-only wrapper over `userEvent.keyboard`. Retain the native keys-only call and test its consumers through actual focus and keyboard outcomes. | **intentionally exclude** |
| Skill | Dangling keyboard instruction; Roadmap 21 | Commit `94200507`; skill `layer.md` and `statechart.md` | Retain the correction to `userEvent.keyboard`; reconcile the roadmap entry as closed. | **retain** |
| Test package | Text convergence; Roadmap 19 | `R/tests/app/browser/integration.test.ts:208`; `T/src/core/helpers.ts:160` | Publish a host-independent text wait that accepts a reader, adds explicit text-matching semantics, and uses the existing bounded wait. Adopt it at the consumer’s text waits. | **implement** |
| Test package | Refusal reader; Roadmap 20; readiness R2 | `R/tests/app/browser/setup.ts:637,743,767`; installed core `captureError` declaration | Use `captureError(() => resolveRendered(...))`, narrow the thrown value, and assert its exact message. Remove the local message-flattening wrapper. Preserve exact hidden-control refusals. | **intentionally exclude** |
| Test package | Configurable synchronous storage faults; readiness R7 | `R/tests/app/browser/setup.ts:448,535`; integration test at `1066`; controller test at `188`; helper test at `71` | Publish an inert `Storage` fixture covering refused reads, refused writes, and exhausted accepted-write allowance. Adopt it in the actual transport, controller, and helper consumers. | **implement** |
| Test package | Stalled or asynchronously failing reads | Native `Storage` signatures; consumer fixtures implement synchronous `Storage` | Exclude stalls from the `Storage` fixture. Teach asynchronous stores to accept their own interface-faithful fixtures, using native deferred promises where needed. Do not block the browser thread to simulate latency. | **intentionally exclude** |
| Test package | Animation settlement | `R/tests/app/browser/setup.ts:373`; integration test at `944` | Publish a bounded animation wait. A never-settling animation must time out; cancellation, abort, replacement, and cleanup must be proved. Keep contrast measurement separate. | **implement** |
| Test package | Browser access to shared wait machinery | `T/guides/test.md:1183`; browser source imports; core wait family | Amend Contract rule 13 to permit same-package core imports for shared mechanisms. Preserve the bans on Node, framework imports, environment-variable policy, and foreign signature types. Prove the packed browser graph. | **repair** |
| Test package | Announced-state convergence; readiness R8 and R9 | `R/tests/app/browser/setup.ts:652,723`; `R/app/browser/App.vue:123`; `readStates` | Publish a role-and-name state wait with diagnostic observations. Adopt it for pressed-state convergence. Replace menu class polling with observable disclosure/dialog outcomes; the menu trigger lacks an authored `aria-expanded` binding, so do not assume one exists. | **implement** |
| Test package | Class census with explicit population; readiness R5 | `R/tests/app/browser/setup.ts:910`; `T/src/browser/helpers.ts:1566` | Publish a read-only census that reports the walked elements, class tokens, and undeclared tokens. Include an element root consistently. Keep negative-control insertion outside the reader. | **implement** |
| Test package | Composite-contrast fixture; readiness R4 | `R/tests/app/browser/setup.ts:842,870`; skill `styles.md` | Retain a local fixture composed with `build`. Preserve the rival flat reading and controls that distinguish it from compositing. Do not publish the application’s contrast thresholds or chosen color stack. | **retain** |
| Test package | SVG and style-escape fixtures; readiness R6 | `R/tests/app/browser/setup.ts:802,943`; `extractStyles` contract | Keep local fixtures built with native SVG creation and `build`. Test inline styles, style elements, and a permitted document stylesheet through their respective extraction paths. | **intentionally exclude** |
| Test package | Shadow-tree documentation; Roadmap 31 | `T/src/browser/helpers.ts:58,96,161`; guide Contract rule 16 | Document each predicate’s actual shadow boundary. Do not copy `readHit`’s document-level hit-test explanation onto predicates that perform no hit test. Add real shadow-root examples supporting the wording. | **repair** |
| Statechart | Existing transition table and runner | `T/src/core/types.ts:224`; core runner tests; brief’s fleet measurement | Keep the public core contracts and serial runner. Preserve row naming, cause identity, and fail-fast behavior. | **retain** |
| Statechart | Published harness builder, gate reader, or generated application page | No qualifying fleet consumer in the supplied measurement; `T/guides/test.md` Limits and browser module-load boundary | Exclude publication and unconditional page generation. A package-owned test fixture is not evidence of an application consumer. Supply an executable example without expanding the public API. | **intentionally exclude** |
| Statechart | Worked declaration; Roadmap 10 | Skill `statechart.md`; `T/guides/test.md:1872` | Add a filled transition table and an executable test-only harness example. Transcribe and execute the example in Browser Mode. | **implement** |
| Statechart | Observable readiness; Roadmap 13 | Skill `statechart.md`; `T/src/core/constants.ts:31` | Define `pending` as incomplete harness initialization and `idle` as completed initialization with controls enabled. Repair the conflicting “before every row has a result” wording. | **repair** |
| Skill | Assertion mutations; Roadmap 11 | Skill acceptance instructions; quality Instruments rule | Specify an omitted-action mutation for a journey and a changed-reachability mutation for a refusal. Require the named assertion to fail after collection succeeds. | **implement** |
| Skill | Installed probe capability; Roadmap 12 | Skill `decide.md`; brief’s installed probe measurement | Replace the historical version pin with an installed-version check and a bounded capability reproduction. Keep rendered questions on the real browser route while the limitation holds. | **repair** |
| Skill | Clean field pass; Roadmap 17; debrief Field-1 | `bebf4d31` field pass and debrief | Repeat the field pass without retained verdicts. Challenge the trigger with a qualifying entity and with view-local state that does not qualify. | **repair** |
| Skill | Retained verdict treatment; debrief Field-2 | `SKILL.md`, Load authority | Keep the instruction to re-verify retained rulings against the tip. Make conditional families conditional in the acceptance list too. | **retain** |
| Skill | Keyboard reachability; readiness R1 | Retained readiness verdict; consumer traversal sites | Preserve surface-specific forward-Tab proofs. Replace programmatic focus wherever a test claims user reachability or journey-derived focus chrome. | **repair** |
| Skill | Reach-past operations and duplicate readings | `R/tests/app/browser/integration.test.ts:218,976,987,1053,1084,1091`; theme tests | Use `readHit`; drive route and theme changes through controls in journey-derived matrices. Keep storage inspection and public entity corroboration inside transport or unit proofs, beside visible assertions. | **repair** |
| Skill | Accessible-name collisions; Roadmap 34 | Consumer ambiguity assertion at `integration.test.ts:517`; skill target rule | Repair unrelated controls sharing an ambiguous name. Retain role/region qualification for legitimate repeated controls. Update the consumer assertions and captures. | **repair** |
| Skill | Arrival and replacement assertions; readiness R3 | Retained verdict; consumer comments and detail journeys | Require a destination-specific observation and disappearance of replaced content. A text needle already present before navigation cannot establish arrival. | **repair** |
| Skill | Capture placement; readiness R10 | `captures.md`; consumer `place` calls and membership proofs | Retain immediate placement after the state assertion, independent always-on placement membership, and capture-run file verification. | **retain** |
| Skill | Unknown-route, missing-detail, document-title, and render-error coverage | `bebf4d31` field-pass product findings | Require applicable journeys and explicit expected outcomes from the product guide. Test the shipped entry where the claim concerns startup or error handling. Record missing behavior as a product finding. | **implement** |
| Skill | Shipping policy: metadata, external destinations, truthful form acceptance, privacy, and branded fixture data | `bebf4d31` field-pass findings | Carry these as consumer-owned product decisions. The skill inventories and reports them; it does not prescribe canonical URLs, legal text, remote checks in ordinary tests, or whether the fixture product may ship. | **intentionally exclude** |
| Scaffold | Journey variant fan-out | `R/vite.config.ts:53,364`; `S/src/core/templates.ts:314`; compiler’s content ownership | Generate recoverable variant configuration, `JOURNEY_VARIANTS`, `appJourney`, provided values, scripts, and capture flag handling. Exclude the journey file from the ordinary browser project. | **implement** |
| Scaffold | Setup proof runtime; Roadmap 1 | `S/src/core/templates.ts:458,1157`; `compilers.ts:1180`; workspace/test rules | Partition setup proofs into Node and browser projects. Preserve sibling proof discovery and birth-owned setup content. Prove actual generated execution rather than adding an empty passing test. | **implement** |
| Scaffold | Browser engine selection | Generated `configs/browsers.ts` template; consumer Chromium instance | Add recoverable engine selection and engine-specific provider options. Retain Chromium as the default; declared Firefox/WebKit runs must execute or fail readiness explicitly. | **implement** |
| Scaffold | Skill API existence; Roadmap 16; debrief O5 | `S/tests/setupPolicy.ts:889,964`; policy skill tests | Add explicit API bindings and compiler-backed public-entry validation. Cover prose instructions and executable fences; do not import the browser entry into Node to inspect it. | **implement** |
| Scaffold | Duplicate local configuration refusal; Roadmap 30 | `S/tests/src/core/compilers.test.ts:3071`; `S/tests/config.test.ts:395` | Keep the stronger vendored proof as the owner. Retain generated-output coverage only where it exercises a distinct emitted configuration. Remove duplicate checkout-only coverage after proving that distinction. | **repair** |
| Scaffold | Other retained process findings | Debrief O1–O4, O6–O7, F1–F11; Roadmap’s separate process work | Preserve their owning process campaign. Do not reopen orchestration, charter, retention, or unrelated Bootstrap work in this capability campaign. | **intentionally exclude** |

## Contracts

These declarations define the proposed public changes. Implementations remain in the centralized files and class files required by the repository. Existing exports are reused directly.

The text wait belongs in `T/src/core/helpers.ts`, with its options in `T/src/core/types.ts`.

```ts
export interface TextWaitOptions extends WaitOptions {
	readonly exact?: boolean
}

export declare function waitForText(
	description: string,
	read: () => string,
	text: string,
	options?: TextWaitOptions,
): Promise<string>
```

`exact: true` requires equality; omission requires containment. Return the observed matching string without normalizing it again. Reject an empty expected string with `Text expectation must not be empty`, because containment of an empty string is vacuous.

Reuse `waitForCondition`, including its bound-validation messages, timeout voice, and abort-reason identity. Propagate reader failures unchanged. The narrower matching contract and returned observation distinguish this helper from a renamed general wait.

Adopt it at `R/tests/app/browser/integration.test.ts:208` and `setup.ts:688`, passing `readPage` or a named-region reader. Replacement assertions still require the old text to disappear.

The announced-state wait belongs in `T/src/browser/helpers.ts`.

```ts
export declare function waitForStates(
	role: string,
	name: string,
	states: readonly string[],
	options?: WaitOptions,
): Promise<readonly string[]>
```

Resolve the control afresh on each observation and read it through `readStates`. Require every supplied state to be present; preserve additional announced states. Reject an empty expectation with `Announced state expectation must not be empty`.

Preserve the resolver’s exact absent, unreachable, and ambiguous voices. A timeout names the role, accessible name, expected states, and last observation. Abort preserves the supplied reason. This helper requires the explicit browser-to-core boundary amendment.

Adopt it in the consumer’s pressed-state assertions. Do not use it to infer animation completion or to read a control that the interface legitimately hides while a dialog is open.

The animation wait belongs in `T/src/browser/helpers.ts`, with its options in browser `types.ts`.

```ts
export interface AnimationWaitOptions {
	readonly budget?: number
	readonly signal?: AbortSignal
}

export declare function waitForAnimations(
	element: Element,
	options?: AnimationWaitOptions,
): Promise<void>
```

The scope is the element’s own animations, matching the demonstrated consumer. Include pending playback as unsettled. Re-read after completion or cancellation so a replacement animation cannot escape the wait. Do not claim that settlement prevents a later interaction from starting another animation.

Reuse the core event-wait boundary for deadline and abort handling. Observe completion and cancellation instead of continuously polling the animation set. Reject a detached subject with `Animation subject is not connected`; timeout must identify the subject and the budget. Cancellation triggers reassessment rather than an unhandled rejection.

Adopt it before `readSurface` in the consumer’s `readSettled` composition and in the theme suite’s animation waits. The existing loop checks its deadline only outside an awaited `Promise.allSettled`, so its stated budget does not independently bound a promise that never settles.

The storage fixture belongs in the browser environment. Its contract uses the native `Storage` interface deliberately.

```ts
export interface StorageFixtureOptions {
	readonly values?: Readonly<Record<string, string>>
	readonly reads?: boolean
	readonly writes?: boolean
	readonly quota?: number
}

export interface StorageFixtureInterface extends Storage {
	permit(): void
}

export declare class StorageFixture implements StorageFixtureInterface {
	constructor(options?: StorageFixtureOptions)

	readonly length: number

	clear(): void
	getItem(key: string): string | null
	key(index: number): string | null
	removeItem(key: string): void
	setItem(key: string, value: string): void
	permit(): void
}
```

Place the interfaces in browser `types.ts` and the class in `StorageFixture.ts`.

Reads and writes default to permitted. Refused reads cover `length`, `key`, and `getItem`; refused writes cover `clear`, `removeItem`, and `setItem`. Throw native `DOMException` values named `SecurityError`, with the established consumer message `Access is denied for <detail>`.

`quota` is an accepted-`setItem` allowance, not a simulation of browser byte accounting. Exhaustion throws `QuotaExceededError` with `No room is left for <key>`. Reads remain available, and removal does not consume the allowance. `permit()` removes permission refusals without replenishing the quota. Reject a non-finite, negative, or fractional allowance with `Storage quota must be a non-negative integer`.

Seeded values are copied. The fixture does not patch `window.localStorage`, dispatch storage events, or simulate application persistence logic.

Adopt it in the quota journey, the controller’s denied-read proof, and the helper proof that calls `permit()`. These are actual consumers of the proposed behavior.

The census belongs in browser `helpers.ts`, with its result in browser `types.ts`.

```ts
export interface ClassCensus {
	readonly population: readonly Element[]
	readonly classes: ReadonlySet<string>
	readonly undeclared: ReadonlySet<string>
}

export declare function readCensus(root: ParentNode): ClassCensus
```

Return snapshots of membership. Include `root` when it is an element, followed by its descendants. Reuse `readClasses` and `readCascade`; do not introduce another CSS parser.

The result reports declaration membership against readable loaded stylesheets. It does not prove that a declaration wins, that an unreadable stylesheet contains nothing, or that an unreached conditional state was inspected. The consumer must reject an unexpectedly empty population and name those coverage limits.

The helper adds no assertion or refusal voice. Adopt it in `R/tests/app/browser/setup.ts:910` and the matrix’s per-screen reporting. Insert controls separately, read them through the same extractor, remove them in `finally`, and keep their membership out of production reports.

Scaffold’s recoverable configuration belongs in `S/src/core/types.ts`. The following declarations replace the boolean setup fact and add the journey and browser selections; they are changes to the existing `Blueprint`, not another competing interface.

```ts
export type SetupRuntime = 'node' | 'browser'

export type BrowserEngine = 'chromium' | 'firefox' | 'webkit'

export interface JourneyVariant {
	readonly name: string
	readonly width: number
	readonly height: number
}

export interface JourneyConfiguration {
	readonly variants: readonly JourneyVariant[]
}

export interface Blueprint {
	readonly setup: readonly SetupRuntime[]
	readonly journey: JourneyConfiguration | undefined
	readonly browsers: readonly BrowserEngine[]
}
```

Preserve the other existing `Blueprint` members. Update its factory, validation, serialization, readers, compiler, guide, and every consumer together.

Store user-selected journey variants and browser engines in a documented JSON-serializable configuration region of the birth-owned manifest. Target-reading commands must recover that region before regenerating `vite.config.ts`. Derive setup runtimes from exact sibling proof paths, not manifest claims.

Reject malformed variants, duplicate variant names, unsupported engines, and journey selection without its browser application and proof. Use scaffold’s existing validation/question mechanism rather than inventing a parallel error system.

The generated root configuration exposes this factory.

```ts
export declare const JOURNEY_VARIANTS: readonly JourneyVariant[]

export declare function appJourney(variant: JourneyVariant): UserConfig
```

`JourneyVariant` is the serialized configuration shape; `UserConfig` is Vite’s existing type. These generated configuration declarations are not exports of `@orkestrel/test`.

No public harness builder, gate reader, keyboard alias, refusal reader, gradient policy, or negative-control fixture factory is proposed.

## Statechart ruling

Retain the runner in core and implement a worked, executable harness in test infrastructure. Exclude a published harness builder until a qualifying application consumes it.

The supplied fleet measurement establishes no such consumer. Inventing entity unions in roughnotes would violate the real-domain-state rule. The package’s existing runner tests remain legitimate tests of an existing capability; they do not establish demand for a broader public harness API.

A standalone application page also cannot import `@orkestrel/test/browser`: that entry imports `vitest/browser` at module initialization and only loads in Browser Mode. A callback parameter supplying the runner would address the runner dependency, but would not remove this runtime restriction.

If a later consumer establishes demand, keep the runner in core and let the test-hosted harness compose it through the amended same-package import rule. Do not move the host-independent runner into browser or duplicate it. Name an entity’s primary operation `execute`, following the lifecycle vocabulary, rather than adding `run`.

Give `statechart.md` a concrete declaration grounded in a native disclosure’s actual states and activation event. The following table is an instructional fixture, not a reason to impose a statechart family on roughnotes.

```ts
import type { StateTransition } from '@orkestrel/test'

export const DISCLOSURE_TRANSITIONS: readonly StateTransition<
	'closed' | 'open',
	'toggle'
>[] = Object.freeze([
	{
		name: 'pointer opens the closed disclosure',
		from: 'closed',
		event: 'toggle',
		to: 'open',
	},
	{
		name: 'pointer closes the open disclosure',
		from: 'open',
		event: 'toggle',
		to: 'closed',
	},
])
```

The executable companion mounts real `<details>` markup, arranges each starting condition through interaction, activates the named summary with `clickDisclosure`, and asserts visible content and its disappearance. It uses `StateScenario` and `executeScenario`; it does not manufacture a second runner.

The watched fixture must demonstrate these observable conditions:

- Mount with `pending`.
- Attach the rows, controls, status announcer, and real subject; finish initialization; then enable the controls and publish `idle`.
- Publish `running` when a play action begins.
- Publish a terminal result only after the selected execution has finished.
- Write every attribute through `STATECHART_ATTRIBUTES`.
- Disable overlapping activation and preserve row names when an assertion fails.
- Keep unexecuted rows distinguishable from passed rows after fail-fast termination.
- Clean up the mounted subject and subscriptions after a successful or failed run.

A play-all gate checks the expected row names before clicking, then waits for terminal status. It rejects missing rows, duplicate row names, malformed tallies, a failed row, or a passed tally inconsistent with the complete table. Tally equality alone is insufficient.

The example can demonstrate a test-hosted watched run without promising an application route or deep link. Deep-link and post-run demonstration behavior remain conditional instructions for a workspace that actually owns such a harness.

## Propagation ruling

Generate the journey fan-out. The consumer’s `journey` factory shows why ordinary configuration merging is insufficient: it replaces the test block because array concatenation would retain the ordinary include and the exclusion of the journey file.

Generate `appJourney(variant)` by composing `appBrowser`, then explicitly replacing the journey-specific include, exclusion, project name, provided values, and viewport configuration. Provide serializable `variant` and `variants` values. Keep executable theme application inside browser tests.

Do not infer themes from a package name or silently prescribe light and dark themes for every application. The adopter supplies variant names, dimensions, and the browser-side mapping from each variant to the application’s controls. Generate `JOURNEY_VARIANTS` from recoverable input so `audit` and `repair` reproduce it.

Read the capture flag in root configuration and provide a boolean to tests. The test package continues to receive `PortfolioOptions.enabled`; it reads no environment variable. Keep ordinary registry and placement proofs enabled without capture.

Run the matrix for the project’s selected variant. The aggregate project run proves variant membership. This replaces the consumer’s repeated all-variant matrix inside each variant project. Preserve the distinct ordinary-run placement proof and capture-run disk proof.

Partition setup proofs by runtime. Keep generic and server setup proofs in Node. Collect `tests/setupBrowser.test.ts` and browser-dependent style setup proofs in Browser Mode, excluding them from Node. Update the workspace and testing rules in the same change because they prescribe the existing single Node setup project.

Do not generate a vacuous proof for the empty setup seed. Generate runtime wiring and prove it using a materialized consumer with actual setup behavior. For roughnotes, write the sibling proof against the CSS/bootstrap setup it owns. Preserve that birth-owned module during repair.

Add browser engine selection without promising engines that did not run. Chromium remains the default. An explicitly selected engine must fail readiness when its executable is unavailable; silently dropping it would falsify the declared matrix. Keep Chromium channel and executable discovery confined to Chromium. Do not pass Chrome/Edge options into Firefox or WebKit.

Keep captures in engine-specific directories if the same variant runs under different engines. This prevents matching variant filenames from overwriting evidence from another engine without changing the capture package’s variant contract.

Implement the API-existence sweep using explicit package-and-symbol bindings in the skill’s existing Markdown files. Associate instructed calls with those bindings and compile import/member-access probes against installed public declarations using TypeScript’s resolver. Validate type imports as types and callable values as values. A namespace object existing does not establish that an instructed member exists.

The Node policy sweep must not execute a browser entry. Browser runtime resolution belongs in a real Browser Mode proof. A missing applicable dependency must produce an explicit unmet prerequisite; an unrelated propagated skill must not force a core-only workspace to install browser dependencies.

The publication consequences differ by artifact:

- Journey factories, browser-engine handling, and setup routing change generated template bytes in scaffold’s published implementation.
- Skill files, governing rules, mirrored guides, and policy proofs change vendored bytes.
- `configs/browsers.ts` is generated from `CONFIG_TEMPLATES.browsers`; `blueprintToConfigArtifacts` marks it `origin: 'template'`. It is not a byte-identical host file merely because consumers receive it.
- Journey configuration, browser selection, and setup runtime partitioning change the blueprint contract and target inference.

Publish the test package’s changed surface first. Under the supplied release baseline, that means preparing `0.0.17`, subject to checking registry state at release time. Scaffold then re-pins, refreshes the guide mirror from its owner, incorporates the skill and propagation changes, and publishes. Targets re-pin and repair afterward. A development dependency update alone does not require every target to publish.

## Skill instructions

Keep instructions at the point where an executor needs them.

In `layer.md`, retain the distinction between interaction and reading. A selector may define a measured style population; it must not choose the target of a journey action. Do not adopt G1’s blanket prohibition on selectors for readers.

Replace the consumer’s inline center-hit computation with `readHit`. Preserve its documented limits: it reports the bounding-box center, not the provider’s chosen click point and not a complete reachability verdict.

In `styles.md`, require trusted input whenever the matrix claims the state a person can reach. Replace `app.open`, `app.theme`, and `element.focus()` in those proofs with navigation, theme controls, and keyboard traversal. Isolated cascade fixtures may set their own attributes to establish a measurement condition, but their result must not be reported as application reachability.

In the transport section, permit real storage inspection and public entity state as corroboration. Require convergent rendered state alongside it. The consumer’s `app.dark.value` readings follow visible theme checks in several places; that is not the same defect as using an entity flag instead of any visible assertion. Remove redundant readings where they add nothing, and fix the immediate restored-light assertion to converge.

Replace menu settling through `#site-menu` and Bootstrap classes with named visible outcomes, actual announced state, and animation settlement where needed. An announced state and finished animation are different observations. A helper cannot supply an `aria-expanded` contract the application does not expose.

Do not demand an error sentence and retry button for every storage failure. Where the product intentionally keeps the theme working for the session while persistence fails silently, prove that behavior and the subsequent restart result. Require error and recovery journeys when the product actually exposes them.

Add these mutation instructions beside the assertion guidance:

- For a journey arrival assertion, omit the navigation or activation while preserving valid imports and test collection. The destination-specific assertion must fail.
- For a refusal assertion, make the refused control reachable without changing its role or accessible name. The exact refusal assertion must fail. Also replace a hidden control with absence when the claim specifically distinguishes those conditions.
- Restore each mutation and rerun the same named proof. Record what failed; a collection error or unrelated failure does not validate the assertion.

In `decide.md`, instruct the executor to inspect and reproduce the installed probe limitation. Do not replace the old version pin with another pin. Record whether the browser case was actually collected and executed before interpreting any refusal.

Keep the accessible-name collision rule precise. Distinguish unrelated destinations sharing an ambiguous label from legitimate repeated actions identified by region, and from tabs deliberately sharing a label with their panel. Repair the roughnotes collisions named by the roadmap rather than treating qualification as permanent closure.

Add entry coverage to the intent inventory: initial arrival, direct route entry, unknown route, missing entity, document title, and render failure where the product supports those states. The product guide supplies the expected outcome. The skill must not invent a redirect, title scheme, recovery screen, privacy statement, or shipping decision.

## Units

The following ownership is serial within each checkout. Before each writing dispatch, resolve the exact files against the accepted baseline and include the applicable package-hardening or application workflow.

| Unit | Role and engine | Owned files | Dependency and independently checkable acceptance |
|---|---|---|---|
| Test mechanisms | `sol` — GPT-5.6 Sol | `T/src/core/{types,helpers}.ts`; browser types, helpers, `StorageFixture.ts`, and barrel; mirrored tests; `T/guides/test.md`; guide/distribution proofs | Establish types first. Record red/green consumer-shaped proofs. Prove storage protocol behavior, bounded waits, abort cleanup, census membership, and packed browser imports. Change the browser import rule explicitly. |
| Statechart example and bounds | `opus` — Claude Opus 5 | Test package’s statechart TSDoc, guide example, browser setup fixture and sibling proof, browser integration proof | Runs after test mechanisms because guide and setup files overlap. Execute the table and watched harness; mutate a row outcome and the ready transition. Preserve the existing runner’s behavior. |
| Scaffold configuration | `sol` — GPT-5.6 Sol | `S/src/core` types, factories, validators, readers, compilers, and templates; relevant server target reader; generated-consumer fixtures; configuration and distribution proofs; `guides/scaffold.md` | After test-package acceptance and staged package availability. A materialized browser workspace runs each intended project, survives repair, and reports aligned generated configuration. Core-only generation stays free of browser dependencies. |
| Policy and proof ownership | `sol` — GPT-5.6 Sol | `S/tests/setupPolicy.ts`, policy tests and helper proofs, `tests/config.test.ts`, local compiler refusal case, governing documentation/workspace/test rules | Serial after configuration. A missing export and missing namespace member fail public-entry validation. Valid type-only imports pass. The stronger configuration refusal proof remains active in generated consumers. |
| Journey instructions | `opus` — Claude Opus 5 | Journey `SKILL.md`, its named references, provider bridge metadata where required, roadmap dispositions, refreshed guide mirror | After tool contracts settle. Instructions name actual public exports, retain conditional family scope, and include executable examples and mutations. No copied coding law or version catalog enters the skill. |
| Consumer adoption | `sol` — GPT-5.6 Sol | `R/tests/app/browser/setup.ts`, integration and theme tests, affected setup/helper/controller proofs, `tests/setupBrowser.test.ts`, manifest configuration, guide; generated configuration through repair | After scaffold staging or publication. Remove duplicate mechanisms, preserve transport behavior, eliminate journey reach-past actions, and produce variant-specific evidence. |
| Consumer semantics | `opus` — Claude Opus 5 | Roughnotes accessible-name sources and corresponding tests/captures; entry-coverage expectations in its guide | Serial with consumer adoption. Repair named collisions. Add applicable entry journeys against explicit product expectations; return unresolved product-policy decisions without inventing them. |
| Clean field pass | `grok` — Cursor Grok, with the prescribed field-testing tiers | Read-only clean subjects; returned field evidence | After skill and consumer acceptance candidates exist. Prior verdicts are absent. The resulting plans derive family applicability and use installed APIs. |
| Independent audit | `analyst` — GPT-5.6 Sol; `reviewer` — Claude Opus 5 | Read-only accepted diffs, claims, captures, and executable attacks | Run the required lanes against the same claims, including an engine that did not write the subject. Audit behavioral claims with host-executed attacks rather than source agreement alone. |
| Verification and release | `verifier` — Terra; Orchestrator for mutations and publication | Gate logs; package inventories; registry and repair evidence | Run the required gate chain, packed installs, browser proofs, and declared host checks. Release test before scaffold, then repair targets. Record unavailable engines and hosts as unproved. |

The exit criterion is closure of the matrix: admitted mechanisms are published and adopted; excluded abstractions remain absent with recorded reasons; setup and journey configuration survive generation and repair; skill APIs resolve; the executable statechart example and clean trigger field pass succeed; consumer journeys and captures establish their declared scope; independent audits and required gates close.

Product-policy exclusions do not establish that roughnotes is approved to ship.

## Risks

- **A wait can claim a deadline while awaiting an unbounded promise.** Exercise an infinite animation and abort during settlement. The helper must reject within its declared bound and release its listeners.
- **Core reuse can change the browser bundle’s dependency graph.** Install the packed package in a generated browser consumer, import the browser entry there, and inspect emitted imports and declarations.
- **Announced state can precede finished motion.** Drive a real transition and observe announced state, animation settlement, and final visible content separately.
- **A text wait can pass before the action.** Omit the action and require the same arrival assertion to fail. Keep the replacement-negative assertion.
- **A storage fixture can become a behavioral substitute for the application.** Prove the native synchronous interface independently, then drive the real application through it. Keep quota accounting explicitly limited to accepted writes.
- **A census can report its controls as production coverage.** Read the production population separately from injected controls and prove root/SVG membership.
- **Generated projects can duplicate or omit a suite.** Inspect resolved project discovery and run every selected project directly. Mutate the ordinary project exclusion and require a discovery proof to fail.
- **Browser selection can reuse Chromium-only launch options.** Resolve and launch each declared engine independently. Refuse an unavailable engine rather than removing it from the run.
- **API validation can prove a registry rather than the instructions.** Plant a dangling call in prose and in a fence, remove its binding, and rename a namespace member. Each must be reported by the applicable check.
- **Statechart success can be vacuous.** Remove a row, leave initialization pending, and fail an assertion. The gate must distinguish inventory failure, timeout, and named transition failure.
- **Field evidence can inherit its answer.** Verify the clean subject’s artifact inventory before dispatch and retain the exact prompt and baseline.
- **Release propagation can restore an older configuration.** Audit, repair, and re-audit a consumer carrying the declared variants, engines, and authored setup content.

## Unknowns overturned or confirmed

G1’s blanket selector prohibition is overturned. The package explicitly permits element-taking readers, and style population selection is not an interaction target.

G1’s suggested `isPainted` promotion is rejected. Its consumer deliberately measures visible marks that may be `aria-hidden`; that differs from `isRendered`, while its geometry and computed-style reads already have native primitives. Keep the product population predicate local.

The animation-budget claim needs repair. Source inspection shows an unbounded awaited completion set inside a deadline loop. Its actual timeout behavior still requires the host proof described earlier.

Permission storage has real consumers outside the journey file: the controller and helper suites. Its admission is supported by those sites, not by hypothetical adoption.

The menu trigger does not author `aria-expanded`. The proposed announced-state helper therefore cannot replace its Bootstrap class checks mechanically.

The browser configuration file is generated from a template. Its absence from scaffold’s own `configs` directory is consistent with scaffold’s selected environments; the emitted consumer file and compiler establish its location and ownership.

The local refusal case is identifiable: the compiler suite’s Vitest invocation-record check duplicates the subject of the vendored configuration proof, whose control is stronger.

The statechart applicability verdict remains provisional until the clean field pass. The retained pass explicitly reports contamination.

Adoption beyond roughnotes remains unknown. Another adopter must supply its actual root mount, intent and refusal inventory, variant-to-theme mapping, expected product outcomes, and any genuine entity state/event vocabulary.