# Report — `d7n-emitter-converge`

Wall clock: 2026-09-07T15:24:50Z to 2026-09-07T15:31:59Z, in `/home/user/fleet/emitter` from `3c0e3de`.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after adding the three cases and before any convergence: `Tests 3 failed | 20 passed (23)`.

`pairs at least one example title across the guide and the source`:

```
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/emitter.md pairs: guide [\"Surface\",\"Standalone emitter\",\"Own an emitter\",\"Manage listeners\"] source []",
```

`opens the README with the guide tagline`:

```
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:109:20
    109|  expect(pitch).not.toBeUndefined()
```

`Emitter > keeps every compared summary and example equal to its source`:

```
AssertionError: expected [ …(16) ] to deeply equal []
+   "guides/emitter.md function createEmitter: guide \"Create an `EmitterInterface<TMap>`, optionally with initial `on` hooks.\" source \"Creates a typed event emitter — the foundational observable primitive.\"",
+   "guides/emitter.md function extractKeys: guide \"Extract an object's own enumerable keys, typed as its key union.\" source \"Extracts the own enumerable keys of a mapped object, typed as its key union.\"",
+   "guides/emitter.md class Emitter: guide \"The typed synchronous emitter; entities own one as `#emitter`.\" source \"Implements a typed synchronous event emitter — the foundational observable primitive of the codebase. Stateful entities OWN one as a `#emitter` field and expose it through `readonly emitter`; they never inherit from it.\"",
+   "guides/emitter.md type EventMap: guide absent source \"Maps each event name to the argument tuple its listeners receive.\"",
+   "guides/emitter.md type EmitterHandler: guide absent source \"Represents a listener for one event's argument tuple.\"",
+   "guides/emitter.md type EmitterErrorHandler: guide absent source \"Represents the emitter's OWN listener-error handler — invoked when a listener throws during `emit`, with the caught error and the (stringified) event name.\"",
+   "guides/emitter.md type EmitterHooks: guide absent source \"Declares the initial event listeners for an emitter — the reserved `on` option: a partial map of event name to its handler, wired at construction.\"",
+   "guides/emitter.md interface EmitterOptions: guide absent source \"Configures `createEmitter` and the `Emitter` constructor.\"",
+   "guides/emitter.md interface EmitterInterface: guide absent source \"Represents a typed synchronous event emitter — the foundational observable primitive. Entities OWN one as `#emitter` and expose `readonly emitter`; they never inherit from it.\"",
+   "guides/emitter.md EmitterInterface.on: guide absent source \"Registers a listener for an event. Does nothing after `destroy()`.\"",
+   "guides/emitter.md EmitterInterface.once: guide absent source \"Registers a listener that removes itself after its first call. Does nothing after `destroy()`.\"",
+   "guides/emitter.md EmitterInterface.off: guide absent source \"Removes a listener registered for an event, including one registered through `once`.\"",
+   "guides/emitter.md EmitterInterface.emit: guide absent source \"Invokes an event's listeners synchronously, in registration order. Does nothing after `destroy()`.\"",
+   "guides/emitter.md EmitterInterface.count: guide absent source \"Returns the live listener count.\"",
+   "guides/emitter.md EmitterInterface.clear: guide absent source \"Drops registered listeners, leaving the emitter usable and `destroyed` unchanged.\"",
+   "guides/emitter.md EmitterInterface.destroy: guide absent source \"Tears down the emitter: drops every listener and sets `destroyed` to `true`. Idempotent.\"",
```

The cases sit where the pilot puts them: `keeps every compared summary and example equal to its source` inside the manifest loop's `describe(entry.concept)` block; `pairs at least one example title across the guide and the source` and `opens the README with the guide tagline` at file scope, the pin in the inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line, the README case with two `not.toBeUndefined()` guards before `toBe`. `GUIDE_SPEC` is `'guides/emitter.md'`, used by the pin, by `own`, and by the README case; `ROOT_FILES` became `Object.freeze(['AGENTS.md', 'README.md'])` and its doc line now reads "Root-level files these checks read"; `findDrift` joined the `@orkestrel/guide` import beside the existing readers.

## Criterion 2 — the headers and the class rows

`grep -n '^| ' guides/emitter.md` header rows after the change:

```
49: | API             | Kind     | Summary  |
55: | API           | Kind     | Summary  |
61: | API       | Kind  | Summary  |
69: | Type                  | Kind      | Shape  | Summary  |
88: | Method    | Returns  | Summary  |
```

Every table heads `Summary` beside only `Kind`, `Shape`, or `Returns`. Changes: `### Entities` → `### Classes` (its one row's `Kind` is `class`); the `## Methods` table's `Behavior` header → `Summary`; the `### Types` table gained `Summary` as its last column. No class is documented under its own H3 in this guide (`grep -n '^#\+ ' guides/emitter.md` lists `### Factories`, `### Helpers`, `### Classes`, `### Types`, `#### \`EmitterInterface\``, and the `## Patterns` H3s), so the `### Classes` table's `Emitter` row is the whole population.

The `Shape` idiom and its convention sentence, placed under the `### Types` heading above the table, matching the pilot at `/home/user/fleet/abort/guides/abort.md:60` (ancillary placement decision, recorded):

