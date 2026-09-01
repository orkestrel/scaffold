// Parity NEGATIVE CONTROL: a dist copy whose string guard also accepts numbers.
// parity.mjs against this copy must report differences; a clean report here
// means the instrument is blind. Run: node sabotage-patch.mjs <src> <target>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const anchor = 'function isString(value) {\n\treturn typeof value === "string";\n}'
if (!text.includes(anchor)) { console.error('SABOTAGE: anchor missing'); process.exit(1) }
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(anchor, 'function isString(value) {\n\treturn typeof value === "string" || typeof value === "number";\n}'))
console.log('sabotage patched -> ' + target)
