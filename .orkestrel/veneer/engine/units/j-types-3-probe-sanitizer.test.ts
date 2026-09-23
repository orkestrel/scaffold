// Orchestrator probe (J-TYPES round 3): does Chromium 153's setHTML accept a SanitizerConfig
// dictionary as its `sanitizer` option, and does that path honour elements, attributes, the
// aria-* pattern, and dataAttributes the way the constructed Sanitizer did in terrain probe 2?
import { expect, it } from 'vitest'

it('reads the dictionary path of setHTML', () => {
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
		attempt('dictionary.elements', '<b class="c" id="i">b</b><a href="https://x" aria-label="l" onclick="x()">a</a><i>i</i><span title="t" data-x="1">s</span>', { sanitizer: { elements: ['b', 'a', 'span'], attributes: ['class', 'href', 'aria-label', 'title'], dataAttributes: false } })
		attempt('dictionary.dataTrue', '<span aria-label="l" data-x="1">s</span>', { sanitizer: { elements: ['span'], attributes: ['aria-label'], dataAttributes: true } })
		attempt('dictionary.dataAbsent', '<span aria-label="l" data-x="1">s</span>', { sanitizer: { elements: ['span'], attributes: ['aria-label'] } })
		attempt('dictionary.ariaWildcard', '<span aria-label="l">s</span>', { sanitizer: { elements: ['span'], attributes: ['aria-*'] } })
		attempt('dictionary.empty', '<b>x</b><script>1</script>', { sanitizer: {} })
		attempt('dictionary.javascriptHref', '<a href="javascript:x()">a</a>', { sanitizer: { elements: ['a'], attributes: ['href'] } })
	}
	console.log(`PROBE ${JSON.stringify(readings)}`)
	expect(readings['setHTML']).toBe('function')
})
