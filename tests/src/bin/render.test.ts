import { describe, expect, it } from 'vitest'
import {
	ACTION_LABEL,
	applyConfirmMessage,
	auditJson,
	auditLiveNote,
	auditTable,
	auditVerdict,
	bucketText,
	CANCELLED_MESSAGE,
	catalogJson,
	catalogShrinkWarning,
	catalogTable,
	catalogVerdict,
	chooseStyler,
	comparisonLine,
	didYouMean,
	DRIFT_LABEL,
	editDistance,
	errorEnvelope,
	EXIT_CODES,
	fleetCiSkipped,
	fleetJson,
	fleetRepoLine,
	fleetTotals,
	foreignHint,
	FRESHNESS_LABEL,
	fullHelp,
	generatedNote,
	invalidName,
	KNOWN_VERBS,
	missingInput,
	nearest,
	newJson,
	newPlanPreview,
	ORIGIN_LABEL,
	PRUNE_EMPTY,
	prunePreview,
	pruneConfirmMessage,
	pruneSkipped,
	pullJson,
	pullRows,
	repairHandoff,
	repairJson,
	repairSuccess,
	repairVerdict,
	RETIRED_VERBS,
	scanSkipped,
	scopeNote,
	shortUsage,
	surfaceChoices,
	VERB_FLAGS,
	verbHelp,
} from '../../../src/bin/render.js'
import type { Audit, CatalogEntry, Finding, Plan, SyncReport } from '../../../src/core/index.js'

const PLAN: Plan = {
	blueprint: {
		name: 'widget',
		keywords: [],
		surfaces: ['core'],
		dependencies: [],
		peers: [],
		extras: [],
		version: '0.0.1',
		engines: '>=22',
		overrides: [],
	},
	groups: ['manifest'],
	artifacts: [
		{ path: 'AGENTS.md', group: 'manifest', origin: 'host' },
		{ path: 'src/core/index.ts', group: 'source', origin: 'template' },
		{ path: 'src/core/computed.ts', group: 'source', origin: 'computed' },
	],
}

const FINDINGS: readonly Finding[] = [
	{ path: 'AGENTS.md', group: 'manifest', drift: 'stale' },
	{ path: 'src/core/index.ts', group: 'source', drift: 'missing' },
	{ path: 'src/core/computed.ts', group: 'source', drift: 'stale' },
	{ path: 'unexpected.txt', group: 'manifest', drift: 'foreign' },
	{ path: 'clean.ts', group: 'source', drift: 'aligned' },
]

