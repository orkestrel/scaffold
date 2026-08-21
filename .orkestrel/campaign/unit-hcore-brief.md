# Unit H-core: the core wait family and JSON Lines decoder

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/test`. You perform the assignment directly and spawn nothing:
do the work yourself inside this session.

## Objective

Land the reconciled core additions for `@orkestrel/test` 0.0.8: `waitForCondition`,
`retryUntil`, `waitForEvent`, and `decodeJSONLines`, types first, fully proved, with their
guide Surface rows so parity stays green.

## Context

Authority, inside this checkout: `AGENTS.md`; `.claude/rules/typescript.md`,
`.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`
(performance.now for elapsed intervals; a bounded wait fails with the condition's own
description), `.claude/rules/documentation.md`, `.claude/rules/writing.md`. Guide:
`guides/test.md` — granted for your own Surface/Voices rows ONLY; a later unit owns narrative.
Skill: none.

The working tree carries earlier units (src link fallback; test gate rework; guide link
contract) and the user's manifest/lockfile entries — leave all of them. `src/core/helpers.ts`
currently exports `waitForDelay` and siblings; `src/core/types.ts` is the types home; the core
barrel stars both, so new exports are public without barrel edits. Core compiles under
`lib: ["ESNext","WebWorker"]` with `types: []` — no Node imports, no vitest import, no
`Date.now()`.

## The design, fixed by the reconciled adversarial round (design2-reconciliation.md)

Types in `src/core/types.ts`:

```ts
export interface WaitOptions {
	readonly budget?: number
	readonly interval?: number
	readonly signal?: AbortSignal
}

export interface RetryOptions extends WaitOptions {
	readonly attempts?: number
}

