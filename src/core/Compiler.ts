import type {
	Artifact,
	Audit,
	Blueprint,
	CompileFailure,
	CompileRecord,
	CompilerEventMap,
	CompilerInterface,
	CompilerOptions,
	Group,
	Plan,
	Question,
	Scaffolding,
} from './types.js'
import type { EmitterInterface } from '@orkestrel/emitter'
import { Emitter } from '@orkestrel/emitter'
import { blueprintToPlan } from './compilers.js'
import { diffPlan, pinPlan, validateBlueprint } from './helpers.js'
import { ScaffoldError } from './errors.js'

/**
 * The compilation orchestrator — runs the fixed three-stage `[draft, gate,
 * pin]` pipeline over a `Blueprint` and the pure `audit` projection, owning a
 * typed `emitter` (AGENTS §13).
 *
 * @remarks
 * `compile` and `audit` are genuinely synchronous and pure; the gate fails
 * CLOSED — a blueprint failing `validateBlueprint`, or carrying an override
 * that matches no planned artifact or targets a `host`-origin path, yields a
 * visible incomplete `Scaffolding` (`plan` absent, `questions` populated)
 * rather than throwing. A dependency outside the vendored guide set surfaces
 * a non-blocking `Question` and a `host`-origin pointer artifact instead of a
 * fabricated mirror. `compile` emits `compile` only for a complete
 * compilation and `block` for a gated one; `audit` emits `block` (when gated)
 * then `audit`, never `compile`. After `destroy()` every method but the
 * getter and `destroy` itself throws `ScaffoldError('DESTROYED', …)`.
 *
 * @example
 * ```ts
 * import { blueprint, Compiler } from '@src/core'
 *
 * const compiler = new Compiler()
 * const scaffolding = compiler.compile(blueprint('router', { surfaces: ['core'] }))
 * scaffolding.complete // true
 * compiler.destroy()
 * ```
 */
