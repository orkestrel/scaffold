import { describe, expect, it } from 'vitest'
import { spawn, spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import { CATALOG_AGENT_PATH } from '@src/core'
import { EXIT_CLEAN } from '../../../src/bin/constants.js'
import {
	createFleet,
	createStagedHost,
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

		const workspace = createWorkspace()
		try {
			const host = createStagedHost(workspace)
			const target = workspace.directory('fresh')
			const created = spawnSync(
				process.execPath,
				[
					resolve(WORKSPACE_ROOT, 'dist/bin/main.js'),
					'new',
					'widget',
					'--src',
					'core',
					'--from',
					host,
					'--target',
					target,
				],
				{ encoding: 'utf8', windowsHide: true },
			)
			expect(created.status).toBe(EXIT_CLEAN)
			workspace.write(`fresh/${CATALOG_AGENT_PATH}`, 'x'.repeat(262_144))
			const child = spawn(
				process.execPath,
				[
					resolve(WORKSPACE_ROOT, 'dist/bin/main.js'),
					'audit',
					'--from',
					host,
					'--target',
					target,
					'--json',
				],
				{ stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true },
			)
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
		} finally {
			workspace.destroy()
		}
	})

	// The entry is driven once, because importing a module runs it once. One drive
	// is enough: the arguments are chosen so that a clean code can only come from
	// them. The runner's own arguments are not a command, so an entry that ignored
	// `process.argv` would answer with the usage code instead, and an entry that
	// dropped the returned code would leave `process.exitCode` as it found it.
	//
	// `--from` names the vendored host the audit reads through. Without it the
	// materializer takes its default root, which no test workspace has, and the
	// run would earn its clean code only because the `manifest` group carries no
	// host-origin artifact and the absent root is therefore never opened.
	it('reads the arguments the process was given and assigns the code the run returned', async () => {
		const workspace = createWorkspace()
		const argv = process.argv
		const before = process.exitCode
		try {
			const fleet = createFleet(workspace)
			process.argv = [
				argv[0] ?? 'node',
				'scaffold',
				'audit',
				'--groups',
				'manifest',
				'--from',
				fleet.host,
				'--target',
				fleet.target,
			]
			await import('../../../src/bin/main.js')
			expect(process.exitCode).toBe(EXIT_CLEAN)
		} finally {
			process.argv = argv
			process.exitCode = before
			workspace.destroy()
		}
	})
})
