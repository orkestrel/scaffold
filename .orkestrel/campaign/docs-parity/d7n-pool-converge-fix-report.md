# Report — `d7n-pool-converge-fix`

Item P1 and item P2 landed. Every acceptance criterion is green. No deviation.

Touched files, all owned:

- `guides/pool.md` — the `### Types` table gains `Shape` under Ruling 15's convention sentence; the readonly-member sentence is gone; the `isPoolSignal` and rewritten type cells re-converged through `--to guide`.
- `src/core/types.ts` — the `PoolCode` and `PoolEventMap` description paragraphs state what each type represents; their member lists live in the `Shape` cells.
- `src/core/validators.ts` — the `isPoolSignal` description carries "for the acquire boundary".

```text
 guides/pool.md         | 33 +++++++++++++++++----------------
 src/core/types.ts      |  6 ++----
 src/core/validators.ts |  3 ++-
 3 files changed, 21 insertions(+), 21 deletions(-)
```

## Item P1 — the `Shape` column (Ruling 15)

`guides/pool.md`:

```diff
 ### Types

-| API                | Kind      | Summary                       |
-| ------------------ | --------- | ----------------------------- |
-| `PoolCode`         | type      | Names the machine-readable failure codes produced by `PoolError`: `invalid`, `destroyed`, `create`, and `cleanup`. |
-| `PoolContext`      | interface | Represents the structured context attached to a `PoolError`: the rejected input, or the distinct destroy-hook failures an aggregate cleanup collected. |
-| `PoolErrorOptions` | interface | Represents the construction options for `PoolError`: the stable code, an optional cause, and optional structured context. |
-| `PoolEventMap`     | type      | Represents the observable resource lifecycle events emitted by a `PoolInterface`: `create`, `acquire`, `release`, and `destroy`. |
-| `PoolToken`        | interface | Represents a unique lease over one pool-owned resource record, exposing that record as a readonly `value` and returning it through an idempotent `release`. |
-| `PoolOptions`      | interface | Represents the resource lifecycle options for `Pool` and `createPool`: creation, destruction, validation, capacity, and observation. |
-| `PoolInterface`    | interface | Represents a FIFO resource pool with optional bounded capacity and deterministic teardown, exposing its record counts and a typed lifecycle emitter. |
-
-`PoolInterface.emitter`, `size`, `idle`, and `active` are readonly data properties.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
+
+| API                | Kind      | Shape                                                          | Summary                       |
+| ------------------ | --------- | -------------------------------------------------------------- | ----------------------------- |
+| `PoolCode`         | type      | `'invalid' \| 'destroyed' \| 'create' \| 'cleanup'`            | Names the machine-readable failure codes produced by `PoolError`. |
+| `PoolContext`      | interface | `{ value?, failures? }`                                        | Represents the structured context attached to a `PoolError`: the rejected input, or the distinct destroy-hook failures an aggregate cleanup collected. |
+| `PoolErrorOptions` | interface | `{ code, cause?, context? }`                                   | Represents the construction options for `PoolError`: the stable code, an optional cause, and optional structured context. |
+| `PoolEventMap`     | type      | `{ create, acquire, release, destroy }`                        | Represents the observable resource lifecycle events emitted by a `PoolInterface`. |
+| `PoolToken`        | interface | `{ value } plus release`                                       | Represents a unique lease over one pool-owned resource record, exposing that record as a readonly `value` and returning it through an idempotent `release`. |
+| `PoolOptions`      | interface | `{ on?, error?, create, destroy?, validate?, max? }`           | Represents the resource lifecycle options for `Pool` and `createPool`: creation, destruction, validation, capacity, and observation. |
+| `PoolInterface`    | interface | `{ emitter, size, idle, active } plus acquire, clear, destroy` | Represents a FIFO resource pool with optional bounded capacity and deterministic teardown, exposing its record counts and a typed lifecycle emitter. |
+
 `size` counts every owned record, including records being validated or destroyed. `idle`
```

The `Summary` column in the preceding hunk is elided at its column rule for width; the file carries each cell whole, and `git diff guides/pool.md` at the tip prints the full rows. The behavioural sentences about `size`, `idle`, and `active` stay; only the sentence that listed `PoolInterface`'s readonly members is gone.

Every `Shape` cell is read from `src/core/types.ts`: `PoolOptions` declares `create`, `destroy`, `validate`, `on`, and `error` as function-typed properties rather than call-signature members, so they sit inside the braces with no `plus`; `PoolEventMap` is an alias over an object literal and takes Ruling 19's bare member names; `PoolCode` takes its union with `\|`.

`src/core/types.ts`, the descriptions that had become member lists:

```diff
 /**
- * Names the machine-readable failure codes produced by {@link PoolError}: `invalid`, `destroyed`,
- * `create`, and `cleanup`.
+ * Names the machine-readable failure codes produced by {@link PoolError}.
  */
 export type PoolCode = 'invalid' | 'destroyed' | 'create' | 'cleanup'
```

