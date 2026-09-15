# Design reconciliation — provider base, `OllamaProvider` on it, browser↔server relay

Ruled by the Orchestrator on 2026-09-14 from two blind lanes on one brief
(`design-brief.md`): `design-subjective-report.md` (planner, Opus 5) and
`design-objective-report.md` (analyst, GPT 6 Astra). Neither lane saw the other. Findings the
lanes disagreed on were reproduced before ruling where a probe could settle them.

## Agreed by both lanes, adopted

- The base is an abstract class named `AgentProvider` in `@orkestrel/agent` `src/core`; concrete
  providers `extends` it. It is host-independent and HTTP-shaped. One base, no transport-agnostic
  superclass until a process-shaped consumer exists.
- The framing seam is a structural `ProviderParserInterface<TRecord>` with `parse` and `clear`,
  satisfied by the installed `NDJSONParserInterface` and `SSEParserInterface` without agent
  depending on either package. The concrete provider supplies the parser.
- `@orkestrel/ollama` moves from a server face to a core face; the bare specifier does not change.
  Node fixture servers stay in `tests/setupServer.ts` and are imported directly by test files, as
  the service suites already do. Probed: the vendored `tests/config.test.ts:120-125` pins the
  `src:core` project to `setupFiles: ['./tests/setup.ts']`, and the tests lint override restricts
  only the `typescript` import, so a direct fixture import is permitted.
- The relay is both kinds: the transparent wire proxy stays as a documented pattern, and an
  agent-level relay is added — `createRelay` returning a host-independent
  `(request: Request) => Promise<Response>` handler mountable on `@orkestrel/router`, and a
  browser-side `RelayProvider`. The request carries identified `Message` values, `tools`, and
  `options`; the response is NDJSON; the terminal frame carries the authoritative `ProviderResult`
  so `thinking`, `tools`, and `usage` survive the hop; a server-side abort becomes an abort frame
  the browser rethrows as `ProviderAbortError`.
- `authorize` on the server half is mandatory; token minting, validation, and identity stay in the
  application. The browser half authenticates through the existing `headers` hook.
- `buildResult` moves to agent; `OllamaResponse` is retired; ollama's `joinThinking` is deleted in
  favour of the agent's (probed: the two functions have different signatures and disagree on
  empty input).
- Publish agent `0.0.22` first, then ollama `0.0.16` re-pinned to `^0.0.22`; toolbox re-pins in
  its own later campaign. During the campaign the agent artifact reaches ollama as an installed
  packed tarball, never a link.
- No browser Vitest project and no new dependency.

## Rulings on the disagreements

| # | Question | Subjective lane | Objective lane | Ruling and reason |
| - | -------- | --------------- | -------------- | ----------------- |
| 1 | Seam form | Abstract methods on the subclass (`body`, `read`) plus a public `request`; `url`, `path`, `frame` as constructor input | A composed `wire` object exposed as a readonly property, with `finish`, `error`, `unary`, `split`, `strict` | **Abstract methods on the subclass, with the objective lane's seam set.** The subclass fills `frame`, `body`, `read`, and `finish`; `url`, `path`, `split`, and `strict` are constructor input; `name` is an abstract data member. A wire object would leave `OllamaProvider` an empty subclass, which the wrapper test forbids. `request` stays `#`-private: nothing outside the base needs it once `generate` is ruled below. The objective lane was right that end-of-input is wire-specific (`finish`), and that the relay must not re-split (`split`) and must require a terminal frame (`strict`). |
| 2 | `generate` | Drains `stream`; Ollama overrides with its native `stream: false` call | Base selects a native unary path when the wire supplies a decoder | **`generate` drains `stream`, and nobody overrides it.** One engine, exactly as `Agent.generate()` drains `Agent.stream()`. Ollama's `stream: false` mode is not a faster path, only a second flow; its guide clause and the request-shape assertion that pin `stream: false` are ours to change and are recorded as a release change. This also removes the multi-line-JSON hazard that framing a unary body through an NDJSON parser would have introduced. |
| 3 | HTTP error | Shared `ProviderHTTPError` in agent; ollama's error class removed (flagged as the user's call) | Wire-specific `error(failure)` translation keeping `OllamaHTTPError` | **One shared `ProviderError` in agent with `code: 'HTTP' \| 'PROTOCOL' \| 'LIMIT' \| 'PROVIDER'` and an optional `status`; `OllamaHTTPError`, `isOllamaHTTPError`, and `OllamaHTTPErrorOptions` are removed.** The only vendor-specific content of ollama's error is the word "Ollama" in its message. A per-vendor error seam would be a wrapper. Recorded for the user as a public removal they can reverse. |
| 4 | Error-body bound | Slice after `response.text()` (as today) | Stop reading after a bounded prefix and cancel the remainder | **Objective lane.** Reproduced: `OllamaProvider.ts:370` reads the whole error body before slicing, which does not bound the read. The base reads at most `MAX_ERROR_BODY_LENGTH` and cancels the rest. |
| 5 | Body readers | Inline reader loop in the base | A `ProviderReader` class with limits and truncation shared by base and relay | **Two exported helpers rather than a class:** `readText(body, limit?)` collects a bounded text and cancels the remainder, and `readChunks(body)` yields decoded text with a final flush and a cancel in `finally`. Both are pure leaves over a `ReadableStream`; the relay handler reuses `readText` to bound its request body. |
| 6 | Relay frame vocabulary | `channel` discriminant reusing `ProviderDelta` as-is; `settle`, `abort`, `error` arms | `event` discriminant with a `sequence` number and a `version: 1` request field | **`channel`, reusing `ProviderDelta` verbatim; arms `result`, `abort`, `error`; no `sequence`, no `version`.** One discriminant name for one concept. Loss detection buys little because the `result` frame is authoritative for the final value and `strict` already fails end-of-input without it; a version field on a `0.0.x` greenfield wire is speculation. |
| 7 | `authorize` return | `boolean`; false answers `401` | `Response \| undefined`; the application supplies the denial | **`boolean`.** Anything richer composes in front as ordinary `@orkestrel/server` middleware, which is the line's documented pattern for MCP. |
| 8 | Request body bound on the server | Not addressed | Finite configurable limits | **Adopted for the request:** `RelayOptions.limit` in bytes, default `1_048_576`, answered with `413`. Provider success bodies stay unbounded as today and the guide says so. |
| 9 | JSON representability across the hop | Not addressed | Reject unrepresentable values before dispatch; do not silently drop `caller` | **Adopted.** `RelayProvider.body` projects the request through a `providerRequestToJSON` helper gated by contract's JSON guards, exactly as `agentResultToJSON` already does, and throws `ProviderError('PROTOCOL')` when the value is not JSON. `ToolCall.caller` never crosses the hop and the guide states it (it is declared `unknown`, consumer-asserted context). |
| 10 | `isMessage` | Not addressed | The guard is weaker than the type; fix it, do not add a second guard | **Adopted as a repair with red/green.** Reproduced at `validators.ts:36-42`: any `role` string and any `images` array pass. The guard now narrows to the `MessageRole` union and string image elements. A stored snapshot carrying a role outside the union now reads as absent, which is the fail-closed reading the guard already claims for `calls`. |
| 11 | Placement | `providers/AgentProvider.ts` | `AgentProvider.ts` at the module root | **Root for the defining base, `providers/` for concrete providers:** `agent/src/core/AgentProvider.ts`, `agent/src/core/providers/RelayProvider.ts`, `agent/src/core/RelayStream.ts`; `ollama/src/core/OllamaProvider.ts` stays where its class sits today. |
| 12 | Browser proof | Core-scoped typecheck plus a bound-`fetch` runtime assertion; state the limit | The same, plus a real Chromium smoke through the available harness | **Both.** C3 closes on the mechanical evidence and on a Chromium receipt the Orchestrator takes with the harness browser against the built exports, retained under `.orkestrel/campaign/`. No persistent browser project. |
| 13 | Scope list omissions | — | `guides/README.md` and the lockfiles are outside the may-change list | **Adopted.** Both packages' `guides/README.md` and ollama's `package-lock.json` join the scope. |
| 14 | Unresolved `headers` hook under abort | Not addressed | A timeout signal handed to `fetch` cannot interrupt an unresolved hook promise | **Adopted.** The base races the hook against the combined signal and proves it with a never-resolving hook. |
| 15 | `usage` gating | Fold whatever `read` reports | A usage frame replaces the prior report | **Same behaviour, adopted as `ProviderIncrement.usage?`:** present replaces, absent keeps. Ollama's `extractUsage` already returns `undefined` unless both counts are present, so its observable behaviour is unchanged. |

