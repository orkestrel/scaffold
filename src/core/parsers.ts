import type { Blueprint, Plan, SyncReport } from './types.js'
import { parseJSONAs } from '@orkestrel/contract'
import { isBlueprint, isPlan, isSyncReport } from './validators.js'

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
	if (typeof input === 'string') return parseJSONAs(input, isBlueprint)
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
	if (typeof input === 'string') return parseJSONAs(input, isPlan)
	return isPlan(input) ? input : undefined
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
	if (typeof input === 'string') return parseJSONAs(input, isSyncReport)
	return isSyncReport(input) ? input : undefined
}
