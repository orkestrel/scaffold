<!-- D3-S — planner (Opus 5, native), subjective design lane for the real-model page receipt. Retained verbatim from the completion notification, 2026-09-15 (487 s, 52 tool uses). Immutable. -->

I hold the **subjective** lane of this blind adversarial pass (`planner`, Opus 5, native Claude subagent). `Constraints`, `Refusals`, and `Measurements` are the objective lane's and I leave them empty.

# Design

**Ruling in one line: `@orkestrel/ollama` owns the proof, it runs in ollama's existing `service` project as `tests/service/page.test.ts`, the one addition is `@orkestrel/browser` as a `devDependency`, and the gated model path is the relay served same-origin with the direct-daemon path proven beside it.**

The placement follows from what the proof's increment actually is. A page holding an `Agent` and a `Tool` is already getting a Chromium receipt from U5's mcp distribution proof with a scripted upstream (`plan.md:62`). The only thing that proof cannot produce is a real model choosing the tool. That increment is `@orkestrel/ollama`'s product, and ollama's guide already makes the claim in prose with no gate under it: contract 13 records a manual 2026-09-14 Chrome 148 reading where "`OllamaProvider` drove the local daemon directly" and "the same page reached that daemon through a `createRelay` server" (`ollama/guides/ollama.md:124`), and `### Running in the browser` (`:199-201`) and `### Relaying through your own server` (`:213-217`) repeat it. `.claude/rules/documentation.md` § Parity: "Where a prose claim about behaviour sits under no fence, add the executed assertion that would break if the claim went false." The assertion belongs where the claim lives.

## 1. Placement

**Candidate 6 extended, not candidate 1 or 2.** The proof stays in ollama, in the `service` project ollama already declares (`ollama/vite.config.ts:115-127`), as a new file `tests/service/page.test.ts`. G8b listed candidate 6 as "stay in ollama's Node service" and noted it lacks "browser machinery ollama does not have" (`G8b-browser-test-layouts-distillate.md:31`). `@orkestrel/browser` supplies that machinery **inside a Node project**, which is how `@orkestrel/browser` proves itself: its own live suite is `browser: { enabled: false }`, Node, `tests/service/` (`browser/vite.config.ts:149-160`; `browser/tests/service/browser.test.ts:1-7`). So the candidate that appeared to need a new arrangement needs none.

**Subject: both the page composition and the relay path, and both are ollama's product.** The page composition claim is "the published `@orkestrel/ollama` core entry and its whole `@orkestrel` import closure evaluate in a real page and drive a real daemon" — contract 13's claim (`ollama/guides/ollama.md:124`), and the claim `P1-closure-probe.md:33` states it could not settle ("that each entry evaluates in a real browser page ... is outside this instrument"). The relay path claim is "serve the page from the relay server's own origin" (`ollama/guides/ollama.md:262`), also ollama's. The `Agent` and the page `Tool` are `@orkestrel/agent`'s and `@orkestrel/tool`'s products and are not re-proven here beyond what the composition needs.

**Why the layout law points here and not at a `tests/src/browser` suite.** The mirror rule fixes `tests/{src,app}/[environment]/` against source (`.claude/rules/tests.md:13-14`), and ollama publishes `src/core` alone (`ollama/package.json:29-41`). An ollama `src:browser` project would mirror nothing — the exact ground R5 used to refuse the planner's agent `src:browser` (`plan.md:16`). Re-running that refused shape one package over would be incoherent. Beyond the mirror, the subject is a **live external service**, and `.claude/rules/tests.md:141-152` fixes live externals in `service` and forbids verifying service-dependent logic "through ... unrelated module tests". A Vitest Browser Mode project is an environment project; dragging a live daemon into one contradicts that line directly.

**What this placement costs to set up: nothing.** No new Vitest project, no `configs/browsers.ts`, no `tests/setupBrowser.ts`, no new script, no change to `npm test`, no change to `prepublishOnly` — which already runs `test:service` (`ollama/package.json:68`). The project already carries `testTimeout: 120_000`, `hookTimeout: 120_000`, and `fileParallelism: false` (`ollama/vite.config.ts:123-125`), which are the settings a browser launch plus a live generation need.

