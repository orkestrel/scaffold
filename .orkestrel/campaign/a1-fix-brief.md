# Unit A1-fix — repair the findings of audit round A1-R1 on the `AgentProvider` base

## Role and engine

`sol` route (the `implementer` work class) on GPT 6 Astra (`gpt-6-astra`), reached through
`codex exec --sandbox workspace-write` rooted at `C:/Users/mikes/WebstormProjects/agent`. You are
the bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. You are the sole writer in this checkout for the life of this unit. The fix's auditor is
an engine that did not write it, plus the Orchestrator's mutation probes.

## Objective

Close every finding audit round A1-R1 substantiated against commit `cef565d`, each with a failing
test first, and add the named adequacy tests, without widening any refusal into a regression.

## Context

**Chain.** Baseline `337390c` → A1 first run stopped (contract equality) → A1 second run landed
as `cef565d` → audit round A1-R1: subjective lane `tmp/units/a1-audit-subjective.md` (reviewer,
Opus 5), objective lane `tmp/units/a1-audit-objective.md` (analyst, GPT 6 Astra), mechanical lane
`../scaffold/.orkestrel/campaign/a1-audit-mechanical.md` (checker), reconciled with the
Orchestrator's own probes `../scaffold/.orkestrel/campaign/a1-probe-abort-identity.md`,
`a1-probe-cleanup-paths.md`, and `a1-probe-analyst-vectors.md` (read all three: each carries the
instrument, its control, and the verbatim readings).

**Law, host, standing conditions.** As `tmp/units/a1-brief.md` § Context, unchanged: read
`../scaffold/AGENTS.md` and the rules it names; PowerShell through the Codex CLI (use `npm.cmd`);
network denied; `.git` read-only; probes under `tmp/probe/`; `test:guides` is red until A3.

**Measurements (Orchestrator, host, 2026-09-14, at `cef565d`).** `format:check`, `lint:check`,
`check` exit 0; `build` exit 0; `test:src:core` 21 files / 674 tests; `test:setup` 54. The
probe readings that ground each finding are quoted in the three probe records named above.

## Findings and their carriers

Every finding below names the fix item that carries it. Do not repair anything else.

**F1 — the cancellation rule (claim 3, probe cases B and 3b).** `AgentProvider.stream`'s catch
wraps an error as `ProviderAbortError` only when `error === combined.reason` and the error is not
itself a `ProviderAbortError`. A transport that rejects with its own `AbortError` after the deadline
escapes as a raw `DOMException`; a caller whose abort reason is a `ProviderAbortError` surfaces
that foreign object's partial instead of the accumulated one. Rule: when the combined signal is
aborted, the local cancel wins — throw `ProviderAbortError` carrying the locally accumulated
partial whatever was thrown; when it is not aborted, propagate the error unchanged (a remote
`ProviderAbortError` thrown by `read` keeps its own partial — probe case 4 must keep holding).
Tests, failing first: a transport rejecting with `new DOMException('x', 'AbortError')` on deadline
→ `ProviderAbortError`; `abort(new ProviderAbortError({ content: 'foreign' }))` after one delta →
`partial.content === 'answer'`; `read` throwing `ProviderAbortError({ content: 'remote partial' })`
with the local signal unaborted → that same error, body cancelled, deadline cleared.

**F2 — the non-OK body is not bound to the signal (claims 3 and 5, probe case 3c).** `#request`
reads a non-OK body through `readText` with no bound to the combined signal, so an injected
transport whose 503 body stalls outlives a 40 ms deadline (still pending after 400 ms) and the
`finally` never runs. Bind the error body the way the success path binds its body (the
signal-bound `TransformStream` pipe, or an equivalent race against the combined signal) so the
deadline rejects the call as `ProviderAbortError` under F1's rule and cancels the body. Test,
failing first: a 503 with an open body and a 40 ms deadline rejects within the test's own 400 ms
budget, the source's `cancel` ran, and the recorded combined signal's deadline is cleared.

**F3 —`isMessage` trusts the candidate's own `every` (claim 15).** `images.every(isString)` and
`calls.every(isToolCall)` call a method the hostile value supplies;
`Object.assign([1], { every: () => true })` passes as images and `Object.assign([null], { every: () => true })`
as calls. Validate elements through `@orkestrel/contract`'s `arrayOf` combinator (read its installed
declaration for its own-index reading semantics) — never through a method of the candidate. Tests,
failing first: both hostile arrays → `false`; the throwing-proxy and revoked-proxy cases stay
`false`; every fixture the compiled message contract accepts is still accepted.

