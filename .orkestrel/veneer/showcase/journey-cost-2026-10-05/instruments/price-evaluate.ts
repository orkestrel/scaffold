// Usage: node price-evaluate.ts --pair NAME:PREFIX [--pair NAME:PREFIX ...] --out FILE
// For each pair, reads runs/<PREFIX>-without-{1,2}/report.json and runs/<PREFIX>-with-{1,2}/report.json,
// sums the selected cases' durations per run, and reports min/max per side, the gain (fastest without
// less slowest with), and the two repeat spreads.
// Exit: 67 refused selection. Filter-excluded skipped/pending siblings are not selected.
// Self-contained instrument: the brief permits node: imports only.
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const RUNS = '/home/user/veneer/tmp/units/journey-cost/runs'

function pairs(): { name: string; prefix: string }[] {
	const out: { name: string; prefix: string }[] = []
	for (let index = 0; index < process.argv.length; index++) {
		if (process.argv[index] === '--pair' && process.argv[index + 1] !== undefined) {
			const [name, prefix] = (process.argv[index + 1] as string).split(':')
			out.push({ name: name as string, prefix: prefix as string })
		}
	}
	return out
}

function sumSelected(folder: string): { seconds: number; cases: number; titles: string[]; failures: string[]; excluded: string[] } | undefined {
	const path = resolve(RUNS, folder, 'report.json')
	if (!existsSync(path)) return undefined
	const report = JSON.parse(readFileSync(path, 'utf8')) as { testResults: { assertionResults: { fullName: string; duration: number; status: string }[] }[] }
	let seconds = 0
	let cases = 0
	const titles: string[] = []
	const failures: string[] = []
	const excluded: string[] = []
	for (const file of report.testResults) for (const a of file.assertionResults) {
		if (a.status === 'skipped' || a.status === 'pending') {
			excluded.push(a.fullName)
			continue
		}
		if (a.status !== 'passed') failures.push(`${a.fullName} (${a.status})`)
		seconds += (a.duration ?? 0) / 1000
		cases++
		titles.push(a.fullName)
	}
	return { seconds, cases, titles: [...new Set(titles)].sort(), failures, excluded }
}

function main(): void {
	const outIndex = process.argv.indexOf('--out')
	const out = outIndex >= 0 ? (process.argv[outIndex + 1] as string) : undefined
	const lines = ['| Item | without 1 / 2 (s) | with 1 / 2 (s) | gain = min(without) − max(with) | spread without / with | cases |', '| --- | --- | --- | ---: | --- | ---: |']
	for (const { name, prefix } of pairs()) {
		const w = [1, 2].map((n) => sumSelected(`${prefix}-without-${n}`))
		const v = [1, 2].map((n) => sumSelected(`${prefix}-with-${n}`))
		if (w.some((x) => x === undefined) || v.some((x) => x === undefined)) { lines.push(`| ${name} | missing | missing | | | |`); continue }
		const selections = [...w, ...v]
		const titles = w[0]?.titles ?? []
		const reasons: string[] = []
		if (titles.length === 0) reasons.push('empty selection')
		if (selections.some((entry) => JSON.stringify(entry?.titles) !== JSON.stringify(titles)))
			reasons.push(`selected titles differ: ${JSON.stringify(selections.map((entry) => entry?.titles))}`)
		const failures = selections.flatMap((entry) => entry?.failures ?? [])
		const population = new Set(selections.flatMap((entry) => entry?.titles ?? []))
		for (const entry of selections) for (const title of entry?.excluded ?? [])
			if (population.has(title)) failures.push(`${title} (skipped or pending)`)
		if (failures.length > 0) reasons.push(`selected cases not passed: ${failures.join('; ')}`)
		if (reasons.length > 0) {
			lines.push(`| ${name} | refused: ${reasons.join('; ')} | | | | |`)
			process.exitCode = 67
			continue
		}
		const ws = w.map((x) => (x as { seconds: number }).seconds)
		const vs = v.map((x) => (x as { seconds: number }).seconds)
		const gain = Math.min(...ws) - Math.max(...vs)
		const spreadW = Math.abs(ws[0]! - ws[1]!)
		const spreadV = Math.abs(vs[0]! - vs[1]!)
		lines.push(`| ${name} | ${ws.map((x) => x.toFixed(2)).join(' / ')} | ${vs.map((x) => x.toFixed(2)).join(' / ')} | ${gain.toFixed(2)} | ${spreadW.toFixed(2)} / ${spreadV.toFixed(2)} | ${(w[0] as { cases: number }).cases} |`)
	}
	const text = lines.join('\n') + '\n'
	if (out) writeFileSync(out, text)
	console.log(text)
}
main()
