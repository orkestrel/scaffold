import type { Blueprint, CompilerOptions, Extension, Group, Snapshot } from './types.js'
import { isString } from '@orkestrel/contract'
import {
	isBlueprint,
	isCompilerOptions,
	isExtension,
	isGroups,
	isSnapshot,
	isSurface,
} from './validators.js'

/**
 * Coerces an extension value or a `surface:name` selection into an extension.
 * @param value - An extension record or its selection text.
 * @returns The extension, or `undefined` for a malformed or unsupported selection.
 * @remarks Browser text has empty axes; the creating command supplies its selected browser axes.
 * @example
 * ```ts
 * import { parseExtension } from '@orkestrel/scaffold'
 *
 * parseExtension('browser:vue') // { surface: 'browser', name: 'vue', axes: [] }
 * parseExtension('styles:print') // { surface: 'styles', name: 'print' }
 * ```
 */
export function parseExtension(value: unknown): Extension | undefined {
	if (isExtension(value)) return value
	if (!isString(value)) return undefined
	const [surface, name, excess] = value.split(':')
	if (excess !== undefined || !isSurface(surface)) return undefined
	const candidate = surface === 'browser' ? { surface, name, axes: [] } : { surface, name }
	return isExtension(candidate) ? candidate : undefined
}

/**
 * Coerces an untrusted value to a {@link Blueprint}.
 *
 * @param value - The value to parse.
 * @returns The blueprint, or `undefined` when the value is not one.
 *
 * @remarks
 * Derived from {@link isBlueprint}, which is what makes the pair sound in both
 * directions: a guard-valid value is returned unchanged, and every value this
 * returns satisfies that guard. The reference is returned rather than copied,
 * so a caller that means to own the value clones it.
 *
 * @example
 * ```ts
 * import { parseBlueprint } from '@orkestrel/scaffold'
 *
 * parseBlueprint({ name: 'router' }) // undefined
 * ```
 */
export function parseBlueprint(value: unknown): Blueprint | undefined {
	return isBlueprint(value) ? value : undefined
}

/**
 * Coerces an untrusted value to a group selection.
 *
 * @param value - The value to parse.
 * @returns The selection, or `undefined` when the value is not one.
 *
 * @remarks
 * Derived from {@link isGroups}. Order and repetition are preserved: which
 * groups a plan finally covers, and in which order, is the compiler's to decide
 * from `GROUPS`, not this boundary's.
 *
 * @example
 * ```ts
 * import { parseGroups } from '@orkestrel/scaffold'
 *
 * parseGroups(['manifest', 'configs']) // ['manifest', 'configs']
 * parseGroups(['readme']) // undefined
 * ```
 */
export function parseGroups(value: unknown): readonly Group[] | undefined {
	return isGroups(value) ? value : undefined
}

/**
 * Coerces an untrusted value to a {@link Snapshot}.
 *
 * @param value - The value to parse.
 * @returns The snapshot, or `undefined` when the value is not one.
 *
 * @remarks
 * Derived from {@link isSnapshot}.
 *
 * @example
 * ```ts
 * import { parseSnapshot } from '@orkestrel/scaffold'
 *
 * parseSnapshot({ 'AGENTS.md': '68690a' }) // { 'AGENTS.md': '68690a' }
 * parseSnapshot({ 'AGENTS.md': null }) // undefined
 * ```
 */
export function parseSnapshot(value: unknown): Snapshot | undefined {
	return isSnapshot(value) ? value : undefined
}

/**
 * Coerces an untrusted value to {@link CompilerOptions}.
 *
 * @param value - The value to parse.
 * @returns The options, or `undefined` when the value is not an option bag.
 *
 * @remarks
 * Derived from {@link isCompilerOptions}. Absence is not an option bag, so
 * `undefined` in returns `undefined` out and a constructor reads that as the
 * defaults rather than as a refusal.
 *
 * @example
 * ```ts
 * import { parseCompilerOptions } from '@orkestrel/scaffold'
 *
 * parseCompilerOptions({ on: { compile: () => {} } }) // the same record
 * parseCompilerOptions({ on: { compiled: () => {} } }) // undefined
 * ```
 */
export function parseCompilerOptions(value: unknown): CompilerOptions | undefined {
	return isCompilerOptions(value) ? value : undefined
}
