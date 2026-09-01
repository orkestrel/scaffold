// A10 dist surgery (probe only): the compiled array guard folds arrayOf's
// holds layer and whereOf's holds layer into one contained closure, keeping
// the read order (walk, then the length bound re-read through boundsOf).
// Measures what the two nested attempt layers and their per-call closures cost.
// Run: node a10-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
const [source, target] = [process.argv[2], process.argv[3]]
const text = readFileSync(source, 'utf8')
const anchor = '\t\t\tcase "array": {\n\t\t\t\tconst base = arrayOf(this.#guardAt(owned.items));\n\t\t\t\tif (owned.min === void 0 && owned.max === void 0) return base;\n\t\t\t\tconst withinLength = boundsOf(owned.min, owned.max);\n\t\t\t\treturn whereOf(base, (value) => withinLength(value.length));\n\t\t\t}'
if (!text.includes(anchor)) { console.error('A10: anchor missing'); process.exit(1) }
const replacement = '\t\t\tcase "array": {\n\t\t\t\tconst item = this.#guardAt(owned.items);\n\t\t\t\tconst bounded = owned.min !== void 0 || owned.max !== void 0;\n\t\t\t\tconst withinLength = bounded ? boundsOf(owned.min, owned.max) : void 0;\n\t\t\t\treturn (value) => {\n\t\t\t\t\tconst outcome = attempt(() => {\n\t\t\t\t\t\tif (!isArray(value)) return false;\n\t\t\t\t\t\tconst entries = readArrayEntries(value);\n\t\t\t\t\t\tif (!entries.success || !entries.value.dense) return false;\n\t\t\t\t\t\tconst list = entries.value.entries;\n\t\t\t\t\t\tfor (let index = 0; index < list.length; index += 1) if (!item(list[index])) return false;\n\t\t\t\t\t\treturn withinLength === void 0 ? true : withinLength(value.length);\n\t\t\t\t\t});\n\t\t\t\t\treturn outcome.success && outcome.value === true;\n\t\t\t\t};\n\t\t\t}'
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text.replace(anchor, replacement))
console.log('A10 patched -> ' + target)
