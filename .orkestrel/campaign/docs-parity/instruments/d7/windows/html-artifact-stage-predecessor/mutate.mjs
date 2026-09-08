import { readFile, writeFile } from 'node:fs/promises'

const [manifest, view] = process.argv.slice(2)

if (manifest === undefined || view === undefined) throw new Error('Expected HTML manifest and registry view paths.')

const text = await readFile(manifest, 'utf8')
const value = JSON.parse(text)
const served = await readFile(view, 'utf8')

if (
	typeof value !== 'object' ||
	value === null ||
	Array.isArray(value) ||
	value.name !== '@orkestrel/html' ||
	value.version !== '0.0.9' ||
	typeof value.dependencies !== 'object' ||
	value.dependencies === null ||
	Array.isArray(value.dependencies) ||
	value.dependencies['@orkestrel/contract'] !== '^0.0.16'
) {
	throw new Error('HTML manifest does not match the measured Contract dependency.')
}

if (served.includes('"0.0.9"')) throw new Error('Prepared HTML version 0.0.9 is already registry-served.')

value.dependencies['@orkestrel/contract'] = '^0.0.17'
await writeFile(manifest, `${JSON.stringify(value, null, '\t')}\n`)
