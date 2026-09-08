import { readFile, writeFile } from 'node:fs/promises'

const [manifest, view] = process.argv.slice(2)
if (manifest === undefined || view === undefined) throw new Error('Expected Markdown manifest and registry view paths.')
const value = JSON.parse(await readFile(manifest, 'utf8'))
const served = await readFile(view, 'utf8')
if (typeof value !== 'object' || value === null || Array.isArray(value) || value.name !== '@orkestrel/markdown' || value.version !== '0.0.14' || typeof value.dependencies !== 'object' || value.dependencies === null || Array.isArray(value.dependencies) || value.dependencies['@orkestrel/contract'] !== '^0.0.16' || value.dependencies['@orkestrel/html'] !== '^0.0.8') throw new Error('Markdown manifest does not match the measured runtime dependencies.')
if (served.includes('"0.0.14"')) throw new Error('Prepared Markdown version 0.0.14 is already registry-served.')
value.dependencies['@orkestrel/contract'] = '^0.0.17'
value.dependencies['@orkestrel/html'] = '^0.0.9'
await writeFile(manifest, `${JSON.stringify(value, undefined, '\t')}\n`)
