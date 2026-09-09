Objective lane held. The owner’s request requires revising the prior core-only placement: keep Guide core host-independent and add a published `@orkestrel/guide/server` command boundary.

## Classification

From [tests/guides.test.ts](C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts):

- `readWorkspaceInventory` at line 31 is a host adapter. Move its glob and `readInventory` composition into Guide/server.
- `readShortName` at line 36 and `selectPitch` at line 51 are unnecessary product-policy helpers. Delete them and require the package entry to declare its pitch explicitly. Contract’s exported `parseJSON` is therefore not needed here.
- `createScaffoldParity` at line 60 is an unnecessary wrapper. Pass its package choices to the shared command.
- `reportFindings` at line 75 is shared Guide command behavior. Guide/server owns prefixing and stdout.
- `matchesPassed` at line 84 is a Vitest host adapter. Guide/server owns the result predicate.
- Local `runGuides` at line 92 is shared runner lifecycle. Replace it with the public Guide/server command.
- `raiseExit` at line 108 is command-host policy. Guide/server must preserve the highest exit status.
- `formatError` at line 115 is an unnecessary one-use wrapper. Fold its expression into the Guide/server error boundary.
- `main` at line 119 is shared Guide command orchestration. Move the complete workflow, including write and reread, into Guide/server.
- `registerGuides` at line 179 is package-specific. Keep its imports, assertions, and executable examples at the call site as the callback passed directly to the shared command. Remove its duplicated inventory/parity setup at lines 198–219.

## Public boundary

Expose `runGuides` from `@orkestrel/guide/server`, with authoritative types in `src/server/types.ts`.

Its options should carry only package choices:

```ts
interface GuideCommandOptions {
	readonly root: string
	readonly patterns: readonly string[]
	readonly index: string
	readonly modules: Readonly<Record<string, GuideModule>>
	readonly languages: readonly string[]
	readonly language: string
	readonly pitch?: ParityPitch
}
```

The registration callback receives readonly `files`, `rows`, and `report`, using the existing declared `Parity.rows()` and `Parity.inspect()` result types. It receives no direction, writer, runner, process, inventory provider, or lifecycle callback.

`runGuides` owns these branches:

- When `VITEST === 'true'`, load the fresh inventory, parse the index, create parity, and invoke the registration callback.
- For every other `VITEST` value, parse the native command.
- With no direction, launch the `guides` Vitest project.
- With `--to guide` or `--to source`, validate input, rewrite, write every change, reread from disk, reconstruct parity, report remaining findings, print the format reminder when applicable, then launch Vitest.
- Reject every malformed direction with usage and exit `2`.
- Preserve drift/runner exit `1`, input/usage exit `2`, and never lower an existing exit status.
- Always close Vitest, including startup and test failures.

## Thin scaffold entry

```ts
import { runGuides } from '@orkestrel/guide/server'

await runGuides(
	{
		root: ROOT,
		patterns: ['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'],
		index: 'guides/README.md',
		modules: {
			'@orkestrel/scaffold': 'src/core',
			'@orkestrel/scaffold/server': 'src/server',
		},
		languages: ['sh', 'text', 'ts'],
		language: 'ts',
		pitch: {
			readme: 'README.md',
			spec: 'guides/scaffold.md',
		},
	},
	async ({ files, rows, report }) => {
		// Existing dynamic imports and package-specific describe/it bodies stay here.
	},
)
```

The package script remains `node --experimental-strip-types tests/guides.test.ts`. No launcher, setup file, named registration wrapper, local command helper, or workflow-bearing callback remains.

## Environment and dependencies

Add Guide’s supported published server environment through Scaffold’s existing `src: ['core', 'server']` mechanism. It must generate `src/server`, the server TypeScript/Vite projects, tests, and the `./server` export. Do not import Node, Test/server, or Vitest from Guide core.

Guide/server should reuse:

- Guide core `createParity` and `parseManifest`;
- Markdown-backed comparison and rewrite behavior already behind Parity;
- `@orkestrel/test/server` `readInventory`;
- Node `globSync` and file writes;
- `vitest/node` `createVitest`.

Published Guide/server would statically import `@orkestrel/test/server` and `vitest/node`. Keeping them only as dev dependencies would be invalid. Recommend optional peer declarations for `@orkestrel/test` and `vitest`, retained as Guide dev dependencies for its build and tests. This keeps core-only Guide consumers from acquiring test tooling while making the server subpath’s host requirements explicit.

That dependency-contract change requires owner approval before implementation. If it is refused, the requested thin entry cannot be achieved without duplicating `readInventory`/Vitest behavior or reintroducing workflow callbacks. A new runner port in Test would broaden the package wave without removing that dependency requirement and is not the minimal path.

## Bounded changes and proof

Guide owns the server types, command implementation, export, environment configuration, focused real tests, dependency metadata, package contents, and guide parity. Scaffold owns the direct consumer simplification and keeps its package-specific assertions and examples unchanged. Its `test:guides` script remains direct.

Retain the existing child-command controls for strict `VITEST` handling, malformed directions, function/member category collisions, accumulated writes, fresh disk bytes, and Vitest startup/test failure. Add Guide/server controls for input refusal, stdout/stderr text, exit precedence, change writes, reread reconstruction, empty or failed Vitest results, and `close()` on every lifecycle outcome.

Still unproven and required from root:

- TypeScript assignability of the proposed `createVitest` options/result composition under Guide’s server project.
- Successful Guide server build and packed `./server` export resolution.
- Optional-peer runtime resolution from the packed artifact installed in scaffold.
- Exact native/worker recursion, alias imports, exit behavior, write accumulation, and fresh-byte behavior through the existing real child commands.
- Continued compatibility of `globSync` with Guide’s declared Node support. Moving the existing primitive does not establish a new engine-floor claim.
