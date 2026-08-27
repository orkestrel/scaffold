# Unit W1 report — the canon split, the pointer artifacts, the overlay pair, and the advisory

`implementer` on Opus 5, native subagent, recorded substitution for Sol. Baseline `aa37244`.

## Outcome

Done: every change item and every mirrored test the brief names. Two deviations, both reported
below with exact evidence and exact patches. Nothing outside the owned list was written.

## Touched files

| File | Change |
| ---- | ------ |
| `/home/user/scaffold/src/core/constants.ts` | `CANON_PATHS` added; its members removed from `HOST_PATHS`; both TSDoc blocks rewritten |
| `/home/user/scaffold/src/core/helpers.ts` | `isCanonPath` added beside `isDeferredPath` |
| `/home/user/scaffold/src/core/templates.ts` | `ARTIFACT_TEMPLATES.docs.agents` and `.claude` pointer bodies added |
| `/home/user/scaffold/src/core/compilers.ts` | `blueprintToDocumentArtifacts` emits the pointer pair; `nameToHostArtifacts` fence and remarks corrected |
| `/home/user/scaffold/src/server/helpers.ts` | `stageHost` walks `HOST_PATHS` and `CANON_PATHS`; `filesToHost` takes floor bytes for a canon destination |
| `/home/user/scaffold/src/bin/CLI.ts` | `#host` drops canon from the fetch list; `#canonQuestion` added, raised by `audit` alone |
| `/home/user/scaffold/tests/src/core/helpers.test.ts` | `isCanonPath` membership, non-membership, prefix-lookalike control, disjointness; `selectHostPaths` canon exclusion |
| `/home/user/scaffold/tests/src/core/templates.test.ts` | Pointer bodies: resolution paths, no `@` outside a code span, no placeholder |
| `/home/user/scaffold/tests/src/core/compilers.test.ts` | Pointer pair emitted beside `README.md`; no canon path among vendored artifacts |
| `/home/user/scaffold/tests/src/core/Compiler.test.ts` | Plan claims each pointer once with a collision control; origin counts repinned |
| `/home/user/scaffold/tests/src/server/helpers.test.ts` | Canon overlay and its negative control; real `stageHost` union proof; pointer fallback spelled by `pathToStorage` |
| `/home/user/scaffold/tests/src/bin/CLI.test.ts` | Fetch-list exclusion with a drifted-vendored control; advisory fires and stays silent; witnesses repinned off canon paths |

`git diff --stat` (12 files, 618 insertions, 59 deletions):

```text
 src/bin/CLI.ts                   |  45 +++++++++-
 src/core/compilers.ts            |  37 +++++++-
 src/core/constants.ts            |  53 ++++++++----
 src/core/helpers.ts              |  26 ++++++
 src/core/templates.ts            |  35 ++++++++
 src/server/helpers.ts            |  30 +++++--
 tests/src/bin/CLI.test.ts        | 178 ++++++++++++++++++++++++++++++++++-----
 tests/src/core/Compiler.test.ts  |  45 +++++++++-
 tests/src/core/compilers.test.ts |  40 +++++++++
 tests/src/core/helpers.test.ts   |  46 ++++++++++
 tests/src/core/templates.test.ts |  34 ++++++++
 tests/src/server/helpers.test.ts | 108 ++++++++++++++++++++++--
 12 files changed, 618 insertions(+), 59 deletions(-)
```

The full diff is at `/tmp/claude-0/-home-user-scaffold/dc70cba3-3e2a-551f-9e05-1da04bbbf122/scratchpad/w1.diff`; it is reproducible with `git diff` against `aa37244`.

`git status --porcelain` at return:

```text
 M src/bin/CLI.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/templates.ts
 M src/server/helpers.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/Compiler.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/templates.test.ts
 M tests/src/server/helpers.test.ts
```

## Failing-first record

Every reversed behaviour was pinned by a test that ran red before the source moved.

| Behaviour | Command | Red before | Green after |
| --------- | ------- | ---------- | ----------- |
| `isCanonPath` membership, disjointness, `selectHostPaths` canon exclusion | `npx vitest run --project src:core tests/src/core/helpers.test.ts` | 4 failed, 104 passed (108) | 0 failed, 108 passed |
| Pointer bodies, pointer pair emitted, plan claims each pointer once, `nameToHostArtifacts` canon exclusion | `npx vitest run --project src:core tests/src/core/compilers.test.ts tests/src/core/templates.test.ts tests/src/core/Compiler.test.ts` | 7 failed, 126 passed (133) | 0 failed, 133 passed |
| Canon overlay in `filesToHost`, its negative control, `stageHost` union, pointer fallback spelling | `npx vitest run --project src:server tests/src/server/helpers.test.ts` | 6 failed, 172 passed (178) | 14 failed, 164 passed — every remaining failure is the shared-fixture deviation below, and each of the 6 named tests passes |
| Fetch list excludes canon; advisory fires and stays silent | `npx vitest run --project src:bin tests/src/bin/CLI.test.ts` | 3 failed, 128 passed (131) | 0 failed, 131 passed |

