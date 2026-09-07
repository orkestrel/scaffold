import { createRequire } from 'node:module'
const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))
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
	return text.replace(/\{@link\s+[^}|]*\|\s*([^}]*?)\s*\}/g, '`$1`').replace(/\{@link\s+([^}|]*?)\s*\}/g, '`$1`').replace(/\s+/g, ' ').trim()
}
// The control: a human writes the summary into the guide cell verbatim, escaping only the pipe.
const cases = [
	["Class B (space-padded code span)", "cells joined by ` | `, so a reader can locate the row."],
	["Class A (backtick inside a code span)", "so `` `Widget` `` reads the same on both sides."],
	["ordinary", "Walks the tree and returns nothing."],
	["code span", "Represents one `SurfaceSymbol` — its identifier."],
]
for (const [label, summary] of cases) {
	const cell = summary.replace(/\|/g, '\\|')
	const table = '| Name | Kind | Summary |\n| --- | --- | --- |\n| `walk` | function | ' + cell + ' |'
	const back = md.createMarkdown(table).document.children[0]
	const read = normalizeSummary(extractCellText(back.rows[0][2]))
	console.log(read === summary ? 'AGREES ' : 'DIFFERS', label)
	if (read !== summary) {
		console.log('   source side:', JSON.stringify(summary))
		console.log('   guide side :', JSON.stringify(read))
	}
}
