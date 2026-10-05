// Usage: node run.ts --folder DIR --kind journey|command --cwd DIR -- COMMAND ARGS...
// Exit: child's code (128 + signal number on signal); 64 usage; 65 reused folder,
// stale/missing evidence or sampler failure; 1 other I/O; 127 spawn failure.
// Self-contained instrument: the brief permits node: imports only.
import type { ChildProcess } from 'node:child_process'
import { spawn, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
	closeSync,
	copyFileSync,
	existsSync,
	mkdirSync,
	openSync,
	readFileSync,
	readdirSync,
	realpathSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { constants } from 'node:os'
import { dirname, extname, isAbsolute, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

interface RunnerOptions {
	readonly folder: string
	readonly category: string
	readonly cwd: string
	readonly command: string
	readonly arguments: readonly string[]
}
const USAGE = 'Usage: node run.ts --folder DIR --kind journey|command --cwd DIR -- COMMAND ARGS...'
const ROOT = dirname(fileURLToPath(import.meta.url))
function resolveCanonical(path: string): string {
	let ancestor = path
	while (!existsSync(ancestor)) ancestor = dirname(ancestor)
	return resolve(realpathSync(ancestor), relative(ancestor, path))
}
function readBrowser(folder: string): unknown {
	const environment = Object.fromEntries(
		['PLAYWRIGHT_BROWSERS_PATH', 'PLAYWRIGHT_EXECUTABLE_PATH', 'PLAYWRIGHT_CHANNEL'].map((key) => [
			key,
			process.env[key] ?? null,
		]),
	)
	// Endpoints can carry credentials; only their presence belongs in evidence.
	environment.PLAYWRIGHT_WS_ENDPOINT = process.env.PLAYWRIGHT_WS_ENDPOINT
		? '<configured; redacted>'
		: null
	const executable = '/opt/pw-browsers/chromium'
	const stdout = openSync(join(folder, 'chromium.stdout.log'), 'wx')
	const stderr = openSync(join(folder, 'chromium.stderr.log'), 'wx')
	const version = existsSync(executable)
		? spawnSync(executable, ['--version'], {
				shell: false,
				timeout: 5000,
				stdio: ['ignore', stdout, stderr],
			})
		: undefined
	closeSync(stdout)
	closeSync(stderr)
	return {
		environment,
		bundled: existsSync(executable) ? realpathSync(executable) : undefined,
		version: readFileSync(join(folder, 'chromium.stdout.log'), 'utf8').trim(),
		code: version?.status,
		error: version?.error?.message,
		resolution:
			'Bundled fallback observation only; the Vitest resolver imports non-node packages and is not executed. Overrides and pinned Playwright may select another executable.',
	}
}
function writeManifest(folder: string): void {
	const hashes: Record<string, string> = {}
	const pending = ['']
	while (pending.length > 0) {
		const directory = pending.pop()
		if (directory === undefined) break
		for (const entry of readdirSync(join(folder, directory), { withFileTypes: true })) {
			const name = join(directory, entry.name)
			if (entry.isDirectory()) pending.push(name)
			else if (name !== 'manifest.json')
				hashes[name] = createHash('sha256')
					.update(readFileSync(join(folder, name)))
					.digest('hex')
		}
	}
	writeFileSync(
		join(folder, 'manifest.json'),
		JSON.stringify({ algorithm: 'sha256', excludes: ['manifest.json'], files: hashes }, null, 2) +
			'\n',
	)
}
class Runner {
	#options: RunnerOptions
	#child: ChildProcess | undefined
	#sampler: ChildProcess | undefined
	#signal: NodeJS.Signals | undefined
	constructor(options: RunnerOptions) {
		this.#options = options
	}
	async execute(): Promise<void> {
		const options = this.#options
		const start = Date.now()
		const errors: string[] = []
		let code = 65
		let signal: NodeJS.Signals | null = null
		let sampling: Promise<number> | undefined
		process.on('SIGTERM', () => this.#abort('SIGTERM'))
		process.on('SIGINT', () => this.#abort('SIGINT'))
		writeFileSync(
			join(options.folder, 'start.json'),
			JSON.stringify(
				{
					timestamp: new Date(start).toISOString(),
					argv: [options.command, ...options.arguments],
					cwd: options.cwd,
					category: options.category,
					browser: readBrowser(options.folder),
				},
				null,
				2,
			) + '\n',
		)
		try {
			if (options.category === 'journey') {
				const descriptor = openSync(join(options.folder, 'sampler.stderr.log'), 'wx')
				this.#sampler = spawn(
					process.execPath,
					[
						join(ROOT, `measure${extname(fileURLToPath(import.meta.url))}`),
						'--interval',
						'100',
						'--tree',
						String(process.pid),
						'--out',
						join(options.folder, 'measure.jsonl'),
					],
					{ shell: false, stdio: ['ignore', 'ignore', descriptor, 'ipc'] },
				)
				closeSync(descriptor)
				const sampler = this.#sampler
				sampling = new Promise((complete) => {
					sampler.on('error', () => complete(1))
					sampler.on('close', (status) => complete(status ?? 1))
				})
				await new Promise<void>((complete, refuse) => {
					sampler.once('message', () => complete())
					sampler.once('error', refuse)
					sampler.once('exit', () => {
						this.#child?.kill('SIGTERM')
						refuse(new Error('Sampler exited before readiness'))
					})
				})
			}
			if (this.#signal !== undefined) throw new Error(`Interrupted by ${this.#signal}`)
			const stdout = openSync(join(options.folder, 'stdout.log'), 'wx')
			const stderr = openSync(join(options.folder, 'stderr.log'), 'wx')
			try {
				const result = await new Promise<{
					readonly code: number
					readonly signal: NodeJS.Signals | null
				}>((complete) => {
					const child = spawn(options.command, [...options.arguments], {
						cwd: options.cwd,
						shell: false,
						stdio: ['ignore', stdout, stderr],
					})
					this.#child = child
					child.on('error', (error) => {
						errors.push(String(error))
					})
					child.on('close', (status, killed) =>
						complete({
							code:
								status !== null && status >= 0
									? status
									: killed === null
										? 127
										: 128 + constants.signals[killed],
							signal: killed,
						}),
					)
				})
				code = result.code
				signal = result.signal
			} finally {
				closeSync(stdout)
				closeSync(stderr)
				this.#child = undefined
			}
		} catch (error) {
			errors.push(String(error))
		} finally {
			this.#sampler?.kill('SIGTERM')
			if (sampling !== undefined && (await sampling) !== 0) errors.push('Sampler failed')
		}
		const end = Date.now()
		if (options.category === 'journey') {
			try {
				const report = join(options.folder, 'report.json')
				if (statSync(report).mtimeMs < start) throw new Error(`Stale artifact: ${report}`)
				const artifacts = readdirSync(join(options.cwd, 'tmp/journey'))
					.filter((name) => name.endsWith('.txt'))
					.sort()
				if (artifacts.join(',') !== 'dark-1280.txt,dark-390.txt,light-1280.txt,light-390.txt')
					throw new Error('Expected the four journey variant artifacts')
				mkdirSync(join(options.folder, 'journey'))
				for (const name of artifacts) {
					const source = join(options.cwd, 'tmp/journey', name)
					if (statSync(source).mtimeMs < start) throw new Error(`Stale artifact: ${source}`)
					copyFileSync(source, join(options.folder, 'journey', name))
				}
			} catch (error) {
				errors.push(String(error))
			}
		}
		const exit = errors.length > 0 && code !== 127 ? 65 : code
		writeFileSync(
			join(options.folder, 'end.json'),
			JSON.stringify(
				{
					timestamp: new Date(end).toISOString(),
					seconds: (end - start) / 1000,
					child: { code, signal },
					exit,
					errors,
				},
				null,
				2,
			) + '\n',
		)
		writeManifest(options.folder)
		process.exitCode = exit
	}
	#abort(signal: NodeJS.Signals): void {
		this.#signal = signal
		this.#child?.kill(signal)
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
			!['--folder', '--kind', '--cwd'].includes(flag) ||
			!value ||
			value.startsWith('--')
		) {
			console.error(
				`${USAGE}\n${flag ?? 'argument'}: expected --folder DIR, --kind journey|command, or --cwd DIR`,
			)
			process.exitCode = 64
			return
		}
		if (!options.has(flag)) options.set(flag, value)
	}
	const folder = options.get('--folder')
	const category = options.get('--kind')
	const cwd = options.get('--cwd')
	const command = arguments_[separator + 1]
	if (
		separator < 0 ||
		separator % 2 !== 0 ||
		!folder ||
		!cwd ||
		!command ||
		(category !== 'journey' && category !== 'command')
	) {
		console.error(
			`${USAGE}\nRequired: --folder DIR, --kind journey|command, --cwd DIR, and -- COMMAND ARGS...`,
		)
		process.exitCode = 64
		return
	}
	const destination = resolve(folder)
	const containment = relative(join(ROOT, 'runs'), destination)
	const gate = relative(join(ROOT, 'gates'), destination)
	const admitted =
		category === 'command' &&
		!gate.startsWith('..') &&
		!isAbsolute(gate) &&
		gate.split(/[\\/]/).length === 2
	if ((!containment || containment.startsWith('..') || isAbsolute(containment)) && !admitted) {
		console.error(
			`${USAGE}\n--folder DIR must be beneath ${join(ROOT, 'runs')}; command also admits ROOT/gates/COMMIT/NAME`,
		)
		process.exitCode = 64
		return
	}
	if (
		category === 'journey' &&
		!arguments_
			.slice(separator + 2)
			.some(
				(argument) =>
					argument.startsWith('--outputFile=') &&
					resolve(cwd, argument.slice('--outputFile='.length)) === join(destination, 'report.json'),
			)
	) {
		console.error(
			`${USAGE}\nJourney command must pass --outputFile=${join(destination, 'report.json')}`,
		)
		process.exitCode = 64
		return
	}
	try {
		const root = admitted ? dirname(destination) : join(ROOT, 'runs')
		const parent = relative(resolveCanonical(root), resolveCanonical(dirname(destination)))
		const commit = admitted ? relative(resolveCanonical(join(ROOT, 'gates')), resolveCanonical(root)) : ''
		if (parent.startsWith('..') || isAbsolute(parent) || commit.startsWith('..') || isAbsolute(commit)) {
			console.error(`${USAGE}\n--folder DIR escapes its admitted root: ${root}`)
			process.exitCode = 64
			return
		}
		mkdirSync(dirname(destination), { recursive: true })
		try {
			mkdirSync(destination)
		} catch (error) {
			if (error instanceof Error && 'code' in error && error.code === 'EEXIST') {
				console.error(`Run folder exists: ${destination}`)
				process.exitCode = 65
				return
			}
			throw error
		}
		await new Runner({
			folder: destination,
			category,
			cwd: resolve(cwd),
			command,
			arguments: arguments_.slice(separator + 2),
		}).execute()
	} catch (error) {
		console.error(error)
		process.exitCode = 1
	}
}
await main()
