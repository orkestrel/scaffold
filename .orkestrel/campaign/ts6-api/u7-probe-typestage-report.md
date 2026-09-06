# Report — U7 probe-typestage

`implementer`, Claude Opus 5, in `/home/user/fleet/probe`. Baseline `bc11e66`, clean at start.
Nothing under `/home/user/scaffold` was read for writing or edited.

## The mechanism as landed

**Mirror.** `TypeStage` owns one directory at `<workspace>/tmp/type/<pid>-<uuid>/`, created at
construction with an ownership marker at `.probe/mirror.txt` written by `formatSpecification('', revision)`.
A walk over the workspace — skipping `.git`, `dist`, `node_modules`, and `tmp/type` — copies every
file whose SHA-256 differs from the copy the stage already placed, and removes the copy of a file the
workspace no longer holds. The refresh runs at construction and before every inspection. Each draft
and the test are written at their mirrored declared paths after the refresh and removed at the end of
the inspection, so the next refresh restores the workspace's own file. Where the workspace holds a
file at a path a draft declares a directory under, the mirrored copy is removed so the draft can be
written and the next refresh restores it (`#clear`). At construction the stage sweeps a sibling mirror
whose directory name parses as a revision identity, whose process id names a host that is gone, and
whose marker names that same identity; a directory failing any of the three stays. `destroy`
terminates every child, waits for the warm it started, and deletes the mirror.

**Scratch project.** One per selected project, written beside the *mirrored* project file it extends:
`configs/src/tsconfig.core.json` → `configs/src/tsconfig.core.probe.json`. Because it sits in that
directory, every relative path the extended chain declares — `rootDir`, `include`, `exclude`, `paths`,
and further `extends` — resolves inside the mirror with no rewriting. The scratch carries
`compilerOptions` `{ noEmit, declaration: false, emitDeclarationOnly: false, composite: false,
incremental: true, tsBuildInfoFile }` and a `files` list built from the project's own printed selection
(filtered to entries the mirror holds) plus the drafts assigned to that project. `include` is never
written: naming `files` would suppress a default `include`, and carrying the printed selection across
restores exactly the set the project resolved to. Incremental state lives at
`<mirror>/.probe/<slug>.tsbuildinfo`, named from the project's workspace-relative path.

**Spawn.** `process.execPath` with `resolveWorkspaceBinary(workspace, 'typescript', 'tsc')`, `cwd` the
mirror root, arguments `--noEmit --pretty false -p ./<scratch>`; `--showConfig -p <project>` runs with
`cwd` the workspace. `stdout` and `stderr` are collected and the child is registered in a set `destroy`
terminates — `SIGTERM` on POSIX, `taskkill /pid <id> /t /f` on win32, per the portability rule.

**Parser.** `scanDiagnostics(text)` reads `path(line,col): error TSnnnn: message` and the unlocated
`error TSnnnn: message`, lowers the 1-based UTF-16 location to the zero-based point `Issue.range` fixes
with `end` equal to `start`, and joins each indented elaboration line into the message above it. A line
matching neither shape and carrying no indentation is skipped, so a runtime's own failure text yields
no diagnostic. A diagnostic whose path names a `.json` file, and one carrying no path, raises
`ProbeError` with `origin: 'workspace'`, `code: 'malformed'`, and the project in `context`; every other
diagnostic is an `origin: 'claimant'` issue. Text on stderr that is not a diagnostic, and a non-zero
exit with no diagnostic at all, raise `origin: 'instrument'`. The exit code is never the verdict.

**Digest.** `computeDigest(workspace, <compilerOptions of tsc --showConfig -p <project>>)`, run against
the workspace copy of the caller's project with `cwd` the workspace, cached per resolved project for
the life of the stage. The value moved: `configs/src/tsconfig.core.json` now digests
`d61f11b52460b1c6707cfac2c6078d59` where it digested `3b674fdf121c85efb9ed1bab25ceeec8`.

**Issue merge.** A draft is checked by the project its claim names and again by the root project the
test is checked against, so identical issues arrive twice; `filterUniqueIssues` keeps the first.

## Unknowns the brief named

- **`paths` rewriting: none is needed.** Measured against `configs/src/tsconfig.core.json`: with the
  scratch at `<mirror>/configs/src/tsconfig.core.probe.json` extending `./tsconfig.core.json`,
  `tsc --showConfig` reports `rootDir: ../../src/core` and
  `paths: {"@src/core":["./src/core/index.ts"],"@src/server":["./src/server/index.ts"]}`, both resolving
  inside the mirror, and the run exits 0. Command:
  `node node_modules/typescript/bin/tsc --showConfig -p ./configs/src/tsconfig.core.probe.json` with
  `cwd` the mirror.
