# Breaking phase plan

Reconciled by the Orchestrator on 2026-09-01 from the two blind design lanes,
`design-subjective.md` and `design-objective.md`. Both lanes ran on Opus 5 in clean contexts; the
Sol bench was dark at dispatch (`codex` absent from `PATH`, recorded) and is re-probed at every wave
boundary. A bench that comes live takes the objective audit lane from that wave on.

The user's standing rulings bind every unit: nothing publishes; the TSDoc voice wave runs after this
phase; `patterns.md` all-succeed batch semantics and `architecture.md` kind purity win over the
guides; the tarball method of `.agents/orchestration.md` § Fixing a dependency before it publishes
is the only cross-checkout mechanism.

## Rulings on the lanes' disagreements

1. **Shape.** One unit per checkout, scheduled at that checkout's catalog layer, owning its own
   rows and every carried edit from dependencies that landed earlier (both lanes). A checkout with
   no rows gets an adopt unit only when its typecheck against the staged tarballs reddens; the
   radius file never scopes a unit (both lanes).
2. **Development dependencies run first.** `test` and `guide` are development dependencies of the
   fleet and runtime dependencies of nothing (measured: no fleet manifest lists either under
   `dependencies`). Their wave runs before L0 (objective lane) so that every later unit adopts the
   renamed helpers inside its own tests instead of a second pass over every checkout. The harness
   instability the subjective lane feared is bounded by staging the two tarballs and typechecking
   every checkout before L0 opens; a red checkout gets a `builder` slice over `tests/**` only.
3. **The vocabulary lands in `.claude/rules/names.md` now** (both lanes), as the second W0 unit.
   Scaffold's canon surface moves, so a scaffold bump is owed at the next release and every brief in
   this phase quotes the added text because targets carry the older vendored copy.
4. **The catalog regenerates first** (objective lane). The committed table names contract at
   `0.0.13` and process at `0.0.8` while the registry serves `0.0.15` and `0.0.9`; the layer column
   is derived from a graph that has not moved, and the regenerated column is what every wave reads.
5. **Staging scope was measured: every consumer stages its whole closure in one command.** The
   harness unit (`units/harness-report.md`) measured that a second `npm install --no-save` reverts
   the tarball an earlier one staged, so incremental staging is impossible; that staging the
   runtime closure from branch tips collapses the nested contract copies (`worker` typechecks green
   with its closure staged, and red with the contract tarball alone); and that a closure install
   costs about one second per consumer plus one pack per package per tip. `stage-closure.sh` is
   therefore the only staging entry point, `worker` joins L4 as an adopt unit, and the plan's
   earlier direct-edge default is withdrawn.
6. **`verifyStage` is the first criterion of every consumer unit** (objective lane). The staged
   tarball carries the registry's version string, so only a content digest separates them. The
   negative control is taken once in the harness unit and quoted.
7. **One register file.** Units never install, pack, or restore; the Orchestrator performs every
   staging action from a script, so `tarballs.json` stays the single register with no write race.
   A row carries consumer, dependency, declared range, tarball, version, digest, dependency commit,
   staged time, and restore time when it comes back.
8. **No version bump anywhere in this phase** (both lanes).
9. **Gate evidence is taken against the staged closure.** A consumer that adopted a renamed
   upstream symbol cannot be green against the registry copy until the publish wave re-pins it, and
   the user holds publishing. The restore before a distribution proof still binds:
   `test:distribution` runs from `prepublishOnly`, never from `npm test`, and is reported as an
   observation while a tarball is staged. The register's pending re-pins are what the publish wave
   consumes.
10. **The tally extension is a rescope and is not taken.** `size` becomes `count` in `template`,
    `interpret`, and `brief` because those rows exist. The same drift in `program`, `middleware`,
    `msg`, and `pool` has no row; it is recorded under Findings for the next change and put to the
    user once, in the report that surfaces this plan.
11. **The audit runs on one engine and says so.** Every writer is Opus, so every lane is Opus with
    a clean context, told that its own engine wrote the subject and to attack that half harder; each
    verdict file records the substitution. The wide units run two lanes plus the checker; the narrow
    units run the objective lane plus the checker. A `PASS` from this round is weaker evidence than a
    cross-engine `PASS`, and the round's verdict files say so.
