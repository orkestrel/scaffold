import type { TableAlign, TableNode } from '@orkestrel/markdown'
import type {
	Audit,
	Blueprint,
	Category,
	Dependency,
	Drift,
	Finding,
	Group,
	Member,
	Override,
	Plan,
	PlanSummary,
	Question,
	Surface,
	Validation,
} from './types.js'
import { parseInline, renderMarkdown } from '@orkestrel/markdown'
import { DEFAULT_ENGINES, DEFAULT_VERSION, NAME_PATTERN, SURFACES } from './constants.js'

/**
 * Build a fresh `Dependency`.
 *
 * @param name - The `@orkestrel/*` package name.
 * @param range - The semver range.
 * @returns A `Dependency` with both fields set.
 *
 * @example
 * ```ts
 * import { dependency } from '@orkestrel/scaffold'
 *
 * dependency('@orkestrel/contract', '^0.0.5') // { name: '@orkestrel/contract', range: '^0.0.5' }
 * ```
 */
export function dependency(name: string, range: string): Dependency {
	return { name, range }
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
 * defaults `['core']`, and `keywords` / `dependencies` / `overrides` default `[]`.
 * `description` is OMITTED entirely when absent, so the result round-trips the
 * exact-record `Blueprint` guard.
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
		version: options?.version ?? DEFAULT_VERSION,
		engines: options?.engines ?? DEFAULT_ENGINES,
		overrides: options?.overrides ?? [],
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
	function splitRow(line: string): readonly string[] {
		const parts = line.split(/(?<!\\)\|/)
		return parts.slice(1, -1).map((part) => part.trim())
	}
	const headerCells = splitRow(lines[0] ?? '')
	const bodyCells = lines.slice(2).map((line) => splitRow(line))
	const widths: number[] = []
	for (let column = 0; column < columns; column += 1) {
		let width = Array.from(headerCells[column] ?? '').length
		for (const row of bodyCells) {
			const length = Array.from(row[column] ?? '').length
			if (length > width) width = length
		}
		widths.push(Math.max(3, width))
	}
	function pad(text: string, width: number): string {
		const length = Array.from(text).length
		return length >= width ? text : text + ' '.repeat(width - length)
	}
	function delimiterCell(columnAlign: TableAlign, width: number): string {
		if (columnAlign === 'left') return `:${'-'.repeat(width - 1)}`
		if (columnAlign === 'right') return `${'-'.repeat(width - 1)}:`
		if (columnAlign === 'center') return `:${'-'.repeat(width - 2)}:`
		return '-'.repeat(width)
	}
	const headerLine = `| ${headerCells.map((cell, index) => pad(cell, widths[index] ?? 3)).join(' | ')} |`
	const delimiterLine = `| ${alignment.map((columnAlign, index) => delimiterCell(columnAlign, widths[index] ?? 3)).join(' | ')} |`
	const bodyLines = bodyCells.map(
		(row) => `| ${row.map((cell, index) => pad(cell, widths[index] ?? 3)).join(' | ')} |`,
	)
	return [headerLine, delimiterLine, ...bodyLines].join('\n')
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
 * Diff a plan's artifacts against a target's current content.
 *
 * @param plan - The plan whose artifacts are the source of truth.
 * @param current - The target's current content, keyed by artifact-relative path.
 * @remarks
 * A `template` / `computed` artifact whose rendered content the target does not
 * match is `stale`; one the target lacks is `missing`; a target file the plan
 * does not own is `foreign`. A `host`-origin artifact carries no `content` (the
 * pure core never reads the canonical host bytes), so it is audited by
 * PRESENCE only — `missing` or `aligned`, never `stale`.
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
	function inferGroup(path: string): Group {
		if (path.startsWith('src/')) return 'source'
		if (path.startsWith('tests/')) return 'tests'
		if (path.startsWith('guides/')) return 'guides'
		if (path.startsWith('docs/')) return 'docs'
		if (path.startsWith('configs/')) return 'configs'
		if (path.startsWith('.github/') || path.startsWith('scripts/')) return 'orchestration'
		return 'manifest'
	}
	const findings: Finding[] = []
	const owned = new Set<string>()
	for (const artifact of plan.artifacts) {
		owned.add(artifact.path)
		const seen = current[artifact.path]
		if (artifact.origin === 'host') {
			findings.push({
				path: artifact.path,
				group: artifact.group,
				drift: seen === undefined ? 'missing' : 'aligned',
			})
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
 * The semantic pass over a blueprint.
 *
 * @param spec - The blueprint to validate.
 * @remarks
 * Checks the name against `NAME_PATTERN`, non-empty on-vocabulary `surfaces`
 * with no repeats (a repeat would produce duplicate members), and well-formed
 * `dependencies` (non-empty name/range, no duplicate dependency names).
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
	const questions: Question[] = []
	if (!NAME_PATTERN.test(spec.name)) {
		questions.push({
			field: 'name',
			text: `Name "${spec.name}" must match ${NAME_PATTERN.source}`,
			blocking: true,
		})
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
	}
	const seenDependencies = new Set<string>()
	for (const item of spec.dependencies) {
		if (item.name.length === 0) {
			questions.push({
				field: 'dependencies',
				text: 'A dependency name must not be empty',
				blocking: true,
			})
		}
		if (item.range.length === 0) {
			questions.push({
				field: 'dependencies',
				text: `Dependency "${item.name}" is missing a version range`,
				blocking: true,
			})
		}
		if (seenDependencies.has(item.name)) {
			questions.push({
				field: 'dependencies',
				text: `Dependency "${item.name}" is declared more than once`,
				blocking: true,
			})
		}
		seenDependencies.add(item.name)
	}
	return { valid: questions.length === 0, questions, warnings: [] }
}

/**
 * Return a fresh `Plan` with `trace` and `hash` filled.
 *
 * @param plan - The plan to pin.
 * @remarks
 * `hash` is a canonical FNV-1a digest of the plan's blueprint/groups/artifacts
 * — deterministic, no clocks or randomness. `trace` is a one-line derivation
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
	function digest(text: string): string {
		let hash = 0x811c9dc5
		for (let index = 0; index < text.length; index += 1) {
			hash ^= text.charCodeAt(index)
			hash = Math.imul(hash, 0x01000193)
		}
		return (hash >>> 0).toString(16).padStart(8, '0')
	}
	const canonical = JSON.stringify({
		blueprint: plan.blueprint,
		groups: plan.groups,
		artifacts: plan.artifacts,
	})
	const summary = planToSummary(plan)
	const trace = `${plan.blueprint.name} · ${summary.surfaces.join('+')} · groups:${summary.groups.length} · artifacts:${summary.artifacts}`
	return { ...plan, trace, hash: digest(canonical) }
}
