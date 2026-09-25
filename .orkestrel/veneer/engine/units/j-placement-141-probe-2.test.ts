// J-PLACEMENT-141-PROBE-2: the successor of J-PLACEMENT-141-PROBE. Reads which rendering order anchors a
// scroller-resident dropdown menu, to decide between the two designs in
// `units/j-placement-141-fix-design-verdict.md`:
// - `tokenFirst` emulates design A: the menu's `shown` token lands before the promotion and the
//   anchoring, with no layout read;
// - `tokenFirstLayout` is the same plus an `offsetWidth` read before the promotion;
// - `deferAnchor` emulates the deferred design by hand, outside `Dropdown`: promotion while hidden,
//   then the tokens, then the anchoring declarations written for the first time after the menu renders.
// `baseline`, `missingAnchor`, and the hit test are the first probe's controls, copied unchanged;
// `display` is the first probe's variant, copied unchanged as the reading both builds already hold.
// Each variant runs on a fresh fixture per rule and per clip, reads a first show, then hides, shows a
// second time, and reads that show the same way, because on Chromium 141 the fault recurs there. Every
// reading is one `ROW` line, every run one `VERDICT` line, every variant one `VARIANT` line per show,
// and every control one `CONTROL` line, checked in the last test so every row logs before a failed
// control reddens the run. A failed control voids every reading of the run, and the `VOID` line says so.
import {
	DROPDOWN_ATTRIBUTES,
	DROPDOWN_CLASSES,
	DROPDOWN_DEFAULTS,
	DROPDOWN_EVENTS,
	Dropdown,
	PLACEMENT_AREAS,
	POPOVER_PROPERTIES,
} from '@src/browser'
import { waitForCondition } from '@orkestrel/test'
import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import tokensCascade from '../../src/styles/_tokens.scss?inline'
import dropdownCascade from '../../src/styles/components/_dropdown.scss?inline'
import tooltipCascade from '../../src/styles/components/_tooltip.scss?inline'
import popoverCascade from '../../src/styles/components/_popover.scss?inline'

// ---------------------------------------------------------------------------------------------------
// Instrument helpers, copied from the first probe.
// ---------------------------------------------------------------------------------------------------