function makeAudit(findings: readonly Finding[]): Audit {
	const drifted = findings.filter((finding) => finding.drift === 'stale').length
	const missing = findings.filter((finding) => finding.drift === 'missing').length
	const foreign = findings.filter((finding) => finding.drift === 'foreign').length
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

describe('render: jargon translation', () => {
	it('translates every Origin', () => {
		expect(ORIGIN_LABEL.host).toBe('template-owned')
		expect(ORIGIN_LABEL.template).toBe('template-owned')
		expect(ORIGIN_LABEL.computed).toBe('generated')
	})

	it('translates every Drift', () => {
		expect(DRIFT_LABEL.aligned).toBe('unchanged')
		expect(DRIFT_LABEL.stale).toBe('drifted')
		expect(DRIFT_LABEL.missing).toBe('missing')
		expect(DRIFT_LABEL.foreign).toBe('unexpected file')
	})

	it('translates every Freshness cause label', () => {
		expect(FRESHNESS_LABEL.current).toBe('unchanged')
		expect(FRESHNESS_LABEL.behind).toBe('behind')
		expect(FRESHNESS_LABEL.missing).toBe('missing upstream')
		expect(FRESHNESS_LABEL.failed).toBe('fetch failed')
	})

	it('translates materializer action words', () => {
		expect(ACTION_LABEL.copied).toBe('wrote')
		expect(ACTION_LABEL.written).toBe('wrote')
		expect(ACTION_LABEL.skipped).toBe('unchanged')
	})
})

describe('render: bucketText / verdicts', () => {
	it('reports clean when every count is zero', () => {
		expect(bucketText({ drifted: 0, missing: 0, foreign: 0 })).toBe('clean')
	})

	it('joins nonzero buckets with translated labels', () => {
		expect(bucketText({ drifted: 2, missing: 1, foreign: 0 })).toBe('2 drifteds, 1 missing')
	})

	it('renders a clean audit verdict', () => {
		const audit = makeAudit([])
		expect(auditVerdict(audit, PLAN)).toBe('audit: 0 artifacts — clean')
	})

	it('renders a drifted audit verdict with the origin split', () => {
		const audit = makeAudit(FINDINGS)
		const line = auditVerdict(audit, PLAN)
		expect(line.startsWith('audit: 5 artifacts —')).toBe(true)
		expect(line).toContain('template-owned:')
		expect(line).toContain('generated:')
	})

	it('renders repair verdicts for clean and drifted audits', () => {
		expect(repairVerdict(makeAudit([]))).toContain('aligned — nothing to write')
		expect(repairVerdict(makeAudit(FINDINGS))).toContain('pass --apply to write')
	})

	it('renders the repair scope note only when there is out-of-scope drift', () => {
		expect(scopeNote(0)).toBeUndefined()
		expect(scopeNote(3)).toContain("outside repair's scope")
	})
})

describe('render: tables', () => {
	it('builds the audit findings table with translated columns and excludes aligned rows', () => {
		const table = auditTable(makeAudit(FINDINGS), PLAN)
		expect(table.columns.map((column) => column.label)).toEqual(['Status', 'Kind', 'Path'])
		expect(table.rows).toHaveLength(4)
		expect(table.rows).toContainEqual(['drifted', 'template-owned', 'AGENTS.md'])
		expect(table.rows).toContainEqual(['unexpected file', 'unexpected file', 'unexpected.txt'])
	})

	it('builds the pull freshness rows, translated', () => {
		const report: SyncReport = {
			target: '.',
			guides: [
				{
					name: 'core',
					path: 'guides/src/core.md',
					content: '',
					freshness: 'behind',
					note: 'HTTP 404',
				},
			],
			versions: [{ name: 'emitter', range: '^1.0.0', latest: '1.2.0', freshness: 'current' }],
			clean: false,
			failed: 0,
		}
		const rows = pullRows(report)
		expect(rows).toEqual([
			['core', 'guide', 'behind'],
			['emitter', 'version', 'unchanged'],
		])
	})

	it('builds the catalog table', () => {
		const entries: readonly CatalogEntry[] = [
			{ name: '@orkestrel/core', version: '1.0.0', description: 'x' },
		]
		const table = catalogTable(entries)
		expect(table.columns.map((column) => column.label)).toEqual([
			'Package',
			'Version',
			'Description',
		])
		expect(table.rows).toEqual([['@orkestrel/core', '1.0.0', 'x']])
	})

	it('warns on shrink, silent otherwise', () => {
		expect(catalogShrinkWarning(10, 8)).toContain('shrinks from 10 rows to 8')
		expect(catalogShrinkWarning(8, 10)).toBeUndefined()
		expect(catalogShrinkWarning(8, 8)).toBeUndefined()
	})
})

describe('render: fleet', () => {
	it('renders each per-repo outcome kind', () => {
		expect(fleetRepoLine('widget', { kind: 'clean' })).toBe('widget: clean')
		expect(fleetRepoLine('widget', { kind: 'drifted', drifted: 1, missing: 0, foreign: 0 })).toBe(
			'widget: 1 drifted',
		)
		expect(fleetRepoLine('widget', { kind: 'repaired', remaining: 2 })).toBe(
			'widget: repaired (2 findings remaining)',
		)
		expect(fleetRepoLine('widget', { kind: 'failed', message: '[TARGET] no host' })).toBe(
			'widget: [TARGET] no host',
		)
	})

	it('renders blast-radius totals', () => {
		expect(fleetTotals(2, 1)).toBe('total: 2 drifted repos, 1 failed')
	})
})

describe('render: new preview / apply', () => {
	it('renders the destination preview line', () => {
		expect(newPlanPreview('widget')).toBe('will write into ./widget')
	})
})

describe('render: prompt messages', () => {
	it('builds the apply-confirm message, singular and fleet-wide', () => {
		expect(applyConfirmMessage(3)).toBe('Apply — write 3 files? ')
		expect(applyConfirmMessage(3, 2)).toBe('Apply — write 3 files across 2 repos? ')
	})

	it('builds the prune double-confirm message', () => {
		expect(pruneConfirmMessage(4)).toBe(
			'Also delete 4 unexpected files under .claude/agents and scripts? ',
		)
	})

	it('exposes the cancelled string', () => {
		expect(CANCELLED_MESSAGE).toBe('cancelled — nothing written')
	})

	it('repairHandoff: owned drift only names the template-owned count, no deletion clause', () => {
		expect(repairHandoff(3, 0, false)).toBe('3 template-owned files have drift — run repair now? ')
		expect(repairHandoff(1, 0, false)).toBe('1 template-owned file has drift — run repair now? ')
	})

	it('repairHandoff: owned drift + prune names BOTH clauses, joined by "and"', () => {
		expect(repairHandoff(2, 1, true)).toBe(
			'2 template-owned files have drift and 1 unexpected file will be deleted — run repair now? ',
		)
	})

	it('repairHandoff: foreign-only (owned:0) + prune names ONLY the deletion clause — the F2 dead-end fix', () => {
		expect(repairHandoff(0, 2, true)).toBe('2 unexpected files will be deleted — run repair now? ')
	})

	it('repairHandoff: foreign present but prune false never mentions deletion (nothing would be deleted)', () => {
		expect(repairHandoff(1, 2, false)).toBe('1 template-owned file has drift — run repair now? ')
	})

	it('foreignHint points at repair --prune', () => {
		expect(foreignHint()).toBe(
			"unexpected files found — run 'scaffold repair --prune' to delete them",
		)
	})

	it('scanSkipped explains the degraded audit', () => {
		expect(scanSkipped()).toBe(
			"unexpected-file scanning skipped — couldn't establish the template source",
		)
	})

	it('invalidName names the offending value and the expected pattern', () => {
		expect(invalidName('Bad_Name', '^[a-z][a-z0-9-]*$')).toBe(
			'Package name "Bad_Name" must match ^[a-z][a-z0-9-]*$',
		)
	})

	it('describes each surface checkbox choice', () => {
		const choices = surfaceChoices()
		expect(choices.map((choice) => choice.value)).toEqual(['core', 'browser', 'server'])
		expect(choices.find((choice) => choice.value === 'core')?.description).toBe('the pure engine')
		expect(choices.find((choice) => choice.value === 'browser')?.description).toBe(
			'DOM-facing surface',
		)
		expect(choices.find((choice) => choice.value === 'server')?.description).toBe(
			'node-facing surface',
		)
	})
})

describe('render: did-you-mean', () => {
	it('computes edit distance', () => {
		expect(editDistance('fleet', 'fleet')).toBe(0)
		expect(editDistance('flete', 'fleet')).toBe(2)
		expect(editDistance('', 'abc')).toBe(3)
	})

	it('finds the nearest candidate', () => {
		expect(nearest('flete', [...KNOWN_VERBS])).toBe('fleet')
	})

	it('renders the did-you-mean message', () => {
		expect(didYouMean('flete')).toBe('unknown command "flete" — did you mean "fleet"?')
	})

	it('lists every KNOWN_VERBS entry with the new names', () => {
		expect([...KNOWN_VERBS]).toEqual(['new', 'pull', 'audit', 'repair', 'fleet', 'catalog'])
	})

	it('redirects retired verb names before fuzzy matching', () => {
		expect(RETIRED_VERBS.sync).toBe('pull')
		expect(RETIRED_VERBS.mirror).toBe('fleet')
		expect(didYouMean('sync')).toBe("'sync' has been renamed — use 'scaffold pull'")
		expect(didYouMean('mirror')).toBe("'mirror' has been renamed — use 'scaffold fleet'")
	})

	it('still fuzzy-matches inputs that are not retired verbs', () => {
		expect(didYouMean('flete')).toContain('did you mean "fleet"?')
	})
})

describe('render: help tiers', () => {
	it('shortUsage stays within 10 lines and names every verb', () => {
		const lines = shortUsage().split('\n')
		expect(lines.length).toBeLessThanOrEqual(10)
		for (const verb of KNOWN_VERBS) expect(shortUsage()).toContain(verb)
		expect(shortUsage()).toContain('scaffold <verb> --help')
	})

	it('fullHelp includes the exit-code table and the new verb names, never the old ones', () => {
		const text = fullHelp()
		for (const [code] of EXIT_CODES) expect(text).toContain(code)
		expect(text).toContain('fleet')
		expect(text).toContain('pull')
		expect(text).not.toMatch(/\bmirror\b/)
		expect(text).not.toMatch(/\bsync\b/)
	})

	it('verbHelp renders one verb section', () => {
		const text = verbHelp('fleet')
		expect(text).toContain('fleet')
		expect(text).not.toContain('catalog ')
	})

	it('verbHelp includes a dry-run/confirm note and a concrete example, for every verb', () => {
		for (const verb of KNOWN_VERBS) {
			const text = verbHelp(verb)
			expect(text).toMatch(/dry run|read-only/)
			expect(text).toContain('example: scaffold')
		}
	})

	it('verbHelp emits one line per flag, matching VERB_FLAGS', () => {
		for (const verb of KNOWN_VERBS) {
			const text = verbHelp(verb)
			const flags = VERB_FLAGS[verb].split(' ').filter((token) => token.startsWith('--'))
			for (const flag of flags) expect(text).toContain(flag)
		}
	})

	it('verbHelp marks --prune as destructive wherever it appears', () => {
		expect(verbHelp('repair')).toContain('also DELETE unexpected files under .claude/agents')
		expect(verbHelp('fleet')).toContain('also DELETE unexpected files under .claude/agents')
	})
})

describe('render: VERB_FLAGS corrections', () => {
	it('never advertises --root anywhere', () => {
		for (const verb of KNOWN_VERBS) expect(VERB_FLAGS[verb]).not.toContain('--root')
	})

	it('only advertises --live under audit', () => {
		expect(VERB_FLAGS.audit).toContain('--live')
		expect(VERB_FLAGS.new).not.toContain('--live')
		expect(VERB_FLAGS.pull).not.toContain('--live')
		expect(VERB_FLAGS.repair).not.toContain('--live')
		expect(VERB_FLAGS.fleet).not.toContain('--live')
		expect(VERB_FLAGS.catalog).not.toContain('--live')
	})

	it('catalog advertises --from instead of --root', () => {
		expect(VERB_FLAGS.catalog).toContain('--from <path>')
	})
})

describe('render: chooseStyler', () => {
	it('takes explicit sinkIsTTY and noColor inputs, no process access', () => {
		expect(chooseStyler(true, false).enabled).toBe(true)
		expect(chooseStyler(false, false).enabled).toBe(false)
		expect(chooseStyler(true, true).enabled).toBe(false)
	})
})

describe('render: repairSuccess uses ACTION_LABEL', () => {
	it('wires the materializer tally through ACTION_LABEL words', () => {
		const result = { target: '.', written: ['a'], copied: ['b'], skipped: ['c'], removed: [] }
		const line = repairSuccess(result, ['d'])
		expect(line).toBe(
			`${ACTION_LABEL.written} 2, ${ACTION_LABEL.skipped} 1, ${ACTION_LABEL.removed} 1`,
		)
	})
})

describe('render: new prune/missing/generated/audit-live/comparison/ci/catalog exports', () => {
	it('prunePreview lists one line per exact path', () => {
		expect(prunePreview(['a.ts', 'b.ts'])).toEqual(['  delete a.ts', '  delete b.ts'])
		expect(prunePreview([])).toEqual([])
	})

	it('PRUNE_EMPTY reads as a "nothing found" line', () => {
		expect(PRUNE_EMPTY).toContain('no unexpected files to delete')
	})

	it('pruneSkipped explains the non-interactive alternative WITHOUT re-asking for --prune (F5 — it was already passed)', () => {
		const line = pruneSkipped()
		expect(line).toBe(
			'prune skipped — not a terminal; add --apply (or --yes) to delete non-interactively',
		)
		expect(line).not.toContain('pass --prune')
	})

	it('missingInput names what was missing and how to proceed', () => {
		const line = missingInput('a package name', 'new')
		expect(line).toContain('a package name')
		expect(line).toContain('scaffold new')
	})

	it('generatedNote explains repair does not touch generated files', () => {
		const line = generatedNote(3)
		expect(line).toContain('3 findings')
		expect(line.toLowerCase()).toContain('generated')
		expect(line.toLowerCase()).toContain('repair')
	})

	it('auditLiveNote reports current/behind/failed counts', () => {
		const line = auditLiveNote(2, 1, 0)
		expect(line).toContain('2')
		expect(line).toContain('1')
	})

	it('comparisonLine translates host vocabulary without the words "host" or "presence-only"', () => {
		const aware = comparisonLine(true)
		const notAware = comparisonLine(false)
		expect(aware.toLowerCase()).not.toContain('host')
		expect(aware.toLowerCase()).not.toContain('presence-only')
		expect(notAware.toLowerCase()).not.toContain('host')
		expect(notAware.toLowerCase()).not.toContain('presence-only')
		expect(aware).toContain('file contents')
		expect(notAware).toContain('file names only')
	})

	it('fleetCiSkipped explains ci.yml is left to per-package repair', () => {
		const line = fleetCiSkipped()
		expect(line).toContain('ci.yml')
		expect(line).toContain('scaffold repair --apply')
	})

	it('catalogVerdict renders clean and drifted lines', () => {
		expect(catalogVerdict(true)).toBe('catalog: clean')
		expect(catalogVerdict(false)).toBe('catalog: drifted — pass --apply to write')
	})
})

describe('render: --json serializers', () => {
	it('errorEnvelope wraps code + message', () => {
		expect(errorEnvelope('INVALID', 'bad')).toEqual({ error: { code: 'INVALID', message: 'bad' } })
	})

	it('newJson is deterministic and JSON-parseable', () => {
		const value = newJson(
			{ name: 'widget', surfaces: ['core'], host: 1, template: 2, computed: 3 },
			true,
		)
		const parsed: unknown = JSON.parse(JSON.stringify(value))
		expect(parsed).toEqual({
			name: 'widget',
			surfaces: ['core'],
			host: 1,
			template: 2,
			computed: 3,
			applied: true,
		})
	})

	it('pullJson / auditJson pass the value through untouched', () => {
		const report: SyncReport = { target: '.', guides: [], versions: [], clean: true, failed: 0 }
		expect(pullJson(report)).toBe(report)
		const audit = makeAudit([])
		expect(auditJson(audit)).toBe(audit)
	})

	it('repairJson omits result when not applied, includes it when applied', () => {
		const audit = makeAudit([])
		expect(repairJson(audit)).toEqual(audit)
		const result = { target: '.', written: ['a'], copied: [], skipped: [], removed: [] }
		expect(repairJson(audit, result)).toEqual({ ...audit, result })
	})

	it('fleetJson returns a top-level array', () => {
		const entries = [{ name: 'widget', drifted: 0, missing: 0, foreign: 0, failed: false }]
		expect(Array.isArray(fleetJson(entries))).toBe(true)
		expect(fleetJson(entries)).toBe(entries)
	})

	it('catalogJson includes shrink only when given', () => {
		const entries: readonly CatalogEntry[] = []
		expect(catalogJson(entries, false)).toEqual({ entries, drift: false })
		expect(catalogJson(entries, true, 2)).toEqual({ entries, drift: true, shrink: 2 })
	})
})
