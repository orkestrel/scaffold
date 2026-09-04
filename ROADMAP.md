# ROADMAP

The plan of record after the ROADMAP-rows campaign of 2026-08-25. That campaign published
scaffold 0.0.52, registry-confirmed the same day, and closed its adoption wave the same day —
every fleet target re-pinned, repaired, gated green, and pushed. It closed the scaffold, fleet,
test, mcp, middleware, html, process, and brief rows the previous revision carried, through
implementation, cross-engine audit, the setup-proof wave over every published package, and the
mcp 0.0.23, brief 0.0.6, and probe 0.0.5 releases. A same-day row-completion pass then closed the
package rows through committed implementation on each repository's `main`, leaving in § 1 only
the rows whose triggers have not fired. This file owns everything still open. Campaign detail is
recoverable from git history by hash; no campaign folder is the plan of record.

## 1. Package work, scheduled by each package's next natural release

- **scaffold**: the instruction canon stops reaching targets, so every fleet repository owes one
  adoption visit. The trigger is the scaffold release that ships the split. Per repository: re-pin
  `@orkestrel/scaffold` and install, run `scaffold overwrite`, and run the gates. That one run takes
  the `AGENTS.md` and `CLAUDE.md` pointers and deletes every tracked copy the target still holds at a
  canon path, so a second `scaffold audit` in the same visit exits `0`. The step lives in
  `.agents/skills/orkestrel-publish/references/wave.md` § Visit a repository.
- **scaffold**: the canonical `setup` Vitest project is node-only (`environment: 'node'`,
  `browser: { enabled: false }`) while `scaffold audit` demands a `tests/setupBrowser.test.ts` proof
  for a module that sets `data-bs-core` on the document, loads Halfmoon, and opens IndexedDB;
  measured 2026-09-02 in `terrain`, whose `vite.config.ts` carries a browser-enabled `setup` project
  and reads `stale` until the template moves. Rule whether a workspace carrying
  `tests/setupBrowser.ts` receives a browser-enabled `setup` project or the browser proof joins a
  project the plan already runs in a browser, then move the template and the audit together.
- **fleet**: an entry module's `@packageDocumentation` never reaches the published declaration
  rollup — the build pipeline hands API Extractor a synthetic comment-free entry file, measured
  2026-08-25 in the test repository against a byte-identical rollup. Rule whether the pipeline
  adopts the real entry declaration, at a toolchain revisit.
- **probe**: a mintty-backed TTY fixture where `/usr/bin/script` is absent stays Windows-host
  work; the trigger is the first Windows campaign that runs the bin suite there. The Linux
  acceptance recorded 2026-08-24: the `script`-guarded proofs execute rather than skip on this
  host — the bin suite passes complete with no skipped case. Two defects reproduced 2026-09-02
  in `terrain` (Vitest 4.1.11, Playwright Chromium) keep `prove` off every browser project: the
  runtime stage matches the inferred project name exactly while Vitest names a browser instance
  `<label> (<browser>)`, and it creates the specification on the `threads` pool, so with the name
  patched the browser project's setup file ran in a Node worker and died at
  `document is not defined`. The trigger is the first campaign that needs a receipt on a rendered claim; until then
  `orkestrel-prove-journey` routes rendered questions to a written browser-run artifact.
- **test**: successor seams from the skills campaign accepted 2026-09-02. A winning-declaration
  reader (`readOrigin`: which rule won a property and which authored rules it beat) has no
  platform door; the probe is whether the Vitest Playwright provider exposes a CDP session a
  custom command can drive `CSS.getMatchedStylesForNode` through, and the reader ships only if
  that probe lands. `elements` and `veneer` still declare the statechart contract locally;
  `veneer` registers `describe`/`it.each` inside its `runScenarios(label, create, scenarios)`,
  so adopting the published `executeScenarios` rewrites its call sites; the trigger is each
  repository's next hardening visit. A glyph-to-meaning registry stays skill prose until a fleet
  surface ships a status glyph set.
