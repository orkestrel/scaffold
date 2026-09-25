// Reads how Chromium computes a registered custom property under `<custom-ident>` and under the
// `font-family` property, for identifiers that differ only in case, with a control pair that differs in text.
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
const rows = await page.evaluate(() => {
	CSS.registerProperty({ name: '--ident', syntax: '<custom-ident>', inherits: false, initialValue: 'none' })
	const read = (declaration, property) => {
		const element = document.createElement('div')
		element.setAttribute('style', declaration)
		document.body.append(element)
		const value = getComputedStyle(element).getPropertyValue(property).trim()
		element.remove()
		return value
	}
	return [
		['<custom-ident> SERIF', read('--ident: SERIF', '--ident')],
		['<custom-ident> serif', read('--ident: serif', '--ident')],
		['<custom-ident> Monospace', read('--ident: Monospace', '--ident')],
		['<custom-ident> monospace', read('--ident: monospace', '--ident')],
		['font-family SERIF', read('font-family: SERIF', 'font-family')],
		['font-family serif', read('font-family: serif', 'font-family')],
		['control <custom-ident> alpha', read('--ident: alpha', '--ident')],
		['control <custom-ident> beta', read('--ident: beta', '--ident')],
	]
})
for (const [label, value] of rows) console.log(`ROW ${label} => ${JSON.stringify(value)}`)
console.log(`BUILD ${browser.version()}`)
await browser.close()
