// F8p probe, pass 2: the same runs with automatic source detection off (`source(none)`), so what each
// `@source` form emits is read in isolation from the directory scan that pass 1 also saw.
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const DIR = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8p'
const require = createRequire(`${DIR}/package.json`)
const postcss = require('postcss')
const tailwind = require('@tailwindcss/postcss')
const CLASS = /(?:^|[\s,{}>+~()])\.((?:\\.|[A-Za-z0-9_-])+)/gu
const ORDER = '@layer theme, reset, base, elements, components, utilities;\n'
const COMPOSABLE = '@import "tailwindcss/theme.css" layer(theme);\n@import "tailwindcss/utilities.css" layer(utilities) source(none);\n'
const FULL = '@import "tailwindcss" source(none);\n'
const EXCLUDE = '@source not inline("container collapse table caption-top caption-bottom col-auto col-{1..12}");\n'
const probe = ['gap-0', 'container', 'collapse', 'table', 'col-1', 'col-auto', 'caption-top', 'btn', 'px-8', 'text-balance', 'row-gap-1', 'rounded']
async function run(label, css) {
	writeFileSync(`${DIR}/${label}.css`, css)
	const out = (await postcss([tailwind()]).process(css, { from: `${DIR}/${label}.css`, to: `${DIR}/${label}.out.css` })).css
	writeFileSync(`${DIR}/${label}.out.css`, out)
	const produced = new Set()
	for (const match of out.matchAll(CLASS)) produced.add(match[1].replace(/\\(.)/gu, '$1'))
	const layerBlocks = [...new Set([...out.matchAll(/@layer ([a-z]+)\s*\{/gu)].map((match) => match[1]))]
	console.log(label, 'bytes', out.length, 'layers', layerBlocks.join(','), 'produced', produced.size, 'emitted', probe.filter((name) => produced.has(name)).join(','))
}
await run('none-composable', ORDER + COMPOSABLE)
await run('txt-composable', ORDER + COMPOSABLE + '@source "./candidates.txt";\n')
await run('css-composable', ORDER + COMPOSABLE + '@source "./veneer.css";\n')
await run('txt-excluded', ORDER + COMPOSABLE + '@source "./candidates.txt";\n' + EXCLUDE)
await run('txt-full', ORDER + FULL + '@source "./candidates.txt";\n')
await run('inline-only', ORDER + COMPOSABLE + '@source inline("gap-0 container px-8");\n')
