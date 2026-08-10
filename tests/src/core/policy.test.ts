import type { Blueprint, Environment } from '@src/core'
import { globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseJSON } from '@orkestrel/contract'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'
import { applicationArtifacts, blueprint, blueprintToPlan, sourceArtifacts } from '@src/core'
import { isBrowserVuePath, readRecord } from '../../setup.js'
import {
	derivePolicyTokens,
	inspectCodingLaw,
	inspectCodingSource,
	inspectCodingWorkspace,
	inspectFunctionModule,
	inspectPolicyPurity,
	inspectPolicyWorkspace,
	inspectVueCodingLaw,
	isCodingSourcePath,
	isFunctionDomainPath,
	isSelfContained,
	normalizePolicyPath,
	POLICY_INFRASTRUCTURE_FILES,
	readPackageName,
	WORKER_SCOPE_VALUE_GLOBALS,
} from '../../setupPolicy.js'
import { buildTempDirectory, WORKSPACE_ROOT } from '../../setupServer.js'

describe('repository coding law', () => {
	it('normalizes platform and duplicate glob separators in diagnostics', () => {
		expect(normalizePolicyPath('app\\\\browser//main.ts')).toBe('app/browser/main.ts')
	})

	it('keeps Vue single-file components exclusively in browser environments', () => {
		const files = globSync('{app,src}/**/*.vue')

		expect(files.every(isBrowserVuePath)).toBe(true)
		expect(isBrowserVuePath('src/core/Hostile.vue')).toBe(false)
		expect(isBrowserVuePath('src/server/Hostile.vue')).toBe(false)
		expect(isBrowserVuePath('app/core/Hostile.vue')).toBe(false)
		expect(isBrowserVuePath('app/server/Hostile.vue')).toBe(false)
		expect(isBrowserVuePath('src/browser/Hostile.vue')).toBe(false)
		expect(isBrowserVuePath('app/browser/Application.vue')).toBe(true)
	})

	it('mechanically enforces source placement, exports, readonly contracts, and syntax law', () => {
		expect(inspectCodingWorkspace(WORKSPACE_ROOT)).toEqual([])
	})

	it('recognizes only direct registered function-domain modules', () => {
		const valid =
			"import type { Ref } from 'vue'\nexport function useTheme(): Ref | undefined { return undefined }\n"

		expect(isFunctionDomainPath('app/browser/composables/useTheme.ts')).toBe(true)
		expect(isFunctionDomainPath('app\\browser\\composables\\useTheme.ts')).toBe(true)
		expect(isFunctionDomainPath('app/browser/services/useTheme.ts')).toBe(false)
		expect(isFunctionDomainPath('app/browser/composables/nested/useTheme.ts')).toBe(false)
		expect(isFunctionDomainPath('app/browser/composables/index.ts')).toBe(false)
		expect(isFunctionDomainPath('app/browser/composables/main.ts')).toBe(false)
		expect(inspectCodingLaw('app/browser/composables/useTheme.ts', valid)).toEqual([])
		expect(inspectCodingLaw('app/browser/services/useTheme.ts', valid)).toEqual([
			'app/browser/services/useTheme.ts places module functions in their centralized kind file',
		])
	})

	it('accepts only runtime implementations while preserving overloads and generators', () => {
		const ordinary = ts.createSourceFile(
			'useTheme.ts',
			'export function useTheme() { return true }\n',
			ts.ScriptTarget.Latest,
			true,
		)
		const declared = ts.createSourceFile(
			'useTheme.ts',
			'export declare function useTheme(): void\n',
			ts.ScriptTarget.Latest,
			true,
		)
		const overloaded = ts.createSourceFile(
			'useTheme.ts',
			[
				'export function useTheme(value: string): string',
				'export function useTheme(value: number): number',
				'export function useTheme(value: string | number) { return value }',
			].join('\n'),
			ts.ScriptTarget.Latest,
			true,
		)
		const generator = ts.createSourceFile(
			'useTheme.ts',
			'export function* useTheme() { yield true }\n',
			ts.ScriptTarget.Latest,
			true,
		)

		expect(inspectFunctionModule('app/browser/composables/useTheme.ts', ordinary)).toEqual([])
		expect(inspectFunctionModule('app/browser/composables/useTheme.ts', declared)).toEqual([
			'app/browser/composables/useTheme.ts declarations do not form one matching exported function implementation',
		])
		expect(inspectFunctionModule('app/browser/composables/useTheme.ts', overloaded)).toEqual([])
		expect(inspectFunctionModule('app/browser/composables/useTheme.ts', generator)).toEqual([])
	})

	it('rejects invalid function-module shapes and file-shaped function domains', () => {
		const cases = [
			'export function useTheme() { return true }\nexport function useMode() { return true }\n',
			'export const THEME = true\nexport function useTheme() { return THEME }\n',
			'export default function useTheme() { return true }\n',
			'function useTheme() { return true }\n',
			'export function useMode() { return true }\n',
		]

		for (const content of cases) {
			const source = ts.createSourceFile('useTheme.ts', content, ts.ScriptTarget.Latest, true)
			expect(inspectFunctionModule('app/browser/composables/useTheme.ts', source)).toEqual([
				'app/browser/composables/useTheme.ts declarations do not form one matching exported function implementation',
			])
		}

		for (const path of [
			'app/browser/composables.ts',
			'app/core/composables.ts',
			'src/core/composables.ts',
			'src/browser/nested/composables.ts',
		]) {
			expect(inspectCodingLaw(path, '')).toEqual([
				`${path} names a function domain, which belongs in a folder rather than a file`,
			])
		}
	})

	it('exempts only positively self-contained Node runtime entrypoints', async () => {
		const directory = await buildTempDirectory()
		const sourceRoot = join(directory.path, 'src', 'server')
		const entry = join(sourceRoot, 'serve.ts')
		const worker = [
			"import type { WorkerOptions } from './types.js'",
			"import { parentPort } from 'node:worker_threads'",
			'function receive(options: WorkerOptions) { return options }',
			'const port = parentPort',
		].join('\n')
		try {
			mkdirSync(sourceRoot, { recursive: true })
			writeFileSync(entry, `${worker}\n`, 'utf8')

			expect(inspectCodingWorkspace(directory.path)).toEqual([])
			expect(
				isSelfContained(ts.createSourceFile('serve.ts', worker, ts.ScriptTarget.Latest, true)),
			).toBe(true)

			const sibling = worker.replace(
				"import { parentPort } from 'node:worker_threads'",
				"import { parentPort } from './worker.js'",
			)
			writeFileSync(entry, `${sibling}\n`, 'utf8')
			expect(inspectCodingWorkspace(directory.path)).toEqual([
				'src/server/serve.ts places module functions in their centralized kind file',
				'src/server/serve.ts places module data in its centralized kind file',
			])

			const importless =
				'function receive(value: string) { return value }\nconst result = receive("ready")\n'
			writeFileSync(entry, importless, 'utf8')
			expect(inspectCodingWorkspace(directory.path)).toEqual([
				'src/server/serve.ts places module functions in their centralized kind file',
				'src/server/serve.ts places module data in its centralized kind file',
			])
			expect(
				isSelfContained(ts.createSourceFile('serve.ts', importless, ts.ScriptTarget.Latest, true)),
			).toBe(false)

			writeFileSync(entry, `${worker}\nvoid import('./sibling.js')\n`, 'utf8')
			expect(inspectCodingWorkspace(directory.path)).toEqual([
				'src/server/serve.ts places module functions in their centralized kind file',
				'src/server/serve.ts places module data in its centralized kind file',
			])

			writeFileSync(entry, `${worker}\nexport { value } from './sibling.js'\n`, 'utf8')
			expect(inspectCodingWorkspace(directory.path)).toEqual([
				'src/server/serve.ts places module functions in their centralized kind file',
				'src/server/serve.ts places module data in its centralized kind file',
			])

			expect(
				inspectCodingLaw(
					'src/core/constants.ts',
					"import type { Blueprint } from './types.js'\nconst HIDDEN = 1\n",
				),
			).toEqual(['src/core/constants.ts exports every centralized declaration'])
		} finally {
			await directory.cleanup()
		}
	})

	it('permits web interop in core while fencing worker-only value globals', () => {
		expect(
			inspectCodingLaw(
				'src/core/helpers.ts',
				'export function createController() { return new AbortController() }\n',
			),
		).toEqual([])
		expect(
			inspectCodingLaw(
				'src/core/helpers.ts',
				'export function stopResource(resource: { close(): void }) { resource.close() }\n',
			),
		).toEqual([])
		expect(
			inspectCodingLaw(
				'src/core/helpers.ts',
				'export function inspectLocation(location: string) { return { location: location.length } }\n',
			),
		).toEqual([])
		expect(
			inspectCodingLaw('src/core/types.ts', 'export type WorkerLocation = typeof location\n'),
		).toEqual([])

		for (const identifier of WORKER_SCOPE_VALUE_GLOBALS) {
			const violations = inspectCodingLaw(
				'app/core/helpers.ts',
				`export function inspectWorker() { void ${identifier} }\n`,
			)
			expect(violations).toEqual([
				expect.stringContaining(`forbids worker-scope global ${identifier}`),
			])
		}

		for (const identifier of ['location', 'name', 'self']) {
			expect(
				inspectCodingLaw(
					'app/core/helpers.ts',
					`export function inspectWorker() { return ${identifier} }\n`,
				),
			).toEqual([expect.stringContaining(`forbids worker-scope global ${identifier}`)])
		}
		expect(
			inspectCodingLaw(
				'app/core/helpers.ts',
				'export function inspectWorker() { return { location } }\n',
			),
		).toEqual([expect.stringContaining('forbids worker-scope global location')])
	})

	it('pre-approves only the two codex bench probes and denies sensitive file families', () => {
		const settings = readRecord(
			parseJSON(readFileSync(join(WORKSPACE_ROOT, '.claude', 'settings.json'), 'utf8')),
		)
		const permissions = readRecord(settings.permissions)

		// The vendored allow list is closed, not a floor: every workspace in the line
		// inherits it, so an entry added here is added to every package at once. Only the
		// bench-liveness probe and the device-login recovery the orchestration contract
		// requires at session start are pre-approved. Machine-local grants belong in
		// settings.local.json, which SENSITIVE_HOST_PATH_PATTERN keeps out of every host.
		expect(permissions.allow).toEqual(['Bash(codex --version)', 'Bash(codex login *)'])
		expect(permissions.ask).toBeUndefined()
		expect(permissions.deny).toEqual(
			expect.arrayContaining([
				'Read(.env*)',
				'Read(**/.env*)',
				'Read(credentials.json)',
				'Read(**/credentials.json)',
				'Read(settings.local.json)',
				'Read(**/settings.local.json)',
				'Read(//**/settings.local.json)',
				'Read(application_default_credentials.json)',
				'Read(**/application_default_credentials.json)',
				'Read(//**/application_default_credentials.json)',
				'Read(.kube/**)',
				'Read(**/.kube/**)',
				'Read(//**/.kube/**)',
			]),
		)
	})

	it('rejects assertions, placement, barrels, mutability, privacy, hidden functions, and computed imports', () => {
		const cases = [
			['src/core/hostile.ts', 'interface Hidden { value: string }\nconst value = {} as object\n'],
			['src/core/random.ts', "import './sibling.js'\nexport const BAD = 1\n"],
			['app/browser/main.ts', "import './sibling.js'\nexport function hidden() { return 1 }\n"],
			[
				'src/core/constants.ts',
				"import './sibling.js'\nexport function misplaced() { return 1 }\n",
			],
			['src/core/helpers.ts', "import './sibling.js'\nexport const MISPLACED = 1\n"],
			['src/core/random.ts', 'export class Bad {}\n'],
			['src/core/random.ts', 'export enum Bad { value }\n'],
			['src/core/index.ts', "export { value } from './helpers.js'\n"],
			['src/core/types.ts', 'export interface Mutable { value: string }\n'],
			['src/core/types.ts', 'export type Mutable = { value: string }\n'],
			['src/core/constants.ts', 'export const lower = []\n'],
			['src/core/Hostile.ts', 'export class Hostile { private value = 1 }\n'],
			[
				'src/core/helpers.ts',
				'export function outer() { const inner = () => 1; return inner() }\n',
			],
			['src/core/computed.ts', 'void import(`node:fs`)\n'],
			['src/browser/computed.ts', 'void import(`node:http`)\n'],
			['src/server/computed.ts', 'void import(`vue`)\n'],
			['app/core/computed.ts', 'void import(`@app/server`)\n'],
			['app/browser/computed.ts', 'void import(`node:http`)\n'],
			['app/server/computed.ts', 'void import(`@app/browser`)\n'],
			[
				'src/core/url.ts',
				"import value from 'data:text/javascript,export default globalThis.process'\nvoid value\n",
			],
			['src/core/url.ts', "void import('https://example.com/module.js')\n"],
			['src/core/hostile.js', 'void process\n'],
			['app/browser/hostile.jsx', 'void document\n'],
		]

		for (const [path, content] of cases) {
			expect(inspectCodingLaw(path ?? '', content ?? '').length).toBeGreaterThan(0)
		}
	})

	it('rejects host-enabling triple-slash references except the exact browser Vite contract', () => {
		expect(
			inspectCodingLaw('src/core/hostile.ts', '/// <reference types="node" />\n'),
		).not.toHaveLength(0)
		expect(
			inspectCodingLaw('src/server/hostile.ts', '/// <reference lib="dom" />\n'),
		).not.toHaveLength(0)
		expect(
			inspectCodingLaw('app/core/hostile.ts', '/// <reference path="../server/types.ts" />\n'),
		).not.toHaveLength(0)
		expect(
			inspectCodingLaw('app/browser/env.d.ts', '/// <reference types="vite/client" />\n'),
		).toEqual([])
		expect(
			inspectCodingLaw(
				'app/browser/env.d.ts',
				'/// <reference types="vite/client" />\n/// <reference types="node" />\n',
			),
		).not.toHaveLength(0)
	})

	it('enforces coding law in official Vue script blocks while ignoring inert template content', () => {
		expect(
			inspectVueCodingLaw('app/browser/Hostile.vue', [
				{ content: '/// <reference types="node" />', lang: 'ts' },
			]),
		).not.toHaveLength(0)
		expect(
			inspectVueCodingLaw('app/browser/Allowed.vue', [
				{ content: 'import { ref } from "vue"; void ref(1)', lang: 'ts' },
			]),
		).toEqual([])
		expect(inspectVueCodingLaw('app/browser/Inert.vue')).toEqual([])
		expect(inspectVueCodingLaw('app/browser/InertReference.vue')).toEqual([])
		expect(
			inspectVueCodingLaw('app/browser/JavaScript.vue', [{ content: 'void document', lang: 'js' }]),
		).not.toHaveLength(0)
		expect(
			inspectVueCodingLaw('app/browser/HostileScript.vue', [
				{ content: 'const value = {} as object', lang: 'ts' },
			]),
		).not.toHaveLength(0)
	})

	it('keeps components out of non-browser environments and routes each source to its inspector', () => {
		expect(inspectCodingSource('app/core/Hostile.vue', '<template />')).toEqual([
			'app/core/Hostile.vue Vue components belong in app/browser',
			'app/core/Hostile.vue requires a Vue script extractor; its script blocks were not inspected',
		])
		expect(
			inspectCodingSource(
				'app/browser/Hostile.vue',
				'const value = {} as object',
				(_path, content) => [{ content, lang: 'ts' }],
			),
		).not.toHaveLength(0)
		expect(
			inspectCodingSource('src/core/hostile.ts', 'const value = {} as object\n'),
		).not.toHaveLength(0)
	})

	it('reports a missing Vue script extractor instead of inspecting nothing', () => {
		// Regression guard. Without an extractor the SFC arm returned [], so a
		// workspace sweep reported success while every script block went unread —
		// which is how a generated Vue consumer shipped a policy gate that could not
		// see inside its own components.
		const sfc = '<script setup lang="ts">const value = {} as object\nvoid value</script>\n'
		const extractor = (_path: string, content: string) => [
			{ content: content.replace(/^[\s\S]*?>|<\/script>\s*$/gu, ''), lang: 'ts' },
		]

		const unread = inspectCodingSource('app/browser/Hostile.vue', sfc)
		expect(unread).toEqual([
			'app/browser/Hostile.vue requires a Vue script extractor; its script blocks were not inspected',
		])

		const read = inspectCodingSource('app/browser/Hostile.vue', sfc, extractor)
		expect(read.some((violation) => violation.includes('forbids type/non-null assertions'))).toBe(
			true,
		)

		// Control: the identical assertion in a plain module must be caught, so a
		// green SFC result can never be credited to a coding law that does not fire.
		expect(
			inspectCodingSource('app/browser/plain.ts', 'const value = {} as object\nvoid value\n').some(
				(violation) => violation.includes('forbids type/non-null assertions'),
			),
		).toBe(true)
	})
})

