import { createRequire } from 'node:module'
const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))

// mirror extractCellText + normalizeSummary from src/core/helpers.ts
function extractCellText(cell) {
	let text = ''
	for (const node of cell) {
		if (md.isCodeSpanNode(node)) text += '`' + node.value + '`'
		else if (md.isEmphasisNode(node) || md.isLinkNode(node) || md.isImageNode(node)) text += extractCellText(node.children)
		else text += md.flattenText(node)
	}
	return text
}
function normalizeSummary(text) {
	return text
		.replace(/\{@link\s+[^}|]*\|\s*([^}]*?)\s*\}/g, '`$1`')
		.replace(/\{@link\s+([^}|]*?)\s*\}/g, '`$1`')
		.replace(/\s+/g, ' ')
		.trim()
}

const cases = [
	'Walks the tree.',
	'Represents one `SurfaceSymbol` — its identifier and keyword.',
	'A cell carrying a pipe | inside it.',
	'A cell with *stars* and _underscores_ and [brackets].',
	'A cell with a lone backtick ` here.',
	'`Kind` and `Summary` columns, `a | b` inside a code span.',
	"The `'.'` root, `--` dashes, and a \\ backslash.",
	'A cell ending in a code span `X`',
	'Holds the exact source characters, excluding the LF or CRLF terminator.',
	'A trailing double space test.',
	'A #hash and a >quote and a -dash lead.',
]

let bad = 0
for (const summary of cases) {
	const table = {
		element: 'table',
		header: [[{ element: 'text', value: 'Name' }], [{ element: 'text', value: 'Kind' }], [{ element: 'text', value: 'Summary' }]],
		rows: [[[{ element: 'codeSpan', value: 'walk' }], [{ element: 'text', value: 'function' }], md.parseInline(summary)]],
		align: [null, null, null],
	}
	const rendered = md.renderMarkdown(table)
	const back = md.createMarkdown(rendered).document.children[0]
	const cell = back?.rows?.[0]?.[2]
	const read = cell === undefined ? '(no cell)' : normalizeSummary(extractCellText(cell))
	const ok = read === normalizeSummary(summary)
	if (!ok) bad += 1
	console.log(ok ? 'OK  ' : 'FAIL', JSON.stringify(summary))
	if (!ok) {
		console.log('   rendered:', JSON.stringify(rendered.split('\n')[2]))
		console.log('   read back:', JSON.stringify(read))
	}
	// idempotence
	const again = md.renderMarkdown(md.createMarkdown(rendered).document)
	if (again !== rendered) console.log('   NOT IDEMPOTENT:', JSON.stringify(again))
}
console.log('failures:', bad)
