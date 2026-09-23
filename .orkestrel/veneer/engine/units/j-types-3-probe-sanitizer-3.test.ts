// Orchestrator probe: dataAttributes with `attributes` absent, and a per-element entry beside a flat control.
import { expect, it } from 'vitest'

it('reads dataAttributes with attributes absent and per-element entries against a flat control', () => {
	const host = document.createElement('div')
	const readings: Record<string, string> = {}
	const setHTML: unknown = Reflect.get(host, 'setHTML')
	readings['setHTML'] = typeof setHTML
	if (typeof setHTML === 'function') {
		const attempt = (name: string, html: string, options: unknown): void => {
			try {
				Reflect.apply(setHTML, host, [html, options])
				readings[name] = host.innerHTML
			} catch (error) {
				readings[`${name}.error`] = String(error)
			}
		}
		attempt('elementsOnly.data', '<span data-x="1" title="t" class="c">s</span>', { sanitizer: { elements: ['span'] } })
		attempt('empty.data', '<span data-x="1" title="t" class="c">s</span>', { sanitizer: {} })
		attempt('elementsOnly.dataFalse', '<span data-x="1" title="t">s</span>', { sanitizer: { elements: ['span'], dataAttributes: false } })
		attempt('perElement.bHref', '<b href="https://x">t</b><a href="https://x">l</a>', { sanitizer: { elements: [{ name: 'a', attributes: ['href'] }, 'b'] } })
		attempt('flat.bHref', '<b href="https://x">t</b><a href="https://x">l</a>', { sanitizer: { elements: ['a', 'b'], attributes: ['href'] } })
		attempt('perElement.plusGlobal', '<b class="c" href="https://x">t</b><a class="c" href="https://x">l</a>', { sanitizer: { elements: [{ name: 'a', attributes: ['href'] }, 'b'], attributes: ['class'] } })
	}
	console.log(`PROBE3 ${JSON.stringify(readings)}`)
	expect(readings['setHTML']).toBe('function')
})
