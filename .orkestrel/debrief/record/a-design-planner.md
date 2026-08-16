# Alignment design — subjective lane (planner, Opus 5)

## Lane held

**Subjective lane** (planner, Opus 5) — shape, unit boundaries, sequencing ergonomics, operator voice, naming. Read-only; no files edited.

---

## Design

### The organising claim

Findings 2, 3 and half of 5 are not three defects. They are one: **the open viewer's durable facts refresh on exactly one trigger, and that trigger cannot fire at the moment the run ends.**

`/workspace/supervisor/app/browser/controllers/Operator.ts:465-480` re-inspects only when a frame is `source === 'observe' && observation.category === 'settlement'`. That settlement lands while the *workflow* is still running (the unit settles, then `createWorkflowFunction` returns, then the runner completes, then `SupervisorApplication.#release` runs at `app/server/SupervisorApplication.ts:302-314`). So the last re-inspect the browser ever performs is taken from a snapshot that still says `running`. The broker then closes the viewer (`LiveBroker.close`, `LiveViewer.close`), the browser's `for await` ends **normally**, the `finally` sets `live = false`, and nothing else happens. The header keeps the pre-terminal snapshot forever.

The rail is right for an unrelated reason: it reads a different stream. `RosterManager.#retain` (`app/browser/controllers/RosterManager.ts:121-133`) computes departure from the roster snapshot that `#release` republishes. Two surfaces, two sources, one screen — which is exactly what the film shows.

The seam to fix is therefore **the live stream's own clean end**, not the roster, and not a new frame type. Naming it: a roster stream that ends is a fault (`RosterManager` already says "ended unexpectedly"); a *run's* live stream that ends is the run finishing. Those are opposite meanings on the same mechanism, and the code must say so in both places.

Second claim, and the one I expect the objective lane to argue with: **`terminal` is a stored flag that can drift, and it should be derived.** `Operator.#terminal` is written once, from `ApplicationTail.terminal`, at open. But `open()` inspects *before* it tails, so the snapshot — which carries `workflow.status` — is always in hand first. `ApplicationTail.terminal` (`app/core/types.ts:202-208`) is a second copy of a fact the snapshot already holds. Delete the field, delete the ref, and expose `Operator.terminal` as a computed over `isTerminalStatus(snapshot.workflow.status)`. Then finding 3 cannot recur, because there is no second place for the fact to be stale in.

### Operator voice — what the three fixes should feel like

These are the sentences, and they are the deliverable as much as the code is.

1. **Terminal refresh.** The moment the server stops talking, the header changes. No spinner, no "reconnecting", no poll. The run's own stream ending is the announcement; the badge in `ContentPane.vue:39-40` goes from nothing to `Run finished`, and the stack statuses go terminal in the same tick. The reader never sees two surfaces disagree.

2. **Settlement card** (`FeedItem.vue:39-49`). Three outcomes, three honest sentences, and the current fallback is used for none of them:
   - settled success with a value → render the value (bounded, monospace, same treatment as a transcript line);
   - settled success with no value → "This attempt completed and recorded no result.";
   - not settled and the run is over → "This attempt ended before it recorded an outcome."
   
   "This attempt ended, but its result is not available" reads as a system fault to an operator who can see the answer on the screen above it. That sentence is the defect, independent of the freshness bug behind it.

3. **Failed launch.** The operator learns within one refresh, in the pane they are already looking at, from the run's own facts: the task row goes `failed` and its `TaskSnapshot.result` message renders where the run's status lives. No new frame source, no new observation category, no server change — the refreshed snapshot already carries it. If the probe shows it does not, that is a deviation report, not a licence to edit `src/`.

4. **Transcript register.** The raw frames stay verbatim and stay in order — they are the evidence, and `TranscriptFrame` says "never retained" on purpose. What changes is that each frame renders as one collapsed row with a readable label, disclosed to the full text on demand. The label comes from a pure leaf in `app/browser/parsers.ts` — `parseTranscript(text: string): TranscriptSummary | undefined` — that returns `undefined` for anything it cannot read, so an unrecognised line renders exactly as it does today. The mechanism belongs in the browser, not in `src/server/providers/*`: labelling a wire frame for a reader is presentation, and the published provider's contract is to hand over bytes it did not interpret.

