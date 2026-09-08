import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createMarkdown, htmlToMarkdown, renderHTML, renderMarkdown } from '@orkestrel/markdown'
import { parseDocument } from '@orkestrel/html'
import { hashFile } from './functions.cjs'

const [contractArchive, htmlArchive] = process.argv.slice(2)
if (contractArchive === undefined || htmlArchive === undefined) throw new Error('Expected extracted Contract and HTML package paths.')
const consumer = createRequire(join(process.cwd(), 'package.json'))
const markdownManifest = consumer.resolve('@orkestrel/markdown/package.json')
const markdown = JSON.parse(await readFile(markdownManifest, 'utf8'))
const htmlManifest = consumer.resolve('@orkestrel/html/package.json')
const contractManifest = consumer.resolve('@orkestrel/contract/package.json')
const markdownRequire = createRequire(markdownManifest)
if (markdown.dependencies['@orkestrel/html'] !== '^0.0.9' || markdown.dependencies['@orkestrel/contract'] !== '^0.0.17') throw new Error('Markdown does not declare the expected runtime pins.')
for (const [name, root] of [['@orkestrel/html', htmlManifest], ['@orkestrel/contract', contractManifest]]) {
	const nested = markdownRequire.resolve(`${name}/package.json`)
	if ((await realpath(nested)) !== (await realpath(root))) throw new Error(`Markdown resolves a different ${name} package from the consumer.`)
}
const document = createMarkdown('# Hi\n\nRead the [guide](./guide.md) for more, *thanks*.').document
if (renderHTML(document) !== '<h1>Hi</h1><p>Read the <a href="./guide.md">guide</a> for more, <em>thanks</em>.</p>') throw new Error('Markdown renderer returned unexpected markup.')
if (renderMarkdown(htmlToMarkdown(parseDocument('<h1>Release notes</h1><p>Ship <b>fast</b>.</p>'))) !== '# Release notes\n\nShip **fast**.') throw new Error('Markdown HTML projection returned unexpected Markdown.')
for (const [name, archive] of [['@orkestrel/html', htmlArchive], ['@orkestrel/contract', contractArchive]]) {
	const manifest = JSON.parse(await readFile(consumer.resolve(`${name}/package.json`), 'utf8'))
	const installed = fileURLToPath(await import.meta.resolve(name))
	if (hashFile(join(archive, manifest.module)) !== hashFile(installed)) throw new Error(`Installed ${name} ESM entry differs from the accepted archive.`)
}
console.log('behavior=markdown-rendering-and-html-projection')
