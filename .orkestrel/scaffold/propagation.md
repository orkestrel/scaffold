# Scaffold propagation: what changed, and what 40 real targets revealed

Written for the parallel session working on app-layer targets. This session drove
`@orkestrel/scaffold` against all 40 published fleet repositories, every one of which is `src`-only.
So the defects below are the ones a `src`-only sweep can find; where a defect looks likely to have
an app-layer twin, it says so under **App cross-check**.

Companion file, owned by the other session: `.orkestrel/scaffold/alignment.md`.

## 1. What changed in scaffold

### Published: 0.0.26 → 0.0.27

Runtime dependency re-pins to the versions the registry now serves — `console ^0.0.5`,
`contract ^0.0.11`, `emitter ^0.0.6`, `markdown ^0.0.8`, `template ^0.0.3` — plus `guide ^0.0.10`
and `html ^0.0.3` in development, and the same moves in `BASE_DEV_DEPENDENCIES`,
`APP_DEV_DEPENDENCIES`, `APP_BROWSER_DEV_DEPENDENCIES` and `APP_SERVER_DEV_DEPENDENCIES` so a fresh
workspace starts current. **`APP_*` constants moved in this release** — that is the one manifest
change in 0.0.27 an app-layer target sees directly.

One capability was added.

**`CatalogEntry.dependencies` and `catalogToLayers`.** A catalog row now carries the runtime edges
its published version declares, read from the same abbreviated packument the version came from, so
the edges cost no extra request — `Upstream.#entry` had been discarding them.
`catalogToLayers(entries)` projects a catalog into the rounds it publishes in. No layer is stored on
a row, because a layer is a deterministic function of the rows' own edges and a stored one could only
disagree with them. The catalog table gained a `Layer` column and a runtime-dependency column, both
computed in the call that writes the row. Only `dependencies` is read; `devDependencies` reaches no
consumer of the published package and would invent rounds that do not exist.

Two test budgets widened where a measured run showed them below the work: the generated-configuration
typecheck spawns four real `tsc` runs against a ten-second budget, and every `src:bin` test drives the
real executable against Vitest's five-second default. Both passed alone and reported timeouts under a
full suite run.

### On `main`, unpublished at the time of writing

Three documentation commits, no surface change, so no bump is owed under the rule below:

- the writing-verb refusal for an unregistered Vitest project, stated as a limit;
- a correction to that limit — the vendor list registers no project, so the two fleet cases are
  one limit with one cause rather than two;
- a catalog-table refresh, because scaffold's own row still read `0.0.26` with pre-re-pin ranges.

### Unpublished, owed a bump: the `conformance` and `service` projects

This closes 3.1 below. The limit those two commits documented is now implemented, so the surface
moves and scaffold owes **0.0.28**.

| Added                                                                                                | Where                     |
| ---------------------------------------------------------------------------------------------------- | ------------------------- |
| `conformance: boolean`, `service: boolean` — two **required** fields                                 | `Blueprint` in `types.ts` |
| `CONFORMANCE_TEST_PATH`, `SERVICE_SETUP_PATH`, `SERVICE_TEST_INCLUDE`                                | `constants.ts`            |
| `conformance` and `service` keys on the frozen `CONFIG_TEMPLATES.factories`                          | `templates.ts`            |
| The matching branches in `blueprintToScripts`, `blueprintToRootVite`, and `blueprintToTestArtifacts` | `compilers.ts`            |

**The two `Blueprint` fields are required, so any caller building a blueprint literal must add
both.** `createBlueprint` defaults both to `false`, and every reading verb derives them, so only a
hand-built literal is affected.

Detection follows `integration` exactly — the proof file is the structural fact:

- exact-case `tests/conformance.test.ts` → `conformance`. Registers the project over that one file,
  emits `test:conformance`, and puts it **in** `test`. It measures the package against official
  tooling and drives nothing external: a conformance run may start a server, but it starts its own
  and reaches it over loopback, so the run stays hermetic. Say it that way — the earlier wording,
  "starts nothing", is false of the only conformance project in the fleet and was corrected in the
  source TSDoc during this release.
- exact-case `tests/setupService.ts` → `service`. Registers the project over
  `tests/service/**/*.test.ts` with 120s timeouts and `fileParallelism: false`, emits
  `test:service`, keeps it **out of** `test`, and requires it in `prepublishOnly`.

