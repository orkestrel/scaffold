# Unit U1 test-additions — report

The contract, the constants, the two runners, and the two markup readers are implemented, tested,
documented, and green on every gate the unit owns. Two `test:guides` cases fail, both inside
off-limits files, and this report carries the exact patches that close them.

Two decisions need the Orchestrator's ruling before integration: the runner names, and the README
and guide readings I corrected beyond the change's own blast radius. Both are stated under
Deviations.

## Exports added, by file

`src/core/types.ts`

- `StateTransition<TState extends string, TEvent extends string>` — `readonly name`, `from`,
  `event`, `to`. The brief's shape, unchanged.
- `StateScenario<TState extends string, TEvent extends string, TContext>` — `readonly transition`
  plus the `arrange`, `act`, and `assert` method members, each `(context, part) => Promise<void> | void`.
  Method syntax makes it a behavioral interface, so it acquired a `## Methods` group in the guide.

`src/core/constants.ts` (new file; `src/core/index.ts` gained `export * from './constants.js'`)

- `STATECHART_ATTRIBUTES` — frozen, keys `status`, `passed`, `failed`, `total`, `scenario`,
  `result`, `state`, values the matching `data-statechart-*` names. Left unannotated, so its type is
  `Readonly<{ status: string; … }>` and a consumer reading `STATECHART_ATTRIBUTES.staus` fails to
  typecheck. A `Record<string, string>` annotation would have accepted that typo.
- `STATECHART_STATUSES` — `Object.freeze([...] as const)`, so the type is the tuple
  `readonly ['pending', 'idle', 'running', 'passed', 'failed']` and
  `(typeof STATECHART_STATUSES)[number]` is the status union a harness and its gate share.

`src/core/helpers.ts`

- `executeScenario(scenario, context): Promise<void>` — awaits `arrange(context, from)`,
  `act(context, event)`, `assert(context, to)` in that order. A throw from any phase is rethrown as
  `Error` whose message is `` `${transition.name}: ${message}` `` and whose `cause` is the original
  value by identity. An `Error` contributes its own message; anything else is named by its type,
  `threw a non-error object value`, and still arrives as the `cause`.
- `executeScenarios(scenarios, build): Promise<void>` — walks the table in written order, awaiting
  `build(scenario)` and then `executeScenario`. Serial, and it stops at the first failing row.

`src/browser/helpers.ts`

- `readClasses(root: ParentNode): ReadonlySet<string>` — the root's own `classList` tokens when the
  root is an `Element`, then every descendant's, in document order of first sighting.
- `extractEscapes(root: ParentNode): readonly string[]` — the `outerHTML` of every element carrying
  a `style` attribute with a non-whitespace value and of every element whose `localName` is
  `style`, root included, in document order, each reported once.

## Tests and the control each carries

`tests/src/core/helpers.test.ts`, project `src:core`. The fixture is a real `Disclosure` entity
(`closed`/`open`, `show`/`hide`) with the scenarios at module scope, so each phase reads its subject
from its own parameters. `act` is asynchronous on purpose: an unawaited phase leaves the entity in
its arranged state, so every happy path reddens if the runner stops awaiting.

- `drives arrange, act, and assert in order, each against its own part of the transition`
- `arranges the from state before the event is applied`
- `names the failing row and keeps the assertion it failed on as the cause` — **the control**, drawn
  from outside the passing table: `MISMATCHED_SCENARIOS` is the same entity and the same three
  phases with a `to` state the event cannot reach. Nothing about the row is malformed, so only the
  assertion can catch it. It asserts the message opens with `show leaves it closed: ` and the
  `cause` is the assertion error.
- `names a non-error throw by its type and hands the value back as the cause` — the second control:
  a phase throwing a frozen record rather than an `Error`, asserted by identity on `cause`.
- `drives every row in written order, each against a context of its own`
- `builds each context for the row it is about to drive, and awaits a promised one`
- `stops at the first failing row and never starts the rows after it`

`tests/src/browser/helpers.test.ts`, project `src:browser`, real Chromium.

- `readClasses`: `collects the root own classes and every descendant class in document order`;
  `reads an SVG class through classList rather than through className` (asserts
  `typeof chart.className !== 'string'`, which is why `classList` is the reader);
  `contributes only its descendants when the root is not an element` (a `DocumentFragment`);
  `reports an empty set for markup carrying no class at all` — **the control**;
  `leaves a class no loaded stylesheet declares in the difference against the cascade` — the second
  control, drawn from outside the reader's own population by differencing against `readCascade()`.
