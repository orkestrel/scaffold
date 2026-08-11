import type { Parser } from '@orkestrel/contract'
import type { EmitterInterface } from '@orkestrel/emitter'
import type {
	Artifact,
	Audit,
	Blueprint,
	CompileRecord,
	CompilerEventMap,
	CompilerInterface,
	CompilerOptions,
	Group,
	Plan,
	Question,
	ScaffoldErrorCode,
	Scaffolding,
	Snapshot,
} from './types.js'
import { Emitter } from '@orkestrel/emitter'
import { cloneValue } from './cloners.js'
import {
	applyOverrides,
	artifactsToQuestions,
	blueprintToConfigArtifacts,
	blueprintToDocumentArtifacts,
	blueprintToGuideArtifacts,
	blueprintToManifest,
	blueprintToOrchestrationArtifacts,
	blueprintToQuestions,
	blueprintToSourceArtifacts,
	blueprintToTestArtifacts,
	nameToHostArtifacts,
	overridesToQuestions,
	planToFindings,
	planToHash,
} from './compilers.js'
import { GROUPS } from './constants.js'
import { ScaffoldError } from './errors.js'
import { selectGroups } from './helpers.js'
import { parseBlueprint, parseCompilerOptions, parseGroups, parseSnapshot } from './parsers.js'

/**
 * The compile spine: draft, gate, pin, run in that order over a blueprint.
 *
 * @remarks
 * The draft stage assembles the artifacts the selected groups cover. The gate
 * stage measures the blueprint, its overrides, and the drafted artifacts, and
 * refuses on a blocking question. The pin stage gives the plan its content
 * identity. Every stage records its input and its output, and a failed stage
 * records the coded reason beside them; the stages after a failed one never run,
 * so the records stop where the compile stopped.
 *
 * The compile fails closed on one rule: a scaffolding carries a plan exactly
 * when no question blocks. A refused blueprint is answered rather than raised,
 * so a caller reads the refusal from the value it asked for.
 *
 * Both entry points snapshot each caller-supplied value and then guard the
 * snapshot, which is the order `cloneValue` fixes. A value that is not the exact
 * shape is off-contract input rather than an answerable question, so it raises
 * `INVALID`. Structure raises; the laws a well-formed blueprint can still break
 * are the gate's, and they answer with questions.
 *
 * Two consequences of that order are worth stating, because they are the ones a
 * JavaScript caller meets first. A property backed by an accessor is refused
 * rather than read, which is what closes the race a guard cannot close from
 * inside; the accessor never runs. And an optional field present with the value
 * `undefined` is not the exact shape either, which is the same law
 * `exactOptionalPropertyTypes` already states at compile time.
 *
 * Every error this compiler raises is emitted on `error` immediately before it
 * is thrown, so an observer sees a refusal even where the caller catches it.
 *
 * @example
 * ```ts
 * import { createBlueprint, Compiler } from '@orkestrel/scaffold'
 *
 * const compiler = new Compiler()
 * const scaffolding = compiler.compile(createBlueprint('router', { src: ['core'] }))
 * scaffolding.plan?.hash?.length // 16
 * compiler.destroy()
 * ```
 */
export class Compiler implements CompilerInterface {
	readonly #emitter: Emitter<CompilerEventMap>
	#destroyed = false

