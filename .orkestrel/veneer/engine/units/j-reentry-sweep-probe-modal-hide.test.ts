// Throwaway probe for the J-REENTRY-SWEEP `modal-hide` lens. It maps every point on `Modal.hide`,
// from its pre-change event to its completed event and the `#reshow` step it can end in, where
// consumer code runs, and what a nested destroy, show, hide, or token move there leaves behind.
import { Modal, MODAL_EVENTS } from '@src/browser'
import { waitForCondition, waitForDelay } from '@orkestrel/test'
import { afterEach, describe, expect, it, onTestFinished } from 'vitest'
import tokensCascade from '../../../src/styles/_tokens.scss?inline'
import fadeCascade from '../../../src/styles/components/_fade.scss?inline'
import modalCascade from '../../../src/styles/components/_modal.scss?inline'
import { scene } from '../../setupBrowser.js'

afterEach(() => scene.clear())

type Nested = 'destroy' | 'show' | 'hide' | 'against' | 'toward' | 'toward-show' | 'control'
type Point =
	| 'pre'
	| 'isolation'
	| 'focus'
	| 'token'
	| 'fade'
	| 'display'
	| 'aria-hidden'
	| 'aria-modal'
	| 'role'
	| 'backdrop-fade'
	| 'removal'
	| 'open'
	| 'padding-left'
	| 'padding-right'
	| 'lock'
	| 'hidden'
	| 'r-display'
	| 'r-aria-hidden'
	| 'r-aria-modal'
	| 'r-role'
	| 'r-insert'
	| 'r-fade'
	| 'backdrop-observer'
	| 'r-observer'

interface Row {
	readonly id: string
	readonly point: Point
	readonly nested: Nested
	readonly fade: boolean
	readonly takeover?: Point
}

interface Sink {
	react: ((site: string) => void) | undefined
}

const sink: Sink = { react: undefined }
const cascade = `${tokensCascade}\n${fadeCascade}\n${modalCascade}`

customElements.define(
	'vn-probe-mh-host',
	class extends HTMLElement {
		static observedAttributes = ['class', 'style', 'aria-hidden', 'aria-modal', 'role']
		attributeChangedCallback(attribute: string) {
			sink.react?.(`host:${attribute}`)
		}
	},
)
customElements.define(
	'vn-probe-mh-beside',
	class extends HTMLElement {
		static observedAttributes = ['inert']
		attributeChangedCallback() {
			sink.react?.('beside:inert')
		}
	},
)
customElements.define(
	'vn-probe-mh-fixed',
	class extends HTMLElement {
		static observedAttributes = ['style']
		attributeChangedCallback() {
			sink.react?.('fixed:style')
		}
	},
)
customElements.define(
	'vn-probe-mh-child',
	class extends HTMLElement {
		connectedCallback() {
			sink.react?.('child:connected')
		}
		disconnectedCallback() {
			sink.react?.('child:disconnected')
		}
	},
)
customElements.define(
	'vn-probe-mh-body',
	class extends HTMLBodyElement {
		static observedAttributes = ['class']
		attributeChangedCallback() {
			sink.react?.('body:class')
		}
	},
	{ extends: 'body' },
)

// The point a timer scheduled at another point reaches: code running while the change awaits.
const SCHEDULED: Partial<Record<Point, Point>> = {
	fade: 'token',
	'backdrop-fade': 'role',
	'r-fade': 'r-insert',
}