- **contract**: successor seams from the memoization campaign accepted 2026-09-01 (contract
  950a241). Working-state churn: `ShapeValidator` constructs fresh collections per `validate` call
  through its `#clear` method, and `ShapeCloner` and `SchemaCloner` keep per-instance `#empty*`
  peers — the idiom `ContractCompiler` left at that campaign, so sibling engines in one directory
  carry one member vocabulary for two mechanisms; the trigger is an allocation-rate measurement
  attributing material time to the churn, or the package's next hardening campaign. Ledger
  semantics: a compiled door invoked synchronously from inside another door's walk joins the outer
  call's scope, while `guides/contract.md` documents reuse as holding within one call; rule on the
  wording or the mechanism at the ledger capability's next change. Test coverage: the reporter
  family carries no cross-call memo case. Declarations: `INTRINSICS.recall` publishes an
  `any`-shaped return, and `createContract` carries no `@throws` tag while the `contain` TSDoc
  states that population carries one. Fleet: the catalog row for `@orkestrel/supervisor` pins
  `@orkestrel/contract` at `^0.0.11` against the fleet's `^0.0.13`; confirm against that
  repository's own manifest before sequencing any contract cascade. Successor seams from the
  performance campaign accepted 2026-09-01: the promoted tracking ledger's reuse is unproven by the
  suite — deleting the slot-to-map carry-in or the recall block keeps every test green, and only a
  work-counting assertion over per-node reads can pin it; carrier is the published per-node read
  bound. `oneOf` diagnostics still run every variant plan before their tally where the compiled
  guards already exist; a guard-first tally is the remaining union seam. The internal snapshot
  freezes cost 47 ns per call on a five-key object, measured and unclaimed behind documented frozen
  returns. The u2fix hostile-pre-load probe suite is retained in the campaign archive and promotes
  if the workspace ever takes a hostile-intrinsics test project. Successor seams from the
  paired-harness performance campaign accepted 2026-09-01 (contract c13cfae): the refined-leaf
  capture row is closed for strings — `createStringFaults` takes an optional pre-captured pattern,
  and the compiled auditor, the compiled reporter, and `stringOf` capture it through `ownPattern` at
  compile time — while `createNumberFaults` keeps its signature and reads `min` and `max` from the
  shape per call; the trigger for the same capture there is a measurement attributing material time
  to those reads. The lazy fault-path row is refused on measurement: an honest trail form that
  materializes the path at every fault, every container `readValue` context, and every refined-leaf
  helper call reads 1.07–1.11 on the audit families in 6 fresh processes against the tree without
  it, so the per-field `pathOf` copies stay, and the baseline's habit of publishing the caller's
  root `path` array by reference in root-level faults is recorded, not changed. The masked auditor's
  extra-key scan through `matchesMember` reads 0.96–0.97 when gated on the presence pass, inside the
  harness's admission bar, though `positions` and the declared vocabulary are provably one key set
  (an absent child shape is refused at validation through every door); a form that drops the `Set`
  for the record is the remaining seam. The folded array guard (0.976 and 0.972 on the
  single-process paired instrument), the untracked ledger (ceiling 0.95–0.98 on the same
  instrument), and a lazy fault-array slot (a clean container returns a fresh array either way) are
  refused on measurement or by construction. The `oneOf` guard-first tally stays refused on the
  every-door-reads rule, and the reporter-versus-`parse` law holds on coercible values by probe. The
  compile tier stays excluded on the documented eager lockstep. The shape-builder tier is measured
  and unopened: `stringShape()` 15.6 µs, `objectShape` of the five-key fixture 76.6 µs,
  `compileGuard` 82.5 µs, `createContract` 114.6 µs on node 22.22.2, where the `ShapeValidator`
  clear-twice churn is the first station to attribute. The `Result` allocation class stays excluded
  on the memoization campaign's 0.992 reading (contract 950a241). The `readValue` success-path
  deferral and the compiled doors' captured-pattern wire have no suite guard by construction (each
  is unobservable from the published surface: every compiled door refuses a shape whose `pattern` is
  an accessor, and the clone the leaves read carries an internal one) and rest on the campaign's
  paired A/B and the retained wire probes. The compiled doors' plan-time `pattern` refusal is
  unreachable while `ShapeCloner#captureString` mints the clone's pattern from captured strings; a
  change there surfaces a `compileAuditor`-named message from `createContract`. The paired harness
  runs 6 fresh processes with load order swapped: identity medians read 1.004–1.029 with replicates
  spread between 0.945 and 1.087, a planted 6 % slowdown reads median 1.063 with every replicate at
  or above 1.030, and the admission rule is median ≤ 0.95 with every replicate ≤ 0.98 on the target
  family; a host with a different noise floor re-certifies the bar with its own identity and
  planted-slowdown runs before reusing it. The accepted tree's readings and the identity control sit
  in the scaffold commit that accepted the campaign. The guide's prose carries seams for its next
  edit: a `below` cross-reference in the membership section's load-order precondition, a `both`
  naming no members (the phrase `both accessors of RegExp.prototype`), the `createStringFaults` row's
  read-count sentence whose condition sits in an elided final clause, the membership paragraph
  closing on its own editing history, imperative TSDoc summaries across `helpers.ts` where the rule
  asks the third person, and the aphoristic register the guide and the test comments share, which a
  design round rules on.
