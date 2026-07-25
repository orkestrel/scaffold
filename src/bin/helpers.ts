import type { Audit, CatalogEntry, Finding, Plan, PlanSummary, SyncReport } from '@src/core'
import { DEPENDENCY_NAME_PATTERN, isScaffoldError, ScaffoldError } from '@src/core'
import { resolveContainedPath } from '@src/server'
import type { MaterializeResult } from '@src/server'
import type { TableOptions } from '@orkestrel/console'
import { attempt } from '@orkestrel/contract'
import {
	ACTION_LABEL,
	DRIFT_LABEL,
	EXIT_CODES,
	FRESHNESS_LABEL,
	KNOWN_VERBS,
	ORIGIN_LABEL,
	RETIRED_VERBS,
	SAFETY_BANNER,
	VERB_DRY_RUN_NOTE,
	VERB_EXAMPLE,
	VERB_FLAG_HELP,
	VERB_FLAGS,
	VERB_SUMMARY,
} from './constants.js'
import { partitionFindings } from './shapers.js'
import type { AuditCounts, FleetOutcome, Verb } from './types.js'

/** Render one pluralized count. */
export function countPart(count: number, label: string): string {
	return `${count} ${label}${count === 1 ? '' : 's'}`
}

/** Render nonzero audit buckets or `clean`. */
export function bucketText(counts: AuditCounts): string {
	const parts: string[] = []
	if (counts.drifted > 0) parts.push(countPart(counts.drifted, 'drifted'))
	if (counts.missing > 0) parts.push(countPart(counts.missing, 'missing'))
	if (counts.foreign > 0) parts.push(countPart(counts.foreign, 'unexpected'))
	return parts.length > 0 ? parts.join(', ') : 'clean'
}

/** Render audit's origin-aware verdict. */
export function auditVerdict(audit: Audit, plan: Plan): string {
	const count = audit.findings.length
	if (audit.clean) return `audit: ${countPart(count, 'artifact')} — clean`
	const split = partitionFindings(audit.findings, plan)
	const owned = split.owned.drifted === 0 && split.owned.missing === 0 && split.owned.foreign === 0
	return owned
		? `audit: ${countPart(count, 'artifact')} — template-owned clean; ${bucketText(split.generated)} (generated)`
		: `audit: ${countPart(count, 'artifact')} — template-owned: ${bucketText(split.owned)}; generated: ${bucketText(split.generated)}`
}

/** Render non-aligned audit findings as terminal table rows. */
export function findingRows(
	findings: readonly Finding[],
	plan: Plan,
): readonly (readonly [string, string, string])[] {
	const origins = new Map(plan.artifacts.map((artifact) => [artifact.path, artifact.origin]))
	return findings
		.filter((finding) => finding.drift !== 'aligned')
		.map((finding): readonly [string, string, string] => {
			const origin = origins.get(finding.path)
			const category = origin === undefined ? 'unexpected file' : ORIGIN_LABEL[origin]
			return [DRIFT_LABEL[finding.drift], category, finding.path]
		})
}

/** Create audit's terminal table. */
export function auditTable(audit: Audit, plan: Plan): TableOptions {
	return {
		columns: [{ label: 'Status' }, { label: 'Kind' }, { label: 'Path' }],
		rows: findingRows(audit.findings, plan),
	}
}

/** Render drift outside repair's ownership boundary. */
export function scopeNote(count: number): string | undefined {
	if (count === 0) return undefined
	return `note: ${countPart(count, 'finding')} outside repair's scope — run 'audit' for the list; generated files are yours to edit`
}

/** Render repair's dry-run verdict. */
export function repairVerdict(audit: Audit): string {
	if (audit.clean) {
		return `repair: ${countPart(audit.findings.length, 'template-owned artifact')} aligned — nothing to write`
	}
	return `repair: ${bucketText(audit)} — pass --apply to write`
}

/** Render repair's materialization tally. */
export function repairSuccess(result: MaterializeResult, removed: readonly string[]): string {
	const written = result.written.length + result.copied.length
	return `${ACTION_LABEL.written} ${written}, ${ACTION_LABEL.skipped} ${result.skipped.length}, ${ACTION_LABEL.removed} ${removed.length}`
}

/** Render pull freshness as table rows. */
export function pullRows(report: SyncReport): readonly (readonly [string, string, string])[] {
	const guides = report.guides.map((guide): readonly [string, string, string] => [
		guide.name,
		'guide',
		FRESHNESS_LABEL[guide.freshness] ?? guide.freshness,
	])
	const versions = report.versions.map((version): readonly [string, string, string] => [
		version.name,
		'version',
		FRESHNESS_LABEL[version.freshness] ?? version.freshness,
	])
	return [...guides, ...versions]
}

/** Create pull's terminal table. */
export function pullTable(report: SyncReport): TableOptions {
	return {
		columns: [{ label: 'Name' }, { label: 'Kind' }, { label: 'Freshness' }],
		rows: pullRows(report),
	}
}

