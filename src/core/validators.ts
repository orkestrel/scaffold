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
import { createContract } from '@orkestrel/contract'
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
 * Narrow a value to an `Artifact` — `group` / `origin` on-vocabulary.
 *
 * @remarks
 * Compiled from {@link artifactShape} via `createContract` (AGENTS §14) — a
 * total `Guard`, adversarial input returns `false`, never throws.
 */
export const isArtifact: Guard<Artifact> = createContract(artifactShape()).is

/**
 * Narrow a value to a `Plan` — the whole exact-record contract, section
 * guards composed.
 *
 * @remarks
 * Compiled from {@link planShape} via `createContract` (AGENTS §14) — a
 * total `Guard`, adversarial input returns `false`, never throws.
 */
export const isPlan: Guard<Plan> = createContract(planShape()).is

/**
 * Narrow a value to a `SyncReport` — the whole exact-record sync contract,
 * `guide` / `version` sections composed.
 *
 * @remarks
 * Compiled from {@link syncReportShape} via `createContract` (AGENTS §14) — a
 * total `Guard`, adversarial input returns `false`, never throws.
 */
export const isSyncReport: Guard<SyncReport> = createContract(syncReportShape()).is
