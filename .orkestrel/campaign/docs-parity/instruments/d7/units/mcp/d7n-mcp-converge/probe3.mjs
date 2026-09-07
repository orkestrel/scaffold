import { createGuide } from '@orkestrel/guide'
import { readFileSync } from 'node:fs'
const guide = createGuide(readFileSync('guides/mcp.md','utf8'))
for (const s of guide.surface()) if (s.summary === undefined) console.log(s.keyword, s.name)
