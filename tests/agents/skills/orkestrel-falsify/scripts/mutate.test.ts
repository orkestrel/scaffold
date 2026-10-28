import { basename, join } from 'node:path'
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
	foldPath,
	isInside,
	isManifestEntry,
	keyEdit,
	parseEdits,
	quote,
	readDrift,
	readLeftovers,
	readManifest,
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
	writeSaved,
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
			const both = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', '--no-such-flag', '--', node, '-e', '0'],
				cwd,
			)
			expect(both.status).toBe(64)
			expect(both.stderr).toContain('--no-such-flag')
			expect(scratch.has('tmp')).toBe(false)
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

	it('folds case only where the host folds it, and names one file once whatever its spelling', () => {
		expect(foldPath('A/B.TS', 'win32')).toBe('a/b.ts')
		expect(foldPath('A/B.TS', 'darwin')).toBe('a/b.ts')
		expect(foldPath('A/B.TS', 'linux')).toBe('A/B.TS')
		const root = join('root', 'dir')
		const [first, second, third] = parseEdits(
			renderEditFile([
				{ path: 'src/a.ts', reason: 'r', before: 'x', after: 'y' },
				{ path: './src/a.ts', reason: 'r', before: 'x', after: 'y' },
				{ path: 'src/b.ts', reason: 'r', before: 'x', after: 'y' },
			]),
		)
		expect(first === undefined ? '' : keyEdit(root, first)).toBe(
			second === undefined ? '-' : keyEdit(root, second),
		)
		expect(first === undefined ? '' : keyEdit(root, first)).not.toBe(
			third === undefined ? '' : keyEdit(root, third),
		)
	})

	it('applies edits that spell one file two ways in order, so an edit to text an earlier edit removed does not resolve', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-spelling-' })
		try {
			scratch.write('src/a.txt', 'alpha')
			scratch.write('check.cjs', MUTATE_CHECK_SCRIPT)
			const aliased = renderEditFile([
				{ path: 'src/a.txt', reason: 'r', before: 'alpha', after: 'beta' },
				{ path: './src/a.txt', reason: 'r', before: 'alpha', after: 'gamma' },
			])
			const refused = resolveMutations(scratch.path, parseEdits(aliased))
			expect(refused.problems).toStrictEqual(['#2 ./src/a.txt: old text occurs 0 times'])
			expect(refused.mutations).toStrictEqual([])
			const chained = resolveMutations(
				scratch.path,
				parseEdits(
					renderEditFile([
						{ path: 'src/a.txt', reason: 'r', before: 'alpha', after: 'beta' },
						{ path: './src/a.txt', reason: 'r', before: 'beta', after: 'gamma' },
					]),
				),
			)
			expect(chained.problems).toStrictEqual([])
			expect(chained.mutations.map((mutation) => [mutation.path, mutation.mutated])).toStrictEqual([
				['src/a.txt', 'gamma'],
			])
			scratch.write('aliased.md', aliased)
			const run = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'aliased.md', '--', process.execPath, 'check.cjs'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(64)
			expect(run.stderr).toContain('#2 ./src/a.txt: old text occurs 0 times')
			expect(scratch.read('src/a.txt')).toBe('alpha')
			expect(scratch.has('runs.txt')).toBe(false)
			expect(scratch.has('tmp')).toBe(false)
		} finally {
			scratch.destroy()
		}
	})

	it('reads the run directories an earlier run left, the manifest they keep, and writes the saved bytes back', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-manifest-' })
		try {
			expect(readLeftovers(scratch.path)).toStrictEqual([])
			scratch.write('tmp/probes/mutate/run-b/manifest.json', '[]')
			scratch.write('tmp/probes/mutate/run-a/manifest.json', '[]')
			scratch.write('tmp/probes/mutate/other/manifest.json', '[]')
			expect(readLeftovers(scratch.path)).toStrictEqual(['run-a', 'run-b'])
			const entry = { path: 'a.txt', backup: '0.bak', digest: 'abc' }
			expect(isManifestEntry(entry)).toBe(true)
			expect(isManifestEntry({ ...entry, backup: 'x/0.bak' })).toBe(false)
			expect(isManifestEntry({ ...entry, backup: '' })).toBe(false)
			expect(isManifestEntry({ path: 'a.txt', backup: '0.bak' })).toBe(false)
			expect(isManifestEntry({ ...entry, path: 1 })).toBe(false)
			expect(isManifestEntry(null)).toBe(false)
			scratch.write('tmp/probes/mutate/run-a/manifest.json', JSON.stringify([entry]))
			expect(readManifest(join(scratch.path, 'tmp/probes/mutate/run-a'))).toStrictEqual([entry])
			scratch.write('tmp/probes/mutate/run-a/manifest.json', JSON.stringify([entry, 'x']))
			expect(readManifest(join(scratch.path, 'tmp/probes/mutate/run-a'))).toBeUndefined()
			scratch.write('tmp/probes/mutate/run-a/manifest.json', '{')
			expect(readManifest(join(scratch.path, 'tmp/probes/mutate/run-a'))).toBeUndefined()
			scratch.write('tmp/probes/mutate/run-a/manifest.json', '{}')
			expect(readManifest(join(scratch.path, 'tmp/probes/mutate/run-a'))).toBeUndefined()
			expect(readManifest(join(scratch.path, 'tmp/probes/mutate/run-none'))).toBeUndefined()
			scratch.write('tmp/probes/mutate/run-a/0.bak', 'saved')
			scratch.write('a.txt', 'changed')
			const directory = join(scratch.path, 'tmp/probes/mutate/run-a')
			expect(writeSaved(scratch.path, directory, [entry])).toBeUndefined()
			expect(scratch.read('a.txt')).toBe('saved')
			scratch.remove('a.txt')
			scratch.ensure('a.txt')
			expect(writeSaved(scratch.path, directory, [entry])).toBeDefined()
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a new run while a run directory remains, names the --restore line, and touches nothing', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-leftover-' })
		try {
			scratch.write('target.txt', 'GOOD\n')
			scratch.write('check.cjs', MUTATE_CHECK_SCRIPT)
			scratch.write('edits.md', MUTATE_BREAK_EDIT)
			scratch.write('tmp/probes/mutate/run-left/manifest.json', '[]')
			const run = runSkillScript(
				MUTATE_SCRIPT,
				['--edits', 'edits.md', '--', process.execPath, 'check.cjs'],
				{ cwd: scratch.path },
			)
			expect(run.status).toBe(64)
			expect(run.stderr).toContain('--restore tmp/probes/mutate/run-left')
			expect(run.stderr).toContain('no file was touched and no command ran')
			expect(scratch.read('target.txt')).toBe('GOOD\n')
			expect(scratch.has('runs.txt')).toBe(false)
			expect(scratch.names('tmp/probes/mutate')).toStrictEqual(['run-left'])
		} finally {
			scratch.destroy()
		}
	})

	it('restores the saved originals of a killed run, proves each digest from the manifest, and deletes the run directory', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-restore-run-' })
		try {
			scratch.write('a.txt', 'one')
			scratch.write('sub/b.txt', 'two')
			const { mutations } = resolveMutations(
				scratch.path,
				parseEdits(
					renderEditFile([
						{ path: 'a.txt', reason: 'r', before: 'one', after: '1' },
						{ path: 'sub/b.txt', reason: 'r', before: 'two', after: '2' },
					]),
				),
			)
			const name = basename(saveOriginals(scratch.path, mutations))
			scratch.write('a.txt', '1')
			scratch.write('sub/b.txt', '2')
			const run = runSkillScript(MUTATE_SCRIPT, ['--restore', `tmp/probes/mutate/${name}`], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(0)
			expect(run.json).toStrictEqual({
				files: [
					{ path: 'a.txt', digest: digestBytes(Buffer.from('one')) },
					{ path: 'sub/b.txt', digest: digestBytes(Buffer.from('two')) },
				],
				restored: true,
			})
			expect(scratch.read('a.txt')).toBe('one')
			expect(scratch.read('sub/b.txt')).toBe('two')
			expect(scratch.names('tmp/probes/mutate')).toStrictEqual([])
		} finally {
			scratch.destroy()
		}
	})

	it('writes nothing and keeps the run directory when a saved file no longer matches the manifest', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-restore-damaged-' })
		try {
			scratch.write('a.txt', 'one')
			const { mutations } = resolveMutations(
				scratch.path,
				parseEdits(renderEditFile([{ path: 'a.txt', reason: 'r', before: 'one', after: '1' }])),
			)
			const name = basename(saveOriginals(scratch.path, mutations))
			scratch.write('a.txt', '1')
			scratch.write(join('tmp/probes/mutate', name, '0.bak'), 'tampered')
			const run = runSkillScript(MUTATE_SCRIPT, ['--restore', `tmp/probes/mutate/${name}`], {
				cwd: scratch.path,
			})
			expect(run.status).toBe(2)
			expect(run.stderr).toContain('a.txt')
			expect(run.stderr).toContain('no longer match')
			expect(scratch.read('a.txt')).toBe('1')
			expect(scratch.names('tmp/probes/mutate')).toStrictEqual([name])
		} finally {
			scratch.destroy()
		}
	})

	it('refuses a --restore that names no run directory, a manifest path that escapes, and a --restore beside a run', () => {
		const scratch = createScratch({ prefix: 'orkestrel-mutate-restore-usage-' })
		try {
			scratch.write('edits.md', MUTATE_BREAK_EDIT)
			scratch.write('tmp/probes/mutate/other/manifest.json', '[]')
			scratch.write('tmp/probes/mutate/run-bare/note.txt', 'no manifest')
			scratch.write(
				'tmp/probes/mutate/run-evil/manifest.json',
				JSON.stringify([{ path: '../escape.txt', backup: '0.bak', digest: 'abc' }]),
			)
			scratch.write('tmp/probes/mutate/run-evil/0.bak', 'x')
			const cwd = { cwd: scratch.path }
			const node = process.execPath
			for (const argument of ['tmp/probes/mutate/run-gone', 'tmp/probes/mutate/other', '..', '.']) {
				const run = runSkillScript(MUTATE_SCRIPT, ['--restore', argument], cwd)
				expect.soft(run.status, argument).toBe(64)
			}
			const bare = runSkillScript(MUTATE_SCRIPT, ['--restore', 'tmp/probes/mutate/run-bare'], cwd)
			expect(bare.status).toBe(64)
			expect(bare.stderr).toContain('holds no readable manifest.json')
			const evil = runSkillScript(MUTATE_SCRIPT, ['--restore', 'tmp/probes/mutate/run-evil'], cwd)
			expect(evil.status).toBe(64)
			expect(evil.stderr).toContain('outside the working directory')
			expect(evil.stderr).toContain('nothing was written')
			const beside = runSkillScript(
				MUTATE_SCRIPT,
				['--restore', 'tmp/probes/mutate/run-evil', '--edits', 'edits.md'],
				cwd,
			)
			expect(beside.status).toBe(64)
			const command = runSkillScript(
				MUTATE_SCRIPT,
				['--restore', 'tmp/probes/mutate/run-evil', '--', node, '-e', '0'],
				cwd,
			)
			expect(command.status).toBe(64)
			const stray = runSkillScript(
				MUTATE_SCRIPT,
				['--restore', 'tmp/probes/mutate/run-evil', 'extra'],
				cwd,
			)
			expect(stray.status).toBe(64)
			const missing = runSkillScript(MUTATE_SCRIPT, ['--restore'], cwd)
			expect(missing.status).toBe(64)
			expect(missing.stderr).toContain('--restore given with no value')
		} finally {
			scratch.destroy()
		}
	})
})
