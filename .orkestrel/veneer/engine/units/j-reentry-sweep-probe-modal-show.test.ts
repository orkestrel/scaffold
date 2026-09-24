// Probe for J-REENTRY-SWEEP, lens `modal-show`. Throwaway: it maps every point on `Modal.show` where
// consumer code runs after the change started, starts a nested call there, and reads the settled page.
// A row asserts the invariant of its nested call; a failing row is an incoherent point.
import { Modal } from '@src/browser'
import { waitForCondition, waitForDelay } from '@orkestrel/test'
import { afterEach, describe, expect, it } from 'vitest'
import tokensCascade from '../../../src/styles/_tokens.scss?inline'
import fadeCascade from '../../../src/styles/components/_fade.scss?inline'
import modalCascade from '../../../src/styles/components/_modal.scss?inline'
import { scene } from '../../setupBrowser.js'

afterEach(() => scene.clear())

interface Reaction {
	readonly source: string
	readonly name: string
	readonly value: string | null
	readonly previous: string | null
}

type Nested = 'destroy' | 'show' | 'hide' | 'against' | 'toward' | 'toward-hide' | 'against-show' | 'child'

interface Step {
	readonly match: (reaction: Reaction) => boolean
	readonly act: Nested
}

interface Row {
	readonly id: string
	readonly point: string
	readonly steps: readonly Step[]
	readonly expect: 'shown' | 'hidden' | 'stopped' | 'restored' | 'data'
	readonly backdrop?: boolean
	readonly fade?: boolean
	readonly focus?: boolean
	readonly detached?: boolean
	readonly cascade?: boolean
	readonly tall?: boolean
	readonly body?: boolean
	readonly trigger?: boolean
	readonly sheet?: string
	readonly sticky?: boolean
	readonly inert?: boolean
	readonly focused?: boolean
}

let feed: ((reaction: Reaction) => void) | undefined

function emitReaction(source: string, name: string, previous: string | null, value: string | null): void {
	feed?.({ source, name, value, previous })
}

function defineProbeElements(): void {
	if (customElements.get('vn-ms-host') !== undefined) return
	customElements.define(
		'vn-ms-host',
		class extends HTMLElement {
			static observedAttributes = ['class', 'style', 'aria-hidden', 'aria-modal', 'role', 'inert']
			attributeChangedCallback(name: string, previous: string | null, value: string | null) {
				emitReaction('host', name, previous, value)
			}
			connectedCallback() {
				emitReaction('host', 'connected', null, null)
			}
		},
	)
	customElements.define(
		'vn-ms-sibling',
		class extends HTMLElement {
			static observedAttributes = ['inert']
			attributeChangedCallback(name: string, previous: string | null, value: string | null) {
				emitReaction('sibling', name, previous, value)
			}
		},
	)
	customElements.define(
		'vn-ms-fixed',
		class extends HTMLElement {
			static observedAttributes = ['style']
			attributeChangedCallback(name: string, previous: string | null, value: string | null) {
				emitReaction('fixed', name, previous, value)
			}
		},
	)
	customElements.define(
		'vn-ms-child',
		class extends HTMLElement {
			connectedCallback() {
				emitReaction('child', 'connected', null, null)
			}
			disconnectedCallback() {
				emitReaction('child', 'disconnected', null, null)
			}
		},
	)
	customElements.define(
		'vn-ms-body',
		class extends HTMLBodyElement {
			static observedAttributes = ['class', 'style']
			attributeChangedCallback(name: string, previous: string | null, value: string | null) {
				emitReaction('body', name, previous, value)
			}
		},
		{ extends: 'body' },
	)
}

function hasToken(value: string | null, token: string): boolean {
	return (value ?? '').split(' ').includes(token)
}

function addsToken(reaction: Reaction, source: string, token: string): boolean {
	return (
		reaction.source === source &&
		reaction.name === 'class' &&
		hasToken(reaction.value, token) &&
		!hasToken(reaction.previous, token)
	)
}

