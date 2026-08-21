# scaffold fix unit 3 — report

## `git diff --stat`

```text
 src/server/Materializer.ts | 10 +++++++---
 src/server/types.ts        | 10 +++++++---
 2 files changed, 14 insertions(+), 6 deletions(-)
```

## `src/server/types.ts` changes

Before:

```text
	 * Delete the files the plan does not own.
	 *
	 * @param plan - The compiled plan whose foreign paths may be deleted.
	 * @param audit - The preview returned by this materializer's `audit` method; its foreign findings are the candidate set.
```

After:

```text
	 * Re-derive and delete the tracked files the plan does not own.
	 *
	 * @param plan - The compiled plan that decides which paths are foreign.
	 * @param audit - The preview returned by this materializer's `audit` method; it must agree with the candidate set this call re-derives.
```

Before (end of `@remarks`):

```text
	 * audit from this materializer. The refusal is deliberate at `0.0.x` and there
	 * is no migration.
	 */
```

After (added sentence at the end of `@remarks`):

```text
	 * audit from this materializer. The refusal is deliberate at `0.0.x` and there
	 * is no migration.
	 *
	 * The whole call refuses when the preview disagrees with the re-derivation on
	 * any foreign finding, including one the deletion itself would skip, because a
	 * preview stale anywhere is stale evidence.
	 */
```

## `src/server/Materializer.ts` changes

Before:

```text
	 * Delete the files the plan does not own.
	 *
	 * @param plan - The compiled plan whose foreign paths may be deleted.
	 * @param audit - The preview returned by this materializer's `audit` method; its foreign findings are the candidate set.
```

After:

```text
	 * Re-derive and delete the tracked files the plan does not own.
	 *
	 * @param plan - The compiled plan that decides which paths are foreign.
	 * @param audit - The preview returned by this materializer's `audit` method; it must agree with the candidate set this call re-derives.
```

Before (end of `@remarks`):

```text
	 * recovery mechanism, so a path it cannot restore is not one this verb takes.
	 * A tree carrying uncommitted work is refused whole for the same reason.
	 */
```

After (added sentence at the end of `@remarks`):

```text
	 * recovery mechanism, so a path it cannot restore is not one this verb takes.
	 * A tree carrying uncommitted work is refused whole for the same reason.
	 *
	 * The whole call refuses when the preview disagrees with the re-derivation on
	 * any foreign finding, including one the deletion itself would skip, because a
	 * preview stale anywhere is stale evidence.
	 */
```

## Acceptance criteria

1. `npm run format:check` — exit 0 (`npm run format` run first): "All matched files use the correct format."
2. `npm run lint:check` — exit 0, no output.
3. `rg -n "its foreign findings are the candidate set|plan whose foreign paths" src/` — no hit (exit 1).
4. `npm run check` — exit 0.
