# Report — `d7n-pool-close`

## Item 1: the `Shape` idiom (Rulings 15, 18, 20)

`guides/pool.md` § Guards headed `Shape` with the narrowed type under the guard sentence:

```diff
### Guards

-| API            | Kind     | Summary                                                                                                          |
-| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
-| `isPoolError`  | function | Tests whether an unknown value is a `PoolError`, returning `false` for hostile proxies.                          |
-| `isPoolMax`    | function | Tests whether a value is a positive safe integer, the only valid explicit pool maximum.                          |
-| `isPoolSignal` | function | Tests whether a value is a native `AbortSignal` for the acquire boundary, returning `false` for hostile proxies. |
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| API            | Kind     | Shape         | Summary                                                                                                          |
+| -------------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------------------- |
+| `isPoolError`  | function | `PoolError`   | Tests whether an unknown value is a `PoolError`, returning `false` for hostile proxies.                          |
+| `isPoolMax`    | function | `number`      | Tests whether a value is a positive safe integer, the only valid explicit pool maximum.                          |
+| `isPoolSignal` | function | `AbortSignal` | Tests whether a value is a native `AbortSignal` for the acquire boundary, returning `false` for hostile proxies. |
```

Each narrowed type matches its guard's own type predicate in `src/core/validators.ts` and
`src/core/errors.ts` (`value is number`, `value is AbortSignal`, `value is PoolError`).

The `## Types` table's convention sentence already read Ruling 15's canonical wording, and each
listed row (`PoolContext`, `PoolErrorOptions`, `PoolOptions`) already carried the correct
`plus`-free brace form: reading each interface's declaration in `src/core/types.ts` confirms none
of the three declares a call-signature member, so no `plus` clause applies. `PoolToken` and
`PoolInterface` already carried `plus` for their call-signature members, and `PoolEventMap`
already carried Ruling 19's bare member names. No row needed a rewrite.

## Item 2: member references

`(none)` per the brief; confirmed no `{@link Owner#member}` or `{@link #member}` form in
`src/core/*.ts`.

## Item 3: the drop-in's canon (Rulings 13 and 20)

`tests/guides.test.ts`'s header carried the retired wording (the struck "and are the only parts a
sibling package changes" clause Ruling 21 removes). Corrected to the pilot's bytes:

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
-// this repo's own `guides/README.md` manifest. The constants that follow and the
-// executed `flagship fences` block are this package's own, and are the only parts a
-// sibling package changes.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.
```

The drop-in region from `const root = ` through the manifest loop's closing brace matched the
pilot byte for byte outside the constants block per the brief's supplied diff (`(no difference)`),
and the `INTERNAL` block already carried the pilot's sentence.

## Item 4: fence lead-ins (Ruling 21)

Added one sentence between each named heading and its fence:

```diff
 ### Create a pool
 
+Construct a pool from create, destroy, and validate hooks, then acquire and release one token:
+
 ```ts
```

```diff
 ### Validate public boundaries
 
+Check a candidate value or error against the public boundary guards before acting on it:
+
 ```ts
```

```diff
 ### Always release and explicitly tear down
 
+Release every acquired token and call `destroy()` explicitly after work finishes:
+
 ```ts
```

## Item 5: propagation

Ran in order: `oxfmt --write`, then the checks.

## Acceptance criteria

1. `git status --short` → `M guides/pool.md`, `M tests/guides.test.ts` (owned files only).
2. `grep -n '| interface *| \`{[^\`]*:' guides/pool.md` → no output. `grep -n '…' guides/pool.md` → no output.
3. The item 3 region diff against the pilot: none beyond the header fix, which now equals the
   pilot's; no package-specific case was appended or needed beyond what already existed.
4. `npx oxfmt --check guides/pool.md tests/guides.test.ts` → "All matched files use the correct
   format." exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → exit 0 (no output).
5. `npm run docs` → `rows read: 1, disagreements found: 0` exit 0.
   `npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
   `npm run docs -- --to source` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
6. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 28 passed (28)`, duration 545ms, exit 0.
   `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, duration
   627ms, exit 0.

Wall clock: the full sequence (oxfmt write, oxfmt check, oxlint, three `docs` runs, two test runs)
completed in under one minute of tool time.

## Deviations

None. No item hit the stop conditions in the deviation contract.
