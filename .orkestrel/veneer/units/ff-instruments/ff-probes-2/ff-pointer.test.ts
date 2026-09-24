import type { CaptureFilename, CaptureScenario, CaptureSubject, FrameEdge } from '../../tests/setup.js'
import { requireValue } from '@orkestrel/test'
import {
	build,
	buildCensus,
	buildContrast,
	buildEscapes,
	clickAccessible,
	createJournal,
	createPortfolio,
	describeFocus,
	describeTree,
	expandCaptures,
	extractStyles,
	holdAccessible,
	hoverAccessible,
	mount,
	pressKeys,
	readCensus,
	readContrast,
	readHit,
	readName,
	readFrame,
	readPage,
	readPerception,
	readRefusal,
	readRing,
	readStates,
	readStyle,
	releaseMedia,
	releasePane,
	releasePointer,
	stageMedia,
	stagePane,
	traverseAccessible,
	waitForAnimations,
	waitForState,
} from '@orkestrel/test/browser'
import {
	afterAll,
	afterEach,
	beforeEach,
	describe,
	expect,
	inject,
	it,
	onTestFinished,
} from 'vitest'
import { commands, page } from 'vitest/browser'
import {
	ALERT_SPECIMENS,
	ACCORDION_SPECIMENS,
	BUTTON_GROUP_SPECIMENS,
	BACKGROUND_SPECIMENS,
	BADGE_SPECIMENS,
	BORDER_SPECIMENS,
	BREADCRUMB_SPECIMENS,
	BUTTON_SPECIMENS,
	CARD_SPECIMENS,
	CAROUSEL_SPECIMENS,
	CLOSE_SPECIMENS,
	COLLAPSE_SPECIMENS,
	CONTENT_SPECIMENS,
	DROPDOWN_SPECIMENS,
	DISPLAY_SPECIMENS,
	FADE_SPECIMENS,
	FLEX_SPECIMENS,
	FOCUS_RING_SPECIMENS,
	FLOAT_SPECIMENS,
	FORM_CHECK_SPECIMENS,
	FORM_CONTROL_SPECIMENS,
	FORM_FLOATING_SPECIMENS,
	FORM_LABEL_SPECIMENS,
	FORM_RANGE_SPECIMENS,
	INPUT_GROUP_SPECIMENS,
	INTERACTION_SPECIMENS,
	FORM_SELECT_SPECIMENS,
	LAYOUT_SPECIMENS,
	LINK_SPECIMENS,
	LIST_GROUP_SPECIMENS,
	MEDIA_SPECIMENS,
	MODAL_SPECIMENS,
	NAV_SPECIMENS,
	NAVBAR_SPECIMENS,
	OPACITY_SPECIMENS,
	OBJECT_FIT_SPECIMENS,
	OVERFLOW_SPECIMENS,
	OFFCANVAS_SPECIMENS,
	PAGINATION_SPECIMENS,
	PLACEHOLDER_SPECIMENS,
	POPOVER_SPECIMENS,
	POSITION_SPECIMENS,
	PROGRESS_SPECIMENS,
	SHADOW_SPECIMENS,
	SHOWCASE_COPY,
	SIZING_SPECIMENS,
	SPACING_SPECIMENS,
	SPINNER_SPECIMENS,
	TABLE_SPECIMENS,
	TOAST_SPECIMENS,
	TOOLTIP_SPECIMENS,
	TYPE_SPECIMENS,
	VALIDATION_SPECIMENS,
	VISIBILITY_SPECIMENS,
	TEXT_SPECIMENS,
	COLOR_SPECIMENS,
} from '@app/browser'
import {
	buildStem,
	CAPTURE_KEYS,
	CAPTURE_SCENARIOS,
	CASCADE_KEYS,
	CASCADE_KEY_TIMEOUT,
	computeCroppedEdges,
	computeRingReach,
	CONTRAST_BAR,
	DISABLED_OPACITY,
	DRIVEN_KEYS,
	FOCUS_RING,
	isVariantName,
	UNDER_BAR,
} from '../../tests/setup.js'
import {
	applyTheme,
	buildOracleComparison,
	collectPainted,
	describeSubject,
	driveOracle,
	FrameManager,
	measureVariation,
	mountShowcase,
	ORACLE_ACTIONS,
	ORACLE_EXCLUDED,
	recordState,
	readButton,
	readOracleButton,
	readRegion,
	readSpecimen,
	readSubject,
} from '../../tests/setupBrowser.js'
import { FORM_CHECK_ICON_CASES } from '../../tests/setupStyles.js'

const PROVIDED = inject('variant')
if (!isVariantName(PROVIDED)) {
	throw new Error(`The journey variant "${PROVIDED}" names no theme and viewport width`)
}
// The project provides the variant as a plain string, and every filename this run writes and reads
// back is built on it, so its grammar is settled here rather than at each name.
const VARIANT = PROVIDED
const VARIANTS = inject('variants')
const CAPTURE = inject('capture')
const FAMILIES = Object.freeze(['journey', 'refusal', 'matrix', 'capture'])
const PROVEN = new Set<string>()
// One spelling of the portfolio's directory. The portfolio resolves it from this file and the
// runner's own file commands resolve it from the workspace root, so a guard reading a frame back
// and a capture writing one address the same directory.
const STATES = 'tmp/capture/states'
const PORTFOLIO = createPortfolio({
	states: CAPTURE_SCENARIOS,
	variants: VARIANTS,
	variant: VARIANT,
	directory: `../../../${STATES}`,
	enabled: CAPTURE,
})
const FRAMES = new FrameManager(PORTFOLIO)
const HOVERED: string[] = []
const PLACE = FRAMES.place.bind(FRAMES)
FRAMES.place = async (scenario, subject, frame) => {
	const before = [...document.querySelectorAll('body > div.p-3 *:hover')].map((e) => `${e.tagName}.${e.className}|${String(e.textContent).trim().slice(0, 30)}`)
	await PLACE(scenario, subject, frame)
	HOVERED.push(JSON.stringify({ scenario, before }))
}
const JOURNAL = createJournal()
const ARTIFACT: string[] = []
const ACCESSIBILITY = 'accessibility'

// The registered light and dark variants at this run's own viewport. A run photographs only the
// mode its own variant names, so the theme a filename carries and the theme its frame shows are one
// reading; and a mode string borrowed from another width would label every artifact of a 390 run
// with a 1280 variant's name.
const WIDTH = requireValue(
	VARIANTS.find((variant) => variant.name === VARIANT),
	`The variant matrix registers no variant named ${VARIANT}`,
).width
const LIGHT = requireValue(
	VARIANTS.find((variant) => variant.width === WIDTH && variant.name.startsWith('light-')),
	`The variant matrix registers no light mode at ${String(WIDTH)} wide`,
).name
const DARK = requireValue(
	VARIANTS.find((variant) => variant.width === WIDTH && variant.name.startsWith('dark-')),
	`The variant matrix registers no dark mode at ${String(WIDTH)} wide`,
).name

let mounted: Awaited<ReturnType<typeof mountShowcase>>
// Holds what refused a teardown, for as long as the run lasts. A teardown that cannot finish leaves
// state the next case would inherit silently: the installed media helper keeps its stage marker
// until a read-back succeeds, so a restoration rejecting after reduced motion was staged leaves
// every following case under that emulation, and each of them would report the emulation's own paint
// as a defect of the surface. The marker is never cleared, because nothing after a refused teardown
// can show the state it was meant to leave.
let unclean: string | undefined

beforeEach(async () => {
	document.addEventListener('mouseover', (event) => {
		if (event.target instanceof Element && event.target.closest('body > div.p-3') !== null) {
			HOVERED.push(JSON.stringify({ test: expect.getState().currentTestName, entered: `${event.target.tagName}.${event.target.className}|${String(event.target.textContent).trim().slice(0, 30)}` }))
		}
	}, { capture: true })
	if (unclean !== undefined) {
		throw new Error(`An earlier journey teardown was refused and never cleared: ${unclean}`)
	}
	mounted = await mountShowcase()
	JOURNAL.start()
})

afterEach(async () => {
	JOURNAL.stop()
	ARTIFACT.push(JSON.stringify({ steps: JOURNAL.steps, output: JOURNAL.output }))
	// Every step runs whatever the step before it did, and the refusals are collected and raised
	// together at the end: a held pointer outlives the node it was pressed on, a staged preference
	// outlives the document that read it, and a staged pane outlives the case that staged it, so a
	// release that rejects must not leave the mounted showcase, the delegate, the staged media, or
	// the staged pane behind for the next case to inherit. The pane is released here as well as in
	// the case that stages it, because a case failing between the staging and the placement never
	// reaches its own release and leaves every case after it on a surface the runner is no longer
	// fitting. A release with nothing staged finds no recorded viewport and changes nothing.
	const refused: unknown[] = []
	for (const release of [releasePointer, releaseMedia, releasePane]) {
		try {
			await release()
		} catch (error) {
			refused.push(error)
		}
	}
	try {
		mounted.cleanup()
	} catch (error) {
		refused.push(error)
	}
	document.documentElement.removeAttribute('data-bs-theme')
	if (refused.length > 0) {
		unclean = refused.map((reason) => String(reason)).join('; ')
		throw new AggregateError(refused, 'The journey teardown was refused')
	}
})

afterAll(async () => {
	await commands.writeFile(
		`tmp/probe/ff-pointer-${VARIANT}.txt`,
		[VARIANT, ...HOVERED].join('\n'),
	)
})