- **fleet publish wave**: every published package carries unpublished conformance, breaking, and
  voice changes on `claude/orkestrel-npm-audit-deps-14ibta` (closed 2026-09-02), and the owner
  holds publishing. The trigger is the owner's release decision. Per the `orkestrel-publish`
  skill: re-pack from the accepted tips, restore each registry copy before its distribution proof,
  publish in the layer order the `scaffold catalog` table regenerates, then re-pin each dependent
  and refresh its vendored guide mirrors layer by layer. Scaffold publishes on its own account
  first, because its vendored host surface moved (the `names.md` vocabulary, the `tests.md` helper
  names, and the 2026-09-02 debrief refinements), and every target's adoption visit then runs
  `scaffold overwrite` under the row above.

## 2. Design and research records

- **Guide mirrors track upstream `main`, not the catalog release.** `Upstream` fetches guides
  from `raw.githubusercontent.com` on `main` and versions from `registry.npmjs.org`, so the
  two are independent by construction: between publishes a mirror is the branch's content and
  nothing more, and mirror bytes are never evidence for the version the catalog names.
  Publish a dependency before publishing any package that refreshes and ships its guide.
  Revisit a release-pinned mirror only when the fleet publishes a stable per-release ref.
- **Sweeps with no honest mechanical form**: the model-routing and version-catalog sweep stays
  review-owned, because the version-catalog half has no membership rule separating a catalog table
  from a permitted version value and every mechanical form tried reds a healthy reference. The
  landed template-TODO instrument scans literal `TODO` occurrences outside inline backtick spans
  and fences indented no more than three spaces in canonical `SKILL.md` files, the
  `references/*.md` files they name, and matching provider-bridge `SKILL.md` files. The landed
  strict skill-directory inventory admits `SKILL.md`, `agents/openai.yaml`, the direct
  `references/*.md` files named by `SKILL.md`, and only the `agents/` and `references/`
  directories.

## 3. Supervisor backlog

Consolidated 2026-08-25 from the supervisor repository's `ROADMAP.md` and `.orkestrel/PLAN.md`,
which this consolidation retires; the supervisor repository keeps no separate plan file. Rows
proved implemented or stale were pruned with the evidence dated here.

### Standing owner instructions

- The `enterprise-bootstrap` skill governs every design and style unit.
- The focus ring is off by ruling (`--app-focus-width: 0`); re-enabling is one token.
- The muted-tone removal across the browser files is the owner's intentional design; never revert.
- In upstream fleet repositories a supervisor session implements fixes and commits nothing — the
  owner reviews raw diffs, then bumps and publishes. Supervisor's own repository keeps normal
  checkpoint-commit discipline.
- The owner publishes; republish requests and readiness surface and wait.
- An environment-impossible test can be capability-gated (owner-authorized precedent).
- Scaffold writing verbs refuse this workspace over its custom Vitest projects; align by
  `scaffold audit` plus manual edits.
- `npm run seed` fills a running loopback dev server with five real demo workflows; re-seeding is
  a server restart, because the registry retains ids durably.

### Live handles

- **The next supervisor publish is a breaking bump.** The committed 0.0.2 manifest deletes the
  published `ProviderCommand` export and moves `ProviderInterface` return types to the package
  `ProcessCommand`; the registry serves 0.0.1 (read 2026-08-25). The owner decides timing.
