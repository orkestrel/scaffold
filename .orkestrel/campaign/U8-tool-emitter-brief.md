# Unit U8 — `@orkestrel/tool`: the registry owns an emitter (`add`, `remove`, `clear`)

## Role and engine

`sol` route: GPT-6 Astra (`gpt-6-astra`, the objective engine of this campaign, in the Sol seat),
reached as a `workspace-write` `codex exec` rooted at `C:/Users/mikes/WebstormProjects/tool`. You
are the bench engine reading this brief inside your own CLI: perform the assignment directly and
spawn nothing. You are the sole writer in this checkout while this unit runs.

## Objective

Give `ToolManager` an emitter by composition, exactly as `.claude/rules/patterns.md` § Stateful
emitters prescribes, so a consumer observes every registry change: `add`, `remove`, and `clear`.

## Context

**Authorization.** The user authorized `@orkestrel/emitter` as a runtime dependency of
`@orkestrel/tool` on 2026-09-15. The Orchestrator declared `"@orkestrel/emitter": "^0.0.10"` in
`package.json` `dependencies` and installed it on the host (receipt
`tmp/units/u8a-receipt.md` in the scaffold checkout, mirrored below under Standing conditions).
The manifest and the lockfile are off-limits to you; the package is installed and importable.

**Design record.** `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/D1-design-planner.md`
§ 4 first bullet (the registry "has three observable operations and owns no emitter";
`ToolManagerEventMap` carries `add`, `remove`, `clear`; `createToolManager(options?)` takes `on`
and `error`; additive) and `plan.md` R4 (formerly excluded pending this authorization). The
rule: `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/patterns.md` § Stateful emitters
(seven numbered steps; `on` reserved for initial `EmitterHooks`; never inherit from `Emitter`;
emit directly; `destroy()` calls `this.#emitter.destroy()` last). The emitter's own contract:
`C:/Users/mikes/WebstormProjects/scaffold/guides/emitter.md` (read `## Surface` and `## Methods`
for `Emitter`, `EmitterHooks`, `EmitterErrorHandler`, `EmitterInterface`, `emit`, `on`, `destroy`,
and what an `emit` after `destroy` does).

**The code today** (`C:/Users/mikes/WebstormProjects/tool`, clean at checkpoint `8f2ad5d` plus the
U8a manifest change): `src/core/types.ts` (`ToolManagerInterface` at the `export interface
ToolManagerInterface` declaration; no options type; no emitter), `src/core/tools/ToolManager.ts`
(`#tools` map; `add` overloads set by name, so an existing name is overwritten silently;
`remove` overloads; `clear`; `execute`), `src/core/factories.ts` (`createToolManager()` with no
parameter), `src/core/index.ts` (the barrel), `tests/src/core/tools/ToolManager.test.ts`,
`tests/src/core/factories.test.ts`, `tests/guides.test.ts` (executes guide fences), `guides/tool.md`
(`## Surface`, `## Methods`, `## Patterns`, `## Tests`).

**Installed primitives you must reuse** (a helper whose job an export does is a defect):
`@orkestrel/test` 0.0.14 — `createRecorder()`, `createRecorders(source, events)` (records an
emitter's events; see `scaffold/guides/test.md` § Patterns "Record an emitter's events"),
`createHostileValues()`, `requireValue`, `waitForAbort`, `waitForCondition`, `waitForEvent`;
`@orkestrel/contract` 0.0.17 — guards and combinators. Read `scaffold/guides/test.md` § Surface
and `guides/contract.md` § Surface before declaring any helper.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; scaffold
`.claude/rules/{names,typescript,architecture,patterns,tests,documentation,writing,quality}.md`;
skill `.agents/skills/orkestrel-harden-package/SKILL.md` (capability lane, `references/centralization.md`).

**Host and bench.** Windows 11. Your exec shell is PowerShell: run scripts as `npm.cmd run <script>`.
The `prove` MCP tool is not reachable from this exec; record any claim it would have taken as an
observation with its exact command. Network is denied; nothing you need is on the network. Vitest
runs in this sandbox. Do not run tree-wide `format` or `lint --fix`; scoped `npx.cmd oxfmt --config
.oxfmtrc.json --write <owned files>` is permitted.

**Measurements.** Before editing, run `npm.cmd run check` and `npm.cmd run test:src:core` and
record both readings (expected green: 74 core tests at the checkpoint).

**Control identifiers.** R4, X4; name tests for what they prove.

**Standing conditions.** `package.json` and `package-lock.json` are dirty with the U8a change
(the emitter dependency) — expected, not yours to diagnose or revert. Do not bump `version`.
Add no other package. Do not edit any file `scaffold repair` restores (`tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`, `.claude/**`, `AGENTS.md`,
`CLAUDE.md`, `.oxlintrc.json`, `.oxfmtrc.json`, `tsconfig.json`, `vite.config.ts`, `.gitignore`,
`.gitattributes`, `scripts/**`).

## Unknowns

- What `@orkestrel/emitter`'s `emit` does after `destroy` (throws, ignores, or is undefined by
  its guide): read the guide, follow it, and state in the report what `ToolManager` does after
  `destroy`.

