# Fix dossier: workflow

Verified fix-producing findings for the `workflow` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s06-01 — DRIFT

1. package=workflow file=`/home/user/fleet/workflow/src/core/types.ts:2210` rule=`AGENTS.md` § Non-negotiable rules ("inspect the exact declared and installed `@orkestrel/*` capabilities … do not wrap it merely to rename it") + `.claude/rules/patterns.md` § Declared ecosystem capabilities verdict=CONFIRMED
   wrong: `UnitOutcome<TResult>` is `{ ok: true; value } | { ok: false; error: unknown }`, which is the installed `Result<T, unknown>` from `@orkestrel/contract` (`Success<T> { success: true; value: T }` / `Failure<E> { success: false; error: E }`, `index.d.ts:5998`/`:1662`/`:5198`) with the discriminant renamed from `success` to `ok`, and the same file imports `Result` for every other outcome.
   repair: delete `UnitOutcome` and type `Runner.#settle`'s parameter (`Runner.ts:394`) as `Result<TResult, unknown>`, constructing the value with the package's own `success` / `failure` helpers at `Runner.ts:341-342`.

## s06-02 — DRIFT-RESHAPE

2. package=workflow file=`/home/user/fleet/workflow/src/core/WorkflowRunner.ts:688-690` rule=`.claude/rules/typescript.md` § Types ("Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`") + `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: the settled-attempt union `readonly [settled: true, value: JSONValue] | readonly [settled: false, value: undefined, genuine?: boolean]` is written out verbatim four times (`:688-690`, `:840-843`, `:845-848`, `:862-865`) as an anonymous inline type, and it is a third spelling of the outcome concept the package already names `Result` (and, per finding 1, `UnitOutcome`).
   repair: express the attempt outcome as `Result<JSONValue, ...>` from `@orkestrel/contract`, or declare one named type in `core/types.ts` and reference it at all four sites.

### Verification

**Judge (DRIFT-RESHAPE/high):** The drift is real and verified at all four sites, and the package states the centralization convention itself on `RunnerUnit`. The repair as written offers `Result<JSONValue, …>` as its first option; that option is wrong, because the unsettled branch is a cancellation with an optional `genuine` flag

**Lane DRIFT/high:** amend: declare one named type in `core/types.ts` and reference it at all four sites. Drop the `Result<JSONValue, …>` option — a cancelled attempt carries no error, so mapping it onto contract's `Failure` would invent one.

**Lane DRIFT-RESHAPE/high:** amend: declare ONE named attempt-outcome type in `src/core/types.ts` and reference it at WorkflowRunner.ts:689, :841, :846, :863. Do not map it onto `Result` — its unsettled branch is a cancellation with a `genuine` flag, not an error.

## s06-03 — DRIFT

3. package=workflow file=`/home/user/fleet/workflow/src/core/helpers.ts:843` and `/home/user/fleet/workflow/src/core/types.ts:2335` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete one-line delegates … and wrappers around semantically identical platform … primitives") verdict=CONFIRMED
   wrong: `createDeferred<T>()` is `return Promise.withResolvers<T>()` and `DeferredInterface<T>` restates the native `PromiseWithResolvers<T>`. The package itself bypasses the wrapper wherever it is inconvenient — `WorkflowRunner.ts:845`, `:862`, `:931`, `:953`, `TaskController.ts:111`, `:137`, `WorkflowManager.ts:102`, `:123`, `WorkflowPersistence.ts:204` all use the native primitive directly — so one concept ships under two spellings inside one module.
   repair: delete `createDeferred` and `DeferredInterface`, and use `Promise.withResolvers<T>()` / `PromiseWithResolvers<T>` at the four call sites in `Workflow.ts:263`, `Phase.ts:274`, `Task.ts:385`, `Runner.ts:183,211,280,292`.

### Verification

**Judge (DRIFT/high):** The subjective lane's decisive claim fails on inspection. Deleting `DeferredInterface` puts no mutable property and no `any` into the package's declared types: every use is a `#` private field or `#` private parameter, all at `<void>` where the narrowing forbids nothing, and the package already decl

**Lane DRIFT-RESHAPE/high:** amend: keep `DeferredInterface` and `createDeferred`, and route the nine native sites through them — `Promise.withResolvers<T>()` → `createDeferred<T>()` and `PromiseWithResolvers<T>` → `DeferredInterface<T>` at `WorkflowRunner.ts:845,862,931,953`, `tasks/TaskController.ts:111,137`, `WorkflowManager.ts:102,123`, `WorkflowPersistence.ts:204`.

**Lane DRIFT/high:** stands — the repair must also retype the holder fields/parameters (Workflow.ts:119, Phase.ts:126, Task.ts:103, Runner.ts:96,446,458) and delete the guide rows at guides/workflow.md:77, :399 and the section at :1320-1330.

