import { Offcanvas, OFFCANVAS_EVENTS } from '@src/browser'
import { createRecorder, waitForCondition } from '@orkestrel/test'
import { afterEach, describe, expect, it } from 'vitest'
import tokensCascade from '../../../src/styles/_tokens.scss?inline'
import fadeCascade from '../../../src/styles/components/_fade.scss?inline'
import offcanvasCascade from '../../../src/styles/components/_offcanvas.scss?inline'
import { scene } from '../../setupBrowser.js'

// J-REENTRY-SWEEP, lens offcanvas-show: every point where consumer code runs after `Offcanvas.show`
// started its change, and inside its `#rehide` step, crossed with the nested call a reaction there
// makes. Each row reads the page after everything settles and asserts the sweep's invariant; a row
// the invariant does not rule on (a token move toward the change's own end) records its reading.

afterEach(() => {
	stages.splice(0)
	scene.clear()
})

interface Site {
	readonly node: Element
	readonly callback: 'attribute' | 'connected' | 'disconnected' | 'event' | 'wait' | 'focus'
	readonly name: string
	readonly previous: string | null
	readonly value: string | null
}

interface Stage {
	readonly match: (site: Site) => boolean
	readonly run: () => void
}

const stages: Stage[] = []

function advanceStage(site: Site): void {
	const [stage] = stages
	if (stage === undefined || !stage.match(site)) return
	stages.shift()
	stage.run()
}

function reportAttribute(node: Element, name: string, previous: string | null, value: string | null) {
	advanceStage({ node, callback: 'attribute', name, previous, value })
}

customElements.define(
	'probe-os-host',
	class extends HTMLElement {
		static observedAttributes = ['class', 'aria-modal', 'role']
		attributeChangedCallback(name: string, previous: string | null, value: string | null) {
			reportAttribute(this, name, previous, value)
		}
	},
)
customElements.define(
	'probe-os-inert',
	class extends HTMLElement {
		static observedAttributes = ['inert']
		attributeChangedCallback(name: string, previous: string | null, value: string | null) {
			reportAttribute(this, name, previous, value)
		}
	},
)
customElements.define(
	'probe-os-styled',
	class extends HTMLElement {
		static observedAttributes = ['style']
		attributeChangedCallback(name: string, previous: string | null, value: string | null) {
			reportAttribute(this, name, previous, value)
		}
	},
)
customElements.define(
	'probe-os-child',
	class extends HTMLElement {
		connectedCallback() {
			advanceStage({ node: this, callback: 'connected', name: '', previous: null, value: null })
		}
		disconnectedCallback() {
			advanceStage({ node: this, callback: 'disconnected', name: '', previous: null, value: null })
		}
	},
)

function hasToken(value: string | null, token: string): boolean {
	return (value ?? '').split(' ').includes(token)
}

interface World {
	readonly root: HTMLElement
	readonly host: HTMLElement
	readonly neighbour: HTMLElement
	readonly trigger: HTMLButtonElement
	readonly styled: HTMLElement
	readonly child: HTMLElement
	readonly offcanvas: Offcanvas
}

type Action =
	| 'destroy'
	| 'show'
	| 'hide'
	| 'against'
	| 'toward'
	| 'reshow'
	| 'retoken-hide'
	| 'resize'
	| 'control'

type Point =
	| 'pre'
	| 'lock'
	| 'insert'
	| 'aria-modal'
	| 'role'
	| 'showing-add'
	| 'shown-add'
	| 'wait'
	| 'showing-remove'
	| 'isolation'
	| 'focus'
	| 'shown-event'
	| 'rehide-showing'
	| 'rehide-aria-modal'
	| 'rehide-role'
	| 'rehide-backdrop'
	| 'isolation-release'
	| 'isolation-trigger'
	| 'lock-release'

