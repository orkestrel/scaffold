# Report — U4 proof-template (scaffold)

## Deviation: scaffold's own `tests/distribution.test.ts` is not template output

The brief's regeneration step cannot run as written, and running it would destroy a proof.

- **Expected** (brief § What is fixed): scaffold's `tests/distribution.test.ts` is the template's
  output, so removing it and running `repair --offline` returns it with the new template's text.
- **Found**: the file is a bespoke replacement proof. It opens
  `import { spawnSync } from 'node:child_process'`, imports `@src/core`, `@src/server`,
  `@orkestrel/test`, and `createScratch`, and carries proofs the template has no branch for — the
  vendored host inventory, every example the shipped declarations print, the built compiler driven
  from outside the checkout, a preserved peer beside an exact co-peer witness, and the packed
  scaffold passed through a generated workspace's `prepublishOnly`. The template's output opens
  `// The artifact a consumer installs, measured rather than described.` The generated core-only
  proof and this file share no leading bytes.
- **Evidence**: `src/core/compilers.ts:1302` claims the path with `ownership: 'presence'`, and its
  own TSDoc states the rule — "a target lacking it reports as drift, and a package that replaced it
  with a better proof keeps that proof". `node dist/bin/main.js audit --offline --groups tests`
  exits 0 with `0 of 9 planned paths drifted from the plan. Audit compared bytes at 3, existence at
  1, and nothing at 5.` The inventory recorded the same fact at `inventory-distillate.md`:
  `import ts from '@typescript/typescript6' | scaffold (9) — not the generated consumer proof`.
- **Done**: the template block is finished and proved; scaffold's own proof is off the compiler.
- **Not done**: scaffold's `tests/distribution.test.ts` was not deleted and not regenerated.
- **Decision taken, as an ancillary choice**: the file is an owned file and the campaign's exit
  criterion refuses a `typescript` import anywhere, so the compiler use was removed by editing —
  the fence transform moved to `transformWithOxc` from `vite`, the brief's own § Fences rule
  applied at the site that actually carries a `transpileModule` call. Nothing else in that file
  moved.
- **Hypothesis**: the brief read the fleet's generated copies and carried that provenance to
  scaffold's own copy, which the inventory had already separated.

## The proof's shape as landed

Every claim is read off the installed tree, and the compiler is a command rather than a module.

- `TSC` resolves `typescript/bin/tsc` through `createRequire(join(ROOT, 'package.json'))`, so the
  compiler is the one the workspace under proof installs. The template carries no `typescript`
  import, value or type.
- `writeProject(stage, name, driver, files)` writes `tsconfig.<name>.json` beside the consumer
  modules, fixing `module`, `moduleResolution`, `noEmit`, `skipLibCheck`, `strict`, `target`,
  `types: []`, and `files`.
- `checkProject(stage, project)` runs `[TSC, '--noEmit', '--pretty', 'false', '-p', project]`
  through `runNode` (`process.execPath`) from the consumer directory. The located diagnostic lines
  are the verdict. An indented elaboration line joins the diagnostic above it. Anything on the
  error stream, a line matching no location, and a line resolving to the scratch project are each
  raised as a proof-instrument fault. A non-zero status with no reported line is raised as a
  refusal, so the exit code never stands alone as the verdict.
- `checkSurface(stage, surface)` writes one consumer module per entry and driver:

  ```ts
  import * as entry from '<specifier>'
  const published = { <key>: true, ... } as const
  const declared: Record<keyof typeof entry, true> = published
  const surfaced: Record<keyof typeof published, true> = declared
  ```

  `declared` reports a name the declarations carry and the runtime does not. `surfaced` reports a
  name the runtime carries and the declarations do not, and a name the declarations publish as a
  type alone. Each diagnostic names the member.
- `selectDrivers(entry, format)` picks the drivers whose conditions resolve that entry under that
  importing format, so a driver that would report a resolution failure the package never made is
  not run against it. The Node import drive asserts the selection is non-empty.
- `RESOLUTIONS` carries the project-file spellings (`node16`, `nodenext`, `bundler` with `esnext`),
  so no compiler enum is named. The browser drive answers under `BUNDLER` alone.
- Unchanged: the absent-subpath control, the runtime drivers, the exports-map walk, the
  `.d.cts`/`.d.mts` resolution helpers, the release mode, and the classifier fixture.
- The template contains no `transpileModule` call and no `vm` use, so the brief's fence rules have
  no site inside it. Their site is scaffold's own proof, named in § Deviation.

## The regeneration command

`repair` writes the new template's text wherever the proof is missing. Proved on a materialized
workspace rather than on scaffold, for the reason § Deviation gives:

