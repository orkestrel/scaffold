import type { TableAlign, TableNode } from '@orkestrel/markdown'
import type {
	Audit,
	Blueprint,
	CatalogEntry,
	Category,
	Dependency,
	Drift,
	Finding,
	Freshness,
	Group,
	Member,
	Override,
	Plan,
	PlanSummary,
	Question,
	Surface,
	SyncReport,
	Validation,
} from './types.js'
import { parseInline, renderMarkdown } from '@orkestrel/markdown'
import {
	DEFAULT_ENGINES,
	DEFAULT_VERSION,
	DEPENDENCY_NAME_PATTERN,
	EXTRA_NAME_PATTERN,
	JSON_PRINT_WIDTH,
	JSON_TAB_WIDTH,
	NAME_PATTERN,
	SURFACES,
} from './constants.js'

/**
 * Build a fresh `Dependency`.
 *
 * @param name - The `@orkestrel/*` package name.
 * @param range - The semver range.
 * @param optional - Whether this dependency is optional; meaningful only when
 * used as a `Blueprint` peer. Omitted entirely when absent.
 * @returns A `Dependency` with `name` / `range` set, `optional` included only when passed.
 *
 * @example
 * ```ts
 * import { dependency } from '@orkestrel/scaffold'
 *
 * dependency('@orkestrel/contract', '^0.0.5') // { name: '@orkestrel/contract', range: '^0.0.5' }
 * dependency('@orkestrel/database', '^0.0.5', true) // optional: true
 * ```
 */
export function dependency(name: string, range: string, optional?: boolean): Dependency {
	return optional === undefined ? { name, range } : { name, range, optional }
}

/**
 * Build a fresh `Override`.
 *
 * @param path - The artifact-relative path the override replaces.
 * @param content - The replacement content.
 * @returns An `Override` with both fields set.
 *
 * @example
 * ```ts
 * import { override } from '@orkestrel/scaffold'
 *
 * override('README.md', '# router\n') // { path: 'README.md', content: '# router\n' }
 * ```
 */
export function override(path: string, content: string): Override {
	return { path, content }
}

/**
 * Build a fresh `Member`.
 *
 * @param name - The declared export name.
 * @param category - The `Member`'s `Category`.
 * @param summary - A one-line description.
 * @param surface - The owning `Surface`; defaults `'core'`.
 * @returns A `Member` with every field set.
 *
 * @example
 * ```ts
 * import { member } from '@orkestrel/scaffold'
 *
 * member('RouterOptions', 'type', 'Options for creating a Router.') // surface: 'core'
 * ```
 */
export function member(
	name: string,
	category: Category,
	summary: string,
	surface: Surface = 'core',
): Member {
	return { name, category, summary, surface }
}

/**
 * Build a fresh `Blueprint` from a name and a partial of the rest.
 *
 * @param name - The package name.
 * @param options - A partial of the remaining `Blueprint` fields.
 * @remarks
 * `version` / `engines` default `DEFAULT_VERSION` / `DEFAULT_ENGINES`, `surfaces`
 * defaults `['core']`, and `keywords` / `dependencies` / `peers` / `extras` /
 * `overrides` default `[]`. `description` is OMITTED entirely when absent, so
 * the result round-trips the exact-record `Blueprint` guard.
 * @returns A complete `Blueprint`.
 *
 * @example
 * ```ts
 * import { blueprint } from '@orkestrel/scaffold'
 *
 * blueprint('router').version // '0.0.1'
 * ```
 */
export function blueprint(name: string, options?: Partial<Omit<Blueprint, 'name'>>): Blueprint {
	const base: Blueprint = {
		name,
		keywords: options?.keywords ?? [],
		surfaces: options?.surfaces ?? ['core'],
		dependencies: options?.dependencies ?? [],
		peers: options?.peers ?? [],
		extras: options?.extras ?? [],
		version: options?.version ?? DEFAULT_VERSION,
		engines: options?.engines ?? DEFAULT_ENGINES,
		overrides: options?.overrides ?? [],
		engine: options?.engine ?? false,
	}
	return options?.description === undefined ? base : { ...base, description: options.description }
}

/**
 * Derive the PascalCase entity name from a lowercase-hyphen package name.
 *
 * @param name - A lowercase-hyphen package name.
 * @returns The PascalCase entity name — hyphens are word breaks.
 *
 * @example
 * ```ts
 * import { pascalCase } from '@orkestrel/scaffold'
 *
 * pascalCase('my-router') // 'MyRouter'
 * ```
 */
export function pascalCase(name: string): string {
	return name
		.split('-')
		.filter((word) => word.length > 0)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('')
}

/**
 * Derive the declared public `Member[]` from a blueprint.
 *
 * @param spec - The blueprint to derive members from.
 * @remarks
 * The canonical per-surface inventory is the four `Category` buckets applied to
 * the package's PascalCase entity name: an `Options` type, an `Interface` type,
 * a `create*` factory, a default-id constant, and the entity itself. Standalone
 * helpers, validators, and shapers are hand-authored in implementation, not
 * scaffolded.
 * @returns The declared `Member[]`, one set per surface.
 *
 * @example
 * ```ts
 * import { blueprint, blueprintToMembers } from '@orkestrel/scaffold'
 *
 * blueprintToMembers(blueprint('router'))[0] // { name: 'Router', category: 'entity', … }
 * ```
 */
