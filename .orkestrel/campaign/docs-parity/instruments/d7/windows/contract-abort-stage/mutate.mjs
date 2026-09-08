import { readFile, writeFile } from 'node:fs/promises'

const [manifest] = process.argv.slice(2)

if (manifest === undefined) {
	throw new Error('Expected a package manifest path.')
}

const text = await readFile(manifest, 'utf8')
const value = JSON.parse(text)

if (
	typeof value !== 'object' ||
	value === null ||
	Array.isArray(value) ||
	typeof value.name !== 'string' ||
	value.name !== '@orkestrel/abort' ||
	typeof value.version !== 'string' ||
	value.version !== '0.0.10' ||
	typeof value.dependencies !== 'object' ||
	value.dependencies === null ||
	Array.isArray(value.dependencies) ||
	value.dependencies['@orkestrel/contract'] !== '^0.0.16'
) {
	throw new Error('Abort manifest does not match the measured Contract dependency.')
}

value.dependencies['@orkestrel/contract'] = '^0.0.17'
await writeFile(manifest, `${JSON.stringify(value, null, '\t')}\n`)
