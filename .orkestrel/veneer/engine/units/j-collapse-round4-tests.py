# J-COLLAPSE round 4 proofs: F1's three hide doors after the removal, F2's href-named conflict, and
# F5's title.
import pathlib

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse')


def edit(path, pairs):
    file = ROOT / path
    text = file.read_text(encoding='utf-8')
    for old, new in pairs:
        if text.count(old) != 1:
            raise SystemExit(f'{path}: expected one match: {old[:90]!r} found {text.count(old)}')
        text = text.replace(old, new)
    file.write_text(text, encoding='utf-8', newline='\n')


DOORS = r'''	it('stops a hide whose host-and-shown removal a reaction answers by adding the shown token back, writing nothing more', async () => {
		const name = 'vn-collapse-hide-removal-changed'
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
		const root = scene.mount(`
			<button type="button" aria-expanded="true" data-bs-toggle="collapse" data-bs-target="#details">Details</button>`)
		const trigger = requireValue(root.querySelector('button'), 'No trigger')
		const panel = document.createElement(name)
		panel.id = 'details'
		panel.className = 'collapse show'
		root.append(panel)
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, { on: { hidden: (event) => events.handler(event.type) } })
		onTestFinished(() => collapse.destroy())
		const writes = createRecorder<readonly [readonly MutationRecord[]]>()
		const observer = new MutationObserver((records) => writes.handler(records))
		onTestFinished(() => observer.disconnect())
		reactions.set(panel, (value) => {
			const tokens = (value ?? '').split(' ')
			if (tokens.includes('collapse') || tokens.includes('show')) return
			reactions.delete(panel)
			panel.classList.add('show')
			observer.observe(root, { attributes: true, subtree: true })
		})
		expect(await collapse.hide()).toBe(false)
		expect([...writes.calls.flat(2), ...observer.takeRecords()]).toEqual([])
		expect(events.count).toBe(0)
		expect(Array.from(panel.classList)).toEqual(['collapsing', 'show'])
		expect(trigger.getAttribute('aria-expanded')).toBe('true')
		expect(trigger.hasAttribute('class')).toBe(false)
	})

	// The clearing starts the cascade's transition, so a call that went on to await it would resolve
	// only after the transition settles; the call that stops at the clearing door resolves while it
	// still runs.
	it('stops a hide whose size clearing a reaction answers by adding the shown token, dispatching no hidden event', async () => {
		const name = 'vn-collapse-hide-clearing-changed'
		const reactions = new WeakMap<HTMLElement, (value: string | null) => void>()
		customElements.define(
			name,
			class extends HTMLElement {
				static observedAttributes = ['style']
				attributeChangedCallback(_name: string, _previous: string | null, value: string | null) {
					reactions.get(this)?.(value)
				}
			},
		)
		scene.load(collapseCascade)
		const root = scene.mount('<div></div>')
		const panel = document.createElement(name)
		panel.className = 'collapse show'
		panel.innerHTML = '<div style="height: 40px"></div>'
		root.append(panel)
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, { on: { hidden: (event) => events.handler(event.type) } })
		onTestFinished(() => collapse.destroy())
		const writes = createRecorder<readonly [readonly MutationRecord[]]>()
		const observer = new MutationObserver((records) => writes.handler(records))
		onTestFinished(() => observer.disconnect())
		reactions.set(panel, (value) => {
			if ((value ?? '').includes('height')) return
			reactions.delete(panel)
			panel.classList.add('show')
			observer.observe(root, { attributes: true, subtree: true })
		})
		expect(await collapse.hide()).toBe(false)
		expect(panel.getAnimations()).toHaveLength(1)
		expect([...writes.calls.flat(2), ...observer.takeRecords()]).toEqual([])
		expect(events.count).toBe(0)
		expect(Array.from(panel.classList)).toEqual(['collapsing', 'show'])
	})

	it('stops a hide when the shown token returns during its transition, dispatching no hidden event', async () => {
		scene.load(collapseCascade)
		const root = scene.mount(
			'<div id="details" class="collapse show"><div style="height: 40px"></div></div>',
		)
		const panel = requireValue(root.querySelector<HTMLElement>('#details'), 'No panel')
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, { on: { hidden: (event) => events.handler(event.type) } })
		onTestFinished(() => collapse.destroy())
		const hiding = collapse.hide()
		const transition = requireValue(panel.getAnimations()[0], 'No transition')
		await transition.ready
		panel.classList.add('show')
		expect(await hiding).toBe(false)
		expect(events.count).toBe(0)
		expect(Array.from(panel.classList)).toEqual(['collapsing', 'show'])
	})

'''

edit('tests/src/browser/Collapse.test.ts', [
    ("""	it('stops a hide whose trigger write a reaction answers by adding the shown token, writing nothing more', async () => {""",
     DOORS + """	it('stops a hide whose trigger write a reaction answers by adding the shown token, writing nothing more', async () => {"""),
    ("""	it('destroys a sibling collapse it constructed at its next change after that sibling panel leaves the document', async () => {""",
     """	it('destroys a sibling collapse it constructed at its next show or hide call, refused or not, after that sibling panel leaves the document', async () => {"""),
])

HREF = r'''	it('refuses a click whose anchor trigger names its own panel through its href when neither engine exists, driving neither route', async () => {
		const root = scene.mount(`
			<div id="panel" class="collapse" data-vn-press>
				<a href="#panel" data-bs-toggle="collapse">Inside</a>
			</div>`)
		onTestFinished(() => scene.clear())
		const panel = requireValue(root.querySelector<HTMLElement>('#panel'), 'No panel')
		const trigger = requireValue(root.querySelector('a'), 'No trigger')
		const events = createRecorder<readonly [string]>()
		const prevented = createRecorder<readonly [boolean]>()
		const controller = new AbortController()
		onTestFinished(() => controller.abort())
		for (const name of ['toggle.vn.button', 'show.vn.collapse']) {
			root.addEventListener(name, (event) => events.handler(event.type), {
				signal: controller.signal,
			})
		}
		// The document hears the click after the delegate's root, so it reads what the delegate did
		// and then keeps the anchor from navigating the test page.
		document.addEventListener(
			'click',
			(event) => {
				prevented.handler(event.defaultPrevented)
				event.preventDefault()
			},
			{ signal: controller.signal },
		)
		const delegate = new Delegate({ root, button: { selectors: { trigger: '[data-vn-press]' } } })
		onTestFinished(() => delegate.destroy())
		trigger.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
		await Promise.resolve()
		expect(prevented.calls).toEqual([[false]])
		expect(events.calls).toEqual([])
		expect(Button.find(panel)).toBeUndefined()
		expect(Collapse.find(panel)).toBeUndefined()
		expect(Array.from(panel.classList)).toEqual(['collapse'])
		expect(panel.hasAttribute('aria-pressed')).toBe(false)
		expect(trigger.hasAttribute('aria-expanded')).toBe(false)
	})

'''

edit('tests/src/browser/Delegate.test.ts', [
    ("""	it('drives the button route and the collapse route once each when the button host is the panel itself and carries a button a consumer constructed', async () => {""",
     HREF + """	it('drives the button route and the collapse route once each when the button host is the panel itself and carries a button a consumer constructed', async () => {"""),
])
print('ok')
