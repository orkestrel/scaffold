Lane held: subjective (`reviewer`, Opus 5.5, clean context, read-only). The work under audit was written by `opus` on Opus 5.5, which is my own engine, so I attacked it harder. The dispatch has no defect. I executed nothing, so every ruling below comes from reading the source against the retained logs. Where a clause needs an execution, I say so and refer it to the objective lane.

## Per-claim verdicts

**1. The fix and the end-to-end pin still hold: CONFIRMED.**
- Both fix sites carry the same blob in round 1 and round 2:
  - `src/core/templates.ts` is `85deff4a..32115a8a` in both `rm.diff:62` and `rm-2.diff:84`.
  - `vite.config.ts` is `85bb84dd..fc4634f8` in both `rm.diff:487` and `rm-2.diff:834`.
- The restores recorded in the provenance logs (`8fd40513…`, `170bfcbc…`) match the pre-run fixed copies.
- The end-to-end run reads `Tests 1 passed | 8 skipped (9)`, `exit=0` (`rm-instruments/r2/logs/rm-2-e2e.log.txt:11,15`).
- The moved file was the one in place. The red run's pointer is `tests/distribution.test.ts:800` (`rm-2-red-distribution.log.txt:47`), which is `expect(readings.get('release')).toStrictEqual(failed)` in the round-2 layout (`rm-2.diff:405`, hunk starting at new line 693).
- Mutation: put the `392aa1e0` merge (`return base`) in place.
  - The release reading turns into `code: 0`, proof `passed`, `['passed','skipped']`, and it fails with an AssertionError (`rm-2-red-distribution.log.txt:20-45`).
  - The assertions tell that mutation apart from the passing case.

**2. The setup-file move (F1): CONFIRMED.**
- The exports and shapes exist:
  - `TestReportCase`, `TestReportFile`, and `TestReleaseScenario` sit in `tests/setupServer.ts`, around lines 422-463, beside the existing `Test*` fixture shapes (`TestGeneratedWorkspace`).
  - `readVitestReport` is at `tests/setupServer.ts:920`, and `buildReleaseScenarios` follows it at line 957.
  - Every member is `readonly`, and every field name is one word.
- Both report-reading sites use the one reader: `tests/distribution.test.ts:766` (end to end) and `tests/distribution.test.ts:1166` (Vue SFC). The end-to-end case builds its runs through `buildReleaseScenarios`.
- The readings are identical before and after the move (`rm-2-readings-before.json.txt` and `rm-2-readings-after.json.txt` hold the same bytes).
- Mutations, and whether the proofs tell each one apart:
  - Drop the refusal of a non-record file entry: the last text at `setupServer.test.ts:1086` returns an array, and `toBeUndefined` fails. Distinguished.
  - Drop `isString(result.name)`: the `{"name":7,…}` text returns an array. Distinguished.
  - Filter non-record cases out instead of carrying placeholders: the expected `{ title: undefined, status: undefined }` row goes missing. Distinguished.
  - Carry the whole assertion record: the `duration: 12` field leaks, and `toStrictEqual` fails. Distinguished.
  - Drop a rival, or remove the `import './absent-module.js'` prefix: the pinned table at `setupServer.test.ts:1090-1117` fails. Distinguished.
- This clause holds only for the three shapes the claim names. The name of the `readVitestReport` function breaks `.claude/rules/names.md`, as F1 records.

**3. The vendored title (claim 8): CONFIRMED.**
- The title is at `tests/config.test.ts:373`. The body calls each entry through `Reflect.apply` with a synthetic record (`config.test.ts:402`) and reads the returned object. It never runs Vitest on a configuration.
- The body is round 1's: `rm.diff:112-226` and `rm-2.diff:133-247` differ only in the title line.
- Mutations:
  - `return base` gives every project `mode: undefined` and fails at line 416 (`rm-2-red-config.log.txt:17-88`). Distinguished.
  - A whole-record spread makes `leaked` non-empty. Distinguished.
  - An inline row reads `callable: false`. Distinguished.
- Voice note, not a finding: the body also proves that every registered row is a factory, and that a record with no string `mode` throws. The title leaves both unnamed. It stays accurate as an under-statement, and brief item 1 prescribed its property.