**F4 — an empty `thinking` on an abort partial (claim 16, the analyst's referral).**
`src/core/Agent.ts:480` folds `error.partial.thinking` when it is not `undefined`, while `:508`
folds `result.thinking` only when it is non-empty; a foreign provider whose partial carries
`thinking: ''` therefore lands `thinking: ''` on the `AgentResult` instead of omitting it. Gate the
abort-partial fold on non-empty exactly as `:508` does. Test, failing first: a scripted provider
that throws `ProviderAbortError({ content: 'x', thinking: '' })` yields an `AgentResult` with
`thinking` absent. Keep the widened `joinThinking` and its `('', 'next') → 'next'` expectation —
that widening was ruled, and the audit claim that called it a regression was wrong.

**F5 — adequacy tests the objective lane named (claims 5, 9, 11, 12, 13).** Add, in
`tests/src/core/AgentProvider.test.ts` and `tests/src/core/helpers.test.ts`: the deadline is
cleared on a non-OK response, on a `headers` hook rejection, and on a decoder failure (record the
combined signal, finish, wait past the deadline, require unaborted); a `result` record followed by
a poison record leaves the poison undecoded, cancels the body, and releases the lock (probe case F
held — pin it); two concurrent calls with distinct bodies interleaved while one splitter holds
`<thi`, one aborted and the other finished, produce exact per-call deltas and results; no abort
listener remains on the recorded combined signal after hook success, hook rejection, caller cancel,
and deadline expiry; `readText` and `readChunks` survive a source whose `cancel()` rejects after a
successful prefix and after a yielded chunk, preserving the decoded result and releasing the lock.
Do not change `readText`'s bound: it bounds decoded bytes and cancels after the first chunk that
crosses the limit, as its TSDoc states; the claim that no more bytes are pulled was over-stated and
is documented, not repaired.

**F6 — the subjective lane's findings** (`../scaffold/.orkestrel/campaign/a1-audit-subjective.md`,
reconciled in `design-reconciliation.md` § "Audit round A1-R1"). Five items, each carried here:

- **F6a — the error taxonomy's documentation and the `'LIMIT'` arm (reviewer F2).** Document each
  arm of `ProviderErrorCode` inline in the `ConversationError` form at `errors.ts:136` (what raises
  it), give `ProviderError` an `@remarks` stating when the base throws it and that `status` is
  present only for `'HTTP'`, and document its `code` and `status` members. Strike `'LIMIT'` from
  `ProviderErrorCode`: nothing produces it — the relay answers an over-limit request with `413`, and
  a browser sees that as `'HTTP'` with status `413`. Update the TSDoc of `RelayOptions.limit` to say
  the handler answers `413`. (Owned for this item: `src/core/types.ts`, `src/core/errors.ts`.)
- **F6b — one word, two concepts (reviewer F3).** Rename `RelayProviderOptions.frame` to
  `parser` (`readonly parser: () => ProviderParserInterface`), so `RelayFrame` alone owns the word
  for a wire record and the factory option is named for what it produces; `frame()` stays the
  seam's verb and `finish(parser)` its consumer. Update the TSDoc. (Owned: `src/core/types.ts`.)
- **F6c — the base's example (reviewer F4).** Replace the `@example` on `AgentProvider` with a
  minimal subclass — declaring `name`, calling `super({ url, path })`, implementing `frame`, `body`,
  `read`, `finish` — and add a sentence to its `@remarks` naming the five members a subclass fills
  and the `split` and `strict` switches the constructor takes.
- **F6d — pin the ruled constant and the documented overshoot (reviewer F5, claim 6).** Beside the
  existing `DEFAULT_PROVIDER_TIMEOUT` pin add `expect(MAX_ERROR_BODY_LENGTH).toBe(2048)`; add a
  non-OK case whose body delivers one 8192-byte chunk, asserting the excerpt is bounded to
  `MAX_ERROR_BODY_LENGTH` decoded bytes, the source was cancelled, and the source delivered exactly
  one chunk — the one-chunk overshoot is the documented behaviour of `readText`, not a defect, and
  the test names it so.