```
A `Shape` cell holds an interface's members in braces, and a type alias's value.
```

Rows whose literal stayed in `Shape`, each with its em-dash clause removed and carried by the doc block:

| Row | `Shape` cell kept |
| --- | --- |
| `EventMap` | `Record<string, readonly unknown[]>` |
| `EmitterHandler` | `(...args: TArgs) => void` |
| `EmitterErrorHandler` | `(error: unknown, event: string) => void` |
| `EmitterHooks` | `{ [K in keyof TMap]?: EmitterHandler<TMap[K]> }` |
| `EmitterOptions` | `{ on?: EmitterHooks<TMap>; error?: EmitterErrorHandler }` |
| `EmitterInterface` | `{ destroyed, on, once, off, emit, count, clear, destroy }` |

The `EmitterInterface` cell was reworded from `` `destroyed` data member + `on` / `once` / … `` into the pilot's brace idiom so one idiom covers the table.

## Criterion 3 — the blocks rewritten by hand, then `--to guide`

Blocks rewritten before the propagation, each because the guide cell or the `Shape` clause carried information the description lacked:

- `src/core/factories.ts` `createEmitter` — the description now states the factory's preference as the contract it returns (Ruling 7): "Creates a typed synchronous event emitter and returns it as an `EmitterInterface<TMap>`, wiring the initial `on` hooks and the `error` handler its options carry." The remark sentence the description now repeats, "Prefer this over `new Emitter(...)` at call sites that only need the interface.", was pruned; the entity sentence beside it stays.
- `src/core/Emitter.ts` `Emitter` — rewritten distinct from `EmitterInterface`, which the old pair of near-identical paragraphs would have put in two cells: "Implements the emitter contract over one listener `Set` per event, so every public method is precisely typed with no assertion. A stateful entity owns one as a `#emitter` field and exposes it through `readonly emitter`; it never inherits from it." The `@remarks` bullet the description now repeats, "**Per-event storage.** Listeners live in a per-event `Set`, so every public method is precisely typed with no assertions.", was pruned.
- `src/core/types.ts` `EmitterInterface` — rewritten to the contract's members, so the class row and the interface row read as different facts: "Represents the contract a consumer of an emitter holds: the `destroyed` reading, the `on` / `once` / `off` registration trio, the synchronous `emit`, and the `count` / `clear` / `destroy` set that reports on and releases listeners."
- `src/core/types.ts` `EmitterErrorHandler` — took the `Shape` clause's `error` option and dropped the shouting caps: "Represents the emitter's own listener-error handler — the `error` option, invoked when a listener throws during `emit`, with the caught error and the stringified event name."
- `src/core/types.ts` `EmitterInterface.off` — took the guide cell's "by its original handler".
- `src/core/types.ts` `EmitterInterface.emit` — took the guide cell's "isolating a throw"; its `@remarks` first sentence was reworded from "Every listener runs: a throw is isolated and routed to …" to "Every listener runs, and an isolated throw routes to …" so the remark stops repeating the description.
- `src/core/types.ts` `EmitterInterface.count` — took "for one event or across every event".
- `src/core/types.ts` `EmitterInterface.clear` — took "for one event or every event".

Blocks left as they stood, their descriptions already carrying the cell: `extractKeys`, `EventMap`, `EmitterHandler`, `EmitterHooks`, `EmitterOptions`, `EmitterInterface.on`, `.once`, `.destroy`.

```
$ npm run docs -- --to guide
wrote guides/emitter.md
rows read: 1, disagreements found: 16, written: 16, reported: 0
EXIT 0
$ npx oxfmt --write guides/emitter.md          exit 0
$ npm run docs
rows read: 1, disagreements found: 0
EXIT 0
```

Nothing was reported, so every cell the headers exposed was located; no row needed a hand-written cell.

## Criterion 4 — the titled pair

The pair is `createEmitter`'s `@example` block in `src/core/factories.ts` — the primary factory, the only `create*` the facts block lists — titled `Standalone emitter`, paired with the first fence under the `### Standalone emitter` heading. Every other block stays untitled (`grep -c '@example \S' src/core/*.ts` names `factories.ts` alone).

Two fences demonstrate `createEmitter`: the one under `## Surface` and the one under `### Standalone emitter`. I took `Standalone emitter` (recorded ancillary decision): its body is the standalone construction the factory's own block documents, while the `## Surface` fence carries the event-map convention commentary that belongs to the guide rather than to one declaration's block.

Heading uniqueness, heading-scoped:

```
$ grep -n '^#\+ Standalone emitter$' guides/emitter.md
114:### Standalone emitter
```

The fence body read before titling — in the tree this unit leaves, `grep -n '```' guides/emitter.md` opens that fence at 116 and closes it at 129, so its body carries no three-backtick run; `grep -c '\*/' guides/emitter.md` returned 0, so no doc-comment terminator disqualifies it.

The title landed first, and the read after it names the pair and both bodies:

