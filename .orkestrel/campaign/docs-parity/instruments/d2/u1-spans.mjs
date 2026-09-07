import { createRequire } from 'node:module'
const load = createRequire('/home/user/fleet/guide/package.json')
const md = await import(load.resolve('@orkestrel/markdown'))

const text = [
	'# Title',
	'',
	'> A tagline.',
	'',
	'## Surface',
	'',
	'Prose before the table.',
	'',
	'| Name     | Kind     | Summary            |',
	'| -------- | -------- | ------------------ |',
	'| `walk`   | function | Walks the tree.    |',
	'| `Widget` | class    | Represents a cog.  |',
	'',
	'### Construct a widget',
	'',
	'```ts',
	'const widget = new Widget()',
	'```',
	'',
	'Trailing prose.',
	'',
].join('\n')

const handle = md.createMarkdown(text)
const table = handle.find(md.isTableNode)
const fence = handle.find(md.isCodeBlockNode)
console.log('table found:', table !== undefined, '| fence found:', fence !== undefined)

for (const [label, node] of [['table', table], ['fence', fence]]) {
	const span = handle.span(node)
	console.log(`${label} span:`, JSON.stringify(span))
	if (span === undefined) continue
	const slice = text.slice(span.start, span.end)
	console.log(`${label} slice:`, JSON.stringify(slice))
	const reparsed = md.createMarkdown(slice).document
	console.log(`${label} reparsed children:`, reparsed.children.map((c) => c.element).join(','))
	console.log(`${label} reparses to same node:`, JSON.stringify(reparsed.children[0]) === JSON.stringify(node))
	console.log(`${label} render:`, JSON.stringify(md.renderMarkdown(node)))
	// splice control: replace the span with the render and re-read
	const spliced = text.slice(0, span.start) + md.renderMarkdown(node) + text.slice(span.end)
	console.log(`${label} splice keeps everything outside:`,
		spliced.slice(0, span.start) === text.slice(0, span.start) &&
		spliced.slice(spliced.length - (text.length - span.end)) === text.slice(span.end))
	console.log(`${label} spliced text:\n---\n${spliced}\n---`)
}
