# Unit middleware-fixup — close the middleware unit's audit findings

## Role and engine

`implementer` on Claude Opus 5, a native subagent (the Sol bench is dark; substitution recorded).
You perform the assignment directly and spawn nothing.

## Objective

The findings both audit lanes raised against `@orkestrel/middleware` at commit `453f794` are
closed as ruled: the prose claims the code does not earn are restated or proven, the
factories-to-store import cycle is gone, the persisted-row question is settled by a run, the
retired words leave the surviving names, and every behavior the guide states has an executed
assertion.

## Context

**Findings, each with its ruling.** Apply them in this order.

1. **Claim 2 (objective) — `src/core/factories.ts:92` and `:117`.** `@typeParam S - The session
   data payload type` survives on `createMemorySessionStore` and `createDatabaseSessionStore`
   while `S extends SessionInterface` is an entity. Ruling: "The session entity type".
2. **F1 / R-3 (both lanes) — `src/core/types.ts:305-307`, `src/core/Session.ts:10-12`,
   `guides/middleware.md:298-299`.** The prose claims no consumer holds the entity's own `Map`,
   while `get state()` returns `this.#state` and `instanceof Map` narrows it. A per-read copy would
   tax every read, so ruling: restate all three sites to the enforced fact — `state` is a
   `ReadonlyMap` view, TypeScript refuses a write through it, and `set`, `delete`, and `clear`
   are the write path. Keep the getter as it is.
3. **F2 / Referral D (both lanes) — the cycle `src/core/factories.ts` → `stores/DatabaseSessionStore.ts`
   → `factories.ts`.** `architecture.md` § Kind purity places class-driving files above the
   classes and never consumed by them. Ruling: `DatabaseSessionStore` receives its rebuild step
   by injection and imports nothing from `factories.ts`; `createDatabaseSessionStore` supplies
   `createRestoredSession`. Choose the minimal constructor shape that keeps the `guard`'s role
   (the store still narrows to `S`); state the shape you chose and why in the report. Update the
   class TSDoc, the `SessionStoreInterface` guide section, and any fence constructing the class
   directly; pin with a test in `tests/src/core/stores/DatabaseSessionStore.test.ts` that a
   store built through `createDatabaseSessionStore` rebuilds a `Session` from a stored row (drive
   the real `MemoryDriver`-backed table the file already uses). `rg -n "from '\.\./factories" src/core/stores`
   returns no hit afterwards.