function dropsToken(reaction: Reaction, source: string, token: string): boolean {
	return (
		reaction.source === source &&
		reaction.name === 'class' &&
		!hasToken(reaction.value, token) &&
		hasToken(reaction.previous, token)
	)
}

function addsStyle(reaction: Reaction, source: string, text: string): boolean {
	return (
		reaction.source === source &&
		reaction.name === 'style' &&
		(reaction.value ?? '').includes(text) &&
		!(reaction.previous ?? '').includes(text)
	)
}

interface Reading {
	readonly outer: boolean
	readonly nested: boolean | undefined
	readonly shown: boolean
	readonly display: string
	readonly computed: string
	readonly hidden: string | null
	readonly modal: string | null
	readonly role: string | null
	readonly backdrops: readonly string[]
	readonly inert: boolean
	readonly open: boolean
	readonly overflow: string
	readonly pad: string
	readonly after: readonly string[]
	readonly rewrites: readonly string[]
	readonly events: readonly string[]
	readonly late: readonly string[]
	readonly acted: readonly string[]
	readonly initial: readonly (string | null)[]
	readonly final: readonly (string | null)[]
}

function describeRecord(record: MutationRecord): string {
	const target = record.target
	const label =
		target instanceof HTMLElement
			? `${target.localName}${target.className === '' ? '' : `.${target.className.split(' ').join('.')}`}`
			: target.nodeName
	if (record.type === 'attributes') {
		const value = target instanceof Element ? target.getAttribute(record.attributeName ?? '') : null
		return `${label}@${record.attributeName}=${String(value)}`
	}
	const added = Array.from(record.addedNodes, (node) => `+${node.nodeName}`)
	const removed = Array.from(record.removedNodes, (node) => `-${node.nodeName}`)
	return `${label}:${[...added, ...removed].join(',')}`
}