## Which lane was right on what

- The subjective lane was right on the seam form, the discriminant, the `authorize` shape, the
  name set, the `joinThinking` collision, and the unit decomposition.
- The objective lane was right on `finish`, `split`, `strict`, the unbounded error read, the
  request-body bound, JSON representability, the `isMessage` defect, the unresolved-hook hazard,
  the scope omissions, and the Chromium receipt.
- The Orchestrator overruled both on `generate` and on the error taxonomy, for the reasons in the
  table.

## Decisions made on the user's behalf, reversible

1. `OllamaHTTPError`, `isOllamaHTTPError`, `OllamaHTTPErrorOptions`, `MAX_ERROR_BODY_LENGTH`,
   `DEFAULT_PROVIDER_TIMEOUT`, `buildResult`, `joinThinking`, `parseBody`, and `OllamaResponse`
   leave `@orkestrel/ollama`; the first five reappear in `@orkestrel/agent` as `ProviderError`,
   `isProviderError`, `MAX_ERROR_BODY_LENGTH`, `DEFAULT_PROVIDER_TIMEOUT`, and
   `buildProviderResult`.
2. `OllamaProvider.generate` no longer sends `stream: false`; it drains the stream.
3. `@orkestrel/ollama` publishes a core face instead of a server face.
4. `@orkestrel/agent` gains no runtime dependency; a relay browser app passes
   `createNDJSONParser` from `@orkestrel/ndjson` to `RelayProvider` itself.

## Audit round A1-R1 (commit `cef565d`), reconciled 2026-09-14

Lanes: `a1-audit-subjective.md` (reviewer, Opus 5 — deciding, since Astra wrote the subject),
`a1-audit-objective.md` (analyst, Astra), `a1-audit-mechanical.md` (checker, Sonnet). Orchestrator
probes: `a1-probe-abort-identity.md`, `a1-probe-cleanup-paths.md`, `a1-probe-analyst-vectors.md`.

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1, 2, 7, 8, 10, 14, 17, 19 | CONFIRMED | all three lanes agree; the checker and reviewer cite the lines |
| 3 | BROKEN | probe cases B and 3b: a transport rejecting with its own `AbortError`, and an abort whose reason is a `ProviderAbortError`, both bypass the wrap; the reviewer's F1 names the same seam. Carried by fix F1. |
| 3 and 5, the stalled non-OK body | BROKEN | probe case 3c: a 503 whose body stalls outlives a 40 ms deadline (still pending at 400 ms). Carried by fix F2. |
| 4 | CONFIRMED | reviewer; probe case 4 (remote abort passes through, body cancelled, deadline cleared) |
| 5 | CONFIRMED except the 3c path | reviewer's exit-path reading; probes D, F, G, H, I |
| 6 | Claim over-stated; code kept | the read bounds decoded bytes and cancels after the first chunk that crosses the limit, overshooting by at most one source chunk, as `readText`'s TSDoc states; row 4 of the first table is amended to that wording. Fix F6d pins the constant and the single-chunk case. |
| 9 | CONFIRMED | reviewer; probe case F |
| 11, 12, 13 | CONFIRMED, tests strengthened | the analyst's named adequacy vectors are carried by fix F5 |
| 15 | BROKEN | probe: a hostile array whose own `every` returns `true` passes as `images` and `calls`. Carried by fix F3. |
| 16 | Claim wrong, one referral adopted | the `joinThinking('', 'next')` expectation change is the ruled widening; the retained A1 report's red-then-green row for it is a sanctioned reversal, not a defect proof, and this line is the record of that. The analyst's referral — `Agent.ts:480` folds an empty abort-partial `thinking` — is carried by fix F4. |
| 18 | CONFIRMED on discovery; mutation evidence to be taken | the Orchestrator runs mutation probes on the fix's own pins before accepting the fix round |

