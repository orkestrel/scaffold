## Source/design compliance review

### 1. BROKEN

The public API violates naming, lifecycle, and minimal-composition rules.

- `GuideCommandOptions.inventory` contains glob patterns, not an inventory, at [types.ts](C:/Users/mikes/WebstormProjects/guide/src/server/types.ts:113). `GuideCommand.#readInventory()` uses “inventory” for the resulting path-to-text record at [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:165). This violates “one concept, one term” in [AGENTS.md](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:60). Rename the option and field to `patterns`.
- `GuideCommandOptions.read` is a verb-valued property at [types.ts](C:/Users/mikes/WebstormProjects/guide/src/server/types.ts:121). Properties must be nouns under [names.md](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:114). Rename it `reader`.
- `GuideRunnerInterface.close()` at [types.ts](C:/Users/mikes/WebstormProjects/guide/src/server/types.ts:69) introduces a lifecycle synonym forbidden by [names.md](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:203). Its TSDoc does not identify `Vitest.close()` as the foreign declaration that forced the spelling.
- `GuideCommandContext.options` at [types.ts](C:/Users/mikes/WebstormProjects/guide/src/server/types.ts:92) sends raw `ParityOptions` downstream. The registration site must reconstruct `Parity`, call `rows()`, and call `inspect()`. That leaves reusable Guide composition in the consumer and fails the thin-entry criterion. Supply resolved `root`, `files`, `rows`, and `report` instead.

The smallest correction keeps direct `createVitest` assignment without publishing its lifecycle shape: make `GuideRunnerFunction` return `Promise<unknown>`, validate and project the returned foreign runner inside Guide/server, and remove `GuideRunnerInterface`, `GuideRunnerModuleInterface`, and `GuideRunnerResult` from the public contract. Root must rerun the exact installed-function assignability check after this change.

`GuideCommandInterface`, `GuideCommandOptions`, `GuideCommandContext`, `GuideCommandHandler`, and `GuideRunnerFunction` otherwise use the required role suffixes. `execute()` uses the prescribed lifecycle verb.

### 2. BROKEN

The draft violates centralized-kind placement.

- `GuideCommand.#index`, `#manifest`, `#readme`, and `#usage` are constants hidden as static class fields at [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:48). Constants belong in `*/constants.ts` under [architecture.md](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:19).
- Native argument interpretation at [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:115) is a pure coercion embedded in orchestration. Pure self-contained computations must be exported centralized leaves under [architecture.md](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/architecture.md:181). Extract and test `parseGuideDirection` in `parsers.ts`.
- `matchesGuideResult` is currently a helper over a trusted declared value at [helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/server/helpers.ts:24). After the foreign-boundary correction, it should accept `unknown`, validate only the members it reads, and remain a non-narrowing `matches*` helper.

The placement of `formatGuideFinding`, `matchesGuideResult`, `resolveGuideRoot`, and `selectGuidePitch` in `helpers.ts` is sound. `parsePackageName` correctly reuses Contract’s `parseJSON` and `isRecord` in `parsers.ts`. The server barrel uses only star exports at [index.ts](C:/Users/mikes/WebstormProjects/guide/src/server/index.ts:1). Missing package export and script rows are acknowledged unfinished work and are not the basis for this finding.

### 3. BROKEN

The direct inventory and runner ports avoid new dependencies, but the runner result is not owned as foreign data.

`matchesGuideResult` reads `result.testModules` for length and again for iteration, reads `unhandledErrors`, and invokes each foreign `state()` directly at [helpers.ts](C:/Users/mikes/WebstormProjects/guide/src/server/helpers.ts:24). The foreign-contract rule requires ownership at arrival, validation of every dereferenced member, and a single read of the foreign object at [patterns.md](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/patterns.md:135).

Keep the dependency-port design, but:

- Return `unknown` from `GuideRunnerFunction`.
- Validate the returned runner’s `start` and `close` members before invoking them.
- Treat the `start()` result as `unknown`.
- Snapshot `testModules` and `unhandledErrors` once.
- Accept extra foreign members and class instances.
- Validate only the arrays, module objects, and callable `state` members that Guide dereferences.
- Do not use an exact-record guard over the Vitest objects.
- Document creation, start, close, reader, and worker-registration failure behavior on `execute()` and the port types.

The inventory port already owns its foreign result through a copied frozen record at [GuideCommand.ts](C:/Users/mikes/WebstormProjects/guide/src/server/GuideCommand.ts:165). Passing installed `readInventory` and `createVitest` directly remains the smallest dependency-reuse boundary. No dependency addition or workflow callback is required.

### 4. BROKEN

The implementation preceded its governing package guide.

The concept index still assigns Guide only to `src/core` at [guides/README.md](C:/Users/mikes/WebstormProjects/guide/guides/README.md:10). The guide still describes the package as pure and I/O-free at [guide.md](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:3), and it documents no server command contract. Meanwhile public server types and implementation exist. This violates “Specs precede code” at [AGENTS.md](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:138).

The writer brief also directed “Begin by writing the contracts” at [d7n-guide-command-fix-brief.md](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-guide-command-fix-brief.md:70), while deferring the guide update. Amend the brief and package guide before implementation resumes. Define the server environment, command choices, native/worker behavior, port obligations, context shape, failure behavior, and direct-consumer example. Then align `types.ts`, implementation, tests, barrels, and package metadata.

The root TypeScript run at `1c840f` establishes that the captured draft typechecks. It does not settle these rule violations. Missing final exports, scripts, guide rows, and coverage remain acknowledged partial work rather than separate acceptance findings.

## Findings fitting no claim

None.

## Attacked and held

- The `GuideCommand` class is not a superfluous wrapper. It composes process dispatch, inventory, parity, writes, rereads, reporting, exit precedence, and runner cleanup.
- Stateful workflow remains in class methods. The drafted helper and parser modules contain genuine pure leaves.
- Core remains free of Node, Test, and Vitest imports.
- The direct ports reuse installed host capabilities without adding or re-exporting dependencies.
- `execute` is the correct public lifecycle verb.
- The server barrel follows the required star-export-only form.

VERDICT: FAIL 1, 2, 3, 4
