import { describe, expect, it } from 'vitest'
import {
	containedPath,
	environmentPathError,
	environmentSourceError,
	resolveWorkspacePath,
	workspacePath,
	enforceOutputPath,
} from '../../vite.config.js'

describe('root Vite configuration', () => {
	it('keeps workspace paths physically contained', () => {
		const root = resolveWorkspacePath('.')
		const source = resolveWorkspacePath('src')
		const parent = resolveWorkspacePath('..')

		expect(workspacePath(root)).toBe('')
		expect(workspacePath(source)).toBe('src')
		expect(workspacePath(parent)).toBeUndefined()
		expect(containedPath(root, source)).toBe(true)
		expect(containedPath(root, parent)).toBe(false)
	})

	it('enforces environment direction for paths and module sources', () => {
		expect(environmentPathError('src/core', 'app/core/index.ts')).toBe(
			'Published modules cannot depend on private application modules',
		)
		expect(environmentPathError('app/core', 'src/browser/index.ts')).toBe(
			'Core modules must remain host-independent',
		)
		expect(environmentPathError('app/browser', 'src/server/index.ts')).toBe(
			'Browser modules cannot depend on Node or server-only modules',
		)
		expect(environmentPathError('app/server', 'src/browser/index.ts')).toBe(
			'Server modules cannot depend on Vue or browser-only modules',
		)
		expect(environmentPathError('app/browser', 'src/core/index.ts')).toBeUndefined()
		expect(environmentSourceError('src/core', 'node:path')).toBe(
			'Core modules must remain host-independent',
		)
		expect(environmentSourceError('app/server', 'vue')).toBe(
			'Server modules cannot depend on Vue or browser-only modules',
		)
		expect(environmentSourceError('app/browser', '@app/core')).toBeUndefined()
	})

	it('contains build output in its exact workspace directory', () => {
		const expected = resolveWorkspacePath('dist/config-proof')

		expect(() => enforceOutputPath(expected, expected)).not.toThrow()
		expect(() => enforceOutputPath(resolveWorkspacePath('dist/other'), expected)).toThrow(
			'exact configured workspace directory',
		)
		expect(() =>
			enforceOutputPath(
				resolveWorkspacePath('../config-proof'),
				resolveWorkspacePath('../config-proof'),
			),
		).toThrow('remain inside the workspace')
	})
})
