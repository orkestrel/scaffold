# Unit A5-audit — falsification of unit A5 (the relay fences driven over a started server)

## Role and lane

Three lanes on one brief, blind to each other, each a fresh context that performs the assignment
directly and spawns nothing:

- **Objective lane** — the `analyst` route on GPT 6 Astra (`gpt-6-astra`, standing in for Sol),
  through `codex exec --sandbox read-only` rooted at `C:/Users/mikes/WebstormProjects` (the
  checkouts' parent: `agent/`, `ollama/`, `scaffold/`). This is the deciding lane: Claude Opus 5
  wrote the subject, so attack it harder than a lane on another engine would.
- **Subjective lane** — the `reviewer` role on Claude Opus 5 (native, tools Read/Grep/Glob). Your
  own engine wrote this unit; a clean pass on your engine's work is the least valuable result you
  can return, so attack the writer's judgment calls first (the prose, the case shapes, the folded
  case, the comments).
- **Mechanical lane** — the `checker` role on Claude Sonnet (native, tools Read/Grep/Glob):
  the acceptance criteria, letter-of-the-law, scope honesty, and parity rows.

Every lane returns the `orkestrel-falsify` verdict shape: numbered per-claim verdicts
(`CONFIRMED` with the attack you tried that failed, `BROKEN` with the exact input, state, or
interleaving and the smallest correct fix, `UNRESOLVED` with what would settle it), findings
outside the claims substantiated to the `BROKEN` standard, "attacked and held", and exactly one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`.
First line: `Lane: objective (analyst, GPT 6 Astra)`, `Lane: subjective (reviewer, Opus 5)`, or
`Lane: mechanical (checker, Sonnet)`. A claim whose only evidence is the writer's report is
`UNRESOLVED`, never `CONFIRMED`. Do not hedge toward an imagined consensus. No process diary.

## Subject

The agent checkout at commit `0af0785` ("test: drive the relay fences over a started server,
correct the fence's stop comment"), tree clean, over the chain:

| Commit | Round | Claimed to close |
| --- | --- | --- |
| `d84b1a2` | A3-fix-4 (V1 GREEN, `v1-verdict.md`) | the agent guide made true; the campaign's agent side closed |
| `0102259` | A5-install (Orchestrator tracked command) | `@orkestrel/router ^0.0.14` and `@orkestrel/server ^0.0.19` declared as development dependencies on the user's request |
| `0af0785` | A5 (`implementer`, Opus 5) | the relay transcription executes the dispatcher route and the `createServer` start-up over a loopback hop; the guide states what runs and each substitution; the fence's stop comment corrected in both twins |

**What this round decides:** whether A5 is accepted, the ollama mirror of the agent guide is
refreshed from it, the agent tarball is repacked into ollama, and the campaign's decision 3 closes.

**Review evidence** (all under `scaffold/.orkestrel/campaign/` unless noted):

- the actual diff: `a5-diff.txt` (`git diff 0102259 0af0785`); the status output after the unit:
  ` M guides/agent.md`, ` M src/core/factories.ts`, ` M tests/guides.test.ts`, nothing else; the
  diff stat `3 files changed, 136 insertions(+), 58 deletions(-)`;
- the unit's brief `a5-brief.md` and its report `a5-report.md` (the writer's self-report; its
  command table and its controls are the writer quoting itself);
- the design round: `a5-design-brief.md`, `a5-design-subjective.md` (planner, Opus),
  `a5-design-objective.md` (analyst, Astra), and `design-reconciliation.md` § "A5 design round";
- the Orchestrator's host probes, Node against the built `dist` and the installed router and
  server: `a5-probe-hop.mjs.txt` with `a5-probe-hop.log.txt`, `a5-probe-stop*.mjs.txt` with their
  logs, `a5-probe-refusals.mjs.txt` with its log;
- product truth: the agent tree at `0af0785` — `tests/guides.test.ts`, `guides/agent.md`,
  `src/core/factories.ts`, `tests/setup.ts` (`RecordedProvider` at line 385, `createScriptedProvider`
  at 169, `createParser` at 198), `src/core/factories.ts` (`createRelay`), `src/core/RelayStream.ts`,
  `src/core/providers/RelayProvider.ts`, and the installed declarations
  `agent/node_modules/@orkestrel/server/dist/src/server/index.d.ts` and `index.js`,
  `agent/node_modules/@orkestrel/router/dist/src/core/index.d.ts` and
  `agent/node_modules/@orkestrel/router/dist/src/server/index.js` (`buildRequest`),
  `agent/node_modules/@orkestrel/test/dist/src/core/index.d.ts` (`waitForCondition`, line 741).

**Law:** `scaffold/AGENTS.md` (§ Non-negotiable rules, § Design laws, § Writing) and, under
`scaffold/.claude/rules/`, `tests.md`, `documentation.md`, `writing.md`, `typescript.md`,
`architecture.md`, `quality.md` § Falsification. Skill: `orkestrel-falsify` (the verdict shape
above is its). The agent tree carries vendored copies of the rule files under `agent/.claude/rules/`;
the scaffold copies are canonical.

## Already established — do not re-run

Verified by the Orchestrator directly, not taken from the writer's report:

- The dependencies are declared and installed at the catalog versions; the tree at `0102259` was
  clean; the G1 guide tarball was reinstalled after the reify reverted it (`a5-install-receipt.md`).
- Over a real loopback listener with the fence's composition (`a5-probe-hop.log.txt`): the round
  trip returns `{ content: 'relayed answer' }`; `GET /relay` answers `405` with the header
  `allow: POST` and the body `Method Not Allowed`; `POST /other` answers `404`; a wrong bearer
  reaches the browser as `ProviderError` `code: 'HTTP'`, `status: 401`, `message: 'provider error: 401'`
  with the upstream unentered; a relay `limit` of 8 answers `413` the same way.
- A browser-side abort mid-stream aborts the upstream provider's signal within 1–13 ms in every
  probe run (`a5-probe-stop-2.log.txt`, `a5-probe-stop-3.log.txt`).
- `await server.stop()` settles in ≤ 4 ms after a completed round trip, after a cancel alone, and
  after the refusals; it takes ~3 s when a completed call and a cancel share one server
  (`a5-probe-stop-3.log.txt`: `order=trip-then-cancel … stop() 3011.2 ms; drain pending=0 upgraded=0`
  — the drain event reports nothing pending, so the wait is inside `server.close()` on the
  client's aborted, previously reused keep-alive socket, which `closeIdleConnections` does not
  reach; `destroy()` settles in ≤ 5 ms in every order, `a5-probe-stop-4.log.txt`).
- The Orchestrator's own instrument-can-fail control on `0af0785` before this round
  (`a5-control.sh.txt`, `a5-control.log.txt`): the `sed` planted `path: '/relayed'` at three
  sites of `tests/guides.test.ts` — the two dispatcher route tables and, by over-match, the
  substring guard's expected string — with the guide untouched. The flagship case reddened on
  `expected 404 to be 405` and the cancel case reddened, which is the reading that matters: both
  socket cases traverse the dispatcher's route table. The guard reddened only because its
  expected string was planted too (the guide still reads `/relay`). Restoring the tracked file
  returned the project to 43 passed.
- The verifier V3 runs the authoritative gate chain on `0af0785` in parallel with this round;
  gate readings are its, not yours. A claim that rests on a gate you cannot run is `UNRESOLVED`,
  naming V3 as what settles it.

## Claims

1. **The hop is real, and nothing in the file or its setup could make the socket cases pass
   without it.** In the flagship case and the cancel case the browser half is constructed without
   a `fetch` option, no handler is invoked directly, and every call traverses the listener, the
   dispatcher, and the relay handler. Attack: search `tests/setup.ts` and `tests/guides.test.ts`
   for a global transport override (`recordGlobalTransport`, `globalThis.fetch` assignments) that
   could be live during the `guides` project; check the `guides` project's `setupFiles`
   (`vite.config.ts:87-97`) for anything that replaces `fetch`; check whether
   `createRelayProvider` defaults its transport to the global `fetch` bound to its receiver
   (`src/core/providers/RelayProvider.ts`, `AgentProvider.ts`).
2. **The route facts are the dispatcher's own answers.** The `405` with `Allow: POST` for `GET /relay`
   and the `404` for `POST /other` come from the router's defaults for an unregistered method and
   an unmatched path (`router/dist/src/core/index.d.ts:488-492`), not from the relay handler and
   not from the server's boundary; both response bodies are consumed; the assertions read the
   `allow` header as exactly `POST`. Attack: does the router's auto-`HEAD` or auto-`OPTIONS`
   derivation put more than `POST` into `Allow` for a route registered on `POST` alone; does
   `@orkestrel/server` answer either request before the dispatcher; would a `404` from a wrong
   host or a listener that never started read the same.
3. **The `401` crosses the socket with the upstream unentered.** A `createRelayProvider` with
   `Bearer wrong` and no `fetch` option rejects with `ProviderError`, `code: 'HTTP'`, `status: 401`,
   and the exact message `provider error: 401` (no excerpt, because a refusal carries no body),
   and `upstream.started` is `0` afterwards. Attack: the excerpt rule in `AgentProvider`'s error
   read over a real empty body; the `started` counter's meaning (`createScriptedProvider`, `record`
   not set — does `started` count without `record: true`? read `tests/setup.ts:246-330`).
4. **The round trip is compared against an independent reading and the literal.** The relayed
   result deep-equals `{ content: 'relayed answer' }` and deep-equals the same `turns` script
   driven directly through a second `createScriptedProvider` instance; `browser.name` is `'relay'`;
   `upstream.started` is `1` after it. Attack: a comparison that passes because both sides omit
   the same fields; a `turns` array shared between two providers that one of them mutates.
5. **The cancel case proves the adapter's abort and nothing else could satisfy it.** With the
   first pull parked on the gate, `waitForCondition(() => upstream.steps === 1)` is the correct
   condition for "the server entered the pull"; `abort.abort()` on the browser's controller makes
   the pending `next()` reject with `ProviderAbortError` (`code: 'ABORT'`); `waitForCondition(() => upstream.returns === 1)`
   then `upstream.cancelled === true` reads the relay's upstream signal at return time, and that
   signal was aborted because `@orkestrel/server` aborted the inbound request's signal when the
   client went away (the router's `buildRequest` armed on response close, `router/dist/src/server/index.js`,
   linked to the stop signal in `server/dist/src/server/index.js:1919-1928`). Attack: any other
   path that aborts that signal before the assertion (the `AgentProvider` deadline, the gate, the
   `finally`'s `stop()` — check the order); an interleaving in which `steps === 1` holds before the
   server has committed to the response; whether `RecordedProvider.#return` is reached by the
   relay's `return()` while `#next` is parked on the gate (`tests/setup.ts:465-488`) and what
   `returns`/`cancelled` read in that interleaving; whether the gate's late resolution in
   `finally` can throw or leave a pending rejection.
