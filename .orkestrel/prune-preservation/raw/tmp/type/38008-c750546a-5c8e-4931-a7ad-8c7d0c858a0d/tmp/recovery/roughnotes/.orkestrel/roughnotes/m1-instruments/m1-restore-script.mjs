import { readFileSync, writeFileSync } from 'node:fs'
const path = 'package.json'
const raw = readFileSync(path, 'utf8')
const anchor = '\t\t"test:policy": "vitest run --config vite.config.ts --no-cache --reporter=dot --project policy",\n'
const line = '\t\t"test:journey": "vitest run --config vite.config.ts --no-cache --reporter=dot --project \'journey:*\'",\n'
if (raw.includes(line)) throw new Error('test:journey already present')
if (!raw.includes(anchor)) throw new Error('anchor missing')
writeFileSync(path, raw.replace(anchor, line + anchor))
console.log('restored test:journey script line')
