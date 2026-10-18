import { describe, expect, it } from 'vitest'
import { executeSync } from '@orkestrel/process/server'
import { MAX_MANIFEST_BYTES, MAX_PATH_LENGTH, ScaffoldError } from '@src/core'
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
				const paths = Array.from(
					{ length: Math.floor(MAX_INVENTORY_PATHS / 5) },
					(_, index) => `tracked/${String(index).padStart(5, '0')}-${'inventory'.repeat(6)}.txt`,
				)
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
			expect(query.records).toContain('package.json')
		})
	})

	describe('collect', () => {
		it('collects ordered records across UTF-8 and NUL boundaries and ignores empty records', () => {
			const query = new GitQuery('target', ['ls-files', '-z'])
			const encoder = new TextEncoder()
			query.collect(encoder.encode('alpha\0br'))
			const remainder = encoder.encode('ûlée\0\0omega')
			query.collect(remainder.subarray(0, 1))
			query.collect(remainder.subarray(1))
			query.collect(encoder.encode('\0'))

			expect(query.records).toStrictEqual(['alpha', 'brûlée', 'omega'])
			expect(query.signal.aborted).toBe(false)
		})

		it('refuses the record beyond the inventory boundary and ignores later input', () => {
			const query = new GitQuery('target', ['ls-files', '-z'])
			const encoder = new TextEncoder()
			query.collect(encoder.encode('kept\0'.repeat(MAX_INVENTORY_PATHS - 1)))
			query.collect(encoder.encode('last\0overflow\0'))
			const reason = query.signal.reason
			query.collect(encoder.encode('ignored\0'))

			expect(query.records).toHaveLength(MAX_INVENTORY_PATHS)
			expect(query.records.at(-1)).toBe('last')
			expect(reason).toMatchObject({ code: 'TARGET' })
			expect(query.signal.reason).toBe(reason)
		})

		it('accepts the unfinished-path boundary and refuses the next character', () => {
			const query = new GitQuery('target', ['ls-files', '-z'])
			const encoder = new TextEncoder()
			query.collect(encoder.encode('p'.repeat(MAX_PATH_LENGTH + 3)))
			expect(query.signal.aborted).toBe(false)
			query.collect(encoder.encode('p'))

			expect(query.records).toStrictEqual([])
			expect(query.signal.reason).toMatchObject({ code: 'TARGET' })
		})

		it('keeps the records of a query that has not read', () => {
			const query = new GitQuery('target', ['ls-files', '-z'])
			expect(query.records).toStrictEqual([])
			query.collect(new TextEncoder().encode('one\0'))
			const taken = query.records
			query.collect(new TextEncoder().encode('two\0'))

			expect(taken).toStrictEqual(['one'])
			expect(query.records).toStrictEqual(['one', 'two'])
		})
	})

	describe('refuse', () => {
		it('retains its initial target refusal', () => {
			const query = new GitQuery('target', ['ls-files', '-z'])
			query.refuse('initial refusal')
			const reason = query.signal.reason
			query.refuse('later refusal')

			expect(reason).toMatchObject({
				code: 'TARGET',
				message: 'initial refusal',
				context: { target: 'target' },
			})
			expect(query.signal.reason).toBe(reason)
		})
	})
})
