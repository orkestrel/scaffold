# Unit W2 report — fixture shadows, the vendored policy re-scope, and the canon-family proof

`implementer` on Opus 5, native subagent, recorded substitution for Sol. Baseline `8f5c20d`.

## Outcome

Done: every change item the brief names. One deviation, reported below with exact evidence and an
exact patch for an off-limits file. Nothing outside the owned list was written.

Acceptance criteria 2 and 4 are not met in this checkout, and they cannot both be met beside
criterion 5. `tests/policy.test.ts` is a vendored file whose bytes the committed `host.json`
digests, so re-scoping it moves that digest. With the patch applied in a validation copy, every
criterion is met.

## Touched files

| File | Change |
| ---- | ------ |
| `/home/user/scaffold/tests/setupServer.ts` | `STAGED_PATHS` added; `createCheckout` and `buildCheckoutManifest` walk it; `.agents/templates` and `.agents/transports` declared as directories |
| `/home/user/scaffold/tests/src/server/Materializer.test.ts` | Byte-drift witness moved to `.claude/settings.json`; missing and foreign witnesses moved to `.cursor/rules/` |
| `/home/user/scaffold/tests/src/server/helpers.test.ts` | `vendored inventory` proof: the canon family's storage names in `host.json`, with two controls from outside the staged population |
| `/home/user/scaffold/tests/distribution.test.ts` | Declared-inventory case walks `[...HOST_PATHS, ...CANON_PATHS]` in both containment loops |
| `/home/user/scaffold/tests/policy.test.ts` | Skill-family case asserts the relationship against a direct `node:fs` read; path witness swapped to `.claude/settings.json`; post-migration workspace case added with its bridge control |

`git diff --stat`:

```text
 tests/distribution.test.ts            | 10 ++++--
 tests/policy.test.ts                  | 67 ++++++++++++++++++++++++++++++++---
 tests/setupServer.ts                  | 46 +++++++++++++++---------
 tests/src/server/Materializer.test.ts | 29 ++++++++-------
 tests/src/server/helpers.test.ts      | 40 +++++++++++++++++++++
 5 files changed, 157 insertions(+), 35 deletions(-)
```

`git status --porcelain` at return:

```text
 M tests/distribution.test.ts
 M tests/policy.test.ts
 M tests/setupServer.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/helpers.test.ts
```

`.orkestrel/scaffold/w2-brief.md` is untracked at the baseline and was not written by this unit.

## Failing-first record

| Behaviour | Command | Red before | Green after |
| --------- | ------- | ---------- | ----------- |
| Fixture shadows: the `helpers.test.ts` cases the union-walking `stageHost` refused, and the `Materializer` case at `:661` | `npm run test:src:server` | 15 failed, 402 passed (417) — measured in this container at `8f5c20d` before any edit | 417 passed (417), exit 0 — measured after the `setupServer` and `Materializer` patches and before the vendored policy edit |
| Distribution declared-inventory containment | `node --experimental-strip-types` over `src/core/constants.ts` and the committed `host.json` | 66 destinations undeclared against `HOST_PATHS` alone, first three `AGENTS.md`, `CLAUDE.md`, `.agents/orchestration.md` | 0 undeclared against the union; 0 staged paths uncovered by a destination in the forward loop |
| Vendored suite binds in scaffold and passes in a canon-absent target | `npm run test:policy` | 110 passed (110) at baseline; the two membership assertions the brief names read `.claude/rules/names.md` and `orkestrel-falsify`, neither of which a post-migration target holds | 111 passed (111), exit 0 |

The distribution project needs a pack and an install, which the brief forbids, so its containment
loops were measured against the committed inventory's destination set instead. That set is what the
case's `expanded` list mirrors: `tests/src/server/helpers.test.ts` holds a real `stageHost` of this
checkout equal to the inventory's declared destinations, and the distribution case holds `expanded`
equal to the storage names in `dist/host`. Coverage of the substitute instrument: the destination
population, not the `expanded` literal itself.