function matchPoint(
	point: Point,
	site: string,
	host: HTMLElement,
	fixed: HTMLElement,
	backdrop: HTMLElement | null,
): boolean {
	const style = host.style
	switch (point) {
		case 'backdrop-observer':
			return site === 'observer:backdrop' && backdrop?.classList.contains('show') === false
		case 'r-observer':
			return site === 'observer:backdrop' && backdrop?.classList.contains('show') === true
		case 'pre':
			return site === 'event:hide'
		case 'hidden':
			return site === 'event:hidden'
		case 'isolation':
			return site === 'beside:inert'
		case 'focus':
			return site === 'button:focus'
		case 'token':
			return site === 'host:class' && !host.classList.contains('show')
		case 'display':
			return site === 'host:style' && style.display === 'none' && style.paddingLeft !== ''
		case 'aria-hidden':
			return site === 'host:aria-hidden' && host.getAttribute('aria-hidden') === 'true'
		case 'aria-modal':
			return site === 'host:aria-modal' && !host.hasAttribute('aria-modal')
		case 'role':
			return site === 'host:role' && !host.hasAttribute('role')
		case 'removal':
			return site === 'child:disconnected'
		case 'open':
			return site === 'body:class' && !document.body.classList.contains('modal-open')
		case 'padding-left':
			return (
				site === 'host:style' &&
				style.display === 'none' &&
				style.paddingLeft === '' &&
				style.paddingRight !== ''
			)
		case 'padding-right':
			return site === 'host:style' && style.display === 'none' && style.paddingRight === ''
		case 'lock':
			return site === 'fixed:style' && fixed.style.paddingRight === ''
		case 'r-display':
			return site === 'host:style' && style.display === 'block'
		case 'r-aria-hidden':
			return site === 'host:aria-hidden' && !host.hasAttribute('aria-hidden')
		case 'r-aria-modal':
			return site === 'host:aria-modal' && host.getAttribute('aria-modal') === 'true'
		case 'r-role':
			return site === 'host:role' && host.getAttribute('role') === 'dialog'
		case 'r-insert':
			return site === 'child:connected'
		default:
			return false
	}
}

interface Reading {
	readonly id: string
	readonly reached: boolean
	readonly outer: boolean
	readonly nested: boolean | undefined
	readonly found: boolean
	readonly host: {
		readonly show: boolean
		readonly display: string
		readonly computed: string
		readonly hidden: string | null
		readonly modal: string | null
		readonly role: string | null
	}
	readonly backdrops: readonly string[]
	readonly inert: { readonly beside: boolean; readonly button: boolean }
	readonly body: { readonly overflow: string; readonly open: boolean }
	readonly events: readonly string[]
	readonly stale: readonly string[]
	readonly later: readonly string[]
}

