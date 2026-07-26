import type {
	Blueprint,
	CompilerEventMap,
	CompilerOptions,
	Plan,
	PlanManagerEventMap,
	PlanManagerOptions,
	SyncReport,
} from './types.js'
import type { EmitterHooks } from '@orkestrel/emitter'
import type { Guard } from '@orkestrel/contract'
import { attempt, isFunction, isRecord, isString, parseJSONAs } from '@orkestrel/contract'
import { MAX_COLLECTION_ITEMS, MAX_SERIALIZED_INPUT_BYTES } from './constants.js'
import { snapshotPlan } from './cloners.js'
import { ScaffoldError } from './errors.js'
import { contentByteLength } from './helpers.js'
import {
	hasOnlyDataProperties,
	isBlueprint,
	isCompilerEventHooks,
	isDenseDataArray,
	isEmitterErrorHandler,
	isPlan,
	isPlanManagerEventHooks,
	isSyncReport,
} from './validators.js'

/**
 * Parse and own the exact `Compiler` constructor boundary before emitter allocation.
 *
 * @param input - Caller-supplied options.
 * @returns Fresh immutable options containing owned listener hooks.
 * @throws ScaffoldError with code INVALID for unknown keys, accessors, symbols, or hostile traps.
 */
export function parseCompilerOptions(input: unknown): CompilerOptions {
	if (input === undefined) return {}
	const read = attempt(() => {
		if (!isRecord(input)) throw new Error('options must be a plain record')
		const keys = Reflect.ownKeys(input)
		if (keys.some((key) => key !== 'on' && key !== 'error')) {
			throw new Error('options contain an unknown key')
		}
		const on = Reflect.getOwnPropertyDescriptor(input, 'on')
		const error = Reflect.getOwnPropertyDescriptor(input, 'error')
		if (
			(on !== undefined && !Reflect.has(on, 'value')) ||
			(error !== undefined && !Reflect.has(error, 'value'))
		) {
			throw new Error('options must use data properties')
		}
		return { on: on?.value, error: error?.value }
	})
	if (!read.success) {
		throw new ScaffoldError('INVALID', 'Compiler options are malformed', { error: read.error })
	}
	const ownedHooks = attempt(() => {
		const value = read.value.on
		if (value === undefined) return undefined
		if (!isCompilerEventHooks(value)) throw new Error('event hooks are malformed')
		const compile = Reflect.getOwnPropertyDescriptor(value, 'compile')?.value
		const block = Reflect.getOwnPropertyDescriptor(value, 'block')?.value
		const audit = Reflect.getOwnPropertyDescriptor(value, 'audit')?.value
		const error = Reflect.getOwnPropertyDescriptor(value, 'error')?.value
		const destroy = Reflect.getOwnPropertyDescriptor(value, 'destroy')?.value
		if (
			(compile !== undefined && !isFunction(compile)) ||
			(block !== undefined && !isFunction(block)) ||
			(audit !== undefined && !isFunction(audit)) ||
			(error !== undefined && !isFunction(error)) ||
			(destroy !== undefined && !isFunction(destroy))
		) {
			throw new Error('event hooks are malformed')
		}
		return Object.freeze({
			...(compile === undefined ? {} : { compile }),
			...(block === undefined ? {} : { block }),
			...(audit === undefined ? {} : { audit }),
			...(error === undefined ? {} : { error }),
			...(destroy === undefined ? {} : { destroy }),
		})
	})
	if (!ownedHooks.success) {
		throw new ScaffoldError('INVALID', 'Compiler event hooks are malformed', {
			error: ownedHooks.error,
		})
	}
	const on: EmitterHooks<CompilerEventMap> | undefined = ownedHooks.value
	if (read.value.error !== undefined && !isEmitterErrorHandler(read.value.error)) {
		throw new ScaffoldError('INVALID', 'Compiler error handler is malformed')
	}
	return Object.freeze({
		...(on === undefined ? {} : { on }),
		...(read.value.error === undefined ? {} : { error: read.value.error }),
	})
}

/**
 * Parse JSON only when its UTF-8 representation fits an explicit allocation budget.
 *
 * @param input - Serialized JSON text.
 * @param guard - Contract guard for the parsed value.
 * @param maximum - Maximum serialized UTF-8 bytes; defaults to the public input ceiling.
 * @returns The guarded value, or `undefined` when malformed, over budget, or off-contract.
 *
 * @example
 * ```ts
 * import { parseBoundedJSON } from '@orkestrel/scaffold'
 *
 * parseBoundedJSON('"ready"', (value): value is string => typeof value === 'string', 7)
 * // 'ready'
 * ```
 */
