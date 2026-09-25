// J-NATIVE-PROBE round 3 (successor of `j-native-probe-2.test.ts`, copied, not edited in place).
// Carries round 2's corrected size rows unchanged, adds the size rows round 2 dropped, decides whether
// an arrow inside the promoted tip uses the reference as its anchor, and reads the `V.*` rows under the
// candidate rule and the `position-visibility: always` control side by side. Every reading is one
// `ROW <name> <json>` line; every control is collected and asserted at the end of its test, so every
// row logs before a failed control reddens the run.
import {
	DROPDOWN_EVENTS,
	Dropdown,
	POPOVER_EVENTS,
	Popover,
	TOOLTIP_EVENTS,
	Tooltip,
} from '@src/browser'
import { waitForCondition } from '@orkestrel/test'
import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import tokensCascade from '../../src/styles/_tokens.scss?inline'
import dropdownCascade from '../../src/styles/components/_dropdown.scss?inline'
import tooltipCascade from '../../src/styles/components/_tooltip.scss?inline'
import popoverCascade from '../../src/styles/components/_popover.scss?inline'

type Reading = unknown

function raf(): Promise<void> {
	return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

async function twoFrames(): Promise<void> {
	await raf()
	await raf()
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

// Collects each control's verdict so every row logs before the test asserts; a control that reads
// other than its expected value reddens the test at its end.
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

// Reads each running CSSTransition's animated property from the transition object itself, never
// from `getComputedTiming()`, whose `transitionProperty` field round 1 read as `unknown`.
function transitionRow(host: HTMLElement): string {
	return host
		.getAnimations()
		.filter((animation): animation is CSSTransition => animation instanceof CSSTransition)
		.map((transition) => transition.transitionProperty)
		.join(',')
}

async function pausedHeightAtHalf(
	host: HTMLElement,
	durationMs: number,
): Promise<{ readonly transitionProperty: string; readonly height: string }> {
	await raf()
	const animation = host.getAnimations()[0]
	if (animation === undefined) {
		return { transitionProperty: 'none', height: getComputedStyle(host).height }
	}
	animation.pause()
	animation.currentTime = durationMs / 2
	await raf()
	return { transitionProperty: transitionRow(host), height: getComputedStyle(host).height }
}

// The width twin of `pausedHeightAtHalf`, for the horizontal rows round 2 dropped.
async function pausedWidthAtHalf(
	host: HTMLElement,
	durationMs: number,
): Promise<{ readonly transitionProperty: string; readonly width: string }> {
	await raf()
	const animation = host.getAnimations()[0]
	if (animation === undefined) {
		return { transitionProperty: 'none', width: getComputedStyle(host).width }
	}
	animation.pause()
	animation.currentTime = durationMs / 2
	await raf()
	return { transitionProperty: transitionRow(host), width: getComputedStyle(host).width }
}

// Completes every running transition by calling `finish()` and awaiting `finished`, without
// touching classes or the inline size, so a row can read the size the transition itself ended on.
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

// Completes every running transition by calling `finish()` and awaiting `finished`, the way
// round 1's fixed-duration wait could leave a transition mid-flight when the pixel completion
// rows measured a height the cleared inline size should have released.
async function completedHeight(host: HTMLElement): Promise<string> {
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
	host.classList.remove('collapsing')
	host.classList.add('collapse', 'show')
	host.style.removeProperty('height')
	await raf()
	return getComputedStyle(host).height
}

// The width twin of `completedHeight`: the same finish, class swap, and inline-size clear.
async function completedWidth(host: HTMLElement): Promise<string> {
	await finishTransitions(host)
	host.classList.remove('collapsing')
	host.classList.add('collapse', 'show')
	host.style.removeProperty('width')
	await raf()
	return getComputedStyle(host).width
}

function installCollapseRules(): HTMLStyleElement {
	const style = document.createElement('style')
	style.textContent = [
		'.collapse:not(.show) { display: none }',
		'.collapsing { height: 0; overflow: hidden; transition: height 0.4s ease }',
	].join(' ')
	document.head.append(style)
	return style
}

// Bootstrap's horizontal rule, installed only around the horizontal rows so round 2's rows run in
// the cascade they ran in.
function installHorizontalRule(): HTMLStyleElement {
	const style = document.createElement('style')
	style.textContent =
		'.collapse-horizontal.collapsing { width: 0; height: auto; transition: width 0.4s ease }'
	document.head.append(style)
	return style
}

function installRootRule(text: string): HTMLStyleElement {
	const style = document.createElement('style')
	style.textContent = text
	document.head.append(style)
	return style
}

// A show-path collapse with a 60px child: `collapse show collapsing` at `height: 0`.
function buildShowPanel(): { readonly host: HTMLElement; readonly child: HTMLElement } {
	const host = document.createElement('div')
	host.className = 'collapse show collapsing'
	const child = document.createElement('div')
	child.style.height = '60px'
	host.append(child)
	document.body.append(host)
	return { host, child }
}

// The growing-content completion: the transition runs, is paused at a quarter, the child grows from
// 60px to 120px, the transition is finished, and the row reads the size it ended on, then the class
// swap and clear round 2's completion performs.
async function measureGrowingCompletion(write: (host: HTMLElement) => void): Promise<Reading> {
	const { host, child } = buildShowPanel()
	try {
		reflow(host)
		write(host)
		reflow(host)
		await raf()
		const running = transitionRow(host)
		for (const animation of host.getAnimations()) {
			animation.pause()
			animation.currentTime = 100
		}
		child.style.height = '120px'
		await raf()
		const pausedAfterGrowth = getComputedStyle(host).height
		await finishTransitions(host)
		const finished = getComputedStyle(host).height
		const completed = await completedHeight(host)
		return {
			transition: running,
			pausedAfterGrowth,
			finished,
			completed,
			scrollHeight: host.scrollHeight,
			rectHeight: round2(host.getBoundingClientRect().height),
		}
	} finally {
		host.remove()
	}
}

// The horizontal row: a 30px child in a 300px container, `collapse-horizontal show collapsing`.
async function measureHorizontal(write: (host: HTMLElement) => void): Promise<Reading> {
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
		const midpoint = await pausedWidthAtHalf(host, 400)
		await finishTransitions(host)
		const finished = getComputedStyle(host).width
		const completed = await completedWidth(host)
		return {
			transition: midpoint.transitionProperty,
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

describe('J-NATIVE-PROBE round 3 size rows: round 2 carried, and the rows round 2 dropped', () => {
	it('measures the pixel path with the corrected instrument', async () => {
		const controls = createControls()
		const present = await measure('control.present', () => 'addEventListener' in document)
		controls.check('control.present', true, present, present === true)
		const absent = await measure('control.absent', () => Reflect.has(document, 'veneerNoSuchMember'))
		controls.check('control.absent', false, absent, absent === false)

		const style = installCollapseRules()
		try {
			// Control: an opacity-only transition, whose transitionRow must read exactly ["opacity"].
			const opacity = await measure('control.transitionProperty.opacity', async () => {
				const opacityStyle = document.createElement('style')
				opacityStyle.textContent = '.vn-opacity { opacity: 0; transition: opacity 0.4s linear }'
				document.head.append(opacityStyle)
				const host = document.createElement('div')
				host.className = 'vn-opacity'
				document.body.append(host)
				try {
					reflow(host)
					host.style.opacity = '1'
					reflow(host)
					await raf()
					return transitionRow(host)
				} finally {
					host.remove()
					opacityStyle.remove()
				}
			})
			controls.check('control.transitionProperty.opacity', 'opacity', opacity, opacity === 'opacity')

			// Show, pixel path: content 60px tall, no border.
			await measure('size.show.pixel.midpoint', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show collapsing'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					reflow(host)
					host.style.height = `${host.scrollHeight}px`
					const result = await pausedHeightAtHalf(host, 400)
					return `transition=${result.transitionProperty} height=${result.height}`
				} finally {
					host.remove()
				}
			})

			// Hide, pixel path: the Bootstrap sequence (write pixels, reflow, swap classes, reflow, clear).
			await measure('size.hide.pixel.midpoint', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					host.style.height = `${host.getBoundingClientRect().height}px`
					reflow(host)
					host.classList.add('collapsing')
					host.classList.remove('collapse', 'show')
					reflow(host)
					host.style.removeProperty('height')
					const result = await pausedHeightAtHalf(host, 400)
					return `transition=${result.transitionProperty} height=${result.height}`
				} finally {
					host.remove()
				}
			})

			// Hide, calc-size path: same sequence, `calc-size(auto, size)` written at step 1.
			await measure('size.hide.calcSize.midpoint', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					host.style.height = 'calc-size(auto, size)'
					reflow(host)
					host.classList.add('collapsing')
					host.classList.remove('collapse', 'show')
					reflow(host)
					host.style.removeProperty('height')
					const result = await pausedHeightAtHalf(host, 400)
					return `transition=${result.transitionProperty} height=${result.height}`
				} finally {
					host.remove()
				}
			})

			// Control: a static panel with no transition, whose rendered height must equal its content
			// height plus its borders.
			const staticPanel = await measure('control.completion.static', () => {
				const host = document.createElement('div')
				host.style.display = 'block'
				host.style.border = '3px solid black'
				host.style.boxSizing = 'border-box'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					const rect = host.getBoundingClientRect()
					return `rectHeight=${rect.height} scrollHeight=${host.scrollHeight}`
				} finally {
					host.remove()
				}
			})
			controls.check(
				'control.completion.static',
				'rectHeight=66 scrollHeight=60',
				staticPanel,
				staticPanel === 'rectHeight=66 scrollHeight=60',
			)

			// Completion, pixel path, 3px border: finish() every transition, then swap classes and clear.
			await measure('size.pixel.completion.border', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show'
				host.style.border = '3px solid black'
				host.style.boxSizing = 'border-box'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					host.style.height = `${host.scrollHeight}px`
					reflow(host)
					host.classList.add('collapsing')
					host.classList.remove('collapse', 'show')
					reflow(host)
					host.style.height = `${host.scrollHeight}px`
					const height = await completedHeight(host)
					const rect = host.getBoundingClientRect()
					return `height=${height} scrollHeight=${host.scrollHeight} rectHeight=${rect.height}`
				} finally {
					host.remove()
				}
			})

			// Completion, calc-size path, 3px border.
			await measure('size.calcSize.completion.border', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show'
				host.style.border = '3px solid black'
				host.style.boxSizing = 'border-box'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					host.style.height = 'calc-size(auto, size)'
					reflow(host)
					host.classList.add('collapsing')
					host.classList.remove('collapse', 'show')
					reflow(host)
					host.style.height = 'calc-size(auto, size)'
					const height = await completedHeight(host)
					const rect = host.getBoundingClientRect()
					return `height=${height} scrollHeight=${host.scrollHeight} rectHeight=${rect.height}`
				} finally {
					host.remove()
				}
			})

			// Round 3 from here: the rows round 1 had and round 2 dropped, through round 2's methods.
			await measure('size.calcSize.supported', () => CSS.supports('height', 'calc-size(auto, size)'))

			// Show, calc-size path: the pixel show row's fixture, `calc-size(auto, size)` written
			// instead of pixels. The pixel show row is its comparison.
			await measure('size.show.calcSize.midpoint', async () => {
				const { host } = buildShowPanel()
				try {
					reflow(host)
					host.style.height = 'calc-size(auto, size)'
					reflow(host)
					const result = await pausedHeightAtHalf(host, 400)
					return `transition=${result.transitionProperty} height=${result.height}`
				} finally {
					host.remove()
				}
			})

			// Control: a static panel built the same way as the growing-content rows, no transition,
			// whose child grows from 60px to 120px. Its height must read the grown content, 120px.
			const growingStatic = await measure('control.completion.growingContent.static', async () => {
				const host = document.createElement('div')
				host.style.display = 'block'
				const child = document.createElement('div')
				child.style.height = '60px'
				host.append(child)
				document.body.append(host)
				try {
					reflow(host)
					child.style.height = '120px'
					await raf()
					return {
						height: getComputedStyle(host).height,
						scrollHeight: host.scrollHeight,
						rectHeight: round2(host.getBoundingClientRect().height),
					}
				} finally {
					host.remove()
				}
			})
			controls.check(
				'control.completion.growingContent.static',
				{ height: '120px', scrollHeight: 120, rectHeight: 120 },
				growingStatic,
				JSON.stringify(growingStatic) === JSON.stringify({ height: '120px', scrollHeight: 120, rectHeight: 120 }),
			)

			await measure('size.pixel.completion.growingContent', () =>
				measureGrowingCompletion((host) => {
					host.style.height = `${host.scrollHeight}px`
				}),
			)
			await measure('size.calcSize.completion.growingContent', () =>
				measureGrowingCompletion((host) => {
					host.style.height = 'calc-size(auto, size)'
				}),
			)

			// Horizontal rows: a 30px child in a 300px container.
			const horizontal = installHorizontalRule()
			try {
				// Control: a static block panel built the same way, no transition. Its width must read the
				// container's 300px, the width a completed panel with a cleared inline width takes.
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
				controls.check(
					'control.completion.horizontal.static',
					{ width: '300px', scrollWidth: 300, rectWidth: 300 },
					horizontalStatic,
					JSON.stringify(horizontalStatic) === JSON.stringify({ width: '300px', scrollWidth: 300, rectWidth: 300 }),
				)
				await measure('size.horizontal.pixel', () =>
					measureHorizontal((host) => {
						host.style.width = `${host.scrollWidth}px`
					}),
				)
				await measure('size.horizontal.calcSize', () =>
					measureHorizontal((host) => {
						host.style.width = 'calc-size(auto, size)'
					}),
				)
			} finally {
				horizontal.remove()
			}

			// Controls for the root `interpolate-size` row: a transition to the `auto` keyword must run
			// under `allow-keywords` and must not run under `numeric-only`, so the root declaration is
			// proved in effect before the calc-size row reads under it.
			const keywordAllowed = await measure('control.interpolateSize.keyword.allowKeywords', async () => {
				const rootStyle = installRootRule(':root { interpolate-size: allow-keywords }')
				const { host } = buildShowPanel()
				try {
					reflow(host)
					host.style.height = 'auto'
					reflow(host)
					const result = await pausedHeightAtHalf(host, 400)
					return `transition=${result.transitionProperty} height=${result.height}`
				} finally {
					host.remove()
					rootStyle.remove()
				}
			})
			controls.check(
				'control.interpolateSize.keyword.allowKeywords',
				'transition=height height=48.1406px',
				keywordAllowed,
				keywordAllowed === 'transition=height height=48.1406px',
			)
			const keywordNumeric = await measure('control.interpolateSize.keyword.numericOnly', async () => {
				const rootStyle = installRootRule(':root { interpolate-size: numeric-only }')
				const { host } = buildShowPanel()
				try {
					reflow(host)
					host.style.height = 'auto'
					reflow(host)
					const result = await pausedHeightAtHalf(host, 400)
					return `transition=${result.transitionProperty} height=${result.height}`
				} finally {
					host.remove()
					rootStyle.remove()
				}
			})
			controls.check(
				'control.interpolateSize.keyword.numericOnly',
				'transition=none height=60px',
				keywordNumeric,
				keywordNumeric === 'transition=none height=60px',
			)
			await measure('size.calcSize.interpolateSizeNumericOnly', async () => {
				const rootStyle = installRootRule(':root { interpolate-size: numeric-only }')
				const { host } = buildShowPanel()
				try {
					reflow(host)
					host.style.height = 'calc-size(auto, size)'
					reflow(host)
					const result = await pausedHeightAtHalf(host, 400)
					return `transition=${result.transitionProperty} height=${result.height}`
				} finally {
					host.remove()
					rootStyle.remove()
				}
			})

			// Zero duration: the calc-size path under `transition: height 0s`, against a control built the
			// same way with 0.4s, which must create exactly one transition.
			const zeroCount = async (duration: string): Promise<Reading> => {
				const zeroStyle = installRootRule(
					`.vn-zero { height: 0; overflow: hidden; transition: height ${duration} linear }`,
				)
				const host = document.createElement('div')
				host.className = 'vn-zero'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					reflow(host)
					host.style.height = 'calc-size(auto, size)'
					reflow(host)
					await raf()
					return {
						count: host.getAnimations().length,
						transition: transitionRow(host),
						height: getComputedStyle(host).height,
					}
				} finally {
					host.remove()
					zeroStyle.remove()
				}
			}
			const zeroControl = await measure('control.zeroDuration.nonZero', () => zeroCount('0.4s'))
			const zeroControlCount = typeof zeroControl === 'object' && zeroControl !== null ? Reflect.get(zeroControl, 'count') : undefined
			controls.check('control.zeroDuration.nonZero', { count: 1 }, zeroControl, zeroControlCount === 1)
			await measure('size.calcSize.zeroDuration', () => zeroCount('0s'))
		} finally {
			style.remove()
		}
		expect(controls.failures).toEqual([])
	})
})

