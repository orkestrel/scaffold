# Unit D3 — report

**All six findings closed. Every acceptance criterion met.** The predicate now returns `false` for an
entry it cannot inspect, proven against a real `EPERM` entry on this host with the shipped predicate
as the negative control. The case name ends at the skip's own mechanism. Units D1 and D2 are intact;
`tests/setupServer.test.ts` was not touched.

## Touched files

| File | Change |
| ---- | ------ |
| `tests/config.test.ts` | The `publishes` predicate catches an inspection error and returns `false`; the module comment names the mechanism; the skip case's name ends at that mechanism and its comment states that an absent face project is a failure |
| `tests/setupServer.ts` | The four child-process throws carry the received status and the spawn error; the two `@throws` blocks name what a failure carries; `TestGeneratedWorkspace.environment` is readonly |
| `tests/distribution.test.ts` | The statement-boundary sentence and the remainder sentence rewritten |
| `host.json` | Restaged by `npm run build`, which the vendored `tests/config.test.ts` edit invalidated |

Diffstat for the whole uncommitted tree, which carries D1, D2, the Orchestrator's integration, and
this unit:

```text
 host.json                  |   4 +-
 tests/config.test.ts       | 170 ++++++++++++++++++---------
 tests/distribution.test.ts | 284 +++++++++++++++++++--------------------------
 tests/setupServer.test.ts  |  14 +++
 tests/setupServer.ts       | 281 +++++++++++++++++++++++++++++++++++++++++++-
 5 files changed, 528 insertions(+), 225 deletions(-)
```

## Finding 1 — the predicate throws where the mechanism it matches returns false. DONE

The mechanism I chose is a local `try`/`catch` inside the anonymous callback already passed to
`some`, reading the same two facts `isPhysicalDirectory` reads:

```ts
const publishes = ['core', 'browser', 'server'].some((environment) => {
	try {
		const entry = lstatSync(resolve(root, 'src', environment))
		return entry.isDirectory() && !entry.isSymbolicLink()
	} catch {
		return false
	}
})
```

Why the alternatives lose:

- **Importing `isPhysicalDirectory`** adds an import edge to `@orkestrel/scaffold/server` that this
  file's proven closure does not carry. The brief refuses an edge I cannot prove every target
  carries, and I cannot prove this one.
- **Importing `attempt` from `@orkestrel/contract`** is the same edge one package further out. No
  target declares it.
- **A module-scope helper in this file** would be a hidden module declaration. `AGENTS.md` § Design
  laws requires a reusable declaration to be exported from its centralized module and tested;
  `tests/setupPolicy.ts` is not mine to extend, and `tests/setupServer.js` is outside this file's
  proven closure.
- **Keeping `throwIfNoEntry: false` and adding a second guarded read** leaves the throwing call in
  place, which is the defect.

`entry.isSymbolicLink()` sits beside `isDirectory()` because `isPhysicalDirectory` reads both, so
the two predicates agree on every input rather than agreeing by coincidence of what `lstat` reports
for a link on one host.

The proof, taken against a real uninspectable entry. This host can construct one: a `src` directory
with inheritance removed and the account denied every right makes `lstatSync` of `src/core` throw
`EPERM` through the plain form and through the `throwIfNoEntry: false` form alike. The instrument is
`tmp/units/d3-probe-predicate.sh` and its log is `tmp/units/d3-predicate.log.txt`. It packs this
checkout, installs the archive into a consumer, generates the app-only workspace from D2's retained
`d2-generate.mjs` and `d2-repin.mjs`, then runs the generated workspace's own vendored config
project over four shapes with `--reporter=verbose` so a skip prints by name.

