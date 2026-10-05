// Usage: node credit.ts --baseline RUN [--baseline RUN] --candidate RUN [--candidate RUN] --cases FILE --out FILE
// Credits each item from per-case durations: the confirmed floor is the fastest baseline sum of the item's
// cases less the slowest candidate sum of the same cases. A split title (`… at 1280 px`, `… at 390 px`) is
// folded into its unsplit parent when the baseline lacks the split title.
// Exit: 64 usage; 67 refused item population or candidate status.
// Whole-journey credit excludes titles failed on either side from every sum and names their failures.
// Self-contained instrument: the brief permits node: imports only.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

interface Item {
	readonly item: string
	readonly patterns: readonly string[]
}
interface Case {
	readonly title: string
	readonly seconds: number
	readonly count: number
	readonly statuses: readonly string[]
}

function options(flag: string): string[] {
	const values: string[] = []
	for (let index = 0; index < process.argv.length; index++) {
		if (process.argv[index] === flag && process.argv[index + 1] !== undefined) values.push(process.argv[index + 1] as string)
	}
	return values
}

function readCases(run: string): Map<string, Case> {
	const path = resolve(run, 'report.json')
	if (!existsSync(path)) throw new Error(`Run has no report.json: ${run}`)
	const report: unknown = JSON.parse(readFileSync(path, 'utf8'))
	const results = (report as { testResults: readonly { assertionResults: readonly { fullName: string; duration: number; status: string }[] }[] }).testResults
	const cases = new Map<string, Case>()
	for (const file of results) {
		for (const assertion of file.assertionResults) {
			const previous = cases.get(assertion.fullName)
			cases.set(assertion.fullName, {
				title: assertion.fullName,
				seconds: (previous?.seconds ?? 0) + (assertion.duration ?? 0) / 1000,
				count: (previous?.count ?? 0) + 1,
				statuses: [...(previous?.statuses ?? []), assertion.status],
			})
		}
	}
	return cases
}

function fold(cases: Map<string, Case>, reference: Map<string, Case>): Map<string, Case> {
	const folded = new Map<string, Case>()
	for (const [title, entry] of cases) {
		const parent = title.replace(/ at (?:1280|390) px$/u, ' at both widths')
		const key = parent !== title && !reference.has(title) && reference.has(parent) ? parent : title
		const previous = folded.get(key)
		folded.set(key, {
			title: key,
			seconds: (previous?.seconds ?? 0) + entry.seconds,
			count: (previous?.count ?? 0) + entry.count,
			statuses: [...(previous?.statuses ?? []), ...entry.statuses],
		})
	}
	return folded
}

function sum(cases: Map<string, Case>, patterns: readonly string[], excluded: ReadonlySet<string>): { seconds: number; titles: string[] } {
	const expressions = patterns.map((pattern) => new RegExp(pattern, 'u'))
	let seconds = 0
	const titles: string[] = []
	for (const [title, entry] of cases) {
		if (!excluded.has(title) && expressions.some((expression) => expression.test(title))) {
			seconds += entry.seconds
			titles.push(title)
		}
	}
	return { seconds, titles: titles.sort() }
}

