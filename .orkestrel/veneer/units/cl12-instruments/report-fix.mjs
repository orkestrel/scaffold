// CL12: removes counts and banned-sense words from the report.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const path = resolve(process.cwd(), 'tmp/units/cl12-report.md')
let text = readFileSync(path, 'utf8')
const edits = [
	['| 987 unique spans. Every `--vn-*` span', '| Every `--vn-*` span'],
	[
		'| 98 paths, one missing: `tests/setup.css`',
		'| Every path resolves but `tests/setup.css`',
	],
	[
		'| Five were named nowhere: `components/_container.scss`',
		'| Named nowhere: `components/_container.scss`',
	],
	[
		'| 37 named claims about a resolved value',
		'| Named claims about a resolved value',
	],
	[
		'| Three rows: `mark`, `display`, and `vr`. The `mark` row was false; the other two hold.',
		'| The `mark`, `display`, and `vr` rows. The `mark` row was false; the others hold.',
	],
	[
		'| 27 sentences, each read against the cascade or the oracle.',
		'| Each sentence read against the cascade or the oracle.',
	],
	['Each new row names its token literally.', 'Each added row names its token literally.'],
	[
		'**Should the gap have been visible? Yes, and no proof could be made red for it.**',
		'**No gate could see the gap, and no proof could be made red for it.**',
	],
	[
		'the literal-row convention for the new tokens',
		'the literal-row convention for the added tokens',
	],
]
for (const [before, after] of edits) {
	if (text.split(before).length - 1 !== 1) throw new Error(`Anchor is not unique: ${before.slice(0, 40)}`)
	text = text.replace(before, after)
}
writeFileSync(path, text)
console.log('fixed')
