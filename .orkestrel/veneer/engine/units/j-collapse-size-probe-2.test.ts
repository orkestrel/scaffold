// J-COLLAPSE-SIZE-PROBE: how far a horizontal `.collapse-horizontal` panel's width runs, and in what
// shape, under Bootstrap's pixel path and under each `calc-size()` basis, at every phase of show and
// hide. The primary fixture is J-NATIVE-PROBE round 3's: a 30px child in a 300px container. Two text
// fixtures separate the `min-content`, `fit-content`, and `max-content` bases, which the 30px child
// cannot. Every reading is one `ROW <name> <json>` line; every control is collected and asserted at the
// end of its test, so every row logs before a failed control reddens the run.
//
// Round 2 (successor of the retained round-1 file, SHA-256 3c837a86…) appends three row groups after
// round 1's, which run unchanged: the paired basis (`min-content` on show, `auto` on hide) on round 1's
// fixtures; every variant on a horizontal panel with a border and padding under the root
// `box-sizing: border-box`; and the vertical boxed panel's hide, with its show as an observation.
// Every round-2 label starts `paired.`, `boxed.`, `control.paired.`, `control.boxed.`,
// `compare.paired.`, or `compare.boxed.`, so round 1's rows compare by dropping those prefixes.
import { describe, expect, it } from 'vitest'

type Reading = unknown

// One phase's reading: the computed width and the rendered rect width.
interface Phase {
	readonly width: string
	readonly rect: number
}

// A paused phase adds the running transitions' properties, so a row shows whether a transition ran.
interface PausedPhase extends Phase {
	readonly transition: string
}

// The value a variant writes as the inline width: `show` at Bootstrap's scroll-size write, `hide` at
// Bootstrap's rect-size write.
interface Variant {
	readonly label: string
	readonly show: (host: HTMLElement) => string
	readonly hide: (host: HTMLElement) => string
}

// `classes` adds classes to the host beside the collapse classes; round 1's fixtures carry none.
interface Fixture {
	readonly label: string
	readonly markup: string
	readonly classes?: string
}

const DURATION_MS = 400

const FIXED: Fixture = { label: 'horizontal', markup: '<div style="width:30px;height:1px"></div>' }
const SHORT_TEXT: Fixture = { label: 'shortText', markup: '<span>Alpha beta</span>' }
const LONG_TEXT: Fixture = {
	label: 'longText',
	markup:
		'<span>Alpha beta gamma delta epsilon zeta eta theta iota kappa lambda omicron sigma upsilon omega</span>',
}

const BASES: ReadonlyArray<readonly [string, string]> = [
	['auto', 'auto'],
	['maxContent', 'max-content'],
	['fitContent', 'fit-content'],
	['minContent', 'min-content'],
]

// Bootstrap's pixel path: `show` writes `scrollWidth` in px, `hide` writes the rect width in px.
const PIXEL: Variant = {
	label: 'pixel',
	show: (host) => `${host.scrollWidth}px`,
	hide: (host) => `${host.getBoundingClientRect().width}px`,
}

function createBasisVariant(label: string, basis: string): Variant {
	const value = `calc-size(${basis}, size)`
	return { label, show: () => value, hide: () => value }
}

const VARIANTS: readonly Variant[] = [PIXEL, ...BASES.map(([label, basis]) => createBasisVariant(label, basis))]

// Round 2: the paired basis the round-1 report named, `min-content` on show and `auto` on hide.
const PAIRED: Variant = {
	label: 'paired',
	show: () => 'calc-size(min-content, size)',
	hide: () => 'calc-size(auto, size)',
}

// Round 2: every round-1 variant and the pairing.
const BOXED_VARIANTS: readonly Variant[] = [...VARIANTS, PAIRED]

// Round 2: a 2px border and 4px by 7px padding, so the horizontal extras (18px) and the vertical
// extras (12px) differ from each other and from zero. The vertical extras stay under the eased hide
// value at half (0.1976 of the 72px start, 14.23px), so the half does not read the border-box floor.
// A 3px border with 5px block padding put the floor (16px) over that value, and the half read the floor.
const BOXED_BORDER = 2
const BOXED_PADDING_BLOCK = 4
const BOXED_PADDING_INLINE = 7
const BOXED_EXTRA_INLINE = 2 * BOXED_BORDER + 2 * BOXED_PADDING_INLINE
const BOXED_EXTRA_BLOCK = 2 * BOXED_BORDER + 2 * BOXED_PADDING_BLOCK
const BOXED_BORDERS = [`${BOXED_BORDER}px`, `${BOXED_BORDER}px`, `${BOXED_BORDER}px`, `${BOXED_BORDER}px`]
const BOXED_PADDINGS = [
	`${BOXED_PADDING_BLOCK}px`,
	`${BOXED_PADDING_INLINE}px`,
	`${BOXED_PADDING_BLOCK}px`,
	`${BOXED_PADDING_INLINE}px`,
]
const BOXED_RULE = `.vn-boxed { border: ${BOXED_BORDER}px solid black; padding: ${BOXED_PADDING_BLOCK}px ${BOXED_PADDING_INLINE}px }`

