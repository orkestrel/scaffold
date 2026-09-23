// J-ENGINE terrain probe: which platform features the installed browser ships. It runs in the
// Playwright-managed Chromium the workspace's browser projects launch, through a scratchpad
// configuration that composes the `srcBrowser` factory over `tmp/probe/**`. It records readings and
// asserts only the two controls, so the JSON block it prints is the terrain record's input.
import { describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'

type Reading = boolean | string | number | undefined

const readings: Record<string, Reading> = {}

function read(name: string, produce: () => Reading): void {
	try {
		readings[name] = produce()
	} catch (error) {
		readings[name] = `throws: ${error instanceof Error ? error.message : String(error)}`
	}
}

async function readAsync(name: string, produce: () => Promise<Reading>): Promise<void> {
	try {
		readings[name] = await produce()
	} catch (error) {
		readings[name] = `throws: ${error instanceof Error ? error.message : String(error)}`
	}
}

function has(object: object, member: string): boolean {
	return member in object
}

function supports(declaration: string): boolean {
	return CSS.supports(declaration)
}

function raf(): Promise<void> {
	return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

describe('platform terrain', () => {
	it('records the installed browser and the presence readings', async () => {
		read('userAgent', () => navigator.userAgent)
		read('control.present', () => has(HTMLElement.prototype, 'addEventListener'))
		read('control.absent', () => has(HTMLElement.prototype, 'veneerNoSuchMember'))
		// dialog
		read('dialog.showModal', () => has(HTMLDialogElement.prototype, 'showModal'))
		read('dialog.requestClose', () => has(HTMLDialogElement.prototype, 'requestClose'))
		read('dialog.closedBy', () => has(HTMLDialogElement.prototype, 'closedBy'))
		read('dialog.closedBy.reflect', () => {
			const dialog = document.createElement('dialog')
			dialog.setAttribute('closedby', 'any')
			const value: unknown = Reflect.get(dialog, 'closedBy')
			return typeof value === 'string' ? value : `type ${typeof value}`
		})
		// popover
		read('popover.attribute', () => has(HTMLElement.prototype, 'popover'))
		read('popover.showPopover', () => has(HTMLElement.prototype, 'showPopover'))
		read('popover.hidePopover', () => has(HTMLElement.prototype, 'hidePopover'))
		read('popover.togglePopover', () => has(HTMLElement.prototype, 'togglePopover'))
		read('popover.popoverTargetElement', () => has(HTMLButtonElement.prototype, 'popoverTargetElement'))
		read('popover.selector', () => CSS.supports('selector(:popover-open)'))
		read('popover.hint', () => {
			const host = document.createElement('div')
			host.setAttribute('popover', 'hint')
			document.body.append(host)
			try {
				host.showPopover()
				const open = host.matches(':popover-open')
				host.hidePopover()
				return open
			} finally {
				host.remove()
			}
		})
		read('ToggleEvent', () => typeof globalThis.ToggleEvent)
		read('CommandEvent', () => typeof Reflect.get(globalThis, 'CommandEvent'))
		read('command.attribute', () => has(HTMLButtonElement.prototype, 'command'))
		read('commandForElement', () => has(HTMLButtonElement.prototype, 'commandForElement'))
		read('inert', () => has(HTMLElement.prototype, 'inert'))
		read('CloseWatcher', () => typeof Reflect.get(globalThis, 'CloseWatcher'))
		// anchor positioning
		const style = document.documentElement.style
		read('anchor.anchorName', () => has(style, 'anchorName'))
		read('anchor.positionAnchor', () => has(style, 'positionAnchor'))
		read('anchor.positionArea', () => has(style, 'positionArea'))
		read('anchor.positionTryFallbacks', () => has(style, 'positionTryFallbacks'))
		read('anchor.positionTryOrder', () => has(style, 'positionTryOrder'))
		read('anchor.positionVisibility', () => has(style, 'positionVisibility'))
		read('anchor.area.physical', () => supports('position-area: top'))
		read('anchor.area.logical', () => supports('position-area: block-start'))
		read('anchor.area.span', () => supports('position-area: top span-left'))
		read('anchor.fallbacks.flip', () => supports('position-try-fallbacks: flip-block, flip-inline'))
		read('anchor.fallbacks.area', () => supports('position-try-fallbacks: bottom'))
		read('anchor.visibility', () => supports('position-visibility: anchors-visible'))
		read('anchor.function', () => supports('top: anchor(bottom)'))
		read('anchor.size', () => supports('width: anchor-size(width)'))
		// transitions and animation
		read('transition.allowDiscrete', () => supports('transition-behavior: allow-discrete'))
		read('CSSStartingStyleRule', () => typeof Reflect.get(globalThis, 'CSSStartingStyleRule'))
		read('interpolateSize', () => supports('interpolate-size: allow-keywords'))
		read('calcSize', () => supports('height: calc-size(auto, size)'))
		read('getAnimations', () => has(Element.prototype, 'getAnimations'))
		read('animation.finished', () => has(Animation.prototype, 'finished'))
		read('animation.commitStyles', () => has(Animation.prototype, 'commitStyles'))
		read('CSSTransition', () => typeof Reflect.get(globalThis, 'CSSTransition'))
		read('startViewTransition', () => has(document, 'startViewTransition'))
		// hidden until found, details
		read('beforematch', () => has(HTMLElement.prototype, 'onbeforematch'))
		read('hidden.untilFound', () => {
			const host = document.createElement('div')
			host.setAttribute('hidden', 'until-found')
			const value: unknown = Reflect.get(host, 'hidden')
			return String(value)
		})
		read('details.name', () => has(HTMLDetailsElement.prototype, 'name'))
		read('details.contentPseudo', () => CSS.supports('selector(::details-content)'))
		// observers and scroll
		read('IntersectionObserver', () => typeof IntersectionObserver)
		read('IntersectionObserver.scrollMargin', () => has(IntersectionObserver.prototype, 'scrollMargin'))
		read('IntersectionObserver.trackVisibility', () => {
			const observer = new IntersectionObserver(() => {}, { trackVisibility: true, delay: 100 })
			const value: unknown = Reflect.get(observer, 'trackVisibility')
			observer.disconnect()
			return value === true
		})
		read('ResizeObserver', () => typeof ResizeObserver)
		read('scrollend', () => has(window, 'onscrollend'))
		read('scrollSnap', () => supports('scroll-snap-type: x mandatory'))
		read('scrollIntoView.container', () => {
			const host = document.createElement('div')
			document.body.append(host)
			try {
				host.scrollIntoView({ container: 'nearest' } as ScrollIntoViewOptions)
				return 'accepted'
			} finally {
				host.remove()
			}
		})
		read('scrollbarGutter', () => supports('scrollbar-gutter: stable'))
		read('overscrollBehavior', () => supports('overscroll-behavior: contain'))
		// abort and misc
		read('AbortSignal.any', () => typeof AbortSignal.any)
		read('AbortSignal.timeout', () => typeof AbortSignal.timeout)
		read('CSS.escape', () => typeof CSS.escape)
		read('checkVisibility', () => has(Element.prototype, 'checkVisibility'))
		read('moveBefore', () => has(Element.prototype, 'moveBefore'))
		read('userActivation', () => has(navigator, 'userActivation'))
		read('reducedMotion.matches', () => matchMedia('(prefers-reduced-motion: reduce)').matches)
		read('forcedColors.matches', () => matchMedia('(forced-colors: active)').matches)
		// sanitizer
		read('setHTML', () => has(Element.prototype, 'setHTML'))
		read('setHTMLUnsafe', () => has(Element.prototype, 'setHTMLUnsafe'))
		read('Sanitizer', () => typeof Reflect.get(globalThis, 'Sanitizer'))
		read('sanitizer.default', () => {
			const host = document.createElement('div')
			const setHTML: unknown = Reflect.get(host, 'setHTML')
			if (typeof setHTML !== 'function') return 'absent'
			Reflect.apply(setHTML, host, ['<b onclick="x()">safe</b><script>bad()</script><a href="javascript:x()">link</a>'])
			return host.innerHTML
		})
		read('focusVisible.option', () => {
			const host = document.createElement('button')
			host.textContent = 'probe'
			document.body.append(host)
			try {
				host.focus({ focusVisible: true })
				return host.matches(':focus-visible')
			} finally {
				host.remove()
			}
		})
		read('popover.togglePopover.return', () => {
			const host = document.createElement('div')
			host.setAttribute('popover', 'manual')
			document.body.append(host)
			try {
				const opened: unknown = host.togglePopover()
				const closed: unknown = host.togglePopover()
				return `${String(opened)}/${String(closed)}`
			} finally {
				host.remove()
			}
		})
		read('popover.beforetoggle.cancelable', () => {
			const host = document.createElement('div')
			host.setAttribute('popover', 'manual')
			document.body.append(host)
			let cancelable: boolean | undefined
			host.addEventListener(
				'beforetoggle',
				(event) => {
					cancelable = event.cancelable
					event.preventDefault()
				},
				{ once: true },
			)
			try {
				host.showPopover()
				const open = host.matches(':popover-open')
				if (open) host.hidePopover()
				return `cancelable=${String(cancelable)} openedDespitePreventDefault=${String(open)}`
			} finally {
				host.remove()
			}
		})
		read('dialog.beforetoggle', () => {
			const dialog = document.createElement('dialog')
			document.body.append(dialog)
			let seen = 'none'
			dialog.addEventListener('beforetoggle', () => (seen = 'beforetoggle'), { once: true })
			try {
				dialog.show()
				dialog.close()
				return seen
			} finally {
				dialog.remove()
			}
		})
		read('details.beforetoggle', () => {
			const details = document.createElement('details')
			details.append(document.createElement('summary'))
			document.body.append(details)
			let seen = 'none'
			details.addEventListener('beforetoggle', () => (seen = 'beforetoggle'), { once: true })
			try {
				details.open = true
				return seen
			} finally {
				details.remove()
			}
		})
		await readAsync('dialog.showModal.scrollLock', async () => {
			const filler = document.createElement('div')
			filler.style.height = '400vh'
			const dialog = document.createElement('dialog')
			document.body.append(filler, dialog)
			try {
				window.scrollTo(0, 0)
				dialog.showModal()
				await raf()
				const overflow = getComputedStyle(document.body).overflow
				window.scrollTo(0, 500)
				await raf()
				const top = document.documentElement.scrollTop
				dialog.close()
				return `bodyOverflow=${overflow} scrollTopAfterScrollTo500=${String(top)}`
			} finally {
				window.scrollTo(0, 0)
				filler.remove()
				dialog.remove()
			}
		})
		await readAsync('dialog.showModal.inert', async () => {
			const outside = document.createElement('button')
			outside.textContent = 'outside'
			const dialog = document.createElement('dialog')
			const inside = document.createElement('button')
			inside.textContent = 'inside'
			dialog.append(inside)
			document.body.append(outside, dialog)
			try {
				dialog.showModal()
				await raf()
				outside.focus()
				const focusedOutside = document.activeElement === outside
				const active = document.activeElement === inside
				dialog.close()
				return `outsideFocusable=${String(focusedOutside)} insideFocusedOnOpen=${String(active)}`
			} finally {
				outside.remove()
				dialog.remove()
			}
		})
		await readAsync('transition.getAnimations', async () => {
			const host = document.createElement('div')
			host.style.cssText = 'width:10px;height:10px;transition:width 80ms linear;background:red'
			document.body.append(host)
			try {
				await raf()
				host.style.width = '100px'
				await raf()
				const animations = host.getAnimations()
				const first = animations[0]
				const kind = first === undefined ? 'none' : first.constructor.name
				const property =
					first !== undefined && 'transitionProperty' in first
						? String(Reflect.get(first, 'transitionProperty'))
						: 'n/a'
				let finished = 'unresolved'
				if (first !== undefined) {
					await first.finished
					finished = 'resolved'
				}
				return `count=${String(animations.length)} kind=${kind} property=${property} finished=${finished}`
			} finally {
				host.remove()
			}
		})
		await readAsync('transition.cancel', async () => {
			const host = document.createElement('div')
			host.style.cssText = 'width:10px;height:10px;transition:width 200ms linear;background:red'
			document.body.append(host)
			const seen: string[] = []
			host.addEventListener('transitionrun', () => seen.push('run'))
			host.addEventListener('transitionstart', () => seen.push('start'))
			host.addEventListener('transitioncancel', () => seen.push('cancel'))
			host.addEventListener('transitionend', () => seen.push('end'))
			try {
				await raf()
				host.style.width = '100px'
				await raf()
				await raf()
				const animation = host.getAnimations()[0]
				let outcome = 'no-animation'
				if (animation !== undefined) {
					const settled = animation.finished.then(
						() => 'finished-resolved',
						(error: unknown) => `finished-rejected:${error instanceof DOMException ? error.name : String(error)}`,
					)
					host.style.transition = 'none'
					await raf()
					await raf()
					outcome = await settled
				}
				return `events=${seen.join(',')} outcome=${outcome}`
			} finally {
				host.remove()
			}
		})
		await readAsync('transition.removeMidway', async () => {
			const host = document.createElement('div')
			host.style.cssText = 'width:10px;height:10px;transition:width 200ms linear;background:red'
			document.body.append(host)
			const seen: string[] = []
			host.addEventListener('transitioncancel', () => seen.push('cancel'))
			host.addEventListener('transitionend', () => seen.push('end'))
			await raf()
			host.style.width = '100px'
			await raf()
			await raf()
			const animation = host.getAnimations()[0]
			const settled =
				animation === undefined
					? Promise.resolve('no-animation')
					: animation.finished.then(
							() => 'finished-resolved',
							(error: unknown) => `finished-rejected:${error instanceof DOMException ? error.name : String(error)}`,
						)
			host.remove()
			await raf()
			await raf()
			const outcome = await Promise.race([settled, new Promise<string>((resolve) => setTimeout(() => resolve('pending-after-300ms'), 300))])
			return `events=${seen.join(',')} outcome=${outcome}`
		})
		await readAsync('transition.reducedMotionZero', async () => {
			const host = document.createElement('div')
			host.style.cssText = 'width:10px;height:10px;transition:width 0s linear;background:red'
			document.body.append(host)
			const seen: string[] = []
			host.addEventListener('transitionend', () => seen.push('end'))
			try {
				await raf()
				host.style.width = '100px'
				await raf()
				await raf()
				return `animations=${String(host.getAnimations().length)} events=${seen.join(',')}`
			} finally {
				host.remove()
			}
		})
		await readAsync('popover.lightDismiss.trusted', async () => {
			const host = document.createElement('div')
			host.setAttribute('popover', 'auto')
			host.textContent = 'auto popover'
			const outside = document.createElement('button')
			outside.textContent = 'outside'
			outside.style.cssText = 'position:fixed;left:0;top:0'
			document.body.append(outside, host)
			try {
				host.showPopover()
				await raf()
				const before = host.matches(':popover-open')
				await userEvent.click(outside)
				await raf()
				const after = host.matches(':popover-open')
				return `openBefore=${String(before)} openAfterOutsideClick=${String(after)}`
			} finally {
				host.remove()
				outside.remove()
			}
		})
		await readAsync('popover.escape.trusted', async () => {
			const host = document.createElement('div')
			host.setAttribute('popover', 'auto')
			host.textContent = 'auto popover'
			document.body.append(host)
			try {
				host.showPopover()
				await raf()
				await userEvent.keyboard('{Escape}')
				await raf()
				return `openAfterEscape=${String(host.matches(':popover-open'))}`
			} finally {
				host.remove()
			}
		})
		await readAsync('dialog.closedby.any.trusted', async () => {
			const dialog = document.createElement('dialog')
			dialog.setAttribute('closedby', 'any')
			dialog.textContent = 'dialog'
			const outside = document.createElement('button')
			outside.textContent = 'outside'
			outside.style.cssText = 'position:fixed;right:0;bottom:0'
			document.body.append(outside, dialog)
			let cancelEvents = 0
			dialog.addEventListener('cancel', () => cancelEvents++)
			try {
				dialog.showModal()
				await raf()
				await userEvent.click(document.body, { position: { x: 5, y: 5 } })
				await raf()
				return `openAfterOutsideClick=${String(dialog.open)} cancelEvents=${String(cancelEvents)}`
			} finally {
				if (dialog.open) dialog.close()
				dialog.remove()
				outside.remove()
			}
		})
		await readAsync('closeWatcher.escape.trusted', async () => {
			const Watcher: unknown = Reflect.get(globalThis, 'CloseWatcher')
			if (typeof Watcher !== 'function') return 'absent'
			const controller = new AbortController()
			let closed = 0
			let cancelable: boolean | undefined
			const watcher: unknown = Reflect.construct(Watcher, [{ signal: controller.signal }])
			if (!(watcher instanceof EventTarget)) return 'not-an-event-target'
			watcher.addEventListener('cancel', (event) => (cancelable = event.cancelable))
			watcher.addEventListener('close', () => closed++)
			await userEvent.keyboard('{Escape}')
			await raf()
			controller.abort()
			return `closed=${String(closed)} cancelCancelable=${String(cancelable)}`
		})
		console.log('J-ENGINE-PLATFORM-READINGS ' + JSON.stringify(readings, null, 1))
		expect(readings['control.present']).toBe(true)
		expect(readings['control.absent']).toBe(false)
	})
})
