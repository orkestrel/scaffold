# Unit workflow-fixup — close the workflow unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/workflow` at commit `bcf8ab4` names no removed field in shipped prose, pins the
omitted `behavior` key, states the stored-snapshot break where a consumer reads, and names the
snapshot-context helper with a listed prefix.

## Context

**Findings, each with its ruling.** Apply in this order.

1. **Objective R2, amending the s06-16 ruling — the helper's prefix.** `locate*` is not in the
   `.claude/rules/names.md` § Standalone helpers table; `scan*` ("walks a structure and returns
   its findings") is what `src/core/helpers.ts:908` does — it walks the snapshot's phases and
   tasks and returns the context of the first inconsistent node. Ruling: `locateSnapshotContext`
   → `scanSnapshotContext` at `src/core/helpers.ts:908`, its call site in `src/core/cloners.ts`,
   `tests/src/core/validators.test.ts`, the guide row and fence in `guides/workflow.md`, and any
   other reference; keep imports sorted.
2. **Objective F5 — a false instruction in a published `.d.ts`.** `src/core/types.ts:906` reads
   `functions?.[run]` inside the `TaskInterface.handler` TSDoc. Ruling: `functions?.[behavior]`.
3. **Objective F6 — a comment naming the removed field.** `src/core/phases/Phase.ts:164` reads
   "the once-captured handler for its run". Ruling: "for its `behavior`", matching `:154-160` and
   `:472`.
4. **Objective F4 — a dead assertion.** `tests/src/core/helpers.test.ts:688` reads
   `expect('run' in snapshot).toBe(false)` under the case that pins omitted keys. Ruling:
   `expect('behavior' in snapshot).toBe(false)`. Insert the failing proof: with the assertion
   changed, temporarily make `taskDefinitionToSnapshot` emit `behavior: undefined` (one line),
   run `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`,
   record the failing assertion and count, restore the exact line, and record the same command
   green; confirm with `git diff --stat src/core/helpers.ts` that only finding 1's rename
   remains there.
5. **Objective F7 — inflected residue.** `tests/src/core/helpers.test.ts:1361-1362`
   (`'captured-runs'`, `'Captured runs'`), `tests/src/core/shapers.test.ts:186` (`noRun`), `:192`
   (`emptyRun`). Ruling: `'captured-behaviors'`, `'Captured behaviors'`, `noBehavior`,
   `emptyBehavior`.
6. **Objective F3 — the stored-snapshot break is stated nowhere a consumer reads.**
   `src/core/validators.ts:220-227` no longer admits `run` in the exact-key list, so a
   `TaskSnapshot` persisted by an earlier release fails `isOwnedWorkflowSnapshot` and every
   restore path throws `WorkflowError('RESTORE', 'workflow snapshot is inconsistent', …)` with no
   migration hint. Ruling: under "Persisting & restoring (the durable store)" in
   `guides/workflow.md`, add one paragraph stating that a snapshot written before this release
   carries the task registry key as `run`, that `cloneWorkflowSnapshot` and every restore path
   refuse it with a `RESTORE` `WorkflowError`, and that a consumer rewrites the key to `behavior`
   before restoring; name the release as the version that carries `behavior` (the next published
   version; write "the release that renames `run` to `behavior`" rather than a number).

7. **Subjective 1–4 — the guide names an interned class where a reader reaches for the handle.**
   `guides/workflow.md:10` (the layer summary), `:432` (the `RunnerHandler` Types row), `:1219`
   (the Patterns substrate paragraph, whose twin at `:116` already reads the interface names),
   and `:1339-1341` (the section heading and opening sentence for the per-unit handle) name
   `Controller` and `TaskController`. Ruling: `ControllerInterface` and `TaskControllerInterface`
   at those sites, matching `:116` and the `#### ControllerInterface` Methods heading. `Phase` and
   `Task` as tier nouns at `:8`, `:898`, `:1004`, `:1019-1025` stay as the tier reading; record
   that ruling in the report rather than sweeping them.
8. **Subjective 6 — `createWorkflowTree` carries a parameter every caller derives from the bag.**
   `src/core/factories.ts:164-170` takes `(definition, bail, captured)` while every call site
   (`src/core/factories.ts:127`, `src/core/WorkflowManager.ts:203`, `src/core/WorkflowRunner.ts:227`,
   the `@example` at `:160`) passes `captured.bail, captured`, and a caller handing a `bail` the
   bag contradicts would seed one policy at the snapshot and read another at the constructor.
   Ruling (amending the s06-17 carrier's shape): `createWorkflowTree(definition, captured)`
   reading `captured.bail` internally; every call site and the `@example` updated; the guide row
   at `guides/workflow.md:69` already describes the two-argument shape.
9. **Subjective ruling on the writer's `RunHolder` decision — intern the class, keep the
   interface.** No published entry accepts, returns, or exposes a `RunHolderInterface`;
   `WorkflowRunner.#execute` mints its own. Ruling: drop the `./RunHolder.js` row from
   `src/core/index.ts`, add `'class RunHolder'` to `INTERNAL` in `tests/guides.test.ts` beside
   the other interned handles, import it by relative path where a test needs it, remove its
   class row from the execution-substrate table in `guides/workflow.md` (`:125` region), and keep
   the `RunHolderInterface` Types row and its Methods table. Keep its `@example` blocks only if the
   parity test still requires them for an interned class; otherwise delete them.
10. **Subjective ruling on the `IdleScheduler` private names — keep the family form.** The ruled
    `#idle` inverted the family convention: `BrowserScheduler` names its detector for the host
    call (`#postTask`) and its boundary separately, and `FrameScheduler` names the boundary
    `#frame`. Ruling: the yield boundary is `#idle` again and the detector is `#idleCallback`,
    named for the host `requestIdleCallback` call; `#schedule` goes away. Private members only;
    no guide row moves.
11. **Subjective recommendation adopted — the guide's sample handler `run(...)`.**
    `guides/workflow.md:1285`, `:1309`, `:1352`, `:1367`, `:1390` name a consumer-supplied handler
    `run`, a banned lifecycle synonym the guide itself says `behavior` replaced. Ruling: rename the
    sample handler in each fence to the domain verb the fence performs (for example `compile`),
    keeping every call consistent inside the fence; the variable `const run = runner.execute(jobs)`
    at `:1369` reads as the noun and stays.
12. **Subjective 9 — the `RunHolder` examples.** `src/core/RunHolder.ts:21-27` and `:43-47` call
    `createRunner({ handler: (controller) => void controller.input })` without type arguments
    where the package writes them explicitly. Ruling: write the examples as
    `tests/src/core/RunHolder.test.ts:8` does — `createRunner<TaskInterface, void>({ handler: () => undefined })`
    — if finding 9 keeps the examples.

Recorded, no change: `Workflow.description` deriving from the frozen `#context` stands (both lanes recommend it) (the
derive-state law governs where the value already lives; the observable contract is the ruled
one); the s06-17 cycle is proven non-fatal by the retained probe
`.orkestrel/campaign/fix/units/workflow-probe-cycle.mjs` with its recorded output; the version bump
the serialized change earns is taken at release; `README.md`'s `guides/src/` link is the
`readme-links` sweep's; `RunnerValue`'s box is outside s06-01.

**Law.** `AGENTS.md`; `.claude/rules/names.md`; `.claude/rules/documentation.md`;
`.claude/rules/tests.md`; `.claude/rules/writing.md`. Read the copies under
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's `.claude/rules/`
differs.

**Host.** Linux, bash. Repository `/home/user/fleet/workflow` at commit `bcf8ab4`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the closure staged. Do not run `npm install`. Other gate chains run on this host
concurrently; if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once and
report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/helpers.ts`, `src/core/cloners.ts`, `src/core/types.ts` (the one TSDoc
line), `src/core/phases/Phase.ts` (the one comment), `src/core/factories.ts`,
`src/core/WorkflowManager.ts`, `src/core/WorkflowRunner.ts`, `src/core/index.ts`,
`src/core/RunHolder.ts`, `src/browser/IdleScheduler.ts`, `tests/guides.test.ts`,
`tests/src/core/RunHolder.test.ts`, `tests/src/core/factories.test.ts`,
`tests/src/browser/IdleScheduler.test.ts`, `guides/workflow.md`,
`tests/src/core/helpers.test.ts`, `tests/src/core/shapers.test.ts`,
`tests/src/core/validators.test.ts`, and any file the rename in finding 1 or the subjective
changes make false — each only at the named sites.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the findings in
order, run the word-boundary sweep and the case-insensitive inflected sweep for
`locateSnapshotContext`, `locate`, and `run` (as a code token, a fixture name, or a comment noun
for the removed field; a consumer-supplied `run(...)` fence function in the guide is recorded, not
changed, unless a subjective change names it) over `src`, `tests`, `guides/workflow.md`,
`README.md`, classifying every hit, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the red-then-green record for finding 4; the sweep and every hit classified; each gate
command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the rename collides with an existing export, or when a gate fails for a cause
you cannot attribute after the re-run. Decide, record, and carry on from the wording of a
sentence.

## Acceptance criteria

1. `rg -n 'locateSnapshotContext' src tests guides/workflow.md` returns no hit;
   `scanSnapshotContext` is exported and called at the cloner.
2. `rg -n "functions\?\.\[run\]|for its run\b|'run' in snapshot|captured-runs|Captured runs|noRun|emptyRun" src tests` returns no hit.
3. The finding-4 assertion went red under the planted `behavior: undefined` and is green with the
   plant removed.
4. The guide's persisting section states the pre-release `run` key, the `RESTORE` refusal, and
   the rewrite.
5. The gate chain exits 0.
6. `createWorkflowTree` takes `(definition, captured)`; `RunHolder` is absent from `src/core/index.ts`
   and present in `INTERNAL`; `rg -n '#schedule|#idleAPI' src/browser` returns no hit; the guide
   names `ControllerInterface` and `TaskControllerInterface` at the four sites and no fence
   handler is named `run`.
7. `git status --short` lists only owned files.
