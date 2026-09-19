
// The worked statechart table `guides/test.md` § Patterns → "Drive a statechart table" carries. The
// entity is a native disclosure with a second door: the summary toggles it, and a Dismiss button
// closes it and does nothing when it is already closed. That second door is what gives the table a
// row whose event leaves the state unchanged, which a lone `<details>` cannot have.
type DisclosureState = 'closed' | 'open'

type DisclosureEvent = 'toggle' | 'dismiss'

interface DisclosureContext {
	readonly summary: HTMLElement
}

// The fixture the row before this one left on the page. A journey verb resolves its own target by
// accessible name, so two mounted disclosures called "Advanced" are an ambiguity rather than a
// second fixture: each build takes the previous one back out before rendering its own.
let mounted: HTMLElement | undefined

function buildDisclosure(): DisclosureContext {
	mounted?.remove()
	const container = buildFixture(
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

async function arrangeDisclosure(context: DisclosureContext, state: DisclosureState): Promise<void> {
	if (readDisclosure(context) !== state) await clickDisclosure('Advanced')
}

// The context is unused because a journey verb resolves its own target: the summary and the button
// are found by what a person reads, not by a node this row was handed.
async function actOnDisclosure(
	_context: DisclosureContext,
	event: DisclosureEvent,
): Promise<void> {
	if (event === 'toggle') await clickDisclosure('Advanced')
	else await clickAccessible('Dismiss')
}

function assertDisclosure(context: DisclosureContext, state: DisclosureState): void {
	expect(readDisclosure(context)).toBe(state)
}

const DISCLOSURE_SCENARIOS: ReadonlyArray<
	StateScenario<DisclosureState, DisclosureEvent, DisclosureContext>
> = [
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

// One row whose `to` state the event cannot reach. Nothing about the row is malformed: the summary
// really does open the disclosure, so only `assert` can catch it.
const MISMATCHED_SCENARIOS: ReadonlyArray<
	StateScenario<DisclosureState, DisclosureEvent, DisclosureContext>
> = [
	{
		transition: {
			name: 'the summary leaves it closed',
			from: 'closed',
			event: 'toggle',
			to: 'closed',
		},
		arrange: arrangeDisclosure,
		act: actOnDisclosure,
		assert: assertDisclosure,
	},
]

// The same table with the mismatched row second, so the rows after a failing row are observable.
const MIXED_SCENARIOS: ReadonlyArray<
	StateScenario<DisclosureState, DisclosureEvent, DisclosureContext>
> = [
	requireValue(DISCLOSURE_SCENARIOS[0]),
	requireValue(MISMATCHED_SCENARIOS[0]),
	requireValue(DISCLOSURE_SCENARIOS[2]),
	requireValue(DISCLOSURE_SCENARIOS[3]),
]

const EMPTY_SCENARIOS: ReadonlyArray<
	StateScenario<DisclosureState, DisclosureEvent, DisclosureContext>
> = []

describe('createHarness', () => {
	// A harness mounts itself and records nothing, exactly as `mount` does, so a harness a failing
	// assertion left behind is the next test's ambiguity. This takes back whatever is still there.
	afterEach(() => {
		for (const root of [...document.querySelectorAll(`[${STATECHART_ATTRIBUTES.status}]`)]) {
			root.remove()
		}
		mounted = undefined
	})

	// T2-C1.
	it('refuses a table with no transition in it and mounts nothing', () => {
		const before = document.body.childElementCount

		expect(
			captureError(() =>
				createHarness({
					scenarios: EMPTY_SCENARIOS,
					build: buildDisclosure,
					state: readDisclosure,
				}),
			),
		).toStrictEqual(new Error('Statechart harness mounted no transition'))

		expect(document.body.childElementCount).toBe(before)
		expect(document.querySelector(`[${STATECHART_ATTRIBUTES.status}]`)).toBeNull()
		expect(document.querySelector(`[${STATECHART_ATTRIBUTES.scenario}]`)).toBeNull()
	})

	// T2-C4. The transient value is written and replaced inside one synchronous call, so the proof
	// is what the document recorded rather than what a reading after the call can see. The observer
	// is armed on `document.body` before construction and its queue is read back with
	// `takeRecords()`, which is the only reading that survives the call.
	it('mounts every row while it reads pending and writes idle only after the count', () => {
		const observer = new MutationObserver(() => {})
		observer.observe(document.body, {
			subtree: true,
			childList: true,
			attributes: true,
			attributeOldValue: true,
			attributeFilter: [STATECHART_ATTRIBUTES.status, STATECHART_ATTRIBUTES.total],
		})

		const harness = createHarness({
			scenarios: DISCLOSURE_SCENARIOS,
			build: buildDisclosure,
			state: readDisclosure,
		})
		const records = observer.takeRecords()
		observer.disconnect()

		const trail = records.map((record) =>
			record.type === 'attributes'
				? `${requireValue(record.attributeName)} left ${record.oldValue ?? 'absent'}`
				: `added ${[...record.addedNodes]
						.map((node) => (node instanceof Element ? node.localName : 'text'))
						.join(' ')}`,
		)

		expect(trail).toStrictEqual([
			'added div',
			'added p p ol',
			'added li',
			'added li',
			'added li',
			'added li',
			`${STATECHART_ATTRIBUTES.total} left absent`,
			`${STATECHART_ATTRIBUTES.status} left pending`,
		])
		expect(harness.status).toBe('idle')
		expect(harness.total).toBe(4)
		expect(harness.passed).toBe(0)
		expect(harness.failed).toBe(0)
		expect(harness.failures).toStrictEqual([])

		harness.destroy()
	})

	// T2-C4. A row parked on a deferred the test resolves is what makes the middle status readable:
	// the run is in flight for as long as the test keeps it there.
	it('reads running from the call until the parked row is let go', async () => {
		const gate = Promise.withResolvers<void>()
		const harness = createHarness({
			scenarios: [
				{
					transition: requireValue(DISCLOSURE_SCENARIOS[0]).transition,
					arrange: arrangeDisclosure,
					async act(context, event) {
						await gate.promise
						await actOnDisclosure(context, event)
					},
					assert: assertDisclosure,
				},
			],
			build: buildDisclosure,
			state: readDisclosure,
		})
		expect(harness.status).toBe('idle')

		const run = harness.execute()
		expect(harness.status).toBe('running')
		expect(harness.root.getAttribute(STATECHART_ATTRIBUTES.status)).toBe('running')

		await waitForDelay(20)
		expect(harness.status).toBe('running')

		gate.resolve()
		await run

		expect(harness.status).toBe('passed')
		harness.destroy()
	})

	// T2-C2. guides/test.md → Patterns → "Drive a statechart table". A browser fence carries in this
	// directory because the guides project runs with the browser disabled.
	it('drives every row of the worked table and publishes the tally on its own markup', async () => {
		const harness = createHarness({
			scenarios: DISCLOSURE_SCENARIOS,
			build: buildDisclosure,
			state: readDisclosure,
		})

		await harness.execute()

		expect(harness.status).toBe('passed')
		expect(harness.total).toBe(4)
		expect(harness.passed).toBe(4)
		expect(harness.failed).toBe(0)
		expect(harness.failures).toStrictEqual([])

		// The object reads the markup, so the two cannot disagree. Read the markup the way a gate
		// outside the page reads it and compare.
		const root = harness.root
		expect(root.getAttribute(STATECHART_ATTRIBUTES.status)).toBe(String(harness.status))
		expect(root.getAttribute(STATECHART_ATTRIBUTES.total)).toBe(String(harness.total))
		expect(root.getAttribute(STATECHART_ATTRIBUTES.passed)).toBe(String(harness.passed))
		expect(root.getAttribute(STATECHART_ATTRIBUTES.failed)).toBe(String(harness.failed))

		const rows = [...root.querySelectorAll(`[${STATECHART_ATTRIBUTES.scenario}]`)]
		expect(rows.map((row) => row.getAttribute(STATECHART_ATTRIBUTES.scenario))).toStrictEqual(
			DISCLOSURE_SCENARIOS.map((scenario) => scenario.transition.name),
		)
		expect(rows.map((row) => row.getAttribute(STATECHART_ATTRIBUTES.result))).toStrictEqual([
			'passed',
			'passed',
			'passed',
			'passed',
		])
		expect(requireValue(rows[0]).textContent).toBe(
			'closed opens through the summary: closed on toggle becomes open',
		)

		// The last row leaves the disclosure closed, and the state element renders what the entity's
		// own reader reported rather than what the row asked for.
		expect(
			requireValue(root.querySelector(`[${STATECHART_ATTRIBUTES.state}]`)).getAttribute(
				STATECHART_ATTRIBUTES.state,
			),
		).toBe('closed')
		expect(requireValue(root.querySelector('[role="status"]')).textContent).toBe(
			'Statechart harness passed, 4 passed and 0 failed of 4.',
		)

		harness.destroy()
	})

	// T2-C3.
	it('carries on past a failing row and names it in the failures', async () => {
		const harness = createHarness({
			scenarios: MIXED_SCENARIOS,
			build: buildDisclosure,
			state: readDisclosure,
		})

		await harness.execute()

		expect(harness.status).toBe('failed')
		expect(harness.failed).toBe(1)
		expect(harness.passed).toBe(3)
		expect(harness.failures).toStrictEqual(['the summary leaves it closed'])

		const rows = [...harness.root.querySelectorAll(`[${STATECHART_ATTRIBUTES.scenario}]`)]
		expect(rows.map((row) => row.getAttribute(STATECHART_ATTRIBUTES.result))).toStrictEqual([
			'passed',
			'failed',
			'passed',
			'passed',
		])
		expect(requireValue(harness.root.querySelector('[role="status"]')).textContent).toBe(
			'Statechart harness failed, 3 passed and 1 failed of 4.',
		)

		harness.destroy()
	})

	// T2-C3. A builder that refuses fails its own row under the name `executeScenarios` gives it, and
	// the rows after it still run — which is where a harness parts company with the bare runner.
	it('fails the row whose builder refused and runs the rows after it', async () => {
		let refusals = 0
		const harness = createHarness({
			scenarios: MIXED_SCENARIOS,
			build(scenario) {
				if (scenario.transition.name !== 'the summary leaves it closed') return buildDisclosure()
				refusals += 1
				throw new Error('no fixture')
			},
			state: readDisclosure,
		})

		await harness.execute()

		expect(refusals).toBe(1)
		expect(harness.status).toBe('failed')
		expect(harness.passed).toBe(3)
		expect(harness.failures).toStrictEqual(['the summary leaves it closed'])
		expect(requireValue(harness.root.querySelector('[role="status"]')).textContent).toBe(
			'Statechart harness failed, 3 passed and 1 failed of 4.',
		)

		harness.destroy()
	})

	// T2-C5.
	it('re-runs from a fresh tally and hands the root back on destroy', async () => {
		const harness = createHarness({
			scenarios: MIXED_SCENARIOS,
			build: buildDisclosure,
			state: readDisclosure,
		})

		await harness.execute()
		expect(harness.passed).toBe(3)
		expect(harness.failed).toBe(1)

		const second = harness.execute()

		// The reset is readable while the run is in flight: no row carries a result from the run
		// before it, and the tally is back at zero rather than counting on from where it stopped.
		expect(harness.status).toBe('running')
		expect(harness.passed).toBe(0)
		expect(harness.failed).toBe(0)
		expect(harness.failures).toStrictEqual([])
		expect(harness.root.querySelectorAll(`[${STATECHART_ATTRIBUTES.result}]`).length).toBe(0)

		await second
		expect(harness.passed).toBe(3)
		expect(harness.failed).toBe(1)
		expect(harness.failures).toStrictEqual(['the summary leaves it closed'])

		harness.destroy()
		expect(harness.root.isConnected).toBe(false)

		const remaining = document.body.childElementCount
		expect(captureError(() => harness.destroy())).toBeUndefined()
		expect(document.body.childElementCount).toBe(remaining)
		expect(harness.root.isConnected).toBe(false)
		expect(harness.status).toBe('failed')
	})

	// The delay is between rows rather than around them, so a table of four waits three times.
	it('waits the declared pause between rows and not after the last one', async () => {
		const harness = createHarness({
			scenarios: DISCLOSURE_SCENARIOS,
			build: buildDisclosure,
			state: readDisclosure,
			pause: 25,
		})

		const started = performance.now()
		await harness.execute()
		const elapsed = performance.now() - started

		expect(harness.status).toBe('passed')
		expect(elapsed).toBeGreaterThanOrEqual(75)
		harness.destroy()
	})

	// guides/test.md → Patterns → "Drive a statechart table". The same table under the bare runner:
	// `executeScenarios` stops at the first failing row, and the row's name opens the message.
	it('stops the bare runner at the first failing row and names that row', async () => {
		await executeScenarios(DISCLOSURE_SCENARIOS, buildDisclosure)

		const thrown = await executeScenarios(MISMATCHED_SCENARIOS, buildDisclosure).catch(
			(error: unknown) => error,
		)
		const failure = requireValue(thrown instanceof Error ? thrown : undefined)
		expect(failure.message.startsWith("the summary leaves it closed: expected 'open'")).toBe(true)
		expect(failure.cause).toBeInstanceOf(Error)

		const refused = await executeScenarios(MISMATCHED_SCENARIOS, () => {
			throw new Error('no fixture')
		}).catch((error: unknown) => error)
		const refusal = requireValue(refused instanceof Error ? refused : undefined)
		expect(refusal.message).toBe('the summary leaves it closed: build refused')
		expect(refusal.cause).toBeInstanceOf(Error)
	})
})
