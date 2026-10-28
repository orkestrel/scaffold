import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { createScratch } from '@orkestrel/test/server'
import {
	MUTATE_BREAK_EDIT,
	MUTATE_CHECK_SCRIPT,
	MUTATE_SCRIPT,
	renderEditFile,
	runSkillScript,
} from '../../../../setupServer.js'
import {
	applyEdits,
	countOccurrences,
	digestBytes,
	digestFile,
	isInside,
	parseEdits,
	quote,
	readDrift,
	readMissingFlags,
	readOption,
	readPositionals,
	readStrays,
	readUnknownFlags,
	resolveMutations,
	restoreFiles,
	runCommand,
	runMutated,
	saveOriginals,
	tryRestore,
} from '../../../../../.agents/skills/orkestrel-falsify/scripts/mutate.ts'

describe('mutate.ts', () => {
	it('parses blocks in order and finds a line that opens no complete block', () => {
		const text = renderEditFile([
			{ path: 'a', reason: 'r', before: 'x', after: 'y' },
			{ path: 'b', reason: 'r', before: '```\nfenced\n```', after: '' },
		])
		expect(parseEdits(text)).toStrictEqual([
			{ number: 1, path: 'a', before: 'x', after: 'y' },
			{ number: 2, path: 'b', before: '```\nfenced\n```', after: '' },
		])
		expect(readStrays(text)).toStrictEqual([])
		expect(readStrays(`${text}\nold:\n`)).toStrictEqual(['old:'])
		expect(parseEdits('nothing')).toStrictEqual([])
	})

	it('applies a file’s edits in order, counts overlapping places, and names each edit that cannot apply', () => {
		expect(countOccurrences('aaa', 'aa')).toBe(2)
		expect(countOccurrences('a', '')).toBe(0)
		expect(countOccurrences('a.b', '.')).toBe(1)
		const edits = parseEdits(
			renderEditFile([
				{ path: 'f', reason: 'r', before: 'one', after: 'two' },
				{ path: 'f', reason: 'r', before: 'two', after: 'three' },
				{ path: 'f', reason: 'r', before: 'x', after: 'y' },
			]),
		)
		expect(applyEdits('one x x', edits)).toStrictEqual({
			text: 'three x x',
			problems: ['#3 f: old text occurs 2 times'],
		})
	})

	it('reads flags, positionals, containment, digests, and quotes at their edges', () => {
		expect(readOption(['--edits', 'e.md'], '--edits')).toBe('e.md')
		expect(readOption(['--edits', '--x'], '--edits')).toBeUndefined()
		expect(readMissingFlags(['--edits'], ['--edits'])).toStrictEqual(['--edits'])
		expect(
			readUnknownFlags(['--edits', 'e', '--bad', '--e=1', '--', '--after'], ['--edits']),
		).toStrictEqual(['--bad', '--e=1'])
		expect(readPositionals(['--edits', 'e.md', 'extra'], ['--edits'])).toStrictEqual(['extra'])
		expect(isInside('/root', '/root/a')).toBe(true)
		expect(isInside('/root', '/root')).toBe(false)
		expect(isInside('/root', '/other')).toBe(false)
		expect(digestBytes(Buffer.from('abc'))).toBe(
			'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
		)
		expect(quote('x'.repeat(90))).toBe(`"${'x'.repeat(80)}…"`)
	})

	it('resolves every edit before any write and names a missing file, an escaping path, and an ambiguous text', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-resolve-' })
		try {
			scratch.write('a.txt', 'alpha beta')
			scratch.write('b.txt', 'dup dup')
			const good = resolveMutations(
				scratch.path,
				parseEdits(
					renderEditFile([
						{ path: 'a.txt', reason: 'r', before: 'alpha', after: 'A' },
						{ path: 'a.txt', reason: 'r', before: 'beta', after: 'B' },
					]),
				),
			)
			expect(good.problems).toStrictEqual([])
			expect(good.mutations).toHaveLength(1)
			expect(good.mutations[0]?.mutated).toBe('A B')
			expect(good.mutations[0]?.original.toString('utf8')).toBe('alpha beta')
			const bad = resolveMutations(
				scratch.path,
				parseEdits(
					renderEditFile([
						{ path: 'a.txt', reason: 'r', before: 'alpha', after: 'A' },
						{ path: 'b.txt', reason: 'r', before: 'dup', after: 'x' },
						{ path: 'none.txt', reason: 'r', before: 'x', after: 'y' },
						{ path: '../outside.txt', reason: 'r', before: 'x', after: 'y' },
					]),
				),
			)
			expect(bad.problems).toStrictEqual([
				'#2 b.txt: old text occurs 2 times',
				'none.txt: no such file',
				'../outside.txt: path leaves the working directory',
			])
			expect(bad.mutations.map((mutation) => mutation.path)).toStrictEqual(['a.txt'])
			expect(scratch.read('a.txt')).toBe('alpha beta')
		} finally {
			scratch.destroy()
		}
	})

	it('saves the original bytes with a manifest, proves a restore by digest, and names a file that drifted', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-restore-' })
		try {
			scratch.write('a.txt', 'one')
			scratch.write('b.txt', 'two')
			const { mutations } = resolveMutations(
				scratch.path,
				parseEdits(
					renderEditFile([
						{ path: 'a.txt', reason: 'r', before: 'one', after: '1' },
						{ path: 'b.txt', reason: 'r', before: 'two', after: '2' },
					]),
				),
			)
			const directory = saveOriginals(scratch.path, mutations)
			expect(scratch.names(directory)).toStrictEqual(['0.bak', '1.bak', 'manifest.json'])
			expect(scratch.read(join(directory, '1.bak'))).toBe('two')
			expect(scratch.read(join(directory, 'manifest.json'))).toContain(
				digestBytes(Buffer.from('one')),
			)
			expect(readDrift(scratch.path, mutations)).toStrictEqual([])
			scratch.write('a.txt', 'changed')
			scratch.remove('b.txt')
			expect(readDrift(scratch.path, mutations)).toStrictEqual(['a.txt', 'b.txt'])
			expect(tryRestore(scratch.path, mutations)).toBeUndefined()
			expect(readDrift(scratch.path, mutations)).toStrictEqual([])
			expect(scratch.read('b.txt')).toBe('two')
			scratch.write('a.txt', 'again')
			restoreFiles(scratch.path, mutations)
			expect(scratch.read('a.txt')).toBe('one')
			expect(digestFile(join(scratch.path, 'a.txt'))).toBe(digestBytes(Buffer.from('one')))
			expect(digestFile(join(scratch.path, 'gone.txt'))).toBeUndefined()
			expect(digestFile(scratch.path)).toBeUndefined()
		} finally {
			scratch.destroy()
		}
	})

	it('runs a command with no shell and reports a refused write or a missing command as a run that never exited', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-run-' })
		try {
			expect(runCommand(process.execPath, ['-e', 'process.exit(4)'])).toStrictEqual({
				exit: 4,
				error: undefined,
			})
			expect(runCommand(process.execPath, ['-e', '0']).exit).toBe(0)
			const missing = runCommand('orkestrel-no-such-command', [])
			expect(missing.exit).toBeUndefined()
			expect(missing.error).toContain('ENOENT')
			scratch.write('a.txt', 'one')
			const { mutations } = resolveMutations(
				scratch.path,
				parseEdits(renderEditFile([{ path: 'a.txt', reason: 'r', before: 'one', after: '1' }])),
			)
			scratch.remove('a.txt')
			scratch.ensure('a.txt')
			const refused = runMutated(scratch.path, mutations, process.execPath, ['-e', '0'])
			expect(refused.exit).toBeUndefined()
			expect(refused.error).toBeDefined()
		} finally {
			scratch.destroy()
		}
	})

	it('fails the mutated run, passes the restored run, restores the bytes, and prints both exits as one JSON line', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-ok-' })
		try {
			scratch.write('target.txt', 'GOOD\n')
			scratch.write('check.cjs', MUTATE_CHECK_SCRIPT)
			scratch.write('edits.md', MUTATE_BREAK_EDIT)
			const run = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'edits.md', '--', process.execPath, 'check.cjs', '--verbose'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(0)
			expect(run.json).toStrictEqual({
				edits: 1,
				files: [{ path: 'target.txt', digest: digestBytes(Buffer.from('GOOD\n')) }],
				mutatedExit: 1,
				restoredExit: 0,
				restored: true,
			})
			expect(scratch.read('target.txt')).toBe('GOOD\n')
			expect(scratch.read('runs.txt')).toBe('xx')
			expect(run.stderr).toContain('child-ran --verbose')
			expect(run.stderr).toContain('originals saved under')
			expect(scratch.names('tmp/probes/mutate')).toStrictEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('exits 3 when the mutation survives or the restored run fails', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-three-' })
		try {
			scratch.write('target.txt', 'GOOD\n')
			scratch.write('pass.cjs', "console.log('pass')")
			scratch.write('fail.cjs', 'process.exit(1)')
			scratch.write('edits.md', MUTATE_BREAK_EDIT)
			const survived = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'edits.md', '--', process.execPath, 'pass.cjs'],
				{ cwd: scratch.path },
			)
			expect(survived.status).toBe(3)
			expect(survived.json).toMatchObject({ mutatedExit: 0, restoredExit: 0, restored: true })
			const broken = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'edits.md', '--', process.execPath, 'fail.cjs'],
				{ cwd: scratch.path },
			)
			expect(broken.status).toBe(3)
			expect(broken.json).toMatchObject({ mutatedExit: 1, restoredExit: 1 })
			expect(scratch.read('target.txt')).toBe('GOOD\n')
		} finally {
			scratch.destroy()
		}
	})

	it('touches no file and runs no command when an edit does not resolve, exiting 64', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-unresolved-' })
		try {
			scratch.write('target.txt', 'GOOD\n')
			scratch.write('check.cjs', MUTATE_CHECK_SCRIPT)
			scratch.write(
				'edits.md',
				renderEditFile([{ path: 'target.txt', reason: 'r', before: 'NOPE', after: 'x' }]),
			)
			const run = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'edits.md', '--', process.execPath, 'check.cjs'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(64)
			expect(run.stderr).toContain('no file was touched and no command ran')
			expect(run.stderr).toContain('#1 target.txt: old text occurs 0 times')
			expect(scratch.has('runs.txt')).toBe(false)
			expect(scratch.has('tmp')).toBe(false)
			expect(scratch.read('target.txt')).toBe('GOOD\n')
		} finally {
			scratch.destroy()
		}
	})

	it('restores the file and exits 2 when the command cannot start', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-spawn-' })
		try {
			scratch.write('target.txt', 'GOOD\n')
			scratch.write('edits.md', MUTATE_BREAK_EDIT)
			const run = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'edits.md', '--', 'orkestrel-no-such-command'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('the command did not exit')
			expect(scratch.read('target.txt')).toBe('GOOD\n')
			expect(scratch.names('tmp/probes/mutate')).toStrictEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('exits 2 and keeps the saved originals when a restore cannot be written', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-drift-' })
		try {
			scratch.write('target.txt', 'GOOD\n')
			scratch.write(
				'swap.cjs',
				"const fs = require('node:fs')\nfs.rmSync('target.txt')\nfs.mkdirSync('target.txt')",
			)
			scratch.write('edits.md', MUTATE_BREAK_EDIT)
			const run = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'edits.md', '--', process.execPath, 'swap.cjs'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('restore not proven for target.txt')
			const [kept] = scratch.names('tmp/probes/mutate')
			expect(kept).toMatch(/^run-/u)
			expect(scratch.read(join('tmp/probes/mutate', kept ?? '', '0.bak'))).toBe('GOOD\n')
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a missing edit file, a missing command, a stray positional, and an edit file with no block with exit 64', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-usage-' })
		try {
			scratch.write('target.txt', 'GOOD\n')
			scratch.write('edits.md', MUTATE_BREAK_EDIT)
			scratch.write('stray.md', `${MUTATE_BREAK_EDIT}\n### b\nreason: half a block\n`)
			scratch.write('empty.md', 'nothing\n')
			const cwd = { cwd: scratch.path }
			const node = process.execPath
			expect(runSkillScript(MUTATE_SCRIPT, [], cwd).status).toBe(64)
			expect(runSkillScript(MUTATE_SCRIPT, ['--edits', 'edits.md'], cwd).status).toBe(64)
			expect(runSkillScript(MUTATE_SCRIPT, ['--edits', 'edits.md', '--'], cwd).status).toBe(64)
			expect(runSkillScript(MUTATE_SCRIPT, ['--', node, '-e', '0'], cwd).status).toBe(64)
			expect(
				runSkillScript(MUTATE_SCRIPT, ['--edits', 'edits.md', 'extra', '--', node, '-e', '0'], cwd)
					.status,
			).toBe(64)
			const gone = runSkillScript(MUTATE_SCRIPT, ['--edits', 'gone.md', '--', node, '-e', '0'], cwd)
			expect(gone.status).toBe(64)
			expect(gone.stderr).toContain('"gone.md"')
			const stray = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'stray.md', '--', node, '-e', '0'],
				cwd,
			)
			expect(stray.status).toBe(64)
			expect(stray.stderr).toContain('"### b"')
			const empty = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'empty.md', '--', node, '-e', '0'],
				cwd,
			)
			expect(empty.status).toBe(64)
			expect(empty.stderr).toContain('no complete edit block')
			expect(scratch.read('target.txt')).toBe('GOOD\n')
		} finally {
			scratch.destroy()
		}
	})

	it('refuses an unknown flag and the --flag=value form before the bare --, and passes a flag after it on', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-flags-' })
		try {
			scratch.write('target.txt', 'GOOD\n')
			scratch.write('edits.md', MUTATE_BREAK_EDIT)
			const cwd = { cwd: scratch.path }
			const node = process.execPath
			const unknown = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'edits.md', '--no-such-flag', '--', node, '-e', '0'],
				cwd,
			)
			expect(unknown.status).toBe(64)
			expect(unknown.stderr).toContain('--no-such-flag')
			const joined = runSkillScript(MUTATE_SCRIPT, ['--edits=edits.md', '--', node, '-e', '0'], cwd)
			expect(joined.status).toBe(64)
			expect(joined.stderr).toContain('--edits=edits.md')
			const bare = runSkillScript(MUTATE_SCRIPT, ['--edits', '--', node, '-e', '0'], cwd)
			expect(bare.status).toBe(64)
			expect(bare.stderr).toContain('--edits given with no value')
			const passed = runSkillScript(
				MUTATE_SCRIPT,
				[
					'--edits',
					'edits.md',
					'--',
					node,
					'-e',
					'process.exit(process.argv.includes("--after") ? 0 : 9)',
					'--',
					'--after',
				],
				cwd,
			)
			expect(passed.json).toMatchObject({ mutatedExit: 0, restoredExit: 0 })
			expect(scratch.read('target.txt')).toBe('GOOD\n')
		} finally {
			scratch.destroy()
		}
	})
})
