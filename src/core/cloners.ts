import type { JSONValue } from '@orkestrel/contract'
import { attempt, cloneJSONValue } from '@orkestrel/contract'

/**
 * Snapshot an untrusted value into exact JSON data the caller owns.
 *
 * @param value - The untrusted value to take ownership of.
 * @returns A deeply frozen copy sharing nothing with `value`, or `undefined`
 * when the value is not exact acyclic JSON data.
 *
 * @remarks
 * This fixes the order every boundary in this package reads a caller's value
 * in: snapshot first, then guard the snapshot. A guard reads `value[key]`, so a
 * property backed by an accessor can answer one thing while the guard runs and
 * another while the accepted value is used, and no guard closes that race from
 * inside. The snapshot closes it. The installed `cloneJSONValue` refuses any
 * property that is not an own enumerable data property, so an accessor never
 * reaches the guard at all, and it reads every value it keeps exactly once from
 * that property's descriptor. What the guard measures is what every later read
 * returns.
 *
 * The result is a frozen null-prototype record or a frozen intrinsic array, and
 * this package's guards accept both, so the snapshot passes `isBlueprint`,
 * `isSnapshot`, and the parsers derived from them unchanged.
 *
 * Ownership is refused rather than raised. A value carrying a function, an
 * `undefined`, a symbol key, a cycle, a non-finite number, or more nodes than
 * `@orkestrel/contract` admits answers `undefined`, which leaves each caller
 * free to decide what a refusal means — the compiler throws `INVALID`, the gate
 * asks a `Question` — and keeps `ScaffoldError` the only error this package
 * throws.
 *
 * The node ceiling is the installed package's `CLONE_NODE_LIMIT`, and it counts
 * every record, array, and leaf the snapshot would contain, so it bounds breadth
 * and depth together. This package declares no ceiling of its own beside it: a
 * local number no code here can enforce could only disagree with the one that
 * binds.
 *
 * @example
 * ```ts
 * import { cloneValue, parseBlueprint } from '@orkestrel/scaffold'
 *
 * const owned = parseBlueprint(cloneValue(input))
 * ```
 */
export function cloneValue(value: unknown): JSONValue | undefined {
	const outcome = attempt(() => cloneJSONValue(value))
	return outcome.success ? outcome.value : undefined
}