// ---------------------------------------------------------------------------------------------------
// Arrow rows. The reference is a fixed 40x20 box at left 150, top 100, so its centre is x = 170. The
// tip is a manual popover, fixed, 80px wide, no border and no padding, placed at an explicit left so
// its centre sits 20px left of, on, and 20px right of the reference's centre. The arrow is 10x10.
// ---------------------------------------------------------------------------------------------------

const REFERENCE_LEFT = 150
const REFERENCE_WIDTH = 40
const TIP_WIDTH = 80
const ARROW_SIZE = 10
const TIP_OFFSETS: ReadonlyArray<readonly [string, number]> = [
	['left', -20],
	['equal', 0],
	['right', 20],
]

function createAnchorName(): string {
	return `--vn-probe-anchor-${Math.random().toString(36).slice(2)}`
}

function buildReference(anchorName: string): HTMLElement {
	const reference = document.createElement('div')
	reference.style.cssText = `position:fixed;left:${REFERENCE_LEFT}px;top:100px;width:${REFERENCE_WIDTH}px;height:20px;margin:0;padding:0;border:0;background:#ccc`
	reference.style.setProperty('anchor-name', anchorName)
	document.body.append(reference)
	return reference
}

// A manual popover with the UA popover inset, margin, border, and padding cleared, so its box is
// exactly where the fixture puts it.
function buildPromoted(css: string): HTMLElement {
	const element = document.createElement('div')
	element.setAttribute('popover', 'manual')
	element.style.cssText = `position:fixed;inset:auto;margin:0;padding:0;border:0;overflow:visible;${css}`
	return element
}