**No file in `agent` or `mcp` is touched.** R5's "no Playwright project in `agent`, no `src/browser` in `agent`" stands unchanged (`plan.md:16`).

## 2. The one dependency

**Add `@orkestrel/browser@^0.0.16` to `ollama`'s `devDependencies`. Refuse `playwright` with `@vitest/browser-playwright`.**

Refusal grounds, strongest first:

- **It is not one addition.** A Vitest browser project needs both packages plus the `configs/browsers.ts` leaf that imports them (`.claude/rules/workspace.md:70-72`; `mcp/package.json:78,116-119`). The user authorized one addition and named its kind. `@orkestrel/browser` is one declared package.
- **It cannot run where the proof belongs.** `service` is `environment: 'node'`, `browser: { enabled: false }` (`ollama/vite.config.ts:121-122`). Playwright-through-Vitest requires an environment project, which § 1 refuses.
- **It puts a bundler between the page and the published artifact.** Browser Mode serves Vite-transformed source through `@src/*` aliases (`G8b-browser-test-layouts-distillate.md:7`). The claim under proof is about the **published** entry closure, and a bundler flattens and tree-shakes exactly the unexercised root imports P1 could not rule on.

What `@orkestrel/browser`'s service-launch shape gives that Playwright does not:

- **A real user-installed Chrome or Edge reads the page**, resolved by `findSystemBrowser` (`browser/src/server/helpers.ts:107`), not a bundled test build. For a claim about what a user's page does, that is the more faithful reading.
- **A first-class request log that is an observer, not a replacement.** `BrowserPageEventMap` carries `request`, `response`, `failure`, `error`, and `console` (`browser/src/core/types.ts:1085-1101`), and `BrowserPageOptions.on` arms those hooks at `create()` before navigation (`:215-221`), so no request escapes observation. `BrowserRequest` carries `url`, `method`, `post`, and `headers` (`:1107-1118`). mcp's page-side `recordRequests()` reads resource-timing names alone (`mcp/tests/setupBrowser.ts:165-173`); this reads method, URL, and body from CDP's own log, in Node, where the assertions live.
- **A page-error channel that replaces what Vitest-in-the-page would have given.** `error: readonly [error: BrowserPageError]` (`browser/src/core/types.ts:1094`) fails the case on any uncaught page error.
- **It is the first composition of `browser` with `agent`.** The user wants `browser` to become an agent's right arm; R13 puts that in phase two (`plan.md:24`). A proof where `browser` drives a page running an `Agent` against a real model is that phase's ground truth, taken a round early and for free.

What it lacks, stated plainly:

- **No test runner in the page.** Every assertion is a Node-side read of `page.evaluate` results (`browser/src/core/types.ts:1075`). The page script returns structured outcome data; the `error` hook covers the rest.
- **No module server.** The import map and the static route are the proof's own infrastructure (§ 4).
- **`navigate('file://…')` is unproven on this host** (`G8b-browser-test-layouts-distillate.md:33`). The design never uses it; the page is served over `http://127.0.0.1:<ephemeral>`, which `.claude/rules/portability.md` prefers anyway.
- **Transitive dev-tree growth.** `@orkestrel/browser` pulls `html`, `emitter`, `contract`, and `websocket` (`browser/package.json:88-93`). `contract ^0.0.17` and `emitter ^0.0.10` already match declarations in ollama's and agent's trees, so no duplicate installs; `html` and `websocket` are new and dev-only. One declared addition, named honestly.

**Bump obligation: none of its own.** A `devDependencies` addition reaches nobody (`.agents/orchestration.md` § What a bump obliges), and nothing under `ollama/src/` imports it, so the published `files: ["dist/src", "README.md"]` set (`ollama/package.json:20-23`) does not move. Ollama is already bumping this campaign for its tool and agent re-pins (R14, `plan.md:25`); this rides that bump.

## 3. Model path

**Gate the relay path. Prove the direct path beside it, in the same file.**

