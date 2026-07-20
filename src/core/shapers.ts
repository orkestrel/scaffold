import {
	arrayShape,
	booleanShape,
	integerShape,
	literalShape,
	objectShape,
	optionalShape,
	stringShape,
} from '@orkestrel/contract'
import { CATEGORIES, FRESHNESS, GROUPS, ORIGINS, SURFACES } from './constants.js'

/**
 * Build the `Dependency` object shape.
 *
 * @returns A fresh `ContractShape` describing `{ name, range, optional? }`.
 */
export function dependencyShape() {
	return objectShape({
		name: stringShape({ min: 1 }),
		range: stringShape({ min: 1 }),
		optional: optionalShape(booleanShape()),
	})
}

/**
 * Build the `Override` object shape.
 *
 * @returns A fresh `ContractShape` describing `{ path, content }`.
 */
export function overrideShape() {
	return objectShape({
		path: stringShape({ min: 1 }),
		content: stringShape({ min: 1 }),
	})
}

/**
 * Build the `Blueprint` object shape.
 *
 * @remarks
 * `surfaces` is a `literalShape(SURFACES)` array with `min: 1`; `name` is a
 * plain `min: 1` string, NOT pattern-constrained, so `generate` stays
 * satisfiable — the `NAME_PATTERN` law lives in the semantic pass
 * (`validateBlueprint`), never in this compiled contract. `peers` and `extras`
 * are `dependencyShape()` arrays alongside `dependencies` — the cross-array
 * uniqueness and overlap rules also live in `validateBlueprint`.
 *
 * @returns A fresh `ContractShape` describing the closed `Blueprint` spec.
 */
export function blueprintShape() {
	return objectShape({
		name: stringShape({ min: 1 }),
		description: optionalShape(stringShape()),
		keywords: arrayShape(stringShape()),
		surfaces: arrayShape(literalShape(SURFACES), { min: 1 }),
		dependencies: arrayShape(dependencyShape()),
		peers: arrayShape(dependencyShape()),
		extras: arrayShape(dependencyShape()),
		version: stringShape({ min: 1 }),
		engines: stringShape({ min: 1 }),
		overrides: arrayShape(overrideShape()),
		engine: booleanShape(),
	})
}

/**
 * Build the `Member` object shape.
 *
 * @returns A fresh `ContractShape` describing `{ name, category, summary, surface }`.
 */
export function memberShape() {
	return objectShape({
		name: stringShape({ min: 1 }),
		category: literalShape(CATEGORIES),
		summary: stringShape({ min: 1 }),
		surface: literalShape(SURFACES),
	})
}

/**
 * Build the `Artifact` object shape.
 *
 * @remarks
 * `origin` is a `literalShape(ORIGINS)`; `content` and `source` are both
 * optional (the `origin` axis decides which one a given artifact carries).
 *
 * @returns A fresh `ContractShape` describing one planned file.
 */
export function artifactShape() {
	return objectShape({
		path: stringShape({ min: 1 }),
		group: literalShape(GROUPS),
		origin: literalShape(ORIGINS),
		surface: optionalShape(literalShape(SURFACES)),
		content: optionalShape(stringShape()),
		source: optionalShape(stringShape()),
	})
}

/**
 * Build the whole `Plan` object shape.
 *
 * @remarks
 * Composes {@link blueprintShape} and {@link artifactShape}; `trace` and
 * `hash` are optional (filled by the pin).
 *
 * @returns A fresh `ContractShape` describing the compiled, ordered plan.
 */
export function planShape() {
	return objectShape({
		blueprint: blueprintShape(),
		groups: arrayShape(literalShape(GROUPS)),
		artifacts: arrayShape(artifactShape()),
		trace: optionalShape(stringShape()),
		hash: optionalShape(stringShape()),
	})
}

/**
 * Build the `SyncReport` object shape.
 *
 * @remarks
 * `guides` / `versions` are array sub-shapes, each with a
 * `literalShape(FRESHNESS)` `freshness` field; `isSyncReport` /
 * `parseSyncReport` compile from it.
 *
 * @returns A fresh `ContractShape` describing the whole sync outcome.
 */
export function syncReportShape() {
	return objectShape({
		target: stringShape({ min: 1 }),
		guides: arrayShape(
			objectShape({
				name: stringShape({ min: 1 }),
				path: stringShape({ min: 1 }),
				content: stringShape(),
				freshness: literalShape(FRESHNESS),
				note: optionalShape(stringShape()),
			}),
		),
		versions: arrayShape(
			objectShape({
				name: stringShape({ min: 1 }),
				range: stringShape({ min: 1 }),
				latest: stringShape(),
				freshness: literalShape(FRESHNESS),
				note: optionalShape(stringShape()),
			}),
		),
		clean: booleanShape(),
		failed: integerShape({ min: 0 }),
	})
}