export function blueprintToMembers(spec: Blueprint): readonly Member[] {
	const pascal = pascalCase(spec.name)
	const screaming = pascal.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase()
	const members: Member[] = []
	for (const surface of spec.surfaces) {
		members.push(member(pascal, 'entity', `The ${pascal} entity.`, surface))
		members.push(member(`${pascal}Options`, 'type', `Options for creating a ${pascal}.`, surface))
		members.push(member(`${pascal}Interface`, 'type', `The ${pascal} contract.`, surface))
		members.push(member(`create${pascal}`, 'factory', `Create a ${pascal}.`, surface))
		members.push(member(`${screaming}_ID`, 'constant', `The default id for a ${pascal}.`, surface))
	}
	return members
}

/**
 * Extract the `@orkestrel/<name>` package names from a catalog markdown
 * block/table, in row order.
 *
 * @param text - The markdown block/table text (the `orkestrel.md` embedded
 * catalog shape — GFM table rows opening `| @orkestrel/<name>`).
 * @remarks
 * Pure line-scan: a row matches when, after trimming, it starts with
 * `| @orkestrel/` followed by a `NAME_PATTERN`-shaped short name and a cell
 * boundary (`|` or whitespace) — the same row shape `runCatalog`'s shrink
 * count previously matched inline; this is the single source both consume.
 * Returns `[]` when the text has no markers/rows (never throws).
 * @returns The full `@orkestrel/<name>` names found, in order.
 *
 * @example
 * ```ts
 * import { catalogNames } from '@orkestrel/scaffold'
 *
 * catalogNames('| @orkestrel/contract | ... |\n| @orkestrel/emitter | ... |')
 * // ['@orkestrel/contract', '@orkestrel/emitter']
 * ```
 */
export function catalogNames(text: string): readonly string[] {
	const rowPattern = /^\|\s*(@orkestrel\/[a-z][a-z0-9-]*)(?=\s|\|)/
	const names: string[] = []
	for (const line of text.split('\n')) {
		const match = rowPattern.exec(line.trimStart())
		if (match !== null && match[1] !== undefined) names.push(match[1])
	}
	return names
}

/**
 * Build a formatter-width-aligned GFM table string from header and row cells.
 *
 * @param header - The header cell strings, in column order.
 * @param rows - The body rows, each a list of cell strings matching `header`'s column count.
 * @param align - Optional per-column alignment; defaults every column to `'none'`.
 * @remarks
 * Builds a `TableNode` (each cell parsed with `parseInline`) and serializes it
 * through `renderMarkdown`, which contributes the structure — `\|`-escaping any
 * literal pipe and emitting the alignment delimiter row — at a flat 1-space
 * cell padding. This function then re-pads BOTH the cells AND the delimiter row
 * to per-column codepoint width, matching oxfmt's markdown re-padding.
 * @returns The aligned GFM table string.
 *
 * @example
 * ```ts
 * import { alignTable } from '@orkestrel/scaffold'
 *
 * alignTable(['API', 'Kind'], [['`createRouter`', 'function']])
 * // '| API            | Kind     |\n| --------------- | -------- |\n| `createRouter` | function |'
 * ```
 */
export function alignTable(
	header: readonly string[],
	rows: readonly (readonly string[])[],
	align?: readonly TableAlign[],
): string {
	const columns = header.length
	const alignment: readonly TableAlign[] = align ?? header.map(() => 'none' as const)
	const node: TableNode = {
		element: 'table',
		header: header.map((cell) => parseInline(cell)),
		rows: rows.map((row) => row.map((cell) => parseInline(cell))),
		align: alignment,
	}
	const rendered = renderMarkdown(node)
	const lines = rendered.split('\n')
	const headerCells = splitTableRow(lines[0] ?? '')
	const bodyCells = lines.slice(2).map((line) => splitTableRow(line))
	const widths: number[] = []
	for (let column = 0; column < columns; column += 1) {
		let width = Array.from(headerCells[column] ?? '').length
		for (const row of bodyCells) {
			const length = Array.from(row[column] ?? '').length
			if (length > width) width = length
		}
		widths.push(Math.max(3, width))
	}
	const headerLine = `| ${headerCells.map((cell, index) => padCell(cell, widths[index] ?? 3)).join(' | ')} |`
	const delimiterLine = `| ${alignment.map((columnAlign, index) => delimiterCell(columnAlign, widths[index] ?? 3)).join(' | ')} |`
	const bodyLines = bodyCells.map(
		(row) => `| ${row.map((cell, index) => padCell(cell, widths[index] ?? 3)).join(' | ')} |`,
	)
	return [headerLine, delimiterLine, ...bodyLines].join('\n')
}

/**
 * Split one rendered GFM table row into its trimmed cell strings.
 *
 * @param line - A single rendered table line (header, delimiter, or body row).
 * @remarks
 * Splits on an UNESCAPED `|` (a `\|` is a literal pipe inside a cell, not a
 * column boundary), then drops the leading/trailing empty segments the
 * boundary pipes produce and trims each remaining cell.
 * @returns The row's cell strings, in column order.
 *
 * @example
 * ```ts
 * import { splitTableRow } from '@orkestrel/scaffold'
 *
 * splitTableRow('| a | b |') // ['a', 'b']
 * ```
 */
export function splitTableRow(line: string): readonly string[] {
	const parts = line.split(/(?<!\\)\|/)
	return parts.slice(1, -1).map((part) => part.trim())
}

