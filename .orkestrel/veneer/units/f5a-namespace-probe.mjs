// F5a claim 15(a) host probe: is scanPositional's refusal branch reachable? A namespaced style rule's
// selectorText ("s|p") is a selector Element.matches cannot read without a namespace resolver.
// Read-only: launches the installed Chromium, sets content, reads the CSSOM, writes nothing.
import { chromium } from 'playwright'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.setContent('<style>@namespace s url("urn:audit"); s|p { margin: 0 } p { padding: 0 }</style><p>x</p>')
const reading = await page.evaluate(() => {
	const rules = [...document.styleSheets[0].cssRules]
	const out = []
	for (const rule of rules) {
		if (!(rule instanceof CSSStyleRule)) { out.push({ rule: rule.constructor.name, text: rule.cssText }); continue }
		const p = document.querySelector('p')
		let matches
		try { matches = p.matches(rule.selectorText) } catch (error) { matches = `THROWS ${error.name}: ${error.message}` }
		out.push({ selectorText: rule.selectorText, matches })
	}
	return { version: navigator.userAgent.match(/Chrome\/[\d.]+/)?.[0], out }
})
console.log(JSON.stringify(reading, null, 2))
await browser.close()
