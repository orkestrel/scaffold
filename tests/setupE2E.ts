// The default-HOST end-to-end proof — spawns the BUILT `dist/bin/scaffold.js`
// with NO `--from`, so every command resolves its host root through the
// bin's own default (`hostRoot()`, this package's own vendored `dist/host`),
// never a caller-supplied fixture. `scaffold.test.ts` always passes an
// explicit `--from` (or exercises network-free argument-validation paths only);
// this suite instead runs `new`/`audit`/`repair`/`fleet` the way an installed
// consumer actually would: no `--from`, and `new`/`audit`/`repair` driven
// purely by `cwd`, no `--target`. Assumes the build chain has already run
// (`npm run build` before `npm test` — AGENTS.md §Orientation).
//
// The one deliberate exception is the `generated lean configuration` suite,
// which asserts nothing about host resolution: it materializes each lean
// blueprint through the shared `scaffoldPackage` fixture (and so through an
// explicit `--from`) purely to get a real generated workspace whose emitted
// `vite.config.ts` it can then build, test, and violate.
import type { ChildProcess } from 'node:child_process'
import type { Environment } from '@src/core'
import { fork, spawn, spawnSync } from 'node:child_process'
import {
	copyFileSync,
	existsSync,
	mkdirSync,
	readFileSync,
	realpathSync,
	renameSync,
	rmSync,
	symlinkSync,
	writeFileSync,
} from 'node:fs'
import { dirname, join, relative as pathRelative, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import { stripVTControlCharacters } from 'node:util'
import { isRecord } from '@orkestrel/contract'
import { describe, expect, it } from 'vitest'
import { pascalCase, SCAFFOLD_RANGE } from '@src/core'
import { listFiles } from '@src/server'
import {
	ALLOWED_LINT_SOURCES,
	buildEnvironmentQuartet,
	buildFromFixture,
	canBash,
	canCursorModels,
	cloneGeneratedConsumer,
	HOST_BYTE_EQUAL_PATHS,
	installArchive,
	isExecutable,
	packArchive,
	packFiles,
	prepareGeneratedConsumer,
	REJECTED_LINT_SOURCES,
	resolveToolEntry,
	resolveInstalledBin,
	runDefaultBin,
	runHook,
	runNpmScript,
	scaffoldPackage,
} from './setupBin.js'
import {
	buildTempDirectory,
	canDirectoryLink,
	canSymlink,
	createDirectoryLink,
	WORKSPACE_ROOT,
} from './setupServer.js'

/** Maximum time allowed for a generated Vite child to start or stop. */
export const GENERATED_VITE_SERVER_TIMEOUT = 15_000

/** Maximum time allowed for ONE generated package script in the lean-blueprint gates. */
export const LEAN_SCRIPT_TIMEOUT = 120_000

/** Maximum time allowed for one programmatic generated-workspace boundary build. */
export const BOUNDARY_BUILD_TIMEOUT = 120_000

/** Maximum child stderr suffix retained when a boundary build driver exits unexpectedly. */
export const BOUNDARY_DRIVER_STDERR_LIMIT = 16_384

/** Boundary diagnostic prefix whose complete line identifies a rejected policy. */
export const BOUNDARY_ERROR_MARKER = '[orkestrel-environment-boundary]'

/** Normalized outcome class shared by spawned and programmatic boundary builds. */
export type BoundaryBuildStatus = 'accepted' | 'rejected'

/** Spawn-compatible output used by boundary assertions and equivalence comparison. */
export interface BoundaryBuildOutput {
	readonly status: number | null
	readonly stdout: string
	readonly stderr: string
	readonly error?: { readonly message: string } | undefined
	readonly signal: NodeJS.Signals | null
}

/** Normalized programmatic build output shaped like the existing spawn result. */
export interface BoundaryBuildResult extends BoundaryBuildOutput {
	readonly status: 0 | 1
	readonly signal: null
}

/**
 * Resolve the exact generated Vite config exercised by one boundary npm script.
 *
 * @param script - Generated package script name.
 * @returns Its workspace-relative Vite config path.
 */
export function resolveBoundaryConfig(script: string): string {
	switch (script) {
		case 'build:app:browser':
			return 'configs/app/vite.browser.config.ts'
		case 'build:app:server':
			return 'configs/app/vite.server.config.ts'
		case 'build:src:browser':
			return 'configs/src/vite.browser.config.ts'
		case 'build:src:core':
			return 'configs/src/vite.core.config.ts'
		case 'build:src:server':
			return 'configs/src/vite.server.config.ts'
		default:
			throw new Error(`unsupported boundary build script: ${script}`)
	}
}

/**
 * Classify one spawn-compatible boundary build by the boundary suite's zero/nonzero contract.
 *
 * @param result - Spawned or programmatic build output.
 * @returns Accepted for exit zero, otherwise rejected.
 */
export function classifyBoundaryBuild(result: BoundaryBuildOutput): BoundaryBuildStatus {
	return result.status === 0 ? 'accepted' : 'rejected'
}

/**
 * Extract the complete environment-boundary identity line from build output.
 *
 * @param output - Combined stdout and stderr text.
 * @returns The color-free marker line, or `undefined` when no boundary rejection was reported.
 */
export function extractBoundaryIdentity(output: string): string | undefined {
	for (const line of output.split(/\r?\n/u)) {
		const offset = line.indexOf(BOUNDARY_ERROR_MARKER)
		if (offset >= 0) {
			return stripVTControlCharacters(line.slice(offset)).trimEnd()
		}
	}
	return undefined
}

/**
 * Render an exact spawned-versus-driver equivalence diff.
 *
 * @param reference - Existing npm-script spawn result.
 * @param driver - Persistent IPC driver result.
 * @param message - Boundary message required by the original case assertion.
 * @returns `undefined` for equivalence, otherwise both verdicts, identities, and complete outputs.
 */
export function renderBoundaryDifference(
	reference: BoundaryBuildOutput,
	driver: BoundaryBuildOutput,
	message: string,
): string | undefined {
	const referenceStatus = classifyBoundaryBuild(reference)
	const driverStatus = classifyBoundaryBuild(driver)
	const referenceOutput = `${reference.stdout}${reference.stderr}`
	const driverOutput = `${driver.stdout}${driver.stderr}`
	const referenceIdentity = extractBoundaryIdentity(referenceOutput)
	const driverIdentity = extractBoundaryIdentity(driverOutput)
	const marker = BOUNDARY_ERROR_MARKER.slice(1, -1)
	const referenceMarker = referenceOutput.includes(marker)
	const driverMarker = driverOutput.includes(marker)
	const referenceMessage = referenceOutput.includes(message)
	const driverMessage = driverOutput.includes(message)
	const identitiesDiffer =
		referenceIdentity !== undefined &&
		driverIdentity !== undefined &&
		referenceIdentity !== driverIdentity
	if (
		referenceStatus === driverStatus &&
		referenceMarker === driverMarker &&
		referenceMessage === driverMessage &&
		!identitiesDiffer
	) {
		return undefined
	}
	return [
		`spawn verdict: ${referenceStatus}`,
		`driver verdict: ${driverStatus}`,
		`spawn boundary: ${referenceIdentity ?? 'none'}`,
		`driver boundary: ${driverIdentity ?? 'none'}`,
		'spawn output:',
		referenceOutput,
		'driver output:',
		driverOutput,
	].join('\n')
}

/**
 * Render an unexpected boundary build driver exit with its active case and child diagnostics.
 *
 * @param code - Child process exit code.
 * @param signal - Child process exit signal.
 * @param id - In-flight request id remembered by the parent or reported by the child.
 * @param stack - Structured child failure stack received over IPC.
 * @param stderr - Rolling child stderr suffix captured by the parent.
 * @returns A complete driver-exit diagnostic.
 */
export function renderBoundaryDriverExit(
	code: number | null,
	signal: NodeJS.Signals | null,
	id: number | undefined,
	stack: string | undefined,
	stderr: string,
): string {
	return [
		`boundary build driver exited ${String(code)} (${signal ?? 'no signal'})`,
		`case id: ${id === undefined ? 'none' : String(id)}`,
		`child failure:\n${stack ?? 'none'}`,
		`stderr tail:\n${stderr || 'none'}`,
	].join('\n')
}

/**
 * Persistent IPC owner that performs fresh programmatic Vite builds for one boundary shard.
 *
 * @remarks
 * The child is rooted in the generated workspace, accepts one build at a time, and is destroyed
 * explicitly after the shard. A parent IPC disconnect also terminates the child.
 */
export class BoundaryBuildDriver {
	readonly #child: ChildProcess
	readonly #package: string
	readonly #ready: Promise<void>
	#resolve: (() => void) | undefined
	#reject: ((error: Error) => void) | undefined
	#startup: NodeJS.Timeout | undefined
	#pending:
		| {
				readonly id: number
				readonly resolve: (result: BoundaryBuildResult) => void
				readonly reject: (error: Error) => void
				readonly timeout: NodeJS.Timeout
				readonly result?: { readonly status: 0 | 1; readonly output: string }
		  }
		| undefined
	#destroying:
		| {
				readonly resolve: () => void
				readonly reject: (error: Error) => void
				readonly timeout: NodeJS.Timeout
				readonly error?: Error
		  }
		| undefined
	#failure: Error | undefined
	#crash: { readonly id: number | undefined; readonly stack: string } | undefined
	#diagnostic = ''
	#tail = ''
	#stdout = ''
	#stderr = ''
	#next = 0

	/**
	 * Create one shard driver and begin its cloned-workspace Vite import.
	 *
	 * @param packageDirectory - Fresh generated workspace owned by one boundary shard.
	 */
	constructor(packageDirectory: string) {
		this.#package = packageDirectory
		const driverPath = join(packageDirectory, '.scaffold-boundary-build-driver.mjs')
		copyFileSync(join(WORKSPACE_ROOT, 'tests', 'fixtures', 'boundaryBuildDriver.mjs'), driverPath)
		this.#child = fork(driverPath, [packageDirectory], {
			cwd: packageDirectory,
			stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
		})
		this.#ready = new Promise((resolve, reject) => {
			this.#resolve = resolve
			this.#reject = reject
		})
		this.#startup = setTimeout(() => {
			this.#abort(new Error(`boundary build driver startup timed out\n${this.#diagnostic}`))
		}, GENERATED_VITE_SERVER_TIMEOUT)
		this.#child.stdout?.on('data', (chunk: unknown) => {
			this.#capture('stdout', String(chunk))
		})
		this.#child.stderr?.on('data', (chunk: unknown) => {
			this.#capture('stderr', String(chunk))
		})
		this.#child.on('message', (message: unknown) => {
			this.#receive(message)
		})
		this.#child.once('error', (error) => {
			this.#abort(error)
		})
		this.#child.once('close', (code, signal) => {
			this.#exit(code, signal)
		})
	}

	/**
	 * Execute one generated package build through a fresh Vite builder.
	 *
	 * @param script - Boundary build script whose config determines the environment.
	 * @returns Spawn-compatible status-class and combined output.
	 */
	async build(script: string): Promise<BoundaryBuildResult> {
		await this.#ready
		if (this.#failure !== undefined) throw this.#failure
		if (this.#pending !== undefined) throw new Error('boundary build driver is already building')
		if (this.#destroying !== undefined) throw new Error('boundary build driver is being destroyed')
		const id = this.#next
		this.#next += 1
		const config = join(this.#package, resolveBoundaryConfig(script))
		this.#stdout = ''
		this.#stderr = ''
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				this.#failBuild(
					id,
					new Error(
						`${script} programmatic Vite build timed out\ncase id: ${String(id)}\nstderr tail:\n${this.#tail || 'none'}`,
					),
				)
			}, BOUNDARY_BUILD_TIMEOUT)
			this.#pending = { id, resolve, reject, timeout }
			this.#child.send({ command: 'build', id, config }, (error) => {
				if (error !== null) this.#failBuild(id, error)
			})
		})
	}

	/** Destroy the shard child and wait for its process to exit. */
	async destroy(): Promise<void> {
		try {
			await this.#ready
		} catch (error) {
			this.#terminate()
			throw error
		}
		if (this.#pending !== undefined) {
			this.#abort(new Error('boundary build driver destroyed during an active build'))
		}
		if (this.#failure !== undefined) {
			this.#terminate()
			throw this.#failure
		}
		if (this.#child.exitCode !== null) {
			if (this.#child.exitCode === 0) return
			throw new Error(
				renderBoundaryDriverExit(
					this.#child.exitCode,
					this.#child.signalCode,
					this.#pending?.id ?? this.#crash?.id,
					this.#crash?.stack,
					this.#tail,
				),
			)
		}
		if (this.#destroying !== undefined) {
			throw new Error('boundary build driver is already being destroyed')
		}
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				const pending = this.#destroying
				if (pending === undefined) return
				this.#destroying = {
					...pending,
					error: new Error(`boundary build driver destroy timed out\n${this.#diagnostic}`),
				}
				this.#terminate()
			}, GENERATED_VITE_SERVER_TIMEOUT)
			this.#destroying = { resolve, reject, timeout }
			this.#child.send({ command: 'destroy' }, (error) => {
				if (error !== null) this.#failDestroy(error)
			})
		})
	}

	#receive(message: unknown): void {
		if (!isRecord(message) || typeof message.command !== 'string') {
			this.#abort(new Error(`boundary build driver sent an invalid message\n${this.#diagnostic}`))
			return
		}
		if (message.command === 'ready') {
			if (this.#resolve === undefined) {
				this.#abort(new Error('boundary build driver sent a duplicate ready message'))
				return
			}
			if (this.#startup !== undefined) clearTimeout(this.#startup)
			const resolve = this.#resolve
			this.#startup = undefined
			this.#resolve = undefined
			this.#reject = undefined
			resolve()
			return
		}
		if (message.command === 'failure') {
			if (
				(message.id !== undefined &&
					(typeof message.id !== 'number' || !Number.isSafeInteger(message.id))) ||
				typeof message.stack !== 'string'
			) {
				this.#abort(new Error(`boundary build driver sent an invalid failure\n${this.#diagnostic}`))
				return
			}
			this.#crash = { id: message.id, stack: message.stack }
			return
		}
		if (message.command !== 'result') {
			this.#abort(new Error(`boundary build driver sent an unknown command: ${message.command}`))
			return
		}
		const pending = this.#pending
		if (
			pending === undefined ||
			message.id !== pending.id ||
			(message.status !== 0 && message.status !== 1) ||
			typeof message.output !== 'string'
		) {
			this.#abort(new Error(`boundary build driver sent an invalid result\n${this.#diagnostic}`))
			return
		}
		this.#pending = {
			...pending,
			result: { status: message.status, output: message.output },
		}
		setImmediate(() => {
			this.#completeBuild()
		})
	}

	#failBuild(id: number, error: Error): void {
		const pending = this.#pending
		if (pending === undefined || pending.id !== id) return
		clearTimeout(pending.timeout)
		this.#pending = undefined
		pending.reject(error)
		this.#abort(error)
	}

	#capture(channel: 'stdout' | 'stderr', output: string): void {
		if (channel === 'stderr') {
			this.#tail = `${this.#tail}${output}`.slice(-BOUNDARY_DRIVER_STDERR_LIMIT)
		}
		if (this.#pending === undefined) {
			this.#diagnostic += output
			return
		}
		if (channel === 'stdout') this.#stdout += output
		else this.#stderr += output
	}

	#completeBuild(): void {
		const pending = this.#pending
		const result = pending?.result
		if (pending === undefined || result === undefined) return
		clearTimeout(pending.timeout)
		const stdout = `${result.output}${this.#stdout}`
		const stderr = this.#stderr
		this.#pending = undefined
		this.#stdout = ''
		this.#stderr = ''
		pending.resolve({
			status: result.status,
			stdout,
			stderr,
			error: undefined,
			signal: null,
		})
	}

	#failDestroy(error: Error): void {
		const pending = this.#destroying
		if (pending === undefined) return
		clearTimeout(pending.timeout)
		this.#destroying = undefined
		pending.reject(error)
		this.#terminate()
	}

	#abort(error: Error): void {
		if (this.#failure === undefined) this.#failure = error
		if (this.#startup !== undefined) clearTimeout(this.#startup)
		this.#startup = undefined
		const reject = this.#reject
		this.#resolve = undefined
		this.#reject = undefined
		reject?.(error)
		const pending = this.#pending
		if (pending !== undefined) {
			clearTimeout(pending.timeout)
			this.#pending = undefined
			pending.reject(error)
		}
		const destroying = this.#destroying
		if (destroying !== undefined) {
			clearTimeout(destroying.timeout)
			this.#destroying = undefined
			destroying.reject(error)
		}
		this.#terminate()
	}

	#exit(code: number | null, signal: NodeJS.Signals | null): void {
		const destroying = this.#destroying
		if (destroying !== undefined) {
			clearTimeout(destroying.timeout)
			this.#destroying = undefined
			if (destroying.error !== undefined) destroying.reject(destroying.error)
			else if (code === 0) destroying.resolve()
			else {
				destroying.reject(
					new Error(
						renderBoundaryDriverExit(
							code,
							signal,
							this.#pending?.id ?? this.#crash?.id,
							this.#crash?.stack,
							this.#tail,
						),
					),
				)
			}
			return
		}
		if (code === 0 && this.#failure === undefined) {
			this.#abort(new Error('boundary build driver exited before shutdown'))
			return
		}
		this.#abort(
			this.#failure ??
				new Error(
					renderBoundaryDriverExit(
						code,
						signal,
						this.#pending?.id ?? this.#crash?.id,
						this.#crash?.stack,
						this.#tail,
					),
				),
		)
	}

	#terminate(): void {
		if (this.#child.exitCode === null) this.#child.kill()
	}
}