Findings outside the claims: reviewer F1 → fix F1; F2 → fix F6a, with `'LIMIT'` struck from
`ProviderErrorCode` because nothing produces it (the relay answers `413`), which amends row 8 of
the first table; F3 → fix F6b, ruling that `frame()` stays the seam's verb, `finish(parser)` its
consumer, `RelayFrame` the wire record, and the relay option is renamed `parser` (amends the
contract text in `plan.md`); F4 → fix F6c; F5 → fix F6d; F6 → fix F6e; F7 (`isSection` and
`isConversationSnapshot` totality) is outside the fixed scope and is recorded for the next change
against the read-boundary guards. The `AbortSignal.any` dependent-signal accumulation the reviewer
referred pre-exists in `Agent.ts` and is recorded as an observation for the same later change.

Which lane was right on what: the reviewer found F1–F6 and the claim-6 and claim-16 wording; the
analyst named the vectors that broke claims 3 and 15 and the F4 referral; the checker settled the
mechanical rows; the Orchestrator's probes turned the analyst's `UNRESOLVED` rows into readings.

Terminal ruling: `VERDICT: FAIL 3, 15, 16` on the brief as written; fix unit A1-fix carries every
retained finding; the fix's auditor is an engine that did not write it, plus mutation probes.

## A1-fix deviations, ruled 2026-09-14

- Run 1 stopped on the interleaved-body cancellation: reproduced as Node's `pipeThrough` never
  cancelling the source once the signal aborts with a write pending on backpressure
  (`a1-probe-pipe-abort.md`). Ruled: the readers own cancellation (fix F7); the pipe is removed.
- Run 2 stopped on F8: three hook-exit assertions cannot observe the combined signal through the
  transport, because those exits never reach it. Ruled: the seam is missing, not the assertion —
  `ProviderOptions.headers` receives the call's combined `AbortSignal` so a token-refresh request
  inside it is bounded by the same deadline; the fixture hook records that signal and the tests
  read listeners through `node:events` `getEventListeners` in the Node-run test file. This amends
  the ruled contract in `plan.md` (the `headers` signature). The global `AbortSignal.any` patch is
  deleted.

## A2 deviations, ruled 2026-09-14

- Run 1 stopped on the Orchestrator's own stale example (the `frame` option in criterion 4 after
  F6b renamed it `parser`); corrected in `a2-brief-2.md`.
- Run 2 stopped on a real gap, proved with a probe and a negative control: `readText` returns only
  decoded text, so a handler cannot distinguish a body that ended under the limit from one
  truncated at it (a BOM-prefixed body plus a trailing byte decodes to the same text as the bare
  body). Ruled as F9: `readText` returns `TextRead { text, complete }`, where `complete` is read from
  the stream (one extra read after the budget: `done` means complete), and the relay answers `413`
  on `complete: false`. This amends the helper list in `plan.md`; the base's non-OK path reads
  `.text`.

## Audit round A1-R2 (fix commit `573ba71`), reconciled 2026-09-14

Lanes: `a1-r2-audit-subjective.md` (reviewer, Opus 5 — deciding), `a1-r2-audit-mechanical.md`
(checker). The Astra analyst lane was not run: the fix was written on Astra, it adopted the
objective prescriptions, and the Orchestrator took the behavioural evidence by mutation probe
(`a1-fix-mutations.log.txt`).

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1–11 | CONFIRMED | both lanes; the reviewer re-walked every A1-R1 CONFIRMED claim and the five prior pins; the checker settled the mechanical rows |
| 12 | BROKEN, five items | reviewer; each carried by fix unit A1-fix-2 (see below) |

Referrals ruled: (a) the diffstat mismatch between `a1-fix-report-3.md` and the commit is the
Orchestrator's `npm run lint` and `npm run format` convergence run after the unit returned
(`a1-fix-gates.log.txt`); nothing else landed between the report and `573ba71`. (b) the helper
tests' `getEventListeners` assertions bind: neutralizing the readers' `cleanup.abort()` in the
isolated worktree reddens ten cases while the control is green (`a1-r2-probe-b2.log.txt`).
(c) the erased original error under a cancel is adopted as a fix item: `ProviderAbortError`
gains a `cause` through `ErrorOptions`, and the catch passes the original throw as `cause` when
the local cancel wins over a non-abort error; the signal-state rule itself stands.

Fix unit A1-fix-2 (serial after A2 in the same checkout) carries: the reviewer's five claim-12
items and referral (c). Terminal ruling: `VERDICT: FAIL 12` on the brief as written; the base is
accepted for A2 and O2 to build on, because every behavioural claim held and the open items are
documentation, naming, test placement, and one `cause` field that adds information without
changing a ruled behaviour.

## Audit round A2-R1 (relay commit `c50aee6`), reconciled 2026-09-14