/**
 * Right-pad a cell to a codepoint width, oxfmt-style.
 *
 * @param text - The cell text.
 * @param width - The target codepoint width.
 * @remarks
 * Measures via `Array.from` (codepoints, not UTF-16 code units) so a
 * surrogate-pair or wide codepoint counts once, matching oxfmt's own
 * width math. A cell already at or past `width` is returned unchanged.
 * @returns `text` padded with trailing spaces to `width` codepoints.
 *
 * @example
 * ```ts
 * import { padCell } from '@orkestrel/scaffold'
 *
 * padCell('ab', 5) // 'ab   '
 * ```
 */
export function padCell(text: string, width: number): string {
	const length = Array.from(text).length
	return length >= width ? text : text + ' '.repeat(width - length)
}

/**
 * Build one delimiter-row cell for a GFM table column.
 *
 * @param columnAlign - The column's `TableAlign`.
 * @param width - The column's codepoint width.
 * @remarks
 * `'left'` prefixes `:`, `'right'` suffixes `:`, `'center'` wraps both ends,
 * `'none'` is plain dashes — one dash per width unit, `:` markers consuming
 * a dash slot rather than adding to `width`.
 * @returns The delimiter cell string for this column.
 *
 * @example
 * ```ts
 * import { delimiterCell } from '@orkestrel/scaffold'
 *
 * delimiterCell('left', 5) // ':----'
 * ```
 */
export function delimiterCell(columnAlign: TableAlign, width: number): string {
	if (columnAlign === 'left') return `:${'-'.repeat(width - 1)}`
	if (columnAlign === 'right') return `${'-'.repeat(width - 1)}:`
	if (columnAlign === 'center') return `:${'-'.repeat(width - 2)}:`
	return '-'.repeat(width)
}

/**
 * Project a `Plan` into a `PlanSummary`.
 *
 * @param plan - The plan to summarize.
 * @returns The artifact tally by `origin`, the surfaces, and the covered groups.
 *
 * @example
 * ```ts
 * import { planToSummary } from '@orkestrel/scaffold'
 *
 * planToSummary(plan) // { name: 'router', artifacts: 21, host: 12, template: 6, computed: 3, … }
 * ```
 */
export function planToSummary(plan: Plan): PlanSummary {
	let host = 0
	let template = 0
	let computed = 0
	for (const artifact of plan.artifacts) {
		if (artifact.origin === 'host') host += 1
		else if (artifact.origin === 'template') template += 1
		else computed += 1
	}
	return {
		name: plan.blueprint.name,
		surfaces: plan.blueprint.surfaces,
		groups: plan.groups,
		artifacts: plan.artifacts.length,
		host,
		template,
		computed,
	}
}

/**
 * Project a `Plan` into a copy-ready markdown review document.
 *
 * @param plan - The plan to review.
 * @returns The artifact table by group, the members table, and the summary — the diff-first dry run.
 *
 * @example
 * ```ts
 * import { planToReview } from '@orkestrel/scaffold'
 *
 * planToReview(plan) // '# Scaffolding router\n## Artifacts\n| Path | Group | Origin |\n…'
 * ```
 */
export function planToReview(plan: Plan): string {
	const summary = planToSummary(plan)
	const members = blueprintToMembers(plan.blueprint)
	const artifactTable = alignTable(
		['Path', 'Group', 'Origin'],
		plan.artifacts.map((artifact) => [artifact.path, artifact.group, artifact.origin]),
	)
	const memberTable = alignTable(
		['Name', 'Category', 'Surface'],
		members.map((entry) => [entry.name, entry.category, entry.surface]),
	)
	return [
		`# Scaffolding ${plan.blueprint.name}`,
		'',
		'## Artifacts',
		'',
		artifactTable,
		'',
		'## Members',
		'',
		memberTable,
		'',
		'## Summary',
		'',
		`- surfaces: ${summary.surfaces.join(', ')}`,
		`- groups: ${summary.groups.join(', ')}`,
		`- artifacts: ${summary.artifacts} (host: ${summary.host}, template: ${summary.template}, computed: ${summary.computed})`,
	].join('\n')
}

/**
 * Project an `Audit` into a markdown drift report.
 *
 * @param audit - The audit to report.
 * @returns Findings grouped by `drift`, `aligned` entries elided — what `repair` will touch.
 *
 * @example
 * ```ts
 * import { auditToReview } from '@orkestrel/scaffold'
 *
 * auditToReview(audit) // '# Audit\n\n- clean: false\n…\n## stale\n\n| Path | Group |\n…'
 * ```
 */
export function auditToReview(audit: Audit): string {
	const groups: Record<Drift, Finding[]> = { aligned: [], stale: [], missing: [], foreign: [] }
	for (const finding of audit.findings) groups[finding.drift].push(finding)
	const sections: string[] = [
		'# Audit',
		'',
		`- clean: ${audit.clean}`,
		`- drifted: ${audit.drifted}`,
		`- missing: ${audit.missing}`,
		`- foreign: ${audit.foreign}`,
	]
	for (const drift of ['stale', 'missing', 'foreign'] as const) {
		const findings = groups[drift]
		if (findings.length === 0) continue
		sections.push(
			'',
			`## ${drift}`,
			'',
			alignTable(
				['Path', 'Group'],
				findings.map((finding) => [finding.path, finding.group]),
			),
		)
	}
	return sections.join('\n')
}

