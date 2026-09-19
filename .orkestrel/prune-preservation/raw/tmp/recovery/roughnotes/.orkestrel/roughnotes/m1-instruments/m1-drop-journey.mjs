import { readFileSync, writeFileSync } from 'node:fs'
const path = 'package.json'
const raw = readFileSync(path, 'utf8')
const line = '\t\t"test:journey": "vitest run --config vite.config.ts --no-cache --reporter=dot --project \'journey:*\'",\n'
if (!raw.includes(line)) throw new Error('test:journey line not found verbatim')
writeFileSync(path, raw.replace(line, ''))
console.log('removed test:journey script line')
