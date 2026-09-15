# Unit O3-fix — the reviewer's findings on the relay round-trip tests in `@orkestrel/ollama`

## Role and engine

`builder`, native Claude (Sonnet), with Read, Grep, Glob, Edit, Write, and Bash. A fully
specified unit. Perform the assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\ollama-audit` — a worktree of the ollama repository on the
branch `o3-fix`, checked out from `dcb64fe` — for the life of this unit. Never touch
`C:\Users\mikes\WebstormProjects\ollama` (another unit writes there).

## Objective

Close claim 9 and findings F1–F5 and F7 of `o3-audit-subjective.md` in the test files, exactly
as specified, with the core, setup, and conformance suites green in the worktree.

## Context

- Record: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\o3-audit-subjective.md`
  (read claim 9 and the findings; each names its lines at `24662ef`, and `dcb64fe` moved only
  `tests/setup.test.ts`, `tests/setupServer.ts` (the `text` member), and
  `tests/src/core/OllamaProvider.test.ts`, so re-locate each site by name).
- Law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`;
  `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\tests.md` (§ Shared test
  infrastructure: one general form), `names.md` (§ General vocabulary: one term per concept; a
  mirrored platform term names its source in TSDoc), `typescript.md`, `writing.md`.
- Host: Windows 11, Git Bash. The worktree's `node_modules` is a junction to the main checkout's;
  the scripts run from the worktree root. Never `npm install`, `git add`, `commit`, `stash`,
  `checkout`, `restore`, `reset`, `clean`, or `git mv`.
- The service project needs the daemon; it is not yours to run — the Orchestrator runs it after
  you return. Design the F1 change so the hermetic cases prove its shape.

## Items

1. **Claim 9 — the header comment.** Rewrite the file comment at the top of
   `tests/setupServer.test.ts` so it names what the file proves as it now stands (the loopback
   recording proxy, the relay server, the capture wait, the provider-stream driver, the
   transport fixtures, the shared wire tables) and scopes the socket sentence: the proxy and
   relay-server cases run against real sockets on `127.0.0.1` ephemeral ports, the transport
   fixtures drive in-memory responses, and no Ollama daemon takes part in any of them.
2. **F1 — the live suite observes the daemon hop.** In `tests/service/relay.test.ts`, in each of
   the three cases, wrap the server-side provider's transport in the recording transport fixture
   (after item 3 it is `createRecordingTransport`) and assert, from its recorded requests, that
   the daemon hop was taken: `requests[0]?.path` is `/api/chat` and the recorded
   `body.messages` is non-empty. Keep every existing assertion.
3. **F3 — one recording transport.** `tests/setupServer.ts` holds two near-duplicate helpers:
   the older `createRecordingTransport` (records the URL) and the newer `createCapturedTransport`
   (records method, path, headers, body, signal, and the response bytes). Keep one general form
   under the name the file already uses for the concept: `createRecordingTransport` takes the
   newer helper's shape and its interface takes the name `RecordingTransportInterface`; delete
   `createCapturedTransport` and `CapturedTransportInterface`; update every call site
   (`tests/setupServer.test.ts`, `tests/src/core/integration.test.ts`,
   `tests/service/OllamaProvider.test.ts`, `tests/src/core/factories.test.ts`) to the surviving
   name and, where a call site read the older helper's URL member, to the equivalent recorded
   field. Run the suites after this item before moving on.
4. **F2 — the relay server's type.** Rename the shared return shape of `createRecordingProxy` and
   `createRelayServer` from `RecordingProxyInterface` to `RecordingServerInterface`, and rename
   `waitForRequest`'s parameter from `proxy` to `server`, with the doc sentences following. The
   name is used only inside `tests/setupServer.ts` and `tests/setupServer.test.ts` (grep to
   confirm and update any other site you find).
5. **F4 — `cancelled` names its source.** On the `cancelled` member of the open transport
   fixture's interface in `tests/setupServer.ts`, add to the TSDoc that the member mirrors the
   `ReadableStream` `cancel` callback, which is the platform's term.
6. **F5 — the negative credential assertion reads the whole header text.** In
   `tests/src/core/integration.test.ts`, at the two negative credential assertions the finding
   cites, assert on `JSON.stringify(request.headers)` not containing the other hop's credential.
7. **F7 — the `caller` drop is proven in the composition.** In the tool round-trip case in
   `tests/src/core/integration.test.ts`, give the replayed `ToolCall` a `caller` member (an
   object of the shape `ToolCall.caller` declares in the installed `@orkestrel/agent` — read
   `node_modules/@orkestrel/agent/dist/src/core/index.d.ts` for it) and assert that the relay
   server's recorded request body carries the call without a `caller` key while the browser side
   still completes. Failing first: run the case with the assertion before the field exists if
   the assertion can be red; record the reading either way.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/src/core/integration.test.ts`,
`tests/service/relay.test.ts`, `tests/service/OllamaProvider.test.ts` (item 3 call sites only),
`tests/src/core/factories.test.ts` (item 3 call sites only).

**Shared (report-only).** None.

**Off-limits.** Everything else, including `src/**`, `guides/**`, `tests/setupService.ts`,
`tests/setup.ts`, configuration, the vendored set, `package.json`, `package-lock.json`,
`node_modules/**`, and every file in the `ollama` main checkout.

**Tools and limits.** `npm run lint:check`, `npm run check`, `npm run test:src:core`,
`npm run test:setup`, `npm run test:conformance` (read-only, from the worktree root); never
`lint`, `format`, `build`, `test`, or `test:service`; never install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\o3-fix-report.md` and
return the same text: `Touched files` with `git diff --stat`; per item, the exact change and the
proving command with counts; `Deviation`; `Status` (`git status --porcelain` verbatim, run in the
worktree).

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
an item needs a file outside Owned, when the installed `ToolCall.caller` shape cannot be built in
a test, or when a cited site no longer matches the finding's description. Decide, record, and
carry on from wording, test names, and the recorded-field name a call site reads.

## Acceptance criteria

1. `npm run lint:check` and `npm run check` exit 0 in the worktree.
2. `npm run test:src:core`, `npm run test:setup`, and `npm run test:conformance` exit 0 in the
   worktree with every file collected.
3. `grep -rn "createCapturedTransport\|CapturedTransportInterface\|RecordingProxyInterface" tests`
   returns nothing.
4. The three live cases each assert the daemon hop from recorded requests.
5. The tool round-trip case gives the replayed call a `caller` and asserts the relay body omits it.
6. No `any`, assertion, non-null assertion, suppression, access modifier, parameter property, or
   nested function declaration in the diff.

## Review evidence

A code change: `git diff --stat` and `git status --porcelain` in the report; the Orchestrator
takes the diff, runs the live service project with the daemon warm, and merges the branch into
main after the guide unit lands there.