5. **Cold load.** `OllamaOptions.timeout` exists and defaults to `120_000` (`node_modules/@orkestrel/ollama/dist/src/server/index.d.ts:89-92`), and `ApplicationRuntime.ts:162` passes only `model`. This is entirely a composition fix in the app: pass a deadline that covers a cold load and a `keepAlive` that stops the second task paying for it again. Reject the warm-on-boot alternative: it spends memory on every boot, still races a load slower than boot, and hides the signal the operator needs. The shape under the single-word law is a grouped sub-entity — `ApplicationPolicy.agent: { model, timeout, keep }` — replacing the flat `policy.model`, because three flat keys about one lane is precisely the case the law tells you to regroup.

### Sequencing ruling: **alignment first, staged; then fixes; middleware runs beside both, never in front of them.**

The reason is the failing-proof law, not merge cost. `AGENTS.md` requires a defect fix to record its proof red before the implementation. During the alignment the suites are red for `recoverWorkflow`, the JSON-RPC split, and `guide.patterns()` — so a proof written mid-alignment cannot be shown to have run red *for the defect it claims*. Fixes-first inverts the problem: every proof is then re-validated against a substrate that moved under it, and the mcp migration edits `app/server/MCPProjection.ts` and `helpers.ts` while the fixes edit `app/browser` and `app/core` — adjacent enough that a reviewer cannot tell which change caused which suite to move. Interleaved is worst: it breaks one-writer serialization and the proof discipline at once.

**Middleware is not a serial prerequisite, and the campaign must not wait on the user's approval.** Installed middleware `0.0.9` declares `peerDependencies: { "@orkestrel/database": ">=0.0.7", "@orkestrel/server": ">=0.0.10" }` (`/workspace/supervisor/node_modules/@orkestrel/middleware/package.json:105-108`) — **range peers, not carets**. Holding middleware at `0.0.9` while raising database to `0.0.9` and server to `0.0.12` satisfies both peers and installs cleanly. It is `0.0.11` that tightened them to `^0.0.8` / `^0.0.12` and created the conflict the brief describes. So the alignment lands complete-except-middleware, green, committed; the middleware raise becomes a two-line follow-on unit whenever `0.0.12` reaches the registry. If the user defers the approval indefinitely, the campaign still closes with middleware recorded as *intentionally excluded on evidence*.

**Alignment is staged, not one unit** — but staged by *green tree*, not by task type. The pin raise and the four compile migrations are one unit because a partial raise does not typecheck, and a writer cannot be dispatched from a red baseline. The `@orkestrel/test` adoption is a second unit because it is 404 occurrences across 54 files of pure mechanical rewrite, which is the wrong work to hand an expensive engine and the wrong risk to bundle into a migration.

### Campaign exit criterion

The campaign ends when each of these nine capabilities is **implemented**, **repaired**, or **intentionally excluded on evidence** — nothing else, and no auditor finding reopens one:

1. Every `@orkestrel` runtime and development pin in `/workspace/supervisor/package.json` names the registry's current release, or names the version a recorded peer constraint forces.
2. The four compile breaks (workflow `recoverWorkflow`, mcp JSON-RPC split, guide `fences()`, contract `Result<T, E=unknown>`) are migrated, with no `as`, no suppression, no shim.
3. `@orkestrel/test` supplies `createRecorder` and `waitForDelay`; the supervisor hand-rolls are deleted; `createScratch` adoption is excluded on recorded evidence.
4. `@orkestrel/middleware` is at `0.0.12` with peer `database ^0.0.9`, or held at `0.0.9` with the deferral recorded.
5. A run that self-completes refreshes the open viewer's facts, and `terminal` has exactly one home.
6. A settlement card states the attempt's real outcome in all three cases.
7. A failed launch reaches the open viewer within one refresh, naming what failed.
8. A transcript frame renders as a labelled, disclosable row.
9. The agent lane's provider deadline covers a cold model load.

Closure evidence: the full gate chain green from one independent `verifier`, plus a registered portfolio frame for every capability in 5–8, plus a live four-lane re-film matching the E1 protocol.

---

## Alternatives

**A. Feed the viewer's terminal fact from the roster stream instead of the run's stream.** The roster already knows — `#release` publishes it, and the rail is correct today. Cost: it makes one fact arrive over two transports and couples the open viewer to a session-wide subscription that exists for a different purpose. The moment the roster stream is aborted (logout, expiry, a fault) the open viewer silently loses its terminal signal, and the bug returns wearing a new failure mode. It also cannot help a viewer opened without a roster. **Design wins because the run's own stream ending is the fact, already delivered, on the transport that owns it.**

