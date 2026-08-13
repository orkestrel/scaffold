# `@orkestrel/test` — the reconciled contract

The Orchestrator's ruling over two blind design lanes: `planner` on Opus 5 (subjective) and
`analyst` on GPT-5.6 Sol (objective, thread `019ffa3b-6cc7-79b0-ba2d-ca7bcbec1dc5`, 64 commands
executed). Neither lane saw the other's answer. Both engines ran on their default lanes; no
substitution was needed.

## Where both lanes agreed, independently

These are settled and need no further argument: `createRecorder` and `waitForDelay` ship; the
async-iterable and stream collectors ship; the guide-parity filesystem machinery ships in server and
is the largest single win; no runtime dependency on `emitter`, `terminal`, `workflow`, `contract` or
`guide`; reject `createGate` and `createDeferred`, `waitForAbort`, `waitForCondition`, `flushSocket`,
`waitForSettlement`, `uniqueName`, `isAddressInfo`, `TEST_SEED`; reject a `distribution` project and
any new Vitest project; consumers import directly with no re-export and adopt one helper family at a
time; the package's own tests may never use a helper as its own oracle.

## The membership rule

Both lanes needed one and neither stated it, so the disagreements below are decided by this:

> **Ship a helper when it has three or more members that are not all inside one dependency cluster,
> or five or more members regardless.** Otherwise record it as intentionally excluded with its
> count, and revisit when a third independent consumer appears.

A cluster is a set of packages where one runtime-depends on another. Two related packages sharing a
helper is one team's convention, not a fleet pattern, and `AGENTS.md`'s creation gate forbids
speculating past the evidence. Sol put it well: repetition earns consideration, not automatic
publication.

## Rulings on the eleven disagreements

### 1. `clear()` semantics — Sol

Truncate (`calls.length = 0`), not reassign. Opus argued reassignment from the rule against leaking
a mutable internal reference; Sol argued truncation from 30 of 32 existing implementations and from
the fact that a reassigned array leaves a captured reference permanently stale, which is the worse
trap. Measurement settles the migration risk that motivated Opus: across 129 `.clear()` call sites in
the fleet, **zero** capture `calls` into a variable first, so no consumer can tell the two apart
today. Truncation makes adoption a no-op for 30 packages. Pin the semantics with a test and state
them in the guide.

### 2. Runtime dependencies — Opus, and further

**Zero runtime dependencies.** Sol proposed `@orkestrel/server` so `createFixtureServer` could use
its published `isAddressInfo` rather than write a fourth copy, and Sol's C2 reasoning was correct:
the helper's signature carries only Node types, so the installed copy never crosses into a consumer
assertion.

It is still the wrong trade. That dependency drags a six-package closure — `abort`, `contract`,
`emitter`, `router`, `server`, `timeout` — into all 41 repositories to avoid a two-line predicate,
and `ollama` already pins `server ^0.0.11` in development against a registry serving `0.0.12`, so
adding it installs two copies there on day one.

So `createFixtureServer` is **excluded from 0.0.1** rather than reimplemented. Its three members
(`server`, `router`, `middleware`) are a cluster, and the two packages that need the guard should
import `isAddressInfo` from `@orkestrel/server`, which already publishes it. Zero dependencies is
load-bearing: it is what makes this package incapable of causing a duplicate-copy failure for
anyone, ever.

### 3. Browser environment — Opus

**No `src/browser` in 0.0.1.** Sol proposed `createElement` and `deleteDatabase`. Measured, the
browser candidates are `createElement` (2: `mcp`, `router`) and five names shared by `database` and
`indexeddb`, where the first runtime-depends on the second. Every candidate is a two-member group and
one is a cluster. A published environment costs a build target, a scoped tsconfig, a barrel and a
Playwright test project; four weakly-evidenced helpers do not earn it. Revisit at a third independent
consumer.

### 4. `captureError` — split, and Sol is wrong on the main case

