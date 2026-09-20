# Unit U6 report — successor 7

## Diff

`src/browser/helpers.ts`

```diff
@@ releasePointer's @throws @@
- * @throws Thrown when the release rejects, or when the subsequent park to the origin rejects and
- * carries the release rejection as its cause.
+ * @throws Thrown when the release or the park rejects. If both reject, the aggregate carries the
+ * park rejection as its cause and the release rejection in its errors.

@@ releasePointer's @remarks @@
- * to the origin in cleanup. If that park also rejects, an aggregate reports its message and cause,
- * with the release rejection in its errors. The provider must expose a DevTools session.
+ * to the origin in cleanup. If that park also rejects, the aggregate carries the park rejection as
+ * its cause and the release rejection in its errors. The provider must expose a DevTools session.

@@ holdAccessible(name) @throws, both overloads (replace_all) @@
- * @throws Thrown when the resolver refuses the target, a pointer is already held, or the press misses.
+ * @throws Thrown when the resolver refuses the target, a pointer is already held, or the press
+ * misses. A missed press that also fails to release carries the release rejection as its cause.

@@ holdAccessible(name) @remarks @@
- * The centre maps through the tester iframe's painted scale into page coordinates. The `:active`
- * reading verifies delivery. A missed press releases before refusing. Register {@link releasePointer}
- * in teardown before holding; release can produce a click on the pressed control. A rejected
- * button-down send leaves no hold marker.
+ * The centre maps through the tester iframe's painted scale into page coordinates. The `:active`
+ * reading verifies delivery. A missed press releases before refusing; if that release also
+ * rejects, the refusal carries it as its cause. Register {@link releasePointer} in teardown
+ * before holding; release can produce a click on the pressed control. A rejected button-down send
+ * leaves no hold marker.
```

`guides/test.md`

```diff
@@ holdAccessible Bounds bullet (guides/test.md:1608) @@
- **`holdAccessible` maps through the tester iframe's painted scale and reads `:active` back.**
  It presses the control's centre and releases before refusing a missed press. The measured layout
- is a single accessible, uniformly scaled tester iframe. A covered centre or unsupported geometry
- can refuse even when the resolver accepts the target. The verb inherits the resolver's focus
- reachability conditions.
+ If that release also rejects, the missed-press refusal carries it as its cause. The measured
+ layout is a single accessible, uniformly scaled tester iframe. A covered centre or unsupported
+ geometry can refuse even when the resolver accepts the target. The verb inherits the resolver's
+ focus reachability conditions.

@@ re-wrap at guides/test.md:1633-1635 @@
  the same recorded readings. A release with nothing staged clears every override and compares
- readings taken strictly after the reset
- until they are stable. Stability doesn't prove the engine's own baseline. Each release read-back
+ readings taken strictly after the reset until they are stable. Stability doesn't prove the
+ engine's own baseline. Each release read-back
```

The `releasePointer` Bounds bullet at `guides/test.md:1613-1618` already stated the correct shape
("the park's error surfaces with the release rejection attached in the aggregate's errors; the park
rejection is its cause") and needed no change.

## Gates

1. `npx oxfmt --config .oxfmtrc.json --write src/browser/helpers.ts guides/test.md` — exit 0.
   `Finished in 940ms on 2 files using 16 threads.`
2. `npm run format:check` — exit 0. `All matched files use the correct format.` /
   `Finished in 1167ms on 60 files using 16 threads.`
3. `npm run lint:check` — exit 0, no warnings reported.
4. `npm run check` — exit 0 (`tsc --noEmit` for the root project plus `check:src:core`,
   `check:src:browser`, `check:src:server`, all clean).
5. `npm run build` — exit 0. `✓ built in 108ms` (core), browser bundle
   `dist/src/browser/index.js 143.22 kB │ gzip: 44.39 kB`, server bundles built and `.cjs`/`.cts`
   copies produced; the API Extractor TypeScript-version notice is pre-existing informational
   output, not a failure.
6. `npm run test:guides` — exit 0. `Test Files 1 passed (1)` / `Tests 50 passed | 1 skipped (51)`.

## Deviations

None.

## Review evidence

`git status --porcelain`:

```
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
```

These are the six U6 files; `src/browser/constants.ts`, `src/browser/types.ts`, and
`tests/setup.ts`/`tests/src/browser/helpers.test.ts` carry earlier rounds' uncommitted changes,
untouched by this unit. This unit's diff is confined to `src/browser/helpers.ts` and
`guides/test.md`, shown above.