/**
 * Slack a lean-blueprint gate adds on top of its scripts' own budgets.
 *
 * @remarks
 * Every lean gate's total budget is its script count times
 * {@link LEAN_SCRIPT_TIMEOUT} plus this, so one slow script always surfaces as
 * that script's own timeout — with its stdout and stderr — instead of being
 * swallowed by the surrounding test's deadline.
 */
export const LEAN_SETUP_TIMEOUT = 60_000

/** One boundary violation a lean blueprint's trimmed configuration must still reject. */
export interface LeanRejection {
	readonly path: string
	readonly content: string
	readonly script: string
	readonly message: string
	readonly fixture?: { readonly path: string; readonly content: string }
}

/** One lean blueprint whose trimmed generated configuration must build, test, and still reject. */
export interface LeanBlueprint {
	readonly name: string
	readonly src: readonly Environment[]
	readonly app: readonly Environment[]
	readonly scripts: readonly string[]
	readonly rejections: readonly LeanRejection[]
}

/**
 * The lean blueprints whose generated configuration carries less machinery than
 * the full six-environment workspace.
 *
 * @remarks
 * Every `rejections` entry is the same violation, in the same vocabulary, that
 * the full blueprint's own boundary suite already pins — proving a trimmed
 * configuration still REJECTS rather than merely still running. `core-only`
 * covers the two cases only the module-graph AST audit can catch (a
 * resolution-bypassing dynamic import and an outside-workspace URL reference);
 * `core-server` covers stylesheet rejection from both core and server.
 */
export const LEAN_BLUEPRINTS: readonly LeanBlueprint[] = Object.freeze([
	Object.freeze<LeanBlueprint>({
		name: 'lean-core',
		src: ['core'],
		app: [],
		scripts: ['build', 'test:src'],
		rejections: Object.freeze([
			Object.freeze<LeanRejection>({
				path: 'src/core/index.ts',
				content: "void import(/* @vite-ignore */ 'node:fs')\n",
				script: 'build:src:core',
				message: 'Core modules must remain host-independent',
			}),
			Object.freeze<LeanRejection>({
				path: 'src/core/index.ts',
				content: "void new URL('../../../outside.txt', import.meta.url)\n",
				script: 'build:src:core',
				message: 'Environment modules cannot import files outside the workspace',
			}),
		]),
	}),
	Object.freeze<LeanBlueprint>({
		name: 'lean-core-server',
		src: ['core', 'server'],
		app: [],
		scripts: ['build', 'test:src'],
		rejections: Object.freeze([
			Object.freeze<LeanRejection>({
				path: 'src/core/index.ts',
				content: "import './boundary.pcss'\n",
				script: 'build:src:core',
				message: 'Core modules must remain host-independent',
				fixture: Object.freeze({
					path: 'src/core/boundary.pcss',
					content: 'main { color: red; }\n',
				}),
			}),
			Object.freeze<LeanRejection>({
				path: 'src/server/index.ts',
				content: "import './boundary.pcss'\n",
				script: 'build:src:server',
				message: 'Server modules cannot depend on Vue or browser-only modules',
				fixture: Object.freeze({
					path: 'src/server/boundary.pcss',
					content: 'main { color: red; }\n',
				}),
			}),
		]),
	}),
	Object.freeze<LeanBlueprint>({
		name: 'lean-src-browser',
		src: ['core', 'browser'],
		app: [],
		scripts: ['build', 'test:src'],
		rejections: Object.freeze([]),
	}),
	Object.freeze<LeanBlueprint>({
		name: 'lean-app-core',
		src: [],
		app: ['core'],
		scripts: ['build', 'test:app'],
		rejections: Object.freeze([
			Object.freeze<LeanRejection>({
				path: 'app/core/index.ts',
				content: "void import(/* @vite-ignore */ 'node:fs')\n",
				script: 'test:app',
				message: 'Core modules must remain host-independent',
			}),
		]),
	}),
	Object.freeze<LeanBlueprint>({
		name: 'lean-app-server',
		src: [],
		app: ['server'],
		scripts: ['build', 'test:app'],
		rejections: Object.freeze([]),
	}),
])

/** Marker immediately following the generated browser application's mandatory security prologue. */
export const BROWSER_SECURITY_MARKER = '\t\t<meta charset='

/** Place adversarial HTML after the generated application's mandatory security prologue. */
export function browserDocument(original: string, content: string): string {
	const offset = original.indexOf(BROWSER_SECURITY_MARKER)
	if (offset < 0) throw new Error('generated browser HTML is missing its security prologue')
	return `${original.slice(0, offset)}\t</head>
	<body>
${content}
	</body>
</html>
`
}

/** Self-contained child program that owns and fully unloads a generated package's Vite runtime. */
export const GENERATED_VITE_SERVER_SOURCE = `
import { createServer } from 'vite'

const configFile = process.argv[1]
if (configFile === undefined) throw new Error('missing generated Vite config path')

try {
	const server = await createServer({
		configFile,
		logLevel: 'silent',
		optimizeDeps: { noDiscovery: true, include: [] },
		server: { host: '127.0.0.1', port: 0, strictPort: true },
	})
	await server.listen()
	const address = server.httpServer?.address()
	if (address === null || address === undefined || typeof address === 'string') {
		throw new Error('expected the browser development server to expose a TCP address')
	}
	if (process.send === undefined) throw new Error('generated Vite child requires IPC')
	process.send({ port: address.port })
	process.on('message', async (message) => {
		if (message !== 'close') return
		await server.close()
		process.exit(0)
	})
} catch (error) {
	if (process.send !== undefined) {
		process.send({ error: error instanceof Error ? error.message : 'generated Vite startup failed' })
	}
	process.exit(1)
}
`

/** Live child-process handle for a generated package's loopback Vite server. */
export interface GeneratedViteServerInterface {
	readonly base: string
	readonly close: () => Promise<void>
}

/** Start a generated package's Vite server in a child so Windows can unload its native binding. */
export async function startGeneratedViteServer(
	packageDirectory: string,
	configFile: string,
): Promise<GeneratedViteServerInterface> {
	const child = spawn(
		process.execPath,
		['--input-type=module', '--eval', GENERATED_VITE_SERVER_SOURCE, configFile],
		{
			cwd: packageDirectory,
			stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
			windowsHide: true,
		},
	)
	let output = ''
	child.stdout?.on('data', (chunk: unknown) => {
		output += String(chunk)
	})
	child.stderr?.on('data', (chunk: unknown) => {
		output += String(chunk)
	})
	const port = await new Promise<number>((resolvePromise, rejectPromise) => {
		const timeout = setTimeout(() => {
			child.kill()
			rejectPromise(new Error(`generated Vite startup timed out\n${output}`))
		}, GENERATED_VITE_SERVER_TIMEOUT)
		child.once('error', (error) => {
			clearTimeout(timeout)
			rejectPromise(error)
		})
		child.once('exit', (code) => {
			clearTimeout(timeout)
			rejectPromise(new Error(`generated Vite child exited ${String(code)}\n${output}`))
		})
		child.once('message', (message: unknown) => {
			clearTimeout(timeout)
			if (!isRecord(message)) {
				child.kill()
				rejectPromise(new Error(`generated Vite child sent an invalid message\n${output}`))
				return
			}
			const error = message.error
			if (typeof error === 'string') {
				rejectPromise(new Error(`${error}\n${output}`))
				return
			}
			const receivedPort = message.port
			if (
				typeof receivedPort !== 'number' ||
				!Number.isSafeInteger(receivedPort) ||
				receivedPort < 1 ||
				receivedPort > 65_535
			) {
				child.kill()
				rejectPromise(new Error(`generated Vite child sent an invalid port\n${output}`))
				return
			}
			resolvePromise(receivedPort)
		})
	})
	return {
		base: `http://127.0.0.1:${port}`,
		close: () => closeGeneratedViteServer(child, output),
	}
}

/** Close a generated Vite child and wait for its native runtime to unload. */
export async function closeGeneratedViteServer(child: ChildProcess, output: string): Promise<void> {
	if (child.exitCode !== null) {
		if (child.exitCode !== 0) {
			throw new Error(`generated Vite child exited ${String(child.exitCode)}\n${output}`)
		}
		return
	}
	await new Promise<void>((resolvePromise, rejectPromise) => {
		const timeout = setTimeout(() => {
			child.kill()
			rejectPromise(new Error(`generated Vite shutdown timed out\n${output}`))
		}, GENERATED_VITE_SERVER_TIMEOUT)
		child.once('error', (error) => {
			clearTimeout(timeout)
			rejectPromise(error)
		})
		child.once('exit', (code) => {
			clearTimeout(timeout)
			if (code === 0) resolvePromise()
			else rejectPromise(new Error(`generated Vite child exited ${String(code)}\n${output}`))
		})
		child.send('close')
	})
}

