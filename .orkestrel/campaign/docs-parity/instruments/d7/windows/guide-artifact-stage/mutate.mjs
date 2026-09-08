import { readFile, writeFile } from 'node:fs/promises'

const [manifest, view] = process.argv.slice(2)
if (manifest === undefined || view === undefined) throw new Error('Expected Guide manifest and registry view paths.')
const value = JSON.parse(await readFile(manifest, 'utf8'))
const served = await readFile(view, 'utf8')
if (typeof value !== 'object' || value === null || Array.isArray(value) || value.name !== '@orkestrel/guide' || value.version !== '0.0.18' || typeof value.dependencies !== 'object' || value.dependencies === null || Array.isArray(value.dependencies) || value.dependencies['@orkestrel/contract'] !== '^0.0.16' || value.dependencies['@orkestrel/markdown'] !== '^0.0.13') throw new Error('Guide manifest does not match the measured runtime dependencies.')
if (served.includes('"0.0.18"')) throw new Error('Prepared Guide version 0.0.18 is already registry-served.')
value.dependencies['@orkestrel/contract'] = '^0.0.17'
value.dependencies['@orkestrel/markdown'] = '^0.0.14'
await writeFile(manifest, `${JSON.stringify(value, undefined, '\t')}\n`)