/**
 * Test whether a `Freshness` verdict counts toward "behind".
 *
 * @param freshness - The freshness verdict to test.
 * @returns `true` iff `freshness` is `'behind'`.
 *
 * @example
 * ```ts
 * import { isBehind } from '@orkestrel/scaffold'
 *
 * isBehind('behind') // true
 * isBehind('current') // false
 * ```
 */
export function isBehind(freshness: Freshness): boolean {
	return freshness === 'behind'
}

/**
 * Project a `SyncReport` into a markdown freshness report.
 *
 * @param report - The sync report to render.
 * @returns Guides and versions each in their own table, via `alignTable` — the sibling of `auditToReview`.
 *
 * @example
 * ```ts
 * import { syncToReview } from '@orkestrel/scaffold'
 *
 * syncToReview(report) // '# Sync — 2 behind\n## Guides\n| Name | Freshness |\n…'
 * ```
 */
export function syncToReview(report: SyncReport): string {
	const behind =
		report.guides.filter((guide) => isBehind(guide.freshness)).length +
		report.versions.filter((version) => isBehind(version.freshness)).length
	const sections: string[] = [
		`# Sync — ${behind} behind`,
		'',
		`- clean: ${report.clean}`,
		`- failed: ${report.failed}`,
	]
	if (report.guides.length > 0) {
		sections.push(
			'',
			'## Guides',
			'',
			alignTable(
				['Name', 'Freshness'],
				report.guides.map((guide) => [guide.name, guide.freshness]),
			),
		)
	}
	if (report.versions.length > 0) {
		sections.push(
			'',
			'## Versions',
			'',
			alignTable(
				['Name', 'Range', 'Latest', 'Freshness'],
				report.versions.map((version) => [
					version.name,
					version.range,
					version.latest,
					version.freshness,
				]),
			),
		)
	}
	return sections.join('\n')
}

/**
 * Project a fleet package catalog into a markdown table — the block
 * `.claude/agents/orkestrel.md`'s catalog markers wrap.
 *
 * @param entries - The catalog rows to render.
 * @remarks
 * Deduplicated by `name` (a later entry for a repeated name wins), then
 * code-unit sorted by `name`. An empty `description` renders as `—` (an em
 * dash), never a blank cell. Deterministic — same input, same output, every
 * time — via `alignTable`; trailing-newline terminated.
 * @returns The aligned GFM table string.
 *
 * @example
 * ```ts
 * import { catalogToBlock } from '@orkestrel/scaffold'
 *
 * catalogToBlock([
 * 	{ name: '@orkestrel/router', version: '0.0.5', description: 'A tiny hash-router.' },
 * 	{ name: '@orkestrel/contract', version: '0.0.5', description: '' },
 * ])
 * // '| Package             | Version | Description         |\n| … |\n| @orkestrel/contract | 0.0.5   | —                   |\n…'
 * ```
 */
export function catalogToBlock(entries: readonly CatalogEntry[]): string {
	const merged = new Map<string, CatalogEntry>()
	for (const entry of entries) merged.set(entry.name, entry)
	const sorted = [...merged.values()].sort((a, b) =>
		a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
	)
	const table = alignTable(
		['Package', 'Version', 'Description'],
		sorted.map((entry) => [
			entry.name,
			entry.version,
			entry.description.length === 0 ? '—' : entry.description,
		]),
	)
	return `${table}\n`
}

/**
 * Infer a foreign path's `Group` from its leading path segment.
 *
 * @param path - The target-relative path to classify.
 * @remarks
 * Ordered prefix match — `src/`, `tests/`, `guides/`, `docs/`, `configs/`,
 * then `.github/` / `scripts/` as `'orchestration'`, then the two manifest
 * files by exact name. Anything else (a root-level, prefix-less file) falls
 * through to `'configs'`.
 * @returns The inferred `Group` for `path`.
 *
 * @example
 * ```ts
 * import { inferGroup } from '@orkestrel/scaffold'
 *
 * inferGroup('src/core/index.ts') // 'source'
 * inferGroup('mystery.config.ts') // 'configs'
 * ```
 */
export function inferGroup(path: string): Group {
	if (path.startsWith('src/')) return 'source'
	if (path.startsWith('tests/')) return 'tests'
	if (path.startsWith('guides/')) return 'guides'
	if (path.startsWith('docs/')) return 'docs'
	if (path.startsWith('configs/')) return 'configs'
	if (path.startsWith('.github/') || path.startsWith('scripts/')) return 'orchestration'
	if (path === 'package.json' || path === 'package-lock.json') return 'manifest'
	return 'configs'
}

/**
 * Diff a plan's artifacts against a target's current content.
 *
 * @param plan - The plan whose artifacts are the source of truth.
 * @param current - The target's current content, keyed by artifact-relative path.
 * @remarks
 * Audit semantics are per-origin. A `host`-origin artifact is audited by
 * PRESENCE only — `missing` or `aligned`, never `stale` — UNLESS it has been
 * hydrated with its real host bytes (`hydratePlan`'s `content`), in which case
 * it is content-compared exactly like a `computed` artifact and CAN be
 * `stale`. A degrade-path or directory-shaped host artifact (never hydrated)
 * stays presence-only. A `computed` artifact is content-aware canon —
 * `missing` / `aligned` / `stale` — and gates the audit like any drifted
 * finding. A `template`-origin artifact is BIRTH-ONLY and AUDIT-EXEMPT: it is
 * always reported `aligned`, regardless of whether the target has it at all
 * or what its bytes are. Starter files (source stubs, test stubs, starter
 * guides, README) are written ONCE by `materialize` and are legitimately
 * outgrown — real code replaces the stub, a hand-authored guide replaces the
 * scaffold prose, an entity gets renamed. Content- or presence-comparing a
 * mature package against its birth stub is a category error (the build and
 * parity gates already police the package's substance) AND makes any
 * unscoped repair a data-loss footgun — a stub overwrite would clobber real,
 * hand-authored code. `template` findings therefore never contribute to
 * `drifted` / `missing` / `clean`. A target file the plan does not own is
 * `foreign`.
 * @returns The `Audit` of drift findings — pure, no I/O.
 *
 * @example
 * ```ts
 * import { diffPlan } from '@orkestrel/scaffold'
 *
 * diffPlan(plan, current) // { findings: [...], clean: false, complete: true, drifted: 1, missing: 20, foreign: 0 }
 * ```
 */