```
$ npm run docs
guides/emitter.md Standalone emitter: guide "ts\nimport { createEmitter } from '@orkestrel/emitter'\n\ntype DownloadEventMap = {\n\tchunk: readonly [bytes: number]\n\tdone: readonly []\n}\n\nconst emitter = createEmitter<DownloadEventMap>()\nemitter.on('chunk', (bytes) => accumulate(bytes))\nemitter.once('done', () => finish())\nemitter.emit('chunk', 1024)\nemitter.emit('done')" source "ts\nimport { createEmitter } from '@src/core'\n\ntype ClockEventMap = {\n\ttick: readonly [at: number]\n}\n\nconst clock = createEmitter<ClockEventMap>({ on: { tick: (at) => log(at) } })\nclock.emit('tick', Date.now())"
rows read: 1, disagreements found: 1
EXIT 1
$ npm run docs -- --to source
wrote src/core/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
EXIT 0
$ npx oxfmt --write src/core/factories.ts      exit 0
$ npm run docs
rows read: 1, disagreements found: 0
EXIT 0
```

## Criterion 5 — the tagline, the opening prose, the pitch

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and `README.md` carries the same text with the same line breaks:

```
> The foundational observable primitive: a typed, synchronous event emitter that a
> stateful entity owns as a `#emitter` field and exposes through a `readonly emitter`
> property, fanning each event out to its listeners in the current tick and isolating a
> throwing listener from its siblings.
```

The guide's opening prose after the blockquote carries the displaced sentences, none restating a tagline clause: the entity examples and the `entity.emitter.on(...)` subscription; "Composition, never inheritance", verbatim; "It is deliberately small"; the absent scheduler, listener cap, `max`-listeners warning, and `console` output; `emit` in registration order and `on` returning `void` rather than an `Unsubscribe`; the throw routing to the optional `error` handler and being swallowed silently with no handler; and the `Source: [\`src/core\`](../src/core). Surfaced through the \`@src/core\` barrel.` sentences the link disqualified from the blockquote.

The README's opening paragraph is onboarding it alone carries, and restates no tagline clause: "Create an emitter with the `createEmitter` function, subscribe with `on` or `once`, and call `emit` to fan an event out to its listeners. Own one as a `#emitter` field where an entity of your own reports lifecycle transitions, and pass an `error` handler to receive a listener's throw. Part of the `@orkestrel` line."

The guide's `## Tests` first bullet now names the equality gate descriptively, with no SQ/MQ/EQ/RQ identifier: "the equality gate: every `Summary` cell against its declaration's description paragraph, the titled `Standalone emitter` fence against the `@example` block of that title (pinned so the titled pair cannot be retired silently), and the README pitch against this guide's tagline."

## Criterion 6 — the seed reads clean and idempotent

```
$ npm run docs
rows read: 1, disagreements found: 0                                   EXIT 0
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0          EXIT 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0          EXIT 0
```

## Criterion 7 — the gates

```
$ npx oxfmt --check guides/emitter.md README.md tests/guides.test.ts src/core/factories.ts src/core/Emitter.ts src/core/types.ts
All matched files use the correct format.  Finished in 699ms on 6 files            EXIT 0
$ npx oxlint --config .oxlintrc.json --deny-warnings guides/emitter.md README.md tests/guides.test.ts src/core/factories.ts src/core/Emitter.ts src/core/types.ts
(no output)                                                                        EXIT 0
$ npx oxlint --config .oxlintrc.json --deny-warnings src tests
(no output)                                                                        EXIT 0
$ npm run check
tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json
(no output)                                                                        EXIT 0
$ npm run test:guides
Test Files  1 passed (1);  Tests  23 passed (23)                                   EXIT 0
$ npm run test:policy
Test Files  1 passed (1);  Tests  90 passed | 1 skipped (91)                       EXIT 0
```

Observation, the narrowest unit script: `npm run test:src:core` → `Test Files 3 passed (3); Tests 43 passed (43)`, EXIT 0.

This `oxlint` build prints nothing on a clean run, so the lint criterion rests on its exit code. No control line was planted, per the brief; the control reading is the Orchestrator's after this unit exits.

## Criterion 8 — status

```
$ git status --short
 M README.md
 M guides/emitter.md
 M src/core/Emitter.ts
 M src/core/factories.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, `tests/setup*.ts`, `tests/src/**`, and every vendored file are untouched.

```
$ git diff --stat
 README.md             | 18 ++++++-------
 guides/emitter.md     | 75 ++++++++++++++++++++++++++++++---------------------
 src/core/Emitter.ts   |  8 +++---
 src/core/factories.ts | 22 ++++++++-------
 src/core/types.ts     | 28 ++++++++++---------
 tests/guides.test.ts  | 75 +++++++++++++++++++++++++++++++++++++++++++++++++--
 6 files changed, 157 insertions(+), 69 deletions(-)
```

## Reader and seed defects

None. Every cell the headers exposed was located (`reported: 0` on both writes), the titled body was carried in whole, no residual disagreement stood after the rewrites, and no reader returned a shape outside the brief's description. `--to guide` over this guide's three- and four-column tables disturbed no cell outside the written column, and `oxfmt` 0.66.0 restored the committed alignment, matching P16.

## Deviations

None.
