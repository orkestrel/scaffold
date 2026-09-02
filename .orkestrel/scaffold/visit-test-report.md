# Unit V visit — `@orkestrel/test` report

## Outcome

The target is on the catalog's `@orkestrel/*` versions, `npx scaffold audit` exits `0`, and the
whole gate chain is green with every suite matching the pre-visit baseline. No repair was needed,
because no gate reddened.

One step did not run. `npx scaffold overwrite` refused on uncommitted work — the two files the
visit's own step 1 dirtied. The brief forbids `--dirty` and forbids committing, so the refusal
stands as reported rather than waived. The Deviation section states what that costs and the exact
settling command.

## Ranges, before and after

Read from the `package.json` `devDependencies` field. The target declares no `dependencies`
section, so every row is development-only and none of them reaches a consumer.

| Package               | Before    | After     | Catalog  |
| --------------------- | --------- | --------- | -------- |
| `@orkestrel/guide`    | `^0.0.15` | `^0.0.15` | `0.0.15` |
| `@orkestrel/probe`    | `^0.0.10` | `^0.0.11` | `0.0.11` |
| `@orkestrel/scaffold` | `^0.0.58` | `^0.0.59` | `0.0.59` |

The `npm ls @orkestrel/probe @orkestrel/guide @orkestrel/scaffold` command resolves one copy of
each:

```text
@orkestrel/test@0.0.11 C:\Users\mikes\WebstormProjects\test
+-- @orkestrel/guide@0.0.15
+-- @orkestrel/probe@0.0.11
`-- @orkestrel/scaffold@0.0.59
```

The registry refused no range. Both installs exited `0`.

## The overwrite

The `npx scaffold overwrite` command refused, exit `1`:

```text
TARGET: The target at . carries 2 uncommitted changes. Commit them, or pass --dirty to waive the refusal.
```

The `git status --porcelain` command at that moment named exactly the files step 1 wrote:

```text
 M package-lock.json
 M package.json