// Bootstrap's reboot rule, which the boxed rows run under.
const ROOT_BOX_RULE = '*, *::before, *::after { box-sizing: border-box }'

const BOXED: Fixture = {
	label: 'boxedHorizontal',
	markup: '<div style="width:30px;height:1px"></div>',
	classes: 'vn-boxed',
}

// The vertical panel: round 3's 60px child in the boxed host.
const BOXED_VERTICAL: Fixture = {
	label: 'boxedVertical',
	markup: '<div style="height:60px"></div>',
	classes: 'vn-boxed',
}

// Bootstrap's vertical pixel path: `show` writes `scrollHeight` in px, `hide` writes the rect height
// in px.
const PIXEL_VERTICAL: Variant = {
	label: 'pixel',
	show: (host) => `${host.scrollHeight}px`,
	hide: (host) => `${host.getBoundingClientRect().height}px`,
}

const AUTO_VERTICAL: Variant = createBasisVariant('auto', 'auto')

function raf(): Promise<void> {
	return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

function reflow(host: HTMLElement): void {
	void host.offsetWidth
}

function row(name: string, value: Reading): void {
	console.log(`ROW ${name} ${JSON.stringify(value)}`)
}

async function measure(name: string, produce: () => Reading | Promise<Reading>): Promise<Reading> {
	try {
		const value = await produce()
		row(name, value)
		return value
	} catch (error) {
		const value = `throws: ${error instanceof Error ? error.message : String(error)}`
		row(name, value)
		return value
	}
}

function round2(value: number): number {
	return Math.round(value * 100) / 100
}

function createControls(): {
	readonly check: (name: string, expected: unknown, actual: unknown, ok: boolean) => void
	readonly failures: readonly string[]
} {
	const failures: string[] = []
	return {
		check: (name, expected, actual, ok) => {
			console.log(`CONTROL ${name} ${ok ? 'ok' : 'FAILED'} expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`)
			if (!ok) failures.push(`${name}: expected ${JSON.stringify(expected)}, read ${JSON.stringify(actual)}`)
		},
		failures,
	}
}

function transitionRow(host: HTMLElement): string {
	return host
		.getAnimations()
		.filter((animation): animation is CSSTransition => animation instanceof CSSTransition)
		.map((transition) => transition.transitionProperty)
		.join(',')
}

function readPhase(host: HTMLElement): Phase {
	return { width: getComputedStyle(host).width, rect: round2(host.getBoundingClientRect().width) }
}

// Pauses the running transition at `timeMs` and reads the phase, the way round 3's
// `pausedWidthAtHalf` does at half the duration.
async function pausedWidthAt(host: HTMLElement, timeMs: number): Promise<PausedPhase> {
	await raf()
	const animation = host.getAnimations()[0]
	if (animation === undefined) return { transition: 'none', ...readPhase(host) }
	animation.pause()
	animation.currentTime = timeMs
	await raf()
	return { transition: transitionRow(host), ...readPhase(host) }
}

// The width twin of round 3's `pausedHeightAtHalf`, extended to read the rect width beside the
// computed width.
function pausedWidthAtHalf(host: HTMLElement, durationMs: number): Promise<PausedPhase> {
	return pausedWidthAt(host, durationMs / 2)
}

async function finishTransitions(host: HTMLElement): Promise<void> {
	await Promise.all(
		host.getAnimations().map((animation) => {
			try {
				animation.finish()
			} catch {
				// A finished or idle animation refuses `finish()`; nothing is left to complete.
			}
			return animation.finished.catch(() => undefined)
		}),
	)
	await raf()
}

// Round 3's `completedWidth`: the same finish, class swap, and inline-width clear.
async function completedWidth(host: HTMLElement): Promise<string> {
	await finishTransitions(host)
	host.classList.remove('collapsing')
	host.classList.add('collapse', 'show')
	host.style.removeProperty('width')
	await raf()
	return getComputedStyle(host).width
}

// Bootstrap 5.3's collapse rules, with round 3's 0.4s durations.
function installRules(): HTMLStyleElement {
	const style = document.createElement('style')
	style.textContent = [
		'.collapse:not(.show) { display: none }',
		'.collapsing { height: 0; overflow: hidden; transition: height 0.4s ease }',
		'.collapse-horizontal.collapsing { width: 0; height: auto; transition: width 0.4s ease }',
	].join(' ')
	document.head.append(style)
	return style
}

// Round 2: installs one extra stylesheet, removed by the caller.
function installStyle(text: string): HTMLStyleElement {
	const style = document.createElement('style')
	style.textContent = text
	document.head.append(style)
	return style
}

function buildPanel(fixture: Fixture, className: string): { readonly container: HTMLElement; readonly host: HTMLElement } {
	const container = document.createElement('div')
	container.style.width = '300px'
	const host = document.createElement('div')
	host.className = fixture.classes === undefined ? className : `${className} ${fixture.classes}`.trim()
	host.innerHTML = fixture.markup
	container.append(host)
	document.body.append(container)
	return { container, host }
}

// A static block panel with no collapse class and no transition, in the same 300px container.
function buildStaticPanel(fixture: Fixture): { readonly container: HTMLElement; readonly host: HTMLElement } {
	const built = buildPanel(fixture, '')
	built.host.style.display = 'block'
	return built
}

// Round 3's horizontal row, unchanged: `collapse-horizontal show collapsing`, write, pause at half,
// finish, then the class swap and clear.
async function measureRound3Horizontal(write: (host: HTMLElement) => void): Promise<Reading> {
	const container = document.createElement('div')
	container.style.width = '300px'
	const host = document.createElement('div')
	host.className = 'collapse-horizontal show collapsing'
	host.innerHTML = '<div style="width:30px;height:1px"></div>'
	container.append(host)
	document.body.append(container)
	try {
		reflow(host)
		write(host)
		reflow(host)
		const midpoint = await pausedWidthAtHalf(host, DURATION_MS)
		await finishTransitions(host)
		const finished = getComputedStyle(host).width
		const completed = await completedWidth(host)
		return {
			transition: midpoint.transition,
			midpoint: midpoint.width,
			finished,
			completed,
			scrollWidth: host.scrollWidth,
			rectWidth: round2(host.getBoundingClientRect().width),
		}
	} finally {
		container.remove()
	}
}

// Bootstrap's `show`: drop `collapse`, add `collapsing`, write width 0, then write the variant's
// value. Reads the start and half through the paused transition, the end after `finish()` with the
// inline width still set, and the completion after Bootstrap's class swap and inline clear.
async function measureShow(fixture: Fixture, variant: Variant): Promise<Readonly<Record<string, Reading>>> {
	const { container, host } = buildPanel(fixture, 'collapse collapse-horizontal')
	try {
		host.classList.remove('collapse')
		host.classList.add('collapsing')
		host.style.width = '0'
		reflow(host)
		const written = variant.show(host)
		host.style.width = written
		reflow(host)
		const start = await pausedWidthAt(host, 0)
		const half = await pausedWidthAtHalf(host, DURATION_MS)
		await finishTransitions(host)
		const end = { ...readPhase(host), inline: host.style.width }
		host.classList.remove('collapsing')
		host.classList.add('collapse', 'show')
		host.style.removeProperty('width')
		await raf()
		const complete = readPhase(host)
		return { written, start, half, end, complete }
	} finally {
		container.remove()
	}
}

// Bootstrap's `hide`: write the variant's value on the shown panel, reflow, swap to `collapsing`,
// reflow, clear the inline width, so the transition runs from the written value to the rule's 0.
// Reads the shown panel, the written panel, the start and half, the end, and the completion after
// Bootstrap's class swap. Bootstrap's hide clears the inline width before the transition, so the end
// is the last reading before the completion's class swap.
async function measureHide(fixture: Fixture, variant: Variant): Promise<Readonly<Record<string, Reading>>> {
	const { container, host } = buildPanel(fixture, 'collapse collapse-horizontal show')
	try {
		const shown = readPhase(host)
		const value = variant.hide(host)
		host.style.width = value
		reflow(host)
		const written = { ...readPhase(host), inline: value }
		host.classList.add('collapsing')
		host.classList.remove('collapse', 'show')
		reflow(host)
		host.style.removeProperty('width')
		const start = await pausedWidthAt(host, 0)
		const half = await pausedWidthAtHalf(host, DURATION_MS)
		await finishTransitions(host)
		const end = readPhase(host)
		host.classList.remove('collapsing')
		host.classList.add('collapse')
		await raf()
		const complete = readPhase(host)
		return { shown, written, start, half, end, complete }
	} finally {
		container.remove()
	}
}

// Show with content that grows mid-transition: pause at a quarter, widen the child from 30px to
// 60px, read the paused phase again, then the half, the end, and the completion.
async function measureGrowth(variant: Variant): Promise<Readonly<Record<string, Reading>>> {
	const { container, host } = buildPanel(FIXED, 'collapse collapse-horizontal')
	try {
		const child = host.firstElementChild
		if (!(child instanceof HTMLElement)) throw new Error('the fixed fixture has no child element')
		host.classList.remove('collapse')
		host.classList.add('collapsing')
		host.style.width = '0'
		reflow(host)
		const written = variant.show(host)
		host.style.width = written
		reflow(host)
		const quarter = await pausedWidthAt(host, DURATION_MS / 4)
		child.style.width = '60px'
		await raf()
		const grown = readPhase(host)
		const half = await pausedWidthAtHalf(host, DURATION_MS)
		await finishTransitions(host)
		const end = { ...readPhase(host), inline: host.style.width }
		host.classList.remove('collapsing')
		host.classList.add('collapse', 'show')
		host.style.removeProperty('width')
		await raf()
		const complete = readPhase(host)
		return { written, quarter, grown, half, end, complete, scrollWidth: host.scrollWidth }
	} finally {
		container.remove()
	}
}

// Round 2's vertical phase: the computed height and the rendered rect height.
function readHeightPhase(host: HTMLElement): { readonly height: string; readonly rect: number } {
	return { height: getComputedStyle(host).height, rect: round2(host.getBoundingClientRect().height) }
}

// The height twin of `pausedWidthAt`.
async function pausedHeightAt(
	host: HTMLElement,
	timeMs: number,
): Promise<{ readonly transition: string; readonly height: string; readonly rect: number }> {
	await raf()
	const animation = host.getAnimations()[0]
	if (animation === undefined) return { transition: 'none', ...readHeightPhase(host) }
	animation.pause()
	animation.currentTime = timeMs
	await raf()
	return { transition: transitionRow(host), ...readHeightPhase(host) }
}

// Round 3's `pausedHeightAtHalf`, extended to read the rect height beside the computed height.
function pausedHeightAtHalf(
	host: HTMLElement,
	durationMs: number,
): Promise<{ readonly transition: string; readonly height: string; readonly rect: number }> {
	return pausedHeightAt(host, durationMs / 2)
}

// Bootstrap's vertical `show` on the fixture: the same sequence as `measureShow`, on `height`.
async function measureVerticalShow(fixture: Fixture, variant: Variant): Promise<Readonly<Record<string, Reading>>> {
	const { container, host } = buildPanel(fixture, 'collapse')
	try {
		host.classList.remove('collapse')
		host.classList.add('collapsing')
		host.style.height = '0'
		reflow(host)
		const written = variant.show(host)
		host.style.height = written
		reflow(host)
		const start = await pausedHeightAt(host, 0)
		const half = await pausedHeightAtHalf(host, DURATION_MS)
		await finishTransitions(host)
		const end = { ...readHeightPhase(host), inline: host.style.height }
		host.classList.remove('collapsing')
		host.classList.add('collapse', 'show')
		host.style.removeProperty('height')
		await raf()
		const complete = readHeightPhase(host)
		return { written, start, half, end, complete }
	} finally {
		container.remove()
	}
}

// Bootstrap's vertical `hide` on the fixture: the same sequence as `measureHide`, on `height`.
async function measureVerticalHide(fixture: Fixture, variant: Variant): Promise<Readonly<Record<string, Reading>>> {
	const { container, host } = buildPanel(fixture, 'collapse show')
	try {
		const shown = readHeightPhase(host)
		const value = variant.hide(host)
		host.style.height = value
		reflow(host)
		const written = { ...readHeightPhase(host), inline: value }
		host.classList.add('collapsing')
		host.classList.remove('collapse', 'show')
		reflow(host)
		host.style.removeProperty('height')
		const start = await pausedHeightAt(host, 0)
		const half = await pausedHeightAtHalf(host, DURATION_MS)
		await finishTransitions(host)
		const end = readHeightPhase(host)
		host.classList.remove('collapsing')
		host.classList.add('collapse')
		await raf()
		const complete = readHeightPhase(host)
		return { shown, written, start, half, end, complete }
	} finally {
		container.remove()
	}
}

// Reads a static boxed panel's resolved border, padding, and `box-sizing`, its rect at an inline
// width of 100px, and its rect and scroll sizes at auto width.
function readBoxedStatic(fixture: Fixture): Readonly<Record<string, Reading>> {
	const { container, host } = buildStaticPanel(fixture)
	try {
		const style = getComputedStyle(host)
		const readings = {
			boxSizing: style.boxSizing,
			border: [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth],
			padding: [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft],
			rectWidth: round2(host.getBoundingClientRect().width),
			rectHeight: round2(host.getBoundingClientRect().height),
			scrollWidth: host.scrollWidth,
			scrollHeight: host.scrollHeight,
		}
		host.style.width = '100px'
		return { ...readings, rectWidthAt100: round2(host.getBoundingClientRect().width) }
	} finally {
		container.remove()
	}
}

function readRect(reading: Reading): number | undefined {
	if (typeof reading !== 'object' || reading === null) return undefined
	const rect: unknown = Reflect.get(reading, 'rect')
	return typeof rect === 'number' ? rect : undefined
}

// Reads the computed size a phase recorded under `dimension`: `width` for a horizontal panel,
// `height` for a vertical one.
function readSize(reading: Reading, dimension: string): string | undefined {
	if (typeof reading !== 'object' || reading === null) return undefined
	const size: unknown = Reflect.get(reading, dimension)
	return typeof size === 'string' ? size : undefined
}

// Compares each phase a variant read against the pixel path's same phase: the rect-size difference
// in px and whether the computed sizes are equal. Round 1 compares widths, so its rows keep the
// `widthEqual` field.
function comparePhases(
	variant: Readonly<Record<string, Reading>>,
	pixel: Readonly<Record<string, Reading>>,
	dimension = 'width',
): Reading {
	const phases: Record<string, Reading> = {}
	let matches = true
	for (const [phase, reading] of Object.entries(variant)) {
		const own = readRect(reading)
		const base = readRect(pixel[phase])
		if (own === undefined || base === undefined) continue
		const delta = round2(own - base)
		const equal = readSize(reading, dimension) === readSize(pixel[phase], dimension)
		if (delta !== 0 || !equal) matches = false
		phases[phase] = { delta, [`${dimension}Equal`]: equal }
	}
	return { matches, ...phases }
}

async function logPhases(prefix: string, phases: Readonly<Record<string, Reading>>): Promise<void> {
	for (const [phase, reading] of Object.entries(phases)) await measure(`${prefix}.${phase}`, () => reading)
}

// Measures each variant's show and hide over one fixture, logs a row per phase, and logs each
// non-pixel variant's comparison with the pixel path. Returns the pixel path's show and hide for its
// controls, and every variant's readings.
async function measureFixture(
	fixture: Fixture,
	prefix: string,
	variants: readonly Variant[] = VARIANTS,
): Promise<{
	readonly show: Readonly<Record<string, Reading>>
	readonly hide: Readonly<Record<string, Reading>>
	readonly shows: Readonly<Record<string, Readonly<Record<string, Reading>>>>
	readonly hides: Readonly<Record<string, Readonly<Record<string, Reading>>>>
}> {
	const shows: Record<string, Readonly<Record<string, Reading>>> = {}
	const hides: Record<string, Readonly<Record<string, Reading>>> = {}
	for (const variant of variants) {
		const show = await measureShow(fixture, variant)
		shows[variant.label] = show
		await logPhases(`${prefix}.${variant.label}.show`, show)
		const hide = await measureHide(fixture, variant)
		hides[variant.label] = hide
		await logPhases(`${prefix}.${variant.label}.hide`, hide)
	}
	const pixelShow = shows.pixel ?? {}
	const pixelHide = hides.pixel ?? {}
	for (const variant of variants) {
		if (variant.label === PIXEL.label) continue
		const label = variant.label
		await measure(`compare.${prefix}.${label}.show`, () => comparePhases(shows[label] ?? {}, pixelShow))
		await measure(`compare.${prefix}.${label}.hide`, () => comparePhases(hides[label] ?? {}, pixelHide))
	}
	return { show: pixelShow, hide: pixelHide, shows, hides }
}

// Reads each basis written as a static inline width on a static panel of the fixture, plus the width
// the pixel path would write at `show`: the fixture's `scrollWidth` at width 0 with overflow hidden.
function readStaticBases(fixture: Fixture): Readonly<Record<string, number>> {
	const readings: Record<string, number> = {}
	for (const [label, basis] of BASES) {
		const { container, host } = buildStaticPanel(fixture)
		try {
			host.style.width = `calc-size(${basis}, size)`
			readings[label] = round2(host.getBoundingClientRect().width)
		} finally {
			container.remove()
		}
	}
	const { container, host } = buildStaticPanel(fixture)
	try {
		host.style.width = '0'
		host.style.overflow = 'hidden'
		readings.scrollWidthAtZero = host.scrollWidth
	} finally {
		container.remove()
	}
	return readings
}

function readNumber(reading: Readonly<Record<string, number>>, key: string): number {
	return reading[key] ?? Number.NaN
}

describe('J-COLLAPSE-SIZE-PROBE reproduction: round 3 horizontal readings before any new row counts', () => {
	it('reproduces the static 300px control and the auto basis running to 300 against the pixel path running to 30', async () => {
		const controls = createControls()
		await measure('host.userAgent', () => navigator.userAgent)
		const style = installRules()
		try {
			const horizontalStatic = await measure('control.completion.horizontal.static', () => {
				const container = document.createElement('div')
				container.style.width = '300px'
				const host = document.createElement('div')
				host.style.display = 'block'
				host.innerHTML = '<div style="width:30px;height:1px"></div>'
				container.append(host)
				document.body.append(container)
				try {
					return {
						width: getComputedStyle(host).width,
						scrollWidth: host.scrollWidth,
						rectWidth: round2(host.getBoundingClientRect().width),
					}
				} finally {
					container.remove()
				}
			})
			const expectedStatic = { width: '300px', scrollWidth: 300, rectWidth: 300 }
			controls.check(
				'control.completion.horizontal.static',
				expectedStatic,
				horizontalStatic,
				JSON.stringify(horizontalStatic) === JSON.stringify(expectedStatic),
			)

			const pixel = await measure('reproduce.size.horizontal.pixel', () =>
				measureRound3Horizontal((host) => {
					host.style.width = `${host.scrollWidth}px`
				}),
			)
			const calcSize = await measure('reproduce.size.horizontal.calcSize', () =>
				measureRound3Horizontal((host) => {
					host.style.width = 'calc-size(auto, size)'
				}),
			)
			const finishedOf = (reading: Reading): unknown =>
				typeof reading === 'object' && reading !== null ? Reflect.get(reading, 'finished') : undefined
			const completedOf = (reading: Reading): unknown =>
				typeof reading === 'object' && reading !== null ? Reflect.get(reading, 'completed') : undefined
			const reproduced = {
				pixelFinished: finishedOf(pixel),
				pixelCompleted: completedOf(pixel),
				autoFinished: finishedOf(calcSize),
				autoCompleted: completedOf(calcSize),
			}
			const expectedReproduced = {
				pixelFinished: '30px',
				pixelCompleted: '300px',
				autoFinished: '300px',
				autoCompleted: '300px',
			}
			controls.check(
				'control.reproduce.horizontal',
				expectedReproduced,
				reproduced,
				JSON.stringify(reproduced) === JSON.stringify(expectedReproduced),
			)
		} finally {
			style.remove()
		}
		expect(controls.failures).toEqual([])
	})
})

describe('J-COLLAPSE-SIZE-PROBE basis controls: static panels that separate the four calc-size bases', () => {
	it('reads each basis as a static width on the 30px child and on the short and long text children', async () => {
		const controls = createControls()
		const supported = await measure('control.basis.supports', () => {
			const readings: Record<string, boolean> = {}
			for (const [label, basis] of BASES) readings[label] = CSS.supports('width', `calc-size(${basis}, size)`)
			readings.unknownBasis = CSS.supports('width', 'calc-size(no-such-basis, size)')
			return readings
		})
		const expectedSupported = { auto: true, maxContent: true, fitContent: true, minContent: true, unknownBasis: false }
		controls.check(
			'control.basis.supports',
			expectedSupported,
			supported,
			JSON.stringify(supported) === JSON.stringify(expectedSupported),
		)

		const fixed = readStaticBases(FIXED)
		row('control.basis.static.horizontal', fixed)
		const expectedFixed = { auto: 300, maxContent: 30, fitContent: 30, minContent: 30, scrollWidthAtZero: 30 }
		controls.check(
			'control.basis.static.horizontal',
			expectedFixed,
			fixed,
			JSON.stringify(fixed) === JSON.stringify(expectedFixed),
		)

		// Short text fits the container: min-content < max-content = fit-content < auto = 300.
		const short = readStaticBases(SHORT_TEXT)
		row('control.basis.static.shortText', short)
		controls.check(
			'control.basis.static.shortText',
			'minContent < maxContent = fitContent < auto = 300',
			short,
			readNumber(short, 'minContent') < readNumber(short, 'maxContent') &&
				readNumber(short, 'fitContent') === readNumber(short, 'maxContent') &&
				readNumber(short, 'maxContent') < 300 &&
				readNumber(short, 'auto') === 300,
		)

		// Long text overflows the container: min-content < fit-content = auto = 300 < max-content.
		const long = readStaticBases(LONG_TEXT)
		row('control.basis.static.longText', long)
		controls.check(
			'control.basis.static.longText',
			'minContent < fitContent = auto = 300 < maxContent',
			long,
			readNumber(long, 'minContent') < readNumber(long, 'fitContent') &&
				readNumber(long, 'fitContent') === 300 &&
				readNumber(long, 'auto') === 300 &&
				readNumber(long, 'maxContent') > 300,
		)
		expect(controls.failures).toEqual([])
	})
})

describe('J-COLLAPSE-SIZE-PROBE phases: each variant at every phase of show and hide on the 30px child', () => {
	it('reads the pixel path and each calc-size basis at start, half, end, and completion', async () => {
		const controls = createControls()
		const style = installRules()
		try {
			const pixel = await measureFixture(FIXED, 'size.horizontal')
			// The pause instrument must separate the show's start, half, and end: 0px, strictly between,
			// then the written 30px.
			const showStart = readRect(pixel.show.start)
			const showHalf = readRect(pixel.show.half)
			const showEnd = readRect(pixel.show.end)
			const showInstrument = { start: showStart, half: showHalf, end: showEnd }
			controls.check(
				'control.instrument.pixel.show',
				'start 0 < half < end 30',
				showInstrument,
				showStart === 0 && showHalf !== undefined && showHalf > 0 && showHalf < 30 && showEnd === 30,
			)
			const hideStart = readRect(pixel.hide.start)
			const hideHalf = readRect(pixel.hide.half)
			const hideEnd = readRect(pixel.hide.end)
			const hideInstrument = { start: hideStart, half: hideHalf, end: hideEnd }
			controls.check(
				'control.instrument.pixel.hide',
				'start 300 > half > end 0',
				hideInstrument,
				hideStart === 300 && hideHalf !== undefined && hideHalf > 0 && hideHalf < 300 && hideEnd === 0,
			)
		} finally {
			style.remove()
		}
		expect(controls.failures).toEqual([])
	})
})

describe('J-COLLAPSE-SIZE-PROBE text phases: each variant on children whose min, fit, and max content differ', () => {
	it('reads the pixel path and each calc-size basis at every phase on the short and long text children', async () => {
		const controls = createControls()
		const style = installRules()
		try {
			const short = await measureFixture(SHORT_TEXT, 'text.short')
			const long = await measureFixture(LONG_TEXT, 'text.long')
			// The pixel show on text must still run a transition, so its rows measure a running width.
			const transitionOf = (reading: Reading): unknown =>
				typeof reading === 'object' && reading !== null ? Reflect.get(reading, 'transition') : undefined
			const transitions = { short: transitionOf(short.show.half), long: transitionOf(long.show.half) }
			controls.check(
				'control.instrument.text.transition',
				{ short: 'width', long: 'width' },
				transitions,
				transitions.short === 'width' && transitions.long === 'width',
			)
		} finally {
			style.remove()
		}
		expect(controls.failures).toEqual([])
	})
})

describe('J-COLLAPSE-SIZE-PROBE growth: content that widens from 30px to 60px mid-show', () => {
	it('reads whether each variant follows the grown content through the end and completion', async () => {
		const controls = createControls()
		const style = installRules()
		try {
			// Control: a static panel whose inline width is `calc-size(max-content, size)` must follow its
			// child from 30px to 60px, and a static block panel must stay at the container's 300px.
			const growthStatic = await measure('control.growth.static', async () => {
				const readings: Record<string, Reading> = {}
				const widths: ReadonlyArray<readonly [string, string]> = [
					['maxContent', 'calc-size(max-content, size)'],
					['block', ''],
				]
				for (const [label, width] of widths) {
					const { container, host } = buildStaticPanel(FIXED)
					try {
						host.style.width = width
						const child = host.firstElementChild
						if (!(child instanceof HTMLElement)) throw new Error('the fixed fixture has no child element')
						const before = round2(host.getBoundingClientRect().width)
						child.style.width = '60px'
						await raf()
						readings[label] = { before, after: round2(host.getBoundingClientRect().width) }
					} finally {
						container.remove()
					}
				}
				return readings
			})
			const expectedGrowth = { maxContent: { before: 30, after: 60 }, block: { before: 300, after: 300 } }
			controls.check(
				'control.growth.static',
				expectedGrowth,
				growthStatic,
				JSON.stringify(growthStatic) === JSON.stringify(expectedGrowth),
			)
			const growths: Record<string, Readonly<Record<string, Reading>>> = {}
			for (const variant of VARIANTS) {
				const growth = await measureGrowth(variant)
				growths[variant.label] = growth
				await measure(`growth.horizontal.${variant.label}`, () => growth)
			}
			for (const [label] of BASES) {
				await measure(`compare.growth.horizontal.${label}`, () => comparePhases(growths[label] ?? {}, growths.pixel ?? {}))
			}
		} finally {
			style.remove()
		}
		expect(controls.failures).toEqual([])
	})
})

// ---------------------------------------------------------------------------------------------------
// Round 2 row groups. They run after round 1's and write only `paired.`, `boxed.`, `control.paired.`,
// `control.boxed.`, `compare.paired.`, and `compare.boxed.` labels.
// ---------------------------------------------------------------------------------------------------

function readField(reading: Reading, key: string): unknown {
	return typeof reading === 'object' && reading !== null ? Reflect.get(reading, key) : undefined
}

// Checks that a show's pause instrument separates start, half, and end: start < half < end.
function isRising(show: Readonly<Record<string, Reading>>): boolean {
	const start = readRect(show.start)
	const half = readRect(show.half)
	const end = readRect(show.end)
	return start !== undefined && half !== undefined && end !== undefined && start < half && half < end
}

// Checks that a hide's pause instrument separates start, half, and end: start > half > end.
function isFalling(hide: Readonly<Record<string, Reading>>): boolean {
	const start = readRect(hide.start)
	const half = readRect(hide.half)
	const end = readRect(hide.end)
	return start !== undefined && half !== undefined && end !== undefined && start > half && half > end
}

function readInstrument(phases: Readonly<Record<string, Reading>>): Reading {
	return { start: readRect(phases.start), half: readRect(phases.half), end: readRect(phases.end) }
}

describe('J-COLLAPSE-SIZE-PROBE round 2 pairing: min-content on show and auto on hide, on round 1 fixtures', () => {
	it('reads the pairing at every phase against the pixel path on the 30px child, the text children, and growing content', async () => {
		const controls = createControls()
		const style = installRules()
		try {
			const fixed = await measureFixture(FIXED, 'paired.horizontal', [PIXEL, PAIRED])
			await measureFixture(SHORT_TEXT, 'paired.shortText', [PIXEL, PAIRED])
			await measureFixture(LONG_TEXT, 'paired.longText', [PIXEL, PAIRED])

			// The pairing must write a different basis per direction, or its rows measure one basis twice.
			const pairedShow = fixed.shows.paired ?? {}
			const pairedHide = fixed.hides.paired ?? {}
			const writes = { show: pairedShow.written, hide: readField(pairedHide.written, 'inline') }
			const expectedWrites = { show: 'calc-size(min-content, size)', hide: 'calc-size(auto, size)' }
			controls.check(
				'control.paired.writes',
				expectedWrites,
				writes,
				JSON.stringify(writes) === JSON.stringify(expectedWrites),
			)
			// The re-measured pixel path must separate start, half, and end in each direction, as round 1's
			// instrument controls did.
			const instrument = { show: readInstrument(fixed.show), hide: readInstrument(fixed.hide) }
			controls.check(
				'control.paired.instrument',
				'show start < half < end; hide start > half > end',
				instrument,
				isRising(fixed.show) && isFalling(fixed.hide),
			)

			const pixelGrowth = await measureGrowth(PIXEL)
			await measure('paired.growth.horizontal.pixel', () => pixelGrowth)
			const pairedGrowth = await measureGrowth(PAIRED)
			await measure('paired.growth.horizontal.paired', () => pairedGrowth)
			await measure('compare.paired.growth.horizontal.paired', () => comparePhases(pairedGrowth, pixelGrowth))
		} finally {
			style.remove()
		}
		expect(controls.failures).toEqual([])
	})
})

describe('J-COLLAPSE-SIZE-PROBE round 2 boxed horizontal: a 2px border and 4px by 7px padding under border-box', () => {
	it('reads every variant and the pairing at every phase on the boxed horizontal panel', async () => {
		const controls = createControls()
		const style = installRules()
		const boxed = installStyle(BOXED_RULE)
		try {
			// Control: without the root rule the boxed panel is content-box, so an inline 100px width
			// renders 100px plus the extras. The root rule must turn it border-box, rendering 100px.
			const contentBox = readBoxedStatic(BOXED)
			row('control.boxed.static.contentBox', contentBox)
			controls.check(
				'control.boxed.static.contentBox',
				{ boxSizing: 'content-box', rectWidthAt100: 100 + BOXED_EXTRA_INLINE },
				contentBox,
				contentBox.boxSizing === 'content-box' && contentBox.rectWidthAt100 === 100 + BOXED_EXTRA_INLINE,
			)
			const root = installStyle(ROOT_BOX_RULE)
			try {
				const borderBox = readBoxedStatic(BOXED)
				row('control.boxed.static.horizontal', borderBox)
				// The 1px-tall, 30px-wide child: the rect is 300 wide and 1px plus the block extras tall; the
				// scroll box drops the border and keeps the padding.
				const expectedBorderBox = {
					boxSizing: 'border-box',
					border: BOXED_BORDERS,
					padding: BOXED_PADDINGS,
					rectWidth: 300,
					rectHeight: 1 + BOXED_EXTRA_BLOCK,
					scrollWidth: 300 - 2 * BOXED_BORDER,
					scrollHeight: 1 + 2 * BOXED_PADDING_BLOCK,
					rectWidthAt100: 100,
				}
				controls.check(
					'control.boxed.static.horizontal',
					expectedBorderBox,
					borderBox,
					JSON.stringify(borderBox) === JSON.stringify(expectedBorderBox),
				)
				const result = await measureFixture(BOXED, 'boxed.horizontal', BOXED_VARIANTS)
				const instrument = { show: readInstrument(result.show), hide: readInstrument(result.hide) }
				controls.check(
					'control.boxed.instrument.horizontal',
					'show start < half < end; hide start > half > end',
					instrument,
					isRising(result.show) && isFalling(result.hide),
				)
			} finally {
				root.remove()
			}
		} finally {
			boxed.remove()
			style.remove()
		}
		expect(controls.failures).toEqual([])
	})
})

describe('J-COLLAPSE-SIZE-PROBE round 2 boxed vertical: calc-size(auto, size) hide against the rect-height pixel path', () => {
	it('reads the pixel path and calc-size(auto, size) at every phase of the boxed vertical hide, with the show as an observation', async () => {
		const controls = createControls()
		const style = installRules()
		const boxed = installStyle(`${ROOT_BOX_RULE} ${BOXED_RULE}`)
		try {
			const vertical = readBoxedStatic(BOXED_VERTICAL)
			row('control.boxed.static.vertical', vertical)
			const expectedVertical = {
				boxSizing: 'border-box',
				border: BOXED_BORDERS,
				padding: BOXED_PADDINGS,
				rectHeight: 60 + BOXED_EXTRA_BLOCK,
				scrollHeight: 60 + 2 * BOXED_PADDING_BLOCK,
			}
			const verticalRead = {
				boxSizing: vertical.boxSizing,
				border: vertical.border,
				padding: vertical.padding,
				rectHeight: vertical.rectHeight,
				scrollHeight: vertical.scrollHeight,
			}
			controls.check(
				'control.boxed.static.vertical',
				expectedVertical,
				verticalRead,
				JSON.stringify(verticalRead) === JSON.stringify(expectedVertical),
			)

			const pixelHide = await measureVerticalHide(BOXED_VERTICAL, PIXEL_VERTICAL)
			await logPhases('boxed.vertical.pixel.hide', pixelHide)
			const autoHide = await measureVerticalHide(BOXED_VERTICAL, AUTO_VERTICAL)
			await logPhases('boxed.vertical.auto.hide', autoHide)
			await measure('compare.boxed.vertical.auto.hide', () => comparePhases(autoHide, pixelHide, 'height'))

			const pixelShow = await measureVerticalShow(BOXED_VERTICAL, PIXEL_VERTICAL)
			await logPhases('boxed.vertical.pixel.show', pixelShow)
			const autoShow = await measureVerticalShow(BOXED_VERTICAL, AUTO_VERTICAL)
			await logPhases('boxed.vertical.auto.show', autoShow)
			await measure('compare.boxed.vertical.auto.show', () => comparePhases(autoShow, pixelShow, 'height'))

			const instrument = { show: readInstrument(pixelShow), hide: readInstrument(pixelHide) }
			controls.check(
				'control.boxed.instrument.vertical',
				'show start < half < end; hide start > half > end',
				instrument,
				isRising(pixelShow) && isFalling(pixelHide),
			)
		} finally {
			boxed.remove()
			style.remove()
		}
		expect(controls.failures).toEqual([])
	})
})
