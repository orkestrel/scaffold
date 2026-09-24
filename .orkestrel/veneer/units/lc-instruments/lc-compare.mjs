// lc-compare.mjs: compares two built cascades. It prints every `--vn-color-*-rgb` declaration
// each build emits, per rule selector, and the declaration set of each theme scope (`:root`,
// `[data-bs-theme=light]`, `[data-bs-theme=dark]`) with every property the two builds disagree on.
// Usage: node lc-compare.mjs BASE_CSS NEW_CSS
import { readFileSync } from 'node:fs'
import postcss from 'postcss'

const [basePath, nextPath] = process.argv.slice(2)
function collect(path) {
	const root = postcss.parse(readFileSync(path, 'utf8'))
	const triplets = []
	const scopes = new Map()
	const orders = new Map()
	root.walkRules((rule) => {
		const inside = rule.parent?.type === 'atrule' && rule.parent.name !== 'layer' ? `@${rule.parent.name} ${rule.parent.params} ` : ''
		const key = inside + rule.selector
		rule.walkDecls((decl) => {
			if (/^--vn-color-[a-z]+-rgb$/.test(decl.prop)) triplets.push(`${key} { ${decl.prop}: ${decl.value} }`)
			if ([':root', '[data-bs-theme=light]', '[data-bs-theme=dark]'].includes(key)) {
				const scope = scopes.get(key) ?? new Map()
				scope.set(decl.prop, decl.value)
				scopes.set(key, scope)
				const order = orders.get(key) ?? []
				order.push(decl.prop)
				orders.set(key, order)
			}
		})
	})
	return { triplets, scopes, orders }
}
const base = collect(basePath)
const next = collect(nextPath)
console.log('# --vn-color-*-rgb declarations, base then new')
console.log(base.triplets.join('\n'))
console.log('---')
console.log(next.triplets.join('\n'))
console.log(`triplets identical (as a sorted set): ${JSON.stringify([...base.triplets].sort()) === JSON.stringify([...next.triplets].sort())}`)
console.log(`triplets identical (in order): ${JSON.stringify(base.triplets) === JSON.stringify(next.triplets)}`)
for (const key of [':root', '[data-bs-theme=light]', '[data-bs-theme=dark]']) {
	const before = base.scopes.get(key) ?? new Map()
	const after = next.scopes.get(key) ?? new Map()
	const props = new Set([...before.keys(), ...after.keys()])
	const differ = [...props].filter((prop) => before.get(prop) !== after.get(prop))
	console.log(`# scope ${key}: base ${before.size} properties, new ${after.size}; differing: ${differ.length}`)
	for (const prop of differ) console.log(`  ${prop}: base=[${before.get(prop) ?? '(absent)'}] new=[${after.get(prop) ?? '(absent)'}]`)
	const orderBefore = (base.orders.get(key) ?? []).join(',')
	const orderAfter = (next.orders.get(key) ?? []).join(',')
	console.log(`  declaration order identical: ${orderBefore === orderAfter}`)
}
