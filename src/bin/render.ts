// The bin's ENTIRE presentation layer — every user-facing string, table, prompt
// message, help tier, and --json serializer lives here as a pure, exported,
// module-scope function. The bin (src/bin/scaffold.ts) calls only these; this
// file never touches process.exit or fs, and never spawns nested functions
// (AGENTS §no-nested-functions) — every helper is exported and top-level.
import type {
	Audit,
	CatalogEntry,
	Drift,
	Finding,
	Origin,
	Plan,
	Surface,
	SyncReport,
} from '@src/core'
import type { MaterializeResult } from '@src/server'
import { createStyler } from '@orkestrel/console'
import type { ColumnSpec, StylerInterface } from '@orkestrel/console'

/** The bin's closed verb vocabulary. */
export const KNOWN_VERBS = Object.freeze([
	'new',
	'pull',
	'audit',
	'repair',
	'fleet',
	'catalog',
] as const)

/** One `KNOWN_VERBS` member. */
export type Verb = (typeof KNOWN_VERBS)[number]

/** The jargon translation table — internal `Origin`/`Drift`/scope vocabulary → one user-facing register. */
export const ORIGIN_LABEL: Readonly<Record<Origin, string>> = Object.freeze({
	host: 'template-owned',
	template: 'template-owned',
	computed: 'generated',
})

/** A `Finding`'s `Drift`, translated — `'aligned'` never reaches a rendered table (callers filter it first). */
export const DRIFT_LABEL: Readonly<Record<Drift, string>> = Object.freeze({
	aligned: 'unchanged',
	stale: 'drifted',
	missing: 'missing',
	foreign: 'unexpected file',
})

/** A `Freshness` outcome, translated for `pull`'s per-entry cause notes. */
export const FRESHNESS_LABEL: Readonly<Record<string, string>> = Object.freeze({
	current: 'unchanged',
	behind: 'behind',
	missing: 'missing upstream',
	failed: 'fetch failed',
})

/** The materializer's per-entry action words, translated (`copied` → `wrote`, `skipped` → `unchanged`). */
export const ACTION_LABEL: Readonly<Record<string, string>> = Object.freeze({
	written: 'wrote',
	copied: 'wrote',
	skipped: 'unchanged',
	removed: 'removed',
})

/** One `{count} {label}` part, pluralized; used by every bucket/tally line. */
export function countPart(count: number, label: string): string {
	return `${count} ${label}${count === 1 ? '' : 's'}`
}

/** Nonzero `{count} {label}` parts joined by `, `; `'clean'` when every count is zero — the shared bucket-text primitive every verdict line reuses. */
export function bucketText(counts: {
	readonly drifted: number
	readonly missing: number
	readonly foreign: number
}): string {
	const parts: string[] = []
	if (counts.drifted > 0) parts.push(countPart(counts.drifted, 'drifted'))
	if (counts.missing > 0) parts.push(countPart(counts.missing, 'missing'))
	if (counts.foreign > 0) parts.push(countPart(counts.foreign, 'unexpected'))
	return parts.length > 0 ? parts.join(', ') : 'clean'
}

/**
 * Split `findings` by their `plan` artifact's `origin` — `host`/`template` lumped as
 * `template-owned` vs `computed` as `generated` (a `foreign` finding names no plan artifact,
 * so it counts as `generated`: it is never template-owned).
 */
export function partitionOrigin(
	findings: readonly Finding[],
	plan: Plan,
): {
	readonly owned: { readonly drifted: number; readonly missing: number; readonly foreign: number }
	readonly generated: {
		readonly drifted: number
		readonly missing: number
		readonly foreign: number
	}
} {
	const origins = new Map(plan.artifacts.map((artifact) => [artifact.path, artifact.origin]))
	let ownedDrifted = 0
	let ownedMissing = 0
	let ownedForeign = 0
	let generatedDrifted = 0
	let generatedMissing = 0
	let generatedForeign = 0
	for (const finding of findings) {
		const origin = origins.get(finding.path)
		const isOwned = origin === 'host' || origin === 'template'
		if (finding.drift === 'aligned') continue
		else if (finding.drift === 'stale') {
			if (isOwned) ownedDrifted += 1
			else generatedDrifted += 1
		} else if (finding.drift === 'missing') {
			if (isOwned) ownedMissing += 1
			else generatedMissing += 1
		} else {
			if (isOwned) ownedForeign += 1
			else generatedForeign += 1
		}
	}
	return {
		owned: { drifted: ownedDrifted, missing: ownedMissing, foreign: ownedForeign },
		generated: { drifted: generatedDrifted, missing: generatedMissing, foreign: generatedForeign },
	}
}