- `extractEscapes`: `reports an inline style attribute and a style element in document order`;
  `reports the root itself when the root carries an inline style`;
  `reports an inline style on an SVG path`;
  `reports a style element carrying an inline attribute once`;
  `reads past a style attribute holding nothing but whitespace`;
  `sweeps the descendants alone when the root is not an element`;
  `reports nothing for markup with no style attribute and no style element` — **the control**:
  markup carrying classes and a `data-*` attribute and nothing else.
- `separates the classes the cascade declares from the markup that styles itself` — the routed
  carrier for the new browser guide fence, opening with its
  `// guides/test.md → Patterns → "Read the classes and escapes the markup carries"` marker.

## Guide sections added

`guides/test.md`

- § Surface → Core → Types: rows for `StateTransition` and `StateScenario`.
- § Surface → Core → **new** `#### Constants` subsection: `STATECHART_ATTRIBUTES` and
  `STATECHART_STATUSES`, with the paragraph stating which attribute belongs on the harness root,
  which on a row, and which pair a gate waits for.
- § Surface → Core → Helpers: rows for `executeScenario` and `executeScenarios`.
- § Surface → Browser → Helpers: rows for `readClasses` and `extractEscapes`.
- § Methods: **new** `#### \`StateScenario\`` group covering `arrange`, `act`, and `assert`. Required
  rather than optional: the brief's method syntax makes the interface behavioral, and
  `tests/guides.test.ts` demands a group for every behavioral interface.
- § Limits: one new candidate row, `A statechart transition table and its runner` — `Ships`, citing
  the field-identical declarations in `elements` and `veneer` and ruling that the published runner is
  the walking form because a package helper registers no test.
- § Patterns: **new** `### Drive a statechart table` (core cluster, before `Read a source inventory`)
  with the table fence, the failing-row fence, and the harness-attributes fence; **new**
  `### Read the classes and escapes the markup carries` (browser cluster, before
  `Remove an IndexedDB database`) with the classes-and-escapes fence.
- § Patterns → `Read a source inventory`: the four key listings now include `src/core/constants.ts`.
  The change made them false.
- § Tests: the entries for `tests/src/core/helpers.test.ts` and `tests/src/browser/helpers.test.ts`
  name every new case and its control.

`README.md`

- The core paragraph names the statechart contract; the browser paragraph names the two readers.
- The `readInventory` examples now report what the walker actually returns. See Deviations.

## Gate output

Run in this checkout, in order, after the final edit.

```text
$ npm run format:check
Checking formatting...
All matched files use the correct format.
Finished in 1051ms on 59 files using 16 threads.

$ npm run lint:check
(no output; exit 0)

$ npm run check
tsc --noEmit --project tsconfig.json && npm run check:src
check:src:core, check:src:browser, check:src:server — all silent, exit 0

$ npm run test:src:core
 Test Files  3 passed (3)
      Tests  98 passed (98)

$ npm run test:src:browser
 Test Files  2 passed (2)
      Tests  221 passed (221)

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  111 passed (111)

$ npm run test:setup
 Test Files  3 passed (3)
      Tests  24 passed (24)

$ npm run test:guides
 FAIL  |guides| tests/guides.test.ts > guide fences > carries every fence-bearing guide heading in exactly one place
 FAIL  |guides| tests/guides.test.ts > guide fences > keys a walk root-relative, takes a named file whatever the filter says, and excludes below a directory
 Test Files  1 failed (1)
      Tests  2 failed | 35 passed | 1 skipped (38)
```

The `src:core` project reports 98 cases and the `src:browser` project 221, with the new cases named
under Tests and the control each carries. I did not run either project against the baseline commit,
so no before-and-after pair is claimed.

### Observations, not criteria

```text
$ npm run build
✓ built in 1.79s   (core, browser, and server bundles and declarations all emitted)
dist/src/core/index.d.ts carries executeScenario, executeScenarios, StateTransition,
StateScenario, STATECHART_ATTRIBUTES, and STATECHART_STATUSES.

$ npm test
src   projects: 455 passed | 9 skipped (464)
policy:         111 passed (111)
config:          46 passed (46)
setup:           24 passed (24)
guides:           2 failed | 35 passed | 1 skipped (38)
```

The whole-suite reading is this unit's own, taken under its own exec. The authoritative run is the
Orchestrator's.

## The two `test:guides` failures, and the patches that close them

Both live in files this brief put off-limits. Nothing in the owned set can close either.

**Failure 1** — `carries every fence-bearing guide heading in exactly one place`:

