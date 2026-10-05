// Usage: node mutations.ts --targets FILE --report FILE -- RUNNER ARGS...
// Exit: 0 every target red then green and restored; 66 failed proof; 64 usage.
// Select exactly one passed/failed case with the target title and expected status;
// JSON siblings may be skipped/pending, and total = passed + failed + pending.
// Requires --reporter=json --outputFile=FILE; expected matches a red failure message.
// Self-contained instrument: the brief permits node: imports only.
import type { ChildProcess } from 'node:child_process'
import { spawn } from 'node:child_process'
import { closeSync, existsSync, openSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'

interface Target {
	readonly file: string
	readonly search: string
	readonly replacement: string
	readonly title: string
	readonly project: string
	readonly expected?: string
}
interface CommandResult {
	readonly code: number | null
	readonly signal: string | null
	readonly stdout: string
	readonly stderr: string
	readonly error?: string
	readonly selection?: string
}
const USAGE = 'Usage: node mutations.ts --targets FILE --report FILE -- RUNNER ARGS...'
function normalizeTitle(title: string): string {
	return title
		.replace(/\s*>\s*/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function readSelection(
	report: string,
	title: string,
	code: number | null,
	expected?: string,
): string | undefined {
	const status = code === 1 ? 'failed' : 'passed'
		try {
			const value: unknown = JSON.parse(readFileSync(report, 'utf8'))
			if (!isRecord(value) || !Array.isArray(value.testResults)) return 'Invalid runner JSON report'
			const assertions = value.testResults.flatMap((suite) =>
				isRecord(suite) && Array.isArray(suite.assertionResults) ? suite.assertionResults : [],
			)
			const selected = assertions.filter(
				(entry) => isRecord(entry) && ['passed', 'failed'].includes(String(entry.status)),
			)
			if (selected.length === 0) return 'Empty selection: 0 tests ran'
			const entry = selected[0]
			if (selected.length !== 1 || !isRecord(entry)) return 'Expected exactly one selected case'
			const name =
				Array.isArray(entry.ancestorTitles) && typeof entry.title === 'string'
					? [...entry.ancestorTitles, entry.title].join(' ')
					: entry.fullName
			if (typeof name !== 'string' || normalizeTitle(name) !== normalizeTitle(title))
				return 'Runner selected a different case'
			if (entry.status !== status) return `Selected case must be ${status}`
			if (
				code === 1 && expected !== undefined &&
				(!Array.isArray(entry.failureMessages) ||
					!entry.failureMessages.some((message) => typeof message === 'string' && message.includes(expected)))
			) return 'Red run failed outside the targeted assertion'
			if (
				assertions.some(
					(assertion) =>
						!isRecord(assertion) ||
						!['failed', 'passed', 'skipped', 'pending'].includes(String(assertion.status)),
				)
			)
				return 'Unselected cases must be skipped or pending'
			const pending = assertions.length - selected.length
			const failed = status === 'failed' ? 1 : 0
			const passed = status === 'passed' ? 1 : 0
			if (
				value.numTotalTests !== passed + failed + pending ||
				value.numPendingTests !== pending ||
				value.numFailedTests !== failed ||
				value.numPassedTests !== passed
			)
				return 'Runner JSON counts disagree with the selected case'
			return undefined
		} catch (error) {
			return `Unreadable runner JSON report: ${String(error)}`
		}
}
function isTarget(value: unknown): value is Target {
	return (
		typeof value === 'object' &&
		value !== null &&
		'file' in value &&
		typeof value.file === 'string' &&
		value.file.length > 0 &&
		'search' in value &&
		typeof value.search === 'string' &&
		value.search.length > 0 &&
		'replacement' in value &&
		typeof value.replacement === 'string' &&
		value.replacement !== value.search &&
		'title' in value &&
		typeof value.title === 'string' &&
		value.title.length > 0 &&
		'project' in value &&
		typeof value.project === 'string' &&
		value.project.length > 0 &&
		(!('expected' in value) || (typeof value.expected === 'string' && value.expected.length > 0))
	)
}
class Mutations {
	#command: string
	#arguments: readonly string[]
	#report: string
	#active: { readonly file: string; readonly bytes: Buffer } | undefined
	#child: ChildProcess | undefined
	#signal: string | undefined
	#count = 0
	constructor(command: string, arguments_: readonly string[], report: string) {
		this.#command = command
		this.#arguments = arguments_
		this.#report = report
	}
	async execute(targets: readonly Target[]): Promise<void> {
		process.on('SIGTERM', () => this.#abort('SIGTERM'))
		process.on('SIGINT', () => this.#abort('SIGINT'))
		const results: unknown[] = []
		let passed = true
		for (const target of targets) {
			let red: CommandResult | undefined
			let green: CommandResult | undefined
			let restored = false
			let error: string | undefined
			try {
				if (this.#signal !== undefined) throw new Error(`Interrupted by ${this.#signal}`)
				const original = readFileSync(target.file)
				const search = Buffer.from(target.search)
				const offset = original.indexOf(search)
				if (offset < 0 || original.indexOf(search, offset + 1) >= 0)
					throw new Error('Search must occur exactly once')
				this.#active = { file: target.file, bytes: original }
				try {
					writeFileSync(
						target.file,
						Buffer.concat([
							original.subarray(0, offset),
							Buffer.from(target.replacement),
							original.subarray(offset + search.length),
						]),
					)
					red = await this.#invoke(target)
				} finally {
					restored = this.#restore()
				}
				if (this.#signal !== undefined) throw new Error(`Interrupted by ${this.#signal}`)
				this.#active = { file: target.file, bytes: original }
				green = await this.#invoke(target)
				if (red.selection !== undefined || green.selection !== undefined)
					throw new Error(
						`Selection refused: red=${red.selection ?? 'valid'}; green=${green.selection ?? 'valid'}`,
					)
				restored = readFileSync(target.file).equals(original)
				if (!restored) {
					writeFileSync(target.file, original)
					throw new Error('Green runner changed target bytes; restored original')
				}
			} catch (cause) {
				error = String(cause)
			} finally {
				if (this.#active !== undefined) restored = this.#restore()
			}
			const success =
				error === undefined &&
				restored &&
				red?.code === 1 &&
				red.error === undefined &&
				red.signal === null &&
				green?.code === 0 &&
				green.error === undefined &&
				green.signal === null
			passed &&= success
			results.push({ target, red, green, restored, success, error })
			writeFileSync(this.#report, JSON.stringify({ success: passed, results }, null, 2) + '\n')
		}
		process.exitCode = passed ? 0 : 66
	}
	#restore(): boolean {
		const active = this.#active
		if (active === undefined) return true
		writeFileSync(active.file, active.bytes)
		if (!readFileSync(active.file).equals(active.bytes))
			throw new Error(`Byte restoration failed: ${active.file}`)
		this.#active = undefined
		return true
	}
	#abort(signal: 'SIGTERM' | 'SIGINT'): void {
		this.#signal = signal
		this.#child?.kill(signal)
		this.#restore()
	}
	#invoke(target: Target): Promise<CommandResult> {
		const prefix = `${this.#report}.${this.#count++}`
		const output = openSync(`${prefix}.stdout.log`, 'wx')
		const errors = openSync(`${prefix}.stderr.log`, 'wx')
		const report = `${prefix}.runner.json`
		return new Promise((complete) => {
			let error: string | undefined
			const child = spawn(
				this.#command,
				[
					...this.#arguments.map((argument) =>
						argument.startsWith('--outputFile=')
							? `--outputFile=${report}`
							: argument,
					),
					'--testNamePattern',
					`^${normalizeTitle(target.title).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
					'--project',
					target.project,
				],
				{ shell: false, stdio: ['ignore', output, errors] },
			)
			this.#child = child
			child.on('error', (cause) => {
				error = String(cause)
			})
			child.on('close', (code, signal) => {
				closeSync(output)
				closeSync(errors)
				this.#child = undefined
				complete({
					code,
					signal,
					stdout: readFileSync(`${prefix}.stdout.log`, 'utf8'),
					stderr: readFileSync(`${prefix}.stderr.log`, 'utf8'),
					error,
					selection: readSelection(
						report,
						target.title,
						code,
						target.expected,
					),
				})
			})
		})
	}
}
async function main(): Promise<void> {
	const arguments_ = process.argv.slice(2)
	const separator = arguments_.indexOf('--')
	const options = new Map<string, string>()
	for (let index = 0; index < (separator < 0 ? arguments_.length : separator); index += 2) {
		const flag = arguments_[index]
		const value = arguments_[index + 1]
		if (
			flag === undefined ||
			!['--targets', '--report'].includes(flag) ||
			!value ||
			value.startsWith('--')
		) {
			console.error(`${USAGE}\n${flag ?? 'argument'}: expected --targets FILE or --report FILE`)
			process.exitCode = 64
			return
		}
		if (!options.has(flag)) options.set(flag, value)
	}
	const source = options.get('--targets')
	const report = options.get('--report')
	const command = arguments_[separator + 1]
	if (separator < 0 || separator % 2 !== 0 || !command || !source || !report) {
		console.error(USAGE)
		process.exitCode = 64
		return
	}
	try {
		const collision = existsSync(report)
			? report
			: readdirSync(dirname(resolve(report))).find((name) =>
					name.startsWith(`${basename(report)}.`),
				)
		if (collision !== undefined) {
			console.error(`${USAGE}\n--report FILE or log prefix exists: ${collision}`)
			process.exitCode = 64
			return
		}
		const prefix = arguments_.slice(separator + 2)
		if (
			!(
				prefix.includes('--reporter=json') &&
				prefix.some(
					(argument) =>
						argument.startsWith('--outputFile=') && argument.length > '--outputFile='.length,
				)
			)
		) {
			console.error(
				`${USAGE}\nRUNNER ARGS must include --reporter=json --outputFile=FILE`,
			)
			process.exitCode = 64
			return
		}
		const targets: unknown = JSON.parse(readFileSync(source, 'utf8'))
		if (
			!Array.isArray(targets) ||
			targets.length === 0 ||
			!targets.every(isTarget) ||
			targets.some((target) => resolve(target.file) === resolve(report)) ||
			resolve(source) === resolve(report)
		) {
			console.error(USAGE)
			process.exitCode = 64
			return
		}
		await new Mutations(command, arguments_.slice(separator + 2), report).execute(targets)
	} catch (error) {
		console.error(error)
		process.exitCode = 66
	}
}
await main()