async function runRow(row: Row): Promise<Reading> {
	let swapped: { original: HTMLElement; body: HTMLElement } | undefined
	if (row.point === 'open' || row.takeover === 'open') {
		const original = document.body
		const body = document.createElement('body', { is: 'vn-probe-mh-body' })
		body.append(...original.childNodes)
		document.body = body
		swapped = { original, body }
	}
	onTestFinished(() => {
		if (swapped === undefined) return
		swapped.original.append(...swapped.body.childNodes)
		document.body = swapped.original
	})
	scene.load(cascade)
	const root = scene.mount('<div></div>')
	const beside = document.createElement('vn-probe-mh-beside')
	const button = document.createElement('button')
	button.textContent = 'Open'
	const fixed = document.createElement('vn-probe-mh-fixed')
	fixed.className = 'fixed-top'
	fixed.setAttribute('style', 'display: block; position: fixed; left: 0; right: 0')
	const host = document.createElement('vn-probe-mh-host')
	host.className = row.fade ? 'modal fade' : 'modal'
	host.tabIndex = -1
	host.setAttribute('style', 'padding-left: 4px; padding-right: 3px')
	host.innerHTML =
		'<div class="modal-dialog"><div class="modal-content"><div class="modal-body">Body</div></div></div>'
	root.append(beside, button, fixed, host)
	const events: string[] = []
	const listening = new AbortController()
	onTestFinished(() => listening.abort())
	const modal = new Modal(host, { focus: true })
	onTestFinished(() => modal.destroy())
	for (const wire of [
		MODAL_EVENTS.show,
		MODAL_EVENTS.shown,
		MODAL_EVENTS.hide,
		MODAL_EVENTS.hidden,
	]) {
		host.addEventListener(
			wire,
			(event) => {
				events.push(event.type)
				if (event.type === MODAL_EVENTS.hide) sink.react?.('event:hide')
				if (event.type === MODAL_EVENTS.hidden) sink.react?.('event:hidden')
			},
			{ signal: listening.signal },
		)
	}
	button.addEventListener('focus', () => sink.react?.('button:focus'), {
		signal: listening.signal,
	})
	button.focus()
	expect(await modal.show(button)).toBe(true)
	const backdrop = document.querySelector<HTMLElement>('body > .modal-backdrop')
	const child = document.createElement('vn-probe-mh-child')
	backdrop?.append(child)
	events.length = 0
	const log: MutationRecord[] = []
	const main = new MutationObserver((records) => log.push(...records))
	onTestFinished(() => main.disconnect())
	const later: MutationRecord[] = []
	const after = new MutationObserver((records) => later.push(...records))
	onTestFinished(() => after.disconnect())
	const probe: {
		phase: 'idle' | 'hide' | 'reshow'
		taken: boolean
		fired: boolean
		scheduled: boolean
		marker: number
		nested: Promise<boolean> | undefined
	} = { phase: 'idle', taken: false, fired: false, scheduled: false, marker: -1, nested: undefined }
	const mark = (): void => {
		log.push(...main.takeRecords())
		probe.marker = log.length
	}
	const fire = (): void => {
		probe.fired = true
		if (row.nested === 'destroy') {
			modal.destroy()
			after.observe(document.documentElement, {
				attributes: true,
				attributeOldValue: true,
				childList: true,
				subtree: true,
			})
			return
		}
		if (row.nested === 'against') {
			probe.phase = 'reshow'
			host.classList.add('show')
			return
		}
		if (row.nested === 'toward') {
			host.classList.remove('show')
			return
		}
		if (row.nested === 'toward-show') host.classList.remove('show')
		mark()
		probe.nested = row.nested === 'show' || row.nested === 'toward-show' ? modal.show(button) : modal.hide()
		// The negative control: a write of the shown state after the nested hide started, which the
		// stale-write reading must report.
		if (row.nested === 'control') host.setAttribute('aria-modal', 'true')
	}
	onTestFinished(() => {
		sink.react = undefined
	})
	sink.react = (site) => {
		if (
			probe.phase === 'hide' &&
			row.takeover !== undefined &&
			!probe.taken &&
			matchPoint(row.takeover, site, host, fixed, backdrop)
		) {
			probe.taken = true
			probe.phase = 'reshow'
			host.classList.add('show')
			return
		}
		if (probe.fired) return
		const inPhase = row.point.startsWith('r-') ? probe.phase === 'reshow' : probe.phase === 'hide'
		if (!inPhase) return
		const scheduled = SCHEDULED[row.point]
		if (scheduled !== undefined) {
			if (probe.scheduled || !matchPoint(scheduled, site, host, fixed, backdrop)) return
			probe.scheduled = true
			setTimeout(() => {
				if (!probe.fired) fire()
			}, 0)
			return
		}
		if (matchPoint(row.point, site, host, fixed, backdrop)) fire()
	}
	// An observer of the backdrop's `class` attribute runs at the next microtask checkpoint, which is
	// inside the hide's await on the backdrop's own hide, or after the returning step showed it.
	const watcher = new MutationObserver(() => sink.react?.('observer:backdrop'))
	onTestFinished(() => watcher.disconnect())
	if (backdrop !== null) watcher.observe(backdrop, { attributeFilter: ['class'] })
	main.observe(document.documentElement, {
		attributes: true,
		attributeOldValue: true,
		childList: true,
		subtree: true,
	})
	probe.phase = 'hide'
	const outer = await modal.hide()
	await waitForDelay(40)
	const nested = probe.nested === undefined ? undefined : await probe.nested
	await waitForCondition('the animations settle', () => document.getAnimations().length === 0)
	await waitForDelay(20)
	log.push(...main.takeRecords())
	later.push(...after.takeRecords())
	sink.react = undefined
	const label = (node: Node): string => {
		if (node === host) return 'host'
		if (node === backdrop) return 'backdrop'
		if (node === beside) return 'beside'
		if (node === button) return 'button'
		if (node === fixed) return 'fixed'
		if (node === child) return 'child'
		if (node === document.body) return 'body'
		if (node === root) return 'root'
		return node.nodeName.toLowerCase()
	}
	const describeRecords = (records: readonly MutationRecord[], from: number): string[] => {
		const lines: string[] = []
		records.forEach((record, index) => {
			if (index < from) return
			if (record.type === 'attributes' && record.attributeName !== null) {
				const attribute = record.attributeName
				const next = records
					.slice(index + 1)
					.find((later) => later.target === record.target && later.attributeName === attribute)
				const target = record.target
				const to =
					next === undefined
						? target instanceof Element
							? target.getAttribute(attribute)
							: null
						: next.oldValue
				lines.push(`${label(target)}.${attribute}: ${record.oldValue} -> ${to}`)
			}
			if (record.type === 'childList') {
				for (const node of record.addedNodes) lines.push(`${label(record.target)} + ${label(node)}`)
				for (const node of record.removedNodes) {
					lines.push(`${label(record.target)} - ${label(node)}`)
				}
			}
		})
		return lines
	}
	const transitions = probe.marker < 0 ? [] : describeRecords(log, probe.marker)
	const hasShow = (value: string): boolean => /(^|\s)show(\s|$)/.test(value)
	const staleFor = (line: string): boolean => {
		const [subject = '', change = ''] = line.split(': ')
		const [from = '', to = ''] = change.split(' -> ')
		const showing = row.nested === 'hide' || row.nested === 'control'
		if (showing) {
			if (subject === 'backdrop.class' || subject === 'host.class') {
				return !hasShow(from) && hasShow(to)
			}
			if (subject === 'host.style') return to.includes('display: block')
			if (subject === 'host.aria-modal') return to === 'true'
			if (subject === 'host.role') return to === 'dialog'
			if (subject === 'host.aria-hidden') return from === 'true' && to === 'null'
			return line === 'body + backdrop'
		}
		if (subject === 'backdrop.class' || subject === 'host.class') {
			return hasShow(from) && !hasShow(to)
		}
		if (subject === 'host.style') return to.includes('display: none')
		if (subject === 'host.aria-modal' || subject === 'host.role') return to === 'null'
		if (subject === 'host.aria-hidden') return to === 'true'
		return line === 'body - backdrop'
	}
	const reading: Reading = {
		id: row.id,
		reached: probe.fired,
		outer,
		nested,
		found: Modal.find(host) === modal,
		host: {
			show: host.classList.contains('show'),
			display: host.style.display,
			computed: getComputedStyle(host).display,
			hidden: host.getAttribute('aria-hidden'),
			modal: host.getAttribute('aria-modal'),
			role: host.getAttribute('role'),
		},
		backdrops: Array.from(document.querySelectorAll('body > .modal-backdrop')).map(
			(element) => element.className,
		),
		inert: { beside: beside.hasAttribute('inert'), button: button.inert },
		body: {
			overflow: document.body.style.overflow,
			open: document.body.classList.contains('modal-open'),
		},
		events: [...events],
		stale: transitions.filter(staleFor),
		later: describeRecords(later, 0),
	}
	console.log(`PROBE ${JSON.stringify(reading)}`)
	modal.destroy()
	return reading
}