	/**
	 * Construct a compiler.
	 *
	 * @param options - The initial listeners and the listener-error handler.
	 * @throws {@link ScaffoldError} coded `INVALID` when `options` is present but
	 * is not an option bag this compiler accepts.
	 *
	 * @remarks
	 * The options are guarded and never snapshotted: they carry listeners, and a
	 * function is not data a snapshot can take ownership of. A key outside the
	 * event map is refused here, so a listener wired to a misspelled event fails
	 * at construction instead of never firing.
	 */
	constructor(options?: CompilerOptions) {
		const accepted = parseCompilerOptions(options)
		if (options !== undefined && accepted === undefined) {
			throw new ScaffoldError(
				'INVALID',
				'The options argument is not the exact shape this compiler accepts.',
				{ field: 'options' },
			)
		}
		this.#emitter = new Emitter<CompilerEventMap>({
			...(accepted?.on === undefined ? {} : { on: accepted.on }),
			...(accepted?.error === undefined ? {} : { error: accepted.error }),
		})
	}

	/** The compiler's observation channel. */
	get emitter(): EmitterInterface<CompilerEventMap> {
		return this.#emitter
	}

	/**
	 * Compile a blueprint into a plan through the draft, gate, and pin stages.
	 *
	 * @param blueprint - The workspace specification to compile.
	 * @param groups - The artifact groups to cover; every group when absent.
	 * @returns The scaffolding, carrying a plan only when the gate passed.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is not the
	 * exact shape, and `DESTROYED` when the compiler has been torn down.
	 *
	 * @remarks
	 * Emits `block` with the questions that closed the gate when the compile
	 * carries no plan, then `compile` with the whole outcome either way, so an
	 * observer reads every compile from one event and the refusals from the other.
	 *
	 * A plan says the blueprint can be built. It does not say the blueprint should
	 * be created, and the questions beside it are what this compiler could not
	 * settle. A caller creating a fresh workspace answers them first and writes
	 * nothing while any remains, which is the rule the `new` verb applies; a caller
	 * describing or repairing an existing target carries them through instead.
	 * Nothing downstream repeats that check, because only the caller knows which of
	 * the two it is.
	 *
	 * @example
	 * ```ts
	 * import { createBlueprint, createCompiler } from '@orkestrel/scaffold'
	 *
	 * const blueprint = createBlueprint('router', { src: ['core'] })
	 *
	 * createCompiler().compile(blueprint, ['manifest']).plan?.artifacts.length // 1
	 * ```
	 */
	compile(blueprint: Blueprint, groups?: readonly Group[]): Scaffolding {
		this.#assertAlive()
		const accepted = this.#accept(blueprint, parseBlueprint, 'blueprint')
		const scaffolding = this.#scaffold(accepted, this.#select(groups))
		if (scaffolding.plan === undefined) this.#emitter.emit('block', scaffolding.questions)
		this.#emitter.emit('compile', scaffolding)
		return scaffolding
	}

	/**
	 * Compile a blueprint and compare its plan to a target's current content.
	 *
	 * @param blueprint - The workspace specification to compile.
	 * @param current - The target's exact bytes, keyed by artifact-relative path.
	 * @param groups - The artifact groups to cover; every group when absent.
	 * @returns The audit; empty findings and blocking questions when the gate refused.
	 * @throws {@link ScaffoldError} coded `INVALID` when an argument is not the
	 * exact shape, and `DESTROYED` when the compiler has been torn down.
	 *
	 * @remarks
	 * A compile that carries no plan says nothing about the target, so the audit
	 * reports no findings and carries the questions instead. Emits `block` in that
	 * case, then `audit` with the verdict either way.
	 *
	 * Ownership decides each verdict, not absence. A birth-owned path is never
	 * compared and reads `aligned` against a target holding nothing, while a
	 * content-owned path with no bytes to read is `missing`. An empty snapshot
	 * therefore produces both verdicts rather than one.
	 *
	 * @example
	 * ```ts
	 * import { createBlueprint, createCompiler } from '@orkestrel/scaffold'
	 *
	 * const blueprint = createBlueprint('router', { src: ['core'] })
	 *
	 * createCompiler().audit(blueprint, {}, ['manifest']).findings[0]?.drift // 'aligned'
	 * createCompiler().audit(blueprint, {}, ['configs']).findings[0]?.drift // 'missing'
	 * ```
	 */
	audit(blueprint: Blueprint, current: Snapshot, groups?: readonly Group[]): Audit {
		this.#assertAlive()
		const accepted = this.#accept(blueprint, parseBlueprint, 'blueprint')
		const observed = this.#accept(current, parseSnapshot, 'current')
		const scaffolding = this.#scaffold(accepted, this.#select(groups))
		if (scaffolding.plan === undefined) this.#emitter.emit('block', scaffolding.questions)
		const result: Audit = {
			findings: scaffolding.plan === undefined ? [] : planToFindings(scaffolding.plan, observed),
			questions: scaffolding.questions,
		}
		this.#emitter.emit('audit', result)
		return result
	}

	/**
	 * Tear the compiler down. Every later call throws, and teardown is idempotent.
	 *
	 * @returns Nothing.
	 *
	 * @example
	 * ```ts
	 * import { createCompiler } from '@orkestrel/scaffold'
	 *
	 * const compiler = createCompiler()
	 * compiler.destroy()
	 * compiler.emitter.destroyed // true
	 * ```
	 */
	destroy(): void {
		if (this.#destroyed) return
		this.#destroyed = true
		this.#emitter.emit('destroy')
		this.#emitter.destroy()
	}

	// The three stages in order, recording each one and stopping at the first
	// failure. Both public methods run this and choreograph their own events, so
	// an audit never emits a compile's completion.
	#scaffold(blueprint: Blueprint, groups: readonly Group[]): Scaffolding {
		const stages: CompileRecord[] = []
		const draft = this.#draft(blueprint)
		const selected: Artifact[] = []
		for (const group of groups) {
			for (const artifact of draft) {
				if (artifact.group === group) selected.push(artifact)
			}
		}
		const artifacts = applyOverrides(selected, blueprint.overrides)
		stages.push({ stage: 'draft', input: { blueprint, groups }, output: artifacts })
		const questions = this.#gate(blueprint, draft, artifacts)
		const blocking = questions.filter((question) => question.blocking)
		if (blocking.length > 0) {
			stages.push({
				stage: 'gate',
				input: { blueprint, artifacts },
				output: questions,
				failure: {
					code: 'BLOCKED',
					message: `The gate refused this blueprint on ${blocking.length} blocking question${blocking.length === 1 ? '' : 's'}.`,
				},
			})
			return { questions, stages }
		}
		stages.push({ stage: 'gate', input: { blueprint, artifacts }, output: questions })
		const drafted: Plan = { blueprint, groups, artifacts }
		const hash = planToHash(drafted)
		if (hash === undefined) {
			// An unidentifiable plan is a question raised against the plan, so the
			// one fail-closed rule still decides it: no plan travels with a blocking
			// question beside it.
			const refusal: Question = {
				field: 'plan',
				message: 'The plan carries a value that cannot be encoded, so it has no identity.',
				blocking: true,
			}
			stages.push({
				stage: 'pin',
				input: drafted,
				output: undefined,
				failure: { code: 'INVALID', message: refusal.message },
			})
			return { questions: [...questions, refusal], stages }
		}
		const plan: Plan = { ...drafted, hash }
		stages.push({ stage: 'pin', input: drafted, output: plan })
		return { plan, questions, stages }
	}

	// Every artifact the blueprint drafts, in plan order. The manifest is the one artifact this
	// package's own fields decide, and it is claimed by birth because a workspace
	// owns its manifest once it exists. Every other drafted path is vendored. The
	// compile spine selects groups and applies overrides after this full set exists,
	// so override legality never depends on the caller's group selection.
	#draft(blueprint: Blueprint): readonly Artifact[] {
		return [
			{
				path: 'package.json',
				group: 'manifest',
				ownership: 'birth',
				origin: 'computed',
				content: blueprintToManifest(blueprint),
			},
			...blueprintToConfigArtifacts(blueprint),
			...blueprintToSourceArtifacts(blueprint),
			...blueprintToTestArtifacts(blueprint),
			...blueprintToGuideArtifacts(blueprint),
			...blueprintToDocumentArtifacts(blueprint),
			...blueprintToOrchestrationArtifacts(blueprint),
			...nameToHostArtifacts(blueprint.name),
		]
	}

	// Blueprint and override laws span the full draft. Artifact bounds measure the
	// selected, overridden list the plan will carry.
	#gate(
		blueprint: Blueprint,
		draft: readonly Artifact[],
		artifacts: readonly Artifact[],
	): readonly Question[] {
		return [
			...blueprintToQuestions(blueprint),
			...overridesToQuestions(blueprint.overrides, draft),
			...artifactsToQuestions(artifacts),
		]
	}

	// The groups boundary: absence covers every group, a selection is refused
	// unless it is one, and what survives is read as membership against `GROUPS`.
	#select(groups: readonly Group[] | undefined): readonly Group[] {
		const selection =
			groups === undefined ? undefined : this.#accept(groups, parseGroups, 'groups', GROUPS)
		return selectGroups(selection)
	}

	// Snapshot the caller's value, then guard the snapshot. The snapshot is what
	// closes the guard/use race: a property backed by an accessor never reaches
	// the guard, so what the guard measured is what every later read returns.
	#accept<T>(value: unknown, parse: Parser<T>, field: string, candidates?: readonly string[]): T {
		const accepted = parse(cloneValue(value))
		if (accepted !== undefined) return accepted
		throw this.#error(
			'INVALID',
			`The ${field} argument is not the exact shape this compiler accepts.`,
			candidates === undefined ? { field } : { field, candidates },
		)
	}

	#assertAlive(): void {
		if (this.#destroyed) throw this.#error('DESTROYED', 'This compiler has been destroyed.')
	}

	// Publish the failure on the observation channel, then hand it back to be
	// thrown at the site that decided it.
	#error(code: ScaffoldErrorCode, message: string, context?: unknown): ScaffoldError {
		const error = new ScaffoldError(code, message, context)
		this.#emitter.emit('error', error)
		return error
	}
}