/** `audit`'s verdict line — lowercase, verb-led, origin-split so template-owned health is immediately visible. */
export function auditVerdict(audit: Audit, plan: Plan): string {
	const total = audit.findings.length
	if (audit.clean) return `audit: ${countPart(total, 'artifact')} — clean`
	const split = partitionOrigin(audit.findings, plan)
	const ownedClean =
		split.owned.drifted === 0 && split.owned.missing === 0 && split.owned.foreign === 0
	return ownedClean
		? `audit: ${countPart(total, 'artifact')} — template-owned clean; ${bucketText(split.generated)} (generated)`
		: `audit: ${countPart(total, 'artifact')} — template-owned: ${bucketText(split.owned)}; generated: ${bucketText(split.generated)}`
}

/** One aligned-column row per non-`aligned` `Finding` — `[status, kind, path]`, translated labels, ready for `reporter.table`. */
export function findingRows(
	findings: readonly Finding[],
	plan: Plan,
): readonly (readonly [string, string, string])[] {
	const origins = new Map(plan.artifacts.map((artifact) => [artifact.path, artifact.origin]))
	return findings
		.filter((finding) => finding.drift !== 'aligned')
		.map((finding) => {
			const origin = origins.get(finding.path)
			const kind = origin === undefined ? 'unexpected file' : ORIGIN_LABEL[origin]
			return [DRIFT_LABEL[finding.drift], kind, finding.path] as const
		})
}

/** The audit findings table — columns Status/Kind/Path, translated labels, via `reporter.table`. */
export function auditTable(
	audit: Audit,
	plan: Plan,
): {
	readonly columns: readonly ColumnSpec[]
	readonly rows: readonly (readonly string[])[]
} {
	return {
		columns: [{ label: 'Status' }, { label: 'Kind' }, { label: 'Path' }],
		rows: findingRows(audit.findings, plan),
	}
}

/** The banner `repair` opens with (dry-run AND `--apply`) — its scope is the template-owned set only. */
export const REPAIR_SCOPE =
	'repair scope: shared template-owned artifacts only — generated source/tests/configs are never touched'

/** The `repair` note pointing at drift outside its scope — `undefined` when there is none. */
export function scopeNote(outsideCount: number): string | undefined {
	if (outsideCount === 0) return undefined
	return `note: ${countPart(outsideCount, 'finding')} outside repair's scope — run 'audit' for the list; generated files are yours to edit`
}

/** `repair`'s dry-run verdict line. */
export function repairVerdict(audit: Audit): string {
	if (audit.clean)
		return `repair: ${countPart(audit.findings.length, 'template-owned artifact')} aligned — nothing to write`
	return `repair: ${bucketText({ drifted: audit.drifted, missing: audit.missing, foreign: audit.foreign })} — pass --apply to write`
}

/** `repair --apply`'s success line — the materializer tally, translated action words. */
export function repairSuccess(result: MaterializeResult, removed: readonly string[]): string {
	const written = result.written.length + result.copied.length
	return `${ACTION_LABEL.written} ${written}, ${ACTION_LABEL.skipped} ${result.skipped.length}, ${ACTION_LABEL.removed} ${removed.length}`
}

/** `pull`'s freshness table rows — `[name, kind, freshness]`, translated. */
export function pullRows(report: SyncReport): readonly (readonly [string, string, string])[] {
	const guideRows = report.guides.map(
		(guide) => [guide.name, 'guide', FRESHNESS_LABEL[guide.freshness] ?? guide.freshness] as const,
	)
	const versionRows = report.versions.map(
		(version) =>
			[version.name, 'version', FRESHNESS_LABEL[version.freshness] ?? version.freshness] as const,
	)
	return [...guideRows, ...versionRows]
}