```text
AssertionError: expected [ 'Drive a statechart table', …(1) ] to deeply equal []
+ [ "Drive a statechart table", "Read the classes and escapes the markup carries" ]
```

`tests/guides.test.ts` discovers every `###` heading with a fence under it and requires each to be
either transcribed there or routed in `ROUTED_FENCES` in `tests/setup.ts`. A new Patterns fence
therefore cannot be added without writing one of those files. The brief's criterion 4 asks for the
fences and its scope grants neither file.

The browser heading routes to the owned carrier, which is already written and green in
`tests/src/browser/helpers.test.ts` with its marker line; only the registration is missing. The core
heading is transcribed, per the placement rule stated in `tests/guides.test.ts`: the guides project
runs in Node and can run that fence, so it belongs there rather than routed away.

**Failure 2** — `keys a walk root-relative, …`: the transcription of the `Read a source inventory`
fence asserts the `src/core` key list, and `src/core/constants.ts` is a new key.

### Patch A — `tests/setup.ts`

```diff
 	'Read the tokens and colors a theme declares': 'tests/src/browser/helpers.test.ts',
 	'Find a rule in the cascade': 'tests/src/browser/helpers.test.ts',
+	'Read the classes and escapes the markup carries': 'tests/src/browser/helpers.test.ts',
 	'Remove an IndexedDB database': 'tests/src/browser/helpers.test.ts',
 	'Record a browser journal': 'tests/src/browser/factories.test.ts',
```

### Patch B — `tests/guides.test.ts`, hunk 1 (type import, line 2)

```diff
-import type { EventSourceInterface } from '@src/core'
+import type { EventSourceInterface, StateScenario } from '@src/core'
```

### Patch B — hunk 2 (value import from `@src/core`)

```diff
 	createTeardown,
+	executeScenarios,
 	flattenHeaders,
```

```diff
 	roundTripJSON,
+	STATECHART_ATTRIBUTES,
+	STATECHART_STATUSES,
 	waitForAbort,
```

Both positions are the case-insensitive alphabetical slots the file already uses.

### Patch B — hunk 3 (module-scope fixture, inserted after `parseSchema` and before `describe('guides parity', …)`)

```ts
// The "Drive a statechart table" fence drives a disclosure that is closed until something shows it.
// This is that entity, in the fence's own shape.
type DisclosureState = 'closed' | 'open'

type DisclosureEvent = 'show' | 'hide'

interface DisclosureContext {
	readonly disclosure: Disclosure
}

class Disclosure {
	#state: DisclosureState = 'closed'

	get state(): DisclosureState {
		return this.#state
	}

	show(): void {
		this.#state = 'open'
	}

	hide(): void {
		this.#state = 'closed'
	}
}

function arrangeDisclosure(context: DisclosureContext, state: DisclosureState): void {
	if (state === 'open') context.disclosure.show()
}

function actOnDisclosure(context: DisclosureContext, event: DisclosureEvent): void {
	if (event === 'show') context.disclosure.show()
	else context.disclosure.hide()
}

function assertDisclosure(context: DisclosureContext, state: DisclosureState): void {
	expect(context.disclosure.state).toBe(state)
}

const DISCLOSURE_SCENARIOS: ReadonlyArray<
	StateScenario<DisclosureState, DisclosureEvent, DisclosureContext>
> = [
	{
		transition: { name: 'closed opens on show', from: 'closed', event: 'show', to: 'open' },
		arrange: arrangeDisclosure,
		act: actOnDisclosure,
		assert: assertDisclosure,
	},
]

const MISMATCHED_SCENARIOS: ReadonlyArray<
	StateScenario<DisclosureState, DisclosureEvent, DisclosureContext>
> = [
	{
		transition: { name: 'show leaves it closed', from: 'closed', event: 'show', to: 'closed' },
		arrange: arrangeDisclosure,
		act: actOnDisclosure,
		assert: assertDisclosure,
	},
]
```

### Patch B — hunk 4 (the transcription, inside `describe('guide fences', …)`, between the `Prove a wire fixpoint` case and the `Read a source inventory` case)