async function runRow(row: Row): Promise<Reading> {
	defineProbeElements()
	const backdrop = row.backdrop ?? true
	const fade = row.fade ?? false
	const focus = row.focus ?? true
	const original = document.body
	let body: HTMLElement = original
	if (row.body === true) {
		body = document.createElement('body', { is: 'vn-ms-body' })
		body.append(...original.childNodes)
		document.body = body
	}
	if (row.cascade ?? true) scene.load(`${tokensCascade}\n${fadeCascade}\n${modalCascade}`)
	if (row.sheet !== undefined) scene.load(row.sheet)
	const root = scene.mount('<div></div>')
	const sibling = document.createElement('vn-ms-sibling')
	const fixed = document.createElement('vn-ms-fixed')
	fixed.className = row.sticky === true ? 'sticky-top' : 'fixed-top'
	fixed.style.cssText = 'position: fixed; left: 0; right: 0; top: 0; height: 1px'
	const trigger = document.createElement('button')
	trigger.textContent = 'Open'
	const host = document.createElement('vn-ms-host')
	host.className = fade ? 'modal fade' : 'modal'
	host.tabIndex = -1
	host.setAttribute('aria-hidden', 'true')
	if (row.inert === true) host.setAttribute('inert', '')
	host.innerHTML = `<div class="modal-dialog"><div class="modal-content"><div style="height: ${
		row.tall === true ? window.innerHeight * 2 : 10
	}px"></div></div></div>`
	root.append(sibling, fixed, trigger)
	if (row.detached !== true) root.append(host)
	const initial = [
		host.getAttribute('class'),
		host.getAttribute('style'),
		host.getAttribute('aria-hidden'),
		host.getAttribute('aria-modal'),
		host.getAttribute('role'),
	]
	const events: string[] = []
	const acted: string[] = []
	const late: string[] = []
	const listeners = new AbortController()
	for (const type of ['show', 'shown', 'hide', 'hidden']) {
		host.addEventListener(
			`${type}.vn.modal`,
			(event) => {
				events.push(event.type)
				emitReaction('event', event.type, null, null)
			},
			{ signal: listeners.signal },
		)
	}
	for (const type of ['focus', 'focusin', 'blur', 'focusout']) {
		host.addEventListener(type, () => emitReaction('focus', `host:${type}`, null, null), {
			signal: listeners.signal,
		})
		trigger.addEventListener(type, () => emitReaction('focus', `trigger:${type}`, null, null), {
			signal: listeners.signal,
		})
	}
	const modal = new Modal(host, { backdrop, focus })
	let nested: Promise<boolean> | undefined
	let recorder: MutationObserver | undefined
	let tracker: MutationObserver | undefined
	const tracked: MutationRecord[] = []
	const track = (): void => {
		if (tracker !== undefined) return
		tracker = new MutationObserver((records) => tracked.push(...records))
		tracker.observe(host, { attributes: true, attributeOldValue: true })
		tracker.observe(document.body, { childList: true })
	}
	const queue = [...row.steps]
	const act = (step: Nested): void => {
		acted.push(step)
		if (step === 'destroy') {
			modal.destroy()
			recorder = new MutationObserver((records) => {
				for (const record of records) late.push(describeRecord(record))
			})
			recorder.observe(document.documentElement, {
				attributes: true,
				childList: true,
				subtree: true,
			})
		}
		if (step === 'show') {
			track()
			nested = modal.show()
		}
		if (step === 'hide') {
			track()
			nested = modal.hide()
		}
		if (step === 'against-show') {
			host.classList.remove('show')
			track()
			nested = modal.show()
		}
		if (step === 'against') host.classList.remove('show')
		if (step === 'toward') host.classList.add('show')
		if (step === 'toward-hide') {
			host.classList.add('show')
			track()
			nested = modal.hide()
		}
		if (step === 'child') {
			const element = document.querySelector('body > .modal-backdrop')
			element?.append(document.createElement('vn-ms-child'))
		}
	}
	feed = (reaction) => {
		const head = queue[0]
		if (head === undefined || !head.match(reaction)) return
		queue.shift()
		act(head.act)
	}
	const watcher = new MutationObserver((records) => {
		for (const record of records) {
			for (const node of record.addedNodes) {
				if (node instanceof HTMLElement) emitReaction('observer', 'added', null, node.className)
			}
			if (record.type === 'attributes' && record.target === host) {
				emitReaction('observer', `host@${record.attributeName}`, record.oldValue, host.getAttribute(record.attributeName ?? ''))
			}
		}
	})
	watcher.observe(document.body, { childList: true, attributes: true, subtree: true, attributeOldValue: true })
	if (row.detached === true) {
		watcher.observe(host, { attributes: true, attributeOldValue: true })
	}
	if (row.focused === true) trigger.focus()
	try {
		const outer = await modal.show(row.trigger === true ? trigger : undefined)
		const settled = await nested
		await waitForCondition(
			'the page settles',
			() => document.getAnimations().length === 0,
		)
		await waitForDelay(20)
		feed = undefined
		watcher.disconnect()
		if (recorder !== undefined) {
			for (const record of recorder.takeRecords()) late.push(describeRecord(record))
			recorder.disconnect()
		}
		if (tracker !== undefined) {
			tracked.push(...tracker.takeRecords())
			tracker.disconnect()
		}
		const after = tracked.map((record) => describeRecord(record))
		const rewrites: string[] = []
		for (const name of ['class', 'aria-hidden', 'aria-modal', 'role']) {
			const count = tracked.filter((record) => record.type === 'attributes' && record.attributeName === name).length
			if (count > 1) rewrites.push(`${name} written ${count} times`)
		}
		const removals = tracked.filter((record) => record.type === 'childList' && record.removedNodes.length > 0).length
		if (removals > 0 && acted.at(-1) !== 'toward-hide' && acted.at(-1) !== 'hide') rewrites.push(`backdrop removed ${removals} times`)
		return {
			outer,
			nested: settled,
			shown: host.classList.contains('show'),
			display: host.style.display,
			computed: getComputedStyle(host).display,
			hidden: host.getAttribute('aria-hidden'),
			modal: host.getAttribute('aria-modal'),
			role: host.getAttribute('role'),
			backdrops: Array.from(document.querySelectorAll('.modal-backdrop'), (element) =>
				`${element.className}${element.isConnected ? '' : ' (detached)'}`,
			),
			inert: sibling.inert,
			open: document.body.classList.contains('modal-open'),
			overflow: document.body.style.overflow,
			pad: document.body.style.paddingRight,
			after,
			rewrites,
			events: [...events],
			late: [...late],
			acted: [...acted],
			initial,
			final: [
				host.getAttribute('class'),
				host.getAttribute('style'),
				host.getAttribute('aria-hidden'),
				host.getAttribute('aria-modal'),
				host.getAttribute('role'),
			],
		}
	} finally {
		feed = undefined
		watcher.disconnect()
		recorder?.disconnect()
		tracker?.disconnect()
		listeners.abort()
		modal.destroy()
		host.remove()
		for (const element of document.querySelectorAll('.modal-backdrop')) element.remove()
		if (row.body === true) {
			original.append(...body.childNodes)
			document.body = original
		}
	}
}