**4. The comments (claim 7) and the compiler comment: CONFIRMED.**
- `tests/src/core/templates.test.ts:1040-1044` separates receiving from returning: Vitest calls the row "with the invocation record, and the project runs in the command line's `--mode` only because the factory returns that record's mode". This is true of `mergeOverride` at `src/core/templates.ts:120-126`.
- `tests/src/core/compilers.test.ts:1220-1229` separates them too: "Receiving the record is not running in its mode: `mergeOverride` … returns the base with that record's mode set". This is also true.
- `src/core/compilers.ts:815-818` matches brief item 3 word for word, with `--mode` and `mergeOverride` in backticks and only the formatter's wrapping changed.
- A sweep of the owned files for `refus… (a|the) (value|record|invocation)`, `that refusal`, `record is refused`, and `reads? the command line` finds no statement that the record is refused or that registration alone carries the mode.
- Two wording tightenings, not findings:
  - At `templates.test.ts:1044`, "whose vendored `config` proof calls every row" is loose. The proof calls every callable row and fails a row it cannot call (`config.test.ts:399-401`).
  - At `compilers.test.ts:1023-1025`, the older wording remains: "Vitest reads the command line's `--mode` as `import.meta.env.MODE` only inside a project it calls". It states a necessary condition and is true on its letter, but it no longer matches the rewritten source comment it pins (`compilers.ts:815-818`). Aligning the two is optional.

**5. The guide sentence (F2): CONFIRMED.**
- The sentence is at `guides/scaffold.md:2118-2121`.
- "The project factories the root configuration registers receive the invocation record, and each of their projects runs in the invocation's mode" is true. Journey projects are registered by the birth-owned wrapper, not by the root configuration (`guides/scaffold.md:984`, `.claude/rules/workspace.md` § Test project matrix).
- "A journey project is such a project" is true:
  - The wrapper registers `() => appJourney(variant, VARIANTS)` (`src/core/templates.ts:869`), which drops the record.
  - `appJourney` calls `appBrowser()` with no override (`src/core/templates.ts:366`), so `mergeOverride(project, undefined)` returns a project with no `mode`.
- Each pronoun has a clear referent: "their" is the factories, "such a project" is a project whose factory returns no mode, and "its" and "it" are the journey project. "Vitest's own `test` mode" fixes round 1's ambiguous "its".
- Voice note, not a finding: the insertion now separates the existing "An ordinary local run skips that case" (line 2122) from its antecedent, the unreachable-registry case at line 2117. The `because a developer offline…` clause restores the referent.

**6. Failing first, with provenance (claim 4): CONFIRMED on the recorded evidence. The fresh recomputation is referred.**
- The instrument works in this order (`rm-2-provenance.sh.txt`):
  - It copies the fixed files aside (line 7).
  - It writes `git show 392aa1e0:$f` over each site (line 8).
  - It records the base digest with `git show 392aa1e0:$f | sha256sum` and the in-place digest with `sha256sum $f` (lines 10-13).
  - It runs both red commands (lines 20 and 22), restores the files (line 23), and prints each restored digest beside the pre-run copy's digest and a `cmp` verdict (lines 24-29).
- In each log, the base and run lines are equal: templates `38c8d94b…`, vite `9e514015…` (`rm-2-red-config.log.txt:2-6` and `rm-2-red-distribution.log.txt:2-6`).
- Both red runs fail with an AssertionError:
  - The config run fails at `config.test.ts:416` with every `mode` reading `undefined` (`rm-2-red-config.log.txt:17`).
  - The distribution run fails at `distribution.test.ts:800` with the release run reading `code: 0` (`rm-2-red-distribution.log.txt:20`).
- Both restores read `identical` (`rm-2-red-config.log.txt:106-107` and `rm-2-red-distribution.log.txt:65-66`).
- Instrument control: in the same logs, the same `sha256sum` reading returns `8fd40513…` for the fixed bytes against `38c8d94b…` for the base bytes. The equality is therefore not a constant. A mutation of the fixed file would also digest away from the base blob, because the comments differ. This closes the round-1 gap, where the red logs read the same as the mutation logs.
- Precision note: both headers were taken before the config run, so the distribution log's "in place" line predates the config run. Nothing between the two runs writes either site.
- Not executed by this lane: the base lines were produced by the command the claim names, but I did not re-run `git -C /home/user/scaffold-rm show 392aa1e0:<path> | sha256sum`. See the referrals.

