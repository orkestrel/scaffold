import { Offcanvas, OFFCANVAS_EVENTS } from '@src/browser'
import { createRecorder, requireValue, waitForCondition, waitForDelay } from '@orkestrel/test'
import { afterEach, describe, expect, it } from 'vitest'
import tokensCascade from '../../../src/styles/_tokens.scss?inline'
import fadeCascade from '../../../src/styles/components/_fade.scss?inline'
import offcanvasCascade from '../../../src/styles/components/_offcanvas.scss?inline'
import { scene } from '../../setupBrowser.js'

// J-REENTRY-SWEEP lens `offcanvas-hide`: a throwaway probe that maps every point on `Offcanvas.hide`
// and its returning step where consumer code runs after the change started. It never lands.

afterEach(() => scene.clear())

type Cue =
	| {
			readonly source: 'host'
			readonly attribute: string
			readonly previous: string | null
			readonly value: string | null
	  }
	| { readonly source: 'sibling'; readonly value: string | null }
	| { readonly source: 'fixed'; readonly padding: string }
	| { readonly source: 'reactor'; readonly callback: 'connected' | 'disconnected' }
	| { readonly source: 'focus' }
	| { readonly source: 'blur' }
	| { readonly source: 'event'; readonly name: string }
	| { readonly source: 'backdrop'; readonly shown: boolean }

type Point =
	| 'event'
	| 'inert'
	| 'focus'
	| 'blur'
	| 'hiding'
	| 'shown'
	| 'wait'
	| 'cleared'
	| 'modal'
	| 'role'
	| 'removal'
	| 'lock'
	| 'hidden'
	| 'R-hiding'
	| 'R-modal'
	| 'R-role'
	| 'R-insert'
	| 'R-token'
	| 'final'

type Action = 'destroy' | 'toward' | 'against' | 'hide' | 'show' | 'reopen'

interface Row {
	readonly id: string
	readonly point: Point
	readonly action: Action
	readonly origin?: Point
	readonly prepare?: 'against' | 'reinsert'
}

interface Reading {
	readonly id: string
	readonly row: string
	readonly reached: boolean
	readonly outer: boolean
	readonly nested: boolean | undefined
	readonly flight: readonly string[]
	readonly midway: readonly string[]
	readonly host: string
	readonly modal: string | null
	readonly role: string | null
	readonly live: boolean
	readonly visibility: string
	readonly backdrops: readonly string[]
	readonly inert: readonly boolean[]
	readonly overflow: string
	readonly padding: string
	readonly events: readonly string[]
	readonly writes: readonly string[]
}

const state: { cue: ((cue: Cue) => void) | undefined } = { cue: undefined }

customElements.define(
	'vn-oh-host',
	class extends HTMLElement {
		static observedAttributes = ['class', 'aria-modal', 'role']
		attributeChangedCallback(attribute: string, previous: string | null, value: string | null) {
			state.cue?.({ source: 'host', attribute, previous, value })
		}
	},
)
customElements.define(
	'vn-oh-sibling',
	class extends HTMLElement {
		static observedAttributes = ['inert']
		attributeChangedCallback(_attribute: string, _previous: string | null, value: string | null) {
			state.cue?.({ source: 'sibling', value })
		}
	},
)
customElements.define(
	'vn-oh-fixed',
	class extends HTMLElement {
		static observedAttributes = ['style']
		attributeChangedCallback() {
			state.cue?.({ source: 'fixed', padding: this.style.getPropertyValue('padding-right') })
		}
	},
)
customElements.define(
	'vn-oh-reactor',
	class extends HTMLElement {
		connectedCallback() {
			state.cue?.({ source: 'reactor', callback: 'connected' })
		}
		disconnectedCallback() {
			state.cue?.({ source: 'reactor', callback: 'disconnected' })
		}
	},
)

function readTokens(value: string | null): readonly string[] {
	return (value ?? '').split(' ').filter((token) => token !== '')
}

