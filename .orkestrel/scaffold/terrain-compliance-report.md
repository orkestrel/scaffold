# Unit T1 — terrain's application brought to what the skills require

`implementer` on Opus 5, sole writer in `C:\Users\mikes\WebstormProjects\terrain`. Every item in the
brief is done. Nothing committed, nothing installed, no off-limits file edited, the staged lockfile
untouched. One shared-file patch is owed to `package.json` and returned below; one scaffold data-root
conflict is recorded rather than absorbed.

The mid-unit ruling landed and is followed: `DELETE_TRANSITIONS` moved to `app/browser/constants.ts`,
typed on `DeleteState` and `DeleteEvent`, and both the harness page and `tests/app/browser/setup.ts`
import it from there; `DELETE_SCENARIOS` stayed in the test setup.

## Headline

The armed Delete is a solid `btn-danger` and reads **4.990** in every declared variant, against the
**4.045** the outline treatment read in the dark themes. Each schedule row's checkbox carries its own
location and building numbers, so a two-row schedule resolves each row apart. The statechart harness
mounts at `?harness=statechart`, publishes every attribute from `STATECHART_ATTRIBUTES`, and its gate
walks it through the play-all control and reads `passed`. Every run writes one artifact per variant
under `tmp/journeys/`. Both setup proofs exist, run in the `setup` project, and redden on a planted
defect in the module each covers. `guides/README.md` carries the concept index and the changed
surface.

## Item 1 — the destructive action

`app/browser/components/Toolbar.vue`. The armed Delete's class went from `btn-outline-danger` to the
solid `btn-danger`. The disabled state keeps `btn-outline-secondary`, because full danger saturation
on a disabled control still reads as armed, and the reason keeps riding `aria-describedby`. The two
comments that justified the outline treatment now state what the solid fill buys and why the
unavailable state stays neutral. The surface has no confirmation ladder on this command and none was
added or removed.

### The readings, one mount per variant, inside the matrix family

| Variant      | Armed Delete contrast | Add building contrast | Bar   |
| ------------ | --------------------- | --------------------- | ----- |
| `light-1280` | 4.990                 | 7.975                 | 4.5   |
| `dark-1280`  | 4.990                 | 5.024                 | 4.5   |
| `light-390`  | 4.990                 | 7.975                 | 4.5   |
| `dark-390`   | 4.990                 | 5.024                 | 4.5   |

Both commands now clear the 4.5 text bar in every variant. `COMPONENT_CONTRAST = 3` is gone; the
suite declares `TEXT_CONTRAST = 4.5` for anything information-bearing and `MARK_CONTRAST = 3` for the
focus ring, and holds the Delete to the text bar beside the primary command. The focus ring reads
4.454 light and 7.260 dark on both commands.

The rendered proof is `tmp/capture/states/delete-armed--dark-1280.png`: the Delete renders as a solid
red fill with white text in the navbar, beside the outline Smart default and the primary Add building.

### The other danger-toned control, ruled and not repainted

`app/browser/components/BuildingTable.vue:729` renders `btn btn-outline-danger btn-sm` on
`Couldn't resolve ZIP code — tap to retry`. It is a retry, not a destructive action, so the tiers
table's destructive row does not reach it. It is reachable only after a locate fails on a narrow
viewport, which no journey enters, so it is unmeasured. Recorded as an observation for the next
matrix rather than repainted from a test that never renders it.

## Item 2 — row names

`nameSelection(building)` is a new leaf in `app/browser/helpers.ts`, and the table binds both the
`title` and the `aria-label` of each row's checkbox to it:

```text
Select building for deletion — Location 1 – Building 1
```

The phrase and its punctuation match the disclosure's existing per-row name in the same table, so the
surface speaks one shape. The header's `Select/deselect all buildings` is untouched, because it names
the whole column.

The suite declares `FIRST_ROW` and `SECOND_ROW` in `tests/app/browser/setup.ts` as literals rather
than deriving them through `nameSelection`, so the proof compares what the table renders against a
declaration. A schedule numbers its first added building Location 1 - Building 1 and its second
Location 1 - Building 2, which is what makes the declaration honest.

The new journey `names each schedule row for the building it holds, so two rows resolve apart` adds
two buildings through the interface and asserts that both names resolve, that they resolve to
different elements, that the bare `Select building for deletion` now answers for nothing, and that
pressing the second row's checkbox leaves that row alone reading `checked`.

