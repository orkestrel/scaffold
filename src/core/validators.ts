import type { Guard } from '@orkestrel/contract'
import type {
	Artifact,
	Blueprint,
	Dependency,
	Member,
	Override,
	Plan,
	SyncReport,
} from './types.js'
import { andOf, attempt, createContract } from '@orkestrel/contract'
import { HEX_PATTERN } from './constants.js'
import {
	artifactShape,
	blueprintShape,
	dependencyShape,
	memberShape,
	overrideShape,
	planShape,
	syncReportShape,
} from './shapers.js'

/**
 * Narrow a value to a `Dependency` — `name` and `range` non-empty strings.
 *
 * @remarks
 * Compiled from {@link dependencyShape} via `createContract` (AGENTS §14) — a
 * total `Guard`, adversarial input returns `false`, never throws.
 */
export const isDependency: Guard<Dependency> = createContract(dependencyShape()).is

/**
 * Narrow a value to an `Override` — `path` and `content` non-empty strings.
 *
 * @remarks
 * Compiled from {@link overrideShape} via `createContract` (AGENTS §14) — a
 * total `Guard`, adversarial input returns `false`, never throws.
 */
export const isOverride: Guard<Override> = createContract(overrideShape()).is

/**
 * Narrow a value to a `Blueprint` — `surfaces` on-vocabulary and non-empty,
 * `name` a non-empty string.
 *
 * @remarks
 * Compiled from {@link blueprintShape} via `createContract` (AGENTS §14) —
 * the `NAME_PATTERN` law is the semantic pass's (`validateBlueprint`), not
 * this shape's; a total `Guard`, adversarial input returns `false`, never
 * throws.
 */
export const isBlueprint: Guard<Blueprint> = createContract(blueprintShape()).is

/**
 * Narrow a value to a `Member` — `category` and `surface` on-vocabulary.
 *
 * @remarks
 * Compiled from {@link memberShape} via `createContract` (AGENTS §14) — a
 * total `Guard`, adversarial input returns `false`, never throws.
 */
export const isMember: Guard<Member> = createContract(memberShape()).is

/**
 * Apply the semantic lowercase byte-pair law to an artifact's optional hex.
 *
 * @param artifact - The structurally valid artifact to inspect.
 * @returns `true` when `hex` is absent or encodes whole lowercase bytes.
 */
export function hasValidArtifactHex(artifact: Artifact): boolean {
	const result = attempt(() => artifact.hex === undefined || HEX_PATTERN.test(artifact.hex))
	return result.success && result.value
}

/**
 * Apply the artifact byte law to every nested artifact in a `Plan`.
 *
 * @param plan - The structurally valid plan to inspect.
 * @returns `true` when every artifact has absent or valid lowercase byte hex.
 */
export function hasValidPlanHex(plan: Plan): boolean {
	const result = attempt(() => plan.artifacts.every(hasValidArtifactHex))
	return result.success && result.value
}

/**
 * Narrow a value to an origin-discriminated `Artifact`.
 *
 * @remarks
 * Compiled from {@link artifactShape} and refined by
 * {@link hasValidArtifactHex}; total for adversarial input.
 */
export const isArtifact: Guard<Artifact> = andOf(
	createContract(artifactShape()).is,
	hasValidArtifactHex,
)

/**
 * Narrow a value to a `Plan` — the whole exact-record contract, section
 * guards composed.
 *
 * @remarks
 * Compiled from {@link planShape} via `createContract` (AGENTS §14) — a
 * total `Guard`, adversarial input returns `false`, never throws.
 */
export const isPlan: Guard<Plan> = andOf(createContract(planShape()).is, hasValidPlanHex)

/**
 * Narrow a value to a `SyncReport` — the whole exact-record sync contract,
 * `guide` / `version` sections composed.
 *
 * @remarks
 * Compiled from {@link syncReportShape} via `createContract` (AGENTS §14) — a
 * total `Guard`, adversarial input returns `false`, never throws.
 */
export const isSyncReport: Guard<SyncReport> = createContract(syncReportShape()).is