**Relay is the headline** because the guide recommends it for anything a user runs (`ollama/guides/ollama.md:201`) and because serving the page from the relay's own origin removes CORS from the proof entirely — the guide's own instruction (`:262`). The page calls `createRelayProvider` (`agent/src/core/factories.ts:166`) against `POST /inference` on the page's own origin; the Node side mounts `createRelay` over a real `createOllama` against the live daemon, which is exactly the composition `ollama/tests/service/relay.test.ts:11-24` already runs — with the `Agent` and the page that G4 recorded as missing ("no scoped test constructs `createAgent(createRelayProvider(...), { tools })` in a Playwright page", `G4-ollama-relay-distillate.md:87`).

**Direct is proven too, narrowly**, because contract 13 and § Running in the browser claim it and nothing gates it. The direct case takes the cheapest assertion that would break if the claim went false: `createOllama` in the page, one settled generation, the daemon path observed. No agent, no tool — one behavior per case (`.claude/rules/tests.md:153`).

**Requests the page must be observed making, per relay tool turn:**

| Window | Page requests | Relay inbound | Daemon upstream |
| --- | --- | --- | --- |
| Turn one (model decides) | one `POST /inference`, same-origin | one, carrying the bearer | one `POST /api/chat`, body advertising the tool |
| Tool execution | none | none | none |
| Turn two (result fed back) | one `POST /inference` | one, body carrying the `role: 'tool'` message | one `POST /api/chat` |

The zero-request window is the load-bearing reading and it needs a positive control, per `.claude/rules/tests.md:329` ("confirm each assertion ... fails rather than passes when its population is empty"): after asserting the empty drain, the page issues one known fetch to a `/control` route and the drain reports it. The drain itself is mcp's discipline moved Node-side — arm the recorder at `create()`, take a mark once the page reports ready, assert on the slice after the mark (`mcp/tests/setupBrowser.ts:165-173`).

For the direct case, **assert by filtering, never by counting**: the page origin is `http://127.0.0.1:<ephemeral>` and the daemon is `http://localhost:11434`, so Chromium sends a cross-origin preflight and the CDP log records it as its own request. Assert that a `POST` to `/api/chat` on the daemon origin is present; a total would fail on the preflight and read as a defect in the code.

**Fixture boot: neither mcp's `globalSetup` nor a copy of ollama's relay.** mcp's `globalSetup` plus `provide`/`inject` exists to hand a URL across the Node/page process boundary that Browser Mode creates (`mcp/tests/setupGlobal.ts:31-51`). Here the test file and the fixture are in one Node process, so `provide`/`inject` has nothing to bridge and the fixture starts per case, like `browser/tests/service/browser.test.ts:44-49`. Ollama's `createRelayServer` is extended rather than copied — `.claude/rules/tests.md:182` makes a near-duplicate helper a defect.

Shape of the extension in `tests/setupServer.ts`, which already owns `createRelayServer` (`ollama/tests/setupServer.ts:139-172`):

```ts
export interface PageFixtureOptions {
	readonly document: string
	readonly provider?: ProviderInterface
}
export interface PageFixtureInterface {
	readonly url: string
	readonly requests: readonly RecordedRequest[]
	stop(): Promise<void>
}
export function createPageFixture(options: PageFixtureOptions): Promise<PageFixtureInterface>
```

It serves the document at `/`, the installed `@orkestrel` module tree under `/modules/`, a `/control` route for the positive control, and — only when `provider` is given — the recorded `POST /inference` relay. `createRelayServer` and `createPageFixture` compose one shared dispatcher builder so the relay route exists once. Members are single words, matching `createRelayServer`'s existing `{ url, requests, stop }` return.

## 4. Page loading

**An import map over the installed built entries, served on `127.0.0.1`. Not Browser Mode, not a bundle, not a packed consumer.**

The document carries `<script type="importmap">` mapping each `@orkestrel/*` specifier to `/modules/<name>/dist/src/core/index.js`, and `@orkestrel/ollama` to this workspace's own `dist/src/core/index.js`. The map is derived, never hand-written: `buildImportMap(root)` in `tests/setupServer.ts` reads each `node_modules/@orkestrel/*/package.json` and resolves `exports['.'].import.default`. Deriving it is what keeps it from drifting, and a hand-written map would silently omit a closure member the browser then fails to resolve.

