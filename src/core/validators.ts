import type { Guard } from '@orkestrel/contract'
import type { EmitterErrorHandler, EmitterHooks } from '@orkestrel/emitter'
import type {
	Artifact,
	Audit,
	Blueprint,
	CompilerEventMap,
	Dependency,
	Member,
	Override,
	Plan,
	PlanManagerEventMap,
	Question,
	Snapshot,
	SyncReport,
	Validation,
} from './types.js'
import { andOf, attempt, createContract, isFunction, isRecord, isString } from '@orkestrel/contract'
import {
	HEX_PATTERN,
	MAX_ARTIFACT_BYTES,
	MAX_COLLECTION_ITEMS,
	MAX_DATA_GRAPH_KEYS,
	MAX_DATA_GRAPH_NODES,
	MAX_NAME_LENGTH,
	MAX_TOTAL_ARTIFACT_BYTES,
	NAME_PATTERN,
} from './constants.js'
import { contentByteLength, validateBlueprint } from './helpers.js'
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
export const isOverride: Guard<Override> = andOf(
	createContract(overrideShape()).is,
	hasValidOverrideBytes,
)

/** Determine whether one override fits the public UTF-8 artifact byte limit. */
export function hasValidOverrideBytes(override: Override): boolean {
	const result = attempt(() => contentByteLength(override.content) <= MAX_ARTIFACT_BYTES)
	return result.success && result.value
}

/**
 * Narrow a value to the bounded bare name accepted by a workspace blueprint.
 *
 * @param value - The candidate workspace name.
 * @returns `true` only for a `NAME_PATTERN` string no longer than `MAX_NAME_LENGTH`.
 */
export function isWorkspaceName(value: unknown): value is string {
	return isString(value) && value.length <= MAX_NAME_LENGTH && NAME_PATTERN.test(value)
}

/**
 * Determine whether a structured boundary contains data properties only.
 *
 * @param value - The candidate record/array graph.
 * @returns `true` when copying the graph cannot invoke a user-defined accessor.
 */
export function hasOnlyDataProperties(value: unknown): boolean {
	const result = attempt(() => {
		const pending: unknown[] = [value]
		const visited = new WeakSet<object>()
		let nodes = 0
		let keys = 0
		while (pending.length > 0) {
			const current = pending.pop()
			if (!isRecord(current) && !Array.isArray(current)) continue
			if (visited.has(current)) continue
			visited.add(current)
			nodes += 1
			if (nodes > MAX_DATA_GRAPH_NODES) return false
			const ownKeys = Reflect.ownKeys(current)
			keys += ownKeys.length
			if (keys > MAX_DATA_GRAPH_KEYS) return false
			for (const key of ownKeys) {
				const descriptor = Reflect.getOwnPropertyDescriptor(current, key)
				if (descriptor === undefined || !Reflect.has(descriptor, 'value')) return false
				if (isRecord(descriptor.value) || Array.isArray(descriptor.value)) {
					pending.push(descriptor.value)
				}
			}
		}
		return true
	})
	return result.success && result.value
}

/**
 * Narrow a value to a bounded dense array with index data properties only.
 *
 * @param value - The candidate array.
 * @param limit - Maximum item count.
 * @param guard - The item contract.
 * @returns `true` only when no custom iterator, method, symbol, accessor, or sparse index exists.
 */
export function isDenseDataArray<T>(
	value: unknown,
	limit: number,
	guard: Guard<T>,
): value is readonly T[] {
	const result = attempt(() => {
		if (!Number.isSafeInteger(limit) || limit < 0 || !Array.isArray(value)) return false
		const lengthDescriptor = Reflect.getOwnPropertyDescriptor(value, 'length')
		const length = lengthDescriptor?.value
		if (
			lengthDescriptor === undefined ||
			!Reflect.has(lengthDescriptor, 'value') ||
			typeof length !== 'number' ||
			!Number.isSafeInteger(length) ||
			length < 0 ||
			length > limit
		) {
			return false
		}
		const keys = Reflect.ownKeys(value)
		if (keys.length !== length + 1 || !keys.includes('length')) return false
		for (let index = 0; index < length; index += 1) {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, String(index))
			if (
				descriptor === undefined ||
				!Reflect.has(descriptor, 'value') ||
				!guard(descriptor.value)
			) {
				return false
			}
		}
		return true
	})
	return result.success && result.value
}

/** Narrow a listener-error handler accepted by the shared emitter. */
export function isEmitterErrorHandler(value: unknown): value is EmitterErrorHandler {
	return isFunction(value)
}