The new assertions pin behaviour that already held rather than reversing a defect, so each carries a
negative control instead of a red run:

- `tests/src/server/helpers.test.ts > vendored inventory > records every instruction-canon root the
  published fallback serves`. The controls are drawn from outside the staged population: `package.json`
  exists in this checkout and has no entry, and `.claude/settings.local.json` has no entry beside the
  vendored `.claude/settings.json` that does. Removing the canon from the staged set would break it,
  which is the drift it guards.
- `tests/policy.test.ts > repository policy > accepts a target holding the pointer pair and no canon
  tree`. Its control plants one canonical skill with no bridge beside it in the same workspace and
  asserts the exact bridge violation, so the empty result is a sweep that ran.

## Scoped validation evidence

| Command | Exit | Reading |
| ------- | ---- | ------- |
| `npm run check` | 0 | root, `src:core`, `src:server`, `src:bin` |
| `npm run test:policy` | 0 | 111 passed (111) |
| `npm run test:src:core` | 0 | 373 passed (373) |
| `npm run test:src:server` | 1 | 1 failed, 417 passed (418) — the deviation below |
| `npm run test:src:bin` | 1 | 7 failed, 199 passed (206) — the build-dependent pair plus the deviation below |
| `npx vitest run --project config tests/config.test.ts` | 1 | 1 failed, 45 passed (46) — the deviation below |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files | 0 | all correctly formatted |
| `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned files | 0 | no finding |
| `git diff --exit-code host.json` | 0 | byte-identical |
| `git status --porcelain` | — | the owned files alone |

## Deviation — re-scoping the vendored `tests/policy.test.ts` moves a digest `host.json` records

**Expected.** `npm run test:src:server` exits 0, `npm run test:src:bin` fails only the two
build-dependent `main.test.ts` cases, and `host.json` stays byte-identical.

**Found.** The first two cannot hold beside the third. `tests/policy.test.ts` is a `HOST_PATHS`
member, and `readHostFloor()` in source mode reads this checkout and refuses any declared file whose
bytes do not match the digest `host.json` records (`src/server/helpers.ts:1124-1133`). Editing the
vendored file is what the brief's change item 4 requires, so its digest moves and every consumer of
the source-mode floor reddens:

```text
FAIL |src:server| tests/src/server/helpers.test.ts > readHostFloor > reads the default host floor and hydrates as the default materializer does
ScaffoldError: The vendored host cannot read the declared file at tests/policy.test.ts
 ❯ readHostFloor src/server/helpers.ts:1128:10
 ❯ tests/src/server/helpers.test.ts:1120:17
```

The same error fails these `tests/src/bin/CLI.test.ts` cases — `takes the host live when every
declared digest matches and takes the floor when the repository is dark`, `asks the repository for
no canon path while fetching a drifted vendored one`, `writes the same distributed new baseline when
transport forces it and when offline selects it`, `makes offline audit answer drift alone and offline
repair match a forced floor write`, `runs the overwrite floor half offline and refuses its catalog
half` — and one `tests/config.test.ts` case, `keeps the committed host inventory aligned with the
vendored checkout bytes`.

**Done or not done.** Done. The re-scope is complete and the repair is a change to an
off-limits file, supplied below rather than made.

**Hypothesis.** The brief's criterion 5 was written for W1, whose owned files carried no vendored
path; W2 owns one, and a vendored byte edit obliges an inventory regeneration by construction.

### The exact `host.json` patch

Measured with a throwaway probe that called `stageInventory(WORKSPACE_ROOT, …)` into the scratchpad
and compared the result entry by entry against the committed file. Exactly one entry moves, plus the
membership digest:

```diff
@@ -688,7 +688,7 @@
 		{
 			"storage": "tests/policy.test.ts",
 			"destination": "tests/policy.test.ts",
-			"digest": "6a2be29c887e90b976273f8ef9da9ac1c17ed8c1880c133eb8a67514ddf5b5c3"
+			"digest": "c2e0f344ad368991034556ac18772d612f29edb26c7cf72c361b35ebb3f3d580"
 		},
