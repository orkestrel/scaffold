// J-PLACEMENT-141-PROBE: the `D.initialization` rows. Separates which factor stops a dropdown menu
// inside a scroller from anchoring to its toggle on Chromium 141, and reads the same rows on the build
// it runs on, so each variant has a comparison. Each variant changes one factor against the round-3
// preparation (`j-native-probe-3.test.ts`, copied from, not imported), on a fresh fixture per rule and
// per clip. Every reading is one `ROW <variant>.<rule>.<clip>.<phase> <json>` line; every control is
// one `CONTROL` line, checked in the last test so every row logs before a failed control reddens the
// run. A failed control voids every reading of the run, and the `VOID` line says so.
import { DROPDOWN_ATTRIBUTES, DROPDOWN_EVENTS, Dropdown } from '@src/browser'
import { waitForCondition } from '@orkestrel/test'
import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import tokensCascade from '../../src/styles/_tokens.scss?inline'
import dropdownCascade from '../../src/styles/components/_dropdown.scss?inline'
import tooltipCascade from '../../src/styles/components/_tooltip.scss?inline'
import popoverCascade from '../../src/styles/components/_popover.scss?inline'

// ---------------------------------------------------------------------------------------------------
// Instrument helpers, copied from round 3.
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
// The cascade and the two rules, copied from round 3.
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
// The fixture: round 3's `buildScrolledDropdown`, exposing the menu and the dropdown, and counting the
// side-attribute writes `Placement.update()` makes and the `scrollend` events that trigger it.
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
		teardown: () => {
			observer.disconnect()
			listeners.abort()
			page.teardown()
			// The `body` variant moves the menu out of the scroller the page teardown removes.
			menu.remove()
		},
	}
}

// ---------------------------------------------------------------------------------------------------
// The clips, copied from round 3.
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
// The phase reading.
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

// Reads every field the brief names at one phase. The side-attribute count is taken synchronously, so
// it includes every `Placement.update()` write that found the menu rendered up to this reading.
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
// The variants. `prepare` runs after the trusted click and immediately before `show()`; `adjust` runs
// after the `shown` reading and before the `before` reading. Neither reads layout it does not need,
// so the baseline's preparation stays exactly round 3's. Every variant runs on its own fresh fixture,
// which the teardown removes whole, so nothing a variant changes survives into the next one.
// ---------------------------------------------------------------------------------------------------

interface Variant {
	readonly name: string
	readonly click: boolean
	readonly prepare: ((fixture: Fixture) => unknown) | undefined
	readonly adjust: ((fixture: Fixture) => unknown) | undefined
}

const PRESCROLL = 30
const MISSING_ANCHOR = '--vn-probe-missing-anchor'