## Scoped validation evidence

| Command | Exit | Reading |
| ------- | ---- | ------- |
| `npm run check:src:core` | 0 | — |
| `npm run check:src:server` | 0 | — |
| `npm run check:src:bin` | 0 | — |
| `npm run test:src:core` | 0 | 8 files, 373 passed (373) |
| `npm run test:src:server` | 1 | 15 failed, 402 passed (417) — deviation 1 |
| `npm run test:src:bin` | 1 | 2 failed, 204 passed (206) — deviation 2 |
| `git diff --exit-code host.json` | 0 | byte-identical |
| `npx oxfmt --check` over the 12 owned files | 0 | all correctly formatted |
| `npx oxlint --config .oxlintrc.json` over the 6 owned source files | 0 | no finding |

`host.json` staying byte-identical is not only a `git diff` reading: the new test
`stageHost > stages the canon beside the vendored set from this checkout` runs the changed
`stageHost` over this repository and asserts its staged destination set equals the committed
inventory's declared destination set. Sorting by storage name inside `stageHost` is what makes the
walk order irrelevant.

## Deviation 1 — `tests/setupServer.ts` and `tests/src/server/Materializer.test.ts` cannot stay green

**Expected.** `npm run test:src:server` exits 0.

**Found.** 15 failures, every one caused by a shared file the brief marks report-only.

- 14 in `tests/src/server/helpers.test.ts` (owned), all raised from `tests/setupServer.ts`
  (shared). `createCheckout` and `buildCheckoutManifest` walk `HOST_PATHS` alone, so the fixture
  checkout no longer carries the canon and the changed `stageHost` refuses it:

  ```text
  ScaffoldError: The checkout does not carry every vendored path
   ❯ stageHost src/server/helpers.ts:1440:9
   ❯ tests/src/server/helpers.test.ts:1548:20
  ```

- 1 in `tests/src/server/Materializer.test.ts` (shared):

  ```text
  Error: ENOENT: no such file or directory, lstat '.../project/.claude/rules/sample.md'
   ❯ tests/src/server/Materializer.test.ts:661:5
  ```

  Repointing that path alone is not enough. `buildCompiledPlan()` now plans `AGENTS.md` as a
  content-owned template artifact, so the pure-compiler audit sees its drift and the test's
  `'aligned'` expectation reverses to `'stale'`. The byte-drift witness has to move to a
  host-origin path the compiler cannot know the bytes of.

**Done or not done.** Done, and the patches are validated. I did not edit either file.

**Hypothesis.** The plan gives `tests/setupServer.ts` and `tests/src/server/Materializer.test.ts`
to W2, so the brief's `test:src:server` criterion assumed a fixture change this unit is not allowed
to make.

### Patch for `tests/setupServer.ts`

```diff
@@ -19,6 +19,7 @@
 	blueprintToDevDependencies,
 	contentToHex,
 	blueprintToScripts,
+	CANON_PATHS,
 	Compiler,
 	createBlueprint,
 	HOST_PATHS,
@@ -1102,6 +1103,17 @@
 ]
 
 /**
+ * Every path a release stages, vendored set and instruction canon together.
+ *
+ * @remarks
+ * The stager walks both lists, so a checkout fixture that carries only one of
+ * them is refused for the paths it left out. A plan claims no canon path, which
+ * is why {@link buildFleetManifest} stays on `HOST_PATHS` while the two stager
+ * fixtures read this.
+ */
+export const STAGED_PATHS: readonly string[] = [...HOST_PATHS, ...CANON_PATHS]
+
+/**
  * Build the manifest a vendored root storing every planned path declares.
@@ -1150,7 +1162,7 @@
 export function createCheckout(workspace: ScratchInterface, relative: string): string {
 	const root = workspace.ensure(relative)
-	for (const path of HOST_PATHS) {
+	for (const path of STAGED_PATHS) {
 		if (!HOST_DIRECTORY_PATHS.includes(path)) {
 			workspace.write(`${relative}/${path}`, `${path}\n`)
 			continue
@@ -1177,7 +1189,7 @@
 export function buildCheckoutManifest(): HostManifest {
 	const entries: ManifestEntry[] = []
 	const roots: string[] = []
-	for (const path of HOST_PATHS) {
+	for (const path of STAGED_PATHS) {
 		if (!HOST_DIRECTORY_PATHS.includes(path)) {
 			entries.push(
 				buildManifestEntry({
```

