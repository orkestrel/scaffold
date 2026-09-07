// u2e-idem-2.mjs — successor of u2e-idem.mjs. Log: u2e-idem-2.log.txt.
// What changed: u2e-idem.mjs measured the render's fixed point over `MethodGroup`'s description
// as it stood at D2, whose code span carried backticks. This round rewrote that description, so
// this run reads the text the package now ships beside the text it used to, and reports the
// render number each reaches a fixed point at.
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'

const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))

const types = readFileSync('/home/user/fleet/guide/src/core/types.ts', 'utf8')
const shipped = /Represents one behavioral interface[\s\S]*?table lists\./
	.exec(types)?.[0]
	.replace(/\n \* /g, ' ')
if (shipped === undefined) throw new Error("MethodGroup's shipped description absent")

const cases = [
	['MethodGroup as D2 shipped it', "Represents one `#### \\`Interface\\`` block in a guide's `## Methods` section — the documented member names of one behavioral interface."],
	['MethodGroup as this round ships it', shipped],
	['adjacent spans', '`adjacent``spans`'],
]

for (const [label, summary] of cases) {
	let text = '| Name | Summary |\n| --- | --- |\n| `walk` | ' + summary.replace(/\|/g, '\\|') + ' |'
	const seen = []
	for (let index = 0; index < 5; index += 1) {
		seen.push(text)
		const table = md.createMarkdown(text).document.children[0]
		text = md.renderMarkdown(table)
	}
	const fixed = seen.findIndex((value, index) => index > 0 && value === seen[index - 1])
	console.log(`${label}: first fixed point after render #${fixed < 0 ? 'none in 5' : fixed}`)
	for (const value of seen) console.log('    ' + JSON.stringify(value.split('\n')[2]))
	console.log()
}
