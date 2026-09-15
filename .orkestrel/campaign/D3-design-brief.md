# Unit D3 — design: where and how a real model drives an agent inside a real Chromium page

## Role and engine

This one brief goes, unchanged, to two blind lanes:

- **Subjective lane:** `planner` on Opus 5, a native Claude subagent (read-only tools: Read, Grep,
  Glob). Fill `Design`, `Alternatives`, `Units`, `Tensions`, `Risks`.
- **Objective lane:** `analyst` on GPT-6 Astra (`gpt-6-astra`, the objective engine for this
  campaign, in the Sol seat), reached as a read-only `codex exec` rooted at
  `C:/Users/mikes/WebstormProjects`. Fill `Constraints`, `Refusals`, `Measurements`, `Units`,
  `Tensions`, `Risks`.

Whichever lane you are: perform the assignment directly and spawn nothing. Do not see, guess at,
or reconcile the other lane's answer. Do not hedge toward an imagined consensus. State which lane
you hold in your first line.

## Objective

Return a design — placement, dependency, fixture, page loading, request observation, units,
acceptance criteria — for one proof:

> An `Agent` running inside a real Chromium page, holding a page-defined `Tool`, driven by a real
> local Ollama model through `@orkestrel/ollama` (its provider directly from the page, or its
> relay path through a Node relay fixture), where the model's tool call executes in the page, the
> page's own requests are recorded, and the proof runs on the fleet's existing browser-test
> conventions rather than a new arrangement.

## What this round decides

Which package owns the proof, which dependency it adds, which Vitest project and setup module
carry it, and the units that land it. Exit criterion X8 (`plan.md`) closes on this proof.

## The user's rulings (verbatim, authoritative over every later item)

On this proof: "Do it, see how we do with other packages that have browser environment tests,
research the other orkestrel packages and their tests folders for inspiration on how to do it
correctly, they are in neighboring folders for you to look in."

