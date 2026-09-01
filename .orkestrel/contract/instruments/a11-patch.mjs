// A11 dist surgery (probe only): preview takes a whole-string JSON.stringify
// fast path when the encoded form fits under the 64-character cap, and falls
// back to the per-character boundary walk only when it does not. Output is
// identical by construction (the walk appends every token when the encoded
// inner length is at most 62 for a quoted string, or at most 64 for a symbol).
// Run: node a11-patch.mjs <src> <target>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const anchor = '\t\tconst quoted = isString(value);\n\t\tconst source = INTRINSICS.text(value);\n\t\tlet text = quoted ? "\\"" : "";\n'
if (!text.includes(anchor)) { console.error('A11: anchor missing'); process.exit(1) }
const replacement = '\t\tconst quoted = isString(value);\n\t\tconst source = INTRINSICS.text(value);\n\t\tconst whole = INTRINSICS.stringify(source);\n\t\tif (quoted) {\n\t\t\tif (whole.length <= 64) return whole;\n\t\t} else if (whole.length <= 66) return whole.slice(1, -1);\n\t\tlet text = quoted ? "\\"" : "";\n'
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(anchor, replacement))
console.log('A11 patched -> ' + target)
