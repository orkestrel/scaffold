# Unit design — a host-independent provider base in `@orkestrel/agent`, `OllamaProvider` rebuilt on it, and a browser↔server relay

## Role and engine

This one brief goes to two blind lanes on the adversarial pass:

- **Subjective lane:** `planner` on Claude Opus 5, a native read-only subagent (Read, Grep, Glob).
- **Objective lane:** `analyst` on GPT 6 Astra (`gpt-6-astra`), inside `codex exec` with a read-only
  sandbox rooted at `C:/Users/mikes/WebstormProjects`.

Your launch message names the lane you hold. Hold that perspective in full and say which one you
held. Do not reconcile with the other lane; you never see its answer.

Perform the assignment directly and spawn nothing. Edit nothing. You may run read-only commands
where your tools allow it (the objective lane may run `tsc --noEmit -p <config>` and read-only
`git` and `grep`; never `npm install`, never a mutating gate).

## Objective

Propose the complete design — types first — for these capabilities, and decompose it into bounded,
routed units the Orchestrator can dispatch:

- **C1.** A host-independent provider base in `@orkestrel/agent` `src/core` that owns every provider
  mechanic up to the seams that are wire-specific, so a concrete provider supplies only its wire.
- **C2.** `@orkestrel/ollama`'s `OllamaProvider` rebuilt on that base with no duplicated mechanic,
  its options and observable behaviour preserved unless the design shows a change is required, and
  its unit, conformance, and service suites green.
- **C3.** A provider a browser runtime can import and run: the same class talks to a daemon
  directly, or to the developer's own server through the existing `url`/`fetch`/`headers` seam.
- **C4.** A relay between a browser-side provider and a server-side provider: the browser holds a
  custom token the server authenticates; the server holds the real credential and drives the real
  provider; deltas stream back and abort propagates across the hop. Mechanism only — token
  minting, validation policy, and identity stay in the application.
- **C5.** Guides, parity, tests, and the gate chain for both packages, with the publish order
  agent then ollama.

Name the exit criterion of the campaign as the closure of C1–C5 and nothing wider.

## Context

**Motivation (the record of what motivated this).** The user's ask, paraphrased closely: create an
`AgentProvider` in the agent package as the environment-agnostic provider to build on; the
existing `OllamaProvider` should extend it; the base handles everything up to the seams that are
literally provider-specific, so it can bridge browser and server. Use `OllamaProvider` in the
browser calling the Ollama server as normal, or calling the user's own custom server, which passes
the call to a similar `OllamaProvider` on the server that reaches the real Ollama daemon. For
models with real API tokens, the browser holds a custom token the server authenticates, and the
server-side provider adds the real API token before making the real request. The supervisor
project (Claude, Codex, Cursor CLI providers, and a browser↔server relay) is context for the shapes
the line will eventually need; it is not written in this campaign.

**Evidence — read these first, in this order.**

1. `scaffold/tmp/cursor/absorb-provider-report.md` — Grok's distillate of the provider contract,
   how the `Agent` runtime drives it, the wire/generic split of `OllamaProvider` method by method,
   what the tests pin, and the environment facts. Session `93cf347e-0929-42f4-9f9e-b9efebca03c3`.
2. `scaffold/tmp/cursor/absorb-supervisor-report.md` — Grok's distillate of supervisor's provider
   classes, its browser → server → backend relay path, and where auth and tokens enter.
3. `scaffold/tmp/cursor/absorb-ecosystem-report.md` — Grok's distillate of which `@orkestrel/*`
   packages already supply transport, streaming, auth, abort, tool, and contract mechanisms, with
   their environments.
4. The governing contract, first-hand: `agent/src/core/types.ts:1-240` (`Message`,
   `ProviderResult`, `ProviderDelta`, `ProviderStreamOptions`, `ProviderInterface`,
   `ThinkSplitterInterface`), `agent/src/core/Agent.ts:434-500` and `:729-765` (the one runtime
   call site), `agent/src/core/errors.ts:1-60` (`ProviderAbortError`).
