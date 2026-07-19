import type {
	Plan,
	PlanManagerEventMap,
	PlanManagerInterface,
	PlanManagerOptions,
	PlanRecord,
} from './types.js'
import type { EmitterInterface } from '@orkestrel/emitter'
import { Emitter } from '@orkestrel/emitter'
import { pinPlan } from './helpers.js'
import { ScaffoldError } from './errors.js'

/**
 * The self-owning, versioned/hashed plan registry (AGENTS §9).
 *
 * @remarks
 * `add` re-pins the plan and mints the record's `id` from its own content
 * `hash` — deterministic, no randomness. Re-adding a plan whose content is
 * unchanged resolves to the SAME id and returns the existing record
 * untouched (`version` stays put); a plan whose content differs mints a
 * fresh id at `version: 1`. The array overload of `remove` is declared FIRST
 * (AGENTS §9.2) so an id list resolves to the batch form; the batch form is
 * ALL-OR-NOTHING. After `destroy()` every method but the getters and
 * `destroy` itself throws `ScaffoldError('DESTROYED', …)`.
 *
 * @example
 * ```ts
 * import { blueprint, blueprintToPlan, PlanManager } from '@src/core'
 *
 * const plans = new PlanManager()
 * const record = plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] })))
 * record.id === record.hash // true — id minted from content
 * plans.destroy()
 * ```
 */
export class PlanManager implements PlanManagerInterface {
	readonly #plans = new Map<string, PlanRecord>()
	readonly #emitter: Emitter<PlanManagerEventMap>
	#destroyed = false

	constructor(options?: PlanManagerOptions) {
		this.#emitter = new Emitter<PlanManagerEventMap>({ on: options?.on, error: options?.error })
		for (const plan of options?.plans ?? []) {
			const record = this.#pin(plan)
			this.#plans.set(record.id, record)
		}
	}

	get emitter(): EmitterInterface<PlanManagerEventMap> {
		return this.#emitter
	}

	get size(): number {
		return this.#plans.size
	}

	/**
	 * Whether a plan with the given id is registered.
	 *
	 * @param id - The plan record id.
	 * @returns `true` when `id` is registered.
	 */
	has(id: string): boolean {
		this.#assertAlive()
		return this.#plans.has(id)
	}

	/**
	 * Look up one registered plan record by id (AGENTS §9.1 singular accessor).
	 *
	 * @param id - The plan record id.
	 * @returns The `PlanRecord`, or `undefined` when unregistered.
	 */
	plan(id: string): PlanRecord | undefined {
		this.#assertAlive()
		return this.#plans.get(id)
	}

	/**
	 * List every registered plan record (AGENTS §9.1 plural accessor).
	 *
	 * @returns A snapshot array of every registered `PlanRecord`.
	 */
	plans(): readonly PlanRecord[] {
		this.#assertAlive()
		return [...this.#plans.values()]
	}

	/**
	 * Register (or re-register) one plan, mints the record's id from its
	 * content hash.
	 *
	 * @param plan - The `Plan` to register.
	 * @returns The registered `PlanRecord`.
	 *
	 * @example
	 * ```ts
	 * const record = plans.add(blueprintToPlan(blueprint('budget', { surfaces: ['core'] })))
	 * record.version // 1
	 * ```
	 */
	add(plan: Plan): PlanRecord {
		this.#assertAlive()
		const record = this.#pin(plan)
		const existing = this.#plans.get(record.id)
		const final = existing ?? record
		this.#plans.set(final.id, final)
		this.#emitter.emit('add', final.id)
		return final
	}

	/**
	 * Remove one, several, or every registered plan (AGENTS §9.2 batch
	 * overloads) — array overload declared first so a list resolves to the
	 * batch form.
	 *
	 * @remarks
	 * `remove()` removes every registered plan, emitting `remove` once per id.
	 * `remove(id)` removes one plan, emitting `remove` and returning `true`
	 * when it existed, `false` otherwise. `remove(ids)` is ALL-OR-NOTHING: if
	 * any listed id is unregistered, the collection is left untouched and
	 * `false` is returned.
	 *
	 * @param target - Omit to remove all, a single id, or a list of ids.
	 * @returns `boolean` for the single-id / list-of-ids forms; `void` for the remove-all form.
	 */
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	remove(target?: string | readonly string[]): boolean | void {
		this.#assertAlive()
		if (target === undefined) {
			for (const id of this.#plans.keys()) this.#emitter.emit('remove', id)
			this.#plans.clear()
			return
		}
		if (typeof target === 'string') {
			if (!this.#plans.has(target)) return false
			this.#plans.delete(target)
			this.#emitter.emit('remove', target)
			return true
		}
		for (const id of target) if (!this.#plans.has(id)) return false
		for (const id of target) {
			this.#plans.delete(id)
			this.#emitter.emit('remove', id)
		}
		return true
	}

	/** Idempotent teardown — clears the collection, emits `destroy`, then destroys the emitter LAST. */
	destroy(): void {
		if (this.#destroyed) return
		this.#destroyed = true
		this.#plans.clear()
		this.#emitter.emit('destroy')
		this.#emitter.destroy()
	}

	// Re-pin a plan and mint its record — the content hash IS the id, so an
	// unchanged plan always resolves to the same record.
	#pin(plan: Plan): PlanRecord {
		const pinned = pinPlan(plan)
		const hash = pinned.hash ?? ''
		return { id: hash, plan: pinned, version: 1, hash }
	}

	#assertAlive(): void {
		if (this.#destroyed) throw new ScaffoldError('DESTROYED', 'PlanManager has been destroyed')
	}
}
