# Unit A2-fix — repair the findings of audit round A2-R1 on the relay

The Orchestrator fills § Measurements at dispatch, after unit A1-fix-2 lands.

## Role and engine

`sol` route (the `implementer` work class) on GPT 6 Astra (`gpt-6-astra`), reached through
`codex exec --sandbox workspace-write` rooted at `C:/Users/mikes/WebstormProjects/agent`. You are
the bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. You are the sole writer in this checkout for the life of this unit. The fix's auditor is
the Opus reviewer plus the Orchestrator's mutation probes.

## Objective

Close every finding audit round A2-R1 substantiated against commit `c50aee6`, each with a failing
test first, without widening any refusal into a regression, and finish with `test:src:core` and
`test:setup` fully green.

## Context

**Record.** `../scaffold/.orkestrel/campaign/a2-audit-objective.md`,
`a2-audit-mechanical.md`, `a2-audit-subjective.md`, the Orchestrator's probes
`a2-probe-relay-body-error.md` and `a2-probe-vectors.md` (read each: it carries the instrument,
the controls, the verbatim readings, and the ruling), and `design-reconciliation.md` § "Audit
round A2-R1".

**Law, host, standing conditions.** As `tmp/units/a2-brief.md` § Context: `../scaffold/AGENTS.md`
and the rules it names; PowerShell through the Codex CLI (`npm.cmd`); network denied; `.git`
read-only; probes under `tmp/probe/`; Vitest workers spawn; the `prove` tool is blocked — use
`expectTypeOf` and executed tests; `test:guides` is red until A3.

**Measurements.** The agent HEAD is `0fa4090` (A1-fix-2 committed 2026-09-14) and the tree is
clean. Host gates at that commit: `format:check`, `lint:check`, `check`, and `build` exit 0;
`test:src:core` reports 23 files and 733 tests passing; `test:setup` reports 1 file and 54 tests
passing (`../scaffold/.orkestrel/campaign/a1-fix-2-gates.log.txt`). The relay commit under repair
is `c50aee6`; A1-fix-2 changed the catch in `AgentProvider.ts` (a throw that raced the cancel
rides as the `cause` of `ProviderAbortError`) and the block names in `AgentProvider.test.ts`, and
nothing else in the files this unit owns — read each owned file at HEAD rather than from the audit
record's line numbers.

## Findings and their carriers