```

The refusal is structural rather than a property of this target. The visit's step 1 re-pins
`@orkestrel/scaffold` and installs, which dirties the manifest and the lockfile, and `overwrite`
refuses any tree carrying uncommitted changes, per `guides/scaffold.md` § Git. With `--dirty`
forbidden and committing forbidden, step 2 cannot run in this unit.

The overwrite wrote and deleted nothing, so `git status --porcelain` carries no file from it.

### What the refusal cost, measured

The audit taken at the refusal reported the target's canon already at the floor:

```text
0 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
@orkestrel/probe: ^0.0.10 differs from ^0.0.11.
```

So the `repair` half of the overwrite had no byte to write, and its only `@orkestrel` re-pin was the
`@orkestrel/probe` range, which step 3 of the visit set by hand. The machine-readable audit confirms
every planned path is `aligned` and no finding is non-aligned:

```text
drift tally: [["aligned",45]]
non-aligned: []
provenance: {"versions":"live","host":"live"}
```

The `provenance` record names both surfaces `live`, so this is a registry reading rather than a
floor fallback.

The `.claude/agents/orkestrel.md` migration in `wave.md` § Visit a repository does not apply here.
The target's body outside the marker-bounded catalog table is byte-identical to the floor the
installed scaffold stages, proved by diffing the file's non-table region against
`node_modules/@orkestrel/scaffold/dist/host/claude/agents/orkestrel.md`. No deletion was owed, so no
commit was owed for it.

### What the overwrite still owes

The audit's remaining lines are non-blocking questions, not findings. They do not move the exit code:

```text
QUESTION @types/node declares the floor ^26.4.0, while the registry serves 26.4.1 within major 26.
QUESTION oxfmt declares the floor ^0.65.0, while the registry serves 0.66.0 within major 0.
QUESTION oxlint declares the floor ^1.80.0, while the registry serves 1.81.0 within major 1.
QUESTION typescript declares major 6, while the registry serves major 7.
QUESTION vite-plugin-dts declares the floor ^5.0.3, while the registry serves 5.1.0 within major 5.
```

The `guides/scaffold.md` § Dependency floors section states that the verbs raise an in-major floor
themselves, so a later `overwrite` is expected to rewrite the `@types/node`, `oxfmt`, `oxlint`, and
`vite-plugin-dts` ranges. The `typescript` major is never crossed automatically and stays a person's
decision. This unit did not raise those four ranges: step 3 of the brief names `@orkestrel/*` ranges
only, and raising the formatter and the linter would change gate behaviour the brief did not
authorize.

## Files written

The `git diff --stat` output:

```text
 package-lock.json | 64 +++++++++++++++++++++++++++++++++----------------------
 package.json      |  4 ++--
 2 files changed, 40 insertions(+), 28 deletions(-)
```

The `git status --porcelain` output:

```text
 M package-lock.json
 M package.json
```

The manifest change is the two re-pins alone:

```diff
 		"@orkestrel/guide": "^0.0.15",
-		"@orkestrel/probe": "^0.0.10",
-		"@orkestrel/scaffold": "^0.0.58",
+		"@orkestrel/probe": "^0.0.11",
+		"@orkestrel/scaffold": "^0.0.59",
```

The lockfile change is the transitive set those two re-pins pull: `@orkestrel/codec@0.0.1` enters,
and `@orkestrel/lsp`, `@orkestrel/mcp`, and `@orkestrel/process` move to the versions the catalog
names.

The `npm run format` script wrote nothing. The `git status --porcelain` command taken after it named
the same two files.

The `dist` and `tmp` directories are git-ignored, so the rebuild and this report leave the tracked
tree carrying the two re-pinned files and nothing else.

## Gates, read bare

Each command was run alone with no pipeline stage after it, and its exit code read directly.

| Gate                   | Exit | Summary                                                           |
| ---------------------- | ---- | ----------------------------------------------------------------- |
| `npm run format:check` | `0`  | `All matched files use the correct format.` on 59 files           |
| `npm run lint:check`   | `0`  | no diagnostic printed                                             |
| `npm run check`        | `0`  | root project and the `core`, `browser`, and `server` src projects |
| `npm run build`        | `0`  | `core`, `browser`, and `server` built; declarations bundled       |
| `npm test`             | `0`  | every project green; per-project counts follow                    |

The `npm test` result per project, against the pre-visit baseline the dispatch supplied:

| Project  | This visit                  | Pre-visit baseline    |
| -------- | --------------------------- | --------------------- |
| `src`    | 455 passed, 9 skipped (464) | 455 passed, 9 skipped |
| `policy` | 111 passed (111)            | 111 passed            |
| `config` | 46 passed (46)              | 46 passed             |
| `setup`  | 24 passed (24)              | 24 passed             |
| `guides` | 38 passed, 1 skipped (39)   | 38 passed, 1 skipped  |

Every reading matches its baseline. The visit reddened nothing, so no repair was made and there is
no red-then-green to record.

Two readings in the run are expected output rather than failures. The `src:browser` project prints
`[Unhandled error] Error: Boom`, `[Unhandled rejection] Unknown Error: Refused`, and
`[Unhandled error] Error: Ignored` from the `tests/src/browser/factories.test.ts` file, which
dispatches those events deliberately to drive the browser journal; the file passes. The build prints
`The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine`
from `@microsoft/api-extractor`, which is the `typescript` major question restated by the declaration
bundler; the build exits `0`.

## Acceptance criteria

1. **The `npx scaffold audit` command exits `0`.** Met, and the closing run is recorded earlier. Not
   met the way the criterion words it, because the overwrite did not run before it. The audit
   reached `0` after the `@orkestrel/probe` re-pin closed the one non-aligned finding, and the audit
   taken at the refusal proves the overwrite had no byte to write here.
2. **Every `@orkestrel/*` range equals the catalog's version with a caret.** Met. The range table
   records every row, and `npm ls` confirms one installed copy of each.
3. **The gate chain is green, read bare.** Met. No gate was red, so no red is owed an owner.

## Claims I could not close

- **Whether `scaffold overwrite` writes anything here.** The audit proves no planned path drifted and
  no `@orkestrel` range is outstanding, so its `repair` and deletion halves have no work. Its
  `catalog` step refills the marker-bounded table in the `.claude/agents/orkestrel.md` file, and its
  `declare` step is expected to raise the four in-major foreign floors. Neither was observed, because
  the verb refused before running.
- **Whether the rebuilt `dist/` differs materially from the published tarball.** Not compared. That
  is `wave.md` § Visit a repository step 7, and the brief's ordered visit ends at the gate chain with
  no version bump and no publish. The target declares no runtime `dependencies`, so on
  `.agents/orchestration.md` § What a bump obliges this visit is development-only and obliges no bump
  on the dependency test; the artifact test is the one left untaken.
- **Whether the four foreign floor questions redden any gate after they are raised.** Not raised, so
  not measured.

## Deviation

**Expected.** The `npx scaffold overwrite` command runs after the scaffold re-pin and install, and
`npx scaffold audit` then proves the sweep at exit `0`.

**Found.** The overwrite refused with exit `1` and wrote nothing:

```text
TARGET: The target at . carries 2 uncommitted changes. Commit them, or pass --dirty to waive the refusal.
```

**Evidence.** The `git status --porcelain` command at the refusal named ` M package-lock.json` and
` M package.json`, which are the two files the visit's step 1 wrote. The `guides/scaffold.md` § Git
section states the verb refuses a tree carrying uncommitted changes unless `--dirty` waives it.

**Done.** The scaffold re-pin and install; the `@orkestrel/probe` re-pin; the full install; the
mutating format; the whole gate chain, green; the closing audit at exit `0`; the read-only audit
readings that bound what the overwrite would have done.

**Not done.** The `npx scaffold overwrite` command. With it, the catalog table refill and the four
in-major foreign floor raises.

**Hypothesis.** The brief's step order and its "commit nothing" constraint cannot both hold, because
step 1 necessarily dirties the tree and step 2 necessarily refuses that tree, so the overwrite needs
the re-pin committed first.

**Settling command.** Commit the two re-pinned files, then run, in the target checkout:

```text
npx scaffold overwrite
npx scaffold audit
```

That is the Orchestrator's to run, because it requires the commit this unit is forbidden to make.
