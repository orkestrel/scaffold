// Compares the built cascade's rules under the unit's keys with the pinned inventory's selectors,
// and reads the priority of every declaration those rules carry.
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
const root = '/home/user/veneer-usp/tmp/probe/base'
const inventory = JSON.parse(readFileSync(`${root}/tests/fixtures/oracle/inventory.json`, 'utf8'))
const keys = ['m', 'mx', 'my', 'mt', 'me', 'mb', 'ms', 'p', 'px', 'py', 'pt', 'pe', 'pb', 'ps', 'user-select']
const width = (condition) => (condition === undefined ? 0 : Number(/(\d+)px/.exec(condition)?.[1]))
const recorded = new Set()
for (const key of keys) for (const rule of inventory.components[key].selectors) recorded.add(`${rule.selector}@${width(rule.condition)}`)
const css = postcss.parse(readFileSync(`${root}/dist/src/styles/index.css`, 'utf8'))
const grammar = /^\.(m|mx|my|mt|me|mb|ms|p|px|py|pt|pe|pb|ps|user-select)-[a-z0-9-]+$/
const emitted = new Map()
let declarations = 0
const normal = []
const custom = []
css.walkRules((rule) => {
	for (const selector of rule.selectors) {
		if (!grammar.test(selector)) continue
		let condition
		for (let parent = rule.parent; parent; parent = parent.parent) if (parent.type === 'atrule' && parent.name === 'media') condition = parent.params
		const site = `${selector}@${width(condition)}`
		emitted.set(site, (emitted.get(site) ?? 0) + 1)
		rule.walkDecls((declaration) => {
			declarations += 1
			if (declaration.prop.startsWith('--')) custom.push(`${site} ${declaration.prop}`)
			else if (!declaration.important) normal.push(`${site} ${declaration.prop}`)
		})
	}
})
const missing = [...recorded].filter((site) => !emitted.has(site))
const extra = [...emitted.keys()].filter((site) => !recorded.has(site))
const repeated = [...emitted].filter(([, count]) => count > 1)
console.log(JSON.stringify({ inventory: recorded.size, cascade: emitted.size, declarations, missing, extra, repeated, normal, custom }))