function centreX(element: Element): number {
	const rect = element.getBoundingClientRect()
	return rect.left + rect.width / 2
}

// Places a tip at one offset, puts an arrow styled by `styleArrow` inside it, promotes the tip, and
// reads the reference's, the tip's, and the arrow's centres from `getBoundingClientRect()`.
async function measureArrow(
	offset: number,
	styleArrow: (arrow: HTMLElement, anchorName: string) => void,
): Promise<Reading> {
	const anchorName = createAnchorName()
	const reference = buildReference(anchorName)
	const referenceCentre = REFERENCE_LEFT + REFERENCE_WIDTH / 2
	const tip = buildPromoted(
		`left:${referenceCentre - TIP_WIDTH / 2 + offset}px;top:140px;width:${TIP_WIDTH}px;height:30px;background:#eee`,
	)
	const arrow = document.createElement('div')
	arrow.style.width = `${ARROW_SIZE}px`
	arrow.style.height = `${ARROW_SIZE}px`
	arrow.style.background = '#000'
	styleArrow(arrow, anchorName)
	tip.append(arrow)
	document.body.append(tip)
	try {
		tip.showPopover()
		await twoFrames()
		const measuredReference = centreX(reference)
		const tipCentre = centreX(tip)
		const arrowCentre = centreX(arrow)
		return {
			offset,
			referenceCentre: round2(measuredReference),
			tipCentre: round2(tipCentre),
			arrowCentre: round2(arrowCentre),
			arrowMinusReference: round2(arrowCentre - measuredReference),
			arrowMinusTip: round2(arrowCentre - tipCentre),
			arrowLeftComputed: getComputedStyle(arrow).left,
		}
	} finally {
		if (tip.matches(':popover-open')) tip.hidePopover()
		tip.remove()
		reference.remove()
	}
}

