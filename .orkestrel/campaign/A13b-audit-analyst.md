OBJECTIVE and cross-engine lane — analyst; U13c writer: Opus 5.

1. **BROKEN** — `tests/service/page.test.ts:147,152,177,194,197,216`: the producer’s fault guard throws into `retryUntil`, which catches producer exceptions (`node_modules/@orkestrel/test/dist/src/core/index.js:259`). Acquisition and teardown failures can therefore be retried. A serialized `PageOutcome.failure` is also treated as a model-selection miss: the executed, unchanged predicate and accounting assertions passed an HTTP 500 outcome followed by success. Read exceptions are retained correctly. Fix: retain lifecycle failures and throw infrastructure failures from the predicate, whose exceptions escape. **UNRESOLVED** live fault-injection replay: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/page.test.ts -t "executes a page tool"`.

2. **BROKEN** — `tests/service/page.test.ts:262,277,288`: next-turn tool messages are checked on each wire, but receipt absence is asserted only on the relay’s dispatch request. Executing the actual assertion block against inert observations passed with the receipt already present in daemon request 0; changing its role in request 1 failed. The code also does not assert `dispatched.turn === 0`. Add the missing daemon absence and turn-0 pins. The supplied successful receipt remains consistent with the claim.

3. **CONFIRMED** — `tests/setupServer.ts:999,1004,1014,1047` registers cleanup as acquired and releases through `createTeardown`. `tests/setupServer.test.ts:746,783` exercises release failure and partial acquisition with real fixtures; the Orchestrator’s setup run passed (`tmp/codex/U13c-ollama-gates-test-full.log.txt:22`). Independently constructing the real browser without connecting or launching, then destroying it twice, resolved with `connection === undefined`.

4. **CONFIRMED** — `tests/setupServer.ts:1162` and `tests/setupServer.test.ts:596`: the executed extracted reader accepted guarded JSON and rejected non-string values, malformed JSON, and wrong shapes. Installed `@orkestrel/test/browser` still owns `readPage(): string`; no local second declaration remains.

5. **BROKEN** — `tests/setupServer.ts:1015,1024,1026` gives connection, navigation, and readiness separate allowances; `tests/setupServer.test.ts:640` counts only one `launch`. An admissible schedule of 29,000 ms connecting, 29,000 ms navigating, and 44,000 ms running totals 102,000 ms, exceeding the 90,000 ms case deadline while each operation stays within its bound. The executed comparison proof nevertheless passed; its oversized-evaluate control failed. Bound the complete acquisition and observation lifecycle, then size its containers accordingly. `RETRY_BUDGET === testTimeout` remains pinned at `tests/setupService.test.ts:419`. **UNRESOLVED** live delayed-schedule replay: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/page.test.ts -t "drives the daemon directly"`.

6. **BROKEN** — `tests/setupServer.ts:1191` is a source analyzer: it identifies JavaScript declarations through comment stripping and indentation. That duplicates parsing forbidden by scaffold’s `AGENTS.md`, Project model. The executed control moved the `receipts()` method text into a template-literal property: the scanner returned the unchanged operation set, while TypeScript confirmed `receipts` was absent. Ordinary removal was detected. Replace the regex analyzer with the installed TypeScript parser or an assertion over the actual runtime operation table.

7. **CONFIRMED** — `tests/setupServer.ts:763,764,1105` uses omitted/undefined fields; `tests/setupServer.test.ts:868,869,870` refuses null code/status values and accepts absence. The Orchestrator’s setup run passed.

8. **CONFIRMED** — `tests/setupServer.ts:772` deliberately emits a console error and an uncaught error; `tests/service/page.test.ts:329` requires each recorder to report it. The authoritative control passed in 640 ms (`tmp/codex/U13c-ollama-service-verbose.log.txt:30`); an empty recorder cannot satisfy that conjunction.

9. **CONFIRMED** — `tests/service/page.test.ts:66,407,413,428` supplies the prompt, checks the answer against `/tokyo/i`, and asserts the outgoing prompt. The authoritative direct case passed in 935 ms (`tmp/codex/U13c-ollama-service-verbose.log.txt:32`).

10. **BROKEN** — The local justification for `scanPageOperations` fails claim 6. The other rulings hold: `createTeardown`, `waitForCondition`, `requireValue`, and `retryUntil` reuse installed exports; `readOutcome` adds the JSON-evaluation boundary; `PAGE_BOUNDS` and `PAGE_OPTIONS` are local policy values. `rootToPath` correctly names an anchor-to-host-path projection (`tests/setupServer.ts:685`); installed `resolvePath(directory, target)` and `resolveRoot(meta)` have different contracts. The installed declaration search and `tmp/codex/collide3-ollama-after-u13c.txt:7` found no name collision.

11. **BROKEN** — `guides/ollama.md:368` says the browser log, Resource Timing drain, and fixture record “each report a request and a fault.” The fault assertions read `session.errors` and `session.messages`, not Resource Timing or fixture requests (`tests/service/page.test.ts:333`). Separate the request recorders from the error recorders in that sentence. The `ProviderError`/`HTTP`/401 assertions are present at `tests/service/page.test.ts:373`; mid-stream cancellation is correctly attributed to `relay.test.ts` at `guides/ollama.md:366`.

12. **CONFIRMED** — Direct `git status --porcelain` names only the authorized tracked files and `tests/service/page.test.ts`; HEAD is `295fecb`. UTF-8 comparisons matched the staged tracked patch and page snapshot to the checkout. `git diff --check` passed; no manifest, lockfile, source, distribution, scaffold-owned file, or agent-guide change appears.

13. **CONFIRMED** — `tmp/codex/U13c-ollama-service-verbose.log.txt:28,33,61` records passing page, tools, and relay cases with per-case timings; `:74` reports `66 passed`, and `:76` reports 62.58 s. The supplied gate log records exit 0 for formatting, lint, typechecking, build, and tests. These are Orchestrator executions, not executions by this lane.

14. **BROKEN** — Hold the patch release until the retry fault handling, missing receipt pins, complete lifecycle bounds, operation-table proof, and inaccurate guide sentence are corrected and independently verified. Refreshing `guides/agent.md` alone does not close those findings.

outside: none.

VERDICT: FAIL 1, 2, 5, 6, 10, 11, 14
<!-- Orchestrator: analyst route, GPT-6 Astra, read-only codex exec rooted at ollama; journal tmp/codex/A13b-audit.jsonl, thread 01a0a4b7-60a8-7dd3-b1d0-bcdac9edbb36, 2026-09-15T10:57:56Z to 11:07:23Z (567 s), exit 0. -->