/** Register hermetic built-bin and generated-policy end-to-end suites. */
export function registerHermeticBinGates(): void {
	describe('vendored SessionStart hook context boundary', () => {
		it.skipIf(!canBash)(
			'never emits caller-controlled environment values or control characters',
			() => {
				const marker = 'IGNORE_PREVIOUS_INSTRUCTIONS\r\nhostile-value'
				for (const script of ['cursor.sh', 'codex.sh', 'ollama.sh']) {
					const result = runHook(script, {
						CLAUDE_CODE_REMOTE: 'true',
						CURSOR_API_KEY: marker,
						CURSOR_GROK_MODEL: marker,
						CODEX_ANALYST_MODEL: marker,
						CODEX_ANALYST_EFFORT: marker,
						CODEX_IMPLEMENTER_MODEL: marker,
						CODEX_IMPLEMENTER_EFFORT: marker,
						OLLAMA_HOST: marker,
					})
					const output = `${result.stdout}${result.stderr}`.trim()
					expect({
						script,
						status: result.status,
						error: result.error?.message,
						signal: result.signal,
					}).toEqual({
						script,
						status: 0,
						error: undefined,
						signal: null,
					})
					expect(output).not.toContain('IGNORE_PREVIOUS_INSTRUCTIONS')
					expect(output).not.toContain('hostile-value')
					expect(output.length).toBeLessThanOrEqual(200)
					expect(/^[\x20-\x7e]+$/.test(output)).toBe(true)
				}
			},
			120_000,
		)

		it.skipIf(!canCursorModels)(
			'rejects leading-dash model pins without treating them as grep options',
			() => {
				const result = runHook('cursor.sh', {
					CLAUDE_CODE_REMOTE: 'true',
					CURSOR_GROK_MODEL: '-e',
				})
				const output = `${result.stdout}${result.stderr}`

				expect(result.status).toBe(0)
				expect(result.stderr).toBe('')
				expect(output).toContain('pins invalid')
				expect(output).not.toContain('grep:')
			},
			120_000,
		)
	})

	describe('scaffold bin: default-host end-to-end proof (no --from)', () => {
		describe('new --apply: default-host materialization', () => {
			it('writes host artifacts byte-equal to the repo, executable scripts, a wired package.json, and an interpolated guides-parity drop-in', async () => {
				const cwd = await buildTempDirectory()
				try {
					const created = runDefaultBin(['new', 'demo', '--src', 'core', '--apply'], {
						cwd: cwd.path,
					})
					expect(created.status).toBe(0)

					const packageDirectory = join(cwd.path, 'demo')
					expect(existsSync(packageDirectory)).toBe(true)

					for (const relative of HOST_BYTE_EQUAL_PATHS) {
						expect(readFileSync(join(packageDirectory, relative), 'utf8')).toBe(
							readFileSync(join(WORKSPACE_ROOT, relative), 'utf8'),
						)
					}

					for (const script of ['deps.sh', 'cursor.sh', 'codex.sh', 'ollama.sh']) {
						const path = join(packageDirectory, 'scripts', script)
						expect(existsSync(path)).toBe(true)
						// Windows `stat` carries no execute bit — the mode check is POSIX-only.
						if (process.platform === 'win32') continue
						expect(isExecutable(path)).toBe(true)
					}

					const manifest: unknown = JSON.parse(
						readFileSync(join(packageDirectory, 'package.json'), 'utf8'),
					)
					if (!isRecord(manifest))
						throw new Error('expected package.json to parse to a JSON object')
					const scripts = manifest.scripts
					if (!isRecord(scripts)) throw new Error('expected package.json scripts to be an object')
					expect(scripts.scaffold).toBe('scaffold')
					const devDependencies = manifest.devDependencies
					if (!isRecord(devDependencies)) {
						throw new Error('expected package.json devDependencies to be an object')
					}
					expect(devDependencies['@orkestrel/scaffold']).toBe(SCAFFOLD_RANGE)

					const parityPath = join(packageDirectory, 'tests/guides/src/parity.test.ts')
					expect(existsSync(parityPath)).toBe(true)
					expect(readFileSync(parityPath, 'utf8')).toContain('SELF_SPECIFIERS')
					expect(readFileSync(join(packageDirectory, 'tests/setupGuides.ts'), 'utf8')).toContain(
						'@orkestrel/demo',
					)
				} finally {
					await cwd.cleanup()
				}
			})
		})

		describe('new --apply: explicit development dependencies round-trip through audit', () => {
			it('--extras is an unrecognized flag under the default host too — exit 2, nothing written', async () => {
				const cwd = await buildTempDirectory()
				try {
					const result = runDefaultBin(
						['new', 'demoextras', '--src', 'core', '--apply', '--extras', 'zod@^3.23.0'],
						{ cwd: cwd.path },
					)
					expect(result.status).toBe(2)
					expect(existsSync(join(cwd.path, 'demoextras'))).toBe(false)
				} finally {
					await cwd.cleanup()
				}
			})

			it('a hand-added devDependency lands ONLY in devDependencies and audits clean (deriveBlueprint recompiles the extras round-trip, AGENTS §21) — no --extras involved', async () => {
				const cwd = await buildTempDirectory()
				try {
					const created = runDefaultBin(['new', 'demoextras', '--src', 'core', '--apply'], {
						cwd: cwd.path,
					})
					expect(created.status).toBe(0)

					const packageDirectory = join(cwd.path, 'demoextras')
					const packageJsonPath = join(packageDirectory, 'package.json')
					const manifest: unknown = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
					if (!isRecord(manifest))
						throw new Error('expected package.json to parse to a JSON object')
					const devDependencies = isRecord(manifest.devDependencies) ? manifest.devDependencies : {}
					writeFileSync(
						packageJsonPath,
						`${JSON.stringify(
							{ ...manifest, devDependencies: { ...devDependencies, zod: '^3.23.0' } },
							null,
							'\t',
						)}\n`,
						'utf8',
					)

					const rehydrated: unknown = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
					if (!isRecord(rehydrated))
						throw new Error('expected package.json to parse to a JSON object')
					const rehydratedDevDependencies = rehydrated.devDependencies
					if (!isRecord(rehydratedDevDependencies)) {
						throw new Error('expected package.json devDependencies to be an object')
					}
					expect(rehydratedDevDependencies.zod).toBe('^3.23.0')
					const dependencies = rehydrated.dependencies
					const zodInDependencies = isRecord(dependencies) ? dependencies.zod : undefined
					expect(zodInDependencies).toBeUndefined()

					const audited = runDefaultBin(['audit', '--target', 'demoextras'], { cwd: cwd.path })
					expect(audited.status).toBe(0)
					expect(audited.stdout).not.toContain('drifted')
				} finally {
					await cwd.cleanup()
				}
			}, 30000)
		})

		describe('new --apply: environment variants', () => {
			it('app-only: writes all app environments, a private manifest, and round-trips through audit', async () => {
				const cwd = await buildTempDirectory()
				try {
					const created = runDefaultBin(
						['new', 'demoapp', '--app', 'core,browser,server', '--apply'],
						{ cwd: cwd.path },
					)
					expect(created.status).toBe(0)

					const packageDirectory = join(cwd.path, 'demoapp')
					for (const path of [
						'app/core/index.ts',
						'app/browser/index.html',
						'app/server/main.ts',
						'configs/app/tsconfig.core.json',
						'configs/app/vite.browser.config.ts',
						'configs/app/vite.server.config.ts',
						'tests/app/core/factories.test.ts',
						'tests/app/browser/factories.test.ts',
						'tests/app/server/ApplicationServer.test.ts',
					]) {
						expect({ path, exists: existsSync(join(packageDirectory, path)) }).toEqual({
							path,
							exists: true,
						})
					}
					expect(existsSync(join(packageDirectory, 'src'))).toBe(false)
					const manifest: unknown = JSON.parse(
						readFileSync(join(packageDirectory, 'package.json'), 'utf8'),
					)
					if (!isRecord(manifest)) throw new Error('expected app package.json object')
					expect(manifest.name).toBe('demoapp')
					expect(manifest.private).toBe(true)

					const audited = runDefaultBin(['audit'], { cwd: packageDirectory })
					expect(audited.status).toBe(0)
				} finally {
					await cwd.cleanup()
				}
			})

			it('server-only: writes the src/server quartet, no src/core anywhere, and a vite.config.ts with no srcCore', async () => {
				const cwd = await buildTempDirectory()
				try {
					const created = runDefaultBin(['new', 'demoserver', '--src', 'server', '--apply'], {
						cwd: cwd.path,
					})
					expect(created.status).toBe(0)

					const packageDirectory = join(cwd.path, 'demoserver')
					for (const file of buildEnvironmentQuartet(pascalCase('demoserver'))) {
						expect(existsSync(join(packageDirectory, 'src/server', file))).toBe(true)
					}
					expect(existsSync(join(packageDirectory, 'src/core'))).toBe(false)

					const viteConfig = readFileSync(join(packageDirectory, 'vite.config.ts'), 'utf8')
					expect(viteConfig).not.toContain('srcCore')
				} finally {
					await cwd.cleanup()
				}
			})

			it('triple-environment (core,browser,server): writes all three quartets plus both environment setup files', async () => {
				const cwd = await buildTempDirectory()
				try {
					const created = runDefaultBin(
						['new', 'demotriple', '--src', 'core,browser,server', '--apply'],
						{ cwd: cwd.path },
					)
					expect(created.status).toBe(0)

					const packageDirectory = join(cwd.path, 'demotriple')
					const pascal = pascalCase('demotriple')
					for (const environment of ['core', 'browser', 'server']) {
						for (const file of buildEnvironmentQuartet(pascal)) {
							expect(existsSync(join(packageDirectory, 'src', environment, file))).toBe(true)
						}
					}

					expect(existsSync(join(packageDirectory, 'tests/setup.ts'))).toBe(true)
					expect(existsSync(join(packageDirectory, 'tests/setupServer.ts'))).toBe(true)
					expect(existsSync(join(packageDirectory, 'tests/setupBrowser.ts'))).toBe(true)
				} finally {
					await cwd.cleanup()
				}
			})

			it('proves app-only privacy and mixed-source publication through real npm dry-run packlists', async () => {
				const cwd = await buildTempDirectory()
				try {
					const appCreated = runDefaultBin(
						['new', 'packapp', '--app', 'core,browser,server', '--apply'],
						{ cwd: cwd.path },
					)
					const mixedCreated = runDefaultBin(
						[
							'new',
							'packmixed',
							'--src',
							'core,browser,server',
							'--app',
							'core,browser,server',
							'--apply',
						],
						{ cwd: cwd.path },
					)
					expect({ app: appCreated.status, mixed: mixedCreated.status }).toEqual({
						app: 0,
						mixed: 0,
					})

					const appDirectory = join(cwd.path, 'packapp')
					const mixedDirectory = join(cwd.path, 'packmixed')
					const appOutput = join(appDirectory, 'dist/app/server/main.cjs')
					const sourceOutput = join(mixedDirectory, 'dist/src/core/index.js')
					const privateOutput = join(mixedDirectory, 'dist/app/server/main.cjs')
					for (const path of [appOutput, sourceOutput, privateOutput]) {
						mkdirSync(dirname(path), { recursive: true })
						writeFileSync(path, 'export {}\n', 'utf8')
					}

					const appManifest: unknown = JSON.parse(
						readFileSync(join(appDirectory, 'package.json'), 'utf8'),
					)
					const mixedManifest: unknown = JSON.parse(
						readFileSync(join(mixedDirectory, 'package.json'), 'utf8'),
					)
					if (!isRecord(appManifest) || !isRecord(mixedManifest)) {
						throw new Error('expected generated package manifests')
					}
					expect(appManifest.private).toBe(true)
					expect(appManifest.exports).toBeUndefined()
					expect(packFiles(appDirectory)).toContain('dist/app/server/main.cjs')

					const mixedFiles = packFiles(mixedDirectory)
					expect(mixedManifest.private).toBeUndefined()
					expect(isRecord(mixedManifest.exports)).toBe(true)
					expect(mixedFiles).toContain('dist/src/core/index.js')
					expect(mixedFiles.some((path) => path.startsWith('dist/app/'))).toBe(false)
				} finally {
					await cwd.cleanup()
				}
			}, 60_000)
		})

		it.skipIf(process.platform === 'win32')(
			'fails closed before prune when a discovered filename contains terminal controls',
			async () => {
				const cwd = await buildTempDirectory()
				const hostile = `hostile\n\u001b[2J.md`
				try {
					const created = runDefaultBin(['new', 'hostile-name', '--src', 'core', '--apply'], {
						cwd: cwd.path,
					})
					expect(created.status).toBe(0)
					const packageDirectory = join(cwd.path, 'hostile-name')
					const path = join(packageDirectory, '.claude', 'agents', hostile)
					writeFileSync(path, 'user-owned\n', 'utf8')

					const repaired = runDefaultBin(['repair', '--prune', '--apply'], {
						cwd: packageDirectory,
					})
					const output = `${repaired.stdout}${repaired.stderr}`

					expect(repaired.status).toBe(1)
					expect(output).toContain('Filesystem traversal found a non-portable path')
					expect(output).not.toContain(hostile)
					expect(output).not.toContain('\u001b')
					expect(readFileSync(path, 'utf8')).toBe('user-owned\n')
				} finally {
					await cwd.cleanup()
				}
			},
			120_000,
		)

		describe('single-target round-trip: new -> audit -> drift -> repair -> prune', () => {
			it('audits clean (content-aware) after new --apply, fails once a host file goes missing, repair --apply restores it byte-equal, and repair --apply --prune removes a foreign .claude/agents file', async () => {
				const cwd = await buildTempDirectory()
				try {
					const created = runDefaultBin(['new', 'pkgrt', '--src', 'core', '--apply'], {
						cwd: cwd.path,
					})
					expect(created.status).toBe(0)
					const packageDirectory = join(cwd.path, 'pkgrt')

					const cleanAudit = runDefaultBin(['audit'], { cwd: packageDirectory })
					expect(cleanAudit.status).toBe(0)
					expect(cleanAudit.stdout).toContain('comparing: file contents for host-owned files')

					// `diffPlan` (src/core/helpers.ts) content-compares a HYDRATED
					// `host`-origin artifact — a byte-level mutation of a still-present
					// host file IS now detectable drift (`stale`) — see the AGENTS.md
					// mutation round-trip below for that case. Removing the file
					// (`missing`) is the drift every host-origin artifact can ALWAYS
					// environment, hydrated or not, and still proves the audit -> repair
					// round-trip restores the exact vendored bytes.
					const hostFile = join(packageDirectory, '.editorconfig')
					rmSync(hostFile)

					const driftedAudit = runDefaultBin(['audit'], { cwd: packageDirectory })
					expect(driftedAudit.status).toBe(1)
					expect(driftedAudit.stdout).toContain('host-owned')

					const repaired = runDefaultBin(['repair', '--apply'], { cwd: packageDirectory })
					expect(repaired.status).toBe(0)
					expect(readFileSync(hostFile, 'utf8')).toBe(
						readFileSync(join(WORKSPACE_ROOT, '.editorconfig'), 'utf8'),
					)

					const cleanAgain = runDefaultBin(['audit'], { cwd: packageDirectory })
					expect(cleanAgain.status).toBe(0)

					// Pruning scans its owned directories independently of the host
					// audit. Remove the host file again so one repair proves both
					// restoration and unexpected-file removal.
					rmSync(hostFile)

					const agentsDirectory = join(packageDirectory, '.claude/agents')
					mkdirSync(agentsDirectory, { recursive: true })
					const roguePath = join(agentsDirectory, 'rogue.md')
					writeFileSync(roguePath, '# not a real agent\n')

					const pruned = runDefaultBin(['repair', '--apply', '--prune'], { cwd: packageDirectory })
					expect(pruned.status).toBe(0)
					expect(existsSync(roguePath)).toBe(false)
					expect(readFileSync(hostFile, 'utf8')).toBe(
						readFileSync(join(WORKSPACE_ROOT, '.editorconfig'), 'utf8'),
					)
				} finally {
					await cwd.cleanup()
				}
			}, 60000)

			it('detects byte-level AGENTS.md drift, restores the vendored content, and reports the rerun clean', async () => {
				const cwd = await buildTempDirectory()
				try {
					const created = runDefaultBin(['new', 'demo', '--src', 'core', '--apply'], {
						cwd: cwd.path,
					})
					expect(created.status).toBe(0)
					const packageDirectory = join(cwd.path, 'demo')

					const agentsFile = join(packageDirectory, 'AGENTS.md')
					const original = readFileSync(agentsFile, 'utf8')
					writeFileSync(agentsFile, '# corrupted junk, not the real AGENTS.md\n', 'utf8')

					const driftedAudit = runDefaultBin(['audit', '--target', 'demo'], { cwd: cwd.path })
					expect(driftedAudit.status).toBe(1)
					expect(driftedAudit.stdout).toContain('AGENTS.md')
					expect(driftedAudit.stdout).toContain('drifted')

					const repaired = runDefaultBin(['repair', '--apply', '--target', 'demo'], {
						cwd: cwd.path,
					})
					expect(repaired.status).toBe(0)
					expect(readFileSync(agentsFile, 'utf8')).toBe(original)
					expect(readFileSync(agentsFile, 'utf8')).toBe(
						readFileSync(join(WORKSPACE_ROOT, 'AGENTS.md'), 'utf8'),
					)

					const cleanAudit = runDefaultBin(['audit', '--target', 'demo'], { cwd: cwd.path })
					expect(cleanAudit.status).toBe(0)
				} finally {
					await cwd.cleanup()
				}
			}, 60000)
		})

		describe('fleet round-trip: two fresh scaffolds under the cwd’s immediate children', () => {
			it('fleet is clean right after materializing two fresh scaffolds, fails once one drifts, --apply trues it, and a rerun is clean', async () => {
				const root = await buildTempDirectory()
				try {
					for (const name of ['fleeta', 'fleetb']) {
						const created = runDefaultBin(
							['new', name, '--src', 'core', '--apply', '--target', name],
							{
								cwd: root.path,
							},
						)
						expect(created.status).toBe(0)
					}

					const clean = runDefaultBin(['fleet'], { cwd: root.path })
					expect(clean.status).toBe(0)
					expect(clean.stdout).toContain('fleeta: clean')
					expect(clean.stdout).toContain('fleetb: clean')

					// fleet scopes its plan to `host`-origin artifacts only (excluding
					// `.github/workflows/ci.yml`), and (per the single-target round-trip
					// test above) `diffPlan` audits a `host`-origin artifact by presence
					// only — removing a host file is therefore the drift fleet CAN detect.
					const driftedFile = join(root.path, 'fleeta', '.editorconfig')
					rmSync(driftedFile)

					const drifted = runDefaultBin(['fleet'], { cwd: root.path })
					expect(drifted.status).toBe(1)
					expect(drifted.stdout).toContain('fleeta: 1 missing')
					expect(drifted.stdout).toContain('total: 1 drifted repo, 0 faileds')

					const trued = runDefaultBin(['fleet', '--apply'], { cwd: root.path })
					expect(trued.status).toBe(0)
					expect(trued.stdout).toContain('fleeta: repaired (0 findings remaining)')
					expect(readFileSync(driftedFile, 'utf8')).toBe(
						readFileSync(join(WORKSPACE_ROOT, '.editorconfig'), 'utf8'),
					)

					const rerun = runDefaultBin(['fleet'], { cwd: root.path })
					expect(rerun.status).toBe(0)
					expect(rerun.stdout).toContain('fleeta: clean')
					expect(rerun.stdout).toContain('fleetb: clean')

					// fleet has NO `--root` flag at all — the cd-model IS the interface
					// (`KNOWN_VERBS` / `VERB_FLAGS.fleet` carry no `--root`
					// entry; `parseArguments` (src/bin/scaffold.ts) declares no `root`
					// option, so passing it is a strict `parseArgs` failure).
					const withRoot = runDefaultBin(['fleet', '--root', '.'], { cwd: root.path })
					expect(withRoot.status).toBe(2)
				} finally {
					await root.cleanup()
				}
			}, 60000)
		})

		describe('format-stable by construction: computed JSON survives oxfmt untouched', () => {
			it('a fresh long-name mixed scaffold passes its own vendored oxfmt --check with zero rewrites', async () => {
				const oxfmtEntry = resolveToolEntry('oxfmt', 'oxfmt')
				expect(existsSync(oxfmtEntry)).toBe(true)

				const cwd = await buildTempDirectory()
				try {
					const created = runDefaultBin(
						[
							'new',
							'scaffold-mixed-layer-acceptance',
							'--src',
							'core,browser,server',
							'--app',
							'core,browser,server',
							'--apply',
						],
						{
							cwd: cwd.path,
						},
					)
					expect(created.status).toBe(0)

					const packageDirectory = join(cwd.path, 'scaffold-mixed-layer-acceptance')
					// the vendored `.oxfmtrc.json` this suite's own `format:check` runs
					// under — HOST_PATHS byte-copies it into every scaffold, so the
					// package checks itself against the fleet's own rules, not a
					// hand-picked substitute.
					expect(existsSync(join(packageDirectory, '.oxfmtrc.json'))).toBe(true)

					const check = spawnSync(
						process.execPath,
						[oxfmtEntry, '--config', '.oxfmtrc.json', '--check', '.'],
						{
							cwd: packageDirectory,
							encoding: 'utf8',
							timeout: 30000,
						},
					)
					// A non-zero/null status folds the full spawn diagnostic into the asserted
					// value so a failure names the entry, error, signal, and process output — while
					// staying inside the linter's single-argument `expect` contract.
					const failure =
						check.status === 0
							? ''
							: `oxfmt --check spawn (entry: ${oxfmtEntry}) failed to run to completion — ` +
								`status: ${String(check.status)}, error: ${String(check.error)}, ` +
								`signal: ${String(check.signal)}, stdout: ${check.stdout}, stderr: ${check.stderr}`
					expect(failure).toBe('')
					expect(`${check.stdout}${check.stderr}`).not.toContain('Format issues found')
				} finally {
					await cwd.cleanup()
				}
			}, 60000)
		})

		describe('packed installation', () => {
			it('installs the real archive offline and runs its installed default-host bin', async () => {
				const archives = await buildTempDirectory()
				const consumer = await buildTempDirectory()
				try {
					writeFileSync(
						join(consumer.path, 'package.json'),
						`${JSON.stringify({ name: 'packed-consumer', private: true })}\n`,
						'utf8',
					)
					const archive = packArchive(WORKSPACE_ROOT, archives.path)
					const installed = installArchive(consumer.path, archive)
					expect({
						status: installed.status,
						error: installed.error?.message,
						signal: installed.signal,
					}).toEqual({ status: 0, error: undefined, signal: null })

					const bin = resolveInstalledBin(consumer.path, '@orkestrel/scaffold', 'scaffold')
					const help = spawnSync(process.execPath, [bin], {
						cwd: consumer.path,
						encoding: 'utf8',
						timeout: 15_000,
					})
					expect(help.status).toBe(0)
					expect(help.stdout).toContain('scaffold <verb>')

					const created = spawnSync(
						process.execPath,
						[bin, 'new', 'installed-proof', '--src', 'core', '--app', 'core', '--apply'],
						{
							cwd: consumer.path,
							encoding: 'utf8',
							timeout: 30_000,
						},
					)
					expect(created.status).toBe(0)
					expect(readFileSync(join(consumer.path, 'installed-proof', 'AGENTS.md'), 'utf8')).toBe(
						readFileSync(join(WORKSPACE_ROOT, 'AGENTS.md'), 'utf8'),
					)
				} finally {
					await archives.cleanup()
					await consumer.cleanup()
				}
			}, 180_000)
		})
	})

	describe('generated application dependency direction', () => {
		it('uses native Oxlint policy for declared package, alias, query, and conventional relative imports', async () => {
			const oxlintEntry = resolveToolEntry('oxlint', 'oxlint')
			const cwd = await buildTempDirectory()
			try {
				const created = runDefaultBin(
					[
						'new',
						'isolated-app',
						'--src',
						'core,browser,server',
						'--app',
						'core,browser,server',
						'--apply',
					],
					{ cwd: cwd.path },
				)
				expect(created.status).toBe(0)
				const packageDirectory = join(cwd.path, 'isolated-app')
				for (const testCase of [...REJECTED_LINT_SOURCES, ...ALLOWED_LINT_SOURCES]) {
					const path = join(packageDirectory, testCase.path)
					mkdirSync(dirname(path), { recursive: true })
					writeFileSync(path, testCase.source, 'utf8')
				}

				const rejected = spawnSync(
					process.execPath,
					[
						oxlintEntry,
						'--config',
						'.oxlintrc.json',
						'--deny-warnings',
						...REJECTED_LINT_SOURCES.map((testCase) => testCase.path),
					],
					{ cwd: packageDirectory, encoding: 'utf8', timeout: 15000 },
				)
				const output = `${rejected.stdout}${rejected.stderr}`
				expect(rejected.status).not.toBe(0)
				for (const testCase of REJECTED_LINT_SOURCES) {
					expect(output).toContain(testCase.path)
					expect(output).toContain(testCase.message)
				}

				const allowed = spawnSync(
					process.execPath,
					[
						oxlintEntry,
						'--config',
						'.oxlintrc.json',
						'--deny-warnings',
						...ALLOWED_LINT_SOURCES.map((testCase) => testCase.path),
					],
					{ cwd: packageDirectory, encoding: 'utf8', timeout: 15000 },
				)
				expect(allowed.status).toBe(0)
			} finally {
				await cwd.cleanup()
			}
		}, 60000)

		it.skipIf(!canDirectoryLink)(
			'uses scoped TypeScript projects to reject host globals outside the owning environment',
			async () => {
				const tscEntry = resolveToolEntry('typescript', 'tsc')
				const cwd = await buildTempDirectory()
				try {
					const created = runDefaultBin(
						[
							'new',
							'scoped-app',
							'--src',
							'core,browser,server',
							'--app',
							'core,browser,server',
							'--apply',
						],
						{ cwd: cwd.path },
					)
					expect(created.status).toBe(0)
					const packageDirectory = join(cwd.path, 'scoped-app')
					createDirectoryLink(
						join(WORKSPACE_ROOT, 'node_modules'),
						join(packageDirectory, 'node_modules'),
					)
					const cases = [
						{
							path: 'src/core/rejected-global.mts',
							source: 'void process\nvoid Buffer\n',
							config: 'configs/src/tsconfig.core.json',
						},
						{
							path: 'app/core/rejected-global.mts',
							source: "document.title = 'core escape'\n",
							config: 'configs/app/tsconfig.core.json',
						},
						{
							path: 'app/server/rejected-global.mts',
							source: "document.title = 'server escape'\n",
							config: 'configs/app/tsconfig.server.json',
						},
					]
					for (const testCase of cases) {
						writeFileSync(join(packageDirectory, testCase.path), testCase.source, 'utf8')
						const checked = spawnSync(
							process.execPath,
							[tscEntry, '--noEmit', '--project', testCase.config],
							{ cwd: packageDirectory, encoding: 'utf8', timeout: 30000 },
						)
						expect(checked.status).not.toBe(0)
						expect(`${checked.stdout}${checked.stderr}`.replaceAll('\\', '/')).toContain(
							testCase.path,
						)
						rmSync(join(packageDirectory, testCase.path))
					}
				} finally {
					await cwd.cleanup()
				}
			},
			60000,
		)
	})

	describe('generated lean configuration', () => {
		for (const spec of LEAN_BLUEPRINTS) {
			it.skipIf(!canDirectoryLink)(
				`executes ${spec.name} through its real build and test projects`,
				async () => {
					const from = await buildFromFixture()
					const cwd = await buildTempDirectory()
					try {
						const packageDirectory = scaffoldPackage(cwd.path, spec.name, from.path, {
							src: spec.src,
							app: spec.app,
						})
						createDirectoryLink(
							join(WORKSPACE_ROOT, 'node_modules'),
							join(packageDirectory, 'node_modules'),
						)
						for (const script of spec.scripts) {
							const result = runNpmScript(packageDirectory, script, LEAN_SCRIPT_TIMEOUT)
							const output = `${result.stdout}${result.stderr}`
							expect(result.status, `${spec.name}:${script}\n${output}`).toBe(0)
							expect(result.error?.message).toBeUndefined()
							expect(result.signal).toBeNull()
						}
					} finally {
						await cwd.cleanup()
						await from.cleanup()
					}
				},
				spec.scripts.length * LEAN_SCRIPT_TIMEOUT + LEAN_SETUP_TIMEOUT,
			)
		}

		for (const spec of LEAN_BLUEPRINTS.filter((entry) => entry.rejections.length > 0)) {
			it.skipIf(!canDirectoryLink)(
				`keeps ${spec.name}'s boundary rejecting what the full blueprint rejects`,
				async () => {
					const from = await buildFromFixture()
					const cwd = await buildTempDirectory()
					try {
						const packageDirectory = scaffoldPackage(cwd.path, spec.name, from.path, {
							src: spec.src,
							app: spec.app,
						})
						createDirectoryLink(
							join(WORKSPACE_ROOT, 'node_modules'),
							join(packageDirectory, 'node_modules'),
						)
						writeFileSync(join(cwd.path, 'outside.txt'), 'outside-owned\n', 'utf8')
						const originals = new Map(
							spec.rejections.map((rejection) => [
								rejection.path,
								readFileSync(join(packageDirectory, rejection.path), 'utf8'),
							]),
						)
						for (const rejection of spec.rejections) {
							for (const [path, content] of originals) {
								writeFileSync(join(packageDirectory, path), content, 'utf8')
							}
							if (rejection.fixture !== undefined) {
								writeFileSync(
									join(packageDirectory, rejection.fixture.path),
									rejection.fixture.content,
									'utf8',
								)
							}
							writeFileSync(join(packageDirectory, rejection.path), rejection.content, 'utf8')
							const rejected = runNpmScript(packageDirectory, rejection.script, LEAN_SCRIPT_TIMEOUT)
							const output = `${rejected.stdout}${rejected.stderr}`

							expect(
								rejected.status,
								`${spec.name}:${rejection.script}: ${rejection.content}\n${output}`,
							).not.toBe(0)
							expect(output).toContain('orkestrel-environment-boundary')
							expect(output).toContain(rejection.message)
						}
					} finally {
						await cwd.cleanup()
						await from.cleanup()
					}
				},
				spec.rejections.length * LEAN_SCRIPT_TIMEOUT + LEAN_SETUP_TIMEOUT,
			)
		}

		it.skipIf(!canDirectoryLink)(
			'lets lean-src-browser transform dependency-owned dynamic imports',
			async () => {
				const from = await buildFromFixture()
				const cwd = await buildTempDirectory()
				try {
					const packageDirectory = scaffoldPackage(cwd.path, 'lean-browser-dependency', from.path, {
						src: ['core', 'browser'],
						app: [],
					})
					createDirectoryLink(
						join(WORKSPACE_ROOT, 'node_modules'),
						join(packageDirectory, 'node_modules'),
					)
					const dependency = join(
						packageDirectory,
						'src',
						'browser',
						'node_modules',
						'boundary-exempt',
					)
					mkdirSync(dependency, { recursive: true })
					writeFileSync(
						join(dependency, 'package.json'),
						'{"name":"boundary-exempt","type":"module","exports":"./index.js"}\n',
						'utf8',
					)
					writeFileSync(
						join(dependency, 'index.js'),
						"const target = './value.js'\nvoid import(/* @vite-ignore */ target)\n",
						'utf8',
					)
					writeFileSync(join(dependency, 'value.js'), "export default 'dependency-owned'\n", 'utf8')
					const entry = join(packageDirectory, 'src', 'browser', 'index.ts')
					writeFileSync(entry, `import 'boundary-exempt'\n${readFileSync(entry, 'utf8')}`, 'utf8')

					const built = runNpmScript(packageDirectory, 'build:src:browser', LEAN_SCRIPT_TIMEOUT)
					const output = `${built.stdout}${built.stderr}`
					const failure =
						built.status === 0
							? ''
							: `dependency-owned dynamic import build failed with status ${String(built.status)}\n${output}`
					expect(failure).toBe('')
					expect(output).not.toContain('Dynamic imports must use static string values')
				} finally {
					await cwd.cleanup()
					await from.cleanup()
				}
			},
			LEAN_SCRIPT_TIMEOUT + LEAN_SETUP_TIMEOUT,
		)
	})
}