- **Session hygiene**: the operator's bearer and `.supervisor.local` contents entered a
  conversation transcript on 2026-08-19; delete `.supervisor.local` and restart the server to
  rotate when convenient.

### Unblocked

- **`HumanPrompt` deletion** — the gate opened: `@orkestrel/terminal` 0.0.12 ships per-ticket
  `stop` (read 2026-08-25). Delete the wrapper and route `ApplicationRuntime` at the package,
  and strike the matching stays-app ruling with it.
- **`matchesFuzzy` adoption** — import it from `@orkestrel/database`, delete the
  `app/core/helpers.ts` copy, and keep `matchesRunName` as the app's domain alias.
- **Bind gate on the bound address** — verify the provisional-bind gate in `ApplicationServer`
  against `isAddressInfo` from `@orkestrel/server`, then drop the resolve-once workaround.
- **`createAssets` adoption** — move the encoding and SEA-blob half of `createApplicationAssets`
  (`app/server/middlewares.ts`) onto `@orkestrel/middleware`.
- **Contract leaf deletion** — delete the local `isNonNegativeNumber`, `isNonNegativeInteger`,
  `isBoundedJSONValue`, `isBoundedJSONRecord`, and `matchesJSONDepth`; import them from
  `@orkestrel/contract`.
- **Prompt-leaf convergence** — replace the app-local prompt leaves with their `@orkestrel/form`
  equivalents. `PromptCodec`, `parsePromptJSON`, and the `Prompt*Contract` types stay app-owned.
- **SEA compression redirect** — rule whether `@orkestrel/sea` embeds compressed output by
  default; delete the `scripts/sea.ts` `on.compress` hook if it does, refresh its stale version
  comment if it does not.
- **Workflow result surfacing** — `SupervisorApplication.#fulfilled` drops the result's `durable`
  and `fault` fields; surface both.
- **`objectOf` adoption** — rule the root-type nuance, then move `isAgentProvider` and
  `isCLIBackend` onto the `objectOf` combinator from `@orkestrel/contract`.
- **Journey-layer adoption** — replace the hand-rolled journey helpers in `tests/setupBrowser.ts`
  with the published `@orkestrel/test` browser layer, renaming the local focus-ring `readFocus` in
  the same unit.
- **`ProcessOptions.delivery` adoption** — adopt it where each consumer meets stdin-delivery
  failure, and close the `CLIProvider` race between `ProcessOptions.on` registration and early
  child output; the timeout backstop retires only after that adoption. The mcp half closed
  2026-08-24: the stdio client transport carries a defaulted `delivery` bound with the
  send-failure voice split and executed pins.
- **First-unparseable-line policy** — rule whether a stream's first non-JSON line fails fast or
  accumulates, and pin the ruling.
- **`claude.mjs` orphan fixture** — `tests/app/server/fixtures/claude.mjs` orphans itself on
  every run: it blocks on `for await (const chunk of process.stdin)`, so a spawn whose stdin is
  never closed parks it forever. Measured 2026-08-23: one instance had survived 7h46m holding
  57MB, and a fresh run leaked another within seconds. The fixture needs its stdin closed by
  whatever spawns it, or a guard that exits when stdin is not a pipe.

### Gated

- **`createViewer` in `@orkestrel/server`** — gate: the owner schedules the package campaign. The
  app-local viewers carry the work until it lands.
- **Bridge absorption** — gate: a second `AgentExecutor` consumer. Until one exists the published
  asset is the documented recipe against `ExecutorInterface`.
- **Vendor-dialect home** — gate: the taverna second-consumer answer. Decide a sibling `agent-cli`
  package against stays-app.
- **Same-directory lease `CONFLICT` handoff** — gate: the owner's ruling on whether the lease
  refusal routes through the busy-port handoff that opens the running instance.

### Design rounds owed

- **Cross-process ledger wakeup** — an event-driven signal-file watcher against keeping enforced
  single-process ownership as the whole answer.
- **Workflow read scope** — whether a workflow declares extra read-only directories, who
  authorizes that scope, and how the UI shows it.
- **Record layer** — a failed `executor.launch` leaves a durably `running` intent with no
  observation, and a bail-halted phase records settled siblings `skipped`.