```text
$ node /home/user/scaffold/dist/bin/main.js repair --offline --groups tests --target <generated>
0 of 10 planned paths drifted from the plan. Audit compared bytes at 3, existence at 1, and nothing at 6.
1 written, 10 unchanged, 0 removed in <generated>.
$ diff -q <generated>/tests/distribution.test.ts <the copy removed before the run>
(identical)
```

The brief's unknown is answered: the materialized proof is byte-identical to `fillTemplate` over
the current blueprint. `diff -q` between the workspace `Materializer` wrote and
`blueprintToTestArtifacts(createBlueprint('sample', { src: ['core'] }))` reports no difference.

## Criteria

**1. No compiler name in either owned file.**

```text
$ grep -n "from 'typescript'\|transpileModule\|createProgram\|getPreEmitDiagnostics" src/core/templates.ts tests/distribution.test.ts
exit=1 (no output)
```

**2. Formatter, lint, and typecheck.**

```text
$ npx oxfmt --config .oxfmtrc.json --check src/core/templates.ts tests/distribution.test.ts
All matched files use the correct format.
exit=0
$ npm run lint:check
exit=0
$ npm run check
> tsc --noEmit -p configs/src/tsconfig.bin.json
exit=0
```

**3. Planted controls.** Both plants were made in a scratch copy of the workspace under
`<scratchpad>/u4/stage/` — scaffold's `package.json`, `README.md`, and `dist/` copied out with
`node_modules` symlinked, the emitted core-only proof written to its `tests/`, and the generated
proof run there by Vitest. The proof packs that copy, installs it into its own throwaway consumer,
drives the runtime, and checks. Nothing under `/home/user/scaffold` carried a plant. Each plant was
appended by `<scratchpad>/u4/plant.sh`, which copies the target aside before appending and restores
the copy after the run; `diff -q` against the checkout's `dist/` confirms both removals.

Baseline, no plant: `Tests 11 passed (11)`, exit 0.

Plant — the package publishes a value it does not declare. `printf '\nexport const PLANTED_EXTRA = true\n' >> <stage>/dist/src/core/index.js`. `Tests 1 failed | 10 passed (11)`, exit 1, reported under every driver:

```text
node16: surface.node16-.ts(4,7): error TS2741: Property 'PLANTED_EXTRA' is missing in type 'Record<"applyOverrides" | "artifactsToQuestions" | "artifactToFinding" | "artifactToHex" | "blueprintToConfigArtifacts" | "blueprintToDevDependencies" | "blueprintToDocumentArtifacts" | ... 144 more ... | "WORKSPACE_OWNED_PATHS", true>' but required in type 'Record<"applyOverrides" | "artifactsToQuestions" | "artifactToFinding" | "artifactToHex" | "blueprintToConfigArtifacts" | "blueprintToDevDependencies" | "blueprintToDocumentArtifacts" | ... 145 more ... | "PLANTED_EXTRA", true>'.
nodenext: surface.nodenext-.ts(4,7): error TS2741: Property 'PLANTED_EXTRA' is missing in type '...' but required in type '... | "PLANTED_EXTRA", true>'.
bundler: surface.bundler-.ts(4,7): error TS2741: Property 'PLANTED_EXTRA' is missing in type '...' but required in type '... | "PLANTED_EXTRA", true>'.
```

Plant — the package declares a value it does not publish. `printf '\nexport declare const PLANTED_DECLARED: true\n' >> <stage>/dist/src/core/index.d.ts`. `Tests 1 failed | 10 passed (11)`, exit 1:

```text
node16: surface.node16-.ts(3,7): error TS2741: Property 'PLANTED_DECLARED' is missing in type '{ readonly APP_BROWSER_DEV_DEPENDENCIES: true; readonly APP_DEV_DEPENDENCIES: true; readonly APP_MATRIX: true; readonly APP_SERVER_DEV_DEPENDENCIES: true; readonly ARTIFACT_TEMPLATES: true; ... 146 more ...; readonly srcToRoot: true; }' but required in type 'Record<"applyOverrides" | ... 145 more ... | "PLANTED_DECLARED", true>'.
nodenext: surface.nodenext-.ts(3,7): error TS2741: Property 'PLANTED_DECLARED' is missing in type '{ ... }' but required in type 'Record<... | "PLANTED_DECLARED", true>'.
bundler: surface.bundler-.ts(3,7): error TS2741: Property 'PLANTED_DECLARED' is missing in type '{ ... }' but required in type 'Record<... | "PLANTED_DECLARED", true>'.
```

The line and column separate the directions: the runtime-side plant lands on line 4 (`surfaced`),
the declaration-side plant on line 3 (`declared`).

