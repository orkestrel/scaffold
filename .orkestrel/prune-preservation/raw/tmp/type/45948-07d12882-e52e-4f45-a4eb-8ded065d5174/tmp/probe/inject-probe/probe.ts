// Orchestrator probe for audit claim 13: the `inject` fence in
// .agents/skills/orkestrel-prove-journey/SKILL.md → Read the variant once, compiled against the
// installed vitest and @orkestrel/test declarations. The workspace's own setup-module import is
// replaced by a local declaration of the same shape; everything else is the fence verbatim.
import type { JourneyVariant } from '@orkestrel/test'
import type { CaptureVariant } from '@orkestrel/test/browser'
import { inject } from 'vitest'

declare function applyTheme(name: string): Promise<void>

declare module 'vitest' {
	interface ProvidedContext {
		readonly variant: string
		readonly variants: readonly JourneyVariant[]
		readonly capture: boolean
	}
}

const VARIANT = inject('variant')
const CAPTURE = inject('capture')
const VARIANTS: readonly CaptureVariant[] = inject('variants').map((variant) => ({
	...variant,
	apply: () => applyTheme(variant.name),
}))

export { CAPTURE, VARIANT, VARIANTS }
