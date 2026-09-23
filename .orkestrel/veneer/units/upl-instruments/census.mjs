// Lists every built rule naming a class under the unit's keys, with its declarations and at-rules.
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const keys = ['w','h','mw','mh','vw','vh','min','position','top','bottom','start','end','translate-middle','z','fixed','sticky','visually-hidden','visible','invisible']
const recorded = keys.flatMap((key) => inventory.components[key].selectors.map((rule) => rule.selector))
const pattern = /\.(w|h|mw|mh|vw|vh|min-vw|min-vh|position|top|bottom|start|end|translate-middle|z|fixed|sticky|visually-hidden|visually-hidden-focusable|visible|invisible)(-[\w-]+)?(?![\w-])/u
const css = readFileSync(process.argv[2] ?? 'dist/src/styles/index.css', 'utf8')
const found = []
let emptyMedia = 0
postcss.parse(css).walkAtRules('media', (rule) => { if (!rule.nodes || rule.nodes.length === 0) emptyMedia += 1 })
postcss.parse(css).walkRules((rule) => {
	for (const selector of rule.selectors) {
		if (!pattern.test(selector)) continue
		const conditions = []
		let layer
		for (let node = rule.parent; node && node.type === 'atrule'; node = node.parent) {
			if (node.name === 'layer') layer ??= node.params
			else conditions.unshift(`@${node.name} ${node.params}`)
		}
		const declarations = rule.nodes.filter((node) => node.type === 'decl').map((node) => `${node.prop}: ${node.value}${node.important ? ' !important' : ''}`)
		found.push({ selector, layer, conditions: conditions.join(' and '), declarations })
	}
})
const selectors = [...new Set(found.map((entry) => entry.selector))]
console.log('recorded', recorded.length, 'emitted', selectors.length, 'emptyMedia', emptyMedia)
console.log('missing', recorded.filter((selector) => !selectors.includes(selector)))
console.log('extra', selectors.filter((selector) => !recorded.includes(selector)))
for (const entry of found) console.log(JSON.stringify(entry))
