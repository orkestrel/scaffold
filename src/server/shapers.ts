import {
	booleanShape,
	integerShape,
	objectShape,
	optionalShape,
	stringShape,
} from '@orkestrel/contract'
import { MAX_PATH_LENGTH } from '@src/core'
import {
	MAX_SYNC_BASE_LENGTH,
	MAX_SYNC_BRANCH_LENGTH,
	MAX_SYNC_CONCURRENCY,
	MAX_SYNC_BUDGET,
	MAX_SYNC_ITEMS,
	MAX_SYNC_LIMIT,
	MAX_SYNC_RETRIES,
	MAX_SYNC_TIMEOUT,
} from './constants.js'

/** Build the closed upstream-guide endpoint options shape. */
export function syncGuideOptionsShape() {
	return objectShape({
		base: optionalShape(stringShape({ min: 1, max: MAX_SYNC_BASE_LENGTH })),
		branch: optionalShape(stringShape({ min: 1, max: MAX_SYNC_BRANCH_LENGTH })),
		timeout: optionalShape(integerShape({ min: 1, max: MAX_SYNC_TIMEOUT })),
	})
}

/** Build the closed registry endpoint options shape. */
export function syncRegistryOptionsShape() {
	return objectShape({
		base: optionalShape(stringShape({ min: 1, max: MAX_SYNC_BASE_LENGTH })),
		timeout: optionalShape(integerShape({ min: 1, max: MAX_SYNC_TIMEOUT })),
	})
}

/** Build the closed data-only `SyncOptions` shape. */
export function syncOptionsShape() {
	return objectShape({
		guides: optionalShape(syncGuideOptionsShape()),
		registry: optionalShape(syncRegistryOptionsShape()),
		concurrency: optionalShape(integerShape({ min: 1, max: MAX_SYNC_CONCURRENCY })),
		retries: optionalShape(integerShape({ min: 0, max: MAX_SYNC_RETRIES })),
		strict: optionalShape(booleanShape()),
		limit: optionalShape(integerShape({ min: 1, max: MAX_SYNC_LIMIT })),
		items: optionalShape(integerShape({ min: 1, max: MAX_SYNC_ITEMS })),
		budget: optionalShape(integerShape({ min: 1, max: MAX_SYNC_BUDGET })),
	})
}

/** Build the closed data-only `MaterializerOptions` shape. */
export function materializerOptionsShape() {
	return objectShape({
		host: optionalShape(stringShape({ min: 1, max: MAX_PATH_LENGTH })),
	})
}