Why this and not a bundle: it loads every root entry exactly as published, so a top-level side effect, a dynamic `import('node:…')`, or an unnamed global read surfaces as a real page error — the class `P1-closure-probe.md:33` names as outside its grep. A bundler would flatten those away and the proof would prove the bundler. The closure is the one P1 measured: ollama's runtime dependencies `agent`, `budget`, `contract`, `ndjson`, `tool` (`ollama/package.json:74-80`) and agent's own (`agent/package.json:72-83`), every root entry of which P1 read at 0 node imports and 0 process reads (`P1-closure-probe.md:10-21`).

**The DOM-mutating tool and how it proves the call ran in the page.** The page tool's handler appends an element carrying the argument the model chose and sets `document.title`. The test reads both with `page.evaluate` — `browser/tests/service/browser.test.ts:105` is the same read (`expect(await page.evaluate('document.body.dataset.clicked')).toBe('yes')`). The strong assertion is the cross-check: the appended text must equal the argument the relay recorded on the wire for turn two. That compares the DOM against a second mechanism rather than re-deriving it (`.claude/rules/tests.md:35`), it never pins model prose (`:154`), and it is unreachable by a scripted provider, because the page hard-codes no such value.

**One term for the tool definition.** `PAGE_TOOL: ToolDefinition` is exported from `tests/setup.ts` (host-independent, no DOM), serialized into the document by the fixture, and read back by the test for the wire assertion. The page script builds `createTool` from that JSON, so the name, description, and parameters have one source across the string boundary.

**The page script is a driver, not logic.** `page.evaluate` takes a string expression (`browser/src/core/types.ts:1075`), so the page-side code is an inline module in the served document — the same idiom `browser/tests/service/browser.test.ts:84` uses. It imports, constructs, runs, and parks a JSON outcome; every decision and every assertion stays in TypeScript in the test file. It exposes `globalThis.run()` returning a fresh promise, so a retry attempt is a fresh agent on the same document without refetching modules.

**The live proof retries the model's choice.** `ollama/tests/service/tools.test.ts:41-66` wraps every model-choice-dependent step in `retryUntil` bounded at 3 attempts with `RETRY_BUDGET`, because "the small 2B model does not reliably choose to call a tool on every single attempt" (`:28-29`). The page proof copies that wrapper and that prompt shape. A page proof without it will flake, and a flaky live gate is worse than no gate.

## 5. Gates

Every precondition is a module-scope hard throw in `tests/service/page.test.ts` naming its own fix. Nothing skips, per `.claude/rules/tests.md:151`.

| Precondition | Mechanism | Throws naming |
| --- | --- | --- |
| Daemon absent or model missing | existing, unchanged (`ollama/tests/setupService.ts:187-192`) | start the daemon and pull the model |
| Chromium-family browser absent | `requirePageBrowser()` over `findSystemBrowser` (`browser/src/server/helpers.ts:107`) | install Chrome or Edge, or set `PLAYWRIGHT_EXECUTABLE_PATH` / `CHROME_PATH` |
| `dist/src/core/index.js` absent | `requireBuild()` | run `npm run build` |
| Daemon refuses the page origin | `requireDaemonOrigin()` preflighting the ephemeral origin | set `OLLAMA_ORIGINS` |

**`requirePageBrowser` resolves on call, never at module load of `tests/setupService.ts`.** That module's `setupService.test.ts` proof runs in the `setup` project on every host under `npm test` (`ollama/package.json:56`), and a load-time browser requirement would make `npm test` need a browser. `browser/tests/setupService.ts:11-12` states that rule for itself; this design inherits it.

**Environment variables: no new ones.** Model and host stay `OLLAMA_MODEL` and `OLLAMA_HOST` (`ollama/tests/setupService.ts:7-10`). Browser discovery reads what `findSystemBrowser` already consults.

**Timeout: unchanged.** `service` already gives 120_000 ms per test and hook with no file parallelism (`ollama/vite.config.ts:123-125`); `warmOllama` holds the model resident with `keep_alive: '30m'` (`ollama/tests/setupService.ts:139`); `browser`'s own live launch budgets 20_000 ms (`browser/tests/service/browser.test.ts:58`). Change a runner setting only on a measured failure (`.claude/rules/tests.md:288`).