function styleAnchorCenter(arrow: HTMLElement, anchorName: string): void {
	arrow.style.position = 'absolute'
	arrow.style.top = '0px'
	arrow.style.setProperty('position-anchor', anchorName)
	arrow.style.setProperty('justify-self', 'anchor-center')
}

function styleAnchorFunction(arrow: HTMLElement, anchorName: string): void {
	arrow.style.position = 'absolute'
	arrow.style.top = '0px'
	arrow.style.setProperty('position-anchor', anchorName)
	arrow.style.left = `calc(anchor(${anchorName} center) - ${ARROW_SIZE / 2}px)`
}

// Observation beyond the brief's two methods: the same anchor-center arrow with `position: fixed`,
// whose containing block is the viewport rather than the tip.
function styleFixedAnchorCenter(arrow: HTMLElement, anchorName: string): void {
	arrow.style.position = 'fixed'
	arrow.style.top = '140px'
	arrow.style.setProperty('position-anchor', anchorName)
	arrow.style.setProperty('justify-self', 'anchor-center')
}

// The control: an element outside any tip, promoted on its own, anchored to the reference.
async function measureStandalone(style: (element: HTMLElement, anchorName: string) => void): Promise<Reading> {
	const anchorName = createAnchorName()
	const reference = buildReference(anchorName)
	const element = buildPromoted(`top:200px;width:${ARROW_SIZE}px;height:${ARROW_SIZE}px;background:#000`)
	style(element, anchorName)
	document.body.append(element)
	try {
		element.showPopover()
		await twoFrames()
		const referenceCentre = centreX(reference)
		const elementCentre = centreX(element)
		return {
			referenceCentre: round2(referenceCentre),
			elementCentre: round2(elementCentre),
			delta: round2(elementCentre - referenceCentre),
		}
	} finally {
		if (element.matches(':popover-open')) element.hidePopover()
		element.remove()
		reference.remove()
	}
}

