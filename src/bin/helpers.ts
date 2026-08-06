import type { Audit, CatalogEntry, Finding, Plan, PlanSummary, SyncReport } from '@src/core'
import { DEPENDENCY_NAME_PATTERN, isScaffoldError, ownDataValue, ScaffoldError } from '@src/core'
import { isFilesystemPath, resolvePhysicalPath } from '@src/server'
import type { TableOptions } from '@orkestrel/console'
import { attempt, isRecord, parseJSON } from '@orkestrel/contract'
import { relative as relativeOf } from 'node:path'
import {
	ACTION_LABEL,
	DRIFT_LABEL,
	EXIT_CODES,
	FRESHNESS_LABEL,
	KNOWN_VERBS,
	ORIGIN_LABEL,
	REPAIR_GENERATED_SCOPE,
	REPAIR_SCOPE,
	SAFETY_BANNER,
	VERB_DRY_RUN_NOTE,
	VERB_EXAMPLE,
	VERB_FLAG_HELP,
	VERB_FLAGS,
	VERB_SUMMARY,
} from './constants.js'
import { partitionFindings } from './shapers.js'
import type { AuditCounts, FleetOutcome, RepairTally, RepairVerdictOptions, Verb } from './types.js'

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
	const generated = bucketText(split.generated)
	const foreign = bucketText(split.foreign)
	if (owned && generated === 'clean') {
		return `audit: ${countPart(count, 'artifact')} — host-owned clean; ${foreign}`
	}
	const suffix = foreign === 'clean' ? '' : `; unexpected: ${foreign}`
	return owned
		? `audit: ${countPart(count, 'artifact')} — host-owned clean; ${generated} (generated)${suffix}`
		: `audit: ${countPart(count, 'artifact')} — host-owned: ${bucketText(split.owned)}; generated: ${generated}${suffix}`
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
 * Count the files one authorized write will create or overwrite.
 *
 * @param counts - The drift tallies of every target the write covers.
 * @param replace - Whether stale byte replacement was explicitly authorized.
 * @returns Every missing file, plus drifted files only under `replace`.
 * @remarks
 * The one figure every write confirmation asks about, so `repair` and `fleet`
 * cannot drift apart on it. An unexpected file is never counted here: only
 * `--prune` deletes one, and only after its own separate question.
 */
export function countWrites(counts: readonly AuditCounts[], replace: boolean): number {
	let total = 0
	for (const count of counts) total += count.missing + (replace ? count.drifted : 0)
	return total
}

/**
 * Test whether a reported repository remains dirty inside or outside the selected scope.
 *
 * @param audit - The selected-scope audit.
 * @param outside - Findings outside that scope.
 * @returns Whether either source reports drift.
 */
export function hasFindings(audit: Audit, outside: number): boolean {
	return !audit.clean || outside > 0
}

/**
 * Render one write verb's ownership boundary in that verb's own voice.
 *
 * @param verb - The command whose scope this is.
 * @param generated - Whether generated canon was included in the scope.
 * @param repos - The number of repositories the write covers, absent for a single target.
 * @returns The scope line naming what the command restores, what it replaces only with `--replace`, and what it never touches.
 */
export function scopeLine(verb: Verb, generated: boolean, repos?: number): string {
	const across = repos === undefined ? '' : ` across ${countPart(repos, 'repo')}`
	return `${verb} scope${across}: ${generated ? REPAIR_GENERATED_SCOPE : REPAIR_SCOPE}`
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
		? `note: ${countPart(count, 'finding')} outside host-owned and generated repair scope — run 'audit' for the list; present starter files and package publication metadata remain protected`
		: `note: ${countPart(count, 'finding')} outside host-owned repair scope — run 'audit' for the list`
}

/**
 * Render repair's dry-run verdict.
 *
 * @param audit - The audit over the selected repair plan.
 * @param options - The selected scope and write authorizations.
 * @returns The scope-aware clean or drifted verdict.
 */
export function repairVerdict(audit: Audit, options: RepairVerdictOptions): string {
	const scope = options.generated ? 'host-owned and generated' : 'host-owned'
	if (audit.clean) {
		return `repair: ${countPart(audit.findings.length, `${scope} artifact`)} aligned — nothing to write`
	}
	const head = `repair: ${scope}: ${bucketText(audit)}`
	if (audit.drifted === 0) {
		return options.apply
			? `${head} — missing files will be restored`
			: `${head} — pass --apply to write`
	}
	// With nothing missing there is nothing `--apply` alone can restore, so the
	// line names only the authorization that would change these files.
	if (audit.missing === 0) {
		return options.replace
			? `${head} — --apply overwrites drifted files, discarding local changes`
			: `${head} — drifted files change only with --replace, which discards local changes`
	}
	return options.replace
		? `${head} — --apply restores missing files and overwrites drifted ones, discarding local changes`
		: `${head} — --apply restores missing files; drifted files change only with --replace, which discards local changes`
}