/** Narrow an exact initial-listener record for `Compiler`. */
export function isCompilerEventHooks(value: unknown): value is EmitterHooks<CompilerEventMap> {
	const result = attempt(() => {
		if (!isRecord(value)) return false
		const keys = Reflect.ownKeys(value)
		if (
			keys.some(
				(key) =>
					key !== 'compile' &&
					key !== 'block' &&
					key !== 'audit' &&
					key !== 'error' &&
					key !== 'destroy',
			)
		) {
			return false
		}
		return keys.every((key) => {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, key)
			return (
				descriptor !== undefined && Reflect.has(descriptor, 'value') && isFunction(descriptor.value)
			)
		})
	})
	return result.success && result.value
}

/** Narrow an exact initial-listener record for `PlanManager`. */
export function isPlanManagerEventHooks(
	value: unknown,
): value is EmitterHooks<PlanManagerEventMap> {
	const result = attempt(() => {
		if (!isRecord(value)) return false
		const keys = Reflect.ownKeys(value)
		if (keys.some((key) => key !== 'add' && key !== 'remove' && key !== 'destroy')) return false
		return keys.every((key) => {
			const descriptor = Reflect.getOwnPropertyDescriptor(value, key)
			return (
				descriptor !== undefined && Reflect.has(descriptor, 'value') && isFunction(descriptor.value)
			)
		})
	})
	return result.success && result.value
}

/**
 * Whether a structurally valid blueprint selects at least one source or app environment.
 *
 * @param blueprint - The structurally valid blueprint to inspect.
 * @returns `true` when `src` or `app` is non-empty.
 */
export function hasBlueprintEnvironment(blueprint: Blueprint): boolean {
	return blueprint.src.length > 0 || blueprint.app.length > 0
}

/** Determine whether blueprint-authored text fits the per-item and aggregate byte limits. */
export function hasValidBlueprintBytes(blueprint: Blueprint): boolean {
	const result = attempt(() => {
		let total = blueprint.description === undefined ? 0 : contentByteLength(blueprint.description)
		if (total > MAX_ARTIFACT_BYTES) return false
		for (const override of blueprint.overrides) {
			const bytes = contentByteLength(override.content)
			if (bytes > MAX_ARTIFACT_BYTES) return false
			total += bytes
			if (total > MAX_TOTAL_ARTIFACT_BYTES) return false
		}
		return true
	})
	return result.success && result.value
}

/**
 * Narrow a value to a `Blueprint` with at least one source or application environment.
 *
 * @remarks
 * Compiled from {@link blueprintShape} via `createContract` and refined by
 * {@link hasBlueprintEnvironment}. The `NAME_PATTERN` law remains in the semantic
 * pass; this total guard returns `false` for adversarial input and never throws.
 */
export const isBlueprint: Guard<Blueprint> = andOf(
	andOf(createContract(blueprintShape()).is, hasBlueprintEnvironment),
	hasValidBlueprintBytes,
)

