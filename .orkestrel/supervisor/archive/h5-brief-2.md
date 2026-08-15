# H5 fix round — the race, the named guards, and honest words

Successor to `h5-brief.md`. Carries both audit lanes' reconciled findings (Sol objective
verdict `tmp/codex/h5-audit-last.md`; Opus reviewer report in the session record). CONFIRMED
and closed: the five derived states and cursor-presence law; the roster-fact mechanics (rows
never mutate, no polling); the tail carrier's mechanics and every consumer moved; the
Orchestrator's `only()` harness scoping (exact pathname match, backpressure paths unchanged);
placement precedent, barrel, single-word members. The reviewer's cursor-opacity and
`#loaded`-irreducibility attacks failed and need nothing.

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, resumed on the H5 thread, sandbox
`workspace-write`. Sole serial writer in `/workspace/supervisor` from clean committed baseline
**01b4fa7**. Perform directly, spawn nothing, no commits/pushes/installs. The closing auditor
will be the Opus reviewer.

## Fix items

1. **The held-response race** (Sol claim 3, verified at source): `Operator.ts:98` hands
   `HistoryManager` the decorated client, so a held history read resolving after `clear()` or
   a no-workflow login passes `#answer` with a still-current operator generation and its `AUTH`
   refusal reaches `#expire`, destroying the newly adopted session — the manager's own
   generation check at `HistoryManager.ts:126` runs too late to stop it. Fix by the file's own
   documented policy (`Operator.ts:93-95`): give `HistoryManager` the **raw** history client
   plus an injected refusal handler — the `RosterExpiryHandler` seam's sibling — invoked only
   for refusals that survive the manager's generation check; the exposed
   `operator.client.history` surface stays decorated. Then correct the constructor comment to
   state the actual policy (reviewer F1): promise-returning reads on the exposed surface route
   refusals through the decorated proxy; operator-owned managers take the raw client with an
   explicit handler so their state transitions cannot race the answer policy. Regressions: a
   held history read releasing `AUTH` after (a) `clear()`, (b) a completed no-workflow login,
   (c) adoption — each proving the retained session intact and the stale page dropped.
2. **Named guards, attacked** (Sol claim 1 + reviewer required 1): move the anonymous page
   guard out of `ClientHistory.ts:25-40` into `app/browser/validators.ts` as exported
   `isHistoryRun` and `isHistoryPage` beside `isApplicationRun`, TSDoc in that file's voice;
   `read()` consumes `isHistoryPage`. Leaf tests for both guards: surplus key refused, missing
   key refused, malformed row refused, non-terminal status refused, negative timestamp
   refused, empty-string cursor refused, valid page accepted. Client-level: one real `/history`
   refusal surfaces as `BrowserApplicationError`; one cursor containing `:` and
   percent-encoding characters round-trips (the reviewer's query-in-path referral — the proof
   that `resolveRoute`'s `:` refusal can never eat a server-minted cursor).
3. **A boolean is a boolean** (reviewer required 2): `Client.ts:141` `literalOf(true, false)` →
   `isBoolean`.
4. **The honest `changed`** (reviewer claim 4, ruled): the doc says "transitioned" but the
   derivation is object identity against a manager that replaces its snapshot on every
   delivery, so a reconnect re-delivering identical content flips it, and a baseline captured
   before the roster's first snapshot (`undefined`) flips on mere arrival. Ruling: derive
   `changed` from a content key — the roster runs' `(id, updated)` sequence — captured at the
   successful first page; an `undefined` baseline (roster not yet delivered at load) reports
   `false` (the affordance means "a run may have ended since you loaded this", and a roster
   merely arriving is not that). State exactly that in the TSDoc. Proofs: identical-content
   re-delivery → `false`; genuine transition → `true`; roster arriving after the load →
   `false`; reload resets the baseline.
5. **The terminal word made true** (reviewer claim 5, ruled: keep the name): rewrite
   `OperatorInterface.terminal`'s TSDoc to the fact the server computes — "Whether the open
   run's persisted snapshot had reached a terminal status when its tail was read" — with a
   `@remarks` contrasting it against `ended` in the same voice the file already contrasts
   `live` and `ended`. While there: make `loading`'s sentence honest (reviewer advisory —
   `clear()` sets it false while the abandoned read is still outstanding; say the derived
   fact, not "in flight" absolutely).
6. **One shape, one home** (reviewer advisory, granted): `ClientTail`
   (`app/browser/types.ts:429`) and `ApplicationTail` (`app/server/types.ts:295`) are the
   identical `{ frames, terminal }` shape under two names. **Grant:** `app/core/types.ts` —
   rehome the shape there under one name (`ApplicationTail`, the wire's own), both
   environments import it, both old declarations deleted, every consumer updated, no alias.
7. **The fixture's verb pairs** (reviewer F2): `ScriptedHistory`'s `hold()`/`proceed()` mixes
   the login and inspect pairs. Give the history seam one consistent pair per the file's
   documented per-seam vocabulary and extend the class TSDoc the way `ScriptedClient`
   enumerates its seams. A test is named for what it proves.
8. **The proof's own home** (reviewer F3): the tail-wire round-trip in
   `tests/app/server/ApplicationHandlers.test.ts:168-201` reports under
   `'ApplicationHandlers live backpressure'` beneath a TCP-saturation comment. Give it its own
   `describe` naming what it proves; the shared harness stays; keep the backpressure block's
   comment about its own subject.
9. **Small truths**: sort the `HistoryPage, HistoryRun` insertion into the types import block
   (`app/browser/types.ts:490`); widen `ClientRequestHandler.path`'s `@param` to admit the
   composed query (`types.ts:471-475`); rename the `ClientHistory` test's "catalog wire
   vocabulary" phrase to the ruled collection term (the design refused "catalog" for this
   surface). Recorded, no change: `older()` stands as ruled.

## Scope

Everything H5 owned, plus granted: `app/browser/controllers/Operator.ts` (the seam and
comment), `app/browser/validators.ts`, `app/core/types.ts` (item 6 only) and the
`app/server`/`app/browser` files that import the rehomed shape, `tests/app/server/ApplicationHandlers.test.ts`
(item 8), mirrored validator/guard tests. Off-limits otherwise unchanged: no Vue components,
no `guides/**` (report the parity delta change — item 6 moves a name between environments),
no `src/**`, no `package.json`.

## Environment facts

Unchanged from `h5-brief.md`: your sandbox denies loopback listeners; run every listener-free
check (`npm run check`, static gates, guard leaf tests under the node projects if any) and
enumerate the suites awaiting the Orchestrator. The browser manager/operator regressions you
write will be executed natively by the Orchestrator.

## Acceptance criteria

1. The three held-response regressions written and the seam restored to the raw client +
   handler shape; the constructor comment states the actual policy.
2. `isHistoryRun`/`isHistoryPage` exported, consumed, and attacked (all seven negative
   controls plus the refusal and cursor proofs).
3. `changed` derives from the content key with the four proofs; the TSDoc states the rule.
4. Tree-wide grep: zero `literalOf(true, false)`, one declaration of the tail shape, zero
   `ClientTail`.
5. Static gates and every listener-free check green; suites awaiting the Orchestrator
   enumerated; the exact parity delta change reported.

## Output

Touched files + diffstat; per-item closure table; per-criterion proofs with commands and
tails; `git status --porcelain`; deviations or none. No diary.
