# J-COLLAPSE round 2 proofs: C1's write-door cases, C7's removed sibling, C8's style assertion and
# constructor-parent case, C3's first HTML match, and C2's delegate cases.
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


DOORS = r'''
	// Each case below drives a custom element whose attribute reaction runs inside the engine's own
	// write and changes the panel's tokens without destroying the collapse or starting another call.
	// The observer starts inside the reaction, so every record it takes is a write the call made after
	// the panel showed the change.
	it('stops a show whose transition-token write a reaction answers by removing that token, writing nothing more', async () => {
		const name = 'vn-collapse-show-token-removed'
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
			<button type="button" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#details">Details</button>`)
		const trigger = requireValue(root.querySelector('button'), 'No trigger')
		const panel = document.createElement(name)
		panel.id = 'details'
		panel.className = 'collapse'
		root.append(panel)
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, {
			on: {
				show: (event) => events.handler(event.type),
				shown: (event) => events.handler(event.type),
			},
		})
		onTestFinished(() => collapse.destroy())
		const writes = createRecorder<readonly [readonly MutationRecord[]]>()
		const observer = new MutationObserver((records) => writes.handler(records))
		onTestFinished(() => observer.disconnect())
		reactions.set(panel, (value) => {
			if (!(value ?? '').split(' ').includes('collapsing')) return
			reactions.delete(panel)
			panel.classList.remove('collapsing')
			observer.observe(root, { attributes: true, subtree: true })
		})
		expect(await collapse.show()).toBe(false)
		expect([...writes.calls.flat(2), ...observer.takeRecords()]).toEqual([])
		expect(events.calls).toEqual([['show.vn.collapse']])
		expect(Array.from(panel.classList)).toEqual(['collapse'])
		expect(panel.hasAttribute('style')).toBe(false)
		expect(trigger.getAttribute('aria-expanded')).toBe('false')
		expect(trigger.hasAttribute('class')).toBe(false)
	})

	it('stops a show whose completing token write a reaction answers by removing the shown token, dispatching no shown event', async () => {
		const name = 'vn-collapse-show-completion-changed'
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
		const panel = document.createElement(name)
		panel.className = 'collapse'
		root.append(panel)
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, { on: { shown: (event) => events.handler(event.type) } })
		onTestFinished(() => collapse.destroy())
		const writes = createRecorder<readonly [readonly MutationRecord[]]>()
		const observer = new MutationObserver((records) => writes.handler(records))
		onTestFinished(() => observer.disconnect())
		reactions.set(panel, (value) => {
			if (!(value ?? '').split(' ').includes('show')) return
			reactions.delete(panel)
			panel.classList.remove('show')
			observer.observe(root, { attributes: true, subtree: true })
		})
		expect(await collapse.show()).toBe(false)
		expect([...writes.calls.flat(2), ...observer.takeRecords()]).toEqual([])
		expect(events.count).toBe(0)
		expect(collapse.shown).toBe(false)
		expect(Array.from(panel.classList)).toEqual(['collapsing', 'collapse'])
	})

	it('stops a hide whose size write a reaction answers by removing the shown token, writing no transition token', async () => {
		const name = 'vn-collapse-hide-size-changed'
		const reactions = new WeakMap<HTMLElement, () => void>()
		customElements.define(
			name,
			class extends HTMLElement {
				static observedAttributes = ['style']
				attributeChangedCallback() {
					reactions.get(this)?.()
				}
			},
		)
		const root = scene.mount('<div></div>')
		const panel = document.createElement(name)
		panel.className = 'collapse show'
		root.append(panel)
		const events = createRecorder<readonly [string]>()
		const collapse = new Collapse(panel, { on: { hidden: (event) => events.handler(event.type) } })
		onTestFinished(() => collapse.destroy())
		const writes = createRecorder<readonly [readonly MutationRecord[]]>()
		const observer = new MutationObserver((records) => writes.handler(records))
		onTestFinished(() => observer.disconnect())
		reactions.set(panel, () => {
			reactions.delete(panel)
			panel.classList.remove('show')
			observer.observe(root, { attributes: true, subtree: true })
		})
		expect(await collapse.hide()).toBe(false)
		expect([...writes.calls.flat(2), ...observer.takeRecords()]).toEqual([])
		expect(events.count).toBe(0)
		expect(Array.from(panel.classList)).toEqual(['collapse'])
	})

	it('stops a hide whose transition-token write a reaction answers by removing that token, writing nothing more', async () => {
		const name = 'vn-collapse-hide-token-removed'
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
			if (!(value ?? '').split(' ').includes('collapsing')) return
			reactions.delete(panel)
			panel.classList.remove('collapsing')
			observer.observe(root, { attributes: true, subtree: true })
		})
		expect(await collapse.hide()).toBe(false)
		expect([...writes.calls.flat(2), ...observer.takeRecords()]).toEqual([])
		expect(events.count).toBe(0)
		expect(Array.from(panel.classList)).toEqual(['collapse', 'show'])
		expect(trigger.getAttribute('aria-expanded')).toBe('true')
		expect(trigger.hasAttribute('class')).toBe(false)
	})

	it('stops a hide whose completing token write a reaction answers by adding the shown token, dispatching no hidden event', async () => {
		const name = 'vn-collapse-hide-completion-changed'
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
		const panel = document.createElement(name)
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
			if (!tokens.includes('collapse') || !tokens.includes('collapsing') || tokens.includes('show')) {
				return
			}
			reactions.delete(panel)
			panel.classList.add('show')
			observer.observe(root, { attributes: true, subtree: true })
		})
		expect(await collapse.hide()).toBe(false)
		expect([...writes.calls.flat(2), ...observer.takeRecords()]).toEqual([])
		expect(events.count).toBe(0)
		expect(Array.from(panel.classList)).toEqual(['collapsing', 'collapse', 'show'])
	})

	it('destroys a sibling collapse it constructed at its next change after that sibling panel leaves the document', async () => {
		const root = scene.mount(`
			<div id="accordion">
				<div id="first" class="collapse show" data-bs-parent="#accordion"></div>
				<div id="second" class="collapse" data-bs-parent="#accordion"></div>
			</div>`)
		const first = requireValue(root.querySelector<HTMLElement>('#first'), 'No first panel')
		const second = requireValue(root.querySelector<HTMLElement>('#second'), 'No second panel')
		const collapse = new Collapse(second)
		onTestFinished(() => collapse.destroy())
		expect(await collapse.show()).toBe(true)
		await waitForCondition('the first panel hides', () => !first.classList.contains('show'))
		const sibling = requireValue(Collapse.find(first), 'No sibling collapse')
		onTestFinished(() => sibling.destroy())
		first.remove()
		expect(Collapse.find(first)).toBe(sibling)
		expect(await collapse.hide()).toBe(true)
		expect(Collapse.find(first)).toBeUndefined()
		expect(Array.from(first.classList).sort()).toEqual(['collapse', 'show'])
		expect(Collapse.find(second)).toBe(collapse)
	})
'''

