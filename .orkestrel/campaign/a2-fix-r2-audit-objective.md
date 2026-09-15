Lane: objective (analyst, GPT 6 Astra)

## Per-claim verdicts

1. **BROKEN — R1’s serializer wording is too broad.** The proxy cases hold: executed source checks sent `{x:1}` without reading `toJSON`. However, `{x:1, toJSON(){ return {x:2} }}` on `arguments`, `parameters`, or `schema` throws `ProviderError` with a `ContractError` cause. The serializer is never invoked, but its function-valued property is refused. This contradicts “refuses no serializer” and the unqualified “ignored” wording in [RelayProvider.ts:17](C:/Users/mikes/WebstormProjects/agent-audit/src/core/providers/RelayProvider.ts:17) and [agent.md:438](C:/Users/mikes/WebstormProjects/agent-audit/guides/agent.md:438). **Fix:** distinguish a synthetic serializer from an own function-valued property; retain the JSON refusal.

2. **CONFIRMED — R2.** [RelayProvider.ts:120](C:/Users/mikes/WebstormProjects/agent-audit/src/core/providers/RelayProvider.ts:120) passes the caught value directly as `cause`; [errors.ts:241](C:/Users/mikes/WebstormProjects/agent-audit/src/core/errors.ts:241) forwards it to `Error`. An executed projection-getter attack preserved the thrown object’s identity. The Infinity case carries `ContractError`; the retained [mutation reading:11](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-probes.md:11) shows that removing the cause fails its test.

3. **CONFIRMED — R3.** The constructor retains the pre-aborted guard at [RelayStream.ts:38](C:/Users/mikes/WebstormProjects/agent-audit/src/core/RelayStream.ts:38), without the post-registration duplicate. The executed pre-aborted case received an aborted upstream signal and returned an abort frame.

4. **BROKEN as written — R4’s single-word condition.** The `#abort` field is gone; `#listener`, its binding, and its release agree at [RelayStream.ts:31](C:/Users/mikes/WebstormProjects/agent-audit/src/core/RelayStream.ts:31). However, `#abortProvider` remains a compound name at [RelayStream.ts:115](C:/Users/mikes/WebstormProjects/agent-audit/src/core/RelayStream.ts:115). The governing [names.md:32](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:32) expressly permits compound private-method names. **Fix:** narrow the claim to reflect that exception; the retained private method does not violate the naming law.

5. **CONFIRMED — R5.** The full composition resides on [createRelay’s example](C:/Users/mikes/WebstormProjects/agent-audit/src/core/factories.ts:80). An executed comparison found it equal to the guide fence; changing the comparison’s identifier made it differ. The factory and class examples construct their provider, call `generate`, and link to `createRelay`. Return types are annotated. The retained guide gate is green at [gates.log.txt:67](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-gates.log.txt:67).

6. **CONFIRMED — R6.** [factories.test.ts:169](C:/Users/mikes/WebstormProjects/agent-audit/tests/src/core/factories.test.ts:169) asserts the encoded byte length equals `DEFAULT_RELAY_LIMIT`. Executed boundary checks returned `413` at the limit and `200` below it.

7. **CONFIRMED — R7.** [AgentProvider.test.ts:309](C:/Users/mikes/WebstormProjects/agent-audit/tests/src/core/AgentProvider.test.ts:309) sets `timeout: 200`. The rejection and aborted-false assertions remain. An executed check returned `ProviderError`, code `HTTP`, status `503`, with the transport signal unaborted and the body cancelled.

8. **CONFIRMED — R8 and R9.** The error arm occupies one line at [shapers.ts:101](C:/Users/mikes/WebstormProjects/agent-audit/src/core/shapers.ts:101). [RelayStream.ts:12](C:/Users/mikes/WebstormProjects/agent-audit/src/core/RelayStream.ts:12) states the open-body behavior, runtime cancellation on disconnect, and the consumer’s cancellation obligation.

9. **BROKEN — the baseline-red requirement does not hold.** These listed tests pass against the relevant baseline behavior:

   - `sends the snapshot of hostile call arguments and never consults their serializer`
   - `refuses valid JSON at exactly the default limit`
   - `rejects an exact-bound stalled error body before the deadline`

   The report discloses this at [report.md:64](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-report.md:64), [report.md:70](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-report.md:70), and [report.md:83](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-report.md:83). Read-only runtime comparisons corroborated the hostile-arguments pass and the original 80 ms deadline pass. **Fix:** distinguish controls and budget changes from tests that demonstrate a repair. Do not manufacture a baseline failure.

10. **BROKEN — law and scope.** The concrete violations are:

    - The shared `RELAY_RESULT_FRAME` fixture is declared inside [RelayProvider.test.ts:24](C:/Users/mikes/WebstormProjects/agent-audit/tests/src/core/providers/RelayProvider.test.ts:24), contrary to [tests.md:183](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:183). Move it to the setup module.
    - The added type import follows value imports in [factories.ts:86](C:/Users/mikes/WebstormProjects/agent-audit/src/core/factories.ts:86) and [agent.md:1094](C:/Users/mikes/WebstormProjects/agent-audit/guides/agent.md:1094). Move it before value imports.
    - “Composes the two” introduces a prohibited prose count at [factories.ts:145](C:/Users/mikes/WebstormProjects/agent-audit/src/core/factories.ts:145) and [RelayProvider.ts:25](C:/Users/mikes/WebstormProjects/agent-audit/src/core/providers/RelayProvider.ts:25). Name the browser and server ends.
    - The guide’s behavioral prose changes exceed the R5-only grant at [brief.md:108](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-brief.md:108). Record an explicit scope amendment for the necessary corrections.

    The changed executable code contains none of the listed prohibited syntax.

11. **CONFIRMED from retained host evidence — no regression gates.** The host log records core, setup, and guides green at [gates.log.txt:38](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-gates.log.txt:38), [gates.log.txt:52](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-gates.log.txt:52), and [gates.log.txt:66](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/a2-fix-r2-gates.log.txt:66). Discovery configuration covers the intended files, and no test outside ownership changed. HEAD remains `611e24e`; status is clean.

    Local Vitest attempts stopped before collection because Vite’s temporary-config write received `EPERM`. The proof tool returned “MCP tool call requires approval, but approval policy is never”; no receipt was obtained. The executed Node checks read source without writing files and establish runtime behavior only.

## Findings outside the claims

None.

## Attacked and held

The adjacent behaviors remain valid:

- Directly serializing the hostile proxy throws; serializing the owned snapshot succeeds. The snapshot prevents the serializer from reaching the wire.
- A snapshot rejected by the guard can produce a refusal without a cause: that branch caught no thrown value.
- Refusing an own function-valued property preserves the JSON boundary. Correcting claim 1 requires precise prose, not accepting non-JSON properties.

VERDICT: FAIL 1, 4, 9, 10; outside the claims: none