/**
 * Narrow a value to a `Member` — `category` and `environment` on-vocabulary.
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

/** Determine whether one artifact fits the public physical-byte limit. */
export function hasValidArtifactBytes(artifact: Artifact): boolean {
	const result = attempt(() =>
		artifact.origin === 'host'
			? artifact.hex === undefined || artifact.hex.length / 2 <= MAX_ARTIFACT_BYTES
			: contentByteLength(artifact.content) <= MAX_ARTIFACT_BYTES,
	)
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

/** Determine whether a plan fits the aggregate retained-artifact byte limit. */
export function hasValidPlanBytes(plan: Plan): boolean {
	const result = attempt(() => {
		let total = 0
		for (const artifact of plan.artifacts) {
			const bytes =
				artifact.origin === 'host'
					? artifact.hex === undefined
						? 0
						: artifact.hex.length / 2
					: contentByteLength(artifact.content)
			if (bytes > MAX_ARTIFACT_BYTES) return false
			total += bytes
			if (total > MAX_TOTAL_ARTIFACT_BYTES) return false
		}
		return hasValidBlueprintBytes(plan.blueprint)
	})
	return result.success && result.value
}

/** Determine whether an audit snapshot fits the aggregate retained-byte limit. */
export function hasValidAuditBytes(audit: Audit): boolean {
	const result = attempt(() => {
		if (audit.findings.length > MAX_COLLECTION_ITEMS) return false
		let total = 0
		for (const finding of audit.findings) {
			if (finding.observed === undefined) continue
			if (!HEX_PATTERN.test(finding.observed)) return false
			const bytes = finding.observed.length / 2
			if (bytes > MAX_ARTIFACT_BYTES) return false
			total += bytes
			if (total > MAX_TOTAL_ARTIFACT_BYTES) return false
		}
		return true
	})
	return result.success && result.value
}

/** Determine whether a target snapshot is a bounded exact-byte record. */
export function hasValidSnapshotBytes(snapshot: Snapshot): boolean {
	const result = attempt(() => {
		if (!isRecord(snapshot)) return false
		const keys = Reflect.ownKeys(snapshot)
		if (keys.length > MAX_COLLECTION_ITEMS || keys.some((key) => typeof key !== 'string'))
			return false
		let total = 0
		for (const key of keys) {
			const descriptor = Reflect.getOwnPropertyDescriptor(snapshot, key)
			if (descriptor === undefined || !Reflect.has(descriptor, 'value')) return false
			const hex = descriptor.value
			if (typeof hex !== 'string' || !HEX_PATTERN.test(hex)) return false
			const bytes = hex.length / 2
			if (bytes > MAX_ARTIFACT_BYTES) return false
			total += bytes
			if (total > MAX_TOTAL_ARTIFACT_BYTES) return false
		}
		return true
	})
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
	andOf(createContract(artifactShape()).is, hasValidArtifactHex),
	hasValidArtifactBytes,
)

/**
 * Narrow a value to a `Plan` — the whole exact-record contract, section
 * guards composed.
 *
 * @remarks
 * Compiled from {@link planShape} via `createContract` (AGENTS §14) — a
 * total `Guard`, adversarial input returns `false`, never throws.
 */
export const isPlan: Guard<Plan> = andOf(
	andOf(createContract(planShape()).is, hasValidPlanHex),
	hasValidPlanBytes,
)

/**
 * Validate both a plan's blueprint semantics and every override against the
 * exact artifact set the plan would materialize.
 *
 * @param plan - The structurally valid plan to validate before mutation.
 * @returns A total validation whose blocking questions include missing,
 * host-owned, and publication-boundary override targets.
 *
 * @example
 * ```ts
 * import { blueprint, blueprintToPlan, validatePlan } from '@orkestrel/scaffold'
 *
 * const plan = blueprintToPlan(blueprint('router', { src: ['core'] }))
 *
 * validatePlan(plan).valid // true
 * ```
 */
export function validatePlan(plan: Plan): Validation {
	const blueprintValidation = validateBlueprint(plan.blueprint)
	const questions: Question[] = [...blueprintValidation.questions]
	if (!hasValidPlanBytes(plan)) {
		questions.push({
			field: 'artifacts',
			text: 'Plan artifact content exceeds the retained byte limits',
			blocking: true,
		})
	}
	const artifacts = new Map(plan.artifacts.map((artifact) => [artifact.path, artifact]))
	for (const item of plan.blueprint.overrides) {
		const artifact = artifacts.get(item.path)
		if (artifact === undefined) {
			questions.push({
				field: 'overrides',
				text: `Override path "${item.path}" matches no planned artifact`,
				blocking: true,
			})
			continue
		}
		if (artifact.origin === 'host') {
			questions.push({
				field: 'overrides',
				text: `Override path "${item.path}" targets a host-origin artifact`,
				blocking: true,
			})
			continue
		}
		if (artifact.path === 'package.json') {
			questions.push({
				field: 'overrides',
				text: 'Override path "package.json" targets the blueprint-owned publication boundary',
				blocking: true,
			})
		}
	}
	return {
		valid: questions.length === 0,
		questions,
		warnings: blueprintValidation.warnings,
	}
}

/** Determine whether every guide body fits the public UTF-8 artifact byte limit. */
export function hasValidSyncReportBytes(report: SyncReport): boolean {
	const result = attempt(() => {
		let total = 0
		for (const guide of report.guides) {
			const bytes = contentByteLength(guide.content)
			if (bytes > MAX_ARTIFACT_BYTES) return false
			total += bytes
			if (total > MAX_TOTAL_ARTIFACT_BYTES) return false
		}
		return true
	})
	return result.success && result.value
}

/**
 * Narrow a value to a `SyncReport` — the whole exact-record sync contract,
 * `guide` / `version` sections composed.
 *
 * @remarks
 * Compiled from {@link syncReportShape} via `createContract` and refined by
 * {@link hasValidSyncReportBytes}; total for adversarial input.
 */
export const isSyncReport: Guard<SyncReport> = andOf(
	createContract(syncReportShape()).is,
	hasValidSyncReportBytes,
)