```ts
	// guides/test.md → Patterns → "Drive a statechart table".
	it('walks the table and opens a failing row message with that row name', async () => {
		await executeScenarios(DISCLOSURE_SCENARIOS, () => ({ disclosure: new Disclosure() }))

		const thrown = await executeScenarios(MISMATCHED_SCENARIOS, () => ({
			disclosure: new Disclosure(),
		})).catch((error: unknown) => error)

		const failure = requireValue(thrown instanceof Error ? thrown : undefined)
		expect(
			failure.message.startsWith("show leaves it closed: expected 'open' to be 'closed'"),
		).toBe(true)
		expect(failure.cause).toBeInstanceOf(Error)

		expect(STATECHART_ATTRIBUTES.status).toBe('data-statechart-status')
		expect(STATECHART_ATTRIBUTES.scenario).toBe('data-statechart-scenario')
		expect(STATECHART_STATUSES[0]).toBe('pending')
		expect(STATECHART_STATUSES.includes('running')).toBe(true)
	})
```

Hunks 3 and 4 are not written from reading. They ran green as a throwaway probe under `tmp/probe/`
through the `probe` project, in the same Node environment the `guides` project uses, and they are
`oxfmt --check` clean in that form. The probe is deleted; `tmp/probe/` is empty. The full assertion
message the run produced is
`show leaves it closed: expected 'open' to be 'closed' // Object.is equality`, which is why the
assertion is a `startsWith` and why the guide fence prints the prefix.

### Patch B — hunk 5 (the four inventory expectations, from line 615)

All four `src/core` listings in that one case need the new key. The run named only the first,
because `toStrictEqual` throws at the first mismatch and the case stops there.

```diff
 		expect(Object.keys(readInventory(root, ['src/core'], { extensions: ['.ts'] }))).toStrictEqual([
+			'src/core/constants.ts',
 			'src/core/factories.ts',
 			'src/core/helpers.ts',
 			'src/core/index.ts',
 			'src/core/types.ts',
 			'src/core/validators.ts',
 		])
 
 		expect(
 			Object.keys(readInventory(root, ['package.json', 'src/core'], { extensions: ['.ts'] })),
 		).toStrictEqual([
 			'package.json',
+			'src/core/constants.ts',
 			'src/core/factories.ts',
 			'src/core/helpers.ts',
 			'src/core/index.ts',
 			'src/core/types.ts',
 			'src/core/validators.ts',
 		])
 
 		expect(
 			Object.keys(
 				readInventory(root, ['src/core'], {
 					extensions: ['.ts'],
 					exclude: ['src/core/index.ts'],
 				}),
 			),
 		).toStrictEqual([
+			'src/core/constants.ts',
 			'src/core/factories.ts',
 			'src/core/helpers.ts',
 			'src/core/types.ts',
 			'src/core/validators.ts',
 		])
 
 		expect(
 			Object.keys(readInventory(root, ['src'], { extensions: ['.ts'], exclude: ['src/server'] })),
 		).toStrictEqual([
 			'src/browser/constants.ts',
 			'src/browser/factories.ts',
 			'src/browser/helpers.ts',
 			'src/browser/index.ts',
 			'src/browser/types.ts',
+			'src/core/constants.ts',
 			'src/core/factories.ts',
 			'src/core/helpers.ts',
 			'src/core/index.ts',
 			'src/core/types.ts',
 			'src/core/validators.ts',
 		])
```

Each of those four expectations is the measured output of the same call taken in this checkout:

```text
A: ["src/core/constants.ts","src/core/factories.ts","src/core/helpers.ts","src/core/index.ts",
    "src/core/types.ts","src/core/validators.ts","src/server/constants.ts",
    "src/server/factories.ts","src/server/helpers.ts","src/server/index.ts","src/server/types.ts"]
C: ["package.json","src/core/constants.ts","src/core/factories.ts","src/core/helpers.ts",
    "src/core/index.ts","src/core/types.ts","src/core/validators.ts"]
D: ["src/core/constants.ts","src/core/factories.ts","src/core/helpers.ts","src/core/types.ts",
    "src/core/validators.ts"]
E: ["src/browser/constants.ts","src/browser/factories.ts","src/browser/helpers.ts",
    "src/browser/index.ts","src/browser/types.ts","src/core/constants.ts","src/core/factories.ts",
    "src/core/helpers.ts","src/core/index.ts","src/core/types.ts","src/core/validators.ts"]
```

## Deviations and decisions

### 1. The runners are named `executeScenario` and `executeScenarios`, not `runScenario` and `runScenarios`

**Expected** (brief, § The contract to add): `runScenario(scenario, context)` and
`runScenarios(scenarios, build)`.

**Found**: `.claude/rules/names.md` § Fixed lifecycle vocabulary fixes `execute` as "Run primary work
to completion" and then states: "Never introduce synonyms such as `cancel`, `reset`, or `run` for
these meanings." A scenario runner runs primary work to completion, so `run*` is the banned synonym
in exactly the sense the row names. `AGENTS.md` § Authority and loading and
`.agents/orchestration.md` § Authority both put the rules above a dispatch brief, and a brief cannot
weaken them.

