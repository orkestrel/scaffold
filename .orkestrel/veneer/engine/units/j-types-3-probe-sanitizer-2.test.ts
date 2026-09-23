// Orchestrator probe: per-element attribute entries and data: URLs on the setHTML dictionary path.
// Ran 2026-09-23 through the scratchpad probe config over the Veneer checkout at 1868007
// (Chromium 153.0.8010.12); its readings are j-types-3-probe-sanitizer-2.log.txt beside this file.
import { expect, it } from 'vitest'

it('reads per-element attributes and data: URLs on the dictionary path', () => {
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
		attempt('perElement', '<a href="https://x" title="t" class="c">a</a><span href="https://y" class="c">s</span>', { sanitizer: { elements: [{ name: 'a', attributes: ['href'] }, 'span'], attributes: ['class'] } })
		attempt('dataImage', '<img src="data:image/png;base64,iVBORw0KGgo=" alt="i"><a href="data:text/html,x">a</a>', { sanitizer: { elements: ['img', 'a'], attributes: ['src', 'alt', 'href'] } })
		attempt('unlistedElement', '<p>p<i>i</i><b>b</b></p>', { sanitizer: { elements: ['p', 'b'] } })
		attempt('replaceWithChildren', '<p>p<i>i</i><b>b</b></p>', { sanitizer: { elements: ['p', 'b'], replaceWithChildrenElements: ['i'] } })
		attempt('removeElementsOnly', '<p>p<i>i</i><b>b</b><script>1</script></p>', { sanitizer: { removeElements: ['b'] } })
	}
	console.log(`PROBE2 ${JSON.stringify(readings)}`)
	expect(readings['setHTML']).toBe('function')
})
