# Unit O3-audit — falsification of unit O3 (the relay round trips in `@orkestrel/ollama`)

## Role and engine

`reviewer` on Claude Opus 5, native, read-only, clean context: the deciding lane, because GPT 6
Astra wrote the subject. A `checker` (Sonnet) runs the mechanical rows on the same brief. Each
lane performs the assignment directly and spawns nothing, and returns per-claim verdicts
(`CONFIRMED`, `BROKEN`, `UNRESOLVED`, with `file:line` evidence), findings outside the claims,
and one terminal `VERDICT:` line as its final message.

## Context

- Subject: the worktree `C:/Users/mikes/WebstormProjects/ollama-audit` at ollama commit `24662ef`
  (O3 committed over `4ce25b3`), tree clean; no `node_modules` there — read the installed base's
  declaration from `C:/Users/mikes/WebstormProjects/ollama/node_modules/@orkestrel/agent/dist/src/core/index.d.ts`.
- Diff: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/o3-diff.txt`
  (`git diff 4ce25b3 `24662ef``); the briefs `o3-brief.md` and `o3-brief-2.md`; the reports
  `o3-report.md` (the stopped first run) and `o3-report-2.md`; the host gate log
  `o3-gates.log.txt`; the live runs `o3-service.log.txt` (the whole `test:service` project with
  the daemon warm: 12 files, 61 tests passed) and `o3-relay-service.log.txt` (the relay suite
  alone, per-case names); all in that folder.
- Design: `design-reconciliation.md` rows 6–9 and 12 and § "Audit round O2-R1"; `plan.md` § Units.
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and, under
  `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`, `tests.md` (§ Test contract, § Live-service
  tests, § Cross-cutting proofs), `names.md`, `typescript.md`, `writing.md`, `quality.md`
  § Production hardening.
- Control identifiers: `OBFUSCATED` and `UPSTREAM_KEY` name the two fixture credentials; a test
  is named for what it proves, never for them.

## Claims

1. `createRelayServer` in `tests/setupServer.ts` starts a real `createServer` on `127.0.0.1` with
   a dispatcher mounting `createRelay` at `POST /inference` over a supplied provider and an
   `authorize` admitting exactly one bearer, records every inbound request (method, path,
   flattened headers, parsed body), exposes `url`, `requests`, and `stop`, and leaves the existing
   `createRecordingProxy` untouched.
2. The hermetic composition in `tests/src/core/integration.test.ts` drives
   `createRelayProvider` → `createRelayServer` → `createOllama` → a canned daemon transport, and
   asserts: the browser side yields the content and thinking deltas in order and returns a result
   whose `content`, `thinking`, `tools`, and `usage` equal what the fixture encoded; the relay saw
   `authorization: OBFUSCATED` and never `UPSTREAM_KEY`; the daemon transport saw
   `authorization: UPSTREAM_KEY` and never `OBFUSCATED` — each asserted from recorded headers on
   both hops, never from a header's absence alone; a wrong bearer yields `ProviderError` with code
   `HTTP`, status `401`, and message `provider error: 401` with the daemon transport never called;
   `generate` deep-equals the drained `stream`.
3. Browser cancel: after one delta the browser aborts; it throws `ProviderAbortError` whose
   `partial.content` equals the delta; the daemon transport's recorded request signal is aborted;
   the relay server's `stop` resolves within the test's own budget.
4. Server-side abort: the server's `createOllama` deadline fires on a stalling daemon transport;
   the relay writes the `abort` frame with the partial; the browser side throws
   `ProviderAbortError` whose `partial.content` equals the delta while the browser's own signal
   stays unaborted.
5. Server-side failure: a daemon transport whose stream errors after one delta; the relay writes
   the error frame (`channel` and `message` only); the browser side throws `ProviderError` with
   code `PROVIDER`, the fixed message, and no daemon text in it.
6. Tool round trip: a `ToolDefinition` advertised through the browser side reaches the daemon
   body in the function form; a returned `tool_calls` entry arrives as `result.tools` with a
   string `id`, the name, and the arguments; a following `tool` role message with `calls` crosses
   the hop through the compiled request contract unchanged.
7. `tests/service/relay.test.ts` exists, imports through `@src/core` and `@orkestrel/agent`, uses
   `OLLAMA_CONFIG` with the `FAST_OPTIONS` and `STREAM_OPTIONS` recipes, skips nothing, and holds
   one `generate` case (a real answer through the relay with only the obfuscated bearer on the
   first hop), one `stream` case (deltas join to the settled content), and one abort case after
   the first delta (`ProviderAbortError` with a partial), with structural assertions only.
8. The live run `o3-service.log.txt` reports the relay cases passing against the warm daemon: name
   any structural assertion that could pass against a daemon the relay never reached.
9. Law and scope: the diff touches only the files O3 owns; the fixtures are real implementations
   (a real server, a canned transport) with no mock, spy, module replacement, or fake clock; no
   `any`, assertion, non-null assertion, suppression, access modifier, parameter property, or
   nested function declaration; entity members single words; prose without banned terms or counts.
10. Binding: for each case in claims 2–6, name the fixture change that would make it pass against
    a relay that skipped the hop (for example a browser side pointed at the daemon directly), and
    whether the assertions catch it.

## Output

Per-claim verdicts with evidence; findings outside the claims (labels F1, F2, …); attacked and
held; one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <claim numbers>; outside the claims: <labels or none>`.
