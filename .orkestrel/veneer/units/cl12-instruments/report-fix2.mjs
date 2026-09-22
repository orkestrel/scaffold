// CL12: corrects two internal cross-references in the report.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const path = resolve(process.cwd(), 'tmp/units/cl12-report.md')
let text = readFileSync(path, 'utf8')
const edits = [
	[
		'`guides/README.md` needed\nno change, and the reason is in § 5.',
		'`guides/README.md` needed\nno change, and the reason is in § 8.',
	],
	[
		'The helper-proof half is out of scope: see the ruling under § 9 about test helpers.',
		'The helper-proof half is out of scope: the terrain record rules that no guide row is written for a test helper.',
	],
]
for (const [before, after] of edits) {
	if (text.split(before).length - 1 !== 1)
		throw new Error(`Anchor is not unique: ${before.slice(0, 40)}`)
	text = text.replace(before, after)
}
writeFileSync(path, text)
console.log('fixed')
