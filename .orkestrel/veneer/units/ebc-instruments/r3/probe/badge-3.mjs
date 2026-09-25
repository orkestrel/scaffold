// Probe (round 3): reads the Badge section's button specimen host under the built Veneer cascade,
// once as shipped (`btn btn-primary`) and once with the `btn` class alone, beside the dark cell it
// sits in and the root body-text token, so the comment beside the `btn-primary` expectation can
// be checked against what the `btn` class alone paints.
// Usage: node tmp/units/ebc-probe/badge-3.mjs
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const css = readFileSync('dist/src/styles/index.css', 'utf8')
const browser = await chromium.launch({
	executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
const page = await browser.newPage()
await page.emulateMedia({ reducedMotion: 'reduce' })
await page.setContent(
	`<style>${css}</style>` +
		['btn btn-primary', 'btn']
			.map(
				(classes) =>
					`<table class="table table-dark"><tbody><tr><td><button type="button" class="${classes}">Inbox <span class="badge">7</span></button></td></tr></tbody></table>`,
			)
			.join(''),
)
const rows = await page.evaluate(() => {
	const probe = document.createElement('div')
	probe.style.color = 'var(--vn-text-body-base)'
	document.body.append(probe)
	const body = getComputedStyle(probe).color
	return [...document.querySelectorAll('td')].map((cell) => {
		const button = cell.querySelector('button')
		const badge = cell.querySelector('.badge')
		const style = getComputedStyle(button)
		return {
			classes: button.className,
			buttonColor: style.color,
			buttonBackground: style.backgroundColor,
			bodyText: body,
			colorIsBodyText: style.color === body,
			cellBackground: getComputedStyle(cell).backgroundColor,
			cellShadow: getComputedStyle(cell).boxShadow,
			badgeColor: getComputedStyle(badge).color,
			badgeBackground: getComputedStyle(badge).backgroundColor,
		}
	})
})
for (const row of rows) console.log(JSON.stringify(row))
await browser.close()
