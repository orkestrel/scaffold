// CL10 terrain: the icon-link, ratio, and vr keys. Families, declared properties, custom properties,
// conditions, and — checked against EVERY key, not by prefix — whether any other key carries their
// selectors. Read-only, bounded output.
import { readFileSync } from 'node:fs'

const VENEER = 'C:/Users/mikes/WebstormProjects/veneer'
const inventory = JSON.parse(readFileSync(`${VENEER}/tests/fixtures/oracle/inventory.json`, 'utf8'))
const components = inventory.components
const keys = ['icon-link', 'ratio', 'vr']

const of = (key) => (components[key]?.selectors ?? []).map((entry) => String(entry.selector))

for (const key of keys) {
	const component = components[key]
	if (component === undefined) {
		console.log(`${key}: ABSENT`)
		continue
	}
	const families = new Map()
	const conditions = new Set()
	const properties = new Set()
	for (const entry of component.selectors) {
		const family = String(entry.selector)
			.replaceAll(/-(sm|md|lg|xl|xxl)(?=-|$| |>|\+|~)/g, '-{bp}')
			.replaceAll(/\d+x\d+/g, '{a}x{b}')
			.replaceAll(/\d+/g, '{n}')
		families.set(family, (families.get(family) ?? 0) + 1)
		if (entry.condition) conditions.add(String(entry.condition))
		for (const declaration of entry.declarations ?? []) properties.add(String(declaration.property))
	}
	console.log(`\n== ${key}: ${String(component.selectors.length)} entries, ${String(component.declarations.length)} declarations`)
	console.log(`   properties object: ${Object.keys(component.properties).join(', ') || '(empty)'}`)
	console.log(`   conditions: ${[...conditions].join(' | ') || '(none)'}`)
	console.log(`   declared properties: ${[...properties].sort().join(', ')}`)
	console.log('   families:')
	for (const [family, count] of [...families].sort((a, b) => b[1] - a[1]))
		console.log(`      ${String(count).padStart(3)}  ${family}`)
	// every-key overlap check
	const own = new Set(of(key))
	const overlaps = []
	for (const other of Object.keys(components)) {
		if (other === key) continue
		const shared = of(other).filter((selector) => own.has(selector))
		if (shared.length > 0) overlaps.push(`${other} (${String(shared.length)})`)
	}
	console.log(`   keys sharing a selector with it: ${overlaps.join(', ') || 'none'}`)
}
