<!-- A13-O — analyst (GPT-6 Astra, codex exec read-only -C ollama), objective and cross-engine lane of audit A13 (ollama page proof, U13b); journal tmp/codex/A13-audit.jsonl. Retained verbatim from --output-last-message, 2026-09-15. Immutable. -->

OBJECTIVE and cross-engine lane — analyst, GPT-6 Astra; U13b writer: Opus 5.

## Numbered verdicts

1. **CONFIRMED** — The installed static import closure resolves through the manifest-derived map, including this workspace’s `/dist` entry. Removing the agent mapping in the read-only control reported unresolved imports. The closure case asserts readiness, expected module requests, empty error channels, and no inference before an agent runs. The [Orchestrator’s service capture](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/U13b-ollama-service-full.log.txt) reports `66 passed`, duration `62.97s`. It contains aggregate output, not the per-case timings advertised by the brief.

2. **BROKEN** — Request accounting excludes attempts whose page reads throw. In [page.test.ts:145](C:/Users/mikes/WebstormProjects/ollama/tests/service/page.test.ts:145), execution and subsequent reads precede `attempts.push`. The installed `retryUntil` catches producer exceptions and can accept a later attempt. The executed primitive control reported `started: 2`, retained only the successful result, and returned success; the all-error control exhausted at `3`. Thus a page-read rejection after traffic can leave that traffic unasserted.

   **Smallest fix:** retain observations through failure and let infrastructure or accounting failures escape the retry boundary. Retry only an observed model-selection miss.

   The feedback assertions also search arbitrary matching requests and message content; they do not pin the receipt to the next request’s tool-result message. That mutation remains **UNRESOLVED** under claim 11.

3. **CONFIRMED** — The control case checks `/control` through independent CDP, Resource Timing, and fixture observations. Empty recorders fail these assertions. The supplied service run passes, and the writer’s receipt identifies the matching control response.

4. **CONFIRMED** — The wrong-bearer case requires `HTTP`, status `401`, no tool execution, empty daemon requests, and recorded relay ingress. The shared route authorizes before invoking the provider. The writer’s valid-bearer control failed the refusal assertion; the supplied service run passes.

5. **CONFIRMED** — The direct case calls the origin gate before page generation and filters recorded traffic by `POST`, daemon origin, and `/api/chat`. Its assertion permits the separately recorded preflight. The supplied direct receipt reports a settled response and daemon traffic. The missing prompt weakens the input exercised; see claim 11.

6. **BROKEN** — Cleanup is not registered as resources are acquired. In [setupServer.ts:946](C:/Users/mikes/WebstormProjects/ollama/tests/setupServer.ts:946), the fixture starts before port reservation and before the `try` block. A reservation rejection bypasses fixture shutdown. In [setupServer.ts:986](C:/Users/mikes/WebstormProjects/ollama/tests/setupServer.ts:986), a rejecting `browser.destroy()` prevents `fixture.stop()`; the catch path has the same ordering.

   **Smallest fix:** use installed `createTeardown`, register fixture cleanup immediately, and register browser cleanup when constructed. Its installed contract runs every handler despite earlier failures.

   Hard-throw readiness gates, call-time browser discovery, temporary profile ownership, ephemeral port selection, and `discover: false` are present. Host reproduction of partial-acquisition and teardown failures remains **UNRESOLVED**: author the corresponding real-resource cases, then run `npm run test:probe -- tmp/probe/a13-cleanup.test.ts`.

7. **CONFIRMED** — The fixture and relay server reuse `buildRelayRoute` and `readRequest`; the relay implementation is not copied. `buildImportMap` reads installed manifests and the workspace manifest. `PAGE_TOOL` crosses the string boundary through serialization. Setup assertions cover map membership and omission, route composition, served assets, recording, gates, and reported shapes.

8. **BROKEN** — [setupServer.ts:1100](C:/Users/mikes/WebstormProjects/ollama/tests/setupServer.ts:1100) still exports `readPage<T>`, while installed `@orkestrel/test/browser` exports `readPage(): string`. The supplied collision probe and direct declaration inspection agree. The fleet rule explicitly rejects matching names even when jobs differ.

   **Smallest fix:** rename the local JSON-evaluation helper and update its consumers. Its distinct job does not justify replacing it with the installed DOM-text reader.

9. **BROKEN** — [Contract 13](C:/Users/mikes/WebstormProjects/ollama/guides/ollama.md:124) says each attempt’s accounting is asserted. Claim 2 supplies the counterexample. Repair the accounting before retaining that sentence. The browser and relay instructions, case names, and bounded model-selection wording otherwise match the implemented arrangement.

10. **CONFIRMED** — The supplied tracked patch matches `git diff HEAD`; its untracked page-test text matches the working file. HEAD is `295fecb`. Status names only owned changes, `tmp/probe` is absent, and `git diff --check` passes. Source, manifest, lockfile, and mirrors remain unchanged by this diff.

11. **UNRESOLVED** — The supplied gates pass. A compiler-AST inspection of the changed TypeScript files found no `any`, type assertions, or non-null assertions; its negative control detected each prohibited form. The required weakest-test mutations remain unexecuted:

   - **Relay receipt:** make an earlier attempt issue traffic and then reject during observation; also move feedback to a later request or a non-tool message. Run each mutation separately with `npm run test:service -- tests/service/page.test.ts --reporter=verbose -t "executes a page tool through an agent"`.
   - **Direct daemon:** the caller omits `prompt`, although the page driver reads `options.prompt`; the writer’s response describes an incomplete message. Supply a meaningful prompt, assert its outgoing content, then remove it as the control. Run `npm run test:service -- tests/service/page.test.ts --reporter=verbose -t "drives the daemon directly"`.
   - **Page document:** replace the receipt reader’s body with an empty result while preserving operation names. Its setup proof checks substrings. Run `npm run test:setup -- tests/setupServer.test.ts --reporter=verbose -t "carries the shared tool definition"` and the relay-receipt command above to establish which proof detects the mutation.

12. **UNRESOLVED** — I would not ship this state. The accounting, cleanup, and export-name findings remain open. X8 also requires U5’s page-only and scripted page-to-Node receipts. The named campaign and launch directories contain U5/U5b briefs but no corresponding receipt report. Obtain those receipts and the authoritative capture from `npm --prefix C:/Users/mikes/WebstormProjects/mcp run test:distribution`. This lane cannot execute that installation-and-browser vector.

## Findings fitting no claim

None.

## Attacked and held

- Same-origin relay traffic needs no daemon preflight; counting its inference requests is appropriate. The direct case correctly filters its cross-origin traffic.
- No provider on the fixture correctly means no inference route. Supplying a provider mounts the shared authenticated route.
- Model-selection retries remain legitimate when unsuccessful attempts are fully observed. The defect concerns discarded infrastructure failures.
- Import-map entries unused by the page do not load automatically; their presence does not undermine the closure proof.

VERDICT: FAIL 2, 6, 8, 9, 11, 12; outside the claims: none