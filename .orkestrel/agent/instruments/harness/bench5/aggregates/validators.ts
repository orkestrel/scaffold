import type { AggregateSource, AggregateState } from '../types.js'
import { arrayOf, isNonNegativeInteger, isString, recordOf, whereOf } from '@orkestrel/contract'
import { isMessageRole } from '../helpers.js'

/**
 * Checks a recorded source projection line without coercion.
 * @param value - The candidate line
 * @returns True if the line carries source identity, role, text, and day; false otherwise
 */
export function isAggregateSource(value: unknown): value is AggregateSource {
	return recordOf({
		id: isString,
		sentence: isNonNegativeInteger,
		role: isMessageRole,
		text: isString,
		day: isString,
	})(value)
}

/**
 * Checks an exact maintained-state binding without discarding source multiplicity.
 * @param value - The candidate binding
 * @returns True if the binding carries a version, goal, read point, and full source projection; false otherwise
 */
export function isAggregateState(value: unknown): value is AggregateState {
	return recordOf({
		version: whereOf(isNonNegativeInteger, (version) => version > 0),
		goal: isString,
		point: isNonNegativeInteger,
		sources: arrayOf(isAggregateSource),
	})(value)
}