## Scope

**Owned.** `src/core/types.ts`, `src/core/tools/ToolManager.ts`, `src/core/factories.ts`,
`src/core/index.ts` (only if a new export needs it), `tests/src/core/tools/ToolManager.test.ts`,
`tests/src/core/factories.test.ts`, `tests/guides.test.ts`, `tests/setup.ts` (if a shared fixture
is needed), `guides/tool.md`, `README.md` (only if the pitch must change; it must not).
**Off-limits.** `package.json`, `package-lock.json`, the `scaffold repair` set, `dist/**`,
`src/core/tools/Tool.ts`, `src/core/errors.ts`, `src/core/helpers.ts`, `src/core/validators.ts`.

## Execution

TTTDD: types first, then the failing tests that pin each event, then the implementation, then the
guide. Perform the assignment directly and spawn nothing.

## The surface to land

```ts
/** Names the events a tool registry publishes. */
export interface ToolManagerEventMap {
	/** Fires after a tool is registered, with the registered instance. */
	readonly add: readonly [tool: ToolInterface]
	/** Fires after a tool is removed, with the removed instance. */
	readonly remove: readonly [tool: ToolInterface]
	/** Fires once per `clear`, with the tools it removed in registration order. */
	readonly clear: readonly [tools: readonly ToolInterface[]]
}

/** Configures a tool registry's initial listeners and error handling. */
export interface ToolManagerOptions {
	readonly on?: EmitterHooks<ToolManagerEventMap>
	readonly error?: EmitterErrorHandler
}

export interface ToolManagerInterface {
	// existing members unchanged, plus:
	/** Publishes the registry's `add`, `remove`, and `clear` events. */
	readonly emitter: EmitterInterface<ToolManagerEventMap>
	/** Removes every tool, then releases the emitter; the registry is finished. */
	destroy(): void
}

export function createToolManager(options?: ToolManagerOptions): ToolManagerInterface
```

Semantics to pin with tests, each named for what it proves:

- `add(tool)` emits one `add` after the map holds the tool; `add(tools)` emits one `add` per tool
  in array order.
- `add` of a name already registered emits `remove` with the previous instance, then `add` with
  the new one, so a subscriber's view stays consistent; the map holds the new instance.
- `remove(name)` emits `remove` with the removed instance and returns `true`; a missing name emits
  nothing and returns `false`; `remove(names)` emits one `remove` per name actually removed, in
  array order, and returns `false` when any name was missing (the existing return contract).
- `clear()` emits one `clear` with the removed tools in registration order; on an empty registry
  it emits `clear` with an empty array (one call, one event).
- `on` hooks passed to `createToolManager` receive the events; a throwing listener does not
  prevent a sibling listener (the emitter's isolation) and the `error` handler receives the
  throw.
- `destroy()` empties the registry (emitting `clear`) and then destroys the emitter last; state
  and test what a later `add` does per the emitter guide (see Unknowns).
- `execute` is unchanged and emits nothing.
- Record events with `createRecorders(manager.emitter, ['add', 'remove', 'clear'])` from
  `@orkestrel/test`; declare no recorder of your own.

Guide: `## Surface` rows for `ToolManagerEventMap`, `ToolManagerOptions`, and the new members;
the `ToolManagerInterface` `## Methods` table gains `destroy`; a `## Patterns` fence titled
`Observe registry changes` that registers, replaces, removes, and clears while a listener
collects the event names, and whose asserted values are executed in `tests/guides.test.ts`
(transcription byte-equal to the fence); the `## Tests` list names the new proofs. TSDoc on every
new member in the voice `.claude/rules/typescript.md` fixes; `Summary` cells equal the doc-block
description paragraphs (`npm.cmd run test:guides` proves parity).

## Output

Final message: touched files with one-line summaries; `git diff --stat`; `git status
--porcelain`; the two baseline readings; for each semantic bullet the test title that pins it
and its red-then-green command with the failing count and the passing count; the Unknown's
reading; the acceptance commands with exit codes and counts; deviation state. No process diary.

## Deviation contract

Stop and report on: the emitter guide contradicting a member this brief names; an off-limits file
that must change; a rule forbidding a named member. Decide, record, carry on for test placement,
fence wording, and the after-`destroy` behaviour.

## Acceptance criteria

1. `npm.cmd run lint:check` exit 0; `npm.cmd run check` exit 0.
2. `npm.cmd run test:src:core` exit 0 with the new tests, each red before its implementation
   (recorded) and green after.
3. `npm.cmd run test:guides` exit 0 with the new rows and the executed fence.
4. `npm.cmd run test:setup`, `test:policy`, `test:config` exit 0.
5. `npm.cmd run format:check` exit 0.
6. Only owned files changed beyond the U8a manifest and lockfile.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after you exit and runs the
authoritative gates on the host.
