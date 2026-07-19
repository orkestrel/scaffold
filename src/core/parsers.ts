import { createContract } from '@orkestrel/contract'
import type { Blueprint, Plan, SyncReport } from './types.js'
import { blueprintShape, planShape, syncReportShape } from './shapers.js'

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
export const parseBlueprint: (input: unknown) => Blueprint | undefined = (
	(contract) => (input: unknown) => {
		if (typeof input !== 'string') return contract.parse(input)
		try {
			return contract.parse(JSON.parse(input))
		} catch {
			return undefined
		}
	}
)(createContract(blueprintShape()))

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
export const parsePlan: (input: unknown) => Plan | undefined = ((contract) => (input: unknown) => {
	if (typeof input !== 'string') return contract.parse(input)
	try {
		return contract.parse(JSON.parse(input))
	} catch {
		return undefined
	}
})(createContract(planShape()))

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
export const parseSyncReport: (input: unknown) => SyncReport | undefined = (
	(contract) => (input: unknown) => {
		if (typeof input !== 'string') return contract.parse(input)
		try {
			return contract.parse(JSON.parse(input))
		} catch {
			return undefined
		}
	}
)(createContract(syncReportShape()))
