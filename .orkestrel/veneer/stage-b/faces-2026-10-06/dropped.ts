import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
import { writeFileSync } from 'node:fs'
// Usage: node dropped.ts OUT_JSON PAGE_HTML — for every class name both Bootstrap's utilities and Tailwind's utilities layer declare, lists the longhands Bootstrap's rule sets that Tailwind's rule leaves unset.
const [out, file] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto(`file://${file}`)
await page.waitForTimeout(800)
const collect = (layerFilter: string) =>
	page.evaluate((filter) => {
		const map: Record<string, string[]> = {}
		const walk = (rules: CSSRuleList, layers: string[], media: string) => {
			for (const rule of rules) {
				if (rule instanceof CSSLayerBlockRule) walk(rule.cssRules, [...layers, rule.name], media)
				else if (rule instanceof CSSMediaRule) walk(rule.cssRules, layers, rule.conditionText)
				else if (rule instanceof CSSSupportsRule || rule instanceof CSSContainerRule) walk(rule.cssRules, layers, media)
				else if (rule instanceof CSSStyleRule) {
					if (media) continue
					const inLayer = filter === '' ? true : layers.includes(filter)
					if (!inLayer) continue
					for (const part of rule.selectorText.split(',').map((s) => s.trim())) {
						const match = /^\.((?:\\.|[\w-])+)$/u.exec(part)
						if (!match) continue
						const name = match[1].replace(/\\/gu, '')
						const props = [...rule.style].filter((p) => !p.startsWith('--'))
						map[name] = [...new Set([...(map[name] ?? []), ...props])]
					}
				}
			}
		}
		for (const sheet of document.styleSheets) walk(sheet.cssRules, [], '')
		return map
	}, layerFilter)
const face = async (label: string) => {
	await page.getByRole('button', { name: label, exact: true }).first().click()
	await page.waitForTimeout(800)
}
await face('Bootstrap')
const bootstrap = await collect('')
await face('Tailwind + layer')
const tailwind = await collect('utilities')
const layered = await collect('bootstrap')
const shared = Object.keys(tailwind).filter((name) => name in bootstrap).sort()
const rows = shared.map((name) => {
	const b = bootstrap[name], t = tailwind[name]
	const dropped = b.filter((p) => !t.includes(p))
	return { name, bootstrap: b, tailwind: t, dropped, inLayerSheet: name in layered }
})
const withDropped = rows.filter((r) => r.dropped.length > 0)
const byProperty: Record<string, string[]> = {}
for (const r of withDropped) for (const p of r.dropped) (byProperty[p] ??= []).push(r.name)
writeFileSync(out, JSON.stringify({ shared: shared.length, withDropped: withDropped.length, byProperty, rows }, null, 2) + '\n')
console.log(JSON.stringify({ shared: shared.length, withDropped: withDropped.length }))
await browser.close()
