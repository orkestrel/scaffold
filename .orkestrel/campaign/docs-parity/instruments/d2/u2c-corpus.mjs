import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
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
	return text
		.replace(/\{@link\s+[^}|]*\|\s*([^}]*?)\s*\}/g, '`$1`')
		.replace(/\{@link\s+([^}|]*?)\s*\}/g, '`$1`')
		.replace(/\s+/g, ' ')
		.trim()
}
function buildCell(text) {
	const nodes = []
	const spans = /`([^`]+)`/g
	let cursor = 0
	let match
	while ((match = spans.exec(text)) !== null) {
		const value = match[1]
		if (match.index > cursor) nodes.push({ element: 'text', value: text.slice(cursor, match.index) })
		if (value.trim() !== value || value.endsWith('\\')) nodes.push({ element: 'text', value: match[0] })
		else nodes.push({ element: 'codeSpan', value })
		cursor = match.index + match[0].length
	}
	if (cursor < text.length) nodes.push({ element: 'text', value: text.slice(cursor) })
	return nodes
}

// corpus: every description paragraph in src/core, normalized
function blocks(text) {
	const out = []
	let index = text.indexOf('/**')
	while (index >= 0) {
		const end = text.indexOf('*/', index + 3)
		if (end < 0) break
		const lineStart = text.lastIndexOf('\n', index) + 1
		if (text.slice(lineStart, index).trim() === '') out.push(text.slice(lineStart, end + 2))
		index = text.indexOf('/**', end + 2)
	}
	return out
}
function unwrap(raw) {
	const body = /^[ \t]*\/\*([\s\S]*?)\*\/[ \t]*$/.exec(raw)?.[1] ?? raw
	return body.split('\n').map((l) => l.replace(/^[ \t]*\*[ \t]?/, '').replace(/[ \t]+$/, '')).join('\n').replace(/^\n+/, '').replace(/\n+$/, '')
}
const files = ['src/core/helpers.ts','src/core/types.ts','src/core/constants.ts','src/core/Guide.ts','src/core/sources/Source.ts','src/core/sources/SourceManager.ts','src/core/factories.ts','src/core/validators.ts','src/core/shapers.ts','src/core/parsers.ts']
const corpus = []
for (const f of files) {
	for (const raw of blocks(readFileSync(f, 'utf8'))) {
		const text = unwrap(raw)
		const tag = text.search(/^[ \t]*@\w/m)
		const summary = normalizeSummary(tag < 0 ? text : text.slice(0, tag))
		if (summary.length > 0) corpus.push(summary)
	}
}
const extra = [
	'A cell with *stars* and _underscores_ and [brackets].',
	'A cell with a lone backtick ` here.',
	'A `` `nested` `` double backtick.',
	'Empty code span `` here.',
	'A [link](target) written literally.',
	'A cell carrying a pipe | inside it.',
	'`a | b` inside a code span.',
	'Ends with a code span `X`',
	'`Leads` with a code span.',
	'A \\ backslash and a \\| escaped pipe.',
	'Two `spans` back to `back`.',
	'`adjacent``spans`',
]
let bad = 0, nonIdem = 0
for (const summary of [...corpus, ...extra]) {
	const table = {
		element: 'table',
		header: [[{element:'text',value:'Name'}],[{element:'text',value:'Kind'}],[{element:'text',value:'Summary'}]],
		rows: [[[{element:'codeSpan',value:'walk'}],[{element:'text',value:'function'}],buildCell(summary)]],
		align: [null, null, null],
	}
	const rendered = md.renderMarkdown(table)
	const back = md.createMarkdown(rendered).document.children[0]
	const cell = back?.rows?.[0]?.[2]
	const read = cell === undefined ? '(no cell)' : normalizeSummary(extractCellText(cell))
	if (read !== summary) { bad += 1; console.log('FAIL', JSON.stringify(summary)); console.log('  read:', JSON.stringify(read)) }
	const again = md.renderMarkdown(md.createMarkdown(rendered).document)
	if (again !== rendered) { nonIdem += 1; console.log('NONIDEM', JSON.stringify(summary), JSON.stringify(rendered.split('\n')[2]), '->', JSON.stringify(again.split('\n')[2])) }
}
console.log('corpus summaries:', corpus.length, '| extra:', extra.length)
console.log('round-trip failures:', bad, '| non-idempotent renders:', nonIdem)
