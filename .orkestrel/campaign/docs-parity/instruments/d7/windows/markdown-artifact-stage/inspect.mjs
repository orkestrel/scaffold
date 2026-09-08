import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const [manifest] = process.argv.slice(2)
if (manifest === undefined) throw new Error('Expected a Markdown manifest path.')
const require = createRequire(manifest)
for (const name of ['@orkestrel/markdown', '@orkestrel/html', '@orkestrel/contract', '@orkestrel/guide', '@orkestrel/test']) {
	const path = require.resolve(`${name}/package.json`)
	const value = JSON.parse(await readFile(path, 'utf8'))
	console.log(`${name}\t${value.version}\t${path}`)
}
const markdown = JSON.parse(await readFile(manifest, 'utf8'))
const html = JSON.parse(await readFile(require.resolve('@orkestrel/html/package.json'), 'utf8'))
const contract = JSON.parse(await readFile(require.resolve('@orkestrel/contract/package.json'), 'utf8'))
if (markdown.dependencies['@orkestrel/html'] !== '^0.0.9' || html.version !== '0.0.9' || markdown.dependencies['@orkestrel/contract'] !== '^0.0.17' || contract.version !== '0.0.17') throw new Error('Markdown does not resolve the staged runtime versions.')
console.log(`html-entry\t${require.resolve('@orkestrel/html')}`)
console.log(`contract-entry\t${require.resolve('@orkestrel/contract')}`)
console.log(`manifest\t${manifest}`)