function readDelta(reading: Reading): number | undefined {
	if (typeof reading !== 'object' || reading === null) return undefined
	const delta: unknown = Reflect.get(reading, 'delta')
	return typeof delta === 'number' ? delta : undefined
}

describe('J-NATIVE-PROBE round 3 arrow rows: does an arrow inside the promoted tip anchor to the reference', () => {
	it('reads the arrow at three tip offsets under both methods against a standalone control', async () => {
		const controls = createControls()
		await measure('arrow.support', () => ({
			anchorCenter: CSS.supports('justify-self', 'anchor-center'),
			anchorFunction: CSS.supports('left', 'anchor(--vn-probe center)'),
			positionAnchor: CSS.supports('position-anchor', '--vn-probe'),
		}))

		// The control: a standalone promoted element with `justify-self: anchor-center` must centre on
		// the reference within 1px. If it does not, anchor-centring itself is broken on this build.
		const standaloneCenter = await measure('control.arrow.standalone.anchorCenter', () =>
			measureStandalone((element, anchorName) => {
				element.style.setProperty('position-anchor', anchorName)
				element.style.setProperty('justify-self', 'anchor-center')
			}),
		)
		const centerDelta = readDelta(standaloneCenter)
		controls.check(
			'control.arrow.standalone.anchorCenter',
			'|delta| < 1',
			centerDelta,
			centerDelta !== undefined && Math.abs(centerDelta) < 1,
		)
		// The same control for the second method, `left: anchor(<name> center)` less half the width.
		const standaloneFunction = await measure('control.arrow.standalone.anchorFunction', () =>
			measureStandalone((element, anchorName) => {
				element.style.left = `calc(anchor(${anchorName} center) - ${ARROW_SIZE / 2}px)`
			}),
		)
		const functionDelta = readDelta(standaloneFunction)
		controls.check(
			'control.arrow.standalone.anchorFunction',
			'|delta| < 1',
			functionDelta,
			functionDelta !== undefined && Math.abs(functionDelta) < 1,
		)

		for (const [label, offset] of TIP_OFFSETS) {
			await measure(`arrow.anchorCenter.${label}`, () => measureArrow(offset, styleAnchorCenter))
		}
		for (const [label, offset] of TIP_OFFSETS) {
			await measure(`arrow.anchorFunction.${label}`, () => measureArrow(offset, styleAnchorFunction))
		}
		for (const [label, offset] of TIP_OFFSETS) {
			await measure(`arrow.fixedArrow.anchorCenter.${label}`, () => measureArrow(offset, styleFixedAnchorCenter))
		}
		expect(controls.failures).toEqual([])
	})
})

// ---------------------------------------------------------------------------------------------------
// `V.*` rows for E29's `position-visibility: anchors-visible`. Real Dropdown, Tooltip, and Popover
// engines, the shipped cascade, and each scenario run twice: once under the candidate rule and once
// under the `position-visibility: always` control.
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

interface Engine {
	readonly shown: boolean
	show(): Promise<boolean>
	hide(): Promise<boolean>
	destroy(): void
}