@@ -742,5 +742,5 @@
 	],
-	"digest": "900545f6b4a0078f1ab0256867453576ade0fca62344a3fd258d249cc6853823"
+	"digest": "4dc8bd4866b9f421d4c316a581a11a556f7f8d8afb65005e3886981e8b9c1ee2"
 }
```

The regenerated file is at
`/tmp/claude-0/-home-user-scaffold/dc70cba3-3e2a-551f-9e05-1da04bbbf122/scratchpad/fresh-host.json`
and is byte-identical to the committed file apart from those two lines. `npm run build` regenerates
it from a built `dist/src/server`, through `build:inventory`. Both digests depend on the exact bytes
of `tests/policy.test.ts`, so a later edit to that file supersedes this patch.

The probe carried the control that the file it wrote reads back as the manifest `stageInventory`
returned, so a reported drift is the committed file's. It was deleted before this report; `tmp/`
holds only its campaign records.

### How the patch was validated

The tree was copied to
`/tmp/claude-0/-home-user-scaffold/dc70cba3-3e2a-551f-9e05-1da04bbbf122/scratchpad/w2copy`, with
`node_modules` symlinked back, `dist` and `tmp` excluded, and `.git` carried across so the
git-reading cases run. With the regenerated `host.json` in place there:

```text
npx vitest run --project src:server --project policy --project config
  Test Files  7 passed (7)
       Tests  575 passed (575)
npx vitest run --project src:bin
       Tests  2 failed | 204 passed (206)
```

The two remaining `src:bin` failures are the build-dependent `tests/src/bin/main.test.ts` cases the
brief's standing conditions name; `dist/` is absent in that copy as it is here.

## Shared-file patches

None. `tests/setupPolicy.ts` needed no inspector change: every inspector the re-scoped cases route
through already reports nothing on an absent root, and the new post-migration case proves that over
a real workspace. `tests/src/bin/CLI.test.ts` needs no change either — its five failures are the
stale digest alone, and all five pass in the validation copy with the `host.json` patch and no edit
to that file.

## Decisions recorded, no stop taken

- **`.agents/templates` and `.agents/transports` joined `HOST_DIRECTORY_PATHS`.** Both are
  directories in this repository, and the constant declares which staged paths are directories. Left
  out, the fixture would write each as a plain file while claiming the opposite. The fixture stays
  self-consistent either way, because `createCheckout` and `buildCheckoutManifest` read the same
  list; `buildFleetManifest` is untouched, because its guard only fires for a `HOST_PATHS` member and
  neither path is one. Measured green in `test:src:server` and in the `src:bin` and `config`
  projects.
- **The skill-family case asserts equality with the direct read, not just the relationship.** The
  brief asks for non-empty exactly when the root holds a subdirectory. The equality states that
  precisely, binds hard in scaffold, and reduces to `[] === []` on absence. The `orkestrel-falsify`
  literal is gone from the vendored file, as the brief directs.
- **The bridge control names the direction the brief named.** A canonical skill present with no
  bridge reports `canonical skill has a matching provider bridge directory`; the reverse direction
  carries the `twin` wording. The control asserts the exact violation the planted shape produces.
- **The post-migration workspace is written inline in the test.** It is a fixture for one case, and
  `tests/setupPolicy.ts` is report-only for this unit. `tests/policy.test.ts` already declares inline
  control files this way.
- **The inventory proof pins every canon root, not only the two storage names the brief lists.**
  `AGENTS.md`, `CLAUDE.md`, `agents/orchestration.md`, `agents/skills/orkestrel-falsify/SKILL.md`,
  `agents/templates/brief.md`, `agents/transports/codex.md`, `claude/rules/names.md`, and
  `claude/skills/orkestrel-falsify/SKILL.md` each appear, so a member dropped from the staged set
  breaks it.

## Observations, not criteria

- `npm run build`, the whole `npm test`, and `npm run test:distribution` were not run, per the brief.
  `tests/config.test.ts` was read through a single-file run only to measure the deviation's reach.
- The `prove` tool was unavailable this session. The fallback instruments are the runtime probe named
  in the deviation and the `--experimental-strip-types` measurement in the failing-first table, each
  reported with its control and its coverage.

## The diff

```diff
diff --git a/tests/distribution.test.ts b/tests/distribution.test.ts
index b486450..295b96c 100644
--- a/tests/distribution.test.ts
+++ b/tests/distribution.test.ts
@@ -2,7 +2,7 @@ import { spawnSync } from 'node:child_process'
 import { globSync, readFileSync } from 'node:fs'
 import { dirname, join, relative, resolve } from 'node:path'
 import { fileURLToPath, pathToFileURL } from 'node:url'