Sol rejected all throw-capture as assertions. That is right about one variant and wrong about the
one that matters. The permissive form — 12 packages, the fourth-strongest signal in the inventory —
runs a thunk and returns the thrown value or `undefined`. It **decides nothing**; the test asserts
afterwards. That is conversion, not assertion. **Ship it.**

The required variant, which throws when nothing was thrown, does decide. One package carries it
(`budget`), so it fails the creation gate anyway. **Reject.**

### 5. Narrowing helpers — split

`requireValue` ships (6 packages under two spellings). Opus's grounding is the stronger one and it
rests on a non-negotiable: `AGENTS.md` bans `!` and `as`, so a throw-on-absence narrowing helper is
the sanctioned mechanism, and `tests.md` draws its line at `describe`/`it`/`expect`, none of which
this touches. The fleet's `expect*` and `assert*` spellings are renamed to `require*` so the
vocabulary never borrows the assertion verb.

`requireMatch`/`assertAndNarrow` (1), `requireElement` (2) and `requireText` (2) are **rejected**.
The last two are redundant under `noUncheckedIndexedAccess`, which is on fleet-wide.

### 6. `roundTripJSON` — both, by fixing the signature

Sol was right that `<T>(value: T): T` over `JSON.parse(JSON.stringify(v))` is unsound. Opus was right
that 5 packages want it. Rejection is not the fix; the signature is. Ship it constrained to a locally
declared `JSONValue`, so the claim it makes is true. JSON is a spec-level shape, not one package's
contract, so declaring it here is legitimate under the structural-shape rule below.

### 7. `createRecorderMap` — REVERSED. It does not ship.

This item was first ruled the other way, on an Orchestrator error. The four-arm probe was read as
proving that a structural signature preserves inference. It does not: that probe passed both type
arguments explicitly, so it proved **assignability** across two copies and nothing about inference.
`TMap` appears only as `TMap[TName]`, and an indexed access is not an inference site, so no source
shape can drive it. Sol's original objection — that a structural signature loses event-map inference
— was correct.

A second two-lane pass ruled the corrected question. Sol ruled ship-with-explicit-type-arguments on
centralization grounds. Opus ruled do-not-ship, and Opus is right on three grounds, all verified by
the Orchestrator against source:

1. **The constraint does not bind any consumer.** The two-copies rejection holds inside `emitter`'s
   own repository. `emitter` has **zero** uses of `recordEmitterEvents` or `EmitterRecorders`, and
   all 13 real consumers declare `@orkestrel/emitter` `^0.0.6` as a **runtime dependency**, none as a
   development one. Each therefore resolves exactly one copy and its local helper infers cleanly.
   The weakened signature would tax 13 repositories to satisfy a constraint belonging to a
   fourteenth that will never call it.
2. **`RecorderEventMap` restates `@orkestrel/emitter`'s published contract.** Both are
   `Record<string, readonly unknown[]>`, byte for byte. That is the exact ground on which item 8
   rejected a structural `TimerHandler`. The doctrine below was satisfied only by renaming the
   symbol, which decided items 7 and 8 in opposite directions for no real reason.
3. **Option A moves the foreign-type import from 13 setup files to every call site.** There are 219
   call sites by the Orchestrator's count and 232 by Opus's text scan. A call site that does not
   import its own event map today would have to. That is the opposite of what the structural shape
   existed to achieve. **18** sites read a property off a call argument and would hard-error under
   degraded tuples with `as` and `!` banned.

**Struck from the contract**: `createRecorderMap`, `isTotal`, `SubscriberInterface`, `RecorderMap`,
`RecorderEventMap`. `createRecorder` still ships and is the kernel all 13 local copies are built
from, so the largest part of this cluster — 32 members — is still centralized. What stays local is a
15-line loop and one guard.

### 8. `createManualTimer` — Opus

**Reject.** Its two consumers are `terminal` and `toolbox`, and the second depends on the first — a
cluster. Its shape is `@orkestrel/terminal`'s published `TimerHandler`, verified at
`terminal/src/core/types.ts:444` as `(callback: () => void, ms: number) => TimerCancel`. Copying it
here would be a second, unversioned declaration of one package's contract.