- **A symlinked `node_modules` is not needed.** The mirror sits at `<workspace>/tmp/type/<id>/`, so the
  compiler's walk up reaches `<workspace>/node_modules` for modules and for `@types`. Measured: a mirror
  built with no `node_modules` entry at all typechecks probe's root project (44 files, importing `vite`,
  `vitest`, `@orkestrel/*`, and `node` types) at exit 0.

## What the published types stop importing

`src/` names no compiler specifier, value or type. Removed: `import type * as TypeScript from 'typescript'`
and the seven named compiler type imports in `TypeStage.ts`, and `import type * as TypeScript` in
`helpers.ts`. `loadWorkspaceModule` keeps its name and specifier parameter and loses its `'typescript'`
overload, so its signature is now `(workspace: string, specifier: 'vitest/node') => typeof VitestNode`.
`resolveWorkspaceBinary` gains `command = name`. `Overlay` loses its `sensitive` option and
`OverlayOptions` is deleted; `RuntimeStage` already minted its overlay with no arguments and needed no
edit. The private `#unblock` yield is gone — a spawned compiler leaves the host loop free — and its
destroyed-stage refusal survives as `#refuseDestroyed`, called at each project boundary and after each
spawn returns.

New public exports, each with TSDoc, a guide row, and a test: `TYPE_MIRROR` (core constant),
`Diagnostic`, `ProjectConfig`, `Execution` (server types), `scanDiagnostics`, `matchesLiveProcess`,
`filterUniqueIssues` (server helpers), and `src/server/parsers.ts` with `parseProjectConfig` and
`parseRevisionOwner`.

## Touched files

| File | Change |
| --- | --- |
| `src/server/stages/TypeStage.ts` | Rewritten: mirror, scratch project, spawn, parse, classify, sweep, terminate |
| `src/server/helpers.ts` | Compiler type import removed; `loadWorkspaceModule` overload dropped; `resolveWorkspaceBinary` gains `command`; `scanDiagnostics`, `matchesLiveProcess`, `filterUniqueIssues` added |
| `src/server/parsers.ts` | New: `parseProjectConfig`, `parseRevisionOwner` |
| `src/server/types.ts` | `OverlayOptions` removed; `Diagnostic`, `ProjectConfig`, `Execution` added; type-stage contract prose |
| `src/server/index.ts` | Barrels `./parsers.js` |
| `src/server/Overlay.ts` | Exact matching only; the candidate map is now path to text |
| `src/core/types.ts` | `Issue` range as a point, freshness by content digest, digest source, receipt examples |
| `src/core/constants.ts` | `TYPE_MIRROR` added |
| `tests/src/server/stages/TypeStage.test.ts` | Rewritten onto scratch workspaces; shadowing, sibling drafts, sweep, abandonment, workspace faults |
| `tests/src/server/parsers.test.ts` | New |
| `tests/src/server/helpers.test.ts` | Documented examples for the changed and added leaves; the digest case no longer drives the compiler |
| `tests/src/server/Overlay.test.ts` | Sensitivity cases replaced by exact-match cases |
| `tests/src/server/Probe.test.ts` | Deadline budgets retuned above the type warm; the fake compiler manifest gains a `bin` |
| `tests/src/core/errors.test.ts` | `loadWorkspaceModule` row reads `'vitest/node'` |
| `guides/probe.md` | Surface, methods, engine, containment, lifecycle, cost, receipt, project-fault prose |

`package.json` is unchanged: the `typescript` peer stays `^6.0.3` and optional.

Diffstat (`git diff --stat`, plus the two untracked files):

```text
 guides/probe.md                           |  254 +++---
 src/core/constants.ts                     |   18 +
 src/core/types.ts                         |   25 +-
 src/server/Overlay.ts                     |   52 +-
 src/server/helpers.ts                     |  158 +++-
 src/server/index.ts                       |    1 +
 src/server/stages/TypeStage.ts            |  753 ++++++++++--------
 src/server/types.ts                       |   97 ++-
 tests/src/core/errors.test.ts             |    2 +-
 tests/src/server/Overlay.test.ts          |   37 +-
 tests/src/server/Probe.test.ts            |   46 +-
 tests/src/server/helpers.test.ts          |   76 +-
 tests/src/server/stages/TypeStage.test.ts | 1199 ++++++++++++++++-------------
 13 files changed, 1609 insertions(+), 1109 deletions(-)
 src/server/parsers.ts                     |   61 (new)
 tests/src/server/parsers.test.ts          |   68 (new)
```

