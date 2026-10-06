import { readFileSync } from 'node:fs'
// Adequacy sweep over tests/setupBrowser.test.ts titles that reach COMPONENT_WAIT: timeout >= ceil(max duration × 1.1637 / 1000) × 1000 + CEILING.
const CEILING = Number(process.argv[2] ?? '5000')
const slack = JSON.parse(readFileSync('/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/setup-slack.json', 'utf8'))
const reports = process.argv.slice(3).map((p) => ({ path: p, report: JSON.parse(readFileSync(p, 'utf8')) }))
const durations = new Map<string, { ms: number; run: string }[]>()
for (const { path, report } of reports)
	for (const file of report.testResults) for (const a of file.assertionResults) {
		if (a.status !== 'passed') continue
		const list = durations.get(a.fullName) ?? []
		list.push({ ms: a.duration, run: path.split('/').slice(-2)[0] })
		durations.set(a.fullName, list)
	}
let failing = 0
for (const row of slack.rows) {
	const list = durations.get(row.title) ?? []
	if (list.length === 0) { console.log(`NO READING: ${row.title}`); continue }
	const max = list.reduce((a, b) => (b.ms > a.ms ? b : a))
	const figure = Math.ceil((max.ms * 1.1637) / 1000) * 1000 + CEILING
	const ok = row.timeout >= figure
	if (!ok) failing++
	if (!ok || figure > row.timeout * 0.8) console.log(`${ok ? 'tight ' : 'FAILS'} timeout ${row.timeout} figure ${figure} max ${max.ms.toFixed(1)} (${max.run}, ${list.length} runs) ${row.title}`)
}
console.log(`rows ${slack.rows.length}; failing ${failing}; ceiling ${CEILING}`)