function checkInvariant(row: Row, reading: Reading): void {
	const backdrop = row.backdrop ?? true
	console.log(`${row.id} ${JSON.stringify(reading)}`)
	expect(reading.acted, `${row.id} reached every step`).toEqual(row.steps.map((step) => step.act))
	if (row.expect === 'data') return
	if (row.expect === 'shown') {
		expect({
			shown: reading.shown,
			display: reading.display,
			hidden: reading.hidden,
			modal: reading.modal,
			role: reading.role,
			backdrops: reading.backdrops.length,
			backdropShown: reading.backdrops.every((name) => hasToken(name, 'show')),
			open: reading.open,
			overflow: reading.overflow,
			compensated: reading.pad !== '',
			rewrites: reading.rewrites,
			completed: reading.events.at(-1),
		}).toEqual({
			shown: true,
			display: 'block',
			hidden: null,
			modal: 'true',
			role: 'dialog',
			backdrops: backdrop ? 1 : 0,
			backdropShown: true,
			open: true,
			overflow: 'hidden',
			compensated: true,
			rewrites: [],
			completed: 'shown.vn.modal',
		})
		return
	}
	if (row.expect === 'hidden' || row.expect === 'stopped') {
		expect({
			shown: reading.shown,
			display: reading.display,
			hidden: reading.hidden,
			modal: reading.modal,
			role: reading.role,
			backdrops: reading.backdrops,
			...(row.expect === 'hidden'
				? { open: reading.open, overflow: reading.overflow, inert: reading.inert, rewrites: reading.rewrites, completed: reading.events.at(-1) }
				: {}),
		}).toEqual({
			shown: false,
			display: 'none',
			hidden: 'true',
			modal: null,
			role: null,
			backdrops: [],
			...(row.expect === 'hidden'
				? { open: false, overflow: '', inert: false, rewrites: [], completed: 'hidden.vn.modal' }
				: {}),
		})
		return
	}
	expect({
		final: reading.final,
		backdrops: reading.backdrops,
		open: reading.open,
		overflow: reading.overflow,
		inert: reading.inert,
		late: reading.late,
	}).toEqual({
		final: reading.initial,
		backdrops: [],
		open: false,
		overflow: '',
		inert: false,
		late: [],
	})
}

const onShowEvent = (reaction: Reaction): boolean =>
	reaction.source === 'event' && reaction.name === 'show.vn.modal'
const onShownEvent = (reaction: Reaction): boolean =>
	reaction.source === 'event' && reaction.name === 'shown.vn.modal'
const onFixedPad = (reaction: Reaction): boolean => addsStyle(reaction, 'fixed', 'padding-right')
const onBodyOverflow = (reaction: Reaction): boolean => addsStyle(reaction, 'body', 'overflow')
const onBodyPad = (reaction: Reaction): boolean => addsStyle(reaction, 'body', 'padding-right')
const onBodyOpen = (reaction: Reaction): boolean => addsToken(reaction, 'body', 'modal-open')
const onAdjust = (reaction: Reaction): boolean => addsStyle(reaction, 'host', 'padding-left')
const onBackdropAwait = (reaction: Reaction): boolean =>
	reaction.source === 'observer' && reaction.name === 'added' && hasToken(reaction.value, 'modal-backdrop')
