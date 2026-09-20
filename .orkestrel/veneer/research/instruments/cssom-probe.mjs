// Probe: does Chromium's CSSStyleDeclaration enumerate custom properties declared in a :root rule
// read through document.styleSheets, including inside a cascade layer and a scoped selector?
// Control: a rule that declares no custom property must enumerate none.
import { chromium } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs'

const HTML = `<!doctype html><html><head><style>
:root { --vn-a: 1; color: red; }
@layer base { :root { --vn-b: 2; } }
[data-bs-theme='dark'] { --vn-c: 3; }
.control { color: blue; }
</style></head><body></body></html>`

async function readNames(page) {
	return page.evaluate(() => {
		const out = []
		const visit = (rules, layer) => {
			for (const rule of rules) {
				if (rule instanceof CSSStyleRule) {
					const names = Array.from(rule.style).filter((name) => name.startsWith('--'))
					out.push({ selector: rule.selectorText, layer, names, length: rule.style.length })
				} else if (rule instanceof CSSLayerBlockRule) {
					visit(rule.cssRules, rule.name)
				}
			}
		}
		for (const sheet of document.styleSheets) visit(sheet.cssRules, undefined)
		return out
	})
}

for (const launch of [{ label: 'chromium-1234', executablePath: process.env.LOCALAPPDATA + '/ms-playwright/chromium-1234/chrome-win64/chrome.exe' }, { label: 'msedge', channel: 'msedge' }]) {
	const browser = await chromium.launch(launch.channel ? { channel: launch.channel } : { executablePath: launch.executablePath })
	const page = await browser.newPage()
	await page.setContent(HTML)
	const version = browser.version()
	const rows = await readNames(page)
	console.log(JSON.stringify({ browser: launch.label, version, rows }, null, 1))
	await browser.close()
}
