import type { EnduranceAtom } from '../../endurance/types.js'
import type { MatrixRequest } from '../../matrix/types.js'
import type { CallRole } from '../../types.js'
import type { ContinuousArmInterval } from './types.js'

/**
 * Builds an empty tally for every rubric dimension.
 *
 * @returns One zeroed `passed`, `total`, and `ambiguous` triple per dimension
 */
export function buildDimensionTally(): Record<
	EnduranceAtom['dimension'],
	{ passed: number; total: number; ambiguous: number }
> {
	return {
		facts: { passed: 0, total: 0, ambiguous: 0 },
		work: { passed: 0, total: 0, ambiguous: 0 },
		obligations: { passed: 0, total: 0, ambiguous: 0 },
		revision: { passed: 0, total: 0, ambiguous: 0 },
		evidence: { passed: 0, total: 0, ambiguous: 0 },
	}
}

/**
 * Sums the sent requests of one role.
 *
 * @param requests - Every request record of a run
 * @param role - The role to sum
 * @returns The request count and the known prompt and completion tokens of that role
 */
export function sumRoleUsage(
	requests: readonly MatrixRequest[],
	role: CallRole,
): { readonly requests: number; readonly prompt: number; readonly completion: number } {
	const sent = requests.filter((request) => request.sent && request.role === role)
	return {
		requests: sent.length,
		prompt: sent.reduce((total, request) => total + (request.prompt ?? 0), 0),
		completion: sent.reduce((total, request) => total + (request.completion ?? 0), 0),
	}
}

/**
 * Reads the acceptable-product rate of one arm interval as a conservative and a possible fraction.
 *
 * @param interval - The arm's tally over one interval
 * @returns The low and high fractions of judged products that were fully acceptable, or 0 when none was judged
 */
export function computeAcceptableRate(interval: ContinuousArmInterval): {
	readonly low: number
	readonly high: number
} {
	if (interval.judged === 0) return { low: 0, high: 0 }
	return {
		low: interval.acceptable.low / interval.judged,
		high: interval.acceptable.high / interval.judged,
	}
}