`createClock` ships: its seam is `() => number`, which nobody owns, and its two consumers — `mcp` and
`middleware` — are unrelated.

### 9. Naming — Opus

Drop the redundant qualifier. Inside a package named `test`, `TestRecorderInterface` stutters and
`Manual` is vacuous because everything here is manual. `RecorderInterface`, `createClock`. The fleet
type `EmitterRecorders` becomes `RecorderMap`, because `names.md` bans pluralized type names
outright.

Placement decides names, never the reverse. A function returning a fresh value is a value factory, so
it lives in `factories.ts` and takes `create*` — which is what renames `recordEmitterEvents` to
`createRecorderMap`.

### 10. Boundary tables and hostile stubs — Sol

**Reject** `EXTREME_NUMBERS` (3), `TRICKY_KEYS` (2), `deepFreeze` (2), `invokeRaw` (3),
`createRevokedProxy` (2), `createThrowingGetter` (2), `createCyclicRecord` (2), `createDeepRecord`
(2). Every one is a two- or three-member group confined to the guard-and-evaluator cluster —
`contract`, `qualifier`, `reason`, `interpret`, `rater`, `workspace`. Sol's framing is right: a
numeric corpus is test policy, not a reusable mechanism.

The Orchestrator's own count corrects Opus here: `createDeepRecord` was cited as three members and is
two. `contract`'s `buildDeepNest` alternates array and object layers
(`contract/tests/setup.ts:2627`) while `qualifier` and `mcp` nest plain records. Covering all three
would need a mode argument, which the behaviour-splitting law forbids.

### 11. The scratch directory — Opus's name, Opus's shape, sync

`createScratch` over Sol's `createTempDirectory`: it dodges three collisions at once — `workspace` is
published and means something else, and `temp`/`dir` are abbreviations `names.md` bans.

Opus's richer `{ path, write, read, exists, destroy }` over Sol's `{ path, destroy }`: the read,
write and exists trio is precisely what the seven packages hand-roll immediately after allocating.

Synchronous, matching six of seven members and the 41 inline `mkdtempSync` calls. `middleware`'s
helper is async over `node:fs/promises` and is the one adoption cost; test setup is allowed to block,
so it converts.

## The structural-shape doctrine

Adopted from Opus, because it is the sharpest line either lane drew, and it generalizes:

> A locally declared structural shape is legitimate when it restates a **host-level or universal**
> shape — `on`, `() => number`, `AbortSignal`, `ReadableStream`, JSON. It is illegitimate when it
> restates **one package's published contract**, because that is a silent second declaration that
> drifts the moment the owner changes it.
>
> **Second clause, added after item 7 was reversed:** a structural shape is legitimate only when the
> type information the caller needs **survives** it. A shape that is assignable but drops the type
> parameter it exists to carry restates the owner's contract without its value.

The second clause is what the first was missing. Without it the doctrine was satisfied by renaming
`EventMap` to `RecorderEventMap`, and it decided items 7 and 8 oppositely for no real reason. With
it, `SubscriberInterface` and `RecorderEventMap` are rejected and `createClock`, `collect`,
`collectStream` and `roundTripJSON` still stand.

## The contract

Zero runtime dependencies. Two environments. **11 value exports and 6 types.**

### `src/core`

