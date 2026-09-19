// Probe: runs the vendored-import proof's own text regex over a supplied file and prints the
// undeclared specifiers it extracts, so the checkpoint baseline can be read without a checkout.
import { readFileSync } from 'node:fs'

const pattern = /\b(?:from|import|require)\s*\(?\s*(['"`])(@orkestrel\/[^'"`]+)\1/gu
const content = readFileSync(process.argv[2], 'utf8')
const found = []
for (const match of content.matchAll(pattern)) found.push(match[2])
console.log(`${process.argv[2]}: ${JSON.stringify(found)}`)