function main(): void {
	const baselines = options('--baseline')
	const candidates = options('--candidate')
	const [casesPath] = options('--cases')
	const [out] = options('--out')
	if (baselines.length === 0 || candidates.length === 0 || casesPath === undefined || out === undefined) {
		console.error('Usage: node credit.ts --baseline RUN [--baseline RUN] --candidate RUN [--candidate RUN] --cases FILE --out FILE')
		process.exit(64)
	}
	const items = JSON.parse(readFileSync(casesPath, 'utf8')) as readonly Item[]
	const baselineCases = baselines.map(readCases)
	const reference = baselineCases[0] as Map<string, Case>
	const candidateCases = candidates.map((run) => fold(readCases(run), reference))
	const lines = ['# Checkpoint credit', '', `Baselines: ${baselines.join(', ')}`, `Candidates: ${candidates.join(', ')}`, '', '| Item | Cases | Baseline sums (s) | Candidate sums (s) | Confirmed floor (s) |', '| --- | --- | --- | --- | ---: |']
	for (const item of items) {
		const whole = item.item === 'whole journey (every title)'
		const dropped = whole ? [...baselineCases, ...candidateCases].flatMap((cases, index) =>
			[...cases.values()]
				.filter((entry) => entry.statuses.includes('failed'))
				.map((entry) => ({
					title: entry.title,
					detail: `${index < baselines.length ? `baseline ${baselines[index]}` : `candidate ${candidates[index - baselines.length]}`}: \`${entry.title}\` (${entry.statuses.join(',')})`,
				})),
		) : []
		const excluded = new Set(dropped.map((entry) => entry.title))
		const baselineSums = baselineCases.map((cases) => sum(cases, item.patterns, excluded))
		const candidateSums = candidateCases.map((cases) => sum(cases, item.patterns, excluded))
		const titles = new Set([...baselineSums, ...candidateSums].flatMap((entry) => entry.titles))
		const selected = baselineSums[0]?.titles ?? []
		const failures = candidateCases.flatMap((cases, index) =>
			[...cases.values()]
				.filter((entry) => candidateSums[index]?.titles.includes(entry.title) && entry.statuses.some((status) => status !== 'passed'))
				.map((entry) => `${candidates[index]}: ${entry.title} (${entry.statuses.join(',')})`),
		)
		const reasons: string[] = []
		if (selected.length === 0) reasons.push('empty baseline selection')
		if ([...baselineSums, ...candidateSums].some((entry) => JSON.stringify(entry.titles) !== JSON.stringify(selected)))
			reasons.push(`selected titles differ: ${JSON.stringify([...baselineSums, ...candidateSums].map((entry) => entry.titles))}`)
		if (failures.length > 0) reasons.push(`candidate cases not passed: ${failures.join('; ')}`)
		if (!whole && reasons.length > 0) {
			const reason = reasons.join('; ')
			lines.push(`| ${item.item} | ${[...titles].map((title) => `\`${title}\``).join('<br>')} | ${baselineSums.map((entry) => entry.seconds.toFixed(1)).join(' / ')} | ${candidateSums.map((entry) => entry.seconds.toFixed(1)).join(' / ')} | refused: ${reason} |`)
			console.error(`${item.item}: refused: ${reason}`)
			process.exitCode = 67
			continue
		}
		const floor = Math.min(...baselineSums.map((entry) => entry.seconds)) - Math.max(...candidateSums.map((entry) => entry.seconds))
		const label = whole ? `${item.item} — excluding ${excluded.size} failed titles` : item.item
		const details = dropped.length > 0 ? `<br>Dropped: ${dropped.map((entry) => entry.detail).join('<br>')}` : ''
		lines.push(`| ${label} | ${[...titles].map((title) => `\`${title.slice(0, 80)}\``).join('<br>')}${details} | ${baselineSums.map((entry) => entry.seconds.toFixed(1)).join(' / ')} | ${candidateSums.map((entry) => entry.seconds.toFixed(1)).join(' / ')} | ${floor.toFixed(1)} |`)
	}
	lines.push('', '## Every title, baseline against candidate', '', '| Title | Baselines (s) | Candidates (s) | Statuses |', '| --- | --- | --- | --- |')
	const all = new Set<string>([...baselineCases, ...candidateCases].flatMap((cases) => [...cases.keys()]))
	for (const title of [...all].sort()) {
		lines.push(`| \`${title.slice(0, 100)}\` | ${baselineCases.map((cases) => cases.get(title)?.seconds.toFixed(1) ?? '-').join(' / ')} | ${candidateCases.map((cases) => cases.get(title)?.seconds.toFixed(1) ?? '-').join(' / ')} | ${candidateCases.map((cases) => cases.get(title)?.statuses.join(',') ?? '-').join(' / ')} |`)
	}
	writeFileSync(resolve(out), lines.join('\n') + '\n')
	console.log(lines.slice(6, 6 + items.length).join('\n'))
}

main()