5. The subject class, first-hand: `ollama/src/server/OllamaProvider.ts` (whole file, 444 lines),
   `ollama/src/server/types.ts`, `ollama/src/server/helpers.ts`, `ollama/src/server/factories.ts`.
6. The proofs that already exist for the relay shape: `ollama/tests/service/transport.test.ts`
   (browser → own server → live daemon, transparent wire proxy with an obfuscated bearer),
   `ollama/tests/setupServer.ts:100-260` (`createRecordingProxy` on `@orkestrel/router` +
   `@orkestrel/server`, `createStreamingTransport`, `createRefusingTransport`), and the agent
   core's scripted provider `agent/tests/setup.ts:150-260`.
6b. Prior art for the agent-level relay, written ad hoc in supervisor's private app layer (read as
   evidence of the shape a consumer needed, never as authority): `supervisor/app/core/types.ts:43-59`
   (`InferenceRequest { messages, stream, options? }` and `InferenceFrame` = `delta` | `result` |
   `abort` | `error`), `supervisor/app/server/InferenceStream.ts` (a pull-driven NDJSON `Response`
   over one `provider.stream` call, request signal → provider abort, `return()` on cancel),
   `supervisor/app/server/ApplicationHandlers.ts:223-244` (the `/inference/:vendor` handler:
   principal check, vendor lookup, parse, stream or unary), `supervisor/app/core/helpers.ts:180-200`
   (`inferenceFailureFrame` maps `ProviderAbortError` onto the `abort` frame), and
   `supervisor/app/core/parsers.ts:796-830` (`parseInferenceRequest`). Note what it refuses:
   `tools` never cross that hop, and the frame vocabulary is hand-rolled NDJSON with no
   `@orkestrel/ndjson` import.
7. The guides: `agent/guides/agent.md` §§ Surface, Methods → `ProviderInterface`, Contract
   clauses 2–6, Patterns → "Bounding any provider call"; `ollama/guides/ollama.md` §§ Surface,
   Contract, Patterns → "Routing through your own server (obfuscated tokens)".