export function diffPlan(plan: Plan, current: Readonly<Record<string, string>>): Audit {
	const findings: Finding[] = []
	const owned = new Set<string>()
	for (const artifact of plan.artifacts) {
		owned.add(artifact.path)
		const seen = current[artifact.path]
		if (artifact.origin === 'template') {
			findings.push({ path: artifact.path, group: artifact.group, drift: 'aligned' })
			continue
		}
		if (artifact.origin === 'host') {
			let drift: Drift
			if (seen === undefined) drift = 'missing'
			else if (artifact.content === undefined) drift = 'aligned'
			else drift = seen === artifact.content ? 'aligned' : 'stale'
			findings.push({ path: artifact.path, group: artifact.group, drift })
			continue
		}
		if (seen === undefined)
			findings.push({ path: artifact.path, group: artifact.group, drift: 'missing' })
		else if (seen === artifact.content)
			findings.push({ path: artifact.path, group: artifact.group, drift: 'aligned' })
		else findings.push({ path: artifact.path, group: artifact.group, drift: 'stale' })
	}
	for (const path of Object.keys(current)) {
		if (owned.has(path)) continue
		findings.push({ path, group: inferGroup(path), drift: 'foreign' })
	}
	let drifted = 0
	let missing = 0
	let foreign = 0
	for (const finding of findings) {
		if (finding.drift === 'stale') drifted += 1
		else if (finding.drift === 'missing') missing += 1
		else if (finding.drift === 'foreign') foreign += 1
	}
	return {
		findings,
		clean: drifted === 0 && missing === 0 && foreign === 0,
		complete: true,
		questions: [],
		drifted,
		missing,
		foreign,
	}
}

/**
 * Validate one dependency-shaped array under the name/range/duplicate rules.
 *
 * @param field - The `Question.field` to attribute a violation to (`'dependencies'` / `'peers'` / `'extras'`).
 * @param items - The `Dependency[]` to check.
 * @remarks
 * Pure — takes no closed-over `questions` array to mutate; the caller
 * concatenates the returned `questions` and inspects the returned `seen` set
 * to apply the cross-array (`dependencies` vs `peers` vs `extras`) overlap
 * rules `validateBlueprint` layers on top. `field === 'extras'` validates
 * names against `EXTRA_NAME_PATTERN` (broader — any valid npm package name);
 * `'dependencies'` and `'peers'` keep `DEPENDENCY_NAME_PATTERN` (closed to
 * `@orkestrel/*`) — the path-derived arrays stay orkestrel-closed, since only
 * `dependencies`/`peers` names ever reach `Compiler.#pointerArtifacts`' path
 * derivation; `extras` names are manifest-content only.
 * @returns The violations found and the set of names seen, in encounter order.
 *
 * @example
 * ```ts
 * import { validateDependencyArray } from '@orkestrel/scaffold'
 *
 * validateDependencyArray('dependencies', [{ name: '', range: '^1' }])
 * // { questions: [{ field: 'dependencies', text: 'A dependency name must not be empty', … }], seen: Set(0) {} }
 * ```
 */
export function validateDependencyArray(
	field: string,
	items: readonly Dependency[],
): { readonly questions: readonly Question[]; readonly seen: ReadonlySet<string> } {
	const pattern = field === 'extras' ? EXTRA_NAME_PATTERN : DEPENDENCY_NAME_PATTERN
	const questions: Question[] = []
	const seen = new Set<string>()
	for (const item of items) {
		if (item.name.length === 0) {
			questions.push({ field, text: 'A dependency name must not be empty', blocking: true })
		} else if (!pattern.test(item.name)) {
			questions.push({
				field,
				text: `Dependency name "${item.name}" must match ${pattern.source}`,
				blocking: true,
			})
		}
		if (item.range.length === 0) {
			questions.push({
				field,
				text: `Dependency "${item.name}" is missing a version range`,
				blocking: true,
			})
		}
		if (seen.has(item.name)) {
			questions.push({
				field,
				text: `Dependency "${item.name}" is declared more than once`,
				blocking: true,
			})
		}
		seen.add(item.name)
	}
	return { questions, seen }
}

