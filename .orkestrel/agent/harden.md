# Hardening campaign for `@orkestrel/agent` after the 2026-10-12 audit

Reconciled from the planner (subjective, Claude Opus) and the analyst-substitute (objective, Claude Opus; the Astra bench is dark until 2026-10-18) on one brief, `tmp/units/harden-brief.md` in the agent checkout. The lanes' plans are retained beside it as `harden-planner.md` and `harden-analyst.md`. The confirmed findings are `tmp/units/src-audit-confirmed.md` there (83 confirmed, 77 refuted).

## Exit criterion

Every confirmed finding carries a ruling in this file's table; every `repair` row names a test whose recorded command failed before the fix and passed after; the ledger golden probe (unit T0) returns byte-identical provider requests, judge requests, replies, and gauge before and after the campaign; the unedited `tests/src/core/ledgers` suites of `ee734c3` pass against the final source; and one verifier run of `format:check`, `lint:check`, `check`, `build`, and `test` passes.

## Rulings on the lanes' open questions

- `Ledger.ts:414` (`#generatePass` swallows the cause): keep the first-pass recovery and the served answer; when the answer pass also rejects, `respond` rethrows that rejection instead of resolving an empty partial. No `faults` member on `LedgerResult`; the agent emitter's `error` event already carries the first-pass cause.
- `ScopeManager.create` becomes `add` and the `create` event becomes `add`, with no batch overload (the sibling `ConversationManager.add` and `WorkspaceManager.add` carry none). Consumers update in the same unit: `contexts/factories.ts`, `tests/setup.ts` `SCOPE_EVENTS`, the guide, and `tests/guides.test.ts`.
- Shared report-only files: `src/core/types.ts`, `src/core/index.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `guides/agent.md`.
- Error options: one root `CodedErrorOptions { cause?: unknown; context?: Readonly<Record<string, unknown>> }` in `src/core/types.ts`, taken by `AgentError` (first consumers: `requireEntry` with `{ category, name }`, the `CONCURRENCY` throw with `{ agent }`) and `ConversationError` (`JudgmentManager` with `{ question }`). `LedgerError`, `ProviderError`, and `JudgeError` keep their shapes: no consumer asks for more.
- `createRelayProvider` returns `ProviderInterface`; a test that needs `encode`, `read`, `frame`, or `finish` constructs `RelayProvider` directly; guide fences follow.
- `ledgers/helpers.ts:751` and the two `Ledger.ts` stub renders use `renderJSON`, whose output equals `JSON.stringify` wherever that succeeds; an argument JSON cannot carry renders the bare tool name instead of throwing.
- `placeMember`: measure first with a probe over a dense chain of corrections that name no owner; keep the memo only when the probe shows superlinear growth, and memoize only a subtree whose recursion pruned nothing through `seen`, so placement stays identical.
- `keep` is a nonnegative safe integer (`requireKeep` over the root `isNonNegativeSafeInteger`, code `KEEP`), checked at construction and per fold; `Infinity`, fractions, `NaN`, and negatives are refused.
- `compact()` serializes through an in-flight promise and commits only when every folded message is still the identical live entry and, for a merge, the folded sections are still the head; a losing caller resolves `undefined`. `CompactOptions.signal` and a summarizer `signal` argument are added; the fold races the summarizer against the signal, commits nothing after an abort, and rejects with the reason; the agent's `#trim` passes its run signal and returns `false` without a `fault` on abort.
- Retained findings: `Channel.ts:35` (advisory cost, unmeasured) and `Gauge.ts:60` (the members implement documented interface members). `ledgers/errors.ts:19` gets its constructor TSDoc.
- `renderToolValue` in `agents/helpers.ts`: a string passes through; a value `renderJSON` renders keeps its JSON bytes; `undefined` gives `''`; a value JSON cannot carry falls back to `String(value)` inside `attempt`.

## Units