4. **F3 (objective) — `src/core/shapers.ts:23-28` renamed the table columns `lastSeen` → `seen`
   and `createdAt` → `created`; a table declared under the earlier columns may read `undefined`
   into `sessionExpired` and make every stale row immortal.** Ruling: run the question, do not
   reason it. In `tests/src/core/stores/DatabaseSessionStore.test.ts`, create a database whose
   `sessions` table is declared with the earlier column names (`lastSeen`, `createdAt`), write one
   row under that shape, then open the same driver's data under the current `sessionColumns`
   through the real `@orkestrel/database` and drive `store.get`. Record what happens. If the
   database layer refuses (a `DatabaseError` whose code is `MIGRATION` or another fail-closed
   signal), keep that as the executed assertion and add one sentence to the guide's durable-store
   section (`guides/middleware.md` § "Session store seam — durable database-backed store", near
   `:642-664`) stating that a table declared under the earlier column names fails open closed
   until it is migrated or recreated. If it reads silently, make `DatabaseSessionStore.get` fail
   closed on a row whose `seen` or `created` is not a finite number (throw a `TypeError` naming
   the column, in the style the store's other refusals use), pin that with the same test, and
   state it in the same guide sentence. Report which branch the run took with the exact output.
5. **F4 (objective) — `guides/middleware.md:485-487`.** The empty-filename clause says such a
   part is a no-op, while `MultipartParser.ts:162-170` discards only when `filename === ''` and the
   body is zero bytes. Ruling: carry the qualifier "and a zero-byte body" into the guide sentence,
   matching `src/server/parsers.ts:21-25`.
6. **F5 (objective) — the multipart default constants.** `DEFAULT_MULTIPART_FILE`,
   `DEFAULT_MULTIPART_FILES`, `DEFAULT_MULTIPART_FIELD`, `DEFAULT_MULTIPART_FIELDS` default the
   regrouped `file.size`, `file.count`, `field.size`, `field.count`. Ruling: rename them to
   `DEFAULT_MULTIPART_FILE_SIZE`, `DEFAULT_MULTIPART_FILE_COUNT`, `DEFAULT_MULTIPART_FIELD_SIZE`,
   `DEFAULT_MULTIPART_FIELD_COUNT`; `DEFAULT_MULTIPART_TOTAL` stays. Carry every consumer, guide
   row, and test. No package outside middleware names them (fleet sweep at dispatch: no hit).
   `MultipartLimitsInput` stays as landed (Referral A, retained).
7. **R-1 (subjective) — `guides/middleware.md:442-445`.** The DELETE half of the contract item
   ("a consumer ending a session on `DELETE` mounts its own handler over `control.destroy()`")
   has no executed assertion after the unit deleted both DELETE tests. Ruling: add a case in
   `tests/src/core/middlewares.test.ts` that runs a `DELETE` request carrying a valid session id
   through `createSession` with a recording terminal and asserts the terminal ran, the status is
   not `204`, and `store.get(id, now)` still resolves.
8. **R-2 (subjective) — `src/core/factories.ts:122` `@throws` on `createDatabaseSessionStore`
   and the `validateSessionLimits` call in the `DatabaseSessionStore` constructor.** No test
   drives the seam. Ruling: mirror `MemorySessionStore construction` in
   `tests/src/core/stores/DatabaseSessionStore.test.ts` (`ttl: Number.NaN` and the `lifetime`
   case throw `TypeError`) and add the `createDatabaseSessionStore` case beside the existing
   `createMemorySessionStore({ ttl: Number.NaN })` case in `tests/src/core/factories.test.ts`.
9. **Referral B (subjective), ruled apply.** `transferSessionData` → `transferSessionState`
   (it copies `state`) and `buildClientInfo` → `buildClient` (it returns `Client`); `data` and
   `info` are § Rejected naming words. Carry `src/core/middlewares.ts`, the tests, and the guide
   rows; no consumer outside middleware names either (fleet sweep at dispatch: no hit).
10. **Referral C (subjective), ruled apply now.** `SessionSnapshot.data` → `state`. The wire shape
    is this package's own (`snapshotSession` writes it, `createRestoredSession` reads it) and no
    release carries the current shape yet, so the migration cost is zero before publish. Carry
    `snapshotSession`, `createRestoredSession` and its `@example`, `isSession`-adjacent guards
    that read the snapshot, the `SessionSnapshot` `@remarks`, the tests, and the guide rows. This
    changes the persisted JSON inside the `SessionRow.session` column; state that in the same
    durable-store guide sentence finding 4 adds.

**Prose sweep.** After the renames, run a word-boundary search over `src`, `tests`, `guides/middleware.md`,
`README.md` for `transferSessionData`, `buildClientInfo`, `DEFAULT_MULTIPART_FILES`,
`DEFAULT_MULTIPART_FIELDS`, `data payload`, and `snapshot.*\bdata\b`, then again
case-insensitively for the inflected forms, and classify every hit.

**Law.** `AGENTS.md`; `.claude/rules/names.md` (the landed vocabulary is quoted in
`/home/user/scaffold/tmp/units/breaking/middleware-brief.md` § Vocabulary);
`.claude/rules/architecture.md` § Kind purity; `.claude/rules/patterns.md`; `.claude/rules/tests.md`
(real `@orkestrel/database` driver, no mock); `.claude/rules/documentation.md` § Parity;
`.claude/rules/writing.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/middleware` at commit `453f794`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged and re-verified against the accepted tips (contract `2c15840`, database
`c7baae0`, indexeddb `bf4730e`, sqlite `5a9340b`; `node /home/user/work/verify-stage.mjs middleware`).
Do not run `npm install`. Build a throwaway probe, where you need one, under the system temporary
directory, never under the checkout. One pre-existing `it.todo` in `tests/src/server/helpers.test.ts:1186`
and platform `runIf` cases are outside this unit. Other gate chains run on this host concurrently;
if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once and report both
readings.

**Standing conditions.** none.

## Unknowns

Which branch finding 4 takes; the constructor shape finding 3 needs. Report both.

## Scope

**Owned.** `src/core/**`, `src/server/constants.ts`, `src/server/helpers.ts`, `src/server/types.ts`
(only where finding 6 reaches), `guides/middleware.md`, `README.md`, `tests/**` except the vendored
policy pair, and the parity `INTERNAL` list if a class moves (none is expected to).

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other
checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, stage, push, install, or
discarding `git` command. Tree-wide `format` only to converge after `npm run lint`; then the
non-mutating chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. For findings 3, 4, 7, and 8
write the test first and record it failing (quote the count) before the change that turns it
green, except where finding 4's run settles that no code change is needed. Then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the constructor shape chosen for finding 3 and why; the exact run and output for
finding 4 and the branch taken; the failing-first and passing counts for each new test; the prose
sweep and every hit classified; each gate command with its exit code and an excerpt for any
failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the injection in finding 3 cannot keep the `guard`'s role without a second
public parameter shape you cannot choose between, when finding 4's run produces a third outcome
neither branch names, when a rename collides with an existing export, or when a gate fails for a
cause you cannot attribute after the re-run. Decide, record, and carry on from the wording of a
guide sentence or a TSDoc line.

## Acceptance criteria

1. `rg -n 'data payload' src` returns no hit.
2. `rg -n "from '\.\./factories" src/core/stores` returns no hit, and the rebuild-through-injection
   test passes.
3. Finding 4's test exists, records the branch taken, and the guide sentence states it.
4. `rg -n 'transferSessionData|buildClientInfo|DEFAULT_MULTIPART_FILES|DEFAULT_MULTIPART_FIELDS' src tests guides/middleware.md README.md`
   returns no hit; `SessionSnapshot` declares `state` and no `data`.
5. The DELETE and construction-guard cases exist, failed first, and pass.
6. The gate chain exits 0.
7. `git status --short` lists only owned files.
