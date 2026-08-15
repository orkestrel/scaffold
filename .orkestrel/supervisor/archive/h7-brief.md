# H7a-c — the name filter's contract, predicate, and manager

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, fresh thread, sandbox `workspace-write`. Sole
serial writer in `/workspace/supervisor` from clean committed baseline **fcd9949**. Perform
directly, spawn nothing, no commits/pushes/installs.

## The reconciled design (Orchestrator ruling; both lanes' proposals reconciled)

Server-side name matching at the join — the slot the terminal predicate already occupies
(`SupervisorApplication.ts:89-97` reads a snapshot per candidate TODAY, so the name check is
one string compare on data already in hand; the objective lane's scan-cost premise was
falsified at source). Two filters combine with AND: run-id prefix stays at the store
(indexed, case-sensitive, unchanged); run-name is a case-insensitive substring over the
candidate page's snapshots. ONE store page per press — no drain loop, no budget; a page may
return zero matches WITH a cursor (the under-filled-page law already admits this). The word
"fuzzy" appears nowhere; `src/core/**` is off-limits and its diff must be empty.

## The unit (three layers, one writer)

1. **Contract + parser + leaf** (`app/core/types.ts`, `app/core/parsers.ts`,
   `app/core/helpers.ts`, mirrored core tests):
   - `HistoryQuery` gains `readonly name?: string` (flat, beside `prefix`).
   - `parseHistoryQuery` accepts `name` as a fourth key with the same duplicate/unknown
     rejection; rejects empty, all-whitespace, control characters, and length over the
     id-length constant's bound with `PROTOCOL`; ACCEPTS `/` and `\` (a name is free text,
     not a path segment — the prefix's separator bounds do not apply).
   - `matchesRunName(name: string, wanted: string): boolean` exported from
     `app/core/helpers.ts`: case-insensitive substring
     (`name.toLowerCase().includes(wanted.toLowerCase())`), pure leaf, tested both arms —
     including: interior substring matches; mixed case matches both directions; a
     subsequence with gaps does NOT match ("dpl" never finds "deploy"); the parser can never
     deliver an empty `wanted` (prove it at the parser).
2. **The join predicate** (`app/server/SupervisorApplication.ts`, server tests): in the
   existing qualification guard, add
   `(query.name !== undefined && !matchesRunName(snapshot.name, query.name))` → `continue`.
   Proofs: a seeded history where exactly one released terminal run's name contains the
   filter returns exactly that run; a page whose candidates yield zero name matches returns
   `runs: []` WITH `cursor` present; `name` and `prefix` together return only rows
   satisfying both; a later page supplies the first match (press-again semantics);
   authorization unchanged (a named-grant principal filtering by another principal's run
   name gets nothing). The wire route (`ApplicationHandlers`) passes the parsed query
   through unchanged — touch it only if the query type flows through it.
3. **The manager and transport** (`app/browser/types.ts`,
   `app/browser/services/ClientHistory.ts`, `app/browser/controllers/HistoryManager.ts`,
   `app/browser/controllers/Operator.ts` only if the seam signature moves, mirrored tests,
   `tests/setupBrowser.ts` additive):
   - `HistoryOptions` gains `readonly name?: string`; the transport sends it under the
     wire's name; `isHistoryPage`/guards unchanged (the page shape does not move).
   - New `HistoryFilter` in `app/browser/types.ts`:
     `{ readonly name?: string; readonly prefix?: string }` — it exists to stop
     positional-optional call sites.
   - `HistoryManagerInterface.prefix` is REPLACED by
     `readonly filter: HistoryFilter | undefined`; `load(prefix?: string)` becomes
     `load(filter?: HistoryFilter)`; every consumer updates in this change (no shim). The
     invariant: the manager never stores a filter whose leaves are both undefined — an
     all-blank submission stores `undefined`; absence is `undefined`, never `{}`.
   - `retry()` re-sends both halves; `older()` preserves both halves; `clear()` clears the
     filter; the departure-`changed` semantics are UNTOUCHED (baseline still re-captures
     only on a successful current-generation first page).
   - Proofs: `load({ name })`, `load({ prefix })`, `load({ name, prefix })` each reset rows
     and cursor and send exactly the corresponding query keys; `load()` clears; blank-halves
     → `filter === undefined`; zero rows with a cursor leaves `state === 'empty'` AND
     `cursor !== undefined` simultaneously; the H5/H6 manager battery still passes
     unmodified except where `prefix` was named.

## Off-limits

`src/core/**` (diff must be empty — state this in your report with the grep),
`app/browser/components/**` and `ApplicationView.vue` (H7d's — the surface still compiles
against the old control only if you keep `HistoryView.vue` compiling: where the manager
rename breaks it, make the MINIMAL mechanical edit to `HistoryView.vue`'s script usages of
`prefix`/`load` and report exactly those lines; its copy, template structure, and new fields
are H7d's), `guides/**` (report the parity delta).

## Environment facts

Fresh bench thread; sandbox denies loopback listeners. Run every listener-free check
(`npm run check`, static gates, core test projects) and enumerate the suites awaiting the
Orchestrator.

## Acceptance criteria

1. Layer-1 proofs green under the core projects; `src/core` diff empty by grep.
2. Layer-2 proofs written (listener-dependent ones enumerated); the predicate sits in the
   existing guard, one page per press, no loop.
3. Layer-3 proofs written; tree-wide grep: zero `HistoryManagerInterface.prefix` consumers
   remaining; the blank-invariant and cursor-empty coexistence proofs present.
4. Static gates and every listener-free check green; the exact parity delta reported.

## Output

Touched files + diffstat; per-layer closure table; per-criterion proofs with commands and
tails; the `src/core` empty-diff grep; `git status --porcelain`; deviations or none. No
diary.
