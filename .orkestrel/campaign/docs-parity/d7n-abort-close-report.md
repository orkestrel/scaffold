# Report — `d7n-abort-close`

## Items

1. **The `Shape` idiom (Rulings 15, 18, 20).** `guides/abort.md`:
   - `### Validators` gained the guard sentence "In a guard table a `Shape` cell holds the type the guard narrows to." and a `Shape` column carrying `AbortSignal` for `isAbortSignal`.
   - `### Types` convention sentence replaced with the canon: "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`."
   - `AbortOptions` row: `{ id?: string; signal?: AbortSignal }` → `{ id?, signal? }`.
   - `AbortInterface` row: `{ id, signal, aborted, abort }` → `{ id, signal, aborted } plus abort`.
   - Diff:
```diff
-| API             | Kind     | Summary                                                                                                                       |
-| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
-| `isAbortSignal` | function | Determines whether a value is a native `AbortSignal`, staying total for structural spoofs and for hostile or revoked proxies. |
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| API             | Kind     | Shape         | Summary                                                                                                                       |
+| --------------- | -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
+| `isAbortSignal` | function | `AbortSignal` | Determines whether a value is a native `AbortSignal`, staying total for structural spoofs and for hostile or revoked proxies. |

-A `Shape` cell holds an interface's members in braces, and a type alias's value.
+A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.

-| `AbortOptions`   | interface | `{ id?: string; signal?: AbortSignal }` | Represents the options for `createAbort` and `Abort` construction.                                                                                                                                     |
-| `AbortInterface` | interface | `{ id, signal, aborted, abort }`        | Represents the cancellation contract a consumer holds — a traceable `id`, the exposed `AbortSignal`, an `aborted` reading of it, and an idempotent `abort` that cancels the work bound to that signal. |
+| `AbortOptions`   | interface | `{ id?, signal? }`                   | Represents the options for `createAbort` and `Abort` construction.                                                                                                                                     |
+| `AbortInterface` | interface | `{ id, signal, aborted } plus abort` | Represents the cancellation contract a consumer holds — a traceable `id`, the exposed `AbortSignal`, an `aborted` reading of it, and an idempotent `abort` that cancels the work bound to that signal. |
```
   The `AbortOptions` row carries no extended-interface parent and no `## Constants` table exists in this guide, so Ruling 21's extended-interface and constants-widened-type clauses are inert here.

2. **Member references.** The brief's site list read `(none)`; confirmed by running `npm run docs` (`rows read: 1, disagreements found: 0`). No `{@link}` cell needed a re-read. No hunk.

3. **The drop-in's canon (Rulings 13 and 20).** This checkout is the pilot the brief names, so the region from `const root = ` through the manifest loop's closing brace is the reference text itself. The brief's own diff against the pilot read `(no difference)`; `git status --short` after the full run shows `tests/guides.test.ts` untouched, confirming no drift existed to close. No hunk.

4. **Fence lead-ins (Ruling 21).** `### Create and abort` sat directly over its fence with no sentence between them. Added one sentence naming what the fence shows:
```diff
 ### Create and abort
 
+Create a handle, hand its `signal` to cancellable work, and call `abort(reason)` to cancel it:
+
 ```ts
 import { createAbort } from '@orkestrel/abort'
```

5. **Propagation.** Ran in order:
```text
$ npx oxfmt --write guides/abort.md tests/guides.test.ts
Finished in 387ms on 2 files using 4 threads.

$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Scoped validation

1. `git status --short` → `M guides/abort.md` (owned files only; `tests/guides.test.ts` needed no change).
2. `grep -n '| interface *| `{[^`]*:' guides/abort.md` → no output (exit 1). `grep -n '…' guides/abort.md` → no output (exit 1).
3. Item 3 region diff against the pilot: unchanged, empty (this checkout is the pilot); line 2 of `tests/guides.test.ts` equals the pilot's own line 2 (self-identical).
4. `npx oxfmt --check guides/abort.md tests/guides.test.ts` → "All matched files use the correct format." Finished in 325ms on 2 files. `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → exit 0, silent.
5. `npm run docs` → `rows read: 1, disagreements found: 0`, exit 0. `npm run docs -- --to guide` and `-- --to source` → `written: 0` on each.
6. `npm run test:guides` →
```text
Test Files  1 passed (1)
     Tests  25 passed (25)
  Duration  371ms
```
   `npm run test:policy` →
```text
Test Files  1 passed (1)
     Tests  90 passed | 1 skipped (91)
  Duration  462ms
```

## Deviation report

None. No `Shape` cell fell outside Ruling 12's idiom, the equality case ran green under the default budget, every gate scoped to the owned files exited 0, and `--to guide` closed with `written: 0` (no disagreement to close).

## Files touched

- `/home/user/fleet/abort/guides/abort.md`