edit('tests/src/browser/Collapse.test.ts', [
    ("""		expect(Array.from(panel.classList)).toEqual(['collapse'])
		expect(panel.style.length).toBe(0)
""", """		expect(Array.from(panel.classList)).toEqual(['collapse'])
		expect(panel.hasAttribute('style')).toBe(false)
"""),
    ("""		expect(Collapse.find(panel)).toBeUndefined()
		const collapse = new Collapse(panel, { attributes: { parent: 'data-vn-parent' } })
		onTestFinished(() => collapse.destroy())
		expect(Collapse.find(panel)).toBe(collapse)
	})
""", """		expect(Collapse.find(panel)).toBeUndefined()
		const collapse = new Collapse(panel, { attributes: { parent: 'data-vn-parent' } })
		onTestFinished(() => collapse.destroy())
		expect(Collapse.find(panel)).toBe(collapse)
		collapse.destroy()
		const parented = new Collapse(panel, { parent: root })
		onTestFinished(() => parented.destroy())
		expect(Collapse.find(panel)).toBe(parented)
	})
"""),
    ("""	it('shows through the transition token and an inline pixel height, then writes the host and shown tokens and expands every trigger', async () => {""",
     """	it('shows and hides through the transition token and an inline pixel size, keeping every trigger in step', async () => {"""),
    ("""	it('restores a shared trigger to its original when the restoration that saved first destroys the button inside its token write', async () => {""",
     DOORS.lstrip('\n') + """
	it('restores a shared trigger to its original when the restoration that saved first destroys the button inside its token write', async () => {"""),
])