**B. Add a fifth `LiveFrame` source — a terminal/settlement frame the server pushes before closing.** Explicit, testable, no derivation. Cost: it expands a public app contract to carry a fact `inspect` already returns, so two encodings of "this run is over" would have to agree forever; it obliges the browser to handle a frame it can also miss (a bounded viewer drops frames, and `#admitGap` exists precisely because it does); and it speculates a capability with no second consumer. **Design wins under Derive state and Minimal public API — and it is strictly cheaper, since the close already happens.**

---

## Units

Routing ledger is derivable from each unit's **Role / Engine** line. Writers are serialized in the main checkout; each is dispatched from a clean committed baseline.

---

**U1 — Middleware 0.0.12 preparation**
- **Subject.** Raise `@orkestrel/middleware` to `0.0.12` with peer `@orkestrel/database ^0.0.9`, gates green, committed and pushed. Preparation only; the publish is the Orchestrator's and the user's.
- **Owned.** `/workspace/middleware/package.json`, `/workspace/middleware/package-lock.json`, and `guides/middleware.md` only if it states the peer range in prose.
- **Depends on.** Nothing. Runs first, in parallel with U2 (different repository, no shared file).
- **Role / Engine.** `builder` / Sonnet. The edit is three ranges and a version; the judgment was made here.
- **Acceptance.** `version` is `0.0.12`; `peerDependencies["@orkestrel/database"]` is `^0.0.9`; `devDependencies["@orkestrel/database"]` is `^0.0.9`; `npm run prepublishOnly` green with its output pasted; tree committed.
- **Risks.** Middleware's own source may not compile against database `0.0.9` (unverified — no declaration diff was taken for middleware-against-0.0.9). A break here stops the unit and becomes its own scope, not a widening of this one.

---

**U2 — Supervisor pin raise and compile migrations**
- **Subject.** Raise every `@orkestrel` pin except middleware to registry latest; adopt `@orkestrel/test ^0.0.3` as a devDep (declaration only, no consumers yet); migrate the four compile breaks.
- **Owned.** `package.json`, `package-lock.json`; `app/server/MCPProjection.ts`, `app/server/helpers.ts`, `app/server/ApplicationRoutes.ts`, `app/server/factories.ts`; `tests/src/core/Run.test.ts`, `tests/src/server/integration.test.ts`, `tests/app/setup.ts`, `tests/app/server/MCPProjection.test.ts`, `tests/guides/src/parity.test.ts`, `tests/setupGuides.ts`. **Off-limits:** every `app/browser` file, `app/core/types.ts`, `tests/setup.ts`.
- **Depends on.** Nothing.
- **Role / Engine.** `sol` / GPT-5.6 Sol. Constraint-heavy, mechanically exact, listener-free — Sol's class exactly.
- **Acceptance.** `@orkestrel/middleware` stays `^0.0.9` and `npm ls @orkestrel/middleware` reports no unmet peer; `recoverWorkflow` → `createRecoveredWorkflow` at all six sites; `liveFrameToMCPNotification` returns `JSONRPCNotification` and `MCPStream` yields it; `buildJSONRPCResult` receives a `JSONRPCId` with no `?? null`; method handlers take `MCPMethodOptions`; `guide.patterns()` → `guide.fences()` with `.code` passed to `findUnexampled`/`fenceImports` at the three sites; the whole gate chain green, output pasted; zero `as`, zero suppression comments introduced.
- **Risks.** `Result<T, E = unknown>` churn is predicted "narrow" but unmeasured; the `{ state: 'closed' | 'refused' }` payload may not satisfy the new `MCPResult` shape, forcing a projection redesign inside a migration unit; six packages have no target tree at all (budget, emitter, sse, terminal, router, sea, ollama, scaffold), so their breaks are unknown until install.

---

**U3 — `@orkestrel/test` adoption**
- **Subject.** Delete `TestRecorderInterface`, `createRecorder`, and `waitForDelay` from `tests/setup.ts`; import `createRecorder`, `waitForDelay`, and `RecorderInterface` from `@orkestrel/test` at every consumer. Keep `waitForEvent`, `waitForRecorder`, `waitForAbort` in `tests/setup.ts`, retyped to `RecorderInterface`.
- **Owned.** `tests/setup.ts` and all 54 files that reference those three symbols. Scope the owned list by *importers*, not declarations — 404 occurrences counted across 54 files.
- **Depends on.** U2 (the devDep must be installed).
- **Role / Engine.** `builder` / Sonnet. Fully specified, taste-free, high-volume.
- **Acceptance.** `rg "TestRecorderInterface"` returns nothing; no local `createRecorder`/`waitForDelay` definition survives; `npm run test:src` and `npm run test:app` green; no re-export barrel added in `tests/setup.ts` for the two adopted symbols.
- **Explicit exclusion.** `createTemporaryDirectory` → `createScratch` is **not** adopted. `createScratch` is synchronous with `write`/`read`/`link`; `createTemporaryDirectory` is async `mkdtemp`/`rm` with a destroy-only contract. Semantics do not match, so the reuse gate is not met, and a half-migration of teardown across the server suites is a larger risk than the duplication it removes. Recorded against the capability, not deferred.
- **Risks.** `RecorderInterface.calls` may be typed more strictly than the hand-roll, surfacing as type errors in a unit routed to a cheap engine; the correct response is a deviation report, not a cast.