Lanes: `a2-audit-subjective.md` (reviewer, Opus 5 — deciding), `a2-audit-objective.md`
(analyst, Astra — could not execute: Vite's temp-config write is denied under the read-only
sandbox, so it returned vectors), `a2-audit-mechanical.md` (checker). Orchestrator probes:
`a2-probe-relay-body-error.md`, `a2-probe-vectors.md`.

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1 | CONFIRMED on the projection; BROKEN on serialization | reviewer and checker confirm the projection and guards; probe V1: a `get` trap supplying `toJSON` reaches `JSON.stringify` after the guard. Carried by fix F11 (own a JSON snapshot). |
| 2, 4, 6, 8, 10 | CONFIRMED | reviewer; checker on the mechanical rows; the writer's controlled mutations are not evidence, the reviewer's attacks and the host run are |
| 3 | BROKEN | reviewer state A (empty chunk) and state B (the base's non-OK path waits at an exact landing); probes V2 and V4 reproduce each. Ruled: no lookahead; a body must be smaller than the limit; carried by fix F10. |
| 5 | CONFIRMED with one bounded gap | reviewer confirms each direction; probe V5: an inbound abort with a queued frame and no consumer action never returns the generator. Carried by fix F13. |
| 7 | CONFIRMED on separation; BROKEN on the answer | reviewer and checker confirm no credential crosses; probe V3 and the body-error probe: the handler rejects on a synchronously throwing `stream()` and on a body read failure. Carried by fix F12 (`400`, `502`). |
| 9 | BROKEN | reviewer and analyst agree: the composed hop proves no refusal. Carried by fix F14, which also pins the browser-visible message; the empty-detail template is carried by fix F16. |
| 11 | Record amended | the A1-R1 wording for `readText` becomes true again after F10 removes the lookahead; this section records that F9's lookahead was withdrawn by A2-fix. |
| 12 | BROKEN | reviewer: the handler can reject (F12) and refusals are undocumented (fix F17 documents the statuses and the `authorize` obligations). |

Findings outside the claims: reviewer F1 → fix F12; F2 → fix F17; F3 → fix F18 (`code` struck
from the error arm: `{ channel: 'error', message }`; amends the ruled contract in `plan.md`);
F4 → fixes F15 and F19. The analyst's vectors 1, 3, 5, and 11 were run by the Orchestrator and are
the probe readings named earlier; its vectors 2, 4, 6, and 8 are covered by the reviewer's attacks
and the host run of the suite. The reviewer's referral on the empty-detail message is adopted
(F16). The "hand-written projection beside the shape" hazard is recorded, not repaired: refusing
is the ruled posture at a hostile boundary.

Terminal ruling: `VERDICT: FAIL 3, 9, 11, 12; outside the claims: F1, F2, F3, F4` on the brief as
written; fix unit A2-fix carries every retained finding and runs after A1-fix-2 in the same
checkout; the fix's auditor is the Opus reviewer plus Orchestrator mutation probes.

### A1-fix-2 landing (2026-09-14)

Unit A1-fix-2 (Opus implementer, main checkout from `c50aee6`) landed the reviewer's claim-12
items and referral (c): `a1-fix-2-report.md`, `a1-fix-2-diff.txt`. Host gates after the
Orchestrator's converge (`a1-fix-2-gates.log.txt`): `format:check`, `lint:check`, `check`,
`test:src:core` (23 files, 733 tests), `test:setup` (1 file, 54 tests), and `build` exit 0.
Committed as `0fa4090`. Mutation probe M6 (`a1-fix-2-probe-m6.sh.txt`, log
`a1-fix-2-probe-m6.log.txt`, on the worktree `agent-audit` at `0fa4090`): with the `cause`
argument stripped from the catch, `AgentProvider.test.ts` reports 1 failed and 47 passed, the
failure being `carries a decoder failure that raced the cancel as the abort error cause`; with the
file restored, 48 passed. The pin binds. The unit's reachability observation stands as recorded in
its report: a deadline or a caller cancel throws the signal's own reason before a decoder can
throw, so the erasure is reachable only through a throw that aborts in its own turn or a transport
rejecting as the deadline fires. Checker unit A1-fix-2-check rules on the mechanical claims; its
verdict is `a1-fix-2-check-verdict.md`.

### A2-fix landing (2026-09-14)

Unit A2-fix (Astra `sol` route, main checkout from `0fa4090`) stopped once on an ownership line
the Orchestrator wrote too narrowly (`a2-fix-report.md`; successor `a2-fix-brief-2.md`) and landed
F10–F19 on its second run (`a2-fix-report-2.md`, `a2-fix-diff.txt`). Host gates after the
converge (`a2-fix-gates.log.txt`): `format:check`, `lint:check`, `check`, `test:src:core`
(23 files, 751 tests), `test:setup` (1 file, 54 tests), and `build` exit 0. Committed as
`5d288d7`. Mutation probes (`a2-fix-probes.md`): every behavioural pin binds; control 751 passed.
The unit's F11 shape — refuse a callable `toJSON` on `parameters` and `schema`, then snapshot with
`cloneJSONValue` — is referred to the reviewer as claim 4 of `a2-fix-audit-brief.md`. The A4 pack
(`a4-receipt.md`) and the Chromium receipt (`b1-receipt.md`) were taken at this commit.

### O2 landing (2026-09-14)

Unit O2 (Astra `sol` route, ollama main checkout from `e92a327`, over the A4 tarball packed from
agent `5d288d7`) rebuilt `OllamaProvider` on `AgentProvider` in one run (`o2-report.md`,
`o2-diff.txt`, journal `o2.journal.jsonl.txt`). Host gates after the converge
(`o2-gates.log.txt`): `format:check`, `lint:check`, `check`, `test:src:core` (4 files, 94 tests),
`test:setup` (3 files, 91 tests), `test:conformance` (1 file, 17 tests), and `build` exit 0;
`test:guides` red (8 failed, 14 passed) on the drift O4 owns. The recorded `/api/chat` request is
byte-identical to the previous provider's except `stream: true` (`o2-wire-before.json`,
`o2-wire-after.json`). Committed as `4ce25b3`. The unit re-pinned three transport-count
assertions to the base's ruled behaviour (a pre-aborted call and an expired header hook no longer
reach the transport), which the audit's claim 7 examines. Audit lanes: Opus reviewer (deciding)
and Sonnet checker on the worktree `ollama-audit` at `4ce25b3`; the Astra analyst lane is not run
because Astra wrote the subject.

## Audit round A2-fix-R1 (relay fix commit `5d288d7`), reconciled 2026-09-14

