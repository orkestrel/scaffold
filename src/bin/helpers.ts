import type { Audit, CatalogEntry, Finding, Plan, PlanSummary, SyncReport } from '@src/core'
import { DEPENDENCY_NAME_PATTERN, isScaffoldError, ScaffoldError } from '@src/core'
import { isFilesystemPath, resolvePhysicalPath } from '@src/server'
import type { MaterializeResult } from '@src/server'
import type { TableOptions } from '@orkestrel/console'
import { attempt } from '@orkestrel/contract'
import {
	ACTION_LABEL,
	CATALOG_AGENT_PATH,
	DRIFT_LABEL,
	EXIT_CODES,
	FRESHNESS_LABEL,
	KNOWN_VERBS,
	ORIGIN_LABEL,
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
	if (counts.drifted > 0) parts.push(`${counts.drifted} drifted`)
	if (counts.missing > 0) parts.push(`${counts.missing} missing`)
	if (counts.foreign > 0) parts.push(`${counts.foreign} unexpected`)
	return parts.length > 0 ? parts.join(', ') : 'clean'
}

/** Render audit's origin-aware verdict. */
export function auditVerdict(audit: Audit, plan: Plan): string {
	const count = audit.findings.length
	if (audit.clean) return `audit: ${countPart(count, 'artifact')} — clean`
	const split = partitionFindings(audit.findings, plan)
	const owned = split.owned.drifted === 0 && split.owned.missing === 0 && split.owned.foreign === 0
	return owned
		? `audit: ${countPart(count, 'artifact')} — host-owned clean; ${bucketText(split.generated)} (generated)`
		: `audit: ${countPart(count, 'artifact')} — host-owned: ${bucketText(split.owned)}; generated: ${bucketText(split.generated)}`
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

/**
 * Render drift outside repair's selected ownership boundary.
 *
 * @param count - The number of findings outside the selected scope.
 * @param generated - Whether generated canon was included in the repair scope.
 * @returns The scope guidance line, or `undefined` when no findings remain outside scope.
 */
export function scopeNote(count: number, generated: boolean): string | undefined {
	if (count === 0) return undefined
	return generated
		? `note: ${countPart(count, 'finding')} outside host-owned and generated repair scope — run 'audit' for the list; starter files and package.json remain protected`
		: `note: ${countPart(count, 'finding')} outside host-owned repair scope — run 'audit' for the list`
}

/**
 * Render repair's dry-run verdict.
 *
 * @param audit - The audit over the selected repair plan.
 * @param generated - Whether generated canon was included in the repair scope.
 * @param replace - Whether stale byte replacement was explicitly authorized.
 * @returns The scope-aware clean or drifted verdict.
 */
export function repairVerdict(audit: Audit, generated: boolean, replace = false): string {
	const scope = generated ? 'host-owned and generated' : 'host-owned'
	if (audit.clean) {
		return `repair: ${countPart(audit.findings.length, `${scope} artifact`)} aligned — nothing to write`
	}
	const head = `repair: ${scope}: ${bucketText(audit)}`
	if (audit.drifted === 0) return `${head} — pass --apply to write`
	return replace
		? `${head} — --apply restores missing files and overwrites drifted ones, discarding local changes`
		: `${head} — --apply restores missing files; drifted files change only with --replace, which discards local changes`
}

/**
 * Keep the catalog agent presence-repairable while leaving its content to `catalog`.
 *
 * @param plan - The hydrated repair plan.
 * @returns A plan whose catalog agent has no canonical byte comparison.
 */
export function protectCatalogPlan(plan: Plan): Plan {
	return {
		...plan,
		artifacts: plan.artifacts.map((artifact) => {
			if (artifact.origin !== 'host' || artifact.path !== CATALOG_AGENT_PATH) return artifact
			const { hex: _hex, ...protectedArtifact } = artifact
			return protectedArtifact
		}),
	}
}

/** Render repair's materialization tally. */
export function repairSuccess(result: MaterializeResult, removed: readonly string[]): string {
	const written = result.written.length + result.copied.length
	return `${ACTION_LABEL.written} ${written}, ${ACTION_LABEL.skipped} ${result.skipped.length}, ${ACTION_LABEL.removed} ${removed.length}`
}

/** Render synchronization freshness as table rows. */
export function syncRows(report: SyncReport): readonly (readonly [string, string, string])[] {
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

/** Create a synchronization terminal table. */
export function syncTable(report: SyncReport): TableOptions {
	return {
		columns: [{ label: 'Name' }, { label: 'Kind' }, { label: 'Freshness' }],
		rows: syncRows(report),
	}
}

/** Render cause notes from non-current synchronization entries. */
export function syncCauseNotes(report: SyncReport): readonly string[] {
	return [...report.guides, ...report.versions]
		.filter((entry) => entry.note !== undefined)
		.map(
			(entry) =>
				`  ${entry.name}: ${FRESHNESS_LABEL[entry.freshness] ?? entry.freshness} — ${entry.note}`,
		)
}

/** Render a command-specific synchronization tally. */
export function syncVerdict(report: SyncReport, action: 'pull' | 'mirror'): string {
	const count = report.guides.length + report.versions.length
	return `${action}: ${String(count)} ${count === 1 ? 'entry' : 'entries'} — ${String(report.failed)} failed`
}

/** Render a synchronization success tally. */
export function syncSuccess(count: number): string {
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
	return `total: ${countPart(drifted, 'drifted repo')}, ${failed} failed`
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
			['host-owned', String(summary.host)],
			['starter', String(summary.template)],
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

/**
 * Render the interactive audit-to-repair handoff as the list of actions it authorizes.
 *
 * @param missing - The number of missing host-owned files the inherited repair would restore.
 * @param drifted - The number of drifted host-owned files it would overwrite, zero unless `--replace` authorized replacement.
 * @param foreign - The number of unexpected files found.
 * @param prune - Whether `--prune` authorized deletion, without which no unexpected file is touched.
 * @returns The confirmation question, naming each authorized action and the cost of overwriting.
 */
export function repairHandoff(
	missing: number,
	drifted: number,
	foreign: number,
	prune: boolean,
): string {
	const parts: string[] = []
	if (missing > 0) parts.push(`restore ${countPart(missing, 'missing host-owned file')}`)
	if (drifted > 0) {
		parts.push(
			`overwrite ${countPart(drifted, 'drifted host-owned file')}, discarding local changes`,
		)
	}
	if (prune && foreign > 0) parts.push(`delete ${countPart(foreign, 'unexpected file')}`)
	return `${parts.join('; ')} — run repair now? `
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
	const table = new Uint32Array(rows * columns)
	for (let row = 0; row < rows; row += 1) table[row * columns] = row
	for (let column = 0; column < columns; column += 1) table[column] = column
	for (let row = 1; row < rows; row += 1) {
		for (let column = 1; column < columns; column += 1) {
			const cost = left[row - 1] === right[column - 1] ? 0 : 1
			const index = row * columns + column
			table[index] = Math.min(
				(table[index - columns] ?? 0) + 1,
				(table[index - 1] ?? 0) + 1,
				(table[index - columns - 1] ?? 0) + cost,
			)
		}
	}
	return table[rows * columns - 1] ?? 0
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

/** Render an unknown command with a nearest-command hint. */
export function didYouMean(command: string): string {
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

/**
 * Render drift that belongs to generated artifacts.
 *
 * @param count - The number of findings on generated artifacts.
 * @returns The guidance line, stating what each repair scope does rather than how the files differ.
 */
export function generatedNote(count: number): string {
	return `${countPart(count, 'finding')} in generated files — run 'scaffold repair --generated' to restore missing ones; add --replace to overwrite drifted ones, discarding local changes`
}

/**
 * Render the explicit destructive opt-in for stale host-owned files.
 *
 * @param count - The number of stale host-owned files.
 * @returns The replacement guidance line, naming the safe default before its destructive opt-in.
 */
export function replacementNote(count: number): string {
	return `${countPart(count, 'drifted host-owned file')} — repair leaves drifted files alone; 'scaffold repair --replace' overwrites them, discarding local changes`
}

/**
 * Render honest repair guidance for computed and protected manifest drift.
 *
 * @param findings - The audit findings to classify.
 * @param plan - The plan that owns each computed artifact.
 * @returns One line for repairable computed drift and one for protected manifest drift when present.
 */
export function renderComputedNotes(findings: readonly Finding[], plan: Plan): readonly string[] {
	const origins = new Map(plan.artifacts.map((artifact) => [artifact.path, artifact.origin]))
	let computed = 0
	let manifest = 0
	for (const finding of findings) {
		if (finding.drift === 'aligned' || origins.get(finding.path) !== 'computed') continue
		if (finding.path === 'package.json') manifest += 1
		else computed += 1
	}
	const notes: string[] = []
	if (computed > 0) notes.push(generatedNote(computed))
	if (manifest > 0) {
		notes.push(
			`${countPart(manifest, 'finding')} in package.json — repair does not rewrite protected publication metadata; review and edit it directly`,
		)
	}
	return notes
}

/** Render live dependency freshness tallies. */
export function auditLiveNote(current: number, behind: number, failed: number): string {
	return `live: ${current} current, ${behind} behind, ${failed} failed`
}

/** Render whether an audit compared content or presence. */
export function comparisonLine(aware: boolean): string {
	return aware
		? 'comparing: file contents for host-owned files'
		: 'comparing: file names only for host-owned files (no vendored source found)'
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
	if (!isFilesystemPath(root) || !isFilesystemPath(candidate)) {
		throw new ScaffoldError('INVALID', 'Target paths must not contain control characters')
	}
	const contained = attempt(() =>
		resolvePhysicalPath(root, candidate, 'INVALID', 'working directory'),
	)
	if (contained.success) return contained.value
	if (isScaffoldError(contained.error) && contained.error.code === 'INVALID') {
		throw new ScaffoldError(
			'INVALID',
			`Target "${candidate}" is outside or traverses a linked parent of the working directory — run scaffold from the physical directory you want to write beneath.`,
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