interface Recorder {
	phase: string
	readonly entries: string[]
}

interface VFixture {
	readonly reference: HTMLElement
	readonly scroller: HTMLElement | undefined
	readonly overlay: () => HTMLElement | undefined
	readonly engine: Engine
	readonly recorder: Recorder
	readonly teardown: () => void
}

function createRecorderOn(host: HTMLElement, names: readonly string[]): Recorder {
	const recorder: Recorder = { phase: 'build', entries: [] }
	for (const name of names) {
		host.addEventListener(name, () => recorder.entries.push(`${recorder.phase}:${name}`))
	}
	return recorder
}

// A 200px spacer, then a 300x150 scroller whose content is a 60px lead, the slot, and an 800px tail,
// so the area above the scroller stays inside the viewport when the reference scrolls out of it.
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

function buildScrolledDropdown(): VFixture {
	const page = buildScrollerPage()
	const { toggle, menu, dropdown } = buildDropdownIn(page.slot)
	return {
		reference: toggle,
		scroller: page.scroller,
		overlay: () => menu,
		engine: dropdown,
		recorder: createRecorderOn(toggle, Object.values(DROPDOWN_EVENTS)),
		teardown: page.teardown,
	}
}

function buildViewportDropdown(): VFixture {
	const lead = document.createElement('div')
	lead.style.height = '200px'
	const holder = document.createElement('div')
	const tail = document.createElement('div')
	tail.style.height = '3000px'
	document.body.append(lead, holder, tail)
	const { toggle, menu, dropdown } = buildDropdownIn(holder)
	return {
		reference: toggle,
		scroller: undefined,
		overlay: () => menu,
		engine: dropdown,
		recorder: createRecorderOn(toggle, Object.values(DROPDOWN_EVENTS)),
		teardown: () => {
			lead.remove()
			holder.remove()
			tail.remove()
		},
	}
}

function buildScrolledTip(profile: 'tooltip' | 'popover'): VFixture {
	const page = buildScrollerPage()
	const trigger = document.createElement('button')
	trigger.type = 'button'
	trigger.textContent = 'trigger'
	page.slot.append(trigger)
	const interactions = { hover: false, focus: false, click: false }
	const engine =
		profile === 'tooltip'
			? new Tooltip(trigger, { title: 'tip text', trigger: interactions })
			: new Popover(trigger, { content: 'popover text', trigger: interactions })
	return {
		reference: trigger,
		scroller: page.scroller,
		overlay: () => {
			const found = document.querySelector(`.${profile}`)
			return found instanceof HTMLElement ? found : undefined
		},
		engine,
		recorder: createRecorderOn(trigger, Object.values(profile === 'tooltip' ? TOOLTIP_EVENTS : POPOVER_EVENTS)),
		teardown: page.teardown,
	}
}

function describeElement(element: Element | null): string | null {
	if (element === null) return null
	const classes = element instanceof HTMLElement && element.className !== '' ? `.${element.className.trim().split(/\s+/).join('.')}` : ''
	return `${element.tagName.toLowerCase()}${classes}`
}

// Reads the overlay's current rectangle, the hit test at its current centre when that centre is
// inside the viewport, its visibility checks, and its popover state.
function readOverlay(overlay: HTMLElement | undefined): Reading {
	if (overlay === undefined) return { present: false }
	const rect = overlay.getBoundingClientRect()
	const x = rect.left + rect.width / 2
	const y = rect.top + rect.height / 2
	const inViewport = x >= 0 && x < window.innerWidth && y >= 0 && y < window.innerHeight
	const hit = inViewport ? document.elementFromPoint(x, y) : null
	return {
		rect: { left: round2(rect.left), top: round2(rect.top), width: round2(rect.width), height: round2(rect.height) },
		centreInViewport: inViewport,
		hitIsOverlay: inViewport ? hit !== null && overlay.contains(hit) : null,
		hit: describeElement(hit),
		checkVisibility: overlay.checkVisibility(),
		checkVisibilityWithVisibility: overlay.checkVisibility({ visibilityProperty: true }),
		visibility: getComputedStyle(overlay).visibility,
		positionVisibility: getComputedStyle(overlay).getPropertyValue('position-visibility'),
		open: overlay.matches(':popover-open'),
	}
}

async function settle(description: string, condition: () => boolean): Promise<boolean> {
	try {
		await waitForCondition(description, condition, { budget: 1000, interval: 16 })
		return true
	} catch {
		return false
	}
}

function scrollerClipFull(fixture: VFixture): Reading {
	const scroller = fixture.scroller
	if (scroller === undefined) throw new Error('the full clip needs a scroller')
	const distance = Math.ceil(fixture.reference.getBoundingClientRect().bottom - scroller.getBoundingClientRect().top + 20)
	scroller.scrollTop += distance
	return { distance, scrollTop: scroller.scrollTop }
}

function scrollerClipPartial(fixture: VFixture): Reading {
	const scroller = fixture.scroller
	if (scroller === undefined) throw new Error('the partial clip needs a scroller')
	const reference = fixture.reference.getBoundingClientRect()
	const distance = Math.round(reference.top - scroller.getBoundingClientRect().top + reference.height / 2)
	scroller.scrollTop += distance
	return { distance, scrollTop: scroller.scrollTop }
}