---

**U4 — Middleware raise in supervisor**
- **Subject.** Once `@orkestrel/middleware@0.0.12` is on the registry, raise the pin and install.
- **Owned.** `package.json`, `package-lock.json`.
- **Depends on.** U1 *and* the user's publish approval *and* U2. If approval is deferred, this unit is recorded excluded and the campaign still closes.
- **Role / Engine.** `builder` / Sonnet.
- **Acceptance.** `@orkestrel/middleware` is `^0.0.12`; `npm ls` reports no unmet peer for database or server; `npm run test:app:server` green.
- **Risks.** Registry/CDN lag makes a successful publish read as absent; re-read the registry before reporting failure.

---

**U5 — Viewer freshness and terminal derivation** *(closes E1-3; unblocks the observable half of E1-2 and E1-5)*
- **Subject.** Refresh once when the live subscription ends cleanly; derive `terminal` from the snapshot; remove `ApplicationTail.terminal` as the second home of that fact.
- **Owned.** `app/browser/controllers/Operator.ts`; `app/core/types.ts` (`ApplicationTail`); `app/server/SupervisorApplication.ts` (`tail` only); `app/browser/services/Client.ts` and `app/browser/validators.ts` if they decode the tail shape; `tests/app/browser/controllers/Operator.test.ts`, `tests/app/server/SupervisorApplication.test.ts`, `tests/app/browser/portfolio.test.ts` + `portfolio.ts`. **Off-limits:** `app/browser/components/FeedItem.vue` (U6/U8 own it).
- **Depends on.** U2, U3.
- **Role / Engine.** `implementer` / Opus 5. Contract shape, a public-type deletion, vocabulary about what a stream's end means, plus browser suites — judgment-bearing and subjective.
- **Acceptance.**
  1. A failing proof exists first: a test that drives a real workflow to self-completion through the real broker and asserts the open viewer reports `terminal`, recorded red with its count, then green.
  2. `Operator.#terminal` no longer exists as stored state; `terminal` is computed from `snapshot.workflow.status`.
  3. `ApplicationTail.terminal` is removed from `app/core/types.ts` and from `SupervisorApplication.tail`, with every consumer updated in the same change.
  4. A clean stream end refreshes; an aborted stream end does not (generation and `signal.aborted` both checked), proved by two tests.
  5. A registered portfolio frame shows the open viewer at self-completion with `Run finished` rendered.
  6. `test:app:browser`, `test:app:browser:integration`, `test:app:server` green.
- **Risks.** If `run.destroy()` removes the durable supervisor record faster than the refresh lands, `inspect` answers `ABSENT`, `#matchesEnd` fires, and the badge reads `Run ended` instead of `Run finished` — a different sentence for the same event, and a race the fixture suites will not reproduce. Naming this the acceptance boundary is the objective lane's job. Removing `ApplicationTail.terminal` may ripple further through handlers and guides than measured.

---

