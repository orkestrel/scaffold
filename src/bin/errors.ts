/** Internal sentinel that unwinds command dispatch without bypassing cleanup. */
export class CLIExitError extends Error {
	readonly code: number

	constructor(code: number) {
		super(`cli-exit:${String(code)}`)
		this.code = code
	}
}
