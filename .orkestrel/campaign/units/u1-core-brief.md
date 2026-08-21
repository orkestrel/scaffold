# U1 — core surface of `@orkestrel/test` 0.0.9

## Role and engine

You are the Sol implementer (GPT-5.6 Sol) inside a `codex exec` `workspace-write` sandbox rooted at
`/home/user/test`. You are the sole writer in this checkout. Perform this assignment directly and
yourself; spawn nothing.

## Objective

Add the adopted core helpers to `@orkestrel/test` and prove them, exactly as specified here.

## Authority — read before writing

1. `/home/user/test/AGENTS.md`
2. `/home/user/test/.claude/rules/typescript.md`, `architecture.md`, `names.md`, `tests.md`,
   `patterns.md` — the tests rule governs the test files you write.
3. `/home/user/test/guides/test.md` — read the Voices and Contract sections so your TSDoc matches
   the package's existing voice. You do not edit the guide; a later unit owns it.

Skill: none. The governing spec is this brief plus those rules.

## Context

- The package is `@orkestrel/test` 0.0.8, zero runtime dependencies, peer `vitest ^4.1.10`. You
  must not add any dependency.
- The tree is a clean committed baseline. Node modules are installed. The sandbox denies network
  and mounts `.git` read-only: run no git command that writes; prove restoration with
  `git diff` reads only.
- Scoped validation commands that work here: `npm run check:src:core`, `npm run test:src:core`,
  `npm run lint:check`, `npm run format:check`. Do not run tree-wide mutating `format` or `lint`.
  Do not run `npm run build` (slow; the Orchestrator runs it after integration).
- Existing exports you will touch or sit beside: read `src/core/types.ts`, `src/core/helpers.ts`,
  `src/core/factories.ts` in full before editing. Match their TSDoc density and voice exactly:
  every export carries a TSDoc block with `@param`/`@returns`/`@remarks`/`@example` as its
  neighbors do.

## Owned files

- `src/core/types.ts`
- `src/core/factories.ts`
- `src/core/helpers.ts`
- `tests/src/core/factories.test.ts`
- `tests/src/core/helpers.test.ts`

Off-limits: everything else, including `src/core/index.ts` (already star-exports your three files),
`guides/`, `package.json`, every `src/browser` and `src/server` file, and the vendored
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`.

## The work

### New types in `src/core/types.ts`

```ts
export interface EventSourceInterface<TMap extends Record<string, readonly unknown[]>> {
	on<K extends keyof TMap>(event: K, handler: (...args: TMap[K]) => void): void
}

export type RecorderMap<
	TMap extends Record<string, readonly unknown[]>,
	TName extends keyof TMap,
> = { readonly [K in TName]: RecorderInterface<TMap[K]> }

export interface SignalInterface {
	readonly controller: AbortController
	readonly signal: AbortSignal
	readonly count: number
}

