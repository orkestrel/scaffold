import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

const [manifest] = process.argv.slice(2)

if (manifest === undefined) throw new Error('Expected an HTML manifest path.')

const require = createRequire(manifest)
const packages = ['@orkestrel/html', '@orkestrel/contract', '@orkestrel/guide', '@orkestrel/test']

for (const name of packages) {
	const path = require.resolve(`${name}/package.json`)
	const value = JSON.parse(await readFile(path, 'utf8'))
	console.log(`${name}\t${value.version}\t${path}`)
}

const contract = JSON.parse(await readFile(require.resolve('@orkestrel/contract/package.json'), 'utf8'))
if (contract.version !== '0.0.17') throw new Error('HTML does not resolve Contract 0.0.17.')

console.log(`contract-entry\t${require.resolve('@orkestrel/contract')}`)
console.log(`manifest\t${manifest}`)
