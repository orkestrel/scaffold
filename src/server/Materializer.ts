import type {
	MaterializeResult,
	MaterializerEventMap,
	MaterializerInterface,
	MaterializerOptions,
} from './types.js'
import type { Artifact, Audit, Plan } from '@src/core'
import type { EmitterInterface } from '@orkestrel/emitter'
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'
import { Emitter } from '@orkestrel/emitter'
import { ScaffoldError } from '@src/core'
import { isVacant } from './helpers.js'

/**
 * The materialization entity (server) — the only impure surface in the
 * package, writing a `Plan` to `node:fs` behind an explicit call.
 *
 * @remarks
 * `materialize` is green-field: it refuses any target `isVacant` rejects
 * (`ScaffoldError('TARGET', …)`), then byte-copies each `host` artifact from
 * the `host` root and writes each `template` / `computed` artifact's rendered
 * `content`, failing fast on any write error (`ScaffoldError('WRITE', …)`).
 * `repair` is into-existing: it skips the vacancy check and writes ONLY the
 * `missing` / `stale` artifacts an `Audit` names, leaving `aligned` ones
 * untouched. After `destroy()` every method throws `DESTROYED`; teardown is
 * idempotent, emitter last.
 *
 * @remarks
 * Defense in depth at the filesystem trust boundary: EVERY resolved
 * destination (`materialize` and `repair`, both origins) is asserted to stay
 * within `resolve(target)` before any write, and every `host`-origin copy
 * source is asserted to stay within `resolve(host)` before any read — a
 * traversal segment (`../`) in an artifact's `path` or `source` cannot escape
 * either root, even if a gate upstream (e.g. an ungated `Plan` built by hand)
 * let it through. A destination violation throws `ScaffoldError('WRITE', …)`;
 * a source violation throws `ScaffoldError('TARGET', …)`.
 *
 * @example
 * ```ts
 * import { blueprint, blueprintToPlan } from '@orkestrel/scaffold'
 * import { createMaterializer } from '@orkestrel/scaffold/server'
 *
 * const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
 * const materializer = createMaterializer()
 * materializer.materialize(plan, './packages/budget-new')
 * materializer.destroy()
 * ```
 */
export class Materializer implements MaterializerInterface {
	readonly #emitter: Emitter<MaterializerEventMap>
	readonly #host: string
	#destroyed = false

	constructor(options?: MaterializerOptions) {
		this.#emitter = new Emitter<MaterializerEventMap>({ on: options?.on, error: options?.error })
		this.#host = options?.host ?? Materializer.#resolveHostRoot()
	}

	/**
	 * Locate the nearest package root AT OR ABOVE the current working
	 * directory — the directory holding its `package.json` — by walking up
	 * from `process.cwd()`. The host is where the PROCESS runs, never this
	 * module's own location: once installed, this module's own directory
	 * would resolve to `node_modules/@orkestrel/scaffold`, not the consuming
	 * repo.
	 */
	static #resolveHostRoot(): string {
		let dir = process.cwd()
		for (;;) {
			if (existsSync(join(dir, 'package.json'))) return dir
			const parent = dirname(dir)
			if (parent === dir) {
				throw new ScaffoldError('TARGET', 'No package root found above the working directory', {
					cwd: process.cwd(),
				})
			}
			dir = parent
		}
	}

	get emitter(): EmitterInterface<MaterializerEventMap> {
		return this.#emitter
	}

	materialize(plan: Plan, target: string): MaterializeResult {
		this.#ensureAlive()
		if (!isVacant(target)) {
			throw new ScaffoldError('TARGET', 'materialize requires a vacant target', { target })
		}
		const written: string[] = []
		const copied: string[] = []
		for (const artifact of plan.artifacts) {
			if (artifact.origin === 'host') {
				this.#copy(artifact, target)
				copied.push(artifact.path)
			} else {
				this.#write(artifact, target)
				written.push(artifact.path)
			}
		}
		const result: MaterializeResult = { target, written, copied, skipped: [] }
		this.#emitter.emit('done', result)
		return result
	}

	repair(plan: Plan, audit: Audit, target: string): MaterializeResult {
		this.#ensureAlive()
		const drifted = new Map(audit.findings.map((finding) => [finding.path, finding.drift]))
		const written: string[] = []
		const copied: string[] = []
		const skipped: string[] = []
		for (const artifact of plan.artifacts) {
			const drift = drifted.get(artifact.path)
			if (drift !== 'missing' && drift !== 'stale') {
				skipped.push(artifact.path)
				continue
			}
			if (artifact.origin === 'host') {
				this.#copy(artifact, target)
				copied.push(artifact.path)
			} else {
				this.#write(artifact, target)
				written.push(artifact.path)
			}
		}
		const result: MaterializeResult = { target, written, copied, skipped }
		this.#emitter.emit('done', result)
		return result
	}

	destroy(): void {
		if (this.#destroyed) return
		this.#destroyed = true
		this.#emitter.emit('destroy')
		this.#emitter.destroy()
	}

	#copy(artifact: Artifact, target: string): void {
		const source = artifact.source ?? artifact.path
		const from = Materializer.#assertContained(this.#host, source, 'TARGET', artifact.path)
		const to = Materializer.#assertContained(target, artifact.path, 'WRITE', artifact.path)
		try {
			mkdirSync(dirname(to), { recursive: true })
			cpSync(from, to, { recursive: true })
		} catch (error) {
			this.#emitter.emit('error', error)
			throw new ScaffoldError('WRITE', `Failed to copy host artifact at ${artifact.path}`, {
				path: artifact.path,
				error,
			})
		}
		this.#emitter.emit('copy', artifact.path)
	}

	#write(artifact: Artifact, target: string): void {
		const to = Materializer.#assertContained(target, artifact.path, 'WRITE', artifact.path)
		try {
			mkdirSync(dirname(to), { recursive: true })
			writeFileSync(to, artifact.content ?? '', 'utf8')
		} catch (error) {
			this.#emitter.emit('error', error)
			throw new ScaffoldError('WRITE', `Failed to write artifact at ${artifact.path}`, {
				path: artifact.path,
				error,
			})
		}
		this.#emitter.emit('write', artifact.path)
	}

	// Resolve `join(root, relative)` and assert it stays within `resolve(root)`
	// — a prefix check against the resolved root PLUS a path separator, never
	// naive `startsWith` on the raw joined string. `code` is `'WRITE'` for a
	// destination escape (asserted against `target`) and `'TARGET'` for a
	// source escape (asserted against `host`), per the Errors section's coded
	// semantics.
	static #assertContained(
		root: string,
		relative: string,
		code: 'WRITE' | 'TARGET',
		path: string,
	): string {
		const resolvedRoot = resolve(root)
		const resolvedCandidate = resolve(root, relative)
		if (resolvedCandidate !== resolvedRoot && !resolvedCandidate.startsWith(resolvedRoot + sep)) {
			const boundary = code === 'WRITE' ? 'target' : 'host'
			throw new ScaffoldError(code, `Artifact path "${path}" escapes the ${boundary} root`, {
				path,
				root,
			})
		}
		return resolvedCandidate
	}

	#ensureAlive(): void {
		if (this.#destroyed) throw new ScaffoldError('DESTROYED', 'Materializer has been destroyed')
	}
}
