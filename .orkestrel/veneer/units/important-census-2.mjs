// Probe for claim 8 (successor of important-census.mjs: keys on each simple selector of a rule's list, not the whole list).
import { readFileSync } from 'node:fs'
import postcss from '/home/user/veneer/node_modules/postcss/lib/postcss.mjs'
const norm = (s) => s.replace(/\s+/g, ' ').replace(/\s*([>+~,])\s*/g, '$1').trim().toLowerCase()
const census = (path) => {
	const root = postcss.parse(readFileSync(path, 'utf8'))
	const map = new Map()
	root.walkDecls((decl) => {
		if (!decl.important) return
		const rule = decl.parent
		const selectors = rule && rule.type === 'rule' ? rule.selectors : ['(no selector)']
		for (const selector of selectors) {
			const key = norm(selector)
			const set = map.get(key) ?? new Set()
			set.add(decl.prop.replace(/^-webkit-/, ''))
			map.set(key, set)
		}
	})
	return map
}
const veneer = census('/home/user/veneer/dist/src/styles/index.css')
const bootstrap = census('/home/user/veneer/node_modules/bootstrap/dist/css/bootstrap.css')
console.log(`veneer !important simple selectors: ${veneer.size}; bootstrap: ${bootstrap.size}`)
let extra = 0
console.log('--- veneer !important (selector -> props) absent from bootstrap or with props bootstrap lacks:')
for (const [k, props] of veneer) {
	const b = bootstrap.get(k)
	if (!b) { extra++; console.log(`  ABSENT  ${k} -> ${[...props].join(',')}`); continue }
	const missing = [...props].filter((p) => !b.has(p))
	if (missing.length) { extra++; console.log(`  PROPS   ${k} -> veneer-only ${missing.join(',')}`) }
}
console.log(`--- differences: ${extra}`)
console.log('--- veneer !important simple selectors (all):')
for (const [k, v] of veneer) console.log(`  ${k} -> ${[...v].join(',')}`)