/**
 * The semantic pass over a blueprint.
 *
 * @param spec - The blueprint to validate.
 * @remarks
 * Checks the name against `NAME_PATTERN`, non-empty on-vocabulary `surfaces`
 * with no repeats (a repeat would produce duplicate members); a single
 * surface — `core`-only, `server`-only, `browser`-only — is a fully
 * first-class declaration (`rootViteConfig` retargets the root export and
 * runs the surface's own factory as the base, no `core` involved), but a
 * `browser`+`server` declaration with no `core` has no defined configuration
 * class `rootViteConfig` / `singleSurfaceViteConfig` can shape — that ONE
 * exemplar-less combination is a blocking question (without this gate it
 * would silently drop a surface at `rootViteConfig`'s dispatch while the
 * manifest still references it). And well-formed `dependencies` / `peers` /
 * `extras` (non-empty name/range, no duplicate names within an array):
 * `dependencies` and `peers` names are shaped `DEPENDENCY_NAME_PATTERN`
 * (closed to `@orkestrel/*`) — a NAME-shaped law at the gate that closes the
 * traversal vector a hand-built `../`-laced dependency name would open
 * through `Compiler.#pointerArtifacts`'s path derivation; `extras` names are
 * shaped `EXTRA_NAME_PATTERN` instead — broader (any valid npm package name),
 * safe because `extras` never feeds a path, only `devDependencies` content. A
 * name appearing in both `dependencies` and `peers` is a blocking question
 * (npm forbids sensibly declaring the same package both ways), and an
 * `extras` name may overlap neither `dependencies` nor `peers`.
 * @returns A `Validation` — never throws.
 *
 * @example
 * ```ts
 * import { validateBlueprint } from '@orkestrel/scaffold'
 *
 * validateBlueprint(blueprint('router')) // { valid: true, questions: [], warnings: [] }
 * ```
 */
export function validateBlueprint(spec: Blueprint): Validation {
	// The published `@orkestrel/<name>` scope adds 11 characters; npm caps a
	// package name at 214, so the bare `name` field must fit within 214 - 11.
	const MAX_NAME_LENGTH = 203
	const VERSION_PATTERN = /^\d+\.\d+\.\d+$/
	const ENGINES_PATTERN = /^>=\d+$/
	const questions: Question[] = []
	if (!NAME_PATTERN.test(spec.name)) {
		questions.push({
			field: 'name',
			text: `Name "${spec.name}" must match ${NAME_PATTERN.source}`,
			blocking: true,
		})
	}
	if (spec.name.length > MAX_NAME_LENGTH) {
		questions.push({
			field: 'name',
			text: `Name "${spec.name}" is ${spec.name.length} characters — the published @orkestrel/<name> must fit npm's 214-character limit (max ${MAX_NAME_LENGTH})`,
			blocking: true,
		})
	}
	if (!VERSION_PATTERN.test(spec.version)) {
		questions.push({
			field: 'version',
			text: `Version "${spec.version}" must match ${VERSION_PATTERN.source}`,
			blocking: true,
		})
	}
	if (!ENGINES_PATTERN.test(spec.engines)) {
		questions.push({
			field: 'engines',
			text: `Engines "${spec.engines}" must match ${ENGINES_PATTERN.source}`,
			blocking: true,
		})
	}
	const seenOverridePaths = new Set<string>()
	for (const item of spec.overrides) {
		if (seenOverridePaths.has(item.path)) {
			questions.push({
				field: 'overrides',
				text: `Override path "${item.path}" is declared more than once`,
				blocking: true,
			})
		}
		seenOverridePaths.add(item.path)
		if (item.content.length === 0) {
			questions.push({
				field: 'overrides',
				text: `Override path "${item.path}" has empty content`,
				blocking: true,
			})
		}
	}
	if (spec.surfaces.length === 0) {
		questions.push({ field: 'surfaces', text: 'At least one surface is required', blocking: true })
	} else {
		for (const surface of spec.surfaces) {
			if (!SURFACES.includes(surface)) {
				questions.push({
					field: 'surfaces',
					text: `Surface "${surface}" is not recognized`,
					blocking: true,
					candidates: [...SURFACES],
				})
			}
		}
		if (new Set(spec.surfaces).size !== spec.surfaces.length) {
			questions.push({
				field: 'surfaces',
				text: 'Surfaces must not repeat — a repeat produces duplicate members',
				blocking: true,
			})
		}
		if (spec.surfaces.length > 1 && !spec.surfaces.includes('core')) {
			questions.push({
				field: 'surfaces',
				text: 'The browser+server combination without core has no defined configuration class — declare core alongside them, or declare a single surface',
				blocking: true,
			})
		}
	}
	const dependenciesResult = validateDependencyArray('dependencies', spec.dependencies)
	const peersResult = validateDependencyArray('peers', spec.peers)
	const extrasResult = validateDependencyArray('extras', spec.extras)
	questions.push(
		...dependenciesResult.questions,
		...peersResult.questions,
		...extrasResult.questions,
	)
	const seenDependencies = dependenciesResult.seen
	const seenPeers = peersResult.seen
	const seenExtras = extrasResult.seen
	for (const name of seenPeers) {
		if (seenDependencies.has(name)) {
			questions.push({
				field: 'peers',
				text: `Dependency "${name}" is declared in both "dependencies" and "peers"`,
				blocking: true,
			})
		}
	}
	for (const name of seenExtras) {
		if (seenDependencies.has(name)) {
			questions.push({
				field: 'extras',
				text: `Dependency "${name}" is declared in both "dependencies" and "extras"`,
				blocking: true,
			})
		}
		if (seenPeers.has(name)) {
			questions.push({
				field: 'extras',
				text: `Dependency "${name}" is declared in both "peers" and "extras"`,
				blocking: true,
			})
		}
	}
	return { valid: questions.length === 0, questions, warnings: [] }
}