Lanes: `a2-fix-audit-subjective.md` (reviewer, Opus 5 — deciding; the Astra analyst lane not run
because Astra wrote the subject), the Orchestrator's mutation probes `a2-fix-probes.md`, and the
Chromium receipt `b1-receipt.md`.

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1, 2, 3, 5–13 | CONFIRMED | reviewer, with its own attacks on the binding of each pin; every mutation row reddens its pin and the control is green; B1 corroborates the refusal message and the cancel in Chrome |
| 4 | BROKEN | reviewer: the callable-`toJSON` refusal in `RelayProvider.body` is a second mechanism the owned snapshot makes unnecessary, partial (it skips `arguments`), and a read of the foreign object before ownership (`patterns.md` § Foreign contracts); the mutation row shows the clone alone strips the trap. Ruled: delete the refusal; the snapshot is the sole mechanism; the tests assert the wire body. Carried by A2-fix-r2 item R1. |

Findings outside the claims: F1 (duplicate guard) → R3; F2 (`#abort` holding `#cancel`) → R4;
F3 (cause-discarding catch) → R2; F4 (triplicated fences) → R5; F5 (dropped byte-length control)
→ R6; F6 (80 ms deadline in the shared project) → R7; F7 (the relay absent from the guide) → A3,
already in flight. The reviewer's held attack on the inbound-abort path — a consumer that aborts
the inbound signal and keeps reading without cancelling the body hangs — is adopted as a
documentation item, R9. The cosmetic note on the error arm's layout is R8.

Terminal ruling: `VERDICT: FAIL 4; outside the claims: F1–F7`. The relay stays accepted for O2 and
O3 to build on: the failed claim is a redundant refusal, and no wire or behaviour the ruled contract
fixes changes under the fix round. A2-fix-r2 runs on Opus in the agent checkout after A3 lands
(one writer per checkout), audited by the Astra analyst plus a checker and Orchestrator mutation
probes. A3 could not be told of the fence consolidation in flight (the harness exposes no message
channel to a running subagent), so R5 owns the guide's parity for those fences.

## Audit round O2-R1 (ollama rebuild commit `4ce25b3`), reconciled 2026-09-14

Lanes: `o2-audit-subjective.md` (reviewer, Opus 5 — deciding) and `o2-audit-mechanical.md`
(checker, Sonnet, on the mechanical rows); the Astra analyst lane not run because Astra wrote the
subject.

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1–11 | CONFIRMED | reviewer on every claim with its own re-derivation of the byte equality and the binding of each pin; checker on the mechanical rows; host gates `o2-gates.log.txt` |

Findings outside the claims: F1 (five TSDoc lines in `src/core/helpers.ts` describe the deleted
non-stream path; ships in the declaration) → O4 item 9, with `src/core/helpers.ts` TSDoc granted
to O4; F2 (criterion 6's `timeout` default is closed by the installed
`DEFAULT_PROVIDER_TIMEOUT = 120000` matching the deleted constant, not by a test) → recorded here
as the closing evidence; F3 (near-duplicate pre-aborted cases), F4 (the control's implicit link to
its guards), F5 (`RecordedRequest.text` optional with no absent producer) → unit O2-fix on
`builder`, after O3 lands in the same checkout; F6 (`stream: true` on `generate` unconfirmed
against a real daemon) → V2's `test:service` run is the closing criterion of design row 2, not a
routine gate.

Terminal ruling: `VERDICT: PASS; outside the claims: F1–F6`. O2 is accepted for O3 and O4 to build
on.

### A3 landing and a re-baseline (2026-09-14)

Unit A3 (Opus implementer, agent main checkout from `5d288d7`) landed the guide, README, index,
and executed transcriptions (`a3-report.md`, gates `a3-gates.log.txt`: `format:check`,
`lint:check`, `check`, `test:src:core` 751, `test:setup` 54, `build` exit 0) and stopped,
correctly, on one parity assertion it could not close from an owned file: `@orkestrel/guide`
0.0.18's key grammar (`collectKeys`, `src/core/helpers.ts:2096`) does not match
`export abstract class`, so `AgentProvider` is invisible to the gate — it can carry no Surface
row and no fence can import it. The unit measured each consequence by running the gate and
refused the namespace-import workaround as a suppression of a parity failure whose drift is in
the tool. Committed as `8dbe522` with that state stated in the message.

