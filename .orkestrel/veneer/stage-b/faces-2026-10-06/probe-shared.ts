import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
import { writeFileSync } from 'node:fs'
// Usage: node probe-shared.ts OUT_JSON WIDTH PAGE_HTML — compares each main-region element's visual properties under the Bootstrap face with each Tailwind face and attributes differences to shared utility class names.
const [out, widthText, file] = process.argv.slice(2)
const PROPS = ['border-top-width', 'border-top-color', 'border-top-style', 'border-bottom-color', 'border-bottom-width', 'border-left-color', 'border-top-left-radius', 'padding-top', 'padding-left', 'margin-top', 'margin-bottom', 'margin-left', 'row-gap', 'column-gap', 'font-size', 'font-weight', 'line-height', 'font-family', 'color', 'background-color', 'box-shadow', 'width', 'height', 'display', 'opacity', 'text-decoration-line']
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const page = await browser.newPage({ viewport: { width: Number(widthText), height: 844 } })
await page.goto(`file://${file}`)
await page.waitForTimeout(800)
const read = () =>
	page.evaluate((props) => {
		const elements = [...document.querySelectorAll('main *')]
		return elements.map((element) => {
			const style = getComputedStyle(element)
			return { classes: [...element.classList], values: props.map((p) => style.getPropertyValue(p)) }
		})
	}, PROPS)
const utilityNames = () =>
	page.evaluate(() => {
		const names = new Set<string>()
		const walk = (rules: CSSRuleList, inUtilities: boolean) => {
			for (const rule of rules) {
				if (rule instanceof CSSLayerBlockRule) walk(rule.cssRules, inUtilities || rule.name === 'utilities')
				else if ('cssRules' in rule && (rule as CSSGroupingRule).cssRules) walk((rule as CSSGroupingRule).cssRules, inUtilities)
				if (inUtilities && rule instanceof CSSStyleRule)
					for (const match of rule.selectorText.matchAll(/\.((?:\\.|[\w-])+)/gu)) names.add(match[1].replace(/\\/gu, ''))
			}
		}
		for (const sheet of document.styleSheets) walk(sheet.cssRules, false)
		return [...names]
	})
const face = async (label: string) => {
	await page.getByRole('button', { name: label, exact: true }).first().click()
	await page.waitForTimeout(800)
}
await face('Bootstrap')
const base = await read()
const result: Record<string, unknown> = { width: Number(widthText), elements: base.length }
for (const label of ['Tailwind, no layer', 'Tailwind + layer']) {
	await face(label)
	const twNames = new Set(await utilityNames())
	const other = await read()
	if (other.length !== base.length) { result[label] = { error: `element count ${other.length} vs ${base.length}` }; continue }
	const byToken: Record<string, { elements: number; props: Record<string, number>; sample: string[] }> = {}
	let differing = 0
	let unattributed = 0
	const unattributedProps: Record<string, number> = {}
	for (const [index, element] of base.entries()) {
		const changed = PROPS.filter((_, i) => element.values[i] !== other[index].values[i])
		if (changed.length === 0) continue
		differing += 1
		const tokens = element.classes.filter((name) => twNames.has(name))
		if (tokens.length === 0) {
			unattributed += 1
			for (const p of changed) unattributedProps[p] = (unattributedProps[p] ?? 0) + 1
			continue
		}
		for (const token of tokens) {
			const entry = (byToken[token] ??= { elements: 0, props: {}, sample: [] })
			entry.elements += 1
			for (const p of changed) entry.props[p] = (entry.props[p] ?? 0) + 1
			if (entry.sample.length < 2)
				entry.sample.push(changed.slice(0, 4).map((p) => `${p}: ${element.values[PROPS.indexOf(p)]} -> ${other[index].values[PROPS.indexOf(p)]}`).join('; '))
		}
	}
	const ranked = Object.entries(byToken).sort((a, b) => b[1].elements - a[1].elements)
	result[label] = { tailwindUtilityNames: twNames.size, differing, attributedTokens: ranked.length, unattributed, unattributedProps, top: Object.fromEntries(ranked.slice(0, 40)) }
}
writeFileSync(out, JSON.stringify(result, null, 2) + '\n')
await browser.close()
console.log('written')
