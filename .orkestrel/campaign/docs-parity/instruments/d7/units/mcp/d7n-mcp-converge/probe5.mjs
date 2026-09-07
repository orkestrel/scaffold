import { createGuide } from '@orkestrel/guide'
import { readFileSync } from 'node:fs'
const lines = readFileSync('guides/mcp.md','utf8').split('\n')
// binary-search the prefix length at which MCPServer loses its summary
const has = (n) => {
  const g = createGuide(lines.slice(0, n).join('\n'))
  const r = g.surface().find((s) => s.name === 'MCPServer')
  return r === undefined ? 'none' : r.summary === undefined ? 'nosummary' : 'ok'
}
for (const n of [2140, 2200, 2500, 3000, 3200, 3300, 3500, 4000, 5000, lines.length]) console.log(n, has(n))
