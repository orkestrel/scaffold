import {
	arrayShape,
	booleanShape,
	integerShape,
	literalShape,
	objectShape,
	optionalShape,
	stringShape,
	unionShape,
} from '@orkestrel/contract'
import {
	CATEGORIES,
	FRESHNESS,
	GROUPS,
	MAX_ARTIFACT_BYTES,
	MAX_ARTIFACT_HEX_LENGTH,
	MAX_COLLECTION_ITEMS,
	MAX_DEPENDENCY_NAME_LENGTH,
	MAX_NAME_LENGTH,
	MAX_PATH_LENGTH,
	MAX_RANGE_LENGTH,
	ENVIRONMENTS,
	SYNC_BASELINE_PATTERN,
} from './constants.js'

/**
 * Build the `Dependency` object shape.
 *
 * @returns A fresh `ContractShape` describing `{ name, range, optional? }`.
 */
export function dependencyShape() {
	return objectShape({
		name: stringShape({ min: 1, max: MAX_DEPENDENCY_NAME_LENGTH }),
		range: stringShape({ min: 1, max: MAX_RANGE_LENGTH }),
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
		path: stringShape({ min: 1, max: MAX_PATH_LENGTH }),
		content: stringShape({ min: 1, max: MAX_ARTIFACT_BYTES }),
	})
}

/**
 * Build the `Blueprint` object shape.
 *
 * @remarks
 * `src` and `app` are independent `literalShape(ENVIRONMENTS)` arrays; the
 * cross-field requirement that at least one is non-empty lives in
 * `hasBlueprintEnvironment`. `name` is a plain `min: 1` string, NOT
 * pattern-constrained, so `generate` stays satisfiable — the `NAME_PATTERN`
 * law lives in the semantic pass (`validateBlueprint`), never in this compiled
 * contract. `peers` and `extras` are `dependencyShape()` arrays alongside
 * `dependencies` — the cross-array uniqueness and overlap rules also live in
 * `validateBlueprint`.
 *
 * @returns A fresh `ContractShape` describing the closed `Blueprint` spec.
 */
export function blueprintShape() {
	return objectShape({
		name: stringShape({ min: 1, max: MAX_NAME_LENGTH }),
		description: optionalShape(stringShape({ max: MAX_ARTIFACT_BYTES })),
		keywords: arrayShape(stringShape({ max: MAX_PATH_LENGTH }), {
			max: MAX_COLLECTION_ITEMS,
		}),
		src: arrayShape(literalShape(ENVIRONMENTS), { max: ENVIRONMENTS.length }),
		app: arrayShape(literalShape(ENVIRONMENTS), { max: ENVIRONMENTS.length }),
		dependencies: arrayShape(dependencyShape(), { max: MAX_COLLECTION_ITEMS }),
		peers: arrayShape(dependencyShape(), { max: MAX_COLLECTION_ITEMS }),
		extras: arrayShape(dependencyShape(), { max: MAX_COLLECTION_ITEMS }),
		version: stringShape({ min: 1, max: MAX_RANGE_LENGTH }),
		engines: stringShape({ min: 1, max: MAX_RANGE_LENGTH }),
		overrides: arrayShape(overrideShape(), { max: MAX_COLLECTION_ITEMS }),
		bin: booleanShape(),
		integration: booleanShape(),
		service: booleanShape(),
		global: booleanShape(),
	})
}

/**
 * Build the `Member` object shape.
 *
 * @returns A fresh `ContractShape` describing `{ name, category, summary, environment }`.
 */
export function memberShape() {
	return objectShape({
		name: stringShape({ min: 1, max: MAX_PATH_LENGTH }),
		category: literalShape(CATEGORIES),
		summary: stringShape({ min: 1, max: MAX_PATH_LENGTH }),
		environment: literalShape(ENVIRONMENTS),
	})
}

/**
 * Build the `Artifact` object shape.
 *
 * @remarks
 * The `origin` axis is structural: host artifacts may carry `source` and
 * byte `hex`, while template/computed artifacts require text `content`.
 * Lowercase byte-pair validation remains a semantic refinement so the
 * contract generator can continue producing unconstrained strings.
 *
 * @returns A fresh `ContractShape` describing one planned file.
 */
export function artifactShape() {
	return unionShape(
		objectShape({
			path: stringShape({ min: 1, max: MAX_PATH_LENGTH }),
			group: literalShape(GROUPS),
			origin: literalShape(['host']),
			environment: optionalShape(literalShape(ENVIRONMENTS)),
			hex: optionalShape(stringShape({ max: MAX_ARTIFACT_HEX_LENGTH })),
			source: optionalShape(stringShape({ max: MAX_PATH_LENGTH })),
		}),
		objectShape({
			path: stringShape({ min: 1, max: MAX_PATH_LENGTH }),
			group: literalShape(GROUPS),
			origin: literalShape(['template', 'computed']),
			environment: optionalShape(literalShape(ENVIRONMENTS)),
			content: stringShape({ max: MAX_ARTIFACT_BYTES }),
		}),
	)
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
		groups: arrayShape(literalShape(GROUPS), { max: GROUPS.length }),
		artifacts: arrayShape(artifactShape(), { max: MAX_COLLECTION_ITEMS }),
		trace: optionalShape(stringShape({ max: MAX_PATH_LENGTH })),
		hash: optionalShape(stringShape({ max: MAX_PATH_LENGTH })),
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
		target: stringShape({ min: 1, max: MAX_PATH_LENGTH }),
		guides: arrayShape(
			objectShape({
				name: stringShape({ min: 1, max: MAX_DEPENDENCY_NAME_LENGTH }),
				path: stringShape({ min: 1, max: MAX_PATH_LENGTH }),
				content: stringShape({ max: MAX_ARTIFACT_BYTES }),
				freshness: literalShape(FRESHNESS),
				note: optionalShape(stringShape({ max: MAX_PATH_LENGTH })),
				baseline: optionalShape(stringShape({ pattern: SYNC_BASELINE_PATTERN })),
			}),
			{ max: MAX_COLLECTION_ITEMS },
		),
		versions: arrayShape(
			objectShape({
				name: stringShape({ min: 1, max: MAX_DEPENDENCY_NAME_LENGTH }),
				range: stringShape({ min: 1, max: MAX_RANGE_LENGTH }),
				latest: stringShape({ max: MAX_RANGE_LENGTH }),
				freshness: literalShape(FRESHNESS),
				note: optionalShape(stringShape({ max: MAX_PATH_LENGTH })),
			}),
			{ max: MAX_COLLECTION_ITEMS },
		),
		clean: booleanShape(),
		failed: integerShape({ min: 0 }),
	})
}