const VARIANTS: readonly Variant[] = [
	{ name: 'baseline', click: true, prepare: undefined, adjust: undefined },
	{
		name: 'prescrolled',
		click: true,
		prepare: (fixture) => {
			fixture.scroller.scrollTop = PRESCROLL
			return { scrollTop: fixture.scroller.scrollTop }
		},
		adjust: undefined,
	},
	{
		name: 'body',
		click: true,
		prepare: (fixture) => {
			document.body.append(fixture.menu)
			return { parent: describeElement(fixture.menu.parentElement), located: fixture.dropdown.menu === fixture.menu }
		},
		adjust: undefined,
	},
	{
		name: 'display',
		click: true,
		prepare: (fixture) => {
			fixture.menu.style.setProperty('display', 'block')
			return { offsetWidth: fixture.menu.offsetWidth, display: getComputedStyle(fixture.menu).display }
		},
		adjust: undefined,
	},
	{ name: 'noClick', click: false, prepare: undefined, adjust: undefined },
	{
		name: 'entryFocus',
		click: true,
		prepare: undefined,
		adjust: (fixture) => {
			const entry = fixture.menu.querySelector('a')
			if (!(entry instanceof HTMLElement)) throw new Error('no dropdown entry to focus')
			entry.focus()
			return { focused: document.activeElement === entry }
		},
	},
	{
		name: 'noFallback',
		click: true,
		prepare: undefined,
		adjust: (fixture) => {
			fixture.menu.style.setProperty('position-try-fallbacks', 'none')
			return { fallbacks: fixture.menu.style.getPropertyValue('position-try-fallbacks') }
		},
	},
	{
		name: 'plainArea',
		click: true,
		prepare: undefined,
		adjust: (fixture) => {
			fixture.menu.style.setProperty('position-area', 'bottom')
			return { area: fixture.menu.style.getPropertyValue('position-area') }
		},
	},
	{
		name: 'anchorInsets',
		click: true,
		prepare: undefined,
		adjust: (fixture) => {
			const { menu } = fixture
			menu.style.setProperty('position-area', 'none')
			menu.style.setProperty('position-try-fallbacks', 'none')
			menu.style.setProperty('top', 'anchor(bottom)')
			menu.style.setProperty('left', 'anchor(left)')
			return {
				area: menu.style.getPropertyValue('position-area'),
				fallbacks: menu.style.getPropertyValue('position-try-fallbacks'),
				top: menu.style.getPropertyValue('top'),
				left: menu.style.getPropertyValue('left'),
				marginTop: menu.style.getPropertyValue('margin-top'),
			}
		},
	},
	{
		name: 'singleName',
		click: true,
		prepare: undefined,
		adjust: (fixture) => {
			const generated = fixture.menu.style.getPropertyValue('position-anchor')
			const before = fixture.reference.style.getPropertyValue('anchor-name')
			fixture.reference.style.setProperty('anchor-name', generated)
			return { before, after: fixture.reference.style.getPropertyValue('anchor-name'), unchanged: before === generated }
		},
	},
	{
		name: 'missingAnchor',
		click: true,
		prepare: undefined,
		adjust: (fixture) => {
			fixture.menu.style.setProperty('position-anchor', MISSING_ANCHOR)
			return { anchor: fixture.menu.style.getPropertyValue('position-anchor') }
		},
	},
	// Added beyond the brief's table: a restyle that leaves every declaration as the placement wrote
	// it, forcing the menu's position style to be evaluated twice. It separates "any post-show style
	// change repairs a stale initial state" from the specific change `noFallback`, `plainArea`, and
	// `anchorInsets` make.
	{
		name: 'restyle',
		click: true,
		prepare: undefined,
		adjust: (fixture) => {
			const { menu } = fixture
			const area = menu.style.getPropertyValue('position-area')
			menu.style.setProperty('position-area', 'none')
			const between = round2(menu.getBoundingClientRect().top)
			menu.style.setProperty('position-area', area)
			const after = round2(menu.getBoundingClientRect().top)
			return { area, between, after }
		},
	},
]

// ---------------------------------------------------------------------------------------------------
// One run: one variant, one rule, one clip, on a fresh fixture. Round 3's lifecycle after the restore.
// ---------------------------------------------------------------------------------------------------

interface Run {
	readonly shown: Phase
	readonly before: Phase
	readonly clipped: Phase
	readonly restored: Phase
}

async function runVariant(
	variant: Variant,
	label: string,
	rule: string,
	clipLabel: string,
	clip: (fixture: Fixture) => Scroll,
): Promise<Run> {
	const prefix = `${variant.name}.${label}.${clipLabel}`
	const style = installCascade(rule)
	const fixture = buildScrolledDropdown()
	const { dropdown, recorder } = fixture
	try {
		if (variant.click) await userEvent.click(fixture.reference)
		const prepared = variant.prepare?.(fixture)
		recorder.phase = 'show'
		const firstShow = await dropdown.show()
		await twoFrames()
		const shown = readPhase(fixture)
		row(`${prefix}.shown`, { firstShow, prepared, ...shown })
		const adjusted = variant.adjust?.(fixture)
		await twoFrames()
		const before = readPhase(fixture)
		row(`${prefix}.before`, { adjusted, ...before })
		recorder.phase = 'clip'
		const scroll = clip(fixture)
		await twoFrames()
		const clipped = readPhase(fixture)
		row(`${prefix}.clipped`, { scroll, ...clipped })
		recorder.phase = 'restore'
		scrollerRestore(fixture)
		await twoFrames()
		const restored = readPhase(fixture)
		row(`${prefix}.restored`, restored)
		const activeIsReference = document.activeElement === fixture.reference
		recorder.phase = 'escape'
		await userEvent.keyboard('{Escape}')
		const escapeClosed = await settle('the engine reports hidden after Escape', () => !dropdown.shown)
		const afterEscape = { closed: escapeClosed, open: fixture.menu.matches(':popover-open'), shown: dropdown.shown }
		recorder.phase = 'hide'
		const hideResult = await dropdown.hide()
		await twoFrames()
		const afterHide = { result: hideResult, open: fixture.menu.matches(':popover-open'), shown: dropdown.shown }
		recorder.phase = 'secondShow'
		const secondShowResult = await dropdown.show()
		await twoFrames()
		const second = readPhase(fixture)
		const afterSecondShow = {
			result: secondShowResult,
			open: second.open,
			shown: second.shown,
			hitIsOverlay: second.hitIsOverlay,
			gap: second.gap,
		}
		recorder.phase = 'destroy'
		dropdown.destroy()
		await twoFrames()
		const afterDestroy = { open: fixture.menu.matches(':popover-open'), shown: dropdown.shown, inline: fixture.menu.style.cssText }
		row(`${prefix}.lifecycle`, {
			activeIsReference,
			afterEscape,
			afterHide,
			afterSecondShow,
			afterDestroy,
			events: [...recorder.entries],
		})
		return { shown, before, clipped, restored }
	} finally {
		dropdown.destroy()
		fixture.teardown()
		style.remove()
		window.scrollTo(0, 0)
		await twoFrames()
	}
}