**7. Gates: CONFIRMED.**
- `build` (`rm-2-build.log.txt:87`), `format:check` (`rm-2-format-check.log.txt:9`), `lint:check` (`rm-2-lint-check.log.txt:5`), and `check` (`rm-2-check.log.txt:21`) each read `exit=0`.
- The `npm test` red is `src:core` alone: `Tests 5 failed | 421 passed (426)`, and every failure is `Test timed out in 5000ms`, at load `14.96` (`rm-2-test.log.txt:1,24-95`).
- The Orchestrator's re-run reads `Tests 426 passed (426)`, `exit=0`, at load `1.48` (`rm-2-src-core-orchestrator-rerun.log.txt:1,15,19`). That log does not echo its command line. The `426` total ties it to `src:core`.
- The rest of the chain (`src:server`, `src:bin`, `policy`, `config`, `setup`, `guides`) reads `exit=0` project by project (`rm-2-test-rest.log.txt`). That set matches the `test` script at `package.json:74` minus `src:core`.

**8. Scope and law: CONFIRMED.**
- The changed paths (`rm-2-status.txt`) are round 1's owned set (`rm-scaffold-brief.md:61-63`, including `tests/src/core/templates.test.ts` as a test the change made false), plus round 2's grants: `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `src/core/compilers.ts`.
- `host.json` moves only on digests of vendored files this change edits (`guides/scaffold.md`, `tests/config.test.ts`) and on the pre-stale entries round 1 settled.
- `src/core/constants.ts`, `package.json`, and `package-lock.json` are absent from the status.
- The diff adds no `any`, `as`, `!`, or suppression. The only function expressions sit directly in `Object.defineProperty`, `.map`, or `.filter` arguments. Every added helper is exported.
- The added and retitled titles each state what their case proves:
  - `config.test.ts:373`
  - `setupServer.test.ts` around line 1035
  - `setupServer.test.ts:1090`. Here "with its own rewrite" holds under `TestReleaseScenario`'s own definition of the rewrite as the `files` map, which may be empty. F3 records the separate TSDoc sentence that uses the verb.

## Findings outside the claims

**F1. `readVitestReport` carries the `read*` prefix but has the `parse*` contract.**
- Where: `tests/setupServer.ts:920`, with its TSDoc at lines 902-918. Consumers are at `tests/distribution.test.ts:35,766,1166` and `tests/setupServer.test.ts:83,1056,1074,1086`.
- What is wrong: `.claude/rules/names.md` § Standalone helpers fixes `read*` as a helper that "returns it or throws, and never coerces; a coercing helper is `parse*`". § Fixed derivation/construction forms fixes `parse*` as "coercion producing `T | undefined`". This function narrows unknown JSON into `readonly TestReportFile[] | undefined`, returns `undefined` for a text that is off-shape, and projects `assertionResults` into `cases`.
- Repository precedent agrees:
  - The sibling `readManifestVersion(text)` throws (`tests/setupServer.ts:707-713`).
  - The text-to-`T | undefined` readers in the test setup are `parseSkillFrontmatter` and `parseSkillPrompt` (`tests/setupPolicy.ts:729,859`).
- Why it matters: a helper prefix has one meaning across the project. Root `tests/setup*.ts` exports are also fleet-visible names that the `surface` rule compares (`.claude/rules/names.md` § Fleet name ownership).
- What right looks like:
  - Rename the function to `parseVitestReport`.
  - Open its TSDoc with `Parses the test files a Vitest JSON report records.`
  - Update the `@example` and every import and call site listed above.
  - Re-run `npm run test:policy` so the `surface` rule reads the new name.

**F2. The comment at `tests/src/core/templates.test.ts:939` still calls the invocation record an "environment record".**
- Where: `tests/src/core/templates.test.ts:939`, in the comment for `declares every emitted project factory with the override parameter`.
- What is wrong: `AGENTS.md` § Design laws says "One concept, one term. Do not alternate synonyms." Every other owned site calls this value the "invocation record":
  - `src/core/templates.ts:98,101`
  - `vite.config.ts:37,40`
  - `tests/config.test.ts:377`
  - `tests/src/core/templates.test.ts:1040`
  - `tests/src/core/compilers.test.ts:1221`
  - `guides/scaffold.md:2118`

  This round made exactly that substitution in `compilers.test.ts` ("its own environment record" became "its own invocation record" at `rm-2.diff:770-772`) and left the twin in `templates.test.ts`. "Environment" already names the src/app environments and Vitest's runtime environment in this repository, so the stale term points at the wrong concept.
- Secondary, same comment: at lines 942-944, "so a value carrying the pair returns the base in the record's mode" makes the value the actor. `mergeOverride` is what returns (`.claude/rules/writing.md` § Voice and actor).
- What right looks like:
  - At line 939, write "Vitest calls a project row with its own invocation record".
  - At lines 942-944, write "so `mergeOverride`, given a value carrying the pair, returns the base in the record's mode and carries none of its other fields".

**F3. The TSDoc of `buildReleaseScenarios` says every rival rewrites the workspace, and the `timeout` rival rewrites nothing.**
- Where: `tests/setupServer.ts:954-955`: "Each rival rewrites the workspace for its own run".
- What is wrong: the `timeout` rival is `{ label: 'timeout', arguments: release, timeout: 1, files: {} }` (`tests/setupServer.ts`, the last row that `buildReleaseScenarios` returns). The proof at `tests/setupServer.test.ts` around line 1116 pins that empty map. That rival writes nothing, and its distinguishing parameter is its 1 ms timeout. `.claude/rules/documentation.md` § Parity treats a false prose claim about behaviour as a defect of the same kind as a wrong return value.
- What right looks like: "Each rewriting rival writes its `files` for its own run alone, and the caller restores the generated text after it; the `timeout` rival runs the workspace as generated and differs only in its timeout." Optionally align the case title at `tests/setupServer.test.ts:1090` to "…then every rival release run with its rewrite or its timeout".

## Attacked and held
- The placement of host-independent helpers in `tests/setupServer.ts` rather than `tests/setup.ts`. It holds:
  - The brief names that file.
  - Both helpers serve only Node proofs.
  - The file already carries pure text readers for Node proofs (`readManifestVersion` at line 707).
  - `tests/setup.ts` is not vendored, so nothing forced the choice either way.
- The whole-report refusal against the per-case placeholder in `readVitestReport`. It is coherent: the refusal applies to the structure walked (file entries), cases are carried unread, and the case list keeps its length. The `@remarks` states this.
- The Vue SFC case's `expect.objectContaining({ title, status })` (`distribution.test.ts:1181-1186`) reads only the two fields the projection keeps. A report with one malformed file entry now fails with "wrote no test results" instead of proceeding. That is a stricter reading, not a defect.
- The same "in its own run mode, `test`" wording appears at `templates.ts:104`, `vite.config.ts:43`, and `config.test.ts:378`. The appositive `test` settles the referent, and round 1 ruled on those sites.
- The guide's scope: "registers" in `guides/scaffold.md:2118` excludes the journey wrapper, so the "each of their projects" clause does not overclaim.

## Referrals
- **To the objective lane: claim 6, the fresh recomputation.** Run `git -C /home/user/scaffold-rm show 392aa1e0:src/core/templates.ts | sha256sum` and the same command for `vite.config.ts`. Compare the results with `38c8d94b322e60aac9268456274feac6833060f97d0bd99fb19516281d8c5ed9` and `9e51401513063d243ff6223e05e2d1dfe05bd0141a1c4a0949209eae494b7080`. My confirmation rests on the instrument's construction, not on an execution.
- **To the objective lane: the Vue SFC case after the reader move.** `renders a Vue SFC through the generated browser setup project` now reads through the shared reader (`tests/distribution.test.ts:1166-1186`). The report says it was typechecked and linted but never run, because it needs a registry and a browser. Its green state after the move is unevidenced.

VERDICT: FAIL none; outside the claims: F1, F2, F3
