import type {
	Plan,
	PlanManagerEventMap,
	PlanManagerInterface,
	PlanManagerOptions,
	PlanRecord,
} from './types.js'
import type { EmitterInterface } from '@orkestrel/emitter'
import { Emitter } from '@orkestrel/emitter'
import { pinPlan, planPayload } from './helpers.js'
import { snapshotPlan } from './cloners.js'
import { ScaffoldError } from './errors.js'
import { parsePlanIds, parsePlanManagerOptions } from './parsers.js'

/**
 * The self-owning, versioned/hashed plan registry (AGENTS §9).
 *
 * @remarks
 * `add` re-pins the plan and mints the record's `id` from its own content
 * `hash` — deterministic, no randomness. Re-adding a plan whose content is
 * unchanged resolves to the SAME id and returns the existing record
 * untouched (`version` stays put); a plan whose content differs mints a
 * fresh id at `version: 1`, while a distinct canonical payload with the same
 * digest throws `INVALID`. Every stored plan and returned record is a detached,
 * recursively frozen snapshot. The array overload of `remove` is declared
 * FIRST (AGENTS §9.2) so an id list resolves to the batch form; the batch form
 * is ALL-OR-NOTHING and commits every deletion before emitting. After
 * `destroy()` every method but the getters and `destroy` itself throws
 * `ScaffoldError('DESTROYED', …)`.
 *
 * @example
 * ```ts
 * import { blueprint, blueprintToPlan, PlanManager } from '@src/core'
 *
 * const plans = new PlanManager()
 * const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] })))
 * record.id === record.hash // true — id minted from content
 * plans.destroy()
 * ```
 */
export class PlanManager implements PlanManagerInterface {
	readonly #plans = new Map<string, PlanRecord>()
	readonly #emitter: Emitter<PlanManagerEventMap>
	#destroyed = false

	constructor(options?: PlanManagerOptions) {
		const parsed = parsePlanManagerOptions(options)
		this.#emitter = new Emitter<PlanManagerEventMap>({
			...(parsed.on === undefined ? {} : { on: parsed.on }),
			...(parsed.error === undefined ? {} : { error: parsed.error }),
		})
		for (const plan of parsed.plans ?? []) {
			this.#set(this.#pin(plan))
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
	 * const record = plans.add(blueprintToPlan(blueprint('budget', { src: ['core'] })))
	 * record.version // 1
	 * ```
	 */
	add(plan: Plan): PlanRecord {
		this.#assertAlive()
		const record = this.#pin(snapshotPlan(plan))
		const final = this.#set(record)
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
	 * `false` is returned. Successful batch and remove-all calls commit every
	 * deletion before the first stable-order event.
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
			const ids = [...this.#plans.keys()]
			this.#plans.clear()
			for (const id of ids) this.#emitter.emit('remove', id)
			return
		}
		if (typeof target === 'string') {
			if (!this.#plans.has(target)) return false
			this.#plans.delete(target)
			this.#emitter.emit('remove', target)
			return true
		}
		const ids = parsePlanIds(target)
		if (ids === undefined) {
			throw new ScaffoldError('INVALID', 'Plan ids must be a dense unique string array')
		}
		for (const id of ids) if (!this.#plans.has(id)) return false
		for (const id of ids) this.#plans.delete(id)
		for (const id of ids) {
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
		const pinned = Object.freeze(pinPlan(plan))
		const hash = pinned.hash ?? ''
		return Object.freeze({ id: hash, plan: pinned, version: 1, hash })
	}

	#set(record: PlanRecord): PlanRecord {
		const existing = this.#plans.get(record.id)
		if (existing === undefined) {
			this.#plans.set(record.id, record)
			return record
		}
		if (planPayload(existing.plan) !== planPayload(record.plan)) {
			throw new ScaffoldError('INVALID', 'Plan hash collision')
		}
		return existing
	}

	#assertAlive(): void {
		if (this.#destroyed) throw new ScaffoldError('DESTROYED', 'PlanManager has been destroyed')
	}
}