A first attempt at the runtime-side plant read green and is recorded here because it is the
instrument's own failure mode: the built bundle ends with `//# sourceMappingURL=index.js.map` and
no trailing newline, so an appended export joined that comment and published nothing. The plant
script now prepends a newline, and the key set was confirmed with
`Object.keys(await import(<planted file>))` before the run.

**4. `npm run test:distribution` in default mode.**

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:distribution
Test Files  1 passed (1)
     Tests  5 passed (5)
  Duration  85.08s
exit=0
```

With the default `npm` (10.9.7) the same command exits 1 on a host condition outside this change:

```text
$ npm run test:distribution
Tests  1 failed | 4 passed (5)
AssertionError: expected 1 to be +0   tests/distribution.test.ts:908:33
exit=1
```

Line 908 asserts the exit status of `npm install --ignore-scripts --no-audit --no-fund` inside a
freshly materialized workspace. Replayed with its output readable
(`<scratchpad>/u4/replicate-install.sh`), that install fails with
`npm error Cannot read properties of null (reading 'edgesOut')` under npm 10.9.7 and exits 0 in
11 seconds under npm 11.19.1 over the same tree and the same cache. The step reads `package.json`
alone, so no file this unit changed reaches it, and the assertion sits in a test this unit did not
touch. The npm-11 run is the one that carries this unit's evidence, because it reaches the
generated workspace's `prepublishOnly`, whose chain ends in
`npm run test:distribution -- --mode release` — the new generated proof, run in release mode
against a real packed and installed package.

**5. `npm run test:src:core`.**

```text
$ npm run test:src:core
Test Files  9 passed (9)
     Tests  385 passed (385)
exit=0
```

No row in `tests/src/core/templates.test.ts` reddened.

## Additional proofs taken

- The generated core-only proof and the generated browser proof each typecheck under a project
  carrying the generated workspace's own compiler options:
  `node node_modules/typescript/bin/tsc --noEmit --pretty false -p tsconfig.json` exits 0 for each.
  The browser project needs `configs/helpers.ts` and `package.json` present, which `repair`
  vendors and the generator does not emit.
- The generated core-only proof run against a staged copy of this workspace: `Tests 11 passed (11)`,
  exit 0, covering both Node drives for `.` and `./server`, the resolution compile with its
  absent-subpath control, and the browser-face guard.

## U5 hand-off

`npm run test:src:core` is green, so U5 inherits no red row from this change. What U5 still owns:

- `tests/src/core/templates.test.ts:12` — `import ts from 'typescript'`, and the lifts that use it
  at `338` (`driveClassifier`), `373` and `416` (`stageDistributionClassification`,
  `extractDeclarations`), `432` (`readDeclaredNames`), and `540` (the `vite.config.ts` export
  walk). Every name in `CLASSIFIER_DECLARATIONS` (`tests/src/core/templates.test.ts:263`) still
  exists in the emitted proof, and the `buildStage` walk the lift reads is unchanged, so the parser
  reader U5 writes must reproduce the same names and the same statement text. Nothing in that list
  was added or removed by this unit.
- The names this unit added to the emitted proof, in case U5 widens a lift: `Surface`,
  `writeProject`, `checkProject`, `checkSurface`, `selectDrivers`, `TSC`, `BUNDLER`,
  `DIAGNOSTIC_PATTERN`. The names it removed: `readDeclaredExports`, `compileConsumer`. No test
  named either removed function.
- `tests/guides.test.ts:32,311,334` — unchanged by this unit.

## Tree state

```text
$ git status --short
 M src/core/templates.ts
 M tests/distribution.test.ts

$ git diff --stat
 src/core/templates.ts      | 268 +++++++++++++++++++++++++++++++--------------
 tests/distribution.test.ts |  17 +--
 2 files changed, 196 insertions(+), 89 deletions(-)
```

The baseline moved under this unit: `main` advanced from `d0d397aa` to `e649a43c` with campaign
records while the work ran. No file this unit owns is in those commits.

## Flagged claims

- The regeneration proof runs on a materialized workspace, not on scaffold. Whether scaffold's own
  copy must become template output is the Orchestrator's ruling, not this unit's.
- `checkProject` treats any bytes on the compiler's error stream as an instrument fault. Every run
  taken here left that stream empty, and `m3m4-report.md` records the same for every measured fault
  class. A host that makes the Node launcher print a warning there reddens the proof as an
  instrument fault rather than as a package defect.
- The plants drive `@orkestrel/scaffold`'s own root entry. A package whose `exports` map resolves
  differently per condition is untested here; `m15-report.md` names the same limit.
- The npm-10 install failure is characterized, not fixed. It is deterministic across the runs taken
  on 2026-09-06 and reproduces outside Vitest.
