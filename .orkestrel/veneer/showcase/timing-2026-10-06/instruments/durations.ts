// Self-contained instrument: the unit permits one file and node: imports only.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'

interface Assertion {
	readonly title: string
	readonly status: string
	readonly duration: number | undefined
	readonly variant: string | undefined
}
interface Timing {
	readonly title: string
	readonly variant: string
	readonly duration: number
}
interface Run {
	readonly folder: string
	readonly seconds: number
	readonly outside: number
	readonly assertions: readonly Assertion[]
	readonly timings: readonly Timing[]
}
interface Reading {
	readonly run: Run
	readonly duration: number
	readonly source: string
}
interface Row {
	readonly title: string
	readonly variant: string
	readonly readings: Reading[]
}
const USAGE = 'node durations.ts --run DIR [--run DIR ...] --out FILE [--ceiling MS] [--band A/B]'

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function isMeasurement(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value) && value >= 0
}
function readJSON(file: string, summary = false): unknown {
	try {
		const text = readFileSync(file, 'utf8')
		return JSON.parse(
			summary
				? (text
						.split(/\r\n|\n/)
						.filter((line) => line.trim() !== '')
						.at(-1) ?? '')
				: text,
		)
	} catch (error) {
		throw new Error(`${file}: ${String(error)}`, { cause: error })
	}
}
function readTimings(folder: string): readonly Timing[] {
	const directory = join(folder, 'journey')
	const timings: Timing[] = []
	for (const name of readdirSync(directory)
		.filter((entry) => entry.endsWith('.txt'))
		.sort()) {
		const file = join(directory, name)
		for (const line of readFileSync(file, 'utf8').split(/\r\n|\n/)) {
			const marker = 'Statechart duration '
			const offset = line.indexOf(marker)
			if (offset < 0) continue
			let entry: unknown
			try {
				entry = JSON.parse(line.slice(offset + marker.length))
			} catch (error) {
				throw new Error(`${file}: malformed Statechart duration: ${String(error)}`, {
					cause: error,
				})
			}
			if (
				!isRecord(entry) ||
				typeof entry.variant !== 'string' ||
				entry.variant.length === 0 ||
				typeof entry.family !== 'string' ||
				!isMeasurement(entry.seconds) ||
				(entry.motion !== undefined && typeof entry.motion !== 'boolean')
			)
				throw new Error(`${file}: malformed Statechart duration`)
			timings.push({
				title:
					`showcase statecharts drives the '${entry.family}' ` +
					(entry.motion === undefined
						? 'header table through the header buttons'
						: `table through its controls with motion=${entry.motion}`),
				variant: entry.variant,
				duration: entry.seconds * 1000,
			})
		}
	}
	return timings
}
function readRun(folder: string): Run {
	const reportFile = join(folder, 'report.json')
	const report = readJSON(reportFile)
	if (!isRecord(report) || !Array.isArray(report.testResults))
		throw new Error(`${reportFile}: expected testResults array`)
	const assertions: Assertion[] = []
	for (const suite of report.testResults) {
		if (
			!isRecord(suite) ||
			typeof suite.name !== 'string' ||
			!Array.isArray(suite.assertionResults)
		)
			throw new Error(`${reportFile}: expected suite name and assertionResults array`)
		const variants = [...suite.name.matchAll(/(?:^|[^a-z0-9])(light-\d+|dark-\d+)(?=$|[^a-z0-9])/g)]
		const variant = variants.length === 1 ? variants[0]?.[1] : undefined
		for (const assertion of suite.assertionResults) {
			if (
				!isRecord(assertion) ||
				typeof assertion.fullName !== 'string' ||
				assertion.fullName.length === 0 ||
				typeof assertion.status !== 'string' ||
				!['passed', 'failed', 'pending', 'skipped', 'todo', 'disabled'].includes(
					assertion.status,
				) ||
				(assertion.status === 'passed' && !isMeasurement(assertion.duration)) ||
				(assertion.duration !== undefined && !isMeasurement(assertion.duration))
			)
				throw new Error(`${reportFile}: malformed assertion fullName, status, or duration`)
			assertions.push({
				title: assertion.fullName,
				status: assertion.status,
				duration: isMeasurement(assertion.duration) ? assertion.duration : undefined,
				variant,
			})
		}
	}
	const endFile = join(folder, 'end.json')
	const end = readJSON(endFile)
	if (!isRecord(end) || !isMeasurement(end.seconds))
		throw new Error(`${endFile}: expected finite nonnegative seconds`)
	const measureFile = join(folder, 'measure.jsonl')
	const summary = readJSON(measureFile, true)
	if (
		!isRecord(summary) ||
		summary.event !== 'summary' ||
		!isRecord(summary.outside) ||
		!isMeasurement(summary.outside.seconds)
	)
		throw new Error(
			`${measureFile}: expected final summary with finite nonnegative outside.seconds`,
		)
	return {
		folder,
		seconds: end.seconds,
		outside: summary.outside.seconds,
		assertions,
		timings: readTimings(folder),
	}
}
function collectRows(runs: readonly Run[]): readonly Row[] {
	const rows = new Map<string, Row>()
	const repeated = new Set<string>()
	for (const run of runs) {
		const seen = new Set<string>()
		for (const assertion of run.assertions) {
			if (seen.has(assertion.title)) repeated.add(assertion.title)
			seen.add(assertion.title)
		}
	}
	for (const run of runs) {
		for (const assertion of run.assertions) {
			const peers = run.assertions.filter((peer) => peer.title === assertion.title)
			const timings = run.timings.filter((timing) => timing.title === assertion.title)
			const variant =
				assertion.variant ??
				(peers.length === 1 && timings.length === 1 ? timings[0]?.variant : undefined)
			const label = variant ?? (repeated.has(assertion.title) ? 'unattributed' : 'unspecified')
			const key = JSON.stringify([assertion.title, label])
			let row = rows.get(key)
			if (row === undefined) {
				row = { title: assertion.title, variant: label, readings: [] }
				rows.set(key, row)
			}
			if (assertion.status === 'passed' && assertion.duration !== undefined)
				row.readings.push({ run, duration: assertion.duration, source: 'report.json' })
		}
		// Repeated reports cannot be joined to variants by their array order. Timing entries
		// provide their own durations; eligibility is certain only if every matching test passed.
		for (const timing of run.timings) {
			const peers = run.assertions.filter((assertion) => assertion.title === timing.title)
			if (
				peers.length < 2 ||
				!peers.every((peer) => peer.status === 'passed' && peer.variant === undefined)
			)
				continue
			const key = JSON.stringify([timing.title, timing.variant])
			let row = rows.get(key)
			if (row === undefined) {
				row = { title: timing.title, variant: timing.variant, readings: [] }
				rows.set(key, row)
			}
			row.readings.push({ run, duration: timing.duration, source: 'Statechart duration' })
		}
	}
	return [...rows.values()].sort(
		(left, right) =>
			left.title.localeCompare(right.title) || left.variant.localeCompare(right.variant),
	)
}
function escapeCell(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\|/g, '&#124;')
		.replace(/\r\n|\n/g, ' ')
}
function renderReading(reading: Reading): string {
	return `${basename(reading.run.folder)}: ${reading.duration.toFixed(1)} ms, outside=${reading.run.outside.toFixed(2)} s (${reading.source})`
}
function renderTable(runs: readonly Run[], band: number, ceiling: number): string {
	const lines = [
		'# Journey durations',
		'',
		`Band ratio: ${band.toFixed(6)}. Inner ceiling: ${ceiling} ms.`,
		'',
		'Only passed assertions contribute durations. A failed run remains in the header. Repeated --run paths count once. Inputs are caller-selected; this instrument does not verify tree identity or lock ownership.',
		'',
		'| Folder | seconds | outside.seconds | Passed | Failed |',
		'| --- | ---: | ---: | ---: | ---: |',
		...runs.map(
			(run) =>
				`| ${escapeCell(run.folder)} | ${run.seconds} | ${run.outside.toFixed(2)} | ${run.assertions.filter((assertion) => assertion.status === 'passed').length} | ${run.assertions.filter((assertion) => assertion.status === 'failed').length} |`,
		),
		'',
		'R3 = ceil(max × max(band, ratio) / 100) × 100 ms. R4 = ceil(max × max(band, ratio) / 1000) × 1000 + ceiling ms. Figures need at least two distinct eligible runs and a positive minimum. R3 slack requires an enclosing timeout, which these inputs do not supply.',
		'',
		'R5 test: flag when the title ratio exceeds the band and there exists an eligible pair with slow/fast > band but outside(slow) <= outside(fast). The pair is printed as the witness. This conservative inversion test is diagnostic, not proof of a cause; an unmarked title is not cleared of timing defects. R5 figures are provisional and await diagnosis.',
		'',
		'Unspecified means no variant key was present. Unattributed means the title repeats without a usable variant key; its pooled range is descriptive and cannot size an individual variant. Timing entries identify unique titles; for repeated all-passed titles their own milliseconds appear in separate variant rows. Report array order is never a variant key.',
		'',
		'| Title | Variant | Eligible runs | Min ms | Max ms | Ratio | R3 ms | R4 ms | R5 | Min runs | Max runs | Passed readings and R5 inputs |',
		'| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |',
	]
	for (const row of collectRows(runs)) {
		const readings = row.readings
		const count = new Set(readings.map((reading) => reading.run.folder)).size
		const min = Math.min(...readings.map((reading) => reading.duration))
		const max = Math.max(...readings.map((reading) => reading.duration))
		const ratio = count >= 2 && min > 0 ? max / min : undefined
		const margin = ratio === undefined ? undefined : Math.max(band, ratio)
		let witness: string | undefined
		if (ratio !== undefined && ratio > band && row.variant !== 'unattributed') {
			for (const slow of readings) {
				const fast = readings.find(
					(reading) =>
						reading.run.folder !== slow.run.folder &&
						reading.duration > 0 &&
						slow.duration / reading.duration > band &&
						slow.run.outside <= reading.run.outside,
				)
				if (fast !== undefined) {
					witness = `R5: ${renderReading(slow)} / ${renderReading(fast)}`
					break
				}
			}
		}
		const sized = margin !== undefined && row.variant !== 'unattributed'
		lines.push(
			`| ${[
				row.title,
				row.variant,
				String(count),
				readings.length === 0 ? '—' : min.toFixed(1),
				readings.length === 0 ? '—' : max.toFixed(1),
				ratio?.toFixed(6) ?? 'insufficient',
				sized ? String(Math.ceil((max * margin) / 100) * 100) : 'unavailable',
				sized ? String(Math.ceil((max * margin) / 1000) * 1000 + ceiling) : 'unavailable',
				row.variant === 'unattributed'
					? 'unattributed'
					: ratio === undefined
						? 'insufficient'
						: witness === undefined
							? '—'
							: 'R5 — hold',
				readings
					.filter((reading) => reading.duration === min)
					.map((reading) => basename(reading.run.folder))
					.join(', '),
				readings
					.filter((reading) => reading.duration === max)
					.map((reading) => basename(reading.run.folder))
					.join(', '),
				[...readings.map(renderReading), ...(witness === undefined ? [] : [witness])].join('; '),
			]
				.map(escapeCell)
				.join(' | ')} |`,
		)
	}
	return lines.join('\n') + '\n'
}
function main(): void {
	const options = new Map<string, string>()
	const folders = new Set<string>()
	const argumentsList = process.argv.slice(2)
	for (let index = 0; index < argumentsList.length; index += 2) {
		const flag = argumentsList[index]
		const value = argumentsList[index + 1]
		if (
			flag === undefined ||
			!['--run', '--out', '--ceiling', '--band'].includes(flag) ||
			!value ||
			value.startsWith('--') ||
			(flag !== '--run' && options.has(flag))
		) {
			console.error(`Usage: ${USAGE}\nInvalid or repeated option: ${flag ?? ''}`)
			process.exitCode = 64
			return
		}
		if (flag === '--run') folders.add(resolve(value))
		else options.set(flag, value)
	}
	const out = options.get('--out')
	const bandText = options.get('--band') ?? '618.6/494.0'
	const [numerator, denominator] = bandText.split('/').map(Number)
	const band =
		numerator === undefined || denominator === undefined ? Number.NaN : numerator / denominator
	const ceilingText = options.get('--ceiling') ?? '0'
	const ceiling = Number(ceilingText)
	if (
		folders.size === 0 ||
		out === undefined ||
		!/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/.test(bandText) ||
		!Number.isFinite(band) ||
		band < 1 ||
		denominator === 0 ||
		!/^\d+(?:\.\d+)?$/.test(ceilingText) ||
		!isMeasurement(ceiling)
	) {
		console.error(
			`Usage: ${USAGE}\nRequire --run, --out, finite band A/B >= 1 with B > 0, and nonnegative --ceiling MS`,
		)
		process.exitCode = 64
		return
	}
	try {
		const runs = [...folders].map(readRun)
		writeFileSync(resolve(out), renderTable(runs, band, ceiling))
		console.log(`Wrote ${resolve(out)}`)
	} catch (error) {
		console.error(String(error))
		process.exitCode = 67
	}
}
main()
