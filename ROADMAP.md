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