/** Render cause notes from non-current pull entries. */
export function pullCauseNotes(report: SyncReport): readonly string[] {
	return [...report.guides, ...report.versions]
		.filter((entry) => entry.note !== undefined)
		.map(
			(entry) =>
				`  ${entry.name}: ${FRESHNESS_LABEL[entry.freshness] ?? entry.freshness} — ${entry.note}`,
		)
}

/** Render pull's tally. */
export function pullVerdict(report: SyncReport): string {
	const count = report.guides.length + report.versions.length
	return `pull: ${countPart(count, 'entry')} — ${countPart(report.failed, 'failed')}`
}

/** Render pull's success tally. */
export function pullSuccess(count: number): string {
	return `wrote ${countPart(count, 'guide')}`
}

/** Render one fleet repository outcome. */
export function fleetRepoLine(name: string, outcome: FleetOutcome): string {
	if (outcome.state === 'clean') return `${name}: clean`
	if (outcome.state === 'drifted') return `${name}: ${bucketText(outcome)}`
	if (outcome.state === 'repaired') {
		return `${name}: repaired (${countPart(outcome.remaining, 'finding')} remaining)`
	}
	return `${name}: ${outcome.message}`
}

/** Render fleet's repository totals. */
export function fleetTotals(drifted: number, failed: number): string {
	return `total: ${countPart(drifted, 'drifted repo')}, ${countPart(failed, 'failed')}`
}

/** Create catalog's terminal table. */
export function catalogTable(entries: readonly CatalogEntry[]): TableOptions {
	return {
		columns: [{ label: 'Package' }, { label: 'Version' }],
		rows: entries.map((entry) => [entry.name, entry.version]),
	}
}

/** Render catalog shrink risk when present. */
export function catalogShrinkWarning(oldRows: number, newRows: number): string | undefined {
	if (newRows >= oldRows) return undefined
	return `warning: catalog shrinks from ${countPart(oldRows, 'row')} to ${newRows}`
}

/** Render catalog source tallies. */
export function catalogCounts(published: number, local: number): string {
	return `catalog: ${countPart(published, 'published package')}, ${countPart(local, 'local-only')}`
}

/** Create `new`'s plan summary table. */
export function newPlanTable(summary: PlanSummary): TableOptions {
	return {
		columns: [{ label: 'Origin' }, { label: 'Count', align: 'right' }],
		rows: [
			['template-owned', String(summary.host + summary.template)],
			['generated', String(summary.computed)],
		],
	}
}

/** Render `new`'s dry-run destination. */
export function newPlanPreview(name: string): string {
	return `will write into ./${name}`
}

/** Render `new`'s write result. */
export function newApplySuccess(count: number, name: string): string {
	return `wrote ${countPart(count, 'file')} into ./${name}`
}

/** Render catalog's write result. */
export function catalogApplySuccess(path: string): string {
	return `wrote ${path}`
}

/** Render the shared write confirmation. */
export function applyConfirmMessage(files: number, repos?: number): string {
	const scope = repos === undefined ? '' : ` across ${countPart(repos, 'repo')}`
	return `Apply — write ${countPart(files, 'file')}${scope}? `
}

/** Render the separate prune confirmation. */
export function pruneConfirmMessage(count: number): string {
	return `Also delete ${countPart(count, 'unexpected file')} under .claude/agents, .codex/agents, and scripts? `
}

/** Render the interactive audit-to-repair handoff. */
export function repairHandoff(owned: number, foreign: number, prune: boolean): string {
	const parts: string[] = []
	if (owned > 0) {
		parts.push(`${countPart(owned, 'template-owned file')} ${owned === 1 ? 'has' : 'have'} drift`)
	}
	if (prune && foreign > 0) {
		parts.push(`${countPart(foreign, 'unexpected file')} will be deleted`)
	}
	return `${parts.join(' and ')} — run repair now? `
}

/** Render one unresolved Orkestrel dependency token. */
export function unknownOrkestrelToken(token: string, suggestion: string | undefined): string {
	const message = `"${token}" is not a published @orkestrel package`
	return suggestion === undefined
		? `${message} — try again`
		: `${message} — did you mean "${suggestion}"? try again`
}

/** Render compact command usage. */
export function shortUsage(): string {
	const lines = KNOWN_VERBS.map((verb) => `  ${verb.padEnd(8)}${VERB_SUMMARY[verb]}`)
	return [
		'scaffold <verb> [options]',
		'',
		...lines,
		'',
		"run 'scaffold <verb> --help' for a verb's full reference",
	].join('\n')
}

/** Render the full command reference. */
export function fullHelp(): string {
	const verbs = KNOWN_VERBS.map(
		(verb) => `  ${verb} ${VERB_FLAGS[verb]}\n    ${VERB_SUMMARY[verb]}`,
	)
	const exits = EXIT_CODES.map(([code, meaning]) => `  ${code}  ${meaning}`)
	return [
		'scaffold <verb> [options]',
		'',
		...verbs,
		'',
		SAFETY_BANNER,
		'',
		'exit codes:',
		...exits,
	].join('\n')
}