function raf(): Promise<void> {
	return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

async function twoFrames(): Promise<void> {
	await raf()
	await raf()
}

function row(name: string, value: unknown): void {
	console.log(`ROW ${name} ${JSON.stringify(value)}`)
}

function round2(value: number): number {
	return Math.round(value * 100) / 100
}

function describeElement(element: Element | null): string | null {
	if (element === null) return null
	const classes = element instanceof HTMLElement && element.className !== '' ? `.${element.className.trim().split(/\s+/).join('.')}` : ''
	return `${element.tagName.toLowerCase()}${classes}`
}

async function settle(description: string, condition: () => boolean): Promise<boolean> {
	try {
		await waitForCondition(description, condition, { budget: 1000, interval: 16 })
		return true
	} catch {
		return false
	}
}

interface Control {
	readonly name: string
	readonly ok: boolean
}

const controls: Control[] = []

function checkControl(name: string, expected: unknown, actual: unknown, ok: boolean): void {
	console.log(`CONTROL ${name} ${ok ? 'ok' : 'FAILED'} expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`)
	controls.push({ name, ok })
}

// ---------------------------------------------------------------------------------------------------
// The cascade and the two rules, copied from the first probe.
// ---------------------------------------------------------------------------------------------------

const CANDIDATE_RULE =
	':where(.dropdown-menu, .tooltip, .popover):popover-open { position-visibility: anchors-visible }'
const CONTROL_RULE =
	':where(.dropdown-menu, .tooltip, .popover):popover-open { position-visibility: always }'
const RULES: ReadonlyArray<readonly [string, string]> = [
	['candidate', CANDIDATE_RULE],
	['always', CONTROL_RULE],
]

function installCascade(rule: string): HTMLStyleElement {
	const style = document.createElement('style')
	style.textContent = [tokensCascade, dropdownCascade, tooltipCascade, popoverCascade, rule].join(
		'\n',
	)
	document.head.append(style)
	return style
}

// ---------------------------------------------------------------------------------------------------
// The fixture, copied from the first probe, plus the `trace` each variant's preparation appends to.
// ---------------------------------------------------------------------------------------------------

interface Recorder {
	phase: string
	readonly entries: string[]
}

interface Counters {
	sideWrites: number
	scrollends: number
}

interface Fixture {
	readonly reference: HTMLElement
	readonly scroller: HTMLElement
	readonly menu: HTMLElement
	readonly dropdown: Dropdown
	readonly recorder: Recorder
	readonly counters: Counters
	readonly observer: MutationObserver
	readonly trace: unknown[]
	readonly teardown: () => void
}

function createRecorderOn(host: HTMLElement, names: readonly string[]): Recorder {
	const recorder: Recorder = { phase: 'build', entries: [] }
	for (const name of names) {
		host.addEventListener(name, () => recorder.entries.push(`${recorder.phase}:${name}`))
	}
	return recorder
}

// A 200px spacer, then a 300x150 scroller whose content is a 60px lead, the slot, and an 800px tail.
function buildScrollerPage(): { readonly scroller: HTMLElement; readonly slot: HTMLElement; readonly teardown: () => void } {
	const spacer = document.createElement('div')
	spacer.style.height = '200px'
	const scroller = document.createElement('div')
	scroller.style.cssText = 'width:300px;height:150px;overflow:auto;position:relative;border:0'
	const lead = document.createElement('div')
	lead.style.height = '60px'
	const slot = document.createElement('div')
	const tail = document.createElement('div')
	tail.style.height = '800px'
	scroller.append(lead, slot, tail)
	document.body.append(spacer, scroller)
	return {
		scroller,
		slot,
		teardown: () => {
			spacer.remove()
			scroller.remove()
		},
	}
}

function buildDropdownIn(parent: HTMLElement): { readonly toggle: HTMLElement; readonly menu: HTMLElement; readonly dropdown: Dropdown } {
	const wrap = document.createElement('div')
	wrap.className = 'dropdown'
	const toggle = document.createElement('button')
	toggle.type = 'button'
	toggle.textContent = 'toggle'
	toggle.setAttribute('data-bs-toggle', 'dropdown')
	const menu = document.createElement('div')
	menu.className = 'dropdown-menu'
	menu.innerHTML = '<a class="dropdown-item" href="#">Item</a>'
	wrap.append(toggle, menu)
	parent.append(wrap)
	return { toggle, menu, dropdown: new Dropdown(toggle) }
}

function buildScrolledDropdown(): Fixture {
	const page = buildScrollerPage()
	const { toggle, menu, dropdown } = buildDropdownIn(page.slot)
	const counters: Counters = { sideWrites: 0, scrollends: 0 }
	const observer = new MutationObserver((records) => {
		counters.sideWrites += records.length
	})
	observer.observe(menu, { attributes: true, attributeFilter: [DROPDOWN_ATTRIBUTES.side] })
	const listeners = new AbortController()
	document.addEventListener('scrollend', () => counters.scrollends++, { capture: true, signal: listeners.signal })
	return {
		reference: toggle,
		scroller: page.scroller,
		menu,
		dropdown,
		recorder: createRecorderOn(toggle, Object.values(DROPDOWN_EVENTS)),
		counters,
		observer,
		trace: [],
		teardown: () => {
			observer.disconnect()
			listeners.abort()
			page.teardown()
			menu.remove()
		},
	}
}

// ---------------------------------------------------------------------------------------------------
// The clips, copied from the first probe.
// ---------------------------------------------------------------------------------------------------

interface Scroll {
	readonly distance: number
	readonly scrollTop: number
}

function scrollerClipFull(fixture: Fixture): Scroll {
	const scroller = fixture.scroller
	const distance = Math.ceil(fixture.reference.getBoundingClientRect().bottom - scroller.getBoundingClientRect().top + 20)
	scroller.scrollTop += distance
	return { distance, scrollTop: scroller.scrollTop }
}

function scrollerClipPartial(fixture: Fixture): Scroll {
	const scroller = fixture.scroller
	const reference = fixture.reference.getBoundingClientRect()
	const distance = Math.round(reference.top - scroller.getBoundingClientRect().top + reference.height / 2)
	scroller.scrollTop += distance
	return { distance, scrollTop: scroller.scrollTop }
}

function scrollerRestore(fixture: Fixture): void {
	fixture.scroller.scrollTop = 0
}

const CLIPS: ReadonlyArray<readonly [string, (fixture: Fixture) => Scroll]> = [
	['full', scrollerClipFull],
	['partial', scrollerClipPartial],
]

// ---------------------------------------------------------------------------------------------------
// The phase reading, copied from the first probe.
// ---------------------------------------------------------------------------------------------------

interface Box {
	readonly left: number
	readonly top: number
	readonly width: number
	readonly height: number
	readonly bottom: number
}

interface Phase {
	readonly reference: Box
	readonly menu: Box
	readonly gap: number
	readonly edge: number
	readonly scroller: { readonly top: number; readonly left: number }
	readonly document: { readonly x: number; readonly y: number }
	readonly parent: string | null
	readonly inline: string
	readonly computed: Readonly<Record<string, string>>
	readonly anchorNames: string
	readonly side: string | null
	readonly sideWrites: number
	readonly scrollends: number
	readonly centreInViewport: boolean
	readonly hitIsOverlay: boolean | null
	readonly hit: string | null
	readonly checkVisibility: boolean
	readonly checkVisibilityWithVisibility: boolean
	readonly open: boolean
	readonly shown: boolean
	readonly active: string | null
}

const COMPUTED = [
	'position',
	'top',
	'right',
	'bottom',
	'left',
	'margin-top',
	'margin-right',
	'margin-bottom',
	'margin-left',
	'position-anchor',
	'position-area',
	'position-try-fallbacks',
	'display',
	'overflow',
	'visibility',
	'position-visibility',
]

function readBox(element: Element): Box {
	const rect = element.getBoundingClientRect()
	return {
		left: round2(rect.left),
		top: round2(rect.top),
		width: round2(rect.width),
		height: round2(rect.height),
		bottom: round2(rect.bottom),
	}
}

function readPhase(fixture: Fixture): Phase {
	const { menu, reference, scroller, counters } = fixture
	counters.sideWrites += fixture.observer.takeRecords().length
	const referenceBox = readBox(reference)
	const menuBox = readBox(menu)
	const x = menuBox.left + menuBox.width / 2
	const y = menuBox.top + menuBox.height / 2
	const inViewport = x >= 0 && x < window.innerWidth && y >= 0 && y < window.innerHeight
	const hit = inViewport ? document.elementFromPoint(x, y) : null
	const style = getComputedStyle(menu)
	const computed: Record<string, string> = {}
	for (const name of COMPUTED) computed[name] = style.getPropertyValue(name)
	return {
		reference: referenceBox,
		menu: menuBox,
		gap: round2(menuBox.top - referenceBox.bottom),
		edge: round2(menuBox.left - referenceBox.left),
		scroller: { top: scroller.scrollTop, left: scroller.scrollLeft },
		document: { x: window.scrollX, y: window.scrollY },
		parent: describeElement(menu.parentElement),
		inline: menu.style.cssText,
		computed,
		anchorNames: getComputedStyle(reference).getPropertyValue('anchor-name'),
		side: menu.getAttribute(DROPDOWN_ATTRIBUTES.side),
		sideWrites: counters.sideWrites,
		scrollends: counters.scrollends,
		centreInViewport: inViewport,
		hitIsOverlay: inViewport ? hit !== null && menu.contains(hit) : null,
		hit: describeElement(hit),
		checkVisibility: menu.checkVisibility(),
		checkVisibilityWithVisibility: menu.checkVisibility({ visibilityProperty: true }),
		open: menu.matches(':popover-open'),
		shown: fixture.dropdown.shown,
		active: describeElement(document.activeElement),
	}
}

// ---------------------------------------------------------------------------------------------------
// The show drivers. `EngineDriver` shows and hides through the dropdown itself. `DeferredDriver`
// emulates the deferred design outside `Dropdown`, in the order the objective lane's proposal keeps:
// the placement's construction promotes the hidden menu, the dropdown focuses the toggle, writes
// `aria-expanded`, and adds both `shown` tokens, and the dropdown's closing `placement.update()` finds
// the menu rendered and installs the anchoring for the first time. Each declaration names the line of
// `src/browser/Placement.ts` (or `Dropdown.ts`) at Veneer `d33b27c` whose write it copies.
// ---------------------------------------------------------------------------------------------------

interface Driver {
	show(): Promise<boolean>
	hide(): Promise<boolean>
	destroy(): void
}

class EngineDriver implements Driver {
	readonly #dropdown: Dropdown

	constructor(fixture: Fixture) {
		this.#dropdown = fixture.dropdown
	}

	show(): Promise<boolean> {
		return this.#dropdown.show()
	}

	hide(): Promise<boolean> {
		return this.#dropdown.hide()
	}

	destroy(): void {
		this.#dropdown.destroy()
	}
}

interface Declaration {
	readonly target: 'menu' | 'reference'
	readonly property: string
	readonly value: string
	readonly source: string
}

// The dropdown opens this fixture's menu at `bottom-start`: `Dropdown.ts` `#position` finds no
// direction token on the toggle's parent and no `--bs-position: end` on the menu.
const DEFERRED_POSITION = 'bottom-start'

// Resolves the anchoring `Placement`'s constructor writes, from its own expressions, for the options
// `Dropdown.ts` `#place` passes: the position above, `DROPDOWN_DEFAULTS.placement.offset`, and no
// `fallbacks`. `names` is the reference's computed `anchor-name` before the write.
function resolveDeferredDeclarations(anchor: string, names: string): readonly Declaration[] {
	const area = PLACEMENT_AREAS[DEFERRED_POSITION]
	const side = area.split(' ')[0]
	const vertical = side === 'top' || side === 'bottom'
	const [skid, distance] = DROPDOWN_DEFAULTS.placement.offset
	const tries = vertical ? 'flip-block' : 'flip-inline'
	return [
		{ target: 'menu', property: 'position', value: 'fixed', source: 'Placement.ts:167' },
		...['top', 'right', 'bottom', 'left'].map((edge): Declaration => ({ target: 'menu', property: edge, value: 'auto', source: 'Placement.ts:168' })),
		{ target: 'menu', property: 'margin-top', value: `${side === 'bottom' ? distance : vertical ? 0 : skid}px`, source: 'Placement.ts:169' },
		{ target: 'menu', property: 'margin-right', value: `${side === 'left' ? distance : vertical ? -skid : 0}px`, source: 'Placement.ts:170' },
		{ target: 'menu', property: 'margin-bottom', value: `${side === 'top' ? distance : vertical ? 0 : -skid}px`, source: 'Placement.ts:171' },
		{ target: 'menu', property: 'margin-left', value: `${side === 'right' ? distance : vertical ? skid : 0}px`, source: 'Placement.ts:172' },
		{ target: 'menu', property: 'position-anchor', value: anchor, source: 'Placement.ts:173 (name from :166)' },
		{ target: 'menu', property: 'position-area', value: area, source: 'Placement.ts:174 (PLACEMENT_AREAS, :107)' },
		{ target: 'menu', property: 'position-try-fallbacks', value: tries, source: 'Placement.ts:175 (tries, :112-119)' },
		{ target: 'menu', property: 'position-try-order', value: 'normal', source: 'Placement.ts:176' },
		{ target: 'reference', property: 'anchor-name', value: names === 'none' ? anchor : `${names}, ${anchor}`, source: 'Placement.ts:177-178' },
	]
}

interface Written {
	readonly element: HTMLElement
	readonly name: string
	readonly category: 'property' | 'attribute'
	readonly value: string | null
	readonly priority: string
}

class DeferredDriver implements Driver {
	static #count = 0
	readonly #fixture: Fixture
	#written: Written[] = []
	#listeners: AbortController | undefined
	#observer: ResizeObserver | undefined
	#pending = false

	constructor(fixture: Fixture) {
		this.#fixture = fixture
	}

	async show(): Promise<boolean> {
		const { menu, reference } = this.#fixture
		const token = DROPDOWN_CLASSES.shown
		if (menu.classList.contains(token)) return false
		// The placement's construction, Placement.ts:130-165: read what the platform's popover rule
		// changes, promote the hidden menu, and write each changed property back. The anchoring stays
		// pending, as the deferred design keeps it from Placement.ts:166 on.
		const style = getComputedStyle(menu)
		const unpromoted = POPOVER_PROPERTIES.map((name) => style.getPropertyValue(name))
		this.#saveAttribute(menu, 'popover')
		menu.setAttribute('popover', 'manual')
		menu.showPopover()
		const restored: string[] = []
		POPOVER_PROPERTIES.forEach((name, index) => {
			const value = unpromoted[index]
			if (value !== undefined && style.getPropertyValue(name) !== value) {
				this.#writeProperty(menu, name, value)
				restored.push(name)
			}
		})
		this.#pending = true
		// Placement.ts:180-185: the observer, the scroll-end listener, and the construction's own update,
		// which finds the menu unrendered and leaves the anchoring pending.
		const listeners = new AbortController()
		this.#listeners = listeners
		const observer = new ResizeObserver(() => this.#update('observer'))
		this.#observer = observer
		observer.observe(reference)
		reference.ownerDocument.addEventListener('scrollend', () => this.#update('scrollend'), {
			capture: true,
			signal: listeners.signal,
		})
		this.#fixture.trace.push({ step: 'promotion', open: menu.matches(':popover-open'), restored })
		this.#update('construction')
		// Dropdown.ts:277, :287, :292, :296: focus, `aria-expanded`, the menu's token, the toggle's token.
		reference.focus()
		reference.setAttribute('aria-expanded', 'true')
		menu.classList.add(token)
		reference.classList.add(token)
		// Dropdown.ts:299: the dropdown's closing update, the first that finds the menu rendered.
		this.#update('show')
		return true
	}

	async hide(): Promise<boolean> {
		const { menu, reference } = this.#fixture
		const token = DROPDOWN_CLASSES.shown
		if (!menu.classList.contains(token)) return false
		// Dropdown.ts:460 destroys the placement first, Placement.ts:241-262: hide the popover, then
		// restore every write in reverse.
		this.#release()
		// Dropdown.ts:465, :475, :483.
		menu.classList.remove(token)
		reference.classList.remove(token)
		reference.setAttribute('aria-expanded', 'false')
		return true
	}

	destroy(): void {
		this.#release()
		const token = DROPDOWN_CLASSES.shown
		this.#fixture.menu.classList.remove(token)
		this.#fixture.reference.classList.remove(token)
	}

	#release(): void {
		const { menu } = this.#fixture
		this.#listeners?.abort()
		this.#listeners = undefined
		this.#observer?.disconnect()
		this.#observer = undefined
		this.#pending = false
		if (menu.matches(':popover-open')) menu.hidePopover()
		for (const written of this.#written.toReversed()) {
			if (written.category === 'attribute') {
				if (written.value === null) written.element.removeAttribute(written.name)
				else written.element.setAttribute(written.name, written.value)
			} else if (written.value === null || written.value === '') {
				written.element.style.removeProperty(written.name)
			} else {
				written.element.style.setProperty(written.name, written.value, written.priority)
			}
		}
		this.#written = []
	}

	// Placement's `update`, with the deferred design's first step: while the anchoring is pending and
	// the menu renders (the `side` getter's `checkVisibility()` read, Placement.ts:197), force a layout
	// and write the anchoring for the first time; then measure and write the side, Placement.ts:200-216.
	#update(caller: string): void {
		const { menu, reference } = this.#fixture
		const rendered = menu.checkVisibility()
		if (!rendered) {
			if (this.#pending) this.#fixture.trace.push({ step: 'update', caller, rendered })
			return
		}
		if (this.#pending) {
			this.#pending = false
			const box = menu.getBoundingClientRect()
			const inlineBefore = menu.style.getPropertyValue('position-anchor')
			const anchor = `--vn-probe-deferred-${DeferredDriver.#count++}`
			const names = getComputedStyle(reference).getPropertyValue('anchor-name')
			const declarations = resolveDeferredDeclarations(anchor, names)
			for (const declaration of declarations) {
				this.#writeProperty(declaration.target === 'menu' ? menu : reference, declaration.property, declaration.value)
			}
			this.#fixture.trace.push({
				step: 'anchoring',
				caller,
				rendered,
				width: round2(box.width),
				display: getComputedStyle(menu).display,
				inlineBefore,
				declarations,
			})
		}
		const element = menu.getBoundingClientRect()
		const anchorBox = reference.getBoundingClientRect()
		const gaps: ReadonlyArray<readonly [string, number]> = [
			['top', anchorBox.top - element.bottom],
			['right', element.left - anchorBox.right],
			['bottom', element.top - anchorBox.bottom],
			['left', anchorBox.left - element.right],
		]
		const side = gaps.reduce((widest, gap) => (gap[1] > widest[1] ? gap : widest))[0]
		this.#saveAttribute(menu, DROPDOWN_ATTRIBUTES.side)
		menu.setAttribute(DROPDOWN_ATTRIBUTES.side, side)
	}

	#saveAttribute(element: HTMLElement, name: string): void {
		if (this.#written.some((written) => written.element === element && written.name === name && written.category === 'attribute')) return
		this.#written.push({ element, name, category: 'attribute', value: element.getAttribute(name), priority: '' })
	}

	#writeProperty(element: HTMLElement, name: string, value: string): void {
		if (!this.#written.some((written) => written.element === element && written.name === name && written.category === 'property')) {
			this.#written.push({
				element,
				name,
				category: 'property',
				value: element.style.getPropertyValue(name),
				priority: element.style.getPropertyPriority(name),
			})
		}
		element.style.setProperty(name, value)
	}
}