## Item 3 — the statechart harness

### Placement, as ruled

| Symbol                                                                                                            | Home                                                       |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `DeleteState`, `DeleteEvent`, `DeleteDriverInterface`, `HarnessStatus`, `HarnessRow`                              | `app/browser/types.ts`                                     |
| `DELETE_TRANSITIONS` and its rows, `DELETE_LABEL`, `DELETE_COMMAND`, `ADD_COMMAND`, `ACTIONS_COMMAND`, the route and pacing constants | `app/browser/constants.ts`                                 |
| `nameSelection`, `nameTransition`, `readQuery`, `resultToBadge`, and the five scenario phases                     | `app/browser/helpers.ts`                                   |
| `DELETE_SCENARIOS`, `JOURNEY_DRIVER`, `buildJourneyDriver`, `createDeleteDriver`, `FIRST_ROW`, `SECOND_ROW`       | `tests/app/browser/setup.ts`                               |
| The harness page                                                                                                  | `app/browser/components/StatechartHarness.vue`             |

`app/browser/helpers.ts` is the home the phases take because they are stateless leaves and that file
already owns the browser environment's imperative leaves; its header enumerates its own contents and
now names them. `factories.ts` is untouched.

### The seam that lets one table serve two runners

The harness page cannot import the journey layer: `@orkestrel/test/browser` imports `vitest/browser`
at module scope, and `node_modules/vitest/browser/context.js` throws
`vitest/browser can be imported only inside the Browser Mode` outside the runner. So every scenario
phase receives a `DeleteDriverInterface` — `select`, `delete`, `armed`, `label`, `scheduled`,
`settle` — and each runner supplies its own implementation. `tests/app/browser/setup.ts` implements
it over `clickAccessible`, `resolveRendered`, `readText`, and `readPerception`; the harness
implements it over the controls its own widget renders. One table, one set of phases, two doors.

One assertion changed shape in the move: `requireIdleDelete` now waits for the command to stop being
reachable rather than comparing the layer's exact refusal sentence, because an app-side driver cannot
produce the layer's voice and transcribing it would be the workspace spelling a sentence the package
throws. The refusal family still asserts `DELETE_UNREACHABLE` by exact string equality, which is
where that voice belongs.

### What the page renders

It provides its own application over two memory drivers, mounts the shipped `Toolbar` and
`BuildingTable` inside a `widget` root, and drives them by accessible name with real element
activation — opening the navbar collapse first when a narrow viewport has folded the actions away, as
a person does. It renders a play control per transition and a play-all control, each disabled while a
run is in flight; a state badge carrying `idle` or `armed`; an event log of what the schedule store
emitted with the reading it left; and a `role="status"` announcer that narrates each step.

`STATECHART_ATTRIBUTES.status`, `.passed`, `.failed`, and `.total` are bound on the harness root
through a computed record keyed from the map, `.scenario` and `.result` on each rendered row, and
`.state` on the badge. No `data-statechart-*` string is spelled in the page. The status derives:
`running` in flight, `pending` before any row has a result, `idle` while some rows have results and
others do not, and `passed` or `failed` once every row has one.

### The route

- `?harness=statechart` — the entry mounts the harness in place of the workspace.
- `?harness=statechart&play=all` — the whole walk on arrival.
- `?harness=statechart&play=idle-select`, `&play=armed-deselect`, `&play=armed-delete` — one row.

A row's key is its `from` state and its event joined by a hyphen, composed by `nameTransition`, so no
second identifier has to be kept in step with the table. The page renders every link beside the row
it runs. The harness rests `HARNESS_PACE = 400` ms between rows and finishes a walk with a
demonstration step that leaves one building selected, so the armed destructive command is on screen.

`main.ts` selects the root from the query and loads the harness through `defineAsyncComponent`, so
the workspace's own entry never carries it. The build confirms it: the harness lands in its own
`dist/app/browser/assets/StatechartHarness-D8PDrszU.js` chunk at 8.31 kB.

### The gate