## s06-04 — DRIFT-RESHAPE

4. package=workflow file=`/home/user/fleet/workflow/src/core/WorkflowRunner.ts:769-805` rule=`AGENTS.md` § Design laws ("If one word is insufficient, change the shape: group options, extract a sub-entity") + `.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
   wrong: `#gate` and `#settleAttempt` each take eleven positional parameters, and `#gate` is invoked three times (`:611-658`) with an identical ten-argument tail differing only in the first argument. `#runTask` (`:551`) takes eight, `#runUnit` (`:498-517`) exists solely to re-order arguments before forwarding 1:1 to `#runTask`, and the run-scoped holder type `{ runner: RunnerInterface<TaskInterface, void> | undefined }` is written inline in four signatures (`:273`, `:403`, `:477`, `:485`).
   repair: declare one run-scoped context type in `core/types.ts` carrying `workflow`, `signal`, `bail`, `attempts`, `owners`, `persistence`, and the active-runner holder; pass it as a single parameter to `#runPhase` / `#runTask` / `#gate` / `#settleAttempt`; delete `#runUnit` and bind `#runTask` directly with `controller.input` read inside it.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: declare the run-scoped context type in `core/types.ts` and thread it through `#runPhase` / `#runTask` / `#gate` / `#settleAttempt`, preserving the per-`#execute` cell the file head documents at :37-41. Record parameter count as an observation, not the violation. Delete `#runUnit` only as part of reordering `#runTask` to take `controller` last; otherwise it stays as the bind-order adapter.

**Lane DRIFT-RESHAPE/medium:** amend: declare the run-scoped holder type once in `src/core/types.ts` and use it at WorkflowRunner.ts:273,403,477,485 under architecture.md:290. Drop the arity claim (no quoted rule bans it) and keep `#runUnit`, which translates the queue-handler signature rather than forwarding unchanged.

## s06-05 — DRIFT-RESHAPE

5. package=workflow file=`/home/user/fleet/workflow/src/core/WorkflowRunner.ts:1056`, `:1063`, `:1074`, `:1082`, `:1093`, `:900`, `:904`, `:963`, `:979`, `:1034`, `:1046` rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test item 2, "Pure self-contained computation … → exported helper") + § Wrapper test + § Centralized-file pattern (Guards → `*/validators.ts`) verdict=CONFIRMED
   wrong: a family of `#` methods on `WorkflowRunner` touches no instance state and is pure over its arguments — `#cancelled`, `#halted`, `#stoppable`, `#completable`, `#owns`, `#revoke`, `#taskSignal`, `#fold`, `#skip`, `#skipping`, `#isWorkflow`. `#cancelled(runSignal)` is a rename-only wrapper for `runSignal.aborted`; `#isWorkflow` is a hidden type guard (`target is WorkflowInterface`) outside `validators.ts`; and `#halted` / `#stoppable` hand-roll the terminal-status vocabulary that `isTerminalStatus` (`helpers.ts:96`) already owns. The same shape recurs in `IdleScheduler.ts:96,100` (`#request` / `#cancel`).
   repair: move the pure status and signal predicates into `core/helpers.ts` beside `isTerminalStatus` and export them; move `#isWorkflow` into `core/validators.ts` as an exported `isWorkflowInterface` guard; delete `#cancelled` and read `runSignal.aborted` at its call sites; express `#halted` / `#stoppable` in terms of `isTerminalStatus` so the terminal set has one definition.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: move `#cancelled`, `#halted`, `#stoppable`, `#completable`, `#owns`, `#revoke`, `#skip`, and `#skipping` into `core/helpers.ts` beside `isTerminalStatus` and express the terminal checks in terms of it. Reshape `#isWorkflow` to a total `isWorkflowInterface(value: unknown): value is WorkflowInterface` before moving it to `validators.ts`. Leave `#fold`, `#taskSignal`, and `IdleScheduler.#request`/`#cancel` in place.

**Lane DRIFT-RESHAPE/high:** amend: move the pure predicates (`#cancelled`, `#halted`, `#stoppable`, `#completable`, `#owns`, `#skipping`, `#taskSignal`, `#fold`) to `core/helpers.ts` and `#isWorkflow` to `core/validators.ts` as an exported guard; express `#halted` through `isTerminalStatus` only where the terminal set actually applies, and leave `#stoppable` as its own predicate (it admits `completed` and `skipped`); leave `#skip` and `#revoke` as methods, since they mutate their arguments rather than computing.

## s06-06 — DRIFT