// Returns the invariant's violations for a row: an empty list reads coherent.
function judge(row: Row, reading: Reading): string[] {
	const violations: string[] = []
	const hidden = {
		show: false,
		display: 'none',
		computed: 'none',
		hidden: 'true',
		modal: null,
		role: null,
	}
	const shown = {
		show: true,
		display: 'block',
		computed: 'block',
		hidden: null,
		modal: 'true',
		role: 'dialog',
	}
	const check = (name: string, actual: unknown, expected: unknown): void => {
		if (JSON.stringify(actual) !== JSON.stringify(expected)) {
			violations.push(`${name}: ${JSON.stringify(actual)} (expected ${JSON.stringify(expected)})`)
		}
	}
	const backdrop = row.fade ? 'modal-backdrop fade show' : 'modal-backdrop show'
	if (!reading.reached) violations.push('point not reached')
	if (row.nested === 'destroy') {
		check('found', reading.found, false)
		check('later', reading.later, [])
		check('backdrops', reading.backdrops, [])
		check('open', reading.body.open, false)
		return violations
	}
	const expectsNested = row.nested !== 'destroy' && row.nested !== 'against' && row.nested !== 'toward'
	if (expectsNested && reading.nested === true) {
		const showing = row.nested !== 'hide' && row.nested !== 'control'
		check('host', reading.host, showing ? shown : hidden)
		check('backdrops', reading.backdrops, showing ? [backdrop] : [])
		check('open', reading.body.open, showing)
		check('inert', reading.inert, { beside: showing, button: showing })
		check('stale', reading.stale, [])
		check('last event', reading.events.at(-1), showing ? MODAL_EVENTS.shown : MODAL_EVENTS.hidden)
		return violations
	}
	if (expectsNested) {
		// The nested call was refused, so the outer hide's own end state is the reading.
		check('outer', reading.outer, true)
		check('host', reading.host, hidden)
		check('backdrops', reading.backdrops, [])
		check('open', reading.body.open, false)
		return violations
	}
	if (row.nested === 'against') {
		check('outer', reading.outer, false)
		check('host', reading.host, shown)
		check('backdrops', reading.backdrops, [backdrop])
		check('events', reading.events.includes(MODAL_EVENTS.hidden), false)
	}
	return violations
}