```diff
 /**
- * Represents the observable resource lifecycle events emitted by a {@link PoolInterface}:
- * `create`, `acquire`, `release`, and `destroy`.
+ * Represents the observable resource lifecycle events emitted by a {@link PoolInterface}.
  */
 export type PoolEventMap = {
```

## Item P2 — `isPoolSignal`

`src/core/validators.ts`:

```diff
 /**
- * Tests whether a value is a native `AbortSignal`, returning `false` for hostile proxies.
+ * Tests whether a value is a native `AbortSignal` for the acquire boundary, returning `false`
+ * for hostile proxies.
  *
  * @param value - The unknown signal candidate
```

The clause is the pre-P.2 cell's own ("Total native `AbortSignal` guard for the acquire boundary.", `11509e9:guides/pool.md:51`). It sits in the description paragraph rather than `@remarks`, because the objective finding named the cell as well as the block and `@remarks` is unread by the comparison. `npm run docs -- --to guide` carried it into the guide's Guards row.

## Item P3 — propagation

`npm run docs -- --to guide` after the block edits:

```text
wrote guides/pool.md
rows read: 1, disagreements found: 1, written: 1, reported: 0
next: npm run format
```

`npx oxfmt --config .oxfmtrc.json --write guides/pool.md src/core/types.ts src/core/validators.ts`:

```text
Finished in 336ms on 3 files using 4 threads.
```

The formatter aligns Markdown tables, so the table went in unaligned and came out in the guide's own column form. A probe under `tmp/d7n-pool-converge-fix/probe-table.md` established that before the guide was touched.

## Acceptance criteria

1. `git status --short`:

```text
 M guides/pool.md
 M src/core/types.ts
 M src/core/validators.ts
```

`tmp/` is ignored, so the instruments under `tmp/d7n-pool-converge-fix/` do not appear.

2. `npx oxfmt --config .oxfmtrc.json --check guides/pool.md src/core/types.ts src/core/validators.ts`:

```text
All matched files use the correct format.
Finished in 374ms on 3 files using 4 threads.
oxfmt exit=0
```

`npx oxlint --config .oxlintrc.json --deny-warnings src/core/types.ts src/core/validators.ts`:

```text
oxlint exit=0
```

`PATH=/opt/npm11/bin:$PATH npm run check`:

```text
> tsc --noEmit -p configs/src/tsconfig.core.json

check exit=0
```

3. `npm run docs`, then the `--to guide` and `--to source` directions:

```text
rows read: 1, disagreements found: 0
docs exit=0
rows read: 1, disagreements found: 0, written: 0, reported: 0   (--to guide)
rows read: 1, disagreements found: 0, written: 0, reported: 0   (--to source)
```

`git status --short` after those directions still lists the same owned files and nothing else.

4. `grep -cn "A \`Shape\` cell holds an interface" guides/pool.md` prints `1`, the sentence sitting under `### Types` and preceding the table. `grep -n '| interface *| \`{[^\`]*:' guides/pool.md` prints nothing (exit 1). `grep -n 'are readonly data properties' guides/pool.md` prints nothing (exit 1).

5. `PATH=/opt/npm11/bin:$PATH npm run test:guides`:

```text
 Test Files  1 passed (1)
      Tests  28 passed (28)
   Duration  433ms
guides exit=0
```

`PATH=/opt/npm11/bin:$PATH npm run test:policy`:

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  526ms
policy exit=0
```

## Ancillary decisions

- **Which descriptions were rewritten.** The test applied: rewrite a description whose trailing clause repeats the type's own member or arm names, which the `Shape` cell carries verbatim. `PoolCode` and `PoolEventMap` meet it. `PoolContext`, `PoolErrorOptions`, `PoolOptions`, `PoolToken`, and `PoolInterface` do not: each clause is prose about what the members hold or what the type covers ("the rejected input", "creation, destruction, validation, capacity, and observation"), not the names. `PoolErrorOptions` is the closest call — "the stable code, an optional cause, and optional structured context" tracks `{ code, cause?, context? }` with adjectives — and it was kept, so the Orchestrator can rule the other way cheaply if a lane reads Ruling 15's "prose that only listed them" wider than the names.
- **The first column header.** `API` stays, per Ruling 10.
- **No `Shape` column on the Guards table.** Its rows are functions; Ruling 15's trigger is an interface or type-alias row, and the brief scoped item P1 to `### Types`.
- **No Methods pointer replacing the deleted sentence.** The brief said delete, and `## Methods` already opens by naming `PoolInterface` and `PoolToken`.

## Wall clock

The edit and validation window ran 20:50:25Z to 20:51:39Z on 2026-09-07, from the baseline `npm run docs` (`rows read: 1, disagreements found: 0`) to the last gate. Reading the brief, the rulings, the verdict, the pilot's and budget's tables, and pool's sources preceded that window.