**`prepublishOnly`: already runs it** (`ollama/package.json:68`). No script change.

## 6. Units and order

See the `Units` section.

## 7. Exit criterion

X8 closes in full (`plan.md:39`), its last row moving from excluded to implemented per Re-baseline 2 ruling 2 (`plan.md:80`):

| X8 row | Disposition after this design | Closed by |
| --- | --- | --- |
| Node alone (`agent` `src:core`) | retained | existing; guide sentence landed in U2 |
| Page alone | implemented | U5, mcp distribution proof |
| Page-to-Node relay, scripted upstream | implemented | U5, mcp distribution proof |
| Real-model Node relay | retained | `ollama/tests/service/relay.test.ts:8-113` |
| **Real-model page relay** | **implemented** | **U13, this design** |

U13 closes when: a real Chrome or Edge loads the published ollama closure from an import map; an in-page `Agent` holding a page-defined DOM-mutating `Tool` completes a two-turn loop against the live daemon over a same-origin relay; the tool's DOM mutation equals the argument recorded on the relay wire; the page's CDP request log shows one model request per turn and nothing across the tool-execution window, with a positive control proving the log can report one; the direct-daemon page case settles a generation against `/api/chat`; every precondition throws rather than skips; and `ollama/guides/ollama.md` contract 13 states the gated reading instead of the manual one, with the § Tests row naming the file.

# Alternatives

**Alternative A — `playwright` with `@vitest/browser-playwright` in ollama, a new `src:browser` project, the page as Browser Mode test modules.**

Cost: two declared packages plus `configs/browsers.ts` (`.claude/rules/workspace.md:70-72`); a `src:browser` project mirroring a `src/browser` that ollama does not publish (`.claude/rules/tests.md:13-14`; `ollama/package.json:29-41`), which is the shape R5 already refused in agent (`plan.md:16`); a live daemon inside an environment project against `.claude/rules/tests.md:152`; and a bundler between the page and the published entry, which erases the unexercised-root-import class the proof exists to settle (`P1-closure-probe.md:33`). Request observation drops from CDP method-and-body to resource-timing names (`mcp/tests/setupBrowser.ts:165-173`).

Why the design wins: it needs zero configuration change, keeps the live external in the project the rules fix for it, and reads the network from a richer log.

**Alternative B — put the proof in `@orkestrel/browser`, adding `@orkestrel/ollama` as `browser`'s devDependency.**

It is genuinely tempting: `browser` already has the browser, so the addition lands where the machinery is and ollama declares nothing.

Cost: ollama's guide would point at another package's tree for its own contract 13 — the precise cost D1's own fallback named (`D1-design-planner.md:108`) and the reason `.claude/rules/documentation.md` § Parity puts the falsifying assertion where the prose claim sits. Worse, it makes a browser-automation package's `service` gate hard-require an Ollama daemon and a pulled model, so `browser` cannot publish on a host without a model. That inverts the dependency of the obligation: `browser` would answer for `ollama`'s claim.

Why the design wins: the gate lands on the package whose guide makes the claim, and neither package's release gate acquires the other's external service — ollama's already requires the daemon (`ollama/package.json:68`), and it merely gains a browser requirement it can name.

# Constraints

*(objective lane)*

# Refusals

*(objective lane)*

# Measurements

*(objective lane)*

# Units