`tests/app/browser/integration.test.ts`, `walks the statechart harness through its own play-all
control`. It clears the route's query, mounts the page, asserts the rendered inventory against
`DELETE_TRANSITIONS` and the total attribute before reading any tally, presses `Play every transition`
through `clickAccessible`, polls the status until it reads a terminal value, then requires the status
`passed`, a `0` failure tally, a passed tally equal to the total, an empty list of failing row names
read from `.scenario`, and the badge reading `armed` from the demonstration step. Its budget is
`HARNESS_BASE + DELETE_TRANSITIONS.length * (HARNESS_PACE + HARNESS_ROW)`, sized from the row count
and the pause rather than from a fixed timeout.

## Item 4 — the rendered artifact

Every run writes `tmp/journeys/<variant>.txt` through `commands.writeFile` in an `afterAll`, named
for the variant that produced it. Each file carries the variant and its viewport, `describeTree` and
`describeFocus` of the populated surface, the resolved-style rows this run read for its own variant,
the journal's steps and the page's own output, and the capture filenames the run wrote.

```text
tmp/journeys/light-1280.txt   8023 bytes
tmp/journeys/dark-1280.txt    8019 bytes
tmp/journeys/light-390.txt    7849 bytes
tmp/journeys/dark-390.txt     7845 bytes
```

Sample, from `dark-390.txt`:

```text
## resolved styles
contrast | Add new building | 5.024
ring | Add new building | 7.260
contrast | Delete selected buildings | 4.990
ring | Delete selected buildings | 7.260

## journal steps
open | the first-run workspace | the empty schedule offers a template and an import
press | Add new building | the schedule region reads 1 building
press | Select building for deletion — Location 1 – Building 1 | Delete selected buildings arms itself
press | Delete selected buildings | the schedule empties and focus lands on Add building
press | Select building for deletion — Location 1 – Building 2 | the second row alone reads checked
press | Play every transition | the harness reads passed

## capture frames
schedule-empty--dark-390.png
schedule-populated--dark-390.png
delete-armed--dark-390.png
```

The whole set was regenerated last from the four capture runs on the final tree, so the artifacts and
the portfolio name the same states. `tmp/` is git-ignored.

## Item 5 — the setup proofs

`tests/setup.test.ts` covers `tests/setup.ts`: the recorder and its live `calls` view, the
per-event emitter recorders and their totality guard, the delay, the throw capture, the deep-freeze
guard, the recording driver's native hooks and the real memory driver behind them, the two scripted
reason engines, and the adversarial subject's symbol key.

`tests/setupBrowser.test.ts` covers `tests/setupBrowser.ts`: the modern-core attribute the module
sets on import, the real cascade it loads, the teardown registry and the drain that empties it
between tests, the unique database naming, the connected test database and its cleanup, the delete,
the cleanup registrar, and the two seeds.

Both run in the `setup` Vitest project, registered in `vite.config.ts`. `tests/config.test.ts` — a
vendored file — *requires* that project once any `tests/setup*.test.ts` exists, with the label
`setup`, the include `tests/setup*.test.ts`, and `['./tests/setup.ts']` as its setup files; the
registration matches that contract exactly and `test:config` stays green. The project is
browser-enabled, because `tests/setupBrowser.ts` activates the modern core on the document, loads
Halfmoon, and opens IndexedDB, and no Node environment settles any of it. See **The scaffold conflict
I could not close**.

`npx scaffold audit` no longer reports the uncovered setup modules.

## Item 6 — guide parity

`guides/README.md` gained a **Concept index** over the columns this workspace has — spec ↔ source ↔
tests — with rows for the statechart harness, the journey suite, and the test infrastructure, and the
sections those rows point at. The sections document the one table and its two runners, the harness
route and its deep links, the attributes the harness publishes and how the gate reads them, the
variant and capture environment names, the per-variant artifact, the row naming, the solid
destructive fill, and the `setup` project with the command that runs it.

Three corrections came with it. The directory index was missing `html.md`, `probe.md`, and `test.md`,
which the visit added to the tree but not to the table, so the file's own parity sentence was false;
they are in. The closing table linked `../.agents/orchestration.md` and `.claude/rules/`, neither of
which exists in this repository since the overwrite removed the canon tree, so those rows now say
where each contract actually resolves, as `AGENTS.md` describes. The "What is not here" section
claimed terrain documents no concept of its own, which the harness makes false, so it now points at
the concept index.

Terrain's own documentation stayed inside `guides/README.md` rather than becoming a new
`guides/statechart.md`. A new file under a plan group risks being swept as foreign on the next
`scaffold overwrite`; the README is already there and already survived one.

