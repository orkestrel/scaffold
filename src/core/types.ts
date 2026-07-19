/** Options for `createScaffold`. */
export interface ScaffoldOptions {
	readonly id?: string
}

/** A working `Scaffold` — pure data, no behavior. */
export interface ScaffoldInterface {
	readonly id: string
}