// ---------------------------------------------------------------------------------------------------
// The variants. `arm` runs once per fixture, before the trusted click, and installs what runs inside
// every show; `prepare` runs after the trusted click and immediately before the first show; `adjust`
// runs after the first show's `shown` reading. Every variant keeps the baseline's preparation,
// including the trusted pre-show click. Each fixture is removed whole, so nothing a variant changes
// survives into the next one.
// ---------------------------------------------------------------------------------------------------

interface Variant {
	readonly name: string
	readonly arm: ((fixture: Fixture, signal: AbortSignal) => void) | undefined
	readonly prepare: ((fixture: Fixture) => unknown) | undefined
	readonly adjust: ((fixture: Fixture) => unknown) | undefined
	readonly driver: (fixture: Fixture) => Driver
}

const MISSING_ANCHOR = '--vn-probe-missing-anchor'

// Adds the menu's `shown` token inside the dropdown's pre-change `show` dispatch, before the show
// places the menu. `Dropdown.show` refuses a call that finds the token already present
// (`#refused(true, true)`), so a token added before the call starts no show; the `D.tokenBeforeCall`
// row records that. A `show` listener that adds the token is the engine's agreement, so the show then
// places a menu that renders. The reading records the order, `promoted` and `had`, from DOM state alone.
function armTokenFirst(fixture: Fixture, signal: AbortSignal, layout: boolean): void {
	const { menu, reference } = fixture
	const token = DROPDOWN_CLASSES.shown
	reference.addEventListener(
		DROPDOWN_EVENTS.show,
		() => {
			const had = menu.classList.contains(token)
			const promoted = menu.hasAttribute('popover')
			menu.classList.add(token)
			const offsetWidth = layout ? menu.offsetWidth : undefined
			fixture.trace.push({ step: 'token', had, promoted, offsetWidth })
		},
		{ signal },
	)
}