12. **Recovery of the Codex bench cannot start from here.** The binary is absent, so there is no
    login to background; the user brings the bench live by installing the CLI and running
    `codex login --device-auth` in a live session. The plan does not hold L2 for it (the subjective
    lane's recommendation); it re-probes at each boundary and swaps the objective lane the moment the
    bench round-trips.

## Naming and shape rulings

Every open target in the ledger reports resolves here. A unit applies the ruled form; a unit that
finds the ruled name colliding with an existing export stops and reports.

| Row | Ruling |
| --- | --- |
| contract s03-22 | Keep the flat `Object` and `Number` operations; gather the proxy-visible operations under one frozen `reflect` sub-entity (`INTRINSICS.reflect.read`, `write`, `members`, `present`, `describe`, `define`, `prototype`, `apply`, `construct`). The axis is proxy visibility, and `AGENTS.md` § Design laws changes the shape where one word is insufficient. |
| contract s03-06 | Group under `limits`: `limits.depth` and `limits.properties`, matching `MultipartLimits`. `breadth` is refused as a word that names nothing in the domain. |
| contract s03-23 | `build*` as the ledger has it. |
| contract s03-13 | `expansion` is `number \| undefined`; the guide row and its fence transcription move. |
| sse s18-04, ndjson s18-03 | `reset()` becomes `clear()` (`names.md` § Fixed lifecycle vocabulary). |
| sqlite s18-11 | `exec` becomes `execute`. |
| console s09-07 | `createCaptureResult` in `factories.ts`; `helpers.ts` imports no class. |
| console s09-10 then s09-11 | s09-10 lands first; s09-11 reduces to `DEFAULT_CAPTURE_LIMIT` → `DEFAULT_STREAM_LIMIT`. |
| console s09-21 | `succeed` and `fail` on `Spinner`; `fail` on `Progress`; `completed` and the `complete` event stand. |
| database s05-12 | `scanDriver`. |
| markdown s10-08 | `isFlankingWhitespace`; the predicate is total, so `is*` stays. |
| middleware s11-01 | The carrier of s11-02 and s11-04: `restoreSession` becomes `createRestoredSession` in `factories.ts`, `resolveDefaultDirectory` is deleted. The keep-the-name move is unavailable because the vendored policy sweep name-gates `factories.ts` and `parsers.ts`. |
| middleware s11-06 | `MultipartErrorCode` and `MULTIPART_STATUS`. |
| middleware s11-12 with s11-15 | One edit: `SessionInterface.data` becomes `state`, a `ReadonlyMap` with `set`, `delete`, and `clear` mutators. `values` and `store` are refused for colliding with `Map.prototype.values` and `SessionStoreInterface`. |
| middleware s11-18 | `PartHeaders.contentType` becomes `mime`; `UploadedFileInterface` drops the suffix only if it declares no call signature, which the writer tests. |
| middleware s11-24 | The `ends` option and the DELETE short-circuit go. |
| middleware referral s11-Q2 | `SessionStoreInterface.set(session, now)` with `S extends SessionInterface`, per `referrals-middleware-report.md`. |
| websocket s17-27 | `parseWebSocketCanonical`, in `parsers.ts`: the helper returns `boolean \| undefined`, which is the `parse*` contract. |
| websocket s17-28 | `WebSocketError`, `isWebSocketError`, `WebSocketErrorCode` in `src/server/errors.ts`, landing with every thrower in one change. |
| browser s04-01 before s04-02 | The coercers vacate `read*` for `parse*` before the live readers take `read*`. |
| browser s04-10 before s04-11 | `fail` leaves the interface, then stays a bare verb on the class. |
| browser s04b-05 | The client takes `CDPSendOptions` with `session` and `timeout`; the frame takes a timeout-only options type and never accepts a `session` it ignores. |
| browser s04b-12 | `diagnostics.profiler` as a `BrowserProfilerInterface` peer. |
| browser s04b-07 (audit) | `BrowserTransition`, `BrowserTransitionInterface`, `BrowserTransitionFunction`, and `pending` replace the flight vocabulary. |
| indexeddb s16-17 | `context.stores` becomes a manager with `names`, `create`, `drop`, and `open`; `context.indexes` gets `create` and `drop`; the top level declares no `create`, `drop`, `store`, `index`, or `deindex`. The existing `stores` list becomes `stores.names`. |
| interpret s12-26 | Delete `createTemplate`; the class raises its own `NOTFOUND` from `parseTemplate` returning `undefined`. |
| interpret s12-37 | Bind through the existing `Template.computations` and delete the unconditional emission; a string list of aggregate names is a behavior-selecting magic string. |
| interpret s12-42 | `count` on every manager interface including the landed `RecordManagerInterface`. |
| interpret s12-45 | Public `canonicalize(value)` with one parameter; export `canonicalizeNode(value, ancestors)` as the recursive leaf. |
| mcp s01-03 | Each moved factory is `create{Entity}` where `{Entity}` is the declared name of the type it returns; the report names the type behind each choice. |
| qualifier s16-30 | `describe*` for the message producers; `findRule` keeps `find*`. |
| qualifier s16-32 | `QualifierErrorContext` declared in `types.ts`. |
| rater s17-05, s17-06 | `buildWorksheetFactor`, `buildWorksheetGroup`, `buildWorksheet`, `buildLineResult`, `buildEvidence`, `buildEvidenceRows`. |
| rater s17-08 | Drop `LineResult.success`; `RatingResult.success` stands as the aggregate. |
| sea s12-03, s12-05, s12-07, s12-17 | `readPEOffset`, `executeShell`, `ELFNoteHeader` in `types.ts` with a `total` member, `SEACompressionHandler`. |
| server s14-01 | A `Stream` class in `src/server/Stream.ts` with `createStream` as its factory and `enqueueStreamText` folded in as a method; `openStream` goes. The closure holds state, and `AGENTS.md` keeps stateful orchestration in class methods. |
| server s14-11 | `ServerError` with `ServerErrorCode`, the fleet's `{Package}Error` shape; `HTTPError` keeps `status`. |
| server s14-12 | `computeCodingQuality`, `computeLanguageQuality`, `computeIPv6Network`, `computeClientKey`. |
| server s14-14 | `Connection` replaces `ConnectionInfo`; middleware's vendored `guides/server.md` mirror is refresh-only. |
| terminal s12-54 | `supportsRawMode`; `isRawCapable` is refused because `is*` is a total guard. The `*Reduce` widening is outside the row. |
| terminal s12-48, s12-52, s12-55 | Applied over documentation that pins the sentinel, the name-returning accessor, and the `shutdown` synonym: the rules outrank existing code and its account of itself. `terminals()` returns `PromptInterface` values. |
| terminal s12-58, s12-59 | `TimerCancelFunction` and `ParkedForm`. |
| workspace s17-31 | The binary arm's member is named for its encoding: `base64` when the string is base64 text. The writer reads the encoder and reports the choice. |
| workspace s17-32 | `computeDecodedSize`. |
| budget s18-19 | `consumer`, matching the `#consumer` field and `createTokenConsumer`. |
| process s13-15 | `ProcessChildInterface`. |
| template s17-16, s17-17, s17-18 | `count`; `template(id)` returns `TemplateInterface \| undefined` with the `NOTFOUND` throw kept on `fill`, `validate`, and `parameters`; the no-argument `remove` overload goes. |
| reason s07-04, s07-06, s07-17 | `isSubject` goes and consumers import `isRecord` from contract; every bare-noun constructor becomes `create{Entity}` in `factories.ts`; each manager exposes `seat(items)` and no collection setter. |
| brief s13-28 | `count`, paired with `RecordOptions` from interpret. |
| program s15-22, s15-23 | `build*` for the definition helpers; `copyJSONValue` goes and its caller uses `structuredClone`; no `cloners.ts`. |
| workflow s06-03 | Delete `createDeferred` and `DeferredInterface`; the sites use `Promise.withResolvers`, which the fleet already uses in `browser`. |
| workflow s06-23 | `behavior` replaces `run` on the definition, the snapshot, the interface, and the serialized field; the report states that stored snapshots change shape. |
| workflow s06-24 | `IdleInterface`; the private field is `#idle`. |
| agent s08-12 | The sole carrier of `ProviderDelta.type` → `channel`; the referral row closes as satisfied by it. `AgentChunk.type` → `category`. |
| agent s08-13 | `fault`, carrying `[error: unknown]`; its TSDoc states that the run still settles through `error`. `strain` names no domain state. The unit stops if `AgentEventMap` already carries `fault`. |
| agent s08-22 | The run state lives in `#run` and `#trim` changes; `CompactionState` goes. |
| agent s08-23 | `description` → `open`, `format` → `render`, then `framing` → `format`, on both declarations and both guide tables. |
| agent s08-24 (audit) | `constructor(options?: ConversationOptions)`; the seed precedence and its paragraph go. |
| ollama s18-34 (audit) | `OllamaErrorOptions` is a named exported type in `types.ts`. |
| toolbox s10-25 | `TerminalBridge` and `TerminalBridgeOptions`; the factory is named `create{Entity}` for the type it returns, so it becomes `createTerminalBridge` if it returns the bridge and stays `createTerminalRoutes` if it returns routes. The writer reads the return type and reports. |
| toolbox s10-32 | `MAX_WORKFLOW_CHAIN`. |
| toolbox s10-21 | `databaseToolCode` and `relationToolCode` stay outside the row (s10-18 defers them). |
| test s11-37 | `readStyle`, `readToken`, `readRootToken`, `readPixels`, `readContrast`; `rgba` becomes `parseCSSColor`: it coerces a CSS color expression through a live probe element to `Color \| undefined`, the `parse*` contract. The ledger's `resolveColor` was withdrawn by the vocabulary audit (`resolve*` picks an effective value from options and defaults). The test writer landed `resolveColor` before the ruling changed; a `builder` fix-up renames it. |
| test s11-36, s11-38 | `PortfolioInterface.placements`; `matchesColor`. |
| guide s15-16, s15-17 | The ledger's verb-first names, with `extractFenceImports` and `normalizeIdentifier`; `identifierOf` lands once. |
| msg s13-02, s13-03 | `category` on the field data interfaces and on the directory entry; `MSG_CATEGORY_*` replaces `MSG_TYPE_*`. The external-mirror rule never licenses `type`. |

## Refusals

Each row closes refused with the rule text quoted in the unit's report.

- **sqlite s18-10** (`foreignKeys`) and **ollama s18-09** (`keepAlive`): the external-mirror rule the
  vocabulary unit lands. An option key that transliterates an external pragma or wire field keeps
  the external wording.
- **sqlite s18-12** (`transaction`): `AGENTS.md` § Design laws, One concept, one term. Renaming only
  sqlite's method creates the alternation with `@orkestrel/database` the rename exists to prevent,
  and renaming database is a rescope with no finding against it.
- **middleware s11-23** (`only`, `except`): `names.md` § Standalone helpers permits a one-word helper
  whose meaning and arguments are unmistakable, and no `create*` gate reaches `middlewares.ts`.
- **middleware s11-25** (the boolean `fallback` arm): dropping it makes `fallback: {}` mean on, an
  empty-object sentinel `AGENTS.md` § Design laws bans.
- **middleware referral s11b-Q1a (option)**: `AGENTS.md` § Design laws, Minimal public API; the
  finiteness documentation already landed and closes the referral.
- **brief s13-30**: a positional parameter rename binds no caller and `output` shadows the module's
  own export in the same file; refused as written, with no successor row.
- **program s15-23 `cloners.ts` alternative**, **terminal s12-54 `isRawCapable`**, **websocket
  s17-27 `is*` form**: refused candidate names inside rows that apply.

## Carries and findings for the next change

- **worker adoption** joins L4: the harness measured that its closure staged in one install collapses the contract copies and its typecheck is green.
- **Tally drift** in `program`, `middleware`, `msg`, and `pool` (`size` where `count` is the lone
  tally): a finding against those packages' naming capability, for the next change.
- **toolbox s10-18** (`databaseToolCode`, `relationToolCode`): stays deferred as the fix round left
  it.

## Standing condition: contract's `origin/main` may move

The user is working on `contract` in another session (2026-09-02), so `origin/main` there may run
ahead of the campaign branch at any time, as it did at 0.0.15. Before every wave boundary that
packs or stages `contract`, fetch `origin/main` in `/home/user/fleet/contract`, compare it with the
merge base, and when it has moved: merge it into the campaign branch (the 0.0.15 precedent kept
main's `ContractCompiler.ts` and ported main's TSDoc into the moved factory), re-run contract's
gate chain, re-pin the fleet if the version moved, and repack before any consumer stages it. A
consumer staged against a superseded contract tip is re-staged at its next boundary. Reading on
2026-09-02 after L0 landed: `origin/main` at `3193da1` (Bump to 0.0.15), branch tip `d24e79c`,
main ahead of the merge base by nothing. Second reading, after the contract fix-up: `origin/main`
at `c13cfae` (three unpublished commits: canonical array copy, read diagnostics on refusal,
string refinement patterns at compile time), every one touching files the branch changed; unit
`contract-merge` (Opus implementer) reconciled them into the branch as `2c15840` (objective lane
PASS, verifier GREEN), the tarball `contract-2c15840.tgz` is packed, and contract's consumers
re-stage it at the L2 boundary. On 2026-09-02 the user finished their contract work (all of it
in `origin/main` at `c13cfae`, unpublished) and handed contract's authority to this campaign: the
campaign branch is contract's line of development from here, `origin/main` stays at `c13cfae`
until the publish wave merges the branch and publishes, and the publish itself waits on the
user's standing hold.

## Wave schedule and routing ledger

Every unit is a file before it is a launch: `tmp/units/breaking/<unit>-brief.md` and
`tmp/units/breaking/<unit>-report.md`, retained under `.orkestrel/campaign/fix/units/`. Every
writer is the sole writer in its checkout; a wave's units run as disjoint checkouts, at most two
concurrent writers on this host (the Workflow cap), with the deciding re-run of any timing failure
taken by the Orchestrator after the unit exits.

| Wave | Unit | Checkout | Role and engine | Stages (Orchestrator) |
| --- | --- | --- | --- | --- |
| W0 | catalog | scaffold | Orchestrator-owned command (`scaffold catalog`), verdict by `checker` on Sonnet | none |
| W0 | vocabulary | scaffold | `implementer` on Opus 5 | none |
| W0 | harness | scaffold scratch | Orchestrator-owned instrument and measurements (done: `units/harness-report.md`) | contract into budget, database, worker (measurement only, restored after) |
| W-DEV | test | test | `implementer` on Opus 5 | none |
| W-DEV | guide | guide | `implementer` on Opus 5 (rows plus the `Source.methods` follows-`extends` capability) | none |
| W-DEV | canon-tests | scaffold | `builder` on Sonnet (`.claude/rules/tests.md` style-primitives sentence) | none |
| W-DEV | devsweep | every checkout | Orchestrator tracked run; red checkouts become `builder` slices over `tests/**` | test, guide into every checkout |
| L0 | contract, msg, sse | each | `implementer` on Opus 5 | test, guide |
| L1 | budget, csv, html, indexeddb, ndjson, sqlite | each | `implementer` on Opus 5 | contract (+ dev) |
| L2 | console, database, markdown, middleware, process, reason, table, template, websocket | each | `implementer` on Opus 5 | direct changed dependencies (+ dev) |
| L2 | form-fixups | form | `builder` on Sonnet (audit carriers, TSDoc and guide only) | contract |
| L3 | browser, interpret, mcp, qualifier, rater, relation, sea, server, terminal, workspace | each | `implementer` on Opus 5 | direct changed dependencies (+ dev) |
| L3 | scaffold-adopt | scaffold | `builder` on Sonnet (console `succeed`/`fail` at `src/bin`, staged-surface repairs) | console, contract, markdown, process, template (+ dev) |
| L3 | queue-fixup | queue | `builder` on Sonnet (guide sentence, audit carrier) | none |
| L4 | brief, program, workflow | each | `implementer` on Opus 5 | direct changed dependencies (+ dev) |
| L4 | worker, queue, probe, lsp adopt | each, only when red | `builder` on Sonnet | the whole closure |
| L5 | agent | agent | `implementer` on Opus 5 | contract, budget, database, queue, workflow, workspace (+ dev) |
| L6 | ollama, toolbox | each | `implementer` on Opus 5 | direct changed dependencies (+ dev) |
| L1–L6 | adopt-<package> | any no-row dependent that reddens | `builder` on Sonnet | its changed dependencies |
| W-END | sweep | every dependent | Orchestrator tracked re-stage from committed tips; `verifier` on Sonnet runs the authoritative gates | every changed package |
| W-END | handoff | scaffold | Orchestrator: closure table, register consolidation, tarball sweep | none |

Audit per unit, per `orkestrel-falsify`: numbered falsifiable claims from the unit's report, the
actual diff, and the actual status output. Wide units (`contract`, `middleware`, `browser`,
`interpret`, `mcp`, `server`, `terminal`, `workflow`, `agent`, `toolbox`) run the subjective lane
and the objective lane, both `reviewer` on Opus 5 in clean contexts told which lane they hold, plus
`checker` on Sonnet. Every other unit runs the objective lane plus `checker`. A lane that returns
no verdicts is a lane that did not run, and the verdict file at
`.orkestrel/campaign/fix/units/<unit>-audit-verdict.md` records it.

## Tarball mechanics

The Orchestrator owns every staging action and runs it from the instruments under
`.orkestrel/campaign/instruments/`:

- `pack-dep.sh <package>` builds from a clean committed tip and packs to
  `tmp/tarballs/<package>-<sha>.tgz`; a dirty tree is refused.
- `stage-set.mjs <consumer>` prints the consumer's @orkestrel closure from committed manifests
  (runtime and development, transitive over runtime; scaffold and probe excluded), and
  `stage-closure.sh <consumer>` packs that closure and installs it through
  `stage-deps.sh <consumer> <tarball>...`, one `npm install --no-save` command for every tarball,
  refusing if the manifest or lockfile moved and writing one register row per tarball. A consumer
  is never staged incrementally: a later install reverts an earlier staged tarball.
- `verify-stage.mjs <consumer>` compares each installed `node_modules/@orkestrel/<dependency>`
  against its register row's tarball, file by file, and exits non-zero on any difference. It is the
  first acceptance criterion of every consumer unit and runs again before the unit's audit.
- `restore-dep.sh <consumer>` reinstalls from the committed lockfile and stamps the restore time.
- Repack whenever a dependency's tip moves; the register's digest makes a stale stage detectable.
- Tarballs live under `tmp/`, are never committed, and are swept at acceptance; the register and
  the scripts survive.

## Exit criterion

The phase ends when every row in `work-order.md`, `work-order-extra.json`, and the audit carriers
in `audit-findings.json` appears exactly once in the closure table as **applied** (landed with its
guide, tests, and parity list; its unit's gates green against the staged closure; its audit
verdict `PASS`), **refused** with the rule text quoted, or **carried** with its reason; the catalog
is regenerated; the vocabulary and the style-primitives sentence stand in their rule files; every
dependent of a changed package is either a unit or a green typecheck against the staged closure,
with every red from the W-END sweep owning a successor brief; every register row names its
pending re-pin; every tarball is swept; no version is bumped and nothing is published. The
publish wave is the next goal.

## Standing condition: L2 closures staged before indexeddb and sqlite were accepted

The eight L2 units launched early (console, markdown, middleware, process, reason, table, template,
websocket) were staged with indexeddb at `80ee848` and sqlite at `a397f6c`, the pre-unit tips.
indexeddb closed at `bf4730e` and sqlite at `5a9340b` on 2026-09-02, and database's closure is
staged from those. When each of the eight lands, before its audit: re-run `stage-closure.sh` for
that checkout, run `npm run check` and `npm run test:guides`, and read any red as an adoption
list for a builder fix-up (middleware's closure carries indexeddb and sqlite; the others do not,
so their re-stage is a no-op that the verify step proves). After database lands, repeat for every
L2 checkout whose closure carries database (middleware) before the L2 tips are packed for L3.

## Standing condition: middleware consumes server

Middleware's runtime dependencies include `@orkestrel/server` (a layer-3 package) although the
catalog places middleware in layer 2; the publish order therefore runs server before middleware
regardless of the layer column. Middleware adopted server's renames in `units/middleware-adopt-server-brief.md`
after the server unit landed, and re-stages against server's fix-up tip before the L4 closures
are staged.

## W-END additions (L3 fix rounds)

- `readme-links`: one `builder` unit, after every package unit has landed, replacing
  `guides/src/<package>.md` with `guides/<package>.md` in each `README.md` the grep names,
  committed per package with the fleet gate sweep as its proof.

## Re-baseline: L4 implementer units start on complete closures

The brief, program, and workflow closures consume no L3 package still under audit (mcp is
consumed only by probe, an adopt-when-red unit), so their staging and implementer units start
while the mcp lanes and the browser verdict close. Probe, worker, queue, and lsp stage after mcp
is accepted. The exit criterion is unchanged.
