# J-COLLAPSE round 3 proofs, written before their fixes: D1's trigger-write door in hide, D2's
# same-host refusal and the retargeted same-host drive, and D5's refused call before the prune.
import pathlib

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse')


def edit(path, pairs):
    file = ROOT / path
    text = file.read_text(encoding='utf-8')
    for old, new in pairs:
        if text.count(old) != 1:
            raise SystemExit(f'{path}: expected one match: {old[:90]!r} found {text.count(old)}')
        text = text.replace(old, new)
    file.write_text(text, encoding='utf-8', newline='\n')


TRIGGER_DOOR = r'''	it('stops a hide whose trigger write a reaction answers by adding the shown token, writing nothing more', async () => {
		const name = 'vn-collapse-hide-trigger-changed'
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
		const root = scene.mount(`<div id="details" class="collapse show"></div>`)
		const panel = requireValue(root.querySelector<HTMLElement>('#details'), 'No panel')
		const trigger = document.createElement(name)
		trigger.setAttribute('data-bs-toggle', 'collapse')
		trigger.setAttribute('data-bs-target', '#details')
		trigger.setAttribute('aria-expanded', 'true')
		root.append(trigger)
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, { on: { hidden: (event) => events.handler(event.type) } })
		onTestFinished(() => collapse.destroy())
		const writes = createRecorder<readonly [readonly MutationRecord[]]>()
		const observer = new MutationObserver((records) => writes.handler(records))
		onTestFinished(() => observer.disconnect())
		reactions.set(trigger, (value) => {
			if (!(value ?? '').split(' ').includes('collapsed')) return
			reactions.delete(trigger)
			panel.classList.add('show')
			observer.observe(root, { attributes: true, subtree: true })
		})
		expect(await collapse.hide()).toBe(false)
		expect([...writes.calls.flat(2), ...observer.takeRecords()]).toEqual([])
		expect(events.count).toBe(0)
		expect(Array.from(panel.classList)).toEqual(['collapsing', 'show'])
		expect(Array.from(trigger.classList)).toEqual(['collapsed'])
		expect(trigger.getAttribute('aria-expanded')).toBe('true')
	})

'''

edit('tests/src/browser/Collapse.test.ts', [
    ("""	it('stops a hide whose completing token write a reaction answers by adding the shown token, dispatching no hidden event', async () => {""",
     TRIGGER_DOOR + """	it('stops a hide whose completing token write a reaction answers by adding the shown token, dispatching no hidden event', async () => {"""),
    ("""		first.remove()
		expect(Collapse.find(first)).toBe(sibling)
		expect(await collapse.hide()).toBe(true)
		expect(Collapse.find(first)).toBeUndefined()
		expect(Array.from(first.classList).sort()).toEqual(['collapse', 'show'])
""", """		first.remove()
		expect(Collapse.find(first)).toBe(sibling)
		expect(await collapse.show()).toBe(false)
		expect(Collapse.find(first)).toBeUndefined()
		expect(Array.from(first.classList).sort()).toEqual(['collapse', 'show'])
		expect(await collapse.hide()).toBe(true)
		expect(Collapse.find(first)).toBeUndefined()
"""),
])

REFUSAL = r'''	it('refuses a click whose button host is a panel the collapse trigger names when neither engine exists, driving neither route', async () => {
		const root = scene.mount(`
			<div id="panel" class="collapse" data-vn-press>
				<button type="button" data-bs-toggle="collapse" data-bs-target="#panel">Inside</button>
			</div>`)
		onTestFinished(() => scene.clear())
		const panel = requireValue(root.querySelector<HTMLElement>('#panel'), 'No panel')
		const trigger = requireValue(root.querySelector('button'), 'No trigger')
		const events = createRecorder<readonly [string]>()
		const controller = new AbortController()
		onTestFinished(() => controller.abort())
		for (const name of ['toggle.vn.button', 'show.vn.collapse']) {
			root.addEventListener(name, (event) => events.handler(event.type), {
				signal: controller.signal,
			})
		}
		const delegate = new Delegate({ root, button: { selectors: { trigger: '[data-vn-press]' } } })
		onTestFinished(() => delegate.destroy())
		const click = new MouseEvent('click', { bubbles: true, cancelable: true })
		expect(trigger.dispatchEvent(click)).toBe(true)
		await Promise.resolve()
		expect(click.defaultPrevented).toBe(false)
		expect(events.calls).toEqual([])
		expect(Button.find(panel)).toBeUndefined()
		expect(Collapse.find(panel)).toBeUndefined()
		expect(Array.from(panel.classList)).toEqual(['collapse'])
		expect(panel.hasAttribute('aria-pressed')).toBe(false)
		expect(trigger.hasAttribute('aria-expanded')).toBe(false)
	})

	it('drives the button route and the collapse route once each when the button host is the panel itself and carries a button a consumer constructed', async () => {'''

edit('tests/src/browser/Delegate.test.ts', [
    ("""	it('drives the button route and the collapse route once each when the button host is the panel itself', async () => {""",
     REFUSAL),
    ("""		const delegate = new Delegate({ root, button: { selectors: { trigger: '[data-vn-press]' } } })
		onTestFinished(() => delegate.destroy())
		trigger.click()
		await waitForCondition('the panel shows', () => panel.classList.contains('show'))
		expect(events.calls).toEqual([['toggle.vn.button'], ['show.vn.collapse']])
		expect(panel.getAttribute('aria-pressed')).toBe('true')
		expect(Array.from(panel.classList)).toEqual(['active', 'collapse', 'show'])
""", """		const pressing = new Button(panel)
		onTestFinished(() => pressing.destroy())
		const delegate = new Delegate({ root, button: { selectors: { trigger: '[data-vn-press]' } } })
		onTestFinished(() => delegate.destroy())
		trigger.click()
		await waitForCondition('the panel shows', () => panel.classList.contains('show'))
		expect(events.calls).toEqual([['toggle.vn.button'], ['show.vn.collapse']])
		expect(Button.find(panel)).toBe(pressing)
		expect(panel.getAttribute('aria-pressed')).toBe('true')
		expect(Array.from(panel.classList)).toEqual(['active', 'collapse', 'show'])
"""),
])
print('ok')