`buildFleetManifest` must keep walking `HOST_PATHS`. Walking the union there was measured and it
breaks 7 further tests in `tests/src/bin/CLI.test.ts`: `FLEET_ARTIFACT_COUNT` is that manifest's
entry count plus the compiler's own artifacts, and a canon entry inflates it against a plan that
claims no canon path.

### Patch for `tests/src/server/Materializer.test.ts`

```diff
@@ -657,8 +657,8 @@
 					'is not covered by its audit',
 				)
 
-				writeFileSync(join(target, 'AGENTS.md'), '# Edited agents\n', 'utf8')
-				rmSync(join(target, '.claude/rules/sample.md'))
+				writeFileSync(join(target, '.claude/settings.json'), '{ "edited": true }\n', 'utf8')
+				rmSync(join(target, '.cursor/rules/sample.md'))
 				const staleCompilerAudit = compiler.audit(
 					plan.blueprint,
 					readSnapshot(
@@ -667,35 +667,40 @@
 					),
 				)
 				expect(
-					staleCompilerAudit.findings.find((finding) => finding.path === 'AGENTS.md')?.drift,
+					staleCompilerAudit.findings.find((finding) => finding.path === '.claude/settings.json')
+						?.drift,
 				).toBe('aligned')
 
 				const audit = materializer.audit(plan, target)
 				expect(audit.questions).toEqual([])
-				expect(audit.findings.find((finding) => finding.path === 'AGENTS.md')?.drift).toBe('stale')
 				expect(
-					audit.findings.find((finding) => finding.path === '.claude/rules/sample.md')?.drift,
+					audit.findings.find((finding) => finding.path === '.claude/settings.json')?.drift,
+				).toBe('stale')
+				expect(
+					audit.findings.find((finding) => finding.path === '.cursor/rules/sample.md')?.drift,
 				).toBe('missing')
 
-				workspace.write('project/.claude/rules/foreign.md', '# Foreign rule\n')
+				workspace.write('project/.cursor/rules/foreign.md', '# Foreign rule\n')
 				workspace.write('project/NOTES.md', '# Consumer notes\n')
 				const discovered = materializer.audit(plan, target)
 				expect(
-					discovered.findings.find((finding) => finding.path === '.claude/rules/foreign.md')?.drift,
+					discovered.findings.find((finding) => finding.path === '.cursor/rules/foreign.md')?.drift,
 				).toBe('foreign')
 				expect(discovered.findings.some((finding) => finding.path === 'NOTES.md')).toBe(false)
 
 				const result = materializer.repair(plan, audit, target)
-				expect(result.written).toContain('AGENTS.md')
-				expect(result.written).toContain('.claude/rules/sample.md')
-				expect(readFileSync(join(target, 'AGENTS.md'), 'utf8')).toBe('AGENTS.md\n')
-				expect(readFileSync(join(target, '.claude/rules/foreign.md'), 'utf8')).toBe(
+				expect(result.written).toContain('.claude/settings.json')
+				expect(result.written).toContain('.cursor/rules/sample.md')
+				expect(readFileSync(join(target, '.claude/settings.json'), 'utf8')).toBe(
+					'.claude/settings.json\n',
+				)
+				expect(readFileSync(join(target, '.cursor/rules/foreign.md'), 'utf8')).toBe(
 					'# Foreign rule\n',
 				)
 				expect(readFileSync(join(target, 'NOTES.md'), 'utf8')).toBe('# Consumer notes\n')
 				const terminal = materializer.audit(plan, target)
 				expect(
-					terminal.findings.find((finding) => finding.path === '.claude/rules/foreign.md')?.drift,
+					terminal.findings.find((finding) => finding.path === '.cursor/rules/foreign.md')?.drift,
 				).toBe('foreign')
 				expect(materializer.repair(plan, terminal, target).written).toEqual([])
 			} finally {
```

### How the patches were validated

Editing a report-only file is forbidden, so the pair was proved in a copy of this checkout under
the scratchpad, with `node_modules` symlinked back and `.git`, `dist`, and `tmp` excluded. With
both patches applied there:

```text
npx vitest run --project src:server --project src:bin
  Tests  3 failed | 620 passed (623)
npx vitest run --project src:core
  Tests  373 passed (373)
npx oxfmt --check tests/setupServer.ts tests/src/server/Materializer.test.ts
  All matched files use the correct format.
npx vitest run --project policy
  Tests  110 passed (110)
```

The 3 remaining failures there are artifacts of the copy rather than of the patches: two are the
missing `dist/bin/main.js` of deviation 2, and one is
`matchesExecutablePath > declares exactly the vendored paths this repository records as executable`,
which shells out to `git ls-files --stage` and fails with `Command failed: git ls-files --stage`
because the copy carries no `.git`. That test passes in this checkout.