Re-baseline (added, per the exit criterion's "gates green in agent"): unit G1 on `builder` in the
`guide` checkout admits the `abstract` modifier in the grammar with a failing test first; the
Orchestrator packs the fixed guide and installs the tarball into agent as a development copy
(`--no-save`, the head-start pattern; the guide release is the user's decision); unit A3-fix on
`builder` restores the `AgentProvider` Surface row and removes clause 1's sentence about the
grammar; then `test:guides` is green and A2-fix-r2 launches. The dependency order becomes
G1 → G1 pack → A3-fix → A2-fix-r2 → A3 audit (over `5d288d7..A3-fix`) → V1. No unit is struck.

## Audit round O3-R1 (relay round trips, ollama commit `24662ef`), reconciled 2026-09-14

Lanes: `o3-audit-subjective.md` (reviewer, Opus 5 — deciding) and `o3-audit-mechanical.md`
(checker, Sonnet); the Astra analyst lane not run because Astra wrote the subject. Orchestrator
evidence: `o3-gates.log.txt`, `o3-service.log.txt` (12 files, 61 tests), `o3-relay-service.log.txt`
(the three relay cases by name), `o3-policy.log.txt` (the policy project at `dcb64fe`: 90 passed,
1 skipped — the reviewer's F6).

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1–8, 10 | CONFIRMED | reviewer, with the binding of each case traced through the installed relay; checker on the mechanical rows; the live logs |
| 9 | BROKEN | reviewer: the header comment of `tests/setupServer.test.ts` was made false by O3's additions (in-memory transport fixtures under a "real sockets" sentence; an enumeration that omits the relay server). Carried by O3-fix item 1. |

Findings outside the claims: F1 (the live suite infers the daemon hop) → O3-fix item 2; F2
(`RecordingProxyInterface` names a relay server) → item 4; F3 (two recording transports) →
item 3, owning the other call sites; F4 (`cancelled` names its mirrored source) → item 5; F5
(the negative credential assertion reads whole values) → item 6; F6 (no policy reading) → taken
by the Orchestrator at `dcb64fe`, green; F7 (the `caller` drop unproven in the composition) →
item 7. The reviewer's answer to claim 8 stands as the reason F1 is required: the live suite's
assertions could pass against a provider the relay never reached, and only the composition made
it live.

O3-fix runs on `builder` in the `ollama-audit` worktree on the branch `o3-fix` from `dcb64fe`,
beside O4 writing the main checkout; the Orchestrator merges the branch after O4 lands (disjoint
files) and re-runs the live service project. Terminal ruling: `VERDICT: FAIL 9; outside the
claims: F1–F7`. O3 is accepted for O4 to document.

## Audit round A3-R1 (agent guide, commits `8dbe522` and `c052711`), reconciled 2026-09-14

Lanes: `a3-audit-objective.md` (analyst, GPT 6 Astra, read-only exec on the worktree with
executed source probes — the lane on an engine that did not write the subject),
`a3-audit-subjective.md` (reviewer, Opus 5), `a3-audit-mechanical.md` (checker, Sonnet).
Orchestrator evidence: `a3-fix-gates.log.txt` (the guide gate at `c052711` on the worktree with
the packed guide: 39 passed, exit 0).

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1 | CONFIRMED | the checker and the reviewer read only the pre-fix log and the analyst's sandbox could not run Vite; the Orchestrator's own run at `c052711` settles it. The reviewer's R1 is ruled: the green rests on the packed `@orkestrel/guide` from `9863e77` installed `--no-save`; acceptance records that agent re-pins `^0.0.19` after that package publishes, and `npm ci` at `c052711` alone reinstates the pre-G1 failure until then. |
| 2, 5, 6, 8, 9 | CONFIRMED | all three lanes |
| 3 | BROKEN | analyst (three sentences contradicted by executed probes: the overshoot is in source bytes consumed, the excerpt is a byte-exact cut; the id is minted at construction, not per call; a `502` refusal enters the upstream once) and reviewer (the overshoot sentence; the `OVERSIZED_RELAY_STATUS` summary says "exceeds" where the code and clause 36 say "at or above"). Carried by A3-fix-2 items D1–D4. |
| 4 | BROKEN | analyst and reviewer agree: the relay transcription drives the handler directly and never executes the documented dispatcher route; the substitution sentence names only the parser and calls the stand-in "equivalent" when its failure path differs (the published parser skips a malformed line; the stand-in throws); the engine-configuration fence has no transcription. Carried by A3-fix-2 items D5–D7; the true route execution needs `@orkestrel/router` declared, a decision put to the user. |
| 7 | BROKEN on the analyst's hits | the reviewer confirmed under the fleet's convention for a type name as a sentence subject (R3, carried forward, not reopened here); the analyst's specific hits — the token-noun slips at `README.md:12` and `guides/README.md:11`, and the count "One guide" at `guides/README.md:13` — are real and carried by A3-fix-2 item D8. |
| 10 | BROKEN | analyst: the relay pattern's one function conflates server-owned setup with browser setup and replaces browser networking with a direct dispatcher call; reviewer: the guide never introduces the record type parameter a subclass author needs. Carried by A3-fix-2 items D9 and D10. |

Findings outside the claims: reviewer F1 (a sentence still saying `AgentProvider` carries no
Surface row) → D11; F2 (the new constant rows give no value) → D12; F3 (four status summaries
written as actions) → D13; F4 (the engine fence's undeclared identifiers) → D14; F5 (the flagship
relay fence collapses the two processes with an unmarked `fetch` override) → D9; F6 (the guide
cites "this campaign") → D15; F7 (the wire-contract fence promises `parse` and discards a
generator) → D16; F8 (the concept cell's bare names) → D17. Referral R2 is ruled: a guide fence
may import a package the consumer installs when the prose says so, and the transcription may
import only what the package declares — the parser stays a stand-in, and a route execution
through `@orkestrel/router` waits on the user's devDependency decision. Referral R3 is a
carry-forward on `.claude/rules/writing.md`'s owner, not this campaign's.

Terminal ruling: `VERDICT: FAIL 3, 4, 7, 10; outside the claims: F1–F8`. A3 stands as committed;
A3-fix-2 runs on Opus (documentation voice) in the agent checkout after A2-fix-r2 commits, audited
by the Astra analyst plus a checker.

## Audit round A2-fix-R2 (relay fix round 2, agent commit `611e24e`), reconciled 2026-09-14

Lanes: `a2-fix-r2-audit-objective.md` (analyst, GPT 6 Astra, read-only exec with executed source
checks — deciding, because Opus wrote the subject) and `a2-fix-r2-audit-mechanical.md` (checker,
Sonnet). Orchestrator evidence: `a2-fix-r2-probes.md` (R1 and R2 bind; control 753).

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1 | BROKEN on the prose | analyst: an own function-valued `toJSON` property (not a `get`-trap serializer) is refused by the clone as a value outside JSON, so "refuses no serializer" and the unqualified "ignored" overstate; the mechanism is right (the snapshot never consults a serializer; a non-JSON own property is refused). Carried by A2-fix-r3 item P1 (prose precision in the class remarks and the guide). |
| 2, 3, 5, 6, 7, 8, 11 | CONFIRMED | analyst with executed checks; checker on the mechanical rows |
| 4 | CONFIRMED, the claim narrowed | analyst: `#abortProvider` is a compound private method the naming rule permits; the claim's single-word conjunct was the brief's error, not a defect |
| 9 | CONFIRMED, the claim narrowed | analyst: three listed tests pass at baseline — the `arguments` wire-body case (a control the brief predicted), the restored byte-length control (R6), and the resized deadline (R7) — each disclosed by the report; a control and a budget change have no red state by nature, and the claim's wording swept them in |
| 10 | BROKEN on hygiene | analyst: `RELAY_RESULT_FRAME` declared in the test file rather than `tests/setup.ts`; a type import after value imports in `createRelay`'s fence and its guide mirror; "composes the two" as a count phrase; and the guide prose changes beyond the R5 grant. The last is ruled: the Orchestrator's ownership line was too narrow, the corrections were required by `documentation.md`, and this record is the scope amendment. The first three are carried by A2-fix-r3 items P2–P4. |

Terminal ruling: `VERDICT: FAIL 1, 4, 9, 10; outside the claims: none` on the brief as written;
on the subject, one prose precision and three hygiene items remain, carried by A2-fix-r3 on
`builder` after A3-fix-2 commits (both touch `guides/agent.md`). The relay's mechanism is accepted.

## Audit round O4-R1 (ollama guide, commits `4f0d357` and the cleanup `2178171`), reconciled 2026-09-14

Lanes: `o4-audit-objective.md` (analyst, GPT 6 Astra, read-only exec with in-memory executed
checks — the lane on an engine that did not write the subject), `o4-audit-subjective.md`
(reviewer, Opus 5), `o4-audit-mechanical.md` (checker, Sonnet). Orchestrator evidence:
`o4-gates.log.txt`, `o5-gates.log.txt`, `v2-verdict-1.md` (GATES GREEN at `2178171`),
`b2-receipt.md`.

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1, 2, 5, 6, 8, 9 | CONFIRMED | all three lanes; the checker's and analyst's evidence-gap note (the export list was retained late) is closed |
| 3 | BROKEN on the mirror | analyst: the mirrored `guides/agent.md` in ollama predates A3, so the delegated contract the clause points to is absent there. The mirror is fetched from the agent repository's main on GitHub by the scaffold's `mirror` verb; until the agent commits are pushed (the user's call), the Orchestrator refreshes it as a byte copy from the agent checkout at its final commit. Carried by O6 item M1. The reviewer's attacks on every other clause held. |
| 4 | BROKEN | analyst: the streaming fences claim joined deltas equal the settled content, which the implicit-open reclassification breaks (executed: `reasoning` then `</think>answer` folds to content `answer`); the reviewer's claim-4 confirmation covered specifiers and transcription, not that equality. Carried by O6 item M2. |
| 7 | BROKEN | reviewer: two possessivized code tokens (`AgentContext`'s) in touched sentences; analyst: the counts "one entry" and "two content spans, one reasoning span". The bare-token-as-subject pattern is the fleet's convention (A3-R1 referral R3) and is not ruled a defect. Carried by O6 items M3 and M6. |
| 10 | BROKEN | analyst and reviewer: the relay server fence builds a dispatcher and never serves it; the guide links neither the router nor the server guide. Carried by O6 item M4 (with `createServer`, `start`, `stop`, and the links). |

Findings outside the claims: reviewer F1, F2 (the browser clause cites "the campaign" and the
weaker receipt) → M7 (state B2's reading: this package's built entry in Chrome 148, direct and
relayed, with the date); F3, F4 (the Tests bullets for `setup.test.ts` and `setupServer.test.ts`
misdescribe those files) → M8; F5 (campaign-dated tense: "any more", "after the rebuild") → M9;
F6 (the `OllamaOptions` row hides the inherited keys) → M10; F7 (undeclared `messages` and
`abort` in two fences) → M11; F8 (no link to `router.md` / `server.md`) → M4; F9 (the
`tool_calls` condition over-specified as "an assistant turn") → M12; F10 (the imports clause
lists symbols the package does not import) → M13; F11 (the export list's retention) → closed;
F12 (the README fence's `// true` claim executed nowhere) → M14.

Terminal ruling: `VERDICT: FAIL 3, 4, 7, 10; outside the claims: F1–F12`. O4 stands as
committed; O6 runs on Opus in the ollama checkout after the agent guide rounds close and the
agent tarball is repacked, audited by the Astra analyst plus a checker, then V2 reruns with the
service project named.

### A3-fix-2 landing (2026-09-14)

Unit A3-fix-2 (Opus implementer, agent main checkout from `611e24e`) landed D1–D17
(`a3-fix-2-report.md`): the three contradicted clauses corrected, the transcription's
substitutions stated without "equivalent", the route asserted from the request the handler
receives, the engine-configuration fence executed, the relay pattern split into two titled halves
mirrored on their source examples, the record type parameter introduced, the constants' values
carried into the guide, and the prose findings closed; three new executed claims each reddened
under a planted mutation. Its scope decision — two `@remarks` sentences the fence split made false,
corrected in owned files — is ruled correct and closes A2-fix-r3's P4 early. Host gates after the
converge (`a3-fix-2-gates.log.txt`): `format:check`, `lint:check`, `check`, `test:src:core`
(23 files, 753 tests), `test:setup` (54 tests), `test:guides` (43 tests), and `build` exit 0.
Committed as `057871c`. The route is asserted, not routed: executing the dispatcher through
`@orkestrel/router` in the transcription waits on the user's devDependency decision.

## Audit round A3-fix-2-R1 (agent guide, commits `057871c` and `610a567`), reconciled 2026-09-14

Lanes: `a3-fix-2-audit-objective.md` (analyst, GPT 6 Astra — deciding; executed probes on the
worktree, the gate itself sandbox-blocked) and `a3-fix-2-audit-mechanical.md` (checker,
Sonnet). Orchestrator evidence: `a3-fix-2-gates.log.txt`, `a2-fix-r3-gates.log.txt` (43 guide
tests, 753 core at `610a567`).

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1 | BROKEN on one clause | analyst: the excerpt sentence promises the decoded excerpt never exceeds the bound in bytes; a multibyte character cut at the bound decodes to a replacement character, so the excerpt's encoded length can reach 2050 bytes from 2048 source bytes (executed). The other two probes (identity; `502` with one entry) held. Carried by A3-fix-4 item 1. |
| 2 | CONFIRMED | analyst on the values and forms with the parity instrument; the gate conjunct settled by the host runs at `610a567` |
| 3, 4, 5, 6, 10 | CONFIRMED | analyst with executed probes (route assertion, malformed-line difference, record type, serializer rule); checker on its rows |
| 7 | BROKEN | analyst: the bounding fence uses `messages` undeclared. Carried by A3-fix-4 item 2. |
| 8 | BROKEN | analyst: two callback tokens without a following noun (`authorize` in `constants.ts`, `serve` in the guide). Carried by A3-fix-4 item 3. |
| 9 | BROKEN | analyst: the server half exports `serve` and names `@orkestrel/server` but shows no start-up hookup. Carried by A3-fix-4 item 4. |
| 11 | BROKEN, then closed | analyst and checker: the wire-contract fence and other guide fences order a value import before a type import; A3-fix-3 reordered every such fence (fourteen) and the one titled source twin. |

Seam ruling: this is the guide's fourth precision round (A3, A3-fix, A3-fix-2, A3-fix-3, now
A3-fix-4), each finding new sentences by executed probe rather than the same defect relocating.
The seam closes with A3-fix-4: the guide's behavioural claims are the ones its transcriptions
execute or state as limits, and a later prose finding is a carry-forward for the next campaign,
not a further round. Terminal ruling: `VERDICT: FAIL 1, 2, 7, 8, 9, 11; outside the claims:
none` on the brief as written; on the subject, four precision items remain, carried by A3-fix-4 on
`builder`, audited by a checker, then V1.

### The agent side closed (2026-09-15)

A3-fix-3 (`f0784a2`: fourteen guide fences and one titled source twin reordered so type imports
come first) and A3-fix-4 (`d84b1a2`: the excerpt bound stated by source bytes with the
replacement-character caveat, the bounding fence's input declared, two callback tokens given
their nouns, the relay's server half started with `@orkestrel/server` on `createRelay`'s example
and the guide alike) landed on `builder` with the checker passing every claim
(`a3-fix-4-check-verdict.md`). V1 at `d84b1a2` reads GATES GREEN (`v1-verdict.md`). The agent
side's tip is `d84b1a2`; its gates and its parity green rest on the packed `@orkestrel/guide`
from `9863e77` installed `--no-save`, and the declared range re-pins to that package's next
release. Carry-forwards recorded for the next campaign: executing the relay's dispatcher route
through `@orkestrel/router` in the guide transcription (a devDependency decision for the user),
the fleet convention on a type name as a sentence subject (writing.md's owner), and the
`isSection` / `isConversationSnapshot` totality and the `AbortSignal.any` dependent accumulation
in `Agent.ts` named at A1-R1.

## Audit round O6-R1 (ollama guide, commits `655ebec`, `9231b3d`, `f994872`), reconciled 2026-09-15

Lanes: `o6-audit-objective.md` (analyst, GPT 6 Astra — deciding; executed runs including the
relay halves over a real loopback socket and a real preflight) and `o6-audit-mechanical.md`
(checker, Sonnet). Orchestrator evidence: `o6-gates.log.txt`, `o6-mirror-receipt.md` and
`o6-mirror-receipt-2.md`, `b2-receipt.md`.

| Claim | Ruling | Basis |
| ----- | ------ | ----- |
| 1 | CONFIRMED, the record corrected | analyst: the mirror's digest matches the agent guide at `d84b1a2` and the second receipt; the audit brief cited the first receipt's digest — the Orchestrator's slip, not the subject's |
| 2–7, 9 | CONFIRMED | analyst with executed runs (the reclassification case, the served relay halves, the role-independent `tool_calls`); checker on its rows |
| 8 | BROKEN on one fence | analyst: the titled generation fence calls an undeclared `charge` (executed: `ReferenceError`); the `@src/core` hits are prose describing the repository alias, which the fence rule does not reach — that conjunct of the claim was over-broad. Carried by O7 item 1. |
| 10 | UNRESOLVED, ruled | analyst: a page on another origin meets the relay route without CORS headers (a real preflight returned 204 with no permission headers); the recorded Chrome 148 run served the page from the relay's own origin. The guide states that arrangement and the middleware alternative. Carried by O7 item 2. |

Findings outside the claims: F1 (the stream fence's cancel arm appends a cumulative partial to
the accumulated deltas, duplicating content — executed) → O7 item 3 with a transcribed cancel
case; F2 (the introduction says the surface imports the error the base delivers) → O7 item 4.

Seam ruling: this is the ollama guide's third round (O4, O6, O7). The seam closes with O7 on the
same invariant as the agent guide's: the guide's behavioural claims are those its transcriptions
execute or state as limits, and a later prose finding is a carry-forward. Terminal ruling:
`VERDICT: FAIL 1, 8, 10; outside the claims: F1, F2` on the brief as written; on the subject, four
items remain, carried by O7 on `builder` after V2 finishes reading the checkout, audited by a
checker, then V2 reruns once more.

### The ollama side closed (2026-09-15)

O7 (`e689e5b`, `builder`): the titled generation fence declares its billing hook on
`createOllama`'s example and the guide alike; the relay pattern states the origin arrangement
(serve the page from the relay's origin, as the recorded Chrome 148 run did, or answer the
preflight with middleware); the driven-stream fence records a cancelled call's cumulative
partial once, with the case transcribed; the introduction says the errors reach a caller through
the base. Checker PASS on every claim (`o7-check-verdict.md`); host gates green across every
project (`o7-gates.log.txt`, guides 34). The ollama side's tip is `e689e5b`; V2's final reading
is `v2-verdict-3.md`. Its gates rest on the packed `@orkestrel/agent` from `d84b1a2` installed
`--no-save`, and the declared range re-pins to that package's next release; its mirrored agent
guide is the byte copy at `d84b1a2` until the agent commits are pushed and the scaffold's
`mirror` verb fetches the same bytes. The guide seam is closed on the same ruling as the agent
guide's.