| Unit | Role / engine | Owned files | Acceptance criteria (cheap first) | Depends on |
| --- | --- | --- | --- | --- |
| **U13a** — declare and install `@orkestrel/browser@^0.0.16` in ollama `devDependencies`; record the lockfile digest | Orchestrator (tracked command; the permission floor bars every role from installing) | `ollama/package.json`, `ollama/package-lock.json` | `npm ls @orkestrel/browser` in ollama resolves 0.0.16; `node_modules/@orkestrel/browser/dist/src/server/index.js` exists; no `dependencies` entry added | U6c closed (ollama has no live writer) |
| **U13b** — the page proof: setup helpers, their setup-project proofs, `tests/service/page.test.ts`, the guide | `implementer` / **Opus 5**, native Claude subagent, ollama checkout | `ollama/tests/setup.ts` (add `PAGE_TOOL`), `ollama/tests/setupServer.ts` (add `buildImportMap`, `createPageFixture`, `PAGE_DOCUMENT`; factor the shared relay dispatcher), `ollama/tests/setupService.ts` (add `requirePageBrowser`, `requireBuild`, `requireDaemonOrigin`, `PAGE_BROWSER_ARGS`), `ollama/tests/setupServer.test.ts`, `ollama/tests/setupService.test.ts`, `ollama/tests/service/page.test.ts`, `ollama/guides/ollama.md` | `format:check` and `lint:check` clean on owned files; `npm run check` green; `npm run test:setup` green (proves the new setup exports and that no new load-time throw entered `setupService.ts`); `npm run test:guides` green; `npm run build` green; then **observations**, not criteria: `npm run test:service` output with per-case timings, and the CDP request log for the tool-execution window | U13a; parallel with U5 (disjoint checkouts) |
| **A13** — audit U13b | `analyst` / **GPT-6 Astra** (cross-engine, read-only) + `reviewer` / **Opus 5** + `checker` / Grok→Luna→Sonnet ladder | none (read-only) | Per-claim verdicts under `orkestrel-falsify`; the brief supplies the diff, `git status`, and the full `test:service` output, because neither lane can launch a browser or reach the daemon | U13b |
| **V13** — authoritative gates | `verifier` / **Sonnet** | none | `format:check → lint:check → check → build → test`, then `test:service`, in ollama, exit codes read | A13 resolved |

**Routing note.** U13b cannot run on a bench. `.agents/orchestration.md` § Bench laws rule 5: a bench sandbox denies a grandchild process and gives a spawned child unreliable stdio, and it names the failure mode as a **false green**. `createBrowser` launches Chrome as a grandchild of the exec and drives it over a CDP socket, so an Astra exec would produce a passing run that never armed the browser. This is the same reasoning R15 used to route U5 to the native implementer (`plan.md:26,62`). Astra audits instead, on the supplied evidence.

**Boundary with U5, so neither unit writes the other's proof.** U5 keeps the page-side relay receipt with a scripted upstream and owns X5, X6, X7 (`plan.md:62`). U13 takes only the real-model page relay and the direct-daemon page case, and adds no MCP, no `createPageServer`, and no WebMCP surface.

**Landing order.** Ollama is the last layer (R14, `plan.md:25`), so U13 lands after the tool, mcp, and agent commits, and its `test:service` runs inside ollama's `prepublishOnly` at the release.

# Tensions

Named for the objective lane to challenge, or for the Orchestrator to rule.

1. **Including the direct-daemon case at all.** It adds a host precondition (`OLLAMA_ORIGINS`) that the relay case does not need, and a host where the daemon refuses loopback origins now reddens ollama's service gate. I judged that correct because contract 13 asserts the direct path in prose (`ollama/guides/ollama.md:124`) and a host where it fails is a host where the guide is false. The objective lane may rule that the honest move is to soften contract 13 instead and gate the relay alone.
2. **`@orkestrel/browser` over `playwright`.** Playwright is the fleet's established browser machinery in seven packages (`G8b-browser-test-layouts-distillate.md:7-17`); `@orkestrel/browser` has never driven a test outside its own repository. I weighted the zero-configuration `service` fit, the CDP request log, and the phase-two evidence above that maturity gap. The counter-argument — that the campaign's last proof is a poor place to field a package for the first time — is real.
3. **The page script as a served string.** It is not typechecked, so a rename in `@orkestrel/agent` breaks it at `test:service` rather than at `npm run check`. I accepted that because `page.evaluate` takes a string by contract (`browser/src/core/types.ts:1075`) and because `PAGE_TOOL` removes the drift where it matters most, but the objective lane may prefer a compiled page entry despite the build configuration it drags in.
4. **Extending `createRelayServer`'s neighbourhood rather than adding a second server helper.** I chose one shared dispatcher builder under two exports to satisfy `.claude/rules/tests.md:182`. That edits a file whose existing exports `tests/setupServer.test.ts` already pins, so the unit must keep those proofs green rather than rewrite them.
5. **`retryUntil` around a page attempt.** Reusing `tools.test.ts`'s bounded retry (`ollama/tests/service/tools.test.ts:41-66`) means a case can pass on its third attempt. That is the fleet's accepted treatment of a 2B model's tool choice, but it does weaken "the model called the tool" into "the model called the tool within three attempts", and the guide sentence must say so.