6. package=workflow file=`/home/user/fleet/workflow/src/core/tasks/TaskManager.ts:37-116` and `/home/user/fleet/workflow/src/core/phases/PhaseManager.ts:36-115` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice"; "implement shared … in one engine over those primitives") verdict=CONFIRMED
   wrong: the two managers are the same class twice. `append`, `add`, `remove`, `move`, `update`, `#reorder`, the `Map` store, the compiled-guard field, the bounds checks, and the error messages differ only in the entity noun and the shape passed to `compileGuard`.
   repair: hoist the insertion-ordered gated store into one generic engine over `{ id, status, patch }` (holding the `Map`, `#reorder`, and the gated `add` / `remove` / `move` / `update`), and leave `TaskManager` / `PhaseManager` holding only the domain accessors `task` / `tasks` and `phase` / `phases` plus their update shape, which `.claude/rules/patterns.md` § Managers requires by name.

## s06-07 — DRIFT

7. package=workflow file=`/home/user/fleet/workflow/src/core/Scheduler.ts:63`, `/home/user/fleet/workflow/src/browser/BrowserScheduler.ts:98`, `/home/user/fleet/workflow/src/browser/FrameScheduler.ts:67`, `/home/user/fleet/workflow/src/browser/IdleScheduler.ts:89`, `/home/user/fleet/workflow/src/server/NodeScheduler.ts:71` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + `.claude/rules/names.md` § General vocabulary ("one term per concept") verdict=CONFIRMED
   wrong: the identical `setTimeout` boundary — `scheduleHost((complete) => { const handle = setTimeout(complete, ms); return () => clearTimeout(handle) }, signal)` — is written in all five scheduler classes, under two different private names (`#sleep` in four, `#timer` in `BrowserScheduler`).
   repair: export one leaf from `core/helpers.ts` beside `scheduleHost` (for example `delayHost(ms, signal)`), and have every scheduler's `delay`, and the macrotask fallbacks in `BrowserScheduler.yield` and `IdleScheduler.yield`, call it.

## s06-08 — DRIFT-RESHAPE

8. package=workflow file=`/home/user/fleet/workflow/src/core/validators.ts:263-320` and `/home/user/fleet/workflow/src/core/cloners.ts:96-111,146-162` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + `AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
   wrong: the `{ id, name, started }` claim list is validated twice in `isTaskActivityInput` (operations, then constraints, as two near-identical blocks) and cloned twice in `cloneTaskActivity` (again operations, then constraints) — four copies of one shape's prototype check, exact-key check, uniqueness check, and field checks. `TaskOperation` (`types.ts:178`) and `TaskConstraint` (`types.ts:205`) are structurally identical, so nothing distinguishes the copies.
   repair: give the shape one guard in `validators.ts` and one cloner in `cloners.ts` over the shared member type, and call each twice; keep `TaskOperation` and `TaskConstraint` as distinct names only if a member is added that actually differs.

### Verification

**Judge (DRIFT-RESHAPE/high):** The duplication is real and the centralization rule reaches it, so the extraction half of the repair is right. The repair's trailing clause is not: "keep `TaskOperation` and `TaskConstraint` as distinct names only if a member is added that actually differs" directs deleting a documented published do

**Lane DRIFT-RESHAPE/high:** amend: extract one shared claim-list guard into `validators.ts` and one shared cloner into `cloners.ts`, each taking the entity noun for its message, and call each twice. Keep `TaskOperation` and `TaskConstraint` as distinct published names.

**Lane DRIFT/high:** stands

## s06-09 — DRIFT-RESHAPE

9. package=workflow file=`/home/user/fleet/workflow/src/core/index.ts:12,15,16,19,20,21` rule=`.claude/rules/architecture.md` § Barrel exports ("Barrel that class when a consumer can construct it from values they already hold. Intern it … when its constructor requires a value only its owner produces"; "Delete a barrel row whose class no consumer can construct") verdict=CONFIRMED
   wrong: `Phase`, `Task`, `PhaseManager`, `TaskManager`, `Controller`, and `TaskController` are barrelled, and `tests/guides.test.ts:43` declares `INTERNAL` empty, so parity treats all of them as public. None is constructible by a consumer: `Phase` (`Phase.ts:128`) and `Task` (`Task.ts:106`) require the parent's own `#recompute` escalation callback, `Controller` (`Controller.ts:40`) requires the runner's launch-a-sibling closure, `TaskController` (`TaskController.ts:48`) requires three runner-owned closures, and the two managers can be constructed only to hold entities the consumer cannot mint. The guide documents them as public classes at `guides/workflow.md:86-89,99-101`.
   repair: remove those rows from `core/index.ts`, list the class names in the `INTERNAL` array in `tests/guides.test.ts`, and replace their Surface rows in `guides/workflow.md` with the interfaces consumers actually receive (`PhaseInterface`, `TaskInterface`, `TaskManagerInterface`, `PhaseManagerInterface`, `ControllerInterface`, `TaskControllerInterface`).

### Verification

