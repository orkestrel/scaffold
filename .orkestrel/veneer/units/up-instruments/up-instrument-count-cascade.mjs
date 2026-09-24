import postcss from 'postcss'
import { readFileSync } from 'node:fs'
const css = readFileSync('dist/src/styles/index.css', 'utf8')
const inv = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const keys = ['bg', 'border', 'rounded']
const recorded = new Set(keys.flatMap((k) => inv.components[k].selectors.map((s) => s.selector)))
const root = postcss.parse(css)
const found = new Map()
const issues = []
root.walkRules((rule) => {
	for (const sel of rule.selectors) {
		if (!/^\.(bg|border|rounded)(-[\w-]+)?$/.test(sel)) continue
		const cond = rule.parent.type === 'atrule' && rule.parent.name !== 'layer' ? rule.parent.params : ''
		found.set(sel, (found.get(sel) ?? 0) + 1)
		if (cond) issues.push(`conditioned ${sel} ${cond}`)
		rule.walkDecls((d) => {
			if (d.prop.startsWith('--') && d.important) issues.push(`important custom ${sel} ${d.prop}`)
			if (!d.prop.startsWith('--') && !d.important) issues.push(`normal property ${sel} ${d.prop}`)
		})
	}
})
const extra = [...found.keys()].filter((s) => !recorded.has(s))
const missing = [...recorded].filter((s) => !found.has(s))
const dup = [...found].filter(([, n]) => n > 1)
console.log(JSON.stringify({ inventory: recorded.size, cascade: found.size, extra, missing, dup, issues }, null, 1))
