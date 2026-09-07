import { createRequire } from 'node:module'
const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))
const cases = [
	"Represents one `#### \\`Interface\\`` block in a guide's `## Methods` section — the documented member names of one behavioral interface.",
	'`adjacent``spans`',
]
for (const summary of cases) {
	let text = '| Name | Summary |\n| --- | --- |\n| `walk` | ' + summary.replace(/\|/g, '\\|') + ' |'
	const seen = []
	for (let i = 0; i < 5; i += 1) {
		seen.push(text)
		text = md.renderMarkdown(md.createMarkdown(text).document)
	}
	const fixed = seen.findIndex((t, i) => i > 0 && t === seen[i - 1])
	console.log('first fixed point after render #', fixed, JSON.stringify(summary.slice(0, 40)))
	for (const t of seen) console.log('   ', JSON.stringify(t.split('\n')[2]))
}