**Lane DRIFT-RESHAPE/high:** amend: remove the `Phase`, `Task`, `Controller`, and `TaskController` rows from `core/index.ts`, name those four in `INTERNAL` at `tests/guides.test.ts:43`, and replace their guide Surface rows with the interfaces consumers receive. Keep `PhaseManager` and `TaskManager` barrelled and documented.

**Lane DRIFT-RESHAPE/medium:** amend: intern `Phase`, `Task`, `Controller`, and `TaskController` (remove core/index.ts:12,15,16,21, name them in `INTERNAL` at tests/guides.test.ts:43, replace their guide rows at guides/workflow.md:86,87,100,101 with the interfaces consumers receive). Keep `PhaseManager` and `TaskManager` barrelled — their constructors require nothing.

## s06-11 — DRIFT

11. package=workflow file=`/home/user/fleet/workflow/src/core/Workflow.ts:87,132-134`, `/home/user/fleet/workflow/src/core/phases/Phase.ts:94,142-147,373-378`, `/home/user/fleet/workflow/src/core/tasks/Task.ts:70,156-161,424-429` rule=`.claude/rules/typescript.md` § Types ("Optional state is `T | undefined`") verdict=CONFIRMED
    wrong: the three entity interfaces declare `readonly description?: string` (`types.ts:857`, `:980`, `:1178`), which forces every implementation to declare the field with `declare readonly description?: string` and then write it through `Object.defineProperty` — including inside `patch`, where a `readonly` declaration is mutated through the escape hatch. The same entities already model their other optional runtime state correctly as `T | undefined` (`TaskInterface.result`, `.run`, `.retries`, `.timeout`), so the package holds two conventions for one thing.
    repair: declare `readonly description: string | undefined` on `WorkflowInterface`, `PhaseInterface`, and `TaskInterface`, leave the JSON `*Definition` / `*Snapshot` shapes optional (a JSON omission is genuine absence), and implement it as a `#description` field with a getter exactly as `name` is done — deleting the `declare` fields and all five `Object.defineProperty` calls.

## s06-12 — DRIFT

12. package=workflow file=`/home/user/fleet/workflow/src/core/constants.ts:20,30,40,57` rule=`AGENTS.md` § Design laws ("Derive state … Do not store a second flag or label that can drift") + `.claude/rules/architecture.md` § System constraints ("Build or substantively expand a capability with its first real consumer") verdict=CONFIRMED
    wrong: `TASK_STATUSES`, `PHASE_STATUSES`, and `WORKFLOW_STATUSES` are three byte-identical frozen arrays of one vocabulary (the three status types are direct aliases of `LifecycleStatus`, `types.ts:348,360,372`), and no file in the package reads any of the four constants — a search for the four names across every `.ts` file under `/home/user/fleet/workflow` matches only their declarations. The docs state relationships the code does not have: `constants.ts:6-8` calls them "the runtime source of truth for the §10 unions", yet `isLifecycleStatus` (`validators.ts:23`) hard-codes the six literals; `constants.ts:54` calls `TERMINAL_TASK_STATUSES` "the source of truth behind `isTerminalStatus`", yet `isTerminalStatus` (`helpers.ts:96`) hard-codes four comparisons.
    repair: keep one `LIFECYCLE_STATUSES` and one `TERMINAL_STATUSES`, delete the other rows, and make `isLifecycleStatus` and `isTerminalStatus` read them (`literalOf` from `@orkestrel/contract` composes the first directly) so the claim in the comment becomes true.

## s06-14 — DRIFT

14. package=workflow file=`/home/user/fleet/workflow/src/core/Workflow.ts:480`, `/home/user/fleet/workflow/src/core/phases/Phase.ts:449`, `/home/user/fleet/workflow/src/core/Runner.ts:179,180,359,382` rule=`.claude/rules/typescript.md` § Errors and outcomes ("Programmer error or invalid argument → Throw an `AppError`"; "Error classes expose a machine-readable `code`"; "Every public error class ships with a guard … for safe `catch` narrowing") verdict=CONFIRMED
    wrong: six programmer-error throws use bare `Error`, so a consumer catching them cannot narrow with `isWorkflowError` or branch on a code — including two on the documented one-shot contract of `RunnerInterface.execute` ("a second call throws", `types.ts:2247`), which is a reachable public path.
    repair: throw `WorkflowError` with an existing code, or add the code the fault needs to `WorkflowErrorCode` (`types.ts:313`) and document it there alongside `TRANSITION` / `RESTORE` / `MUTATION` / `SCHEDULE`.

## s06-16 — DRIFT

16. package=workflow file=`/home/user/fleet/workflow/src/core/helpers.ts:710` rule=`.claude/rules/names.md` § Standalone helpers ("Module helpers … default to `{verb}{Noun}`") verdict=CONFIRMED
    wrong: `workflowSnapshotContext` is a bare noun phrase, so the name states neither what it does nor that it can return `undefined`; its own doc says "Locate the nearest identifiable node".
    repair: rename to `locateSnapshotContext` and update the two call sites in `cloners.ts:33` and the barrel consumer set.

