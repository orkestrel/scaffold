import { describe, expect, it } from 'vitest'
import { executeSync } from '@orkestrel/process/server'
import { MAX_MANIFEST_BYTES, ScaffoldError } from '@src/core'
import { MAX_INVENTORY_PATHS } from '@src/server'
import { createScratch } from '@orkestrel/test/server'

import { GitQuery } from '../../../src/bin/GitQuery.js'
import { SCRATCH_PREFIX, WORKSPACE_ROOT } from '../../setupServer.js'

describe('GitQuery', () => {
	describe('read', () => {
		it('answers the records git wrote for this repository', async () => {
			const records = await new GitQuery(WORKSPACE_ROOT, ['ls-files', '-z']).read()
			expect(records).toContain('package.json')
			expect(records.every((record) => record.length > 0)).toBe(true)
		})

		it('reads complete tracked and dirty inventories beyond the manifest byte limit', async () => {
			const workspace = createScratch({ prefix: SCRATCH_PREFIX })
			try {
				const repository = workspace.ensure('repository')
				// Each path is three-byte characters throughout, led by one that numbers it, so any chunk
				// boundary the host chooses inside a path falls inside a UTF-8 sequence. This catches a
				// decoder that drops the split bytes whenever the host splits a sequence, and it cannot
				// force one: `GitQuery.#collect` records that gap.
				const paths = Array.from(
					{ length: Math.floor(MAX_INVENTORY_PATHS / 5) },
					(_, index) => `${String.fromCodePoint(0x4e00 + index)}${'日本語'.repeat(8)}`,
				)
				expect(
					paths.every((path) => new TextEncoder().encode(path).byteLength === 3 * path.length),
				).toBe(true)
				// Every path is the same width, so the cumulative record bytes first pass the manifest
				// limit at the path whose index is the limit divided by one record's bytes.
				const each = new TextEncoder().encode(`${paths[0]}\0`).byteLength
				const boundary = paths[Math.floor(MAX_MANIFEST_BYTES / each)]
				expect(each * paths.length).toBeGreaterThan(MAX_MANIFEST_BYTES)
				expect(boundary).toBeDefined()

				const initialized = executeSync(
					{ file: 'git', arguments: ['-C', repository, 'init', '--quiet'] },
					{ strict: false },
				)
				expect(initialized.failed).toBe(false)
				const hashed = executeSync(
					{ file: 'git', arguments: ['-C', repository, 'hash-object', '-w', '--stdin'] },
					{ input: 'inventory fixture\n', strict: false },
				)
				expect(hashed.failed).toBe(false)
				const digest = hashed.stdout.trim()
				const indexed = executeSync(
					{ file: 'git', arguments: ['-C', repository, 'update-index', '-z', '--index-info'] },
					{
						input: paths.map((path) => `100644 ${digest}\t${path}\0`).join(''),
						strict: false,
					},
				)
				expect(indexed.failed).toBe(false)

				const tracked = await new GitQuery(repository, ['ls-files', '-z']).read()
				expect(tracked).toStrictEqual(paths)
				expect(tracked).toContain(boundary)
				const dirty = await new GitQuery(repository, [
					'status',
					'--porcelain=v1',
					'--untracked-files=all',
					'-z',
				]).read()
				expect(dirty).toStrictEqual(paths.map((path) => `AD ${path}`))
				expect(dirty).toContain(`AD ${boundary}`)
			} finally {
				workspace.destroy()
			}
		})

		it('preserves a leading BOM in the first tracked filename', async () => {
			const workspace = createScratch({ prefix: SCRATCH_PREFIX })
			try {
				const repository = workspace.ensure('repository')
				const path = '﻿leading.txt'
				const initialized = executeSync(
					{ file: 'git', arguments: ['-C', repository, 'init', '--quiet'] },
					{ strict: false },
				)
				expect(initialized.failed).toBe(false)
				const hashed = executeSync(
					{ file: 'git', arguments: ['-C', repository, 'hash-object', '-w', '--stdin'] },
					{ input: 'bom fixture\n', strict: false },
				)
				expect(hashed.failed).toBe(false)
				const indexed = executeSync(
					{ file: 'git', arguments: ['-C', repository, 'update-index', '-z', '--index-info'] },
					{ input: `100644 ${hashed.stdout.trim()}\t${path}\0`, strict: false },
				)
				expect(indexed.failed).toBe(false)

				await expect(new GitQuery(repository, ['ls-files', '-z']).read()).resolves.toStrictEqual([
					path,
				])
			} finally {
				workspace.destroy()
			}
		})

		it('refuses a directory that is not a git repository', async () => {
			const workspace = createScratch({ prefix: SCRATCH_PREFIX })
			try {
				await expect(new GitQuery(workspace.path, ['ls-files', '-z']).read()).rejects.toThrow(
					ScaffoldError,
				)
			} finally {
				workspace.destroy()
			}
		})

		it('reports a failed git query without diagnosing the repository', async () => {
			const workspace = createScratch({ prefix: SCRATCH_PREFIX })
			try {
				const initialized = executeSync(
					{ file: 'git', arguments: ['-C', workspace.path, 'init', '--quiet'] },
					{ strict: false },
				)
				expect(initialized.failed).toBe(false)
				await expect(
					new GitQuery(workspace.path, ['unknown-scaffold-query']).read(),
				).rejects.toMatchObject({
					code: 'TARGET',
					message: expect.stringContaining('git query'),
				})
			} finally {
				workspace.destroy()
			}
		})

		it('refuses a successful git query whose final record has no NUL terminator', async () => {
			await expect(
				new GitQuery(WORKSPACE_ROOT, ['rev-parse', '--show-toplevel']).read(),
			).rejects.toMatchObject({
				code: 'TARGET',
				message: expect.stringContaining('incomplete record'),
			})
		})

		it('refuses a second read, because a query exists for one run', async () => {
			const query = new GitQuery(WORKSPACE_ROOT, ['ls-files', '-z'])
			expect(await query.read()).toContain('package.json')
			await expect(query.read()).rejects.toMatchObject({
				code: 'INVALID',
				message: 'A git query reads once.',
			})
		})
	})
})
