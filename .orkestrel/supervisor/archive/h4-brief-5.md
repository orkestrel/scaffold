# H4 second fix round — four exact corrections

Successor to `h4-brief-4.md`. Carries the closing pass's four required changes (reviewer, each
with its exact fix) plus the Orchestrator's rulings on its two referrals. Items 4, 6, 7, 8, 9
of the prior round are CONFIRMED and closed.

## Role and engine

`builder`. Sole serial writer in `/workspace/supervisor` from clean committed baseline
**72cb64a**. Perform directly, spawn nothing, no commits/pushes/installs.

## The changes

1. **R1 — the tables constant gets its noun.** Rename `SUPERVISOR_COLUMNS` →
   `SUPERVISOR_TABLES` (`src/core/constants.ts` declaration + TSDoc), updating the three
   composition sites (`src/core/factories.ts` ×2, `app/server/ApplicationPersistence.ts`), any
   barrel/test references, and the guide sentence that names it
   (`guides/src/supervisor.md:128`). `SUPERVISOR_INDEXES` stays.
2. **R2 — two words of guide truth.** `guides/src/supervisor.md:72` and `:3338`: "four-table" →
   "five-table" (the composition declares five; the source TSDoc already says so). Also move
   the spine sentence at `:742-743` to the end of the preceding paragraph (~`:735-740`) — same
   words, better seam (closing-pass advisory, folded).
3. **R3 — the refusal takes the package's own form.** Add
   `validateRunEvent(event?: number): Result<number | undefined, SupervisorError>` to
   `src/core/helpers.ts` beside `validateLeaseTTL`, returning the same `STORE` failure shape
   for an instant at or beyond `Number.MAX_SAFE_INTEGER`; call it at the HEAD of `set` in BOTH
   stores (`if (!event.success) return failure(event.error)`) before any row read, write, or
   revision check; restore `computeRunUpdated` to a total `compute*` leaf (no `@throws`; keep
   the `@remarks` sentence naming the refused range as the validated precondition); delete the
   `try`/`catch`/`isSupervisorError` adapter in `MemorySupervisorStore.set` and the import if
   nothing else uses it. Do NOT touch the database store's internal `#transaction` throws.
   **Folded ruling A1:** with validation at both heads, a saturated instant at a conflicting
   revision now refuses identically (`STORE`) on both backends — add that exact control (a
   saturated stamp against a stale revision, both stores, same outcome).
   **Folded ruling A2:** `validateRunEvent` gets leaf tests for both arms in
   `tests/src/core/helpers.test.ts`.
4. **R4 — one name per function.** In `app/core/validators.ts`: rename the export
   `isTerminalWorkflowStatus` → `isTerminalStatus` so it pairs with `TerminalStatus` per the
   file's sibling convention, and alias the package import to `isTerminal`
   (`import { isTerminalStatus as isTerminal } from '@orkestrel/workflow'`); update every
   consumer and test tree-wide.

## Scope

**Owned:** `src/core/constants.ts`, `src/core/factories.ts`, `src/core/helpers.ts`,
`src/core/stores/{Memory,Database}SupervisorStore.ts`, `app/server/ApplicationPersistence.ts`,
`app/core/validators.ts` and its consumers, `guides/src/supervisor.md` (the named lines only),
and the mirrored tests. Everything else off-limits. Forbidden: the standing list; no assertion
weakening.

## Acceptance criteria

1. Tree-wide grep: zero `SUPERVISOR_COLUMNS`, zero `isTerminalWorkflowStatus`, zero
   `isWorkflowTerminalStatus`, zero "four-table" in the guide.
2. `computeRunUpdated` throws nothing; `validateRunEvent` leaf tests green both arms; the
   identical-precedence control green on both backends; no `try` in `MemorySupervisorStore.set`.
3. `npm run test:src:core`, the catalog integration file, `npm run test:app:core`, and static
   gates green; report which suites await the Orchestrator.

## Output

The diff; per-criterion proofs with commands and tails; `git status --porcelain`; deviations or
none.
