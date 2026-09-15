**Touched files**

Implemented the A1 provider base and successor wire/domain split.

- `src/core/types.ts`: adds the ruled provider and relay contracts.
- `src/core/AgentProvider.ts`: implements HTTP streaming, deadlines, header cancellation, framing, result assembly, and cleanup.
- `src/core/errors.ts`: adds coded provider failures and their guard.
- `src/core/constants.ts`: adds provider deadlines, byte limits, and the relay content type.
- `src/core/helpers.ts`: adds result assembly and UTF-8 readers; treats empty reasoning carriers as absent.
- `src/core/validators.ts`: restricts message roles and image elements while retaining non-JSON domain arguments.
- `src/core/shapers.ts`: declares JSON wire projections and documents their narrower domain.
- `src/core/contracts.ts`: compiles the wire contracts.
- `src/core/index.ts`: exports the added surface.
- `tests/setup.ts`: promotes transports and the generator drain; adds scripted framing and recorded stream fixtures.
- `tests/setup.test.ts`: proves the shared fixtures and uses the promoted drain.
- `tests/src/core/AgentProvider.test.ts`: proves provider semantics, cancellation, cleanup, and concurrent isolation.
- `tests/src/core/helpers.test.ts`: proves bounded reads, UTF-8 decoding, cleanup, result assembly, and empty reasoning.
- `tests/src/core/validators.test.ts`: proves the message repairs and updates the former lenient-role assertion.
- `tests/src/core/shapers.test.ts`: proves wire-to-domain assignability and caller exclusion.
- `tests/src/core/contracts.test.ts`: proves JSON round trips, malformed-field paths, and wire/domain asymmetry.
- `tmp/units/a1-report-2.md`: records this report.
- `tmp/units/a1-core-results-2.json`: retains test-discovery results.

The following is the verbatim `git diff --stat` output. Git excludes untracked additions from this statistic; the Status field includes them.

```text
 src/core/constants.ts             |  12 +++
 src/core/errors.ts                |  29 +++++-
 src/core/helpers.ts               | 108 ++++++++++++++++++++++-
 src/core/index.ts                 |   3 +
 src/core/types.ts                 | 110 +++++++++++++++++++++++
 src/core/validators.ts            |  47 ++++------
 tests/setup.test.ts               | 110 +++++++++++++++++++----
 tests/setup.ts                    | 181 +++++++++++++++++++++++++++++++++++++-
 tests/src/core/helpers.test.ts    |  80 ++++++++++++++++-
 tests/src/core/validators.test.ts |  11 ++-
 10 files changed, 637 insertions(+), 54 deletions(-)
```

**Contract**

The final additions to `src/core/types.ts` are verbatim:

```ts
/** Defines the structural framing seam supplied by a concrete provider. */
export interface ProviderParserInterface<TRecord = Readonly<Record<string, unknown>>> {
	/** Parses a decoded chunk into complete records. */
	parse(chunk: string): readonly TRecord[]
	/** Clears retained framing state. */
	clear(): void
}

/** Carries the conversation and per-call configuration sent to a provider. */
export interface ProviderRequest {
	readonly messages: readonly Message[]
	readonly tools?: readonly ToolDefinition[]
	readonly options?: ProviderStreamOptions
}

/** Holds the decoded contribution of a wire record to a provider turn. */
export interface ProviderIncrement {
	readonly content: string
	readonly thinking: string
	readonly tools: readonly ToolCall[]
	readonly usage?: TokenUsage
	readonly result?: ProviderResult
}

/**
 * Configures a provider's deadline, transport, headers, and context framing.
 *
 * @remarks
 * `timeout` is an integer duration in milliseconds. Default: 120_000.
 * `fetch` defaults to the global transport bound to its global receiver.
 * `headers` runs for each request inside its deadline and overrides the JSON content type
 * only when it returns that header. `format` is exposed to context assembly.
 */
export interface ProviderOptions {
	readonly timeout?: number
	readonly fetch?: typeof globalThis.fetch
	readonly headers?: () =>
		| Readonly<Record<string, string>>
		| Promise<Readonly<Record<string, string>>>
	readonly format?: ContextFormat
}

/**
 * Configures the HTTP destination and stream assembly of a provider base.
 *
 * @remarks
 * `path` appends to `url`. If `split` is true, separates in-content reasoning;
 * if false, preserves content verbatim. Default: true.
 * If `strict` is true, requires a settled result record; if false, assembles at end of input.
 * Default: false.
 */
export interface AgentProviderInput extends ProviderOptions {
	readonly url: string
	readonly path?: string
	readonly split?: boolean
	readonly strict?: boolean
}

/** Defines the wire-specific seams of the shared HTTP provider engine. */
export interface AgentProviderInterface<TRecord = Readonly<Record<string, unknown>>>
	extends ProviderInterface {
	/** Creates fresh framing state for a call. */
	frame(): ProviderParserInterface<TRecord>
	/** Projects a request to the concrete protocol's serializable body. */
	body(request: ProviderRequest): object
	/** Decodes a framed record into its contribution to the turn. */
	read(record: TRecord): ProviderIncrement
	/** Returns records retained at end of input before the parser is cleared. */
	finish(parser: ProviderParserInterface<TRecord>): readonly TRecord[]
}

/** Names the machine-readable provider failure conditions. */
export type ProviderErrorCode = 'HTTP' | 'PROTOCOL' | 'LIMIT' | 'PROVIDER'

/** Carries a provider failure's HTTP status and underlying cause. */
export interface ProviderErrorOptions {
	readonly status?: number
	readonly cause?: unknown
}

/** Carries a relay delta, settled result, remote abort, or remote failure. */
export type RelayFrame =
	| ProviderDelta
	| { readonly channel: 'result'; readonly result: ProviderResult }
	| { readonly channel: 'abort'; readonly partial: ProviderResult }
	| { readonly channel: 'error'; readonly code: 'PROVIDER'; readonly message: string }

/** Defines a host-independent relay request handler. */
export type RelayHandler = (request: Request) => Promise<Response>

/** Configures the upstream provider, mandatory authorization, and request byte limit. */
export interface RelayOptions {
	readonly provider: ProviderInterface
	readonly authorize: (request: Request) => boolean | Promise<boolean>
	readonly limit?: number
}

/** Carries the upstream call and cancellation bound of a relay response stream. */
export interface RelayStreamOptions {
	readonly provider: ProviderInterface
	readonly request: ProviderRequest
	readonly signal: AbortSignal
}

/** Configures a relay destination and its fresh structural parser factory. */
export interface RelayProviderOptions extends ProviderOptions {
	readonly url: string
	readonly frame: () => ProviderParserInterface
}
```

