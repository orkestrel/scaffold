// Counts the paint selectors a built cascade carries against the pinned inventory: every selector the
// inventory records under the `bg`, `border`, and `rounded` keys, and no other selector of those
// families, each written once, inside the `utilities` layer, under no other at-rule, with every
// property important and every custom property normal. Run from the validation copy's root with the
// cascade path as its argument. It exits 1 on any finding, so a copy of the cascade with one selector
// dropped, or one rule moved out of the utilities layer, reads red.
import postcss from 'postcss'
import { readFileSync } from 'node:fs'
const css = readFileSync(process.argv[2] ?? 'dist/src/styles/index.css', 'utf8')
const inv = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const recorded = new Set(['bg', 'border', 'rounded'].flatMap((k) => inv.components[k].selectors.map((s) => s.selector)))
const found = new Map()
const issues = []
postcss.parse(css).walkRules((rule) => {
	for (const selector of rule.selectors) {
		if (!/^\.(bg|border|rounded)(-[\w-]+)?$/.test(selector)) continue
		found.set(selector, (found.get(selector) ?? 0) + 1)
		const parents = []
		for (let node = rule.parent; node && node.type !== 'root'; node = node.parent) parents.push(`${node.name} ${node.params}`)
		if (parents.join('|') !== 'layer utilities') issues.push(`outside the utilities layer alone: ${selector} in ${parents.join(' < ') || 'no at-rule'}`)
		rule.walkDecls((d) => {
			if (d.prop.startsWith('--') && d.important) issues.push(`important custom property ${selector} ${d.prop}`)
			if (!d.prop.startsWith('--') && !d.important) issues.push(`normal property ${selector} ${d.prop}`)
		})
	}
})
const extra = [...found.keys()].filter((s) => !recorded.has(s))
const missing = [...recorded].filter((s) => !found.has(s))
const repeated = [...found].filter(([, n]) => n > 1).map(([s]) => s)
const reading = { inventory: recorded.size, cascade: found.size, extra, missing, repeated, issues }
console.log(JSON.stringify(reading, null, 1))
process.exit(extra.length + missing.length + repeated.length + issues.length === 0 ? 0 : 1)