function matchCue(point: Point, cue: Cue): boolean {
	if (cue.source === 'host') {
		const before = readTokens(cue.previous)
		const after = readTokens(cue.value)
		if (cue.attribute === 'class') {
			if (point === 'hiding') return !before.includes('hiding') && after.includes('hiding')
			if (point === 'shown') return before.includes('show') && !after.includes('show')
			if (point === 'cleared' || point === 'R-hiding') {
				return before.includes('hiding') && !after.includes('hiding')
			}
			return false
		}
		if (cue.attribute === 'aria-modal') {
			if (point === 'modal') return cue.previous !== null && cue.value === null
			if (point === 'R-modal') return cue.previous === null && cue.value !== null
			return false
		}
		if (cue.attribute === 'role') {
			if (point === 'role') return cue.previous !== null && cue.value === null
			if (point === 'R-role') return cue.previous === null && cue.value !== null
		}
		return false
	}
	if (cue.source === 'sibling') return point === 'inert' && cue.value === null
	if (cue.source === 'fixed') return point === 'lock' && cue.padding === ''
	if (cue.source === 'reactor') {
		if (point === 'removal' || point === 'final') return cue.callback === 'disconnected'
		if (point === 'R-insert') return cue.callback === 'connected'
		return false
	}
	if (cue.source === 'focus') return point === 'focus'
	if (cue.source === 'blur') return point === 'blur'
	if (cue.source === 'event') {
		if (point === 'event') return cue.name === OFFCANVAS_EVENTS.hide
		if (point === 'hidden') return cue.name === OFFCANVAS_EVENTS.hidden
		return false
	}
	if (point === 'R-token') return cue.shown
	return point === 'wait' && !cue.shown
}

function labelNode(node: Node, named: ReadonlyMap<Node, string>): string {
	return named.get(node) ?? node.nodeName
}

// Describes each mutation as the value it wrote, pairing a record's old value with the next record's
// old value on the same target and attribute, or with the value read after settling.
function describeWrites(
	records: readonly MutationRecord[],
	named: ReadonlyMap<Node, string>,
): readonly string[] {
	return records.map((record, index) => {
		const target = labelNode(record.target, named)
		if (record.type === 'childList') {
			const added = Array.from(record.addedNodes, (node) => labelNode(node, named))
			const removed = Array.from(record.removedNodes, (node) => labelNode(node, named))
			return `${target} children +[${added.join(',')}] -[${removed.join(',')}]`
		}
		const attribute = String(record.attributeName)
		const later = records
			.slice(index + 1)
			.find(
				(candidate) =>
					candidate.type === 'attributes' &&
					candidate.target === record.target &&
					candidate.attributeName === attribute,
			)
		const value =
			later === undefined
				? record.target instanceof Element
					? record.target.getAttribute(attribute)
					: null
				: later.oldValue
		return `${target} ${attribute}: ${String(record.oldValue)} -> ${String(value)}`
	})
}