/** Render one command's help reference. */
export function verbHelp(verb: Verb): string {
	const flags = VERB_FLAG_HELP[verb].map(([flag, meaning]) => `  ${flag.padEnd(20)}${meaning}`)
	return [
		`scaffold ${verb} ${VERB_FLAGS[verb]}`,
		'',
		VERB_SUMMARY[verb],
		VERB_DRY_RUN_NOTE[verb],
		'',
		...flags,
		'',
		VERB_EXAMPLE[verb],
	].join('\n')
}

/** Compute Levenshtein edit distance. */
export function editDistance(left: string, right: string): number {
	const rows = left.length + 1
	const columns = right.length + 1
	const table: number[][] = Array.from({ length: rows }, () => new Array<number>(columns).fill(0))
	for (let row = 0; row < rows; row += 1) table[row][0] = row
	for (let column = 0; column < columns; column += 1) table[0][column] = column
	for (let row = 1; row < rows; row += 1) {
		for (let column = 1; column < columns; column += 1) {
			const cost = left[row - 1] === right[column - 1] ? 0 : 1
			table[row][column] = Math.min(
				table[row - 1][column] + 1,
				table[row][column - 1] + 1,
				table[row - 1][column - 1] + cost,
			)
		}
	}
	return table[rows - 1][columns - 1]
}

/** Find the nearest string by edit distance. */
export function nearest(input: string, set: readonly string[]): string | undefined {
	let best: string | undefined
	let distance = Number.POSITIVE_INFINITY
	for (const candidate of set) {
		const candidateDistance = editDistance(input, candidate)
		if (candidateDistance < distance) {
			distance = candidateDistance
			best = candidate
		}
	}
	return best
}

/** Render an unknown command with a migration or nearest-command hint. */
export function didYouMean(command: string): string {
	const retired = RETIRED_VERBS[command]
	if (retired !== undefined) return `'${command}' has been renamed — use 'scaffold ${retired}'`
	const suggestion = nearest(command, KNOWN_VERBS)
	return suggestion === undefined
		? `unknown command "${command}"`
		: `unknown command "${command}" — did you mean "${suggestion}"?`
}

/** Render one prune preview line per exact path. */
export function prunePreview(paths: readonly string[]): readonly string[] {
	return paths.map((path) => `  delete ${path}`)
}

/** Render non-terminal guidance for missing input. */
export function missingInput(input: string, verb: string): string {
	return `missing ${input} — pass it as a flag/argument, or run 'scaffold ${verb}' on a terminal to be guided`
}

/** Render an invalid package name. */
export function invalidName(name: string, pattern: string): string {
	return `Package name "${name}" must match ${pattern}`
}

/** Render dependencies whose latest versions could not be resolved. */
export function unresolvedVersion(names: readonly string[]): string {
	return `could not resolve the latest version for ${names.map((name) => `"${name}"`).join(', ')} — check the name or pass name@range`
}

/** Render drift that belongs to generated artifacts. */
export function generatedNote(count: number): string {
	return `${countPart(count, 'finding')} in generated files — these are regenerated, not hand-edited; repair does not touch them`
}

/** Render live dependency freshness tallies. */
export function auditLiveNote(current: number, behind: number, failed: number): string {
	return `live: ${countPart(current, 'current')}, ${countPart(behind, 'behind')}, ${countPart(failed, 'failed')}`
}

/** Render whether an audit compared content or presence. */
export function comparisonLine(aware: boolean): string {
	return aware
		? 'comparing: file contents for template-owned files'
		: 'comparing: file names only for template-owned files (no vendored source found)'
}

/** Render catalog's final verdict. */
export function catalogVerdict(clean: boolean): string {
	return clean ? 'catalog: clean' : 'catalog: drifted — pass --apply to write'
}

/** Render a caught error without leaking implementation detail. */
export function describeError(error: unknown): string {
	if (isScaffoldError(error)) return `[${error.code}] ${error.message}`
	return error instanceof Error ? error.message : 'unknown error'
}

/** Resolve and confine one write destination to its invocation root. */
export function containDestination(root: string, candidate: string): string {
	const contained = attempt(() =>
		resolveContainedPath(root, candidate, 'INVALID', 'working directory'),
	)
	if (contained.success) return contained.value
	if (isScaffoldError(contained.error) && contained.error.code === 'INVALID') {
		throw new ScaffoldError(
			'INVALID',
			`Target "${candidate}" escapes the working directory — run scaffold from the directory you want to write beneath.`,
			{ path: candidate },
		)
	}
	throw contained.error
}

/** Return one dependency-token issue, or absence when it is valid. */
export function orkestrelTokenIssue(
	normalized: string,
	catalog: readonly string[] | undefined,
): string | undefined {
	if (catalog === undefined) {
		return DEPENDENCY_NAME_PATTERN.test(normalized)
			? undefined
			: unknownOrkestrelToken(normalized, undefined)
	}
	if (catalog.includes(normalized)) return undefined
	return unknownOrkestrelToken(normalized, nearest(normalized, catalog))
}
