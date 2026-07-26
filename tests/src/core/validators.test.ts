import type { Plan } from '@src/core'
import { isString } from '@orkestrel/contract'
import {
	blueprint,
	blueprintToPlan,
	dependency,
	hasValidArtifactBytes,
	hasValidArtifactHex,
	hasValidPlanBytes,
	hasValidPlanHex,
	hasOnlyDataProperties,
	isArtifact,
	isBlueprint,
	isDenseDataArray,
	isDependency,
	isMember,
	isOverride,
	isPlan,
	isScaffoldError,
	isSyncReport,
	isWorkspaceName,
	MAX_ARTIFACT_BYTES,
	member,
	override,
	parseBoundedJSON,
	parseBlueprint,
	parsePlan,
	parseSyncReport,
	pinPlan,
	snapshotPlan,
	validatePlan,
} from '@src/core'
import { describe, expect, it } from 'vitest'
import { buildGenerativeDataProxy, buildPopulatedSyncReport, captureError } from '../../setup.js'

describe('isDenseDataArray', () => {
	it('uses one own length descriptor and never invokes a stateful length getter trap', () => {
		let reads = 0
		const value = new Proxy(['owned'], {
			get(target, key, receiver) {
				if (key === 'length') {
					reads += 1
					if (reads > 1) return Number.MAX_SAFE_INTEGER
				}
				return Reflect.get(target, key, receiver)
			},
		})

		expect(isDenseDataArray(value, 1, isString)).toBe(true)
		expect(reads).toBe(0)
	})
})

describe('hasOnlyDataProperties', () => {
	it('bounds fresh-identity generative graphs and fails coded snapshots closed', () => {
		expect(hasOnlyDataProperties(buildGenerativeDataProxy())).toBe(false)
		const error = captureError(() => snapshotPlan(buildGenerativeDataProxy()))
		expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
	})
})

// Every exact-record guard: valid / invalid / adversarial junk, off-vocabulary
// literal rejection, and the parse↔guard soundness of parseBlueprint / parsePlan.

describe('isDependency', () => {
	it('accepts a valid Dependency', () => {
		expect(isDependency(dependency('@orkestrel/contract', '^0.0.5'))).toBe(true)
	})

	it('rejects an empty name or range', () => {
		expect(isDependency({ name: '', range: '^0.0.5' })).toBe(false)
		expect(isDependency({ name: '@orkestrel/contract', range: '' })).toBe(false)
	})

	it('rejects adversarial junk', () => {
		expect(isDependency(null)).toBe(false)
		expect(isDependency(undefined)).toBe(false)
		expect(isDependency('dependency')).toBe(false)
		expect(isDependency(42)).toBe(false)
		expect(isDependency([])).toBe(false)
		expect(isDependency({})).toBe(false)
	})

	it('rejects an object carrying an extra key (exact-record)', () => {
		expect(isDependency({ name: 'x', range: '^1', extra: true })).toBe(false)
	})
})

describe('isOverride', () => {
	it('accepts a valid Override', () => {
		expect(isOverride(override('README.md', 'hi'))).toBe(true)
	})

	it('rejects an empty path or content', () => {
		expect(isOverride({ path: '', content: 'hi' })).toBe(false)
		expect(isOverride({ path: 'README.md', content: '' })).toBe(false)
	})

	it('rejects adversarial junk', () => {
		expect(isOverride(null)).toBe(false)
		expect(isOverride([1, 2])).toBe(false)
		expect(isOverride(() => {})).toBe(false)
	})
})

describe('isWorkspaceName', () => {
	it('accepts the exact lexical and length boundaries', () => {
		expect(isWorkspaceName('a')).toBe(true)
		expect(isWorkspaceName('a'.repeat(203))).toBe(true)
	})

	it('rejects malformed, oversized, and adversarial values', () => {
		expect(isWorkspaceName('A')).toBe(false)
		expect(isWorkspaceName('../escape')).toBe(false)
		expect(isWorkspaceName('a'.repeat(204))).toBe(false)
		expect(isWorkspaceName(null)).toBe(false)
		expect(isWorkspaceName({ toString: () => 'name' })).toBe(false)
	})
})

describe('isMember', () => {
	it('accepts a valid Member', () => {
		expect(isMember(member('Router', 'entity', 'The Router entity.'))).toBe(true)
	})

	it('rejects an off-vocabulary category', () => {
		expect(
			isMember({ name: 'Router', category: 'widget', summary: 'x', environment: 'core' }),
		).toBe(false)
	})

	it('rejects an off-vocabulary environment', () => {
		expect(
			isMember({ name: 'Router', category: 'entity', summary: 'x', environment: 'client' }),
		).toBe(false)
	})

	it('rejects adversarial junk', () => {
		expect(isMember(null)).toBe(false)
		expect(isMember('member')).toBe(false)
		expect(isMember({ name: 'Router' })).toBe(false)
	})
})

