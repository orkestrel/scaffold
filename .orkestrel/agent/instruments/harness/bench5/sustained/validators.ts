import type {
	SustainedAttempt,
	SustainedCandidate,
	SustainedClassification,
	SustainedExecution,
	SustainedLimits,
	SustainedMessage,
	SustainedObservation,
	SustainedReceipt,
	SustainedSelection,
} from './types.js'
import { arrayOf, isRecord, isString } from '@orkestrel/contract'
import { isRefitFile } from '../refit/validators.js'
import { isMatrixBudget } from '../matrix/validators.js'

function isCount(value: unknown): value is number {
	return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
}

/** Checks finite whole-run limits. */
export function isSustainedLimits(value: unknown): value is SustainedLimits {
	return (
		isRecord(value) &&
		[value.calls, value.tokens, value.wall, value.goals].every((one) => isCount(one) && one > 0) &&
		isCount(value.retries) &&
		isString(value.derivation) &&
		value.derivation.length > 0 &&
		arrayOf(isRefitFile)(value.evidence)
	)
}

/** Checks an explicit continuous execution without accepting copy axes or hidden data. */
export function isSustainedExecution(value: unknown): value is SustainedExecution {
	return (
		isRecord(value) &&
		Object.keys(value).every((key) =>
			[
				'protocol',
				'key',
				'think',
				'arm',
				'phase',
				'frozen',
				'resource',
				'runtime',
				'budget',
				'limits',
				'classification',
				'fit',
				'selection',
			].includes(key),
		) &&
		value.protocol === 'e1' &&
		isString(value.key) &&
		value.think === false &&
		(value.arm === 'records' || value.arm === 'aggregate') &&
		['filing', 'development', 'evaluation'].includes(String(value.phase)) &&
		isRefitFile(value.frozen) &&
		isRefitFile(value.resource) &&
		isRefitFile(value.runtime) &&
		isMatrixBudget(value.budget) &&
		isSustainedLimits(value.limits) &&
		['classification', 'fit', 'selection'].every(
			(key) => value[key] === undefined || isRefitFile(value[key]),
		)
	)
}

/** Checks the sealed runtime classification manifest. */
export function isSustainedClassification(value: unknown): value is SustainedClassification {
	return (
		isRecord(value) &&
		value.protocol === 'e1' &&
		isRefitFile(value.runtime) &&
		isRefitFile(value.frozen) &&
		isRefitFile(value.cache) &&
		arrayOf(isRefitFile)(value.files) &&
		typeof value.accepted === 'boolean' &&
		arrayOf(isString)(value.failures)
	)
}

/** Checks a retained development attempt. */
export function isSustainedAttempt(value: unknown): value is SustainedAttempt {
	return (
		isRecord(value) &&
		isRefitFile(value.execution) &&
		isString(value.run) &&
		arrayOf(isRefitFile)(value.files) &&
		typeof value.accepted === 'boolean' &&
		arrayOf(isString)(value.failures) &&
		isCount(value.served) &&
		isCount(value.exposed)
	)
}

/** Checks a ranked candidate without quality scores. */
export function isSustainedCandidate(value: unknown): value is SustainedCandidate {
	return (
		isRecord(value) &&
		isString(value.key) &&
		isRefitFile(value.frozen) &&
		isRefitFile(value.resource) &&
		['pilot', 'classification', 'fit', 'preparation'].every(
			(key) => value[key] === undefined || isRefitFile(value[key]),
		) &&
		arrayOf(isSustainedAttempt)(value.attempts) &&
		typeof value.accepted === 'boolean' &&
		arrayOf(isString)(value.failures)
	)
}

/** Checks the frozen feasible choice or explicit inconclusive decision. */
export function isSustainedSelection(value: unknown): value is SustainedSelection {
	return (
		isRecord(value) &&
		value.protocol === 'e1' &&
		isRefitFile(value.development) &&
		isRefitFile(value.evaluation) &&
		arrayOf(isSustainedCandidate)(value.candidates) &&
		(value.chosen === undefined || isString(value.chosen)) &&
		isCount(value.seed) &&
		Array.isArray(value.order) &&
		value.order.length === 2 &&
		value.order.every((one) => one === 'records' || one === 'aggregate') &&
		new Set(value.order).size === 2 &&
		(value.limits === undefined || isSustainedLimits(value.limits)) &&
		typeof value.accepted === 'boolean' &&
		arrayOf(isString)(value.failures)
	)
}

/** Checks one actual tool outcome. */
export function isSustainedReceipt(value: unknown): value is SustainedReceipt {
	return (
		isRecord(value) &&
		[value.goal, value.call, value.tool, value.content].every(isString) &&
		isRecord(value.arguments) &&
		typeof value.success === 'boolean' &&
		isCount(value.after) &&
		(value.version === undefined || isCount(value.version))
	)
}

/** Checks normalized actual conversation evidence. */
export function isSustainedMessage(value: unknown): value is SustainedMessage {
	return (
		isRecord(value) &&
		[value.id, value.role, value.content].every(isString) &&
		typeof value.request === 'boolean' &&
		(value.seed === undefined || isCount(value.seed)) &&
		(value.goal === undefined || isString(value.goal))
	)
}

/** Checks the independent selected/omitted history observations. */
export function isSustainedObservation(value: unknown): value is SustainedObservation {
	return (
		isRecord(value) &&
		isString(value.goal) &&
		isCount(value.shift) &&
		isCount(value.after) &&
		typeof value.checkpoint === 'boolean' &&
		['conversation', 'sources', 'products', 'selected', 'omitted'].every((key) =>
			arrayOf(isString)(value[key]),
		) &&
		isRecord(value.history) &&
		[
			value.history.arrivals,
			value.history.requests,
			value.history.products,
			value.history.tools,
			value.history.total,
		].every(isCount) &&
		typeof value.exposed === 'boolean' &&
		typeof value.complete === 'boolean'
	)
}