- **F6e — file the tests where their subject lives (reviewer F6).** Fold the second `joinThinking`
  block into the first and delete the duplicated empty-accumulator case; split `provider stream
  helpers` into one block per subject in the file's `subject — what it is` naming form; move the
  tests in `record cancellation` and `provider call boundaries` beside their siblings in the
  `AgentProvider` block or rename the blocks for the behaviour they scope. No assertion is weakened.

Findings recorded but not carried here, by ruling: the reviewer's F7 (`isSection` and
`isConversationSnapshot` totality) is outside A1's fixed scope and is recorded for the next change
against the read-boundary guards; the `AbortSignal.any` dependent-signal accumulation (reviewer
claim 12 referral) pre-exists in `Agent.ts` and is recorded as an observation for that change.

## Scope

**Owned.** `src/core/AgentProvider.ts`, `src/core/validators.ts`, `src/core/Agent.ts` (F4's one
gate only), `src/core/types.ts` (F6a's TSDoc and the `'LIMIT'` strike, F6b's rename — no other
member change), `src/core/errors.ts` (F6a's TSDoc only), `tests/src/core/AgentProvider.test.ts`,
`tests/src/core/validators.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/Agent.test.ts`
(F4's test only), `tests/src/core/shapers.test.ts` and `tests/src/core/contracts.test.ts` (only if
F6b makes an assertion false), `tests/setup.ts` (fixture additions and F6b's rename).

**Shared (report-only).** None.

**Off-limits.** Everything else A1 owned (`constants.ts`, `helpers.ts`, `shapers.ts`, `contracts.ts`,
`index.ts` — a needed change there is a stop-and-report), `guides/**`,
`README.md`, `tests/guides.test.ts`, `package.json`, `package-lock.json`, configuration, the
vendored set, `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `scripts/**`, `dist/**`, `node_modules/**`.

**What asserts the state this change ends.** The tests named per finding; nothing in the guide
asserts these behaviours yet (A3).

**Tools and limits.** As A1: read-only scripts (`lint:check`, `check:src:core`, `check`,
`test:src:core`, `test:setup`, `test:probe`); never `lint`, `format`, `build`, `test`; never
install, commit, or read a credential.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

Write the report to `tmp/units/a1-fix-report.md` and return the same text as your final message:
`Touched files` with `git diff --stat`; `Red then green` per finding F1–F5 (exact command,
failing count, passing count); `Scoped validation` (`lint:check`, `check:src:core`, `check`,
`test:src:core`, `test:setup` with exit codes and counts); `Observations`; `Deviation`; `Status`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when a
finding's fix needs a file outside Owned, when a fix would change a behaviour the ruled contract
fixes, or when a rule forbids an instruction here. Decide, record, and carry on from test naming
and ordering.

## Acceptance criteria

1. `npm.cmd run lint:check` exits 0.
2. `npm.cmd run check:src:core` and `npm.cmd run check` exit 0.
3. `npm.cmd run test:src:core` and `npm.cmd run test:setup` exit 0; the count rises by the tests
   this brief names and falls by none.
4. F1: the three named tests exist, were red before the catch changed, and are green after.
5. F2: the stalled-503 test was red (timed out or pending) before and is green after, within its
   own 400 ms budget.
6. F3: the two hostile-`every` tests were red before and green after; the proxy cases stay green;
   the `calls.every` and `images.every` calls are gone from `validators.ts`.
7. F4: the empty-thinking test was red before and green after; `Agent.ts` changes by one gate.
8. F6a: `ProviderErrorCode` is `'HTTP' | 'PROTOCOL' | 'PROVIDER'` with each arm documented;
   `grep -rn "'LIMIT'" src tests` returns nothing. F6b: `grep -rn "frame:" src/core/types.ts`
   returns nothing and `RelayProviderOptions` carries `parser`. F6c: the `AgentProvider`
   `@example` declares a subclass. F6d: the `2048` pin and the single-chunk case exist. F6e: one
   `joinThinking` block remains in `helpers.test.ts`.
9. No `any`, assertion, non-null assertion, suppression, access modifier, parameter property, or
   nested function declaration in the diff.

**Observations, not criteria.** `test:guides`; `build`; the whole `test` chain.

## Review evidence

A code change: `git diff --stat` and `git status --porcelain` in the report; the Orchestrator takes
the full diff from the tree.