const VARIANTS: readonly Variant[] = [
	{ name: 'baseline', arm: undefined, prepare: undefined, adjust: undefined, driver: (fixture) => new EngineDriver(fixture) },
	{
		name: 'tokenFirst',
		arm: (fixture, signal) => armTokenFirst(fixture, signal, false),
		prepare: undefined,
		adjust: undefined,
		driver: (fixture) => new EngineDriver(fixture),
	},
	{
		name: 'tokenFirstLayout',
		arm: (fixture, signal) => armTokenFirst(fixture, signal, true),
		prepare: undefined,
		adjust: undefined,
		driver: (fixture) => new EngineDriver(fixture),
	},
	{ name: 'deferAnchor', arm: undefined, prepare: undefined, adjust: undefined, driver: (fixture) => new DeferredDriver(fixture) },
	{
		name: 'display',
		arm: undefined,
		prepare: (fixture) => {
			fixture.menu.style.setProperty('display', 'block')
			return { offsetWidth: fixture.menu.offsetWidth, display: getComputedStyle(fixture.menu).display }
		},
		adjust: undefined,
		driver: (fixture) => new EngineDriver(fixture),
	},
	{
		name: 'missingAnchor',
		arm: undefined,
		prepare: undefined,
		adjust: (fixture) => {
			fixture.menu.style.setProperty('position-anchor', MISSING_ANCHOR)
			return { anchor: fixture.menu.style.getPropertyValue('position-anchor') }
		},
		driver: (fixture) => new EngineDriver(fixture),
	},
]