function matchPoint(world: World, point: Point): (site: Site) => boolean {
	const { host, neighbour, trigger, styled, child } = world
	return (site) => {
		const { node, callback, name, previous, value } = site
		switch (point) {
			case 'pre':
				return node === host && callback === 'event' && name === OFFCANVAS_EVENTS.show
			case 'lock':
				return (
					node === styled &&
					name === 'style' &&
					(value ?? '').includes('padding-right') &&
					!(previous ?? '').includes('padding-right')
				)
			case 'lock-release':
				return (
					node === styled &&
					name === 'style' &&
					(previous ?? '').includes('padding-right') &&
					!(value ?? '').includes('padding-right')
				)
			case 'insert':
				return node === child && callback === 'connected'
			case 'rehide-backdrop':
				return node === child && callback === 'disconnected'
			case 'aria-modal':
				return node === host && name === 'aria-modal' && value === 'true' && previous === null
			case 'role':
				return node === host && name === 'role' && value === 'dialog' && previous === null
			case 'rehide-aria-modal':
				return node === host && name === 'aria-modal' && value === null && previous !== null
			case 'rehide-role':
				return node === host && name === 'role' && value === null && previous !== null
			case 'showing-add':
				return (
					node === host &&
					name === 'class' &&
					!hasToken(previous, 'showing') &&
					hasToken(value, 'showing')
				)
			case 'shown-add':
				return (
					node === host && name === 'class' && !hasToken(previous, 'show') && hasToken(value, 'show')
				)
			case 'showing-remove':
				return (
					node === host &&
					name === 'class' &&
					hasToken(previous, 'showing') &&
					!hasToken(value, 'showing') &&
					hasToken(value, 'show')
				)
			case 'rehide-showing':
				return (
					node === host &&
					name === 'class' &&
					hasToken(previous, 'showing') &&
					!hasToken(value, 'showing') &&
					!hasToken(value, 'show')
				)
			case 'wait':
				return node === host && callback === 'wait'
			case 'isolation':
				return node === neighbour && name === 'inert' && value !== null
			case 'isolation-release':
				return node === neighbour && name === 'inert' && value === null && previous !== null
			case 'isolation-trigger':
				return node === trigger && callback === 'focus'
			case 'focus':
				return node === host && callback === 'focus'
			case 'shown-event':
				return node === host && callback === 'event' && name === OFFCANVAS_EVENTS.shown
		}
	}
}

interface Row {
	readonly id: string
	// The stages before the last one stop the show; the last one runs the nested call.
	readonly path: ReadonlyArray<{ readonly point: Point; readonly action: Action }>
	// Whether the show starts from a backdrop the panel holds after a consumer took both off the page.
	readonly held?: boolean
	// What the page must read when the nested call is refused: the outer show completing, or the
	// stopped show's return to the hidden state the host chose. A row with no base is data only.
	readonly base?: 'shown' | 'stopped'
}

interface Reading {
	readonly outer: boolean
	readonly nested: boolean | undefined
	readonly accepted: boolean | undefined
	readonly host: string
	readonly modal: string | null
	readonly role: string | null
	readonly backdrops: readonly string[]
	readonly neighbour: boolean
	readonly overflow: string
	readonly padding: string
	readonly focus: string
	readonly events: readonly string[]
	readonly writes: readonly string[]
	readonly stale: readonly string[]
}

const SHOWN = {
	host: 'offcanvas offcanvas-start show',
	modal: 'true',
	role: 'dialog',
	backdrops: ['offcanvas-backdrop fade show'],
	neighbour: true,
	overflow: 'hidden',
}
const STOPPED = {
	host: 'offcanvas offcanvas-start',
	modal: null,
	role: null,
	backdrops: [],
}
const HIDDEN = { ...STOPPED, neighbour: false, overflow: '' }
const RESTORED = { ...HIDDEN, padding: '', writes: [] }

function describeWrite(record: MutationRecord): string {
	const target = record.target instanceof Element ? record.target.localName : record.target.nodeName
	if (record.type === 'attributes') {
		const now =
			record.target instanceof Element ? record.target.getAttribute(String(record.attributeName)) : null
		return `${target}@${String(record.attributeName)}:${String(record.oldValue)}->${String(now)}`
	}
	return `${target}:children+${record.addedNodes.length}-${record.removedNodes.length}`
}

