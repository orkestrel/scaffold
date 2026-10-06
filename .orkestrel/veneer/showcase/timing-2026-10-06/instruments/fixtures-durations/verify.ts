// Self-contained Node fixture runner for the instrument's permitted paths.
import { strict as assert } from 'node:assert'
import { spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = '/home/user/veneer/tmp/units/journey-cost'
const FIXTURES = join(ROOT, 'fixtures', 'durations')
const INSTRUMENT = join(ROOT, 'durations.ts')
const TABLE = join(ROOT, 'durations-2026-10-06b.md')
const TITLE =
	"showcase statecharts drives the 'popover' table through its controls with motion=true"
const HEADER = "showcase statecharts drives the 'face' header table through the header buttons"
const OMITTED = [
	'showcase journeys J4 compares the three faces through the Stylesheets buttons',
	'showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant',
]
const RUNS = [
	'jb2-1',
	'jb2-2',
	'jb2b-1',
	'jb2b-2',
	'completion-b3-journey-after-4',
	'completion-b4-journey',
]

function writeJSON(file: string, value: unknown): void {
	writeFileSync(file, JSON.stringify(value, undefined, 2) + '\n')
}
function seedFixtures(): void {
	for (const [name, seconds, outside, duration, wait, row] of [
		['journey-fast', 100, 10, 1000, 200, 100],
		['journey-slow', 120, 11, 1200, 400, 300],
		['command-fast', 1, undefined, 1000, 100, 50],
		['command-slow', 2, undefined, 3000, 150, 75],
	] as const) {
		const folder = join(FIXTURES, name)
		mkdirSync(folder, { recursive: true })
		const title = outside === undefined ? HEADER : TITLE
		writeJSON(join(folder, 'report.json'), {
			testResults: [
				{ name: 'light-1280', assertionResults: [{ fullName: title, status: 'passed', duration }] },
			],
		})
		writeJSON(join(folder, 'end.json'), { seconds })
		const context =
			outside === undefined
				? { variant: 'light-1280', family: 'face' }
				: { variant: 'light-1280', family: 'popover', motion: true }
		const lines = [
			`Settle probe ${JSON.stringify({ ...context, waits: [{ description: 'visible', milliseconds: wait }] })}`,
			`Statechart duration ${JSON.stringify({ ...context, seconds: duration / 1000, rows: [{ name: 'show', milliseconds: row }] })}`,
		]
		if (outside === undefined) {
			writeFileSync(join(folder, 'stdout.log'), lines.join('\r\n') + '\r\n')
		} else {
			writeFileSync(
				join(folder, 'measure.jsonl'),
				JSON.stringify({ event: 'summary', outside: { seconds: outside } }) + '\n',
			)
			mkdirSync(join(folder, 'journey'), { recursive: true })
			writeFileSync(join(folder, 'journey', 'light-1280.txt'), lines.join('\n') + '\n')
		}
	}
	writeJSON(join(FIXTURES, 'timeouts.json'), { [TITLE]: 2000, [HEADER]: 10000 })
	writeJSON(
		join(FIXTURES, 'omit.json'),
		OMITTED.map((title) => ({ run: 'completion-b4-journey', title })),
	)
	writeJSON(join(FIXTURES, 'omit-fixture.json'), [{ run: 'journey-slow', title: TITLE }])
	writeJSON(join(FIXTURES, 'bad-omit.json'), { run: 'command-fast', title: HEADER })
	writeJSON(join(FIXTURES, 'bad-timeouts.json'), { [HEADER]: '10000' })
	writeFileSync(join(FIXTURES, 'invalid.json'), '{\n')
}
function executeInstrument(args: readonly string[], expected = 0, instrument = INSTRUMENT): string {
	console.log(`node ${instrument} ${args.join(' ')}`)
	const result = spawnSync(process.execPath, [instrument, ...args], {
		stdio: ['ignore', 'ignore', 'inherit'],
	})
	assert.equal(result.error, undefined)
	assert.equal(result.status, expected)
	console.log(`exit ${result.status}`)
	if (expected !== 0) return ''
	const out = args[args.indexOf('--out') + 1]
	assert.ok(out)
	return readFileSync(out, 'utf8')
}
function readCells(output: string, title: string): readonly string[] {
	const line = output.split(/\r\n|\n/).find((line) => line.startsWith(`| ${title} |`))
	assert.ok(line, `Missing row: ${title}`)
	return line.split(' | ').slice(1, -1)
}
function selectLines(output: string): readonly string[] {
	return output
		.split(/\r\n|\n/)
		.filter(
			(line) =>
				line.startsWith('Band ratio:') ||
				line.startsWith(`| ${TITLE} |`) ||
				line.includes('out of band:'),
		)
}
function verifySix(): string {
	const output = executeInstrument([
		...RUNS.flatMap((name) => ['--run', join(ROOT, 'runs', name)]),
		'--out',
		TABLE,
	])
	assert.ok(output.includes('Band ratio: 1.163657.'))
	const cells = readCells(output, TITLE)
	assert.deepEqual(cells.slice(2, 5), ['60228.0', '165767.6', '2.752334'])
	assert.equal(cells[7], 'R5 — hold')
	for (const line of selectLines(output)) console.log(line)
	return output
}
function verifySeven(): void {
	const six = verifySix()
	const output = executeInstrument([
		...RUNS.concat('completion-b3-journey-after-3b').flatMap((name) => [
			'--run',
			join(ROOT, 'runs', name),
		]),
		'--out',
		TABLE,
	])
	assert.ok(output.includes('out of band: 116.28 > 72.67'))
	assert.equal(output.slice(output.indexOf('R3 =')), six.slice(six.indexOf('R3 =')))
	for (const line of selectLines(output)) console.log(line)
	console.log('All title, settle, and row figures equal the six-run output.')
}
function verifyFixtures(): void {
	seedFixtures()
	const args = ['journey-fast', 'journey-slow', 'command-fast', 'command-slow'].flatMap((name) => [
		'--run',
		join(FIXTURES, name),
	])
	const options = [
		'--timeouts',
		join(FIXTURES, 'timeouts.json'),
		'--ceiling',
		'250',
		'--out',
		join(FIXTURES, 'fixture-table.md'),
	]
	const output = executeInstrument([...args, ...options])
	assert.ok(output.includes('Band ratio: 1.200000.'))
	assert.equal(readCells(output, TITLE)[5], '800.0')
	assert.equal(readCells(output, HEADER)[6], '9250')
	assert.equal(readCells(output, HEADER)[7], 'not applicable (command)')
	assert.ok(
		output.includes(
			'| popover | true | visible | 2 | 2 | 200.0 | 400.0 | 2.000000 | 800 | 800.0 | R3 — not below slack | journey-slow: 400.0 ms, seconds=120, outside.seconds=11.00',
		),
	)
	assert.ok(
		output.includes(
			'| face | header | visible | 2 | 2 | 100.0 | 150.0 | 1.500000 | 300 | 7000.0 | below slack | command-slow: 150.0 ms, seconds=2, outside.seconds=unavailable (command)',
		),
	)
	assert.ok(output.includes(`| ${TITLE} | show | 2 | 100.0 | 300.0 |`))
	assert.ok(output.includes(`| ${HEADER} | show | 2 | 50.0 | 75.0 |`))
	console.log(output)
	const command = executeInstrument([
		'--run',
		join(FIXTURES, 'command-fast'),
		'--run',
		join(FIXTURES, 'command-slow'),
		'--band',
		'4/1',
		'--out',
		join(FIXTURES, 'command-table.md'),
	])
	assert.equal(readCells(command, HEADER)[6], '12000')
	assert.ok(command.includes('| 1.500000 | 600 |'))
	console.log(command)
	const omitted = executeInstrument([
		...args,
		...options.slice(0, -2),
		'--omit',
		join(FIXTURES, 'omit-fixture.json'),
		'--omit',
		join(FIXTURES, 'omit.json'),
		'--out',
		join(FIXTURES, 'omitted-table.md'),
	])
	assert.equal(readCells(omitted, TITLE)[1], '1')
	assert.ok(
		omitted.includes(
			'| popover | true | visible | 1 | 1 | 200.0 | 200.0 | insufficient | unavailable | 1000.0 | unavailable |',
		),
	)
	assert.ok(omitted.includes(`| ${TITLE} | show | 1 | 100.0 | 100.0 |`))
	console.log(
		'Repeated --omit removed the report, settle, and statechart-row readings for journey-slow.',
	)
	const duplicated = executeInstrument([
		...args,
		'--run',
		join(FIXTURES, 'journey-fast'),
		...options,
	])
	assert.equal(duplicated, output)
	console.log('Duplicate --run leaves every figure unchanged.')
}
function verifyRefusals(): void {
	seedFixtures()
	const out = ['--out', join(FIXTURES, 'refusal-table.md')]
	executeInstrument(out, 64)
	executeInstrument(['--run', join(FIXTURES, 'command-fast'), ...out], 64)
	for (const [flag, name] of [
		['--omit', 'bad-omit.json'],
		['--timeouts', 'bad-timeouts.json'],
		['--omit', 'invalid.json'],
		['--timeouts', 'invalid.json'],
	]) {
		assert.ok(flag && name)
		executeInstrument(
			[
				'--run',
				join(FIXTURES, 'command-fast'),
				'--band',
				'6/5',
				flag,
				join(FIXTURES, name),
				...out,
			],
			64,
		)
	}
	executeInstrument(['--run', join(FIXTURES, 'missing-report'), '--band', '6/5', ...out], 67)
	executeInstrument(['--run', join(FIXTURES, 'journey-fast'), '--band', '6/5', ...out], 64)
}
function verifyOmissions(): void {
	seedFixtures()
	const output = executeInstrument([
		...RUNS.concat('completion-b3-journey-after-3b').flatMap((name) => [
			'--run',
			join(ROOT, 'runs', name),
		]),
		'--omit',
		join(FIXTURES, 'omit.json'),
		'--out',
		TABLE,
	])
	for (const title of OMITTED) {
		const cells = readCells(output, title)
		assert.equal(cells[1], '5')
		assert.ok(!cells.join(' | ').includes('completion-b4-journey'))
		console.log(
			`${title}: eligible runs=${cells[1]}, min=${cells[2]}, max=${cells[3]}, ratio=${cells[4]}; no completion-b4-journey reading`,
		)
	}
	assert.ok(output.includes('Band ratio: 1.163657.'))
	assert.ok(output.includes('out of band: 116.28 > 72.67'))
	console.log(`Wrote ${TABLE}`)
}

switch (process.argv[2]) {
	case 'six':
		verifySix()
		break
	case 'seven':
		verifySeven()
		break
	case 'fixtures':
		verifyFixtures()
		break
	case 'refusals':
		verifyRefusals()
		break
	case 'table':
		verifyOmissions()
		break
	case 'list':
		console.log(readdirSync(FIXTURES, { recursive: true }).sort().join('\n'))
		break
	default:
		throw new Error('Expected six, seven, fixtures, refusals, table, or list')
}