describe('isBlueprint', () => {
	it('accepts a valid Blueprint', () => {
		expect(isBlueprint(blueprint('router'))).toBe(true)
	})

	it('rejects an empty src array', () => {
		expect(isBlueprint({ ...blueprint('router'), src: [] })).toBe(false)
	})

	it('accepts app-only and rejects an empty workspace', () => {
		expect(isBlueprint({ ...blueprint('router'), src: [], app: ['server'] })).toBe(true)
		expect(isBlueprint({ ...blueprint('router'), src: [], app: [] })).toBe(false)
	})

	it('rejects an off-vocabulary environment literal', () => {
		expect(isBlueprint({ ...blueprint('router'), src: ['mobile'] })).toBe(false)
	})

	it('rejects a malformed nested dependency', () => {
		expect(
			isBlueprint({
				...blueprint('router'),
				dependencies: [{ name: '', range: '^1' }],
			}),
		).toBe(false)
	})

	it('does NOT enforce NAME_PATTERN — that lives in validateBlueprint, not this shape', () => {
		expect(isBlueprint({ ...blueprint('Router Uppercase!'), name: 'Router Uppercase!' })).toBe(true)
	})

	it('rejects adversarial junk', () => {
		expect(isBlueprint(null)).toBe(false)
		expect(isBlueprint(42)).toBe(false)
		expect(isBlueprint([])).toBe(false)
		expect(isBlueprint('{}')).toBe(false)
	})
})

describe('isArtifact', () => {
	it('accepts a template artifact (content, no source)', () => {
		expect(
			isArtifact({ path: 'src/core/types.ts', group: 'source', origin: 'template', content: 'x' }),
		).toBe(true)
	})

	it('accepts a host artifact (source, no content)', () => {
		expect(
			isArtifact({ path: 'AGENTS.md', group: 'docs', origin: 'host', source: 'AGENTS.md' }),
		).toBe(true)
	})

	it('accepts byte-aware host artifacts and rejects a non-string hex field', () => {
		expect(
			isArtifact({
				path: 'asset.bin',
				group: 'orchestration',
				origin: 'host',
				hex: '0080ff',
			}),
		).toBe(true)
		expect(
			isArtifact({
				path: 'asset.bin',
				group: 'orchestration',
				origin: 'host',
				hex: 'ABC',
			}),
		).toBe(false)
	})

	it('rejects payload fields that contradict the origin discriminant', () => {
		expect(isArtifact({ path: 'x', group: 'source', origin: 'computed' })).toBe(false)
		expect(
			isArtifact({
				path: 'x',
				group: 'source',
				origin: 'computed',
				content: 'x',
				source: 'x',
			}),
		).toBe(false)
		expect(isArtifact({ path: 'x', group: 'source', origin: 'host', content: 'x' })).toBe(false)
		expect(
			isArtifact({ path: 'x', group: 'source', origin: 'template', content: 'x', hex: '00' }),
		).toBe(false)
	})

	it('rejects an off-vocabulary group', () => {
		expect(isArtifact({ path: 'x', group: 'scripts', origin: 'host', source: 'x' })).toBe(false)
	})

	it('rejects an off-vocabulary origin', () => {
		expect(isArtifact({ path: 'x', group: 'docs', origin: 'generated', source: 'x' })).toBe(false)
	})

	it('rejects adversarial junk', () => {
		expect(isArtifact(null)).toBe(false)
		expect(isArtifact(true)).toBe(false)
	})
})

describe('hasValidArtifactHex', () => {
	it('accepts absence, empty bytes, and lowercase byte pairs', () => {
		expect(hasValidArtifactHex({ path: 'asset.bin', group: 'source', origin: 'host' })).toBe(true)
		expect(
			hasValidArtifactHex({ path: 'asset.bin', group: 'source', origin: 'host', hex: '' }),
		).toBe(true)
		expect(
			hasValidArtifactHex({ path: 'asset.bin', group: 'source', origin: 'host', hex: '00aaff' }),
		).toBe(true)
	})

	it('rejects odd, uppercase, and non-hex byte text', () => {
		for (const hex of ['0', 'ABC', 'gg']) {
			expect(hasValidArtifactHex({ path: 'asset.bin', group: 'source', origin: 'host', hex })).toBe(
				false,
			)
		}
	})
})