## Failing-first proofs

Each plant was made on the final tree, run at its narrowest scope, and removed. A sweep for
`planted` over `app/` and `tests/` returns only a pre-existing line in the vendored
`tests/policy.test.ts`.

| Plant                                                                       | Command                                     | Red                                                                                                          |
| --------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `btn-danger` back to `btn-outline-danger` in `Toolbar.vue`                  | `dark-1280 … -t "reads the primary command"` | `AssertionError: expected 4.045389476102619 to be greater than or equal to 4.5`                              |
| `nameSelection(b)` back to the bare `aria-label` in `BuildingTable.vue`     | `light-1280 … -t "names each schedule row"`  | `No interactive element has the accessible name "Select building for deletion — Location 1 – Building 1"`     |
| the same plant, with `FIRST_ROW` set to the bare name                       | `light-1280 … -t "names each schedule row"`  | `Interactive target "Select building for deletion" is ambiguous across 2 elements`                            |
| the harness's `deselect` row asserting `requireArmedDelete`                 | `light-1280 … -t "walks the statechart harness"` | `expected [] to equal [ "armed × deselect → idle, through the row checkbox" ]`                           |
| `createRecorder().clear()` made a no-op in `tests/setup.ts`, and `data-bs-core` set to `planted` in `tests/setupBrowser.ts` | `--project setup` | `Tests 2 failed \| 41 passed (43)`, one per module, the browser one reading `expected 'planted' to be 'modern'` |

The ambiguity reading is the exact finding `terrain-reference-report.md` predicted and could not close.
The `4.045` is the exact reading `fix-terrain-report.md` recorded against the dark themes.

One further red arrived unplanted and is the honest red-then-green for the repaint:
`tests/app/browser/components/Toolbar.test.ts` pinned `btn-outline-danger` on the armed command and
went red on the change — `Tests 1 failed | 973 passed | 1 skipped (975)`, at
`expect(remove.classList.contains('btn-outline-danger')).toBe(true)`. The pin was corrected to the
solid class, keeps its neutral-while-disabled half, and adds an assertion that the outline class is
gone: `Tests 22 passed (22)`.

## Runs

Command for every row:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts`

| Run                                         | Summary                            |
| ------------------------------------------- | ---------------------------------- |
| `VITE_VARIANT=light-1280`                   | `Tests 13 passed \| 1 skipped (14)` |
| `VITE_VARIANT=dark-1280`                    | `Tests 13 passed \| 1 skipped (14)` |
| `VITE_VARIANT=light-390`                    | `Tests 13 passed \| 1 skipped (14)` |
| `VITE_VARIANT=dark-390`                     | `Tests 13 passed \| 1 skipped (14)` |
| `VITE_CAPTURE=true VITE_VARIANT=light-1280` | `Tests 14 passed (14)`             |
| `VITE_CAPTURE=true VITE_VARIANT=dark-1280`  | `Tests 14 passed (14)`             |
| `VITE_CAPTURE=true VITE_VARIANT=light-390`  | `Tests 14 passed (14)`             |
| `VITE_CAPTURE=true VITE_VARIANT=dark-390`   | `Tests 14 passed (14)`             |

The skip in an ordinary run is the capture-membership proof, which runs only under the flag. The
baseline before any edit, same command at `light-1280`, was `Tests 10 passed | 1 skipped (11)`.

Every 390 capture run is green. `@orkestrel/test` 0.0.12 closed the frame clip
`fix-terrain-successor-report.md` left open: all twelve frames pass the capture proof's width,
coverage, and floor readings.

## Gates

Run bare on the final tree, exit codes read from the shell.

| Gate                                       | Exit | Summary                                          |
| ------------------------------------------ | ---- | ------------------------------------------------ |
| `npm run format:check`                     | `0`  | `All matched files use the correct format.`      |
| `npm run lint:check`                       | `0`  | no diagnostics                                   |
| `npm run check`                            | `0`  | `tsc`, `tsc` app:core, `vue-tsc` app:browser     |
| `npm run build`                            | `0`  | `✓ built in 2.22s`, 219 modules                  |
| `npm run test:app`                         | `0`  | `Test Files 71 passed (71)`, `Tests 974 passed \| 1 skipped (975)` |
| `npm run test:policy`                      | `0`  | `Tests 111 passed (111)`                         |
| `npm run test:config`                      | `0`  | `Tests 46 passed (46)`                           |
| `npx vitest run … --project setup`         | `0`  | `Test Files 2 passed (2)`, `Tests 43 passed (43)` |

`npm run test:app` and the build are observations taken on this host; the authoritative timing
reading is the Orchestrator's. The build's chunk-size advisory over the 1,373.56 kB entry predates
this unit and is a notice, not a failure.

## Shared-file patch — `package.json`, report-only

`npx scaffold audit` asks for this, quoting the script line verbatim, and blocks
`scaffold repair --groups configs` until it lands:

```text
scripts: The manifest at . does not declare a planned script: test:setup. Add this exact script line
to package.json: "test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup",
projects: the manifest at . does not reach a Vitest project the planned configuration registers:
setup. No chain from test invokes it.
```

The patch:

```diff
-		"test": "npm run test:app && npm run test:policy && npm run test:config",
+		"test": "npm run test:app && npm run test:policy && npm run test:config && npm run test:setup",
 		"test:app": "vitest run --config vite.config.ts --no-cache --reporter=dot --project app:core --project app:browser",
 		"test:app:core": "vitest run --config vite.config.ts --no-cache --reporter=dot --project app:core",
 		"test:app:browser": "vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser",
 		"test:policy": "vitest run --config vite.config.ts --no-cache --reporter=dot --project policy",
 		"test:config": "vitest run --config vite.config.ts --no-cache --reporter=dot --project config",
