const { createMarkdown, htmlToMarkdown, renderHTML, renderMarkdown } = require('@orkestrel/markdown')
const { parseDocument } = require('@orkestrel/html')
const { hashFile } = require('./functions.cjs')
const { join } = require('node:path')

const [contractArchive, htmlArchive] = process.argv.slice(2)
if (contractArchive === undefined || htmlArchive === undefined) throw new Error('Expected extracted Contract and HTML package paths.')
const document = createMarkdown('# Hi\n\nRead the [guide](./guide.md) for more, *thanks*.').document
if (renderHTML(document) !== '<h1>Hi</h1><p>Read the <a href="./guide.md">guide</a> for more, <em>thanks</em>.</p>') throw new Error('Markdown renderer returned unexpected markup.')
if (renderMarkdown(htmlToMarkdown(parseDocument('<h1>Release notes</h1><p>Ship <b>fast</b>.</p>'))) !== '# Release notes\n\nShip **fast**.') throw new Error('Markdown HTML projection returned unexpected Markdown.')
for (const [name, archive] of [['@orkestrel/html', htmlArchive], ['@orkestrel/contract', contractArchive]]) {
	const manifest = require(`${name}/package.json`)
	if (hashFile(join(archive, manifest.main)) !== hashFile(require.resolve(name))) throw new Error(`Installed ${name} CommonJS entry differs from the accepted archive.`)
}
console.log('behavior=markdown-rendering-and-html-projection')
