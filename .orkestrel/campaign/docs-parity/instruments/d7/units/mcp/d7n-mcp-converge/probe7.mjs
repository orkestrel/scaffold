import { createGuide } from '@orkestrel/guide'
import { readFileSync } from 'node:fs'
const lines = readFileSync('guides/mcp.md','utf8').split('\n')
const has = (n) => {
  const g = createGuide(lines.slice(0, n).join('\n'))
  const r = g.surface().find((s) => s.name === 'MCPServer')
  return r === undefined ? 'none' : r.summary === undefined ? 'nosummary' : 'ok'
}
let lo = 1500, hi = 2000
while (hi - lo > 1) { const m = (lo + hi) >> 1; if (has(m) === 'none') lo = m; else hi = m }
console.log('first nosummary at prefix', hi)
console.log(lines.slice(hi - 6, hi + 1).join('\n'))
