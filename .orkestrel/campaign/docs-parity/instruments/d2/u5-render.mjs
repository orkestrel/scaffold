import { createRequire } from 'node:module'
const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))
console.log('flattenText over a heading with a code span:',
	JSON.stringify(md.flattenText(md.createMarkdown('### Construct a `Guide` here').document.children[0])))
console.log('flattenText over a text node with backticks:',
	JSON.stringify(md.flattenText({ element: 'text', value: '`Guide`' })))
// empty summary cell
const table = {
	element: 'table',
	header: [[{element:'text',value:'Name'}],[{element:'text',value:'Kind'}],[{element:'text',value:'Summary'}]],
	rows: [
		[[{element:'codeSpan',value:'walk'}],[{element:'text',value:'function'}],[]],
		[[{element:'codeSpan',value:'Widget'}],[{element:'text',value:'class'}],[{element:'text',value:'Represents a cog.'}]],
	],
	align: [null, null, null],
}
const rendered = md.renderMarkdown(table)
console.log('rendered:\n' + rendered)
const back = md.createMarkdown(rendered).document.children[0]
console.log('row 0 summary cell:', JSON.stringify(back.rows[0][2]))
console.log('re-render identical:', md.renderMarkdown(md.createMarkdown(rendered).document) === rendered)
// example render
for (const ex of [
	{ name: 'walk', title: 'Walk a tree', code: 'walk()', language: 'ts' },
	{ name: 'walk', code: 'walk()', language: 'ts' },
	{ name: 'walk', title: 'Construct a `Guide`', code: "const g = 1\ng++", language: 'ts' },
	{ name: 'walk', title: 'No language', code: 'plain' },
	{ name: 'walk', title: 'Inner fence', code: '```\ninner\n```', language: 'md' },
]) {
	const fence = { element: 'codeBlock', code: ex.code, ...(ex.language === undefined ? {} : { lang: ex.language }) }
	const children = ex.title === undefined ? [fence] : [{ element: 'heading', level: 3, children: [{ element: 'text', value: ex.title }] }, fence]
	const text = md.renderMarkdown({ element: 'document', children })
	const doc = md.createMarkdown(text).document
	// mirror extractFences
	let title = ''
	const out = []
	for (const node of md.walkNodes(doc)) {
		if (md.isHeadingNode(node)) { title = md.flattenText(node).trim(); continue }
		if (md.isCodeBlockNode(node)) out.push({ language: node.lang, code: node.code, ...(title.length === 0 ? {} : { title }) })
	}
	const want = { language: ex.language, code: ex.code, ...(ex.title === undefined ? {} : { title: ex.title }) }
	console.log(JSON.stringify(out) === JSON.stringify([want]) ? 'OK  ' : 'FAIL', JSON.stringify(ex.title ?? '(untitled)'))
	if (JSON.stringify(out) !== JSON.stringify([want])) {
		console.log('   text:', JSON.stringify(text))
		console.log('   got :', JSON.stringify(out))
		console.log('   want:', JSON.stringify([want]))
	}
}