`service` keys on the readiness module rather than on the vendor list, and that was the load-bearing
decision. `scripts/service.sh` is birth-owned and is not a declaration — `/workspace/ollama` has
replaced its copy with a real Ollama provisioner carrying no recoverable inventory — so keying the
project on a non-empty vendor list would have left every live-service workspace unplannable, which
is the exact refusal this change removes. The two facts stay separate: `service` is _the workspace
runs a live suite_, `vendors` is _these are the external services it drives_. Neither is derivable
from the other.

**`Blueprint.services` is renamed to `Blueprint.vendors` in the same release, and that is a second
breaking change to `Blueprint` an app-layer caller must take.** Adding `Blueprint.service` put a
singular beside the existing plural meaning something unrelated, and every other plural on
`Blueprint` — `keywords`, `dependencies`, `peers`, `extras`, `overrides` — has no singular sibling.
`.claude/rules/patterns.md` fixes the opposite meaning for that shape, so a reader who knows this
codebase reads `service` as derived from `services` and is wrong. The package had already conceded
the point in prose: four places glossed the field as _vendors_, and two test files had named their
own local const `vendors`. It rides this release because 0.0.28 is already breaking for a
literal-building caller, and because no blueprint is ever persisted, so a generated workspace
migrates at zero cost. `SERVICE_SCRIPT_PATH` stays `scripts/service.sh` — a shell filename is not an
API identifier, and the script starts services while the field names the vendors.

Neither proof is seeded. The conformance file and the service suite both name something only the
package knows, and a placeholder would read as a proof while measuring nothing. The one artifact that
is emitted is `tests/setupService.ts`, birth-owned and empty like every other setup module, because
the root configuration names it by path and a project whose setup module is missing fails to load at
all.

Worth knowing before you debug one: a Vitest project whose include resolves to nothing **exits 1**
with `No test files found, exiting with code 1`. Measured, not assumed. So an unseeded project is
loud rather than silently green — which is the right failure, and the opposite of 3.3.

**What this costs the fleet.** Three vendored files moved with it — `tests/config.test.ts`,
`.claude/rules/workspace.md`, and `.claude/rules/tests.md` — and all three are content-checked. So
once 0.0.28 publishes, **every repository in the fleet reads `stale` on those three paths** and owes
a re-pin plus a `repair` pass. That is a propagation cascade, not a publish cascade: `scaffold` is a
development dependency of every package, so under the bump rule below nothing downstream bumps or
republishes unless its own surface moves.

## 2. The bump rule this session operated under

The owner's ruling, and it decided every version question here: **a package bumps only if its
published surface moves, and the claim that it did not has to be proved.** A guide change that does
not move the surface does not bump either.

The instrument is `tmp/propagate/surface.cjs` in this repository's working tree at the time — it
compares each freshly built `dist/src/*/index.d.ts` against **the tarball the registry serves**,
rather than against a git commit, because the tarball is what a consumer actually has. It carries
twelve controls. It forgives exactly one spelling, `ReadonlyArray<T>` against `readonly T[]`, and the
controls prove it still reports an added export, a removed export, a retyped export,
`readonly string[]` against `string[]`, and refuses to strip the parentheses off `(A | B)[]`.

**Result: 40 of 40 surfaces unmoved. Zero packages bumped, zero republished.** Six repositories
needed an individual ruling and none of them survived it as a real move:

| Case                                                                 | Repos                                                                           | Ruling                                                                                                                                                                     |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Import respelled from `'../core/index.ts'` to the package's own name | `middleware`, `browser`, `database`, `router`, `terminal`, `worker`, `workflow` | Both specifiers resolve to `dist/src/core/index.d.ts` — the relative form through TypeScript's `.ts`→`.d.ts` mapping, the package form through `exports["."].import.types` |
| Explicit parentheses around a nested conditional type                | `contract`                                                                      | Conditional types are right-associative; proved identical with a `tsc` probe carrying a control                                                                            |
| TSDoc prose only                                                     | `emitter`, `console`                                                            | Documentation; exported name sets identical                                                                                                                                |

The import respelling is worth flagging on its own: **the emitted declarations changed how they
reference a sibling module between 0.0.26's toolchain and 0.0.27's.** Nothing about the source
changed. An app-layer target with `app/core` importing from `app/server` may show the same thing.

## 3. Defects found in scaffold by driving it against 40 targets

Ordered by how likely each is to bite an app-layer target.

### 3.1 A writing verb refuses a workspace needing a project scaffold does not register

**Closed.** Fixed in the unpublished 0.0.28 above; kept here because the diagnosis is what an
app-layer target will recognise, and because the fix covers two projects rather than every project.