/** `pull`'s freshness table — columns Name/Kind/Freshness. */
export function pullTable(report: SyncReport): {
	readonly columns: readonly ColumnSpec[]
	readonly rows: readonly (readonly string[])[]
} {
	return {
		columns: [{ label: 'Name' }, { label: 'Kind' }, { label: 'Freshness' }],
		rows: pullRows(report),
	}
}

/** Per-entry cause notes for a non-`current` `pull` entry that carries a `note`. */
export function pullCauseNotes(report: SyncReport): readonly string[] {
	const entries = [...report.guides, ...report.versions]
	return entries
		.filter((entry) => entry.note !== undefined)
		.map(
			(entry) =>
				`  ${entry.name}: ${FRESHNESS_LABEL[entry.freshness] ?? entry.freshness} — ${entry.note}`,
		)
}

/** `pull`'s tally line. */
export function pullVerdict(report: SyncReport): string {
	const total = report.guides.length + report.versions.length
	return `pull: ${countPart(total, 'entry')} — ${countPart(report.failed, 'failed')}`
}

/** `pull --apply`'s success line. */
export function pullSuccess(count: number): string {
	return `wrote ${countPart(count, 'guide')}`
}

/** One `fleet` per-repo line — clean, drifted (dry-run), or repaired (`--apply`). */
export function fleetRepoLine(
	name: string,
	outcome:
		| { readonly kind: 'clean' }
		| {
				readonly kind: 'drifted'
				readonly drifted: number
				readonly missing: number
				readonly foreign: number
		  }
		| { readonly kind: 'repaired'; readonly remaining: number }
		| { readonly kind: 'failed'; readonly message: string },
): string {
	if (outcome.kind === 'clean') return `${name}: clean`
	if (outcome.kind === 'drifted') {
		return `${name}: ${bucketText({ drifted: outcome.drifted, missing: outcome.missing, foreign: outcome.foreign })}`
	}
	if (outcome.kind === 'repaired')
		return `${name}: repaired (${countPart(outcome.remaining, 'finding')} remaining)`
	return `${name}: ${outcome.message}`
}

/** `fleet`'s blast-radius totals line. */
export function fleetTotals(drifted: number, failed: number): string {
	return `total: ${countPart(drifted, 'drifted repo')}, ${countPart(failed, 'failed')}`
}

/** The `catalog` terminal preview table — columns Package/Version (descriptions live only in the written table and `--json`). */
export function catalogTable(entries: readonly CatalogEntry[]): {
	readonly columns: readonly ColumnSpec[]
	readonly rows: readonly (readonly string[])[]
} {
	return {
		columns: [{ label: 'Package' }, { label: 'Version' }],
		rows: entries.map((entry) => [entry.name, entry.version] as const),
	}
}

/** The `catalog` shrink warning — `undefined` when the table did not shrink. */
export function catalogShrinkWarning(oldRows: number, newRows: number): string | undefined {
	if (newRows >= oldRows) return undefined
	return `warning: catalog shrinks from ${countPart(oldRows, 'row')} to ${newRows}`
}

/** `catalog`'s counts line. */
export function catalogCounts(published: number, localOnly: number): string {
	return `catalog: ${countPart(published, 'published package')}, ${countPart(localOnly, 'local-only')}`
}

/** `new`'s dry-run plan preview — origin counts table description + the destination line. */
export function newPlanTable(scaffolding: {
	readonly host: number
	readonly template: number
	readonly computed: number
}): {
	readonly columns: readonly ColumnSpec[]
	readonly rows: readonly (readonly string[])[]
} {
	return {
		columns: [{ label: 'Origin' }, { label: 'Count', align: 'right' as const }],
		rows: [
			['template-owned', String(scaffolding.host + scaffolding.template)],
			['generated', String(scaffolding.computed)],
		],
	}
}

/** `new`'s dry-run destination line. */
export function newPlanPreview(name: string): string {
	return `will write into ./${name}`
}

/** `new --apply`'s success line. */
export function newApplySuccess(count: number, name: string): string {
	return `wrote ${countPart(count, 'file')} into ./${name}`
}

/** `new`'s dry-run declined-apply note. */
export const NEW_DRY_RUN_NOTE = 'dry run — pass --apply to write'