On dependencies (the campaign's standing rule): a package is added only where the user has said
so; the user has now said so for this proof, but the design names exactly one addition and its
kind (`dependencies` or `devDependencies`).

## Context

**Evidence (read every file).** Under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`:

- `G8b-browser-test-layouts-distillate.md` — the fleet inventory (which packages run Playwright
  Chromium through `@vitest/browser-playwright`, how mcp's `globalSetup` boots a Node fixture
  with CORS and `provide`/`inject`, how `recordRequests()` drains resource timing, how
  `distribution` packs and serves a page, how `@orkestrel/browser`'s service suite launches
  Chromium through its own `src/server`, how ollama's `tests/service` gates on the daemon with a
  hard throw and its relay fixture in `tests/setupServer.ts`), the conventions, the ollama and
  agent facts (both `src/core` host-independent), and six candidate placements with what each
  would add.
- `plan.md` — R5 (Chromium proofs live in mcp's distribution project), R6 (the real-model page
  receipt, formerly excluded; Re-baseline 2 ruling 2 now implements it), X5–X8; `G4-ollama-relay-distillate.md`
  (the relay/channel/authority placement claims); `P1-closure-probe.md` (the agent's runtime
  closure has no Node-only root import); `U5-mcp-distribution-brief.md` (the scripted-upstream
  page-side receipt the mcp proof will take).
- `D1-design-planner.md` § 2 and `D1b-design-astra.md` § 2 (the agent placement-proof argument
  that produced R5 and R6).

Then read first-hand:

- `C:/Users/mikes/WebstormProjects/ollama/vite.config.ts`, `package.json`, `tests/setupService.ts`,
  `tests/setupServer.ts` lines 1–180, `tests/service/relay.test.ts`, `src/core/OllamaProvider.ts`
  lines 1–100, `src/core/constants.ts`.
- `C:/Users/mikes/WebstormProjects/mcp/tests/setupGlobal.ts`, `tests/fixtures/browserServer.ts`
  lines 40–90 and 200–250, `tests/setupBrowser.ts` lines 120–180, `vite.config.ts` lines 70–95
  and 200–235, `configs/browsers.ts`.
- `C:/Users/mikes/WebstormProjects/browser/tests/setupService.ts`, `tests/service/browser.test.ts`
  lines 1–130, `src/server/Browser.ts` lines 590–660, `src/core/BrowserPage.ts` lines 215–260.
- `C:/Users/mikes/WebstormProjects/agent/src/core/providers/AgentProvider.ts` lines 70–100 and
  255–275; `agent/src/core/types.ts` around `ProviderInterface`; `agent/package.json`.
- The rules: `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md` (the layout
  table; § Expensive proofs; § Cross-cutting proofs; § Browser tests; § Shared test
  infrastructure; § Condition) and `.claude/rules/workspace.md` (projects follow environments;
  when `configs/browsers.ts` exists; `distribution` and `service`), `.claude/rules/portability.md`
  (`127.0.0.1`, paths, `pathToFileURL`).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; the rule files above plus
`names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `documentation.md`, `quality.md`,
`writing.md`; the skill `.agents/skills/orkestrel-align-packages/SKILL.md` and
`references/integration.md`; `.agents/skills/orkestrel-harden-package/SKILL.md`.

**Host.** Windows 11. You are read-only. Every path above is absolute. The Ollama daemon on this
host answers on `http://localhost:11434` with CORS open to localhost origins (Orchestrator's
standing fact; do not probe it). Playwright Chromium is installed for mcp; a system Chrome or
Edge is present for `@orkestrel/browser`'s service suite.

**Measurements (Orchestrator, 2026-09-15).** ollama 0.0.16 at `24ee110` (checkpoint), agent at
`35109d9`, mcp at `b9ff0b9` plus U4c in flight; ollama declares no `playwright`,
`@vitest/browser-playwright`, or `@orkestrel/browser`; agent declares none of them either;
`@orkestrel/browser` 0.0.16 depends on html, emitter, contract, websocket.

## Unknowns

- Whether a Vitest Browser Mode page origin can `fetch` `http://localhost:11434` directly (the
  daemon's CORS is open to localhost origins per the standing fact; mcp needed explicit CORS for
  its own fixture) — the design states which path the proof takes and why, and names the
  measurement that settles the other.
- Whether `Page.navigate('file://…')` through `@orkestrel/browser` is a supported path on this
  host (the API accepts any string; no proof in the tree uses it).

## The design questions (answer each by number)

1. **Placement.** Rule among G8b's six candidates (agent `src:browser`; mcp-style in-page
   provider with a Node fixture; supervisor-style integration config; `@orkestrel/browser`
   service launch; packed-consumer distribution page; stay in ollama's Node service) — or a
   seventh you name — for the package that owns the proof and the project that runs it. Apply
   the layout law: a `tests/src/browser` suite mirrors a `src/browser` face; live externals live
   in `tests/service` with a hard throw; `distribution` proves the packed artifact. State what
   the proof's subject is (the page composition, the relay path, or both) and which package's
   product that subject is.
2. **The one dependency.** Name the single addition (`playwright` with `@vitest/browser-playwright`,
   or `@orkestrel/browser`) and its kind, and the reason the other is refused. If the answer
   is `@orkestrel/browser`, say what its service-launch shape gives the proof that Playwright
   does not (the user wants the browser package to become an agent's right arm; a proof that
   drives it is evidence for that phase) and what it lacks.
3. **Model path.** Rule between the page calling `createOllamaProvider` against the daemon
   directly and the page calling `createRelayProvider` against a Node `createRelay` fixture
   fronting the daemon; state which requests the page must be observed making (exactly one
   model request per turn, zero for the tool call), and how the fixture is booted (mcp's
   `globalSetup` + `provide`/`inject`, or ollama's `tests/setupServer.ts` relay).
4. **Page loading.** How the page gets the agent, tool, and ollama modules: Vite-served test
   modules (Browser Mode), a Vite-built bundle served on `127.0.0.1`, or a packed tarball in an
   isolated consumer; and how the DOM-mutating tool proves the call ran in the page.
5. **Gates.** The readiness gate (daemon absent → hard throw, per `tests.md`; Chromium absent →
   hard throw), the model and host environment variables, the timeout, and whether
   `prepublishOnly` runs it (ollama's `test:service` already does).
6. **Units and order.** Owned files, tests named for what they prove, the guide sections
   (`guides/ollama.md` or `guides/agent.md` `## Tests`), the role and engine per unit (bench
   sandboxes cannot launch Chromium or reach the daemon: name the native route), and the order
   relative to U5 and the landing.
7. **Exit criterion.** The capabilities whose closure ends this piece (X8 in full).

## Output

Return the same section shape as D1: the sections your lane owns, numbered answers to the design
questions, a `Units` table (unit, role, engine, owned files, acceptance criteria, dependencies),
and the exit criterion. Cite `file:line` for every factual claim. No process diary.
