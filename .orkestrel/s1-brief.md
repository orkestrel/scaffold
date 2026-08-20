# S1 — a build warning that ships a broken artifact must fail the build

## Role and engine

`sol` (GPT-5.6 Sol), through `codex exec`. Perform the assignment directly and spawn nothing.

This is objective, constraint-heavy work over generated configuration: which config file actually
carries the log handler when the build runs, and whether a merged factory option reaches it. It routes
to Sol.

## The defect

Rolldown emits `EMPTY_IMPORT_META` as a **warning** and the build exits 0. The CommonJS emit has
replaced `import.meta` with an empty object, so a call through it becomes `{}.resolve` and throws at
the consumer's first `require`. A warning nobody reads is not a gate, and every fleet package that
emits a CommonJS format can ship this.

`@orkestrel/probe` hit it, and hand-added a guard to its own `configs/helpers.ts` and `vite.config.ts`.
Both are scaffold-generated, so `scaffold overwrite` deletes the guard every time — measured on
2026-08-20:

```
$ npx scaffold overwrite
vite.config.ts replaced (2 lines removed).
configs/helpers.ts replaced (11 lines removed).
```

The repair belongs here, in the generator, not in one target.

## What to build

A `enforceBuildLog` function in `configs/helpers.ts` that throws on `EMPTY_IMPORT_META` and forwards
every other log to the handler it was given, wired into the generated build configuration so it
actually runs.

The shape probe proved:

```ts
export function enforceBuildLog(
	level: Rolldown.LogLevel,
	log: Rolldown.RolldownLog,
	report: Rolldown.LogOrStringHandler,
): void {
	if (log.code === 'EMPTY_IMPORT_META') {
		throw new Error(`[orkestrel-build] ${log.message}`)
	}
	report(level, log)
}
```

Take it or improve it, but keep the forwarding: a handler that swallows every other log makes the
build quieter than it was, which is a second defect.

## The measurement this unit turns on, and your first step

**Find out which configuration file actually carries the handler when a build runs. Do not assume.**

A target's `build:src:core` runs `vite build --config configs/src/vite.core.config.ts`, not the root
`vite.config.ts`. Some scoped configs call a root factory and merge into it — `configs/src/vite.bin.config.ts`
wraps `srcBin({ build: { rolldownOptions: { output: … } } })`, so a factory option reaches that build.
Others declare their own `build.lib` and `rolldownOptions` outright, in which case a factory option
never reaches them.

`src/core/templates.ts` holds every template. `rolldownOptions` appears at lines 140, 178, 212, 263,
300, 620, and 691 in the version at this commit. Establish, per environment, whether the build that
emits a CommonJS format reads a root factory's `rolldownOptions.onLog` or its own. State the answer
with the file and line before you wire anything.

If a merged factory option does reach the scoped build, prove that too — `mergeConfig` merging a
function-valued key is the question, and it is cheaper to run than to reason about.

## Wiring

`src/core/compilers.ts:821` derives the generated import line by filtering names the factory body
mentions:

```ts
const boundaries = ['environmentBoundary', 'outputBoundary'].filter((boundary) => body.includes(boundary))
```

So a template that names `enforceBuildLog` gets the import for free once the name joins that list. Use
that mechanism rather than adding a second import path.

Wire the guard into every generated build that emits a bundle, not only the CommonJS ones. The guard
fires on one code; where that code cannot occur it costs nothing, and a rule applied unevenly is a rule
the next environment forgets.

## The proof

A red proof is the whole point of this unit, and it has to be a real build, not a unit test of the
function.

Generate a workspace into a temporary directory with `scaffold new`, put a source file in it whose
CommonJS emit triggers `EMPTY_IMPORT_META` — a call through `import.meta` reached from the core entry
is the shape probe hit — and run that workspace's own `build:src:core`. Record the bare exit code and
the message before the guard is wired, and again after.

Before: exit 0 with a warning. After: non-zero, with `[orkestrel-build]` and the original message.

Then prove the guard does not swallow: a build emitting some other warning still exits 0 and still
prints it.

## Standing conditions

- The tree is clean at the commit the dispatch names. Version is 0.0.44; do not bump it.
- `configs/helpers.ts` is vendored byte-identical into every target, so it is the right home for a helper every target needs. `dist/host/` is built from it; do not edit `dist/` directly.
- `tests/config.test.ts` and `tests/policy.test.ts` are the gates over generated configuration. If your change moves what a generated `vite.config.ts` contains, those tests move with it and they are yours.
- A bench sandbox denies a grandchild process and a nested `npm install`. `scaffold new` followed by a build in the generated tree needs both. If either is denied, stop and report it with the exact settling command rather than substituting a weaker proof — a unit test of `enforceBuildLog` in isolation is exactly the substitution this brief refuses.

## Scope

**Owned:** `configs/helpers.ts`, `src/core/templates.ts`, `src/core/compilers.ts`, `tests/config.test.ts`, and any test file under `tests/` that asserts the generated configuration's content.

**Off-limits:** everything else, including `package.json`, `dist/`, `.agents/`, `.claude/`, `ROADMAP.md`, and every file in `.orkestrel/`.

**Tools:** read, write, and run commands inside `/home/user/scaffold`. Do not commit, push, install a dependency, or run a destructive command.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered so an unreachable criterion cannot hide the ones behind it.

1. You state, per environment and with `file:line`, which configuration carries the handler for the build that runs, and whether a root factory's option reaches it.
2. `enforceBuildLog` exists in `configs/helpers.ts`, throws on `EMPTY_IMPORT_META`, and forwards every other log.
3. A generated workspace's own build exits non-zero on that warning and exited 0 before the change, both recorded by bare exit code.
4. A build emitting a different warning still exits 0 and still prints it.
5. The generated import line carries `enforceBuildLog` only where a factory names it, derived rather than hard-coded.
6. `npm run format:check`, `npm run lint:check`, and `npm run check` each exit 0. Criteria.
7. `npm run build` and `npm test`: run them, record the bare exit code, and treat the result as an **observation**.

## Deviation contract

A conflict with the objective stops the unit: report expected, found, exact evidence, done or not done,
and at most one short hypothesis. A denied nested install or grandchild process stops criterion 3 and
is reported with its settling command; it does not stop criteria 1, 2, 5, and 6.

## Output

- The per-environment answer to criterion 1, with citations.
- The wiring, with `file:line` per change.
- The red-then-green build, both exit codes and both messages.
- The non-swallowing proof.
- The gate table: command, bare exit code, criterion or observation.
- Files changed.

No process diary.