/** One generated-workspace environment-boundary rejection. */
export interface BoundaryCase {
	readonly path: string
	readonly content: string
	readonly script: string
	readonly message: string
	readonly setupPath?: string
	readonly setupContent?: string
}

/** Read the generated entry bytes restored before every boundary rejection. */
export function buildBoundaryOriginals(packageDirectory: string): ReadonlyMap<string, string> {
	const paths = [
		join(packageDirectory, 'app', 'browser', 'ApplicationView.vue'),
		join(packageDirectory, 'app', 'browser', 'main.ts'),
		join(packageDirectory, 'app', 'browser', 'index.html'),
		join(packageDirectory, 'configs', 'app', 'vite.browser.config.ts'),
		join(packageDirectory, 'app', 'server', 'main.ts'),
		join(packageDirectory, 'src', 'core', 'index.ts'),
		join(packageDirectory, 'src', 'browser', 'index.ts'),
		join(packageDirectory, 'src', 'server', 'index.ts'),
	]
	return new Map(paths.map((path) => [path, readFileSync(path, 'utf8')]))
}

/** Write the shared real files referenced by generated boundary cases. */
export function prepareBoundaryFixtures(packageDirectory: string, generationRoot: string): void {
	const fixtures = new Map([
		[
			join(packageDirectory, 'app', 'server', 'boundary.ts'),
			"const value = 'server'\nexport default value\n",
		],
		[join(packageDirectory, 'app', 'server', 'boundary.js'), "export default 'server'\n"],
		[join(packageDirectory, 'app', 'server', 'boundary.css'), 'body { color: red; }\n'],
		[join(packageDirectory, 'app', 'server', 'boundary.txt'), 'server\n'],
		[join(packageDirectory, 'app', 'server', 'boundary-worker.ts'), "self.postMessage('server')\n"],
		[join(packageDirectory, 'app', 'browser', 'boundary.txt'), 'browser\n'],
		[
			join(packageDirectory, 'src', 'server', 'boundary.ts'),
			"const value = 'server'\nexport default value\n",
		],
		[join(packageDirectory, 'src', 'browser', 'boundary.txt'), 'browser\n'],
	])
	for (const [path, content] of fixtures) writeFileSync(path, content, 'utf8')
	const outsideModule = join(generationRoot, 'outside.ts')
	writeFileSync(outsideModule, "export const outside = 'outside'\n", 'utf8')
	writeFileSync(join(generationRoot, 'outside.js'), "export default 'outside'\n", 'utf8')
	writeFileSync(join(generationRoot, 'outside.css'), 'body { color: blue; }\n', 'utf8')
	mkdirSync(join(generationRoot, 'node_modules'), { recursive: true })
	writeFileSync(join(generationRoot, 'node_modules', 'outside.css'), 'body { color: purple; }\n')
}