/**
 * Narrow an unknown value to a plain (non-array, non-null) JSON object.
 *
 * @param value - The value to narrow.
 * @returns `true` iff `value` is a non-null, non-array object.
 *
 * @example
 * ```ts
 * import { isRecord } from '@orkestrel/scaffold'
 *
 * isRecord({ a: 1 }) // true
 * isRecord([1, 2]) // false
 * isRecord(null) // false
 * ```
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Parse a `package.json` text into its declared `@orkestrel/*` dependencies.
 *
 * @param manifestText - The `package.json` file content.
 * @remarks
 * Reads `dependencies`, `devDependencies`, and `peerDependencies` (ALL three,
 * in that order), keeps only `DEPENDENCY_NAME_PATTERN`-shaped names,
 * deduplicated (first occurrence wins). Malformed JSON, a non-object root, or
 * a non-object/non-string section entry is skipped, never thrown.
 * @returns The declared `Dependency[]` — pure, never throws.
 *
 * @example
 * ```ts
 * import { manifestToDependencies } from '@orkestrel/scaffold'
 *
 * manifestToDependencies('{"dependencies":{"@orkestrel/contract":"^0.0.5"}}')
 * // [{ name: '@orkestrel/contract', range: '^0.0.5' }]
 * ```
 */
export function manifestToDependencies(manifestText: string): readonly Dependency[] {
	let parsed: unknown
	try {
		parsed = JSON.parse(manifestText)
	} catch {
		return []
	}
	if (!isRecord(parsed)) return []
	const seen = new Set<string>()
	const dependencies: Dependency[] = []
	for (const section of ['dependencies', 'devDependencies', 'peerDependencies'] as const) {
		const entries = parsed[section]
		if (!isRecord(entries)) continue
		for (const [name, range] of Object.entries(entries)) {
			if (typeof range !== 'string') continue
			if (!DEPENDENCY_NAME_PATTERN.test(name)) continue
			if (seen.has(name)) continue
			seen.add(name)
			dependencies.push({ name, range })
		}
	}
	return dependencies
}

/**
 * Compare a declared range to the registry latest.
 *
 * @param range - The declared semver range.
 * @param latest - The registry's latest published version.
 * @remarks
 * The `0.0.x` exact-pin law: `'current'` iff `range`'s `^0.0.N` exact pin
 * equals `latest`, else `'behind'`. The `'missing'` / `'failed'` verdicts
 * come from the fetch layer, never this pure comparison.
 * @returns `'current'` or `'behind'`.
 *
 * @example
 * ```ts
 * import { rangeToFreshness } from '@orkestrel/scaffold'
 *
 * rangeToFreshness('^0.0.5', '0.0.5') // 'current' — pinned to latest
 * rangeToFreshness('^0.0.5', '0.0.7') // 'behind' — a newer patch is published
 * ```
 */
export function rangeToFreshness(range: string, latest: string): Freshness {
	const pinned = range.replace(/^\^/, '')
	return pinned === latest ? 'current' : 'behind'
}

/**
 * Compute a canonical FNV-1a digest of a text string.
 *
 * @param text - The text to digest.
 * @remarks
 * The 32-bit FNV-1a offset basis/prime, `Math.imul` for the wraparound
 * multiply, rendered as an 8-hex-digit zero-padded lowercase string —
 * deterministic, no clocks or randomness.
 * @returns The 8-hex-digit FNV-1a digest of `text`.
 *
 * @example
 * ```ts
 * import { computeHash } from '@orkestrel/scaffold'
 *
 * computeHash('hello-world') // '428d118e'
 * ```
 */
export function computeHash(text: string): string {
	let hash = 0x811c9dc5
	for (let index = 0; index < text.length; index += 1) {
		hash ^= text.charCodeAt(index)
		hash = Math.imul(hash, 0x01000193)
	}
	return (hash >>> 0).toString(16).padStart(8, '0')
}

/**
 * Serialize a value to a canonical, key-order-INDEPENDENT JSON-like string.
 *
 * @param value - The value to stringify.
 * @remarks
 * Object keys sort code-unit; array order is preserved. So two
 * logically-equal blueprints built with their fields in a different
 * construction order still hash identically once fed through `computeHash`.
 * @returns The canonical string form of `value`.
 *
 * @example
 * ```ts
 * import { stableStringify } from '@orkestrel/scaffold'
 *
 * stableStringify({ b: 1, a: 2 }) // '{"a":2,"b":1}'
 * ```
 */
export function stableStringify(value: unknown): string {
	if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(',')}]`
	if (typeof value === 'object' && value !== null) {
		const entries = Object.entries(value).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
		return `{${entries.map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`).join(',')}}`
	}
	return JSON.stringify(value)
}

/**
 * Measure a rendered fragment's column width, counting each literal tab as
 * `JSON_TAB_WIDTH` columns (matching `.oxfmtrc.json`'s `tabWidth`) and every
 * other character as one.
 *
 * @param text - The rendered fragment to measure.
 * @returns The fragment's column width against `JSON_PRINT_WIDTH`.
 *
 * @example
 * ```ts
 * import { computeColumnWidth } from '@orkestrel/scaffold'
 *
 * computeColumnWidth('\t"a"') // 3 — one tab counted as JSON_TAB_WIDTH, plus two characters
 * ```
 */
export function computeColumnWidth(text: string): number {
	let width = 0
	for (const char of text) width += char === '\t' ? JSON_TAB_WIDTH : 1
	return width
}

