// Usage: node compare.ts --baseline DIR [--baseline DIR ...] --candidate DIR --host-bound FILE --registration TOTAL/SKIPPED [--moves FILE] --out FILE
// Rows must agree with every baseline; lines and Journal must each agree with at least one baseline.
// Candidate failure titles must be host-bound; baseline occurrence, rows, and causes are informational.
// Exit: 0 every gate holds; 67 differences or unreadable evidence; 64 usage.
// Self-contained instrument: the brief permits node: imports only.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { stripVTControlCharacters } from 'node:util'

interface Failure {
	readonly title: string
	readonly row: string
	readonly cause: string
}
interface Evidence {
	readonly folder: string
	readonly rows: readonly string[]
	readonly order: ReadonlyMap<string, readonly string[]>
	readonly lines: readonly string[]
	readonly journal: readonly string[]
	readonly timing: readonly string[]
	readonly failures: readonly Failure[]
	readonly issues: readonly string[]
	readonly registration: { readonly total: number; readonly skipped: number; readonly todo: number }
}
const USAGE =
	'Usage: node compare.ts --baseline DIR [--baseline DIR ...] --candidate DIR --host-bound FILE --registration TOTAL/SKIPPED [--moves FILE] --out FILE\nRows must agree with every baseline; lines and Journal must each agree with at least one baseline. Candidate failure titles must be host-bound; baseline occurrence, rows, and causes are informational.'