async function runRow(row: Row, cascade: boolean): Promise<Reading> {
	const root = scene.mount('<div></div>')
	const trigger = document.createElement('button')
	trigger.type = 'button'
	const sibling = document.createElement('vn-oh-sibling')
	const fixed = document.createElement('vn-oh-fixed')
	fixed.className = 'fixed-top'
	fixed.style.setProperty('position', 'fixed')
	fixed.style.setProperty('inset', '0 0 auto 0')
	fixed.style.setProperty('height', '1px')
	const host = document.createElement('vn-oh-host')
	host.className = 'offcanvas offcanvas-start'
	host.tabIndex = -1
	root.append(trigger, sibling, fixed, host)
	const listening = new AbortController()
	const events = createRecorder<readonly [string]>()
	for (const wire of Object.values(OFFCANVAS_EVENTS)) {
		host.addEventListener(
			wire,
			(event) => {
				events.handler(event.type)
				state.cue?.({ source: 'event', name: event.type })
			},
			{ signal: listening.signal },
		)
	}
	trigger.addEventListener('focus', () => state.cue?.({ source: 'focus' }), {
		signal: listening.signal,
	})
	host.addEventListener('focusout', () => state.cue?.({ source: 'blur' }), {
		signal: listening.signal,
	})
	const offcanvas = new Offcanvas(host)
	expect(await offcanvas.show(trigger)).toBe(true)
	const backdrop = requireValue(
		root.querySelector<HTMLElement>('.offcanvas-backdrop'),
		'No backdrop',
	)
	const reactor = document.createElement('vn-oh-reactor')
	backdrop.append(reactor)
	const named = new Map<Node, string>([
		[host, 'host'],
		[backdrop, 'backdrop'],
		[sibling, 'sibling'],
		[trigger, 'trigger'],
		[fixed, 'fixed'],
		[reactor, 'reactor'],
		[root, 'root'],
		[document.body, 'body'],
	])
	const watcher = new MutationObserver(() =>
		state.cue?.({ source: 'backdrop', shown: backdrop.classList.contains('show') }),
	)
	watcher.observe(backdrop, { attributeFilter: ['class'] })
	const writes = createRecorder<readonly [readonly MutationRecord[]]>()
	const observer = new MutationObserver((records) => writes.handler(records))
	const nested: Array<Promise<boolean>> = []
	let stage: Point | undefined = row.origin ?? row.point
	let reached = false
	const flight: string[] = []
	events.clear()
	state.cue = (cue) => {
		if (stage === undefined || !matchCue(stage, cue)) return
		if (row.origin !== undefined && stage === row.origin) {
			stage = row.point
			if (row.prepare === 'reinsert') root.append(backdrop)
			else host.classList.add('show')
			return
		}
		stage = undefined
		reached = true
		if (row.action === 'destroy') offcanvas.destroy()
		if (row.action === 'toward' || row.action === 'reopen') host.classList.remove('show')
		if (row.action === 'against') host.classList.add('show')
		observer.observe(document.documentElement, {
			attributes: true,
			attributeOldValue: true,
			childList: true,
			subtree: true,
		})
		if (row.action === 'hide') nested.push(offcanvas.hide())
		if (row.action === 'show' || row.action === 'reopen') nested.push(offcanvas.show())
	}
	const outer = await offcanvas.hide()
	flight.push(
		`host ${host.className}`,
		...Array.from(
			document.querySelectorAll('.offcanvas-backdrop'),
			(element) => `backdrop ${element.className}`,
		),
	)
	const midway: string[] = []
	if (cascade) {
		await waitForDelay(200)
		midway.push(
			`host ${host.className}`,
			...Array.from(
				document.querySelectorAll<HTMLElement>('.offcanvas-backdrop'),
				(element) => `backdrop ${element.className} opacity ${getComputedStyle(element).opacity}`,
			),
		)
	}
	const settled = await nested[0]
	await waitForCondition(
		'the panel and every backdrop settle',
		() =>
			host.getAnimations().length === 0 &&
			Array.from(document.querySelectorAll('.offcanvas-backdrop')).every(
				(element) => element.getAnimations().length === 0,
			),
		{ budget: 3000 },
	)
	await waitForDelay(cascade ? 400 : 20)
	state.cue = undefined
	watcher.disconnect()
	const records = [...writes.calls.flatMap(([batch]) => batch), ...observer.takeRecords()]
	observer.disconnect()
	const reading: Reading = {
		id: row.id,
		row: `${row.origin === undefined ? '' : `${row.origin}+${row.prepare ?? 'against'} > `}${row.point} > ${row.action}`,
		reached,
		outer,
		nested: settled,
		flight,
		midway,
		host: host.className,
		modal: host.getAttribute('aria-modal'),
		role: host.getAttribute('role'),
		live: Offcanvas.find(host) !== undefined,
		visibility: getComputedStyle(host).visibility,
		backdrops: Array.from(
			document.querySelectorAll('.offcanvas-backdrop'),
			(element) => element.className,
		),
		inert: [trigger.inert, sibling.inert, fixed.inert],
		overflow: document.body.style.overflow,
		padding: fixed.style.getPropertyValue('padding-right'),
		events: events.calls.flat(),
		writes: describeWrites(records, named),
	}
	offcanvas.destroy()
	listening.abort()
	root.remove()
	return reading
}

function loadCascade(): void {
	scene.load(tokensCascade)
	scene.load(fadeCascade)
	scene.load(offcanvasCascade)
}

const before: readonly Point[] = ['event', 'inert', 'focus', 'blur', 'hiding']
const after: readonly Point[] = ['shown', 'wait', 'cleared', 'modal', 'role', 'removal', 'lock']
const returning: ReadonlyArray<readonly [Point, Point]> = [
	['shown', 'R-hiding'],
	['wait', 'R-hiding'],
	['role', 'R-modal'],
	['role', 'R-role'],
	['removal', 'R-insert'],
	['lock', 'R-insert'],
]

function listRows(): readonly Row[] {
	const rows: Row[] = []
	for (const point of before) {
		for (const action of ['destroy', 'toward', 'hide', 'show'] as const) {
			rows.push({ id: '', point, action })
		}
	}
	for (const point of after) {
		for (const action of ['destroy', 'against', 'hide', 'show'] as const) {
			rows.push({ id: '', point, action })
		}
	}
	for (const action of ['destroy', 'hide', 'show'] as const) {
		rows.push({ id: '', point: 'hidden', action })
	}
	for (const [origin, point] of returning) {
		for (const action of ['destroy', 'toward', 'hide', 'show', 'reopen'] as const) {
			rows.push({ id: '', point, action, origin })
		}
	}
	for (const origin of ['shown', 'removal'] as const) {
		for (const action of ['destroy', 'toward', 'hide', 'reopen'] as const) {
			rows.push({ id: '', point: 'R-token', action, origin })
		}
	}
	for (const action of ['destroy', 'against', 'hide', 'show'] as const) {
		rows.push({ id: '', point: 'final', action, origin: 'lock', prepare: 'reinsert' })
	}
	return rows.map((row, index) => ({ ...row, id: `OH-${index + 3}` }))
}

