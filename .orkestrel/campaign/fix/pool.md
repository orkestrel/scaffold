# Fix dossier: pool

Verified fix-producing findings for the `pool` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s18-17 — DRIFT-RESHAPE

17. package=pool file=`src/core/types.ts:4` rule=`AGENTS.md` § Design laws ("One concept, one term. Do not alternate synonyms") verdict=CONFIRMED
    wrong: One concept — tearing down a pooled resource — carries two terms. The public option is `destroy` (`types.ts:57`), the event is `destroy` (`types.ts:33`), but the error code is `'cleanup'` (`types.ts:4`), the private field is `#cleanup` (`Pool.ts:29`), the error builder is `#cleanupError` (`Pool.ts:549`), and the prose alternates freely (`types.ts:10` "cleanup failures", `types.ts:32` "cleanup hook", `factories.ts:9` "every in-flight hook and cleanup").
    repair: Pick the fixed lifecycle verb. Rename the `PoolCode` member `'cleanup'` to `'teardown'` at `types.ts:4` (`'destroy'` would read too near the existing `'destroyed'` state code), rename `#cleanup` to `#destroy` at `Pool.ts:29`, `:70`, `:489`, rename `#cleanupError` to `#teardownError` at `Pool.ts:549`, `:522`, `:568`, and reword `types.ts:10`, `:32` to say "destroy".

### Verification

**Lane DRIFT-RESHAPE/high:** amend: unify on `destroy` rather than introducing `teardown`. Rename the `PoolCode` member to `'destroy'` at types.ts:4; rename `#cleanup` to `#destroy` (Pool.ts:29, :70, :489) and `#cleanupError` to `#destroyError` (Pool.ts:522, :549, :568); update the code literals at Pool.ts:381 and :551, the message at errors.ts:32, and the prose at types.ts:10, :32, errors.ts:20, factories.ts:10. Scope the unit to own tests/src/core/Pool.test.ts (eight assertions) and guides/pool.md:57, 58, 62, 106, 107, 121, 125.

**Lane DRIFT-RESHAPE/high:** amend: rename the `PoolCode` member `'cleanup'` to `'destroy'`, not `'teardown'` — it is symmetric with the existing `'create'` code (both name a hook), it reuses the term the option and event already use, and it adds no new word to the package's vocabulary; `'destroyed'` stays distinct as the pool's state code. Then rename `#cleanup` → `#destroy` (Pool.ts:29,70,489) and `#cleanupError` → `#destroyError` (Pool.ts:549,522,568), reword types.ts:10 and :32 to say 'destroy', and scope the sites the finding omits: errors.ts:32, Pool.ts:381,551, the guide rows at guides/pool.md:57,58,62,107,135, and the ~12 test assertions on `code: 'cleanup'` in tests/src/core/Pool.test.ts (:468, :520, :682, :715, :749, :778, :808, :932, :965, :966, :983).

## s18-18 — DRIFT

18. package=pool file=`src/core/types.ts:73-78` (and `src/core/Pool.ts:57-61`) rule=`.claude/rules/typescript.md` § Comments and API documentation ("State a prerequisite and the failure behavior wherever the symbol has either") verdict=CONFIRMED
    wrong: `acquire` throws `PoolError` **synchronously** for a non-native signal (`Pool.ts:106-108`) while returning a `Promise` on every other path — a caller wrapping it in `.catch()` alone misses it — and no `@throws` documents that. The `Pool` constructor throws `PoolError({ code: 'invalid' })` for a bad `max` (`Pool.ts:64-66`) and its TSDoc at `Pool.ts:57-61` names no `@throws` either.
    repair: Add `@throws {@link PoolError}` with `code: 'invalid'` and the synchronous-throw note to `types.ts:73-78`, and add `@throws {@link PoolError}` for a non-positive-safe-integer `max` to `Pool.ts:57-61`.

