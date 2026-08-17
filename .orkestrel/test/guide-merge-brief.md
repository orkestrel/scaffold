# Unit G-merge — reconcile the two sessions' guides into one 0.0.5 guide

Role: `implementer`. Engine: Opus 5, native, sole writer in `/home/user/test` (a merge is
in progress; you own only `guides/test.md`, currently carrying conflict markers). Perform
the assignment directly and spawn nothing. Commit nothing.

## Context

Two parallel campaigns landed on this package. Session A (this one) shipped
`createTeardown` + `createLoopback` with a repaired Limits table (population statement,
no live-state rosters, new Fails rows). Session B (published as npm 0.0.4) shipped
`createHostileValues` with a rewritten member-counting doctrine and its own rows, counting
evidence from `form`, `table`, and `supervisor` — including the two private repositories
session A could not read. The merged release is 0.0.5. The code union is already merged
and green: core 41/41, server 84/84.

Both full sides are extracted for you: `/home/user/scaffold/tmp/guide-mine.md` (session
A) and `/home/user/scaffold/tmp/guide-theirs.md` (session B).

## Reconciliation rulings (fixed; wording is yours)

1. **Framing**: session A's two-family opening + its outside-pair sentence stand; add one
   sentence placing the hostile corpus (what a test feeds its guards). The blockquote's
   helper enumeration includes the corpus.
2. **Surface**: union — 16 values, 10 types, 26 exports; the count sentence says so.
   Session B's `createHostileValues` row joins the core Factories table; every session A
   row stands.
3. **Contract**: session A's rules 10 (teardown) and 11 (loopback) stand as numbered;
   session B's hostile-corpus rule lands verbatim as rule 12. Fix every cross-reference
   to its new number (their fences and Tests entries say "rule 10").
4. **Limits**: session B's member-definition refinement ("Repeated calls routed through
   one shared implementation stay one member") and its counting-doctrine paragraph
   ("Count a repeated set at the level a consumer uses it…") are ADOPTED. Their three new
   rows are ADOPTED: Hostile guard-input sets (3, Clears, ships as `createHostileValues` —
   member names form/table/supervisor stay, they are membership evidence like every other
   row); Deep nesting (2, Fails); Canonical wire fixpoint (2, Fails). Their
   remaining-groups row ("Numeric corpora, hostile-key tables, deep-freeze, and raw
   invocation") REPLACES session A's combined hostile-builders row, but session A's
   standalone `invokeRaw` row (3, Clears, native-Reflect.apply reason) stays — remove
   "raw invocation" from the remaining-groups row's list so the two do not double-rule
   it. Session A's rows all stand: the ephemeral-port fixture-server row stays REMOVED
   (it shipped as `createLoopback` — session B's table still carries it; delete it),
   reserve-then-release, bounded retry, condition polling, waitForAbort, signal
   instrumentation, browser helpers, timer, clock. Session A's de-rostered
   scratch-member text stands (no per-package site rosters return). The `captureError`
   width sentence stays de-rostered per session A.
5. **Population statement**: reword session A's to cover both rounds honestly: the counts
   were measured across the fleet's 42 readable trees this round, and the two private
   repositories were read by the parallel campaign whose evidence the hostile row cites,
   so the population is the full 44; a moved count reopens its row.
6. **Fences**: union — session A's teardown and loopback fences plus session B's
   guard-totality and wire-fixpoint fences, each verbatim from its side.
7. **Tests section**: union of entries with renumbering applied (their factories entry
   references rules 2 and 10 → 2 and 12; session A's entries stand).

## Scope

Owned: `guides/test.md` only (replace the conflicted file with the reconciled guide).
Off-limits: everything else. No installs, no commits, no git commands that touch the
index beyond none — the Orchestrator stages and commits.

## Validation

`npm run test:guides` — green, output in your report. The parity suite enforces the
surface bijection, so a missed row or stale count fails loudly.

## Output

The reconciled file's diff against BOTH extracted sides (summarized per section), the
test:guides output, deviations or "none".
