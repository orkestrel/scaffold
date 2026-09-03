import {
	chmodSync,
	existsSync,
	lstatSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	renameSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { join } from 'node:path'
import { Worker } from 'node:worker_threads'
import { isScaffoldError } from '@src/core'
import { computeDigest, listFiles, readExpectation, WriteTransaction } from '@src/server'
import { describe, expect, it } from 'vitest'
import { readErrorCode, SCRATCH_PREFIX } from '../../setupServer.js'
import { createScratch, supportsMode } from '@orkestrel/test/server'

describe('WriteTransaction construction', () => {
	it('refuses a target, a path list, and a repeated path that are off contract', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			expect(readErrorCode(() => new WriteTransaction('', ['AGENTS.md']))).toBe('INVALID')
			expect(readErrorCode(() => new WriteTransaction(workspace.path, ['../secrets']))).toBe(
				'INVALID',
			)
			expect(readErrorCode(() => new WriteTransaction(workspace.path, ['a', 'a']))).toBe('INVALID')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a link that leaves the target rather than following it', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const outside = workspace.ensure('outside')
			workspace.ensure('project')
			workspace.link('project/linked', outside)
			const code = readErrorCode(
				() => new WriteTransaction(join(workspace.path, 'project'), ['linked/names.md']),
			)
			// Containment resolves the link and finds the destination outside the
			// target, so the refusal is the path law's rather than the ancestor law's.
			expect(code).toBe('INVALID')
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a link that stays inside the target, which containment alone admits', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			const real = workspace.ensure('project/real')
			workspace.link('project/rules', real)
			// The redirected destination is still inside the target, so containment
			// passes and only the ancestor law can refuse it. That is the whole reason
			// the ancestor law exists at write time.
			expect(readErrorCode(() => new WriteTransaction(target, ['rules/names.md']))).toBe('WRITE')
			expect(readErrorCode(() => new WriteTransaction(target, ['real/names.md']))).toBe(undefined)
		} finally {
			workspace.destroy()
		}
	})

	it('leaves the tree exactly as it found it when it refuses', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			workspace.write('project/AGENTS.md', '# Agents\n')
			const before = readdirSync(workspace.path).sort()
			expect(
				readErrorCode(() => new WriteTransaction(join(workspace.path, 'project'), ['a', 'a'])),
			).toBe('INVALID')
			expect(readdirSync(workspace.path).sort()).toEqual(before)
		} finally {
			workspace.destroy()
		}
	})

	it('refuses a precondition that names no destination and one that no longer holds', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.write('project/AGENTS.md', '# Agents\n')
			const destination = join(target, 'AGENTS.md')
			expect(
				readErrorCode(
					() =>
						new WriteTransaction(target, ['AGENTS.md'], [{ path: 'AGENTS.md', shape: 'absent' }]),
				),
			).toBe('INVALID')
			expect(
				readErrorCode(
					() =>
						new WriteTransaction(target, ['AGENTS.md'], [{ path: destination, shape: 'absent' }]),
				),
			).toBe('TARGET')
			expect(
				readErrorCode(
					() =>
						new WriteTransaction(
							target,
							['AGENTS.md'],
							[{ path: destination, shape: 'file', digest: computeDigest('# Moved\n') }],
						),
				),
			).toBe('TARGET')
		} finally {
			workspace.destroy()
		}
	})

	it('accepts a precondition that still holds and closes cleanly', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.write('project/AGENTS.md', '# Agents\n')
			const transaction = new WriteTransaction(
				target,
				['AGENTS.md'],
				[
					{
						path: join(target, 'AGENTS.md'),
						shape: 'file',
						digest: computeDigest('# Agents\n'),
					},
				],
			)
			expect(transaction.open).toBe(true)
			expect(transaction.target).toBe(target)
			expect(transaction.expectations.map((expectation) => expectation.shape)).toEqual(['file'])
			transaction.discard()
			expect(transaction.open).toBe(false)
			expect(readdirSync(workspace.path)).toEqual(['project'])
		} finally {
			workspace.destroy()
		}
	})
})

