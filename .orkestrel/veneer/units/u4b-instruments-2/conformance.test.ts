import { readInventory, resolveContained } from '@orkestrel/test/server'
import { isRecord, parseJSON } from '@orkestrel/contract'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { parse } from 'postcss'
import { describe, expect, it } from 'vitest'
import { normalizeComplexSelector } from './setupStyles.js'
import {
	BOOTSTRAP_BUNDLE_DIGEST,
	BOOTSTRAP_CSS_DIGEST,
	BOOTSTRAP_MANIFEST_PATH,
	BOOTSTRAP_RTL_CSS_DIGEST,
	BOOTSTRAP_VERSION,
	FORBIDDEN_RUNTIME,
	ORACLE_TIMEOUT,
	WORKSPACE_ROOT,
	collectImportClosure,
	computeArtifactDigest,
	readManifestMember,
	readBuiltCascade,
	readCompatibility,
	readOracleInventory,
	recordButtonOracle,
	scanOracleObligation,
	scanEscapingImport,
	scanForbiddenDependency,
	scanForbiddenSource,
} from './setupConformance.js'

describe('Bootstrap reference identity', () => {
	it('installs the exact Bootstrap release this package tracks', () => {
		expect(readManifestMember(BOOTSTRAP_MANIFEST_PATH, 'version')).toBe(BOOTSTRAP_VERSION)
	})

	it('pins the installed CSS, RTL CSS, and bundled JavaScript bytes', () => {
		const root = dirname(BOOTSTRAP_MANIFEST_PATH)
		expect(computeArtifactDigest(resolve(root, 'dist/css/bootstrap.css'))).toBe(
			BOOTSTRAP_CSS_DIGEST,
		)
		expect(computeArtifactDigest(resolve(root, 'dist/css/bootstrap.rtl.css'))).toBe(
			BOOTSTRAP_RTL_CSS_DIGEST,
		)
		expect(computeArtifactDigest(resolve(root, 'dist/js/bootstrap.bundle.js'))).toBe(
			BOOTSTRAP_BUNDLE_DIGEST,
		)
	})
})

describe('Bootstrap component oracle', () => {
	it('carries every shipped component selector and custom property in the built cascade', () => {
		const rows = readCompatibility()
		const shipped = [...new Set(rows.map((row) => row.component))]
			.filter((component) =>
				rows.filter((row) => row.component === component).every((row) => row.status === 'shipped'),
			)
			.sort()
		const listed: readonly string[] = []
		const inventory = readOracleInventory()
		const cascade = parse(readBuiltCascade())
		const selectors = new Set<string>()
		const properties = new Set<string>()
		cascade.walkRules((rule) => {
			for (const selector of rule.selectors) selectors.add(normalizeComplexSelector(selector))
		})
		cascade.walkDecls((declaration) => {
			if (declaration.prop.startsWith('--')) properties.add(declaration.prop)
		})
		for (const component of shipped) {
			const vocabulary = inventory.components[component]
			expect(vocabulary, `Shipped component ${component} has no official inventory`).toBeDefined()
			if (vocabulary === undefined) throw new Error(`Missing inventory component ${component}`)
			for (const selector of vocabulary.selectors)
				expect(
					selectors.has(normalizeComplexSelector(selector)),
					`Shipped component ${component} is missing selector ${selector}`,
				).toBe(true)
			for (const property of vocabulary.properties)
				expect(
					properties.has(property),
					`Shipped component ${component} is missing custom property ${property}`,
				).toBe(true)
		}
		expect(shipped, 'Guide shipped components and conformance component list must agree').toEqual(
			listed,
		)
	})

	it(
		'records official Button behavior and matches each named fixture step',
		async () => {
			const path = resolve(WORKSPACE_ROOT, 'tests/fixtures/oracle/button.json')
			if (process.env.ORACLE_REFRESH !== '1' && !existsSync(path))
				throw new Error(
					'Missing oracle fixture: tests/fixtures/oracle/button.json; record with ORACLE_REFRESH=1',
				)
			const recording = await recordButtonOracle()
			if (process.env.ORACLE_REFRESH === '1') {
				mkdirSync(dirname(path), { recursive: true })
				writeFileSync(path, `${JSON.stringify(recording, undefined, '\t')}\n`)
			}
			const fixture = parseJSON(readFileSync(path, 'utf8'))
			if (!isRecord(fixture) || !Array.isArray(fixture.steps))
				throw new Error('Invalid Button oracle fixture')
			for (const [index, step] of recording.steps.entries()) {
				expect(parseJSON(JSON.stringify(step)), `Oracle differs at step ${step.name}`).toEqual(
					fixture.steps[index],
				)
			}
			expect(
				parseJSON(JSON.stringify(recording)),
				'Oracle fixture metadata or step membership differs',
			).toEqual(fixture)
			for (const row of readCompatibility()) {
				expect(scanOracleObligation(row, recording)).toBeUndefined()
			}
		},
		ORACLE_TIMEOUT,
	)
})

describe('runtime boundaries', () => {
	it('declares no forbidden runtime dependency or peer', () => {
		expect(
			scanForbiddenDependency(
				readFileSync(resolve(WORKSPACE_ROOT, 'package.json'), 'utf8'),
				FORBIDDEN_RUNTIME,
			),
		).toBeUndefined()
	})

	it('imports no forbidden runtime package from source, application, or tests', () => {
		const files = readInventory(WORKSPACE_ROOT, ['src', 'app', 'tests'])
		for (const [path, source] of Object.entries(files)) {
			if (!/\.[cm]?[jt]sx?$/u.test(path)) continue
			expect({ path, forbidden: scanForbiddenSource(source, FORBIDDEN_RUNTIME) }).toEqual({
				path,
				forbidden: undefined,
			})
		}
	})

	it('keeps relative module imports inside the workspace', () => {
		const files = readInventory(WORKSPACE_ROOT, ['src', 'app', 'tests'])
		for (const [path, source] of Object.entries(files)) {
			if (!/\.[cm]?[jt]sx?$/u.test(path)) continue
			expect({
				path,
				escape: scanEscapingImport(resolve(WORKSPACE_ROOT, path), source, WORKSPACE_ROOT),
			}).toEqual({ path, escape: undefined })
		}
	})

	it('keeps every published entry closure inside source', () => {
		const root = resolve(WORKSPACE_ROOT, 'src')
		for (const entry of ['core/index.ts', 'browser/index.ts', 'styles/index.ts']) {
			const path = resolve(root, entry)
			const closure = collectImportClosure(path)
			expect(closure.has(path)).toBe(true)
			for (const file of closure) {
				expect(resolveContained(root, file) === undefined, `${entry}: ${file}`).toBe(false)
			}
		}
	})
})