describe('journey', () => {
	it('arrives at the showcase through its named region', async () => {
		PROVEN.add('journey')
		await applyTheme(VARIANT)
		expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
		expect(readPerception('Buttons')).toContain(
			'Every button variant, size, host, and state the cascade ships.',
		)
		expect(readPage()).toContain('Veneer')
		expect(readPage()).not.toMatch(/schema|transport|engine/iu)
		ARTIFACT.push(describeTree(mounted.host))
		JOURNAL.record('arrive', 'Showcase', readPerception('Showcase'))
		await FRAMES.page('showcase', readSubject(mounted.host, SHOWCASE_COPY.region))
	})

	it('switches the announced and painted mode through the control', async () => {
		await applyTheme(LIGHT)
		const light = readStyle(document.body, 'background-color')
		await clickAccessible('button', 'Dark mode')
		expect(await waitForState('button', 'Dark mode', 'pressed=true')).toContain('pressed=true')
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark')
		await waitForAnimations(document.body)
		const dark = readStyle(document.body, 'background-color')
		expect(dark).not.toBe(light)
		JOURNAL.record('click', 'Dark mode', dark)
		// No frame is shot here. The arrival frame is placed in the mode this run's own variant
		// names, so the dark arrival frame is the dark run's, taken with no pointer on the page; a
		// frame shot under this click would carry the hover mix the published bare-button treatment
		// paints on the control it was clicked with, and a reader comparing the two modes would read
		// that mark as a mode difference.
		await releasePointer()
		await clickAccessible('button', 'Dark mode')
		expect(await waitForState('button', 'Dark mode', 'pressed=false')).toContain('pressed=false')
		await waitForAnimations(document.body)
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light')
		expect(readStyle(document.body, 'background-color')).toBe(light)
	})

	it('reaches and operates the mode control through the keyboard', async () => {
		await applyTheme(LIGHT)
		const control = await traverseAccessible('Dark mode')
		expect(document.activeElement).toBe(control)
		expect(readStates(control)).toContain('pressed=false')
		ARTIFACT.push(describeFocus(mounted.host))
		await pressKeys('{Enter}')
		expect(await waitForState('button', 'Dark mode', 'pressed=true')).toContain('pressed=true')
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark')
		JOURNAL.record('press', 'Enter', 'pressed=true')
	})

	it('toggles a delegated host through a click on the element carrying its label', async () => {
		const host = readButton(mounted.section, 'Label')
		const label = requireValue(
			host.firstElementChild,
			'The Label specimen carries no label element',
		)
		expect(label.localName).toBe('span')
		// The delegation prevents the default action of a click anywhere inside the host, so the
		// cancellation is read from the document rather than from the host: a click landing on the
		// label is the case the published selector's `closest` resolution exists for.
		const targets: string[] = []
		const cancelled: boolean[] = []
		const controller = new AbortController()
		document.addEventListener(
			'click',
			(event) => {
				if (!(event.target instanceof Element) || !host.contains(event.target)) return
				targets.push(event.target.localName)
				cancelled.push(event.defaultPrevented)
			},
			{ signal: controller.signal },
		)
		try {
			await clickAccessible('button', 'Label')
			expect(await waitForState('button', 'Label', 'pressed=true')).toContain('pressed=true')
			expect(host.classList.contains('active')).toBe(true)
			expect(readStates(host)).toStrictEqual(['pressed=true'])
			expect(targets).toStrictEqual(['span'])
			expect(cancelled).toStrictEqual([true])
			JOURNAL.record('click', 'Label', 'pressed=true')
			await clickAccessible('button', 'Label')
			expect(await waitForState('button', 'Label', 'pressed=false')).toContain('pressed=false')
			expect(targets).toStrictEqual(['span', 'span'])
		} finally {
			controller.abort()
		}
	})

	it('toggles a native host and an anchor host through the keyboard', async () => {
		// The anchor is reached before the native host because the Button table renders it earlier:
		// each traversal walks forward from the current focus and wraps once around the document, so
		// reaching the earlier host second costs one stop per control the showcase renders. Measured
		// at the wide variant, the reversed order took 30816 ms against this case's budget and this order
		// takes 5546 ms, and the difference grows with every focusable specimen a later section adds.
		const anchor = await traverseAccessible('Anchor')
		expect(document.activeElement).toBe(anchor)
		await pressKeys('{Enter}')
		expect(await waitForState('button', 'Anchor', 'pressed=true')).toContain('pressed=true')
		expect(anchor.classList.contains('active')).toBe(true)
		JOURNAL.record('press', 'Anchor', 'pressed=true')
		const native = await traverseAccessible('Toggle')
		expect(document.activeElement).toBe(native)
		await pressKeys(' ')
		expect(await waitForState('button', 'Toggle', 'pressed=true')).toContain('pressed=true')
		await pressKeys('{Enter}')
		expect(await waitForState('button', 'Toggle', 'pressed=false')).toContain('pressed=false')
		JOURNAL.record('press', 'Toggle', 'pressed=false')
	})

	it('refuses a native disabled host and an aria-disabled anchor with the unreachable voice', async () => {
		const blocked = readButton(mounted.section, 'Blocked')
		const disabled = readButton(mounted.section, 'Disabled')
		expect(readStates(blocked)).toStrictEqual(['disabled'])
		expect(readStates(disabled)).toStrictEqual(['disabled'])
		// The voice is the installed resolver's own, read from it for each host rather than copied
		// into this file. The `refusal` family is where that voice is held against the sentence this
		// workspace raises, so a wording the package moves reddens there rather than arriving here
		// as two hosts asserting a sentence nothing produces.
		const refusals = new Map(
			['Blocked', 'Disabled'].map((name): readonly [string, string] => [
				name,
				requireValue(readRefusal('button', name), `The ${name} host refused nothing`),
			]),
		)
		expect([...refusals].filter(([name, sentence]) => !sentence.includes(name))).toStrictEqual([])
		expect(new Set(refusals.values()).size).toBe(refusals.size)
		const reading = await recordState(disabled, () => clickAccessible('button', 'Disabled'))
		expect(reading.refusal).toBe(refusals.get('Disabled'))
		expect(reading.mutations).toStrictEqual([])
		expect(reading.clicks).toStrictEqual([])
		JOURNAL.record('refuse', 'Disabled', requireValue(reading.refusal, 'The drive was not refused'))
	})

	it('refuses a covered host, then activates it once the cover is out of the way', async () => {
		const host = readButton(mounted.section, 'Toggle')
		const box = host.getBoundingClientRect()
		const cover = mount(
			build('div', {
				attributes: {
					style: `position: fixed; top: ${String(box.top)}px; left: ${String(box.left)}px; width: ${String(box.width)}px; height: ${String(box.height)}px; z-index: 9`,
				},
			}),
		)
		try {
			expect(readHit(host)).toBe(cover)
			await expect(holdAccessible('button', 'Toggle')).rejects.toThrow(
				'Interactive target "Toggle" did not enter the pressed state',
			)
			expect(host.hasAttribute('aria-pressed')).toBe(false)
			JOURNAL.record('refuse', 'Toggle', 'covered')
			cover.remove()
			expect(readHit(host)).toBe(host)
			await clickAccessible('button', 'Toggle')
			expect(await waitForState('button', 'Toggle', 'pressed=true')).toContain('pressed=true')
			JOURNAL.record('click', 'Toggle', 'pressed=true')
		} finally {
			cover.remove()
		}
	})

	it('paints a focus ring on every variant reached through the keyboard', async () => {
		await applyTheme(LIGHT)
		const painted = collectPainted(mounted.section)
		const rings = new Map<string, number | undefined>()
		// Tab traversal is what earns `:focus-visible`: a programmatic `focus()` call moves focus
		// without it, and a ring reading taken then is about a state no reader ever sees. The painted
		// buttons are traversed in document order, so each one is one Tab on from the last, and the
		// elements traversal actually reached are collected to be set beside that population.
		const unfocused: string[] = []
		const traversed: HTMLElement[] = []
		for (const specimen of painted) {
			const name = readName(specimen)
			const host = await traverseAccessible(name)
			traversed.push(host)
			if (!host.matches(':focus-visible')) unfocused.push(name)
			await waitForAnimations(host)
			rings.set(name, readRing(host))
		}
		ARTIFACT.push(JSON.stringify({ reading: 'focus ring', mode: LIGHT, rings: [...rings] }))
		expect(unfocused).toStrictEqual([])
		expect(traversed).toStrictEqual([...painted])
		expect(rings.size).toBe(painted.length)
		const primary = rings.get('Primary')
		expect(primary).toBeTypeOf('number')
		// The calibrated reading is pinned, not merely bounded: a uniform change of the focus token
		// moves every specimen together and leaves an equality sweep green.
		expect(primary ?? 0).toBeCloseTo(FOCUS_RING.light, 3)
		// One ring serves every variant: the mixin paints the shared focus token rather than the
		// variant's own fill, so a variant reading its own ratio is drift rather than a refinement.
		expect([...new Set(rings.values())]).toStrictEqual([primary])
		JOURNAL.record('focus', 'Primary', String(primary))
	})

	it('paints one focus ring on every variant in dark mode as well', async () => {
		await applyTheme(DARK)
		const painted = collectPainted(mounted.section)
		const rings = new Map<string, number | undefined>()
		const unfocused: string[] = []
		const traversed: HTMLElement[] = []
		for (const specimen of painted) {
			const name = readName(specimen)
			const host = await traverseAccessible(name)
			traversed.push(host)
			if (!host.matches(':focus-visible')) unfocused.push(name)
			await waitForAnimations(host)
			rings.set(name, readRing(host))
		}
		ARTIFACT.push(JSON.stringify({ reading: 'focus ring', mode: DARK, rings: [...rings] }))
		expect(unfocused).toStrictEqual([])
		expect(traversed).toStrictEqual([...painted])
		expect(rings.size).toBe(painted.length)
		const primary = rings.get('Primary')
		expect(primary).toBeTypeOf('number')
		// The calibrated reading is pinned, not merely bounded, for the reason the light sweep states.
		expect(primary ?? 0).toBeCloseTo(FOCUS_RING.dark, 3)
		// The dark mode paints the shared focus token too, so one ratio answers for every variant here
		// as it does in the light sweep, and the dark value is pinned once beside it.
		expect([...new Set(rings.values())]).toStrictEqual([primary])
		JOURNAL.record('focus', 'Primary', String(primary))
	})

	it('rings the Primary host inside its lifted padded frame when Tab reaches it', async () => {
		await applyTheme(VARIANT)
		const host = readButton(mounted.section, 'Primary')
		// The focus frame is an element frame of the host lifted into a padded wrapper at the
		// document's start, and the host goes back to its place afterwards. The ring paints outside the
		// host's border box, so a frame of the host alone crops it, and a page frame shows it beside
		// the page's other chrome at the page's own scale; the wrapper's padding holds the ring. A
		// dark run switches the mode with a pointer press and leaves the pointer where the control sat,
		// so the pointer is released onto the wrapper's padding before the shot. The wrapper takes
		// focus without joining the tab order, so Tab from it reaches the host as a keyboard reader
		// reaches it.
		const marker = document.createComment('primary-focus')
		host.before(marker)
		const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		lifted.append(host)
		document.body.prepend(lifted)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = lifted
		let visible = false
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			// FF-POINTER-PROBE deleted release
			lifted.focus()
			expect(await traverseAccessible('Primary')).toBe(host)
			await waitForAnimations(host)
			reach = computeRingReach((property) => readStyle(host, property))
			await FRAMES.place('primary-focus', host, shot)
			visible = host.matches(':focus-visible')
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'primary-focus'),
				'The Primary focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, reach * ratio, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			host.blur()
		} finally {
			marker.replaceWith(host)
			lifted.remove()
		}
		// The frame was shot while the host held keyboard focus, the host paints a ring past its box,
		// and every edge of that ring lies inside the frame: a frame that crops the ring names the edge
		// it crops here.
		expect(visible).toBe(true)
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		expect(host.parentElement).not.toBe(lifted)
		ARTIFACT.push(JSON.stringify({ reading: 'primary focus frame', mode: VARIANT, reach }))
		JOURNAL.record('focus', 'Primary', String(reach))
	})

	it('measures the composed contrast of every variant and state against its control', async () => {
		const control = buildContrast(CONTRAST_BAR)
		mount(control.root)
		try {
			expect(readContrast(control.refused)).toBeLessThan(CONTRAST_BAR)
			expect(readContrast(control.accepted)).toBeGreaterThanOrEqual(CONTRAST_BAR)
		} finally {
			control.root.remove()
		}
		const readings = new Map<string, number>()
		const dimmed = new Map<string, string>()
		for (const mode of ['light', 'dark'] as const) {
			await applyTheme(mode === 'dark' ? DARK : LIGHT)
			for (const specimen of collectPainted(mounted.section)) {
				readings.set(`${mode}|${readName(specimen)}|rest`, readContrast(specimen))
			}
			const pressed = readButton(mounted.section, 'Pressed')
			readings.set(`${mode}|Pressed|pressed`, readContrast(pressed))
			const blocked = readButton(mounted.section, 'Blocked')
			readings.set(`${mode}|Blocked|disabled`, readContrast(blocked))
			dimmed.set(mode, readStyle(blocked, 'opacity'))
		}
		ARTIFACT.push(
			JSON.stringify({ reading: 'contrast', bar: CONTRAST_BAR, readings: [...readings] }),
		)
		expect([...dimmed]).toStrictEqual([
			['light', DISABLED_OPACITY],
			['dark', DISABLED_OPACITY],
		])
		expect(
			[...readings].filter(([, ratio]) => !(ratio > 1) || !Number.isFinite(ratio)),
		).toStrictEqual([])
		expect(
			[...readings]
				.filter(([, ratio]) => ratio < CONTRAST_BAR)
				.map(([key]) => key)
				.sort(),
		).toStrictEqual(UNDER_BAR)
		expect(readings.get('light|Primary|rest')).not.toBe(readings.get('dark|Primary|rest'))
		JOURNAL.record('read', 'contrast', String(readings.get('light|Primary|rest')))
	})

	it('repaints a host under the pointer while it is hovered and while it is held', async () => {
		// The hover and the active frame are element frames of the driven host, lifted to the
		// document's start for the run of this case and put back when it finishes. A placement takes
		// every showcase section but the one holding its frame out of the layout, so a host left in
		// the Buttons section moves up by the height of the Showcase region above it and out from
		// under a pointer that does not move with it. Nothing above the lifted host is taken out, so
		// the shot finds it where the pointer is. The host itself is moved rather than copied,
		// because the pointer verbs resolve the control by its accessible name and a copy would
		// answer to the same one.
		// Each frame's own state is read again after the shot and collected here, because a capture
		// stages the pane: a frame labelled `hover` has to be proven to have been taken while the
		// pointer was still on the host, and the collection names which frame was not.
		const framed: Array<readonly [string, boolean]> = []
		// A capture stages the tester pane before it shoots, and that staging is what a frame of a
		// pointer state has to survive: it repositions the document under a pointer that does not
		// move with it, and it re-triggers the feedback transition. So each frame here is taken
		// against both. The pane is staged before the pointer is placed, so the shot finds the host
		// under it; reduced motion is staged around the placement and released straight after, so
		// the shot cannot land inside the transition. Every pointer reading stays under motion,
		// which is the paint a reader with motion sees. The duration at each shot and the paint the
		// host carries across each placement are collected beside the settled mix the frame holds.
		const durations: Array<readonly [string, string]> = []
		const restored: Array<readonly [string, string]> = []
		const settled: Array<readonly [string, string]> = []
		const host = readButton(mounted.section, 'Primary')
		const marker = document.createComment('Primary')
		host.before(marker)
		const lifted = build('div')
		lifted.append(host)
		document.body.prepend(lifted)
		onTestFinished(() => {
			marker.replaceWith(host)
			lifted.remove()
		})
		for (const mode of [LIGHT, DARK]) {
			await applyTheme(mode)
			// Both modes are driven and read in every run; the frames are placed in the mode this
			// run's own variant names, which is the theme its filenames carry.
			const shooting = mode === VARIANT
			const rest = readStyle(host, 'background-color')
			// The pointer is aimed at the staged layout rather than the fitted one, because a host
			// hovered before the pane is staged is no longer under the pointer at the shot and its
			// frame carries the rest fill. The capture's own staging finds the pane already in place
			// and moves nothing. A held host needs none of this: the press captures the pointer, so
			// `:active` survives a staging that `:hover` does not.
			await stagePane(window.innerWidth, window.innerHeight)
			await hoverAccessible('button', 'Primary')
			await waitForAnimations(host)
			const hovered = readStyle(host, 'background-color')
			expect(host.matches(':hover')).toBe(true)
			expect(hovered).not.toBe(rest)
			await stageMedia({ motion: false })
			durations.push([`hover ${mode}`, readStyle(host, 'transition-duration')])
			// The host sits outside the showcase's `main` element, where a placement takes nothing
			// above it out of the layout, so the shot finds it under the pointer. A host left in
			// its section fails here: the placement moves it out from under the pointer.
			expect(mounted.host.querySelector('main')?.contains(host)).toBe(false)
			if (shooting) await FRAMES.place('primary-hover', host)
			// Both readings that decide the frame are taken here, before the pointer is placed
			// again: the capture stages the pane, shoots, and hands the pane back before it returns,
			// and the hand-back moves the document out from under a pointer that does not move with
			// it. A reading taken in the handed-back layout reports the state that followed the
			// frame — it reads unhovered, at the rest fill, against a frame holding the settled
			// hover mix — so it decides nothing about the frame. Staging the pane again at the
			// viewport, with the pointer left where the shot found it, puts the host back under it.
			// The placement has laid every section out again by then, but nothing above the lifted
			// host was taken out of the layout, so the host sits where it sat at the shot: a capture
			// whose shot found the host elsewhere leaves it unhovered and at its rest fill here.
			await stagePane(window.innerWidth, window.innerHeight)
			const framedHover = host.matches(':hover')
			const framedPaint = readStyle(host, 'background-color')
			expect(framedHover).toBe(true)
			expect(framedPaint).toBe(hovered)
			framed.push([`hover ${mode}`, framedHover])
			restored.push([`hover ${mode}`, framedPaint])
			settled.push([`hover ${mode}`, hovered])
			// The capture releases the pane on its way out, and this releases it again for the run
			// that places no frame at all: a pane left staged outlives the case and every act after
			// it happens on a surface the runner is no longer fitting. The pointer is placed once
			// more because the release moves the document back out from under it, and the hold that
			// follows starts from a host the pointer is on.
			await releasePane()
			await hoverAccessible('button', 'Primary')
			await releaseMedia()
			await holdAccessible('button', 'Primary')
			await waitForAnimations(host)
			const held = readStyle(host, 'background-color')
			expect(host.matches(':active')).toBe(true)
			expect(held).not.toBe(hovered)
			await stageMedia({ motion: false })
			durations.push([`active ${mode}`, readStyle(host, 'transition-duration')])
			expect(mounted.host.querySelector('main')?.contains(host)).toBe(false)
			if (shooting) await FRAMES.place('primary-active', host)
			restored.push([`active ${mode}`, readStyle(host, 'background-color')])
			settled.push([`active ${mode}`, held])
			await releaseMedia()
			framed.push([`active ${mode}`, host.matches(':active')])
			await releasePointer()
			await waitForAnimations(host)
			expect(host.matches(':active')).toBe(false)
			expect(readStyle(host, 'background-color')).toBe(rest)
			ARTIFACT.push(JSON.stringify({ reading: 'pointer paint', mode, rest, hovered, held }))
			JOURNAL.record('hold', 'Primary', held)
		}
		expect(framed.filter(([, held]) => !held)).toStrictEqual([])
		// The transition is held off across every shot, so no frame is taken from inside it, and the
		// paint the host carries across each placement is set beside the settled mix the frame
		// holds: a placement that moved the paint would report a third colour here.
		expect(durations.filter(([, duration]) => duration !== '0s')).toStrictEqual([])
		expect(restored).toStrictEqual(settled)
		ARTIFACT.push(JSON.stringify({ reading: 'frame paint', settled }))
	})

	it('holds the feedback transition off while reduced motion is staged', async () => {
		const host = readButton(mounted.section, 'Primary')
		const moving = readStyle(host, 'transition-duration')
		expect(moving).not.toBe('0s')
		await stageMedia({ motion: false })
		expect(readStyle(host, 'transition-duration')).toBe('0s')
		await hoverAccessible('button', 'Primary')
		await waitForAnimations(host)
		expect(host.matches(':hover')).toBe(true)
		ARTIFACT.push(JSON.stringify({ reading: 'motion', moving, reduced: '0s' }))
		JOURNAL.record('stage', 'reduced motion', readStyle(host, 'transition-duration'))
		await releaseMedia()
		expect(readStyle(host, 'transition-duration')).toBe(moving)
	})

	it('drives a delegated host to pressed and photographs it in both modes', async () => {
		const host = readButton(mounted.section, 'Toggle')
		for (const mode of [LIGHT, DARK]) {
			await applyTheme(mode)
			await waitForAnimations(document.body)
			expect(document.documentElement.getAttribute('data-bs-theme') === 'dark').toBe(mode === DARK)
			expect(host.classList.contains('active')).toBe(false)
			await clickAccessible('button', 'Toggle')
			expect(await waitForState('button', 'Toggle', 'pressed=true')).toContain('pressed=true')
			await waitForAnimations(host)
			// The frame is the host's own, not the page's: a page frame of the Buttons section at
			// rest and one with this host pressed differ by one host among every specimen that
			// section renders. The pressed paint is what this scenario claims, so the frame carries
			// the host that paints it.
			if (mode === VARIANT) await FRAMES.place('toggle-pressed', host)
			expect(host.classList.contains('active')).toBe(true)
			// The artifact's other tree is taken on arrival, where nothing is pressed, so the pressed
			// moment has no record unless it is written here. The region is the narrowest subtree
			// carrying the toggled host, and this is the tree the frame beside it was shot from.
			const tree = describeTree(mounted.section)
			expect(tree).toContain('button "Toggle" [pressed=true]')
			ARTIFACT.push(tree)
			await clickAccessible('button', 'Toggle')
			expect(await waitForState('button', 'Toggle', 'pressed=false')).toContain('pressed=false')
			await waitForAnimations(host)
		}
	})

	it(
		'reads every resting cascade key the same on its lifted frame as in the showcase, in light and dark',
		async () => {
			// Each key is addressed by the specimen label its section declared, because one class
			// answers for several specimens: the Layout table alone renders several containers.
			const rendered = new Map<string, string>()
			const framed = new Map<string, string>()
			const paint = new Map<string, string>()
			const hung = new Map<
				string,
				{
					readonly edge: number
					readonly limit: number
					readonly shared: boolean
					readonly hit: string | undefined
				}
			>()
			// Collects every scenario whose lifted copy the pointer entered while its frame was shot.
			const entered = new Set<string>()
			// Collects every scenario whose copy checked a different control than its specimen, or left
			// its specimen checking a different control than before the lift, keyed by mode.
			const switched: string[] = []
			for (const mode of [LIGHT, DARK]) {
				await applyTheme(mode)
				await waitForAnimations(document.body)
				// Each frame here is a resting frame, so the pointer is released before the shots. A mode
				// switch clicks the mode control and leaves the pointer where that control sat, and the
				// staging a shot takes moves the tester under a pointer that does not move with it, so a
				// lifted copy lands under the pointer and one of its links paints its hover in a frame
				// named for rest. The release parks the pointer at the page's origin, and each copy is
				// lifted below the wrapper's top padding, which is deeper than the widest negative gutter
				// a specimen's first row pulls up by, so the parked pointer rests on the wrapper rather
				// than on anything the frame shows.
				await releasePointer()
				for (const key of CASCADE_KEYS) {
					const specimen = readSpecimen(mounted.host, key.subject)
					const element = requireValue(
						specimen.querySelector(key.selector),
						`The "${key.subject}" specimen renders no ${key.selector}`,
					)
					const checked = [...specimen.querySelectorAll('input')].map((input) => input.checked)
					let copied: readonly boolean[] = []
					// The frame is shot on a copy of the whole specimen lifted to the document's start,
					// and the copy's own element inside it is the region the written frame is read on.
					// A page frame holds the whole section around the key, so keys sharing a section
					// would be one image under several names; and an element frame taken where the
					// showcase renders these specimens was measured blank white at both registered
					// widths. The lift is what the harness can photograph. Shooting the selector's own
					// element instead would crop the specimen to that element, with none of the
					// background the paint is read against. The property comparison checks only the
					// declared treatment; the written frame is read back separately.
					const lifted = build('div', { classes: 'pt-5' })
					const clone = specimen.cloneNode(true)
					if (!(clone instanceof HTMLElement))
						throw new Error('The cloned specimen is not an element')
					// A radio group spans the document by name, so a copy's checked radio entering the page
					// unchecks the specimen's own: the light pass then left the Vertical group specimen with
					// no checked label, and the dark pass copied that. Each radio in the copy drops its name
					// before the copy is attached, which puts it in a group of its own and changes no rule
					// the cascade writes.
					for (const input of clone.querySelectorAll('input[type="radio"]')) {
						input.removeAttribute('name')
					}
					lifted.append(clone)
					document.body.prepend(lifted)
					const watch = new AbortController()
					try {
						const frame = requireValue(
							lifted.firstElementChild,
							`The lifted "${key.subject}" specimen carries no copy`,
						)
						const copy = requireValue(
							frame.querySelector(key.selector),
							`The lifted "${key.subject}" specimen renders no ${key.selector}`,
						)
						copied = [...frame.querySelectorAll('input')].map((input) => input.checked)
						rendered.set(`${mode}|${key.scenario}`, readStyle(element, key.property))
						framed.set(`${mode}|${key.scenario}`, readStyle(copy, key.property))
						paint.set(`${mode}|${key.scenario}`, readStyle(copy, 'color'))
						// A key whose top sits at or below its host's bottom edge hangs outside the host's
						// box. The journey reads a hanging key on the copy the frame is shot on. It reads
						// the key's bottom edge against the frame's, and it hit-tests the centre of the
						// button that leads the group after the host, a point inside the key's box and
						// the button's box.
						const box = copy.getBoundingClientRect()
						const host = requireValue(
							copy.parentElement,
							`The lifted "${key.subject}" specimen's ${key.selector} has no host`,
						)
						if (box.top >= host.getBoundingClientRect().bottom) {
							const button = requireValue(
								frame.querySelector('.input-group + .input-group > .btn:first-child'),
								`The lifted "${key.subject}" specimen renders no button-led group for its hanging ${key.selector} to cover`,
							)
							const target = button.getBoundingClientRect()
							const x = target.left + target.width / 2
							const y = target.top + target.height / 2
							const hit = readHit(button)
							hung.set(`${mode}|${key.scenario}`, {
								edge: box.bottom,
								limit: frame.getBoundingClientRect().bottom,
								shared: x > box.left && x < box.right && y > box.top && y < box.bottom,
								hit: hit === copy ? 'tooltip' : hit?.outerHTML.slice(0, 80),
							})
						}
						if (mode === VARIANT) {
							document.addEventListener(
								'mouseover',
								(event) => {
									if (event.target instanceof Node && frame.contains(event.target))
										entered.add(key.scenario)
								},
								{ capture: true, signal: watch.signal },
							)
							await FRAMES.place(key.scenario, copy, frame)
						}
					} finally {
						watch.abort()
						lifted.remove()
					}
					const kept = [...specimen.querySelectorAll('input')].map((input) => input.checked)
					if (String(copied) !== String(checked) || String(kept) !== String(checked)) {
						switched.push(`${mode}|${key.scenario}`)
					}
				}
			}
			ARTIFACT.push(JSON.stringify({ reading: 'cascade keys', readings: [...rendered] }))
			// Every copy checks the controls its specimen checks, and every specimen still checks them
			// after its copy is gone, so a resting frame shows the checked state the showcase renders.
			expect(switched).toStrictEqual([])
			// No lifted copy took the pointer while it was placed, so no resting frame carries a hover
			// paint under a name claiming rest.
			expect([...entered]).toStrictEqual([])
			// This compares each declared property after placement; it does not inspect frame pixels
			// or establish that every property of the copy matches the original.
			expect([...framed]).toStrictEqual([...rendered])
			// The row and the container are laid out by rules no mode retunes, so a reading that moved
			// with the mode would be the theme reaching a layout rule.
			expect(rendered.get(`${LIGHT}|numbered-columns`)).toBe('flex')
			expect(rendered.get(`${DARK}|numbered-columns`)).toBe('flex')
			expect(rendered.get(`${LIGHT}|capped-container`)).toBe(
				rendered.get(`${DARK}|capped-container`),
			)
			// Their layout stays fixed across modes, but their inherited text paint earns a dark frame.
			expect(paint.get(`${LIGHT}|capped-container`)).not.toBe(paint.get(`${DARK}|capped-container`))
			expect(paint.get(`${LIGHT}|numbered-columns`)).not.toBe(paint.get(`${DARK}|numbered-columns`))
			ARTIFACT.push(JSON.stringify({ reading: 'cascade text paint', readings: [...paint] }))
			// The table border and the link color are theme tokens, which is what earns each key a frame
			// in each mode: a pair whose paint never moved would be one frame registered twice.
			expect(rendered.get(`${LIGHT}|base`)).not.toBe(rendered.get(`${DARK}|base`))
			expect(rendered.get(`${LIGHT}|role-links`)).not.toBe(rendered.get(`${DARK}|role-links`))
			expect([...rendered].filter(([, value]) => value.length === 0)).toStrictEqual([])
			// The tooltip keys read the reveal their sibling state writes, in both modes.
			expect(rendered.get(`${LIGHT}|input-group-valid-tooltip`)).toBe('block')
			expect(rendered.get(`${DARK}|input-group-valid-tooltip`)).toBe('block')
			expect(rendered.get(`${LIGHT}|input-group-invalid-tooltip`)).toBe('block')
			expect(rendered.get(`${DARK}|input-group-invalid-tooltip`)).toBe('block')
			// The keys hanging below their host are the tooltip keys. Each tooltip ends inside the
			// frame, so the frame carries the whole of it, and it paints over the button of the group
			// it hangs over: the tooltip's stacking level is above the one a grouped button rests on.
			// A hit that reaches no element leaves the `hit` field undefined, which reddens like a hit
			// on the button does.
			ARTIFACT.push(JSON.stringify({ reading: 'cascade tooltips', readings: [...hung] }))
			expect([...hung.keys()]).toStrictEqual([
				`${LIGHT}|input-group-valid-tooltip`,
				`${LIGHT}|input-group-invalid-tooltip`,
				`${DARK}|input-group-valid-tooltip`,
				`${DARK}|input-group-invalid-tooltip`,
			])
			expect(
				[...hung].filter(
					([, reading]) =>
						reading.edge > reading.limit || !reading.shared || reading.hit !== 'tooltip',
				),
			).toStrictEqual([])
			JOURNAL.record('read', 'cascade keys', String(rendered.get(`${LIGHT}|role-links`)))
		},
		CASCADE_KEYS.length * CASCADE_KEY_TIMEOUT,
	)

	it('paints a validation focus ring on the passing and the failing text control, in the variant this run renders', async () => {
		await applyTheme(VARIANT)
		// The resting paint of every validation specimen is already a cascade scenario, so the focus
		// ring is the one state left to drive. Only the text controls are driven, because the ring the
		// partial paints is one rule reaching every host it styles. The rows are the driven rows whose
		// subject the validation table declares.
		const declared = new Set(VALIDATION_SPECIMENS.map((specimen) => specimen.name))
		const keys = DRIVEN_KEYS.filter((key) => declared.has(key.subject))
		expect(keys).not.toStrictEqual([])
		const rings = new Map<string, number | undefined>()
		const reaches = new Map<string, number>()
		const cropped = new Map<string, readonly FrameEdge[]>()
		// A dark run switches the mode with a pointer press and leaves the pointer where the control
		// sat, so the pointer is released onto the padding of each wrapper a control is lifted into.
		// FF-POINTER-PROBE deleted release
		for (const key of keys) {
			const specimen = readSpecimen(mounted.host, key.subject)
			const host = requireValue(specimen.querySelector('input'), `No control in ${key.subject}`)
			// Each focus frame is an element frame of the specimen lifted into a padded wrapper at the
			// document's start, the placement the Primary focus frame uses and for its reasons: the
			// ring paints outside the control's border box, and the wrapper's padding holds it. Tab
			// from the wrapper reaches the control, which is what earns `:focus-visible`; the
			// following assertion is the browser's own answer rather than an assumption about it.
			const marker = document.createComment(key.scenario)
			specimen.before(marker)
			const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
			lifted.append(specimen)
			document.body.prepend(lifted)
			// The focus frame is shot on the element held here, and its size bounds the ring's far
			// edges.
			const shot: HTMLElement = lifted
			try {
				lifted.focus()
				expect(await traverseAccessible(readName(host))).toBe(host)
				// Tab selects a filled field's whole text, and the selection's highlight would lie over
				// the paint the frame claims, so a key press collapses it to a caret.
				await pressKeys('{ArrowRight}')
				expect(host.matches(':focus-visible')).toBe(true)
				await waitForAnimations(host)
				rings.set(key.subject, readRing(host))
				const reach = computeRingReach((property) => readStyle(host, property))
				reaches.set(key.scenario, reach)
				await FRAMES.place(key.scenario, host, shot)
				const ratio = window.devicePixelRatio
				const edge = shot.getBoundingClientRect()
				const { region } = requireValue(
					FRAMES.placements.find((placement) => placement.scenario === key.scenario),
					`The ${key.scenario} frame recorded no placement`,
				)
				cropped.set(
					key.scenario,
					computeCroppedEdges(region, reach * ratio, {
						width: edge.width * ratio,
						height: edge.height * ratio,
					}),
				)
				host.blur()
			} finally {
				marker.replaceWith(specimen)
				lifted.remove()
			}
		}
		ARTIFACT.push(
			JSON.stringify({
				reading: 'validation ring',
				mode: VARIANT,
				rings: [...rings],
				reaches: [...reaches],
			}),
		)
		// Each ring paints past its control's box and lies inside the frame shot on it, so a frame
		// that crops a ring names the scenario and the edge here.
		expect([...reaches].filter(([, reach]) => reach <= 0)).toStrictEqual([])
		expect([...cropped].filter(([, edges]) => edges.length > 0)).toStrictEqual([])
		expect([...rings.keys()]).toStrictEqual(keys.map((key) => key.subject))
		expect([...rings.values()].filter((ratio) => typeof ratio !== 'number')).toStrictEqual([])
		// The passing and the failing ring are painted over different role triplets, so one reading
		// answering for both would be the state binding collapsed to a single color.
		expect(new Set(rings.values()).size).toBe(rings.size)
		JOURNAL.record('focus', 'Valid control', String(rings.get('Valid control')))
	})

	it('repaints and lifts a page under the pointer and under keyboard focus, in both modes', async () => {
		// The strip renders its active page and its disabled pages at rest, so the states left to
		// drive are hover and focus. Each frame is an element frame of the padded stage the specimen
		// is lifted into, and its declared region is the strip: the focus ring paints outside the
		// driven page's border box, so an element frame of that page crops the chrome the scenario
		// claims, and the lift a driven page needs is legible only beside the pages it lifts over.
		// Neither frame is a page frame, because a pointer state is never one: a page frame takes
		// the showcase's other sections out of the layout, which can move its subject out from under
		// a pointer that does not move with it. The release writes no rule for the held pointer, so
		// a frame named for it would carry the hover paint and claim otherwise.
		const framed: Array<readonly [string, boolean]> = []
		const stacked: Array<readonly [string, string]> = []
		for (const mode of [LIGHT, DARK]) {
			await applyTheme(mode)
			// Both modes are driven and read in every run; the frames are placed in the mode this run's
			// own variant names, which is the theme its filenames carry.
			const shooting = mode === VARIANT
			const specimen = readSpecimen(mounted.host, 'Page strip')
			// The strip renders thousands of pixels down the document, where a staged pane puts it past
			// what a pointer can reach and an element frame of it comes back blank — the placement
			// rulings the cascade scenarios already record. So the specimen is moved to the document's
			// start for the drive and put back after it. It is moved rather than copied: a copy would
			// give the page a second link of the same accessible name, and the pointer could then reach
			// neither.
			// It is lifted into a padded stage rather than onto the body itself, and the stage is the
			// frame: the focus ring paints outside the page's border box, so a frame of the strip alone
			// crops the ring above Page 1. The stage pads by more than the ring's quarter-rem spread on
			// every side, so the ring falls inside the frame, and it comes off the page with the
			// specimen.
			const stage = build('div', { attributes: { style: 'padding: 1rem' } })
			const marker = build('div')
			specimen.before(marker)
			stage.append(specimen)
			document.body.prepend(stage)
			try {
				const strip = requireValue(
					specimen.querySelector('.pagination'),
					'The specimen renders no strip',
				)
				const link = requireValue(
					[...specimen.querySelectorAll('.page-link')].find(
						(element) => readName(element) === 'Page 1',
					),
					'The strip renders no page named Page 1',
				)
				if (!(link instanceof HTMLElement)) throw new Error('The page link is not an element')
				const rest = readStyle(link, 'background-color')
				expect(readStyle(link, 'z-index')).toBe('auto')
				// The pointer is aimed at the staged layout rather than the fitted one, because a page
				// hovered before the pane is staged is no longer under the pointer at the shot and its
				// frame would carry the resting fill. The mode that takes no shot stages nothing,
				// because there is no capture staging for its pointer to survive.
				if (shooting) await stagePane(window.innerWidth, window.innerHeight)
				await hoverAccessible('link', 'Page 1')
				await waitForAnimations(link)
				const hovered = readStyle(link, 'background-color')
				expect(link.matches(':hover')).toBe(true)
				expect(hovered).not.toBe(rest)
				// The lift is what keeps a hovered page's border whole where it meets its neighbour's.
				expect(readStyle(link, 'z-index')).toBe('2')
				stacked.push([`hover ${mode}`, readStyle(link, 'z-index')])
				await stageMedia({ motion: false })
				expect(mounted.host.querySelector('main')?.contains(link)).toBe(false)
				if (shooting) {
					await FRAMES.place('page-strip-hover', strip, stage)
					// Staging the pane again at the viewport, with the pointer left where the shot found
					// it, puts the page back under it. Nothing above the lifted stage was taken out of
					// the layout, so the strip sits where it sat at the shot: a capture whose shot found
					// the strip elsewhere leaves this page unhovered and at its rest fill here.
					await stagePane(window.innerWidth, window.innerHeight)
				}
				framed.push([`hover ${mode}`, link.matches(':hover')])
				expect(readStyle(link, 'background-color')).toBe(hovered)
				await releasePane()
				await releasePointer()
				await releaseMedia()
				await waitForAnimations(link)
				expect(readStyle(link, 'background-color')).toBe(rest)
				// Focus is reached with the keyboard rather than set alone, so the paint read here is the
				// one a reader navigating the strip sees and the ring beside it is the cascade's own.
				link.focus()
				await pressKeys('{ArrowRight}')
				expect(link.matches(':focus')).toBe(true)
				await waitForAnimations(link)
				const focused = readStyle(link, 'background-color')
				expect(focused).not.toBe(rest)
				expect(readStyle(link, 'z-index')).toBe('3')
				stacked.push([`focus ${mode}`, readStyle(link, 'z-index')])
				expect(readStyle(link, 'outline-style')).toBe('none')
				expect(readStyle(link, 'box-shadow')).not.toBe('none')
				await stageMedia({ motion: false })
				if (shooting) await FRAMES.place('page-strip-focus', strip, stage)
				framed.push([`focus ${mode}`, link.matches(':focus')])
				expect(readStyle(link, 'background-color')).toBe(focused)
				await releaseMedia()
				ARTIFACT.push(JSON.stringify({ reading: 'page paint', mode, rest, hovered, focused }))
				JOURNAL.record('hover', 'Page 1', hovered)
				link.blur()
			} finally {
				marker.replaceWith(specimen)
				stage.remove()
			}
		}
		// Every frame was taken while its own state still held, and each state lifted the page it was
		// driven on: a frame taken after the state fell away would report here rather than pass as a
		// picture of the resting strip.
		expect(framed.filter(([, held]) => !held)).toStrictEqual([])
		expect(stacked.filter(([, position]) => position === 'auto')).toStrictEqual([])
	})

	it('lifts the checked label of the grouped alignment control over the border it shares', async () => {
		// The group lifts a hovered and a pressed child by the same step it lifts the checked one, and
		// the `tests/src/styles/components/button-group.test.ts` file drives and reads each of those
		// states, so no hover frame and no active frame is shot here: a second frame of the same lift
		// would be one image registered twice.
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Check group')
		const checked = requireValue(
			specimen.querySelector('.btn-check:checked + .btn'),
			'The "Check group" specimen renders no checked label',
		)
		const resting = requireValue(
			specimen.querySelector('.btn-check:not(:checked) + .btn'),
			'The "Check group" specimen renders no resting label',
		)
		// The checked label is the one the group lifts, and the resting label beside it is what makes
		// that reading a comparison rather than a single value.
		expect(readStyle(checked, 'z-index')).toBe('1')
		expect(readStyle(resting, 'z-index')).toBe('auto')
		const lifted = build('div')
		const copied = specimen.cloneNode(true)
		if (!(copied instanceof HTMLElement)) throw new Error('The cloned specimen is not an element')
		// A radio's name is document-wide, so a copy carrying the original's name would uncheck the
		// specimen this case is about the moment the copy enters the page. The copy's own controls
		// are renamed before it is attached, and its labels follow their inputs.
		for (const input of copied.querySelectorAll('input.btn-check')) {
			if (!(input instanceof HTMLInputElement)) continue
			const label = copied.querySelector(`label[for="${input.id}"]`)
			const renamed = `${input.id}-frame`
			input.name = `${input.name}-frame`
			input.id = renamed
			label?.setAttribute('for', renamed)
		}
		lifted.append(copied)
		document.body.prepend(lifted)
		try {
			const copy = requireValue(
				copied.querySelector('.btn-check:checked + .btn'),
				'The lifted "Check group" copy renders no checked label',
			)
			// The frame is shot on a copy of the whole specimen lifted to the document's start, for
			// the reason the cascade frames are: an element frame taken where the showcase renders
			// this specimen comes back blank.
			expect(readStyle(copy, 'z-index')).toBe(readStyle(checked, 'z-index'))
			expect(readStyle(copy, 'border-top-left-radius')).toBe(
				readStyle(checked, 'border-top-left-radius'),
			)
			await FRAMES.place('check-group-checked', copy, copied)
		} finally {
			lifted.remove()
		}
		expect(readStyle(checked, 'z-index')).toBe('1')
		ARTIFACT.push(
			JSON.stringify({
				reading: 'grouped alignment',
				variant: VARIANT,
				lifted: readStyle(checked, 'z-index'),
				resting: readStyle(resting, 'z-index'),
			}),
		)
		JOURNAL.record('read', 'Check group', readStyle(checked, 'z-index'))
	})

	// The ring is a second case rather than a second half of the one before it, because each frame
	// this journey places costs its own capture and the two together sat inside one budget sized for
	// a single drive.
	it('rings the checked label of the grouped alignment control when Tab reaches it', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Check group')
		const checked = requireValue(
			specimen.querySelector('.btn-check:checked + .btn'),
			'The "Check group" specimen renders no checked label',
		)
		// The focus frame is an element frame of the specimen lifted into a padded wrapper at the
		// document's start, the placement the Primary focus frame uses and for its reasons: the ring
		// paints outside the label's border box, and the wrapper's padding holds it. The specimen goes
		// back to its place afterwards. Tab from the wrapper enters the group at its checked radio,
		// which is what earns `:focus-visible`, so the ring the frame claims is the one a reader sees.
		const marker = document.createComment('check-group-focus')
		specimen.before(marker)
		const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		lifted.append(specimen)
		document.body.prepend(lifted)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = lifted
		const entered: string[] = []
		const watch = new AbortController()
		let ring: number | undefined
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			// A dark run switches the mode with a pointer press and leaves the pointer where the control
			// sat, and the staging a shot takes moves the tester under it: that is what put the hover
			// face on the Row copy button in this scenario's page frame. The pointer is released onto
			// the wrapper's padding first, and every element of the specimen the pointer enters while
			// the frame is shot is recorded.
			// FF-POINTER-PROBE deleted release
			document.addEventListener(
				'mouseover',
				(event) => {
					if (event.target instanceof Element && specimen.contains(event.target)) {
						entered.push(String(event.target.textContent).trim().slice(0, 40))
					}
				},
				{ capture: true, signal: watch.signal },
			)
			lifted.focus()
			const reached = await traverseAccessible('Align center')
			expect(reached).toBe(requireValue(checked.previousElementSibling, 'No grouped input'))
			expect(reached.matches(':focus-visible')).toBe(true)
			await waitForAnimations(checked)
			// The focus sits on the hidden input and the chrome is worn by the label beside it, which
			// is the pair the ring reader's second argument exists for: a reading taken on the label
			// alone reports nothing, because the label never matches `:focus-visible`.
			ring = readRing(reached, checked)
			reach = computeRingReach((property) => readStyle(checked, property))
			expect(readStyle(checked, 'z-index')).toBe('1')
			await FRAMES.place('check-group-focus', checked, shot)
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'check-group-focus'),
				'The grouped alignment focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, reach * ratio, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			reached.blur()
		} finally {
			watch.abort()
			marker.replaceWith(specimen)
			lifted.remove()
		}
		// The ring painted, it lies inside the frame, and the pointer entered nothing the frame shows.
		expect(ring).not.toBeUndefined()
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		expect(entered).toStrictEqual([])
		ARTIFACT.push(
			JSON.stringify({ reading: 'grouped alignment ring', variant: VARIANT, ring, reach }),
		)
		JOURNAL.record('read', 'Check group', String(ring))
	})

	it('reaches the range slider through the keyboard and leaves its ring to the thumb', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Range')
		const control = requireValue(
			specimen.querySelector<HTMLElement>('.form-range'),
			'The "Range" specimen renders no .form-range',
		)
		const disabled = requireValue(
			readSpecimen(mounted.host, 'Range disabled').querySelector('.form-range'),
			'The "Range disabled" specimen renders no .form-range',
		)
		// The focus frame is an element frame of the specimen lifted into a padded wrapper at the
		// document's start, the placement the Primary focus frame uses, and the specimen goes back to
		// its place afterwards. Tab from the wrapper reaches the control, which is what earns
		// `:focus-visible`, and the class is what takes the user agent's own ring off the control.
		const marker = document.createComment('range-focus')
		specimen.before(marker)
		const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		lifted.append(specimen)
		document.body.prepend(lifted)
		// The focus frame is shot on the element held here, and its size bounds the region's far
		// edges.
		const shot: HTMLElement = lifted
		let visible = false
		let cropped: readonly FrameEdge[] = []
		try {
			// FF-POINTER-PROBE deleted release
			lifted.focus()
			expect(await traverseAccessible(readName(control))).toBe(control)
			await FRAMES.place('range-focus', specimen, shot)
			visible = control.matches(':focus-visible')
			// The ring a reader sees is painted on the thumb, whose computed style Chromium withholds,
			// so neither `readRing` nor a reach reading reports it: both read the control's own box,
			// which paints no ring. The declared region is the whole specimen, read inside the frame
			// here, and the frame itself is the evidence of the ring.
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'range-focus'),
				'The range focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, 0, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			expect(readStyle(control, 'outline-style')).toBe('none')
			expect(readRing(control)).toBeUndefined()
			expect(computeRingReach((property) => readStyle(control, property))).toBe(0)
			control.blur()
		} finally {
			marker.replaceWith(specimen)
			lifted.remove()
		}
		expect(visible).toBe(true)
		expect(cropped).toStrictEqual([])
		// The disabled slider states that in the tree and stays out of the tab order, which is
		// what lets its own frame be shot at rest with no drive at all.
		expect(readStates(disabled)).toStrictEqual(['disabled'])
		ARTIFACT.push(
			JSON.stringify({
				reading: 'range focus',
				mode: VARIANT,
				name: readName(control),
				outline: readStyle(control, 'outline-style'),
				ring: readRing(control) ?? 'worn by the thumb',
			}),
		)
		JOURNAL.record('focus', readName(control), readStyle(control, 'outline-style'))
	})

	it('floats the empty field label under keyboard focus and photographs the floated field', async () => {
		await applyTheme(VARIANT)
		// A dark run switches the mode with a pointer press and leaves the pointer where the control
		// sat, so the pointer is released onto the padding of each wrapper a field is lifted into.
		// FF-POINTER-PROBE deleted release
		// The filled, textarea, select, disabled, and plaintext specimens render their label floated
		// at rest, so the one state left to drive is focus on the empty field: its label floats and
		// its text moves down only while it holds focus. The rows are the driven rows whose subject
		// the floating table declares.
		const declared = new Set(FORM_FLOATING_SPECIMENS.map((specimen) => specimen.name))
		const keys = DRIVEN_KEYS.filter((key) => declared.has(key.subject))
		expect(keys).not.toStrictEqual([])
		const reaches = new Map<string, number>()
		const cropped = new Map<string, readonly FrameEdge[]>()
		for (const key of keys) {
			const specimen = readSpecimen(mounted.host, key.subject)
			const control = requireValue(
				specimen.querySelector('.form-floating > .form-control'),
				`The "${key.subject}" specimen renders no floating control`,
			)
			const label = requireValue(
				specimen.querySelector('.form-floating > label'),
				`The "${key.subject}" specimen renders no floating label`,
			)
			const resting = readStyle(label, 'transform')
			expect(resting).toBe('none')
			expect(control.matches(':placeholder-shown')).toBe(true)
			// Each focus frame is an element frame of the specimen lifted into a padded wrapper at the
			// document's start, the placement the Primary focus frame uses and for its reasons: the
			// focused field's ring paints outside its border box, and the wrapper's padding holds it.
			// Tab from the wrapper reaches the field, which is what earns `:focus-visible`.
			const marker = document.createComment(key.scenario)
			specimen.before(marker)
			const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
			lifted.append(specimen)
			document.body.prepend(lifted)
			// The focus frame is shot on the element held here, and its size bounds the ring's far
			// edges.
			const shot: HTMLElement = lifted
			try {
				lifted.focus()
				const reached = await traverseAccessible(readName(control))
				expect(reached).toBe(control)
				expect(control.matches(':focus-visible')).toBe(true)
				// The label transitions its transform and the field its ring, so the shot waits for both
				// to settle rather than photographing either part of the way.
				await waitForAnimations(label)
				await waitForAnimations(control)
				const floated = readStyle(label, 'transform')
				expect(floated).not.toBe(resting)
				const reach = computeRingReach((property) => readStyle(control, property))
				reaches.set(key.scenario, reach)
				await FRAMES.place(key.scenario, control, shot)
				// The state is read again after the shot, so a frame the capture took after focus left
				// the field would report the resting label here.
				expect(document.activeElement).toBe(control)
				expect(readStyle(label, 'transform')).toBe(floated)
				expect(readStyle(control, 'padding-top')).not.toBe(readStyle(control, 'padding-bottom'))
				const ratio = window.devicePixelRatio
				const edge = shot.getBoundingClientRect()
				const { region } = requireValue(
					FRAMES.placements.find((placement) => placement.scenario === key.scenario),
					`The ${key.scenario} frame recorded no placement`,
				)
				cropped.set(
					key.scenario,
					computeCroppedEdges(region, reach * ratio, {
						width: edge.width * ratio,
						height: edge.height * ratio,
					}),
				)
				ARTIFACT.push(
					JSON.stringify({
						reading: 'floating focus',
						mode: VARIANT,
						name: readName(control),
						resting,
						floated,
						reach,
					}),
				)
				JOURNAL.record('focus', readName(control), floated)
				reached.blur()
				await waitForAnimations(label)
				expect(readStyle(label, 'transform')).toBe(resting)
			} finally {
				marker.replaceWith(specimen)
				lifted.remove()
			}
		}
		// Each field's ring paints past its box and lies inside the frame shot on it, so a frame that
		// crops a ring names the scenario and the edge here.
		expect([...reaches.keys()]).toStrictEqual(keys.map((key) => key.scenario))
		expect([...reaches].filter(([, reach]) => reach <= 0)).toStrictEqual([])
		expect([...cropped].filter(([, edges]) => edges.length > 0)).toStrictEqual([])
	})

	it('reaches the plain select through the keyboard and rings it with the focus binding the button carries', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Form select base')
		const control = requireValue(
			specimen.querySelector<HTMLElement>('.form-select'),
			'The "Form select base" specimen renders no .form-select',
		)
		const disabled = requireValue(
			readSpecimen(mounted.host, 'Form select disabled').querySelector('.form-select'),
			'The "Form select disabled" specimen renders no .form-select',
		)
		// The focus frame is an element frame of the specimen lifted into a padded wrapper at the
		// document's start, the placement the Primary focus frame uses and for its reasons: the ring
		// paints outside the select's border box, and the wrapper's padding holds it. Tab from the
		// wrapper reaches the select, which is what earns `:focus-visible`, the state the ring reader
		// measures.
		const marker = document.createComment('form-select-base-focus')
		specimen.before(marker)
		const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		lifted.append(specimen)
		document.body.prepend(lifted)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = lifted
		let ring: number | undefined
		let reach = 0
		let held = false
		let cropped: readonly FrameEdge[] = []
		try {
			// FF-POINTER-PROBE deleted release
			lifted.focus()
			expect(await traverseAccessible(readName(control))).toBe(control)
			expect(control.matches(':focus-visible')).toBe(true)
			// The border tint and the ring carry a transition, so the reading and the frame follow it.
			await waitForAnimations(control)
			ring = readRing(control)
			reach = computeRingReach((property) => readStyle(control, property))
			await FRAMES.place('form-select-base-focus', control, shot)
			// The frame is held to the state it was shot in: a shot that moved focus off the select
			// would be written under a name claiming the ring.
			held = document.activeElement === control
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'form-select-base-focus'),
				'The select focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, reach * ratio, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			control.blur()
		} finally {
			marker.replaceWith(specimen)
			lifted.remove()
		}
		expect(held).toBe(true)
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		// The select paints the shared focus token the Button variants paint, so its ratio is the one
		// the calibration pins for this mode.
		expect(ring).toBeTypeOf('number')
		expect(ring ?? 0).toBeCloseTo(VARIANT === LIGHT ? FOCUS_RING.light : FOCUS_RING.dark, 3)
		// The disabled select states that in the tree, which is what lets its own frame be shot at
		// rest with no drive at all.
		expect(readStates(disabled)).toStrictEqual(['disabled'])
		ARTIFACT.push(
			JSON.stringify({
				reading: 'select focus',
				mode: VARIANT,
				name: readName(control),
				outline: readStyle(control, 'outline-style'),
				ring,
				reach,
			}),
		)
		JOURNAL.record('focus', readName(control), String(ring))
	})

	it('reaches the text control through the keyboard and paints the calibrated focus ring on it', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Form control text')
		const control = requireValue(
			specimen.querySelector<HTMLElement>('.form-control'),
			'The "Form control text" specimen renders no .form-control',
		)
		// The focus frame is an element frame of the specimen lifted into a padded wrapper at the
		// document's start, the placement the Primary focus frame uses and for its reasons: the ring
		// paints outside the control's border box, and the wrapper's padding holds it. Tab from the
		// wrapper reaches the control, which is what earns `:focus-visible`.
		const marker = document.createComment('form-control-text-focus')
		specimen.before(marker)
		const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		lifted.append(specimen)
		document.body.prepend(lifted)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = lifted
		let ring: number | undefined
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			// FF-POINTER-PROBE deleted release
			lifted.focus()
			expect(await traverseAccessible(readName(control))).toBe(control)
			expect(control.matches(':focus-visible')).toBe(true)
			await waitForAnimations(control)
			reach = computeRingReach((property) => readStyle(control, property))
			await FRAMES.place('form-control-text-focus', control, shot)
			// The control paints the shared focus token over the page surface, so its ratio is the one
			// the Button sweep pins for this mode rather than a reading of its own.
			ring = readRing(control)
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'form-control-text-focus'),
				'The text control focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, reach * ratio, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			control.blur()
		} finally {
			marker.replaceWith(specimen)
			lifted.remove()
		}
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		expect(ring ?? 0).toBeCloseTo(
			VARIANT.startsWith('dark-') ? FOCUS_RING.dark : FOCUS_RING.light,
			3,
		)
		expect(readStyle(control, 'outline-style')).toBe('none')
		ARTIFACT.push(
			JSON.stringify({
				reading: 'form control focus',
				mode: VARIANT,
				name: readName(control),
				ring,
				reach,
			}),
		)
		JOURNAL.record('focus', readName(control), String(ring))
	})

	it('drives one list-group action to hover, focus, and press, and photographs each state', async () => {
		await applyTheme(VARIANT)
		await waitForAnimations(document.body)
		const specimen = readSpecimen(mounted.host, 'List group actions')
		const host = requireValue(
			specimen.querySelector<HTMLElement>('a.list-group-item-action:not(.active)'),
			'The "List group actions" specimen renders no resting anchor',
		)
		const selected = requireValue(
			specimen.querySelector('.list-group-item-action.active'),
			'The "List group actions" specimen renders no selected row',
		)
		const untouched = requireValue(
			specimen.querySelector<HTMLElement>('button.list-group-item-action'),
			'The "List group actions" specimen renders no button host',
		)
		const rest = readStyle(host, 'background-color')
		const held = readStyle(selected, 'background-color')
		const driven = new Map<string, string>()
		// The specimen itself is moved to the document's start for the run of this case and put
		// back afterwards, rather than copied there. An element frame of a specimen this far down
		// the document comes back blank at the 390-wide variants — the reading the cascade
		// scenarios lift their copies to avoid — and a page frame is no answer for a pointer state,
		// because the capture scrolls the document under a pointer that does not move with it and
		// the row photographs unhovered. A copy would answer to the same accessible name as the
		// original, and the pointer verbs resolve a control by that name, so the one element is
		// moved instead and every reading is the rendered specimen's own.
		// The wrapper carries the `p-3` class and takes focus without joining the tab order: the hover
		// and press frames are shot on the specimen, where those paints lie inside the row's box, and
		// the focus frame on the wrapper, whose padding holds the outline the browser paints outside
		// the focused row's box.
		const parent = requireValue(specimen.parentElement, 'The specimen is not mounted')
		const following = specimen.nextSibling
		const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		document.body.prepend(lifted)
		lifted.append(specimen)
		// The focus frame is shot on the element held here, and its size bounds the outline's far
		// edges.
		const shot: HTMLElement = lifted
		let visible = false
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			// Each reading is taken in the staged layout the shot itself uses, before the placement.
			// The pane is staged before the pointer is placed for the reason the Button journey
			// states: a host hovered before the staging is no longer under the pointer at the shot.
			await stagePane(window.innerWidth, window.innerHeight)
			await hoverAccessible('link', 'Dispatch lane')
			await waitForAnimations(host)
			expect(host.matches(':hover')).toBe(true)
			driven.set('hover', readStyle(host, 'background-color'))
			expect(mounted.host.querySelector('main')?.contains(host)).toBe(false)
			await FRAMES.place('list-group-actions-hover', host, specimen)
			await stagePane(window.innerWidth, window.innerHeight)
			expect(host.matches(':hover')).toBe(true)
			expect(readStyle(host, 'background-color')).toBe(driven.get('hover'))
			await releasePane()
			await page.elementLocator(host).unhover()
			expect(host.matches(':hover')).toBe(false)
			// Focus paints through the same pair of slots the hover rule reads, and it is driven with
			// no pointer over the specimen: the pointer is released onto the wrapper's padding, and Tab
			// from the wrapper reaches the row. A script focus is not enough here. After the pointer
			// press a dark run switches the mode with, the browser matches `:focus-visible` on a
			// scripted focus and still paints no `auto` outline, for the release's stylesheet and for
			// this one alike, and Tab traversal is what brings the outline back.
			await releasePointer()
			lifted.focus()
			expect(await traverseAccessible('Dispatch lane')).toBe(host)
			await waitForAnimations(host)
			expect(host.matches(':focus')).toBe(true)
			driven.set('focus', readStyle(host, 'background-color'))
			reach = computeRingReach((property) => readStyle(host, property))
			await FRAMES.place('list-group-actions-focus', host, shot)
			visible = host.matches(':focus-visible')
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'list-group-actions-focus'),
				'The list-group focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, reach * ratio, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			host.blur()
			// A held pointer captures the press, so the pressed state survives the staging a hover
			// does not, and the reading after the shot answers for the frame.
			await holdAccessible('link', 'Dispatch lane')
			await waitForAnimations(host)
			expect(host.matches(':active')).toBe(true)
			driven.set('active', readStyle(host, 'background-color'))
			expect(mounted.host.querySelector('main')?.contains(host)).toBe(false)
			await FRAMES.place('list-group-actions-active', host, specimen)
			expect(host.matches(':active')).toBe(true)
			// FF-POINTER-PROBE deleted release
			await page.elementLocator(host).unhover()
			await waitForAnimations(host)
			expect(host.matches(':active')).toBe(false)
			expect(host.matches(':hover')).toBe(false)
		} finally {
			parent.insertBefore(specimen, following)
			lifted.remove()
		}
		// Every driven state leaves the resting fill, the press leaves the hover fill, and the two
		// rows nothing was driven on are untouched throughout: the selected row is the
		// `:not(.active)` guard all three rules carry, and the button host is the resting fill read
		// off a row no pointer and no focus ever reached.
		expect([...driven.values()].filter((value) => value === rest)).toStrictEqual([])
		expect(driven.get('active')).not.toBe(driven.get('hover'))
		expect(driven.get('focus')).toBe(driven.get('hover'))
		// The focus frame was shot under keyboard focus, the row wears the browser's outline past its
		// box, and every edge of that outline lies inside the frame.
		expect(visible).toBe(true)
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		expect(readStyle(selected, 'background-color')).toBe(held)
		expect(readStyle(untouched, 'background-color')).toBe(rest)
		expect(specimen.parentElement).toBe(parent)
		ARTIFACT.push(
			JSON.stringify({
				reading: 'list-group action paint',
				rest,
				held,
				driven: [...driven],
				reach,
			}),
		)
		JOURNAL.record('hold', 'Dispatch lane', String(driven.get('active')))
	})

	it('drives one menu item to hover and to focus and photographs each state', async () => {
		await applyTheme(VARIANT)
		await waitForAnimations(document.body)
		const specimen = readSpecimen(mounted.host, 'Dropdown menu')
		const item = requireValue(
			specimen.querySelector<HTMLElement>('a.dropdown-item:not(.active):not(.disabled)'),
			'The "Dropdown menu" specimen renders no resting item',
		)
		const selected = requireValue(
			specimen.querySelector('.dropdown-item.active'),
			'The "Dropdown menu" specimen renders no selected item',
		)
		const rest = readStyle(item, 'background-color')
		const held = readStyle(selected, 'background-color')
		const driven = new Map<string, string>()
		// The specimen itself is moved to the document's start and put back afterwards, the placement
		// the list-group action case uses and for its reasons: the menu sits at the foot of the
		// document, a pointer placed there does not survive the staging a shot takes, and a copy
		// would answer to the item's accessible name beside the original.
		const parent = requireValue(specimen.parentElement, 'The specimen is not mounted')
		const following = specimen.nextSibling
		const lifted = build('div')
		document.body.prepend(lifted)
		lifted.append(specimen)
		try {
			await stagePane(window.innerWidth, window.innerHeight)
			await hoverAccessible('link', 'Track shipment')
			await waitForAnimations(item)
			expect(item.matches(':hover')).toBe(true)
			driven.set('hover', readStyle(item, 'background-color'))
			expect(mounted.host.querySelector('main')?.contains(item)).toBe(false)
			await FRAMES.place('dropdown-menu-hover', item, specimen)
			await stagePane(window.innerWidth, window.innerHeight)
			expect(item.matches(':hover')).toBe(true)
			expect(readStyle(item, 'background-color')).toBe(driven.get('hover'))
			await releasePane()
			await page.elementLocator(item).unhover()
			expect(item.matches(':hover')).toBe(false)
			// Focus paints through the same pair of slots the hover rule reads, and it is driven with
			// no pointer at all, so this frame shows the keyboard path to that paint.
			item.focus()
			await waitForAnimations(item)
			expect(item.matches(':focus')).toBe(true)
			driven.set('focus', readStyle(item, 'background-color'))
			await FRAMES.place('dropdown-menu-focus', item, specimen)
			expect(item.matches(':focus')).toBe(true)
			item.blur()
		} finally {
			parent.insertBefore(specimen, following)
			lifted.remove()
		}
		// Both driven states leave the resting fill and paint the same one, and the selected item
		// nothing was driven on keeps its own fill throughout.
		expect([...driven.values()].filter((value) => value === rest)).toStrictEqual([])
		expect(driven.get('focus')).toBe(driven.get('hover'))
		expect(readStyle(selected, 'background-color')).toBe(held)
		expect(readStyle(item, 'background-color')).toBe(rest)
		expect(specimen.parentElement).toBe(parent)
		ARTIFACT.push(
			JSON.stringify({ reading: 'dropdown item paint', rest, held, driven: [...driven] }),
		)
		JOURNAL.record('hover', 'Track shipment', String(driven.get('hover')))
	})

	it('matches the official recording step for step on the same markup', async () => {
		// The recording excludes no step, so every step it carries is compared. A recording that
		// gains an exclusion reddens here, and the unit that regenerated it rules on the exclusion
		// rather than the journey passing over a step nothing measured.
		expect(ORACLE_EXCLUDED).toStrictEqual([])
		const driven = await driveOracle(mounted.section, '')
		const comparison = buildOracleComparison(driven, '')
		expect(comparison.carried).toStrictEqual(comparison.expected)
		expect([...driven.keys()]).toStrictEqual(comparison.expected)
		expect(comparison.compared).toStrictEqual(ORACLE_ACTIONS.map((step) => `button.${step.action}`))
		expect(comparison.driven).toStrictEqual(comparison.recorded)
		ARTIFACT.push(JSON.stringify({ reading: 'oracle', compared: comparison.compared }))
	})

	it('matches the official recording step for step under reduced motion', async () => {
		expect(ORACLE_EXCLUDED).toStrictEqual([])
		await stageMedia({ motion: false })
		const driven = await driveOracle(mounted.section, 'reduced.')
		const comparison = buildOracleComparison(driven, 'reduced.')
		expect(comparison.carried).toStrictEqual(comparison.expected)
		expect([...driven.keys()]).toStrictEqual(comparison.expected)
		expect(comparison.compared).toStrictEqual(
			ORACLE_ACTIONS.map((step) => `button.reduced.${step.action}`),
		)
		expect(comparison.driven).toStrictEqual(comparison.recorded)
		ARTIFACT.push(JSON.stringify({ reading: 'oracle', compared: comparison.compared }))
	})

	it('drives the close control to hover and to focus and photographs each state', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Close control')
		const control = requireValue(
			specimen.querySelector<HTMLButtonElement>('.btn-close'),
			'The "Close control" specimen renders no close control',
		)
		const name = readName(control)
		const rest = readStyle(control, 'opacity')
		// The hover frame is shot on the whole specimen lifted to the document's start, the
		// placement the resting cascade scenarios use, because the section renders near the foot of
		// a document over 8000 pixels tall and a pointer placed there does not survive the staging
		// a shot takes. The specimen itself is lifted rather than a copy, because the pointer finds
		// the control by its accessible name and a copy would answer to the same one; the marker
		// holds its place in the section, and the specimen goes back there before focus is driven.
		// The pane is staged before the pointer is placed, the Button hover ordering, so the shot
		// finds the control under the pointer.
		const marker = document.createComment('Close control')
		specimen.before(marker)
		const lifted = build('div')
		lifted.append(specimen)
		document.body.prepend(lifted)
		let hovered: string
		let framedHover: boolean
		let framedHovered: string
		let shotDuration: string
		try {
			await stagePane(window.innerWidth, window.innerHeight)
			await hoverAccessible('button', name)
			expect(control.matches(':hover')).toBe(true)
			await waitForAnimations(control)
			hovered = readStyle(control, 'opacity')
			// The staging a shot takes re-triggers the opacity transition, so reduced motion is
			// staged around the shot and the frame cannot land inside it, the way the Button hover
			// frame is taken.
			await stageMedia({ motion: false })
			shotDuration = readStyle(control, 'transition-duration')
			expect(mounted.host.querySelector('main')?.contains(control)).toBe(false)
			await FRAMES.place('close-control-hover', control, specimen)
			// Both readings that decide the frame are taken here. The capture stages the pane,
			// shoots, and hands the pane back, and the hand-back moves the document out from under a
			// pointer that does not move with it, so a reading taken in the handed-back layout
			// reports the state that followed the frame. Staging the pane again at the viewport puts
			// the control back under the pointer: nothing above the lifted specimen was taken out of
			// the layout, so the control sits where it sat at the shot, and a shot that found the
			// control elsewhere leaves it unhovered and at rest here.
			await stagePane(window.innerWidth, window.innerHeight)
			framedHover = control.matches(':hover')
			framedHovered = readStyle(control, 'opacity')
			await releasePane()
			await releaseMedia()
			await releasePointer()
		} finally {
			marker.replaceWith(specimen)
			lifted.remove()
		}
		expect(shotDuration).toBe('0s')
		expect(framedHover).toBe(true)
		expect(framedHovered).toBe(hovered)
		// The focus frame is an element frame of the specimen lifted again, into a padded wrapper at the
		// document's start, the placement the Primary focus frame uses and for its reasons: the
		// recorded focus treatment paints its shadow outside the control's border box, and the
		// wrapper's padding holds it. The pointer released after the hover frame rests on that
		// padding, and Tab from the wrapper reaches the control.
		const anchor = document.createComment('close-control-focus')
		specimen.before(anchor)
		const padded = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		padded.append(specimen)
		document.body.prepend(padded)
		// The focus frame is shot on the element held here, and its size bounds the shadow's far
		// edges.
		const shot: HTMLElement = padded
		let focused = ''
		let framedFocus = false
		let framedFocused = ''
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			padded.focus()
			expect(await traverseAccessible(name)).toBe(control)
			expect(control.matches(':focus')).toBe(true)
			await waitForAnimations(control)
			focused = readStyle(control, 'opacity')
			reach = computeRingReach((property) => readStyle(control, property))
			await FRAMES.place('close-control-focus', control, shot)
			await stagePane(window.innerWidth, window.innerHeight)
			framedFocus = control.matches(':focus')
			framedFocused = readStyle(control, 'opacity')
			await releasePane()
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'close-control-focus'),
				'The close focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, reach * ratio, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			control.blur()
			await waitForAnimations(control)
		} finally {
			anchor.replaceWith(specimen)
			padded.remove()
		}
		// The focus frame is held to the state it was shot in rather than to the state that
		// preceded it, so a shot that found the control unfocused reddens here instead of being
		// written under a name claiming otherwise; and its shadow lies inside the frame.
		expect(framedFocus).toBe(true)
		expect(framedFocused).toBe(focused)
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		const rested = readStyle(control, 'opacity')
		// Each state reads its own recorded variable, so a state that stopped reading its own one
		// resolves to the resting opacity and reddens here rather than photographing it silently.
		// The reading after the blur is what separates a driven walk from a control left in its
		// last state.
		expect([rest, hovered, focused, rested]).toStrictEqual(['0.5', '0.75', '1', '0.5'])
		ARTIFACT.push(
			JSON.stringify({
				reading: 'close states',
				rest,
				hovered,
				focused,
				rested,
				framedHover,
				framedHovered,
				framedFocus,
				framedFocused,
				reach,
			}),
		)
	})

	it('drives a carousel control to hover and to focus and photographs each state', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Captioned carousel')
		const control = requireValue(
			specimen.querySelector<HTMLButtonElement>('.carousel-control-prev'),
			'The "Captioned carousel" specimen renders no previous control',
		)
		const name = readName(control)
		// The control carries an opacity transition, so each reading follows the animation rather than
		// the moment the state flips.
		const rest = readStyle(control, 'opacity')
		// Both frames are shot on the whole specimen lifted to the document's start, the placement the
		// close control's hover frame uses, because the section renders near the foot of a document
		// several thousand pixels tall. The specimen itself is lifted rather than a copy, because the
		// pointer finds the control by its accessible name and a copy would answer to the same one; the
		// marker holds its place in the section, and the specimen goes back there after both frames.
		// Hover and focus paint the same opacity, so the pointer leaves the control before focus is
		// driven and the focus frame is read with the control unhovered.
		const marker = document.createComment('Captioned carousel')
		specimen.before(marker)
		const lifted = build('div')
		lifted.append(specimen)
		document.body.prepend(lifted)
		let hovered: string
		let framedHover: boolean
		let framedHovered: string
		let focused: string
		let framedFocus: boolean
		let framedFocusHover: boolean
		let framedFocused: string
		let shotDuration: string
		try {
			await stagePane(window.innerWidth, window.innerHeight)
			await hoverAccessible('button', name)
			expect(control.matches(':hover')).toBe(true)
			await waitForAnimations(control)
			hovered = readStyle(control, 'opacity')
			// The staging a shot takes re-triggers the opacity transition, so reduced motion is staged
			// around both shots and neither frame can land inside it.
			await stageMedia({ motion: false })
			shotDuration = readStyle(control, 'transition-duration')
			expect(mounted.host.querySelector('main')?.contains(control)).toBe(false)
			await FRAMES.place('captioned-carousel-hover', control, specimen)
			// The reading that decides the frame is taken with the pane staged again, the way the
			// close control's hover frame is read back: nothing above the lifted specimen was taken
			// out of the layout, so the control sits where it sat at the shot.
			await stagePane(window.innerWidth, window.innerHeight)
			framedHover = control.matches(':hover')
			framedHovered = readStyle(control, 'opacity')
			await releasePane()
			await releasePointer()
			await page.elementLocator(control).unhover()
			expect(control.matches(':hover')).toBe(false)
			control.focus()
			expect(control.matches(':focus')).toBe(true)
			focused = readStyle(control, 'opacity')
			await FRAMES.place('captioned-carousel-focus', control, specimen)
			await stagePane(window.innerWidth, window.innerHeight)
			framedFocus = control.matches(':focus')
			framedFocusHover = control.matches(':hover')
			framedFocused = readStyle(control, 'opacity')
			await releasePane()
			await releaseMedia()
			control.blur()
		} finally {
			marker.replaceWith(specimen)
			lifted.remove()
		}
		await waitForAnimations(control)
		const rested = readStyle(control, 'opacity')
		expect(shotDuration).toBe('0s')
		// Each frame is held to the state it was shot in rather than to the state that preceded it,
		// so a shot that found the control at rest reddens here instead of being written under a name
		// claiming otherwise. The focus frame carries no pointer, so its opacity is the focus rule's.
		expect([framedHover, framedFocus, framedFocusHover]).toStrictEqual([true, true, false])
		expect(framedHovered).toBe(hovered)
		expect(framedFocused).toBe(focused)
		expect([rest, hovered, focused, rested]).toStrictEqual(['0.5', '0.9', '0.9', '0.5'])
		ARTIFACT.push(
			JSON.stringify({
				reading: 'carousel control states',
				rest,
				hovered,
				focused,
				rested,
				framedHover,
				framedHovered,
				framedFocus,
				framedFocused,
			}),
		)
	})

	it('reaches the resting checkbox through the keyboard and photographs its ring', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Form check box')
		const box = requireValue(
			specimen.querySelector<HTMLElement>('.form-check-input'),
			'The "Form check box" specimen renders no box',
		)
		const row = requireValue(
			box.closest('.form-check'),
			'The "Form check box" specimen sits in no row',
		)
		// The focus frame is an element frame of the specimen lifted into a padded wrapper at the
		// document's start, the placement the Primary focus frame uses and for its reasons: the ring
		// paints outside the box, and the wrapper's padding holds it. Tab from the wrapper reaches the
		// box, which is what earns `:focus-visible`, so the ring the frame claims is the one a reader
		// sees. The declared region is the specimen's row, and both the row and the ring around the
		// box are read inside the frame.
		const marker = document.createComment('form-check-box-focus')
		specimen.before(marker)
		const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		lifted.append(specimen)
		document.body.prepend(lifted)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = lifted
		let ring: number | undefined
		let framedFocus = false
		let framedRing: number | undefined
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			// FF-POINTER-PROBE deleted release
			lifted.focus()
			expect(await traverseAccessible(readName(box))).toBe(box)
			expect(box.matches(':focus-visible')).toBe(true)
			// The ring carries a transition, so the reading and the frame follow it.
			await waitForAnimations(box)
			// The ring paints the shared focus token, so its ratio is the one the Button sweeps pin for
			// the mode this run renders.
			ring = readRing(box)
			reach = computeRingReach((property) => readStyle(box, property))
			await FRAMES.place('form-check-box-focus', row, shot)
			// The focus is read again with the pane staged after the shot, so a shot that found the
			// box unfocused reddens here instead of being written under a name claiming otherwise.
			await stagePane(window.innerWidth, window.innerHeight)
			framedFocus = box.matches(':focus-visible')
			framedRing = readRing(box)
			await releasePane()
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const frame = { width: edge.width * ratio, height: edge.height * ratio }
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'form-check-box-focus'),
				'The checkbox focus frame recorded no placement',
			)
			cropped = [
				...computeCroppedEdges(readRegion(box, shot), reach * ratio, frame),
				...computeCroppedEdges(region, 0, frame),
			]
			box.blur()
		} finally {
			marker.replaceWith(specimen)
			lifted.remove()
		}
		expect(ring ?? 0).toBeCloseTo(VARIANT === LIGHT ? FOCUS_RING.light : FOCUS_RING.dark, 3)
		expect(framedFocus).toBe(true)
		expect(framedRing).toBe(ring)
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		// Reaching the box by keyboard focuses it and chooses nothing.
		const states = readStates(box)
		expect(states).toStrictEqual([])
		ARTIFACT.push(
			JSON.stringify({
				reading: 'check focus',
				variant: VARIANT,
				ring,
				framedFocus,
				states,
				reach,
			}),
		)
		JOURNAL.record('focus', readName(box), String(ring))
	})

	it('marks a copy of the resting checkbox mixed and photographs the mixed glyph', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Form check box')
		const original = requireValue(
			specimen.querySelector('.form-check-input'),
			'The "Form check box" specimen renders no box',
		)
		if (!(original instanceof HTMLInputElement)) throw new Error('The resting box is not an input')
		const glyphs = new Map(
			FORM_CHECK_ICON_CASES.map(({ name, image }) => [name, `url("${image}")`] as const),
		)
		const mixed = requireValue(glyphs.get('indeterminate checkbox'), 'No mixed glyph case')
		const lifted = build('div')
		const copied = specimen.cloneNode(true)
		if (!(copied instanceof HTMLElement)) throw new Error('The cloned specimen is not an element')
		// A label names the first control carrying its target id, so the copy's controls are
		// renamed before the copy enters the page, and its labels follow them: a copy carrying the
		// original's ids would take the showcase box's label while it sits at the document's start.
		for (const input of copied.querySelectorAll('input')) {
			const label = copied.querySelector(`label[for="${input.id}"]`)
			const renamed = `${input.id}-frame`
			input.id = renamed
			label?.setAttribute('for', renamed)
		}
		lifted.append(copied)
		document.body.prepend(lifted)
		let framedMixed: boolean
		let framedImage: string
		let image: string
		try {
			const copy = requireValue(
				copied.querySelector('.form-check-input'),
				'The lifted "Form check box" copy renders no box',
			)
			if (!(copy instanceof HTMLInputElement)) throw new Error('The copied box is not an input')
			// The mixed state is a property with no attribute, so the copy arrives without it and the
			// journey sets it. The frame is an element frame of the lifted copy, the placement the
			// resting scenarios use, because an element frame taken where the showcase renders this
			// specimen comes back blank.
			expect(copy.indeterminate).toBe(false)
			copy.indeterminate = true
			expect(copy.matches(':indeterminate')).toBe(true)
			image = readStyle(copy, 'background-image')
			await FRAMES.place('form-check-box-indeterminate', copy, copied)
			framedMixed = copy.matches(':indeterminate')
			framedImage = readStyle(copy, 'background-image')
		} finally {
			lifted.remove()
		}
		expect(image).toBe(mixed)
		expect(framedMixed).toBe(true)
		expect(framedImage).toBe(mixed)
		// The drive reached the copy alone: the showcase's own box stays at rest.
		expect(original.indeterminate).toBe(false)
		expect(readStyle(original, 'background-image')).toBe('none')
		ARTIFACT.push(
			JSON.stringify({ reading: 'check mixed', variant: VARIANT, image, framedMixed, framedImage }),
		)
		JOURNAL.record('read', 'Form check box', framedImage)
	})

	it('reaches the input group control beside a button through the keyboard and lifts it over the button', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Input group button')
		const control = requireValue(
			specimen.querySelector<HTMLElement>('.input-group > .form-control'),
			'The "Input group button" specimen renders no grouped control',
		)
		const button = requireValue(
			specimen.querySelector('.input-group > .btn'),
			'The "Input group button" specimen renders no grouped button',
		)
		// At rest the button sits one step above the control on the group's stacking levels. It
		// pulls its leading border back by one border width onto the control's trailing border, so
		// the two share one line, and the button's border paints that line until the control is
		// lifted past it. The following reading uses the button's own border width, which is the
		// width the group's pull-back is written in.
		expect(readStyle(control, 'z-index')).toBe('auto')
		expect(readStyle(button, 'z-index')).toBe('2')
		expect(button.getBoundingClientRect().left).toBeCloseTo(
			control.getBoundingClientRect().right -
				Number.parseFloat(readStyle(button, 'border-left-width')),
			1,
		)
		// The drive reaches the control of the specimen that holds a button rather than one that holds
		// an addon alone: the addon is static and already sits under the positioned control at rest,
		// so a lift over it changes no pixel. The focus frame is an element frame of the specimen
		// lifted into a padded wrapper at the document's start, the placement the Primary focus frame
		// uses and for its reasons: the ring paints outside the control's border box, and the
		// wrapper's padding holds it. Tab from the wrapper reaches the control. The declared region is
		// the specimen, so a reader of the frame is pointed at the group the frame claims, and both
		// the specimen and the ring around the control are read inside the frame.
		const marker = document.createComment('input-group-button-focus')
		specimen.before(marker)
		const wrapper = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		wrapper.append(specimen)
		document.body.prepend(wrapper)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = wrapper
		let framed = false
		let lifted = ''
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			// FF-POINTER-PROBE deleted release
			wrapper.focus()
			expect(await traverseAccessible(readName(control))).toBe(control)
			// Tab selects the filled field's whole text, and the selection's highlight would lie over
			// the paint the frame claims, so a key press collapses it to a caret.
			await pressKeys('{ArrowRight}')
			expect(control.matches(':focus-visible')).toBe(true)
			// The border tint and the ring carry a transition, so the reading and the frame follow it.
			await waitForAnimations(control)
			expect(readStyle(control, 'z-index')).toBe('5')
			reach = computeRingReach((property) => readStyle(control, property))
			await FRAMES.place('input-group-button-focus', specimen, shot)
			// The frame is held to the state it was shot in: a shot that moved focus away would drop
			// the lift and report here rather than be written under a name claiming the focused group.
			framed = control.matches(':focus')
			lifted = readStyle(control, 'z-index')
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const frame = { width: edge.width * ratio, height: edge.height * ratio }
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'input-group-button-focus'),
				'The input group focus frame recorded no placement',
			)
			cropped = [
				...computeCroppedEdges(readRegion(control, shot), reach * ratio, frame),
				...computeCroppedEdges(region, 0, frame),
			]
			control.blur()
		} finally {
			marker.replaceWith(specimen)
			wrapper.remove()
		}
		expect(framed).toBe(true)
		expect(lifted).toBe('5')
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		expect(readStyle(button, 'z-index')).toBe('2')
		expect(readStates(control)).toStrictEqual([])
		ARTIFACT.push(
			JSON.stringify({
				reading: 'input group focus',
				mode: VARIANT,
				name: readName(control),
				framed,
				lifted,
				outline: readStyle(control, 'outline-style'),
				reach,
			}),
		)
		JOURNAL.record('focus', readName(control), lifted)
	})

	it('drives a plain nav link to hover and to focus and a resting tab to hover, and photographs each state', async () => {
		await applyTheme(VARIANT)
		const base = readSpecimen(mounted.host, 'Nav base')
		const strip = readSpecimen(mounted.host, 'Nav tabs')
		const link = requireValue(
			base.querySelector<HTMLElement>('a.nav-link:not(.disabled)'),
			'The "Nav base" specimen renders no resting link',
		)
		const tab = requireValue(
			[...strip.querySelectorAll<HTMLElement>('.nav-tabs > .nav-item > .nav-link')].find(
				(element) => !element.matches('.active, .disabled, .dropdown-toggle, .show > .nav-link'),
			),
			'The "Nav tabs" specimen renders no resting tab',
		)
		const rest = new Map([
			['nav-base-hover', readStyle(link, 'color')],
			['nav-tabs-hover', readStyle(tab, 'border-top-color')],
		])
		const hovered = new Map<string, string>()
		const framed: Array<readonly [string, boolean]> = []
		// Each hover frame is shot on the whole specimen lifted to the document's start, the placement
		// the resting cascade scenarios use, because the section renders near the foot of the document
		// and a pointer placed there does not survive the staging a shot takes. The specimen itself is
		// lifted rather than a copy, because the pointer finds the link by its accessible name and a
		// copy would answer to the same one; the marker holds its place in the section. The pane is
		// staged before the pointer is placed, the Button hover ordering, so the shot finds the link
		// under the pointer.
		for (const [scenario, specimen, element, property] of [
			['nav-base-hover', base, link, 'color'],
			['nav-tabs-hover', strip, tab, 'border-top-color'],
		] as const) {
			const marker = document.createComment(scenario)
			specimen.before(marker)
			const lifted = build('div')
			lifted.append(specimen)
			document.body.prepend(lifted)
			try {
				await stagePane(window.innerWidth, window.innerHeight)
				await hoverAccessible('link', readName(element))
				expect(element.matches(':hover')).toBe(true)
				await waitForAnimations(element)
				hovered.set(scenario, readStyle(element, property))
				// The staging a shot takes can re-trigger the link's paint transition, so reduced motion
				// is staged around the shot and the frame cannot land inside it.
				await stageMedia({ motion: false })
				expect(mounted.host.querySelector('main')?.contains(element)).toBe(false)
				await FRAMES.place(scenario, element, specimen)
				// The readings that decide the frame are taken with the pane staged again at the
				// viewport, which puts the link back under the pointer the capture left where it was:
				// nothing above the lifted specimen was taken out of the layout, so the link sits
				// where it sat at the shot.
				await stagePane(window.innerWidth, window.innerHeight)
				framed.push([scenario, element.matches(':hover')])
				expect(readStyle(element, property)).toBe(hovered.get(scenario))
				await releasePane()
				await releaseMedia()
				await releasePointer()
			} finally {
				marker.replaceWith(specimen)
				lifted.remove()
			}
		}
		// The focus frame is an element frame of the specimen lifted into a padded wrapper at the
		// document's start, the placement the Primary focus frame uses and for its reasons: the ring
		// paints outside the link's border box, and the wrapper's padding holds it. The pointer each
		// hover frame released rests on that padding. Tab from the wrapper reaches the link, so the
		// ring read here is the one the keyboard rule paints.
		const marker = document.createComment('nav-base-focus')
		base.before(marker)
		const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		lifted.append(base)
		document.body.prepend(lifted)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = lifted
		let focused = ''
		let ring = 'none'
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			lifted.focus()
			expect(await traverseAccessible(readName(link))).toBe(link)
			expect(link.matches(':focus-visible')).toBe(true)
			await waitForAnimations(link)
			focused = readStyle(link, 'color')
			ring = readStyle(link, 'box-shadow')
			reach = computeRingReach((property) => readStyle(link, property))
			await FRAMES.place('nav-base-focus', link, shot)
			await stagePane(window.innerWidth, window.innerHeight)
			framed.push(['nav-base-focus', link.matches(':focus-visible')])
			expect(readStyle(link, 'box-shadow')).toBe(ring)
			await releasePane()
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'nav-base-focus'),
				'The nav focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, reach * ratio, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			link.blur()
			await waitForAnimations(link)
		} finally {
			marker.replaceWith(base)
			lifted.remove()
		}
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		// Every frame was taken while its own state still held, each driven state left its resting
		// paint, and focus paints the hover color with the ring beside it: a frame taken after the
		// state fell away, or a state rule that stopped repainting, reports here rather than being
		// written under a name claiming otherwise.
		expect(framed.filter(([, held]) => !held)).toStrictEqual([])
		expect([...hovered].filter(([scenario, value]) => value === rest.get(scenario))).toStrictEqual(
			[],
		)
		expect(focused).toBe(hovered.get('nav-base-hover'))
		expect(ring).not.toBe('none')
		expect(readStyle(link, 'outline-style')).toBe('none')
		expect(readStyle(link, 'box-shadow')).toBe('none')
		expect(readStyle(link, 'color')).toBe(rest.get('nav-base-hover'))
		ARTIFACT.push(
			JSON.stringify({
				reading: 'nav states',
				rest: [...rest],
				hovered: [...hovered],
				focused,
				reach,
			}),
		)
		JOURNAL.record('hover', readName(tab), String(hovered.get('nav-tabs-hover')))
	})

	it('drives an underline link to hover and to focus on the lifted specimen, and photographs each state', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Nav underline')
		const link = requireValue(
			[...specimen.querySelectorAll<HTMLElement>('.nav-underline > .nav-item > .nav-link')].find(
				(element) => !element.matches('.active, .show > .nav-link'),
			),
			'The "Nav underline" specimen renders no resting link',
		)
		const rest = readStyle(link, 'border-bottom-color')
		const placed: CaptureScenario[] = []
		const framed: Array<readonly [string, boolean]> = []
		const driven = new Map<string, string>()
		let painted = ''
		let ring = 'none'
		let reach = 0
		let inside: readonly boolean[] = []
		// The specimen itself is moved to the document's start and put back afterwards, the placement
		// the menu item case uses and for its reasons: the section renders near the foot of the
		// document, a pointer placed there does not survive the staging a shot takes, and a copy would
		// answer to the link's accessible name beside the original. The marker holds its place. The
		// wrapper carries the `p-2` class, because an underline link sits flush with the specimen's
		// start and top edges and its focus ring paints outside the link's box: the focus frame is shot
		// on the wrapper, whose padding holds the ring, and the hover frame on the specimen, where the
		// hover paints inside the link's own box.
		const marker = document.createComment('nav-underline')
		specimen.before(marker)
		const lifted = build('div', { classes: 'p-2' })
		lifted.append(specimen)
		document.body.prepend(lifted)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = lifted
		try {
			// The pointer-held placement sits on the lifted specimen, outside every section a bounded
			// frame takes out of the layout.
			expect(mounted.host.querySelector('main')?.contains(link)).toBe(false)
			await stagePane(window.innerWidth, window.innerHeight)
			await hoverAccessible('link', readName(link))
			expect(link.matches(':hover')).toBe(true)
			await waitForAnimations(link)
			driven.set('hover', readStyle(link, 'border-bottom-color'))
			painted = readStyle(link, 'color')
			// The staging a shot takes can re-trigger the link's paint transition, so reduced motion is
			// staged around each shot and a frame cannot land inside it.
			await stageMedia({ motion: false })
			await FRAMES.place('nav-underline-hover', link, specimen)
			placed.push('nav-underline-hover')
			// The readings that decide the frame are taken in the layout the shot was taken in: staging
			// the pane again at the shot's geometry puts the link back under the pointer the capture
			// left where it was.
			await stagePane(window.innerWidth, window.innerHeight)
			framed.push(['nav-underline-hover', link.matches(':hover')])
			expect(readStyle(link, 'border-bottom-color')).toBe(driven.get('hover'))
			await releasePane()
			await releaseMedia()
			await releasePointer()
			// Focus is reached with a key press after the focus, which is what makes the browser match
			// the link as keyboard focus, so the ring read here is the one the keyboard rule paints.
			link.focus()
			await pressKeys('{ArrowRight}')
			expect(link.matches(':focus-visible')).toBe(true)
			await waitForAnimations(link)
			driven.set('focus', readStyle(link, 'border-bottom-color'))
			ring = readStyle(link, 'box-shadow')
			await stageMedia({ motion: false })
			await FRAMES.place('nav-underline-focus', link, shot)
			placed.push('nav-underline-focus')
			await stagePane(window.innerWidth, window.innerHeight)
			framed.push([
				'nav-underline-focus',
				link.matches(':focus-visible') && !link.matches(':hover'),
			])
			expect(readStyle(link, 'box-shadow')).toBe(ring)
			// The ring's painted extent is the link's box grown by the largest length its shadow
			// carries, and each of its edges is read against the frame's. The link's box is the region
			// the frame manager recorded when it placed the shot, in the frame's own device pixels, so
			// the reading follows whichever element the placement photographed.
			reach = Math.max(...[...ring.matchAll(/(-?[\d.]+)px/gu)].map((match) => Number(match[1])))
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'nav-underline-focus'),
				'The underline focus frame recorded no placement',
			)
			const ratio = window.devicePixelRatio
			const frame = shot.getBoundingClientRect()
			inside = [
				region.x - reach * ratio >= 0,
				region.y - reach * ratio >= 0,
				region.x + region.width + reach * ratio <= frame.width * ratio,
				region.y + region.height + reach * ratio <= frame.height * ratio,
			]
			await releasePane()
			await releaseMedia()
			link.blur()
		} finally {
			marker.replaceWith(specimen)
			lifted.remove()
		}
		// Every frame was taken while its own state still held and under the scenario the registry
		// carries, each driven state left the resting underline for the link's own color, and the
		// focus ring lies inside the frame shot on it: a frame taken after the state fell away, a ring
		// the frame crops, or a scenario the registry does not carry reports here.
		expect(framed.filter(([, held]) => !held)).toStrictEqual([])
		expect(placed.filter((scenario) => !CAPTURE_SCENARIOS.includes(scenario))).toStrictEqual([])
		expect([...driven.values()].filter((value) => value === rest)).toStrictEqual([])
		expect(driven.get('focus')).toBe(driven.get('hover'))
		expect(driven.get('hover')).toBe(painted)
		expect(ring).not.toBe('none')
		expect(reach).toBeGreaterThan(0)
		expect(inside).toStrictEqual([true, true, true, true])
		expect(readStyle(link, 'border-bottom-color')).toBe(rest)
		expect(specimen.parentElement).not.toBe(lifted)
		ARTIFACT.push(
			JSON.stringify({ reading: 'underline states', rest, driven: [...driven], ring, reach }),
		)
		JOURNAL.record('focus', readName(link), String(driven.get('focus')))
	})

	it('reaches a collapsed accordion button through the keyboard and lifts its ring over the items beside it', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Accordion base')
		const [expanded, middle, last] = specimen.querySelectorAll<HTMLElement>('.accordion-button')
		const preceding = requireValue(
			expanded,
			'The "Accordion base" specimen renders no expanded button',
		)
		const control = requireValue(middle, 'The "Accordion base" specimen renders no middle button')
		const neighbour = requireValue(last, 'The "Accordion base" specimen renders no last button')
		expect(control.classList.contains('collapsed')).toBe(true)
		const resting = readStyle(control, 'box-shadow')
		// The focus frame is an element frame of the specimen lifted into a padded wrapper at the
		// document's start, the placement the Primary focus frame uses and for its reasons: the ring
		// paints outside the button's border box and over the items beside it, and the wrapper's
		// padding holds it. Tab from the wrapper reaches the expanded button and then the middle one,
		// because the expanded item's panel holds no focusable content. The declared region is the
		// specimen, so a reader of the frame is pointed at the group the frame claims, and both the
		// specimen and the ring around the button are read inside the frame.
		expect(preceding.matches('.collapsed')).toBe(false)
		const marker = document.createComment('accordion-base-focus')
		specimen.before(marker)
		const wrapper = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		wrapper.append(specimen)
		document.body.prepend(wrapper)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = wrapper
		let ring = 'none'
		let lifted = ''
		let beside = ''
		let active = false
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			// FF-POINTER-PROBE deleted release
			wrapper.focus()
			expect(await traverseAccessible(readName(control))).toBe(control)
			expect(control.matches(':focus')).toBe(true)
			// The ring carries a transition, so the reading and the frame follow it.
			await waitForAnimations(control)
			ring = readStyle(control, 'box-shadow')
			lifted = readStyle(control, 'z-index')
			beside = readStyle(neighbour, 'z-index')
			reach = computeRingReach((property) => readStyle(control, property))
			await FRAMES.place('accordion-base-focus', specimen, shot)
			// The frame is held to the state it was shot in: a shot that moved focus away would drop
			// the ring and the lift and report here rather than be written under a name claiming the
			// focus.
			active = document.activeElement === control && readStyle(control, 'z-index') === lifted
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const frame = { width: edge.width * ratio, height: edge.height * ratio }
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'accordion-base-focus'),
				'The accordion focus frame recorded no placement',
			)
			cropped = [
				...computeCroppedEdges(readRegion(control, shot), reach * ratio, frame),
				...computeCroppedEdges(region, 0, frame),
			]
			control.blur()
		} finally {
			marker.replaceWith(specimen)
			wrapper.remove()
		}
		expect(active).toBe(true)
		expect(lifted).toBe('3')
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		expect(beside).toBe('auto')
		expect(resting).toBe('none')
		expect(ring).not.toBe('none')
		expect(readStyle(control, 'outline-style')).toBe('none')
		await waitForAnimations(control)
		expect(readStyle(control, 'box-shadow')).toBe('none')
		ARTIFACT.push(
			JSON.stringify({
				reading: 'accordion focus',
				mode: VARIANT,
				name: readName(control),
				lifted,
				ring,
				reach,
			}),
		)
		JOURNAL.record('focus', readName(control), lifted)
	})
	it('reveals the skip link under keyboard focus and photographs the revealed link with its outline', async () => {
		await applyTheme(VARIANT)
		const specimen = readSpecimen(mounted.host, 'Skip link')
		const link = requireValue(
			specimen.querySelector<HTMLAnchorElement>('.visually-hidden-focusable'),
			'The "Skip link" specimen renders no .visually-hidden-focusable',
		)
		const resting = link.getBoundingClientRect().width
		// The focus frame is an element frame of the specimen lifted into a padded wrapper at the
		// document's start, the placement the Primary focus frame uses and for its reasons: the
		// revealed link wears the browser's own `auto` outline outside its box, and the wrapper's
		// padding holds it. Tab from the wrapper reaches the link. A script focus is not enough here:
		// after the pointer press a dark run switches the mode with, the browser matches
		// `:focus-visible` on a scripted focus and still paints no `auto` outline, for the release's
		// stylesheet and for this one alike, and Tab traversal is what brings the outline back.
		const marker = document.createComment('skip-link-focus')
		specimen.before(marker)
		const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		lifted.append(specimen)
		document.body.prepend(lifted)
		// The focus frame is shot on the element held here, and its size bounds the outline's far
		// edges.
		const shot: HTMLElement = lifted
		let revealed = 0
		let framedFocus = false
		let framed = 0
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			// FF-POINTER-PROBE deleted release
			// The link is the specimen's one focusable element, and it renders at one pixel until it
			// holds focus, so one Tab from the wrapper is the traversal rather than a walk that
			// resolves the link by its rendered name first.
			lifted.focus()
			await pressKeys('{Tab}')
			expect(document.activeElement).toBe(link)
			expect(link.matches(':focus-visible')).toBe(true)
			revealed = link.getBoundingClientRect().width
			reach = computeRingReach((property) => readStyle(link, property))
			await FRAMES.place('skip-link-focus', link, shot)
			await stagePane(window.innerWidth, window.innerHeight)
			framedFocus = link.matches(':focus-visible')
			framed = link.getBoundingClientRect().width
			await releasePane()
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'skip-link-focus'),
				'The skip link focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, reach * ratio, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			link.blur()
		} finally {
			marker.replaceWith(specimen)
			lifted.remove()
		}
		const rested = link.getBoundingClientRect().width
		// The frame is held to the state it was shot in, so a shot that found the link unfocused
		// reddens here instead of being written under a name claiming the reveal; and the outline the
		// link wears lies inside the frame.
		expect(framedFocus).toBe(true)
		expect(framed).toBe(revealed)
		expect([resting, rested]).toStrictEqual([1, 1])
		expect(revealed).toBeGreaterThan(1)
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		ARTIFACT.push(
			JSON.stringify({
				reading: 'skip link',
				mode: VARIANT,
				resting,
				revealed,
				framed,
				rested,
				reach,
			}),
		)
		JOURNAL.record('focus', readName(link), String(revealed))
	})

	it('drives an expanded bar link to hover and rings a collapsed bar toggler under focus, and photographs each state', async () => {
		await applyTheme(VARIANT)
		const expanded = readSpecimen(mounted.host, 'Navbar expanded')
		const collapsed = readSpecimen(mounted.host, 'Navbar collapsed')
		const link = requireValue(
			expanded.querySelector<HTMLElement>(
				'.navbar-nav .nav-link:not(.active):not(.disabled):not(.dropdown-toggle)',
			),
			'The "Navbar expanded" specimen renders no resting link',
		)
		const toggler = requireValue(
			collapsed.querySelector<HTMLElement>('.navbar-toggler.collapsed'),
			'The "Navbar collapsed" specimen renders no collapsed toggler',
		)
		const rest = readStyle(link, 'color')
		// The hover frame is shot on the whole specimen lifted to the document's start, the placement
		// the nav hover frames use and for their reasons: the section renders near the foot of the
		// document, a pointer placed there does not survive the staging a shot takes, and a copy would
		// answer to the link's accessible name beside the original. The marker holds its place.
		const marker = document.createComment('navbar-expanded-hover')
		expanded.before(marker)
		const lifted = build('div')
		lifted.append(expanded)
		document.body.prepend(lifted)
		let hovered = ''
		let held = false
		try {
			await stagePane(window.innerWidth, window.innerHeight)
			await hoverAccessible('link', readName(link))
			expect(link.matches(':hover')).toBe(true)
			await waitForAnimations(link)
			hovered = readStyle(link, 'color')
			// The staging a shot takes can re-trigger the link's paint transition, so reduced motion is
			// staged around the shot and the frame cannot land inside it.
			await stageMedia({ motion: false })
			expect(mounted.host.querySelector('main')?.contains(link)).toBe(false)
			await FRAMES.place('navbar-expanded-hover', link, expanded)
			await stagePane(window.innerWidth, window.innerHeight)
			held = link.matches(':hover')
			expect(readStyle(link, 'color')).toBe(hovered)
			await releasePane()
			await releaseMedia()
			await releasePointer()
		} finally {
			marker.replaceWith(expanded)
			lifted.remove()
		}
		// The focus frame is an element frame of the collapsed specimen lifted into a padded wrapper at
		// the document's start, the placement the Primary focus frame uses and for its reasons: the
		// ring paints outside the toggler's border box, and the wrapper's padding holds it. The pointer
		// the hover frame released rests on that padding. Tab from the wrapper reaches the toggler; its
		// rule answers to focus itself, so the keyboard and a scripted focus paint the same ring.
		const anchor = document.createComment('navbar-collapsed-focus')
		collapsed.before(anchor)
		const padded = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
		padded.append(collapsed)
		document.body.prepend(padded)
		// The focus frame is shot on the element held here, and its size bounds the ring's far edges.
		const shot: HTMLElement = padded
		let ring = 'none'
		let focused = false
		let reach = 0
		let cropped: readonly FrameEdge[] = []
		try {
			padded.focus()
			expect(await traverseAccessible(readName(toggler))).toBe(toggler)
			expect(toggler.matches(':focus')).toBe(true)
			await waitForAnimations(toggler)
			ring = readStyle(toggler, 'box-shadow')
			reach = computeRingReach((property) => readStyle(toggler, property))
			await FRAMES.place('navbar-collapsed-focus', toggler, shot)
			await stagePane(window.innerWidth, window.innerHeight)
			focused = toggler.matches(':focus')
			expect(readStyle(toggler, 'box-shadow')).toBe(ring)
			await releasePane()
			const ratio = window.devicePixelRatio
			const edge = shot.getBoundingClientRect()
			const { region } = requireValue(
				FRAMES.placements.find((placement) => placement.scenario === 'navbar-collapsed-focus'),
				'The toggler focus frame recorded no placement',
			)
			cropped = computeCroppedEdges(region, reach * ratio, {
				width: edge.width * ratio,
				height: edge.height * ratio,
			})
			toggler.blur()
			await waitForAnimations(toggler)
		} finally {
			anchor.replaceWith(collapsed)
			padded.remove()
		}
		expect(reach).toBeGreaterThan(0)
		expect(cropped).toStrictEqual([])
		// Each frame was taken while its own state still held, the hovered link left its resting
		// paint, and the ring painted and cleared: a frame taken after the state fell away, or a state
		// rule that stopped repainting, reports here rather than being written under a name claiming
		// otherwise.
		expect([held, focused]).toStrictEqual([true, true])
		expect(hovered).not.toBe(rest)
		expect(ring).not.toBe('none')
		expect(readStyle(toggler, 'box-shadow')).toBe('none')
		expect(readStyle(link, 'color')).toBe(rest)
		expect(expanded.parentElement).not.toBe(lifted)
		ARTIFACT.push(JSON.stringify({ reading: 'navbar states', rest, hovered, ring, reach }))
		JOURNAL.record('hover', readName(link), hovered)
	})
	it('paints the default focus ring and a role ring under keyboard focus and photographs each', async () => {
		await applyTheme(VARIANT)
		// The rows are the driven rows whose subject the focus ring table declares. Each frame is shot
		// on the specimen's danger link where the specimen renders one, and on its first ring link
		// otherwise, because the danger ring's color sits apart from the default ring's primary color.
		const declared = new Set(FOCUS_RING_SPECIMENS.map((specimen) => specimen.name))
		const keys = DRIVEN_KEYS.filter((key) => declared.has(key.subject))
		expect(keys).not.toStrictEqual([])
		const rings = new Map<string, string>()
		const ratios = new Map<string, number | undefined>()
		const held: boolean[] = []
		const names: string[] = []
		const reaches = new Map<string, number>()
		const cropped = new Map<string, readonly FrameEdge[]>()
		// A dark run switches the mode with a pointer press and leaves the pointer where the control
		// sat, so the pointer is released onto the padding of each wrapper a specimen is lifted into.
		// FF-POINTER-PROBE deleted release
		for (const key of keys) {
			const specimen = readSpecimen(mounted.host, key.subject)
			const link = requireValue(
				specimen.querySelector<HTMLAnchorElement>('.focus-ring-danger') ??
					specimen.querySelector<HTMLAnchorElement>('a.focus-ring'),
				`The "${key.subject}" specimen renders no .focus-ring link`,
			)
			expect(readStyle(link, 'box-shadow')).toBe('none')
			// Each focus frame is an element frame of the specimen lifted into a padded wrapper at the
			// document's start, the placement the Primary focus frame uses and for its reasons: the
			// ring paints outside the link's border box, and the wrapper's padding holds it. The
			// helper answers to focus itself, and Tab from the wrapper is what makes the browser match
			// the link as keyboard focus, which the installed ring reader requires.
			const marker = document.createComment(key.scenario)
			specimen.before(marker)
			const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
			lifted.append(specimen)
			document.body.prepend(lifted)
			// The focus frame is shot on the element held here, and its size bounds the ring's far
			// edges.
			const shot: HTMLElement = lifted
			try {
				lifted.focus()
				expect(await traverseAccessible(readName(link))).toBe(link)
				expect(link.matches(':focus-visible')).toBe(true)
				await waitForAnimations(link)
				const ring = readStyle(link, 'box-shadow')
				rings.set(key.scenario, ring)
				ratios.set(key.scenario, readRing(link))
				names.push(readName(link))
				const reach = computeRingReach((property) => readStyle(link, property))
				reaches.set(key.scenario, reach)
				await FRAMES.place(key.scenario, link, shot)
				held.push(link.matches(':focus') && readStyle(link, 'box-shadow') === ring)
				const ratio = window.devicePixelRatio
				const edge = shot.getBoundingClientRect()
				const { region } = requireValue(
					FRAMES.placements.find((placement) => placement.scenario === key.scenario),
					`The ${key.scenario} frame recorded no placement`,
				)
				cropped.set(
					key.scenario,
					computeCroppedEdges(region, reach * ratio, {
						width: edge.width * ratio,
						height: edge.height * ratio,
					}),
				)
				link.blur()
			} finally {
				marker.replaceWith(specimen)
				lifted.remove()
			}
			expect(readStyle(link, 'box-shadow')).toBe('none')
		}
		// Each ring paints past its link's box and lies inside the frame shot on it, so a frame that
		// crops a ring names the scenario and the edge here.
		expect([...reaches.keys()]).toStrictEqual(keys.map((key) => key.scenario))
		expect([...reaches].filter(([, reach]) => reach <= 0)).toStrictEqual([])
		expect([...cropped].filter(([, edges]) => edges.length > 0)).toStrictEqual([])
		// Each frame was taken while its ring still painted, each ring painted, and the rings differ:
		// a frame taken after focus fell away, or a role class that stopped repainting the ring,
		// reports here rather than being written under a name claiming otherwise.
		expect(held).toStrictEqual(keys.map(() => true))
		expect([...rings.values()].filter((ring) => ring === 'none')).toStrictEqual([])
		expect(new Set(rings.values()).size).toBe(keys.length)
		expect([...ratios.values()].filter((ratio) => (ratio ?? 0) <= 1)).toStrictEqual([])
		ARTIFACT.push(
			JSON.stringify({
				reading: 'focus rings',
				mode: VARIANT,
				rings: [...rings],
				ratios: [...ratios],
				reaches: [...reaches],
			}),
		)
		JOURNAL.record('focus', String(names.at(-1)), String([...ratios.values()].at(-1)))
	})
})

