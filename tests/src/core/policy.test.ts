import { globSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseJSON } from '@orkestrel/contract'
import { describe, expect, it } from 'vitest'
import { isBrowserVuePath, readRecord } from '../../setup.js'
import {
	inspectCodingLaw,
	inspectCodingWorkspace,
	inspectVueCodingLaw,
	normalizePolicyPath,
} from '../../setupPolicy.js'
import { WORKSPACE_ROOT } from '../../setupServer.js'

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

	it('requires approval for every Bash command and denies sensitive file families', () => {
		const settings = readRecord(
			parseJSON(readFileSync(join(WORKSPACE_ROOT, '.claude', 'settings.json'), 'utf8')),
		)
		const permissions = readRecord(settings.permissions)

		expect(permissions.allow).toBeUndefined()
		expect(permissions.ask).toEqual(['Bash'])
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
			['src/core/random.ts', 'export const BAD = 1\n'],
			['app/browser/main.ts', 'export function hidden() { return 1 }\n'],
			['src/core/constants.ts', 'export function misplaced() { return 1 }\n'],
			['src/core/helpers.ts', 'export const MISPLACED = 1\n'],
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
