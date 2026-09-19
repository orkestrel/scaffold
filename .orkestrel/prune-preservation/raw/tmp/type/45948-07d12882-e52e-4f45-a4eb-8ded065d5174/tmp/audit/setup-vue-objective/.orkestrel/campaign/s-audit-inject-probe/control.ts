// Negative control for the inject probe: the same augmentation with the `variant` key read into
// a boolean. The compile must refuse this file, or the clean compile of probe.ts measured nothing.
import type { JourneyVariant } from '@orkestrel/test'
import { inject } from 'vitest'

declare module 'vitest' {
	interface ProvidedContext {
		readonly variant: string
		readonly variants: readonly JourneyVariant[]
		readonly capture: boolean
	}
}

const WRONG: boolean = inject('variant')

export { WRONG }