describe('refusal', () => {
	it('answers each refused reading in the voice the installed resolver raises for it', async () => {
		PROVEN.add('refusal')
		// The voices are read from the installed module rather than written out here, and the
		// refusals this workspace raises are compared against them. A wording this package changes
		// reddens here instead of drifting away from the voice a reader of the suite meets, and the
		// sentences pinned as literals in `tests/setupBrowser.test.ts` are the other half of that
		// pair: one side holds this workspace's own wording still, and this side holds it to the
		// installed one.
		const absent = readRefusal('button', 'Sign in')
		const unreachable = requireValue(
			readRefusal('button', 'Disabled'),
			'The installed resolver refused nothing for the Disabled specimen',
		)
		// Absent and present-but-gated are different findings, so a module that collapsed them would
		// leave every refusal below asserting the same sentence about two different conditions.
		expect(absent).toBeDefined()
		expect(absent).not.toBe(unreachable)
		expect(readRefusal('button', 'Toggle')).toBeUndefined()
		const disabled = readButton(mounted.section, 'Disabled')
		expect(() => readOracleButton(mounted.section, 'Disabled')).toThrow(new Error(unreachable))
		const reading = await recordState(disabled, () => clickAccessible('button', 'Disabled'))
		expect(reading.refusal).toBe(unreachable)
		JOURNAL.record('refuse', 'Disabled', unreachable)
	})
})