## s06-17 — DRIFT-RESHAPE

17. package=workflow file=`/home/user/fleet/workflow/src/core/WorkflowManager.ts:12` rule=`.claude/rules/architecture.md` § Declaration placement (cleanup sweep: no duplicate implementations or stale import edges) + `.claude/rules/quality.md` § Instruments ("Prove a module cycle by loading the built artifact") verdict=CONFIRMED
    wrong: `WorkflowManager.ts` imports `createWorkflow` / `createRestoredWorkflow` from `./factories.js`, while `factories.ts:31` imports `WorkflowManager` — a static class↔factory cycle. `WorkflowRunner` deliberately avoids the same edge and records why at `WorkflowRunner.ts:217-219` ("built DIRECTLY (not via `createWorkflow`) so the runner never imports its own module's factory — preserving this codebase's factories→classes direction"), so the package states one direction and breaks it in the neighbouring class.
    repair: build in `WorkflowManager` the way `WorkflowRunner` does — `new Workflow(definitionToSnapshot(definition, bail), captured)` and `new Workflow(cloneWorkflowSnapshot(snapshot), captured)` — or extract the shared build step into a helper both the factory and the manager import, so the import direction stays factories→classes.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: extract the shared definition→snapshot→`new Workflow` build step into a helper that `factories.ts`, `WorkflowManager.ts`, and `WorkflowRunner.ts` all import, so the factories→classes direction holds with one construction path. Do not build inline in `WorkflowManager`.

**Lane DRIFT-RESHAPE/medium:** amend: either extract the shared build step so both the factory and the manager import it (keeping the stated direction true), or narrow the WorkflowRunner.ts:217-219 comment to the file it describes. Do not carry this as a proven cycle defect — the published bundle loads with both exports live.

## s06-18 — DRIFT-RESHAPE

18. package=workflow file=`/home/user/fleet/workflow/src/core/types.ts:589`, `/home/user/fleet/workflow/src/core/factories.ts:267`, `/home/user/fleet/workflow/src/core/stores/DatabaseWorkflowStore.ts:31`, `/home/user/fleet/workflow/src/core/validators.ts:52` rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped"; a parity failure identifies drift) verdict=CONFIRMED
    wrong: three TSDoc blocks state that `DatabaseWorkflowStore.get` narrows the opaque column through `isWorkflowSnapshot` and locate that function in `helpers.js`. It lives in `validators.ts:214`, and `DatabaseWorkflowStore.get` (`:69-75`) calls `cloneWorkflowSnapshot` instead. `validators.ts:52` compounds it: "Callers at hostile boundaries use `isWorkflowSnapshot`" — no `src/` caller does; the only consumers are tests.
    repair: point the three links at `./validators.js` and name the function the store actually calls (`cloneWorkflowSnapshot`), and rewrite `validators.ts:52` to describe the guard's real role.

### Verification

**Judge (DRIFT-RESHAPE/high):** The three module paths are wrong and the store's narrowing step is misnamed, on a surface no gate checks - the failure mode the rule names. The repair's final clause is wrong: it directs rewriting validators.ts:52, but that sentence describes the consumer-facing role the guide documents and needs no

**Lane DRIFT/high:** amend: point the three links at `./validators.js` and name `cloneWorkflowSnapshot` as the function `DatabaseWorkflowStore.get` actually calls. Leave `validators.ts:52` as it stands — it describes consumer use, which `guides/workflow.md:199,1138` documents.

**Lane DRIFT-RESHAPE/high:** amend: repoint the three links at `./validators.js` (`../validators.js` from the store) and name `cloneWorkflowSnapshot` as what `DatabaseWorkflowStore.get` calls. Leave validators.ts:52 as written — it already describes the guard's real role.

## s06-19 — DRIFT

19. package=workflow file=`/home/user/fleet/workflow/src/core/types.ts:393-425` rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc") verdict=CONFIRMED
    wrong: the block describing "The structured outcome of a task execution — its full lineage, its terminal status … `result` BOXES the produced outcome" sits directly above `export type TaskFailureOrigin` (`:409`), which is a three-member origin union it does not describe, while `TaskResult` (`:417`) — the interface the block is about — carries no TSDoc at all.
    repair: move the block onto `TaskResult` and give `TaskFailureOrigin` its own sentence naming what each origin means.

## s06-20 — DRIFT