describe('generated workspace coding law', () => {
	// The generated `policy` project runs this exact module over `{app,src}/**`, so a
	// template that violates a kind registration fails the consumer's own gates rather
	// than this repository's. Host artifacts carry no plan content and never land under
	// `app/` or `src/`; the workspace sweep above covers them.
	//
	// The one `.vue` variant is delegated rather than skipped: scaffold declares no `vue`,
	// so no SFC script can be parsed here. `testArtifacts` (`src/core/compilers.ts`)
	// injects `vue/compiler-sfc` into every emitted policy test whose blueprint has an app
	// browser, `tests/setupBin.ts` gives the `'full'` consumer shape that browser (so it
	// emits `app/browser/ApplicationView.vue`), and `tests/setupE2E.ts` runs that
	// consumer's own `prepublishOnly` — whose `npm test` includes `test:policy` — from
	// `tests/integration/gates.test.ts`.
	it('inspects every distinct non-Vue variant emitted by all blueprint shapes', () => {
		type SourceEmissionFacts = Parameters<typeof sourceArtifacts>[0] &
			Parameters<typeof applicationArtifacts>[0]
		const selections: readonly (readonly Environment[])[] = [
			[],
			['core'],
			['browser'],
			['server'],
			['core', 'browser'],
			['core', 'server'],
			['core', 'browser', 'server'],
		]
		// The name changes literal values rather than structure; src, app, and showcase are every fact
		// whose closed compiler projection can conditionally change the emitted source inventory.
		const projections: SourceEmissionFacts[] = []
		for (const src of selections) {
			for (const app of selections) {
				if (src.length === 0 && app.length === 0) continue
				projections.push({ name: 'corpus', src, app, showcase: false })
				if (app.includes('browser')) {
					projections.push({ name: 'corpus', src, app, showcase: true })
				}
			}
		}
		const variants = new Map<string, { readonly path: string; readonly content: string }>()
		for (const projection of projections) {
			const { name, ...facts } = projection
			const spec: Blueprint = blueprint(name, facts)
			for (const artifact of blueprintToPlan(spec, ['source']).artifacts) {
				if (artifact.origin === 'host' || !isCodingSourcePath(artifact.path)) continue
				const key = `${artifact.path}\u0000${artifact.content}`
				variants.set(key, { path: artifact.path, content: artifact.content })
			}
		}
		const delegated: string[] = []
		const violations: string[] = []
		for (const source of variants.values()) {
			if (source.path.endsWith('.vue')) delegated.push(source.path)
			else violations.push(...inspectCodingSource(source.path, source.content))
		}

		expect(projections).toHaveLength(69)
		expect(variants.size).toBe(62)
		expect(delegated).toEqual(['app/browser/ApplicationView.vue'])
		expect(violations).toEqual([])
	})
})

