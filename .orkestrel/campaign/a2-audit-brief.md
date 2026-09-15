# Audit round A2-R1 — falsify the relay landed in `@orkestrel/agent`

Draft; the Orchestrator amends § Subject (the commit), § Already established (the host readings),
and § Review evidence (the diff path) at dispatch.

## Role and lane

Three blind lanes on this brief; your launch message names yours:

- **Subjective lane, deciding:** `reviewer` on Claude Opus 5, native, read-only. The subject was
  written by GPT 6 Astra; you are the engine that did not write it.
- **Objective lane:** `analyst` on GPT 6 Astra inside `codex exec --sandbox read-only` rooted at
  the isolated worktree `C:/Users/mikes/WebstormProjects/agent-audit`. Your own engine wrote this
  subject; attack it harder for that reason. You may run `npm.cmd run test:src:core -- <file> -t '<name>'`,
  `npm.cmd run check`, `npm.cmd run lint:check`, and read-only `git`. You cannot write a probe;
  name an attack you cannot run as an `UNRESOLVED` vector with its exact fixture and observation.
- **Mechanical lane:** `checker` on Sonnet, native, read-only.

Read source only from the isolated worktree `C:\Users\mikes\WebstormProjects\agent-audit` (its
HEAD is the relay commit). Perform the assignment directly and spawn nothing. Edit nothing. Do not
hedge toward an imagined consensus.

## Subject