8. The line's guide mirrors for reuse rulings: `scaffold/guides/{contract,tool,timeout,abort,
   budget,ndjson,sse,router,server,middleware,websocket,browser,mcp}.md`.

**Law.** `scaffold/AGENTS.md` in full; `scaffold/.claude/rules/names.md`, `typescript.md`,
`architecture.md`, `patterns.md`, `tests.md`, `workspace.md`, `documentation.md`,
`portability.md`, `quality.md`, `writing.md`. Skills: `scaffold/.agents/skills/orkestrel-align-packages/SKILL.md`
with `references/integration.md` (this campaign spans two packages), and
`scaffold/.agents/skills/orkestrel-harden-package/SKILL.md` with `references/contract.md` and
`references/centralization.md` (each package unit). Governing guides: `agent/guides/agent.md` and
`ollama/guides/ollama.md`.

**Host.** Windows 11. Checkouts are siblings under `C:/Users/mikes/WebstormProjects/`: `agent`,
`ollama`, `supervisor`, `scaffold`, and every other published package by name. Node 22 or later;
npm 11.6 or later. The objective lane's sandbox denies network and mounts `.git` read-only.

**Measurements (taken by the Orchestrator on 2026-09-14, on this host).**

- `@orkestrel/agent` publishes core only: `agent/package.json` `exports` has the one entry `.` →
  `dist/src/core`. Scoped config `agent/configs/src/tsconfig.core.json`: `lib: ["ESNext","WebWorker"]`,
  `types: []`.
- `@orkestrel/ollama` publishes server only: `ollama/package.json` `exports` `.` → `dist/src/server`.
  Scoped config `ollama/configs/src/tsconfig.server.json`: `lib: ["ESNext"]`, `types: ["node"]`.
  `grep -rl "@src/server" ollama/tests | wc -l` → 17 test files import the server barrel.
- Every package `OllamaProvider.ts` imports publishes a core face and reads no `node:` module:
  `grep -n '"\./' ollama/node_modules/@orkestrel/{timeout,ndjson,agent,budget,tool,contract}/package.json`
  → each maps `.` to `dist/src/core`; `grep -c "node:" ollama/node_modules/@orkestrel/timeout/dist/src/core/index.js`
  → 0, same for ndjson. `@orkestrel/server` publishes `dist/src/server` only. `@orkestrel/router`
  publishes core, browser, and server faces; its core `Dispatcher.handle(request: Request, state)`
  returns `Promise<Response>` and a route handler is `(request: Request, context) => Response | Promise<Response>`
  (`ollama/node_modules/@orkestrel/router/dist/src/core/index.d.ts:395,470,937`).
- Framing parsers in the line, both core: `NDJSONParserInterface.parse(chunk): readonly Record[]`
  plus `clear()` (`ollama/node_modules/@orkestrel/ndjson/dist/src/core/index.d.ts:56-80`);
  `SSEParserInterface.parse(chunk): readonly SSEEvent[]` (`.../sse/dist/src/core/index.d.ts:224-240`).
- The `Agent` runtime calls only `provider.format` and `provider.stream`; `Agent.generate()` drains
  its own stream and never calls `provider.generate` (Grok item 2; `agent/src/core/Agent.ts:166-171`).
  `provider.generate` is used by the documented summarizer seam and by hand-driven callers.
- Runtime consumers of `@orkestrel/agent` in the catalog: `@orkestrel/ollama` and
  `@orkestrel/toolbox` (both L6). `grep -rn "ProviderInterface\|ProviderResult\|ProviderDelta\|createOllama\|OllamaProvider" toolbox/src toolbox/app`
  → no hits; toolbox references providers only in one TSDoc example.
- `@orkestrel/supervisor` declares `agent` and `ollama` as devDependencies only, with ranges that lag
  the catalog; it is read-only context here.
- All four checkouts were clean at session start (`git status --short` printed nothing).

**Control identifiers.** None. A test written for this campaign is named for what it proves.

**Standing conditions.** `agent` carries no `node_modules/.orkestrel-lock.sha256` marker; that
marker is a Cloud-session concern and is not a defect here. Neither package publishes a browser
environment today, so no real-browser Vitest project exists in either.

## Unknowns

- Whether the user accepts a **new runtime dependency** in `@orkestrel/agent` (for example
  `@orkestrel/ndjson`). `AGENTS.md` forbids adding a package without an explicit request. Design the
  framing seam so agent core needs no new dependency; if you conclude one is unavoidable, name it
  under `Tensions` as a decision for the user, with the design that avoids it beside it.
- Whether the browser-side relay provider and the server-side relay handler belong in
  `@orkestrel/agent` core (host-independent `Request`/`Response`), in a new environment face of
  agent, in `@orkestrel/ollama`, or in a new package. Rule on it under `Design` (subjective) or
  `Constraints` (objective) with the evidence that decides it; name what you could not settle.
- Whether `@orkestrel/ollama` must change its published environment from server to core to satisfy
  C3, and what that costs (scaffold `--src` selection, `configs/src/*`, 17 test imports, guide
  fences that use `process.stdout`). Rule on it and cost it.

## Design questions — answer every one, numbered

1. **Base shape.** An abstract class the concrete provider `extends` (the user's stated wish, working
   name `AgentProvider`) versus one shared engine class that takes a wire object by composition.
   `AGENTS.md` bans `public`, `protected`, and `private` on class members and parameter properties,
   so a subclass can reach the base only through public single-word members; state exactly which
   public seams the concrete provider fills (for example: build the request body, frame the byte
   stream into records, read one record into deltas/tools/usage/done, map a non-OK response to an
   error, name the endpoint path) and which mechanics the base owns (id, name, `format`, deadline
   plus `AbortSignal.any`, the `fetch`/`headers` transport seam, POST and non-OK handling with a
   bounded body, body reader plus streaming decoder, think splitting, partial-on-abort
   `ProviderAbortError`, result assembly, reader cancel and timeout clear). Give the resulting
   `types.ts` contract as TypeScript.
2. **Layers.** Whether one base suffices or two are warranted — a transport-agnostic provider base
   (id, format, abort partial, result assembly, generate-by-draining-stream) and an HTTP streaming
   engine on top — given that supervisor's providers are process-shaped rather than HTTP-shaped.
   Rule with the minimal-API law: build with the first real consumer, no speculation.
3. **`generate`.** Whether the base implements `generate` by draining its own `stream` (one engine,
   matching how `Agent` already works) and lets a concrete provider override it only as a genuine
   native non-stream fast path (Ollama's `stream: false` single-body call), or keeps two paths.
4. **Framing seam.** How the base consumes NDJSON (Ollama) today and SSE (OpenAI, Anthropic) later
   without agent core depending on either parser package: a structural parser interface declared in
   agent `types.ts` that both installed parsers satisfy, supplied by the concrete provider.
5. **Environment of the base and of `OllamaProvider`.** Where each lives so a browser app can
   import and run `OllamaProvider` (C3). If ollama must publish a core face, list every file and
   configuration the change touches and how the existing server-only tests (fixture servers,
   recording proxy) keep running.
6. **Relay protocol (C4).** Rule between: (a) a transparent wire proxy — the server forwards the
   vendor wire verbatim after validating the custom token and swapping in the real credential; (b)
   an agent-level relay — a browser-side provider whose wire is `ProviderInterface` itself
   serialized (request carries `messages`, `tools`, `options`; the response streams
   `ProviderDelta` records and ends with the assembled `ProviderResult`), and a server-side handler
   that authenticates, holds the real provider, and drives it; (c) both. Name the shape of the
   request and response bodies, how abort crosses the hop (request signal → upstream signal), how
   a mid-hop abort returns the partial, how `usage` and `thinking` survive the hop, and how the
   `headers` hook on the browser side and an authorization seam on the server side keep policy in
   the application. State what each option cannot do.
7. **Server-side placement.** Whether the server half is a host-independent
   `(request: Request) => Promise<Response>` handler in agent core that `@orkestrel/router` and
   `@orkestrel/server` can mount unchanged, or needs a Node face. Cite the router and server
   declarations.
8. **Naming.** The base class, its options type, the seam member names, the relay provider, the
   relay handler factory, and the folder they nest in under `src/core` (the extension-category
   rule in `architecture.md`), each one word where the rules require it and each checked against
   the existing names in `agent/src/core/types.ts` and `ollama/src/server/types.ts`. Say whether
   `AgentProvider` or another name best fits the package's vocabulary and why.
9. **Ecosystem reuse.** For every proposed helper, guard, parser, or error, name the installed
   `@orkestrel/*` primitive that already does it (contract, tool, budget, timeout, abort, ndjson,
   sse, router, server, middleware) or state that none does. No rename wrappers.
10. **Tests and proofs.** The deterministic core proof for the base (a fixture `Response` with a
    canned byte stream, as `createStreamingTransport` does today), the ollama unit and service
    proofs that must keep passing, the relay round-trip proof at the highest layer that can compose
    it for real (a real `@orkestrel/server` in front of a real provider, following
    `ollama/tests/service/transport.test.ts`), the abort-across-the-hop proof, and what would prove
    the browser claim without a browser Vitest project (type-level isolation under the core scope,
    the bound `fetch` receiver) — or whether a browser project is warranted.
11. **Guide and parity impact.** Which `agent.md` clauses change (clause 2 says the module defines
    only the contract and a concrete implementation is the host's responsibility), which Surface and
    Methods tables gain rows, and what `ollama.md` gains and loses.
12. **Publish and blast radius.** The order and the version bumps, and what `toolbox` must do later.

## Scope

**May be proposed for change.** `agent/src/core/**`, `agent/tests/**`, `agent/guides/agent.md`,
`agent/README.md`, `agent/package.json` (version and, only with the user's decision, dependencies);
`ollama/src/**`, `ollama/tests/**`, `ollama/guides/ollama.md`, `ollama/README.md`,
`ollama/package.json`, `ollama/configs/**`, `ollama/vite.config.ts`, `ollama/tsconfig.json`.

**Off-limits.** `supervisor/**`, `toolbox/**`, every other checkout, every vendored file
`scaffold repair` restores (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`configs/helpers.ts`, `configs/policy.ts`, `AGENTS.md`, `CLAUDE.md`, `.claude/**`), and `*/types.ts`
edits the user has made (none exist).

**Tools and limits.** Read-only. The objective lane may run scoped `tsc --noEmit` and read-only
`git`/`grep`; neither lane installs, edits, formats, builds, or runs a suite.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## Output

Return only these sections, in this order, and nothing else. The subjective lane fills `Design`
and `Alternatives`; the objective lane fills `Constraints`, `Refusals`, and `Measurements`; each
lane fills `Answers`, `Units`, `Tensions`, and `Risks`. Leave a section your lane does not own
empty rather than renaming it.

- `Lane`: the lane you held.
- `Answers`: the twelve numbered design questions, each answered in full with the evidence that
  decides it (`file:line` for code, guide, and declaration facts).
- `Design`: the coherent API, vocabulary, architecture, and developer experience, with the
  `types.ts` additions and changes written as TypeScript for both packages.
- `Alternatives`: at most two real alternatives and why the design wins.
- `Constraints`: what the code and the contracts actually permit, each with `file:line`.
- `Refusals`: the options a rule forecloses, with the rule text quoted and its path.
- `Measurements`: the readings this brief supplied that bound the design, each with the command
  the Orchestrator ran; name a reading the design needs and the brief did not supply under
  `Tensions`.
- `Units`: bounded work in dependency order, each naming its role AND engine (`implementer` on
  Opus 5, `sol` on GPT 6 Astra, `builder` on Sonnet, `verifier` on Sonnet), the checkout it writes,
  owned files, shared files, dependencies on other units, and independently checkable acceptance
  criteria. Serialize writers per checkout. Name the audit lanes each unit needs.
- `Tensions`: the choices your lane made on judgment, named for the other lane to challenge and for
  the Orchestrator to rule, including every user decision this design needs (a new dependency,
  an environment change, a public option removed).
- `Risks`: design-fit or correctness risks and the evidence needed to settle each.

Bound the return at 700 lines. The objective lane writes its return as the final message of the
exec; the subjective lane returns it as its final text.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — if a
named evidence file is missing or a named authority does not exist in the tree. Decide, record, and
carry on from any ancillary question of ordering or heading.

## Acceptance criteria

1. Every numbered design question has an answer backed by a `file:line` or a declaration path.
2. The `types.ts` additions compile in your head against the constraints you cite: readonly
   members, single-word entity members, no `any`, no assertions, no `protected`/`private`, absence
   as `undefined`.
3. Every proposed unit names a role, an engine, a checkout, owned files, and acceptance criteria that
   close on those files alone.
4. Every proposed new symbol is ruled reuse, composition, or genuinely new against the installed
   line, per question 9.
5. Every user decision the design needs is named under `Tensions`, never assumed.

## Review evidence

This subject is a design proposal: the proposal is what you return, the canon it must satisfy is
the Law section, and the record of what motivated it is the Motivation paragraph. No diff exists yet.