async function driveRow(row: Row): Promise<Reading> {
	scene.load(tokensCascade)
	scene.load(fadeCascade)
	scene.load(offcanvasCascade)
	const root = scene.mount('<div></div>')
	const styled = document.createElement('probe-os-styled')
	styled.className = 'fixed-top'
	styled.setAttribute('style', 'display: block; position: fixed; left: 0; right: 0; top: 0; height: 1px')
	const neighbour = document.createElement('probe-os-inert')
	const trigger = document.createElement('button')
	trigger.type = 'button'
	const host = document.createElement('probe-os-host')
	host.className = 'offcanvas offcanvas-start'
	host.tabIndex = -1
	const child = document.createElement('probe-os-child')
	root.append(styled, neighbour, trigger, host)
	const events = createRecorder<readonly [string]>()
	const offcanvas = new Offcanvas(host)
	const world: World = { root, host, neighbour, trigger, styled, child, offcanvas }
	const listening = new AbortController()
	for (const wire of Object.values(OFFCANVAS_EVENTS)) {
		host.addEventListener(
			wire,
			(event) => {
				events.handler(event.type)
				advanceStage({ node: host, callback: 'event', name: event.type, previous: null, value: null })
			},
			{ signal: listening.signal },
		)
	}
	for (const element of [host, trigger]) {
		element.addEventListener(
			'focus',
			() => advanceStage({ node: element, callback: 'focus', name: '', previous: null, value: null }),
			{ signal: listening.signal },
		)
	}
	const waiter = new MutationObserver(() =>
		advanceStage({ node: host, callback: 'wait', name: '', previous: null, value: null }),
	)
	if (row.held === true) {
		expect(await offcanvas.show(trigger)).toBe(true)
		const backdrop = root.querySelector('.offcanvas-backdrop')
		if (backdrop === null) throw new Error('No backdrop after the held show')
		host.classList.remove('show')
		backdrop.classList.remove('show')
		backdrop.remove()
		backdrop.append(child)
		events.clear()
	}
	// Every record after a destruction, delivered or still queued at the reading.
	const landed: MutationRecord[] = []
	const writes = new MutationObserver((records) => landed.push(...records))
	const staled: MutationRecord[] = []
	const staleness = new MutationObserver((records) => staled.push(...records))
	let nested: Promise<boolean> | undefined
	let accepted: boolean | undefined
	const act = (action: Action): void => {
		if (action === 'destroy' || action === 'control') {
			offcanvas.destroy()
			writes.observe(document.documentElement, {
				attributes: true,
				attributeOldValue: true,
				childList: true,
				subtree: true,
			})
			// The instrument's control: a write after the destruction the observer must report.
			if (action === 'control') host.setAttribute('aria-modal', 'control')
			return
		}
		if (action === 'resize') {
			host.style.setProperty('position', 'static')
			window.dispatchEvent(new Event('resize'))
			return
		}
		if (action === 'against') {
			host.classList.remove('show')
			return
		}
		if (action === 'toward') {
			host.classList.add('show')
			return
		}
		if (action === 'reshow') host.classList.remove('show')
		if (action === 'retoken-hide') host.classList.add('show')
		const hiding = action === 'hide' || action === 'retoken-hide'
		const before = events.count
		nested = hiding ? offcanvas.hide() : offcanvas.show(trigger)
		accepted = events.calls
			.slice(before)
			.some(([type]) => (hiding ? type === OFFCANVAS_EVENTS.hide : type === OFFCANVAS_EVENTS.show))
		// Every write from the end of the nested call's synchronous part until the stopped show returns
		// is a write of the stale change or of a sub-component acting for it.
		if (accepted) {
			staleness.observe(document.documentElement, {
				attributes: true,
				attributeOldValue: true,
				childList: true,
				subtree: true,
			})
		}
	}
	for (const [index, { point, action }] of row.path.entries()) {
		stages.push({
			match: matchPoint(world, point),
			run: () => {
				// A stop stage that reaches the backdrop puts a child in it, so the rehide's removal reacts.
				if (index < row.path.length - 1) {
					root.querySelector('.offcanvas-backdrop')?.append(child)
				}
				act(action)
			},
		})
	}
	waiter.observe(host, { attributes: true, attributeFilter: ['class'] })
	const outer = await offcanvas.show(trigger)
	const stale = [...staled, ...staleness.takeRecords()].map(describeWrite)
	staleness.disconnect()
	waiter.disconnect()
	const settled = nested === undefined ? undefined : await nested
	if (row.path.some(({ action }) => action === 'resize')) {
		await waitForCondition('the resize hide completes', () =>
			events.calls.flat().includes(OFFCANVAS_EVENTS.hidden),
		)
	}
	await waitForCondition('the panel and its backdrops settle', () =>
		[host, ...Array.from(document.querySelectorAll('.offcanvas-backdrop'))].every(
			(element) => element.getAnimations().length === 0,
		),
	)
	await new Promise((resolve) => setTimeout(resolve, 30))
	const active = document.activeElement
	const reading: Reading = {
		outer,
		nested: settled,
		accepted,
		host: host.className,
		modal: host.getAttribute('aria-modal'),
		role: host.getAttribute('role'),
		backdrops: Array.from(document.querySelectorAll('.offcanvas-backdrop')).map(
			(element) => element.className,
		),
		neighbour: neighbour.inert,
		overflow: document.body.style.overflow,
		padding: styled.style.paddingRight,
		focus: active === host ? 'host' : active === trigger ? 'trigger' : String(active?.localName),
		events: events.calls.flat(),
		writes: [...landed, ...writes.takeRecords()].map(describeWrite),
		stale,
	}
	writes.disconnect()
	listening.abort()
	stages.splice(0)
	offcanvas.destroy()
	return reading
}

