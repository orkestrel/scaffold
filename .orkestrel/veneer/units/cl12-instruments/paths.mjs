// CL12 path sweep: every repository-rooted path the guide names, backticked or bare.
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const guide = readFileSync(resolve(root, 'guides/veneer.md'), 'utf8')
const pattern = /\b(?:tests|src|app|configs|dist|guides|scripts|node_modules)\/[\w./-]+/g
const found = [...new Set([...guide.matchAll(pattern)].map((match) => match[0].replace(/[.,;]$/, '')))].sort()
const missing = found.filter((token) => !existsSync(resolve(root, token)))
console.log(JSON.stringify({ checked: found.length, missing }, null, '\t'))