export class Compiler implements CompilerInterface {
	// The six runtime `@orkestrel/*` dependencies (plus `guide`) this package
	// vendors a byte-identical `guides/src/<dep>.md` mirror for (Contract
	// invariant 7). Any other dependency yields no fabricated mirror — a
	// `host`-origin pointer artifact plus a non-blocking `Question` instead.
	static readonly #vendored: readonly string[] = Object.freeze([
		'@orkestrel/contract',
		'@orkestrel/emitter',
		'@orkestrel/markdown',
		'@orkestrel/template',
		'@orkestrel/terminal',
		'@orkestrel/console',
		'@orkestrel/guide',
	])

	readonly #emitter: Emitter<CompilerEventMap>
	#destroyed = false

	constructor(options?: CompilerOptions) {
		this.#emitter = new Emitter<CompilerEventMap>({ on: options?.on, error: options?.error })
	}

	get emitter(): EmitterInterface<CompilerEventMap> {
		return this.#emitter
	}

	/**
	 * Run the three-stage pipeline over a `Blueprint`, returning a complete or
	 * visible-incomplete `Scaffolding`.
	 *
	 * @param blueprint - The `Blueprint` to compile.
	 * @param groups - Optional `Group` selection scoping the plan to those
	 * artifact groups; absent means the full plan.
	 * @returns The `Scaffolding` outcome of this compile.
	 *
	 * @example
	 * ```ts
	 * const scaffolding = compiler.compile(blueprint('timeout', { surfaces: ['core'] }))
	 * scaffolding.stages.map((record) => record.stage) // ['draft', 'gate', 'pin']
	 * ```
	 */
	compile(blueprint: Blueprint, groups?: readonly Group[]): Scaffolding {
		this.#assertAlive()
		const scaffolding = this.#run(blueprint, groups)
		if (scaffolding.complete) this.#emitter.emit('compile', scaffolding)
		else this.#emitter.emit('block', scaffolding.questions)
		return scaffolding
	}

	/**
	 * Compile the blueprint, then diff the resulting plan against the
	 * caller-supplied current target content.
	 *
	 * @param blueprint - The `Blueprint` to compile and audit.
	 * @param current - The target's current content, keyed by artifact path.
	 * @param groups - Optional `Group` selection scoping the audit to those
	 * artifact groups; absent means the full plan.
	 * @returns The `Audit` outcome — a gated blueprint returns `complete: false`
	 * with the gate's blocking `questions` and zero findings.
	 *
	 * @example
	 * ```ts
	 * const audit = compiler.audit(blueprint('timeout', { surfaces: ['core'] }), {})
	 * audit.missing // every artifact — nothing exists at the target yet
	 * ```
	 */
	audit(
		blueprint: Blueprint,
		current: Readonly<Record<string, string>>,
		groups?: readonly Group[],
	): Audit {
		this.#assertAlive()
		const scaffolding = this.#run(blueprint, groups)
		if (!scaffolding.complete || scaffolding.plan === undefined) {
			this.#emitter.emit('block', scaffolding.questions)
			const result: Audit = {
				findings: [],
				clean: false,
				complete: false,
				questions: scaffolding.questions,
				drifted: 0,
				missing: 0,
				foreign: 0,
			}
			this.#emitter.emit('audit', result)
			return result
		}
		const result = diffPlan(scaffolding.plan, current)
		this.#emitter.emit('audit', result)
		return result
	}

	/** Idempotent teardown — emits `destroy`, then destroys the emitter LAST. */
	destroy(): void {
		if (this.#destroyed) return
		this.#destroyed = true
		this.#emitter.emit('destroy')
		this.#emitter.destroy()
	}

	// The shared pipeline behind `compile` / `audit` — computes the `Scaffolding`
	// WITHOUT choreographing the `compile` / `block` / `audit` events, since the
	// two public methods each own a different emission sequence.
	#run(blueprint: Blueprint, groups?: readonly Group[]): Scaffolding {
		const stages: CompileRecord[] = []
		const failures: CompileFailure[] = []

		let draft: Plan | undefined
		try {
			draft = blueprintToPlan(blueprint, groups)
			stages.push({ stage: 'draft', input: blueprint, output: draft, failed: false })
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error)
			stages.push({
				stage: 'draft',
				input: blueprint,
				output: undefined,
				failed: true,
				error: message,
			})
			failures.push({ stage: 'draft', code: 'INVALID', message })
			this.#emitter.emit('error', error)
			stages.push({
				stage: 'gate',
				input: undefined,
				output: undefined,
				failed: true,
				error: 'Skipped: draft failed',
			})
			stages.push({
				stage: 'pin',
				input: undefined,
				output: undefined,
				failed: true,
				error: 'Skipped: draft failed',
			})
			return {
				blueprint,
				questions: [],
				stages,
				failures,
				complete: false,
				digest: '',
			}
		}

		const validation = validateBlueprint(blueprint)
		const overrideQuestions = this.#overrideQuestions(blueprint, draft.artifacts)
		const dependencyQuestions = this.#dependencyQuestions(blueprint)
		const blocking = [...validation.questions, ...overrideQuestions]
		const questions: Question[] = [...blocking, ...dependencyQuestions]
		stages.push({
			stage: 'gate',
			input: draft,
			output: { blocking: blocking.length, questions },
			failed: blocking.length > 0,
		})

		if (blocking.length > 0) {
			const message = `${blocking.length} blocking question${blocking.length === 1 ? '' : 's'}`
			failures.push({ stage: 'gate', code: 'BLOCKED', message })
			stages.push({
				stage: 'pin',
				input: undefined,
				output: undefined,
				failed: true,
				error: 'Skipped: gate blocked',
			})
			return { blueprint, questions, stages, failures, complete: false, digest: '' }
		}

		try {
			const pointers = this.#pointerArtifacts(blueprint)
			const plan = pinPlan({ ...draft, artifacts: [...draft.artifacts, ...pointers] })
			stages.push({ stage: 'pin', input: draft, output: plan, failed: false })
			return {
				blueprint,
				plan,
				questions,
				stages,
				failures,
				complete: true,
				digest: plan.hash ?? '',
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error)
			stages.push({ stage: 'pin', input: draft, output: undefined, failed: true, error: message })
			failures.push({ stage: 'pin', code: 'INVALID', message })
			this.#emitter.emit('error', error)
			return { blueprint, questions, stages, failures, complete: false, digest: '' }
		}
	}

	// Blocking questions for overrides matching no planned artifact, or
	// targeting a host-origin path — the fail-closed override rule.
	#overrideQuestions(blueprint: Blueprint, artifacts: readonly Artifact[]): readonly Question[] {
		const byPath = new Map(artifacts.map((artifact) => [artifact.path, artifact]))
		const questions: Question[] = []
		for (const item of blueprint.overrides) {
			const artifact = byPath.get(item.path)
			if (artifact === undefined) {
				questions.push({
					field: 'overrides',
					text: `Override path "${item.path}" matches no planned artifact`,
					blocking: true,
				})
				continue
			}
			if (artifact.origin === 'host') {
				questions.push({
					field: 'overrides',
					text: `Override path "${item.path}" targets a host-origin artifact`,
					blocking: true,
				})
			}
		}
		return questions
	}

	// Non-blocking questions for a dependency outside the vendored guide set.
	#dependencyQuestions(blueprint: Blueprint): readonly Question[] {
		const questions: Question[] = []
		for (const item of blueprint.dependencies) {
			if (Compiler.#vendored.includes(item.name)) continue
			questions.push({
				field: 'dependencies',
				text: `Dependency "${item.name}" is not vendored — sync its guides/src mirror from that repo at HEAD`,
				blocking: false,
			})
		}
		return questions
	}

	// A host-origin pointer artifact per non-vendored dependency (Contract invariant 7).
	#pointerArtifacts(blueprint: Blueprint): readonly Artifact[] {
		const artifacts: Artifact[] = []
		for (const item of blueprint.dependencies) {
			if (Compiler.#vendored.includes(item.name)) continue
			const short = item.name.replace('@orkestrel/', '')
			const path = `guides/src/${short}.md`
			artifacts.push({ path, group: 'guides', origin: 'host', source: path })
		}
		return artifacts
	}

	#assertAlive(): void {
		if (this.#destroyed) throw new ScaffoldError('DESTROYED', 'Compiler has been destroyed')
	}
}
