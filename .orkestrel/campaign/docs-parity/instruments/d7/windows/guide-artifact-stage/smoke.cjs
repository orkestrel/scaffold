const { createRequire } = require('node:module')
const { deepEqual } = require('node:assert/strict')
const { realpathSync } = require('node:fs')
const { join } = require('node:path')
const { createGuide, createSource, createSurfaceSymbolContract, findDrift } = require('@orkestrel/guide')
const { hashFile } = require('./functions.cjs')

const [contractArchive, htmlArchive, markdownArchive, guideArchive] = process.argv.slice(2)
if ([contractArchive, htmlArchive, markdownArchive, guideArchive].some((value) => value === undefined)) throw new Error('Expected extracted package paths.')
const markdown = '## Surface\n\n| Name | Kind | Summary |\n| --- | --- | --- |\n| `walk` | function | Walks the tree. |'
const files = { 'src/core/helpers.ts': '/**\n * Walks a tree.\n */\nexport function walk(): void {}\n', 'src/core/index.ts': "export * from './helpers.js'\n" }
const drift = findDrift(createGuide(markdown), createSource({ files, module: 'src/core' }))
deepEqual(drift, [{ guide: 'Walks the tree.', key: 'function walk', source: 'Walks a tree.' }], 'Guide did not report the documented findDrift disagreement.')
if (!createSurfaceSymbolContract().is({ name: 'Markdown', keyword: 'class' })) throw new Error('Guide surface-symbol contract did not accept the Markdown surface symbol.')
const consumer = createRequire(join(process.cwd(), 'package.json'))
const guideManifest = consumer.resolve('@orkestrel/guide/package.json')
const markdownManifest = consumer.resolve('@orkestrel/markdown/package.json')
const htmlManifest = consumer.resolve('@orkestrel/html/package.json')
const contractManifest = consumer.resolve('@orkestrel/contract/package.json')
const guideRequire = createRequire(guideManifest)
const markdownRequire = createRequire(markdownManifest)
const htmlRequire = createRequire(htmlManifest)
for (const [name, path] of [['@orkestrel/contract', contractManifest], ['@orkestrel/markdown', markdownManifest], ['@orkestrel/html', htmlManifest]]) {
	if (realpathSync(guideRequire.resolve(`${name}/package.json`)) !== realpathSync(path)) throw new Error(`Guide resolves a different ${name} package from the consumer.`)
}
for (const [name, path] of [['@orkestrel/contract', contractManifest], ['@orkestrel/html', htmlManifest]]) {
	if (realpathSync(markdownRequire.resolve(`${name}/package.json`)) !== realpathSync(path)) throw new Error(`Markdown resolves a different ${name} package from the consumer.`)
}
if (realpathSync(htmlRequire.resolve('@orkestrel/contract/package.json')) !== realpathSync(contractManifest)) throw new Error('HTML resolves a different Contract package from the consumer.')
for (const [name, archive] of [['@orkestrel/contract', contractArchive], ['@orkestrel/html', htmlArchive], ['@orkestrel/markdown', markdownArchive], ['@orkestrel/guide', guideArchive]]) {
	const manifest = require(`${name}/package.json`)
	if (hashFile(join(archive, manifest.main)) !== hashFile(require.resolve(name))) throw new Error(`Installed ${name} CommonJS entry differs from the accepted archive.`)
}
console.log('behavior=guide-drift-and-contract-composition')
