// Orchestrator probe (round-6 audit, referral R2 and the objective lane's claim 6): what the
// dictionary path keeps of data-* attributes under a global attributes list, a listed data-* name,
// an element-local list with no global list, and no list at all.
import { expect, it } from 'vitest'

it('reads data-* survival under global and element-local attribute lists', () => {
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
		const sample = '<b data-x="1" data-y="2" title="t" class="c">t</b>'
		attempt('elementsOnly', sample, { sanitizer: { elements: ['b'] } })
		attempt('globalList', sample, { sanitizer: { elements: ['b'], attributes: ['title'] } })
		attempt('globalListNamesDataX', sample, { sanitizer: { elements: ['b'], attributes: ['title', 'data-x'] } })
		attempt('localListNoGlobal', sample, { sanitizer: { elements: [{ name: 'b', attributes: ['title'] }] } })
		attempt('localListNamesDataX', sample, { sanitizer: { elements: [{ name: 'b', attributes: ['title', 'data-x'] }] } })
		attempt('localAndGlobal', sample, { sanitizer: { elements: [{ name: 'b', attributes: ['data-y'] }], attributes: ['title'] } })
		attempt('globalListDataTrue', sample, { sanitizer: { elements: ['b'], attributes: ['title'], dataAttributes: true } })
		attempt('localListDataTrue', sample, { sanitizer: { elements: [{ name: 'b', attributes: ['title'] }], attributes: ['class'], dataAttributes: true } })
	}
	console.log(`PROBE8 ${JSON.stringify(readings)}`)
	expect(JSON.stringify(readings)).toBe('PROBE8')
})
