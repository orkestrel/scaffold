// Harness POSITIVE CONTROL: a dist copy with a planted per-call cost in the
// compiled object guard (four extra Object.keys reads discarded). The paired
// harness must report a CI95 on median(B/A) that excludes 1.0 for is-medium.
// Run: node slow-control-patch.mjs <src> <target>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const anchor = '\t\t\t\treturn (value) => {\n\t\t\t\t\tif (!isRecord(value)) return false;\n\t\t\t\t\tconst keys = enumerableKeys(value);\n\t\t\t\t\tif (keys === void 0) return false;\n'
if (!text.includes(anchor)) { console.error('SLOW: anchor missing'); process.exit(1) }
const replacement = '\t\t\t\treturn (value) => {\n\t\t\t\t\tif (!isRecord(value)) return false;\n\t\t\t\t\tconst keys = enumerableKeys(value);\n\t\t\t\t\tif (keys === void 0) return false;\n\t\t\t\t\tfor (let plant = 0; plant < 4; plant += 1) PLANTED_SINK += INTRINSICS.keys(value).length;\n'
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, 'let PLANTED_SINK = 0;\n' + text.replace(anchor, replacement))
console.log('slow control patched -> ' + target)
