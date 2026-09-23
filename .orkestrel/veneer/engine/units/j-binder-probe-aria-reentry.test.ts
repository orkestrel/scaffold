// The Orchestrator's probe reproducing the round-6 objective lane's claim-3 counterexample on
// Chromium 153: a custom element observing `aria-pressed` whose one-shot reaction to the
// `aria-pressed` write calls the same button's `toggle()` again. On the round-6 source the outer
// call dispatches the detail it read before the attribute write (`pressed: true`) after the inner
// call already dispatched `pressed: false`, so the recorded details read `[false, true]` while the
// host and both returns read `false`. Copied into the worktree, run once, and removed.
import type { ButtonDetail } from '@src/browser'
import { Button } from '@src/browser'
import { createRecorder } from '@orkestrel/test'
import { describe, expect, it, onTestFinished } from 'vitest'

describe('probe: aria-pressed re-entry', () => {
	it('records the details the outer and inner toggles dispatch when a reaction to the aria-pressed write toggles again', () => {
		const name = 'vn-probe-aria-reentered'
		const reactions = new WeakMap<HTMLElement, () => void>()
		customElements.define(
			name,
			class extends HTMLElement {
				static observedAttributes = ['aria-pressed']
				attributeChangedCallback() {
					reactions.get(this)?.()
				}
			},
		)
		const events = createRecorder<readonly [CustomEvent<ButtonDetail>]>()
		const host = document.createElement(name)
		const button = new Button(host, { on: { toggle: events.handler } })
		onTestFinished(() => button.destroy())
		const inner = createRecorder<readonly [boolean]>()
		reactions.set(host, () => {
			reactions.delete(host)
			inner.handler(button.toggle())
		})
		const outer = button.toggle()
		const details = events.calls.map(([event]) => event.detail.pressed)
		console.log(`probe: outer=${String(outer)} inner=${JSON.stringify(inner.calls)} active=${String(host.classList.contains('active'))} aria=${String(host.getAttribute('aria-pressed'))} details=${JSON.stringify(details)}`)
		expect(outer).toBe(false)
		expect(inner.calls).toEqual([[false]])
		expect(host.classList.contains('active')).toBe(false)
		expect(host.getAttribute('aria-pressed')).toBe('false')
		expect(details).toEqual([false, true])
	})
})