export type EventSubscriber<TArgs extends readonly unknown[]> = (
	listener: (...args: TArgs) => void,
) => (() => void) | void
```

(Adjust TSDoc to the package's idiom; the shapes are fixed. `budget` is milliseconds measured
with `performance.now()`, default 1000; `interval` default 10; both validated finite and
non-negative with a thrown `Error` naming the offender; a zero budget still permits the
immediate first read.)

Helpers in `src/core/helpers.ts`:

1. `waitForCondition(description: string, condition: () => boolean | Promise<boolean>, options?: WaitOptions): Promise<void>`
   — read the condition FIRST, before any wait; a true reading returns, including one taken
   during the final interval; a false reading past the budget rejects with
   `Condition "<description>" did not hold within <budget>ms (waited <elapsed>ms)`; between
   reads wait one interval through `waitForDelay`; a throw or rejection from the condition
   propagates unchanged; an aborted signal rejects with the signal's reason and stops reading.
2. `retryUntil<T>(description: string, produce: () => T | Promise<T>, satisfied: (value: T) => boolean, options?: RetryOptions): Promise<T>`
   — re-run the producer until a produced value satisfies the predicate; return that value;
   both bounds apply, whichever trips first (attempts omitted means the budget alone bounds
   it); a throw from `produce` counts as an unsatisfied attempt and the LAST such error rides
   the rejection as `cause`; a throw from `satisfied` propagates unchanged (a broken predicate
   is a defect, an operation that throws is a not-yet); the rejection message carries the
   description and the bound that tripped.
3. `waitForEvent<TArgs extends readonly unknown[]>(subscribe: EventSubscriber<TArgs>, description: string, options?: WaitOptions): Promise<TArgs>`
   — invoke `subscribe` once with a listener; resolve with the argument tuple on first
   delivery; on timeout invoke the cleanup the subscriber returned (when it returned one) and
   reject naming the description and budget; on abort likewise. Deliveries after settlement are
   ignored.
4. `decodeJSONLines(text: string): readonly unknown[]` — split on LF tolerating CRLF; ignore
   empty physical lines; parse each remaining line; a malformed line throws an `Error` naming
   the line number with the native `SyntaxError` as `cause`; preserve order; return a readonly
   array.

## Tests, in `tests/src/core/helpers.test.ts`

Follow the file's existing idiom. Cover, with `performance.now()` for any elapsed reading:

- `waitForCondition`: already-true (no wait); true on a later read; asynchronous condition;
  never-true rejection whose message carries the description and the budget; condition throw
  propagated unchanged; aborted wait rejecting with the reason; true during the final interval
  passes; invalid budget and interval refused.
- `retryUntil`: satisfied on the first attempt; satisfied on a later attempt; exhausted by
  attempts; exhausted by budget; the satisfying value returned; producer throw counted as an
  attempt with the last error as `cause`; predicate throw propagated; aborted.
- `waitForEvent`: delivery resolves the exact tuple; timeout rejects naming the description and
  invokes the returned cleanup; abort likewise; a second delivery after settlement is ignored.
- `decodeJSONLines`: empty input; trailing newline; CRLF input; ordering; primitive lines; a
  malformed line rejecting with its line number and a `SyntaxError` cause.

## Guide rows

Add Surface rows for the four helpers and the types under the existing Core tables in
`guides/test.md`, in the tables' own voice, one row each — no narrative sections (a later unit
owns those). Add fence transcriptions in `tests/guides.test.ts` only if you add a fence
(prefer no new fence; rows only).

## Scope

- Owned: `src/core/types.ts`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, and in
  `guides/test.md` your own new rows only; `tests/guides.test.ts` only if a fence obliges it.
- Off-limits: `src/core/factories.ts`, `src/server/**`, `src/browser/**`, every other test
  file, `package.json`, `vite.config.ts`.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`; restore any temporary edit by rewriting
  text and prove with `git diff`. The sandbox denies network and mounts `.git` read-only. Use
  `npx.cmd` — plain `npx` is refused by PowerShell policy here.

## Execution

Perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check` on the owned files exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0, and
   `npx.cmd tsc --noEmit -p configs/src/tsconfig.core.json` exits 0 (core isolation — no Node
   or DOM global entered core).
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core`
   exits 0 with the new cases listed; report raw totals (pre-change baseline: the project's
   current pass count — read it first and record it).
6. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
   exits 0 (parity green with your rows).

## Output

The complete diff; raw output and exit code per criterion with the criterion 5 baseline; any
deviation decisions. No process diary.

## Deviation contract

A conflict with the primary objective — the design contradicting an authority file, a criterion
unreachable from the owned files, the guides project red for a cause outside your rows — stops
the unit with the report. TSDoc wording, test naming, and row phrasing are yours: decide,
record, carry on.

## Amendment 1, 2026-08-21, after the first launch stopped on an authority conflict

The stop was correct and the conflict is RULED, not open. The adversarial design round
surfaced exactly these guide rows, and the reconciled ruling (authority: the user's
instruction and the rules outrank the guide, per AGENTS.md) is that the rows are stale and
move WITH this unit. Your guide grant therefore widens to include the Limits table rows your
additions contradict:

1. The Limits row excluding condition polling (near guides/test.md:733) is REPLACED by a row
   or short passage stating the real distinction: the no-polling architecture law governs a
   product's idle wakeup; a test instrument waiting on a fact another process produces has no
   event to park on, so `waitForCondition` exists for tests and polls with `waitForDelay`
   inside a `performance.now()` budget; where an event exists, `waitForEvent` is the door.
2. The Limits row excluding `retryUntil` by fleet-member count (near guides/test.md:741) is
   REMOVED — the user ruled consumer count out as an adoption gate — and if the Limits
   preamble claims a membership threshold decided the table, adjust that sentence to what now
   decides it.
3. Any OTHER Limits row that excludes an API this brief lands is replaced the same way; name
   each one you touch in your report.

Everything else in the brief is unchanged, including the rows-only constraint for the Surface
and Voices tables. Re-run from the start.
