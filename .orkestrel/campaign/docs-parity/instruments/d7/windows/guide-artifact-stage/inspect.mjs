import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'

const [manifest] = process.argv.slice(2)
if (manifest === undefined) throw new Error('Expected a Guide manifest path.')
const require = createRequire(manifest)
for (const name of ['@orkestrel/guide', '@orkestrel/markdown', '@orkestrel/html', '@orkestrel/contract', '@orkestrel/test']) {
	const path = require.resolve(`${name}/package.json`)
	const value = JSON.parse(await readFile(path, 'utf8'))
	console.log(`${name}\t${value.version}\t${path}`)
}
const guide = JSON.parse(await readFile(manifest, 'utf8'))
const markdownManifest = require.resolve('@orkestrel/markdown/package.json')
const htmlManifest = require.resolve('@orkestrel/html/package.json')
const contractManifest = require.resolve('@orkestrel/contract/package.json')
const markdown = JSON.parse(await readFile(markdownManifest, 'utf8'))
if (guide.dependencies['@orkestrel/markdown'] !== '^0.0.14' || guide.dependencies['@orkestrel/contract'] !== '^0.0.17' || markdown.version !== '0.0.14') throw new Error('Guide does not resolve the staged runtime versions.')
const markdownRequire = createRequire(markdownManifest)
for (const [name, path] of [['@orkestrel/contract', contractManifest], ['@orkestrel/html', htmlManifest]]) {
	if ((await realpath(markdownRequire.resolve(`${name}/package.json`))) !== (await realpath(path))) throw new Error(`Markdown resolves a different ${name} package from Guide.`)
}
console.log(`markdown-entry\t${require.resolve('@orkestrel/markdown')}`)
console.log(`manifest\t${manifest}`)