`git status --short`:

```text
 M guides/probe.md
 M src/core/constants.ts
 M src/core/types.ts
 M src/server/Overlay.ts
 M src/server/helpers.ts
 M src/server/index.ts
 M src/server/stages/TypeStage.ts
 M src/server/types.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/Overlay.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/TypeStage.test.ts
?? src/server/parsers.ts
?? tests/src/server/parsers.test.ts
```

## Acceptance criteria

**1. No compiler specifier under `src/`.**

```text
$ grep -rn "from 'typescript'\|require('typescript')\|import type .* from 'typescript'" src/
$ echo $?
1
```

**2. Format, lint, typecheck.**

```text
$ npx oxfmt --config .oxfmtrc.json --check src/ tests/src guides/probe.md package.json
All matched files use the correct format.
Finished in 691ms on 32 files using 4 threads.
exit 0
$ npm run lint:check   → exit 0
$ npm run check        → exit 0
```

**3. Shadowing and sibling drafts.** `tests/src/server/stages/TypeStage.test.ts`, both green.

- `reports a consumer broken by the draft that shadows its import` — the workspace holds
  `src/signal.ts` (`export const SIGNAL = 'disk'`) and `src/reader.ts` importing it; the case with no
  draft reports `[]`, and the draft `export const SIGNAL = 1` reports the **consumer's** diagnostic,
  asserted with `toStrictEqual`:

  ```text
  { origin: 'claimant', path: 'src/reader.ts',
    message: "Type 'number' is not assignable to type 'string'." }
  ```

  The workspace copy of `src/signal.ts` is read back unchanged after the inspection.

- `resolves a draft importing a sibling draft to the sibling draft` — the drafts
  `src/first.ts` = `export const FIRST = 'draft'` and
  `src/second.ts` = `import { FIRST } from './first.js'; const VALUE: 'draft' = FIRST` report `[]`
  together. The control, the importing draft alone against the disk file `export const FIRST = 'disk'`,
  reports:

  ```text
  { origin: 'claimant', path: 'src/second.ts',
    message: "Type '\"disk\"' is not assignable to type '\"draft\"'." }
  ```

**4. Abandoned inspection.** `abandons an inspection and destroys idempotently`: the inspection is
started, `destroy()` is called twice concurrently, the inspection rejects with
`The type stage has been destroyed`, a third `destroy()` resolves, the scratch workspace's own entry
list equals its pre-inspection list plus `tmp`, `src/reading.ts` does not exist, and
`readdirSync(<workspace>/tmp/type)` is empty. `sweeps only a mirror its own dead host left behind`
proves the boot sweep: a directory named for a real departed process id (taken from a `spawnSync` that
ran to completion) carrying its own marker is removed, while a live host's directory, a directory whose
marker names another revision, and a directory whose name is not a revision identity all remain.

**5. Workspace fault, separated by the diagnostic rather than the exit code.**
`separates a malformed project from a candidate type error by the diagnostic, not the exit`: one stage,
one workspace, two runs that both exit non-zero.

- `projects/tsconfig.broken.json` = `{"compilerOptions" {"strict":true}}` named by the claim raises
  `ProbeError` with `origin: 'workspace'`, `code: 'malformed'`,
  `context: { stage: 'type', project: 'projects/tsconfig.broken.json' }`, and a message containing
  `':' expected.`, carrying no `Debug Failure` and no absolute workspace path.
- The same stage, a draft carrying `export const READING: number = 'bad'`, reports
  `{ origin: 'claimant', path: 'src/reading.ts', message: "Type 'string' is not assignable to type 'number'." }`.

`raises a project fault the compiler reports against no file` covers the unlocated shape
(`extends` naming an absent file → the message names `projects/absent.json`), and
`refuses every inspection while a declared project is malformed` covers a declared project the warm
reads (`Unknown compiler option 'bogus'`).

**6. `npm run test:src:server`.**

```text
$ npm run test:src:server
 Test Files  8 passed (8)
      Tests  186 passed (186)
   Duration  484.19s
EXIT=0
```

Before this change, on the same host, the same command reported
`Test Files 2 failed | 5 passed (7)`, `Tests 2 failed | 177 passed (179)`, exit 1, both red rows the
standing `LSPError: The LSP request 'initialize' exceeded its deadline` the brief names. Those rows are
green now.

**7. A `prove` over probe's own workspace.** Driven through `Probe` over `/home/user/fleet/probe`, and
again through the guide's own parity proof:

```text
probe:0806fb30f428edb8ea85adfb4b355441:type:typescript@6.0.3:oxlint@1.81.0:vitest@4.1.11:configs/src/tsconfig.core.json@d61f11b52460b1c6707cfac2c6078d59
```