- **Production interleaving** — whether the shipped supervisor and workflow pair interleave over
  one driver in production. The answer decides urgent against latent.
- **Agent-lane settlement** — whether the Ollama executor emits a settlement observation, so the
  settlement card renders on every lane rather than CLI lanes alone.
- **Showcase drift guard** — pick the cheapest honest guard for the committed
  `demo/showcase.html` build output.
- **Durable artifact channel** — a product-level artifact channel beside the journal and the
  transcript, for long runs whose working state otherwise lives only on ephemeral disk.
- **Relation adoption** — re-evaluate when the brief record grows record sets or junctions that
  pay for a batched read layer.

### Defects and hardening

Each row closes with a red-first proof where a test can hold it.

- **Two Attempts numbers** — probe whether `facts.attempts` and the lineage-matched durable rows
  in `TaskView.vue` can diverge; unify or document.
- **Two absence voices** — Workflow and Phase keep an empty matrix's section while Task deletes
  it; pick one habit.
- **Attempts matrix churn** — the `v-if`-gated matrix in `TaskView.vue` matters only if durable
  rows can disappear; prove or simplify.
- **Busy-focus on the in-flight save** — decide whether `SetupPanel`'s disabled busy submit parks
  focus deliberately.
- **Six-surface secret sweep** — audit stderr, stdout, error contexts, responses, static assets,
  and child environments against every generated secret, with a planted-secret control per
  detector.
- **Surrogate-pair cut** — `describeValue` (`app/browser/helpers.ts`) can slice a surrogate pair;
  travels with the bounded-voices change.
- **Agent-deadline proof** — replace the polling proof in `ApplicationRuntime.test.ts` with a
  live-stream wait that needs no raised limit.
- **`parseApplicationKeep`** — validate the duration grammar, or state the pass-through in the
  TSDoc.
- **Fixture consolidation** — merge the duplicate snapshot fixture in `tests/setup.ts` and
  `tests/setupBrowser.ts`.
- **Contrast settled-state reading** — the contrast proof (`tests/app/browser/integration.test.ts`)
  names no settled state; add it.
- **`waitForRecorder`** — replace the polling loop in `tests/setup.ts` with an event-parked wait.
- **Guide wording** — `guides/src/supervisor.md:3321` promises "two bars it owes" and names one;
  repair with the next guide edit.
- **TSDoc voice** — rewrite the imperative first sentences in `app/server/helpers.ts` and the
  secret factories in `app/core/factories.ts` to the third person.

### Stays app (do not relitigate without new evidence)

- The session and CSRF adapters, `MCPProjection` and its tool schema, the operator reload stores,
  the `Client` and `LiveStream` shell, the projection leaves, the runner, the workspace executor,
  and the `PromptCodec` string-reply seam.
- The ticket statuses `pending`, `answered`, and `stopped`. Terminal's `expired` stays refused,
  because the ledger's `prune` deletes an aged ticket instead of marking it.

## 4. Forward work from the conformance campaign

The publish wave and the next conformance matrix carry the open items from the
conformance campaign on `claude/orkestrel-npm-audit-deps-14ibta`. Each row
closes on the condition it names.

### The publish wave's obligations

- **scaffold**, **test**, and **form**: merge `origin/main` into the branch,
  re-pack, re-stage, and re-pin before packing (`HANDOFF.md:217-220`).
- **scaffold**: publish first. Every target re-pins `@orkestrel/scaffold` and
  runs `repair`, so the vendored host — the `names.md` vocabulary, the
  `tests.md` helper names, and the single-literal `as const` rule landed as
  `17e00993` — reaches it (`followons.md:64`, `followons.md:85`).
- **scaffold**: after the `@orkestrel/guide` re-pin, `tests/guides.test.ts:132,140`
  reads `symbol.keyword` (`followons.md:98`).
- **indexeddb**: `scaffold repair` leaves `configs/browsers.ts` matching the
  published scaffold (`followons.md:12`).
- **fleet**: each `lint` script is `oxlint --config .oxlintrc.json --fix .`;
  `--deny-warnings` stays on `lint:check` (`followons.md:36`, `followons.md:66`).
- **codec**: the registry tarball exports `encodeHex`. **server** re-pins to
  that release before its own gates and publish (`followons.md:41`,
  `followons.md:70`, `conform-server-audit-verdict.md:25`).