describe('probe offcanvas-hide', () => {
	it('maps every point without the cascade', { timeout: 120_000 }, async () => {
		const readings: Reading[] = []
		for (const row of listRows()) readings.push(await runRow(row, false))
		console.log(`MAP-PLAIN ${JSON.stringify(readings)}`)
		expect(readings.every((reading) => reading.reached)).toBe(true)
	})

	it('maps every point under the cascade', { timeout: 240_000 }, async () => {
		loadCascade()
		const readings: Reading[] = []
		for (const row of listRows()) readings.push(await runRow(row, true))
		console.log(`MAP-CASCADE ${JSON.stringify(readings)}`)
		expect(readings.every((reading) => reading.reached)).toBe(true)
	})

	it('seed OH-1: the returning step re-inserts the backdrop, a reaction hides, and the interrupted backdrop show adds its token (no cascade)', async () => {
		const reading = await runRow(
			{ id: 'OH-1', point: 'R-insert', action: 'hide', origin: 'removal' },
			false,
		)
		console.log(`SEED ${JSON.stringify(reading)}`)
		expect(reading.reached).toBe(true)
		// The nested hide never adds the backdrop's `show` token, so a record adding it after the nested
		// hide started is the interrupted `Backdrop.show` writing for the stale returning step.
		expect(reading.writes.filter((write) => /^backdrop class: .* -> .*\bshow\b/.test(write))).toEqual(
			[],
		)
		expect(reading.flight).toEqual([
			'host offcanvas offcanvas-start hiding',
			'backdrop offcanvas-backdrop fade',
		])
	})

	it('seed OH-2: the same interleaving under the cascade', { timeout: 10_000 }, async () => {
		loadCascade()
		const reading = await runRow(
			{ id: 'OH-2', point: 'R-insert', action: 'hide', origin: 'removal' },
			true,
		)
		console.log(`SEED ${JSON.stringify(reading)}`)
		expect(reading.reached).toBe(true)
		expect(reading.writes.filter((write) => /^backdrop class: .* -> .*\bshow\b/.test(write))).toEqual(
			[],
		)
		// Read 60 ms into the nested hide, a hiding panel's backdrop must be fading out, not in.
		expect(reading.midway.filter((line) => line.startsWith('backdrop'))).toEqual([])
		expect(reading.flight).toEqual([
			'host offcanvas offcanvas-start hiding',
			'backdrop offcanvas-backdrop fade',
		])
	})

	// The control: a nested hide inside the returning step's `hiding` removal, where the backdrop holds
	// no interrupted show, reads no stale token under the same filter.
	it('control: the stale-token filter reads nothing when no backdrop show is interrupted', async () => {
		const reading = await runRow(
			{ id: 'control', point: 'R-hiding', action: 'hide', origin: 'shown' },
			false,
		)
		expect(reading.reached).toBe(true)
		expect(reading.nested).toBe(true)
		expect(reading.writes.filter((write) => /^backdrop class: .* -> .*\bshow\b/.test(write))).toEqual(
			[],
		)
		expect(reading.events).toEqual(['hide.vn.offcanvas', 'hide.vn.offcanvas', 'hidden.vn.offcanvas'])
	})

	it('OH-81: a takeover at the lock release re-inserts the backdrop, a reaction hides, and the interrupted backdrop show adds its token', async () => {
		const reading = await runRow(
			{ id: 'OH-81', point: 'R-insert', action: 'hide', origin: 'lock' },
			false,
		)
		console.log(`INCOHERENT ${JSON.stringify(reading)}`)
		expect(reading.reached).toBe(true)
		expect(reading.writes.filter((write) => /^backdrop class: .* -> .*\bshow\b/.test(write))).toEqual(
			[],
		)
	})

	it('OH-92: a reaction inside the closing backdrop destruction destroys the panel, and the hide still dispatches hidden', async () => {
		const reading = await runRow(
			{ id: 'OH-92', point: 'final', action: 'destroy', origin: 'lock', prepare: 'reinsert' },
			false,
		)
		console.log(`INCOHERENT ${JSON.stringify(reading)}`)
		expect(reading.reached).toBe(true)
		expect(reading.live).toBe(false)
		expect(reading.events).toEqual(['hide.vn.offcanvas'])
	})

	it('OH-93: a reaction inside the closing backdrop destruction adds the shown token back, and the hide completes over it', async () => {
		const reading = await runRow(
			{ id: 'OH-93', point: 'final', action: 'against', origin: 'lock', prepare: 'reinsert' },
			false,
		)
		console.log(`INCOHERENT ${JSON.stringify(reading)}`)
		expect(reading.reached).toBe(true)
		expect({
			outer: reading.outer,
			host: reading.host,
			modal: reading.modal,
			role: reading.role,
			events: reading.events,
		}).toEqual({
			outer: false,
			host: 'offcanvas offcanvas-start show',
			modal: 'true',
			role: 'dialog',
			events: ['hide.vn.offcanvas'],
		})
	})
})
