import type { Audit, CatalogEntry, Finding, Plan, PlanSummary } from '@src/core'
import type { MaterializeResult } from '@src/server'
import type {
	AuditCounts,
	CatalogResult,
	ErrorEnvelope,
	FleetEntry,
	NewResult,
	OriginPartition,
	RepairResult,
} from './types.js'

/** Partition findings by whether repair owns their artifact origin. */
export function partitionFindings(findings: readonly Finding[], plan: Plan): OriginPartition {
	const origins = new Map(plan.artifacts.map((artifact) => [artifact.path, artifact.origin]))
	let ownedDrifted = 0
	let ownedMissing = 0
	let ownedForeign = 0
	let generatedDrifted = 0
	let generatedMissing = 0
	let generatedForeign = 0
	for (const finding of findings) {
		const origin = origins.get(finding.path)
		const owned = origin === 'host' || origin === 'template'
		if (finding.drift === 'aligned') continue
		if (finding.drift === 'stale') {
			if (owned) ownedDrifted += 1
			else generatedDrifted += 1
		} else if (finding.drift === 'missing') {
			if (owned) ownedMissing += 1
			else generatedMissing += 1
		} else if (owned) {
			ownedForeign += 1
		} else {
			generatedForeign += 1
		}
	}
	return {
		owned: { drifted: ownedDrifted, missing: ownedMissing, foreign: ownedForeign },
		generated: {
			drifted: generatedDrifted,
			missing: generatedMissing,
			foreign: generatedForeign,
		},
	}
}

/** Create one deterministic fleet result entry. */
export function fleetEntryOf(
	name: string,
	counts: AuditCounts | undefined,
	failed: boolean,
): FleetEntry {
	return {
		name,
		drifted: counts?.drifted ?? 0,
		missing: counts?.missing ?? 0,
		foreign: counts?.foreign ?? 0,
		failed,
	}
}

/** Create the command-line interface's machine-readable failure envelope. */
export function errorEnvelopeOf(code: string, message: string): ErrorEnvelope {
	return { error: { code, message } }
}

/** Project a plan summary to the stable machine-readable `new` result. */
export function summaryToNewResult(summary: PlanSummary, applied: boolean): NewResult {
	return {
		name: summary.name,
		surfaces: summary.surfaces,
		host: summary.host,
		template: summary.template,
		computed: summary.computed,
		applied,
	}
}

/** Add a materialization result to an audit. */
export function auditToRepairResult(audit: Audit, result: MaterializeResult): RepairResult {
	return { ...audit, result }
}

/** Create the stable machine-readable catalog result. */
export function catalogResultOf(
	entries: readonly CatalogEntry[],
	drift: boolean,
	shrink?: number,
): CatalogResult {
	return shrink === undefined ? { entries, drift } : { entries, drift, shrink }
}