The control breaks at `type`, the case runs clean at every stage, and
`tests/guides.test.ts > earns the receipt the guide documents` asserts that token against the guide.

**8. Guide.** `guides/probe.md` states the point range (`## Surface` `Issue` row, the `Diagnostic` row,
and § What a probe proves), the digest's source (§ What a receipt does not vouch for and the
`TypeStageInterface` method row), and § Cost with the 2026-09-06 readings.

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  13 passed (13)
exit 0
```

Also green: `npm run test:policy` exit 0, `npm run test:src:core` exit 0, `npm run test:src:bin` exit 0
(16 passed, run alone).

## The vendored-population reading

A file left under `tmp/type/` is read by none of the target's own gates. Command and result, with the
plant `tmp/type/vendored-probe/plant.ts` carrying a type error, a formatting violation, and an unused
variable:

```text
$ npm run check         → exit 0, no line naming plant.ts
$ npm run lint:check    → no line naming plant.ts
$ npm run format:check  → no line naming plant.ts
```

The instrument fires when the same file is named directly, which is the control:

```text
$ npx oxfmt --config .oxfmtrc.json --check tmp/type/vendored-probe/plant.ts
tmp/type/vendored-probe/plant.ts (0ms)
Format issues found in above 1 files.   exit 1
$ npx oxlint --config .oxlintrc.json --deny-warnings tmp/type/vendored-probe/plant.ts
tmp/type/vendored-probe/plant.ts:2:7: error eslint(no-unused-vars): Variable 'unusedPlant' is declared but never used.
```

The mechanisms behind that: `tsconfig.json` carries `"exclude": ["node_modules", "dist", "tmp"]`, and
oxlint and oxfmt skip the tree because version control ignores it —
`git check-ignore -v tmp/type/vendored-probe/plant.ts` reports `.gitignore:11:tmp`. Neither
`.oxlintignore` nor `.oxlintrc.json`'s `ignorePatterns` (which names `.orkestrel/` alone) mentions
`tmp`. The plant was removed; `git status --short` is the list given earlier. I edited no vendored file.

**So scaffold's planned `tmp/` additions to `tsconfig.json`, `.oxlintrc.json`, and `.oxfmtrc.json` are
not required for a target on today's vendored bytes** — but they are still worth landing, because the
ignore-file route depends on a target keeping `tmp` in its `.gitignore`.

## Cost readings (2026-09-06, this host, other work running beside)

| What | Reading |
| --- | --- |
| Construction to the `arm` event over probe's own workspace | 12.2 s |
| The four declared projects warmed together, cold | 4.6 s |
| The same four warmed together again | 2.5 s |
| The four warmed one after another, cold | 7.0 s |
| One warm inspection, root plus one scoped project | 2.0 s |
| One warm inspection over a two-file target workspace | 0.9 s |
| `tsc --showConfig` for one project | 90 ms to 115 ms |
| One whole `prove` over the flagship claim | 4.1 s |
| Thirty heavy candidate drafts in one run | 32.6 s |

These are pessimistic: another writer worked in `/home/user/scaffold` throughout. M5 is the
Orchestrator's to take.

## Timing rows I could not clear

Running `npm test` whole (not a criterion) reported four red rows the same tree clears alone:

- `tests/src/bin/main.test.ts` — three rows, each
  `The probe could not arm: The Oxlint language server exited with code 0`. Those tests drive
  `dist/bin/main.js`, which was built before this change and therefore still holds the host loop during
  the type warm. `npm run test:src:bin` alone reports `Tests 16 passed (16)`, exit 0, in 51 s. Rebuilding
  the package removes the cause; `npm run build` is outside this unit's permissions.
- `tests/src/server/stages/RuntimeStage.test.ts > raises progress for the caller's run and lowers it
  before the stage's cleanup` — `Test timed out in 60000ms` under the whole-suite load. Alone it reports
  `Tests 2 passed | 38 skipped (40)` in 1.42 s.

`npm run test:src:server` alone is green (186 passed), so criterion 6 does not rest on either row.

## Decisions inside the brief that a reader must check

1. **Every diagnostic the selected projects report is now a claimant issue.** The mirror makes a draft
   shadow the file it names, so a consumer's diagnostic surfaces — that is criterion 3 — and the same
   run also reports a diagnostic in a file the claim never touched. A target whose own `check` script is
   red therefore earns no receipt until it is green. The guide states this in § What a probe proves. It
   is a real contract change beyond `Issue.range` and `Project.digest`, and I flag it as mine.