- **lsp** and **scaffold**: `npm run test:distribution` exits 0 on the
  publishing host (`followons.md:64`, `conform-lsp-audit-verdict.md:22`).
- **ollama**: `npm run test:service` exits 0 on a daemon host (`followons.md:93`,
  `conform-ollama-audit-verdict.md:17`).
- **fleet**: refresh these vendored mirrors from the released guide, byte copy,
  never a rewrite: `guides/guide.md` (no `symbolKey`, `missingSymbols`,
  `exportsFrom`, `hiddenFrom`, `ExportKind`, or `{ name, kind }`); `guides/queue.md`
  in worker, workflow, agent, and probe (no `QueueExecution`); `guides/server.md`
  in ollama, middleware, toolbox, and mcp; `guides/workspace.md` in agent,
  toolbox, and ollama; `guides/emitter.md` in each emitter consumer;
  `guides/websocket.md` in mcp and browser; `guides/sqlite.md` in database;
  `guides/probe.md` (no `createRevisionFile`); `guides/reason.md`,
  `guides/contract.md`, `guides/emitter.md`, and `guides/guide.md` in rater;
  `guides/terminal.md` in each terminal consumer (`followons.md:18`, `:26`,
  `:38`, `:48`, `:49`, `:53`, `:54`, `:69`, `:84`, `:88`, `:98`;
  `conform-terminal-audit-verdict.md:23`).
- **middleware**: the publish notes name the removed `UploadedFileInput` type
  and the renamed `multipartBoundary` option (`followons.md:15`).
- **timeout**: the publish notes name `Timeout.id` and `Timeout.ms` as
  prototype getters (`conform-timeout-audit-verdict.md:12`).
- **worker**: the bump ruling names `spawnThread` → `createThread`, `dispatch`
  → `Dispatch`, and `QueueExecution` → `QueueContext` (`followons.md:73`).

### The next conformance matrix's rows

- **abort**: transcribe the `README.md:29,34` Usage fence into
  `tests/guides.test.ts` with `README.md` in `ROOT_FILES`; rule what a
  transcription's presence guards bind and apply that rule; rule the `Abort`
  `id` and `signal` public `readonly` fields against § Class order with the
  `JSON.stringify` bound (`followons.md:89`, `conform-abort-audit-verdict.md:16`).
- **browser**: add tests for the `buildInstallPaths`, `buildWindowsRoots`, and
  `buildStoreBases` helpers; `probePathNames` checks the resolver line's file
  type; the `createAttachedPage` and `readCDPParams` proofs in `tests/setup.ts`
  fail without those helpers; the `tests/setupServer.ts:455` comment drops the
  claim word; rule whether a `service` target owes `scripts/service.sh`
  (`followons.md:50`, `:58`, `:63`, `conform-browser-audit-verdict.md:19-20`).
- **codec**: each `MEMBERSHIP` row's `reason` field has an executed assertion
  that names the refusing rule (`followons.md:92`,
  `conform-codec-audit-verdict.md:19`).
- **contract**: the guide twins of repaired TSDoc blocks and the past-revision
  comments at `src/core/combinators.ts:206,811-814` match the source; count
  residue at the report's `src`, `guides/contract.md`, and `tests` sites is
  ruled by sense; `category` at `src/core/ShapeValidator.ts:749` is `keyword`;
  campaign control identifiers are gone from the report's test names;
  `guides/contract.md` has no banned-sense residue outside that row's `src`
  set (`followons.md:28`, `conform-contract-audit-verdict.md:20`).
- **csv**: `tests/distribution.test.ts:159` uses `isObject` from
  `@orkestrel/contract`; the title at `tests/src/core/helpers.test.ts:850`
  matches the substitution table (`followons.md:27`,
  `conform-csv-audit-verdict.md:15`).
- **emitter**: `tests/guides.test.ts` transcribes the Surface fence at
  `guides/emitter.md:11-32` with presence guards; `feed.clear('post')` at
  `:196` has a second event so "only `post`" is distinguishable, an assertion,
  and a guard (`followons.md:38`, `conform-emitter-audit-verdict.md:21`).