```text
bash tmp/units/d3-probe-predicate.sh run1
WORKSPACE=C:/Users/mikes/AppData/Local/Temp/d3-run1/generated
tests/config.test.ts sha256 9c7fb4dab82b46c5fb436116929c8214fd54a94511272d2c574714b65218152f

SHAPE E   src denied to this account, holding core
  LSTAT_CORE=THREW EPERM
  down-arrow  reads the compiler scope a declaration roll-up requires [inapplicable where src holds no recognized environment directory]
  Test Files  1 passed (1)
        Tests  171 passed | 3 skipped (174)
  EXIT_E=0

CONTROL E'   shape E with unit D2's shipped predicate planted back
  Error: EPERM: operation not permitted, lstat '...\generated\src\core'
  Test Files  1 failed (1)
        Tests  no tests
  EXIT_CONTROL=1
```

The control is the instrument's proof that it can fail. With the shipped predicate the same
workspace reports `Tests no tests`, which is the whole vendored file lost to a collection error.
With the corrected predicate the same workspace collects all 174 cases and skips one. The plant is
made and reverted inside the temporary workspace by `tmp/units/d3-plant.mjs`, and the workspace's
`tests/config.test.ts` digest is re-read after the restore and matches the checkout's.

A supporting reading of `lstatSync` against the other shapes was taken separately: an absent path, a
plain directory, a regular file, a child of a regular file, a reserved character, a path past the
host limit, and a reserved device name. On this host each of those collapses to `ENOENT`, which
`throwIfNoEntry` already excused. The denied entry is the case that separates the two predicates, and
it is the one the control drives.

## Finding 2 — the case name contradicted the case's own invariant. DONE

```text
reads the compiler scope a declaration roll-up requires [inapplicable where src holds no recognized environment directory]
```

I took the skip's own mechanism rather than the subjective lane's wording, because `publishes` reads
a recognized environment directory — `core`, `browser`, or `server` — rather than any `src`
environment directory, and the bracket now states exactly the condition `!publishes` tests. The
repository's bracket form is kept and the consequence clause is dropped, so nothing in the name
speaks about the face project. The case's own comment carries that part: an absent face project is
the defect this case reports, so a workspace holding the axis and vendoring no `configs/src/`
wrapper reaches the throw.

## Finding 3 — child-process failures lost decisive diagnostics. DONE

All four sites — `installPackedScaffold`'s pack and install, `installGeneratedWorkspace`'s
generation and dependency install — render as, for the pack:

```text
The pack into <packed> failed with status <status> and spawn error <error>: <stdout>\n<stderr>
```

Both `@throws` blocks state that a child's failure carries its exit status and its spawn error, and
why.

Proven by driving a real spawn fault and a real non-zero exit through the exact rendering, with the
shipped rendering printed beside it as the control — `node tmp/units/d3-probe-diagnostics.mjs`, log
`tmp/units/d3-diagnostics.log.txt`:

```text
--- spawn fault, a bare .cmd with no shell
  shipped   : The pack into PACKED failed: undefined[LF]undefined
  corrected : The pack into PACKED failed with status null and spawn error Error: spawnSync npm.cmd EINVAL: undefined[LF]undefined
--- non-zero exit, a real child
  shipped   : The pack into PACKED failed: [LF]
  corrected : The pack into PACKED failed with status 7 and spawn error undefined: [LF]
```

The spawn-fault row is the case the finding named: the shipped message explains nothing, and the
corrected one reports the null status and `EINVAL`. `String(...)` renders each field rather than a
conditional clause, so the message reports the field's actual value and invents no sentinel for
absence.

No assertion reads these strings.
`grep -rn "The pack into\|Installing \|Generating " --include=*.ts .` returns the four throw sites
and one unrelated template line in `src/core/templates.ts`.

## Finding 4 — the returned environment collection was mutable. DONE

`TestGeneratedWorkspace.environment` is `Readonly<NodeJS.ProcessEnv>`, matching the sibling
`manifest`. Every consumer passes it as a `spawnSync` `env`, which accepts it; `npm run check` and
`npm run test:distribution` both pass.

## Finding 5 — the circular sentence. DONE

```text
The statement the comment sits on is the shortest run of lines
ending at the claim's own line that closes every bracket it opens,
so a claim printed across several lines is driven as the one
expression it is.
```

