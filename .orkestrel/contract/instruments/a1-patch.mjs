// A1 dist surgery (probe only): honest-packed fast path in readArrayEntries.
// When Reflect.ownKeys reports exactly the index keys 0..length-1 followed by
// 'length', the reader skips the numeric round-trip, the collected/keys arrays,
// and the sort decision, and copies entries directly. Every other view takes
// the existing walk unchanged. Own-ness is still verified per index, so a
// proxy reporting a key it does not own is still refused.
// Run: node a1-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const head = 'function readArrayEntries(value) {\n\treturn attempt(() => {\n\t\tconst length = value.length;\n\t\tif (!INTRINSICS.safe(length) || length < 0 || length > 2 ** 32 - 1) throw new INTRINSICS.error("Array length is outside the native array domain");\n\t\tconst collected = [];\n\t\tconst keys = [];\n\t\tlet ascending = true;\n\t\tlet previous = -1;\n\t\tconst members = INTRINSICS.members(value);\n'
if (!text.includes(head)) { console.error('A1: head anchor missing'); process.exit(1) }
const replacement = 'const INDEX_TEXT = [];\nfunction indexText(index) {\n\tlet text = INDEX_TEXT[index];\n\tif (text === void 0) {\n\t\ttext = INTRINSICS.text(index);\n\t\tINDEX_TEXT[index] = text;\n\t}\n\treturn text;\n}\nfunction readArrayEntries(value) {\n\treturn attempt(() => {\n\t\tconst length = value.length;\n\t\tif (!INTRINSICS.safe(length) || length < 0 || length > 2 ** 32 - 1) throw new INTRINSICS.error("Array length is outside the native array domain");\n\t\tconst members = INTRINSICS.members(value);\n\t\tif (length <= 1024 && members.length === length + 1 && members[length] === "length") {\n\t\t\tlet packed = true;\n\t\t\tfor (let index = 0; index < length; index += 1) if (members[index] !== indexText(index)) { packed = false; break; }\n\t\t\tif (packed) {\n\t\t\t\tconst entries = new INTRINSICS.list(length);\n\t\t\t\tfor (let index = 0; index < length; index += 1) {\n\t\t\t\t\tif (!INTRINSICS.own(value, members[index])) throw new INTRINSICS.error("Array index views disagree");\n\t\t\t\t\tentries[index] = value[index];\n\t\t\t\t}\n\t\t\t\treturn INTRINSICS.freeze({ entries: INTRINSICS.freeze(entries), dense: true });\n\t\t\t}\n\t\t}\n\t\tconst collected = [];\n\t\tconst keys = [];\n\t\tlet ascending = true;\n\t\tlet previous = -1;\n'
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(head, replacement))
console.log(`A1 patched -> ${target}`)
