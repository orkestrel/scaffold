import type { GuideModule, ParityOptions } from '../core/types.js'

/**
 * Reads a workspace inventory through a consumer-supplied host implementation.
 *
 * @param root - The workspace root as a file URL or native path
 * @param targets - The root-relative files or directories to read
 * @returns The root-relative, forward-slash path-to-text inventory
 */
export type GuideReadFunction = (
	root: URL | string,
	targets: readonly string[],
) => Readonly<Record<string, string>>

/**
 * Represents the narrow test-module view returned by a guides runner.
 */
export interface GuideRunnerModuleInterface {
	/**
	 * Returns the module's execution state.
	 *
	 * @returns The external runner's state name
	 */
	state(): string
}

/**
 * Represents the narrow result returned when the guides project starts.
 *
 * @remarks
 * The `testModules` and `unhandledErrors` properties preserve the exact external Vitest
 * `TestRunResult` field format without importing Vitest declarations into published Guide source.
 */
export interface GuideRunnerResult {
	/** Lists the test modules the external runner collected. */
	readonly testModules: readonly GuideRunnerModuleInterface[]
	/** Lists the unhandled errors the external runner reported. */
	readonly unhandledErrors: readonly unknown[]
}

/**
 * Configures the narrow guides-project runner invocation.
 */
export interface GuideRunnerOptions {
	/** Holds the resolved native workspace root. */
	readonly root: string
	/** Names the resolved native Vite configuration path. */
	readonly config: string
	/** Selects the guides project. */
	readonly project: 'guides'
	/** Selects the dot reporter. */
	readonly reporters: 'dot'
	/** Disables the external runner's cache. */
	readonly cache: false
	/** Disables watch mode. */
	readonly watch: false
}

/**
 * Represents the narrow lifecycle exposed by a guides-project runner.
 */
export interface GuideRunnerInterface {
	/**
	 * Starts the configured guides project.
	 *
	 * @returns The external runner's module and unhandled-error result
	 */
	start(): Promise<GuideRunnerResult>
	/**
	 * Closes the runner and releases its resources.
	 *
	 * @returns A promise that resolves after cleanup finishes
	 */
	close(): Promise<void>
}

/**
 * Creates the consumer-supplied guides-project runner.
 *
 * @param mode - The fixed external runner mode
 * @param options - The narrow guides-project options
 * @returns The runner lifecycle
 */
export type GuideRunnerFunction = (
	mode: 'test',
	options: GuideRunnerOptions,
) => Promise<GuideRunnerInterface>

/**
 * Represents the fresh workspace state supplied to assertion registration.
 */
export interface GuideCommandContext {
	/** Holds the resolved native workspace root. */
	readonly root: string
	/** Holds parity options rebuilt from fresh disk bytes. */
	readonly options: ParityOptions
}

/**
 * Registers package-owned guides assertions against fresh workspace state.
 *
 * @param context - The resolved root and fresh parity options
 * @returns A promise that resolves after assertion registration finishes
 */
export type GuideCommandHandler = (context: GuideCommandContext) => Promise<void>

/**
 * Configures a guides-parity command for one package.
 */
export interface GuideCommandOptions {
	/** Names the workspace root as a file URL or native path. */
	readonly root: URL | string
	/** Lists the inventory globs the command expands from the workspace root. */
	readonly inventory: readonly string[]
	/** Maps each self import specifier to the source scope it exposes. */
	readonly modules: Readonly<Record<string, GuideModule>>
	/** Lists every fence language the package admits. */
	readonly languages: readonly string[]
	/** Names the fence language inspected for examples and self imports. */
	readonly language: string
	/** Supplies the host inventory reader directly. */
	readonly read: GuideReadFunction
	/** Supplies the external guides-project runner factory directly. */
	readonly runner: GuideRunnerFunction
}

/**
 * Represents the reusable server command that drives native and worker guides parity.
 */
export interface GuideCommandInterface {
	/**
	 * Executes the native command or registers worker assertions for the active host path.
	 *
	 * @param register - The package-owned assertion registration callback
	 * @returns A promise that resolves after the selected command path finishes
	 */
	execute(register: GuideCommandHandler): Promise<void>
}
