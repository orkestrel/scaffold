import type {
	Blueprint,
	CompilerInterface,
	CompilerOptions,
	PlanManagerInterface,
	PlanManagerOptions,
} from './types.js'
import { Compiler } from './Compiler.js'
import { PlanManager } from './PlanManager.js'
import { blueprint } from './helpers.js'
import { isBlueprint } from './validators.js'
import { validateBlueprint } from './helpers.js'
import { ScaffoldError } from './errors.js'

/**
 * Create a `CompilerInterface` — the compilation orchestrator.
 *
 * @param options - `CompilerOptions` — `on` initial event listeners, `error` the listener-error handler.
 * @returns A fresh `Compiler`.
 *
 * @example
 * ```ts
 * import { createCompiler } from '@src/core'
 *
 * const compiler = createCompiler()
 * compiler.destroy()
 * ```
 */
export function createCompiler(options?: CompilerOptions): CompilerInterface {
	return new Compiler(options)
}

/**
 * Create a working `PlanManagerInterface`.
 *
 * @param options - `PlanManagerOptions` — `plans` to seed the registry, `on` / `error` for the emitter.
 * @returns A fresh `PlanManager`.
 *
 * @example
 * ```ts
 * import { createPlanManager } from '@src/core'
 *
 * const plans = createPlanManager()
 * plans.size // 0
 * plans.destroy()
 * ```
 */
export function createPlanManager(options?: PlanManagerOptions): PlanManagerInterface {
	return new PlanManager(options)
}

/**
 * Validate and return a `Blueprint` from plain data.
 *
 * @param data - A `name` plus a partial of the remaining `Blueprint` fields.
 * @remarks
 * Fills the builder defaults, then checks BOTH the exact-record shape
 * (`isBlueprint`) and the semantic pass (`validateBlueprint`) — so an
 * off-`NAME_PATTERN` name throws here too.
 * @returns The validated `Blueprint`.
 * @throws {@link ScaffoldError} coded `INVALID` when the structure or the
 * semantic pass fails.
 *
 * @example
 * ```ts
 * import { createBlueprint } from '@src/core'
 *
 * createBlueprint({ name: 'Router', surfaces: [] }) // throws ScaffoldError('INVALID', …)
 * ```
 */
export function createBlueprint(data: Partial<Blueprint> & { readonly name: string }): Blueprint {
	const candidate = blueprint(data.name, data)
	if (!isBlueprint(candidate)) {
		throw new ScaffoldError('INVALID', 'Blueprint failed the exact-record contract', {
			name: data.name,
		})
	}
	const validation = validateBlueprint(candidate)
	if (!validation.valid) {
		throw new ScaffoldError('INVALID', 'Blueprint failed validation', {
			questions: validation.questions,
		})
	}
	return candidate
}
