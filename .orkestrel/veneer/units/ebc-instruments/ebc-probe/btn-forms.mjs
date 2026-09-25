// Probe: under the retuned holder, reads every computed longhand of each `.btn` button form and of
// the same form written on an anchor, and prints the longhands that differ between them.
// Usage: node tmp/units/ebc-probe/btn-forms.mjs [css path]
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const css = readFileSync(process.argv[2] ?? 'dist/src/styles/index.css', 'utf8')
const holder =
	'--vn-weight-body: 700; --vn-button-shadow: 0 2px 6px rebeccapurple; font: 600 19px/29px serif'
const forms = [
	['filled', 'btn btn-primary', ''],
	['outline', 'btn btn-outline-primary', ''],
	['link', 'btn btn-link', ''],
	['large', 'btn btn-primary btn-lg', ''],
	['small', 'btn btn-primary btn-sm', ''],
	['disabled', 'btn btn-primary', 'disabled'],
]
const markup = forms
	.map(
		([name, classes, state]) =>
			`<button type="button" data-form="${name}" class="${classes}" ${state === 'disabled' ? 'disabled' : ''}>${name} form</button>` +
			`<a href="#harbor" data-anchor="${name}" class="${classes}${state === 'disabled' ? ' disabled' : ''}">${name} form</a>`,
	)
	.join('')
const browser = await chromium.launch({
	executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
const page = await browser.newPage()
await page.setContent(`<style>${css}</style><div style="${holder}">${markup}</div>`)
const result = await page.evaluate((names) => {
	const out = {}
	for (const name of names) {
		const button = document.querySelector(`[data-form="${name}"]`)
		const anchor = document.querySelector(`[data-anchor="${name}"]`)
		const b = getComputedStyle(button)
		const a = getComputedStyle(anchor)
		const diff = []
		for (let i = 0; i < b.length; i++) {
			const p = b[i]
			if (b.getPropertyValue(p) !== a.getPropertyValue(p))
				diff.push(`${p}: ${b.getPropertyValue(p)} | ${a.getPropertyValue(p)}`)
		}
		out[name] = diff
	}
	return out
}, forms.map(([name]) => name))
console.log(JSON.stringify(result, null, 1))
await browser.close()
