// Does the grid SOURCE emit the recorded percentage, with the published artifact's shorter value
// coming from minification instead? Compile the styles entry unminified and read the same rules the
// built cascade carries. Read-only. Run from the Veneer root.
import { readFileSync } from 'node:fs'
import { compile } from 'sass'

const compiled = compile('src/styles/index.scss', { loadPaths: ['src/styles'], style: 'expanded' })
const source = compiled.css
const built = readFileSync('dist/src/styles/index.css', 'utf8')

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const recorded = new Map()
for (const key of ['col', 'offset'])
	for (const declaration of inventory.components[key].declarations)
		if (['.col-4', '.col-md-4', '.offset-4', '.col-7', '.offset-7'].includes(declaration.selector))
			recorded.set(`${declaration.selector} ${declaration.property}`, String(declaration.value))

for (const [name, value] of recorded) {
	const [selector, property] = name.split(' ')
	const escaped = selector.replaceAll('.', '\\.')
	const sourceMatch = new RegExp(`${escaped}\\s*\\{[^}]*?(?:inline-size|margin-inline-start)\\s*:\\s*([^;}]+)`, 's').exec(source)
	const builtMatch = new RegExp(`${escaped}\\{[^}]*?(?:inline-size|margin-inline-start):([^;}]+)`).exec(built)
	console.log(`${selector} (${property})`)
	console.log(`   recorded  ${value}`)
	console.log(`   source    ${sourceMatch === null ? '(not found)' : sourceMatch[1].trim()}`)
	console.log(`   built     ${builtMatch === null ? '(not found)' : builtMatch[1].trim()}`)
}