describe('retained byte limits', () => {
	it('accepts an exact multibyte artifact boundary and rejects one byte beyond it', () => {
		const exact = '😀'.repeat(MAX_ARTIFACT_BYTES / 4)
		expect(
			hasValidArtifactBytes({
				path: 'exact.txt',
				group: 'source',
				origin: 'computed',
				content: exact,
			}),
		).toBe(true)
		expect(
			hasValidArtifactBytes({
				path: 'overflow.txt',
				group: 'source',
				origin: 'computed',
				content: `${exact}a`,
			}),
		).toBe(false)
	})

	it('accepts exactly 100 MiB across artifacts and rejects the next 5 MiB artifact', () => {
		const content = 'a'.repeat(MAX_ARTIFACT_BYTES)
		const artifacts: Plan['artifacts'] = Array.from({ length: 20 }, (_, index) => ({
			path: `artifact-${index}.txt`,
			group: 'source',
			origin: 'computed',
			content,
		}))
		const plan: Plan = {
			blueprint: blueprint('aggregate-budget'),
			groups: ['source'],
			artifacts,
		}
		expect(hasValidPlanBytes(plan)).toBe(true)
		expect(
			hasValidPlanBytes({
				...plan,
				artifacts: [
					...artifacts,
					{
						path: 'overflow.txt',
						group: 'source',
						origin: 'computed',
						content,
					},
				],
			}),
		).toBe(false)
	})
})

describe('isPlan', () => {
	it('accepts a pinned Plan', () => {
		const plan = pinPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })

		expect(isPlan(plan)).toBe(true)
	})

	it('accepts an unpinned Plan (trace/hash optional)', () => {
		expect(isPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })).toBe(
			true,
		)
	})

	it('rejects a malformed nested artifact', () => {
		expect(
			isPlan({
				blueprint: blueprint('router'),
				groups: ['manifest'],
				artifacts: [{ path: 'x', group: 'nowhere', origin: 'host' }],
			}),
		).toBe(false)
	})

	it('rejects invalid byte hex in every nested host artifact', () => {
		for (const hex of ['0', 'ABC', 'gg']) {
			const plan: Plan = {
				blueprint: blueprint('router'),
				groups: ['source'],
				artifacts: [{ path: 'asset.bin', group: 'source', origin: 'host', hex }],
			}
			expect(hasValidPlanHex(plan)).toBe(false)
			expect(isPlan(plan)).toBe(false)
			expect(parsePlan(plan)).toBeUndefined()
			expect(parsePlan(JSON.stringify(plan))).toBeUndefined()
		}
	})

	it('rejects adversarial junk', () => {
		expect(isPlan(null)).toBe(false)
		expect(isPlan(0)).toBe(false)
		expect(isPlan([])).toBe(false)
	})
})

describe('validatePlan', () => {
	it('accepts a plan whose blueprint and overrides match the materialized artifact set', () => {
		const plan = blueprintToPlan(
			blueprint('router', {
				src: ['core'],
				overrides: [override('README.md', '# Router')],
			}),
		)

		expect(validatePlan(plan)).toEqual({ valid: true, questions: [], warnings: [] })
	})

	it.each([
		{
			label: 'missing',
			path: 'missing.ts',
			message: 'matches no planned artifact',
		},
		{
			label: 'host-owned',
			path: 'AGENTS.md',
			message: 'targets a host-origin artifact',
		},
		{
			label: 'publication-boundary',
			path: 'package.json',
			message: 'targets the blueprint-owned publication boundary',
		},
	])('rejects a $label override context', ({ path, message }) => {
		const plan = blueprintToPlan(
			blueprint('router', {
				src: ['core'],
				overrides: [override(path, 'replacement')],
			}),
		)
		const validation = validatePlan(plan)

		expect(validation.valid).toBe(false)
		expect(validation.questions.map((question) => question.text)).toContainEqual(
			expect.stringContaining(message),
		)
	})
})