20. package=workflow file=`/home/user/fleet/workflow/src/core/validators.ts:22,34,213,219,327` and `/home/user/fleet/workflow/src/core/helpers.ts:561,566` rule=`.claude/rules/typescript.md` § Comments and API documentation ("description, `@param`, `@returns`, and `@example` where applicable") verdict=CONFIRMED
    wrong: `isLifecycleStatus`, `isTaskFailure`, `isWorkflowSnapshot`, `isTaskActivityInput`, `isTaskActivity`, `matchesDescription`, and `isTaskResult` are barrelled exports carrying a single summary line with no `@param` and no `@returns`; `isOwnedWorkflowSnapshot` (`validators.ts:48`) has a description and `@remarks` but neither tag. Every neighbouring export in `cloners.ts` and `helpers.ts` carries the full set, so the omission is inconsistency rather than a documented style.
    repair: add `@param` and `@returns` to each, following the boolean-return form the rule fixes ("True if …; false otherwise"), and give `isTaskResult` an `@example` since its four-argument lineage contract is not obvious from the signature.

## s06-21 — DRIFT

21. package=workflow file=`/home/user/fleet/workflow/src/core/types.ts:1657-1691` rule=`.claude/rules/typescript.md` § Comments and API documentation + `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: `WorkflowRunOptions` declares `store`, but its `@remarks` enumerates only "the three bounds below" and documents `signal`, `timeout`, and `budget`; `store` is never described. The entity-form `execute` overload repeats the omission — `types.ts:1801` and `WorkflowRunner.ts:175-177` say `options` "carries only the per-run BOUNDS (`signal` / `timeout` / `budget`)", while its type `Omit<WorkflowRunOptions, keyof WorkflowOptions>` admits `store`, which that overload does honour.
    repair: document `store` on `WorkflowRunOptions` beside the bounds (what a supplied store makes durable, and that `durable` / `fault` on `WorkflowResult` are omitted without one), and correct both overload sentences to name `store` as an accepted per-run option.

## s06-22 — DRIFT

22. package=workflow file=`/home/user/fleet/workflow/src/core/types.ts:1624` rule=`AGENTS.md` § Design laws ("Real domain states only. Literal unions represent irreducible modes, phases, discriminants, or external values — not decorative labels for facts already represented") verdict=CONFIRMED
    wrong: `WorkflowFault.origin` is the single-member union `'persistence'`, and the only construction site (`WorkflowPersistence.ts:73`) writes that literal unconditionally. The field carries no information the type name `WorkflowFault` does not already carry, and it is stored in every persisted fault.
    repair: drop `origin` from `WorkflowFault`; reintroduce a discriminant only when a second fault origin exists. Keep `TaskFailure.origin`, which does vary.

## s06-23 — DRIFT

23. package=workflow file=`/home/user/fleet/workflow/src/core/types.ts:39` rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary ("Never introduce synonyms such as `cancel`, `reset`, or `run`") + § General vocabulary ("Properties are nouns; methods are verbs") verdict=CONFIRMED
    wrong: `TaskDefinition.run` — mirrored on `TaskSnapshot.run` (`:454`) and `TaskInterface.run` (`:871`) — is a property holding a registry key, named with a verb the project reserves as a banned synonym for `execute`. The doc has to explain the name away each time ("`run` is a PLAIN NAME — a key", "The behavior reference — a plain registry key name"), and the resolved value beside it is already a noun (`handler`).
    repair: rename the field to a noun that states what it holds — `behavior` — across `TaskDefinition`, `TaskSnapshot`, `TaskInterface`, `taskShape`, the helpers that copy it, and the guide. This moves a serialized JSON field, so schedule it with the version bump the rename earns rather than leaving the name in place.

## s06-24 — DRIFT

24. package=workflow file=`/home/user/fleet/workflow/src/browser/types.ts:11` rule=`.claude/rules/names.md` § Type-level identifiers ("Behavioral interface → `{Entity}Interface`") verdict=CONFIRMED
    wrong: `IdleAPI` is an interface whose members are both behavior (`request`, `cancel`), so it is a behavioral interface named with an `API` suffix the table does not admit; the method that produces it, `IdleScheduler.#idleAPI()` (`IdleScheduler.ts:70`), is likewise a noun where the rule wants a verb.
    repair: rename the type to `IdleInterface` and the private method to a verb form such as `#detectIdle`.

### Verification

**Judge (DRIFT/high):** Both halves are real. The type name matches no row of the type-form table and is the sole `*API` type across every package in the fleet, so nothing establishes it as an accepted form. The method is named for its return type where names.md:149 fixes a bare verb, and its own comment already supplies t

**Lane DRIFT/high:** stands

**Lane DRIFT-RESHAPE/medium:** amend: rename the type to `IdleInterface` and carry guides/workflow.md:147,151 with it. Either leave `#idleAPI` or rename the whole noun-named private boundary family (`#idle`, `#sleep`, `#timer`, `#frame`, `#immediate`) in one pass under names.md:100.

## s06-25 — DRIFT-RESHAPE

