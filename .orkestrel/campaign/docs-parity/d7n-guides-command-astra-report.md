Complete Ruling35 by adding a `GuideCommand` class under `@orkestrel/guide/server`. Keep `Parity`, `Guide`, and `Source` host-independent. The package entry supplies its choices, existing dependency primitives, and assertion registration. Guide owns the reusable command workflow.

This is a source-based design recommendation. I ran no gates or assignability proof and make no acceptance claim.

The named functions divide as follows; pointers refer to scaffold’s `tests/guides.test.ts`.

| Function | Classification | Destination |
|---|---|---|
| `readWorkspaceInventory` at line 31 | Host adapter | Command reads configured glob matches through the supplied `readInventory` function. |
| `readShortName` at line 36 | Host adapter with a pure parsing leaf | Command reads the manifest; an exported server parser uses Contract’s `parseJSON` and `isRecord` primitives, then extracts the bare name. |
| `selectPitch` at line 51 | Shared Guide command mechanism | Exported server helper selects the indexed own-guide path. Keep this command convention outside core. |
| `createScaffoldParity` at line 60 | Unnecessary wrapper carrying package choices | Delete it. Pass the choices into the command and call `createParity` directly at assertion registration. |
| `reportFindings` at line 75 | Host adapter with formatting logic | Command writes findings; an exported server helper formats the path prefix. |
| `matchesPassed` at line 84 | Shared runner-result check | Exported server helper retains module-presence, unhandled-error, and exact `passed` checks. |
| `runGuides` at line 92 | Host adapter with lifecycle ownership | Command creates the runner, starts it, evaluates the result, and closes it in `finally`. |
| `raiseExit` at line 108 | Host adapter | Command method preserves the existing exit code when it represents a greater failure. |
| `formatError` at line 115 | Unnecessary wrapper | Fold its expression into the command’s native error boundary. |
| `main` at line 119 | Shared command orchestration | `GuideCommand.execute` and its private methods own this workflow. |
| `registerGuides` at line 179 | Package-specific assertion registration | Retain it in the authored entry, with deferred worker imports and existing assertion/example bodies. |

Use a command interface whose public behavior is `execute(register): Promise<void>`. Its options contain `root`, `inventory`, `modules`, `languages`, `language`, `read`, and `runner`. Its registration context contains the resolved root and complete `ParityOptions` read from fresh disk bytes.

This sketch removes the command helpers while retaining the assertion site:

```ts
import type { GuideCommandContext } from '@orkestrel/guide/server'
import { createParity } from '@orkestrel/guide'
import { GuideCommand } from '@orkestrel/guide/server'
import { readInventory } from '@orkestrel/test/server'
import { createVitest } from 'vitest/node'

async function registerGuides({ root, options }: GuideCommandContext): Promise<void> {
	const { describe, expect, it } = await import('vitest')
	// Retain the existing deferred package and test-infrastructure imports.

	const files = options.files
	const parity = createParity({
		...options,
		pitch: { readme: 'README.md', spec: 'guides/scaffold.md' },
	})
	const inspected = parity.rows()
	const report = parity.inspect()

	// Retain the existing assertion and executable-example registration bodies.
}

await new GuideCommand({
	root: new URL('../', import.meta.url),
	inventory: ['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'],
	modules: {
		'@orkestrel/scaffold': 'src/core',
		'@orkestrel/scaffold/server': 'src/server',
	},
	languages: ['sh', 'text', 'ts'],
	language: 'ts',
	read: readInventory,
	runner: createVitest,
}).execute(registerGuides)
```

The callback contains assertions and package choices. It performs no argument parsing, inventory walk, rewriting, reporting, runner lifecycle, or exit management. Retaining the explicit worker pitch also preserves scaffold’s authored README assertion; native reporting continues selecting the pitch from the disk manifest and index.

Keep the dependency ports narrow:

- `read` accepts `(root: URL | string, targets: readonly string[])` and returns `Readonly<Record<string, string>>`. The installed `readInventory` declaration accepts that signature directly; its trailing options parameter is optional.
- `runner` accepts the `'test'` mode and the command’s runner options, then returns a promise of an object exposing `start()` and `close()`. The start result exposes Vitest’s `testModules`, their `state()` method, and `unhandledErrors`.
- Use scalar `project: 'guides'` and `reporters: 'dot'` in the runner port. Vitest’s installed declarations accept those forms. This avoids introducing mutable array parameters merely to match Vitest.
- Require the root’s TypeScript proof for these assignments before implementation relies on them. The installed declarations support this proposed shape; reading declarations is not that proof.

Guide’s runtime dependencies remain Contract and Markdown. Test and Vitest remain development dependencies supplied directly by the consumer. Do not import their implementation or declaration modules from published Guide source. The ports must not require consumers to recreate `runGuides` inside an adapter callback.

The server environment requires real package wiring. Add the `src/server` directory, then use scaffold’s supported environment inference and configuration propagation. Reading verbs derive environments from existing directories; `repair` does not accept `--src`. Update Guide’s birth-owned manifest exports and build/check/test scripts explicitly where propagation does not own them. Map `@orkestrel/guide/server` before the bare package specifier in TypeScript/Vite aliases.

Guide’s own native entry resolves its public self-imports through built exports. Build the server entry before running its native `test:guides` command. Worker resolution must reach the corresponding source aliases. Prove the built core and server imports separately, then prove the actual authored entry inside Vitest. Scaffold’s consumer must use the prepared Guide artifact; a source-checkout import cannot establish package consumption.

Bound implementation to these changes:

- Guide server contracts, command class, centralized leaves, barrel, and mirrored behavioral tests.
- Guide environment configuration, package exports, authored guides entry, README, guide specification, and concept index. Revise package-wide “I/O-free” wording to describe the core entry accurately.
- Scaffold’s authored guides entry and affected real-command fixture wiring. Keep its generated command unchanged and its authored proof outside `HOST_PATHS`.
- Guide’s native-command adoption and removal of obsolete launcher references through the established scaffold-owned scripts workflow.

Retain the existing command controls in scaffold’s `tests/src/core/compilers.test.ts`, beginning at line 2409. They must continue exercising native dispatch when `VITEST` is `'false'`, default reporting without writes, explicit directions, categorized collisions, accumulated overlapping edits, fresh source bytes, missing input refusal, malformed arguments, failed assertions, empty projects, and unhandled errors. Preserve the strict `VITEST === 'true'` worker condition for every other supplied value.

Extend the command proof to collect an authored entry using the retained registration callback. The existing fixture harness at line 2294 collects its observation module separately, so that harness alone cannot establish the extracted command’s worker-registration path.