function scrollerRestore(fixture: VFixture): void {
	if (fixture.scroller !== undefined) fixture.scroller.scrollTop = 0
}

// Scrolls the document until the reference's bottom edge sits 4px above the viewport's top edge.
function viewportClip(fixture: VFixture): Reading {
	const distance = Math.ceil(fixture.reference.getBoundingClientRect().bottom + 4)
	window.scrollBy(0, distance)
	return { distance, scrollY: window.scrollY }
}

function viewportRestore(): void {
	window.scrollTo(0, 0)
}

function hitOf(reading: Reading): unknown {
	return typeof reading === 'object' && reading !== null ? Reflect.get(reading, 'hitIsOverlay') : undefined
}

function readHit(reading: Reading, phase: string): unknown {
	if (typeof reading !== 'object' || reading === null) return undefined
	const part: unknown = Reflect.get(reading, phase)
	if (typeof part !== 'object' || part === null) return undefined
	return Reflect.get(part, 'hitIsOverlay')
}

// One run of one scenario under one rule: trusted focus on the reference, show, clip, restore,
// Escape, hide, a second show, then destroy, with the overlay read after each step.
async function runScenario(
	rule: string,
	build: () => VFixture,
	clip: (fixture: VFixture) => Reading,
	restore: (fixture: VFixture) => void,
): Promise<Reading> {
	const style = installCascade(rule)
	const fixture = build()
	const { engine, recorder } = fixture
	try {
		await userEvent.click(fixture.reference)
		recorder.phase = 'show'
		const firstShow = await engine.show()
		await twoFrames()
		const before = readOverlay(fixture.overlay())
		recorder.phase = 'clip'
		const scroll = clip(fixture)
		await twoFrames()
		const clipped = { ...Object(readOverlay(fixture.overlay())), shown: engine.shown }
		recorder.phase = 'restore'
		restore(fixture)
		await twoFrames()
		const restored = { ...Object(readOverlay(fixture.overlay())), shown: engine.shown }
		const activeIsReference = document.activeElement === fixture.reference
		recorder.phase = 'escape'
		await userEvent.keyboard('{Escape}')
		const escapeClosed = await settle('the engine reports hidden after Escape', () => !engine.shown)
		const afterEscape = { closed: escapeClosed, open: fixture.overlay()?.matches(':popover-open') ?? false, shown: engine.shown }
		recorder.phase = 'hide'
		const hideResult = await engine.hide()
		await twoFrames()
		const afterHide = { result: hideResult, open: fixture.overlay()?.matches(':popover-open') ?? false, shown: engine.shown }
		recorder.phase = 'secondShow'
		const secondShowResult = await engine.show()
		await twoFrames()
		const afterSecondShow = {
			result: secondShowResult,
			open: fixture.overlay()?.matches(':popover-open') ?? false,
			shown: engine.shown,
			hitIsOverlay: hitOf(readOverlay(fixture.overlay())),
		}
		recorder.phase = 'destroy'
		engine.destroy()
		await twoFrames()
		const afterDestroy = { open: fixture.overlay()?.matches(':popover-open') ?? false, shown: engine.shown, present: fixture.overlay() !== undefined }
		return {
			firstShow,
			before,
			scroll,
			clipped,
			restored,
			activeIsReference,
			afterEscape,
			afterHide,
			afterSecondShow,
			afterDestroy,
			events: [...recorder.entries],
		}
	} finally {
		engine.destroy()
		fixture.teardown()
		style.remove()
		window.scrollTo(0, 0)
		await twoFrames()
	}
}

// Runs a scenario under both rules and reports whether the hit test at the overlay's current centre
// differs between them while clipped, the one reading the brief admits as evidence.
async function runBoth(
	build: () => VFixture,
	clip: (fixture: VFixture) => Reading,
	restore: (fixture: VFixture) => void,
): Promise<Reading> {
	const runs: Record<string, Reading> = {}
	for (const [label, rule] of RULES) runs[label] = await runScenario(rule, build, clip, restore)
	const candidateHit = readHit(runs.candidate, 'clipped')
	const alwaysHit = readHit(runs.always, 'clipped')
	const comparable = typeof candidateHit === 'boolean' && typeof alwaysHit === 'boolean'
	return { differs: comparable ? candidateHit !== alwaysHit : null, ...runs }
}