// ---------------------------------------------------------------------------------------------------
// One run: one variant, one rule, one clip, on a fresh fixture. The first show follows the first
// probe's lifecycle; the second show, after the trusted Escape and the hide, is read the same way.
// ---------------------------------------------------------------------------------------------------

interface Run {
	readonly shown: Phase
	readonly before: Phase
	readonly clipped: Phase
	readonly restored: Phase
}

interface Outcome {
	readonly first: Run
	readonly second: Run
	readonly shows: readonly boolean[]
	readonly trace: readonly unknown[]
}

async function readShow(
	fixture: Fixture,
	prefix: string,
	result: boolean,
	prepared: unknown,
	adjust: ((fixture: Fixture) => unknown) | undefined,
	clip: (fixture: Fixture) => Scroll,
): Promise<Run> {
	await twoFrames()
	const shown = readPhase(fixture)
	row(`${prefix}.shown`, { result, prepared, trace: [...fixture.trace], ...shown })
	const adjusted = adjust?.(fixture)
	await twoFrames()
	const before = readPhase(fixture)
	row(`${prefix}.before`, { adjusted, ...before })
	fixture.recorder.phase = `${fixture.recorder.phase}.clip`
	const scroll = clip(fixture)
	await twoFrames()
	const clipped = readPhase(fixture)
	row(`${prefix}.clipped`, { scroll, ...clipped })
	scrollerRestore(fixture)
	await twoFrames()
	const restored = readPhase(fixture)
	row(`${prefix}.restored`, restored)
	return { shown, before, clipped, restored }
}

