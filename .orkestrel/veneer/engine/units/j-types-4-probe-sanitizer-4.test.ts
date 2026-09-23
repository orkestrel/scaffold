// Orchestrator probe (round-4 referrals R1 and R2): what the no-options, empty-dictionary, and
// elements-only paths keep on one element, and whether dataAttributes: true is refused alone.
import { expect, it } from 'vitest'

it('reads the safe baseline against the elements-only path and dataAttributes true alone', () => {
	const host = document.createElement('div')
	const readings: Record<string, string> = {}
	const setHTML: unknown = Reflect.get(host, 'setHTML')
	readings['setHTML'] = typeof setHTML
	if (typeof setHTML === 'function') {
		const attempt = (name: string, html: string, options?: unknown): void => {
			try {
				Reflect.apply(setHTML, host, options === undefined ? [html] : [html, options])
				readings[name] = host.innerHTML
			} catch (error) {
				readings[`${name}.error`] = String(error)
			}
		}
		const sample = '<b href="https://x" data-x="1" title="t" class="c" onclick="x()" id="i" aria-label="l">t</b>'
		attempt('noOptions', sample)
		attempt('emptyDictionary', sample, { sanitizer: {} })
		attempt('elementsOnly', sample, { sanitizer: { elements: ['b'] } })
		attempt('dataTrueAlone', '<span data-x="1">s</span>', { sanitizer: { elements: ['span'], dataAttributes: true } })
		attempt('dataTrueAloneNoElements', '<span data-x="1">s</span>', { sanitizer: { dataAttributes: true } })
	}
	console.log(`PROBE4 ${JSON.stringify(readings)}`)
	expect(readings['setHTML']).toBe('function')
})
