// u2d-control-2.mjs — successor of u2d-control.mjs. Log: u2d-control-2.log.txt.
// What changed: u2d-control.mjs carried its own transcription of `normalizeSummary` at D2's
// clause and compared the guide side's reading against the RAW source-side summary, so it
// reports on that transcription rather than on the tree and can never show a convergence. This
// one compiles the SHIPPED function body straight out of src/core/helpers.ts and compares
// compared form against compared form, which is the question the code-span clause answers.
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'

const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))

const source = readFileSync('/home/user/fleet/guide/src/core/helpers.ts', 'utf8')
const head = 'export function normalizeSummary(text: string): string {\n'
const from = source.indexOf(head)
if (from < 0) throw new Error('normalizeSummary head absent')
const to = source.indexOf('\n}\n', from)
if (to < 0) throw new Error('normalizeSummary body unterminated')
const body = source.slice(from + head.length, to)
console.log('shipped body, compiled from src/core/helpers.ts:')
console.log(body)
const normalizeSummary = new Function('text', body)

function extractCellText(cell) {
	let text = ''
	for (const node of cell) {
		if (md.isCodeSpanNode(node)) text += '`' + node.value + '`'
		else if (md.isEmphasisNode(node) || md.isLinkNode(node) || md.isImageNode(node))
			text += extractCellText(node.children)
		else text += md.flattenText(node)
	}
	return text
}

// A human writes the summary into the guide cell verbatim, escaping only the pipe. Both sides
// then read through the shipped compared form, which is what the parity gate compares on.
const cases = [
	['Class B (space-padded code span)', 'cells joined by ` | `, so a reader can locate the row.'],
	['Class B one-sided (leading space only)', 'cells joined by ` |`, so a reader can locate the row.'],
	['Class B all whitespace', 'a ` ` span reads the same on both sides.'],
	['Class A (backtick inside a code span)', 'so `` `Widget` `` reads the same on both sides.'],
	['link token inside a code span', 'a `{@link Widget}` token stays literal.'],
	['ordinary', 'Walks the tree and returns nothing.'],
	['code span', 'Represents one `SurfaceSymbol` — its identifier.'],
]

for (const [label, summary] of cases) {
	const cell = summary.replace(/\|/g, '\\|')
	const table = '| Name | Kind | Summary |\n| --- | --- | --- |\n| `walk` | function | ' + cell + ' |'
	const back = md.createMarkdown(table).document.children[0]
	const read = normalizeSummary(extractCellText(back.rows[0][2]))
	const written = normalizeSummary(summary)
	console.log(read === written ? 'AGREES ' : 'DIFFERS', label)
	if (read !== written) {
		console.log('   source side:', JSON.stringify(written))
		console.log('   guide side :', JSON.stringify(read))
	}
}
