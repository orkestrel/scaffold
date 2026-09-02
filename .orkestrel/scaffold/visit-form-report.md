# Unit V visit — `form` — DEVIATION, stopped at step 2

The visit stopped at step 2. `npx scaffold overwrite` refused the run on uncommitted work, and the
only uncommitted work in the tree is the visit's own step-1 re-pin. The dispatch forbids committing
and the brief forbids `--dirty`, so steps 2 through 7 cannot run under this dispatch. Steps 3
through 7 were not attempted.

A second finding stands independent of that block: the committed catalog table is stale for
`@orkestrel/contract`, which is a runtime dependency of this target.

## Deviation

**Expected.** Step 1 re-pins `@orkestrel/scaffold` and installs; step 2 runs `npx scaffold overwrite`
to completion and `npx scaffold audit` exits `0`.

**Found.** The overwrite refused before writing anything.

```text
TARGET: The target at . carries 2 uncommitted changes. Commit them, or pass --dirty to waive the refusal.
EXIT=1
```

The uncommitted changes are exactly what step 1 wrote:

```text
 M package-lock.json
 M package.json
```

The baseline was clean at `2f07735`, so no pre-existing dirt contributed.

**Done.** Step 1 only: `@orkestrel/scaffold` re-pinned `^0.0.58` to `^0.0.59`, `npm install` exit `0`,
installed version confirmed `0.0.59`.

**Not done.** Steps 2 through 7. No overwrite, no audit at exit `0`, no remaining re-pins, no full
install, no `format`, no gate chain.

**Hypothesis.** The wave procedure assumes a commit between step 1 and step 2, and this dispatch
withholds it. `.agents/skills/orkestrel-publish/references/wave.md` § Visit a repository says of the
`.claude/agents/orkestrel.md` migration that "the committed deletion keeps the uncommitted-work
refusal from firing", so the procedure already contemplates committing mid-visit to clear this exact
refusal. Step 1 necessarily dirties `package.json`, and the `guides/scaffold.md` file § Git confirms
`overwrite` refuses a dirty tree unqualified. The three constraints — re-pin first, never `--dirty`,
commit nothing — cannot all hold together.

The step order is not the problem and must not be reordered to escape the block. Running the
overwrite before the re-pin would run scaffold `0.0.58`'s vendored host, which is the stale-floor
failure the wave's ordering exists to prevent.

## Catalog is stale for `@orkestrel/contract`

The live registry sweep inside `scaffold audit` disagrees with the committed catalog table on one
package, and `npm view` confirms it independently.

| Package               | Catalog table | Registry serves | Manifest range |
| --------------------- | ------------- | --------------- | -------------- |
| `@orkestrel/contract` | `0.0.13`      | `0.0.15`        | `^0.0.13`      |
| `@orkestrel/emitter`  | `0.0.8`       | `0.0.8`         | `^0.0.8`       |
| `@orkestrel/guide`    | `0.0.15`      | `0.0.15`        | `^0.0.15`      |
| `@orkestrel/probe`    | `0.0.11`      | `0.0.11`        | `^0.0.10`      |
| `@orkestrel/scaffold` | `0.0.59`      | `0.0.59`        | `^0.0.59`      |
| `@orkestrel/test`     | `0.0.11`      | `0.0.11`        | `^0.0.11`      |

The audit's own `@orkestrel` lines:

```text
@orkestrel/contract: ^0.0.13 differs from ^0.0.15.
@orkestrel/probe: ^0.0.10 differs from ^0.0.11.
```

The `npm view` corroboration: `contract 0.0.15`, `probe 0.0.11`, `scaffold 0.0.59`, `test 0.0.11`,
`guide 0.0.15`, `emitter 0.0.8`.

This blocks acceptance criterion 2 independently of the commit deadlock, and the Orchestrator owns
the ruling because the consequences sit outside this unit's scope:

- Acceptance criterion 2 requires every range to equal the catalog's version. For `@orkestrel/contract`
  the catalog says `0.0.13`, which the manifest already carries, so the criterion is met and stale.
- The overwrite's `declare` step re-pins from the registry, not from the committed table. Running it
  would move `@orkestrel/contract` to `^0.0.15` on its own, which contradicts the criterion the same
  run is meant to satisfy.
- `@orkestrel/contract` is a runtime dependency of `@orkestrel/form`. Per the
  `.agents/orchestration.md` file § What a bump obliges and the wave's § Rule on the bump, a moved
  runtime range is published surface and obliges a version bump and publish of this package. The brief
  forbids both. So the overwrite cannot run here without either violating the brief or leaving an
  unbumped moved runtime pin.
- `@orkestrel/emitter` declares `@orkestrel/contract ^0.0.13` in the catalog, so the cascade might
  reach it too. Not investigated; outside this unit.

## Ranges before and after