| Unit | Owns | Closes | Depends on | Size |
| --- | --- | --- | --- | --- |
| T0 test infrastructure and golden probe | `tests/setup.test.ts`, `tmp/probes/ledger-golden.test.ts`; patch `tests/setup.ts` | enables Agent.test:4020, Ledger.test:433 and :243, integration:37 | none; runs first and records the baseline before any source edit | small |
| U1 root leaves | `src/core/helpers.ts`, `src/core/validators.ts`, their mirrored tests; patch `src/core/types.ts`, guide | helpers.ts:113; provides `renderJSON`, `hasCalls`, `isNonNegativeSafeInteger`, `CodedErrorOptions` | none | medium |
| U3 channel | `src/core/agents/Channel.ts`, `tests/src/core/agents/Channel.test.ts` | Channel.ts:77, :14; Channel.test:95 | none | medium |
| U5 contexts | `src/core/contexts/{helpers,constants,factories,types}.ts`, `contexts/scopes/ScopeManager.ts`, mirrored tests; patch `tests/setup.ts` `SCOPE_EVENTS`, guide, guides test | contexts 7 source and 7 test findings | none | medium |
| L2 ledger docs | `src/core/ledgers/Gauge.ts`, `src/core/ledgers/errors.ts`, `tests/src/core/ledgers/Gauge.test.ts` | errors.ts:19, Gauge.test:156; Gauge.ts:16 is `ledgers/types.ts:587` (U6) | none | small |
| U4 conversations | `src/core/conversations/**` and mirrored tests; patch guide, guides test | Conversation.ts:200, :186; ConversationManager.ts:125, :95; errors.ts:21; DatabaseConversationStore.ts:81, :74; validators.ts:77; six test findings | U1 | medium |
| U6 ledgers | `src/core/ledgers/{Ledger,helpers,types}.ts`, mirrored tests for Ledger, helpers, Classifier; patch `tests/setup.ts` builders, guide | Ledger.ts:298, :414, :135, :442, :1060; helpers.ts:387, :751, :886; types.ts:587; seven test findings | U1, T0 | medium |
| U7 providers | `src/core/providers/**`, mirrored tests, `tests/src/core/integration.test.ts`; patch `tests/setup.ts` `createRelayHop`, guide, guides test | AgentProvider.ts:275; factories.ts:141; RelayProvider.ts:88; types.ts:154; AgentJudge.test:444; RelayStream.test:49; integration:401, :37 | T0 | medium |
| U2 agents | `src/core/agents/{Agent,errors,helpers,factories,types,AgentRegistry}.ts`, mirrored tests except Channel; patch guide, guides test | Agent.ts:183, :567, :137, :196, :648, :753; agents/errors.ts:81; factories.ts:201; helpers.ts:245, :150; types.ts:486; thirteen test findings | U1, T0, U4 | medium |
| D guide parity | `tests/guides.test.ts` after every guide patch lands | parity | all writers | small |
| F falsify | one adversarial review round over the integrated result's numbered claims | review | D | review |
| V verifier | the five gates, the golden probe comparison, the `ee734c3` ledger suites | gates | F | gates |

## Status on 2026-10-13