/**
 * Merge only generated service scripts into an existing manifest.
 *
 * @param current - The existing consumer manifest text.
 * @param generated - The canonical manifest text for the derived service blueprint.
 * @param services - The declared service vendor names.
 * @returns Formatter-stable manifest text preserving publication metadata and unrelated scripts.
 */
export function mergeServiceManifest(
	current: string,
	generated: string,
	services: readonly string[],
): string {
	const currentManifest = parseJSON(current)
	const generatedManifest = parseJSON(generated)
	if (!isRecord(currentManifest) || !isRecord(generatedManifest)) {
		throw new ScaffoldError('INVALID', 'Service adoption requires object package manifests')
	}
	const currentScriptsValue = ownDataValue(currentManifest, 'scripts')
	const generatedScriptsValue = ownDataValue(generatedManifest, 'scripts')
	if (!isRecord(currentScriptsValue) || !isRecord(generatedScriptsValue)) {
		throw new ScaffoldError('INVALID', 'Service adoption requires object package scripts')
	}
	const serviceKeys = ['test:service', ...services.map((service) => `test:service:${service}`)]
	const serviceNames = new Set(serviceKeys)
	const currentPublish = ownDataValue(currentScriptsValue, 'prepublishOnly')
	const generatedPublish = ownDataValue(generatedScriptsValue, 'prepublishOnly')
	if (typeof currentPublish !== 'string' || typeof generatedPublish !== 'string') {
		throw new ScaffoldError('INVALID', 'Service adoption requires a prepublishOnly script')
	}
	const suffix = ' && npm run test:service'
	const publish = currentPublish.endsWith(suffix) ? currentPublish : `${currentPublish}${suffix}`
	const scripts: Record<string, unknown> = {}
	for (const name of Object.keys(generatedScriptsValue)) {
		if (serviceNames.has(name)) {
			const value = ownDataValue(generatedScriptsValue, name)
			if (typeof value !== 'string') {
				throw new ScaffoldError('INVALID', `Generated service script is missing at ${name}`)
			}
			scripts[name] = value
			continue
		}
		if (name === 'prepublishOnly') {
			scripts[name] = publish
			continue
		}
		const value = ownDataValue(currentScriptsValue, name)
		if (value !== undefined) scripts[name] = value
	}
	for (const name of Object.keys(currentScriptsValue)) {
		if (Object.hasOwn(scripts, name)) continue
		if (name === 'test:service' || name.startsWith('test:service:')) continue
		const value = ownDataValue(currentScriptsValue, name)
		if (value !== undefined) scripts[name] = value
	}
	return `${JSON.stringify({ ...currentManifest, scripts }, undefined, '\t')}\n`
}

/**
 * Render repair's closing tally.
 *
 * @param tally - The displayed counts of one repair run.
 * @returns The tally line, in the same words the audit table above it used.
 * @remarks
 * A drifted file repair was not authorized to overwrite is counted on its own
 * rather than folded in with the aligned files, because `unchanged` is already
 * the audit table's word for a file that matches canon.
 */
export function repairTally(tally: RepairTally): string {
	const left =
		tally.drifted === 0
			? ''
			: `, ${countPart(tally.drifted, `${DRIFT_LABEL.stale} file`)} left alone`
	return `${ACTION_LABEL.written} ${tally.written}, ${ACTION_LABEL.skipped} ${tally.unchanged}${left}, ${ACTION_LABEL.removed} ${tally.removed}`
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
	return `total: ${countPart(drifted, 'dirty repo')}, ${failed} failed`
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

/**
 * Render one contained write destination as the operator's own path to it.
 *
 * @param root - The invocation directory every write is confined beneath.
 * @param destination - The contained physical destination.
 * @returns The destination relative to the invocation directory, or the absolute path when it is not beneath it.
 */
export function describeDestination(root: string, destination: string): string {
	const path = relativeOf(root, destination).replaceAll('\\', '/')
	if (path === '') return '.'
	return path.startsWith('..') ? destination : `./${path}`
}

/** Render `new`'s dry-run destination. */
export function newPlanPreview(destination: string): string {
	return `will write into ${destination}`
}

/** Render `new`'s write result. */
export function newApplySuccess(count: number, destination: string): string {
	return `wrote ${countPart(count, 'file')} into ${destination}`
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
	if (manifest > 0 && plan.blueprint.services.length > 0) {
		notes.push(
			`${countPart(manifest, 'finding')} in package.json — 'scaffold repair --generated' repairs generated service scripts; review any remaining publication metadata directly`,
		)
	} else if (manifest > 0) {
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
export function comparisonLine(compared: number, presence: number): string {
	if (presence === 0) return 'comparing: file contents for host-owned files'
	if (compared === 0) {
		return `comparing: file presence for ${countPart(presence, 'presence-owned file')}`
	}
	return `comparing: file contents for ${countPart(compared, 'host-owned file')}; presence for ${countPart(presence, 'presence-owned file')}`
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
