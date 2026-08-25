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

- **fleet**: an entry module's `@packageDocumentation` never reaches the published declaration
  rollup — the build pipeline hands API Extractor a synthetic comment-free entry file, measured
  2026-08-25 in the test repository against a byte-identical rollup. Rule whether the pipeline
  adopts the real entry declaration, at a toolchain revisit.
- **probe**: a mintty-backed TTY fixture where `/usr/bin/script` is absent stays Windows-host
  work; the trigger is the first Windows campaign that runs the bin suite there. The Linux
  acceptance recorded 2026-08-24: the `script`-guarded proofs execute rather than skip on this
  host — the bin suite passes complete with no skipped case.

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
