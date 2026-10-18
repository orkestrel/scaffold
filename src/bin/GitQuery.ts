import type { GitQueryInterface } from './types.js'
import { attempt } from '@orkestrel/contract'
import { createSession } from '@orkestrel/process/server'
import { isScaffoldError, ScaffoldError } from '@src/core'
import { findGitRefusal, splitGitRecords } from './helpers.js'

/**
 * Represents one git query read as its NUL-separated records.
 *
 * @remarks
 * Git is asked rather than reimplemented, because the tracked set and the dirty set are git's own
 * answers and nothing else can give them. The raw session streams complete NUL-delimited records
 * without retaining the whole query as a manifest-sized text buffer. Its hooks are installed
 * before the eager spawn, so no output or child fault can precede its observer.
 *
 * A query is created for one run: the unfinished record, the retained records, and the abort
 * signal all belong to that run, and a second `read` is refused rather than reset. Only `read`
 * drives the intake, so no caller feeds a run its output.
 *
 * @example
 * ```ts
 * import { GitQuery } from './GitQuery.js'
 *
 * await new GitQuery('./packages/router', ['ls-files', '-z']).read()
 * // ['package.json', 'src/core/index.ts']
 * ```
 */
export class GitQuery implements GitQueryInterface {
	readonly #target: string
	readonly #args: readonly string[]
	readonly #records: string[] = []
	readonly #decoder = new TextDecoder('utf-8', { ignoreBOM: true })
	readonly #controller = new AbortController()
	#pending = ''
	#started = false

	/**
	 * Creates a query over one repository.
	 *
	 * @param target - The repository the query runs in.
	 * @param args - The git arguments, without the program name.
	 */
	constructor(target: string, args: readonly string[]) {
		this.#target = target
		this.#args = [...args]
	}

	/**
	 * Runs the query and reads its records.
	 *
	 * @returns The non-empty records git wrote, in git's own order.
	 * @throws {@link ScaffoldError} coded `TARGET` when the query fails, cannot start, or its output
	 * is incomplete or outside the working-tree inventory bounds, and `INVALID` when the query
	 * already ran.
	 */
	async read(): Promise<readonly string[]> {
		if (this.#started) throw new ScaffoldError('INVALID', 'A git query reads once.')
		this.#started = true
		const target = this.#target
		const created = attempt(() =>
			createSession({
				command: { file: 'git', arguments: ['-C', target, ...this.#args] },
				workspace: '.',
				signal: this.#controller.signal,
				on: {
					stdout: (chunk) => this.#collect(chunk),
					error: () =>
						this.#refuse(`The git query for target at ${target} failed before it completed.`),
				},
				error: () =>
					this.#refuse(`The git query for target at ${target} failed while reading its output.`),
			}),
		)
		if (!created.success) {
			if (isScaffoldError(created.error)) throw created.error
			throw new ScaffoldError('TARGET', `The git query for target at ${target} could not start.`, {
				target,
			})
		}
		const session = created.value
		try {
			const exit = await session.exit
			this.#pending = `${this.#pending}${this.#decoder.decode()}`
			if (this.#controller.signal.aborted) throw this.#controller.signal.reason
			if (exit.signal !== null) {
				throw new ScaffoldError(
					'TARGET',
					`The git query for target at ${target} ended from signal ${exit.signal}.`,
					{ target, signal: exit.signal },
				)
			}
			if (exit.code !== 0) {
				throw new ScaffoldError(
					'TARGET',
					`The git query for target at ${target} failed with exit code ${String(exit.code)}.`,
					{ target, code: exit.code },
				)
			}
			if (!exit.drained) {
				throw new ScaffoldError(
					'TARGET',
					`The git query for target at ${target} ended before its output drained.`,
					{ target },
				)
			}
			if (this.#pending.length > 0) {
				throw new ScaffoldError(
					'TARGET',
					`The git query for target at ${target} returned an incomplete record.`,
					{ target },
				)
			}
			return [...this.#records]
		} catch (error) {
			if (isScaffoldError(error)) throw error
			throw new ScaffoldError('TARGET', `The git query for target at ${target} could not start.`, {
				target,
			})
		} finally {
			await session.destroy()
		}
	}

	// A chunk may end inside a record or inside a UTF-8 sequence, so the unfinished tail carries into
	// the next chunk; a chunk arriving after a refusal is ignored.
	//
	// Unproven: that a sequence split across two chunks decodes whole. The process transport leaves
	// chunk boundaries to the host, `read` is the only door to this method, and the intake stays
	// private, so no test can force a split. The multi-byte inventory test fails without `stream: true`
	// on a host that splits a sequence and passes on one that does not. A transport that takes a chunk
	// size, or a decoder the constructor accepts, would make the split drivable.
	#collect(bytes: Uint8Array): void {
		if (this.#controller.signal.aborted) return
		const chunk = splitGitRecords(
			`${this.#pending}${this.#decoder.decode(bytes, { stream: true })}`,
		)
		const refusal = findGitRefusal(this.#target, this.#records.length, chunk)
		if (refusal !== undefined) {
			this.#refuse(refusal)
			return
		}
		for (const record of chunk.records) this.#records.push(record)
		this.#pending = chunk.pending
	}

	// A later refusal is ignored, so the signal's reason stays the first one.
	#refuse(message: string): void {
		if (!this.#controller.signal.aborted) {
			this.#controller.abort(new ScaffoldError('TARGET', message, { target: this.#target }))
		}
	}
}