The chain `337390c` → `cef565d` (A1) → `573ba71` (A1-fix; audit A1-R2 `FAIL 12` on coherence
only, carried by unit A1-fix-2, which runs in the main checkout while this round reads the
worktree) → the A2 commit at the worktree's HEAD ("feat: add the relay — RelayProvider,
RelayStream, createRelay"). The unit's reports are `a2-report.md`, `a2-report-2.md`,
`a2-report-3.md` and its briefs `a2-brief.md`, `a2-brief-2.md`, `a2-brief-3.md` under
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\`. The ruled semantics are
`design-reconciliation.md` rows 6–9, 12, 14, § "Audit round A1-R1" (the `parser` option), and
§ "A2 deviations" (F9: `readText` returns `TextRead`), and `plan.md` § "The ruled contract".

## What the round decides

Whether the relay is accepted as the mechanism a browser runtime uses to drive a provider through
the developer's own server with a custom token while the real credential stays on the server
(capability C4), and whether unit O3 may build its real-server and live-daemon proofs on it.

## Already established — do not re-run

Verified by the Orchestrator on the host after converging lint and format, not taken from the
writer: `npm run format:check`, `lint:check`, `check`, and `build` exit 0; `npm run test:src:core`
23 files / 731 tests; `npm run test:setup` 54; the working tree is clean at the commit
(`C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a2-gates.log.txt`). `npm run test:guides` is
red on the rows unit A3 owns and is out of scope. The writer's five controlled mutations are its
own report (`a2-report-3.md` § "Red then green") and evidence nothing until a lane or the
Orchestrator reruns one.

## Review evidence

The actual diff: `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a2-diff.txt`
(`git diff 573ba71 HEAD`, the relay commit at the worktree's HEAD) and its stat
`a2-diffstat.txt`; the status after the commit is empty. Source at the commit in the worktree:
`src/core/providers/RelayProvider.ts`, `src/core/RelayStream.ts`, `src/core/factories.ts`,
`src/core/helpers.ts` (`readText`), `src/core/types.ts` (`TextRead`), `src/core/constants.ts`,
`src/core/index.ts`, `tests/setup.ts`, `tests/src/core/providers/RelayProvider.test.ts`,
`tests/src/core/RelayStream.test.ts`, `tests/src/core/factories.test.ts`,
`tests/src/core/integration.test.ts`. Substrate: the installed `@orkestrel/contract` declaration
(`createContract`, `parseJSONAs`, `cloneJSONValue`), `@orkestrel/tool` (`ToolCall.caller`),
and `src/core/AgentProvider.ts` at the same commit. Law:
`C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md` and
`.claude\rules\{names,typescript,architecture,patterns,tests,quality,documentation}.md`; the
verdict shape is `.agents\skills\orkestrel-falsify\SKILL.md` § "Verdict shape"; the hardening
lens for an authentication boundary is
`.agents\skills\orkestrel-harden-package\references\hardening.md` § "Audit security and destructive
paths".

## Numbered falsifiable claims

`CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is
`UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is
`UNRESOLVED`.

1. **The wire is the contract, verbatim.** `RelayProvider.body` sends a `ProviderRequest`
   projected to declared fields only — `messages` (`id`, `role`, `content`, optional `calls` as
   `{ id, name, arguments }`, optional `images`), optional `tools` (`name`, optional `description`,
   optional `parameters`), optional `options` (`think`, `schema`) — validated by the compiled
   `providerRequestContract` before dispatch, and throws `ProviderError('PROTOCOL')` on a
   non-JSON `arguments`, `parameters`, or `schema` before any fetch; `ToolCall.caller` never
   crosses and the TSDoc says so. The frames the server writes are `ProviderDelta` verbatim plus
   `result`, `abort`, and `error` arms discriminated on `channel`, each validated by the compiled
   `relayFrameContract` before it is written and after it is read.
2. **Authorization precedes work.** `createRelay` calls `authorize(request)` first; `false` and a
   throw both answer `401` with no provider iterator created and no body read; a missing body
   answers `400`; a body the read leaves incomplete at `limit ?? DEFAULT_RELAY_LIMIT` answers
   `413` before any provider call; a body the contract rejects answers `400`; only then does
   `RelayStream` start `provider.stream`. Status literals are named constants.
3. **`readText` reports completion honestly.** `TextRead.complete` is `true` when the stream ended
   within the limit — a body of exactly `limit` bytes that then ends included — and `false` when
   the stream still had bytes at the limit (one further read decides it; that chunk is discarded
   undecoded and the remainder cancelled), or when the signal aborted mid-read; a BOM-prefixed body
   decodes without the BOM and `complete` still reads the stream, not the text; the base's non-OK
   path reads `.text` and its behaviour is unchanged; every pre-existing `readText` assertion
   still holds on the record shape.
4. **The relay stream is pull-driven and settles exactly once.** Each `pull` awaits exactly one
   `next()` and enqueues one frame line; completion writes a `result` frame carrying the
   provider's returned `ProviderResult` — `thinking`, `tools`, and `usage` included — then closes;
   a `ProviderAbortError` from the provider writes an `abort` frame with its `partial` then
   closes; any other throw writes an `error` frame whose `message` is the fixed constant and
   contains no fragment of the thrown text, name, stack, headers, or cause, then closes; nothing
   is written after close; a second `pull` never observes two concurrent `next()` calls.
5. **Abort crosses the hop in both directions.** Cancelling the inbound request's signal aborts
   the upstream controller before `iterator.return()` is called and releases the listener; the
   browser side, on its own cancel mid-stream, throws `ProviderAbortError` whose `partial.content`
   equals the joined yielded deltas; an `abort` frame from the server makes the browser side throw
   `ProviderAbortError` with that partial while its own signal stays unaborted; an `error` frame
   makes it throw `ProviderError` with code `PROVIDER`; body cancellation by the consumer aborts
   upstream, returns the iterator, and leaves no listener.
6. **The browser half is a faithful `AgentProvider`.** `RelayProvider` passes
   `split: false` and `strict: true`; a literal `<think>` in a content delta reaches the consumer
   verbatim in the delta and the settled content; end of input without a `result` frame throws
   `ProviderError('PROTOCOL')`; `finish` recovers an unterminated final line; `frame()` returns
   the `parser` option's product; `name` is `'relay'`; `generate` deep-equals the drained `stream`.
7. **Credentials stay where they belong.** Nothing in the relay copies an inbound header into the
   server-side provider's configuration; the browser's `headers` hook is the only way a token
   reaches the first hop; the handler forwards no client header upstream; the fixed error message
   is the only text the server writes on failure.
8. **Response headers and framing.** The response carries `content-type: application/x-ndjson; charset=utf-8`
   and `cache-control: no-store`; every line is one JSON frame plus `\n`, encoded through one
   `TextEncoder`; the parser the browser supplies reassembles a frame split across chunks.
9. **The in-process hop proves the protocol without a socket or a mock.** The integration proof
   drives a real `Request` through the handler and a real `Response` back through the provider
   with `fetch` replaced only by a function that calls the handler — no network, no mock of
   project-owned behaviour — and asserts content, thinking, tools, usage, the `401`, `413`, and
   `400` refusals, and both abort directions.
10. **Placement, naming, and TSDoc.** `RelayProvider.ts` sits under `providers/`, `RelayStream.ts`
    at the module root, factories in `factories.ts`, constants in `constants.ts`; each file holds
    one class or its kind; every new export is barrelled; names are single words on entities;
    TSDoc first sentences are third-person `-s` verbs; no `any`, assertion, `!`, suppression,
    access modifier, parameter property, or nested function declaration in the diff; no module
    replacement, framework spy, or patched global in the tests.
11. **No regression in the base.** Every A1-R1 and A1-R2 `CONFIRMED` claim still holds at this
    commit; the `AgentProvider` engine changed only where F9 required (`.text`).
12. **Would you ship this relay?** A browser app author can write the two fences from the
    documentation in the source alone, the server author can mount the handler on
    `@orkestrel/router` without adaptation, the failure modes are the documented ones, and the
    surface carries no concept a consumer cannot construct.

## Unknowns

- Whether `ReadableStream`'s `pull` is serialized by this runtime so that two concurrent
  `next()` calls are impossible (claim 4); a lane that can execute reports the reading.

## Threshold

A substantiated finding is worth more than a clean pass: O3 will put a real server and the live
daemon behind this relay, and ollama's release ships it to every consumer of both packages.

## Output

Exactly the `orkestrel-falsify` verdict shape: `Lane:` first; verdicts 1–12 in order, each
`CONFIRMED` (with the attack that failed), `BROKEN` (input, state, or interleaving plus the
smallest correct fix), or `UNRESOLVED` (with what would settle it); findings outside the claims
substantiated to the `BROKEN` standard; "Attacked and held"; one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`. No
process diary. The objective lane returns it as the exec's final message; the native lanes return
it as their final text.
