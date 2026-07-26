import type { Plan } from './types.js'
import { attempt, isRecord, parseJSON } from '@orkestrel/contract'
import { ScaffoldError } from './errors.js'
import { stableStringify } from './helpers.js'
import { hasOnlyDataProperties, isPlan } from './validators.js'

/**
 * Clone and recursively freeze a plan into an immutable owned snapshot.
 *
 * @param input - The untrusted plan boundary to snapshot.
 * @returns A detached, recursively frozen plan.
 * @throws ScaffoldError with code INVALID when the input is off-contract,
 * accessor-backed, uncloneable, or cannot be frozen.
 *
 * @example
 * ```ts
 * import { snapshotPlan } from '@orkestrel/scaffold'
 *
 * const snapshot = snapshotPlan(plan)
 * Object.isFrozen(snapshot.blueprint) // true
 * ```
 */
export function snapshotPlan(input: unknown): Plan {
	if (!hasOnlyDataProperties(input) || !isPlan(input)) {
		throw new ScaffoldError('INVALID', 'Plan snapshot requires an exact data-only plan')
	}
	const result = attempt(() => {
		const clone = parseJSON(stableStringify(input))
		if (!hasOnlyDataProperties(clone) || !isPlan(clone)) return undefined
		const pending: unknown[] = [clone]
		const visited = new WeakSet<object>()
		while (pending.length > 0) {
			const current = pending.pop()
			if (!isRecord(current) && !Array.isArray(current)) continue
			if (visited.has(current)) continue
			visited.add(current)
			for (const key of Reflect.ownKeys(current)) {
				const descriptor = Reflect.getOwnPropertyDescriptor(current, key)
				if (descriptor === undefined || !Reflect.has(descriptor, 'value')) return undefined
				if (isRecord(descriptor.value) || Array.isArray(descriptor.value)) {
					pending.push(descriptor.value)
				}
			}
			Object.freeze(current)
		}
		return clone
	})
	if (!result.success || result.value === undefined) {
		throw new ScaffoldError('INVALID', 'Plan snapshot could not be owned')
	}
	return result.value
}
