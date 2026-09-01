// U4 dist surgery: compile-time refinement gate on diagnostic string and number
// leaves - an unrefined leaf returns a fresh empty fault list instead of
// entering create*Faults (whose readValue door exists for caller-supplied
// shapes). Refined leaves keep the shared helper unchanged.
// Run: node u4-patch.mjs <source-index.js> <target-index.js>
/* eslint-disable */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const source = process.argv[2]
const target = process.argv[3]
let text = readFileSync(source, 'utf8')

const patches = [
	{
		name: 'audit string',
		anchor: `			case "string": {
				const node = owned;
				return (value, path) => {
					if (!isString(value)) return [{
						reason: "type",
						path,
						expected: "string",
						received: preview(value)
					}];
					return createStringFaults(node, value, path);
				};
			}
			case "number": {
				const node = owned;
				const kind = owned.integer === true ? "integer" : "number";
				return (value, path) => {
					if (!isFiniteNumber(value)) return [{
						reason: "type",
						path,
						expected: kind,
						received: preview(value)
					}];
					return createNumberFaults(node, value, path);
				};
			}`,
		replacement: `			case "string": {
				const node = owned;
				const refined = owned.min !== void 0 || owned.max !== void 0 || owned.pattern !== void 0;
				return (value, path) => {
					if (!isString(value)) return [{
						reason: "type",
						path,
						expected: "string",
						received: preview(value)
					}];
					return refined ? createStringFaults(node, value, path) : [];
				};
			}
			case "number": {
				const node = owned;
				const kind = owned.integer === true ? "integer" : "number";
				const refined = owned.integer === true || owned.min !== void 0 || owned.max !== void 0;
				return (value, path) => {
					if (!isFiniteNumber(value)) return [{
						reason: "type",
						path,
						expected: kind,
						received: preview(value)
					}];
					return refined ? createNumberFaults(node, value, path) : [];
				};
			}`,
	},
	{
		name: 'explain string leaf',
		anchor: `					return createStringFaults(node, parsed, path);`,
		replacement: `					return stringRefined ? createStringFaults(node, parsed, path) : [];`,
	},
	{
		name: 'explain number leaf',
		anchor: `					return createNumberFaults(node, parsed, path);`,
		replacement: `					return numberRefined ? createNumberFaults(node, parsed, path) : [];`,
	},
]

for (const patch of patches) {
	if (!text.includes(patch.anchor)) { console.error(`U4: anchor missing - ${patch.name}`); process.exit(1) }
	text = text.replace(patch.anchor, patch.replacement)
}

// The explain leaf closures need their compile-time refined consts. Anchor each
// case head in the reporter region by its distinctive parsed-based body.
const explainStringHead = /(case "string": \{\n\t\t\t\tconst node = owned;\n)(?=[\s\S]{0,700}?stringRefined)/
const explainNumberHead = /(case "number": \{\n\t\t\t\tconst node = owned;\n)(?=[\s\S]{0,900}?numberRefined)/
if (!explainStringHead.test(text)) { console.error('U4: explain string head missing'); process.exit(1) }
text = text.replace(explainStringHead, `$1				const stringRefined = owned.min !== void 0 || owned.max !== void 0 || owned.pattern !== void 0;\n`)
if (!explainNumberHead.test(text)) { console.error('U4: explain number head missing'); process.exit(1) }
text = text.replace(explainNumberHead, `$1				const numberRefined = owned.integer === true || owned.min !== void 0 || owned.max !== void 0;\n`)

mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, text)
console.log(`U4 patched -> ${target}`)
