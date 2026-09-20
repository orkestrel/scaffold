// Proof of the conformance setup module: the Bootstrap identity constants and the helpers it
// exports, read against this workspace's own installed dependency tree.

import type { OracleFixture } from './setupConformance.js'
import { isRecord, parseJSON } from '@orkestrel/contract'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createScratch } from '@orkestrel/test/server'
import { beforeAll, describe, expect, it } from 'vitest'
import { parseSync, Visitor } from 'vite'
import * as setup from './setupConformance.js'
import {
	BOOTSTRAP_BUNDLE_DIGEST,
	BOOTSTRAP_CSS_DIGEST,
	BOOTSTRAP_MANIFEST_PATH,
	BOOTSTRAP_RTL_CSS_DIGEST,
	BOOTSTRAP_VERSION,
	FORBIDDEN_RUNTIME,
	ORACLE_BINDINGS,
	ORACLE_TIMEOUT,
	WORKSPACE_ROOT,
	collectImportClosure,
	computeArtifactDigest,
	extractSpecifiers,
	extractStringArgument,
	matchesOracleToggle,
	readBootstrapCascade,
	readBuiltCascade,
	readCompatibility,
	readManifestMember,
	readOracleInventory,
	recordButtonOracle,
	scanOracleObligation,
	scanOracleFixture,
	scanEscapingImport,
	scanForbiddenDependency,
	scanForbiddenSource,
} from './setupConformance.js'