The registered project set is fixed: the environment projects the axes select, plus `policy`,
`config`, `probe`, `guides`, and `integration` when `tests/integration.test.ts` exists.
The vendor list does **not** add one — measured by compiling a blueprint carrying
`vendors: ['ollama']` and reading the project list in the tree it materialized: it emits
`scripts/service.sh` and nothing else. A workspace whose manifest names a project the plan omits gets
"the manifest names a Vitest project the planned configuration does not register", and the refusal
runs **before group selection**, so `--groups` does not narrow past it.

Two repositories genuinely need this: `mcp` (a `conformance` project) and `ollama` (a `service`
project). Two more looked like it and were not — `sea` and `websocket` kept a `tests/integration/`
directory of named proofs while scaffold detects the reserved single file. Consolidating onto
`tests/integration.test.ts` closed their drift completely: both now report every path aligned and
writing verbs accept them.

**App cross-check.** An app-layer target is more likely to carry a custom project, not less — a
browser app driving Playwright, a server app driving a real database. If the other session sees this
refusal, it is this defect and not a target-specific one.

The 0.0.28 fix registers exactly two more fixed projects, each keyed to an exact-case path. It does
**not** make the project set open. A target carrying a project outside
`policy / config / guides / conformance / integration / service / probe` plus its environment
projects still gets the same refusal, and the route through is unchanged: reconcile against `audit`,
hand-merge the one configuration file that carries the project, or fold the project onto one of the
fixed paths. Two repositories in this fleet turned out to need the third option rather than a fix —
`sea` and `websocket` kept a `tests/integration/` directory of named proofs where scaffold detects
the reserved single file, and consolidating onto `tests/integration.test.ts` closed their drift
completely.

If the other session finds an app-layer project that genuinely deserves to be fixed rather than
folded, the shape to copy is in `blueprintToRootVite`: a constant for the exact-case path, a required
`Blueprint` boolean, detection in `CLI.#derive`, a `CONFIG_TEMPLATES.factories` key, and a decision
about whether it belongs in `test`. Answer that last one by what the proof drives, not by how slow it
is: hermetic stays in `test`, a real service or a real install leaves it.

### 3.2 `guides/README.md` is emitted by `new` and never written by `repair`

Every `guides/**.md` path is deferred to presence ownership, so `repair` skips it. `scaffold new`
emits `guides/README.md` with real content; `repair` and `overwrite` never will. **Delete it and
nothing restores it** — the guides parity suite then fails with `Missing file: guides/README.md`.
This bit this session: a prep script deleted it in 10 repositories on the assumption `overwrite`
would rewrite it.

**App cross-check.** Identical mechanism regardless of axes. Any target whose `guides/README.md` is
missing needs it restored by hand or from `scaffold new` into a scratch directory.

### 3.3 `package.json` is birth-owned, so no verb adds a script a new proof requires

`tests/config.test.ts` shipped with the 0.0.27 file set and asserts the manifest registers
`test:config`. `package.json` is birth-owned, so `overwrite` never adds it. The result on 25 of 40
repositories was a proof that was **declared in `vite.config.ts`, present on disk, failing, and
selected by no gate** — so `npm test` reported green while carrying a red test nothing ran.

This is the most dangerous defect found, because the instrument that would catch it is the one that
is not running. Detect it with `npx vitest run --project config` directly rather than through
`npm test`.

**App cross-check.** Applies to every target that adopts a file set introducing a new cross-cutting
proof. An app-layer target adds `app:core`, `app:browser`, `app:server` projects with the same
script-registration requirement, so the same gap can exist per app project. Worth checking that
`test:app`, `test:app:browser` and friends are present _and chained into `test`_, not merely declared.

### 3.4 `.claude/agents/orkestrel.md` prose can never be refreshed

The file is presence-owned, so `repair` skips it when present, and `catalog` replaces only what sits
between the markers. Its guard prose **outside** the markers is therefore unreachable by any verb
once the file exists. Two repositories carried the pre-0.0.27 prose for exactly this reason. The
workaround is to delete the file and let `overwrite` write the vendored copy, then `catalog` to fill
the table.

### 3.5 The guide-mirror fetch 404s until every target serves the flat layout

`catalog` fetches each runtime dependency's guide from that package's repository at
`guides/<name>.md`. A fleet mid-migration still serves `guides/src/<name>.md`, so every mirror 404s
and no mirror can resolve until the whole fleet has been pushed. This is inherent ordering, not a
defect, but it makes a mid-migration `catalog` run look broken. Run the mirror pass **after** the
last target is pushed.

