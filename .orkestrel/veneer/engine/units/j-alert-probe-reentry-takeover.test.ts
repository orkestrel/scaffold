// The Orchestrator's probe of the J-ALERT objective lane's claim-2 vector on the round-1 source: a
// one-shot `close.vn.alert` listener calls `close()` again (the inner call); the inner call's removal
// of the `show` token fires a custom-element reaction that restores the token and disarms itself, so
// the inner call stops; the outer call's dispatch then returns and its post-dispatch refusal reads
// neither an aborted controller nor a close in flight. The probe records each call's result, the
// class writes after the reaction, the host's connectivity, and the events, asserting only that both
// calls settled, so the reading is recorded either way.
import { Alert } from '@src/browser'
import { createRecorder, requireValue } from '@orkestrel/test'
import { describe, expect, it, onTestFinished } from 'vitest'
import { scene } from '../../setupBrowser.js'

describe('probe: a re-entered close whose inner call a reaction takes over', () => {
	it('records both calls, the writes after the reaction, the connectivity, and the events', async () => {
		const name = 'vn-alert-probe-reentry-takeover'
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
		const root = scene.mount('<div></div>')
		const host = document.createElement(name)
		host.className = 'alert show'
		root.append(host)
		const events = createRecorder<readonly [string]>()
		const writes = createRecorder<readonly [string]>()
		const observer = new MutationObserver((records) => {
			for (const record of records) {
				const target = record.target instanceof Element ? record.target : undefined
				writes.handler(`${target?.tagName.toLowerCase() ?? '?'} ${record.attributeName ?? record.type}=${target?.getAttribute(record.attributeName ?? '') ?? '?'} connected=${target?.isConnected}`)
			}
		})
		onTestFinished(() => observer.disconnect())
		let inner: Promise<boolean> | undefined
		const alert = new Alert(host, {
			on: {
				close: (event) => {
					events.handler(event.type)
					if (inner === undefined) inner = alert.close()
				},
				closed: (event) => events.handler(event.type),
			},
		})
		onTestFinished(() => alert.destroy())
		let fired = false
		reactions.set(host, (value) => {
			if (fired || (value ?? '').split(' ').includes('show')) return
			fired = true
			host.classList.add('show')
			observer.observe(root, { attributes: true, childList: true, subtree: true })
		})
		const outer = await alert.close()
		const innerResult = await requireValue(inner, 'the inner close never started')
		console.log('probe reentry-takeover outer resolved:', outer, 'inner resolved:', innerResult)
		console.log('probe reentry-takeover writes after the reaction:', JSON.stringify([...writes.calls.flat(), ...observer.takeRecords().map((r) => `${r.attributeName ?? r.type}`)]))
		console.log('probe reentry-takeover host connected:', host.isConnected, 'tokens:', JSON.stringify(Array.from(host.classList)))
		console.log('probe reentry-takeover events:', JSON.stringify(events.calls), 'find:', Alert.find(host) !== undefined)
		expect(typeof outer).toBe('boolean')
	})
})
