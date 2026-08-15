# H3 — the core catalog: store enumeration for completed runs

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, sandbox `workspace-write`, fresh thread, sole serial
writer from the committed checkpoint the launcher names. Perform directly, spawn nothing, no
commits/pushes/installs.

## Authority

The reconciled History design is settled in
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md` (History section) and the full objective
design in `/home/user/scaffold/tmp/redesign/history-analyst.md` §1 — read both before types. The
package is unpublished (registry 404): `src/` contract changes have zero external blast radius
but full types-first/naming/guide-parity discipline. `src/core/types.ts` is authoritative.

## What this unit owns (design §1, fixed)

- `SupervisorStoreInterface` gains one member: `list`. No offset paging, no totals, no cursor
  exposure of database internals.
- Types in `src/core/types.ts`: `RunRecord` (`id`, `created`, `updated`, optional `released`),
  `RunCursor` (`until`, `updated`, `id`), `RunListOptions` (optional `cursor`, `limit`, `prefix`,
  `runs`, `released`), `RunPage` (readonly `runs`, optional `cursor`). Readonly properties;
  TSDoc that names the watermark and exclusive-boundary semantics.
- The catalog record updates transactionally with supervisor operations: first `acquire` creates;
  takeover `acquire` preserves `created`, clears `released`, advances `updated`; `set` advances
  `updated` in the same transaction as the unit write; `renew` never advances (heartbeats must
  not reorder); `release` sets `updated` and `released` to the release instant.
- Ordering: newest-first by descending `(updated, id)`; the first page fixes an `until`
  watermark; later pages keep it with an exclusive `(updated, id)` boundary, so a changing
  catalog never shifts rows into an in-progress traversal.
- `prefix` is a case-sensitive run-id prefix; `runs` restricts to a supplied candidate set
  (authorization stays out of core); `released: true` selects history candidates.
- The database store gets a dedicated `runs` table + composite ordering index; the memory store
  the equivalent map. Database calls stay on the shared `Lane` (the repo's linearization —
  concurrent transactions on the shared driver are unsafe, recorded in the repo).

## Both stores must prove (design §1's list, verbatim scope)

Empty, one-page, multi-page, tie, prefix, candidate-set, and released filtering; exact descending
order and exclusive cursors; no duplicate or skipped rows through an unchanged traversal;
first-acquisition `created` preservation across takeover; release/reacquire transitions; atomic
catalog updates with lease/unit changes; frozen, owned results; invalid limits/cursors fail as
`STORE`; memory/database parity over the whole matrix (the same spec run against both).

## Scope

**Owned:** `src/core/types.ts` (extend; never undo user edits), the designated centralized homes
for new helpers/validators/constants per the rules, both supervisor store implementations under
`src/core/`, their factories, the `src/core` barrel, and the mirrored tests
(`tests/src/core/...` following the existing store-test placement).

**Off-limits:** `app/**`, `guides/**` (parity drift expected — report the exact new set),
vendored files, `package.json`, `configs/**`, `src/browser/**`, `src/server/**` unless a store
implementation actually lives there — verify placement in your first step and report.

Forbidden: `any`, `as`, `!`, `@ts-` comments, `eslint-disable`, mocks/fakes/spies/fake clocks,
new dependencies, timers/polling. SQLite is real (the repo's node:sqlite path), temp files via
the established scratch helpers.

## Acceptance criteria

1. The full proof matrix above green on BOTH stores from one shared spec — placement per the
   repo's existing memory/database parity pattern.
2. A store at rest: `list` with no options returns the newest page of live+released records with
   the default limit; `released: true` returns only released ones — proved.
3. The watermark law: start a traversal, mutate the catalog (new acquire + a release), continue
   the traversal — no duplicate, no skip, mutations invisible until a fresh first page — proved.
4. Transactionality: a crash-shaped failure between unit write and catalog write cannot leave the
   two visibly divergent (prove atomicity at the seam the store exposes).
5. Converge lint then format scoped; static gates + `test:src` green; full-chain deviations
   reported (guides parity is U7's).

## Deviation contract

Stop and report if the catalog cannot be made transactional with the existing store schema
without touching an off-limits file, or if `SupervisorStoreInterface` consumers outside src/core
break (enumerate importers first — the consumers rule). Ancillary schema/index naming is yours
under the rules.

## Output

Touched files + diffstat; full diff of `src/core/types.ts`; `git status --porcelain`;
per-criterion proof pointers; the exact guides-parity delta; deviations or none.