edit('tests/src/browser/parsers.test.ts', [
    ("""		expect(parseElement(detached)).toBe(detached)
	})
""", """		expect(parseElement(detached)).toBe(detached)
	})

	it('returns the first HTML element among the matches when a non-HTML element matches first', () => {
		const vector = mount(document.createElementNS('http://www.w3.org/2000/svg', 'svg'))
		vector.setAttribute('class', 'vn-parse-mixed')
		const html = mount(build('div', { classes: 'vn-parse-mixed' }))
		onTestFinished(() => vector.remove())
		onTestFinished(() => html.remove())
		expect(document.querySelector('.vn-parse-mixed')).toBe(vector)
		expect(parseElement('.vn-parse-mixed')).toBe(html)
	})
"""),
])

DELEGATE = r'''
	it('leaves a panel outside an inner root to the outer delegate whose root contains it', async () => {
		const root = scene.mount(`
			<div id="inner">
				<button type="button" data-bs-toggle="collapse" data-bs-target="#panel">Open</button>
			</div>
			<div id="panel" class="collapse"></div>`)
		onTestFinished(() => scene.clear())
		const inner = requireValue(root.querySelector<HTMLElement>('#inner'), 'No inner root')
		const panel = requireValue(root.querySelector<HTMLElement>('#panel'), 'No panel')
		const trigger = requireValue(root.querySelector('button'), 'No trigger')
		const outer = new Delegate({ root })
		const nested = new Delegate({ root: inner })
		onTestFinished(() => outer.destroy())
		onTestFinished(() => nested.destroy())
		trigger.click()
		await waitForCondition('the panel shows', () => panel.classList.contains('show'))
		expect(trigger.getAttribute('aria-expanded')).toBe('true')
		nested.destroy()
		expect(Collapse.find(panel)?.shown).toBe(true)
		outer.destroy()
		expect(Collapse.find(panel)).toBeUndefined()
		expect(Array.from(panel.classList)).toEqual(['collapse'])
	})

	it('leaves the panels a delegate destroyed during the click has not reached to a live outer delegate', async () => {
		const root = scene.mount(`
			<div id="inner">
				<button type="button" data-bs-toggle="collapse" data-bs-target="#first, #second">Both</button>
				<div id="first" class="collapse"></div>
				<div id="second" class="collapse"></div>
			</div>`)
		onTestFinished(() => scene.clear())
		const inner = requireValue(root.querySelector<HTMLElement>('#inner'), 'No inner root')
		const first = requireValue(root.querySelector<HTMLElement>('#first'), 'No first panel')
		const second = requireValue(root.querySelector<HTMLElement>('#second'), 'No second panel')
		const trigger = requireValue(root.querySelector('button'), 'No trigger')
		const controller = new AbortController()
		onTestFinished(() => controller.abort())
		const outer = new Delegate({ root })
		const nested = new Delegate({ root: inner })
		onTestFinished(() => outer.destroy())
		onTestFinished(() => nested.destroy())
		first.addEventListener('show.vn.collapse', () => nested.destroy(), {
			signal: controller.signal,
		})
		trigger.click()
		await waitForCondition('the second panel shows', () => second.classList.contains('show'))
		expect(Collapse.find(first)).toBeUndefined()
		expect(Array.from(first.classList)).toEqual(['collapse'])
		expect(Collapse.find(second)?.shown).toBe(true)
		outer.destroy()
		expect(Array.from(second.classList)).toEqual(['collapse'])
	})

	it('drives the button route and the collapse route once each when the button host is the panel itself', async () => {
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
		trigger.click()
		await waitForCondition('the panel shows', () => panel.classList.contains('show'))
		expect(events.calls).toEqual([['toggle.vn.button'], ['show.vn.collapse']])
		expect(panel.getAttribute('aria-pressed')).toBe('true')
		expect(Array.from(panel.classList)).toEqual(['active', 'collapse', 'show'])
	})
'''

edit('tests/src/browser/Delegate.test.ts', [
    ("""	it('refuses a collapse group value that is not a class token, an attribute name, or a selector at construction', () => {""",
     DELEGATE.lstrip('\n') + """
	it('refuses a collapse group value that is not a class token, an attribute name, or a selector at construction', () => {"""),
])
print('ok')