async function runVariant(
	variant: Variant,
	label: string,
	rule: string,
	clipLabel: string,
	clip: (fixture: Fixture) => Scroll,
): Promise<Outcome> {
	const prefix = `${variant.name}.${label}.${clipLabel}`
	const style = installCascade(rule)
	const fixture = buildScrolledDropdown()
	const armed = new AbortController()
	const driver = variant.driver(fixture)
	const { recorder } = fixture
	try {
		variant.arm?.(fixture, armed.signal)
		await userEvent.click(fixture.reference)
		const prepared = variant.prepare?.(fixture)
		recorder.phase = 'show'
		const firstShow = await driver.show()
		const first = await readShow(fixture, prefix, firstShow, prepared, variant.adjust, clip)
		const activeIsReference = document.activeElement === fixture.reference
		recorder.phase = 'escape'
		await userEvent.keyboard('{Escape}')
		const escapeClosed = await settle('the menu reads hidden after Escape', () => !fixture.dropdown.shown)
		const afterEscape = { closed: escapeClosed, open: fixture.menu.matches(':popover-open'), shown: fixture.dropdown.shown }
		recorder.phase = 'hide'
		const hideResult = await driver.hide()
		await twoFrames()
		const afterHide = { result: hideResult, open: fixture.menu.matches(':popover-open'), shown: fixture.dropdown.shown, inline: fixture.menu.style.cssText }
		recorder.phase = 'secondShow'
		const secondShow = await driver.show()
		const second = await readShow(fixture, `${prefix}.second`, secondShow, undefined, undefined, clip)
		recorder.phase = 'destroy'
		driver.destroy()
		await twoFrames()
		const afterDestroy = { open: fixture.menu.matches(':popover-open'), shown: fixture.dropdown.shown, inline: fixture.menu.style.cssText }
		row(`${prefix}.lifecycle`, {
			activeIsReference,
			afterEscape,
			afterHide,
			afterSecondShow: {
				result: secondShow,
				open: second.shown.open,
				shown: second.shown.shown,
				hitIsOverlay: second.shown.hitIsOverlay,
				gap: second.shown.gap,
			},
			afterDestroy,
			events: [...recorder.entries],
		})
		return { first, second, shows: [firstShow, secondShow], trace: [...fixture.trace] }
	} finally {
		armed.abort()
		driver.destroy()
		fixture.dropdown.destroy()
		fixture.teardown()
		style.remove()
		window.scrollTo(0, 0)
		await twoFrames()
	}
}

// ---------------------------------------------------------------------------------------------------
// The pass condition, per show, copied from the first probe: the menu's top sits 2px below the
// reference's bottom at `before`, `clipped`, and `restored`; the menu moves with the reference's actual
// movement between them; and the candidate rule loses the hit target only when fully clipped, while
// `always` keeps it.
// ---------------------------------------------------------------------------------------------------

const GAP = 2
const TOLERANCE = 0.5

interface Verdict {
	readonly gaps: readonly number[]
	readonly shownGap: number
	readonly movement: ReadonlyArray<{ readonly reference: number; readonly menu: number }>
	readonly hits: ReadonlyArray<boolean | null>
	readonly expectedHits: readonly boolean[]
	readonly sideWrites: readonly number[]
	readonly scrollends: readonly number[]
	readonly anchored: boolean
	readonly pass: boolean
}

function judgeRun(label: string, clipLabel: string, run: Run): Verdict {
	const phases = [run.before, run.clipped, run.restored]
	const gaps = phases.map((phase) => phase.gap)
	const movement = [
		[run.before, run.clipped],
		[run.clipped, run.restored],
	].map(([from, to]) => ({
		reference: round2(to.reference.bottom - from.reference.bottom),
		menu: round2(to.menu.top - from.menu.top),
	}))
	const gapOk = gaps.every((gap) => Math.abs(gap - GAP) <= TOLERANCE)
	const movementOk = movement.every((step) => Math.abs(step.menu - step.reference) <= TOLERANCE)
	const hits = phases.map((phase) => phase.hitIsOverlay)
	const expectedHits = [true, !(label === 'candidate' && clipLabel === 'full'), true]
	const hitOk = hits.every((hit, index) => hit === expectedHits[index])
	const anchored = gapOk && movementOk
	return {
		gaps,
		shownGap: run.shown.gap,
		movement,
		hits,
		expectedHits,
		sideWrites: [run.shown, ...phases].map((phase) => phase.sideWrites),
		scrollends: [run.shown, ...phases].map((phase) => phase.scrollends),
		anchored,
		pass: anchored && hitOk,
	}
}

// The first probe's round-3 dropdown geometry per build: the baseline menu's top at `before`,
// `clipped`, and `restored` on the first show, for the full clip and the partial clip, under either
// rule. `141` pins the failing geometry, which holds for `baseline` at an unfixed tip. No other
// variant carries a pin.
const ROUND3: Readonly<Record<string, Readonly<Record<string, readonly number[]>>>> = {
	'153': { full: [283, 182, 283], partial: [283, 212, 283] },
	'141': { full: [2, 2, 2], partial: [2, 2, 2] },
}