+		"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup",
 		"test:probe": "vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe",
```

The chain position is mine to recommend and is not load-bearing: the audit requires only that some
chain from `test` invoke it by name.

## The scaffold conflict I could not close

**`scaffold`'s canonical `setup` project is node-only, and one of the two proofs it demands has a DOM
subject.** The generator's template, read at
`node_modules/@orkestrel/scaffold/dist/src/core/index.js:872`:

```js
setup: `export const setup = (): UserConfig => ({
	resolve,
	test: {
		name: { label: 'setup', color: 'white' },
		include: ['tests/setup*.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
	},
})
`,
```

The same audit demands `tests/setupBrowser.test.ts`, "covering the module of the same name" — and
that module sets `data-bs-core` on `document.documentElement`, imports Halfmoon's stylesheets, and
opens IndexedDB. Under `environment: 'node'` that proof cannot run.

My registration is the same project with `browser` enabled on the Playwright provider, which is why
`vite.config.ts` now reads `stale` and why `scaffold repair --groups configs` would replace it with
the node-only copy. Splitting the browser proof into another project is not open either:
`tests/config.test.ts` requires each project to resolve to one effective include, so adding
`tests/setupBrowser.test.ts` to `app:browser`'s include fails that check.

**Owner: scaffold's data root.** The question is whether a workspace carrying `tests/setupBrowser.ts`
should get a browser-enabled `setup` project, or whether the browser proof belongs somewhere the plan
already runs in a browser. Until it is settled, the choice is between a stale `vite.config.ts` with a
runnable proof — what stands now — and a canonical `vite.config.ts` with a proof that cannot execute.

Sequence once it is settled: land the `package.json` patch, run `scaffold repair --groups configs`,
then run `npx vitest run --config vite.config.ts --project setup` and read what the regenerated
project does with `tests/setupBrowser.test.ts`.

## Audit, before and after

The audit already exited `1` before this unit. Measured by restoring `HEAD`'s `vite.config.ts` and
moving both new proofs aside:

```text
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts. …
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 41 planned paths drifted from the plan.
@orkestrel/test: ^0.0.11 differs from ^0.0.12.
BASELINE_AUDIT_EXIT=1
```

After, on the final tree:

```text
scripts: The manifest at . does not declare a planned script: test:setup. …
projects: the manifest at . does not reach a Vitest project the planned configuration registers: setup. …
dependencies: typescript declares major 6, while the registry serves major 7.
│ vite.config.ts │ configs │ stale │
1 of 41 planned paths drifted from the plan.
@orkestrel/test: ^0.0.11 differs from ^0.0.12.
AUDIT_EXIT=1
```

The setup-coverage finding closed. The `test:setup` script row and the `vite.config.ts` row are this
unit's and are both answered by the patch and the conflict above. The `typescript` major row and the
`@orkestrel/test` range row are untouched by this unit: `package.json` was never edited, and the
range row is the catalog moving to 0.0.12 under the campaign's staged build.

## Review evidence

`git diff --stat`:

```text
 app/browser/components/BuildingTable.vue     |  13 +-
 app/browser/components/Toolbar.vue           |  20 +-
 app/browser/constants.ts                     |  82 +++++++-
 app/browser/helpers.ts                       | 151 +++++++++++++-
 app/browser/index.ts                         |   1 +
 app/browser/main.ts                          |  15 +-
 app/browser/types.ts                         |  47 +++++
 guides/README.md                             | 161 ++++++++++++--
 tests/app/browser/components/Toolbar.test.ts |  17 +-
 tests/app/browser/helpers.test.ts            | 150 ++++++++++++-
 tests/app/browser/integration.test.ts        | 302 +++++++++++++++++++++++----
 tests/app/browser/setup.ts                   | 263 +++++++++++++----------
 vite.config.ts                               |  23 +-
 13 files changed, 1052 insertions(+), 193 deletions(-)