describe('WriteTransaction staging', () => {
	it('writes nothing into the target until the commit lands', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = join(workspace.path, 'project')
			const transaction = new WriteTransaction(target, ['AGENTS.md'])
			try {
				transaction.write('AGENTS.md', '# Agents\n')
				expect(readExpectation(join(target, 'AGENTS.md'))?.shape).toBe('absent')
				expect(transaction.commit()).toEqual(['AGENTS.md'])
				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('# Agents\n')
			} finally {
				transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('refuses an unopened path, a second claim, and a directory destination', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.ensure('project/rules')
			const transaction = new WriteTransaction(target, ['AGENTS.md', 'rules'])
			try {
				expect(readErrorCode(() => transaction.write('LICENSE', 'MIT\n'))).toBe('INVALID')
				transaction.write('AGENTS.md', '# Agents\n')
				expect(readErrorCode(() => transaction.write('AGENTS.md', '# Again\n'))).toBe('INVALID')
				expect(readErrorCode(() => transaction.write('rules', 'not a directory'))).toBe('TARGET')
			} finally {
				transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('copies exact bytes and refuses a source that is not a physical file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = join(workspace.path, 'project')
			const source = workspace.write('host/codex.sh', '#!/bin/sh\necho hi\n')
			const transaction = new WriteTransaction(target, ['scripts/codex.sh', 'missing.md'])
			try {
				expect(
					readErrorCode(() =>
						transaction.copy('missing.md', join(workspace.path, 'host/absent.md'), false),
					),
				).toBe('TARGET')
				transaction.copy('scripts/codex.sh', source, false)
				expect(transaction.commit()).toEqual(['scripts/codex.sh'])
				expect(readFileSync(join(target, 'scripts/codex.sh'), 'utf8')).toBe('#!/bin/sh\necho hi\n')
			} finally {
				transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})

	// Skipped where `supportsMode` reports that a written mode does not round-trip
	// through `stat`, because a host that cannot store the bit cannot distinguish
	// a set bit from an unset one and the assertion would measure the host.
	it.skipIf(!supportsMode())('sets the executable bit when asked', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = join(workspace.path, 'project')
			const source = workspace.write('host/codex.sh', '#!/bin/sh\n')
			const transaction = new WriteTransaction(target, ['scripts/codex.sh'])
			try {
				transaction.copy('scripts/codex.sh', source, true)
				transaction.commit()
				expect(lstatSync(join(target, 'scripts/codex.sh')).mode & 0o111).not.toBe(0)
			} finally {
				transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})

	// Skipped where `supportsMode` reports that a written mode does not round-trip
	// through `stat`, because a host that cannot store the bit exposes none to
	// clear and the assertion cannot tell the false branch from an unchanged source.
	it.skipIf(!supportsMode())('clears the executable bit when not asked', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = join(workspace.path, 'project')
			const source = workspace.write('host/codex.sh', '#!/bin/sh\n')
			chmodSync(source, 0o755)
			const transaction = new WriteTransaction(target, ['scripts/codex.sh'])
			try {
				transaction.copy('scripts/codex.sh', source, false)
				transaction.commit()
				expect(lstatSync(join(target, 'scripts/codex.sh')).mode & 0o111).toBe(0)
			} finally {
				transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})
})

describe('WriteTransaction directories', () => {
	// Skipped on Windows because no attacker measured there has reached the interleaving, not
	// because the attacker cannot run. A replica of this race was measured on 2026-08-21 on
	// Windows 11 with Node v24.18.1 over NTFS, against a window opened by the `mkdirSync` call
	// that creates a segment and closed by the anchor read that follows it. The attacker
	// designs were: poll the `existsSync` call and clear the `holding` directory each attempt;
	// rename in a tight loop and clear the `holding` directory whenever the rename is refused;
	// that same loop under 24 spinner threads over this host's 16 cores; and 8 concurrent
	// attacker threads across 20000 rounds. Every design landed its swaps — the 8-thread run
	// landed 159140 of them, at least one inside every one of its 20000 rounds — and every
	// swap landed after the anchor read rather than inside the window. That is a result about
	// these designs on this host and this budget, not a proof that the window cannot be hit:
	// what was measured is that a directory rename, which cannot start before the directory
	// exists, did not once complete inside the gap between two adjacent syscalls on one
	// thread. A design that reaches it refutes the skip, and the skip is where to look first.
	// The earlier reading — that one leftover `holding` directory wedges the retry loop,
	// the `renameSync` call being the `MoveFileExW` call with `MOVEFILE_REPLACE_EXISTING`
	// set, which is documented to reject an existing directory destination — is real, but it
	// is not what stops this proof: clearing the `holding` directory repaired the wedge,
	// every attempt then completed its rename and signalled, and the race still observed
	// nothing. Reaching the refusal deterministically failed the same way. An inherit-only
	// NTFS DENY on the parent directory, applied with the `icacls` command as
	// `(OI)(CI)(IO)(RA)`, as `(OI)(CI)(IO)(RA,RD)`, and as `(OI)(CI)(IO)(GR)`, left the
	// `mkdirSync` call on the child succeeding and the `lstatSync` call on that child still
	// returning a directory, so the anchor read was never refused.
	// This proof is the only cover for the branch that discards a segment whose anchor read
	// comes back empty. The sibling `wraps a mid-creation refusal` proof does not reach it:
	// that one asserts the wrapped `context.error` value carries the `EACCES` code, which is
	// the raw refusal from the `mkdirSync` call, where this branch wraps a `ScaffoldError`
	// value carrying the `WRITE` code instead. On Windows that sibling takes its
	// `enforced: false` branch as well, because NTFS ignores the `chmodSync(control, 0o477)`
	// call, so it asserts no refusal there at all.
	// Every wait is bounded regardless, because a test that parks on a signal a host
	// will never send reports a timeout instead of a verdict.
	it.skipIf(process.platform === 'win32')(
		'discards a created segment whose anchor read refuses it',
		async () => {
			const workspace = createScratch({ prefix: SCRATCH_PREFIX })
			const target = workspace.ensure('project')
			const segment = join(target, 'a')
			const holding = join(target, 'holding')
			const state = new Int32Array(new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT))
			const attacker = new Worker(
				`const { existsSync, renameSync, writeFileSync } = require('node:fs')
const { workerData } = require('node:worker_threads')
const state = new Int32Array(workerData.state)
Atomics.store(state, 0, 1)
Atomics.notify(state, 0)
for (;;) {
	Atomics.wait(state, 0, 1)
	const command = Atomics.load(state, 0)
	if (command === 4) break
	if (command !== 2) continue
	while (Atomics.load(state, 0) === 2) {
		if (!existsSync(workerData.segment)) continue
		try {
			renameSync(workerData.segment, workerData.holding)
			writeFileSync(workerData.segment, 'replacement\\n')
			Atomics.store(state, 0, 3)
			Atomics.notify(state, 0)
		} catch {}
	}
}`,
				{ eval: true, workerData: { state: state.buffer, segment, holding } },
			)
			try {
				Atomics.wait(state, 0, 0, 10_000)
				let observed = false
				for (let attempt = 0; attempt < 4_096 && !observed; attempt += 1) {
					const transaction = new WriteTransaction(target, ['a'])
					Atomics.store(state, 0, 2)
					Atomics.notify(state, 0)
					let refusal: unknown
					try {
						transaction.establish('a')
					} catch (error) {
						refusal = error
					}
					if (Atomics.wait(state, 0, 2, 10_000) === 'timed-out') {
						Atomics.store(state, 0, 1)
						Atomics.notify(state, 0)
						transaction.discard()
						break
					}
					expect(lstatSync(segment).isFile()).toBe(true)
					expect(lstatSync(holding).isDirectory()).toBe(true)
					rmSync(segment)
					renameSync(holding, segment)
					transaction.discard()
					expect(existsSync(segment)).toBe(false)
					observed = refusal !== undefined
					expect(isScaffoldError(refusal) ? refusal.code : undefined).toBe(
						observed ? 'WRITE' : undefined,
					)
					Atomics.store(state, 0, 1)
					Atomics.notify(state, 0)
				}
				expect(observed).toBe(true)
			} finally {
				Atomics.store(state, 0, 4)
				Atomics.notify(state, 0)
				await attacker.terminate()
				workspace.destroy()
			}
		},
	)

	it('establishes a nested directory segment by segment and reports what it created', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			const transaction = new WriteTransaction(target, ['.claude/skills'])
			try {
				const result = transaction.establish('.claude/skills')
				expect(result.created.map((anchor) => anchor.path)).toEqual([
					join(target, '.claude'),
					join(target, '.claude/skills'),
				])
				expect(result.anchor.path).toBe(join(target, '.claude/skills'))
				expect(transaction.commit()).toEqual(['.claude/skills'])
				expect(lstatSync(join(target, '.claude/skills')).isDirectory()).toBe(true)
			} finally {
				transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('creates nothing for a directory already there and refuses one holding a file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.ensure('project/rules')
			workspace.write('project/AGENTS.md', '# Agents\n')
			const transaction = new WriteTransaction(target, ['rules', 'AGENTS.md'])
			try {
				expect(transaction.establish('rules').created).toEqual([])
				expect(readErrorCode(() => transaction.establish('AGENTS.md'))).toBe('TARGET')
				expect(transaction.commit()).toEqual([])
			} finally {
				transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('removes every directory it created when it is discarded', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = join(workspace.path, 'project')
			const transaction = new WriteTransaction(target, ['.claude/skills'])
			transaction.establish('.claude/skills')
			expect(lstatSync(join(target, '.claude/skills')).isDirectory()).toBe(true)
			transaction.discard()
			expect(readdirSync(workspace.path)).toEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('wraps a mid-creation refusal and discards every segment it created', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			const control = workspace.ensure('control')
			const child = join(control, 'child')
			chmodSync(control, 0o477)
			let controlRefusal: unknown
			try {
				mkdirSync(child)
			} catch (error) {
				controlRefusal = error
			} finally {
				chmodSync(control, 0o700)
			}
			const transaction = new WriteTransaction(target, ['a/b'])
			const previous = process.umask(0o300)
			let refusal: unknown
			try {
				transaction.establish('a/b')
			} catch (error) {
				refusal = error
			} finally {
				process.umask(previous)
			}
			try {
				const enforced = controlRefusal !== undefined
				const accessError = expect.objectContaining({ code: 'EACCES' })
				const wrappedContext = expect.objectContaining({ error: accessError })
				const nested = existsSync(join(target, 'a/b'))
				transaction.discard()
				const actual = {
					enforced,
					control: controlRefusal,
					controlCreated: existsSync(child),
					code: isScaffoldError(refusal) ? refusal.code : undefined,
					context: isScaffoldError(refusal) ? refusal.context : undefined,
					refused: refusal !== undefined,
					nested,
					residue: existsSync(join(target, 'a')),
				}
				const expected = enforced
					? {
							enforced: true,
							control: accessError,
							controlCreated: false,
							code: 'WRITE',
							context: wrappedContext,
							refused: true,
							nested: false,
							residue: false,
						}
					: {
							enforced: false,
							control: undefined,
							controlCreated: true,
							code: undefined,
							context: undefined,
							refused: false,
							nested: true,
							residue: false,
						}
				expect(actual).toEqual(expected)
			} finally {
				if (transaction.open) transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})
})

describe('WriteTransaction commit', () => {
	it('replaces existing bytes and leaves no private residue beside the target', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.write('project/AGENTS.md', '# Old\n')
			const transaction = new WriteTransaction(target, ['AGENTS.md'])
			try {
				transaction.write('AGENTS.md', '# New\n')
				expect(transaction.commit()).toEqual(['AGENTS.md'])
				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('# New\n')
				expect(readdirSync(workspace.path)).toEqual(['project'])
				expect(listFiles(target)).toEqual(['AGENTS.md'])
			} finally {
				transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('restores a destination it already promoted when a later promotion fails', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.write('project/first.md', '# First\n')
			const transaction = new WriteTransaction(target, ['first.md', 'deep/b.md'])
			transaction.write('first.md', '# First written\n')
			transaction.write('deep/b.md', '# B\n')
			// A file is planted where the second destination's parent has to go. The
			// second destination itself still reads as absent, so the check that runs
			// before the first promotion cannot see it and the failure lands after
			// `first.md` has already been replaced.
			writeFileSync(join(target, 'deep'), 'a file where a directory must go\n', 'utf8')
			expect(readErrorCode(() => transaction.commit())).toBe('WRITE')
			expect(readFileSync(join(target, 'first.md'), 'utf8')).toBe('# First\n')
			expect(readFileSync(join(target, 'deep'), 'utf8')).toBe('a file where a directory must go\n')
			expect(readdirSync(workspace.path)).toEqual(['project'])
		} finally {
			workspace.destroy()
		}
	})

	it('moves nothing at all when a destination moved before the first promotion', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.write('project/first.md', '# First\n')
			workspace.write('project/second.md', '# Second\n')
			const transaction = new WriteTransaction(target, ['first.md', 'second.md'])
			transaction.write('first.md', '# First written\n')
			transaction.write('second.md', '# Second written\n')
			// The second destination moves after both files are staged, which is the
			// window the expectation captured at construction exists to close.
			writeFileSync(join(target, 'second.md'), '# Second moved\n', 'utf8')
			expect(readErrorCode(() => transaction.commit())).toBe('WRITE')
			expect(readFileSync(join(target, 'first.md'), 'utf8')).toBe('# First\n')
			expect(readFileSync(join(target, 'second.md'), 'utf8')).toBe('# Second moved\n')
			expect(readdirSync(workspace.path)).toEqual(['project'])
		} finally {
			workspace.destroy()
		}
	})

	it('leaves a target without the writer holding both files, which is the control', () => {
		// The negative control for the rollback assertion above, drawn from outside
		// the population that assertion covers: a plain writer running the same
		// scenario. It must leave the first file replaced, because nothing rolled it
		// back. A rollback assertion that passes here as well is measuring nothing.
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.write('project/first.md', '# First\n')
			workspace.write('project/second.md', '# Second\n')
			writeFileSync(join(target, 'first.md'), '# First written\n', 'utf8')
			writeFileSync(join(target, 'second.md'), '# Second moved\n', 'utf8')
			expect(readFileSync(join(target, 'first.md'), 'utf8')).toBe('# First written\n')
		} finally {
			workspace.destroy()
		}
	})

	it('removes every directory it created when a promotion fails', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = join(workspace.path, 'project')
			const transaction = new WriteTransaction(target, ['.claude/rules/names.md', 'AGENTS.md'])
			transaction.write('.claude/rules/names.md', '# Names\n')
			transaction.write('AGENTS.md', '# Agents\n')
			// A file appears where an absent destination was expected, so the promotion
			// that reaches it refuses and the whole commit unwinds.
			workspace.write('project/AGENTS.md', '# Planted\n')
			expect(readErrorCode(() => transaction.commit())).toBe('WRITE')
			expect(listFiles(target)).toEqual(['AGENTS.md'])
			expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('# Planted\n')
		} finally {
			workspace.destroy()
		}
	})

	it('takes a marked file at commit and refuses one that holds no file', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.write('project/foreign.md', '# Foreign\n')
			const transaction = new WriteTransaction(target, ['foreign.md', 'absent.md'])
			try {
				expect(readErrorCode(() => transaction.remove('absent.md'))).toBe('TARGET')
				transaction.remove('foreign.md')
				expect(readFileSync(join(target, 'foreign.md'), 'utf8')).toBe('# Foreign\n')
				expect(transaction.commit()).toEqual(['foreign.md'])
				expect(listFiles(target)).toEqual([])
				expect(readdirSync(workspace.path)).toEqual(['project'])
			} finally {
				transaction.discard()
			}
		} finally {
			workspace.destroy()
		}
	})

	it('puts back every file it already took when a later one moved', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.write('project/first.md', '# First\n')
			workspace.write('project/second.md', '# Second\n')
			const transaction = new WriteTransaction(target, ['first.md', 'second.md'])
			transaction.remove('first.md')
			transaction.remove('second.md')
			writeFileSync(join(target, 'second.md'), '# Second moved\n', 'utf8')
			expect(readErrorCode(() => transaction.commit())).toBe('WRITE')
			expect(readFileSync(join(target, 'first.md'), 'utf8')).toBe('# First\n')
			expect(readFileSync(join(target, 'second.md'), 'utf8')).toBe('# Second moved\n')
		} finally {
			workspace.destroy()
		}
	})

	it('closes after a commit, so a second commit and a later discard both stop', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			const transaction = new WriteTransaction(target, ['AGENTS.md'])
			transaction.write('AGENTS.md', '# Agents\n')
			transaction.commit()
			expect(transaction.open).toBe(false)
			expect(readErrorCode(() => transaction.commit())).toBe('WRITE')
			expect(readErrorCode(() => transaction.write('AGENTS.md', '# Again\n'))).toBe('WRITE')
			transaction.discard()
			transaction.discard()
			expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('# Agents\n')
		} finally {
			workspace.destroy()
		}
	})

	it('reports promotions, establishments, and removals in that order', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			workspace.write('project/foreign.md', '# Foreign\n')
			const transaction = new WriteTransaction(target, [
				'AGENTS.md',
				'.claude/skills',
				'foreign.md',
			])
			transaction.write('AGENTS.md', '# Agents\n')
			transaction.establish('.claude/skills')
			transaction.remove('foreign.md')
			expect(transaction.commit()).toEqual(['AGENTS.md', '.claude/skills', 'foreign.md'])
		} finally {
			workspace.destroy()
		}
	})
})

describe('WriteTransaction discard', () => {
	it('clears its private root even after a staged write', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			const transaction = new WriteTransaction(target, ['AGENTS.md'])
			transaction.write('AGENTS.md', '# Agents\n')
			expect(readdirSync(workspace.path).length).toBe(2)
			transaction.discard()
			expect(readdirSync(workspace.path)).toEqual(['project'])
			expect(listFiles(target)).toEqual([])
		} finally {
			workspace.destroy()
		}
	})

	it('reports residue rather than swallowing it', () => {
		const workspace = createScratch({ prefix: SCRATCH_PREFIX })
		try {
			const target = workspace.ensure('project')
			const transaction = new WriteTransaction(target, ['.claude/skills'])
			transaction.establish('.claude/skills')
			// A file planted inside a directory this transaction created stops the
			// rollback from removing it, which is exactly the residue `discard` owes
			// the caller instead of a silent success.
			writeFileSync(join(target, '.claude/skills/planted.md'), '# Planted\n', 'utf8')
			expect(readErrorCode(() => transaction.discard())).toBe('WRITE')
			rmSync(join(target, '.claude'), { recursive: true, force: true })
		} finally {
			workspace.destroy()
		}
	})
})
