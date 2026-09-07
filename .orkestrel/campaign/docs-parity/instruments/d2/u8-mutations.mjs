// Re-runs D2's four falsification mutations against the test file this round ships, one at a
// time, restoring the source by the exact reverse edit after each. Records the totals
// `npm run test:src:core` reports. Log: u8-mutations.log.txt.
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const FILE = '/home/user/fleet/guide/src/core/helpers.ts'
const LOG = '/home/user/fleet/guide/tmp/u8-mutations.log.txt'
const lines = []
const record = (text) => {
	console.log(text)
	lines.push(text)
}

const MUTATIONS = [
	{
		name: 'replaceCell returns guide instead of splicing',
		from: '\treturn spliceSpan(guide, span, renderMarkdown(buildTable(located, index, column, summary)))',
		to: '\treturn guide',
	},
	{
		name: 'buildCell never emits a code span',
		from: '\t\tif (value.trim() === value) nodes.push({ element: \'codeSpan\', value })\n\t\telse nodes.push({ element: \'text\', value: span[0] })',
		to: '\t\tnodes.push({ element: \'text\', value: span[0] })',
	},
	{
		name: 'replaceSummary compares raw text instead of the compared form',
		from: '\tif (normalizeSummary(described) === normalizeSummary(summary)) return comment',
		to: '\tif (described === summary) return comment',
	},
	{
		name: 'replaceFence takes the last fence of a title, and replaceExample drops the separator walk-back',
		from: '\t\tif (located !== undefined || fence.title !== title) continue',
		to: '\t\tif (fence.title !== title) continue',
		second: {
			from: '\twhile (end > start + 1 && (content[end - 1] ?? \'\').length === 0) end -= 1\n',
			to: '',
		},
	},
]

const run = () => {
	try {
		return execSync('npm run test:src:core', { cwd: '/home/user/fleet/guide', encoding: 'utf8' })
	} catch (error) {
		return `${error.stdout ?? ''}${error.stderr ?? ''}`
	}
}

const totals = (output) => {
	const line = output.split('\n').find((text) => text.includes('Tests ')) ?? 'Tests  (not reported)'
	return line.trim()
}

const original = readFileSync(FILE, 'utf8')
record(`baseline: ${totals(run())}`)

for (const mutation of MUTATIONS) {
	let text = original
	if (!text.includes(mutation.from)) throw new Error(`plant site absent: ${mutation.name}`)
	text = text.replace(mutation.from, mutation.to)
	if (mutation.second !== undefined) {
		if (!text.includes(mutation.second.from)) throw new Error(`second site absent: ${mutation.name}`)
		text = text.replace(mutation.second.from, mutation.second.to)
	}
	writeFileSync(FILE, text)
	try {
		const output = run()
		record(`mutation: ${mutation.name}`)
		record(`  ${totals(output)}`)
		for (const line of output.split('\n')) {
			if (line.includes('helpers.test.ts >')) record(`  red: ${line.trim().replace(/^FAIL\s+\|src:core\|\s+/, '')}`)
		}
	} finally {
		writeFileSync(FILE, original)
	}
}

record(`restored: ${totals(run())}`)
record(`byte-identical after restore: ${readFileSync(FILE, 'utf8') === original}`)
writeFileSync(LOG, `${lines.join('\n')}\n`)
