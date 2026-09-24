// The Orchestrator's probe of the round-3 subjective lane's referral R1 on the J-COLLAPSE round-3
// source: an outer root holding a collapse trigger and an inner root; the inner root holds a panel
// that is also a button host; one click. The inner delegate hears first and finds no conflict (the
// trigger is outside its root), so its button route may construct a Button on the panel; the outer
// delegate then finds a Button on the element and may construct a Collapse through its collapse
// route. The probe records which engines exist after the click and what each route wrote; it asserts
// only that the click ran, so the reading is recorded either way.
import { Button, Collapse, Delegate } from '@src/browser'
import { createRecorder, requireValue, waitForCondition } from '@orkestrel/test'
import { describe, expect, it, onTestFinished } from 'vitest'
import { scene } from '../../setupBrowser.js'

describe('probe R1: a same-host click across two delegates', () => {
	it('records which engines two delegates construct on one element', async () => {
		const root = scene.mount(`
			<button type="button" data-bs-toggle="collapse" data-bs-target="#panel">Outside</button>
			<div id="inner">
				<div id="panel" class="collapse" data-vn-press></div>
			</div>`)
		onTestFinished(() => scene.clear())
		const inner = requireValue(root.querySelector<HTMLElement>('#inner'), 'No inner root')
		const panel = requireValue(root.querySelector<HTMLElement>('#panel'), 'No panel')
		const trigger = requireValue(root.querySelector('button'), 'No trigger')
		const events = createRecorder<readonly [string]>()
		const controller = new AbortController()
		onTestFinished(() => controller.abort())
		for (const name of ['toggle.vn.button', 'show.vn.collapse', 'shown.vn.collapse']) {
			root.addEventListener(name, (event) => events.handler(event.type), { signal: controller.signal })
		}
		const outer = new Delegate({ root, button: { selectors: { trigger: '[data-vn-press]' } } })
		const nested = new Delegate({ root: inner, button: { selectors: { trigger: '[data-vn-press]' } } })
		onTestFinished(() => outer.destroy())
		onTestFinished(() => nested.destroy())
		// The click target is the panel itself (the button host), so the inner delegate hears it; the
		// panel is not inside the collapse trigger, so the inner collapse route finds no trigger.
		panel.click()
		await new Promise((resolve) => setTimeout(resolve, 50))
		console.log('probe R1 (panel click) events:', JSON.stringify(events.calls))
		console.log('probe R1 (panel click) Button.find:', Button.find(panel) !== undefined, 'Collapse.find:', Collapse.find(panel) !== undefined)
		console.log('probe R1 (panel click) panel tokens:', JSON.stringify(Array.from(panel.classList)), 'aria-pressed:', panel.getAttribute('aria-pressed'))
		// The trigger click: the outer delegate alone hears it (the trigger is outside the inner root);
		// its own conflict check reads the engines present on the panel after the first click.
		events.calls.length = 0
		trigger.click()
		await waitForCondition('the click settles', () => panel.classList.contains('show') || panel.classList.contains('collapsing') || true)
		await new Promise((resolve) => setTimeout(resolve, 50))
		console.log('probe R1 (trigger click) events:', JSON.stringify(events.calls))
		console.log('probe R1 (trigger click) Button.find:', Button.find(panel) !== undefined, 'Collapse.find:', Collapse.find(panel) !== undefined)
		console.log('probe R1 (trigger click) panel tokens:', JSON.stringify(Array.from(panel.classList)))
		expect(true).toBe(true)
	})
})
