import type { AuditResult } from '../../../src/bin/types.js'
import { describe, expect, it } from 'vitest'
import { execute } from '@orkestrel/process/server'
import { spawn, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { EXIT_CLEAN, EXIT_DRIFT } from '../../../src/bin/constants.js'
import { BASE_DEV_DEPENDENCIES, DECLARATION_DEV_DEPENDENCIES } from '@src/core'
import {
	buildPackument,
	createFleet,
	createUpstreamServer,
	createWorkspace,
	WORKSPACE_ROOT,
} from '../../setupServer.js'

describe('scaffold', () => {
	it('exits cleanly when a JSON consumer closes its pipe after ten bytes', async () => {
		const control = spawnSync(
			process.execPath,
			['--input-type=module', '--eval', "throw new Error('closed-pipe-control')"],
			{ encoding: 'utf8', windowsHide: true },
		)
		expect(control.status).toBe(1)
		expect(control.stderr).toContain('closed-pipe-control')

		const child = spawn(process.execPath, [resolve(WORKSPACE_ROOT, 'dist/bin/main.js'), '--help'], {
			stdio: ['ignore', 'pipe', 'pipe'],
			windowsHide: true,
		})
		let output = ''
		let diagnostic = ''
		child.stdout.setEncoding('utf8')
		child.stderr.setEncoding('utf8')
		child.stdout.on('data', (chunk: string) => {
			if (output.length >= 10) return
			output += chunk.slice(0, 10 - output.length)
			if (output.length === 10) child.stdout.destroy()
		})
		child.stderr.on('data', (chunk: string) => {
			diagnostic += chunk
		})
		const code = await new Promise<number | null>((resolveCode, reject) => {
			child.once('error', reject)
			child.once('close', resolveCode)
		})
		expect(output).toHaveLength(10)
		expect(diagnostic).not.toContain('Unhandled')
		expect(diagnostic).not.toContain('node:events')
		expect(code).toBe(EXIT_CLEAN)
	})

	// The entry is imported once, because importing a module runs it once. The
	// runner's own arguments are not a command, so an entry that ignored
	// `process.argv` would answer with the usage code instead, and an entry that
	// dropped the returned code would leave `process.exitCode` as it found it.
	it('reads the arguments the process was given and assigns the code the run returned', async () => {
		const argv = process.argv
		const before = process.exitCode
		try {
			process.argv = [argv[0] ?? 'node', 'scaffold', '--help']
			await import('../../../src/bin/main.js')
			expect(process.exitCode).toBe(EXIT_CLEAN)
		} finally {
			process.argv = argv
			process.exitCode = before
		}
	})

	it('routes the configured npm registry through the process entry', async () => {
		const workspace = createWorkspace()
		const registry = await createUpstreamServer({
			'/@orkestrel%2Femitter': { status: 200, body: buildPackument('0.0.6') },
			'/@orkestrel%2Fguide': { status: 200, body: buildPackument('0.0.9') },
			'/@orkestrel%2Fprobe': { status: 200, body: buildPackument('0.0.2') },
			'/@orkestrel%2Fscaffold': { status: 200, body: buildPackument('0.0.48') },
			'/@orkestrel%2Ftest': { status: 200, body: buildPackument('0.0.8') },
			'/@microsoft%2Fapi-extractor': {
				status: 200,
				body: buildPackument(
					DECLARATION_DEV_DEPENDENCIES['@microsoft/api-extractor']?.slice(1) ?? '',
				),
			},
			'/@types%2Fnode': {
				status: 200,
				body: buildPackument(BASE_DEV_DEPENDENCIES['@types/node']?.slice(1) ?? ''),
			},
			'/oxfmt': {
				status: 200,
				body: buildPackument(BASE_DEV_DEPENDENCIES.oxfmt?.slice(1) ?? ''),
			},
			'/oxlint': {
				status: 200,
				body: buildPackument(BASE_DEV_DEPENDENCIES.oxlint?.slice(1) ?? ''),
			},
			'/typescript': {
				status: 200,
				body: buildPackument(BASE_DEV_DEPENDENCIES.typescript?.slice(1) ?? ''),
			},
			'/vite': {
				status: 200,
				body: JSON.stringify({
					'dist-tags': { latest: '9.0.0' },
					versions: { '8.2.0': {}, '8.2.3': {}, '9.0.0': {} },
				}),
			},
			'/vite-plugin-dts': {
				status: 200,
				body: buildPackument(DECLARATION_DEV_DEPENDENCIES['vite-plugin-dts']?.slice(1) ?? ''),
			},
			'/vitest': {
				status: 200,
				body: buildPackument(BASE_DEV_DEPENDENCIES.vitest?.slice(1) ?? ''),
			},
		})
		const offline = await createUpstreamServer({})
		try {
			const fleet = createFleet(workspace)
			const entry = resolve(WORKSPACE_ROOT, 'dist/bin/main.js')
			const environment = { ORKESTREL_SCAFFOLD_REGISTRY: registry.base }
			const repaired = await execute(
				{
					file: process.execPath,
					arguments: [
						entry,
						'repair',
						'--groups',
						'docs',
						'--from',
						fleet.host,
						'--target',
						fleet.target,
					],
				},
				{ environment, strict: false, timeout: 30_000 },
			)
			expect(repaired.stderr).toBe('')
			expect(repaired.code).toBe(EXIT_CLEAN)
			const manifest = workspace.read('target/package.json')
			expect(manifest).toContain('"@orkestrel/emitter": "^0.0.6"')
			expect(manifest).toContain('"vite": "^8.2.3"')

			const audited = await execute(
				{
					file: process.execPath,
					arguments: [
						entry,
						'audit',
						'--groups',
						'manifest',
						'--from',
						fleet.host,
						'--target',
						fleet.target,
						'--json',
					],
				},
				{ environment, strict: false, timeout: 30_000 },
			)
			expect(audited.code).toBe(EXIT_CLEAN)
			const audit: AuditResult = JSON.parse(audited.stdout)
			expect(audit.questions).toContainEqual({
				field: 'dependencies',
				message: 'vite declares major 8, while the registry serves major 9.',
				blocking: false,
			})
			expect(workspace.read('target/package.json')).toBe(manifest)

			const offlineTarget = workspace.ensure('offline')
			workspace.write('offline/package.json', manifest)
			workspace.ensure('offline/src/core')
			const failed = await execute(
				{
					file: process.execPath,
					arguments: [
						entry,
						'repair',
						'--groups',
						'docs',
						'--from',
						fleet.host,
						'--target',
						offlineTarget,
						'--json',
					],
				},
				{
					environment: { ORKESTREL_SCAFFOLD_REGISTRY: offline.base },
					strict: false,
					timeout: 30_000,
				},
			)
			expect(failed.code).toBe(EXIT_DRIFT)
			expect(JSON.parse(failed.stdout)).toHaveProperty('error.code', 'FETCH')
			expect(workspace.read('offline/package.json')).toBe(manifest)
			expect(existsSync(resolve(offlineTarget, 'AGENTS.md'))).toBe(false)
		} finally {
			await registry.destroy()
			await offline.destroy()
			workspace.destroy()
		}
	})
})
