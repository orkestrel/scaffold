import type { DurationCase } from './types.ts'

export const DURATION_CASES: readonly DurationCase[] = Object.freeze([
	['negative', -1],
	['missing', undefined],
	['nan', Number.NaN],
	['infinite', Infinity],
])
