// F1 measurement (probe only): the U1 build with the INDEX_TEXTS ternary
// replaced by INTRINSICS.text(position) at every position, so the paired A/B
// U1 vs U1-without-table isolates what the table buys.
// Run: node u1-notable-patch.mjs <u1-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const anchor = 'const text = position < INDEX_TEXTS.length ? INDEX_TEXTS[position] : INTRINSICS.text(position);'
if (!text.includes(anchor)) { console.error('notable: anchor missing'); process.exit(1) }
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(anchor, 'const text = INTRINSICS.text(position);'))
console.log('u1-notable patched -> ' + target)