| Unit | State | Evidence |
| --- | --- | --- |
| T0 | closed | `9e84294`; `tests/setup.test.ts` 130 passed; golden probe recorded before any source edit |
| U1, U3, U5, L2 | closed | `1beea72`; their file-scoped suites green; the `types.ts` and `tests/setup.ts` patches applied by the Orchestrator |
| U4, U6, U7 | closed | `d92878b` and `379309f`; conversations 254, ledgers, providers and integration 253 passed; U4's report recovered from its transcript after a session cut |
| U2 | closed | `da21594` after a session-limit restart; agents 363 passed; `Ledger.test.ts` 73 unchanged |
| D | closed | `da21594`, `c60bce1`, `9e76ccd`, `7f259c3`: guides parity 137 passed after the `createConversation` TSDoc example took the summarizer signal and the calibration proof followed the answer-pass ruling; four writer files formatted; three lint findings cleared |
| V | closed | haiku verifier, fifth run at `7f259c3`: `format:check`, `lint:check`, `check`, `build`, `test` exit 0 (1390 core, 119 policy, 227 config, 132 setup, 137 guides); golden probe 1 passed; the Orchestrator ran the baseline control with both import rewrites: six unedited `ee734c3` ledger suites, 208 passed. Discovery marks `src:core` as reached by no `test:src:core` chain; `test:src` runs the project and the marker predates the campaign |
| F | closed | two opus lanes died at the Claude session limit; both lanes ran on GPT-6 Astra through the Codex transport on `tmp/units/harden-F-claims.md` (25 claims) and returned `VERDICT: FAIL`; the reconciled rulings are in `harden-F-audit-verdict.md` |
| G | closed | `901c786`: GPT-6 Astra repaired `isJudgment` membership, the classifier's fault conversion and argument rendering, and the uncanonicalizable lookup identity, and aligned the `drain`, `CompactOptions`, and `save` contracts; root applied the guide and guides-test patches, re-ran one mutation, and read check, 506 scoped tests, both golden probes (the complete capture equal to its `9e84294` baseline), and guide parity 137 green |
| V2 | closed | GPT-6 Luna verifier on `901c786` (session `01a1362a-5a13-7173-b0aa-afdb113d1439`, journal `tmp/codex/harden-V2.jsonl`): `format:check`, `lint:check`, `check`, `build`, and `test` exit 0; the golden probe 1 passed; the complete-capture golden probe 3 passed; the six `ee734c3` baseline suites 208 passed; `git status --porcelain` and `git diff --stat` empty; discovery printed the known `src:core` marker. The exec stalled after its closing message without writing the report file, so these readings come from the launcher's journal |

## Order

1. T0 alone: builders and the golden baseline.
2. In parallel: U1, U3, U5, L2. The orchestrator applies the `types.ts` and `tests/setup.ts` patches.
3. In parallel after U1 and T0: U4, U6, U7.
4. U2 after U4.
5. D, then F, then V.

Writers run file-scoped Vitest only while the c1 series is live, to keep the arms' timing comparable; the project and tree gates run once at V.

## Risks and controls

- A changed byte in a briefing, a stub, a tool result, or a judge request changes the records design under measurement: the T0 golden probe and the unedited `ee734c3` ledger suites must stay green through U1, U4, U6, and U2.
- `renderJSON` and `hasCalls` are refactors on the gauge path: the probe compares the gauge too.
- Breaking changes for 0.0.30 consumers (`scopes.add`, the narrower `createRelayProvider`, the stricter run guard, `keep`, `isJudgment`, and, found by the falsify round, the `handleAgentRunnerJob(registry, partial, spawned, controller)` signature whose third argument is the runner's spawned-id set): no shim; the typecheck, guide parity, and the release notes carry them; the version bumps.
- The falsify round (two GPT-6 Astra lanes, both `VERDICT: FAIL`) broke claims 2, 5, 7, 11, 14, 19, 21, 22, 23, 24, and 25 and one outside finding. Root reproduced each by reading the cited source and ruled: claims 2, 11, and 14 were overstated claims and need no change; 19 and 21 are documented limitations and an inventory entry; 23 and 24 (documentation half) and 25 (the `save` promise) are TSDoc and guide alignments; 5 (`isJudgment` exactness), 24 (`Classifier.#collectNear` rendering), 25 (uncanonicalizable lookup identity), and the outside finding (`Classifier` fault conversion) are code repairs; 7 and 22 are an instrument gap root closes with a complete golden capture re-baselined against `ee734c3`. The fix unit `harden-G` runs on GPT-6 Astra from `tmp/codex/harden-G-brief.md`; its re-audit covers the repaired claims only.
- A rejection from `compact()` under abort must never surface unhandled: the losing promise carries a terminal catch, and U4 proves the late reject.