// ---------------------------------------------------------------------------------------------------
// The pass condition, per run: the menu's top sits 2px below the reference's bottom at `before`,
// `clipped`, and `restored`; the menu moves with the reference's actual movement between them; and the
// candidate rule loses the hit target only when fully clipped, while `always` keeps it.
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

// ---------------------------------------------------------------------------------------------------
// What each candidate cause in the diagnosis verdict predicts, on a build where the baseline fails:
// `true` passes, `false` fails, and an omitted variant is one the cause does not decide. Every cause is
// read in combination with the menu sitting inside the scroller, because `V.viewport` anchors on both
// builds. `names` is decidable only when the reference carries more than one name: with one name,
// `singleName` changes nothing and the cause cannot explain the baseline.
// ---------------------------------------------------------------------------------------------------

const CAUSES: Readonly<Record<string, Readonly<Record<string, boolean>>>> = {
	ancestry: {
		baseline: false,
		prescrolled: false,
		body: true,
		display: false,
		noClick: false,
		entryFocus: false,
		noFallback: false,
		plainArea: false,
		singleName: false,
		missingAnchor: false,
		restyle: false,
	},
	hidden: {
		baseline: false,
		prescrolled: false,
		display: true,
		noClick: false,
		entryFocus: false,
		singleName: false,
		missingAnchor: false,
	},
	area: {
		baseline: false,
		prescrolled: false,
		display: false,
		noClick: false,
		entryFocus: false,
		noFallback: false,
		plainArea: true,
		anchorInsets: true,
		singleName: false,
		missingAnchor: false,
		restyle: false,
	},
	fallback: {
		baseline: false,
		prescrolled: false,
		display: false,
		noClick: false,
		entryFocus: false,
		noFallback: true,
		plainArea: false,
		anchorInsets: true,
		singleName: false,
		missingAnchor: false,
		restyle: false,
	},
	names: {
		baseline: false,
		prescrolled: false,
		display: false,
		noClick: false,
		entryFocus: false,
		noFallback: false,
		plainArea: false,
		anchorInsets: false,
		singleName: true,
		missingAnchor: false,
		restyle: false,
	},
}

// The round-3 dropdown geometry per build: the menu's top at `before`, `clipped`, and `restored`, for
// the full clip and the partial clip, under either rule.
const ROUND3: Readonly<Record<string, Readonly<Record<string, readonly number[]>>>> = {
	'153': { full: [283, 182, 283], partial: [283, 212, 283] },
	'141': { full: [2, 2, 2], partial: [2, 2, 2] },
}

const results = new Map<string, Map<string, Verdict>>()
const tops = new Map<string, readonly number[]>()
const nameLists = new Map<string, string>()

function readMajor(): string {
	const match = /Chrome\/(\d+)/.exec(navigator.userAgent)
	return match?.[1] ?? 'unknown'
}

