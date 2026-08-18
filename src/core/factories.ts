import type { Blueprint, CompilerInterface, CompilerOptions } from './types.js'
import { Compiler } from './Compiler.js'
import { cloneValue } from './cloners.js'
import { DEFAULT_ENGINES, DEFAULT_VERSION } from './constants.js'
import { ScaffoldError } from './errors.js'
import { parseBlueprint } from './parsers.js'

/**
 * Construct a {@link Blueprint} from a name and the fields that differ from the defaults.
 *
 * @param name - The bare workspace name.
 * @param input - The fields to set; every omitted field takes its default.
 * @returns The filled blueprint, owned by the caller and sharing nothing with `input`.
 * @throws {@link ScaffoldError} coded `INVALID` when the filled record is not a
 * blueprint.
 *
 * @remarks
 * A blueprint is a closed record, and most of its fields have one sensible
 * starting value: an empty list, a cleared flag, `DEFAULT_VERSION`, and
 * `DEFAULT_ENGINES`. Filling them here is what lets a caller state only what its
 * workspace actually declares.
 *
 * This is the construction door, and {@link parseBlueprint} is the coercing one.
 * They differ in all three of their parts: this fills the defaults and takes a
 * partial specification, where the parser fills nothing and takes an untrusted
 * value; and this refuses by throwing, where the parser refuses by answering
 * `undefined`. What they share is the law — both accept exactly what
 * `isBlueprint` accepts.
 *
 * That law is structural only. Whether the name is a name, the version a
 * version, and the two environment axes a combination this package can generate
 * are the gate's laws, and the gate answers them with {@link Question}s carrying
 * their accepted candidates. Deciding them here as well would state one law in
 * two places and let the two answers disagree, so a blueprint the gate will
 * refuse is still constructible.
 *
 * @example
 * ```ts
 * import { createBlueprint } from '@orkestrel/scaffold'
 *
 * createBlueprint('router', { src: ['core'] }).version // '0.0.1'
 * createBlueprint('Router').name // 'Router' — the gate refuses it, this does not
 * ```
 */
export function createBlueprint(name: string, input?: Partial<Omit<Blueprint, 'name'>>): Blueprint {
	const candidate = {
		name,
		...(input?.description === undefined ? {} : { description: input.description }),
		keywords: input?.keywords ?? [],
		src: input?.src ?? [],
		app: input?.app ?? [],
		dependencies: input?.dependencies ?? [],
		peers: input?.peers ?? [],
		extras: input?.extras ?? [],
		version: input?.version ?? DEFAULT_VERSION,
		engines: input?.engines ?? DEFAULT_ENGINES,
		overrides: input?.overrides ?? [],
		bin: input?.bin ?? false,
		setup: input?.setup ?? false,
		guides: input?.guides ?? false,
		distribution: input?.distribution ?? false,
		integration: input?.integration ?? false,
		conformance: input?.conformance ?? false,
		service: input?.service ?? false,
		vendors: input?.vendors ?? [],
		global: input?.global ?? false,
		showcase: input?.showcase ?? false,
	}
	const blueprint = parseBlueprint(cloneValue(candidate))
	if (blueprint === undefined) {
		throw new ScaffoldError('INVALID', 'The filled record is not a blueprint.', { name })
	}
	return blueprint
}

/**
 * Construct a {@link Compiler}.
 *
 * @param options - The initial listeners and the listener-error handler.
 * @returns The compiler, typed as the contract consumers program against.
 * @throws {@link ScaffoldError} coded `INVALID` when `options` is present but is
 * not an option bag the compiler accepts.
 *
 * @example
 * ```ts
 * import { createCompiler } from '@orkestrel/scaffold'
 *
 * const compiler = createCompiler({ on: { block: (questions) => report(questions) } })
 * compiler.destroy()
 * ```
 */
export function createCompiler(options?: CompilerOptions): CompilerInterface {
	return new Compiler(options)
}
