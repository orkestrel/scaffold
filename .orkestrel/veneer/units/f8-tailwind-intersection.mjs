// Orchestrator probe: which Bootstrap 5.3.8 class names does Tailwind 4.3.3 also generate?
// Reads the oracle inventory's class names, compiles Tailwind's utilities with those names as the
// candidate set, and reports the names that produced a rule. Writes nothing under the tree.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire('/home/user/veneer/package.json')
const inventory = JSON.parse(readFileSync('/home/user/veneer/tests/fixtures/oracle/inventory.json', 'utf8'))
const classes = new Set()
for (const [key, component] of Object.entries(inventory.components)) {
	for (const entry of component.selectors ?? []) for (const name of entry.classes ?? []) classes.add(name)
}
const candidates = [...classes].sort()
let compileModule
try { compileModule = await import(require.resolve('@tailwindcss/node')) } catch (error) { compileModule = null }
const { compile } = compileModule ?? (await import(require.resolve('tailwindcss')))
const base = '/home/user/veneer/node_modules/tailwindcss'
const compiler = compileModule
	? await compile('@import "tailwindcss/theme.css" layer(theme); @import "tailwindcss/utilities.css" layer(utilities);', { base, onDependency: () => {} })
	: await compile('@import "tailwindcss/theme.css" layer(theme); @import "tailwindcss/utilities.css" layer(utilities);', {
		base,
		loadStylesheet: async (id, basedir) => {
			const path = id.startsWith('tailwindcss/') ? `${base}/${id.slice('tailwindcss/'.length)}` : `${basedir}/${id}`
			return { path, base: base, content: readFileSync(path, 'utf8') }
		},
	})
const css = compiler.build(candidates)
const produced = new Set()
for (const match of css.matchAll(/(?:^|[\s,{}])\.((?:\\.|[A-Za-z0-9_-])+)/gu)) produced.add(match[1].replace(/\\(.)/gu, '$1'))
const shared = candidates.filter((name) => produced.has(name))
const utilityRoots = [...produced].filter((name) => !classes.has(name)).length
console.log(JSON.stringify({ inventoryClasses: candidates.length, producedSelectors: produced.size, shared, sharedCount: shared.length, cssBytes: css.length }, null, 2))