/** `catalog --apply`'s success line. */
export function catalogApplySuccess(path: string): string {
	return `wrote ${path}`
}

/** The fallback line for a `parseArgs` failure that carries no `Error` message of its own. */
export const INVALID_ARGUMENTS_MESSAGE = 'invalid arguments'

/** The apply-confirm prompt message — singular repo, or fleet-wide across `repos` when given. */
export function applyConfirmMessage(fileCount: number, repoCount?: number): string {
	const scope = repoCount === undefined ? '' : ` across ${countPart(repoCount, 'repo')}`
	return `Apply — write ${countPart(fileCount, 'file')}${scope}? `
}

/** The prune double-confirm prompt message. */
export function pruneConfirmMessage(count: number): string {
	return `Also delete ${countPart(count, 'unexpected file')} under .claude/agents and scripts? `
}

/**
 * The audit→repair handoff prompt message — names what will actually be
 * acted on: `owned` template-owned files with drift, and (only when `prune`
 * is active) `foreign` unexpected files that will be deleted. Never promises
 * a deletion the handoff will not perform — `prune` gates the foreign clause.
 */
export function repairHandoff(owned: number, foreign: number, prune: boolean): string {
	const parts: string[] = []
	if (owned > 0) {
		parts.push(`${countPart(owned, 'template-owned file')} ${owned === 1 ? 'has' : 'have'} drift`)
	}
	if (prune && foreign > 0) parts.push(`${countPart(foreign, 'unexpected file')} will be deleted`)
	return `${parts.join(' and ')} — run repair now? `
}

/** Printed when unexpected files exist but the handoff cannot help them (no `--prune`, or no handoff offered at all) — points at the one command that can. */
export function foreignHint(): string {
	return "unexpected files found — run 'scaffold repair --prune' to delete them"
}

/** `new`'s interactive Q1 prompt (TTY only) — `@orkestrel` short-name deps, landing in `dependencies`. */
export function orkestrelDepsPrompt(): string {
	return '@orkestrel dependencies (comma-separated short names, e.g. contract, emitter — installed as dependencies)'
}

/**
 * Re-ask wording for a Q1 token that does not resolve against the vendored
 * `@orkestrel` catalog — names the offending token and, when one was found,
 * the nearest catalog name (`render.ts`'s own `nearest`).
 */
export function unknownOrkestrelToken(token: string, suggestion: string | undefined): string {
	const base = `"${token}" is not a published @orkestrel package`
	return suggestion === undefined
		? `${base} — try again`
		: `${base} — did you mean "${suggestion}"? try again`
}

/** Printed once when the vendored `@orkestrel` catalog cannot be resolved — Q1 degrades to shape-only (`DEPENDENCY_NAME_PATTERN`) validation instead of blocking on it. */
export function catalogUnresolvedNote(): string {
	return "couldn't resolve the vendored @orkestrel catalog — validating names by shape only"
}

/** The line printed when a confirm prompt is declined. */
export const CANCELLED_MESSAGE = 'cancelled — nothing written'

/** `new`'s surface checkbox choices — per-choice descriptions grounded on the terminal guide's surface semantics. */
export function surfaceChoices(): readonly {
	readonly name: string
	readonly value: Surface
	readonly description: string
}[] {
	return [
		{ name: 'core', value: 'core', description: 'the pure engine' },
		{ name: 'browser', value: 'browser', description: 'DOM-facing surface' },
		{ name: 'server', value: 'server', description: 'node-facing surface' },
	]
}

/** The safety-model banner every full-help tier includes. */
export const SAFETY_BANNER = [
	'safety: every verb is a dry run by default.',
	'on a terminal, a write prompts for confirmation; in a script, pass --apply (and --yes to skip the confirm).',
	'every write is confined to the current working directory — cd there first.',
	'TLS trusts the system certificate store automatically (corporate proxies); NODE_EXTRA_CA_CERTS adds custom PEMs.',
].join('\n')

/** The exit-code reference table every full-help tier includes. */
export const EXIT_CODES: readonly (readonly [string, string])[] = [
	['0', 'clean / success'],
	['1', 'drift or failure'],
	['2', 'usage error'],
]