const SHOWS = ['first', 'second'] as const

const results = new Map<string, Map<string, Verdict>>()
const tops = new Map<string, readonly number[]>()
const resolvedShows = new Map<string, readonly boolean[]>()
const traces = new Map<string, readonly unknown[]>()

function readMajor(): string {
	const match = /Chrome\/(\d+)/.exec(navigator.userAgent)
	return match?.[1] ?? 'unknown'
}

function readTraceSteps(trace: readonly unknown[], step: string): ReadonlyArray<Readonly<Record<string, unknown>>> {
	return trace.flatMap((entry) =>
		typeof entry === 'object' && entry !== null && Reflect.get(entry, 'step') === step ? [Object.fromEntries(Object.entries(entry))] : [],
	)
}

describe('J-PLACEMENT-141-PROBE-2: which rendering order anchors a scroller-resident menu', () => {
	it('records the build, the refused early token, and checks the hit-test instrument', async () => {
		row('D.build', { major: readMajor(), userAgent: navigator.userAgent, viewport: { width: window.innerWidth, height: window.innerHeight } })
		// The early token: a menu carrying its `shown` token before the call starts no show.
		const early = installCascade(CONTROL_RULE)
		const refusal = buildScrolledDropdown()
		try {
			refusal.menu.classList.add(DROPDOWN_CLASSES.shown)
			const result = await refusal.dropdown.show()
			row('D.tokenBeforeCall', { result, open: refusal.menu.matches(':popover-open'), popover: refusal.menu.getAttribute('popover'), events: [...refusal.recorder.entries] })
		} finally {
			refusal.dropdown.destroy()
			refusal.teardown()
			early.remove()
		}
		// The first probe's instrument control: the hit test at the menu's centre finds the shown menu,
		// and does not find it after an inline `visibility: hidden` on the same menu.
		const style = installCascade(CONTROL_RULE)
		const fixture = buildScrolledDropdown()
		let reading: { readonly visible: boolean | null; readonly hidden: boolean | null } | undefined
		try {
			await fixture.dropdown.show()
			await twoFrames()
			const visible = readPhase(fixture).hitIsOverlay
			fixture.menu.style.setProperty('visibility', 'hidden')
			await twoFrames()
			const hidden = readPhase(fixture).hitIsOverlay
			fixture.menu.style.removeProperty('visibility')
			reading = { visible, hidden }
		} finally {
			fixture.dropdown.destroy()
			fixture.teardown()
			style.remove()
		}
		row('control.V.hitTest', reading)
		checkControl(
			'control.V.hitTest',
			{ visible: true, hidden: false },
			reading,
			reading?.visible === true && reading.hidden === false,
		)
	})

	for (const variant of VARIANTS) {
		it(`reads the ${variant.name} variant under both rules and both clips, over two shows`, async () => {
			const verdicts = new Map<string, Verdict>()
			for (const [label, rule] of RULES) {
				for (const [clipLabel, clip] of CLIPS) {
					const key = `${variant.name}.${label}.${clipLabel}`
					const outcome = await runVariant(variant, label, rule, clipLabel, clip)
					const first = judgeRun(label, clipLabel, outcome.first)
					const second = judgeRun(label, clipLabel, outcome.second)
					console.log(`VERDICT ${key} ${JSON.stringify(first)}`)
					console.log(`VERDICT ${key}.second ${JSON.stringify(second)}`)
					verdicts.set(`first.${label}.${clipLabel}`, first)
					verdicts.set(`second.${label}.${clipLabel}`, second)
					tops.set(key, [outcome.first.before.menu.top, outcome.first.clipped.menu.top, outcome.first.restored.menu.top])
					resolvedShows.set(key, outcome.shows)
					traces.set(key, outcome.trace)
				}
			}
			results.set(variant.name, verdicts)
			for (const show of SHOWS) {
				const selected = [...verdicts].filter(([key]) => key.startsWith(`${show}.`)).map(([, verdict]) => verdict)
				const passes = selected.every((verdict) => verdict.pass)
				const anchored = selected.every((verdict) => verdict.anchored)
				console.log(`VARIANT ${show === 'first' ? variant.name : `${variant.name}.second`} pass=${passes} anchored=${anchored}`)
			}
		})
	}

	it('checks the controls and prints the summary', () => {
		const major = readMajor()
		// Baseline reproduction: the first show's tops equal the round-3 dropdown rows on this build,
		// under both rules and both clips, and `always` keeps the fully clipped menu hit-testable.
		const expected = ROUND3[major]
		const actual: Record<string, readonly number[] | undefined> = {}
		for (const [label] of RULES) {
			for (const [clipLabel] of CLIPS) actual[`${label}.${clipLabel}`] = tops.get(`baseline.${label}.${clipLabel}`)
		}
		const reproduced =
			expected !== undefined &&
			RULES.every(([label]) =>
				CLIPS.every(([clipLabel]) => {
					const want = expected[clipLabel]
					const got = actual[`${label}.${clipLabel}`]
					return (
						want !== undefined &&
						got !== undefined &&
						want.length === got.length &&
						want.every((value, index) => Math.abs(value - (got[index] ?? Number.NaN)) <= TOLERANCE)
					)
				}),
			)
		checkControl(`control.baseline.round3.chromium${major}`, expected ?? `no recorded round-3 geometry for Chromium ${major}`, actual, reproduced)
		const alwaysHits = results.get('baseline')?.get('first.always.full')?.hits
		checkControl('control.baseline.always.full.clippedHitIsOverlay', true, alwaysHits?.[1], alwaysHits?.[1] === true)

		// Negative control: pointing `position-anchor` at a name no element carries must read as a lost
		// anchor on the first show of every run, or the geometry test cannot detect one.
		const missing = [...(results.get('missingAnchor') ?? [])].filter(([key]) => key.startsWith('first.'))
		const missingAnchored = Object.fromEntries(missing.map(([key, verdict]) => [key, verdict.anchored]))
		const lost = missing.length === RULES.length * CLIPS.length && missing.every(([, verdict]) => !verdict.anchored)
		checkControl('control.missingAnchor.lost', 'anchored=false in every first show', missingAnchored, lost)

		// Coverage: every variant has a verdict for both shows, both rules, and both clips.
		const missingRuns = VARIANTS.flatMap((variant) =>
			SHOWS.flatMap((show) =>
				RULES.flatMap(([label]) =>
					CLIPS.flatMap(([clipLabel]) => (results.get(variant.name)?.has(`${show}.${label}.${clipLabel}`) === true ? [] : [`${variant.name}.${show}.${label}.${clipLabel}`])),
				),
			),
		)
		checkControl('control.coverage', [], missingRuns, missingRuns.length === 0)

		// The vector reached the show: every show of every run resolved `true`, so no reading is of a
		// refused show.
		const refused = [...resolvedShows].filter(([, shows]) => !shows.every((shown) => shown)).map(([key, shows]) => `${key}:${JSON.stringify(shows)}`)
		checkControl('control.shows.resolved', [], refused, refused.length === 0)

		// The token variants wrote the token before the promotion, on both shows of every run, and the
		// token was absent when they wrote it.
		const tokenOrder: Record<string, unknown> = {}
		let tokenFirstOk = true
		for (const name of ['tokenFirst', 'tokenFirstLayout']) {
			for (const [label] of RULES) {
				for (const [clipLabel] of CLIPS) {
					const key = `${name}.${label}.${clipLabel}`
					const steps = readTraceSteps(traces.get(key) ?? [], 'token')
					tokenOrder[key] = steps.map((step) => ({ had: step.had, promoted: step.promoted }))
					if (steps.length !== SHOWS.length || !steps.every((step) => step.had === false && step.promoted === false)) tokenFirstOk = false
				}
			}
		}
		checkControl('control.tokenFirst.beforePromotion', 'two token writes per run, each with had=false and promoted=false', tokenOrder, tokenFirstOk)

		// The deferred emulation promoted the menu while hidden and wrote the anchoring for the first
		// time from the dropdown's closing update, with the menu rendered and no prior `position-anchor`,
		// on both shows of every run.
		const deferOrder: Record<string, unknown> = {}
		let deferOk = true
		for (const [label] of RULES) {
			for (const [clipLabel] of CLIPS) {
				const key = `deferAnchor.${label}.${clipLabel}`
				const trace = traces.get(key) ?? []
				const hidden = readTraceSteps(trace, 'update').filter((step) => step.caller === 'construction')
				const anchoring = readTraceSteps(trace, 'anchoring')
				deferOrder[key] = {
					construction: hidden.map((step) => step.rendered),
					anchoring: anchoring.map((step) => ({ caller: step.caller, rendered: step.rendered, display: step.display, inlineBefore: step.inlineBefore })),
				}
				const ok =
					hidden.length === SHOWS.length &&
					hidden.every((step) => step.rendered === false) &&
					anchoring.length === SHOWS.length &&
					anchoring.every((step) => step.caller === 'show' && step.rendered === true && step.display === 'block' && step.inlineBefore === '')
				if (!ok) deferOk = false
			}
		}
		checkControl('control.deferAnchor.renderedBeforeAnchoring', 'hidden at construction and anchored first by the show update, rendered, on both shows', deferOrder, deferOk)
		const declarations = readTraceSteps(traces.get('deferAnchor.candidate.full') ?? [], 'anchoring')[0]?.declarations
		row('D.deferAnchor.declarations', declarations)

		const passing: Record<string, Record<string, boolean>> = { first: {}, second: {} }
		const anchoring: Record<string, Record<string, boolean>> = { first: {}, second: {} }
		for (const variant of VARIANTS) {
			const verdicts = [...(results.get(variant.name) ?? [])]
			for (const show of SHOWS) {
				const selected = verdicts.filter(([key]) => key.startsWith(`${show}.`)).map(([, verdict]) => verdict)
				const pass = passing[show]
				const anchored = anchoring[show]
				if (pass !== undefined) pass[variant.name] = selected.length > 0 && selected.every((verdict) => verdict.pass)
				if (anchored !== undefined) anchored[variant.name] = selected.length > 0 && selected.every((verdict) => verdict.anchored)
			}
		}
		const failed = controls.filter((control) => !control.ok).map((control) => control.name)
		if (failed.length > 0) console.log(`VOID the readings of this run are void: failed controls ${JSON.stringify(failed)}`)
		console.log(
			`SUMMARY chromium=${major} controls=${failed.length === 0 ? 'ok' : `FAILED ${JSON.stringify(failed)}`} pass=${JSON.stringify(passing)} anchored=${JSON.stringify(anchoring)}`,
		)
		expect(failed).toEqual([])
	})
})
