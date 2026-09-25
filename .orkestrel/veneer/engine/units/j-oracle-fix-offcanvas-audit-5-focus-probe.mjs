// The Orchestrator's probe (2026-09-25): does a root's activeElement reading differ from matches(':focus') on a page
// without system focus, on this host's Chromium? It reads a light-tree button and a button in a closed shadow root on
// page A, first while A holds focus, then after page B is brought to front with focus emulation off on both pages.
import { createRequire } from 'node:module'

const require = createRequire('C:/Users/mikes/WebstormProjects/veneer/package.json')
const { chromium } = require('playwright')

const html = `<button id="light">light</button><div id="host"></div><script>
const root = document.getElementById('host').attachShadow({ mode: 'closed' })
root.innerHTML = '<button id="deep">deep</button>'
window.readFocus = (which) => {
  const element = which === 'light' ? document.getElementById('light') : root.getElementById('deep')
  const scope = element.getRootNode()
  return { which, hasFocus: document.hasFocus(), rootActive: scope.activeElement === element, matchesFocus: element.matches(':focus'), hostMatches: document.getElementById('host').matches(':focus') }
}
window.focusDeep = () => root.getElementById('deep').focus()
</script>`

async function read(page, label) {
	const rows = []
	for (const which of ['light', 'deep']) {
		if (which === 'light') await page.evaluate(() => document.getElementById('light').focus())
		else await page.evaluate(() => window.focusDeep())
		rows.push(await page.evaluate((w) => window.readFocus(w), which))
	}
	console.log(label, JSON.stringify(rows))
}

async function readUnfocused(a, b, label) {
	const rows = []
	for (const which of ['light', 'deep']) {
		await a.bringToFront()
		if (which === 'light') await a.evaluate(() => document.getElementById('light').focus())
		else await a.evaluate(() => window.focusDeep())
		await b.bringToFront()
		await b.evaluate(() => document.body.focus())
		rows.push(await a.evaluate((w) => window.readFocus(w), which))
	}
	console.log(label, JSON.stringify(rows))
}

for (const headless of [true, false]) {
	const browser = await chromium.launch({ headless })
	console.log('browser', headless ? 'headless' : 'headed', browser.version())
	const context = await browser.newContext()
	const a = await context.newPage()
	await a.setContent(html)
	await read(a, 'A focused (emulation on)')
	const b = await context.newPage()
	await b.setContent('<p>other</p>')
	const sa = await context.newCDPSession(a)
	const sb = await context.newCDPSession(b)
	await sa.send('Emulation.setFocusEmulationEnabled', { enabled: false })
	await sb.send('Emulation.setFocusEmulationEnabled', { enabled: false })
	await readUnfocused(a, b, 'A behind B (emulation off)')
	await browser.close()
}