function expectInvariant(row: Row, reading: Reading): void {
	const last = row.path.at(-1)
	if (last === undefined) return
	const { action } = last
	const state = {
		host: reading.host,
		modal: reading.modal,
		role: reading.role,
		backdrops: reading.backdrops,
		neighbour: reading.neighbour,
		overflow: reading.overflow,
		padding: reading.padding,
		writes: reading.writes,
	}
	if (action === 'destroy') {
		expect(state).toEqual(RESTORED)
		return
	}
	if ((action === 'show' || action === 'reshow') && reading.accepted === true) {
		expect({ ...state, nested: reading.nested, stale: reading.stale }).toMatchObject({
			...SHOWN,
			nested: true,
			stale: [],
		})
		expect(reading.events.filter((type) => type === OFFCANVAS_EVENTS.shown)).toHaveLength(1)
		expect(reading.events.at(-1)).toBe(OFFCANVAS_EVENTS.shown)
		return
	}
	if (action === 'resize') {
		expect(state).toMatchObject(HIDDEN)
		expect(reading.events.at(-1)).toBe(OFFCANVAS_EVENTS.hidden)
		return
	}
	if ((action === 'hide' || action === 'retoken-hide') && reading.accepted === true) {
		expect({ ...state, nested: reading.nested, stale: reading.stale }).toMatchObject({
			...HIDDEN,
			nested: true,
			stale: [],
		})
		expect(reading.events.at(-1)).toBe(OFFCANVAS_EVENTS.hidden)
		return
	}
	if (row.base === 'stopped') {
		expect({ ...state, outer: reading.outer }).toMatchObject({ ...STOPPED, outer: false })
		expect(reading.events).not.toContain(OFFCANVAS_EVENTS.shown)
		return
	}
	if (row.base === 'shown') {
		expect({ ...state, outer: reading.outer }).toMatchObject({ ...SHOWN, outer: true })
	}
}