25. package=workflow file=`/home/user/fleet/workflow/src/core/WorkflowPersistence.ts:94,88,41-47,97-172` rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary + `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + `AGENTS.md` § Design laws ("Derive state") verdict=CONFIRMED
    wrong: three points in one class. `detach()` is a synonym for the fixed verb `destroy` ("Tear down and release resources") — it releases every listener permanently and is idempotent — and `finalize()` compounds that non-standard verb. `#onWorkflowChange`, `#onPhaseChange`, and `#onTaskChange` (`:41`, `:44`, `:47`) are three fields bound to the same `#change` method, where one shared bound handler serves all three emitters. The event-name lists are written out twice each, in `#attachWorkflow` / `detach`, `#attachPhase` / `#detachPhase`, and `#attachTask` / `#detachTask`, so adding an event means editing it in two places.
    repair: rename `detach` to `destroy` on `WorkflowPersistenceInterface` and the class (and rename `finalize` to a name that reads as its composition, such as `settle`, or fold it into `destroy` returning the final durability result); keep one `#onChange` field; and put the three event-name lists in `core/constants.ts` and loop over them in the attach and detach methods.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: keep `detach` and `finalize` as named. Fold the three bound-change fields into one `#onChange`, and move the three event-name lists into `core/constants.ts` with the attach and detach methods looping over them.

**Lane DRIFT-RESHAPE/medium:** amend: keep one `#onChange` field and move the event-name lists into `core/constants.ts`, looping over them in the attach and detach methods. Leave `detach` and `finalize` named as they are — `finalize()` uses the instance after `detach()`, so neither carries the fixed `destroy` meaning.

## s06-26 — DRIFT

26. package=workflow file=`/home/user/fleet/workflow/src/core/tasks/Task.ts:486-488` rule=`.claude/rules/architecture.md` § Wrapper test ("Delete one-line delegates … rename-only helpers/getters") verdict=CONFIRMED
    wrong: `#escalate()` exists only to call `this.#recompute()`, and it is called from five sites that could call `#recompute` directly.
    repair: delete `#escalate` and call `this.#recompute()` at `Task.ts:271,298,322,333,344`.

## s06-27 — DRIFT-RESHAPE

27. package=workflow file=`/home/user/fleet/workflow/src/core/Runner.ts:446-469,104,435,87` rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") + `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: `#settleLifecycle` and `#settleDestroy` are the same method apart from one `this.#emitter.destroy()` line, and the anonymous error box `{ readonly error: unknown }` is written inline at `:104`, `:435`, `:447`, `:459` (with its value twin `{ readonly value: TResult }` at `:87`) — an unnamed reusable type that is, again, `Failure<unknown>` / `Success<TResult>` from `@orkestrel/contract`.
    repair: keep one settle method taking a boolean for whether to destroy the emitter (or have `#settleDestroy` call it and then destroy), and type the boxes as the installed `Failure<unknown>` / `Success<TResult>`.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: keep one settle method taking a boolean for whether to destroy the emitter, and declare a named box type in `core/types.ts` for `{ readonly error: unknown }` and `{ readonly value: TResult }`. Do not type them as contract's `Failure` / `Success`, and do not use the call-then-destroy alternative.

**Lane DRIFT-RESHAPE/high:** amend: declare the error box (and its value twin) as named types in `src/core/types.ts` and use them at Runner.ts:87,104,435,447,459 — do NOT retype them as `Success`/`Failure`, whose `success` discriminant these boxes deliberately lack. Keep one settle method taking a boolean for the emitter teardown, preserving the destroy-before-settle ordering.

## s06-28 — DRIFT

28. package=workflow file=`/home/user/fleet/workflow/src/core/factories.ts:1-33` rule=`.claude/rules/typescript.md` § Syntax and imports ("Place `import type` declarations before value imports") verdict=CONFIRMED
    wrong: the value import `import { Scheduler } from './Scheduler.js'` sits at line 2, between the type import at line 1 and the type imports at lines 3-15; and `./types.js` is imported twice as a type (lines 1 and 5-15) rather than once.
    repair: move `import { Scheduler }` down into the value-import block and merge the two `./types.js` type imports into one.

## s06-29 — DRIFT-RESHAPE

