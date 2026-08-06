import { globSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { isBrowserVuePath } from './setup.js'
import { inspectCodingLaw, inspectCodingWorkspace, isFunctionDomainPath } from './setupPolicy.js'

const FUNCTION_MODULE_PATH = 'app/browser/composables/useTheme.ts'
const FUNCTION_MODULE_VIOLATION =
	FUNCTION_MODULE_PATH + ' declarations do not form one matching exported function implementation'
const FUNCTION_DOMAIN_FILE_PATH = 'app/server/composables.ts'
const FUNCTION_DOMAIN_FILE_VIOLATION =
	FUNCTION_DOMAIN_FILE_PATH +
	' names a function domain, which belongs in a folder rather than a file'

describe('repository coding law', () => {
	it('keeps Vue single-file components exclusively in browser environments', () => {
		const files = globSync('{app,src}/**/*.vue')

		expect(files.every(isBrowserVuePath)).toBe(true)
	})

	it('enforces source placement, exports, readonly contracts, and syntax law', () => {
		expect(inspectCodingWorkspace(process.cwd())).toEqual([])
	})

	it('accepts one matching exported function in a registered domain', () => {
		expect(
			inspectCodingLaw(
				FUNCTION_MODULE_PATH,
				"import type { Ref } from 'vue'\nexport function useTheme(): Ref<undefined> { throw new Error() }",
			),
		).toEqual([])
	})

	it('accepts one matching exported generator in a registered domain', () => {
		expect(
			inspectCodingLaw(FUNCTION_MODULE_PATH, 'export function* useTheme(): Generator<void> {}'),
		).toEqual([])
	})

	it('accepts overload signatures beside one matching implementation', () => {
		expect(
			inspectCodingLaw(
				FUNCTION_MODULE_PATH,
				'export function useTheme(): void\nexport function useTheme(mode: string): void\nexport function useTheme(_mode?: string): void {}',
			),
		).toEqual([])
	})

	it('rejects a bodyless function-domain declaration', () => {
		expect(
			inspectCodingLaw(FUNCTION_MODULE_PATH, 'export declare function useTheme(): void'),
		).toEqual([FUNCTION_MODULE_VIOLATION])
	})

	it('rejects a mismatched bodyless declaration beside one implementation', () => {
		expect(
			inspectCodingLaw(
				FUNCTION_MODULE_PATH,
				'declare function smuggled(secret: string): void\nexport function useTheme(): void {}',
			),
		).toEqual([FUNCTION_MODULE_VIOLATION])
	})

	it('rejects two exported functions in a function module', () => {
		expect(
			inspectCodingLaw(
				FUNCTION_MODULE_PATH,
				'export function useTheme(): void {}\nexport function useMode(): void {}',
			),
		).toEqual([FUNCTION_MODULE_VIOLATION])
	})

	it('rejects module data beside a function-domain export', () => {
		expect(
			inspectCodingLaw(
				FUNCTION_MODULE_PATH,
				"const THEME = 'dark'\nexport function useTheme(): string { return THEME }",
			),
		).toEqual([FUNCTION_MODULE_VIOLATION])
	})

	it('rejects a function whose name differs from its filename', () => {
		expect(inspectCodingLaw(FUNCTION_MODULE_PATH, 'export function useMode(): void {}')).toEqual([
			FUNCTION_MODULE_VIOLATION,
		])
	})

	it('rejects a non-exported function-domain declaration', () => {
		expect(inspectCodingLaw(FUNCTION_MODULE_PATH, 'function useTheme(): void {}')).toEqual([
			FUNCTION_MODULE_VIOLATION,
		])
	})

	it('rejects a default function-domain export', () => {
		expect(
			inspectCodingLaw(FUNCTION_MODULE_PATH, 'export default function useTheme(): void {}'),
		).toEqual([FUNCTION_MODULE_VIOLATION])
	})

	it('keeps index modules outside the function-domain shape', () => {
		const path = 'app/browser/composables/index.ts'

		expect(isFunctionDomainPath(path)).toBe(false)
		expect(inspectCodingLaw(path, 'export function index(): void {}')).toContain(
			path + ' places module functions in their centralized kind file',
		)
	})

	it('keeps main modules outside the function-domain shape', () => {
		const path = 'app/browser/composables/main.ts'

		expect(isFunctionDomainPath(path)).toBe(false)
		expect(inspectCodingLaw(path, 'export function main(): void {}')).toContain(
			path + ' places module functions in their centralized kind file',
		)
	})

	it('rejects a file named for a registered function domain', () => {
		const content =
			"import { parentPort } from 'node:worker_threads'\nexport function start(): void { parentPort?.close() }"

		expect(inspectCodingLaw(FUNCTION_DOMAIN_FILE_PATH, content)).toEqual([
			FUNCTION_DOMAIN_FILE_VIOLATION,
		])
	})

	it('keeps camelCase modules in unregistered domains under centralized placement', () => {
		const path = 'app/browser/services/normalizePath.ts'

		expect(isFunctionDomainPath(path)).toBe(false)
		expect(inspectCodingLaw(path, 'export function normalizePath(): void {}')).toEqual([
			path + ' places module functions in their centralized kind file',
		])
	})

	it('preserves the self-contained Node runtime exemption', () => {
		const path = 'app/server/worker.ts'
		const content =
			"import { parentPort } from 'node:worker_threads'\nconst port = parentPort\nexport function start(): void { port?.close() }"

		expect(inspectCodingLaw(path, content)).toEqual([])
	})
})