### 3.6 `overwrite` does not delete an unplanned guide mirror

Confirmed again this session: `#deferred` covers every `guides/**.md`, so a stale mirror survives
`overwrite` and its `removed` list stays empty. Combined with 3.2, a target's `guides/` directory is
effectively hand-maintained.

## 4. Migration shape, if the other session runs one

What the fleet needed, per target, in order. Steps 2 and 3 are the ones scaffold does not do for you.

1. Re-pin `@orkestrel/scaffold`, install, commit.
2. Move `guides/src/<own>.md` to `guides/<own>.md` **and strip one `../` level from every relative
   link in it** — the guide rises one directory and parity resolves links against the guide's own
   location. Repositories whose guide was already flat can still carry two-level links; check for
   `](../../` rather than assuming the move implies the fix. Rewrite `guides/README.md`'s links; do
   not delete it (3.2). Move the dependency mirrors rather than deleting them.
3. Delete `.claude/agents/orkestrel.md` when it carries no `<!-- orkestrel:catalog -->` markers, so
   `overwrite` writes the vendored copy (3.4).
4. `scaffold overwrite`, then install again — it re-pins development dependencies.
5. `npm run lint` (mutating) before measuring. The refreshed `.oxlintrc.json` `array-type` rule
   rewrites `readonly T[]` to `ReadonlyArray<T>` mechanically; running only `lint:check` reports
   dozens of errors that the fixer resolves itself.
6. Add `test:config` and chain it into `test` (3.3) — **but check the target's `config` project
   actually points at a proof that exists**. One repository had a `config` project aimed at a
   directory that was never created, so adding the script made a dead project run and exit 1.
7. Repair what is left. On this fleet that was the policy sweep's name forms: `parsers.ts` exports
   only `parse*`, `factories.ts` only `create*`. **Decide what the function is before choosing the
   repair, and read `.claude/rules/architecture.md` first** — the ruling this session shipped in the
   middle of the fleet pass was wrong and was corrected. Both repairs exist:
   - wrong file, right name → move it. A `scan*` in `parsers.ts` is a pure lexical leaf and belongs
     in `helpers.ts`; the barrel star-exports both, so the surface is unchanged and nothing bumps.
   - right file, wrong name → rename it in place. A function returning a live entity is an entity
     factory whatever it is called, so `restoreThing` in `factories.ts` is misnamed, not misplaced.
     The rename moves the published surface and earns a bump. **That is the correct cost to pay.**

   Never let the name choose. The wrong branch is cheap to take and expensive to hold: relocating a
   correctly-placed entity factory into `helpers.ts` to escape a rename drags its dependencies with
   it, and a leaf file that imports an implementation class stops being a leaf for every module
   beneath it. `workflow` followed the wrong ruling and went from 1 import cycle in `src/core` to 11;
   the corrected repair took it to 2, of which 1 is the sanctioned `helpers ↔ validators` pair and 1
   is pre-existing. Section 6.1 has the case.

## 5. Three targets closed after the fleet pass

These ran after the 40-repository sweep, against the same scaffold working tree. None is committed
to `main` at the time of writing; each is on `claude/orkestrel-fleet-orchestration-cv30e8` in its own
repository.

### 5.1 `workflow` — the repair the wrong ruling caused, undone

The case behind step 7 above. Under the wrong ruling, `restoreWorkflow` and `recoverWorkflow` were
moved out of `factories.ts` into `helpers.ts` to avoid renaming them, and `assertSnapshot` stayed in
`validators.ts`. Both functions return a live `WorkflowInterface`, so `helpers.ts` began importing
implementation classes and stopped being a leaf. **`src/core` went from 1 import cycle to 11.**

The corrected repair renamed them in place — `createRestoredWorkflow` and `createRecoveredWorkflow`
in `factories.ts` — and moved the four declarations that really were misplaced the other way:
`matchesDescription`, `isTaskResult`, `hasWorkflowHandlers`, and `workflowSnapshotContext` are
predicates or lookups, not total single-argument guards, so they belong in `helpers.ts`.
`validators.ts` now holds exactly six total `Guard<T>` predicates. `assertSnapshot` was deleted
outright: its whole body was `cloneWorkflowSnapshot(snapshot)` with the result discarded, which fails
the wrapper test, and the clone already throws the identical `RESTORE WorkflowError`.

