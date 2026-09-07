import { createGuide } from '@orkestrel/guide'
import { readFileSync } from 'node:fs'
const lines = readFileSync('guides/mcp.md','utf8').split('\n')
const has = (n) => {
  const g = createGuide(lines.slice(0, n).join('\n'))
  const r = g.surface().find((s) => s.name === 'MCPServer')
  return r === undefined ? 'none' : r.summary === undefined ? 'nosummary' : 'ok'
}
let lo = 0, hi = 2140
for (let n = 2130; n <= 2140; n++) console.log(n, has(n))
console.log('--- earlier scan')
for (const n of [300, 500, 1000, 1500, 2000, 2100, 2125, 2130]) console.log(n, has(n))