- **fleet**: after the budget getter repair, each package whose `id` is a
  prototype getter has the same `JSON.stringify` shape the budget unit
  documented, or a test that pins it (`followons.md:3`). The `key: () => …`
  property-arrow shape across `tests/**` is a module-scope factory or method
  syntax (`followons.md:87`, `conform-agent-audit-verdict.md:25`). Timer
  lower-bound assertions in workflow, timeout, abort, budget, and queue admit
  one timer grain of tolerance, or take the start reading from the clock the
  timer arms on (`followons.md:74`).
- **guide**: the `DeclarationKeyword` doc phrasing, the `sources()` `@example`
  showing identity, and the `sources.sources()` fence comment describing a
  value, each closed by the next matrix's subjective lane (`followons.md:54`,
  `conform-guide-audit-verdict.md:29`).
- **indexeddb**: the substitution-table hit at `src/browser/types.ts:42` is
  gone; after a clean `commit()`, `IndexedDBTransaction.store(name)` does not
  throw `ABORTED`; the store-cursor seek case captures `onSeek.cause`, asserts
  a `DOMException`, and aligns `src/browser/types.ts:299-301` and
  `guides/indexeddb.md:296` with what Chromium reports (`followons.md:34`,
  `conform-indexeddb-audit-verdict.md:12,13,16`).
- **lsp**: the next matrix records what the `lsp-obj-6` generation proofs pin
  after the binding form removed the release check; the decode accumulator at
  `tests/src/server/fixtures/protocol.mjs:10` is not module-scope mutable state,
  or a design round keeps it (`followons.md:51`, `:57`,
  `conform-lsp-audit-verdict.md:23`).
- **msg**: the leftover `const data` bindings at
  `tests/src/core/helpers.test.ts:268,272,276,280`, the private `mutable`
  binding at `src/core/MSG.ts:770-802`, the msg-subj-13 sites, and the
  msg-subj-8 sibling vocabulary (`MSG_S_BIG_BLOCK_MARK`, `MSG_L_BIG_BLOCK_SIZE`,
  `MSG_L_BIG_BLOCK_MARK`, `guides/msg.md:79`) are gone or renamed
  (`followons.md:29`, `conform-msg-audit-verdict.md:17`).
- **ndjson**: each `clear()` fence inserts
  `expect(parser.parse('{"partial"')).toEqual([])` before `parser.clear()`;
  `guides/ndjson.md:46,51,84` spell `ReadonlyArray<Record<string, unknown>>`,
  the presence-guard string at `tests/guides.test.ts:221` matches, and the
  substitution note at `:176-181` is gone (`followons.md:32`, `:33`,
  `conform-ndjson-audit-verdict.md:13-14`).
- **ollama**: `OllamaHTTPError.status` does not carry `0` as a no-response
  sentinel (`src/server/errors.ts:12`, `guides/ollama.md:100`); `readonly name
= 'ollama'` at `src/server/OllamaProvider.ts:82` is ruled with the fleet
  public-`readonly` row (`followons.md:94`, `:95`,
  `conform-ollama-audit-verdict.md:18`).
- **probe**: `tests/setupServer.test.ts:113-115` uses `readChildEnding`
  (`followons.md:84`, `conform-probe-audit-verdict.md:24`).
- **program**: the tagline at `guides/program.md:30` names the published
  specifier, not `@src/core`; Surface and helper-table descriptions at `:182`
  and `:286-287` are noun phrases (`followons.md:79`,
  `conform-program-audit-verdict.md:33`).
- **queue**: `src/core/validators.ts:51` drops the redundant
  `isFiniteNumber(value) && isInteger(value)` conjunct (`followons.md:36`,
  `conform-timeout-audit-verdict.md:15`).
- **router**: the tally at `tests/src/core/parsers.test.ts:11` names the
  methods or drops the number word; the tally at
  `tests/src/core/Router.test.ts:462` names the files or drops the number word
  (`followons.md:62`).