**Readings the design needs that the dispatch did not supply:**

- Whether `page.evaluate` resolves a promise parked on `globalThis` in a module scope. `browser/tests/service/browser.test.ts:121` resolves a promise-valued expression, which is close but not the same read.
- Whether Chromium honours an import map in a document served over `http://127.0.0.1:<ephemeral>` with entries under a subpath. Standard behaviour, unrun here.
- Whether the Ollama daemon on this host answers a preflight for an ephemeral `http://127.0.0.1:<port>` origin. The brief supplies "CORS open to localhost origins" as a standing fact and forbids probing; the design's direct case rests on it.
- Wall-clock for a browser launch plus a two-turn live tool loop on `qwen3.5:2b-q4_K_M` against the `service` project's 120_000 ms cap. Per `.agents/orchestration.md` § Writing concurrency rule 10 this reading belongs to the Orchestrator after U13b exits, never to U13b.
- `U5-mcp-distribution-brief.md` is named in the brief's evidence list and is not on disk; the campaign folder holds `U4c-mcp-browser-fix-brief.md` and no `U5*` file. The U5/U13 boundary in `Units` is therefore drawn from `plan.md:62` alone and needs the Orchestrator's confirmation before U13b launches.

# Risks

| Risk | Evidence that settles it |
| --- | --- |
| The served closure fails to evaluate in a page — a top-level side effect or an unnamed global read that `P1-closure-probe.md:33` states it could not see. This is the proof working, not failing, but it turns a proof unit into a fix unit in `agent` or a dependency. | Load the document with the import map and no agent, and read `page.emitter` `error` and `console`. Take that reading first, before any scenario, so a closure defect surfaces as itself. |
| `@orkestrel/browser` 0.0.16 cannot drive this scenario — a CDP gap in `evaluate`, the `request` hook, or page lifecycle. Its live suite proves navigation, locators, routes, snapshots, and PDF (`browser/tests/service/browser.test.ts:43-130`) but never an ES-module page with an import map. | A throwaway probe under `ollama/tmp/probe/`, run before U13b's brief is written: launch, serve a two-module import-map document, read one `request` event and one `evaluate` result. `.claude/rules/tests.md:92-121` governs it; promote or delete. |
| The recorder over-reports and the zero-request window is never actually empty — a favicon fetch, a module prefetch, or a keep-alive revalidation lands mid-window and the case reads as a product defect. | The drain's mark-and-slice discipline plus the `/control` positive control. Where a stray request persists, record its `resource` field from `BrowserRequest` (`browser/src/core/types.ts:1115`) and filter by that field rather than widening the window. |
| The direct case's preflight makes a count-based assertion fail and the failure reads as a code defect. | Assert by filtering on method and URL, never on a total. Record the preflight's presence as an observation in the report so the next reader is not surprised. |
| Guide drift: contract 13 rewritten as a gated claim while the gate covers less than the sentence says — the failure mode `.claude/rules/documentation.md` § Parity names ("prose rulings survive because nothing tries"). | `checker` in A13 reads each clause of the rewritten contract 13 against a named assertion in `tests/service/page.test.ts`, and the § Tests row against the file. A clause with no assertion is struck from the sentence, not left standing. |
| `@orkestrel/browser` later depends on `@orkestrel/agent` in phase two, and the dev edge ollama now declares becomes part of a longer chain nobody re-derived. | No cycle exists today (`browser/package.json:88-93` names html, emitter, contract, websocket) and none would arise, but record the edge in the landing commit so the phase-two design round reads it rather than rediscovering it. |
| A wedged browser process outlives a failed case and the next case's launch collides with it, producing a failure that reads as the subject's. | Every case destroys its browser in `finally`, as `browser/tests/service/browser.test.ts:36-41` does in `afterEach`. `fileParallelism: false` (`ollama/vite.config.ts:125`) already prevents concurrent launches within the project. |
