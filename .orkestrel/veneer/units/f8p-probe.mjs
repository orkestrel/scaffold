// F8p IMPORT-FORM probe (Orchestrator, host). Compiles Tailwind 4.3.3 through @tailwindcss/postcss with
// Veneer's built class names as the scan target, and reads what each import and exclusion form emits.
// Writes only under the scratchpad (node_modules here is a symlink to the Veneer checkout's).
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const DIR = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8p'
const require = createRequire(`${DIR}/package.json`)
const postcss = require('postcss')
const tailwind = require('@tailwindcss/postcss')
const built = readFileSync('/home/user/veneer/dist/src/styles/index.css', 'utf8')
const CLASS = /(?:^|[\s,{}>+~()])\.((?:\\.|[A-Za-z0-9_-])+)/gu
const names = new Set()
for (const match of built.matchAll(CLASS)) names.add(match[1].replace(/\\(.)/gu, '$1'))
writeFileSync(`${DIR}/candidates.txt`, [...names].sort().join('\n') + '\n')
writeFileSync(`${DIR}/veneer.css`, built)
const shared = JSON.parse(readFileSync('/home/user/scaffold/.orkestrel/veneer/units/f8-tailwind-intersection.json', 'utf8')).sharedClassNames
const shippedShared = shared.filter((name) => names.has(name))
const ORDER = '@layer theme, reset, base, elements, components, utilities;\n'
const COMPOSABLE = '@import "tailwindcss/theme.css" layer(theme);\n@import "tailwindcss/utilities.css" layer(utilities);\n'
const FULL = '@import "tailwindcss";\n'
const EXCLUDE = '@source not inline("container collapse table caption-top caption-bottom col-auto col-{1..12}");\n'
async function run(label, css) {
	writeFileSync(`${DIR}/${label}.css`, css)
	const result = await postcss([tailwind()]).process(css, { from: `${DIR}/${label}.css`, to: `${DIR}/${label}.out.css` })
	const out = result.css
	writeFileSync(`${DIR}/${label}.out.css`, out)
	const produced = new Set()
	for (const match of out.matchAll(CLASS)) produced.add(match[1].replace(/\\(.)/gu, '$1'))
	const layerStatements = [...out.matchAll(/@layer ([^{;]+);/gu)].map((match) => match[1].trim())
	const layerBlocks = [...new Set([...out.matchAll(/@layer ([a-z]+)\s*\{/gu)].map((match) => match[1]))]
	const preflight = /\*,\s*::before,\s*::after/u.test(out) || /::before,\s*::after/u.test(out)
	const probe = ['gap-0', 'container', 'collapse', 'rounded', 'table', 'col-1', 'col-auto', 'caption-top', 'btn', 'btn-primary', 'row', 'p-4', 'px-8', 'text-balance']
	const emitted = Object.fromEntries(probe.map((name) => [name, produced.has(name)]))
	const sharedEmitted = shippedShared.filter((name) => produced.has(name))
	console.log(JSON.stringify({ label, bytes: out.length, layerStatements, layerBlocks, preflight, emitted, sharedEmitted: sharedEmitted.length, sharedMissing: shippedShared.filter((name) => !produced.has(name)) }, null, 1))
}
console.log(JSON.stringify({ builtClassNames: names.size, measuredShared: shared.length, shippedShared: shippedShared.length, shippedSharedNames: shippedShared }, null, 1))
await run('composable-txt', ORDER + COMPOSABLE + '@source "./candidates.txt";\n')
await run('composable-css', ORDER + COMPOSABLE + '@source "./veneer.css";\n')
await run('composable-excluded', ORDER + COMPOSABLE + '@source "./candidates.txt";\n' + EXCLUDE)
await run('full-txt', ORDER + FULL + '@source "./candidates.txt";\n')
await run('full-nosource', ORDER + FULL)