**U6 — Settlement card voice** *(closes E1-5's rendering half)*
- **Subject.** The settlement card states the attempt's real outcome, including its recorded value.
- **Owned.** `app/browser/components/FeedItem.vue`, `app/browser/helpers.ts` (if the outcome derivation moves to an exported leaf), `tests/app/browser/components/FeedItem.test.ts`, `tests/app/browser/helpers.test.ts`, portfolio registration.
- **Depends on.** U5 (its criterion is only observable against a refreshed snapshot). Serialized before U8 — both own `FeedItem.vue`.
- **Role / Engine.** `implementer` / Opus 5. This unit is three sentences and where a value renders; it is the definition of the subjective lane.
- **Acceptance.**
  1. Failing proof first, recorded red then green.
  2. A settled success with a value renders that value, bounded; a settled success without one reads "This attempt completed and recorded no result."; an unsettled attempt under an ended run reads "This attempt ended before it recorded an outcome."
  3. The string "result is not available" appears nowhere in `app/`.
  4. The outcome derivation is either folded into its single caller or exported from `helpers.ts` and tested — no hidden module helper.
  5. A registered portfolio frame shows a settled success card carrying its result.
- **Risks.** A provider result value may be large or non-string; rendering it unbounded turns the settlement card into the JSON wall U8 is removing. The bound belongs in this unit's criterion, not in review.

---

**U7 — Failed-launch voice** *(closes E1-2)*
- **Subject.** A launch that fails before any unit observation reaches the operator within one refresh, naming what failed.
- **First step, fixed in the brief.** Drive a real failing launch (an unreachable daemon URL — a real failure of a real component, no mock, no fake clock) and read what the refreshed `ApplicationSnapshot` actually carries. The mechanism follows the reading: if `TaskSnapshot.result` carries the failure, this is a browser rendering unit and nothing else; if it does not, the unit **stops and reports** rather than editing `src/core/factories.ts`, because that is the published library and a change there obliges a bump, a publish, and a re-pin.
- **Owned.** `app/browser/components/ContentPane.vue`, `app/browser/components/PhaseView.vue`, `app/browser/components/TaskView.vue`, their tests, portfolio registration. **Off-limits:** all of `src/`.
- **Depends on.** U5.
- **Role / Engine.** `implementer` / Opus 5. The unknown is a design question about where a voice belongs.
- **Acceptance.** Failing proof recorded red then green; a failed launch renders a named fault carrying the task's failure message, with no run left reading `running`; a registered portfolio frame shows it; no file under `src/` modified.
- **Risks.** The whole unit rests on an unread fact. Naming it unknown in the brief is the only honest handling; a guess here ships a criterion no edit to the owned files can close.

---

**U8 — Transcript register rendering** *(closes E1-4)*
- **Subject.** Each transcript frame renders as one collapsed labelled row, disclosable to its verbatim text.
- **Owned.** `app/browser/parsers.ts`, `app/browser/types.ts` (`TranscriptSummary`), `app/browser/components/FeedItem.vue`, `tests/app/browser/parsers.test.ts`, `tests/app/browser/components/FeedItem.test.ts`, portfolio registration.
- **Depends on.** U6 (shared file `FeedItem.vue`; strictly serialized after it).
- **Role / Engine.** `implementer` / Opus 5. Naming, register vocabulary, and a rendering rule.
- **Acceptance.**
  1. `parseTranscript(text: string): TranscriptSummary | undefined` is declared in `app/browser/types.ts` first, lives in `parsers.ts`, is exported, and is tested against real captured frames from all three provider lanes.
  2. It returns `undefined` for any line it cannot read, and such a line renders exactly as today.
  3. No transcript byte is discarded, reordered, or rewritten; the disclosure holds the verbatim text.
  4. No second source-language analyzer and no new npm package.
  5. A registered portfolio frame shows a provider lane's transcript column collapsed, and one row expanded.
- **Risks.** Provider wire shapes are external and unversioned; a label rule tuned to today's frames rots silently. The `undefined` fallback is what keeps that rot from becoming a defect, so it is a criterion rather than a nicety.

---

**U9 — Agent-lane cold-load deadline** *(closes E1-1)*
- **Subject.** Regroup the agent lane's provider settings and pass a deadline that covers a cold model load, plus a residency setting so the second task does not pay it again.
- **Owned.** `app/core/types.ts` (`ApplicationPolicy`), `app/core/parsers.ts`, `app/core/constants.ts`, `app/server/ApplicationRuntime.ts`, `tests/app/core/parsers.test.ts`, `tests/app/server/ApplicationRuntime.test.ts`, `tests/service/ollama/AgentExecutor.test.ts`, and the matching guide.
- **Depends on.** U2 (the ollama raise). Sequenced **after** U7 deliberately: the fault voice must exist before the timeout changes, so the change is observable and so U7's proof still has a real failing launch to bind to.
- **Role / Engine.** `sol` / GPT-5.6 Sol. Bounded, constraint-driven, verifiable against a declaration file.
- **Acceptance.** `ApplicationPolicy.agent` is `{ model, timeout, keep }` and the flat `policy.model` is gone, with every consumer updated in the same change; `createOllama` receives all three; the env knobs are parsed with the existing bounded-integer parser and refuse malformed input; `test:service:ollama` shows a first-call cold load completing past the old 120s ceiling, with the command and output recorded; no warm-on-boot side effect added.
- **Risks.** The service suite needs a genuinely cold model to prove anything, and a warm daemon makes the proof vacuous while looking green. State the warm/cold precondition in the criterion or the test proves nothing.

---

**U10 — Gates and portfolio acceptance**
- **Subject.** One independent tree-wide gate sweep plus the four-lane re-film against the E1 protocol.
- **Owned.** Nothing. Read-only.
- **Depends on.** Every writing unit.
- **Role / Engine.** `verifier` / Sonnet for the gate chain. The re-film is the Orchestrator's own tracked run — it needs live provider credentials and is not delegable to a read-only role.
- **Acceptance.** `format:check → lint:check → check → build → test` green with output read; the portfolio holds a registered frame for capabilities 5–8; the four lanes re-filmed and each E1 finding shown closed on film.
- **Risks.** The re-film needs the same temporary `~/.codex/config.toml` model pin the E1 session used, and a codex workspace inside a trusted git directory. Unstated, it comes back as a deviation about something already known.

---

## Tensions

Where my lane chose on taste and Sol should rule objectively:

1. **Deleting `ApplicationTail.terminal`.** I argue one fact, one home, and that `open()` inspects before it tails so the field is redundant. Sol should count the actual ripple — handlers, client decode, validators, guide parity, tests — and rule whether the simplification fits inside U5 or forces its own unit. Fallback if it does not fit: keep the field, still derive `Operator.terminal` from the snapshot, and record the redundancy against the capability.

2. **Refresh on clean stream end vs. an explicit terminal frame.** I ruled derivation. Sol should check whether a bounded viewer can drop the closing sequence such that the browser sees an end it cannot distinguish from a dropped-frame gap, and whether `run.destroy()` leaves the durable record readable long enough for the refresh to answer `Run finished` rather than `Run ended`.

3. **Holding middleware at `0.0.9` through the alignment.** I read `>=0.0.7` / `>=0.0.10` from the installed manifest and concluded the campaign does not block on the publish approval. Sol should verify that against a real resolution — the peer graph across agent, server, database, and router together, not middleware alone.

4. **`ApplicationPolicy.agent` regrouping.** Single-word law says group; a flat `policy.timeout` is ambiguous, and three flat keys about one lane is what the law forbids. Sol should count `policy.model` consumers and rule whether the regroup is a net simplification or churn bought with taste.

5. **U6 and U8 as separate units sharing `FeedItem.vue`.** I split them because their criteria are independently checkable and their vocabularies are unrelated. Sol may argue one unit is cheaper than two serialized writers over one file. I would rather pay the serialization than let a rendering rule and a product sentence share one acceptance test.

6. **Excluding `createScratch`.** I ruled the sync/async lifecycle mismatch defeats the reuse gate. Sol should confirm from the declarations rather than the absorb map's "partial".

---

## Risks — the three highest

1. **Six packages have no target declaration tree at all** — budget, emitter, sse, terminal, router, sea, ollama, scaffold. The absorb map records "none observed (target tree missing)", which is an absence of evidence recorded honestly, not evidence of absence. `createSSEParser`, `createDispatcher`, the terminal prompt vocabulary, and `createOllama` are all load-bearing, and `ollama` is the package U9 depends on. **Evidence needed:** fetch each target tree's `index.d.ts` and diff the consumed symbol set *before* U2 is dispatched, not during it. This is Grok's work, and it is cheap. A surprise here turns U2 from a migration into an unbounded redesign mid-unit.

2. **U7 rests on a fact nobody has read.** Whether a launch that throws inside `createWorkflowFunction` leaves anything in `TaskSnapshot.result` decides whether E1-2 is a browser rendering unit or a change to the published library — and the second is a bump, a publish, and a fleet re-pin, which is not this campaign. **Evidence needed:** one real failing launch, driven against a real unreachable daemon, with the resulting `ApplicationSnapshot` printed. Run it before U7's brief is written, per the probe-before-brief rule.

3. **The fixture suites stayed green through every one of these defects.** The E1 report says so plainly for finding 3: "the fixture suites always pumped an explicit terminal frame". That is a test-design defect, not a coverage gap — the suites assert against a stimulus the real server does not send. Any fix validated by the same suites will look closed and film open. **Evidence needed:** each of U5, U6, U7, U8 must prove itself against a run that self-completes through the real broker with no injected terminal frame, and each must land a registered portfolio frame. A green suite is not the acceptance evidence for a rendered surface; the capture is.