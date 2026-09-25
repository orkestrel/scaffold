// J-COLLAPSE-SIZE-PROBE: how far a horizontal `.collapse-horizontal` panel's width runs, and in what
// shape, under Bootstrap's pixel path and under each `calc-size()` basis, at every phase of show and
// hide. The primary fixture is J-NATIVE-PROBE round 3's: a 30px child in a 300px container. Two text
// fixtures separate the `min-content`, `fit-content`, and `max-content` bases, which the 30px child
// cannot. Every reading is one `ROW <name> <json>` line; every control is collected and asserted at the
// end of its test, so every row logs before a failed control reddens the run.
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

interface Fixture {
	readonly label: string
	readonly markup: string
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

function buildPanel(fixture: Fixture, className: string): { readonly container: HTMLElement; readonly host: HTMLElement } {
	const container = document.createElement('div')
	container.style.width = '300px'
	const host = document.createElement('div')
	host.className = className
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

function readRect(reading: Reading): number | undefined {
	if (typeof reading !== 'object' || reading === null) return undefined
	const rect: unknown = Reflect.get(reading, 'rect')
	return typeof rect === 'number' ? rect : undefined
}

function readWidth(reading: Reading): string | undefined {
	if (typeof reading !== 'object' || reading === null) return undefined
	const width: unknown = Reflect.get(reading, 'width')
	return typeof width === 'string' ? width : undefined
}

// Compares each phase a variant read against the pixel path's same phase: the rect-width difference
// in px and whether the computed widths are equal.
function comparePhases(
	variant: Readonly<Record<string, Reading>>,
	pixel: Readonly<Record<string, Reading>>,
): Reading {
	const phases: Record<string, Reading> = {}
	let matches = true
	for (const [phase, reading] of Object.entries(variant)) {
		const own = readRect(reading)
		const base = readRect(pixel[phase])
		if (own === undefined || base === undefined) continue
		const delta = round2(own - base)
		const widthEqual = readWidth(reading) === readWidth(pixel[phase])
		if (delta !== 0 || !widthEqual) matches = false
		phases[phase] = { delta, widthEqual }
	}
	return { matches, ...phases }
}

async function logPhases(prefix: string, phases: Readonly<Record<string, Reading>>): Promise<void> {
	for (const [phase, reading] of Object.entries(phases)) await measure(`${prefix}.${phase}`, () => reading)
}

// Measures every variant's show and hide over one fixture, logs a row per phase, and logs each
// basis's comparison with the pixel path. Returns the pixel path's show and hide for its controls.
async function measureFixture(
	fixture: Fixture,
	prefix: string,
): Promise<{ readonly show: Readonly<Record<string, Reading>>; readonly hide: Readonly<Record<string, Reading>> }> {
	const shows: Record<string, Readonly<Record<string, Reading>>> = {}
	const hides: Record<string, Readonly<Record<string, Reading>>> = {}
	for (const variant of VARIANTS) {
		const show = await measureShow(fixture, variant)
		shows[variant.label] = show
		await logPhases(`${prefix}.${variant.label}.show`, show)
		const hide = await measureHide(fixture, variant)
		hides[variant.label] = hide
		await logPhases(`${prefix}.${variant.label}.hide`, hide)
	}
	const pixelShow = shows.pixel ?? {}
	const pixelHide = hides.pixel ?? {}
	for (const [label] of BASES) {
		await measure(`compare.${prefix}.${label}.show`, () => comparePhases(shows[label] ?? {}, pixelShow))
		await measure(`compare.${prefix}.${label}.hide`, () => comparePhases(hides[label] ?? {}, pixelHide))
	}
	return { show: pixelShow, hide: pixelHide }
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