describe('matrix', () => {
	it('reads the settled background at every declared mode and viewport', async () => {
		PROVEN.add('matrix')
		const readings = new Map<string, string>()
		for (const variant of VARIANTS) {
			await page.viewport(variant.width, variant.height)
			await applyTheme(variant.name)
			const background = readStyle(document.body, 'background-color')
			readings.set(variant.name, background)
			expect(document.documentElement.getAttribute('data-bs-theme') === 'dark').toBe(
				variant.name.startsWith('dark-'),
			)
			ARTIFACT.push(
				JSON.stringify({
					variant: variant.name,
					element: 'body',
					property: 'background-color',
					value: background,
				}),
			)
		}
		expect([...readings.keys()]).toEqual(VARIANTS.map((variant) => variant.name))
		expect(readings.get('light-1280')).not.toBe(readings.get('dark-1280'))
		expect(readings.get('light-390')).not.toBe(readings.get('dark-390'))
	})

	it('reads the mounted class and style populations with their published controls', () => {
		const census = readCensus(mounted.host)
		expect(census.elements).toBeGreaterThan(0)
		expect(census.undeclared).toEqual([])
		expect(extractStyles(mounted.host)).toEqual([])
		const classes = buildCensus()
		const escapes = buildEscapes('veneer-permitted-control')
		mounted.host.append(classes.root, escapes.root)
		try {
			expect(readCensus(mounted.host).undeclared).toEqual(
				expect.arrayContaining([classes.token, classes.mark]),
			)
			expect(extractStyles(mounted.host)).toEqual(
				expect.arrayContaining([
					escapes.inline.outerHTML,
					escapes.embedded.outerHTML,
					escapes.permitted.outerHTML,
				]),
			)
		} finally {
			classes.root.remove()
			escapes.root.remove()
		}
		ARTIFACT.push(JSON.stringify({ population: 'mounted showcase', census }))
	})
})

