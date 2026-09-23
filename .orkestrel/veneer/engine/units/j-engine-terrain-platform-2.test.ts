// J-ENGINE terrain probe 2: the platform questions the design round raised that the first probe
// did not settle. Same instrument shape as `platform.test.ts`: readings recorded, two controls
// asserted, the JSON block printed for the terrain record.
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

function raf(): Promise<void> {
	return new Promise((resolve) => requestAnimationFrame(() => resolve()))
}

function readComputed(element: Element, properties: readonly string[]): string {
	const style = getComputedStyle(element)
	return properties.map((property) => `${property}=${style.getPropertyValue(property)}`).join(' ')
}

const UA_PROPERTIES = [
	'position',
	'inset',
	'margin',
	'padding',
	'border',
	'background-color',
	'color',
	'overflow',
	'width',
	'height',
	'display',
	'z-index',
] as const

describe('platform terrain 2', () => {
	it('records the readings the design round asked for', async () => {
		read('control.present', () => 'addEventListener' in HTMLElement.prototype)
		read('control.absent', () => 'veneerNoSuchMember' in HTMLElement.prototype)
		// UA popover defaults on a class-only element (no Veneer rule for the class exists yet)
		read('ua.popover.open', () => {
			const host = document.createElement('div')
			host.className = 'dropdown-menu'
			host.setAttribute('popover', 'manual')
			host.textContent = 'menu'
			document.body.append(host)
			try {
				host.showPopover()
				return readComputed(host, UA_PROPERTIES)
			} finally {
				host.remove()
			}
		})
		read('ua.popover.closed', () => {
			const host = document.createElement('div')
			host.className = 'tooltip'
			host.setAttribute('popover', 'hint')
			document.body.append(host)
			try {
				return readComputed(host, ['display', 'position', 'inset', 'margin', 'border', 'padding'])
			} finally {
				host.remove()
			}
		})
		read('ua.popover.backdrop', () => {
			const host = document.createElement('div')
			host.setAttribute('popover', 'manual')
			document.body.append(host)
			try {
				host.showPopover()
				const style = getComputedStyle(host, '::backdrop')
				return `background=${style.backgroundColor} inset=${style.inset} position=${style.position}`
			} finally {
				host.remove()
			}
		})
		// getAnimations in the same task as the class change, with and without a reflow
		read('transition.sameTask.noReflow', () => {
			const host = document.createElement('div')
			host.style.cssText = 'width:10px;height:10px;transition:width 80ms linear;background:red'
			document.body.append(host)
			try {
				host.style.width = '100px'
				return `count=${String(host.getAnimations().length)}`
			} finally {
				host.remove()
			}
		})
		read('transition.sameTask.readBeforeChange', () => {
			const host = document.createElement('div')
			host.style.cssText = 'width:10px;height:10px;transition:width 80ms linear;background:red'
			document.body.append(host)
			try {
				void host.offsetWidth
				host.style.width = '100px'
				return `count=${String(host.getAnimations().length)}`
			} finally {
				host.remove()
			}
		})
		read('transition.sameTask.readAfterChange', () => {
			const host = document.createElement('div')
			host.style.cssText = 'width:10px;height:10px;transition:width 80ms linear;background:red'
			document.body.append(host)
			try {
				void host.offsetWidth
				host.style.width = '100px'
				void host.offsetWidth
				return `count=${String(host.getAnimations().length)}`
			} finally {
				host.remove()
			}
		})
		read('transition.class.readAfterChange', () => {
			const style = document.createElement('style')
			style.textContent = '.vn-probe { width: 10px; height: 10px; transition: width 80ms linear } .vn-probe.wide { width: 100px }'
			document.head.append(style)
			const host = document.createElement('div')
			host.className = 'vn-probe'
			document.body.append(host)
			try {
				void host.offsetWidth
				host.classList.add('wide')
				void host.offsetWidth
				const count = host.getAnimations().length
				return `count=${String(count)}`
			} finally {
				host.remove()
				style.remove()
			}
		})
		read('transition.reducedMotion.staged', () => {
			const style = document.createElement('style')
			style.textContent =
				'.vn-probe2 { width: 10px; height: 10px; transition: width 80ms linear } .vn-probe2.wide { width: 100px } @media (prefers-reduced-motion: reduce) { .vn-probe2 { transition: none } }'
			document.head.append(style)
			const host = document.createElement('div')
			host.className = 'vn-probe2'
			document.body.append(host)
			try {
				void host.offsetWidth
				host.classList.add('wide')
				void host.offsetWidth
				return `matches=${String(matchMedia('(prefers-reduced-motion: reduce)').matches)} count=${String(host.getAnimations().length)}`
			} finally {
				host.remove()
				style.remove()
			}
		})
		// hydrated own properties on a CustomEvent read back at the document
		read('event.ownProperty.readback', () => {
			const host = document.createElement('div')
			document.body.append(host)
			let seen = 'none'
			const listener = (event: Event): void => {
				const value: unknown = Reflect.get(event, 'relatedTarget')
				seen = value === host ? 'host' : `other:${typeof value}`
			}
			document.addEventListener('vn-probe', listener, { once: true })
			try {
				const event = new CustomEvent('vn-probe', { bubbles: true, cancelable: true, detail: { relatedTarget: host } })
				Object.defineProperty(event, 'relatedTarget', { value: host, enumerable: true })
				host.dispatchEvent(event)
				return seen
			} finally {
				document.removeEventListener('vn-probe', listener)
				host.remove()
			}
		})
		read('event.completedCancelable.defaultPrevented', () => {
			const host = document.createElement('div')
			document.body.append(host)
			try {
				const event = new CustomEvent('vn-probe-2', { bubbles: true, cancelable: true })
				host.addEventListener('vn-probe-2', (received) => received.preventDefault(), { once: true })
				const result = host.dispatchEvent(event)
				return `dispatchEvent=${String(result)} defaultPrevented=${String(event.defaultPrevented)}`
			} finally {
				host.remove()
			}
		})
		// MutationObserver batching under remove, reinsert, and moveBefore
		await readAsync('observer.removeReinsertSameTask', async () => {
			const root = document.createElement('div')
			const host = document.createElement('button')
			root.append(host)
			document.body.append(root)
			const batches: string[] = []
			const observer = new MutationObserver((records) => {
				batches.push(records.map((record) => `${String(record.removedNodes.length)}-${String(record.addedNodes.length)}`).join(','))
			})
			observer.observe(root, { childList: true, subtree: true })
			try {
				host.remove()
				root.append(host)
				await Promise.resolve()
				await raf()
				return `batches=${batches.join('|')} contained=${String(root.contains(host))}`
			} finally {
				observer.disconnect()
				root.remove()
			}
		})
		await readAsync('observer.moveBefore', async () => {
			const root = document.createElement('div')
			const first = document.createElement('div')
			const second = document.createElement('div')
			const host = document.createElement('button')
			first.append(host)
			root.append(first, second)
			document.body.append(root)
			const batches: string[] = []
			const observer = new MutationObserver((records) => {
				batches.push(records.map((record) => `${String(record.removedNodes.length)}-${String(record.addedNodes.length)}`).join(','))
			})
			observer.observe(root, { childList: true, subtree: true })
			try {
				const move: unknown = Reflect.get(second, 'moveBefore')
				if (typeof move !== 'function') return 'absent'
				Reflect.apply(move, second, [host, null])
				await Promise.resolve()
				await raf()
				return `batches=${batches.join('|')} contained=${String(root.contains(host))}`
			} finally {
				observer.disconnect()
				root.remove()
			}
		})
		// setHTML safe baseline against Bootstrap's allowlist concerns
		read('sanitizer.default.attributes', () => {
			const host = document.createElement('div')
			const setHTML: unknown = Reflect.get(host, 'setHTML')
			if (typeof setHTML !== 'function') return 'absent'
			Reflect.apply(setHTML, host, [
				'<span aria-label="l" aria-hidden="true" role="note" data-x="1" class="c" id="i" title="t" lang="en" dir="ltr" style="color:red" tabindex="0">y</span><a href="https://x" target="_blank" rel="noopener">a</a><img src="https://x/i.png" alt="i" srcset="https://x/i2.png 2x" width="1" height="1"><b>b</b><h1>h</h1><ul><li>l</li></ul><pre>p</pre><small>s</small><u>u</u><strike>k</strike><table><tr><td>t</td></tr></table><iframe src="https://x"></iframe><svg><circle r="1"/></svg>',
			])
			return host.innerHTML
		})
		read('sanitizer.custom.elements', () => {
			const host = document.createElement('div')
			const setHTML: unknown = Reflect.get(host, 'setHTML')
			const SanitizerClass: unknown = Reflect.get(globalThis, 'Sanitizer')
			if (typeof setHTML !== 'function' || typeof SanitizerClass !== 'function') return 'absent'
			const sanitizer: unknown = Reflect.construct(SanitizerClass, [
				{ elements: ['b', 'a', 'span'], attributes: ['class', 'href', 'aria-label', 'title'] },
			])
			Reflect.apply(setHTML, host, ['<b class="c" id="i">b</b><a href="https://x" aria-label="l" onclick="x()">a</a><i>i</i><span title="t" data-x="1">s</span>', { sanitizer }])
			return host.innerHTML
		})
		read('sanitizer.custom.ariaWildcard', () => {
			const host = document.createElement('div')
			const setHTML: unknown = Reflect.get(host, 'setHTML')
			const SanitizerClass: unknown = Reflect.get(globalThis, 'Sanitizer')
			if (typeof setHTML !== 'function' || typeof SanitizerClass !== 'function') return 'absent'
			let outcome = 'constructed'
			try {
				const sanitizer: unknown = Reflect.construct(SanitizerClass, [{ elements: ['span'], attributes: ['aria-*'] }])
				Reflect.apply(setHTML, host, ['<span aria-label="l">s</span>', { sanitizer }])
				outcome = `html=${host.innerHTML}`
			} catch (error) {
				outcome = `throws:${error instanceof Error ? error.message : String(error)}`
			}
			return outcome
		})
		read('sanitizer.instance.methods', () => {
			const SanitizerClass: unknown = Reflect.get(globalThis, 'Sanitizer')
			if (typeof SanitizerClass !== 'function') return 'absent'
			const prototype: unknown = Reflect.get(SanitizerClass, 'prototype')
			if (typeof prototype !== 'object' || prototype === null) return 'no-prototype'
			return Object.getOwnPropertyNames(prototype).join(',')
		})
		// CloseWatcher without user activation
		read('closeWatcher.noActivation.requestClose', () => {
			const Watcher: unknown = Reflect.get(globalThis, 'CloseWatcher')
			if (typeof Watcher !== 'function') return 'absent'
			const controller = new AbortController()
			let cancelable: boolean | undefined
			let closed = 0
			const watcher: unknown = Reflect.construct(Watcher, [{ signal: controller.signal }])
			if (!(watcher instanceof EventTarget)) return 'not-an-event-target'
			watcher.addEventListener('cancel', (event) => {
				cancelable = event.cancelable
				event.preventDefault()
			})
			watcher.addEventListener('close', () => closed++)
			const request: unknown = Reflect.get(watcher, 'requestClose')
			if (typeof request === 'function') Reflect.apply(request, watcher, [])
			controller.abort()
			return `cancelCancelable=${String(cancelable)} closedDespitePreventDefault=${String(closed)}`
		})
		await readAsync('closeWatcher.second.freeWatcher', async () => {
			const Watcher: unknown = Reflect.get(globalThis, 'CloseWatcher')
			if (typeof Watcher !== 'function') return 'absent'
			const controller = new AbortController()
			const closes: string[] = []
			const first: unknown = Reflect.construct(Watcher, [{ signal: controller.signal }])
			const second: unknown = Reflect.construct(Watcher, [{ signal: controller.signal }])
			if (!(first instanceof EventTarget) || !(second instanceof EventTarget)) return 'not-an-event-target'
			first.addEventListener('close', () => closes.push('first'))
			second.addEventListener('close', () => closes.push('second'))
			await userEvent.keyboard('{Escape}')
			await raf()
			controller.abort()
			return `closes=${closes.join(',')}`
		})
		// anchored container query support
		read('anchor.containerQuery', () => {
			const style = document.createElement('style')
			document.head.append(style)
			try {
				const sheet = style.sheet
				if (sheet === null) return 'no-sheet'
				sheet.insertRule('@container anchored(fallback: flip-block) { .vn-x { color: red } }', 0)
				const rule = sheet.cssRules[0]
				return `inserted=${rule === undefined ? 'none' : rule.constructor.name}`
			} catch (error) {
				return `throws:${error instanceof Error ? error.message : String(error)}`
			} finally {
				style.remove()
			}
		})
		read('anchor.positionArea.readback', () => {
			const host = document.createElement('div')
			host.style.setProperty('position-area', 'bottom span-right')
			host.style.setProperty('position-try-fallbacks', 'flip-block, flip-inline')
			return `area=${host.style.getPropertyValue('position-area')} fallbacks=${host.style.getPropertyValue('position-try-fallbacks')}`
		})
		// inert: a sibling inserted after isolation
		read('inert.laterSibling', () => {
			const host = document.createElement('div')
			const sibling = document.createElement('button')
			sibling.textContent = 'sibling'
			document.body.append(host)
			const changed: HTMLElement[] = []
			for (const child of Array.from(document.body.children)) {
				if (child !== host && child instanceof HTMLElement && !child.inert) {
					child.inert = true
					changed.push(child)
				}
			}
			try {
				document.body.append(sibling)
				sibling.focus()
				return `laterSiblingFocused=${String(document.activeElement === sibling)}`
			} finally {
				for (const element of changed) element.inert = false
				sibling.remove()
				host.remove()
			}
		})
		console.log('J-ENGINE-PLATFORM-READINGS-2 ' + JSON.stringify(readings, null, 1))
		expect(readings['control.present']).toBe(true)
		expect(readings['control.absent']).toBe(false)
	})
})