The copy still sits at
`/tmp/claude-0/-home-user-scaffold/dc70cba3-3e2a-551f-9e05-1da04bbbf122/scratchpad/w1copy`, with
both patches applied, so the Orchestrator can re-read the readings above. Removing it was refused
by the permission system, so it is left for the Orchestrator to sweep. It is outside the
repository and outside git's reach.

### Further shared files

- `tests/policy.test.ts` needs no patch. It passed in the patched copy (110 passed), because this
  repository still carries its own `AGENTS.md` with the rule map; the vendored re-scope the plan
  gives W2 is about a generated target, not about this tree.
- `tests/distribution.test.ts` is not collected by any project this brief authorizes, so it was
  read rather than run. Its `stages exactly the declared vendored host inventory` case at lines
  280-289 walks `HOST_PATHS` in both directions over the `expanded` list, and the reverse
  containment loop will report every canon destination as undeclared. The fix is to read
  `[...HOST_PATHS, ...CANON_PATHS]` in both loops; the `expanded` list itself needs no member
  change, because the staged membership did not move.

## Deviation 2 — `test:src:bin` was not green at the baseline

**Expected.** The brief's Measurements state `npm run test:src:bin` was green at the baseline
commit.

**Found.** It was red at `aa37244`, before any edit of mine, with 2 failed and 201 passed (203):

```text
FAIL tests/src/bin/main.test.ts > scaffold > exits cleanly when a JSON consumer closes its pipe after ten bytes
  AssertionError: expected '' to have a length of 10 but got +0
FAIL tests/src/bin/main.test.ts > scaffold > routes the configured npm registry through the process entry
  Error: Cannot find module '/home/user/scaffold/dist/bin/main.js'
```

`ls dist` reports `No such file or directory`. Both cases drive the built executable, and only
`npm run build` produces it, which this brief forbids.

**Done or not done.** Done. The same two cases, and no others, are red at return: 2 failed, 204
passed (206). The count of passing cases rose by 3, which is the three cases this unit added.

**Hypothesis.** The baseline measurement was taken in a checkout that still had `dist/` from an
earlier build.

## Decisions recorded, no stop taken

- **`selectHostPaths(HOST_PATHS, 'router')` still equals `HOST_PATHS`.** The brief's Scope section
  predicts `tests/src/core/helpers.test.ts:278-286` reverses and asks for a repin. It does not:
  `selectHostPaths` filters the workspace's own guide and nothing else, so removing the canon from
  `HOST_PATHS` leaves that identity true. This is not one of the brief's verified evidence lines,
  so no stop was taken. The membership claim change item 7 asks for is asserted instead, in a new
  case beside it that pins the canon out of the selection and pins
  `.claude/settings.json`, `.claude/agents`, `scripts/deps.sh`, and `LICENSE` into it.
- **The advisory subtracts the planned document paths.** The brief says the advisory names every
  `CANON_PATHS` member present in the target. Read literally that names `AGENTS.md` and
  `CLAUDE.md`, which this change plans as content-owned artifacts, so the advisory would fire on
  every healthy target and tell a maintainer to delete what the next `repair` restores. The brief's
  own evidence line for the precedent says `#setupQuestion` names nothing scaffold plans, so
  `#canonQuestion` subtracts `blueprintToDocumentArtifacts(blueprint)` paths — the same shape
  `#setupQuestion` uses with `blueprintToTestArtifacts`. The test asserts the pointer pair is never
  named.
- **Witnesses moved off canon paths in owned tests.** Several `tests/src/bin/CLI.test.ts` cases
  used `.claude/rules` as their vendored-directory witness and `AGENTS.md` as their vendored-file
  witness. Both are canon now, so each moved to `.cursor/rules` and to `.claude/settings.json` or
  `LICENSE`. One title changed with it: `reports a file the plan does not own beneath an owned
  canon root` became `... beneath an owned vendored root`, because `canon` now names a specific set
  in this codebase and the old title used the word in its other sense.
- **The line-delta expectation is derived.** `reports a stale content-owned file as replaced with
  its line delta` computed its number from `ARTIFACT_TEMPLATES.docs.agents` rather than writing one
  down, so a wording change to the pointer moves the expectation with it.
- **Pointer wording.** The brief's drafts were kept almost verbatim. Two edits: the sibling-checkout
  bullet reads `read ../scaffold/AGENTS.md, the ../scaffold/.agents/orchestration.md file, and the
  ../scaffold/.claude/rules/ directory` so every code token is followed by a noun, and the
  `CLAUDE.md` colon clause became two sentences. Every hard constraint holds and is asserted:
  the sibling paths and both storage-spelled fallbacks appear verbatim, every `@` sits inside a
  code span, and no `{{token}}` remains.

## Observations, not criteria

- `test:policy` was run only inside the validation copy, to decide whether that shared file was
  owed a patch. It is not owed one.
- `test:config`, `test:guides`, `test:distribution`, the whole `npm test`, and `npm run build` were
  not run, per the brief.