describe('portfolio', () => {
	it('expands one filename per scenario and variant, and places every registered scenario', () => {
		const files = expandCaptures(CAPTURE_SCENARIOS, VARIANTS)
		expect(PORTFOLIO.files).toEqual(files)
		expect(new Set(files).size).toBe(files.length)
		for (const variant of VARIANTS) {
			for (const scenario of CAPTURE_SCENARIOS) {
				expect(files).toContain(`${scenario}--${variant.name}.png`)
			}
		}
		// The expanded filename law, read off the expansion rather than described beside it: a
		// stem naming the scenario alone, then the theme and the viewport of the variant that
		// rendered it. What a scenario itself may spell is held in `tests/setup.test.ts`, which is
		// where the registry is the subject; this case is about what the expansion makes of it.
		expect(
			files.filter((file) => !/^[a-z\d]+(?:-[a-z\d]+)*--(?:light|dark)-\d+\.png$/u.test(file)),
		).toStrictEqual([])
		// Every registered scenario was reached, none twice, and none unregistered: the portfolio
		// refuses a scenario it does not carry, so this pairs that refusal with the reverse.
		expect([...FRAMES.scenarios].sort()).toStrictEqual([...CAPTURE_SCENARIOS].sort())
	})

	it('names a specimen the showcase declares, or its own region, as every scenario subject', () => {
		const declared = new Set([
			...[
				ALERT_SPECIMENS,
				ACCORDION_SPECIMENS,
				BADGE_SPECIMENS,
				BREADCRUMB_SPECIMENS,
				BUTTON_SPECIMENS,
				CARD_SPECIMENS,
				CAROUSEL_SPECIMENS,
				CLOSE_SPECIMENS,
				FADE_SPECIMENS,
				COLLAPSE_SPECIMENS,
				CONTENT_SPECIMENS,
				DROPDOWN_SPECIMENS,
				DISPLAY_SPECIMENS,
				FLEX_SPECIMENS,
				FORM_CHECK_SPECIMENS,
				FORM_CONTROL_SPECIMENS,
				FORM_FLOATING_SPECIMENS,
				FORM_LABEL_SPECIMENS,
				FORM_RANGE_SPECIMENS,
				INPUT_GROUP_SPECIMENS,
				FORM_SELECT_SPECIMENS,
				LAYOUT_SPECIMENS,
				LINK_SPECIMENS,
				LIST_GROUP_SPECIMENS,
				MEDIA_SPECIMENS,
				MODAL_SPECIMENS,
				NAV_SPECIMENS,
				NAVBAR_SPECIMENS,
				OFFCANVAS_SPECIMENS,
				PAGINATION_SPECIMENS,
				BUTTON_GROUP_SPECIMENS,
				PLACEHOLDER_SPECIMENS,
				PROGRESS_SPECIMENS,
				SPINNER_SPECIMENS,
				TABLE_SPECIMENS,
				TOAST_SPECIMENS,
				TYPE_SPECIMENS,
				VALIDATION_SPECIMENS,
				POSITION_SPECIMENS,
				SIZING_SPECIMENS,
				VISIBILITY_SPECIMENS,
				SHADOW_SPECIMENS,
				OPACITY_SPECIMENS,
				FOCUS_RING_SPECIMENS,
				FLOAT_SPECIMENS,
				OVERFLOW_SPECIMENS,
				OBJECT_FIT_SPECIMENS,
				TOOLTIP_SPECIMENS,
				POPOVER_SPECIMENS,
				BACKGROUND_SPECIMENS,
				BORDER_SPECIMENS,
				TEXT_SPECIMENS,
				COLOR_SPECIMENS,
				SPACING_SPECIMENS,
				INTERACTION_SPECIMENS,
			].flatMap((table) => table.map((specimen) => specimen.name)),
			SHOWCASE_COPY.region,
		])
		expect(CAPTURE_KEYS).not.toStrictEqual([])
		expect(CAPTURE_KEYS.filter((key) => !declared.has(key.subject))).toStrictEqual([])
		// The declared name has to reach the rendered surface as well, and one reader resolves it:
		// a labelled specimen container, a named region, or a rendered host announcing the name.
		expect(CAPTURE_KEYS.map((key) => readSubject(mounted.host, key.subject).isConnected)).toEqual(
			CAPTURE_KEYS.map(() => true),
		)
	})

	it('writes each subject its own accessibility artifact for the variant that rendered it', async () => {
		await applyTheme(VARIANT)
		const written: string[] = []
		const bodies = new Map<CaptureSubject, string>()
		for (const subject of new Set(CAPTURE_KEYS.map((key) => key.subject))) {
			// Every reading is taken here, on arrival, which is the state the artifact names. The
			// Button scenarios drive focus, the pointer, and a press for their own frames, so the
			// artifact beside those frames states the state it was read in rather than implying
			// the frame's.
			const body = describeSubject(readSubject(mounted.host, subject), {
				name: subject,
				variant: VARIANT,
				state: 'rest',
			})
			const path = `${STATES}/${buildStem(subject)}--${VARIANT}-${ACCESSIBILITY}.txt`
			await commands.writeFile(path, body)
			written.push(path)
			bodies.set(subject, body)
		}
		// The per-variant manifest keeps the whole page's tree and the run's interaction log; these
		// are the per-subject halves a side-by-side reading needs, because a reviewer comparing one
		// specimen against another portfolio's cannot separate a cascade difference from a
		// dump-format one in a whole-page dump.
		expect(new Set(written).size).toBe(written.length)
		expect(written).toHaveLength(bodies.size)
		// A subject that is itself a control records its own role and name in each half. The
		// installed focus walk describes an element's controls and is not itself one of them, so a
		// reading taken on the button alone calls the Primary specimen unreachable while the page
		// inventory in the manifest beside it lists that same control.
		const primary = requireValue(bodies.get('Primary'), 'No artifact was written for Primary')
		expect(primary.slice(0, primary.indexOf('focus:'))).toContain('button "Primary"')
		expect(primary.slice(primary.indexOf('focus:'))).toContain('button "Primary"')
		// Each artifact is about its own subject rather than about the page it was read on: the
		// Role links specimen names the links it renders, and the Showcase region's page reading
		// names none of them.
		const links = requireValue(bodies.get('Role links'), 'No artifact was written for Role links')
		const showcase = requireValue(bodies.get('Showcase'), 'No artifact was written for Showcase')
		expect(links).toContain('link "')
		expect(showcase).toContain('region "Showcase"')
		expect(showcase).not.toContain('link "')
		expect(links).not.toBe(showcase)
		// A subject presenting no roled element and no reachable control records those readings
		// rather than an empty file: the capped container is a bare div.
		const capped = requireValue(
			bodies.get('Capped container'),
			'No artifact was written for Capped container',
		)
		expect(capped).toContain('No element in this subject carries a role.')
		expect(capped).toContain('No control inside this subject is reachable.')
		ARTIFACT.push(JSON.stringify({ reading: 'accessibility', artifacts: written }))
	})

	it('records the toggle host as pressed at the moment its frame was shot', () => {
		// The arrival tree announces `Toggle` unpressed, so the pressed moment is either a second
		// tree in the artifact or no record at all, and a pressed frame with no tree beside it
		// cannot be read against one. Both records are asserted, so a change replacing the arrival
		// tree rather than adding to it reddens here. The arrival record is identified by a line
		// only a tree carries, its `region "Buttons"`, together with the absence of the pressed
		// suffix: the focus inventory in the same artifact lists `button "Toggle"` as well, so a
		// predicate reading that name alone matches the inventory and stays green with no arrival
		// tree in the artifact at all.
		const pressed = ARTIFACT.filter((entry) => entry.includes('button "Toggle" [pressed=true]'))
		const arrival = ARTIFACT.filter(
			(entry) =>
				entry.includes('region "Buttons"') && !entry.includes('button "Toggle" [pressed=true]'),
		)
		expect(pressed).not.toStrictEqual([])
		expect(arrival).not.toStrictEqual([])
		expect(arrival.filter((entry) => !entry.includes('button "Toggle"'))).toStrictEqual([])
	})

	it('reads every frame this variant left in the portfolio directory inside its declared region', async () => {
		PROVEN.add('capture')
		// The population is the frames on disk rather than the files this run wrote, so a run with
		// the capture flag unset guards the frames an earlier capture run left. Each one is paired
		// with the region its own scenario declared while the shot was staged: the written file
		// does not carry that box and the handed-back document no longer holds it, so the region is
		// recorded at placement on every run and looked up here.
		const regions = new Map(
			FRAMES.placements.map((placement) => [placement.scenario, placement.region]),
		)
		expect([...regions.keys()].sort()).toStrictEqual([...CAPTURE_SCENARIOS].sort())
		const expanded = CAPTURE_SCENARIOS.map((scenario) => `${scenario}--${VARIANT}.png`)
		const present: string[] = []
		for (const scenario of CAPTURE_SCENARIOS) {
			const frame: CaptureFilename = `${scenario}--${VARIANT}.png`
			const path = `${STATES}/${frame}`
			const encoded = await commands.readFile(path, 'base64').catch(() => undefined)
			if (encoded === undefined) continue
			present.push(frame)
			const reading = await readFrame(path)
			const region = requireValue(
				regions.get(scenario),
				`No region was recorded for the "${scenario}" scenario`,
			)
			// The reading runs against the frame's own floor rather than against the region's first
			// pixel, because a subject that covers its box in one flat fill — a placeholder bar —
			// is unvaried against itself and differs from the floor at every pixel. A region
			// carrying the floor alone shows nothing and stays refused. A frame whose bottom row
			// paints several colors reports no floor, and the reading falls back to the region's
			// own variation.
			const variation = await measureVariation(encoded, region, reading.floor)
			ARTIFACT.push(
				JSON.stringify({
					reading: 'frame',
					scenario,
					path,
					width: reading.width,
					height: reading.height,
					floor: reading.floor,
					region,
					variation,
				}),
			)
			expect(reading.width).toBeGreaterThan(0)
			expect(reading.height).toBeGreaterThan(0)
			expect(variation, `Blank frame region: ${path}`).toBeGreaterThan(0)
		}
		// A capture run writes every registered scenario before this case runs, so with the flag
		// set the population is the whole expansion. With it unset the population is whatever an
		// earlier capture run left: the whole expansion, or nothing at all before any run has
		// written one. A population between the two is a capture that stopped part way.
		expect(PORTFOLIO.paths).toHaveLength(CAPTURE ? expanded.length : 0)
		expect(present).toStrictEqual(CAPTURE || present.length > 0 ? expanded : [])
		// An empty population is held to the directory rather than passed over: the first expanded
		// name is read directly, so a guard that reads nothing while that frame sits on disk
		// reddens here instead of recording a clean sweep.
		const first = requireValue(expanded[0], 'The registry expands to no frame')
		const direct = await commands.readFile(`${STATES}/${first}`, 'base64').catch(() => undefined)
		expect(present.length > 0).toBe(direct !== undefined)
		ARTIFACT.push(
			JSON.stringify({ reading: 'guard', directory: STATES, variant: VARIANT, frames: present }),
		)
	})

	it('proves every declared family and declares every proven family', () => {
		expect(PROVEN).toEqual(new Set(FAMILIES))
	})
})
