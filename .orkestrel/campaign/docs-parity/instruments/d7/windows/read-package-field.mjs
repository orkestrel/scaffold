import { readFile } from 'node:fs/promises'

const [path, field] = process.argv.slice(2)

if (path === undefined) throw new Error('Expected a package JSON path.')
if (field !== 'name' && field !== 'version') throw new Error('Expected name or version as the package field.')

const value = JSON.parse(await readFile(path, 'utf8'))

if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Package JSON must be an object.')
if (!Object.hasOwn(value, field) || typeof value[field] !== 'string') throw new Error(`Package JSON field must be a string: ${field}`)

console.log(value[field])