const VARIANTS = ['dark-1280', 'dark-390', 'light-1280', 'light-390']
const GATED = [
	'Component preservation',
	'Component repaired causes',
	'Component reader controls',
	'Component control stripped curation',
	'Component control preserved curation',
	'Component control planted preflight',
	'Component control',
	'Partition population',
	'Partition unmapped control',
	'Primary map demonstration',
	'Partition role control',
	'Partition control',
	'Partition',
	'Journey Tailwind readings',
	'Face census',
	'Engine equality',
	'Collapse exclusion control',
	'Header statechart',
	'390 header',
]
const NORMALIZATIONS = [
	'Rows: strip light/dark-WIDTH and width-only prefixes; width-only prefixes mean light-WIDTH. Check untouched order per artifact, with --moves prefixes excluded only from order.',
	'Lines and Journal: sort object keys and remove seconds, milliseconds, and host fields recursively.',
	'Lines and Journal: replace census-authored-(mark|token)-digits with census-authored-$1-<random>.',
	'Lines and Journal: replace sessionId UUIDs with <session> and recorded HTTP(S) URL ports with <port>.',
	'Lines and Journal: replace iframeId URL-encoded absolute paths with iframeId=<file>.',
	'Reading variant: theme from variant and width from payload; width-only payloads mean light-WIDTH.',
	'Theme Header statechart: key by family; omit variant. Other Header statechart variants remain gated.',
	'Component control: width from stdout header title; historical both-widths headers use width evidence scoped to that exact title.',
	'Journal: compare without artifact/host key; remove error: Showcase statechart failed entries and every payload carrying seconds or milliseconds. Baseline timing entries are listed verbatim.',
	'Dumps: read only column-zero Showcase statechart failed; ignore every Vite client console forwarding copy.',
	'Failures: gate candidate titles against the host-bound set; report row/cause tuples as information against the baseline union and mark titles that failed in no baseline. Matched tables omit the assertion message; normalize elapsed waited …ms and stack frames only.',
]
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function parseObject(text: string): Record<string, unknown> {
	const value: unknown = JSON.parse(text)
	if (!isRecord(value)) throw new Error('Expected a JSON object')
	return value
}
function readString(value: unknown, name: string): string {
	if (typeof value !== 'string') throw new Error(`Expected ${name} string`)
	return value
}
function readCount(value: unknown, name: string): number {
	if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0)
		throw new Error(`Expected ${name} count`)
	return value
}
function normalizeValue(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(normalizeValue)
	if (typeof value === 'string') return normalizeText(value)
	if (!isRecord(value)) return value
	return Object.fromEntries(
		Object.keys(value)
			.sort()
			.filter((key) => !['seconds', 'milliseconds', 'host'].includes(key))
			.map((key) => [key, normalizeValue(value[key])]),
	)
}
function normalizeText(value: string): string {
	return value
		.replace(/census-authored-(mark|token)-\d+/g, 'census-authored-$1-<random>')
		.replace(
			/sessionId=[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
			'sessionId=<session>',
		)
		.replace(/\biframeId=(?:%2f|[a-z]%3a%5c|%5c%5c)[^\s&#"'<>]*/gi, 'iframeId=<file>')
		.replace(/(https?:\/\/(?:\[[^\]]+\]|[^\s/:"<>]+)):\d+/g, '$1:<port>')
}
function hasTiming(value: unknown): boolean {
	if (Array.isArray(value)) return value.some(hasTiming)
	return (
		isRecord(value) &&
		(Object.keys(value).some((key) => key === 'seconds' || key === 'milliseconds') ||
			Object.values(value).some(hasTiming))
	)
}
function readVariant(value: unknown): string | undefined {
	if (!isRecord(value)) return undefined
	const variant = typeof value.variant === 'string' ? value.variant : undefined
	if (value.width === 1280 || value.width === 390)
		return `${variant?.split('-')[0] ?? 'light'}-${value.width}`
	return variant
}
function normalizePayload(name: string, value: unknown): unknown {
	if (!isRecord(value)) return normalizeValue(value)
	const payload = { ...value }
	delete payload.host
	if (name === 'Header statechart' && payload.family === 'theme') delete payload.variant
	else if (typeof payload.variant === 'string') payload.variant = readVariant(payload)
	return normalizeValue(payload)
}
function normalizeCause(value: string): string {
	return stripVTControlCharacters(value)
		.split(/\r?\n/)
		.filter((line) => !/^\s+at\s/.test(line))
		.join('\n')
		.replace(/\(waited [\d.]+ms\)/g, '(waited <elapsed>ms)')
		.trim()
}
function normalizeTitle(value: string): string {
	return value.replace(/\s*>\s*/g, ' > ').trim()
}
function readSection(text: string, heading: string): readonly string[] {
	const lines = text.split(/\r?\n/)
	const start = lines.indexOf(`## ${heading}`)
	if (start < 0) throw new Error(`Missing section: ${heading}`)
	const end = lines.findIndex((line, index) => index > start && line.startsWith('## '))
	return lines.slice(start + 1, end < 0 ? undefined : end).filter((line) => line.length > 0)
}
function readLine(
	line: string,
	names: readonly string[],
): { readonly name: string; readonly value: unknown } | undefined {
	if (line.includes('[vite] (client) [console.')) return undefined
	for (const name of names) {
		const offset = line.startsWith(`${name} `) ? 0 : -1
		if (offset < 0) continue
		const payload = line.slice(offset + name.length + 1)
		if (!payload.startsWith('{') && !payload.startsWith('[')) continue
		try {
			const value: unknown = JSON.parse(payload)
			return { name, value }
		} catch (error) {
			throw new Error(`Invalid ${name} JSON: ${String(error)}`)
		}
	}
	return undefined
}
function readHosts(file: string): ReadonlySet<string> {
	const text = readFileSync(file, 'utf8')
	if (text.trim().startsWith('[')) {
		const values: unknown = JSON.parse(text)
		if (!Array.isArray(values) || !values.every((value) => typeof value === 'string'))
			throw new Error('Host-bound JSON must be a title array')
		return new Set(values.map(normalizeTitle))
	}
	const section = readSection(text, 'Host-bound set')
	const titles = new Set<string>()
	for (const line of section) {
		if (!line.startsWith('- ')) continue
		let prefix = ''
		for (const match of line.matchAll(/`([^`]+)`/g)) {
			const token = match[1]
			if (
				token === undefined ||
				token.includes('.ts') ||
				/^(src:browser|integration|journey|setup:browser)$/.test(token) ||
				/^[a-f0-9]{7}$/.test(token)
			)
				continue
			const title = normalizeTitle(token)
			if (title.includes(' > ')) {
				prefix = title.slice(0, title.lastIndexOf(' > '))
				titles.add(title)
			} else if (title.startsWith('drives ') && prefix) titles.add(`${prefix} > ${title}`)
			else if (title === 'consumes every selected departure') titles.add(title)
		}
	}
	if (titles.size === 0) throw new Error('Host-bound section contains no titles')
	return titles
}
function readEvidence(folder: string, moves: readonly string[]): Evidence {
	const rows: string[] = []
	const order = new Map<string, string[]>()
	const journal: string[] = []
	const timing: string[] = []
	const issues: string[] = []
	for (const variant of VARIANTS) {
		const candidates = [
			join(folder, 'journey', `${variant}.txt`),
			join(folder, 'tmp/journey', `${variant}.txt`),
			join(folder, `${variant}.txt`),
		]
		const path = candidates.find(existsSync)
		if (path === undefined) throw new Error(`Missing ${variant}.txt in ${folder}`)
		const artifact = readFileSync(path, 'utf8')
		const resolved = readSection(artifact, 'Resolved values')
		if (resolved.length === 0) throw new Error(`Empty resolved values: ${path}`)
		for (const row of resolved) {
			const prefix = /^(?:(?:light|dark)-)?(?:1280|390)\s+/.exec(row)
			const normalized = row.slice(prefix?.[0].length ?? 0)
			rows.push(normalized)
			const ordered = order.get(variant) ?? []
			if (!moves.some((move) => normalized.startsWith(move) || row.startsWith(move)))
				ordered.push(normalized)
			order.set(variant, ordered)
		}
		for (const entry of readSection(artifact, 'Journal')) {
			if (entry.startsWith('error: Showcase statechart failed ')) continue
			const offset = entry.search(/ [\[{]/)
			if (offset >= 0) {
				try {
					const payload: unknown = JSON.parse(entry.slice(offset + 1))
					if (hasTiming(payload)) {
						timing.push(`${variant}: ${entry}`)
						continue
					}
					const name = entry.slice(0, offset).replace(/^(?:info|log|warn|error): /, '')
					journal.push(
						`${entry.slice(0, offset)} ${JSON.stringify(normalizePayload(name, payload))}`,
					)
					continue
				} catch {
					/* Non-JSON perception text remains byte-sensitive. */
				}
			}
			journal.push(normalizeText(entry))
		}
	}
	const stdout = stripVTControlCharacters(readFileSync(join(folder, 'stdout.log'), 'utf8'))
	const stderr = stripVTControlCharacters(readFileSync(join(folder, 'stderr.log'), 'utf8'))
	const lines: string[] = []
	let header = ''
	const widths = new Map<string, number>()
	for (const raw of stdout.split(/\r?\n/)) {
		if (raw.startsWith('stdout | ')) {
			header = raw.slice(raw.indexOf(' > ') + 3)
			continue
		}
		const parsed = readLine(raw, GATED)
		if (parsed === undefined) continue
		const payload = parsed.value
		if (
			isRecord(payload) &&
			(payload.width === 390 || payload.width === 1280) &&
			parsed.name.startsWith('Component ')
		)
			widths.set(header, payload.width)
		const width = /\b(1280|390)\b/.exec(header)?.[1] ?? widths.get(header)
		const variant =
			parsed.name === 'Header statechart' && isRecord(payload) && payload.family === 'theme'
				? 'family:theme'
				: (readVariant(payload) ??
					(parsed.name.startsWith('Component control ') && width !== undefined
						? `light-${width}`
						: undefined))
		if (variant === undefined) throw new Error(`Missing reading variant: ${parsed.name}`)
		lines.push(
			`${parsed.name} [${variant}] ${JSON.stringify(normalizePayload(parsed.name, payload))}`,
		)
	}
	if (lines.length === 0) throw new Error(`No gated stdout lines: ${folder}`)
	const report = parseObject(readFileSync(join(folder, 'report.json'), 'utf8'))
	if (!Array.isArray(report.testResults)) throw new Error('Missing Vitest testResults')
	const failures: Failure[] = []
	let assertions = 0
	let skipped = 0
	let todo = 0
	let failed = 0
	for (const suite of report.testResults) {
		if (!isRecord(suite) || !Array.isArray(suite.assertionResults))
			throw new Error('Invalid Vitest suite')
		if (
			suite.status === 'failed' &&
			!suite.assertionResults.some(
				(assertion) => isRecord(assertion) && assertion.status === 'failed',
			)
		)
			issues.push(
				`Failure gate: failed suite without failed assertion: ${String(suite.name)} ${String(suite.message ?? '')}`,
			)
		for (const assertion of suite.assertionResults) {
			if (!isRecord(assertion)) throw new Error('Invalid Vitest assertion')
			assertions++
			if (
				assertion.status === 'pending' ||
				assertion.status === 'skipped' ||
				assertion.status === 'disabled'
			)
				skipped++
			if (assertion.status === 'todo') todo++
			if (assertion.status !== 'failed') continue
			failed++
			const title =
				Array.isArray(assertion.ancestorTitles) &&
				assertion.ancestorTitles.every((part) => typeof part === 'string') &&
				typeof assertion.title === 'string'
					? normalizeTitle([...assertion.ancestorTitles, assertion.title].join(' > '))
					: normalizeTitle(readString(assertion.fullName, 'fullName'))
			if (!Array.isArray(assertion.failureMessages) || assertion.failureMessages.length === 0)
				throw new Error(`Missing cause: ${title}`)
			for (const message of assertion.failureMessages)
				failures.push({
					title,
					row: '<assertion>',
					cause: normalizeCause(readString(message, 'failure message')),
				})
		}
	}
	const registration = {
		total: readCount(report.numTotalTests, 'numTotalTests'),
		skipped: readCount(report.numPendingTests, 'numPendingTests'),
		todo: readCount(report.numTodoTests ?? todo, 'numTodoTests'),
	}
	if (
		registration.total !== assertions ||
		registration.skipped !== skipped ||
		registration.todo !== todo ||
		readCount(report.numFailedTests, 'numFailedTests') !== failed
	)
		throw new Error(`Vitest counts do not match assertion records: ${folder}`)
	if (report.success === false && failed === 0)
		issues.push('Failure gate: report.success is false without a failed assertion')
	if (/Unhandled Errors?|Vitest caught \d+ unhandled errors?/i.test(stderr))
		issues.push('Failure gate: stderr carries an Unhandled Error block')
	const dumped = new Set<string>()
	for (const raw of `${stdout}\n${stderr}`.split(/\r?\n/)) {
		if (!raw.startsWith('Showcase statechart failed ') || raw.includes('[vite] (client) [console.'))
			continue
		try {
			const parsed = readLine(raw, ['Showcase statechart failed'])
			if (parsed === undefined) continue
			const dump = parsed.value
			if (!isRecord(dump)) throw new Error('Invalid statechart dump')
			const family = readString(dump.family, 'statechart family')
			const variant = readString(dump.variant, 'statechart variant')
			const matching = failures.filter(
				(failure) =>
					failure.title.includes(`'${family}'`) &&
					(dump.motion === undefined || failure.title.includes(`motion=${dump.motion}`)),
			)
			const title = matching[0]?.title
			if (title === undefined) {
				issues.push(`Failure gate: Unmatched statechart dump: ${family} ${variant}`)
				continue
			}
			dumped.add(title)
			if (!Array.isArray(dump.failures) || dump.failures.length === 0)
				throw new Error(`Empty statechart failure rows: ${family}`)
			const markup = readString(dump.markup, 'statechart markup')
			for (const row of dump.failures) {
				const name = readString(row, 'statechart row')
				const entries = [...markup.matchAll(/<li\b([^>]*)>([\s\S]*?)<\/li>/g)]
				const entry = entries.find(
					(match) =>
						match[1]?.includes('data-statechart-result="failed"') &&
						match[1]?.includes(
							`data-statechart-scenario="${name.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`,
						),
				)
				if (entry === undefined) throw new Error(`No failed markup for row: ${name}`)
				failures.push({ title, row: name, cause: normalizeCause(entry[2] ?? '') })
			}
		} catch (error) {
			issues.push(`Failure gate: ${String(error)}`)
		}
	}
	for (const failure of failures) {
		if (failure.title.startsWith('showcase statecharts > ') && !dumped.has(failure.title))
			issues.push(`Failure gate: Missing statechart dump: ${failure.title}`)
	}
	return {
		folder,
		rows,
		order,
		lines,
		journal,
		timing,
		issues,
		failures: failures.filter(
			(failure) => failure.row !== '<assertion>' || !dumped.has(failure.title),
		),
		registration,
	}
}
function compareMultisets(
	label: string,
	baseline: readonly string[],
	candidate: readonly string[],
	differences: string[],
): void {
	const counts = new Map<string, number>()
	for (const value of baseline) counts.set(value, (counts.get(value) ?? 0) - 1)
	for (const value of candidate) counts.set(value, (counts.get(value) ?? 0) + 1)
	for (const [value, difference] of counts)
		if (difference !== 0)
			differences.push(
				`${label}: ${difference > 0 ? 'added' : 'removed'} ${Math.abs(difference)} × ${value}`,
			)
}
function renderReport(
	differences: readonly string[],
	baseline: readonly Evidence[],
	candidate: Evidence | undefined,
	agreements: readonly string[],
	hosts: readonly string[],
): string {
	return [
		`# Journey comparison`,
		'',
		differences.length === 0 ? 'Equal: every gate holds.' : 'Different: gates refused.',
		'',
		`Candidate: ${candidate?.folder ?? 'unreadable'}`,
		'',
		...baseline.map((reading) => `Baseline: ${reading.folder}`),
		'',
		...agreements,
		'',
		'## Differences',
		'',
		...(differences.length === 0
			? ['None.']
			: differences.map((difference) => `- ${difference.replace(/\n/g, ' ↵ ')}`)),
		'',
		'## Host-bound rows',
		'',
		...(hosts.length === 0 ? ['None.'] : hosts.map((entry) => `- ${entry}`)),
		'',
		'## Timing entries excluded',
		'',
		...baseline.flatMap((reading) => [
			`From ${reading.folder}:`,
			...reading.timing.map((entry) => `- ${entry}`),
		]),
		'',
		'## Normalizations applied',
		'',
		...NORMALIZATIONS.map((entry) => `- ${entry}`),
		'',
		'Registration requires the supplied TOTAL/SKIPPED counts in the candidate. Every candidate failure title must be host-bound; baseline occurrence and row/cause tuples are informational. Rows must agree with every baseline; lines and Journal must each agree with at least one baseline.',
		'This report covers one candidate run. Acceptance-run frequency and price/memory eligibility remain lane M decisions.',
		'',
	].join('\n')
}
function main(): void {
	const arguments_ = process.argv.slice(2)
	const options = new Map<string, string>()
	const folders: string[] = []
	for (let index = 0; index < arguments_.length; index += 2) {
		const flag = arguments_[index]
		const value = arguments_[index + 1]
		if (
			flag === undefined ||
			!['--baseline', '--candidate', '--host-bound', '--registration', '--moves', '--out'].includes(
				flag,
			) ||
			!value ||
			value.startsWith('--')
		) {
			console.error(
				`${USAGE}\n${flag ?? 'argument'}: expected DIR for --baseline/--candidate, TOTAL/SKIPPED for --registration, FILE for --host-bound/--moves/--out`,
			)
			process.exitCode = 64
			return
		}
		if (flag === '--baseline') folders.push(resolve(value))
		else if (!options.has(flag)) options.set(flag, value)
	}
	const candidate = options.get('--candidate')
	const hosts = options.get('--host-bound')
	const out = options.get('--out')
	const registration = options.get('--registration')
	if (
		folders.length === 0 ||
		!candidate ||
		!hosts ||
		!out ||
		!registration ||
		!/^\d+\/\d+$/.test(registration)
	) {
		console.error(
			`${USAGE}\nRequired: --baseline DIR, --candidate DIR, --host-bound FILE, --registration TOTAL/SKIPPED, --out FILE`,
		)
		process.exitCode = 64
		return
	}
	const differences: string[] = []
	const agreements: string[] = []
	const hostRows: string[] = []
	const baselines: Evidence[] = []
	let reading: Evidence | undefined
	try {
		const allowed = readHosts(hosts)
		const moved = options.get('--moves')
		const moves: unknown = moved === undefined ? [] : JSON.parse(readFileSync(moved, 'utf8'))
		if (
			!Array.isArray(moves) ||
			!moves.every((move) => typeof move === 'string' && move.length > 0)
		) {
			console.error(
				`${USAGE}\n--moves FILE must contain a JSON list of nonempty row keys or title prefixes`,
			)
			process.exitCode = 64
			return
		}
		for (const folder of folders) baselines.push(readEvidence(folder, moves))
		reading = readEvidence(resolve(candidate), moves)
		for (const evidence of [...baselines, reading])
			differences.push(...evidence.issues.map((issue) => `${issue} (${evidence.folder})`))
		if (`${reading.registration.total}/${reading.registration.skipped}` !== registration)
			differences.push(
				`Registration: expected ${registration}; received ${reading.registration.total}/${reading.registration.skipped}`,
			)
		for (const baseline of baselines) {
			const label = baseline.folder
			compareMultisets(`Rows (${label})`, baseline.rows, reading.rows, differences)
			for (const variant of new Set([...baseline.order.keys(), ...reading.order.keys()])) {
				const before = baseline.order.get(variant) ?? []
				const after = reading.order.get(variant) ?? []
				if (JSON.stringify(before) !== JSON.stringify(after))
					differences.push(`Row order (${label}, ${variant}): ordered rows differ`)
			}
		}
		for (const gate of ['lines', 'journal'] as const) {
			const label = gate === 'lines' ? 'Lines' : 'Journal'
			const unmatched: string[] = []
			let matched: string | undefined
			for (const baseline of baselines) {
				const changes: string[] = []
				compareMultisets(`${label} (${baseline.folder})`, baseline[gate], reading[gate], changes)
				if (changes.length === 0) matched = baseline.folder
				else unmatched.push(...changes)
			}
			if (matched === undefined) differences.push(...unmatched)
			else agreements.push(`${label}: agree with ${relative(process.cwd(), matched) || '.'}`)
		}
		const failures = new Set(
			baselines.flatMap((baseline) => baseline.failures.map((failure) => JSON.stringify(failure))),
		)
		const titles = new Set(
			baselines.flatMap((baseline) => baseline.failures.map((failure) => failure.title)),
		)
		for (const failure of reading.failures) {
			if (!allowed.has(failure.title)) {
				differences.push(`Host-bound title absent: ${failure.title}`)
				continue
			}
			hostRows.push(
				`${failures.has(JSON.stringify(failure)) ? 'Matched' : 'New'} against baseline union: ${JSON.stringify(failure)}${titles.has(failure.title) ? '' : ' — failed in no baseline'}`,
			)
		}
	} catch (error) {
		differences.push(
			`${error instanceof Error && 'code' in error ? 'Evidence error' : 'Evidence format'}: ${String(error)}`,
		)
	}
	try {
		writeFileSync(out, renderReport(differences, baselines, reading, agreements, hostRows))
	} catch (error) {
		console.error(error)
		process.exitCode = 67
		return
	}
	console.log(
		differences.length === 0
			? 'Equal: every gate holds.'
			: `Different: ${differences.length} differences; see ${out}`,
	)
	process.exitCode = differences.length === 0 ? 0 : 67
}
main()