/** One-line-per-verb summaries — the short and full help tiers share this table. */
export const VERB_SUMMARY: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'scaffold a package into ./<name>',
	pull: 'refresh vendored guides/versions, report drift',
	audit: 'whole-plan conformance report',
	repair: 'restore the shared template-owned set',
	fleet: "audit/repair every package under the cwd's immediate children",
	catalog: 'regenerate the fleet package-catalog table',
})

/** ≤10 lines: one-liner per verb plus the escape hatch to `verbHelp`. */
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

/** Each verb's flag reference — the fullHelp reference and verbHelp share this table. */
export const VERB_FLAGS: Readonly<Record<Verb, string>> = Object.freeze({
	new: '--surfaces a,b --deps x,y --apply --yes --target <path> --from <path>',
	pull: '--target . --deps x,y --apply --yes --strict',
	audit: '--target . --live --from <path> --groups a,b',
	repair: '--target . --apply --yes --prune --from <path>',
	fleet: '--apply --yes --prune --from <path>',
	catalog: '--from <path> ... --target <repo> --offline --apply --yes',
})

/** Per-verb, per-flag plain-language descriptions — `verbHelp`'s one-line-per-flag body. `--prune` is marked destructive. */
export const VERB_FLAG_HELP: Readonly<Record<Verb, readonly (readonly [string, string])[]>> =
	Object.freeze({
		new: [
			['--surfaces a,b', 'which surfaces to include (core, browser, server)'],
			['--deps x,y', '@orkestrel/* dependencies to add (installed as dependencies)'],
			['--apply', 'write the files (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			['--target <path>', 'destination directory (default: ./<name>)'],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
		],
		pull: [
			['--target .', 'directory to refresh (default: current directory)'],
			['--deps x,y', 'limit the refresh to these dependencies'],
			['--apply', 'write the refreshed files (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			['--strict', 'fail (exit 1) on any drift, even non-fatal'],
		],
		audit: [
			['--target .', 'directory to audit (default: current directory)'],
			['--live', 'also check upstream freshness over the network'],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
			['--groups a,b', 'limit the audit to these artifact groups'],
		],
		repair: [
			['--target .', 'directory to repair (default: current directory)'],
			['--apply', 'write the fixes (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			['--prune', 'also DELETE unexpected files under .claude/agents and scripts'],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
		],
		fleet: [
			['--apply', 'write fixes across every package (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
			['--prune', 'also DELETE unexpected files under .claude/agents and scripts, per package'],
			['--from <path>', 'read the template from a local path instead of the bundled one'],
		],
		catalog: [
			['--from <path> ...', 'one or more local package paths to include'],
			['--target <repo>', 'the repo whose README catalog table gets updated'],
			['--offline', 'skip network lookups (npm registry) for package descriptions'],
			['--apply', 'write the updated table (default is a dry run)'],
			['--yes', 'skip the confirmation question'],
		],
	})

/** The dry-run/confirm note per verb — `audit` never writes, so its note says so instead. */
export const VERB_DRY_RUN_NOTE: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'dry run by default — add --apply to write the files, --yes to skip the question',
	pull: 'dry run by default — add --apply to write the refreshed files, --yes to skip the question',
	audit: 'read-only — audit never writes; pass --live to also check upstream freshness',
	repair: 'dry run by default — add --apply to write, --yes to skip the question',
	fleet:
		'dry run by default — add --apply to write across every package, --yes to skip the question',
	catalog: 'dry run by default — add --apply to write, --yes to skip the question',
})

/** One concrete example invocation per verb — `verbHelp`'s closing line. */
export const VERB_EXAMPLE: Readonly<Record<Verb, string>> = Object.freeze({
	new: 'example: scaffold new widget --surfaces core,server --apply',
	pull: 'example: scaffold pull --apply',
	audit: 'example: scaffold audit --live',
	repair: 'example: scaffold repair --apply',
	fleet: 'example: scaffold fleet --apply --yes',
	catalog: 'example: scaffold catalog --apply',
})

/** The full reference help tier — every verb's summary + flags, the safety banner, and the exit-code table. */
export function fullHelp(): string {
	const verbLines = KNOWN_VERBS.map(
		(verb) => `  ${verb} ${VERB_FLAGS[verb]}\n    ${VERB_SUMMARY[verb]}`,
	)
	const exitLines = EXIT_CODES.map(([code, meaning]) => `  ${code}  ${meaning}`)
	return [
		'scaffold <verb> [options]',
		'',
		...verbLines,
		'',
		SAFETY_BANNER,
		'',
		'exit codes:',
		...exitLines,
	].join('\n')
}

/** One verb's help section — summary, dry-run note, one line per flag, and a concrete example. */
export function verbHelp(verb: Verb): string {
	const flagLines = VERB_FLAG_HELP[verb].map(([flag, meaning]) => `  ${flag.padEnd(20)}${meaning}`)
	return [
		`scaffold ${verb} ${VERB_FLAGS[verb]}`,
		'',
		VERB_SUMMARY[verb],
		VERB_DRY_RUN_NOTE[verb],
		'',
		...flagLines,
		'',
		VERB_EXAMPLE[verb],
	].join('\n')
}

/** Levenshtein edit distance between two strings — the did-you-mean primitive. */
export function editDistance(a: string, b: string): number {
	const rows = a.length + 1
	const cols = b.length + 1
	const table: number[][] = Array.from({ length: rows }, () => new Array<number>(cols).fill(0))
	for (let i = 0; i < rows; i += 1) table[i][0] = i
	for (let j = 0; j < cols; j += 1) table[0][j] = j
	for (let i = 1; i < rows; i += 1) {
		for (let j = 1; j < cols; j += 1) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1
			table[i][j] = Math.min(table[i - 1][j] + 1, table[i][j - 1] + 1, table[i - 1][j - 1] + cost)
		}
	}
	return table[rows - 1][cols - 1]
}

/** The nearest candidate to `input` by `editDistance` — `undefined` when `set` is empty. */
export function nearest(input: string, set: readonly string[]): string | undefined {
	let best: string | undefined
	let bestDistance = Number.POSITIVE_INFINITY
	for (const candidate of set) {
		const distance = editDistance(input, candidate)
		if (distance < bestDistance) {
			bestDistance = distance
			best = candidate
		}
	}
	return best
}

/** Retired verb names redirected to their replacement — checked before fuzzy matching in `didYouMean`. */
export const RETIRED_VERBS: Readonly<Record<string, string>> = Object.freeze({
	sync: 'pull',
	mirror: 'fleet',
})

/** The unknown-command message — a retired-verb redirect when recognized, otherwise the nearest `KNOWN_VERBS` guess. */
export function didYouMean(command: string): string {
	const retired = RETIRED_VERBS[command]
	if (retired !== undefined) return `'${command}' has been renamed — use 'scaffold ${retired}'`
	const guess = nearest(command, [...KNOWN_VERBS])
	return guess === undefined
		? `unknown command "${command}"`
		: `unknown command "${command}" — did you mean "${guess}"?`
}

/** One JSON error envelope — the single shape every `--json` failure returns. */
export function errorEnvelope(
	code: string,
	message: string,
): { readonly error: { readonly code: string; readonly message: string } } {
	return { error: { code, message } }
}

/** `new --json`'s value — the plan summary, deterministic key order. */
export function newJson(
	summary: {
		readonly name: string
		readonly surfaces: readonly Surface[]
		readonly host: number
		readonly template: number
		readonly computed: number
	},
	applied: boolean,
): {
	readonly name: string
	readonly surfaces: readonly Surface[]
	readonly host: number
	readonly template: number
	readonly computed: number
	readonly applied: boolean
} {
	return {
		name: summary.name,
		surfaces: summary.surfaces,
		host: summary.host,
		template: summary.template,
		computed: summary.computed,
		applied,
	}
}

/** `pull --json`'s value — the `SyncReport` verbatim (already deterministic + JSON-safe). */
export function pullJson(report: SyncReport): SyncReport {
	return report
}

/** `audit --json`'s value — the `Audit` verbatim. */
export function auditJson(audit: Audit): Audit {
	return audit
}

/** `repair --json`'s value — the `Audit` plus the `MaterializeResult` when `--apply` ran. */
export function repairJson(
	audit: Audit,
	result?: MaterializeResult,
): Audit | (Audit & { readonly result: MaterializeResult }) {
	return result === undefined ? audit : { ...audit, result }
}

/** `fleet --json`'s value — a top-level ARRAY of per-repo objects, one entry per package. */
export function fleetJson(
	entries: readonly {
		readonly name: string
		readonly drifted: number
		readonly missing: number
		readonly foreign: number
		readonly failed: boolean
	}[],
): readonly {
	readonly name: string
	readonly drifted: number
	readonly missing: number
	readonly foreign: number
	readonly failed: boolean
}[] {
	return entries
}

/** `catalog --json`'s value — the entries, drift flag, and optional shrink count. */
export function catalogJson(
	entries: readonly CatalogEntry[],
	drifted: boolean,
	shrink?: number,
): {
	readonly entries: readonly CatalogEntry[]
	readonly drift: boolean
	readonly shrink?: number
} {
	return shrink === undefined ? { entries, drift: drifted } : { entries, drift: drifted, shrink }
}

/** `enabled` for `createStyler` — off under `NO_COLOR` or when the sink is not a TTY (both read by the caller). */
export function chooseStyler(sinkIsTTY: boolean, noColor: boolean): StylerInterface {
	return createStyler({ enabled: !noColor && sinkIsTTY })
}

/** Whether a long-running step should animate a spinner (TTY) or fall back to a one-line `status` (piped/non-TTY). */
export function shouldSpin(sinkIsTTY: boolean): boolean {
	return sinkIsTTY
}

/** One line per exact relative path that WOULD be deleted — printed before the prune confirm. */
export function prunePreview(paths: readonly string[]): readonly string[] {
	return paths.map((path) => `  delete ${path}`)
}

/** Printed when the prune scan finds nothing to delete. */
export const PRUNE_EMPTY = 'no unexpected files to delete'

/** Printed on a non-TTY session when the prune question cannot be asked. */
export function pruneSkipped(): string {
	return 'prune skipped — not a terminal; add --apply (or --yes) to delete non-interactively'
}

/** Non-TTY usage-error guidance for a missing required input. */
export function missingInput(what: string, verb: string): string {
	return `missing ${what} — pass it as a flag/argument, or run 'scaffold ${verb}' on a terminal to be guided`
}

/** Printed when `audit` cannot establish the template source for the unexpected-file scan — the audit degrades to the un-scanned findings instead of crashing. */
export function scanSkipped(): string {
	return "unexpected-file scanning skipped — couldn't establish the template source"
}

/** Usage-error message for a `new` package name that fails `PACKAGE_NAME_PATTERN` — same shape the interactive prompt enforces. */
export function invalidName(name: string, pattern: string): string {
	return `Package name "${name}" must match ${pattern}`
}

/** `new`'s hard failure when `sync.versions` cannot resolve a latest version for one or more `--deps` names — names every unresolved package plainly so a `^` (unresolved-latest) range can never be silently written. */
export function unresolvedVersion(names: readonly string[]): string {
	return `could not resolve the latest version for ${names.map((name) => `"${name}"`).join(', ')} — check the name or pass name@range`
}

/** Printed when every finding is `generated` drift — repair does not touch generated files. */
export function generatedNote(count: number): string {
	return `${countPart(count, 'finding')} in generated files — these are regenerated, not hand-edited; repair does not touch them`
}

/** `audit --live`'s freshness summary line. */
export function auditLiveNote(current: number, behind: number, failed: number): string {
	return `live: ${countPart(current, 'current')}, ${countPart(behind, 'behind')}, ${countPart(failed, 'failed')}`
}

/** Translated vocabulary for whether the audit compared file contents or only file names, for template-owned files. */
export function comparisonLine(aware: boolean): string {
	return aware
		? 'comparing: file contents for template-owned files'
		: 'comparing: file names only for template-owned files (no vendored source found)'
}

/** `fleet`'s ci.yml note — each package customizes its own CI, so `fleet` leaves it unchanged. */
export function fleetCiSkipped(): string {
	return "ci.yml: left unchanged — each package customizes its own CI; run 'scaffold repair --apply' inside that package to update it"
}

/** `catalog`'s verdict line — clean or drifted. */
export function catalogVerdict(clean: boolean): string {
	return clean ? 'catalog: clean' : 'catalog: drifted — pass --apply to write'
}
