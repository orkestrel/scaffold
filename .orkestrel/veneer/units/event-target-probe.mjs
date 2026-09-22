// Probe: does event.target survive dispatch in the host's Chromium, read from a recorder after dispatchEvent returns?
// Control: the same read inside the listener during dispatch (must be the host).
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.setContent('<!doctype html><html><body></body></html>')
const result = await page.evaluate(() => {
	const host = document.createElement('button')
	document.body.append(host)
	const detached = document.createElement('button')
	let recorded, during, recordedDetached, duringDetached
	host.addEventListener('x', (event) => { recorded = event; during = event.target === host })
	host.dispatchEvent(new CustomEvent('x', { bubbles: true, cancelable: false, detail: { pressed: true } }))
	detached.addEventListener('x', (event) => { recordedDetached = event; duringDetached = event.target === detached })
	detached.dispatchEvent(new CustomEvent('x', { bubbles: true }))
	return {
		version: navigator.userAgent,
		attachedDuring: during, attachedAfter: recorded.target === host, attachedAfterIsNull: recorded.target === null,
		detachedDuring: duringDetached, detachedAfter: recordedDetached.target === detached, detachedAfterIsNull: recordedDetached.target === null,
	}
})
console.log(JSON.stringify(result, null, 2))
await browser.close()