export function parseBoundedJSON<T>(
	input: string,
	guard: Guard<T>,
	maximum = MAX_SERIALIZED_INPUT_BYTES,
): T | undefined {
	if (
		!Number.isSafeInteger(maximum) ||
		maximum < 0 ||
		input.length > maximum ||
		contentByteLength(input) > maximum
	) {
		return undefined
	}
	return parseJSONAs(input, guard)
}

/**
 * Parse a `Blueprint` from `unknown` (or a JSON string), else `undefined`.
 *
 * @remarks
 * The coercing counterpart of {@link isBlueprint}, compiled from the same
 * {@link blueprintShape} via `createContract` (AGENTS §14) — a guard-valid
 * value round-trips unchanged, an off-contract value returns `undefined`,
 * and this never throws, including on malformed JSON text.
 *
 * @param input - The value (or JSON string) to parse.
 * @returns A `Blueprint`, else `undefined`.
 */
export function parseBlueprint(input: unknown): Blueprint | undefined {
	if (typeof input === 'string') return parseBoundedJSON(input, isBlueprint)
	return isBlueprint(input) ? input : undefined
}

/**
 * Parse a `Plan` from `unknown` (or a JSON string), else `undefined`.
 *
 * @remarks
 * The coercing counterpart of {@link isPlan}, compiled from the same
 * {@link planShape} via `createContract` (AGENTS §14) — a guard-valid value
 * round-trips unchanged, an off-contract value returns `undefined`, and this
 * never throws, including on malformed JSON text.
 *
 * @param input - The value (or JSON string) to parse.
 * @returns A `Plan`, else `undefined`.
 */
export function parsePlan(input: unknown): Plan | undefined {
	if (typeof input === 'string') return parseBoundedJSON(input, isPlan)
	return isPlan(input) ? input : undefined
}

/**
 * Snapshot a bounded dense array of unique plan ids without invoking its iterator.
 *
 * @param input - The untrusted batch-removal boundary.
 * @returns A frozen id array, or `undefined` for accessors, symbols, holes,
 * duplicates, non-string values, excessive length, or hostile proxy traps.
 *
 * @example
 * ```ts
 * import { parsePlanIds } from '@orkestrel/scaffold'
 *
 * parsePlanIds(['a', 'b']) // ['a', 'b']
 * parsePlanIds(['a', 'a']) // undefined
 * ```
 */
export function parsePlanIds(input: unknown): readonly string[] | undefined {
	const result = attempt(() => {
		if (!Array.isArray(input)) return undefined
		const lengthDescriptor = Reflect.getOwnPropertyDescriptor(input, 'length')
		const length = lengthDescriptor?.value
		if (
			lengthDescriptor === undefined ||
			!Reflect.has(lengthDescriptor, 'value') ||
			typeof length !== 'number' ||
			!Number.isSafeInteger(length) ||
			length < 0 ||
			length > MAX_COLLECTION_ITEMS
		) {
			return undefined
		}
		const keys = Reflect.ownKeys(input)
		if (keys.length !== length + 1 || !keys.includes('length')) return undefined
		const ids: string[] = []
		const seen = new Set<string>()
		for (let index = 0; index < length; index += 1) {
			const descriptor = Reflect.getOwnPropertyDescriptor(input, String(index))
			if (
				descriptor === undefined ||
				!Reflect.has(descriptor, 'value') ||
				!isString(descriptor.value) ||
				seen.has(descriptor.value)
			) {
				return undefined
			}
			seen.add(descriptor.value)
			ids.push(descriptor.value)
		}
		return Object.freeze(ids)
	})
	return result.success ? result.value : undefined
}

/**
 * Parse and own the exact `PlanManager` constructor boundary before resource allocation.
 *
 * @param input - Caller-supplied options.
 * @returns Fresh options containing immutable plan snapshots and own listener hooks.
 * @throws ScaffoldError with code INVALID for unknown keys, accessors, symbols,
 * hostile traps, malformed hooks, or malformed/unbounded seed plans.
 */
