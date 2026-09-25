// J-NATIVE-PROBE round 2: corrects the size and arrow rows round 1 measured through the wrong
// method, and adds the `V.*` rows for `position-visibility: anchors-visible` (E29). Same
// instrument shape as `j-native-probe.test.ts`: readings recorded, controls asserted, one `ROW`
// line per reading for the terrain record.
import { Dropdown, Placement, Popover, Tooltip } from '@src/browser'
import { describe, expect, it } from 'vitest'
import tokensCascade from '../../src/styles/_tokens.scss?inline'
import dropdownCascade from '../../src/styles/components/_dropdown.scss?inline'
import tooltipCascade from '../../src/styles/components/_tooltip.scss?inline'
import popoverCascade from '../../src/styles/components/_popover.scss?inline'

type Reading = boolean | string | number | undefined

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

async function measure(name: string, produce: () => Reading | Promise<Reading>): Promise<void> {
	try {
		row(name, await produce())
	} catch (error) {
		row(name, `throws: ${error instanceof Error ? error.message : String(error)}`)
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

function installCollapseRules(): HTMLStyleElement {
	const style = document.createElement('style')
	style.textContent = [
		'.collapse:not(.show) { display: none }',
		'.collapsing { height: 0; overflow: hidden; transition: height 0.4s ease }',
	].join(' ')
	document.head.append(style)
	return style
}

describe('J-NATIVE-PROBE round 2 size rows: the corrected transition property and the Bootstrap hide sequence', () => {
	it('measures the pixel path with the corrected instrument', async () => {
		await measure('control.present', () => 'addEventListener' in document)
		await measure('control.absent', () => Reflect.has(document, 'veneerNoSuchMember'))

		const style = installCollapseRules()
		try {
			// Control: an opacity-only transition, whose transitionRow must read exactly ["opacity"].
			await measure('control.transitionProperty.opacity', async () => {
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
			await measure('control.completion.static', () => {
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
		} finally {
			style.remove()
		}
	})
})

function buildAnchoredTip(options: {
	readonly anchored: boolean
	readonly area: string
	readonly borderPx?: number
	readonly tipWidth?: number
	readonly referenceWidth?: number
}): { readonly reference: HTMLElement; readonly tip: HTMLElement; readonly arrow: HTMLElement; readonly anchorName: string } {
	const anchorName = `--vn-probe-anchor-${Math.random().toString(36).slice(2)}`
	const reference = document.createElement('button')
	reference.textContent = 'reference'
	reference.style.width = `${options.referenceWidth ?? 40}px`
	reference.style.height = '20px'
	if (options.anchored) reference.style.setProperty('anchor-name', anchorName)
	document.body.append(reference)

	const tip = document.createElement('div')
	tip.setAttribute('popover', 'manual')
	tip.style.position = 'fixed'
	tip.style.width = `${options.tipWidth ?? 80}px`
	tip.style.height = '30px'
	tip.style.padding = '0px'
	if (options.borderPx !== undefined) tip.style.border = `${options.borderPx}px solid black`
	if (options.anchored) {
		tip.style.setProperty('position-anchor', anchorName)
		tip.style.setProperty('position-area', options.area)
	}

	const arrow = document.createElement('div')
	arrow.style.position = 'absolute'
	arrow.style.width = '10px'
	arrow.style.height = '10px'
	if (options.anchored) {
		arrow.style.setProperty('position-anchor', anchorName)
		arrow.style.setProperty('justify-self', 'anchor-center')
	}
	tip.append(arrow)
	document.body.append(tip)
	return { reference, tip, arrow, anchorName }
}

describe('J-NATIVE-PROBE round 2 arrow rows: the arrow coordinates against a control tip', () => {
	it('measures the arrow delta with a control centred exactly over its reference', async () => {
		await measure('control.present', () => 'addEventListener' in document)
		await measure('control.absent', () => Reflect.has(document, 'veneerNoSuchMember'))

		// Control: a tip the width of its reference, centred over it. The anchored arrow must read a
		// delta under 1px.
		await measure('control.arrow.centred', async () => {
			const built = buildAnchoredTip({ anchored: true, area: 'bottom span-all', tipWidth: 40, referenceWidth: 40 })
			try {
				built.tip.showPopover()
				await raf()
				const referenceRect = built.reference.getBoundingClientRect()
				const arrowRect = built.arrow.getBoundingClientRect()
				const referenceCentre = referenceRect.left + referenceRect.width / 2
				const arrowCentre = arrowRect.left + arrowRect.width / 2
				return `delta=${Math.abs(referenceCentre - arrowCentre).toFixed(2)}`
			} finally {
				built.tip.remove()
				built.reference.remove()
			}
		})

		await measure('arrow.centre.anchored', async () => {
			const built = buildAnchoredTip({ anchored: true, area: 'bottom span-right' })
			try {
				built.tip.showPopover()
				await raf()
				const referenceRect = built.reference.getBoundingClientRect()
				const arrowRect = built.arrow.getBoundingClientRect()
				const tipRect = built.tip.getBoundingClientRect()
				const referenceCentre = referenceRect.left + referenceRect.width / 2
				const arrowCentre = arrowRect.left + arrowRect.width / 2
				return `referenceCentre=${referenceCentre.toFixed(2)} arrowCentre=${arrowCentre.toFixed(2)} delta=${Math.abs(referenceCentre - arrowCentre).toFixed(2)} tipLeft=${tipRect.left.toFixed(2)}`
			} finally {
				built.tip.remove()
				built.reference.remove()
			}
		})

		await measure('arrow.centre.control.noAnchor', async () => {
			const built = buildAnchoredTip({ anchored: false, area: 'bottom span-right' })
			try {
				built.tip.showPopover()
				await raf()
				const referenceRect = built.reference.getBoundingClientRect()
				const arrowRect = built.arrow.getBoundingClientRect()
				const referenceCentre = referenceRect.left + referenceRect.width / 2
				const arrowCentre = arrowRect.left + arrowRect.width / 2
				return `referenceCentre=${referenceCentre.toFixed(2)} arrowCentre=${arrowCentre.toFixed(2)} delta=${Math.abs(referenceCentre - arrowCentre).toFixed(2)}`
			} finally {
				built.tip.remove()
				built.reference.remove()
			}
		})
	})
})

// The `V.*` rows for E29's `position-visibility: anchors-visible`. Real Dropdown, Tooltip, and
// Popover engines, the shipped cascade, and a test-local candidate rule scoped to the promoted
// selectors the styles session would add.
const CANDIDATE_RULE =
	':where(.dropdown-menu, .tooltip, .popover):popover-open { position-visibility: anchors-visible }'
const CONTROL_RULE =
	':where(.dropdown-menu, .tooltip, .popover):popover-open { position-visibility: always }'

function installCascade(rule: string): HTMLStyleElement {
	const style = document.createElement('style')
	style.textContent = [tokensCascade, dropdownCascade, tooltipCascade, popoverCascade, rule].join(
		'\n',
	)
	document.head.append(style)
	return style
}

function buildScroller(): HTMLElement {
	const scroller = document.createElement('div')
	scroller.style.cssText = 'width:300px;height:150px;overflow:auto;position:relative'
	const lead = document.createElement('div')
	lead.style.height = '20px'
	const tail = document.createElement('div')
	tail.style.height = '800px'
	scroller.append(lead, tail)
	document.body.append(scroller)
	return scroller
}

function buildDropdown(scroller: HTMLElement): { readonly host: HTMLElement; readonly overlay: HTMLElement; readonly dropdown: Dropdown } {
	const wrap = document.createElement('div')
	wrap.className = 'dropdown'
	const host = document.createElement('button')
	host.textContent = 'toggle'
	host.setAttribute('data-bs-toggle', 'dropdown')
	const overlay = document.createElement('div')
	overlay.className = 'dropdown-menu'
	overlay.innerHTML = '<a class="dropdown-item" href="#">Item</a>'
	wrap.append(host, overlay)
	scroller.insertBefore(wrap, scroller.lastElementChild)
	const dropdown = new Dropdown(host)
	return { host, overlay, dropdown }
}

async function withTip(
	scroller: HTMLElement,
	className: 'tooltip' | 'popover',
	factory: (host: HTMLElement) => Tooltip,
): Promise<{ readonly host: HTMLElement; readonly overlay: HTMLElement; readonly engine: Tooltip }> {
	const host = document.createElement('button')
	host.textContent = 'trigger'
	scroller.insertBefore(host, scroller.lastElementChild)
	const engine = factory(host)
	const shown = await engine.show()
	await twoFrames()
	const overlay = document.querySelector(`.${className}`)
	if (!(overlay instanceof HTMLElement)) {
		throw new Error(`no .${className} tip in the document after show(); shown=${String(shown)}`)
	}
	return { host, overlay, engine }
}

// One shared reading: clip the reference, read the hit test and the native popover-open state,
// restore, read again, then read what Escape, an explicit hide, destroy, and a second show leave.
async function measureClip(
	scroller: HTMLElement,
	overlay: HTMLElement,
	hide: () => Promise<boolean> | boolean,
	show: () => Promise<boolean> | boolean,
	destroy: () => void,
	scroll: (scroller: HTMLElement) => void,
	restore: (scroller: HTMLElement) => void,
): Promise<string> {
	const beforeRect = overlay.getBoundingClientRect()
	const beforeHit = document.elementFromPoint(
		beforeRect.left + beforeRect.width / 2,
		beforeRect.top + beforeRect.height / 2,
	)
	scroll(scroller)
	await twoFrames()
	const clippedOpen = overlay.matches(':popover-open')
	const clippedHit = document.elementFromPoint(
		beforeRect.left + beforeRect.width / 2,
		beforeRect.top + beforeRect.height / 2,
	)
	const clippedHitIsOverlay = clippedHit !== null && overlay.contains(clippedHit)
	restore(scroller)
	await twoFrames()
	const restoredOpen = overlay.matches(':popover-open')
	const afterRect = overlay.getBoundingClientRect()
	const restoredHit = document.elementFromPoint(
		afterRect.left + afterRect.width / 2,
		afterRect.top + afterRect.height / 2,
	)
	const restoredHitIsOverlay = restoredHit !== null && overlay.contains(restoredHit)
	// Escape.
	overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
	await raf()
	const afterEscapeOpen = overlay.matches(':popover-open')
	const afterHide = await hide()
	await raf()
	const afterHideOpen = overlay.matches(':popover-open')
	destroy()
	const afterShow = await show()
	return JSON.stringify({
		beforeHitIsOverlay: beforeHit !== null && overlay.contains(beforeHit),
		clippedOpen,
		clippedHitIsOverlay,
		restoredOpen,
		restoredHitIsOverlay,
		afterEscapeOpen,
		afterHide,
		afterHideOpen,
		afterShow,
	})
}

describe('J-NATIVE-PROBE round 2 V.* rows: anchors-visible support, clipping, viewport, focus, and events', () => {
	it('measures the candidate rule against real Dropdown, Tooltip, and Popover engines', async () => {
		await measure('V.support', () => CSS.supports('position-visibility', 'anchors-visible'))

		// V.clip.dropdown: full clip inside a nested scroller.
		await measure('V.clip.dropdown', async () => {
			const style = installCascade(CANDIDATE_RULE)
			const scroller = buildScroller()
			try {
				const { overlay, dropdown } = buildDropdown(scroller)
				await dropdown.show()
				await twoFrames()
				return await measureClip(
					scroller,
					overlay,
					() => dropdown.hide(),
					() => dropdown.show(),
					() => dropdown.destroy(),
					(host) => {
						host.scrollTop = 400
					},
					(host) => {
						host.scrollTop = 0
					},
				)
			} finally {
				scroller.remove()
				style.remove()
			}
		})

		// V.partial: the reference half inside, half outside the scroller's clip edge.
		await measure('V.partial', async () => {
			const style = installCascade(CANDIDATE_RULE)
			const scroller = buildScroller()
			try {
				const { overlay, dropdown } = buildDropdown(scroller)
				await dropdown.show()
				await twoFrames()
				return await measureClip(
					scroller,
					overlay,
					() => dropdown.hide(),
					() => dropdown.show(),
					() => dropdown.destroy(),
					(host) => {
						host.scrollTop = 30
					},
					(host) => {
						host.scrollTop = 0
					},
				)
			} finally {
				scroller.remove()
				style.remove()
			}
		})

		// V.viewport: the reference scrolled out through the document's own scrolling element,
		// never a nested container.
		await measure('V.viewport', async () => {
			const style = installCascade(CANDIDATE_RULE)
			const spacer = document.createElement('div')
			spacer.style.height = '2000px'
			document.body.append(spacer)
			const wrap = document.createElement('div')
			wrap.className = 'dropdown'
			wrap.style.marginTop = '20px'
			const host = document.createElement('button')
			host.textContent = 'toggle'
			host.setAttribute('data-bs-toggle', 'dropdown')
			const overlay = document.createElement('div')
			overlay.className = 'dropdown-menu'
			overlay.innerHTML = '<a class="dropdown-item" href="#">Item</a>'
			wrap.append(host, overlay)
			document.body.append(wrap)
			const dropdown = new Dropdown(host)
			try {
				await dropdown.show()
				await twoFrames()
				const documentScroller = document.scrollingElement
				if (!(documentScroller instanceof HTMLElement)) throw new Error('no scrolling element')
				return await measureClip(
					documentScroller,
					overlay,
					() => dropdown.hide(),
					() => dropdown.show(),
					() => dropdown.destroy(),
					() => {
						window.scrollTo(0, 1500)
					},
					() => {
						window.scrollTo(0, 0)
					},
				)
			} finally {
				wrap.remove()
				spacer.remove()
				style.remove()
			}
		})

		// V.focus: focus placed inside the overlay, then the reference clipped; reads whether the
		// platform moves focus away from the suppressed overlay.
		await measure('V.focus', async () => {
			const style = installCascade(CANDIDATE_RULE)
			const scroller = buildScroller()
			try {
				const { overlay, dropdown } = buildDropdown(scroller)
				await dropdown.show()
				await twoFrames()
				const entry = overlay.querySelector('a')
				if (!(entry instanceof HTMLElement)) throw new Error('no dropdown entry to focus')
				entry.focus()
				const focusedBefore = document.activeElement === entry
				scroller.scrollTop = 400
				await twoFrames()
				const focusedDuringClip = document.activeElement === entry
				const activeTag = document.activeElement?.tagName
				scroller.scrollTop = 0
				await twoFrames()
				dropdown.destroy()
				return `focusedBefore=${String(focusedBefore)} focusedDuringClip=${String(focusedDuringClip)} activeDuringClip=${String(activeTag)}`
			} finally {
				scroller.remove()
				style.remove()
			}
		})

		// V.events: whether native suppression dispatches any `.vn.` event; a recorder on the
		// dropdown's own event map.
		await measure('V.events', async () => {
			const style = installCascade(CANDIDATE_RULE)
			const scroller = buildScroller()
			const seen: string[] = []
			try {
				const { overlay, dropdown, host } = buildDropdown(scroller)
				for (const type of ['show.bs.dropdown', 'shown.bs.dropdown', 'hide.bs.dropdown', 'hidden.bs.dropdown']) {
					host.addEventListener(type, () => seen.push(type))
				}
				await dropdown.show()
				await twoFrames()
				seen.length = 0
				scroller.scrollTop = 400
				await twoFrames()
				const duringClip = [...seen]
				scroller.scrollTop = 0
				await twoFrames()
				dropdown.destroy()
				void overlay
				return `duringClip=${JSON.stringify(duringClip)}`
			} finally {
				scroller.remove()
				style.remove()
			}
		})

		// V.tooltip: the same full-clip reading with a real Tooltip.
		await measure('V.tooltip', async () => {
			const style = installCascade(CANDIDATE_RULE)
			const scroller = buildScroller()
			try {
				const { overlay, engine, host } = await withTip(
					scroller,
					'tooltip',
					(trigger) => new Tooltip(trigger, { title: 'tip text', trigger: { hover: false, focus: false, click: false } }),
				)
				void host
				return await measureClip(
					scroller,
					overlay,
					() => engine.hide(),
					() => engine.show(),
					() => engine.destroy(),
					(el) => {
						el.scrollTop = 400
					},
					(el) => {
						el.scrollTop = 0
					},
				)
			} finally {
				scroller.remove()
				style.remove()
			}
		})

		// V.popover: the same full-clip reading with a real Popover.
		await measure('V.popover', async () => {
			const style = installCascade(CANDIDATE_RULE)
			const scroller = buildScroller()
			try {
				const { overlay, engine, host } = await withTip(
					scroller,
					'popover',
					(trigger) => new Popover(trigger, { content: 'popover text', trigger: { hover: false, focus: false, click: false } }),
				)
				void host
				return await measureClip(
					scroller,
					overlay,
					() => engine.hide(),
					() => engine.show(),
					() => engine.destroy(),
					(el) => {
						el.scrollTop = 400
					},
					(el) => {
						el.scrollTop = 0
					},
				)
			} finally {
				scroller.remove()
				style.remove()
			}
		})

		// The analyst's control: `position-visibility: always` must fail the suppression reading.
		await measure('V.control.always', async () => {
			const style = installCascade(CONTROL_RULE)
			const scroller = buildScroller()
			try {
				const { overlay, dropdown } = buildDropdown(scroller)
				await dropdown.show()
				await twoFrames()
				const beforeRect = overlay.getBoundingClientRect()
				const beforeHit = document.elementFromPoint(
					beforeRect.left + beforeRect.width / 2,
					beforeRect.top + beforeRect.height / 2,
				)
				scroller.scrollTop = 400
				await twoFrames()
				const clippedOpen = overlay.matches(':popover-open')
				const clippedHit = document.elementFromPoint(
					beforeRect.left + beforeRect.width / 2,
					beforeRect.top + beforeRect.height / 2,
				)
				scroller.scrollTop = 0
				await twoFrames()
				dropdown.destroy()
				return `beforeHitIsOverlay=${String(beforeHit !== null && overlay.contains(beforeHit))} clippedOpen=${String(clippedOpen)} clippedHitIsOverlay=${String(clippedHit !== null && overlay.contains(clippedHit))}`
			} finally {
				scroller.remove()
				style.remove()
			}
		})
	})
})
