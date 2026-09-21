import { readFileSync, writeFileSync } from 'node:fs'
import { deepStrictEqual, notDeepStrictEqual, strictEqual } from 'node:assert/strict'
import { parse } from 'postcss'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const built = []
parse(readFileSync('dist/src/styles/index.css', 'utf8')).walkRules((rule) => {
	for (const selector of rule.selectors) {
		if (!/^\.(?:row|col|offset)(?:-|>|$)/u.test(selector)) continue
		const conditions = []
		for (let parent = rule.parent; parent; parent = parent.parent) {
			if (parent.type === 'atrule' && parent.name === 'media') conditions.unshift(parent.params)
		}
		built.push({ selector: selector.replaceAll(/\s+/gu, ''), conditions, declarations: rule.nodes.filter((node) => node.type === 'decl').map(({prop, value}) => [prop, value]) })
	}
})
const expected = ['row', 'col', 'offset'].flatMap((key) => inventory.components[key].selectors.filter(({selector}) => !selector.startsWith('.row-gap-') && !selector.startsWith('.col-form-label')).map(({selector, condition}) => ({selector: selector.replaceAll(/\s+/gu, ''), conditions: condition ? [condition.replace('@media ', '').replace(/min-width:\s*(\d+)px/u, 'width>=$1px')] : []})))
const vocabulary = built.map(({selector, conditions}) => ({selector, conditions}))
const sorted = (rows) => [...rows].sort((left, right) => left.selector.localeCompare(right.selector))
deepStrictEqual(sorted(vocabulary), sorted(expected))
const moved = structuredClone(vocabulary)
moved.find(({conditions}) => conditions.length > 0).conditions = []
notDeepStrictEqual(sorted(moved), sorted(expected))
const extra = [...vocabulary, {selector: '.row-gap-0', conditions: []}]
notDeepStrictEqual(sorted(extra), sorted(expected))
strictEqual(inventory.components.row.selectors.find(({selector}) => selector === '.row').declarations.some(({property}) => property === 'row-gap'), false)
writeFileSync('tmp/units/cl8-built-grid-2.json', JSON.stringify(built, null, 2) + '\n')
console.log('Grid selector and media-condition multiset matches the inventory exactly after excluding the deferred families.')
console.log('Negative controls: removed breakpoint condition and extra deferred selector each rejected.')
console.log(JSON.stringify({properties: Object.fromEntries(['row', 'col', 'offset'].map((key) => [key, inventory.components[key].properties])), readings: built.filter(({selector}) => ['.row', '.row>*', '.col', '.col-4', '.row-cols-2>*', '.offset-md-0'].includes(selector))}, null, 2))
