import { KNOWN_VERBS } from './constants.js'
import type { Verb } from './types.js'

/** Narrow a positional command to the command-line interface's vocabulary. */
export function isVerb(value: string): value is Verb {
	return KNOWN_VERBS.some((verb) => verb === value)
}
