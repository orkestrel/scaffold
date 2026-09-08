import { readFile, realpath } from 'node:fs/promises'
import { deepEqual } from 'node:assert/strict'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGuide, createSource, createSurfaceSymbolContract, findDrift } from '@orkestrel/guide'
import { hashFile } from './functions.cjs'

const [contractArchive, htmlArchive, markdownArchive, guideArchive] = process.argv.slice(2)
if ([contractArchive, htmlArchive, markdownArchive, guideArchive].some((value) => value === undefined)) throw new Error('Expected extracted package paths.')
const consumer = createRequire(join(process.cwd(), 'package.json'))
const guideManifest = consumer.resolve('@orkestrel/guide/package.json')
const markdownManifest = consumer.resolve('@orkestrel/markdown/package.json')
const htmlManifest = consumer.resolve('@orkestrel/html/package.json')
const contractManifest = consumer.resolve('@orkestrel/contract/package.json')
const guide = JSON.parse(await readFile(guideManifest, 'utf8'))
if (guide.dependencies['@orkestrel/contract'] !== '^0.0.17' || guide.dependencies['@orkestrel/markdown'] !== '^0.0.14') throw new Error('Guide does not declare the expected runtime pins.')
for (const [name, path] of [['@orkestrel/contract', contractManifest], ['@orkestrel/markdown', markdownManifest], ['@orkestrel/html', htmlManifest]]) {
	if ((await realpath(createRequire(guideManifest).resolve(`${name}/package.json`))) !== (await realpath(path))) throw new Error(`Guide resolves a different ${name} package from the consumer.`)
}
if ((await realpath(createRequire(markdownManifest).resolve('@orkestrel/contract/package.json'))) !== (await realpath(contractManifest))) throw new Error('Markdown resolves a different Contract package from the consumer.')
if ((await realpath(createRequire(markdownManifest).resolve('@orkestrel/html/package.json'))) !== (await realpath(htmlManifest))) throw new Error('Markdown resolves a different HTML package from the consumer.')
if ((await realpath(createRequire(htmlManifest).resolve('@orkestrel/contract/package.json'))) !== (await realpath(contractManifest))) throw new Error('HTML resolves a different Contract package from the consumer.')
const markdown = '## Surface\n\n| Name | Kind | Summary |\n| --- | --- | --- |\n| `walk` | function | Walks the tree. |'
const files = { 'src/core/helpers.ts': '/**\n * Walks a tree.\n */\nexport function walk(): void {}\n', 'src/core/index.ts': "export * from './helpers.js'\n" }
const drift = findDrift(createGuide(markdown), createSource({ files, module: 'src/core' }))
deepEqual(drift, [{ guide: 'Walks the tree.', key: 'function walk', source: 'Walks a tree.' }], 'Guide did not report the documented findDrift disagreement.')
if (!createSurfaceSymbolContract().is({ name: 'Markdown', keyword: 'class' })) throw new Error('Guide surface-symbol contract did not accept the Markdown surface symbol.')
for (const [name, archive] of [['@orkestrel/contract', contractArchive], ['@orkestrel/html', htmlArchive], ['@orkestrel/markdown', markdownArchive], ['@orkestrel/guide', guideArchive]]) {
	const manifest = JSON.parse(await readFile(consumer.resolve(`${name}/package.json`), 'utf8'))
	const installed = fileURLToPath(await import.meta.resolve(name))
	if (hashFile(join(archive, manifest.module)) !== hashFile(installed)) throw new Error(`Installed ${name} ESM entry differs from the accepted archive.`)
}
console.log('behavior=guide-drift-and-contract-composition')
