# The statechart family

Declare one transition table, and give it to the run that asserts it and to the harness a person
watches. Never write a second table for the harness.

## The vocabulary

```ts
import type { StateScenario, StateTransition, StatechartStatus } from '@orkestrel/test'
import {
	STATECHART_ATTRIBUTES,
	STATECHART_STATUSES,
	buildRefusal,
	executeScenario,
	executeScenarios,
	requireValue,
} from '@orkestrel/test'
import type { HarnessInterface, HarnessOptions } from '@orkestrel/test/browser'
import {
	clickAccessible,
	clickDisclosure,
	createHarness,
	readStates,
	render,
} from '@orkestrel/test/browser'
```

## Declare the table

- Declare each transition as a `StateTransition` carrying its `name`, its `from` state, the `event`,
  and its `to` state. Type it on the entity's own state and event unions, so a row naming a state the
  entity does not have fails to typecheck. A view-local reactive ref inside a component is not such
  an entity. Never declare a state union or an event union solely to type a table; `AGENTS.md` §
  Design laws bars a literal union that names no real domain state.
- Write one `StateScenario` per transition, carrying that `transition` plus `arrange`, `act`, and
  `assert`. Each phase receives the context and the part of the transition it owns.
- Put the scenarios and the table in the workspace's browser test setup module, and import them from
  there.
- Declare a transition for every event the surface accepts in every state it accepts it, including
  the event that leaves the state unchanged. A table that lists only the moves the happy path takes
  proves the happy path.
- Write the phases as module functions the whole table shares. Each phase reads its subject from its
  own parameters rather than from the row it belongs to, so one set serves a table of any size.

## The worked table

Copy the shape of the following table, which is the table this layer's own browser suite runs. Its
entity is a native disclosure with a second door: the summary toggles it, and a `Dismiss` button
closes it and does nothing when it is already closed. Give your own table the same row that second
door produces here — the row whose event leaves the state where it found it.

```ts
import type { StateScenario } from '@orkestrel/test'
import { executeScenarios, requireValue } from '@orkestrel/test'
import { clickAccessible, clickDisclosure, readStates, render } from '@orkestrel/test/browser'
import { expect, it } from 'vitest'

type DisclosureState = 'closed' | 'open'
type DisclosureEvent = 'toggle' | 'dismiss'

interface DisclosureContext {
	readonly summary: HTMLElement
}

// A journey verb resolves its own target by accessible name, so a second mounted disclosure called
// "Advanced" is an ambiguity rather than a second fixture. Each build takes the previous one out.
let mounted: HTMLElement | undefined

function buildDisclosure(): DisclosureContext {
	mounted?.remove()
	const container = render(
		'<details><summary>Advanced</summary><p>Every setting.</p></details><button type="button">Dismiss</button>',
	)
	const details = requireValue(container.querySelector('details'))
	requireValue(container.querySelector('button')).addEventListener('click', () => {
		details.open = false
	})
	mounted = container
	return { summary: requireValue(container.querySelector('summary')) }
}

function readDisclosure(context: DisclosureContext): DisclosureState {
	return readStates(context.summary).includes('expanded') ? 'open' : 'closed'
}

async function arrangeDisclosure(
	context: DisclosureContext,
	state: DisclosureState,
): Promise<void> {
	if (readDisclosure(context) !== state) await clickDisclosure('Advanced')
}

// The context is unused because a journey verb finds what a person reads rather than a node this
// row was handed.
async function actOnDisclosure(_context: DisclosureContext, event: DisclosureEvent): Promise<void> {
	if (event === 'toggle') await clickDisclosure('Advanced')
	else await clickAccessible('Dismiss')
}

function assertDisclosure(context: DisclosureContext, state: DisclosureState): void {
	expect(readDisclosure(context)).toBe(state)
}

const SCENARIOS: ReadonlyArray<StateScenario<DisclosureState, DisclosureEvent, DisclosureContext>> =
	[
		{
			transition: {
				name: 'closed opens through the summary',
				from: 'closed',
				event: 'toggle',
				to: 'open',
			},
			arrange: arrangeDisclosure,
			act: actOnDisclosure,
			assert: assertDisclosure,
		},
		{
			transition: {
				name: 'open closes through the summary',
				from: 'open',
				event: 'toggle',
				to: 'closed',
			},
			arrange: arrangeDisclosure,
			act: actOnDisclosure,
			assert: assertDisclosure,
		},
		{
			transition: {
				name: 'open closes through the button',
				from: 'open',
				event: 'dismiss',
				to: 'closed',
			},
			arrange: arrangeDisclosure,
			act: actOnDisclosure,
			assert: assertDisclosure,
		},
		{
			// The row whose event leaves the state where it found it.
			transition: {
				name: 'closed stays closed through the button',
				from: 'closed',
				event: 'dismiss',
				to: 'closed',
			},
			arrange: arrangeDisclosure,
			act: actOnDisclosure,
			assert: assertDisclosure,
		},
	]

it('walks the disclosure statechart', async () => {
	await executeScenarios(SCENARIOS, buildDisclosure)
})
```

