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
	readonly rows: readonly Segment[]
}
interface Segment {
	readonly name: string
	readonly duration: number
}
interface Settle {
	readonly title: string
	readonly variant: string
	readonly family: string
	readonly motion: boolean | undefined
	readonly waits: readonly Segment[]
}
interface Run {
	readonly folder: string
	readonly seconds: number
	readonly outside: number | undefined
	readonly assertions: readonly Assertion[]
	readonly timings: readonly Timing[]
	readonly settles: readonly Settle[]
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
interface Band {
	readonly ratio: number
	readonly excluded: ReadonlyMap<string, number>
}
interface Probe {
	readonly title: string
	readonly family: string
	readonly motion: boolean | undefined
	readonly description: string
	readonly readings: Reading[]
}
const USAGE =
	'node /home/user/veneer/tmp/units/journey-cost/durations.ts [--run DIR ...] --out FILE [--ceiling MS] [--band A/B] [--omit FILE ...] [--timeouts FILE]'

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
function renderTitle(family: string, motion: boolean | undefined): string {
	return (
		`showcase statecharts drives the '${family}' ` +
		(motion === undefined
			? 'header table through the header buttons'
			: `table through its controls with motion=${motion}`)
	)
}
function readEntries(folder: string): {
	readonly timings: readonly Timing[]
	readonly settles: readonly Settle[]
} {
	const timings: Timing[] = []
	const settles: Settle[] = []
	const names = readdirSync(folder)
	const files = names.includes('journey')
		? readdirSync(join(folder, 'journey'))
				.filter((name) => name.endsWith('.txt'))
				.sort()
				.map((name) => join(folder, 'journey', name))
		: []
	if (names.includes('stdout.log')) files.push(join(folder, 'stdout.log'))
	for (const file of files) {
		for (const line of readFileSync(file, 'utf8').split(/\r\n|\n/)) {
			const marker = line.includes('Statechart duration ')
				? 'Statechart duration '
				: 'Settle probe '
			const offset = line.indexOf(marker)
			if (offset < 0) continue
			let entry: unknown
			try {
				entry = JSON.parse(line.slice(offset + marker.length))
			} catch (error) {
				throw new Error(`${file}: malformed ${marker.trim()}: ${String(error)}`, {
					cause: error,
				})
			}
			if (
				!isRecord(entry) ||
				typeof entry.variant !== 'string' ||
				entry.variant.length === 0 ||
				typeof entry.family !== 'string' ||
				entry.family.length === 0 ||
				(entry.motion !== undefined && typeof entry.motion !== 'boolean')
			)
				throw new Error(`${file}: malformed ${marker.trim()}`)
			const title = renderTitle(entry.family, entry.motion)
			const segments: Segment[] = []
			const values = marker === 'Statechart duration ' ? entry.rows : entry.waits
			if (values !== undefined || marker === 'Settle probe ') {
				if (!Array.isArray(values))
					throw new Error(`${file}: malformed ${marker.trim()} rows or waits`)
				for (const value of values) {
					if (!isRecord(value)) throw new Error(`${file}: malformed timing row`)
					const name = marker === 'Statechart duration ' ? value.name : value.description
					if (typeof name !== 'string' || name.length === 0 || !isMeasurement(value.milliseconds))
						throw new Error(`${file}: malformed timing name or milliseconds`)
					segments.push({ name, duration: value.milliseconds })
				}
			}
			if (marker === 'Statechart duration ') {
				if (!isMeasurement(entry.seconds))
					throw new Error(`${file}: malformed Statechart duration seconds`)
				timings.push({
					title,
					variant: entry.variant,
					duration: entry.seconds * 1000,
					rows: segments,
				})
			} else {
				settles.push({
					title,
					variant: entry.variant,
					family: entry.family,
					motion: entry.motion,
					waits: segments,
				})
			}
		}
	}
	return { timings, settles }
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
	let outside: number | undefined
	if (readdirSync(folder).includes('measure.jsonl')) {
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
		outside = summary.outside.seconds
	}
	return {
		folder,
		seconds: end.seconds,
		outside,
		assertions,
		...readEntries(folder),
	}
}
function collectRows(runs: readonly Run[], omissions: ReadonlySet<string>): readonly Row[] {
	const rows = new Map<string, Row>()
	const repeated = new Set<string>()
	for (const run of runs) {
		const seen = new Set<string>()
		for (const assertion of run.assertions) {
			if (omissions.has(JSON.stringify([basename(run.folder), assertion.title]))) continue
			if (seen.has(assertion.title)) repeated.add(assertion.title)
			seen.add(assertion.title)
		}
	}
	for (const run of runs) {
		for (const assertion of run.assertions) {
			if (omissions.has(JSON.stringify([basename(run.folder), assertion.title]))) continue
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
			if (omissions.has(JSON.stringify([basename(run.folder), timing.title]))) continue
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
	return `${basename(reading.run.folder)}: ${reading.duration.toFixed(1)} ms, seconds=${reading.run.seconds}, outside.seconds=${reading.run.outside?.toFixed(2) ?? 'unavailable (command)'} (${reading.source})`
}
function renderTable(
	runs: readonly Run[],
	selection: Band,
	ceiling: number,
	omissions: ReadonlySet<string>,
	timeouts: ReadonlyMap<string, number>,
): string {
	const band = selection.ratio
	const eligible = runs.filter((run) => !selection.excluded.has(run.folder))
	const rows = collectRows(eligible, omissions)
	const lines = [
		'# Journey durations',
		'',
		`Band ratio: ${band.toFixed(6)}. Inner ceiling: ${ceiling} ms.`,
		'',
		'Only passed assertions contribute durations. A failed run remains in the header. Repeated --run paths count once. Inputs are caller-selected; this instrument does not verify tree identity or lock ownership.',
		'',
		'| Folder | seconds | outside.seconds | Passed | Failed | Band |',
		'| --- | ---: | ---: | ---: | ---: | --- |',
		...runs.map(
			(run) =>
				`| ${escapeCell(run.folder)} | ${run.seconds} | ${run.outside?.toFixed(2) ?? 'unavailable (command)'} | ${run.assertions.filter((assertion) => assertion.status === 'passed').length} | ${run.assertions.filter((assertion) => assertion.status === 'failed').length} | ${selection.excluded.has(run.folder) ? `out of band: ${run.outside?.toFixed(2)} > ${selection.excluded.get(run.folder)?.toFixed(2)}` : run.outside === undefined ? 'command (no R5)' : 'eligible'} |`,
		),
		'',
		'R3 = ceil(max × max(band, ratio) / 100) × 100 ms for settle readings only. R4 = ceil(max × max(band, ratio) / 1000) × 1000 + ceiling ms. Figures need at least two distinct eligible runs and a positive minimum. Slack = supplied timeout minus the title maximum across variants. Out-of-band runs and omitted run/title pairs contribute no readings. Command readings carry no load and take no R5 test.',
		'',
		'R5 test: flag when the title ratio exceeds the band and there exists an eligible pair with slow/fast > band but outside(slow) <= outside(fast). The pair is printed as the witness. This conservative inversion test is diagnostic, not proof of a cause; an unmarked title is not cleared of timing defects. R5 figures are provisional and await diagnosis.',
		'',
		'Unspecified means no variant key was present. Unattributed means the title repeats without a usable variant key; its pooled range is descriptive and cannot size an individual variant. Timing entries identify unique titles; for repeated all-passed titles their own milliseconds appear in separate variant rows. Report array order is never a variant key.',
		'',
		'| Title | Variant | Eligible runs | Min ms | Max ms | Ratio | Slack ms | R4 ms | R5 | Min runs | Max runs | Passed readings and R5 inputs |',
		'| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |',
	]
	for (const row of rows) {
		const readings = row.readings
		const count = new Set(readings.map((reading) => reading.run.folder)).size
		const min = Math.min(...readings.map((reading) => reading.duration))
		const max = Math.max(...readings.map((reading) => reading.duration))
		const ratio = count >= 2 && min > 0 ? max / min : undefined
		const margin = ratio === undefined ? undefined : Math.max(band, ratio)
		let witness: string | undefined
		if (ratio !== undefined && ratio > band && row.variant !== 'unattributed') {
			for (const slow of readings) {
				if (slow.run.outside === undefined) continue
				const outside = slow.run.outside
				const fast = readings.find(
					(reading) =>
						reading.run.folder !== slow.run.folder &&
						reading.duration > 0 &&
						slow.duration / reading.duration > band &&
						reading.run.outside !== undefined &&
						outside <= reading.run.outside,
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
				computeSlack(row.title, rows, timeouts)?.toFixed(1) ?? 'unavailable',
				sized ? String(Math.ceil((max * margin) / 1000) * 1000 + ceiling) : 'unavailable',
				row.variant === 'unattributed'
					? 'unattributed'
					: readings.every((reading) => reading.run.outside === undefined)
						? 'not applicable (command)'
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
	lines.push(...renderProbes(eligible, rows, omissions, timeouts, band))
	return lines.join('\n') + '\n'
}
function computeSlack(
	title: string,
	rows: readonly Row[],
	timeouts: ReadonlyMap<string, number>,
): number | undefined {
	const timeout = timeouts.get(title)
	const durations = rows
		.filter((row) => row.title === title)
		.flatMap((row) => row.readings.map((reading) => reading.duration))
	return timeout === undefined || durations.length === 0
		? undefined
		: timeout - Math.max(...durations)
}
function isEligible(
	run: Run,
	title: string,
	variant: string,
	omissions: ReadonlySet<string>,
): boolean {
	if (omissions.has(JSON.stringify([basename(run.folder), title]))) return false
	const peers = run.assertions.filter(
		(assertion) =>
			assertion.title === title &&
			(assertion.variant === undefined || assertion.variant === variant),
	)
	return peers.length > 0 && peers.every((assertion) => assertion.status === 'passed')
}
function renderProbes(
	runs: readonly Run[],
	rows: readonly Row[],
	omissions: ReadonlySet<string>,
	timeouts: ReadonlyMap<string, number>,
	band: number,
): readonly string[] {
	const probes = new Map<string, Probe>()
	const segments = new Map<
		string,
		{ readonly title: string; readonly name: string; readonly readings: number[] }
	>()
	for (const run of runs) {
		for (const settle of run.settles) {
			if (!isEligible(run, settle.title, settle.variant, omissions)) continue
			for (const wait of settle.waits) {
				const key = JSON.stringify([settle.family, settle.motion, wait.name])
				let probe = probes.get(key)
				if (probe === undefined) {
					probe = {
						title: settle.title,
						family: settle.family,
						motion: settle.motion,
						description: wait.name,
						readings: [],
					}
					probes.set(key, probe)
				}
				probe.readings.push({
					run,
					duration: wait.duration,
					source: `Settle probe (${settle.variant})`,
				})
			}
		}
		for (const timing of run.timings) {
			if (!isEligible(run, timing.title, timing.variant, omissions)) continue
			for (const row of timing.rows) {
				const key = JSON.stringify([timing.title, row.name])
				let segment = segments.get(key)
				if (segment === undefined) {
					segment = { title: timing.title, name: row.name, readings: [] }
					segments.set(key, segment)
				}
				segment.readings.push(row.duration)
			}
		}
	}
	const lines = [
		'',
		'## Settle probes',
		'',
		'| Family | Motion | Description | Readings | Eligible runs | Min ms | Max ms | Ratio | R3 ms | Slack ms | Slack check | Slowest run |',
		'| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |',
	]
	for (const [, probe] of [...probes].sort(([left], [right]) => left.localeCompare(right))) {
		const min = Math.min(...probe.readings.map((reading) => reading.duration))
		const max = Math.max(...probe.readings.map((reading) => reading.duration))
		const count = new Set(probe.readings.map((reading) => reading.run.folder)).size
		const ratio = count >= 2 && min > 0 ? max / min : undefined
		const budget =
			ratio === undefined ? undefined : Math.ceil((max * Math.max(band, ratio)) / 100) * 100
		const slack = computeSlack(probe.title, rows, timeouts)
		lines.push(
			`| ${[
				probe.family,
				String(probe.motion ?? 'header'),
				probe.description,
				String(probe.readings.length),
				String(count),
				min.toFixed(1),
				max.toFixed(1),
				ratio?.toFixed(6) ?? 'insufficient',
				budget === undefined ? 'unavailable' : String(budget),
				slack?.toFixed(1) ?? 'unavailable',
				budget === undefined || slack === undefined
					? 'unavailable'
					: budget >= slack
						? 'R3 — not below slack'
						: 'below slack',
				probe.readings
					.filter((reading) => reading.duration === max)
					.map(renderReading)
					.join('; '),
			]
				.map(escapeCell)
				.join(' | ')} |`,
		)
	}
	lines.push(
		'',
		'## Statechart rows',
		'',
		'| Table | Row | Readings | Min ms | Max ms |',
		'| --- | --- | ---: | ---: | ---: |',
	)
	for (const [, segment] of [...segments].sort(([left], [right]) => left.localeCompare(right))) {
		lines.push(
			`| ${[segment.title, segment.name, String(segment.readings.length), Math.min(...segment.readings).toFixed(1), Math.max(...segment.readings).toFixed(1)].map(escapeCell).join(' | ')} |`,
		)
	}
	return lines
}
function computeBand(runs: readonly Run[], supplied: number | undefined): Band {
	const journeys = runs.filter((run) => run.outside !== undefined)
	if (journeys.length === 0) {
		if (supplied === undefined) throw new Error('Require a journey run or --band A/B')
		return { ratio: supplied, excluded: new Map() }
	}
	if (supplied !== undefined) throw new Error('--band is allowed only without journey runs')
	if (journeys.some((run) => run.seconds <= 0))
		throw new Error('Journey wall seconds must be positive to compute the band')
	const initial =
		Math.max(...journeys.map((run) => run.seconds)) /
		Math.min(...journeys.map((run) => run.seconds))
	const excluded = new Map<string, number>()
	for (const run of journeys) {
		const others = journeys
			.filter((peer) => peer.folder !== run.folder)
			.flatMap((peer) => (peer.outside === undefined ? [] : [peer.outside]))
		const threshold = Math.max(...others) * initial
		if (others.length > 0 && run.outside !== undefined && run.outside > threshold)
			excluded.set(run.folder, threshold)
	}
	const eligible = journeys.filter((run) => !excluded.has(run.folder))
	return {
		ratio:
			Math.max(...eligible.map((run) => run.seconds)) /
			Math.min(...eligible.map((run) => run.seconds)),
		excluded,
	}
}
function readOmissions(files: readonly string[]): ReadonlySet<string> {
	const omissions = new Set<string>()
	for (const file of files) {
		const entries = readJSON(file)
		if (!Array.isArray(entries)) throw new Error(`${file}: expected an array of run/title pairs`)
		for (const entry of entries) {
			if (
				!isRecord(entry) ||
				typeof entry.run !== 'string' ||
				entry.run.length === 0 ||
				/[/\\]/.test(entry.run) ||
				entry.run === '.' ||
				entry.run === '..' ||
				typeof entry.title !== 'string' ||
				entry.title.length === 0
			)
				throw new Error(`${file}: expected a folder name and nonempty title in each run/title pair`)
			omissions.add(JSON.stringify([entry.run, entry.title]))
		}
	}
	return omissions
}
function readTimeouts(file: string | undefined): ReadonlyMap<string, number> {
	const timeouts = new Map<string, number>()
	if (file === undefined) return timeouts
	const entries = readJSON(file)
	if (!isRecord(entries)) throw new Error(`${file}: expected a title-to-timeout object`)
	for (const [title, timeout] of Object.entries(entries)) {
		if (title.length === 0 || !isMeasurement(timeout))
			throw new Error(`${file}: expected nonempty titles and finite nonnegative timeouts`)
		timeouts.set(title, timeout)
	}
	return timeouts
}
function main(): void {
	const options = new Map<string, string>()
	const folders = new Set<string>()
	const files: string[] = []
	const argumentsList = process.argv.slice(2)
	for (let index = 0; index < argumentsList.length; index += 2) {
		const flag = argumentsList[index]
		const value = argumentsList[index + 1]
		if (
			flag === undefined ||
			!['--run', '--out', '--ceiling', '--band', '--omit', '--timeouts'].includes(flag) ||
			!value ||
			value.startsWith('--') ||
			(flag !== '--run' && flag !== '--omit' && options.has(flag))
		) {
			console.error(`Usage: ${USAGE}\nInvalid or repeated option: ${flag ?? ''}`)
			process.exitCode = 64
			return
		}
		if (flag === '--run') folders.add(resolve(value))
		else if (flag === '--omit') files.push(resolve(value))
		else options.set(flag, value)
	}
	const out = options.get('--out')
	const bandText = options.get('--band')
	const [numerator, denominator] = bandText?.split('/').map(Number) ?? []
	const band =
		bandText === undefined
			? undefined
			: numerator === undefined || denominator === undefined
				? Number.NaN
				: numerator / denominator
	const ceilingText = options.get('--ceiling') ?? '0'
	const ceiling = Number(ceilingText)
	if (
		out === undefined ||
		(bandText !== undefined &&
			(!/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/.test(bandText) ||
				band === undefined ||
				!Number.isFinite(band) ||
				band < 1 ||
				denominator === 0)) ||
		!/^\d+(?:\.\d+)?$/.test(ceilingText) ||
		!isMeasurement(ceiling)
	) {
		console.error(
			`Usage: ${USAGE}\nRequire --out, a journey run or finite band A/B >= 1 with B > 0, and nonnegative --ceiling MS`,
		)
		process.exitCode = 64
		return
	}
	let omissions: ReadonlySet<string>
	let timeouts: ReadonlyMap<string, number>
	try {
		omissions = readOmissions(files)
		timeouts = readTimeouts(options.get('--timeouts'))
	} catch (error) {
		console.error(`Usage: ${USAGE}\n${String(error)}`)
		process.exitCode = 64
		return
	}
	let runs: readonly Run[]
	try {
		runs = [...folders].map(readRun)
	} catch (error) {
		console.error(String(error))
		process.exitCode = 67
		return
	}
	let selection: Band
	try {
		selection = computeBand(runs, band)
	} catch (error) {
		console.error(`Usage: ${USAGE}\n${String(error)}`)
		process.exitCode = 64
		return
	}
	try {
		const table = renderTable(runs, selection, ceiling, omissions, timeouts)
		writeFileSync(resolve(out), table)
		console.log(table)
		console.log(`Wrote ${resolve(out)}`)
	} catch (error) {
		console.error(String(error))
		process.exitCode = 67
	}
}
main()