describe('fleet policy purity', () => {
	it('derives the upper-snake and Pascal spellings of a package short name', () => {
		expect(derivePolicyTokens('@orkestrel/mcp')).toEqual(['MCP', 'Mcp'])
		expect(derivePolicyTokens('@orkestrel/my-router')).toEqual(['MY_ROUTER', 'MyRouter'])
		expect(derivePolicyTokens('router')).toEqual(['ROUTER', 'Router'])
	})

	it('dedupes colliding spellings and derives nothing from a nameless short name', () => {
		expect(derivePolicyTokens('@orkestrel/X')).toEqual(['X'])
		expect(derivePolicyTokens('@orkestrel/')).toEqual([])
	})

	it('reads the declared package name from a workspace manifest', () => {
		expect(readPackageName(WORKSPACE_ROOT)).toBe('@orkestrel/scaffold')
	})

	it('rejects a manifest that declares no name', async () => {
		const directory = await buildTempDirectory()
		try {
			writeFileSync(join(directory.path, 'package.json'), '{ "version": "0.0.0" }\n', 'utf8')

			expect(() => readPackageName(directory.path)).toThrow(/declares no name/u)
		} finally {
			await directory.cleanup()
		}
	})

	it('reports a package token and a prefixed environment literal in position order', () => {
		const content = [
			'export const MCP_PATHS = []',
			"export const path = 'src/browser/index.ts'",
			'',
		].join('\n')

		expect(inspectPolicyPurity('tests/setupPolicy.ts', content, ['MCP', 'Mcp'])).toEqual([
			'tests/setupPolicy.ts:1:14 forbids the MCP package token',
			'tests/setupPolicy.ts:2:21 forbids a source-environment path literal',
		])
	})

	it('reads a prefixed environment path out of every template literal part', () => {
		const content = [
			'const head = `src/core/${suffix}`',
			'const tail = `${prefix}src/server/index.ts`',
			'const bare = `src/browser/index.ts`',
			'',
		].join('\n')

		expect(inspectPolicyPurity('tests/setupPolicy.ts', content, [])).toEqual([
			'tests/setupPolicy.ts:1:14 forbids a source-environment path literal',
			'tests/setupPolicy.ts:2:23 forbids a source-environment path literal',
			'tests/setupPolicy.ts:3:14 forbids a source-environment path literal',
		])
	})

	it('matches tokens case-sensitively and accepts an unprefixed environment path', () => {
		const content = [
			"export const FOLDERS = ['app/browser/composables']",
			"export const prefix = 'src/'",
			'export const mcpValue = 0',
			'',
		].join('\n')

		expect(inspectPolicyPurity('tests/setupPolicy.ts', content, ['MCP', 'Mcp'])).toEqual([])
	})

	it('clears a package the policy files merely contain and still reports one they are named for', () => {
		const tokens = derivePolicyTokens('@orkestrel/contract')
		const planted = ['export const CONTRACT_PATH = []', ''].join('\n')
		const violations = POLICY_INFRASTRUCTURE_FILES.flatMap((path) =>
			inspectPolicyPurity(path, readFileSync(join(WORKSPACE_ROOT, path), 'utf8'), tokens),
		)

		expect(tokens).toEqual(['CONTRACT', 'Contract'])
		expect(violations).toEqual([])
		expect(inspectPolicyPurity('tests/setupPolicy.ts', planted, tokens)).toEqual([
			'tests/setupPolicy.ts:1:14 forbids the CONTRACT package token',
		])
	})

	it('sweeps both fleet policy files against the tokens its manifest derives', async () => {
		const directory = await buildTempDirectory()
		try {
			mkdirSync(join(directory.path, 'tests'), { recursive: true })
			writeFileSync(
				join(directory.path, 'package.json'),
				'{ "name": "@orkestrel/widget" }\n',
				'utf8',
			)
			writeFileSync(
				join(directory.path, 'tests', 'policy.test.ts'),
				'export const WIDGET_PATH = []\n',
				'utf8',
			)
			writeFileSync(
				join(directory.path, 'tests', 'setupPolicy.ts'),
				"export const path = 'src/core/index.ts'\n",
				'utf8',
			)

			expect(POLICY_INFRASTRUCTURE_FILES).toEqual(['tests/policy.test.ts', 'tests/setupPolicy.ts'])
			expect(inspectPolicyWorkspace(directory.path)).toEqual([
				'tests/policy.test.ts:1:14 forbids the WIDGET package token',
				'tests/setupPolicy.ts:1:21 forbids a source-environment path literal',
			])
		} finally {
			await directory.cleanup()
		}
	})

	it('keeps this workspace free of its own package architecture', () => {
		expect(inspectPolicyWorkspace(WORKSPACE_ROOT)).toEqual([])
	})
})
