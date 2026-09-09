import type {
	GuideCommandContext,
	GuideCommandHandler,
	GuideCommandInterface,
	GuideCommandOptions,
	GuideReadFunction,
	GuideRunnerFunction,
} from './types.js'
import type { GuideModule, ParityFinding, ParityOptions } from '../core/types.js'
import { globSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { createParity } from '../core/factories.js'
import { parseManifest } from '../core/parsers.js'
import {
	formatGuideFinding,
	matchesGuideResult,
	resolveGuideRoot,
	selectGuidePitch,
} from './helpers.js'
import { parsePackageName } from './parsers.js'

/**
 * Drives native and worker guides-parity workflows against fresh workspace inventory.
 *
 * @param options - The workspace policy and direct host ports
 *
 * @example
 * ```ts
 * import { GuideCommand } from '@orkestrel/guide/server'
 * import { readInventory } from '@orkestrel/test/server'
 * import { createVitest } from 'vitest/node'
 *
 * await new GuideCommand({
 * 	root: new URL('../', import.meta.url),
 * 	inventory: ['src/**\/*.ts', 'tests/**\/*.ts', 'guides/*.md', '*.md'],
 * 	modules: { '@scope/widget': 'src/core' },
 * 	languages: ['ts'],
 * 	language: 'ts',
 * 	read: readInventory,
 * 	runner: createVitest,
 * }).execute(async ({ options }) => {
 * 	createParity(options).inspect()
 * })
 * ```
 */
export class GuideCommand implements GuideCommandInterface {
	static readonly #index = 'guides/README.md'
	static readonly #manifest = 'package.json'
	static readonly #readme = 'README.md'
	static readonly #usage = 'usage: npm run test:guides [-- --to guide|--to source]'

	readonly #root: string
	readonly #inventory: readonly string[]
	readonly #modules: Readonly<Record<string, GuideModule>>
	readonly #languages: readonly string[]
	readonly #language: string
	readonly #read: GuideReadFunction
	readonly #runner: GuideRunnerFunction

	constructor(options: GuideCommandOptions) {
		this.#root = resolveGuideRoot(options.root)
		this.#inventory = Object.freeze([...options.inventory])
		this.#modules = Object.freeze({ ...options.modules })
		this.#languages = Object.freeze([...options.languages])
		this.#language = options.language
		this.#read = options.read
		this.#runner = options.runner
	}

	/**
	 * Executes the native command or registers worker assertions for the active host path.
	 *
	 * @param register - The package-owned assertion registration callback
	 * @returns A promise that resolves after the selected command path finishes
	 */
	async execute(register: GuideCommandHandler): Promise<void> {
		if (process.env.VITEST === 'true') {
			await this.#register(register)
			return
		}
		try {
			await this.#executeNative()
		} catch (error) {
			process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
			this.#raise(1)
		}
	}

	#createOptions(): ParityOptions | undefined {
		const files = this.#readInventory()
		const manifest = files[GuideCommand.#index]
		if (manifest === undefined) return undefined
		const entries = Object.freeze([...parseManifest(manifest, 'guides')])
		const packageManifest = this.#read(this.#root, [GuideCommand.#manifest])[
			GuideCommand.#manifest
		]
		const pitch = selectGuidePitch(
			entries,
			packageManifest === undefined ? undefined : parsePackageName(packageManifest),
		)
		return {
			files,
			entries,
			modules: this.#modules,
			languages: this.#languages,
			language: this.#language,
			...(pitch === undefined
				? {}
				: { pitch: Object.freeze({ readme: GuideCommand.#readme, spec: pitch }) }),
		}
	}

	async #executeNative(): Promise<void> {
		const args = process.argv.slice(2)
		const direction =
			args.length === 2 &&
			args[0] === '--to' &&
			(args[1] === 'guide' || args[1] === 'source')
				? args[1]
				: undefined
		if (direction === undefined && args.length > 0) {
			process.stdout.write(`${GuideCommand.#usage}\n`)
			this.#raise(2)
			return
		}
		if (direction === undefined) {
			if (!(await this.#run())) this.#raise(1)
			return
		}

		const options = this.#createOptions()
		if (options === undefined) {
			this.#reportMissing()
			return
		}
		const parity = createParity(options)
		if (this.#report(parity.inspect().input)) {
			this.#raise(2)
			return
		}
		const rewritten = parity.rewrite(direction)
		for (const change of rewritten.changes) {
			writeFileSync(resolve(this.#root, change.path), change.content)
			process.stdout.write(`wrote ${change.path}\n`)
		}

		const freshOptions = this.#createOptions()
		if (freshOptions === undefined) {
			this.#reportMissing()
			return
		}
		const freshParity = createParity(freshOptions)
		const freshReport = freshParity.inspect()
		if (this.#report(freshReport.input)) {
			this.#raise(2)
			return
		}
		if (this.#report(freshParity.rewrite(direction).findings)) this.#raise(1)
		if (this.#report(freshReport.pitch)) this.#raise(1)
		if (rewritten.changes.length > 0) process.stdout.write('next: npm run format\n')
		if (!(await this.#run())) this.#raise(1)
	}

	#readInventory(): Readonly<Record<string, string>> {
		const targets = globSync([...this.#inventory], { cwd: this.#root }).map((path) =>
			path.replaceAll('\\', '/'),
		)
		return Object.freeze({ ...this.#read(this.#root, targets) })
	}

	async #register(register: GuideCommandHandler): Promise<void> {
		const options = this.#createOptions()
		if (options === undefined) {
			throw new Error('The inventory carries no guides/README.md to index from')
		}
		const context: GuideCommandContext = Object.freeze({ root: this.#root, options })
		await register(context)
	}

	#report(findings: readonly ParityFinding[]): boolean {
		for (const finding of findings) {
			process.stdout.write(`${formatGuideFinding(finding)}\n`)
		}
		return findings.length > 0
	}

	#reportMissing(): void {
		process.stdout.write(
			`${GuideCommand.#index}: the workspace carries no concept index to read\n`,
		)
		this.#raise(2)
	}

	async #run(): Promise<boolean> {
		const runner = await this.#runner('test', {
			root: this.#root,
			config: resolve(this.#root, 'vite.config.ts'),
			project: 'guides',
			reporters: 'dot',
			cache: false,
			watch: false,
		})
		try {
			return matchesGuideResult(await runner.start())
		} finally {
			await runner.close()
		}
	}

	#raise(code: number): void {
		const current = process.exitCode
		const numeric = typeof current === 'string' ? Number.parseInt(current, 10) : current
		if (typeof numeric !== 'number' || !Number.isFinite(numeric) || numeric < code) {
			process.exitCode = code
		}
	}
}
