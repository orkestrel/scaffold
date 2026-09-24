// Reads a built cascade against the pinned inventory for the unit's keys: every recorded selector
// present, each property declaration important and each custom property normal, and no other
// selector under the keys' class prefixes. The first argument is the validation copy's root, which
// holds the inventory; the optional second argument is the cascade to read, and the copy's built
// cascade is the default, so a negative control reads a planted copy of that cascade.
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
const base = process.argv[2]
const inventory = JSON.parse(readFileSync(`${base}/tests/fixtures/oracle/inventory.json`, 'utf8'))
const css = readFileSync(process.argv[3] ?? `${base}/dist/src/styles/index.css`, 'utf8')
const keys = ['shadow', 'opacity', 'focus-ring']
const recorded = new Set(keys.flatMap((key) => inventory.components[key].selectors.map((entry) => entry.selector)))
const emitted = []
postcss.parse(css).walkRules((rule) => {
	for (const selector of rule.selectors) {
		if (!/^\.(shadow|opacity-|focus-ring)/u.test(selector)) continue
		const condition = rule.parent?.type === 'atrule' && rule.parent.name === 'media' ? rule.parent.params : undefined
		const declarations = rule.nodes.filter((node) => node.type === 'decl').map((node) => ({ property: node.prop, important: node.important === true }))
		emitted.push({ selector, condition, declarations })
	}
})
const unconditioned = emitted.filter(({ condition }) => condition === undefined)
const missing = [...recorded].filter((selector) => !unconditioned.some((rule) => rule.selector === selector))
const extra = emitted.filter(({ selector }) => !recorded.has(selector))
const priority = unconditioned.flatMap(({ selector, declarations }) =>
	declarations.flatMap(({ property, important }) => {
		const helper = selector === '.focus-ring:focus'
		const expected = property.startsWith('--') || helper ? false : true
		return important === expected ? [] : [`${selector} { ${property} } important=${important}`]
	}),
)
console.log(JSON.stringify({
	recorded: recorded.size,
	emittedUnconditioned: new Set(unconditioned.map(({ selector }) => selector)).size,
	conditioned: emitted.filter(({ condition }) => condition !== undefined).map(({ selector, condition, declarations }) => ({ selector, condition, declarations })),
	missing,
	extra: extra.map(({ selector, condition }) => ({ selector, condition })),
	priorityMismatches: priority,
}, null, 1))
