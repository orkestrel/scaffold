import { createGuide, createSource, findDrift } from '@orkestrel/guide'
import { readFileSync, globSync } from 'node:fs'
const files = {}
for (const k of globSync(['src/**/*.ts','tests/**/*.ts','guides/*.md','*.md'])) files[k.replaceAll('\\','/')] = readFileSync(k,'utf8')
const guide = createGuide(files['guides/mcp.md'])
console.log('summaries', JSON.stringify(guide.surface().filter(s=>s.name==='MCPServer'||s.name==='MCPError')))
const g = guide.summaries ? guide.summaries() : undefined
console.log('methods on guide:', Object.keys(Object.getPrototypeOf(guide)))