**Red then green**

The message and reasoning regressions ran with this exact command:

```text
npm.cmd run test:src:core -- tests/src/core/validators.test.ts tests/src/core/helpers.test.ts -t 'arbitrary role|non-string image|either carrier'
```

- Arbitrary role: 1 failed before repair; 1 passed afterward.
- Non-string image: 1 failed before repair; 1 passed afterward.
- Empty reasoning carrier: 1 failed before repair; 1 passed afterward.
- Combined command: exit 1 with 3 failed; then exit 0 with 3 passed.

The bounded-read and hook-race regressions used controlled reversions of the initial implementation, followed by restoration, with this exact command:

```text
npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts -t 'bounds the error-body|races a never-resolving'
```

- Bounded error read: 1 failed with 8192 bytes delivered against the required 2048; 1 passed after restoring the bound and cancellation.
- Unresolved header hook: 1 failed by timing out at 250 ms; 1 passed after restoring the race against the 10 ms deadline.
- Combined command: exit 1 with 2 failed; then exit 0 with 2 passed.

The cancellation-between-channels regression ran with this exact command:

```text
npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts -t 'stops between channels'
```

The command exited 1 with 1 failed because cancellation still yielded thinking. After committing the decoded increment before yielding and checking cancellation between channels, it exited 0 with 1 passed.

**Scoped validation**

The final validation results on Windows on 2026-09-14 were:

| Exact command | Exit | Result |
| --- | --- | --- |
| `npm.cmd run lint:check` | 0 | No diagnostics |
| `npm.cmd run check:src:core` | 0 | No diagnostics |
| `npm.cmd run check` | 0 | Root and core typechecks passed, including the assignability assertions |
| `npm.cmd run test:src:core` | 0 | 674 passed across 21 files |
| `npm.cmd run test:setup` | 0 | 54 passed |
| `git diff --check` | 0 | No whitespace errors |

Discovery was also recorded with the following command, which exited 0 with 674 passed:

```text
npm.cmd run test:src:core -- --reporter=json --outputFile=tmp/units/a1-core-results-2.json
```

The recorded file results include:

- `tests/src/core/AgentProvider.test.ts`: 32 passed.
- `tests/src/core/shapers.test.ts`: 5 passed.
- `tests/src/core/contracts.test.ts`: 7 passed.
- `tests/src/core/helpers.test.ts`: 107 passed.
- `tests/src/core/validators.test.ts`: 13 passed.

**Observations**

- `npm.cmd run test:guides` exited 1: 3 failed and 27 passed. Failures concern undocumented exports, missing provider/parser method tables, and the changed `isMessage` summary. These belong to A3. The missing-export diagnostic does not list the abstract `AgentProvider` class; A3 must document that class explicitly.
- Vitest 4.1.11 workers spawned successfully; no worker-spawn standing condition applied.
- PowerShell refused `npm run check:src:core` before npm started because script execution is disabled. Subsequent commands used `npm.cmd`, which ran successfully.
- Compiled contract values use camelCase. `configs/policy.ts:976` limits the UPPER_SNAKE_CASE check to `constants.ts`; `contracts.ts` is a permitted data file. The enabled lint gate accepts these names.
- Wire guards reject function-valued arguments, parameters, and schemas. The domain message guard accepts function-valued arguments. Caller context is refused by the closed wire guard and dropped by its parser.
- `readText` bounds bytes decoded from the stream. If a source delivers an oversized chunk, the helper discards the unused bytes and cancels the remainder; it cannot control the source's chunk size.
- The successor-authorized `expectTypeOf` assertions compile through `npm.cmd run check`. No `prove` receipt is claimed.
- Formatting, build, and the whole test chain were left to the Orchestrator as instructed. No dependency, configuration, guide, or scaffold-owned file was changed.
- `tmp/units/a1-report.md` remains untouched. Git status emitted `warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied`; its exit code was 0.

**Deviation**

No stop condition arose. The bounded-read and hook-race proofs were added after the initial implementation and established through the controlled red-then-green reversions recorded above.

**Status**

The following is the verbatim `git status --porcelain` stdout:

```text
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/helpers.ts
 M src/core/index.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
?? src/core/AgentProvider.ts
?? src/core/contracts.ts
?? src/core/shapers.ts
?? tests/src/core/AgentProvider.test.ts
?? tests/src/core/contracts.test.ts
?? tests/src/core/shapers.test.ts
```

