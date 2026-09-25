import { readFileSync, writeFileSync } from 'node:fs'
const path = 'tests/src/styles/components/accordion.test.ts'
let text = readFileSync(path, 'utf8')
const swaps = [
	["\t\t\t'transform',\n\t\t\t'0.2s',\n\t\t\t'ease-in-out',\n", "\t\t\t'transform',\n\t\t\t'0.15s',\n\t\t\t'ease',\n"],
]
for (const [from, to] of swaps) {
	if (!text.includes(from)) throw new Error(`missing: ${from.slice(0, 60)}`)
	text = text.replace(from, to)
}
writeFileSync(path, text)
