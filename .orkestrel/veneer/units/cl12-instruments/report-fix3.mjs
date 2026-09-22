// CL12: removes the last two counts from the report.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const path = resolve(process.cwd(), 'tmp/units/cl12-report.md')
let text = readFileSync(path, 'utf8')
const edits = [
	[
		'Four mechanical sweeps and one read-through. Each instrument is at the path given, and each runs as\n`node <path>` from the checkout root.',
		'Each sweep names the instrument that ran it, and each instrument runs as `node <path>` from the\ncheckout root.',
	],
	[
		'**Two MISS readings that were my pattern, not a defect.**',
		'**The MISS readings were my pattern, not a defect.**',
	],
]
for (const [before, after] of edits) {
	if (text.split(before).length - 1 !== 1)
		throw new Error(`Anchor is not unique: ${before.slice(0, 40)}`)
	text = text.replace(before, after)
}
writeFileSync(path, text)
console.log('fixed')
