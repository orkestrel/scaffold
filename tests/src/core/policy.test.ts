import { globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseJSON } from '@orkestrel/contract'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'
import { isBrowserVuePath, readRecord } from '../../setup.js'
import {
	inspectCodingLaw,
	inspectCodingWorkspace,
	inspectVueCodingLaw,
	isSelfContained,
	normalizePolicyPath,
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

	it('requires approval for every Bash command and denies sensitive file families', () => {
		const settings = readRecord(
			parseJSON(readFileSync(join(WORKSPACE_ROOT, '.claude', 'settings.json'), 'utf8')),
		)
		const permissions = readRecord(settings.permissions)

		expect(permissions.allow).toBeUndefined()
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
})
