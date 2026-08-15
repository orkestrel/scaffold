# H4 fix round — one schema source, saturated instants refused, the wire's own words

Successor to `h4-brief.md` + `-2` + `-3`. Carries both audit lanes' retained findings
(`h4-analyst-verdict.md`; reviewer report in the campaign record). CONFIRMED and closed: the
endpoint per design §2 under grant attacks; the merged spine under real overlap; the Lane
adapters as genuine boundaries. The Orchestrator swept its own `tmp/probe/capture.mjs` residue
(Sol claim 5's finding — Orchestrator debris, done directly).

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, resumed on the H4 thread. Sole serial writer from
clean committed baseline **33d8b19**. Perform directly, spawn nothing, no
commits/pushes/installs. The closing auditor will be the Opus reviewer.

## Fix items

1. **Saturation refused before mutation** (Sol claim 4): a caller-supplied ordering instant at
   or beyond `Number.MAX_SAFE_INTEGER` (where `+ 1` cannot advance) is rejected with the
   stores' established `STORE` outcome before any write, in the shared validation path both
   backends use; add ordinary and saturated controls proving fresh-page ordering and sibling
   continuation behavior at the boundary. Update `computeRunUpdated`'s contract prose to name
   the refused range.
2. **One schema source** (reviewer R1): export the supervisor table columns and indexes from
   `src/core` as centralized constants (the shape `@orkestrel/middleware`'s `sessionColumns`
   already models) and compose them at all three declaration sites — both `src/core/factories.ts`
   copies and `app/server/ApplicationPersistence.ts`. While there, give the persistence's
   `snapshots.id` the `{ min: 1 }` every sibling id carries (reviewer referral 3), and derive
   the database name from `APP_NAME` like `HumanLedger` does.
3. **Guide truth for the schema and the spine** (reviewer R1's prose half + placement
   advisory): in `guides/src/supervisor.md`, correct the "declared once / two supported routes"
   sentences to name the caller-declared database as a supported third route over the exported
   schema constants, and extend the application-composition passage with the spine's invariant
   in the guide's voice — one database, one lane, every durable read and the shutdown admitted
   through it. Do NOT paste the per-path table (it lives in the commit message).
4. **The constants carry their qualifier** (reviewer R2): `HISTORY_LIMIT` →
   `APP_HISTORY_COUNT`, `HISTORY_LIMIT_MAXIMUM` → `APP_HISTORY_MAXIMUM`,
   `HISTORY_CURSOR_INPUT` → `APP_HISTORY_INPUT`, with the four `app/core/parsers.ts`
   references and any tests; interpolate the maximum into the refusal message so the sentence
   cannot outlive the constant (advisory folded).
5. **One terminal set, one owner** (reviewer R3): derive the history status type from
   `@orkestrel/workflow`'s own status union instead of retyping the four literals, implement
   the guard through the installed `isTerminalStatus`, and name the type for what the set is
   (the terminal statuses), not for the endpoint that consumes it.
6. **The recorder's honest vocabulary** (reviewer R4, ruled shape: the delegate-records
   reading): rename the union and its TSDoc in `tests/setupServer.ts` to what it actually
   enumerates (the delegate's recorded operations, `list` included), correct
   `RecordingSupervisorStore`'s description to name both things it records, and rehome the
   observing assertion beside the harness it proves under a name that says so. Restore nothing
   to `RecoveryStep`'s four-boundary meaning — the crash proof keeps its four.
7. **Under-filled pages stated** (reviewer referral 2, ruled): a history page may legitimately
   hold fewer than `limit` runs while carrying a continuation cursor (terminal qualification
   happens after the store's limit); state that property in the wire contract's TSDoc — the
   cursor alone signals continuation — and add one proof of a short page with a cursor. H5's
   client reads cursor presence, never page fullness (recorded for its brief).
8. **Driver closure answered** (reviewer referral 1): determine whether `DatabaseInterface.close()`
   releases the SQLite handle the runtime's inline `createSQLiteDriver` created; if not, own
   the driver reference in `ApplicationPersistence` and close it in `destroy()`; either way,
   record the answer with the evidence.
9. **Small truths**: drop the "three admitted store views" count from the prose
   (`app/server/types.ts`); `createRunOptionsError`'s message vocabulary aligned to one form.

## Scope

Everything H4 owned, plus: `src/core/factories.ts` and the src/core centralized homes for the
schema constants (item 2), `guides/src/supervisor.md` for items 3's named sentences ONLY
(report the exact prose diff; the parity delta may not change — these are existing-name
corrections), and `tests/src/server/` for the rehomed assertion. Off-limits otherwise
unchanged. Forbidden: the standing list.

## Acceptance criteria

1. Saturated instants refuse identically on both backends before mutation, with the boundary
   controls green.
2. `grep` finds the supervisor table shape declared exactly once in `src/core` and composed at
   the three sites; the guide names the third route and the spine invariant.
3. The renamed constants, the derived terminal type through `isTerminalStatus`, and the
   recorder's honest union compile with zero stale references tree-wide.
4. The short-page property proved; the driver-closure answer recorded with evidence.
5. Every listener-free suite green; static gates green; report which suites await the
   Orchestrator; the exact parity delta change (if any).

## Output

Touched files + diffstat; per-item closure table; the guide prose diff verbatim; per-criterion
proofs with commands and tails; `git status --porcelain`; deviations or none. No diary.