const onConnected = (reaction: Reaction): boolean =>
	reaction.source === 'host' && reaction.name === 'connected'
const onDisplayBlock = (reaction: Reaction): boolean => addsStyle(reaction, 'host', 'display: block')
const onAriaHidden = (reaction: Reaction): boolean =>
	reaction.source === 'host' && reaction.name === 'aria-hidden' && reaction.value === null
const onAriaModal = (reaction: Reaction): boolean =>
	reaction.source === 'host' && reaction.name === 'aria-modal' && reaction.value === 'true'
const onRole = (reaction: Reaction): boolean =>
	reaction.source === 'host' && reaction.name === 'role' && reaction.value === 'dialog'
const onShownToken = (reaction: Reaction): boolean => addsToken(reaction, 'host', 'show')
const onFadeAwait = (reaction: Reaction): boolean =>
	reaction.source === 'observer' &&
	reaction.name === 'host@class' &&
	hasToken(reaction.value, 'show') &&
	!hasToken(reaction.previous, 'show')
const onInert = (reaction: Reaction): boolean =>
	reaction.source === 'sibling' && reaction.name === 'inert' && reaction.value !== null
const onRelease = (reaction: Reaction): boolean =>
	reaction.source === 'sibling' && reaction.name === 'inert' && reaction.value === null
const onHostFocus = (reaction: Reaction): boolean =>
	reaction.source === 'focus' && reaction.name === 'host:focus'
const onTriggerFocus = (reaction: Reaction): boolean =>
	reaction.source === 'focus' && reaction.name === 'trigger:focus'
const onRehideDisplay = (reaction: Reaction): boolean => addsStyle(reaction, 'host', 'display: none')
const onRehideHidden = (reaction: Reaction): boolean =>
	reaction.source === 'host' && reaction.name === 'aria-hidden' && reaction.value === 'true'
const onRehideModal = (reaction: Reaction): boolean =>
	reaction.source === 'host' && reaction.name === 'aria-modal' && reaction.value === null && reaction.previous !== null
const onRehideRole = (reaction: Reaction): boolean =>
	reaction.source === 'host' && reaction.name === 'role' && reaction.value === null && reaction.previous !== null
const onBodyOverflowRestore = (reaction: Reaction): boolean =>
	reaction.source === 'body' &&
	reaction.name === 'style' &&
	(reaction.previous ?? '').includes('overflow') &&
	!(reaction.value ?? '').includes('overflow')
const onFixedRestore = (reaction: Reaction): boolean =>
	reaction.source === 'fixed' &&
	reaction.name === 'style' &&
	(reaction.previous ?? '').includes('padding-right') &&
	!(reaction.value ?? '').includes('padding-right')
const onHostInertDropped = (reaction: Reaction): boolean =>
	reaction.source === 'host' && reaction.name === 'inert' && reaction.value === null
const onHostInertRestored = (reaction: Reaction): boolean =>
	reaction.source === 'host' && reaction.name === 'inert' && reaction.value !== null
const onTriggerBlur = (reaction: Reaction): boolean =>
	reaction.source === 'focus' && reaction.name === 'trigger:blur'
const onChildGone = (reaction: Reaction): boolean =>
	reaction.source === 'child' && reaction.name === 'disconnected'

// The stop that sends a show to `#rehide` directly: the host drops the `shown` token in reaction to
// the show adding it.
const stopAtToken: Step = { match: onShownToken, act: 'against' }
const placeChild: Step = { match: onBackdropAwait, act: 'child' }