- **scaffold**: `scripts/deps.sh` rewrites `node_modules` only when a Claude
  Code-only variable is set beside `CLAUDE_CODE_REMOTE`, and it refuses to
  rewrite a tree whose `.package-lock.json` is newer than the lockfile; rule
  whether `scaffold audit --offline` prints the `integration` advisory, and
  whether websocket's `tests/integration.test.ts` file is the seed it
  describes; `.agents/orchestration.md` § Permission floor states the
  planted-file-surface exception (`followons.md:16`). The
  `tests/distribution.test.ts` generator template uses `isObject` from
  `@orkestrel/contract`; the `tests/guides.test.ts` drop-in header names the
  constants block and the package fence suite, and every fleet package that
  still carries the old header matches it; `.claude/rules/tests.md` states
  that a presence guard carries every fence input and documented value a
  transcription reuses, and that a test binds forbidden input at `unknown`,
  proves the refusal at the guard, and reaches the throwing call only with a
  value the signature admits (`followons.md:20`, `:45`, `:49`, `:60`,
  `conform-html-audit-verdict.md:26`, `conform-relation-audit-verdict.md:21`).
  The dead `beforeWriteFile` branch at `configs/src/vite.server.config.ts:5-19`
  is gone; the causal `since` at `tests/distribution.test.ts:28` is `because`;
  `policy/no-nested-functions` in `.oxlintrc.json` covers `tests/**` or a
  design round keeps the `src/**` and `app/**` scope (`followons.md:30`, `:48`,
  `:54`, `conform-guide-audit-verdict.md:26`).
- **sea**: after the parse loop, a `sizeofcmds` divergence raises `FORMAT`
  "Malformed Mach-O load command table", so `Injector.ts:1465` is unreachable;
  the guide `INJECT` clause at `:847` has a PE fixture whose resource leaf RVA
  sits outside every section; the post-write clauses at `:1228` and `:1636`
  are drivable through the public API or the guide names that gap
  (`followons.md:65`, `sea-skip-audit-verdict.md:26-27`).
- **server**: `README.md:19` states the same engines floor as `package.json`
  (`followons.md:15`).
- **sqlite**: `transact` does not swallow a ROLLBACK fault at
  `src/server/SQLiteDatabase.ts:108-112` and `:119-123` (`followons.md:26`,
  `conform-sqlite-audit-verdict.md:26`).
- **sse**: each `clear()` fence inserts the equivalent partial-frame feed
  before `parser.clear()` (`followons.md:32`).
- **table**: `Table` reads `column.meta` once and passes that value into
  `cloneSchema`, or a design round keeps the accessor path
  (`followons.md:25`, `conform-table-audit-verdict.md:26`).
- **terminal**: `PromptClient.url` is ruled with the fleet public-`readonly`
  row (`src/core/PromptClient.ts:62`); `createLineInput` and
  `createStreamTarget` in `tests/setupServer.ts` use a third-person first
  sentence (`followons.md:55`, `conform-terminal-audit-verdict.md:24`).
- **timeout**: `createReadRecorder` at `tests/setup.ts:21-23` returns a named
  recorder shape (`followons.md:36`, `conform-timeout-audit-verdict.md:16`).
- **tool**: a ruling on § Class order against interface-required data members
  covers the public `readonly` fields at `src/core/tools/Tool.ts:27-34`
  (`followons.md:35`, `conform-tool-audit-verdict.md:13`).
- **worker**: replace the bare `§` citations at `src/core/types.ts:21,62`,
  `src/core/factories.ts:15`, `src/core/Worker.ts:28,36,50`, and
  `tests/src/server/handlers.test.ts:14` with the named-section form;
  `guides/worker.md:228` keeps `through`; `guides/worker.md:98,103,198` and
  the matching prose sites no longer name `QueueExecution` (`followons.md:53`,
  `:80`, `:82`, `conform-worker-audit-verdict.md:31`).
- **workflow**: `tests/src/core/RunHolder.test.ts:41` has no nested
  `readActive`; `errorToMessage` describes a non-Error object by its own keys
  (`followons.md:74`, `:86`, `conform-agent-audit-verdict.md:24`).
- **worker**, **workflow**, **agent**, and **probe**: each consumer's prose and local bindings follow queue's `context` vocabulary where they still read `execution` (`followons.md:53`, `conform-queue-audit-verdict.md:22`).
- **workspace**: the `Determines whether` openers and ragged wraps at
  `src/core/helpers.ts:23,38` close in the next matrix's subjective lane
  (`followons.md:90`, `conform-workspace-audit-verdict.md:23`).
