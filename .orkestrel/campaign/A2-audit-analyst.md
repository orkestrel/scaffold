OBJECTIVE lane — analyst; source review only. My engine wrote this unit. Runtime and mutation vectors remain `UNRESOLVED`; no tests were run.

1. **UNRESOLVED — Bound signal delivery.** `src/core/Agent.ts:542` passes `abort.signal`; `:674` and `:705` forward it through the respective dispatch branches. `:760`–`:766` include external signals, timeout, and budget. The added tests observe direct agent abort without authority and a deadline with authority, but do not observe external abort or budget exhaustion inside an entered handler.

   Run:
   `npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'delivers agent abort inside|delivers the run deadline inside'`

   Expected: the named cases execute and pass. To settle the missing combinations, add a host-side `tmp/probe/agentContext.test.ts` covering each source with authority present and absent, then run:
   `npm.cmd run test:probe -- tmp/probe/agentContext.test.ts`

   Assert handler entry before abort, signal identity against the provider’s signal, the abort reason, partial settlement, and no subsequent provider call. Removing each corresponding parent binding or branch’s context argument must fail its case.

2. **CONFIRMED — Denial handling is unchanged by the hunks.** Attack: inspect `git diff -- src/core/Agent.ts` for a path admitting denied calls. The explicit-denial and throwing-`evaluate` paths remain unchanged at `src/core/Agent.ts:684`–`:703`; only allowed calls reach execution at `:705`. Synthesized denial results remain intentional.

   Runtime vector **UNRESOLVED**:
   `npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'a denied call is NOT executed|a throwing authority.evaluate FAILS CLOSED|a mixed batch preserves call order'`

   Expected: denied handlers remain unentered, including when evaluation throws.

3. **UNRESOLVED — Settlement after cancellation.** The agent still awaits authorization/execution at `src/core/Agent.ts:542`. The added tests assert partial results and no subsequent provider call, but their reported success is writer-only evidence.

   Run:
   `npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'cancellation timing matrix'`

   Expected: observing handlers settle partial after cancellation; ignoring handlers keep the run pending until released; cancellation causes no further provider request. A mutation that settles before handler completion must fail the ignoring-handler case.

4. **UNRESOLVED — Call-envelope migration and wire validation.** Source inspection found no executable `ToolCall.caller` construction or read. The relay’s projection remains `{ id, name, arguments }` at `src/core/providers/RelayProvider.ts:96`, followed by `providerRequestContract.is` at `:126`. Its class comment is corrected. The separate stale comment at `src/core/shapers.ts:20` remains; it is documentation, not an executable caller access.

   Run:
   `npm.cmd run check`
   and
   `npm.cmd run test:src:core -- tests/src/core/providers/RelayProvider.test.ts tests/src/core/shapers.test.ts`

   Expected: call/context type assertions compile, extra execution context is omitted, and invalid wire values are refused. Removing projection or contract validation must fail the corresponding cases.

5. **CONFIRMED — Handler migration by inspection.** Attack: enumerate tool constructions and execution handlers throughout `src/**` and `tests/**`, then read their parameter uses. The handlers use `context.signal` or leave `_context` unused; none treats the context object as the former caller value. Direct calls in `tests/setup.test.ts:336` and `:342` supply a context. Ordinary variables named `caller` in provider-cancellation tests are abort controllers, not legacy tool-handler parameters.

6. **UNRESOLVED — Guide placement and executed values.** `guides/agent.md:29` names the existing Node test; the page placements explicitly identify planned U5 receipts. The relay sections distinguish page execution from Node inference. The cancellation fence’s transcription at `tests/guides.test.ts:287` asserts the advertised boolean values.

   Run:
   `npm.cmd run test:guides`
   and
   `npm.cmd run test:src:core -- tests/src/core/integration.test.ts -t 'runs the agent tool loop in Node and feeds the result into the next provider turn'`

   Expected: both commands pass. Strengthen the Node case to assert the next provider request contains the tool result: its scripted final answer currently does not establish that fact independently.

7. **CONFIRMED — Scope and mirror identity.** Attack: compare captured and live status/diff paths against Owned, and compare upstream guide hashes. Changed paths stay within Owned; no dependency, version, vendored file, or other guide mirror changed. `guides/tool.md` and `../tool/guides/tool.md` share SHA-256 `9B1DECAD64E102741191DD32AF9BAA5A2E435B6C8D13ECDF7ABC6411AFFBE332`. The supplied patch copies also match. `git diff --check` exited 0.

8. **UNRESOLVED — Rules and test adequacy.** No prohibited assertion, mock, or timer replacement was identified in the added implementation. Changed public TSDoc opens with “Composes” or “Carries.” Gate evidence remains pending:
   `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run test:policy`, `npm.cmd run test:config`, and `npm.cmd run test:setup`.
   Expected: each exits 0.

   The weakest added cases admit these **UNRESOLVED mutation vectors**:

   - **“names placement proof locations and carries the cancellation fence lines”**, `tests/guides.test.ts:328`: change the fence’s `agent.abort(...)` to `stream.abort(...)`, leaving its asserted substrings intact. Run `npm.cmd run test:guides`. Expected: green despite transcription drift.
   - **“delivers the run deadline inside an authorized tool handler”**, `tests/src/core/Agent.test.ts:1548`: replace the authorized branch’s supplied signal with `AbortSignal.timeout(25)`. Run `npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'delivers the run deadline inside'`. Expected: green despite losing the run-bound signal identity.
   - **“waits for a tool that ignores its signal before settling a cancelled run”**, `tests/src/core/Agent.test.ts:1586`: remove the no-authority context argument. Run `npm.cmd run test:src:core -- tests/src/core/Agent.test.ts -t 'waits for a tool that ignores'`. Expected: green. This case correctly guards cooperative settlement, but cannot establish signal delivery.

9. **UNRESOLVED — Release readiness.** I would not authorize agent `0.0.23` from this evidence. Resolve the runtime vectors and obtain the Orchestrator’s independent gate readings, followed by `npm.cmd run build` and `npm.cmd run test:distribution`. Expected: fresh output builds and the packed package installs and resolves. Consumer adoption remains dependent on the campaign’s tool release and downstream re-pins; the unchanged version and dependency range are required staging conditions, not unit defects.

## Findings fitting no claim

None substantiated.

## Attacked and held

No additional attacks beyond the confirmed verdicts. Cooperative waiting is intentional; a denied call producing a tool result does not mean its handler executed; a planned Chromium receipt is not a claim that Chromium passed.

VERDICT: FAIL 1,3,4,6,8,9; outside the claims: none