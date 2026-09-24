// The Orchestrator's probe of the subjective lane's referral R1 on the J-COLLAPSE round-2 source: a
// custom-element trigger whose class reaction, fired by the hide's `collapsed` token write, adds the
// `show` token back to the panel. The probe records what the call writes after that reaction, the
// tokens the panel and trigger end with, whether `hidden` fires, and the resolution; it asserts
// nothing about the outcome the round must have, only the outcome the source produces, so a reading
// is recorded either way.
import { Collapse } from '@src/browser'
import { createRecorder, requireValue } from '@orkestrel/test'
import { describe, expect, it, onTestFinished } from 'vitest'
import { scene } from '../../setupBrowser.js'

describe('probe R1: a trigger reaction adds the shown token during hide', () => {
	it('records the writes after the reaction, the final tokens, the events, and the resolution', async () => {
		const name = 'vn-probe-trigger-adds-shown'
		const reactions = new WeakMap<HTMLElement, (value: string | null) => void>()
		customElements.define(
			name,
			class extends HTMLElement {
				static observedAttributes = ['class']
				attributeChangedCallback(_name: string, _previous: string | null, value: string | null) {
					reactions.get(this)?.(value)
				}
			},
		)
		const root = scene.mount('<div id="details" class="collapse show"></div>')
		const panel = requireValue(root.querySelector<HTMLElement>('#details'), 'No panel')
		const trigger = document.createElement(name)
		trigger.setAttribute('aria-expanded', 'true')
		trigger.setAttribute('data-bs-toggle', 'collapse')
		trigger.setAttribute('data-bs-target', '#details')
		root.prepend(trigger)
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, {
			on: {
				hide: (event) => events.handler(event.type),
				hidden: (event) => events.handler(event.type),
			},
		})
		onTestFinished(() => collapse.destroy())
		const writes = createRecorder<readonly [string]>()
		const observer = new MutationObserver((records) => {
			for (const record of records) {
				const target = record.target instanceof Element ? record.target.tagName.toLowerCase() : '?'
				writes.handler(`${target} ${record.attributeName ?? '?'}=${record.target instanceof Element ? record.target.getAttribute(record.attributeName ?? '') : '?'}`)
			}
		})
		onTestFinished(() => observer.disconnect())
		reactions.set(trigger, (value) => {
			if (!(value ?? '').split(' ').includes('collapsed')) return
			reactions.delete(trigger)
			panel.classList.add('show')
			observer.observe(root, { attributes: true, subtree: true })
		})
		const resolved = await collapse.hide()
		const after = [...writes.calls.flat(), ...observer.takeRecords().map((record) => `${record.attributeName}`)]
		console.log('probe R1 resolved:', resolved)
		console.log('probe R1 writes after the reaction:', JSON.stringify(after))
		console.log('probe R1 panel tokens:', JSON.stringify(Array.from(panel.classList)))
		console.log('probe R1 panel style attribute:', JSON.stringify(panel.getAttribute('style')))
		console.log('probe R1 trigger tokens:', JSON.stringify(Array.from(trigger.classList)), 'aria-expanded:', trigger.getAttribute('aria-expanded'))
		console.log('probe R1 events:', JSON.stringify(events.calls))
		expect(typeof resolved).toBe('boolean')
	})
})
