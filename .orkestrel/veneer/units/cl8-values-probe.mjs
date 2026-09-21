// Do the built grid declarations carry the values the inventory records? The emission instrument the
// unit wrote compared selectors and media conditions; this compares VALUES. Read-only.
// Run from the Veneer root after a styles build.
import { readFileSync } from 'node:fs'
import postcss from 'postcss'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const cascade = readFileSync('dist/src/styles/index.css', 'utf8')

const normalize = (selector) => selector.replaceAll(/\s+/g, ' ').trim()
const built = new Map()
postcss.parse(cascade).walkRules((rule) => {
	for (const selector of rule.selectors) {
		const key = normalize(selector)
		const declarations = built.get(key) ?? new Map()
		rule.walkDecls((declaration) => {
			declarations.set(declaration.prop, declaration.value)
		})
		built.set(key, declarations)
	}
})

const mismatches = []
const missing = []
for (const key of ['row', 'col', 'offset']) {
	for (const entry of inventory.components[key].selectors) {
		const selector = normalize(String(entry.selector))
		if (selector.startsWith('.row-gap-') || selector.startsWith('.col-form-label')) continue
		const declarations = built.get(selector)
		if (declarations === undefined) {
			missing.push(`${key} ${selector}`)
			continue
		}
		for (const declaration of entry.declarations ?? []) {
			const property = declaration.property
			const recorded = String(declaration.value)
			// the logical substitution is a ruling, so map the physical property the record names
			const logical = {
				'margin-left': 'margin-inline',
				'margin-right': 'margin-inline',
				'margin-top': 'margin-block-start',
				width: 'inline-size',
				'max-width': 'max-inline-size',
				'padding-left': 'padding-inline',
				'padding-right': 'padding-inline',
			}
			const emitted = declarations.get(property) ?? declarations.get(logical[property] ?? property)
			if (emitted === undefined) {
				mismatches.push(`${selector}  ${property}: RECORDED ${recorded}  EMITTED (absent)`)
				continue
			}
			if (emitted !== recorded)
				mismatches.push(`${selector}  ${property}: RECORDED ${recorded}  EMITTED ${emitted}`)
		}
	}
}

console.log(`selectors in the record but not the cascade: ${String(missing.length)}`)
for (const line of missing.slice(0, 6)) console.log(`   ${line}`)
console.log(`\nvalue differences: ${String(mismatches.length)}`)
const families = new Map()
for (const line of mismatches) {
	const family = line.replaceAll(/\d+/g, '{n}').replace(/-(sm|md|lg|xl|xxl)-/, '-{bp}-')
	families.set(family, (families.get(family) ?? 0) + 1)
}
for (const [family, count] of [...families].sort((a, b) => b[1] - a[1]).slice(0, 14))
	console.log(`   ${String(count).padStart(3)}  ${family}`)