6. **Every comment the change adds to `tests/guides.test.ts` states measured behaviour.** In
   particular the comment in the cancel case's `finally`: "A cancel leaves the client's socket
   aborted rather than idle, so a server that also served a completed call on a reused keep-alive
   socket waits out its whole `drain` budget here. One server per case keeps the stop immediate."
   Read it against the Orchestrator's measurement under Already established (the drain event
   reported `pending=0`; the wait was ~3 s, inside `server.close()`, not the 10 s `drain` budget)
   and against `server/dist/src/server/index.js:1878-1897` (`stop()`) and `:2050-2058` (`#close`).
   Also the comment "The server half runs as written, apart from the `host` a test listener needs".
7. **The `1000` ms bound on `stop()` is a legitimate assertion under `tests.md`.** It measures an
   elapsed interval with `performance.now()`; its budget clears the measured cost (0.35 ms in the
   writer's runs, ≤ 4 ms in the Orchestrator's probes) by a margin sized for a contended host, and
   it would catch the ~3 s regression the comment names. Attack: `tests.md` § Expensive proofs and
   § Test contract on timing assertions and budgets; whether the bound reads as a magic number
   the file must name; whether a contended host could exceed it for a legitimate stop.
8. **The guide is true, not merely plausible.** The two paragraphs at `guides/agent.md:1097-1099`
   state exactly what the transcription executes (the round trip, the `405` with `Allow: POST`,
   the `404`, the `401` with the upstream unentered, the cancel through the adapter's abort) and
   each substitution with a true reason (the parser; `host: '127.0.0.1'`; the resolved-port `url`;
   `await server.stop()` in place of the `SIGTERM` listener; the byte-limit case a direct call
   because the server's `limit` caps `body()` — `server/dist/src/server/index.js:2044-2049` —
   which this composition never calls). "declares no runtime dependency on … a server adapter" is
   true of `package.json`. The fence comment `// refuse new connections, drain, then close` states
   what `stop()` does (`server/dist/src/server/index.d.ts` `stop` doc; `scaffold/guides/server.md`
   § Graceful shutdown). The `## Tests` bullet (line 1475) names what the file now proves. Attack:
   a false universal replaced by an unfalsifiable one; a claim the transcription does not execute
   (for example "the upstream's settled result" — is the settled result asserted, or only content?).
9. **The prose obeys the writing law.** `scaffold/AGENTS.md` § Writing and
   `scaffold/.claude/rules/writing.md`: no count, no `should`/`simply`/`just`/`now`/`new`/`via`/
   `ensure`, present tense, `must`/`can`/`might`, a code token followed by a noun, no
   possessivized token, no `above`/`below`, the serial comma, one idea per sentence. Sweep the
   changed prose in `guides/agent.md` (lines 1097-1099, 1126, 1475) and the changed comments in
   `tests/guides.test.ts`, naming the pattern and the lines you swept.
10. **Parity holds and the twins are equal.** The titled fence `Mounting the relay on your server`
    equals the `@example` block of that title in `src/core/factories.ts:80-105` byte for byte
    (compare the fence lines to the block with the ` * ` prefix stripped); the `Reaching the relay
    from the browser` pair is unchanged; clause 36 at `guides/agent.md:1018` is byte-identical to
    `0102259` (`git diff 0102259 0af0785 -- guides/agent.md` shows no hunk touching it); the
    `See also` sentence about `@orkestrel/ndjson` ("declares no dependency on it") is still true
    of `package.json`.
11. **Scope honesty and the letter of the law.** The diff touches only the three owned files;
    `src/core/factories.ts` changes one line; `tests/setup.ts` and `tests/setup.test.ts` are
    untouched; the test file imports `createDispatcher` from `'@orkestrel/router'` and
    `createServer` from `'@orkestrel/server'` through dynamic imports inside the
    `GuideCommand.execute` callback and imports no `node:` module; no `any`, `as` (the fence's
    `as const` is not copied), non-null assertion, access modifier, or nested function
    declaration is added; `Promise.withResolvers` is already used in `tests/setup.ts`; every
    `createServer` call passes `host: '127.0.0.1'` and is followed by `await server.stop()` in a
    `finally`; the substring-guard case asserts the added strings named in `a5-brief.md` § "The
    change, stated" item 5 and every string it asserted before.
12. **Nothing was lost in the fold, and nothing else regressed.** The deleted direct `401` case's
    assertions (`ProviderError`, `code: 'HTTP'`, `status: 401`, the exact message,
    `upstream.started === 0`) are each carried by the flagship case; the cases "decodes a scripted
    relay body through the fence's browser half alone" and "refuses a relay body at its byte limit
    and admits one below it" are unchanged; the `guides` project's count stays 43 (one case
    renamed and rewritten, one added, one folded) — the count itself is V3's reading.
13. **The package is coherent as a whole. Would you ship this?** The transcription's cases are
    named for what they prove; the one-server-per-case rule is stated where a maintainer would
    look; the guide reads as one voice; a consumer copying the server half gets a fence whose
    every executed line the test drives and whose substitutions are named beside it.

## Unknowns

- Whether the `1000` ms bound holds on a contended host: V3's whole-chain run is one reading;
  name in your verdict what further reading would settle it if you rule claim 7 `UNRESOLVED`.
- The Astra lane cannot write a probe and cannot run Vitest in its sandbox (the `.vite-temp`
  write is refused read-only); name each vector you would run as `UNRESOLVED` with the exact
  command, and the Orchestrator runs it.

## The threshold

A finding is worth more than a clean pass: the alternative is the ollama mirror carrying a false
sentence and the agent release shipping it, when the version is spent. An unsubstantiated attack is
not a finding; it is a claim for the successor brief.