describe('isSyncReport', () => {
	it('accepts a valid SyncReport', () => {
		expect(isSyncReport(buildPopulatedSyncReport())).toBe(true)
	})

	it('accepts empty guides/versions arrays', () => {
		expect(isSyncReport({ ...buildPopulatedSyncReport(), guides: [], versions: [] })).toBe(true)
	})

	it('rejects an off-vocabulary freshness in a nested guide', () => {
		const report = buildPopulatedSyncReport()
		expect(
			isSyncReport({
				...report,
				guides: [{ ...report.guides[0], freshness: 'stale' }],
			}),
		).toBe(false)
	})

	it('rejects an off-vocabulary freshness in a nested version', () => {
		const report = buildPopulatedSyncReport()
		expect(
			isSyncReport({
				...report,
				versions: [{ ...report.versions[0], freshness: 'stale' }],
			}),
		).toBe(false)
	})

	it('rejects adversarial junk', () => {
		expect(isSyncReport(null)).toBe(false)
		expect(isSyncReport(42)).toBe(false)
		expect(isSyncReport([])).toBe(false)
		expect(isSyncReport({})).toBe(false)
	})

	it('rejects an object carrying an extra key (exact-record)', () => {
		expect(isSyncReport({ ...buildPopulatedSyncReport(), extra: true })).toBe(false)
	})
})

describe('parseBlueprint', () => {
	it('rejects serialized JSON before parsing when its UTF-8 budget is exceeded', () => {
		expect(parseBoundedJSON('"ok"', isString, 4)).toBe('ok')
		expect(parseBoundedJSON('"ok"', isString, 3)).toBeUndefined()
		expect(parseBoundedJSON('"😀"', isString, 6)).toBe('😀')
		expect(parseBoundedJSON('"😀"', isString, 5)).toBeUndefined()
		expect(parseBoundedJSON('"ok"', isString, Number.NaN)).toBeUndefined()
	})

	it('round-trips a guard-valid value unchanged', () => {
		const value = blueprint('router')

		expect(parseBlueprint(value)).toEqual(value)
	})

	it('parses a JSON string', () => {
		const value = blueprint('router')

		expect(parseBlueprint(JSON.stringify(value))).toEqual(value)
	})

	it('returns undefined for malformed JSON text', () => {
		expect(parseBlueprint('{not json')).toBeUndefined()
	})

	it('returns undefined for an off-contract value', () => {
		expect(parseBlueprint({ name: 'router', src: ['mobile'] })).toBeUndefined()
	})

	it('never throws on adversarial input', () => {
		expect(() => parseBlueprint(null)).not.toThrow()
		expect(() => parseBlueprint(42)).not.toThrow()
		expect(parseBlueprint(null)).toBeUndefined()
	})

	it('a value it parses always satisfies isBlueprint (soundness)', () => {
		const parsed = parseBlueprint(blueprint('router'))

		expect(parsed !== undefined && isBlueprint(parsed)).toBe(true)
	})
})

describe('parsePlan', () => {
	it('round-trips a guard-valid value unchanged', () => {
		const plan = pinPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })

		expect(parsePlan(plan)).toEqual(plan)
	})

	it('parses a JSON string', () => {
		const plan = pinPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })

		expect(parsePlan(JSON.stringify(plan))).toEqual(plan)
	})

	it('returns undefined for malformed JSON text', () => {
		expect(parsePlan('[[[')).toBeUndefined()
	})

	it('returns undefined for an off-contract value', () => {
		expect(parsePlan({ blueprint: 'not a blueprint', groups: [], artifacts: [] })).toBeUndefined()
	})

	it('a value it parses always satisfies isPlan (soundness)', () => {
		const plan = pinPlan({ blueprint: blueprint('router'), groups: ['manifest'], artifacts: [] })
		const parsed = parsePlan(plan)

		expect(parsed !== undefined && isPlan(parsed)).toBe(true)
	})
})

describe('parseSyncReport', () => {
	it('round-trips a guard-valid value unchanged', () => {
		const report = buildPopulatedSyncReport()

		expect(parseSyncReport(report)).toEqual(report)
	})

	it('parses a JSON string', () => {
		const report = buildPopulatedSyncReport()

		expect(parseSyncReport(JSON.stringify(report))).toEqual(report)
	})

	it('returns undefined for malformed JSON text', () => {
		expect(parseSyncReport('{not json')).toBeUndefined()
	})

	it('returns undefined for an off-contract value', () => {
		expect(parseSyncReport({ ...buildPopulatedSyncReport(), failed: 'nope' })).toBeUndefined()
	})

	it('never throws on adversarial input', () => {
		expect(() => parseSyncReport(null)).not.toThrow()
		expect(() => parseSyncReport(42)).not.toThrow()
		expect(parseSyncReport(null)).toBeUndefined()
	})

	it('a value it parses always satisfies isSyncReport (soundness)', () => {
		const parsed = parseSyncReport(buildPopulatedSyncReport())

		expect(parsed !== undefined && isSyncReport(parsed)).toBe(true)
	})
})
