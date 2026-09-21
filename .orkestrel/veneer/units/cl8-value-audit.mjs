// The Orchestrator's own reading: do the grid's UNMINIFIED emitted declaration values equal the
// values the pinned inventory records, once the logical-property ruling and the gutter-alias ruling
// are applied? No shipped gate makes this comparison, so it is taken once here. Read-only.
import { readFileSync } from 'node:fs'
import { compile } from 'sass'
import postcss from 'postcss'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const css = compile('src/styles/index.scss', { loadPaths: ['src/styles'], style: 'expanded' }).css

// recorded physical property -> the logical property Veneer ships for it
const logical = new Map([
	['margin-left', ['margin-inline', 'margin-inline-start']],
	['margin-right', ['margin-inline', 'margin-inline-end']],
	['margin-top', ['margin-block-start']],
	['width', ['inline-size']],
	['max-width', ['max-inline-size']],
	['padding-left', ['padding-inline', 'padding-inline-start']],
	['padding-right', ['padding-inline', 'padding-inline-end']],
])
// the gutter aliases are a ruling: the record's literal becomes a var() over Veneer's own token
const aliased = new Map([
	['--bs-gutter-x', 'var(--vn-gutter-x)'],
	['--bs-gutter-y', 'var(--vn-gutter-y)'],
])

const norm = (selector) => selector.replaceAll(/\s*>\s*/g, '>').replaceAll(/\s+/g, ' ').trim()
const emitted = new Map()
postcss.parse(css).walkRules((rule) => {
	for (const selector of rule.selectors) {
		const key = norm(selector)
		const map = emitted.get(key) ?? new Map()
		rule.walkDecls((d) => map.set(d.prop, d.value.replaceAll(/\s+/g, ' ').trim()))
		emitted.set(key, map)
	}
})

const differences = []
const absent = []
for (const key of ['row', 'col', 'offset']) {
	for (const entry of inventory.components[key].selectors) {
		const selector = norm(String(entry.selector))
		if (selector.startsWith('.row-gap-') || selector.startsWith('.col-form-label')) continue
		const map = emitted.get(selector)
		if (map === undefined) {
			absent.push(selector)
			continue
		}
		for (const declaration of entry.declarations ?? []) {
			const property = String(declaration.property)
			const recorded = String(declaration.value).replaceAll(/\s+/g, ' ').trim()
			const expected = aliased.get(property) ?? recorded
			const candidates = [property, ...(logical.get(property) ?? [])]
			const found = candidates.map((name) => map.get(name)).find((value) => value !== undefined)
			if (found === undefined) {
				differences.push(`${selector}  ${property}  recorded ${recorded}  EMITTED NOTHING`)
				continue
			}
			if (found !== expected)
				differences.push(`${selector}  ${property}  recorded ${expected}  emitted ${found}`)
		}
	}
}

console.log(`selectors recorded but absent from the compiled source: ${String(absent.length)}`)
for (const line of absent.slice(0, 8)) console.log(`   ${line}`)
console.log(`\nvalue differences: ${String(differences.length)}`)
for (const line of differences.slice(0, 20)) console.log(`   ${line}`)
