// Adopt the renamed @orkestrel/guide helpers in one checkout's tests/guides.test.ts: rename the
// three helpers every consumer's parity test imports (word-boundary, comments included), then
// re-sort the named specifiers of the `@orkestrel/guide` import case-insensitively, which is the
// order the file keeps by convention (no formatter or lint rule enforces it).
// Usage: node adoptguide.mjs <checkout-dir>
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2]
if (!dir) throw new Error('checkout directory required')
const path = join(dir, 'tests', 'guides.test.ts')
if (!existsSync(path)) {
	console.log(`${dir}: no tests/guides.test.ts`)
	process.exit(0)
}
const RENAMES = [
	['fenceImports', 'extractFenceImports'],
	['missingSymbols', 'findMissingSymbols'],
	['symbolKey', 'computeSymbolKey'],
]
const before = readFileSync(path, 'utf8')
let text = before
for (const [from, to] of RENAMES) text = text.replace(new RegExp(`\\b${from}\\b`, 'g'), to)
const block = /import \{([^}]*)\} from '@orkestrel\/guide'/u
const match = block.exec(text)
if (match === null) {
	console.log(`${dir}: no @orkestrel/guide import block`)
	process.exit(0)
}
const names = match[1]
	.split(',')
	.map((name) => name.trim())
	.filter((name) => name.length > 0)
	.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
const rewritten = `import {\n${names.map((name) => `\t${name},`).join('\n')}\n} from '@orkestrel/guide'`
text = text.replace(block, rewritten)
if (text === before) {
	console.log(`${dir}: unchanged`)
	process.exit(0)
}
writeFileSync(path, text)
const counts = RENAMES.map(([from, to]) => `${from}→${to}:${(before.match(new RegExp(`\\b${from}\\b`, 'g')) ?? []).length}`).join(' ')
console.log(`${dir}: rewritten (${counts}); specifiers ${names.join(', ')}`)