**Evidence**: the fleet already honours the row — `@orkestrel/process` publishes `execute` and
`executeSync`, and a sweep of every installed `@orkestrel/*` declaration file for
`export declare function run` returns nothing:

```text
$ grep -rn "export declare function run\|export declare function execute" \
    node_modules/@orkestrel/*/dist/src/*/index.d.ts
node_modules/@orkestrel/process/dist/src/server/index.d.ts:208:export declare function execute(...)
node_modules/@orkestrel/process/dist/src/server/index.d.ts:234:export declare function executeSync(...)
```

**Done**: everything else in the contract is exactly as briefed. Only the two identifiers differ,
and the guide, README, tests, and Limits row all use the shipped names.

**Hypothesis**: the brief took the names from `elements/tests/setupBrowser.ts` and
`veneer/tests/setupBrowser.ts`, which are workspace test infrastructure rather than published API,
where the fixed-vocabulary row has never been enforced.

This is the one decision to overturn or confirm before integration. Reverting it is a rename in
`src/core/helpers.ts`, four guide surfaces, two README sentences, and the two test files.

### 2. Corrected readings beyond the change's own blast radius

The change makes the `src/core` key listings false by adding `src/core/constants.ts`. Those listings
were **already** wrong for other reasons, so a partial correction would have left the reader with a
list that is neither the old claim nor the truth. I measured the real output with the probe and wrote
that, in `README.md` and in the guide's `Read a source inventory` fence:

| Call                                                | Was missing, before this change                                                 |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `readInventory(root, ['src/core', 'src/server'])`   | `src/core/validators.ts`, `src/server/constants.ts` (README only)                |
| `sources['src/core/index.ts']`                      | the `validators.js` barrel row (README only)                                     |
| `readInventory(root, ['package.json', 'src/core'])` | `src/core/validators.ts` (README only)                                           |
| `readInventory(root, ['src/core'], exclude index)`  | `src/core/validators.ts` (README only)                                           |
| `readInventory(root, ['src'], exclude src/server)`  | the whole `src/browser` tree and `src/core/validators.ts` (README only)          |

The guide's copies of the same fence were already correct apart from the new file. `README.md` is
owned "only where it lists the surface", and these are `readInventory` examples rather than surface
listings, so the correction is wider than the grant reads. Strike it if you would rather keep the
README edit inside the grant; the measured values above are what any replacement must say.

### 3. Ancillary calls made and recorded, not escalated

- **`StateScenario` became a behavioral interface.** The brief's method syntax makes
  `source.methods('StateScenario')` non-empty, which obliges a `## Methods` group. Added.
- **`src/core/constants.ts` is a new file**, so `src/core/index.ts` gained a barrel row. The brief
  anticipated this.
- **No shared root guard was extracted.** `readClasses` and `extractEscapes` each open with a
  one-line `root instanceof Element` guard in different shapes. A third export to share a single
  line adds no boundary, invariant, or narrower contract, so the superfluous-wrapper rule refuses
  it. Flagging it because a reviewer may read it as duplication.
- **No new § Contract rule.** The numbered rules are the guide's own contract list; the statechart
  contract is carried by its Limits row, its Patterns section, and its Methods group. A rule 18
  would be additive and is yours to ask for.
- **No Limits row for the markup readers.** The Limits table records candidates the fleet survey
  raised, and I hold no survey evidence for `readClasses` or `extractEscapes`. Writing a row would
  have invented that evidence. The brief asked only for the statechart row.
- **A failing phase is wrapped, not mutated.** `executeScenario` throws a new `Error` carrying the
  original as `cause` rather than rewriting the caught error's `message` in place. Wrapping matches
  `decodeJSONLines` and `retryUntil`, the package's existing idiom, and mutates nothing. The cost is
  that Vitest prints the wrapper's message and reaches the assertion diff through `cause`.

## Claims I could not close

- **`test:guides` green.** Blocked on patches A and B. Every other acceptance criterion is closed.
- **The patched `tests/guides.test.ts` compiling and formatting in place.** Hunks 3 and 4 ran green
  and format-clean as a probe in the same runtime, and hunks 1, 2, and 5 are mechanical. None of
  them has been read by `tsc` inside that file.
- **The whole-suite and build readings** are this unit's own, taken under its own exec, and are
  reported as observations.
