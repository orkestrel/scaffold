import { createRequire } from 'node:module'
import { readFile } from 'node:fs/promises'

const [manifest] = process.argv.slice(2)

if (manifest === undefined) {
	throw new Error('Expected an Abort manifest path.')
}

const require = createRequire(manifest)
const packages = ['@orkestrel/abort', '@orkestrel/contract', '@orkestrel/guide']

for (const name of packages) {
	const path = require.resolve(`${name}/package.json`)
	const value = JSON.parse(await readFile(path, 'utf8'))
	console.log(`${name}\t${value.version}\t${path}`)
}

console.log(`contract-entry\t${require.resolve('@orkestrel/contract')}`)
console.log(`manifest\t${manifest}`)
