// F8p probe, pass 3: the oracle inventory as the scan source, and a candidates file under a gitignored directory.
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const DIR = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8p'
const require = createRequire(`${DIR}/package.json`)
const postcss = require('postcss')
const tailwind = require('@tailwindcss/postcss')
const CLASS = /(?:^|[\s,{}>+~()])\.((?:\\.|[A-Za-z0-9_-])+)/gu
const ORDER = '@layer theme, reset, base, elements, components, utilities;\n'
const COMPOSABLE = '@import "tailwindcss/theme.css" layer(theme);\n@import "tailwindcss/utilities.css" layer(utilities) source(none);\n'
const shared = JSON.parse(readFileSync('/home/user/scaffold/.orkestrel/veneer/units/f8-tailwind-intersection.json', 'utf8')).sharedClassNames
async function run(label, css) {
	writeFileSync(`${DIR}/${label}.css`, css)
	const out = (await postcss([tailwind()]).process(css, { from: `${DIR}/${label}.css`, to: `${DIR}/${label}.out.css` })).css
	const produced = new Set()
	for (const match of out.matchAll(CLASS)) produced.add(match[1].replace(/\\(.)/gu, '$1'))
	console.log(label, 'produced', produced.size, 'of measured shared', shared.filter((name) => produced.has(name)).length, 'caption-bottom', produced.has('caption-bottom'), 'container', produced.has('container'))
}
await run('inventory', ORDER + COMPOSABLE + '@source "./tests/fixtures/oracle/inventory.json";\n')
await run('ignored-dir', ORDER + COMPOSABLE + '@source "./ignored/candidates.txt";\n')
await run('ignored-dirpath', ORDER + COMPOSABLE + '@source "./ignored";\n')