describe('setupConformance', () => {
	it('declares the identity constants and the helpers the conformance proof measures with', () => {
		expect(Object.keys(setup).sort()).toEqual([
			'BOOTSTRAP_BUNDLE_DIGEST',
			'BOOTSTRAP_CSS_DIGEST',
			'BOOTSTRAP_MANIFEST_PATH',
			'BOOTSTRAP_RTL_CSS_DIGEST',
			'BOOTSTRAP_VERSION',
			'FORBIDDEN_RUNTIME',
			'ORACLE_BINDINGS',
			'ORACLE_TIMEOUT',
			'WORKSPACE_ROOT',
			'collectImportClosure',
			'computeArtifactDigest',
			'extractSpecifiers',
			'extractStringArgument',
			'matchesOracleToggle',
			'readBootstrapCascade',
			'readBuiltCascade',
			'readCompatibility',
			'readManifestMember',
			'readOracleControl',
			'readOracleInventory',
			'recordButtonOracle',
			'scanEscapingImport',
			'scanForbiddenDependency',
			'scanForbiddenSource',
			'scanOracleFixture',
			'scanOracleObligation',
		])
	})

	it('pins the copied inventory release and digests and reads its component vocabulary', () => {
		const inventory = readOracleInventory()
		expect(inventory.version).toBe(BOOTSTRAP_VERSION)
		expect(inventory.digests).toEqual({
			'bootstrap.css': BOOTSTRAP_CSS_DIGEST,
			'bootstrap.rtl.css': BOOTSTRAP_RTL_CSS_DIGEST,
		})
		expect(inventory.components.btn?.selectors).toContain('.btn')
		expect(inventory.components.btn?.properties).toContain('--bs-btn-color')
		const scratch = createScratch()
		try {
			const path = scratch.write('inventory.json', '{}')
			expect(() => readOracleInventory(path)).toThrow('Invalid oracle inventory header')
			scratch.write('inventory.json', '{"version":"5.3.8","digests":{"css":false},"components":{}}')
			expect(() => readOracleInventory(path)).toThrow('Invalid oracle inventory digest css')
			scratch.write('inventory.json', '{"version":"5.3.8","digests":{},"components":{"btn":{}}}')
			expect(() => readOracleInventory(path)).toThrow('Invalid oracle inventory component btn')
			scratch.write(
				'inventory.json',
				'{"version":"5.3.8","digests":{},"components":{"btn":{"selectors":[false],"properties":{}}}}',
			)
			expect(() => readOracleInventory(path)).toThrow('Invalid oracle inventory selector btn')
		} finally {
			scratch.destroy()
		}
	})

	it(
		'records and reads official control state and rejects contradicted or absent obligation steps',
		async () => {
			const fixture = await recordButtonOracle()
			const rows = readCompatibility()
			for (const row of rows) expect(scanOracleObligation(row, fixture)).toBeUndefined()
			const step = fixture.steps.find((candidate) => candidate.name === 'button.click.toggle')
			expect(step?.after.classes).toContain('active')
			expect(step?.after.attributes['aria-pressed']).toBe('true')
			expect(step?.after.focus).toBe('Toggle')
			expect(step?.after.events).toEqual(['click'])
			const row = rows.find((candidate) => candidate.proof === 'button.click.toggle')
			if (row === undefined || step === undefined)
				throw new Error('Missing Button click obligation or reading')
			expect(scanOracleObligation({ ...row, proof: 'button.absent' }, fixture)).toContain(
				'missing recording step',
			)
			expect(
				scanOracleObligation(
					{ ...row, category: 'event', obligation: 'Dispatches invented.bs.button' },
					fixture,
				),
			).toContain('recording contradicts obligation')
			expect(
				scanOracleObligation({ ...row, obligation: 'Unsupported obligation' }, fixture),
			).toContain('obligation has no oracle predicate')
			expect(
				scanOracleObligation(row, {
					...fixture,
					steps: fixture.steps.map((candidate) =>
						candidate === step ? { ...step, after: { ...step.after, clicks: [false] } } : candidate,
					),
				}),
			).toContain('recording contradicts obligation')
		},
		ORACLE_TIMEOUT,
	)

	describe('oracle action bindings and exclusions', () => {
		let fixture: OracleFixture
		beforeAll(async () => {
			fixture = await recordButtonOracle()
		}, ORACLE_TIMEOUT)

		it('binds every table entry to a saved fixture step and omits keyboard obligations', () => {
			const saved = parseJSON(
				readFileSync(resolve(WORKSPACE_ROOT, 'tests/fixtures/oracle/button.json'), 'utf8'),
			)
			if (!isRecord(saved) || !Array.isArray(saved.steps))
				throw new Error('Missing saved oracle steps')
			const names = saved.steps.map((step: unknown) => {
				if (!isRecord(step) || typeof step.name !== 'string') throw new Error('Invalid saved step')
				return step.name
			})
			expect(ORACLE_BINDINGS.length).toBeGreaterThan(0)
			for (const binding of ORACLE_BINDINGS) {
				expect(
					names.some((name) => binding.steps.some((pattern) => pattern.test(name))),
					binding.obligation ?? binding.category,
				).toBe(true)
				expect(binding.category).not.toBe('keyboard')
			}
			expect(readCompatibility().some((row) => row.category === 'keyboard')).toBe(false)
		})

		it('binds data-api proofs to activation steps and distinguishes an absent step', () => {
			const row = readCompatibility().find(
				(candidate) => candidate.category === 'attribute' && candidate.proof !== undefined,
			)
			if (row === undefined) throw new Error('Missing data-api obligation')
			expect(scanOracleObligation({ ...row, proof: 'button.hover' }, fixture)).toBe(
				`Compatibility row ${row.component} | ${row.category} | ${row.obligation} | button.hover: proof step does not prove this obligation`,
			)
			expect(
				scanOracleObligation({ ...row, proof: 'button.keyboard.space' }, fixture),
			).toBeUndefined()
			expect(
				scanOracleObligation({ ...row, proof: 'button.click.toggle' }, fixture),
			).toBeUndefined()
			expect(scanOracleObligation({ ...row, proof: 'button.absent' }, fixture)).toContain(
				'missing recording step',
			)
		})

		it('refuses an enabled click as proof of disabled refusal', () => {
			const row = readCompatibility().find(
				(candidate) => candidate.proof === 'button.disabled.click',
			)
			if (row === undefined) throw new Error('Missing disabled obligation')
			expect(scanOracleObligation({ ...row, proof: 'button.click.toggle' }, fixture)).toBe(
				`Compatibility row ${row.component} | ${row.category} | ${row.obligation} | button.click.toggle: proof step does not prove this obligation`,
			)
		})

		it('requires an explicit pressed attribute even when the accessible toggle is released', () => {
			const row = readCompatibility().find(
				(candidate) => candidate.proof === 'button.pressed.click',
			)
			if (row === undefined) throw new Error('Missing accessibility obligation')
			expect(scanOracleObligation(row, fixture)).toBeUndefined()
			const altered = {
				...fixture,
				steps: fixture.steps.map((step) => {
					const attributes = { ...step.after.attributes }
					delete attributes['aria-pressed']
					return { ...step, after: { ...step.after, attributes } }
				}),
			}
			expect(scanOracleObligation(row, altered)).toContain('recording contradicts obligation')
		})

		it('proves a native click event from a live activation', () => {
			expect(
				scanOracleObligation(
					{
						component: 'btn',
						category: 'event',
						obligation: 'Dispatches click',
						proof: 'button.click.toggle',
						status: 'accepted',
					},
					fixture,
				),
			).toBeUndefined()
		})

		it('requires boolean pressed attributes for accessibility and every toggle predicate', () => {
			const step = fixture.steps.find((candidate) => candidate.name === 'button.click.toggle')
			if (step === undefined) throw new Error('Missing activation step')
			expect(matchesOracleToggle(step)).toBe(true)
			expect(matchesOracleToggle({ ...step, before: step.after })).toBe(false)
			for (const pressed of [undefined, '', 'mixed', 'TRUE']) {
				const attributes = { ...step.after.attributes }
				if (pressed === undefined) delete attributes['aria-pressed']
				else attributes['aria-pressed'] = pressed
				const altered = { ...step, after: { ...step.after, attributes } }
				expect(matchesOracleToggle(altered)).toBe(false)
				for (const row of readCompatibility().filter(
					(candidate) => candidate.proof === step.name,
				)) {
					expect(scanOracleObligation(row, { ...fixture, steps: [altered] })).toContain(
						'recording contradicts obligation',
					)
				}
			}
		})

		it('skips differing readings in a written excluded step and still compares other steps', () => {
			const scratch = createScratch()
			try {
				const altered = {
					...fixture,
					excluded: [{ step: 'button.hover', reason: 'Exercises a differing excluded reading.' }],
					steps: fixture.steps.map((step) =>
						step.name === 'button.hover'
							? { ...step, after: { ...step.after, focus: 'Changed' } }
							: step,
					),
				}
				const path = scratch.write('button.json', JSON.stringify(altered))
				expect(scanOracleFixture(fixture, parseJSON(readFileSync(path, 'utf8')))).toBeUndefined()
				expect(scanOracleFixture(fixture, { ...altered, excluded: [] })).toBe(
					'Oracle differs at step button.hover',
				)
				expect(scanOracleFixture(fixture, { ...altered, version: 'changed' })).toBe(
					'Oracle fixture metadata or step membership differs',
				)
				expect(
					scanOracleFixture(fixture, {
						...altered,
						steps: altered.steps.filter((step) => step.name !== 'button.hover'),
					}),
				).toBe('Oracle exclusion names no recorded step: button.hover')
			} finally {
				scratch.destroy()
			}
		})

		it('rejects exclusions outside the recording and malformed fixture metadata', () => {
			expect(scanOracleFixture(fixture, {})).toBe('Invalid Button oracle fixture')
			expect(
				scanOracleFixture(fixture, {
					...fixture,
					excluded: [{ step: 'button.absent', reason: 'Missing.' }],
				}),
			).toBe('Oracle exclusion names no recorded step: button.absent')
			expect(
				scanOracleFixture(fixture, {
					...fixture,
					excluded: [{ step: 'button.hover', reason: '' }],
				}),
			).toBe('Invalid oracle exclusion')
			expect(
				scanOracleFixture(fixture, { ...fixture, steps: [...fixture.steps, fixture.steps[0]] }),
			).toBe('Oracle fixture metadata or step membership differs')
		})
	})

	it('reads compatibility rows from a written guide and rejects missing columns and invalid statuses', () => {
		const scratch = createScratch()
		try {
			const path = scratch.write(
				'guide.md',
				'## Compatibility\n\n| Component | Kind | Obligation | Proof | Status |\n| --- | --- | --- | --- | --- |\n| btn | method | Toggle active | button.click.toggle | accepted |\n| btn | initialization | Plugin registration | — | shipped |\n',
			)
			expect(readCompatibility(path)).toEqual([
				{
					component: 'btn',
					category: 'method',
					obligation: 'Toggle active',
					proof: 'button.click.toggle',
					status: 'accepted',
				},
				{
					component: 'btn',
					category: 'initialization',
					obligation: 'Plugin registration',
					proof: undefined,
					status: 'shipped',
				},
			])
			scratch.write(
				'guide.md',
				'## Compatibility\n\n| Component | Kind | Obligation | Status |\n| --- | --- | --- | --- |\n| btn | method | Toggle active | accepted |\n',
			)
			expect(() => readCompatibility(path)).toThrow(
				'Compatibility row <header>: missing Proof column',
			)
			scratch.write(
				'guide.md',
				'## Compatibility\n\n| Component | Kind | Obligation | Proof | Status |\n| --- | --- | --- | --- | --- |\n| btn | method | Toggle active | button.click.toggle | pending |\n',
			)
			expect(() => readCompatibility(path)).toThrow(
				'Compatibility row btn: Toggle active: invalid status pending',
			)
		} finally {
			scratch.destroy()
		}
	})

	it('reads the built cascade and refuses a missing artifact', () => {
		const scratch = createScratch()
		try {
			const path = scratch.write('index.css', '@layer components { .btn { --bs-btn-color: red; } }')
			expect(readBuiltCascade(path)).toBe('@layer components { .btn { --bs-btn-color: red; } }')
			expect(readBuiltCascade()).toContain('--vn-color-primary-base')
			expect(() => readBuiltCascade(resolve(scratch.path, 'missing.css'))).toThrow(/ENOENT/u)
		} finally {
			scratch.destroy()
		}
	})

	it('locates this workspace and the installed Bootstrap manifest', () => {
		expect(existsSync(resolve(WORKSPACE_ROOT, 'package.json'))).toBe(true)
		expect(readManifestMember(resolve(WORKSPACE_ROOT, 'package.json'), 'name')).toBe(
			'@orkestrel/veneer',
		)
		expect(existsSync(BOOTSTRAP_MANIFEST_PATH)).toBe(true)
		expect(readManifestMember(BOOTSTRAP_MANIFEST_PATH, 'name')).toBe('bootstrap')
	})

	it('pins the release the installed manifest declares', () => {
		expect(BOOTSTRAP_VERSION).toMatch(/^\d+\.\d+\.\d+$/)
		expect(readManifestMember(BOOTSTRAP_MANIFEST_PATH, 'version')).toBe(BOOTSTRAP_VERSION)
	})

	it('reads the installed Bootstrap stylesheet the compatibility oracle measures', () => {
		const cascade = readBootstrapCascade()
		expect(cascade).toContain(`v${BOOTSTRAP_VERSION} (https://getbootstrap.com/)`)
		expect(cascade).toContain('--bs-blue')
	})

	it('pins a distinct digest for the CSS, the RTL CSS, and the bundle', () => {
		const HEX_DIGEST = /^[0-9a-f]{64}$/u
		expect(BOOTSTRAP_CSS_DIGEST).toMatch(HEX_DIGEST)
		expect(BOOTSTRAP_RTL_CSS_DIGEST).toMatch(HEX_DIGEST)
		expect(BOOTSTRAP_BUNDLE_DIGEST).toMatch(HEX_DIGEST)
		expect(BOOTSTRAP_CSS_DIGEST).not.toBe(BOOTSTRAP_RTL_CSS_DIGEST)
		expect(BOOTSTRAP_CSS_DIGEST).not.toBe(BOOTSTRAP_BUNDLE_DIGEST)
		expect(BOOTSTRAP_RTL_CSS_DIGEST).not.toBe(BOOTSTRAP_BUNDLE_DIGEST)
	})

	it('reads only a string member and reports absence as undefined', () => {
		expect(readManifestMember(BOOTSTRAP_MANIFEST_PATH, 'absent-member')).toBeUndefined()
		expect(readManifestMember(BOOTSTRAP_MANIFEST_PATH, 'dependencies')).toBeUndefined()
	})

	it('scans runtime manifest sections without rejecting development tooling', () => {
		expect(
			scanForbiddenDependency('{"devDependencies":{"vue":"3"}}', FORBIDDEN_RUNTIME),
		).toBeUndefined()
		expect(scanForbiddenDependency('{"dependencies":{"vue":"3"}}', FORBIDDEN_RUNTIME)).toBe('vue')
		expect(
			scanForbiddenDependency('{"peerDependencies":{"@vue/reactivity":"3"}}', FORBIDDEN_RUNTIME),
		).toBe('@vue/reactivity')
		expect(
			scanForbiddenDependency('{"optionalDependencies":{"bootstrap":"5"}}', FORBIDDEN_RUNTIME),
		).toBe('bootstrap')
		expect(
			scanForbiddenDependency('{"dependencies":{"vue-other":"1"}}', FORBIDDEN_RUNTIME),
		).toBeUndefined()
		expect(() => scanForbiddenDependency('null', FORBIDDEN_RUNTIME)).toThrow(
			'The dependency manifest must be a JSON object',
		)
		expect(() => scanForbiddenDependency('{"dependencies":[]}', FORBIDDEN_RUNTIME)).toThrow(
			'Manifest dependencies must be an object',
		)
	})

	it('reads a call argument written as a literal and refuses every other argument node', () => {
		const parsed = parseSync(
			'module.ts',
			'require("vue"); require(`bootstrap`); require(`${name}`); require(name)',
		)
		const readings: Array<string | undefined> = []
		new Visitor({
			CallExpression(node) {
				const argument = node.arguments[0]
				if (argument !== undefined) readings.push(extractStringArgument(argument))
			},
		}).visit(parsed.program)
		expect(readings).toEqual(['vue', 'bootstrap', undefined, undefined])
	})

	it('extracts imports and re-exports, parenthesized or not, while rejecting comments and strings as module edges', () => {
		expect(
			extractSpecifiers(
				`import './local.js'; import type { Ref } from 'vue'; export * from '@orkestrel/test'; export { member } from './member.js'; const lazy = import('bootstrap'); type Deferred = import('@vue/reactivity').Ref<number>; import Legacy = require('./legacy.cjs');`,
			),
		).toEqual([
			'./local.js',
			'vue',
			'@orkestrel/test',
			'./member.js',
			'bootstrap',
			'@vue/reactivity',
			'./legacy.cjs',
		])
		expect(extractSpecifiers('// import "vue"\nconst text = "import(\'bootstrap\')"')).toEqual([])
		expect(extractSpecifiers('import(`./literal.js`)')).toEqual(['./literal.js'])
		expect(extractSpecifiers('const dependency = require("vue")')).toEqual(['vue'])
		expect(extractSpecifiers('require(`bootstrap`)')).toEqual(['bootstrap'])
		expect(extractSpecifiers('require((`bootstrap`))')).toEqual(['bootstrap'])
		expect(extractSpecifiers('require(("bootstrap"))')).toEqual(['bootstrap'])
		expect(extractSpecifiers('import((`bootstrap`))')).toEqual(['bootstrap'])
		expect(extractSpecifiers('(require)(`bootstrap`)')).toEqual(['bootstrap'])
		expect(extractSpecifiers('require(`${name}`)')).toEqual([])
		expect(extractSpecifiers('require(name)')).toEqual([])
		expect(() => extractSpecifiers('import {')).toThrow('Expected `}` but found `EOF`')
	})

	it('finds forbidden package roots, subpaths, scopes, and dynamic imports', () => {
		expect(scanForbiddenSource('import "./vue.js"', FORBIDDEN_RUNTIME)).toBeUndefined()
		expect(scanForbiddenSource('import "vue-other"', FORBIDDEN_RUNTIME)).toBeUndefined()
		expect(scanForbiddenSource('import "vue/runtime"', FORBIDDEN_RUNTIME)).toBe('vue/runtime')
		expect(scanForbiddenSource('export * from "@vue/reactivity"', FORBIDDEN_RUNTIME)).toBe(
			'@vue/reactivity',
		)
		expect(scanForbiddenSource('await import("bootstrap")', FORBIDDEN_RUNTIME)).toBe('bootstrap')
		expect(
			scanForbiddenSource('type Reference = import("vue").Ref<number>', FORBIDDEN_RUNTIME),
		).toBe('vue')
		expect(scanForbiddenSource('const dependency = require("vue")', FORBIDDEN_RUNTIME)).toBe('vue')
	})

	it('detects a parent escape without rejecting a relative path that stays inside', () => {
		const scratch = createScratch()
		try {
			const module = scratch.write('src/entry.ts', '')
			expect(scanEscapingImport(module, 'import "./inside.js"', scratch.path)).toBeUndefined()
			expect(scanEscapingImport(module, 'import "../other.js"', scratch.path)).toBeUndefined()
			expect(scanEscapingImport(module, 'import "../../outside.js"', scratch.path)).toBe(
				'../../outside.js',
			)
			expect(scanEscapingImport(module, 'import "node:fs"', scratch.path)).toBeUndefined()
		} finally {
			scratch.destroy()
		}
	})

	it('walks transitive imports, cycles, and Sass dependencies and refuses an unresolved edge', () => {
		const scratch = createScratch()
		try {
			const entry = scratch.write(
				'src/index.ts',
				'export * from "./leaf.js"; import "./index.scss"',
			)
			const leaf = scratch.write(
				'src/leaf.ts',
				'export * from "./index.js"; import "../outside.ts"',
			)
			const outside = scratch.write('outside.ts', 'export {}')
			const styles = scratch.write('src/index.scss', '@use "tokens";')
			const tokens = scratch.write('src/_tokens.scss', '@layer theme;')
			expect(collectImportClosure(entry)).toEqual(new Set([entry, leaf, outside, styles, tokens]))
			scratch.write('src/leaf.ts', 'import "./absent.js"')
			expect(() => collectImportClosure(entry)).toThrow('Unresolved relative import ./absent.js')
		} finally {
			scratch.destroy()
		}
	})

	it('computes a SHA-256 digest sensitive to a byte change and throws on a missing file', () => {
		const scratch = createScratch()
		try {
			const path = scratch.write('digest.txt', 'abc')
			expect(computeArtifactDigest(path)).toBe(
				'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
			)
			scratch.write('digest.txt', 'abd')
			expect(computeArtifactDigest(path)).not.toBe(
				'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
			)
			expect(() => computeArtifactDigest(resolve(scratch.path, 'absent'))).toThrow(/ENOENT/u)
		} finally {
			scratch.destroy()
		}
	})
})