**Cycles: 11 → 2.** One is the sanctioned class-free `helpers ↔ validators` leaf pair, which
`.claude/rules/architecture.md` now blesses explicitly and which `@orkestrel/contract` also has. One
is `WorkflowManager → factories`, pre-existing and out of scope. 845 tests before and after.

The surface moves — `createRecoveredWorkflow` and `createRestoredWorkflow` added,
`assertSnapshot`, `recoverWorkflow` and `restoreWorkflow` removed — so **`workflow` owes a bump from
0.0.11**, not yet applied.

Two follow-ups were named and deliberately not ridden along: `isTaskResult` keeps an `is*` name in
`helpers.ts` though it is a four-argument contextual predicate rather than a total `Guard<T>`, and
`createDeferred` builds an entity from `helpers.ts`. Test blocks also did not follow their subjects
between test files; the mirror rule is mechanically satisfied and nothing is red.

**App cross-check.** `@orkestrel/contract` is the reference implementation of this layering and is
worth reading before repairing an app-layer target: its `helpers.ts` and `validators.ts` import types,
constants, errors and each other and nothing else, and every file that constructs or drives a class
sits above them.

### 5.2 `mcp` — the config proof, and the conformance runner in a gate

`mcp`'s `config` project pointed at `tests/config/**`, a directory that never existed: declared,
empty, and selected by nothing. It now has the real proof — `configs/helpers.ts` and
`tests/config.test.ts`, both written by the scaffold binary rather than by hand — and `npm test`
actually invokes it.

Two places the plan is wrong for that repository, both found by running rather than reading, and both
reverted to `mcp`'s version:

- **`configs/src/vite.browser.config.ts`.** The plan drops the `beforeWriteFile` roll-up rewrite that
  externalizes core in the browser declaration. Without it the next build emits
  `dist/src/browser/index.d.ts` importing `'../../core/index.ts'` and the generated-consumer proof
  goes red with four `TS2307`s. **This is a scaffold gap: the plan emits that rewrite for `server`
  and not for `browser`.** An app-layer target with a browser environment will hit the same thing.
- **`tests/setupPolicy.ts`.** The plan's `mirror` rule flags `tests/src/server/consumer.test.ts` as
  a module test with no matching source module — but a generated-consumer proof is exactly what
  `AGENTS.md` blesses, and it has no source module to mirror by construction. Where that proof lives
  under the mirror rule is an open ruling, not a repair.

One capability was dropped deliberately: `gateBrowserProjects`, which registered a browser project
with an empty include when no Chromium was found. Nothing covered it, and it conflicts with the new
proof head-on — a project whose include resolves to nothing is the defect the proof's gate block
exists to catch.

The conformance runner also moved into a gate. It resolves out of `node_modules` through
`createRequire(...).resolve` and its socket is loopback, so the run is offline and belongs in `test`;
three prose passages in `tests/conformance.test.ts`, `guides/mcp.md` and `README.md` claiming it
"stays outside `npm test`" were false and are corrected, along with a `README.md` claim that it
fetches the runner from the registry. Surface unmoved, version untouched at 0.0.14.

### 5.3 `websocket` — a UTF-8 regression, and the guard that took three attempts

The easy pass was not one. A multi-byte payload was being split across frame boundaries mid-codepoint.
The fix is small; the guard is the part worth carrying. **The first two placements of the regression
test passed by coincidence** — the assertion sat in a 2 MB case where the boundary happened to fall
between codepoints — and only the third binds, proved by reapplying the exact regression and watching
it go red. The guard now asserts its own instrument: that the payload is genuinely NFD and genuinely
carries a combining codepoint, so a future normalization of the fixture cannot quietly turn the test
into a tautology.

## 6. Open, not closed by this session

- **The project set is fixed, not open.** 0.0.28 adds two more fixed projects; it does not let a
  workspace register its own. `ollama` still carries a hand-written `setup` project and `test:setup`
  script that no plan registers, and that is still a refusal on that repository.
- **`repair` emits the browser declaration roll-up for `server` but not for `browser`** (5.2). Any
  target with a published browser environment loses it on repair and finds out at the next build.
- **Where a generated-consumer proof lives under the policy sweep's mirror rule** is unruled (5.2).
- **`workflow` owes a version bump** for the renames in 5.1, and the two placement follow-ups named
  there are open.
- **The restored guide mirrors predate the fleet cascade.** 98 mirrors were restored from git history
  across 31 repositories after a prep script deleted them; they carry pre-cascade content until a
  catalog pass refreshes them.
