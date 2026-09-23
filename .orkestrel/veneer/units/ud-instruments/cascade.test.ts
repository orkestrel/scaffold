import { it } from 'vitest'
import { parse, Rule, AtRule } from 'postcss'
import { readBuiltCascade, readOracleInventory, normalizeMediaCondition } from '../../tests/setupServer.js'
import { normalizeComplexSelector } from '../../tests/setupStyles.js'
it('compares', () => {
	const keys = ['d', 'flex', 'justify-content', 'align-items', 'align-content', 'align-self', 'order', 'align', 'hstack', 'vstack']
	const inventory = readOracleInventory()
	const recorded = new Map<string, readonly { property: string; value: string }[]>()
	for (const key of keys)
		for (const rule of inventory.components[key]?.rules ?? [])
			recorded.set(`${normalizeComplexSelector(rule.selector)}|${(normalizeMediaCondition(rule.condition) ?? '').replaceAll(' ', '')}`, rule.declarations)
	const emitted = new Map<string, { property: string; value: string; important: boolean }[]>()
	parse(readBuiltCascade()).walkRules((rule: Rule) => {
		const media = rule.parent instanceof AtRule && rule.parent.name === 'media' ? `@media ${rule.parent.params}` : undefined
		for (const selector of rule.selectors) {
			const site = `${normalizeComplexSelector(selector)}|${(normalizeMediaCondition(media) ?? '').replaceAll(' ', '')}`
			const list = emitted.get(site) ?? []
			rule.walkDecls((decl) => { list.push({ property: decl.prop, value: decl.value, important: decl.important }) })
			emitted.set(site, list)
		}
	})
	let missing = 0, unimportant = 0, customImportant = 0, extra = 0, present = 0
	for (const [site, declarations] of recorded) {
		const written = emitted.get(site)
		if (written === undefined) { missing++; console.log('MISSING', site); continue }
		present++
		for (const { property } of declarations) {
			const found = written.find((d) => d.property === property)
			if (found === undefined) { console.log('NOPROP', site, property); missing++ }
			else if (property.startsWith('--') ? found.important : !found.important && !['hstack', 'vstack'].some((k) => site.startsWith(`.${k}|`))) { unimportant++; console.log('PRIORITY', site, property) }
			if (property.startsWith('--') && found?.important) customImportant++
		}
		if (['.hstack|', '.vstack|'].some((k) => site.startsWith(k)) && written.some((d) => d.important)) console.log('HELPER IMPORTANT', site)
	}
	const prefixes = /^\.(?:d|flex|justify-content|align|order)-|^\.[hv]stack$/u
	for (const site of emitted.keys()) {
		const [selector] = site.split('|')
		if (selector !== undefined && prefixes.test(selector) && !recorded.has(site)) { extra++; console.log('EXTRA', site) }
	}
	console.log(`SUMMARY inventory=${recorded.size} present=${present} missing=${missing} unimportant=${unimportant} customImportant=${customImportant} extra=${extra}`)
})