- Name each row for the door it drove. A table that names only the states reads as if one mechanism
  moved the entity, and the row where the button leaves the disclosure exactly as it found it is the
  one a name has to separate from the toggle rows beside it.
- Remove the previous fixture inside the builder. Without that removal the next row meets the
  previous disclosure beside its own under one name, and the verb refuses them as ambiguous.
- Drive a native `<summary>` with `clickDisclosure` and an ARIA disclosure with `clickAccessible`
  settled by `waitForState` ([layer.md](layer.md) → Disclosures).

## Run the table

- Run the table with `executeScenarios(scenarios, build)` from `@orkestrel/test`. It drives the rows
  in the order they are written, builds a context per row, and stops at the first row that throws.
- Run one row with `executeScenario(scenario, context)` where a single transition is the subject.
- Build the context in `build`, which receives the row it is building for. That is what lets one
  table mix fixtures.
- Let the runner name the failure. It prepends the transition's `name` to whatever the row threw and
  carries the original as the `cause`, so a bare assertion message still says which row failed. A
  phase that throws something other than an `Error` is named by its type, and a builder that refuses
  raises `<name>: build refused` with its own refusal as the `cause`.
  `buildRefusal(name, cause)` from `@orkestrel/test` builds that same error, so an assertion on
  a refused build compares against what it returns rather than against a spelled string.
- Never assert the entity's internal state in `assert` where the transition is one a person drives.
  Assert what the interface renders, through `readPerception`, `readValue`, or `readStates`.

## Drive the act the way the transition happens

- Drive `act` through the journey verbs — `clickAccessible`, `clickDisclosure`, `typeAccessible`,
  `traverseAccessible`, `pressKeys` — for every transition a person can cause.
- Drive `act` through the entity's own API only where the transition is the entity's rather than the
  person's: a lifecycle event, a transport reply, a timer the surface owns.
- Say which door each row used, in the row's `name`. A table that mixes the doors silently reads as
  a set of user transitions and proves something else.

## Mount the harness

`createHarness(options)` renders the table in the browser and drives it row by row. It takes the
table as `scenarios`, the fixture builder as `build`, the reader that reports the entity's state as
`state`, and an optional `pause` between rows for a table worth watching.

```ts
import { STATECHART_ATTRIBUTES } from '@orkestrel/test'
import { createHarness } from '@orkestrel/test/browser'

const harness = createHarness({
	scenarios: SCENARIOS,
	build: buildDisclosure,
	state: readDisclosure,
})

harness.status // 'idle' — mounted, nothing run yet
harness.total // 4

await harness.execute()

harness.status // 'passed'
harness.passed // 4
harness.failed // 0
harness.failures // []

// The object reads its own markup, so a gate polling the page and a test asserting on the object
// cannot disagree.
harness.root.getAttribute(STATECHART_ATTRIBUTES.status) // 'passed'
harness.root.getAttribute(STATECHART_ATTRIBUTES.total) // '4'

harness.destroy()
```