const rows: readonly Row[] = [
	// Seed rows: the isolation's construction stops the show, and its `destroy` runs consumer code
	// before `#rehide` captures the change identity.
	{ id: 'MS-1', point: 'show: isolation.destroy() before #rehide (sibling release)', steps: [{ match: onInert, act: 'against' }, { match: onRelease, act: 'show' }], expect: 'shown' },
	{ id: 'MS-2', point: 'show: isolation.destroy() before #rehide (sibling release), no backdrop', backdrop: false, steps: [{ match: onInert, act: 'against' }, { match: onRelease, act: 'show' }], expect: 'shown' },
	{ id: 'MS-3', point: 'show: isolation.destroy() before #rehide (trigger focus)', trigger: true, steps: [{ match: onInert, act: 'against' }, { match: onTriggerFocus, act: 'show' }], expect: 'shown' },
	{ id: 'MS-4', point: 'show: isolation.destroy() before #rehide (sibling release), toward-hide', steps: [{ match: onInert, act: 'against' }, { match: onRelease, act: 'toward-hide' }], expect: 'hidden' },
	{ id: 'MS-5', point: 'show: isolation.destroy() before #rehide (sibling release), destroy', steps: [{ match: onInert, act: 'against' }, { match: onRelease, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-6', point: 'show: isolation.destroy() before #rehide (sibling release), toward', steps: [{ match: onInert, act: 'against' }, { match: onRelease, act: 'toward' }], expect: 'data' },
	// The pre-change event.
	{ id: 'MS-7', point: 'show: show.vn.modal dispatch', steps: [{ match: onShowEvent, act: 'show' }], expect: 'shown' },
	{ id: 'MS-8', point: 'show: show.vn.modal dispatch', steps: [{ match: onShowEvent, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-9', point: 'show: show.vn.modal dispatch', steps: [{ match: onShowEvent, act: 'toward' }], expect: 'data' },
	// The scroll lock's construction.
	{ id: 'MS-10', point: 'show: new ScrollLock, fixed padding write', steps: [{ match: onFixedPad, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-11', point: 'show: new ScrollLock, fixed padding write', steps: [{ match: onFixedPad, act: 'show' }], expect: 'shown' },
	{ id: 'MS-12', point: 'show: new ScrollLock, fixed padding write', steps: [{ match: onFixedPad, act: 'toward' }], expect: 'data' },
	{ id: 'MS-13', point: 'show: new ScrollLock, body overflow write', body: true, steps: [{ match: onBodyOverflow, act: 'toward' }], expect: 'data' },
	{ id: 'MS-14', point: 'show: new ScrollLock, body padding write', body: true, steps: [{ match: onBodyPad, act: 'destroy' }], expect: 'restored' },
	// The `open` token and the dialog adjustment.
	{ id: 'MS-15', point: 'show: #holdOpen body token', body: true, steps: [{ match: onBodyOpen, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-16', point: 'show: #holdOpen body token', body: true, steps: [{ match: onBodyOpen, act: 'hide' }], expect: 'shown' },
	{ id: 'MS-17', point: 'show: #holdOpen body token', body: true, steps: [{ match: onBodyOpen, act: 'toward' }], expect: 'data' },
	{ id: 'MS-18', point: 'show: #adjust padding-left', cascade: false, sheet: 'vn-ms-host { display: block }', tall: true, steps: [{ match: onAdjust, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-19', point: 'show: #adjust padding-left', cascade: false, sheet: 'vn-ms-host { display: block }', tall: true, steps: [{ match: onAdjust, act: 'toward' }], expect: 'data' },
	// The backdrop's show.
	{ id: 'MS-20', point: 'show: await backdrop.show()', steps: [{ match: onBackdropAwait, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-21', point: 'show: await backdrop.show()', steps: [{ match: onBackdropAwait, act: 'show' }], expect: 'shown' },
	{ id: 'MS-22', point: 'show: await backdrop.show()', steps: [{ match: onBackdropAwait, act: 'toward' }], expect: 'data' },
	{ id: 'MS-23', point: 'show: await backdrop.show() (fade)', fade: true, steps: [{ match: onBackdropAwait, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-24', point: 'show: await backdrop.show() (fade)', fade: true, steps: [{ match: onBackdropAwait, act: 'toward-hide' }], expect: 'data' },
	// The host's writes.
	{ id: 'MS-25', point: 'show: body.append(host)', detached: true, steps: [{ match: onConnected, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-26', point: 'show: body.append(host)', detached: true, steps: [{ match: onConnected, act: 'toward' }], expect: 'data' },
	{ id: 'MS-27', point: 'show: display block', steps: [{ match: onDisplayBlock, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-28', point: 'show: display block', steps: [{ match: onDisplayBlock, act: 'toward' }], expect: 'data' },
	{ id: 'MS-29', point: 'show: remove aria-hidden', steps: [{ match: onAriaHidden, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-30', point: 'show: remove aria-hidden', steps: [{ match: onAriaHidden, act: 'show' }], expect: 'shown' },
	{ id: 'MS-31', point: 'show: aria-modal', steps: [{ match: onAriaModal, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-32', point: 'show: aria-modal', steps: [{ match: onAriaModal, act: 'toward' }], expect: 'data' },
	{ id: 'MS-33', point: 'show: role', steps: [{ match: onRole, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-34', point: 'show: role', steps: [{ match: onRole, act: 'toward' }], expect: 'data' },
	{ id: 'MS-35', point: 'show: shown token', steps: [{ match: onShownToken, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-36', point: 'show: shown token', steps: [{ match: onShownToken, act: 'hide' }], expect: 'shown' },
	{ id: 'MS-37', point: 'show: shown token', steps: [stopAtToken], expect: 'stopped' },
	// The dialog's transition.
	{ id: 'MS-38', point: 'show: await settleAnimations (fade)', fade: true, steps: [{ match: onFadeAwait, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-39', point: 'show: await settleAnimations (fade)', fade: true, steps: [{ match: onFadeAwait, act: 'against' }], expect: 'stopped' },
	{ id: 'MS-40', point: 'show: await settleAnimations (fade)', fade: true, steps: [{ match: onFadeAwait, act: 'hide' }], expect: 'shown' },
	// The isolation's construction.
	{ id: 'MS-41', point: 'show: new Isolation, sibling inert', steps: [{ match: onInert, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-42', point: 'show: new Isolation, sibling inert', steps: [{ match: onInert, act: 'hide' }], expect: 'shown' },
	{ id: 'MS-43', point: 'show: new Isolation, sibling inert', steps: [{ match: onInert, act: 'against' }], expect: 'stopped' },
	// The focus move.
	{ id: 'MS-44', point: 'show: host.focus()', steps: [{ match: onHostFocus, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-45', point: 'show: host.focus()', steps: [{ match: onHostFocus, act: 'against' }], expect: 'stopped' },
	{ id: 'MS-46', point: 'show: host.focus()', steps: [{ match: onHostFocus, act: 'hide' }], expect: 'shown' },
	{ id: 'MS-47', point: 'show: host.focus(), focusin', steps: [{ match: (reaction) => reaction.source === 'focus' && reaction.name === 'host:focusin', act: 'show' }], expect: 'shown' },
	// The completed event.
	{ id: 'MS-48', point: 'show: shown.vn.modal dispatch', steps: [{ match: onShownEvent, act: 'hide' }], expect: 'hidden' },
	{ id: 'MS-49', point: 'show: shown.vn.modal dispatch', steps: [{ match: onShownEvent, act: 'destroy' }], expect: 'restored' },
	// The `#rehide` step, entered by the host dropping the token the show adds.
	{ id: 'MS-50', point: '#rehide: display none', steps: [stopAtToken, { match: onRehideDisplay, act: 'show' }], expect: 'shown' },
	{ id: 'MS-51', point: '#rehide: display none', steps: [stopAtToken, { match: onRehideDisplay, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-52', point: '#rehide: display none', steps: [stopAtToken, { match: onRehideDisplay, act: 'toward-hide' }], expect: 'hidden' },
	{ id: 'MS-53', point: '#rehide: display none', steps: [stopAtToken, { match: onRehideDisplay, act: 'toward' }], expect: 'data' },
	{ id: 'MS-54', point: '#rehide: aria-hidden', steps: [stopAtToken, { match: onRehideHidden, act: 'show' }], expect: 'shown' },
	{ id: 'MS-55', point: '#rehide: aria-hidden', steps: [stopAtToken, { match: onRehideHidden, act: 'toward-hide' }], expect: 'hidden' },
	{ id: 'MS-56', point: '#rehide: aria-modal', steps: [stopAtToken, { match: onRehideModal, act: 'show' }], expect: 'shown' },
	{ id: 'MS-57', point: '#rehide: aria-modal', steps: [stopAtToken, { match: onRehideModal, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-58', point: '#rehide: role', steps: [stopAtToken, { match: onRehideRole, act: 'show' }], expect: 'shown' },
	{ id: 'MS-59', point: '#rehide: role', steps: [stopAtToken, { match: onRehideRole, act: 'toward-hide' }], expect: 'hidden' },
	{ id: 'MS-60', point: '#rehide: backdrop destroy', steps: [placeChild, stopAtToken, { match: onChildGone, act: 'show' }], expect: 'shown' },
	{ id: 'MS-61', point: '#rehide: backdrop destroy', steps: [placeChild, stopAtToken, { match: onChildGone, act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-62', point: '#rehide: backdrop destroy', steps: [placeChild, stopAtToken, { match: onChildGone, act: 'toward-hide' }], expect: 'hidden' },
	// The scroll lock's sticky margin write, and its restoration inside the stopped path's `lock.destroy()`.
	{ id: 'MS-63', point: 'show: new ScrollLock, sticky margin write', sticky: true, steps: [{ match: (reaction) => addsStyle(reaction, 'fixed', 'margin-right'), act: 'destroy' }], expect: 'restored' },
	{ id: 'MS-64', point: 'show: new ScrollLock, sticky margin write', sticky: true, steps: [{ match: (reaction) => addsStyle(reaction, 'fixed', 'margin-right'), act: 'toward' }], expect: 'data' },
	{ id: 'MS-65', point: 'show: lock.destroy() after a stopped lock construction (body overflow restore)', body: true, steps: [{ match: onFixedPad, act: 'toward' }, { match: onBodyOverflowRestore, act: 'against-show' }], expect: 'shown' },
	{ id: 'MS-66', point: 'show: lock.destroy() after a stopped lock construction (fixed padding restore)', steps: [{ match: onFixedPad, act: 'toward' }, { match: onFixedRestore, act: 'against-show' }], expect: 'shown' },
	{ id: 'MS-67', point: 'show: lock.destroy() after a stopped lock construction (body overflow restore)', body: true, steps: [{ match: onFixedPad, act: 'toward' }, { match: onBodyOverflowRestore, act: 'destroy' }], expect: 'restored' },
	// The isolation's chain claim on an inert host, and that claim's release inside the stopped path's `isolation.destroy()`.
	{ id: 'MS-68', point: 'show: new Isolation host chain claim, then isolation.destroy() host release', inert: true, steps: [{ match: onHostInertDropped, act: 'against' }, { match: onHostInertRestored, act: 'show' }], expect: 'shown' },
	// A focused element outside the host at the show.
	{ id: 'MS-69', point: 'show: blur of the focused trigger', focused: true, steps: [{ match: onTriggerBlur, act: 'against' }], expect: 'stopped' },
	{ id: 'MS-70', point: 'show: isolation.destroy() before #rehide, trigger focused before the show (its focus call dispatches nothing)', focused: true, trigger: true, steps: [{ match: onInert, act: 'against' }], expect: 'stopped' },
]

describe('probe modal-show', () => {
	for (const row of rows) {
		it(`${row.id} ${row.point} -> ${row.steps.map((step) => step.act).join(', ')}`, async () => {
			checkInvariant(row, await runRow(row))
		})
	}
})