const NESTED_BY_POINT: ReadonlyArray<readonly [Point, readonly Nested[], boolean]> = [
	['pre', ['destroy', 'hide', 'toward', 'toward-show'], false],
	['isolation', ['destroy', 'show', 'hide', 'toward'], false],
	['focus', ['destroy', 'show', 'toward'], false],
	['token', ['destroy', 'against', 'show'], false],
	['fade', ['destroy', 'against', 'show'], true],
	['display', ['destroy', 'against', 'hide'], false],
	['aria-hidden', ['destroy', 'against'], false],
	['aria-modal', ['destroy', 'against'], false],
	['role', ['destroy', 'against'], false],
	['backdrop-fade', ['destroy', 'against'], true],
	['removal', ['destroy', 'against'], false],
	['open', ['destroy', 'against'], false],
	['padding-left', ['destroy', 'against'], false],
	['padding-right', ['destroy', 'against'], false],
	['lock', ['destroy', 'against'], false],
	['hidden', ['destroy', 'show'], false],
]

const RESHOW: ReadonlyArray<readonly [Point, readonly Nested[]]> = [
	['r-display', ['destroy', 'hide', 'toward-show', 'toward']],
	['r-aria-hidden', ['destroy', 'hide', 'toward-show']],
	['r-aria-modal', ['destroy', 'hide', 'toward-show']],
	['r-role', ['destroy', 'hide', 'toward-show']],
	['r-insert', ['destroy', 'hide', 'toward-show', 'toward']],
]

const ROWS: Row[] = [
	{ id: 'SEED-1', point: 'r-insert', nested: 'hide', fade: false, takeover: 'removal' },
	{ id: 'SEED-2', point: 'r-insert', nested: 'hide', fade: true, takeover: 'removal' },
	{ id: 'SEED-3', point: 'r-insert', nested: 'hide', fade: false, takeover: 'lock' },
	{ id: 'SEED-4', point: 'r-insert', nested: 'hide', fade: false, takeover: 'padding-right' },
	{ id: 'SEED-5', point: 'r-insert', nested: 'hide', fade: false, takeover: 'open' },
]
for (const [point, list, fade] of NESTED_BY_POINT) {
	for (const nested of list) ROWS.push({ id: `${point}/${nested}`, point, nested, fade })
}
for (const [point, list] of RESHOW) {
	for (const nested of list) {
		for (const fade of [false, true]) {
			ROWS.push({
				id: `${point}/${nested}/${fade ? 'fade' : 'plain'}`,
				point,
				nested,
				fade,
				takeover: 'removal',
			})
		}
	}
}
const OBSERVED: readonly Nested[] = ['destroy', 'against']
for (const nested of OBSERVED) {
	ROWS.push({ id: `backdrop-observer/${nested}`, point: 'backdrop-observer', nested, fade: false })
}
const RETURNED: readonly Nested[] = ['destroy', 'hide', 'toward-show']
for (const nested of RETURNED) {
	ROWS.push({ id: `r-observer/${nested}`, point: 'r-observer', nested, fade: false, takeover: 'backdrop-observer' })
}
const WAITING: readonly Nested[] = ['destroy', 'hide']
for (const nested of WAITING) {
	ROWS.push({ id: `r-fade/${nested}`, point: 'r-fade', nested, fade: true, takeover: 'removal' })
}

ROWS.push({ id: 'CONTROL', point: 'r-display', nested: 'control', fade: false, takeover: 'removal' })

describe('probe: Modal.hide re-entry', () => {
	for (const row of ROWS) {
		it(row.id, async () => {
			const reading = await runRow(row)
			const same = row.nested === 'toward'
			expect(same ? [] : judge(row, reading)).toEqual([])
		})
	}
})