/**
 * Render a JSON array through `formatJson`'s inline-or-broken rule — inline
 * when the rendered width (via `computeColumnWidth`) fits `JSON_PRINT_WIDTH`, one
 * item per line otherwise.
 *
 * @param entries - The array's elements, in order.
 * @param indent - The current indentation prefix.
 * @param prefix - The text already emitted on this line before the array.
 * @param suffix - The text that will follow the array on this line.
 * @returns The rendered array fragment (no trailing newline).
 *
 * @example
 * ```ts
 * import { renderArray } from '@orkestrel/scaffold'
 *
 * renderArray(['ESNext', 'DOM'], '', '', '') // '["ESNext", "DOM"]'
 * ```
 */
export function renderArray(
	entries: readonly unknown[],
	indent: string,
	prefix: string,
	suffix: string,
): string {
	if (entries.length === 0) return '[]'
	const items = entries.map((entry) => renderValue(entry, indent, '', ''))
	const inline = `[${items.join(', ')}]`
	if (computeColumnWidth(`${prefix}${inline}${suffix}`) <= JSON_PRINT_WIDTH) return inline
	const childIndent = `${indent}\t`
	const body = items.map((item) => `${childIndent}${item}`).join(',\n')
	return `[\n${body}\n${indent}]`
}

/**
 * Render a JSON object through `formatJson`'s one-key-per-line rule.
 *
 * @param entry - The object to render.
 * @param indent - The current indentation prefix.
 * @returns The rendered object fragment (no trailing newline).
 *
 * @example
 * ```ts
 * import { renderObject } from '@orkestrel/scaffold'
 *
 * renderObject({ lib: ['ESNext'] }, '') // '{\n\t"lib": ["ESNext"]\n}'
 * ```
 */
export function renderObject(entry: Readonly<Record<string, unknown>>, indent: string): string {
	const keys = Object.keys(entry)
	if (keys.length === 0) return '{}'
	const childIndent = `${indent}\t`
	const lines = keys.map((key, index) => {
		const prefix = `${childIndent}${JSON.stringify(key)}: `
		const suffix = index === keys.length - 1 ? '' : ','
		return `${prefix}${renderValue(entry[key], childIndent, prefix, suffix)}${suffix}`
	})
	return `{\n${lines.join('\n')}\n${indent}}`
}

/**
 * Render one JSON value through `formatJson`'s dispatch — arrays via
 * `renderArray`, objects via `renderObject`, everything else via
 * `JSON.stringify`.
 *
 * @param entry - The value to render.
 * @param indent - The current indentation prefix.
 * @param prefix - The text already emitted on this line before `entry`.
 * @param suffix - The text that will follow `entry` on this line.
 * @returns The rendered fragment (no trailing newline).
 *
 * @example
 * ```ts
 * import { renderValue } from '@orkestrel/scaffold'
 *
 * renderValue('ESNext', '', '', '') // '"ESNext"'
 * ```
 */
export function renderValue(
	entry: unknown,
	indent: string,
	prefix: string,
	suffix: string,
): string {
	if (Array.isArray(entry)) return renderArray(entry, indent, prefix, suffix)
	if (isRecord(entry)) return renderObject(entry, indent)
	return JSON.stringify(entry)
}

/**
 * Serialize a value to newline-terminated JSON that matches the fleet's own
 * `oxfmt` output byte-for-byte — objects one key per line, arrays collapsed
 * onto one line when they fit `JSON_PRINT_WIDTH`, one item per line
 * otherwise.
 *
 * @param value - The value to serialize (config JSON — objects/arrays/primitives).
 * @remarks
 * `JSON.stringify(value, undefined, '\t')` always breaks arrays one item per
 * line; `oxfmt` collapses short ones. Emitting through `formatJson` keeps
 * computed config JSON format-stable by construction — `oxfmt --check` never
 * has anything left to rewrite. The rendering itself is delegated to
 * `renderValue` / `renderArray` / `renderObject` / `computeColumnWidth`, so
 * `formatJson` is a thin orchestrator around them.
 * @returns The rendered value, newline-terminated.
 *
 * @example
 * ```ts
 * import { formatJson } from '@orkestrel/scaffold'
 *
 * formatJson({ lib: ['ESNext', 'DOM'] }) // '{\n\t"lib": ["ESNext", "DOM"]\n}\n'
 * ```
 */
export function formatJson(value: unknown): string {
	return `${renderValue(value, '', '', '')}\n`
}

/**
 * Return a fresh `Plan` with `trace` and `hash` filled.
 *
 * @param plan - The plan to pin.
 * @remarks
 * `hash` is a canonical `computeHash` digest of the plan's
 * blueprint/groups/artifacts, serialized through `stableStringify` —
 * deterministic, no clocks or randomness. `trace` is a one-line derivation
 * summary built from the plan's own `PlanSummary`.
 * @returns The plan with `trace` and `hash` filled.
 *
 * @example
 * ```ts
 * import { pinPlan } from '@orkestrel/scaffold'
 *
 * pinPlan(plan).trace // 'router · core+browser · groups:7 · artifacts:21'
 * ```
 */
export function pinPlan(plan: Plan): Plan {
	const canonical = stableStringify({
		blueprint: plan.blueprint,
		groups: plan.groups,
		artifacts: plan.artifacts,
	})
	const summary = planToSummary(plan)
	const trace = `${plan.blueprint.name} · ${summary.surfaces.join('+')} · groups:${summary.groups.length} · artifacts:${summary.artifacts}`
	return { ...plan, trace, hash: computeHash(canonical) }
}
