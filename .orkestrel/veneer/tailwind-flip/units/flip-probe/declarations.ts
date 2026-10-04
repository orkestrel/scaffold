import { launchBrowser, readSheet, writeJSON } from './lib.ts'
const browser = await launchBrowser()
const page = await browser.newPage()
const readings = await page.evaluate((text) => {
	const sheet = new CSSStyleSheet()
	sheet.replaceSync(text)
	const pending = [...sheet.cssRules]
	const rows = []
	while (pending.length) {
		const rule = pending.shift()
		if (rule instanceof CSSStyleRule && ['.p-2', '.mx-2', '.border'].includes(rule.selectorText)) rows.push({ selector: rule.selectorText, text: rule.style.cssText, names: [...rule.style], left: rule.style.getPropertyValue('padding-left'), border: rule.style.getPropertyValue('border-top-color') })
		if (rule && 'cssRules' in rule && rule.cssRules instanceof CSSRuleList) pending.unshift(...rule.cssRules)
	}
	return rows
}, readSheet('recipe.css'))
writeJSON('declarations.json', readings)
console.log(readings)
await browser.close()
