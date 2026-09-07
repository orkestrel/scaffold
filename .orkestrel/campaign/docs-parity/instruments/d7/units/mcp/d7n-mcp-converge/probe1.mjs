import { createGuide, createSource, computeSymbolKey } from '@orkestrel/guide'
import { readFileSync, globSync } from 'node:fs'
const files = {}
for (const k of globSync(['src/**/*.ts','tests/**/*.ts','guides/*.md','*.md'])) files[k.replaceAll('\\','/')] = readFileSync(k,'utf8')
const guide = createGuide(files['guides/mcp.md'])
const rows = guide.surface().filter((s) => s.name === 'MCPServer')
console.log(JSON.stringify(rows, null, 1))
console.log(rows.map(computeSymbolKey))