2. **`resolve()` no longer raises for a project whose JSON the compiler cannot parse.** `--showConfig`
   recovers tolerantly from a JSON syntax fault and exits 0 on both 6.0.3 and 7.0.2 (`m3m4-report.md`
   § `malformed`), so the digest it returns is over the recovered options. The fault still raises from
   `inspect`, which reads the project for real, and `prove` therefore still fails. The old test that read
   the fault through `resolve` now reads it through `inspect`.
3. **`--showConfig` exit codes for a config fault differ between the majors.** On 6.0.3 an unknown
   option, an absent `extends` target, and an empty input set each exit 1, which is what `resolve` reads;
   on 7.0.2 `--showConfig` drops the offending clause and exits 0 for the first three of those. The
   named-project diagnostic test rests on the 6.0.3 behaviour. Nothing in `inspect` depends on it.
4. **`context.project` is now the resolved workspace-relative spelling**, not the caller's, so
   `./tsconfig.json` and `tsconfig.json` name one run, one cached configuration, and one failure context.
5. **The deadline now has a floor.** Every inspection awaits the stage's warm, so a `ProbeOptions.deadline`
   under about 8 s over probe's own workspace expires arming rather than a claim. Three `Probe.test.ts`
   rows used `deadline: 6_000` and `deadline: 2_000`; I raised them to `20_000`, `15_000`, and `15_000`
   and re-derived each subject's overrun from a measurement: thirty heavy drafts take 32.6 s against the
   20 s budget, and the wide-project resolution takes 26.8 s at 3,000 include patterns (raised from
   1,200, which took 4.6 s) against the 15 s budget. The guide's § Cost and § Lifecycle state the floor.
6. **Warming runs the declared projects together rather than one after another** (4.6 s against 7.0 s
   cold). The runs are independent — each reads the mirror and writes its own state file.
7. **`RuntimeStage` is not mine and walks `tmp/type/`.** Its `#snapshot` hashes the mirror's `.ts` and
   `.json` files on every inspection, which is wasted work rather than a wrong answer: those paths are
   not Vite module ids. A patch is below.

## Shared-file patches (report only, not applied)

`src/server/stages/RuntimeStage.ts` is outside this unit's owned files. Two edits belong there.

**A. Route the liveness read through the shared helper**, so the pid rule has one implementation.
Add `matchesLiveProcess` to the existing `../helpers.js` import list, replace the `#alive` call site,
and delete the method:

```diff
-			if (this.#alive(Number.parseInt(owner, 10))) continue
+			if (matchesLiveProcess(Number.parseInt(owner, 10))) continue
```

```diff
-	// Whether the host that wrote one specification is still running. Signal 0 delivers nothing and
-	// reports reachability alone. A host this process may not signal reports `EPERM` and is read as
-	// alive, and a non-positive identity names a process group rather than a process, so both leave
-	// the file where it is: the safe direction is to keep a file this stage cannot account for.
-	#alive(id: number): boolean {
-		if (!Number.isSafeInteger(id) || id <= 0) return true
-		try {
-			process.kill(id, 0)
-			return true
-		} catch (error) {
-			return readFaultCode(error) === 'EPERM'
-		}
-	}
-
```

**B. Skip the type stage's mirror in the walk**, so a resident type stage costs the runtime stage
nothing. In `#walk`, add `TYPE_MIRROR` to the `@src/core` import list and change the entry filter:

```diff
 	*#walk(): Generator<string> {
+		const excluded = normalizePath(resolveWorkspaceFile(this.#workspace, TYPE_MIRROR))
 		const directories = [resolve(this.#workspace)]
 		while (directories.length > 0) {
 			const directory = directories.pop()
 			if (directory === undefined) break
 			let entries: readonly Dirent[] = []
 			try {
 				entries = readdirSync(directory, { withFileTypes: true })
 			} catch {}
 			for (const entry of entries) {
 				if (entry.name === '.git' || entry.name === 'dist' || entry.name === 'node_modules') {
 					continue
 				}
 				const path = join(directory, entry.name)
 				if (entry.isDirectory()) {
-					directories.push(path)
+					if (normalizePath(path) !== excluded) directories.push(path)
 					continue
 				}
```

Patch B changes behaviour the runtime stage's own tests read, so it needs that stage's suite re-run by
whoever applies it. Patch A is behaviour-preserving.

## Deviation state

No deviation. Every acceptance criterion is met with the evidence above. The three items a reader must
weigh are the contract consequence in decision 1, the `resolve` tolerance in decision 2, and the
deadline floor in decision 5; each is stated in the guide and covered by a test.