describe('J-PLACEMENT-141-PROBE D.initialization: one factor per variant against the round-3 dropdown', () => {
	it('records the build and checks the hit-test instrument', async () => {
		row('D.build', { major: readMajor(), userAgent: navigator.userAgent, viewport: { width: window.innerWidth, height: window.innerHeight } })
		// Round 3's instrument control: the hit test at the menu's centre finds the shown menu, and does
		// not find it after an inline `visibility: hidden` on the same menu.
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
		it(`reads the ${variant.name} variant under both rules and both clips`, async () => {
			const verdicts = new Map<string, Verdict>()
			for (const [label, rule] of RULES) {
				for (const [clipLabel, clip] of CLIPS) {
					const run = await runVariant(variant, label, rule, clipLabel, clip)
					const verdict = judgeRun(label, clipLabel, run)
					console.log(`VERDICT ${variant.name}.${label}.${clipLabel} ${JSON.stringify(verdict)}`)
					verdicts.set(`${label}.${clipLabel}`, verdict)
					tops.set(`${variant.name}.${label}.${clipLabel}`, [run.before.menu.top, run.clipped.menu.top, run.restored.menu.top])
					nameLists.set(`${variant.name}.${label}.${clipLabel}`, run.shown.anchorNames)
				}
			}
			results.set(variant.name, verdicts)
			const passes = [...verdicts.values()].every((verdict) => verdict.pass)
			const anchored = [...verdicts.values()].every((verdict) => verdict.anchored)
			console.log(`VARIANT ${variant.name} pass=${passes} anchored=${anchored}`)
		})
	}

	it('checks the controls, rules on each candidate cause, and prints the summary', () => {
		const major = readMajor()
		// Baseline reproduction: the menu's tops equal the round-3 dropdown rows on this build, under
		// both rules and both clips, and `always` keeps the fully clipped menu hit-testable.
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
		const alwaysHits = results.get('baseline')?.get('always.full')?.hits
		checkControl('control.baseline.always.full.clippedHitIsOverlay', true, alwaysHits?.[1], alwaysHits?.[1] === true)

		// Negative control: pointing `position-anchor` at a name no element carries must read as a lost
		// anchor in every run, or the geometry test cannot detect one.
		const missing = results.get('missingAnchor')
		const missingAnchored = missing === undefined ? undefined : Object.fromEntries([...missing].map(([key, verdict]) => [key, verdict.anchored]))
		const lost = missing !== undefined && missing.size === RULES.length * CLIPS.length && [...missing.values()].every((verdict) => !verdict.anchored)
		checkControl('control.missingAnchor.lost', 'anchored=false in every run', missingAnchored, lost)

		// Coverage: every variant has a verdict for both rules and both clips.
		const missingRuns = VARIANTS.flatMap((variant) =>
			RULES.flatMap(([label]) =>
				CLIPS.flatMap(([clipLabel]) => (results.get(variant.name)?.has(`${label}.${clipLabel}`) === true ? [] : [`${variant.name}.${label}.${clipLabel}`])),
			),
		)
		checkControl('control.coverage', [], missingRuns, missingRuns.length === 0)

		const passing: Record<string, boolean> = {}
		for (const variant of VARIANTS) {
			const verdicts = results.get(variant.name)
			passing[variant.name] = verdicts !== undefined && [...verdicts.values()].every((verdict) => verdict.pass)
		}
		const baselineFails = passing.baseline === false
		const names = nameLists.get('baseline.candidate.full') ?? ''
		const nameCount = names === '' || names === 'none' ? 0 : names.split(',').length
		const causes: Record<string, unknown> = {}
		for (const [cause, prediction] of Object.entries(CAUSES)) {
			const mismatches = Object.entries(prediction)
				.filter(([variant, predicted]) => passing[variant] !== predicted)
				.map(([variant, predicted]) => `${variant}:predicted=${predicted},read=${passing[variant]}`)
			const decidable = cause !== 'names' || nameCount > 1
			const consistent = baselineFails && decidable && mismatches.length === 0
			const reading = { applies: baselineFails, decidable, consistent, mismatches }
			causes[cause] = reading
			console.log(`CAUSE ${cause} ${JSON.stringify({ ...reading, predicted: prediction })}`)
		}
		const failed = controls.filter((control) => !control.ok).map((control) => control.name)
		if (failed.length > 0) console.log(`VOID the readings of this run are void: failed controls ${JSON.stringify(failed)}`)
		const consistentCauses = Object.entries(causes)
			.filter(([, reading]) => typeof reading === 'object' && reading !== null && Reflect.get(reading, 'consistent') === true)
			.map(([cause]) => cause)
		console.log(
			`SUMMARY chromium=${major} controls=${failed.length === 0 ? 'ok' : `FAILED ${JSON.stringify(failed)}`} baselineAnchors=${!baselineFails} referenceNames=${nameCount} pass=${JSON.stringify(passing)} consistentCauses=${baselineFails ? JSON.stringify(consistentCauses) : 'n/a (the baseline anchors on this build)'}`,
		)
		expect(failed).toEqual([])
	})
})
