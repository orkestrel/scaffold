import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { deepStrictEqual, notDeepStrictEqual, ok } from 'node:assert/strict'
import { parse } from 'postcss'

const css = readFileSync('dist/src/styles/index.css', 'utf8')
const records = []
let position = 0
parse(css).walkRules((rule) => {
	const index = position++
	if (!rule.selectors.some((selector) => /\.container(?:-[\w-]+)?(?=[\s>+~.#:[\]]|$)/u.test(selector))) return
	const ancestors = []
	for (let parent = rule.parent; parent; parent = parent.parent) {
		if (parent.type === 'atrule') ancestors.unshift([parent.name, parent.params])
	}
	records.push({ index, selectors: rule.selectors, ancestors, declarations: rule.nodes.filter((node) => node.type === 'decl').map(({ prop, value, important }) => [prop, value, Boolean(important)]) })
})
ok(records.length > 0)
const serialized = JSON.stringify(records, null, 2) + '\n'
const digest = createHash('sha256').update(serialized).digest('hex')
const phase = process.argv[2]
writeFileSync(`tmp/units/cl8-container-${phase}.json`, serialized)
if (phase === 'before') writeFileSync('tmp/units/cl8-cascade-before.css', css)
else {
	const before = JSON.parse(readFileSync('tmp/units/cl8-container-before.json', 'utf8'))
	deepStrictEqual(records, before)
	const reordered = structuredClone(records)
	reordered[0].declarations.reverse()
	notDeepStrictEqual(reordered, before)
	const moved = structuredClone(records)
	moved[0].index += 1
	notDeepStrictEqual(moved, before)
	console.log('Container comparison: identical selectors, ancestor conditions/layers, global rule positions, and ordered declarations.')
	console.log('Negative controls: reversed declarations and moved global rule position each rejected.')
	console.log(`Whole cascade byte-identical: ${css === readFileSync('tmp/units/cl8-cascade-before.css', 'utf8')}`)
}
console.log(`${phase}: ${records.length} container rules; SHA-256 ${digest}`)