Nothing moved except `@orkestrel/scaffold`.

| Package               | Before    | After     |
| --------------------- | --------- | --------- |
| `@orkestrel/contract` | `^0.0.13` | `^0.0.13` |
| `@orkestrel/emitter`  | `^0.0.8`  | `^0.0.8`  |
| `@orkestrel/guide`    | `^0.0.15` | `^0.0.15` |
| `@orkestrel/probe`    | `^0.0.10` | `^0.0.10` |
| `@orkestrel/scaffold` | `^0.0.58` | `^0.0.59` |
| `@orkestrel/test`     | `^0.0.11` | `^0.0.11` |

## What the overwrite would have done

Captured read-only with `npx scaffold audit`, exit `1`:

```text
dependencies: @types/node declares the floor ^26.4.0, while the registry serves 26.4.1 within major 26.
dependencies: oxfmt declares the floor ^0.65.0, while the registry serves 0.66.0 within major 0.
dependencies: oxlint declares the floor ^1.80.0, while the registry serves 1.81.0 within major 1.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vite-plugin-dts declares the floor ^5.0.3, while the registry serves 5.1.0 within major 5.
0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.
@orkestrel/contract: ^0.0.13 differs from ^0.0.15.
@orkestrel/probe: ^0.0.10 differs from ^0.0.11.
```

Read against `guides/scaffold.md`:

- The vendored path plan is already clean. `0 of 34 planned paths drifted`, so the overwrite has no
  file to write or delete in this target. The `.claude/agents/orkestrel.md` file is byte-identical to
  the floor copy scaffold `0.0.59` stages, so the wave's delete-and-commit migration for that file does
  not apply here. The target holds no `.mcp.json` file and no copy at a `.claude/rules` canon path.
- The floor rows inside the declared major would be raised by the run, per the guide § Dependency
  floors: `@types/node`, `oxfmt`, `oxlint`, and `vite-plugin-dts`.
- The `typescript` major-6 row is a non-blocking question, which the guide says a person decides. It is
  not this unit's to cross.
- The `@orkestrel` lines are the ones the deviation turns on.

So the overwrite's remaining work here is the dependency floors, the catalog table refill, and the
range re-pins, rather than a structural sweep.

## Gates

Not run. The wave states that a step reading generated or installed state is invalid before the step
that writes it, so a gate reading taken before the overwrite would not be usable. No red was met and
none is claimed either way.

## Acceptance criteria

1. `npx scaffold audit` exits `0` after the overwrite — not met. The overwrite never ran. The audit
   exits `1` today; the excerpt and each finding's owner are recorded earlier.
2. Every `@orkestrel/*` range equals the catalog's version with a caret — not met. `@orkestrel/probe`
   sits at `^0.0.10` against the catalog's `0.0.11`, because step 3 was not reached. Every other range
   equals the catalog, though the catalog is itself stale for `@orkestrel/contract`.
3. The gate chain green, read bare, or every red reported — not met. Not run, for the reason given.

## Tree state left behind

`HEAD` is `2f07735`, unmoved. Nothing was committed.

```text
 M package-lock.json
 M package.json
```

```text
 package-lock.json | 24 +++++++++++++++++++-----
 package.json      |  2 +-
 2 files changed, 20 insertions(+), 6 deletions(-)
```

The `package.json` change is the single step-1 line:

```diff
-		"@orkestrel/scaffold": "^0.0.58",
+		"@orkestrel/scaffold": "^0.0.59",
```

The re-pin is left in place. It is correct step-1 work the visit owns, and reverting it would need
`git restore`, which the permission floor forbids. Committing it is also what clears the refusal, so
the tree is left in the state a re-dispatch can move forward from.

## Claims I could not close

- Whether `npx scaffold audit` reaches exit `0` after a completed overwrite. The `typescript` major-7
  row reads as a non-blocking question, which suggests it would, but the overwrite never ran and this
  report does not assert it.
- Whether this target's gate chain survives scaffold `0.0.59`'s vendored host. Untested.
- Whether the `@orkestrel/contract` `0.0.15` release reaches `@orkestrel/emitter` and the rest of the
  fleet. Outside this unit.
- Whether `@orkestrel/form` needs a version bump. It depends on the contract ruling, and the brief
  forbids this unit to bump.

## What unblocks this unit

The Orchestrator decides. Naming both, because they are separable:

1. The refusal. Commit the step-1 re-pin, then re-dispatch from step 2. That is what the wave assumes,
   and it keeps `--dirty` unused, so the deletion sweep keeps its recovery mechanism.
2. The catalog. Regenerate the catalog table before the re-dispatch, and rule on whether
   `@orkestrel/contract` moves to `^0.0.15` here. That ruling carries a runtime-bump obligation for
   `@orkestrel/form`, so it needs settling before the overwrite's `declare` step takes it by default.