describe('J-NATIVE-PROBE round 3 V.* rows: anchors-visible against the always control', () => {
	it('measures every scenario under the candidate rule and the always control', async () => {
		const controls = createControls()
		await measure('V.support', () => ({
			anchorsVisible: CSS.supports('position-visibility', 'anchors-visible'),
			anchorVisible: CSS.supports('position-visibility', 'anchor-visible'),
			always: CSS.supports('position-visibility', 'always'),
			initial: getComputedStyle(document.body).getPropertyValue('position-visibility'),
		}))
		await measure('V.viewportSize', () => ({ width: window.innerWidth, height: window.innerHeight }))

		// Instrument control: the hit test at the overlay's centre must find the shown overlay, and must
		// not find it after an inline `visibility: hidden` on the same overlay.
		const hitControl = await measure('control.V.hitTest', async () => {
			const style = installCascade(CONTROL_RULE)
			const fixture = buildScrolledDropdown()
			try {
				await fixture.engine.show()
				await twoFrames()
				const visible = hitOf(readOverlay(fixture.overlay()))
				fixture.overlay()?.style.setProperty('visibility', 'hidden')
				await twoFrames()
				const hidden = hitOf(readOverlay(fixture.overlay()))
				fixture.overlay()?.style.removeProperty('visibility')
				return { visible, hidden }
			} finally {
				fixture.engine.destroy()
				fixture.teardown()
				style.remove()
			}
		})
		controls.check(
			'control.V.hitTest',
			{ visible: true, hidden: false },
			hitControl,
			JSON.stringify(hitControl) === JSON.stringify({ visible: true, hidden: false }),
		)

		const clipDropdown = await measure('V.clip.dropdown', () =>
			runBoth(buildScrolledDropdown, scrollerClipFull, scrollerRestore),
		)
		// The always control must keep the fully clipped overlay hit-testable: its reading is what the
		// candidate run is compared against.
		const alwaysClipHit = readHit(typeof clipDropdown === 'object' && clipDropdown !== null ? Reflect.get(clipDropdown, 'always') : undefined, 'clipped')
		controls.check('V.clip.dropdown.always.clippedHitIsOverlay', true, alwaysClipHit, alwaysClipHit === true)

		await measure('V.partial', () => runBoth(buildScrolledDropdown, scrollerClipPartial, scrollerRestore))
		await measure('V.viewport', () => runBoth(buildViewportDropdown, viewportClip, viewportRestore))
		await measure('V.tooltip', () =>
			runBoth(() => buildScrolledTip('tooltip'), scrollerClipFull, scrollerRestore),
		)
		await measure('V.popover', () =>
			runBoth(() => buildScrolledTip('popover'), scrollerClipFull, scrollerRestore),
		)

		// V.focus: focus inside the menu, then the full clip; reads whether focus leaves the overlay.
		await measure('V.focus', async () => {
			const runs: Record<string, Reading> = {}
			for (const [label, rule] of RULES) {
				const style = installCascade(rule)
				const fixture = buildScrolledDropdown()
				try {
					await fixture.engine.show()
					await twoFrames()
					const entry = fixture.overlay()?.querySelector('a')
					if (!(entry instanceof HTMLElement)) throw new Error('no dropdown entry to focus')
					entry.focus()
					const focusedBefore = document.activeElement === entry
					scrollerClipFull(fixture)
					await twoFrames()
					const focusedDuringClip = document.activeElement === entry
					const activeDuringClip = describeElement(document.activeElement)
					const overlayDuringClip = readOverlay(fixture.overlay())
					scrollerRestore(fixture)
					await twoFrames()
					runs[label] = {
						focusedBefore,
						focusedDuringClip,
						activeDuringClip,
						hitIsOverlayDuringClip: hitOf(overlayDuringClip),
						focusedAfterRestore: document.activeElement === entry,
					}
				} finally {
					fixture.engine.destroy()
					fixture.teardown()
					style.remove()
				}
			}
			const candidate = runs.candidate
			const always = runs.always
			const focusOf = (reading: Reading): unknown =>
				typeof reading === 'object' && reading !== null ? Reflect.get(reading, 'focusedDuringClip') : undefined
			return { differs: focusOf(candidate) !== focusOf(always), ...runs }
		})

		// V.events: the dropdown's own events during the clip. The show must record show and shown, so
		// the recorder is proved able to read a non-empty list.
		const eventsRow = await measure('V.events', async () => {
			const runs: Record<string, Reading> = {}
			for (const [label, rule] of RULES) {
				const style = installCascade(rule)
				const fixture = buildScrolledDropdown()
				try {
					fixture.recorder.phase = 'show'
					await fixture.engine.show()
					await twoFrames()
					const duringShow = [...fixture.recorder.entries]
					fixture.recorder.entries.length = 0
					fixture.recorder.phase = 'clip'
					scrollerClipFull(fixture)
					await twoFrames()
					const duringClip = [...fixture.recorder.entries]
					fixture.recorder.phase = 'restore'
					scrollerRestore(fixture)
					await twoFrames()
					runs[label] = { duringShow, duringClip, afterRestore: [...fixture.recorder.entries] }
				} finally {
					fixture.engine.destroy()
					fixture.teardown()
					style.remove()
				}
			}
			return runs
		})
		const showEvents =
			typeof eventsRow === 'object' && eventsRow !== null
				? JSON.stringify(Reflect.get(Object(Reflect.get(eventsRow, 'candidate')), 'duringShow'))
				: undefined
		const expectedShow = JSON.stringify([`show:${DROPDOWN_EVENTS.show}`, `show:${DROPDOWN_EVENTS.shown}`])
		controls.check('V.events.recorder', expectedShow, showEvents, showEvents === expectedShow)

		expect(controls.failures).toEqual([])
	})
})