export interface ResourceFactoryInterface {
	readonly created: RecorderInterface<readonly [id: number]>
	readonly destroyed: RecorderInterface<readonly [id: number]>
	create(): number
	destroy(id: number): void
}
```

Member names and shapes are settled; adjust generic parameter names only if a rule forces it.

### New factories in `src/core/factories.ts`

- `createRecorders<TMap, TName>(source: EventSourceInterface<TMap>, events: readonly TName[]): RecorderMap<TMap, TName>`
  — wires one `createRecorder` per listed event onto `source` and returns the map. Build the record
  directly with no `Partial` accumulator, no guard, no throw path, and no type assertion. This
  construction is proven to compile: map the events to entries and return `Object.fromEntries`
  typed against the declared return. Duplicate names in `events` wire once per occurrence; document
  the behavior you implement.
- `createSignal(): SignalInterface` — allocates a real `AbortController`, instruments **that
  instance's** `addEventListener`/`removeEventListener` (never a prototype) to tally live `abort`
  listeners, and exposes the tally as `count`. A `{ once: true }` abort listener that fires must
  decrement the tally: wrap the listener so firing decrements, and keep `removeEventListener`
  working for the original function the caller passed. Prove the once-path with a test.
- `createResourceFactory(): ResourceFactoryInterface` — returns monotonically increasing ids from
  `create`, records each id on `created`, records each `destroy(id)` on `destroyed`. Derive the
  next id from what has been created rather than a second counter.

### Widenings in `src/core/factories.ts`

- `createRecorder`: give `TArgs` the default `readonly unknown[]`. No other change.
- `createHostileValues`: extend the returned set with a revoked array proxy, a cyclic array, a
  sparse array (real holes), an object with a non-enumerable own key, and an object with a named
  throwing getter — but first read the existing membership and add only what is not already
  covered. Update the factory's `@remarks` example count language only if it states a count
  (the rules forbid stating counts; if you find one, delete it rather than update it).

### New helpers in `src/core/helpers.ts`

- `waitForAbort(signal: AbortSignal): Promise<void>` — resolves immediately when already aborted,
  else parks on a `{ once: true }` abort listener. No timeout, no polling.
- `invokeUnchecked<T>(target: unknown, method: unknown, args: readonly unknown[]): T` — throws
  `TypeError` when `method` is not callable; otherwise `Reflect.apply`. This is the package's one
  sanctioned boundary over the banned assertion; keep the `any` contained inside the body and
  state the contract in `@remarks`: the caller owns the claim that the result has type `T`.
- `readProperty<T>(target: unknown, key: PropertyKey): T` — reads one member off an `unknown`
  through `Reflect.get`, same contained-`any` contract, and throws `TypeError` when `target` is
  neither object nor function.
- `flattenHeaders(init: HeadersInit): Readonly<Record<string, string>>` — normalizes through
  `new Headers(init)` and returns a frozen plain record.

### Widening in `src/core/helpers.ts`

- `retryUntil`: on exhaustion, include a bounded rendering of the last produced value in the thrown
  message. Do not change the signature.

### Tests

Extend `tests/src/core/factories.test.ts` and `tests/src/core/helpers.test.ts` beside the existing
suites, in their style, importing from the relative source barrel exactly as the existing tests do.
Cover for each new symbol: the happy path, the boundary the contract names, and the failure path.
Specifically prove:

- `createRecorders` records per-event argument tuples in order against a minimal in-file event
  source (a scripted boundary stub implementing `on` is sanctioned); property reads on the returned
  map need no assertion or narrowing at the call site.
- `createSignal` counts add/remove; the fired `{ once: true }` listener decrements; `abort()` still
  aborts; removing the original callback the caller passed works.
- `createResourceFactory` ids increase monotonically; `created`/`destroyed` record exactly the ids.
- `waitForAbort` resolves on an already-aborted signal without a timer, and resolves when aborted
  later.
- `invokeUnchecked` invokes and returns; throws `TypeError` on every non-callable member of
  `createHostileValues()` without leaking a different error.
- `readProperty` reads; throws on primitives.
- `flattenHeaders` accepts the record, entries-array, and `Headers` forms and returns equal frozen
  records; header names arrive lowercased by the platform — assert what the platform returns.
- the widened `createHostileValues` set still satisfies the documented loop contract; every member
  either throws on a naive read or violates a naive assumption — assert per-index as the existing
  example does.
- `retryUntil` exhaustion message names the last value.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when:
the specified construction of `createRecorders` fails to typecheck; a specified signature collides
with an existing export; a scoped gate fails for a cause outside your owned files. Ancillary
choices (test names, TSDoc wording, member ordering) are yours: decide, record, continue.

## Output

Your final message is the report, exactly:

- `Delivered` — each symbol with file:line.
- `Validation` — the exact scoped commands run and their exit codes.
- `Decisions` — ancillary calls you made.
- `Deviations` — or `none`.
- `Flags` — anything an auditor must attack first.

## Acceptance criteria

1. `npm run check:src:core` exit 0.
2. `npm run lint:check` exit 0.
3. `npm run format:check` exit 0 (run `npx oxfmt --config .oxfmtrc.json --write` on your owned
   files only if needed, never tree-wide).
4. `npm run test:src:core` exit 0 with the new tests collected and passing.
5. `git status` shows changes only in owned files.
6. No `as`, no `!`, no `any` outside the two documented contained bodies, no `@ts-` directive, no
   new dependency, no count stated in prose.

## Amendment — baseline defect in your owned file (added after the baseline run)

`tests/src/core/helpers.test.ts:230` fails on this host before any change:

```
FAIL |src:core| retryUntil > rejects when the time budget is exhausted
AssertionError: expected 2 to be 1
```

Command: `npx vitest run --project src:core tests/src/core/helpers.test.ts` — 1 failed, 54 passed,
reproduced alone on an idle container, so it is deterministic here, not load.

The test asserts the exact producer-call count, which is the runtime's choice — the tests rule
forbids that: assert the property, not the number one run produced. Repair it as part of this unit:
either bound the retry deterministically (`attempts: 1`) so the count is contract rather than
timing, or assert the relationship the contract fixes (at least one call, none starting after the
budget). Record the failing command and count before, and the same command green after.

## Amendment 2 — baseline restored (successor to the lockfile deviation)

Your first run stopped correctly: `package-lock.json` was dirty from the Orchestrator's own
`npm install`, a standing condition the brief failed to name. That normalization is committed;
`git status` is clean at your start. The lockfile remains off-limits and will not be dirty again.