- Hand it the same table the run asserts. A second table for the harness is what this reference
  forbids.
- Let it render its own markup. It writes `status`, `passed`, `failed`, and `total` on its root,
  `scenario` and `result` on each row, and `state` on the element rendering the entity's current
  state, every one of them from `STATECHART_ATTRIBUTES` rather than from a literal. A workspace that
  spells a `data-statechart-*` string of its own has left the contract.
- Read the announcer beside the attributes. A `role="status"` element narrates each step in a
  sentence, so a screen reader and a vision model both read the run without visual chrome.
- Take `execute` as reporting on the whole table. It carries on past a failing row, where
  `executeScenarios` stops at the first, and a builder that refuses fails its own row under the
  sentence `buildRefusal` builds rather than ending the run.
- Call `execute` again to re-run the same table from a fresh tally and a cleared rendered state.
- Call `destroy` in the test's own cleanup. It removes the mounted root and does nothing when the
  root is already gone.
- Pace a table a person watches with `pause`, and budget the gate from the row count and that pause
  rather than from a fixed timeout.

## The observable statuses

`STATECHART_STATUSES` publishes the run states in the order a run passes through them, and
`StatechartStatus` is the same set as a named union.

| Status    | The reading it names                                                                     |
| --------- | ---------------------------------------------------------------------------------------- |
| `pending` | Construction, until every declared row has rendered and `total` carries the row count    |
| `idle`    | Mounted and standing ready, with `passed` and `failed` at zero and nothing in flight     |
| `running` | A run in flight                                                                          |
| `passed`  | Terminal: the run finished and no row's result reads failed                              |
| `failed`  | Terminal: the run finished with a failing row, or it ended on the `state` reader's throw |

- Read a `pending` status as a harness whose rows never mounted. A gate that finds it has found a
  defect rather than a run to wait for.
- Read `total` as what the table declares and `passed` plus `failed` as what the last run finished.
- Take the terminal pair as the pair a gate waits for. Every exit writes one of them: a run the
  `state` reader ends writes `failed` and then rejects with that reader's value by identity, and the
  row that reader was called for is not counted as failed.
- Read the state element as carrying no reading before the first row produces a context. A state is
  read from an entity, and no entity exists until a row builds one.

## Gate the harness

Prove the harness from the browser project, through the object and the markup together:

- Mount the harness, `execute` it, and assert the status reads `passed`, the failed tally reads
  zero, and the passed tally equals the total.
- Assert the inventory before the tally. A harness that mounted no row would pass every tally
  assertion, and `createHarness` refuses an empty table with `Statechart harness mounted no
transition`.
- Name the failing rows from `failures`, which lists each row whose rendered `result` reads failed,
  in table order. A red gate says which transition broke.
- Read the tally off `harness.root` as well as off the object, so the attribute contract a gate
  outside the page depends on is asserted rather than assumed.
- Poll the root's `status` attribute until it reads a terminal value where the gate runs outside
  this layer's environment, under a budget derived from the row count and the declared pause. Never
  assert it from one read after the start.

## A harness page is product

A deep-linked page hosting a harness is optional product the workspace ships on its own account.
This layer's browser entry imports `vitest/browser` at module scope, so an application page cannot
import it.

- Name only the attribute contract such a page must honour: the names in `STATECHART_ATTRIBUTES`,
  the readings in `STATECHART_STATUSES`, and the tally on one root node.
- Report the page itself as the repository owner's decision — which transitions a surface owes,
  where the page is linked, and whether it ships at all.
- Route a person who must watch the widget move to the harness run's own frames and its written
  artifact ([decide.md](decide.md) → The harness run), and name a deep link only where the workspace
  already ships such a page.