export function parsePlanManagerOptions(input: unknown): PlanManagerOptions {
	if (input === undefined) return {}
	const read = attempt(() => {
		if (!isRecord(input)) throw new Error('options must be a plain record')
		const keys = Reflect.ownKeys(input)
		if (keys.some((key) => key !== 'plans' && key !== 'on' && key !== 'error')) {
			throw new Error('options contain an unknown key')
		}
		const plans = Reflect.getOwnPropertyDescriptor(input, 'plans')
		const on = Reflect.getOwnPropertyDescriptor(input, 'on')
		const error = Reflect.getOwnPropertyDescriptor(input, 'error')
		if (
			(plans !== undefined && !Reflect.has(plans, 'value')) ||
			(on !== undefined && !Reflect.has(on, 'value')) ||
			(error !== undefined && !Reflect.has(error, 'value'))
		) {
			throw new Error('options must use data properties')
		}
		return {
			plans: plans?.value,
			on: on?.value,
			error: error?.value,
		}
	})
	if (!read.success) {
		throw new ScaffoldError('INVALID', 'PlanManager options are malformed', {
			error: read.error,
		})
	}
	const ownedPlans = attempt(() => {
		const value = read.value.plans
		if (value === undefined) return Object.freeze<Plan[]>([])
		if (
			!isDenseDataArray(
				value,
				MAX_COLLECTION_ITEMS,
				(candidate): candidate is Plan => hasOnlyDataProperties(candidate) && isPlan(candidate),
			)
		) {
			throw new Error('seed plans are malformed')
		}
		const length = Reflect.getOwnPropertyDescriptor(value, 'length')?.value
		if (typeof length !== 'number') throw new Error('seed plan length is malformed')
		const plans: Plan[] = []
		for (let index = 0; index < length; index += 1) {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, String(index))
			if (
				descriptor === undefined ||
				!Reflect.has(descriptor, 'value') ||
				!hasOnlyDataProperties(descriptor.value) ||
				!isPlan(descriptor.value)
			) {
				throw new Error('seed plan is malformed')
			}
			plans.push(snapshotPlan(descriptor.value))
		}
		return Object.freeze(plans)
	})
	if (!ownedPlans.success) {
		throw new ScaffoldError('INVALID', 'PlanManager seed plans are malformed', {
			error: ownedPlans.error,
		})
	}
	const ownedHooks = attempt(() => {
		const value = read.value.on
		if (value === undefined) return undefined
		if (!isPlanManagerEventHooks(value)) {
			throw new Error('event hooks are malformed')
		}
		const add = Reflect.getOwnPropertyDescriptor(value, 'add')?.value
		const remove = Reflect.getOwnPropertyDescriptor(value, 'remove')?.value
		const destroy = Reflect.getOwnPropertyDescriptor(value, 'destroy')?.value
		if (
			(add !== undefined && !isFunction(add)) ||
			(remove !== undefined && !isFunction(remove)) ||
			(destroy !== undefined && !isFunction(destroy))
		) {
			throw new Error('event hooks are malformed')
		}
		return Object.freeze({
			...(add === undefined ? {} : { add }),
			...(remove === undefined ? {} : { remove }),
			...(destroy === undefined ? {} : { destroy }),
		})
	})
	if (!ownedHooks.success) {
		throw new ScaffoldError('INVALID', 'PlanManager event hooks are malformed', {
			error: ownedHooks.error,
		})
	}
	const on: EmitterHooks<PlanManagerEventMap> | undefined = ownedHooks.value
	if (read.value.error !== undefined && !isEmitterErrorHandler(read.value.error)) {
		throw new ScaffoldError('INVALID', 'PlanManager error handler is malformed')
	}
	return Object.freeze({
		...(ownedPlans.value.length === 0 ? {} : { plans: ownedPlans.value }),
		...(on === undefined ? {} : { on }),
		...(read.value.error === undefined ? {} : { error: read.value.error }),
	})
}

/**
 * Parse a `SyncReport` from `unknown` (or a JSON string), else `undefined`.
 *
 * @remarks
 * The coercing counterpart of {@link isSyncReport}, compiled from the same
 * {@link syncReportShape} via `createContract` (AGENTS §14) — a guard-valid
 * value round-trips unchanged, an off-contract value returns `undefined`,
 * and this never throws, including on malformed JSON text.
 *
 * @param input - The value (or JSON string) to parse.
 * @returns A `SyncReport`, else `undefined`.
 */
export function parseSyncReport(input: unknown): SyncReport | undefined {
	if (typeof input === 'string') return parseBoundedJSON(input, isSyncReport)
	return isSyncReport(input) ? input : undefined
}