The subjective lane's wording, rewrapped to the surrounding indentation.

## Finding 6 — the ungrammatical clause. DONE

`moves that set nothing` now reads `moves nothing in that set.`

## Acceptance criteria

| Criterion | Result |
| --------- | ------ |
| `npm run format:check` | exit 0. `All matched files use the correct format. Finished in 3861ms on 227 files` |
| `npm run lint:check` | exit 0. `oxlint --config .oxlintrc.json --deny-warnings .`, no diagnostics |
| `npm run check` | exit 0. Root `tsc`, then `check:src:core`, `check:src:server`, `check:src:bin` |
| The predicate returns `false` rather than throwing for an entry that cannot be inspected | Proven against a real `EPERM` entry. Shape E exit 0 with `171 passed \| 3 skipped (174)`; control E' exit 1 with `Tests no tests` |
| A recognized environment with no face wrapper still fails; an unrelated `src` entry still skips | Both hold. Shape D: `3 failed \| 169 passed \| 2 skipped (174)`, `Error: The workspace declares no face project`, `EXIT_D=1`. Shape B: the case prints as skipped by name, `171 passed \| 3 skipped (174)`, `EXIT_B=0`. Shape D's reading matches D2's recorded postfix run row for row |
| `npm run build` and the vendored digest | exit 0. `staged 175 file(s) into dist/host`, `staged 175 file(s) into host.json`. `dist/host/tests/config.test.ts` sha256 `9c7fb4dab82b46c5fb436116929c8214fd54a94511272d2c574714b65218152f`, byte-identical to `tests/config.test.ts`, carrying both corrections |
| `npm run test:distribution` | exit 0. `Test Files 1 passed (1)`, `Tests 6 passed \| 1 skipped (7)`, 101.21s |
| `npm test` | exit 0. `src:core` 422 passed; `src:server` 466 passed \| 7 skipped (473); `src:bin` 257 passed; `policy` 102 passed; `config` 173 passed \| 1 skipped (174); `setup` 119 passed \| 3 skipped (122); `guides` 23 passed |
| `git status --short` | No path outside the owned list. `M host.json`, `M tests/config.test.ts`, `M tests/distribution.test.ts`, `M tests/setupServer.test.ts`, `M tests/setupServer.ts`, `?? .orkestrel/`. `tests/setupServer.test.ts` and `.orkestrel/` are the inherited state; `tests/setupServer.test.ts` was last written at 10:39:20, before this unit's first edit at 10:57:59 |

Logs: `tmp/units/d3-predicate.log.txt`, `tmp/units/d3-diagnostics.log.txt`,
`tmp/units/d3-distribution.log.txt`, `tmp/units/d3-test.log.txt`, `tmp/units/d3-format.log.txt`,
`tmp/units/d3-lint.log.txt`. Instruments: `tmp/units/d3-probe-predicate.sh`,
`tmp/units/d3-plant.mjs`, `tmp/units/d3-probe-diagnostics.mjs`. Each instrument names retained
`.orkestrel/scaffold/d2-instruments/` paths rather than `tmp/` launch copies, so it keeps
reproducing after the sweep.

## Deviations

None. Every finding closed inside the owned files, with no import edge added and no rule silenced.

## Observations, not carried

- `TestNpm.environment` at `tests/setupServer.ts:368` is also a returned `NodeJS.ProcessEnv` rather
  than a readonly record. It is committed code that predates this change and appears nowhere in the
  uncommitted diff, so it sits outside this unit's scope. Recorded against whoever next owns that
  interface.
- The `config` project reports `173 passed | 1 skipped (174)` in this checkout, unchanged from the
  D2 baseline. This checkout publishes source from `src`, so the scope case runs here rather than
  skipping, and only the generated workspace exercises the skip.
- Shape D's `3 failed` is the shape's own reading rather than a regression: the other two failures
  are the missing `src:core` project factory and the missing `configs/src/tsconfig.core.json`
  wrapper, exactly as `d2-postfix.log.txt` recorded them.