29. package=workflow file=`/home/user/fleet/workflow/src/core/types.ts:1520`, `/home/user/fleet/workflow/src/core/Scheduler.ts:52`, `/home/user/fleet/workflow/src/core/helpers.ts:193`, `/home/user/fleet/workflow/src/core/shapers.ts:28`, `/home/user/fleet/workflow/src/core/WorkflowRunner.ts:65`, `/home/user/fleet/workflow/src/browser/BrowserScheduler.ts:57`, `/home/user/fleet/workflow/src/browser/FrameScheduler.ts:47`, `/home/user/fleet/workflow/src/browser/IdleScheduler.ts:56`, `/home/user/fleet/workflow/src/server/NodeScheduler.ts:51` rule=`.claude/rules/writing.md` § Substitutions (governs TSDoc through `AGENTS.md` § Writing, "This governs prose everywhere … TSDoc") verdict=CONFIRMED
    wrong: banned substitution-table terms run through the TSDoc. Pattern `\bvia\b` matches in `core/types.ts`, `core/Workflow.ts`, `core/Controller.ts`, `core/Scheduler.ts`, `core/factories.ts`, `core/phases/Phase.ts`, `core/WorkflowRunner.ts`, `core/Runner.ts`, `browser/BrowserScheduler.ts`, `browser/FrameScheduler.ts`, `browser/IdleScheduler.ts`, `browser/factories.ts`, `server/factories.ts`, `server/NodeScheduler.ts`. Pattern `\bshould\b` matches in the banned recommendation sense at the five scheduler `delay` docs ("`ms` should be a non-negative finite number", repeated verbatim), `core/types.ts:1520`, `core/factories.ts:449`, `browser/FrameScheduler.ts:11`, `browser/factories.ts:41`, `server/factories.ts:11`, `core/WorkflowRunner.ts:1038`. Patterns `\bsimply\b` and `\bjust\b` match at `core/helpers.ts:193`, `core/shapers.ts:28`, `core/WorkflowRunner.ts:65,467,978,998`, `core/types.ts:1604,1731`, `core/Runner.ts:38`, `browser/BrowserScheduler.ts:18`, `browser/FrameScheduler.ts:6,35`, `browser/IdleScheduler.ts:18`, `browser/factories.ts:37`. Pattern `\bcurrently\b` matches as temporal filler at `core/types.ts:989,1184,1567,2239,2263`, `core/Workflow.ts:115,268`, `core/phases/Phase.ts:122,279`, `core/Runner.ts:153,254`.
    repair: replace `via` with `through` or `by using`; replace `should` with `must` or the imperative (the repeated `delay` paragraph becomes "Pass a non-negative finite `ms`."); delete `simply` and `just`; delete `currently` ("Whether the phase is paused").

### Verification

**Judge (DRIFT-RESHAPE/high):** I reproduced every sweep and the file lists match the finding exactly. The banned terms are real in the senses their rows ban, and typescript.md:73 puts `//` comments in scope. The repair as written says "delete `simply` and `just`" without qualification, which would delete three hits in a permitted

**Lane DRIFT/high:** amend: stands for `via`, `should`, `simply`, `currently`, and the minimizing `just`. Keep the temporal "just before the next paint" at `browser/factories.ts:37` and `browser/FrameScheduler.ts:6,35` — the substitution row bans the minimizing sense, not the temporal one.

**Lane DRIFT-RESHAPE/high:** amend: apply the replacements, but exclude the temporal `just before the next paint` at browser/FrameScheduler.ts:6,35 and browser/factories.ts:37, which is not the minimizer sense the row bans. Include core/Workflow.ts:226, which the finding's `should` list omits.

## s06-30 — DRIFT

30. package=workflow file=`/home/user/fleet/workflow/src/core/helpers.ts`, `/home/user/fleet/workflow/src/core/cloners.ts`, `/home/user/fleet/workflow/src/core/validators.ts`, `/home/user/fleet/workflow/src/core/factories.ts`, `/home/user/fleet/workflow/src/core/types.ts`, `/home/user/fleet/workflow/src/core/Scheduler.ts`, `/home/user/fleet/workflow/src/core/Runner.ts`, `/home/user/fleet/workflow/src/core/WorkflowPersistence.ts`, `/home/user/fleet/workflow/src/core/stores/MemoryWorkflowStore.ts`, `/home/user/fleet/workflow/src/core/stores/DatabaseWorkflowStore.ts`, `/home/user/fleet/workflow/src/browser/factories.ts`, `/home/user/fleet/workflow/src/browser/BrowserScheduler.ts`, `/home/user/fleet/workflow/src/browser/FrameScheduler.ts`, `/home/user/fleet/workflow/src/browser/IdleScheduler.ts`, `/home/user/fleet/workflow/src/server/factories.ts`, `/home/user/fleet/workflow/src/server/NodeScheduler.ts` rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: public TSDoc first sentences are imperative rather than third-person across the package (`Capture every top-level …`, `Validate and own a workflow snapshot …`, `Test the workflow lifecycle vocabulary.`, `Create the in-memory durable …`, `Resolve the persisted snapshot …`, `Yield control back to the host …`, `Persist every change …`). Reported as one finding per the dispatch: the fleet-wide convention lane has already confirmed this form fleet-wide, including in workflow.
    repair: none pending in this package; carry it under the fleet-wide convention decision rather than repairing it here.