// The points a single reaction reaches while the show is in flight, before and after it adds `show`.
const FLIGHT_BEFORE: readonly Point[] = ['pre', 'lock', 'insert', 'aria-modal', 'role', 'showing-add']
const FLIGHT_AFTER: readonly Point[] = [
	'shown-add',
	'wait',
	'showing-remove',
	'isolation',
	'focus',
	'shown-event',
]
const REHIDE: readonly Point[] = [
	'rehide-showing',
	'rehide-aria-modal',
	'rehide-role',
	'rehide-backdrop',
]

const rows: Row[] = []
function addRow(row: Omit<Row, 'id'>): void {
	rows.push({ ...row, id: `OS-${rows.length + 1}` })
}

// Seed rows: the isolation's construction answers the show's stop, and its destruction runs
// consumer code before `#rehide` captures the change identity.
for (const point of ['isolation-release', 'isolation-trigger'] as const) {
	for (const action of ['show', 'destroy', 'hide', 'toward'] as const) {
		addRow({
			path: [
				{ point: 'isolation', action: 'against' },
				{ point, action },
			],
			...(action === 'toward' ? {} : { base: 'stopped' as const }),
		})
	}
}
for (const point of FLIGHT_BEFORE) {
	for (const action of ['destroy', 'show', 'hide', 'toward'] as const) {
		addRow({
			path: [{ point, action }],
			...(point === 'insert' ? { held: true } : {}),
			...(action === 'toward' ? {} : { base: 'shown' as const }),
		})
	}
}
for (const point of FLIGHT_AFTER) {
	for (const action of ['destroy', 'show', 'hide', 'against'] as const) {
		addRow({
			path: [{ point, action }],
			...(action === 'against'
				? point === 'shown-event'
					? {}
					: { base: 'stopped' as const }
				: { base: 'shown' as const }),
		})
	}
}
for (const point of REHIDE) {
	for (const action of ['destroy', 'show', 'hide', 'toward'] as const) {
		addRow({
			path: [
				{ point: 'shown-add', action: 'against' },
				{ point, action },
			],
			...(action === 'toward' ? {} : { base: 'stopped' as const }),
		})
	}
}
for (const entry of ['wait', 'showing-remove', 'focus', 'isolation'] as const) {
	for (const action of ['show', 'destroy'] as const) {
		addRow({
			path: [
				{ point: entry, action: 'against' },
				{ point: 'rehide-aria-modal', action },
			],
			base: 'stopped',
		})
	}
}
for (const action of ['reshow', 'hide', 'destroy'] as const) {
	addRow({
		path: [
			{ point: 'lock', action: 'toward' },
			{ point: 'lock-release', action },
		],
	})
}

// A nested hide on a host a reaction gave the `shown` token back, inside the returning step and
// inside the isolation's release that precedes it.
for (const point of ['isolation-release', 'rehide-aria-modal', 'rehide-backdrop'] as const) {
	addRow({
		path: [
			{ point: point === 'isolation-release' ? 'isolation' : 'shown-add', action: 'against' },
			{ point, action: 'retoken-hide' },
		],
		base: 'stopped',
	})
}
// A window resize during the show, applied after the completed event, alone and with a hide the
// completed event's listener starts.
addRow({ path: [{ point: 'wait', action: 'resize' }] })
addRow({
	path: [
		{ point: 'wait', action: 'resize' },
		{ point: 'shown-event', action: 'hide' },
	],
})

describe('probe offcanvas-show', () => {
	it('reports a write that lands after the destruction, the control of the write instrument', async () => {
		const reading = await driveRow({ id: 'control', path: [{ point: 'role', action: 'control' }] })
		expect(reading.writes).toEqual(['probe-os-host@aria-modal:null->control'])
	})

	for (const row of rows) {
		const label = row.path.map(({ point, action }) => `${point}:${action}`).join(' > ')
		it(`${row.id} ${label}${row.held === true ? ' (held backdrop)' : ''}`, async () => {
			const reading = await driveRow(row)
			console.log(`READING ${row.id} ${label} ${JSON.stringify(reading)}`)
			expectInvariant(row, reading)
		})
	}
})