**F10 — no lookahead; a body must be smaller than the limit (claims 3 and 11, probe V2, V4).**
`readText` decides `complete` without an extra read: `true` only when the read observed `done`
within the budget, `false` when the budget was exhausted without a `done` observation or the
signal aborted. Remove the lookahead branch and its TSDoc sentence; document the rule on
`TextRead.complete` and on `RelayOptions.limit` ("the handler answers `413` for a body at or above
the limit"). Tests, failing first where the rule changes: an exactly-`limit` body that closes →
`complete: false`; `limit - 1` bytes that close → `complete: true`; `limit + 1` → `complete: false`
with one overshoot chunk; an exactly-`limit` body followed by an empty chunk → `complete: false`;
the relay refuses exactly `DEFAULT_RELAY_LIMIT` bytes with `413` and accepts
`DEFAULT_RELAY_LIMIT - 1` bytes of valid JSON; the base's non-OK path with a body of exactly
`MAX_ERROR_BODY_LENGTH` bytes that then stalls rejects promptly with `ProviderError` `HTTP` and the
bounded excerpt, never waiting for the deadline (the `573ba71` behaviour restored) — add that case
to `AgentProvider.test.ts` beside the single-chunk overshoot.

**F11 — the wire body is the validated snapshot (claim 1, probe V1).** In `RelayProvider.body`,
own a JSON snapshot of the projection before it is validated and returned (the installed
contract's `cloneJSONValue`, or the compiled contract's `parse` if it clones — read the
declaration and say which), so the base serializes exactly what the guard saw and a `get` trap
supplying `toJSON` cannot reach `JSON.stringify`; any failure to snapshot is
`ProviderError('PROTOCOL')` before fetch. Test, failing first: a `parameters` proxy whose `get`
trap returns a `toJSON` yielding a `BigInt` → `ProviderError` `PROTOCOL`, no fetch; a `schema`
proxy the same; a plain valid request round-trips unchanged.

**F12 — the handler always answers (claim 7, probe V3, and `a2-probe-relay-body-error.md`).**
`createRelay` catches a request-body read failure and answers `400` (an inbound abort during the
read keeps its ruled answer: `readText` returns `complete: false` and the handler answers `413`
to a client that is gone; a throw caught while `request.signal.aborted` reads true answers `413`
too, never `400`), and
catches a failure to construct the provider call (`provider.stream` throwing synchronously) and
answers `502` through a new named constant `UPSTREAM_RELAY_STATUS`, with no upstream text in
either response and no listener left registered. Tests, failing first: a body that errors after a
prefix → `400`, provider never called; a provider whose `stream()` throws `Error('fixture-secret')`
→ `502`, response body empty, `'fixture-secret'` nowhere in the response.

**F13 — an inbound abort settles the stream (claim 5, probe V5).** `RelayStream`'s inbound-abort
listener aborts the upstream controller and then returns the iterator (a queued `return()`
settles after any pending `next()`), marks the stream settled, and releases the listener, so a
generator never lingers when the client disconnects while a frame sits unread; the consumer-cancel
path is unchanged. Test, failing first: a scripted generator that records `return()` and
`finally`; abort the inbound signal with one frame queued and no consumer read; both fire within
the test's budget.

**F14 — the composed hop proves the refusals (claim 9).** Add to
`tests/src/core/integration.test.ts` the `401`, `413`, and `400` cases driven
`RelayProvider → Request → handler → Response`, asserting the browser side throws `ProviderError`
with code `HTTP` and the matching status and the scripted provider recorded no `stream` entry
(record entry into `stream()` itself, not generator execution, as the objective lane noted).

**F15 — usable source examples (claim 12).** Rewrite the `@example` fences on `RelayProvider`,
`createRelayProvider`, and `createRelay` so each is a composition a reader can copy: published
imports (`@orkestrel/agent`; `createNDJSONParser` from `@orkestrel/ndjson` as the parser a browser
app supplies — agent declares no dependency on it, so the fence names it as the consumer's
import), the browser `headers` hook attaching a custom bearer, the server's `authorize` reading
that bearer, and the handler mounted on an `@orkestrel/router` dispatcher. Name no undefined
identifier. Unit A3 transcribes and executes them with the test-infrastructure parser standing in
for the `@orkestrel/ndjson` import, and the guide states that substitution.

**F16 — the message template without a dangling separator (the reviewer's claim-9 referral).**
In `AgentProvider.#request`, a non-OK response whose excerpt is empty throws
`provider error: <status>` with no trailing ` - `; a non-empty excerpt keeps
`provider error: <status> - <excerpt>`. Test, failing first: a `401` with no body → message
`provider error: 401`; the existing `503` cases unchanged. (Owned for this item:
`src/core/AgentProvider.ts`, that method only.)

**F17 — the obligations on `authorize` and the statuses the handler answers (reviewer F2 and
claim 12).** On `RelayOptions.authorize`'s TSDoc: the hook must not consume the request body (a
body-reading hook locks the stream and the handler answers `400`), and the mechanism performs no
origin or method check, so an application that trusts an ambient credential such as a cookie must
compose origin and CSRF middleware in front, or the relay is drivable cross-site. On
`createRelay`'s doc block, an `@remarks` naming `401`, `400`, `413`, and `502` and when each is
answered, and on `RelayProvider`'s remarks one sentence stating that a refusal reaches the browser
as `ProviderError` with code `HTTP` and the status.

**F18 — strike the decorative `code` from the error frame (reviewer F3).** `RelayFrame`'s error
arm becomes `{ readonly channel: 'error'; readonly message: string }`; `relayFrameShape`,
`RelayStream`'s frame, and `RelayProvider.read` follow; the compiled contract refuses a frame
carrying `code`. Test, failing first where the shape changes. (Owned for this item:
`src/core/types.ts`'s `RelayFrame` and `src/core/shapers.ts`'s `relayFrameShape` only.)

**F19 — the prose rules in the new TSDoc (reviewer F4).** Every code identifier in the new doc
blocks is a backticked token followed by a noun (`the ToolCall.caller member`, `a
ProviderAbortError`, `the Agent runtime`), per `../scaffold/.claude/rules/writing.md`
§ "Code tokens, references, and links"; no `@example` names an identifier it does not define or
import (F15 governs the fences).

## Scope

**Owned.** `src/core/providers/RelayProvider.ts`, `src/core/RelayStream.ts`, `src/core/factories.ts`,
`src/core/helpers.ts` (`readText` only), `src/core/constants.ts` (additions), `src/core/types.ts`
(`TextRead`, `RelayOptions` TSDoc, and the `RelayFrame` error arm only), `src/core/shapers.ts`
(`relayFrameShape` only), `src/core/AgentProvider.ts` (F16's message template only),
`tests/setup.ts` (fixture additions),
`tests/src/core/providers/RelayProvider.test.ts`, `tests/src/core/RelayStream.test.ts`,
`tests/src/core/factories.test.ts`, `tests/src/core/integration.test.ts`,
`tests/src/core/helpers.test.ts`, `tests/src/core/AgentProvider.test.ts` (the exact-bound stall
case, the F16 empty-excerpt case, and any existing assertion F16's template makes false, only).

**Shared (report-only).** None.

**Off-limits.** The rest of `src/core/AgentProvider.ts` beyond F16 (A1-fix-2 landed it; a needed
change elsewhere in it is a stop-and-report), `errors.ts`, `validators.ts`, the rest of
`shapers.ts`, `contracts.ts`, `index.ts`,
`guides/**`, `README.md`, `tests/guides.test.ts`, configuration, the vendored set,
`package.json`, `package-lock.json`, `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `scripts/**`,
`dist/**`, `node_modules/**`.

**What asserts the state this change ends.** The F9 tests in `helpers.test.ts` and
`factories.test.ts` that pinned the lookahead rule (they change under F10); the error-frame
literals carrying `code: 'PROVIDER'` in `tests/setup.ts`, `integration.test.ts`, and
`RelayStream.test.ts` (they change under F18); nothing else.

**Tools and limits.** As A2: read-only scripts (`lint:check`, `check:src:core`, `check`,
`test:src:core`, `test:setup`, `test:probe`); never `lint`, `format`, `build`, `test`; never
install, commit, or read a credential.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

Write the report to `tmp/units/a2-fix-report.md` and return the same text as your final message:
`Touched files` with `git diff --stat`; `Red then green` per finding F10–F16 and F18 (exact
command, failing count, passing count); `Prose` for F17 and F19 (the doc blocks changed, by file
and symbol); `Scoped validation`; `Observations`; `Deviation`; `Status`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when a
fix needs a file outside Owned or would change a behaviour the ruled contract fixes. Decide, record,
and carry on from test naming and ordering. A shape you must widen inside Owned is not a stop.

## Acceptance criteria

1. `npm.cmd run lint:check`, `npm.cmd run check:src:core`, and `npm.cmd run check` exit 0.
2. `npm.cmd run test:src:core` and `npm.cmd run test:setup` exit 0 with every file collected.
3. F10: `grep -n "lookahead" src/core/helpers.ts` returns nothing; the exactly-limit cases hold as
   stated; the stalled exact-bound 503 case rejects within its own 400 ms budget.
4. F11: the hostile-`toJSON` cases were red and are green; no fetch occurs on them.
5. F12: the body-error and sync-throw cases were red and are green; `UPSTREAM_RELAY_STATUS`
   exists in `constants.ts`.
6. F13: the queued-frame inbound-abort case was red and is green.
7. F14: the three composed refusal cases exist and assert no `stream` entry.
8. F15: `grep -n "createParser" src/core` returns nothing; each fence names only published
   imports and defined identifiers.
9. F16: the empty-excerpt case was red and is green; the message reads `provider error: 401`
   with no trailing separator.
10. F17: the TSDoc on `RelayOptions.authorize` names the body obligation and the origin
    obligation; the `@remarks` on `createRelay` names `401`, `400`, `413`, and `502`.
11. F18: the error arm of `RelayFrame` carries `channel` and `message` only, `relayFrameShape`
    matches, and the frame-contract case refusing a `code` member was red and is green.
12. F19: no bare code identifier in the new doc blocks, and no `@example` names an identifier it
    neither defines nor imports.
13. No `any`, assertion, non-null assertion, suppression, access modifier, parameter property, or
    nested function declaration in the diff.

**Observations, not criteria.** `test:guides`; `build`; the whole `test` chain.

## Review evidence

A code change: `git diff --stat` and `git status --porcelain` in the report; the Orchestrator takes
the full diff and runs mutation probes on F10–F13, F16, and F18.
