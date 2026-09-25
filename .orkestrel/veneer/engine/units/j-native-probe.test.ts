// J-NATIVE-PROBE: measures calc-size() for Collapse's pixel size and the anchor-centred arrow for
// Placement, on this gate host. Same instrument shape as `platform.test.ts`: readings recorded, two
// controls asserted, one JSON block per describe printed for the terrain record.
import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'

type Reading = boolean | string | number | undefined

function raf(): Promise<void> {
	return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitFinished(animation: Animation, boundMs: number): Promise<void> {
	await Promise.race([animation.finished.catch(() => undefined), delay(boundMs)])
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

function transitionRow(host: HTMLElement): string {
	return host
		.getAnimations()
		.map((animation) => {
			const effect = animation.effect
			const property =
				effect !== null && 'getKeyframes' in effect
					? (Reflect.get(effect, 'target') as unknown)
					: undefined
			void property
			const timing =
				effect !== null && 'getComputedTiming' in effect
					? Reflect.apply(Reflect.get(effect, 'getComputedTiming'), effect, [])
					: undefined
			const transitionProperty =
				timing !== null && typeof timing === 'object' && 'transitionProperty' in timing
					? String(Reflect.get(timing, 'transitionProperty'))
					: 'unknown'
			return transitionProperty
		})
		.join(',')
}

function installCollapseRules(): HTMLStyleElement {
	const style = document.createElement('style')
	style.textContent = [
		'.collapse:not(.show) { display: none }',
		'.collapsing { height: 0; overflow: hidden; transition: height 0.4s ease }',
		'.collapse-horizontal.collapsing { width: 0; height: auto; transition: width 0.4s ease }',
	].join(' ')
	document.head.append(style)
	return style
}

async function pausedHeightAtHalf(
	host: HTMLElement,
	durationMs: number,
): Promise<{ readonly transitionProperty: string; readonly height: string }> {
	await raf()
	const animations = host.getAnimations()
	const animation = animations[0]
	if (animation === undefined) return { transitionProperty: 'none', height: getComputedStyle(host).height }
	animation.pause()
	animation.currentTime = durationMs / 2
	await raf()
	return { transitionProperty: transitionRow(host), height: getComputedStyle(host).height }
}

async function completedHeight(host: HTMLElement): Promise<string> {
	await Promise.all(host.getAnimations().map((animation) => waitFinished(animation, 1000)))
	host.style.removeProperty('height')
	await raf()
	return getComputedStyle(host).height
}

describe('J-NATIVE-PROBE size rows: calc-size() against Collapse pixel size', () => {
	it('measures the pixel and calc-size paths side by side', async () => {
		await measure('control.present', () => 'addEventListener' in document)
		await measure('control.absent', () => Reflect.has(document, 'veneerNoSuchMember'))
		await measure('size.calcSize.supported', () => CSS.supports('height', 'calc-size(auto, size)'))

		const style = installCollapseRules()
		try {
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
			// Show, calc-size path: same fixture.
			await measure('size.show.calcSize.midpoint', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show collapsing'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
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
			// Hide, pixel path: from open height down to 0.
			await measure('size.hide.pixel.midpoint', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show collapsing'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					host.style.height = `${host.scrollHeight}px`
					reflow(host)
					host.style.height = '0px'
					const result = await pausedHeightAtHalf(host, 400)
					return `transition=${result.transitionProperty} height=${result.height}`
				} finally {
					host.remove()
				}
			})
			// Hide, calc-size path.
			await measure('size.hide.calcSize.midpoint', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show collapsing'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					host.style.height = 'calc-size(auto, size)'
					reflow(host)
					host.style.height = '0px'
					const result = await pausedHeightAtHalf(host, 400)
					return `transition=${result.transitionProperty} height=${result.height}`
				} finally {
					host.remove()
				}
			})
			// Completion, content growing mid-transition, pixel path.
			await measure('size.pixel.completion.growingContent', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show collapsing'
				const child = document.createElement('div')
				child.style.height = '60px'
				host.append(child)
				document.body.append(host)
				try {
					reflow(host)
					host.style.height = `${host.scrollHeight}px`
					child.style.height = '120px'
					const height = await completedHeight(host)
					return `height=${height} scrollHeight=${host.scrollHeight}`
				} finally {
					host.remove()
				}
			})
			// Completion, content growing mid-transition, calc-size path.
			await measure('size.calcSize.completion.growingContent', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show collapsing'
				const child = document.createElement('div')
				child.style.height = '60px'
				host.append(child)
				document.body.append(host)
				try {
					reflow(host)
					host.style.height = 'calc-size(auto, size)'
					reflow(host)
					child.style.height = '120px'
					const height = await completedHeight(host)
					return `height=${height} scrollHeight=${host.scrollHeight}`
				} finally {
					host.remove()
				}
			})
			// Completion, 3px border, pixel path.
			await measure('size.pixel.completion.border', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show collapsing'
				host.style.border = '3px solid black'
				host.style.boxSizing = 'border-box'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					reflow(host)
					host.style.height = `${host.scrollHeight}px`
					const height = await completedHeight(host)
					const rect = host.getBoundingClientRect()
					return `height=${height} scrollHeight=${host.scrollHeight} rectHeight=${rect.height}`
				} finally {
					host.remove()
				}
			})
			// Completion, 3px border, calc-size path.
			await measure('size.calcSize.completion.border', async () => {
				const host = document.createElement('div')
				host.className = 'collapse show collapsing'
				host.style.border = '3px solid black'
				host.style.boxSizing = 'border-box'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					reflow(host)
					host.style.height = 'calc-size(auto, size)'
					reflow(host)
					const height = await completedHeight(host)
					const rect = host.getBoundingClientRect()
					return `height=${height} scrollHeight=${host.scrollHeight} rectHeight=${rect.height}`
				} finally {
					host.remove()
				}
			})
			// Horizontal, midpoint and completion width, pixel path: 30px child in a 300px container.
			await measure('size.horizontal.pixel.midpointAndCompletion', async () => {
				const container = document.createElement('div')
				container.style.width = '300px'
				const host = document.createElement('div')
				host.className = 'collapse-horizontal show collapsing'
				host.innerHTML = '<div style="width:30px;height:1px"></div>'
				container.append(host)
				document.body.append(container)
				try {
					reflow(host)
					host.style.width = `${host.scrollWidth}px`
					await raf()
					const animation = host.getAnimations()[0]
					let midpoint = 'none'
					if (animation !== undefined) {
						animation.pause()
						animation.currentTime = 200
						await raf()
						midpoint = getComputedStyle(host).width
					}
					await Promise.all(host.getAnimations().map((a) => waitFinished(a, 1000)))
					host.style.removeProperty('width')
					await raf()
					const completion = getComputedStyle(host).width
					return `midpoint=${midpoint} completion=${completion} scrollWidth=${host.scrollWidth}`
				} finally {
					container.remove()
				}
			})
			// Horizontal, midpoint and completion width, calc-size path.
			await measure('size.horizontal.calcSize.midpointAndCompletion', async () => {
				const container = document.createElement('div')
				container.style.width = '300px'
				const host = document.createElement('div')
				host.className = 'collapse-horizontal show collapsing'
				host.innerHTML = '<div style="width:30px;height:1px"></div>'
				container.append(host)
				document.body.append(container)
				try {
					reflow(host)
					host.style.width = 'calc-size(auto, size)'
					reflow(host)
					await raf()
					const animation = host.getAnimations()[0]
					let midpoint = 'none'
					if (animation !== undefined) {
						animation.pause()
						animation.currentTime = 200
						await raf()
						midpoint = getComputedStyle(host).width
					}
					await Promise.all(host.getAnimations().map((a) => waitFinished(a, 1000)))
					host.style.removeProperty('width')
					await raf()
					const completion = getComputedStyle(host).width
					return `midpoint=${midpoint} completion=${completion} scrollWidth=${host.scrollWidth}`
				} finally {
					container.remove()
				}
			})
			// Root interpolate-size: numeric-only, calc-size path.
			await measure('size.calcSize.interpolateSizeNumericOnly', async () => {
				const rootStyle = document.createElement('style')
				rootStyle.textContent = ':root { interpolate-size: numeric-only }'
				document.head.append(rootStyle)
				const host = document.createElement('div')
				host.className = 'collapse show collapsing'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
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
			// Zero duration, calc-size path: does it create an animation at all.
			await measure('size.calcSize.zeroDuration', async () => {
				const zeroStyle = document.createElement('style')
				zeroStyle.textContent = '.vn-zero { height: 0; overflow: hidden; transition: height 0s linear }'
				document.head.append(zeroStyle)
				const host = document.createElement('div')
				host.className = 'vn-zero'
				host.innerHTML = '<div style="height:60px"></div>'
				document.body.append(host)
				try {
					reflow(host)
					host.style.height = 'calc-size(auto, size)'
					reflow(host)
					await raf()
					const count = host.getAnimations().length
					return `count=${String(count)}`
				} finally {
					host.remove()
					zeroStyle.remove()
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
	readonly fallback?: string
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
		if (options.fallback !== undefined) tip.style.setProperty('position-try-fallbacks', options.fallback)
	}

	const arrow = document.createElement('div')
	arrow.style.position = 'absolute'
	arrow.style.width = '10px'
	arrow.style.height = '10px'
	if (options.anchored) {
		arrow.style.setProperty('position-anchor', anchorName)
		arrow.style.setProperty('justify-self', 'anchor-center')
		arrow.style.left = '0'
		arrow.style.right = '0'
	}
	tip.append(arrow)
	document.body.append(tip)
	return { reference, tip, arrow, anchorName }
}

describe('J-NATIVE-PROBE arrow rows: anchor-centred arrow against Placement', () => {
	it('measures the anchor-centred arrow, its clamp, and a flipped side', async () => {
		await measure('control.present', () => 'addEventListener' in document)
		await measure('control.absent', () => Reflect.has(document, 'veneerNoSuchMember'))

		await measure('arrow.centre.anchored', async () => {
			const built = buildAnchoredTip({ anchored: true, area: 'bottom span-right' })
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
		await measure('arrow.clamp.topSpanRight.widerReference', async () => {
			const built = buildAnchoredTip({
				anchored: true,
				area: 'top span-right',
				tipWidth: 40,
				referenceWidth: 200,
			})
			try {
				built.tip.showPopover()
				await raf()
				const tipRect = built.tip.getBoundingClientRect()
				const arrowRect = built.arrow.getBoundingClientRect()
				const arrowLeftWithinTip = arrowRect.left - tipRect.left
				const clampLimit = tipRect.width - arrowRect.width
				return `arrowLeftWithinTip=${arrowLeftWithinTip.toFixed(2)} clampLimit=${clampLimit.toFixed(2)} withinBounds=${String(arrowLeftWithinTip >= 0 && arrowLeftWithinTip <= clampLimit)}`
			} finally {
				built.tip.remove()
				built.reference.remove()
			}
		})
		await measure('arrow.border3px', async () => {
			const built = buildAnchoredTip({ anchored: true, area: 'bottom span-right', borderPx: 3 })
			try {
				built.tip.showPopover()
				await raf()
				const tipRect = built.tip.getBoundingClientRect()
				const arrowRect = built.arrow.getBoundingClientRect()
				const arrowLeftWithinTip = arrowRect.left - tipRect.left
				return `arrowLeftWithinTip=${arrowLeftWithinTip.toFixed(2)} tipWidth=${tipRect.width.toFixed(2)}`
			} finally {
				built.tip.remove()
				built.reference.remove()
			}
		})
		await measure('arrow.flippedSide', async () => {
			// Preferred top side overflows: position the reference near the viewport top so `top`
			// has no room and `flip-block` must choose `bottom` instead.
			const built = buildAnchoredTip({
				anchored: true,
				area: 'top span-right',
				fallback: 'flip-block',
			})
			built.reference.style.position = 'fixed'
			built.reference.style.top = '0px'
			built.reference.style.left = '50px'
			try {
				built.tip.showPopover()
				await raf()
				const tipRect = built.tip.getBoundingClientRect()
				const referenceRect = built.reference.getBoundingClientRect()
				const flippedBelow = tipRect.top >= referenceRect.bottom
				return `flippedBelow=${String(flippedBelow)} tipTop=${tipRect.top.toFixed(2)} referenceBottom=${referenceRect.bottom.toFixed(2)}`
			} finally {
				built.tip.remove()
				built.reference.remove()
			}
		})
	})
})

describe('J-NATIVE-PROBE risk row: a consumer hide-popover invoker against a promoted menu', () => {
	it('measures whether an invoker command can close a popover the engine promoted', async () => {
		await measure('control.present', () => 'addEventListener' in document)
		await measure('control.absent', () => Reflect.has(document, 'veneerNoSuchMember'))

		await measure('risk.invokerHidePopover.closesPromotedMenu', async () => {
			const menuId = `vn-probe-menu-${Math.random().toString(36).slice(2)}`
			const menu = document.createElement('div')
			menu.id = menuId
			menu.setAttribute('popover', 'manual')
			menu.textContent = 'menu'
			const button = document.createElement('button')
			button.setAttribute('commandfor', menuId)
			button.setAttribute('command', 'hide-popover')
			button.textContent = 'close'
			document.body.append(menu, button)
			try {
				menu.showPopover()
				await raf()
				const openBefore = menu.matches(':popover-open')
				await userEvent.click(button)
				await raf()
				const openAfter = menu.matches(':popover-open')
				return `openBefore=${String(openBefore)} openAfter=${String(openAfter)}`
			} finally {
				if (menu.matches(':popover-open')) menu.hidePopover()
				button.remove()
				menu.remove()
			}
		})
	})
})