| Export | File | Signature | Members |
| --- | --- | --- | --- |
| `RecorderInterface` | `types.ts` | `<TArgs extends readonly unknown[]> { readonly calls: readonly TArgs[]; readonly count: number; readonly handler: (...args: TArgs) => void; clear(): void }` | 32 |
| `ClockInterface` | `types.ts` | `{ readonly now: () => number; advance(ms: number): void; set(value: number): void }` | 2 |
| `JSONValue` | `types.ts` | the recursive JSON value union | — |
| `waitForDelay` | `helpers.ts` | `(ms?: number) => Promise<void>` | 17 |
| `captureError` | `helpers.ts` | `(thunk: () => unknown) => unknown` | 12 |
| `requireValue` | `helpers.ts` | `<T>(value: T \| null \| undefined, message?: string) => T` | 6 |
| `collect` | `helpers.ts` | `<T>(source: AsyncIterable<T>) => Promise<readonly T[]>` | 4 |
| `collectStream` | `helpers.ts` | `<T>(stream: ReadableStream<T>) => Promise<readonly T[]>` | 3 |
| `roundTripJSON` | `helpers.ts` | `<T extends JSONValue>(value: T) => T` | 5 |
| `resolveRoot` | `helpers.ts` | `(meta: ImportMeta) => URL` | 40 |
| `createRecorder` | `factories.ts` | `<TArgs extends readonly unknown[]>() => RecorderInterface<TArgs>` | 32 |
| `createClock` | `factories.ts` | `(start?: number) => ClockInterface` | 2 |

`resolveRoot` sits in core deliberately: `import.meta` and `URL` are universal, and `fileURLToPath`
is what would have forced it into server.

### `src/server`

| Export | File | Signature | Members |
| --- | --- | --- | --- |
| `ScratchInterface` | `types.ts` | `{ readonly path: string; write(relative, text): void; read(relative): string \| undefined; exists(relative): boolean; destroy(): void }` | 7 |
| `ScratchOptions` | `types.ts` | `{ readonly prefix?: string; readonly files?: Readonly<Record<string, string>> }` | — |
| `InventoryOptions` | `types.ts` | `{ readonly extensions?: readonly string[]; readonly exclude?: readonly string[] }` | — |
| `readInventory` | `helpers.ts` | `(root: URL \| string, directories: readonly string[], options?: InventoryOptions) => Readonly<Record<string, string>>` | 39 |
| `createScratch` | `factories.ts` | `(options?: ScratchOptions) => ScratchInterface` | 7 |

`readInventory` takes the symlink-refusing form that `guide` and `mcp` already share, and returns
exactly the map `@orkestrel/guide`'s `SourceOptions.files` accepts — a structural match needing no
import in either direction, so the package stays clean even inside `guide`'s own repository.

## Behavioural rulings to pin with tests

- `clear()` truncates; a captured `calls` reference empties.
- `createScratch().destroy()` is idempotent and removes only its own allocated directory.
- `readInventory` returns sorted root-relative `/`-separated keys, refuses a symlinked root or
  requested directory, skips descendant links, and refuses paths outside the root.
- `roundTripJSON` is constrained to `JSONValue`, so its identity claim is true.

## Intentionally excluded from 0.0.1, on evidence

`createRecorderMap` and its four supporting declarations (13 members, but the shared signature cannot import `EventMap` and so cannot infer it; ~219 call sites would each carry two type arguments and 18 would hard-error; the constraint forcing the weakened shape binds `emitter`, which is not a consumer) · `isTotal` (13, exists only to serve it) · `createFixtureServer` (3, cluster, forces a 6-package dependency) · all browser helpers (2 each, one
a cluster) · `createManualTimer` (2, cluster, restates terminal's contract) · required-variant
`captureError` (1) · `requireMatch` (1) · `requireElement` (2) · `requireText` (2) ·
`createErrorRecorder` (11, but a 5-line delegate to `createRecorder` in 10 of them) · `createGate`
(8, native `Promise.withResolvers`) · `EXTREME_NUMBERS` (3) · `TRICKY_KEYS` (2) · `deepFreeze` (2) ·
`invokeRaw` (3, cluster) · `createRevokedProxy` (2) · `createThrowingGetter` (2) ·
`createCyclicRecord` (2) · `createDeepRecord` (2) · `TEST_SEED` (4, a bare literal) · `uniqueName`
(2, hidden module state) · `flushSocket` (2, unjustified constant) · `waitForCondition` (2, polling)
· `waitForSettlement` (1) · every product-specific peer, protocol fixture and domain builder.
