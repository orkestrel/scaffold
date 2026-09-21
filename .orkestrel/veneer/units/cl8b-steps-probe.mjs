// What values do the gutter and gap step utilities set, and do the Veneer space tokens carry
// those values? Decides whether CL8b needs its own step tokens. Read-only, bounded output.
import { readFileSync } from 'node:fs'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const components = inventory.components

for (const key of ['g', 'gx', 'gy', 'row-gap', 'gap', 'column-gap']) {
	const steps = new Map()
	for (const declaration of components[key].declarations) {
		const match = /^\.(?:g|gx|gy|gap|row-gap|column-gap)-(?:(?:sm|md|lg|xl|xxl)-)?(\d+)$/.exec(
			String(declaration.selector),
		)
		if (match === null) continue
		const step = match[1]
		const seen = steps.get(step) ?? new Set()
		seen.add(String(declaration.value))
		steps.set(step, seen)
	}
	const rendered = [...steps]
		.sort((a, b) => Number(a[0]) - Number(b[0]))
		.map(([step, values]) => `${step}=${[...values].join('/')}`)
	console.log(`${key.padEnd(11)} ${rendered.join('  ')}`)
}

const tokens = readFileSync('src/styles/_tokens.scss', 'utf8')
console.log('\nVeneer space tokens, with their density factor:')
for (const line of tokens.split('\n'))
	if (line.includes('--vn-space-')) console.log('   ' + line.trim())
console.log('\nVeneer gutter tokens:')
for (const line of tokens.split('\n'))
	if (line.includes('--vn-gutter-')) console.log('   ' + line.trim())
