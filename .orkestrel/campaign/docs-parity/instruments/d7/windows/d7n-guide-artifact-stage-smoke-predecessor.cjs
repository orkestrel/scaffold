const { createRequire } = require('node:module')
const { join } = require('node:path')
const { createSurfaceSymbolContract } = require('@orkestrel/contract')
const { createGuide, createSource, findDrift } = require('@orkestrel/guide')
const { hashFile } = require('./functions.cjs')

const [contractArchive, htmlArchive, markdownArchive, guideArchive] = process.argv.slice(2)
if ([contractArchive, htmlArchive, markdownArchive, guideArchive].some((value) => value === undefined)) throw new Error('Expected extracted package paths.')
const markdown = '## Surface\n\n| Name | Kind | Summary |\n| --- | --- | --- |\n| `walk` | function | Walks the tree. |'
const files = { 'src/core/helpers.ts': '/**\n * Walks a tree.\n */\nexport function walk(): void {}\n', 'src/core/index.ts': "export * from './helpers.js'\n" }
const drift = findDrift(createGuide(markdown), createSource({ files, module: 'src/core' }))
if (JSON.stringify(drift) !== JSON.stringify([{ guide: 'Walks the tree.', key: 'function walk', source: 'Walks a tree.' }])) throw new Error('Guide did not report the documented findDrift disagreement.')
if (!createSurfaceSymbolContract().is({ name: 'Markdown', keyword: 'class' })) throw new Error('Contract did not accept the Markdown surface symbol.')
const consumer = createRequire(join(process.cwd(), 'package.json'))
for (const [name, archive] of [['@orkestrel/contract', contractArchive], ['@orkestrel/html', htmlArchive], ['@orkestrel/markdown', markdownArchive], ['@orkestrel/guide', guideArchive]]) {
	const manifest = require(`${name}/package.json`)
	if (hashFile(join(archive, manifest.main)) !== hashFile(require.resolve(name))) throw new Error(`Installed ${name} CommonJS entry differs from the accepted archive.`)
}
console.log('behavior=guide-drift-and-contract-composition')