-import { HOST_PATHS, replaceManifestRanges } from '@src/core'
+import { CANON_PATHS, HOST_PATHS, replaceManifestRanges } from '@src/core'
 import { listFiles, pathToStorage } from '@src/server'
 import { requireValue } from '@orkestrel/test'
 import { createScratch } from '@orkestrel/test/server'
@@ -277,14 +277,18 @@ describe('installed package consumer', () => {
 			'tests/policy.test.ts',
 			'tests/setupPolicy.ts',
 		]
-		for (const path of HOST_PATHS) {
+		// A release stages the vendored set and the instruction canon, so containment
+		// runs against both lists. Reading `HOST_PATHS` alone reports every canon
+		// destination as undeclared.
+		const staged = [...HOST_PATHS, ...CANON_PATHS]
+		for (const path of staged) {
 			expect(
 				expanded.some((destination) => destination === path || destination.startsWith(`${path}/`)),
 			).toBe(true)
 		}
 		for (const destination of expanded) {
 			expect(
-				HOST_PATHS.some((path) => destination === path || destination.startsWith(`${path}/`)),
+				staged.some((path) => destination === path || destination.startsWith(`${path}/`)),
 			).toBe(true)
 		}
 		expect(listFiles(resolve(root, 'dist/host'))).toEqual(
diff --git a/tests/policy.test.ts b/tests/policy.test.ts
index 7fdca4b..110190d 100644
--- a/tests/policy.test.ts
+++ b/tests/policy.test.ts
@@ -1,7 +1,10 @@
+import { existsSync, readdirSync } from 'node:fs'
+import { join } from 'node:path'
 import { describe, expect, it } from 'vitest'
 import {
 	BRIDGE_POLICY_CONTROLS,
 	createPolicyScratch,
+	createSkillMetadata,
 	FUNCTION_SOURCE_FILES,
 	GENERIC_POLICY_SOURCES,
 	inspectPolicyControl,
@@ -23,6 +26,8 @@ import {
 	readPolicyPaths,
 	readSkillFamily,
 	RULES_POLICY_CONTROLS,
+	SKILL_BRIDGE_ROOT,
+	SKILL_FAMILY_ROOT,
 	SKILL_POLICY_APOSTROPHE,
 	SKILL_POLICY_BACKTICKED,
 	SKILL_POLICY_CONTROLS,
@@ -30,6 +35,7 @@ import {
 	SKILL_POLICY_FENCED,
 	SKILL_POLICY_FOLDED,
 	SKILL_POLICY_PARAGRAPHS,
+	SKILL_POLICY_TEXT,
 	stemToPolicyCandidates,
 	testToPolicyStem,
 } from './setupPolicy.js'
@@ -345,10 +351,21 @@ describe('instrument negative controls', () => {
 })
 
 describe('skill family policy', () => {
-	it('discovers a non-empty family containing orkestrel-falsify', () => {
+	// The family is read from the workspace it runs in, so a membership literal would
+	// bind this file to one workspace. The relationship binds in every workspace: a
+	// direct `node:fs` read of the canonical root is a second mechanism that reports
+	// the same directories, and reports none where the root is absent.
+	it('discovers exactly the directories the canonical skill root holds', () => {
+		const root = join(process.cwd(), SKILL_FAMILY_ROOT)
+		const held = existsSync(root)
+			? readdirSync(root, { withFileTypes: true })
+					.filter((entry) => entry.isDirectory())
+					.map((entry) => entry.name)
+					.sort()
+			: []
 		const family = readSkillFamily(process.cwd())
-		expect(family.length).toBeGreaterThan(0)
-		expect(family).toContain('orkestrel-falsify')
+		expect(family.length > 0).toBe(held.length > 0)
+		expect([...family]).toEqual(held)
 	})
 
 	it('requires every discovered skill file, metadata token, and reference', () => {
@@ -490,10 +507,52 @@ describe('repository policy', () => {
 		expect(inspectPolicyWorkspace(process.cwd())).toEqual([])
 	})
 
+	// A target reads the canon from the installed package, so its tree carries the
+	// pointer pair and no `.agents/` directory, no rule map, and no skill bridges.
+	// This vendored suite runs there, and every inspector it routes through has to
+	// stay silent on that shape.
+	it('accepts a target holding the pointer pair and no canon tree', () => {
+		const scratch = createPolicyScratch({ prefix: 'orkestrel-policy-pointer-' })
+		try {
+			scratch.write(
+				'AGENTS.md',
+				'# AGENTS.md\n\nRead `node_modules/@orkestrel/scaffold/dist/host/AGENTS.md` for the canon.\n',
+			)
+			scratch.write(
+				'CLAUDE.md',
+				'# Claude Code bridge\n\nRead the `AGENTS.md` file beside this one first.\n',
+			)
+			scratch.write('.claude/settings.json', '{\n\t"permissions": {\n\t\t"allow": []\n\t}\n}\n')
+			scratch.write(
+				'.claude/agents/orkestrel.md',
+				'# Orkestrel\n\nThe agent carrying the package catalog.\n',
+			)
+			scratch.write(
+				'package.json',
+				'{\n\t"name": "target",\n\t"private": true,\n\t"scripts": {\n\t\t"test": "vitest run"\n\t}\n}\n',
+			)
+			expect(inspectPolicyWorkspace(scratch.path)).toEqual([])
+			// The control: the same workspace with one canonical skill planted and no
+			// bridge beside it reports the twin violation, so the empty result above is a
+			// sweep that ran rather than a sweep with nothing it could report.
+			scratch.write(`${SKILL_FAMILY_ROOT}/sample/SKILL.md`, SKILL_POLICY_TEXT)
+			scratch.write(`${SKILL_FAMILY_ROOT}/sample/agents/openai.yaml`, createSkillMetadata('sample'))
+			expect(inspectPolicyWorkspace(scratch.path)).toEqual([
+				{
+					rule: 'bridge',
+					path: `${SKILL_BRIDGE_ROOT}/sample`,
+					message: 'canonical skill has a matching provider bridge directory',
+				},
+			])
+		} finally {
+			scratch.destroy()
+		}
+	})
+
 	it('reaches every branch of the workspace-authored path population', () => {
 		const paths = readPolicyPaths(process.cwd())
 		expect(paths).toContain('tests/setupPolicy.ts')
-		expect(paths).toContain('.claude/rules/names.md')
+		expect(paths).toContain('.claude/settings.json')
 		expect(paths).toContain('package.json')
 		expect(paths).toContain('.gitattributes')
 	})
diff --git a/tests/setupServer.ts b/tests/setupServer.ts
index 136d901..c24d3e6 100644
--- a/tests/setupServer.ts
+++ b/tests/setupServer.ts
@@ -19,6 +19,7 @@ import {
 	blueprintToDevDependencies,
 	contentToHex,
 	blueprintToScripts,
+	CANON_PATHS,
 	Compiler,
 	createBlueprint,
 	HOST_PATHS,
@@ -1083,17 +1084,19 @@ export function createSink(): TestSinkInterface {
 }
 
 /**
- * The vendored paths that are directories rather than files.
+ * The staged paths that are directories rather than files.
  *
  * @remarks
- * `HOST_PATHS` mixes files and directories and says which is which nowhere, because the
- * vendored root's own manifest is what decides it. A fixture builds that
- * manifest, so the fixture declares the split. `.claude/skills` is the one
- * declared directory no entry sits beneath, which makes it the empty-directory
- * case every writer has to survive.
+ * `HOST_PATHS` and `CANON_PATHS` each mix files and directories and say which is
+ * which nowhere, because the vendored root's own manifest is what decides it. A
+ * fixture builds that manifest, so the fixture declares the split.
+ * `.claude/skills` is the one declared directory no entry sits beneath, which
+ * makes it the empty-directory case every writer has to survive.
  */
 export const HOST_DIRECTORY_PATHS: readonly string[] = [
 	'.agents/skills',
+	'.agents/templates',
+	'.agents/transports',
 	'.claude/agents',
 	'.claude/rules',
 	'.claude/skills',
@@ -1101,6 +1104,17 @@ export const HOST_DIRECTORY_PATHS: readonly string[] = [
 	'.cursor/rules',
 ]
 
+/**
+ * Every path a release stages, the vendored set and the instruction canon together.
+ *
+ * @remarks
+ * The stager walks both lists, so a checkout fixture carrying only one of them
+ * is refused for the paths it left out. No plan claims a canon path, which is
+ * why {@link buildFleetManifest} stays on `HOST_PATHS` while the two checkout
+ * fixtures read this.
+ */
+export const STAGED_PATHS: readonly string[] = [...HOST_PATHS, ...CANON_PATHS]
+
 /**
  * Build the manifest a vendored root storing every planned path declares.
  *
@@ -1133,24 +1147,24 @@ export function buildFleetManifest(): HostManifest {
 }
 
 /**
- * Write a real checkout carrying every vendored path, as the stager reads one.
+ * Write a real checkout carrying every staged path, as the stager reads one.
  *
  * @param workspace - The temporary workspace the checkout is written into.
  * @param relative - The workspace-relative directory to write it at.
  * @returns The checkout's absolute path.
  *
  * @remarks
- * The stager reads `HOST_PATHS` out of core, which no test can vary, so the
- * checkout beneath it is the only seam a stager test has. Every file carries its
- * own path as its content, so a file staged under the wrong storage name is
- * visible in the assertion rather than in a count. Each vendored directory is
- * given one file except `.claude/skills`, which is left genuinely empty because
- * that is the root a file inventory cannot see and the one the manifest exists
- * to declare.
+ * The stager reads {@link STAGED_PATHS}' two lists out of core, which no test can
+ * vary, so the checkout beneath it is the only seam a stager test has. Every file
+ * carries its own path as its content, so a file staged under the wrong storage
+ * name is visible in the assertion rather than in a count. Each staged directory
+ * is given one file except `.claude/skills`, which is left genuinely empty
+ * because that is the root a file inventory cannot see and the one the manifest
+ * exists to declare.
  */
 export function createCheckout(workspace: ScratchInterface, relative: string): string {
 	const root = workspace.ensure(relative)
-	for (const path of HOST_PATHS) {
+	for (const path of STAGED_PATHS) {
 		if (!HOST_DIRECTORY_PATHS.includes(path)) {
 			workspace.write(`${relative}/${path}`, `${path}\n`)
 			continue
@@ -1177,7 +1191,7 @@ export function createCheckout(workspace: ScratchInterface, relative: string): s
 export function buildCheckoutManifest(): HostManifest {
 	const entries: ManifestEntry[] = []
 	const roots: string[] = []
-	for (const path of HOST_PATHS) {
+	for (const path of STAGED_PATHS) {
 		if (!HOST_DIRECTORY_PATHS.includes(path)) {
 			entries.push(
 				buildManifestEntry({
diff --git a/tests/src/server/Materializer.test.ts b/tests/src/server/Materializer.test.ts
index dafa8f3..22a9c5e 100644
--- a/tests/src/server/Materializer.test.ts
+++ b/tests/src/server/Materializer.test.ts
@@ -657,8 +657,8 @@ describe('Materializer audit', () => {
 					'is not covered by its audit',
 				)
 
-				writeFileSync(join(target, 'AGENTS.md'), '# Edited agents\n', 'utf8')
-				rmSync(join(target, '.claude/rules/sample.md'))
+				writeFileSync(join(target, '.claude/settings.json'), '{ "edited": true }\n', 'utf8')
+				rmSync(join(target, '.cursor/rules/sample.md'))
 				const staleCompilerAudit = compiler.audit(
 					plan.blueprint,
 					readSnapshot(
@@ -667,35 +667,40 @@ describe('Materializer audit', () => {
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
diff --git a/tests/src/server/helpers.test.ts b/tests/src/server/helpers.test.ts
index 6699325..52ecdbb 100644
--- a/tests/src/server/helpers.test.ts
+++ b/tests/src/server/helpers.test.ts
@@ -197,6 +197,46 @@ describe('vendored imports', () => {
 	})
 })
 
+describe('vendored inventory', () => {
+	// No plan claims a canon path and no target receives one, so the committed
+	// inventory is where the instruction canon's arrival in the published root is
+	// visible. `tests/config.test.ts` holds this file equal to a fresh stage, which
+	// makes a storage name here a statement about what a release ships. The names are
+	// storage spellings: `pathToStorage` strips the dot that opens each segment.
+	it('records every instruction-canon root the published fallback serves', () => {
+		const inventory: unknown = JSON.parse(
+			readFileSync(join(WORKSPACE_ROOT, HOST_INVENTORY_PATH), 'utf8'),
+		)
+		if (!isRecord(inventory) || !arrayOf(isRecord)(inventory.entries)) {
+			throw new Error('The committed host inventory carries no entry list')
+		}
+		const storage = inventory.entries.flatMap((entry) =>
+			isString(entry.storage) ? [entry.storage] : [],
+		)
+		expect(storage.length).toBe(inventory.entries.length)
+		for (const name of [
+			'AGENTS.md',
+			'CLAUDE.md',
+			'agents/orchestration.md',
+			'agents/skills/orkestrel-falsify/SKILL.md',
+			'agents/templates/brief.md',
+			'agents/transports/codex.md',
+			'claude/rules/names.md',
+			'claude/skills/orkestrel-falsify/SKILL.md',
+		]) {
+			expect(storage).toContain(name)
+		}
+		// The controls, drawn from outside the staged population: a manifest this
+		// checkout carries at its root and an operator's own harness settings beside a
+		// vendored file of nearly the same name. Neither is staged, so the membership
+		// above is the inventory's selection rather than every path in the checkout.
+		expect(existsSync(join(WORKSPACE_ROOT, 'package.json'))).toBe(true)
+		expect(storage).not.toContain('package.json')
+		expect(storage).toContain('claude/settings.json')
+		expect(storage).not.toContain('claude/settings.local.json')
+	})
+})
+
 describe('pathToStorage', () => {
 	for (const storageCase of STORAGE_PATH_CASES) {
 		it(`maps ${storageCase.label} to its storage name`, () => {
```