```

`git status --porcelain`:

```text
 M app/browser/components/BuildingTable.vue
 M app/browser/components/Toolbar.vue
 M app/browser/constants.ts
 M app/browser/helpers.ts
 M app/browser/index.ts
 M app/browser/main.ts
 M app/browser/types.ts
 M guides/README.md
M  package-lock.json
 M tests/app/browser/components/Toolbar.test.ts
 M tests/app/browser/helpers.test.ts
 M tests/app/browser/integration.test.ts
 M tests/app/browser/setup.ts
 M vite.config.ts
?? app/browser/components/StatechartHarness.vue
?? tests/setup.test.ts
?? tests/setupBrowser.test.ts
```

The staged `package-lock.json` row is the standing condition the brief named. Nothing staged,
restored, or rewrote it, and no `git checkout`, `restore`, `stash`, `reset`, `clean`, `commit`, or
`npm install` ran.

## Acceptance criteria

1. **The armed Delete is solid and measured in every variant; each row resolves by its own name.**
   Met. 4.990 against the 4.5 bar in all four variants, with the 4.045 outline reading reproduced by
   a plant. The two-row journey resolves each row apart and reads the bare name as answering for
   nothing.
2. **The harness mounts on the declared table, publishes every attribute from the map, and its gate
   passes through the interface.** Met. It mounts on `DELETE_TRANSITIONS` from
   `app/browser/constants.ts`, binds every attribute from `STATECHART_ATTRIBUTES`, and its gate
   presses `Play every transition` through `clickAccessible` and reads `passed` with a zero failure
   tally.
3. **One artifact per variant exists after a run; the two setup proofs exist and pass.** Met. Four
   files under `tmp/journeys/`, each named for its variant; `--project setup` reads
   `Tests 43 passed (43)` and both proofs redden on a planted defect in the module each covers.
4. **All runs and scoped gates green; the guide names the changed surface.** Met for the runs and the
   gates. The guide carries the concept index, the harness route and its links, the artifact, the row
   naming, the destructive fill, and the `setup` project.

## Claims I could not close

- **The canonical `setup` project's environment.** Recorded in full above. Owner: scaffold's data
  root.
- **`vite.config.ts` reads `stale` until that is settled and the manifest patch lands.** The
  alternative is a proof that cannot execute.
- **The `@orkestrel/test` range row and the `typescript` major row.** Both predate this unit and both
  need `package.json`, which is off-limits here.
- **`BuildingTable.vue`'s outline-danger retry control.** Not destructive, not reachable from any
  journey, so unmeasured. Recorded as an observation, not repainted.
- **The artifact has no test asserting it exists.** `decide.md` asks for the file, not for a proof of
  the file; the evidence is the four files on disk and the run that wrote them.

## Instruments left in `tmp/`

- `tmp/final.sh` — the eight-run variant sweep.
- `tmp/gates.sh` — the gate chain, writing one log per gate.
- `tmp/journeys/` — the four written artifacts.
- `tmp/audit.log`, `tmp/audit-baseline.log`, `tmp/audit.json`, `tmp/repair.log` — the audit readings
  quoted above.
- `tmp/vite.config.mine.ts` — the copy taken before the blocked repair.
- `tmp/frame.mjs`, `tmp/runs.sh`, `tmp/readpng.mjs` — earlier campaigns', left as found.
