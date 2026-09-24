import postcss from 'postcss'
import tw from '@tailwindcss/postcss'
import { readFileSync } from 'node:fs'
for (const path of ['tests/setup.css', 'tests/fixtures/tailwind/preflight.css']) {
	const full = process.cwd() + '/' + path
	const r = await postcss([tw()]).process(readFileSync(full, 'utf8'), { from: full })
	const root = postcss.parse(r.css)
	const layers = []
	root.walkAtRules('layer', (a) => layers.push(a.nodes ? `{${a.params}}` : `;${a.params}`))
	const themeVars = []
	root.walkAtRules('layer', (a) => { if (a.params === 'theme' && a.nodes) a.walkDecls((d) => themeVars.push(d.prop)) })
	const utils = []
	root.walkAtRules('layer', (a) => { if (a.params === 'utilities' && a.nodes) a.walkRules((r) => utils.push(r.selector)) })
	console.log(path, JSON.stringify({ layers, themeVars: path.includes('setup') ? themeVars : themeVars.length, utils }))
}
