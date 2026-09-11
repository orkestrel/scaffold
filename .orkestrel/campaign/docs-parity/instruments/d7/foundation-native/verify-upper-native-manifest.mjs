import { readFile } from 'node:fs/promises'

const [path] = process.argv.slice(2)

if (path === undefined) throw new Error('Expected a package JSON path.')

const value = JSON.parse(await readFile(path, 'utf8'))

if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Package JSON must be an object.')
if (typeof value.scripts !== 'object' || value.scripts === null || Array.isArray(value.scripts)) throw new Error('Package JSON scripts must be an object.')
if (value.scripts.docs !== undefined) throw new Error('Package JSON scripts.docs must be absent.')
if (value.scripts['test:guides'] !== 'node --experimental-strip-types tests/guides.test.ts') throw new Error('Package JSON test:guides differs.')