/**
 * Build the complete generated-workspace environment-boundary case table.
 *
 * @param packageDirectory - Fresh full-workspace clone.
 * @returns All 128 rejection cases in deterministic order.
 */
export function buildBoundaryCases(packageDirectory: string): readonly BoundaryCase[] {
	const applicationView = join(packageDirectory, 'app', 'browser', 'ApplicationView.vue')
	const browserMain = join(packageDirectory, 'app', 'browser', 'main.ts')
	const browserHtml = join(packageDirectory, 'app', 'browser', 'index.html')
	const browserViteConfig = join(packageDirectory, 'configs', 'app', 'vite.browser.config.ts')
	const browserCss = join(packageDirectory, 'app', 'browser', 'boundary.css')
	const appServerMain = join(packageDirectory, 'app', 'server', 'main.ts')
	const sourceCoreIndex = join(packageDirectory, 'src', 'core', 'index.ts')
	const sourceBrowserIndex = join(packageDirectory, 'src', 'browser', 'index.ts')
	const sourceServerIndex = join(packageDirectory, 'src', 'server', 'index.ts')
	const originals = new Map([
		[applicationView, readFileSync(applicationView, 'utf8')],
		[browserMain, readFileSync(browserMain, 'utf8')],
		[browserHtml, readFileSync(browserHtml, 'utf8')],
		[browserViteConfig, readFileSync(browserViteConfig, 'utf8')],
		[appServerMain, readFileSync(appServerMain, 'utf8')],
		[sourceCoreIndex, readFileSync(sourceCoreIndex, 'utf8')],
		[sourceBrowserIndex, readFileSync(sourceBrowserIndex, 'utf8')],
		[sourceServerIndex, readFileSync(sourceServerIndex, 'utf8')],
	])
	const mixedCaseFileUrl = pathToFileURL(
		join(packageDirectory, 'app', 'server', 'boundary.txt'),
	).href.replace(/^file:/u, 'FiLe:')
	const boundaryCases: readonly BoundaryCase[] = [
		{
			path: sourceCoreIndex,
			content: "import 'data:text/javascript,export default globalThis.process'\n",
			script: 'build:src:core',
			message: 'Environment modules cannot import non-Node URL schemes',
		},
		{
			path: sourceCoreIndex,
			content: "void import(/* @vite-ignore */ 'node:fs')\n",
			script: 'build:src:core',
			message: 'Core modules must remain host-independent',
		},
		{
			path: sourceCoreIndex,
			content: "import './boundary.pcss'\n",
			setupPath: join(packageDirectory, 'src', 'core', 'boundary.pcss'),
			setupContent: 'main { color: red; }\n',
			script: 'build:src:core',
			message: 'Core modules must remain host-independent',
		},
		{
			path: sourceServerIndex,
			content: "import './boundary.pcss'\n",
			setupPath: join(packageDirectory, 'src', 'server', 'boundary.pcss'),
			setupContent: 'main { color: red; }\n',
			script: 'build:src:server',
			message: 'Server modules cannot depend on Vue or browser-only modules',
		},
		{
			path: applicationView,
			content: '<script src="../server/boundary.ts"></script><template><main></main></template>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: applicationView,
			content: '<template src="../server/boundary.txt"></template>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: applicationView,
			content: '<i18n src="../server/boundary.txt"></i18n><template><main /></template>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: applicationView,
			content: '<script src="../../../outside.ts"></script><template><main></main></template>\n',
			script: 'build:app:browser',
			message: 'Environment modules cannot import files outside the workspace',
		},
		{
			path: applicationView,
			content:
				'<script setup lang="ts">void import(`fs`)</script><template><main></main></template>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: applicationView,
			content:
				'<script setup lang="ts">void import(`@app/server`)</script><template><main></main></template>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: "void import(/* @vite-ignore */ 'node:fs')\n",
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: "void import(/* @vite-ignore */ 'data:text/javascript,export default 1')\n",
			script: 'build:app:browser',
			message: 'Environment modules cannot import non-Node URL schemes',
		},
		{
			path: browserMain,
			content: "void import(/* @vite-ignore */ '@app/server')\n",
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: "void import(/* @vite-ignore */ './%2e%2e/server/boundary.ts')\n",
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: "void import(/* @vite-ignore */ '..\\\\server/boundary.ts')\n",
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import ${JSON.stringify(mixedCaseFileUrl)}\n`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `void import(/* @vite-ignore */ ${JSON.stringify(mixedCaseFileUrl)})\n`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `void new URL(${JSON.stringify(mixedCaseFileUrl)}, import.meta.url)\n`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: "const target = '../server/boundary.ts'\nvoid import(/* @vite-ignore */ target)\n",
			script: 'build:app:browser',
			message: 'Dynamic imports must use static string values',
		},
		{
			path: applicationView,
			content:
				'<script setup lang="ts">const target = "../server/boundary.ts"; void import(/* @vite-ignore */ target)</script><template><main /></template>\n',
			script: 'build:app:browser',
			message: 'Dynamic imports must use static string values',
		},
		{
			path: applicationView,
			content:
				'<script setup lang="ts">const target = "../server/boundary.txt"; void new URL(target, import.meta.url)</script><template><main /></template>\n',
			script: 'build:app:browser',
			message: 'Asset URLs must use static string values',
		},
		{
			path: applicationView,
			content: '<template><main /></template><style>@import "../server/boundary.css";</style>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: applicationView,
			content:
				'<template><main /></template><style>main { background: url("../server/boundary.txt"); }</style>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="../server/boundary.ts"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script src="../server/boundary.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Classic external scripts are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="MODULE" src="../server/boundary.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Classic external scripts are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="https://app.example/server.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Module script URLs must remain in the local Vite graph',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="ht&#00009tps://app.example/server.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Environment module URLs cannot contain ASCII controls',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="data&#10;:text/javascript,void%200"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Environment module URLs cannot contain ASCII controls',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="java&#13script:void%200"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Environment module URLs cannot contain ASCII controls',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="&#1;https://app.example/server.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Environment module URLs cannot contain ASCII controls',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="&#01https://app.example/server.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Environment module URLs cannot contain ASCII controls',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="&#x1;https://app.example/server.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Environment module URLs cannot contain ASCII controls',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="h&#x74;tps://app.example/server.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Module script URLs must remain in the local Vite graph',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="h&Tab;tps://app.example/server.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Environment module URLs cannot contain ASCII controls',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="//app.example/server.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Module script URLs must remain in the local Vite graph',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="data:text/javascript,void%200"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Module script URLs must remain in the local Vite graph',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="#server"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Module script URLs must remain in the local Vite graph',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><svg><script href="./local.js"></script></svg></body></html>\n',
			script: 'build:app:browser',
			message: 'Classic external scripts are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><svg><script xlink:href="https://app.example/server.js"></script></svg></body></html>\n',
			script: 'build:app:browser',
			message: 'Classic external scripts are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script src="../server/boundary.js"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(\n\tappBrowser({\n\t\thtml: {\n\t\t\tadditionalAssetSources: {\n\t\t\t\tscript: { srcAttributes: ['src'], filter: () => false },\n\t\t\t},\n\t\t},\n\t}),\n)\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script src="../../../outside.js"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Classic external scripts are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module">const target = "../server/boundary.ts"; void import(/* @vite-ignore */ target)</script></body></html>\n',
			script: 'build:app:browser',
			message: 'Dynamic imports must use static string values',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module">void import(/* @vite-ignore */ "node:fs")</script></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module">void import(/* @vite-ignore */ "@app/server")</script></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module">const target = "../server/boundary.txt"; void new URL(/* @vite-ignore */ `./${target}`, import.meta.url)</script></body></html>\n',
			script: 'build:app:browser',
			message: 'Asset URLs must use static string values',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" vite-ignore src="../server/boundary.ts"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script/vite-ignore type="module" src="../server/boundary.ts"></script></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><html><body><img src="../server/boundary.txt"></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><html><body><img src="..\\server/boundary.txt"></body></html>\n',
			script: 'build:app:browser',
			message: 'HTML asset URLs must use forward slashes',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><img vite-ignore src="../server/boundary.txt"></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><img ViTe-IgNoRe src="../server/boundary.txt"></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><img vite-ignore="yes" src="../server/boundary.txt"></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><img title="> vite-ignore is text" vite-ignore src="../server/boundary.txt"></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><!--><img vite-ignore src="../server/boundary.txt">\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><!---><img vite-ignore src="../server/boundary.txt">\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><!-- --!><img vite-ignore src="../server/boundary.txt">\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html>\u0130<img vite-ignore src="../server/boundary.txt">\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><![CDATA[><img vite-ignore src="../server/boundary.txt">]]>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><svg><style>/* preserved foreign style */</style><image vite-ignore href="../server/boundary.txt"></image></svg>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><svg><script/><image vite-ignore href="../server/boundary.txt"/></svg>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><select><style></select><input vite-ignore src="../server/boundary.txt"></style>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><img = vite-ignore src="../server/boundary.txt">\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><script type="module" vite-ignore>void import("@app/server")</script>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><html><body><img src="../server/boundary.txt"></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import type { Plugin } from 'vite'\nimport { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nconst injectIgnore = {\n\tname: 'inject-ignore',\n\ttransformIndexHtml: {\n\t\torder: 'pre',\n\t\thandler: (html: string) => html.replace('<img ', '<img vite-ignore '),\n\t},\n} satisfies Plugin\n\nexport default defineConfig(appBrowser({ plugins: [injectIgnore] }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ worker: { plugins: () => [] } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ build: { rolldownOptions: { external: ['@app/core'], output: { paths: { '@app/core': '../../server/main.cjs' } } } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ build: { rolldownOptions: { output: { banner: 'import \"../../server/main.cjs\"' } } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ css: { transformer: 'postcss', postcss: './postcss.config.js' } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ css: { lightningcss: { visitor: {} } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ experimental: { renderBuiltUrl: () => '../server/main.cjs' } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ ssr: { optimizeDeps: { rolldownOptions: { plugins: [] } } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ build: { createEnvironment: () => undefined } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ dev: { createEnvironment: () => undefined } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ build: { rollupOptions: { plugins: [] } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ build: { rollupOptions: { output: [{ plugins: [] }] } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ build: { rolldownOptions: { output: { plugins: [] } } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ worker: { rolldownOptions: { output: { plugins: [] } } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ worker: { rollupOptions: { output: [{ plugins: [] }] } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ build: { rolldownOptions: { output: [{ plugins: [] }] } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ optimizeDeps: { rolldownOptions: { plugins: [] } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ optimizeDeps: { rollupOptions: { output: { plugins: [] } } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ optimizeDeps: { esbuildOptions: { plugins: [] } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ css: { postcss: { plugins: [] } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ environments: { client: { build: { rolldownOptions: { plugins: [] } } } } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module" src="/main.ts"></script></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(appBrowser({ builder: { buildApp: async () => undefined } }))\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><img %ATTR% src="../server/boundary.txt"></body></html>\n',
			setupPath: browserViteConfig,
			setupContent:
				"import { defineConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(\n\tappBrowser({ define: { 'import.meta.env.ATTR': JSON.stringify('vite-ignore') } }),\n)\n",
			script: 'build:app:browser',
			message: 'Browser configuration overrides are not permitted',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><img/vite-ignore src="../server/boundary.txt"></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><html><body><img src=../server/boundary.txt></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><img src="&#x2e;&#x2e;/server/boundary.txt"></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content: '<!doctype html><html><body><img src="%2e%2e/server/boundary.txt"></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><svg><image xlink:href="../server/boundary.txt"></image></svg></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><head><meta property="og:image" content="../server/boundary.txt"></head></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><head><meta name="msapplication-tileimage" content="../server/boundary.txt"></head></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><img src="../server/boundary.txt?inline"></body></html>\n',
			script: 'build:app:browser',
			message: 'HTML asset URLs cannot force inlining',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><head><link rel="icon" href="../../../outside.css"></head><body></body></html>\n',
			script: 'build:app:browser',
			message: 'Environment modules cannot import files outside the workspace',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><source srcset="../server/boundary.txt 1x"></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module">void new URL("../server/boundary.txt", import.meta.url)</script></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type=module>void new URL("../server/boundary.txt", import.meta.url)</script></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><body><script type="module">new Worker(new URL("../server/boundary-worker.ts", import.meta.url), { type: "module" })</script></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserHtml,
			content:
				'<!doctype html><html><head><style>@import "../server/boundary.css";</style></head><body></body></html>\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: '@import "../server/boundary.css";\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: '@IMPORT "../server/boundary.css";\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: '@import "../../../outside.css";\n',
			script: 'build:app:browser',
			message: 'Environment modules cannot import files outside the workspace',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: '@import "../../../node_modules/outside.css";\n',
			script: 'build:app:browser',
			message: 'Environment modules cannot import files outside the workspace',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: 'main { background: url("../server/boundary.txt"); }\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: 'main { background: url("%2e%2e/server/boundary.txt"); }\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: 'main { background: url("..%5cserver/boundary.txt"); }\n',
			script: 'build:app:browser',
			message: 'Stylesheet asset URLs must use forward slashes',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: 'main { background: URL("../../../outside.css"); }\n',
			script: 'build:app:browser',
			message: 'Environment modules cannot import files outside the workspace',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: 'main { background: u\\72l("../server/boundary.txt"); }\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: 'main { background: image-set(url("../server/boundary.txt") 1x); }\n',
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: `@import "${mixedCaseFileUrl}";\n`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			setupPath: browserCss,
			setupContent: `main { background: url("${mixedCaseFileUrl}"); }\n`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `const marker: string = 'typed'\nvoid marker\nvoid new URL('../server/boundary.txt', import.meta.url)\n${originals.get(browserMain) ?? ''}`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `void new URL(\`../server/boundary.txt\`, import.meta.url)\n${originals.get(browserMain) ?? ''}`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `const assetName = 'boundary'\nvoid new URL(\`../server/\${assetName}.txt\`, import.meta.url)\n${originals.get(browserMain) ?? ''}`,
			script: 'build:app:browser',
			message: 'Asset URLs must use static string values',
		},
		{
			path: browserMain,
			content: `const environment = 'server'\nvoid new URL(\`../\${environment}/boundary.txt\`, import.meta.url)\n${originals.get(browserMain) ?? ''}`,
			script: 'build:app:browser',
			message: 'Asset URLs must use static string values',
		},
		{
			path: browserMain,
			content: `const target = '../server/boundary.txt'\nvoid new URL(target, import.meta.url)\n${originals.get(browserMain) ?? ''}`,
			script: 'build:app:browser',
			message: 'Asset URLs must use static string values',
		},
		{
			path: browserMain,
			content: `void new URL('./%2e%2e/server/boundary.txt', import.meta.url)\n${originals.get(browserMain) ?? ''}`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `void new URL('..\\\\server/boundary.txt', import.meta.url)\n${originals.get(browserMain) ?? ''}`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import './boundary.tsx'\n${originals.get(browserMain) ?? ''}`,
			setupPath: join(packageDirectory, 'app', 'browser', 'boundary.tsx'),
			setupContent:
				"export const view = <main />\nvoid view\nvoid new URL('../server/boundary.txt', import.meta.url)\n",
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `new Worker(new URL('../server/boundary-worker.ts', import.meta.url), { type: 'module' })\n${originals.get(browserMain) ?? ''}`,
			script: 'build:app:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: browserMain,
			content: `import '../../../outside.ts'\n${originals.get(browserMain) ?? ''}`,
			script: 'build:app:browser',
			message: 'Environment modules cannot import files outside the workspace',
		},
		{
			path: appServerMain,
			content: `void new URL('../browser/boundary.txt', import.meta.url)\n${originals.get(appServerMain) ?? ''}`,
			script: 'build:app:server',
			message: 'Server modules cannot depend on Vue or browser-only modules',
		},
		{
			path: appServerMain,
			content: `import './boundary.css'\n${originals.get(appServerMain) ?? ''}`,
			script: 'build:app:server',
			message: 'Server modules cannot depend on Vue or browser-only modules',
		},
		{
			path: sourceBrowserIndex,
			content: `void new URL('../server/boundary.ts', import.meta.url)\n${originals.get(sourceBrowserIndex) ?? ''}`,
			script: 'build:src:browser',
			message: 'Browser modules cannot depend on Node or server-only modules',
		},
		{
			path: sourceServerIndex,
			content: `void new URL('../browser/boundary.txt', import.meta.url)\n${originals.get(sourceServerIndex) ?? ''}`,
			script: 'build:src:server',
			message: 'Server modules cannot depend on Vue or browser-only modules',
		},
	]
	return Object.freeze([
		...boundaryCases.map((testCase) => Object.freeze(testCase)),
		Object.freeze({
			path: browserHtml,
			content:
				'<!doctype html><html><script>globalThis.executed = true</script><head></head><body></body></html>\n',
			script: 'build:app:browser',
			message: 'must preserve the generated security prologue',
		}),
	])
}

/**
 * Select one deterministic half of the boundary matrix.
 *
 * @param cases - Complete ordered boundary case table.
 * @param shard - Zero-based shard index.
 * @returns The selected half without mutating the table.
 */
export function selectBoundaryCases(
	cases: readonly BoundaryCase[],
	shard: 0 | 1,
): readonly BoundaryCase[] {
	const middle = Math.ceil(cases.length / 2)
	return shard === 0 ? cases.slice(0, middle) : cases.slice(middle)
}

/**
 * Execute one boundary shard against a fresh generated workspace.
 *
 * @param packageDirectory - Fresh full-workspace clone.
 * @param cases - Deterministically selected rejection cases.
 * @returns The number of cases actually executed.
 */
export async function executeBoundaryCases(
	packageDirectory: string,
	cases: readonly BoundaryCase[],
): Promise<number> {
	const originals = buildBoundaryOriginals(packageDirectory)
	const browserHtml = join(packageDirectory, 'app', 'browser', 'index.html')
	const browserOriginal = originals.get(browserHtml) ?? ''
	const driver = new BoundaryBuildDriver(packageDirectory)
	const equivalence = process.env.SCAFFOLD_BOUNDARY_EQUIVALENCE === '1'
	let count = 0
	try {
		for (const testCase of cases) {
			for (const [path, content] of originals) writeFileSync(path, content, 'utf8')
			if (testCase.setupPath !== undefined && testCase.setupContent !== undefined) {
				writeFileSync(testCase.setupPath, testCase.setupContent, 'utf8')
			}
			const securedHtml =
				testCase.path === browserHtml &&
				testCase.message !== 'must preserve the generated security prologue'
			const expected = securedHtml
				? browserDocument(browserOriginal, testCase.content)
				: testCase.content
			writeFileSync(testCase.path, expected, 'utf8')
			const written = readFileSync(testCase.path, 'utf8')
			expect(written).toBe(expected)
			if (securedHtml) {
				const offset = browserOriginal.indexOf(BROWSER_SECURITY_MARKER)
				expect(offset).toBeGreaterThan(0)
				expect(written.startsWith(browserOriginal.slice(0, offset))).toBe(true)
				expect(written.split(testCase.content)).toHaveLength(2)
			}
			const reference = equivalence
				? runNpmScript(packageDirectory, testCase.script, BOUNDARY_BUILD_TIMEOUT)
				: undefined
			const rejected = await driver.build(testCase.script)
			if (reference !== undefined) {
				const difference = renderBoundaryDifference(reference, rejected, testCase.message)
				if (difference !== undefined) {
					throw new Error(
						`${testCase.script} boundary equivalence differed for ${testCase.content}\nfixture: ${testCase.setupContent ?? 'none'}\n${difference}`,
					)
				}
			}
			const output = `${rejected.stdout}${rejected.stderr}`
			expect(
				rejected.status,
				`${testCase.script}: ${testCase.content}\nfixture: ${testCase.setupContent ?? 'none'}\n${output}`,
			).not.toBe(0)
			if (!output.includes('orkestrel-environment-boundary')) {
				throw new Error(
					`${testCase.script} returned a non-boundary exit for ${testCase.content}\nfixture: ${testCase.setupContent ?? 'none'}\nstatus: ${String(rejected.status)}\nerror: ${rejected.error?.message ?? 'none'}\nsignal: ${rejected.signal ?? 'none'}\n${output}`,
				)
			}
			if (!output.includes(testCase.message)) {
				throw new Error(
					`${testCase.script} returned the wrong boundary error for ${testCase.content}\n${output}`,
				)
			}
			count += 1
		}
	} finally {
		try {
			for (const [path, content] of originals) writeFileSync(path, content, 'utf8')
		} finally {
			await driver.destroy()
		}
	}
	return count
}

/** Execute the generated consumer's canonical full-workspace lifecycle chain. */
export async function executeGeneratedConsumerGates(root: string): Promise<void> {
	const cwd = await buildTempDirectory()
	try {
		const generationRoot = join(cwd.path, 'app', 'server')
		mkdirSync(generationRoot, { recursive: true })
		const packageDirectory = cloneGeneratedConsumer(root, 'full', generationRoot)
		const manifest = JSON.parse(readFileSync(join(packageDirectory, 'package.json'), 'utf8'))
		if (!isRecord(manifest) || !isRecord(manifest.scripts)) {
			throw new Error('expected generated consumer manifest scripts')
		}
		expect(manifest.scripts.prepublishOnly).toBe(
			'npm run format:check && npm run lint:check && npm run check && npm run build && npm test',
		)
		const result = runNpmScript(packageDirectory, 'prepublishOnly', 600_000)
		const output = `${result.stdout}${result.stderr}`
		expect(
			{
				status: result.status,
				error: result.error?.message,
				signal: result.signal,
			},
			`prepublishOnly lifecycle failure\n${output}`,
		).toEqual({ status: 0, error: undefined, signal: null })
		for (const stage of ['format:check', 'lint:check', 'check', 'build', 'test']) {
			expect(output).toContain(stage)
		}
	} finally {
		await cwd.cleanup()
	}
}

/** Execute non-matrix dependency, development-server, and output-boundary proofs. */
export async function executeGeneratedConsumerDependencies(): Promise<void> {
	const cwd = await buildTempDirectory()
	try {
		const generationRoot = join(cwd.path, 'app', 'server')
		mkdirSync(generationRoot, { recursive: true })
		const packageDirectory = prepareGeneratedConsumer(generationRoot, 'consumer-proof', {
			src: ['core', 'browser', 'server'],
			app: ['core', 'browser', 'server'],
		})
		const baseline = runNpmScript(packageDirectory, 'build', 180_000)
		const baselineOutput = `${baseline.stdout}${baseline.stderr}`
		expect(baseline.status, `build\n${baselineOutput}`).toBe(0)
		const unrelatedPath = join(packageDirectory, 'browser-forbidden.txt')
		const symlinkPath = join(packageDirectory, 'app', 'browser', 'forbidden-link.txt')
		const aliasSymlinkPath = join(packageDirectory, 'app', 'core', 'forbidden-link.txt')
		const sentinel = 'BROWSER_SERVER_SENTINEL_7dd5af41'
		writeFileSync(unrelatedPath, sentinel, 'utf8')
		if (canSymlink) {
			symlinkSync(unrelatedPath, symlinkPath)
			symlinkSync(unrelatedPath, aliasSymlinkPath)
		}
		const viteServer = await startGeneratedViteServer(
			packageDirectory,
			join(packageDirectory, 'configs/app/vite.browser.config.ts'),
		)
		try {
			const browserResponse = await fetch(`${viteServer.base}/main.ts`)
			const browserBody = await browserResponse.text()
			if (browserResponse.status !== 200) {
				throw new Error(`browser entry returned ${String(browserResponse.status)}\n${browserBody}`)
			}
			expect(browserResponse.status).toBe(200)
			for (const path of [
				join(packageDirectory, 'app', 'server', 'main.ts'),
				join(packageDirectory, 'src', 'server', 'index.ts'),
				unrelatedPath,
			]) {
				const route = `/@fs/${path.replaceAll('\\', '/')}`
				const response = await fetch(`${viteServer.base}${route}`)
				expect(response.status).toBe(403)
				expect(await response.text()).toBe('Forbidden\n')
			}
			const symlinkResponses = canSymlink
				? await Promise.all(
						['/forbidden-link.txt', '/@app/core/forbidden-link.txt'].map(async (route) => {
							const response = await fetch(`${viteServer.base}${route}`)
							return { status: response.status, body: await response.text() }
						}),
					)
				: []
			expect(symlinkResponses).toEqual(
				canSymlink
					? [
							{ status: 403, body: 'Forbidden\n' },
							{ status: 403, body: 'Forbidden\n' },
						]
					: [],
			)
		} finally {
			await viteServer.close()
			if (existsSync(symlinkPath)) rmSync(symlinkPath)
			if (existsSync(aliasSymlinkPath)) rmSync(aliasSymlinkPath)
			rmSync(unrelatedPath)
		}
		const linkedRootFailures: boolean[] = []
		if (canDirectoryLink) {
			for (const linked of [
				{
					root: join(packageDirectory, 'app', 'core'),
					target: join(packageDirectory, 'private-core-root'),
				},
				{
					root: join(packageDirectory, 'app', 'browser'),
					target: join(packageDirectory, '..', 'outside-browser-root'),
				},
			]) {
				renameSync(linked.root, linked.target)
				const rootSentinel = join(linked.target, 'root-sentinel.txt')
				writeFileSync(rootSentinel, sentinel, 'utf8')
				createDirectoryLink(linked.target, linked.root)
				let escapedServer: GeneratedViteServerInterface | undefined
				let escapedError: unknown
				try {
					escapedServer = await startGeneratedViteServer(
						packageDirectory,
						join(packageDirectory, 'configs/app/vite.browser.config.ts'),
					)
				} catch (error) {
					escapedError = error
				} finally {
					await escapedServer?.close()
					rmSync(linked.root, { recursive: true, force: true })
					rmSync(rootSentinel)
					renameSync(linked.target, linked.root)
				}
				linkedRootFailures.push(escapedError instanceof Error)
			}
		}
		expect(linkedRootFailures).toEqual(canDirectoryLink ? [true, true] : [])
		expect(
			listFiles(join(packageDirectory, 'dist', 'app')).some((path) => path.endsWith('.map')),
		).toBe(false)
		const unmanagedPublic = join(packageDirectory, 'public')
		mkdirSync(unmanagedPublic)
		writeFileSync(join(unmanagedPublic, 'secret.txt'), 'user-owned\n', 'utf8')
		expect(runNpmScript(packageDirectory, 'build:app:server', 120_000).status).toBe(0)
		expect(
			listFiles(join(packageDirectory, 'dist', 'app', 'server')).some((path) =>
				path.endsWith('secret.txt'),
			),
		).toBe(false)
		rmSync(unmanagedPublic, { recursive: true })

		const hostileVue = join(packageDirectory, 'app', 'browser', 'Hostile.vue')
		const hostileReference = join(packageDirectory, 'app', 'core', 'hostile-reference.ts')
		writeFileSync(
			hostileVue,
			'<script setup lang="ts">const value = {} as object\nvoid value</script>\n',
		)
		writeFileSync(hostileReference, '/// <reference types="node" />\n')
		const policyRejected = runNpmScript(packageDirectory, 'test:policy', 120_000)
		const policyOutput = `${policyRejected.stdout}${policyRejected.stderr}`.replaceAll('\\', '/')
		expect(policyRejected.status).not.toBe(0)
		expect(policyOutput).toContain('app/browser/Hostile.vue')
		expect(policyOutput).toContain('app/core/hostile-reference.ts')
		rmSync(hostileVue)
		rmSync(hostileReference)
		const unusedBoundary = join(packageDirectory, 'app', 'browser', 'unused-boundary.ts')
		writeFileSync(
			unusedBoundary,
			"export { default } from '@app/server'\nvoid import('@app/server')\nrequire('@app/server')\n",
			'utf8',
		)
		const lintRejected = runNpmScript(packageDirectory, 'lint:check', 120_000)
		const lintOutput = `${lintRejected.stdout}${lintRejected.stderr}`.replaceAll('\\', '/')
		expect(lintRejected.status).not.toBe(0)
		expect(lintOutput).toContain('app/browser/unused-boundary.ts')
		expect(lintOutput).toContain('app/browser must not depend on Node or server-only modules')
		rmSync(unusedBoundary)

		const applicationView = join(packageDirectory, 'app', 'browser', 'ApplicationView.vue')
		const browserMain = join(packageDirectory, 'app', 'browser', 'main.ts')
		const browserHtml = join(packageDirectory, 'app', 'browser', 'index.html')
		const browserViteConfig = join(packageDirectory, 'configs', 'app', 'vite.browser.config.ts')
		const appServerMain = join(packageDirectory, 'app', 'server', 'main.ts')
		const sourceCoreIndex = join(packageDirectory, 'src', 'core', 'index.ts')
		const sourceBrowserIndex = join(packageDirectory, 'src', 'browser', 'index.ts')
		const sourceServerIndex = join(packageDirectory, 'src', 'server', 'index.ts')
		const originals = new Map([
			[applicationView, readFileSync(applicationView, 'utf8')],
			[browserMain, readFileSync(browserMain, 'utf8')],
			[browserHtml, readFileSync(browserHtml, 'utf8')],
			[browserViteConfig, readFileSync(browserViteConfig, 'utf8')],
			[appServerMain, readFileSync(appServerMain, 'utf8')],
			[sourceCoreIndex, readFileSync(sourceCoreIndex, 'utf8')],
			[sourceBrowserIndex, readFileSync(sourceBrowserIndex, 'utf8')],
			[sourceServerIndex, readFileSync(sourceServerIndex, 'utf8')],
		])
		const fixtures = new Map([
			[
				join(packageDirectory, 'app', 'server', 'boundary.ts'),
				"const value = 'server'\nexport default value\n",
			],
			[join(packageDirectory, 'app', 'server', 'boundary.js'), "export default 'server'\n"],
			[join(packageDirectory, 'app', 'server', 'boundary.css'), 'body { color: red; }\n'],
			[join(packageDirectory, 'app', 'server', 'boundary.txt'), 'server\n'],
			[
				join(packageDirectory, 'app', 'server', 'boundary-worker.ts'),
				"self.postMessage('server')\n",
			],
			[join(packageDirectory, 'app', 'browser', 'boundary.txt'), 'browser\n'],
			[
				join(packageDirectory, 'src', 'server', 'boundary.ts'),
				"const value = 'server'\nexport default value\n",
			],
			[join(packageDirectory, 'src', 'browser', 'boundary.txt'), 'browser\n'],
		])
		for (const [path, content] of fixtures) writeFileSync(path, content, 'utf8')
		const browserCss = join(packageDirectory, 'app', 'browser', 'boundary.css')
		const outsideModule = join(generationRoot, 'outside.ts')
		writeFileSync(outsideModule, "export const outside = 'outside'\n", 'utf8')
		writeFileSync(join(generationRoot, 'outside.js'), "export default 'outside'\n", 'utf8')
		writeFileSync(join(generationRoot, 'outside.css'), 'body { color: blue; }\n', 'utf8')
		mkdirSync(join(generationRoot, 'node_modules'), { recursive: true })
		writeFileSync(join(generationRoot, 'node_modules', 'outside.css'), 'body { color: purple; }\n')
		const transitiveRoot = join(packageDirectory, 'node_modules', 'transitive-node')
		mkdirSync(transitiveRoot, { recursive: true })
		writeFileSync(
			join(transitiveRoot, 'package.json'),
			'{"name":"transitive-node","type":"module","exports":"./index.js"}\n',
		)
		writeFileSync(
			join(transitiveRoot, 'index.js'),
			"void import(/* @vite-ignore */ 'node:fs')\nexport default null\n",
		)
		for (const [path, content] of originals) writeFileSync(path, content, 'utf8')
		writeFileSync(
			browserMain,
			`import 'transitive-node'\n${originals.get(browserMain) ?? ''}`,
			'utf8',
		)
		expect(runNpmScript(packageDirectory, 'build:app:browser', 120_000).status).toBe(0)
		writeFileSync(browserMain, originals.get(browserMain) ?? '', 'utf8')
		const overriddenOutput = join(generationRoot, 'user-owned-output')
		const overriddenOutputSentinel = join(overriddenOutput, 'sentinel.txt')
		mkdirSync(overriddenOutput)
		writeFileSync(overriddenOutputSentinel, 'preserve\n', 'utf8')
		for (const outputCase of [
			{
				config:
					"import { defineConfig, mergeConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(mergeConfig(appBrowser(), { publicDir: '../server' }))\n",
				message: 'Public directories are disabled',
			},
			{
				config:
					"import { defineConfig, mergeConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(mergeConfig(appBrowser(), { build: { assetsInlineLimit: 100_000 } }))\n",
				message: 'Browser assets must remain external for output auditing',
			},
			{
				config:
					"import { defineConfig, mergeConfig } from 'vite'\nimport { appBrowser } from '../../vite.config'\n\nexport default defineConfig(mergeConfig(appBrowser(), { build: { rolldownOptions: { output: { dir: " +
					JSON.stringify(overriddenOutput) +
					' } } } }))\n',
				message: 'Rolldown output directories and files cannot override',
			},
		]) {
			for (const [path, content] of originals) writeFileSync(path, content, 'utf8')
			writeFileSync(browserViteConfig, outputCase.config, 'utf8')
			const rejected = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
			const output = `${rejected.stdout}${rejected.stderr}`

			expect(rejected.status).not.toBe(0)
			expect(output).toContain('orkestrel-output-boundary')
			expect(output).toContain(outputCase.message)
			expect(readFileSync(overriddenOutputSentinel, 'utf8')).toBe('preserve\n')
			expect(existsSync(join(packageDirectory, 'dist', 'app', 'browser', 'boundary.txt'))).toBe(
				false,
			)
		}
		for (const [path, content] of originals) writeFileSync(path, content, 'utf8')
		writeFileSync(
			appServerMain,
			`import 'transitive-node'\n${originals.get(appServerMain) ?? ''}`,
			'utf8',
		)
		expect(runNpmScript(packageDirectory, 'build:app:server', 120_000).status).toBe(0)
		writeFileSync(appServerMain, originals.get(appServerMain) ?? '', 'utf8')
		const safeCss = join(packageDirectory, 'app', 'browser', 'safe.css')
		writeFileSync(safeCss, 'main { color: green; }\n', 'utf8')
		writeFileSync(
			browserCss,
			'/* @import "../server/boundary.css"; */\n/* url("../server/boundary.txt") */\n@import "./safe.css";\nmain { --example: "url(../server/boundary.txt)"; background: url("./boundary.txt"); }\n',
			'utf8',
		)
		writeFileSync(
			browserMain,
			`import './boundary.css'\n${originals.get(browserMain) ?? ''}`,
			'utf8',
		)
		expect(runNpmScript(packageDirectory, 'build:app:browser', 120_000).status).toBe(0)
		writeFileSync(
			browserHtml,
			browserDocument(
				originals.get(browserHtml) ?? '',
				'<img src="./boundary.txt"><script type="module" src="/main.ts"></script>',
			),
			'utf8',
		)
		writeFileSync(browserMain, originals.get(browserMain) ?? '', 'utf8')
		expect(runNpmScript(packageDirectory, 'build:app:browser', 120_000).status).toBe(0)
		writeFileSync(
			browserHtml,
			browserDocument(
				originals.get(browserHtml) ?? '',
				'<meta name="description" content="100% coverage"><script type="module" src="/main.ts"></script>',
			),
			'utf8',
		)
		expect(runNpmScript(packageDirectory, 'build:app:browser', 120_000).status).toBe(0)
		const overlappingPercentFragment = '<p>%%DEV%% %MISSING%DEV%</p>'
		writeFileSync(
			browserHtml,
			browserDocument(
				originals.get(browserHtml) ?? '',
				`${overlappingPercentFragment}<script type="module" src="/main.ts"></script>`,
			),
			'utf8',
		)
		const overlappingPercentBuild = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		expect(
			overlappingPercentBuild.status,
			`${overlappingPercentBuild.stdout}\n${overlappingPercentBuild.stderr}`,
		).toBe(0)
		expect(
			readFileSync(join(packageDirectory, 'dist', 'app', 'browser', 'index.html'), 'utf8'),
		).toContain(overlappingPercentFragment)
		writeFileSync(browserViteConfig, originals.get(browserViteConfig) ?? '', 'utf8')
		writeFileSync(
			browserHtml,
			browserDocument(
				originals.get(browserHtml) ?? '',
				'<script>const target = "../server/main.cjs"; void import(/* @vite-ignore */ target)</script><script type="module" src="/main.ts"></script>',
			),
			'utf8',
		)
		const classicInlineBuild = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		expect(
			classicInlineBuild.status,
			`${classicInlineBuild.stdout}\n${classicInlineBuild.stderr}`,
		).toBe(0)
		const classicInlineOutput = readFileSync(
			join(packageDirectory, 'dist', 'app', 'browser', 'index.html'),
			'utf8',
		)
		const policyOffset = classicInlineOutput.indexOf('http-equiv="Content-Security-Policy"')
		expect(policyOffset).toBeGreaterThanOrEqual(0)
		expect(policyOffset).toBeLessThan(classicInlineOutput.indexOf('<script>'))
		expect(classicInlineOutput).toContain("script-src 'self'")
		writeFileSync(
			browserHtml,
			browserDocument(
				originals.get(browserHtml) ?? '',
				'<!-- vite-ignore is unsupported --><p title=\'vite-ignore\'>vite-ignore\nis visible text</p><script>globalThis.marker = "</scriptfoo><img vite-ignore src=x>"</script><script><!--<script></script><img vite-ignore src=x>--></script><style>/* </stylefoo><img vite-ignore src=x> */</style><textarea></textareafoo><img vite-ignore src=x></textarea><svg><![CDATA[<b><img vite-ignore src=x>]]></svg><script type="module" src="/main.ts"></script>',
			),
			'utf8',
		)
		const safeHtmlBuild = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		expect(safeHtmlBuild.status, `${safeHtmlBuild.stdout}\n${safeHtmlBuild.stderr}`).toBe(0)
		for (const rawHtml of [
			'<script/>globalThis.marker = "<img vite-ignore src=x>"</script>',
			'<style/>/* <img vite-ignore src=x> */</style>',
			'<textarea/><img vite-ignore src=x></textarea>',
			'<plaintext/><img vite-ignore src=x>',
			'<img == vite-ignore src="./boundary.txt">',
		]) {
			writeFileSync(browserHtml, browserDocument(originals.get(browserHtml) ?? '', rawHtml), 'utf8')
			const rawBuild = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
			expect(rawBuild.status, `${rawBuild.stdout}\n${rawBuild.stderr}`).toBe(0)
		}
		const preservedFragment =
			'<!-- ViTe-IgNoRe vite&#45;ignore vite&#045;ignore vite-ignoredeadbeef vite-ignore0 vite-ignorevite-ignore --><p title="ViTe-IgNoRe vite&#45;ignore">vite-ignoredeadbeef</p>'
		writeFileSync(
			browserHtml,
			browserDocument(originals.get(browserHtml) ?? '', preservedFragment),
			'utf8',
		)
		const preservedBuild = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		expect(preservedBuild.status, `${preservedBuild.stdout}\n${preservedBuild.stderr}`).toBe(0)
		expect(
			readFileSync(join(packageDirectory, 'dist', 'app', 'browser', 'index.html'), 'utf8'),
		).toContain(preservedFragment)
		const entityAsset = join(packageDirectory, 'app', 'browser', 'entity-image.png')
		writeFileSync(entityAsset, 'ENTITY_IMAGE_SENTINEL\n', 'utf8')
		writeFileSync(
			browserHtml,
			browserDocument(
				originals.get(browserHtml) ?? '',
				'<img src="./entity&#45;image.png"><script type="module" src="/main.ts"></script>',
			),
			'utf8',
		)
		const entityAssetBuild = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		expect(entityAssetBuild.status, `${entityAssetBuild.stdout}\n${entityAssetBuild.stderr}`).toBe(
			0,
		)
		const entityAssetOutputRoot = join(packageDirectory, 'dist', 'app', 'browser')
		expect(
			listFiles(entityAssetOutputRoot).some((path) =>
				readFileSync(join(entityAssetOutputRoot, path), 'utf8').includes('ENTITY_IMAGE_SENTINEL'),
			),
		).toBe(true)
		rmSync(entityAsset)
		const ignoredModule = join(packageDirectory, 'app', 'browser', 'vite-ignore.ts')
		const ignoredImage = join(packageDirectory, 'app', 'browser', 'vite-ignore.png')
		const ignoredPoster = join(packageDirectory, 'app', 'browser', 'vite-ignore-poster.png')
		writeFileSync(
			ignoredModule,
			"document.documentElement.dataset.ignoreModule = 'VITE_IGNORE_MODULE_SENTINEL'\n",
			'utf8',
		)
		writeFileSync(ignoredImage, 'VITE_IGNORE_IMAGE_SENTINEL\n', 'utf8')
		writeFileSync(ignoredPoster, 'VITE_IGNORE_POSTER_SENTINEL\n', 'utf8')
		writeFileSync(
			browserHtml,
			browserDocument(
				originals.get(browserHtml) ?? '',
				'<img src="./vite-ignore.png" srcset="./vite-ignore.png 1x"><video poster="./vite-ignore-poster.png"></video><script type="module" src="./vite-ignore.ts"></script>',
			),
			'utf8',
		)
		const ignoredFilenameBuild = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		expect(
			ignoredFilenameBuild.status,
			`${ignoredFilenameBuild.stdout}\n${ignoredFilenameBuild.stderr}`,
		).toBe(0)
		const ignoredFilenameOutputRoot = join(packageDirectory, 'dist', 'app', 'browser')
		const ignoredFilenameOutput = listFiles(ignoredFilenameOutputRoot).map((path) =>
			readFileSync(join(ignoredFilenameOutputRoot, path), 'utf8'),
		)
		for (const resourceSentinel of [
			'VITE_IGNORE_MODULE_SENTINEL',
			'VITE_IGNORE_IMAGE_SENTINEL',
			'VITE_IGNORE_POSTER_SENTINEL',
		]) {
			expect(ignoredFilenameOutput.some((content) => content.includes(resourceSentinel))).toBe(true)
		}
		rmSync(ignoredModule)
		rmSync(ignoredImage)
		rmSync(ignoredPoster)
		const nestedAssets = join(packageDirectory, 'app', 'browser', 'assets')
		mkdirSync(nestedAssets)
		writeFileSync(join(nestedAssets, 'nested.txt'), 'nested\n', 'utf8')
		writeFileSync(
			browserHtml,
			browserDocument(
				originals.get(browserHtml) ?? '',
				'<img src="./assets/nested.txt"><script type="module" src="/main.ts"></script>',
			),
			'utf8',
		)
		expect(runNpmScript(packageDirectory, 'build:app:browser', 120_000).status).toBe(0)
		rmSync(nestedAssets, { recursive: true })
		writeFileSync(browserHtml, originals.get(browserHtml) ?? '', 'utf8')
		writeFileSync(
			browserMain,
			`void new URL('./boundary.txt', import.meta.url)\n${originals.get(browserMain) ?? ''}`,
			'utf8',
		)
		expect(runNpmScript(packageDirectory, 'build:app:browser', 120_000).status).toBe(0)
		for (const [path, content] of originals) writeFileSync(path, content, 'utf8')
		rmSync(browserCss, { force: true })
		rmSync(safeCss, { force: true })

		const packageRoot = join(packageDirectory, 'node_modules', 'path-shape')
		mkdirSync(join(packageRoot, 'src', 'server'), { recursive: true })
		writeFileSync(
			join(packageRoot, 'package.json'),
			'{"name":"path-shape","type":"module","exports":"./index.js"}\n',
		)
		writeFileSync(
			join(packageRoot, 'index.js'),
			"export { default } from './src/server/value.js'\n",
		)
		writeFileSync(
			join(packageRoot, 'src', 'server', 'value.js'),
			"export default 'allowed dependency path'\n",
		)
		writeFileSync(
			browserMain,
			`import value from 'path-shape'\nvoid value\n${originals.get(browserMain) ?? ''}`,
			'utf8',
		)
		expect(runNpmScript(packageDirectory, 'build:app:browser', 120_000).status).toBe(0)
		writeFileSync(
			join(packageRoot, 'index.js'),
			"export { default } from './src/server/value.js'\n",
			'utf8',
		)

		const hoistedModules = join(generationRoot, 'node_modules')
		rmSync(hoistedModules, { recursive: true, force: true })
		renameSync(join(packageDirectory, 'node_modules'), hoistedModules)
		expect(runNpmScript(packageDirectory, 'build:app:browser', 120_000).status).toBe(0)
	} finally {
		await cwd.cleanup()
	}
}

/** Execute the case-insensitive physical-package-root rejection proof. */
export async function executeMixedCaseConsumer(): Promise<void> {
	const cwd = await buildTempDirectory()
	try {
		const generationRoot = join(cwd.path, 'CaseRoot')
		mkdirSync(generationRoot)
		const packageDirectory = prepareGeneratedConsumer(generationRoot, 'case-proof', {
			app: ['core', 'browser'],
		})
		const outsideSentinel = 'mixed-case-package-boundary-must-not-ship'
		writeFileSync(join(generationRoot, 'outside-secret.txt'), outsideSentinel, 'utf8')
		writeFileSync(
			join(generationRoot, 'package.json'),
			'{"name":"escape-package","type":"module"}\n',
			'utf8',
		)
		const dependency = join(generationRoot, 'NODE_MODULES', 'escape-package')
		mkdirSync(dependency, { recursive: true })
		writeFileSync(
			join(dependency, 'index.js'),
			"export { default } from '../../outside-secret.txt?raw'\n",
			'utf8',
		)
		writeFileSync(
			join(packageDirectory, 'app', 'browser', 'main.ts'),
			"import value from 'escape-package'\nvoid value\n",
			'utf8',
		)

		const rejected = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		const output = `${rejected.stdout}${rejected.stderr}`

		expect(rejected.status).not.toBe(0)
		expect(output).toContain('orkestrel-environment-boundary')
		expect(output).toContain('physical package root')
		const browserOutput = join(packageDirectory, 'dist', 'app', 'browser')
		for (const path of existsSync(browserOutput) ? listFiles(browserOutput) : []) {
			expect(readFileSync(join(browserOutput, path), 'utf8')).not.toContain(outsideSentinel)
		}
	} finally {
		await cwd.cleanup()
	}
}

/** Execute the imported-symlink and public-directory containment proof. */
export async function executeSymlinkConsumer(): Promise<void> {
	const cwd = await buildTempDirectory()
	try {
		const packageDirectory = prepareGeneratedConsumer(cwd.path, 'symlink-proof', {
			src: ['core'],
			app: ['core', 'browser'],
		})
		const outside = join(cwd.path, 'outside.txt')
		writeFileSync(outside, 'outside-owned\n', 'utf8')
		const publicDirectory = join(packageDirectory, 'app', 'browser', 'public')
		mkdirSync(publicDirectory, { recursive: true })
		symlinkSync(outside, join(publicDirectory, 'leaked.txt'))
		expect(runNpmScript(packageDirectory, 'build:app:browser', 120_000).status).toBe(0)
		expect(
			listFiles(join(packageDirectory, 'dist', 'app', 'browser')).some((path) =>
				path.endsWith('leaked.txt'),
			),
		).toBe(false)

		const browserLink = join(packageDirectory, 'app', 'browser', 'outside.txt')
		symlinkSync(outside, browserLink)
		expect(pathRelative(packageDirectory, outside).startsWith(`..${sep}`)).toBe(true)
		expect(
			pathRelative(join(packageDirectory, 'app', 'browser'), outside).startsWith(`..${sep}`),
		).toBe(true)
		expect(realpathSync(browserLink)).toBe(realpathSync(outside))
		const browserHtml = join(packageDirectory, 'app', 'browser', 'index.html')
		const originalHtml = readFileSync(browserHtml, 'utf8')
		writeFileSync(
			browserHtml,
			browserDocument(
				originalHtml,
				'<script type="module">void new URL("./outside.txt", import.meta.url)</script>',
			),
			'utf8',
		)
		const rejectedHtml = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		const htmlOutput = `${rejectedHtml.stdout}${rejectedHtml.stderr}`
		expect(rejectedHtml.status).not.toBe(0)
		expect(htmlOutput).toContain('orkestrel-environment-boundary')
		expect(htmlOutput).toContain('outside the workspace')
		writeFileSync(browserHtml, originalHtml, 'utf8')
		const browserMain = join(packageDirectory, 'app', 'browser', 'main.ts')
		writeFileSync(browserMain, "void new URL('./outside.txt', import.meta.url)\n", 'utf8')
		const rejected = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		const output = `${rejected.stdout}${rejected.stderr}`
		expect(rejected.status).not.toBe(0)
		expect(output).toContain('orkestrel-environment-boundary')
		expect(output).toContain('outside the workspace')
	} finally {
		await cwd.cleanup()
	}
}

/** Execute the linked output-directory preservation proof. */
export async function executeLinkedOutputConsumer(): Promise<void> {
	const cwd = await buildTempDirectory()
	try {
		const packageDirectory = prepareGeneratedConsumer(cwd.path, 'output-proof', {
			app: ['core', 'browser'],
		})
		const userOutput = join(cwd.path, 'user-output')
		mkdirSync(userOutput)
		const sentinel = join(userOutput, 'sentinel.txt')
		writeFileSync(sentinel, 'preserve\n', 'utf8')
		const outputParent = join(packageDirectory, 'dist', 'app')
		mkdirSync(join(packageDirectory, 'dist'))
		createDirectoryLink(userOutput, outputParent)

		const linkedOutput = runNpmScript(packageDirectory, 'build:app:browser', 120_000)
		const output = `${linkedOutput.stdout}${linkedOutput.stderr}`
		expect(linkedOutput.status).not.toBe(0)
		expect(output).toContain('orkestrel-output-boundary')
		expect(readFileSync(sentinel, 'utf8')).toBe('preserve\n')
	} finally {
		await cwd.cleanup()
	}
}
