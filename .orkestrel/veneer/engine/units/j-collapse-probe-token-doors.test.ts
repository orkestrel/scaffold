// The Orchestrator's probe reproducing the J-COLLAPSE objective lane's claim-4 counterexamples on
// Chromium 153: (A) a one-shot class reaction that removes the transition token during show()'s
// first write, without destroying the collapse or starting another call, is not read at the write
// doors, so the outer call keeps writing (removes the host token, writes the size, expands the
// triggers) and resolves false only after the await; (B) a one-shot reaction to the final token
// write that removes the shown token is not read either, so show() dispatches shown and resolves
// true while `shown` reads false. Copied into the worktree, run once, and removed.
import { Collapse } from '@src/browser'
import { createRecorder, requireValue } from '@orkestrel/test'
import { afterEach, describe, expect, it, onTestFinished } from 'vitest'
import collapseCascade from '../../../src/styles/components/_collapse.scss?inline'
import { scene } from '../../setupBrowser.js'

afterEach(() => scene.clear())

describe('probe: the transition-token doors', () => {
	it('A: keeps writing after a reaction removes the transition token during the first write', async () => {
		const name = 'vn-probe-collapse-token-removed'
		const reactions = new WeakMap<HTMLElement, () => void>()
		customElements.define(
			name,
			class extends HTMLElement {
				static observedAttributes = ['class']
				attributeChangedCallback() {
					reactions.get(this)?.()
				}
			},
		)
		scene.load(collapseCascade)
		const root = scene.mount(`
			<button type="button" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#details">Details</button>`)
		const trigger = requireValue(root.querySelector('button'), 'No trigger')
		const panel = document.createElement(name)
		panel.id = 'details'
		panel.className = 'collapse'
		panel.textContent = 'body'
		root.append(panel)
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, {
			on: {
				show: (event) => events.handler(event.type),
				shown: (event) => events.handler(event.type),
			},
		})
		onTestFinished(() => collapse.destroy())
		const after = createRecorder<readonly [string, string | null]>()
		const observer = new MutationObserver((records) => {
			for (const record of records) {
				const target = record.target
				if (target instanceof HTMLElement && record.attributeName !== null) {
					after.handler(`${target.tagName.toLowerCase()}[${record.attributeName}]`, target.getAttribute(record.attributeName))
				}
			}
		})
		onTestFinished(() => observer.disconnect())
		reactions.set(panel, () => {
			reactions.delete(panel)
			panel.classList.remove('collapsing')
			observer.observe(root, { attributes: true, subtree: true })
		})
		const result = await collapse.show()
		observer.takeRecords().forEach((record) => {
			const target = record.target
			if (target instanceof HTMLElement && record.attributeName !== null) {
				after.handler(`${target.tagName.toLowerCase()}[${record.attributeName}]`, target.getAttribute(record.attributeName))
			}
		})
		const written = after.calls.map(([name]) => name)
		console.log(`probe A: result=${String(result)} events=${JSON.stringify(events.calls.flat())} writesAfterRemoval=${JSON.stringify(written)} panelClass=${JSON.stringify(panel.className)} ariaExpanded=${String(trigger.getAttribute('aria-expanded'))} style=${JSON.stringify(panel.getAttribute('style'))}`)
		expect(result).toBe(false)
		expect(written.some((entry) => entry.endsWith('[style]'))).toBe(true)
		expect(written.some((entry) => entry === 'button[aria-expanded]')).toBe(true)
		expect(trigger.getAttribute('aria-expanded')).toBe('true')
	})

	it('B: dispatches shown and resolves true when a reaction to the final token write removes the shown token', async () => {
		const name = 'vn-probe-collapse-shown-removed'
		const reactions = new WeakMap<HTMLElement, () => void>()
		customElements.define(
			name,
			class extends HTMLElement {
				static observedAttributes = ['class']
				attributeChangedCallback() {
					reactions.get(this)?.()
				}
			},
		)
		scene.load(collapseCascade)
		const root = scene.mount(`
			<button type="button" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#details">Details</button>`)
		const panel = document.createElement(name)
		panel.id = 'details'
		panel.className = 'collapse'
		panel.textContent = 'body'
		root.append(panel)
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, {
			on: {
				shown: (event) => events.handler(event.type),
			},
		})
		onTestFinished(() => collapse.destroy())
		reactions.set(panel, () => {
			if (!panel.classList.contains('show')) return
			reactions.delete(panel)
			panel.classList.remove('show')
		})
		const result = await collapse.show()
		console.log(`probe B: result=${String(result)} events=${JSON.stringify(events.calls.flat())} shown=${String(collapse.shown)} panelClass=${JSON.stringify(panel.className)}`)
		expect(result).toBe(true)
		expect(events.calls.flat()).toEqual(['shown.vn.collapse'])
		expect(collapse.shown).toBe(false)
	})
})
