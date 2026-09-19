# Unit S3-2 report — name `buildRefusal` in the statechart reference

## Diff of the owned file

```diff
diff --git a/.agents/skills/orkestrel-prove-journey/references/statechart.md b/.agents/skills/orkestrel-prove-journey/references/statechart.md
index e579ab77..8c56d05c 100644
--- a/.agents/skills/orkestrel-prove-journey/references/statechart.md
+++ b/.agents/skills/orkestrel-prove-journey/references/statechart.md
@@ -10,6 +10,7 @@ import type { StateScenario, StateTransition, StatechartStatus } from '@orkestre
 import {
 	STATECHART_ATTRIBUTES,
 	STATECHART_STATUSES,
+	buildRefusal,
 	executeScenario,
 	executeScenarios,
 	requireValue,
@@ -173,6 +174,8 @@ it('walks the disclosure statechart', async () => {
   carries the original as the `cause`, so a bare assertion message still says which row failed. A
   phase that throws something other than an `Error` is named by its type, and a builder that refuses
   raises `<name>: build refused` with its own refusal as the `cause`.
+  `buildRefusal(name, cause)` from `@orkestrel/test` builds that same error, so an assertion on
+  a refused build compares against what it returns rather than against a spelled string.
 - Never assert the entity's internal state in `assert` where the transition is one a person drives.
   Assert what the interface renders, through `readPerception`, `readValue`, or `readStates`.

@@ -229,7 +232,7 @@ harness.destroy()
   sentence, so a screen reader and a vision model both read the run without visual chrome.
 - Take `execute` as reporting on the whole table. It carries on past a failing row, where
   `executeScenarios` stops at the first, and a builder that refuses fails its own row under the
-  runner's own refusal sentence rather than ending the run.
+  sentence `buildRefusal` builds rather than ending the run.
 - Call `execute` again to re-run the same table from a fresh tally and a cleared rendered state.
 - Call `destroy` in the test's own cleanup. It removes the mounted root and does nothing when the
   root is already gone.
```

## `git status --short`

```text
 M .agents/skills/orkestrel-prove-journey/references/statechart.md
?? .orkestrel/campaign/
```

`.orkestrel/campaign/` is the Orchestrator's untracked folder, unowned by this unit.

## Acceptance criteria

- **S3-2-C1.** `grep -c "buildRefusal" .agents/skills/orkestrel-prove-journey/references/statechart.md`
  reports `3`.
- **S3-2-C2.** `npm run format:check` exits 0: "All matched files use the correct format." over 227
  files.
- **S3-2-C3.** `npm run test:policy` exits 0: 1 file, 110 tests passed, no violation. Proof that the
  sweep reads the fence: copied the file to a scratch copy under the git-ignored probe directory (deleted), changed the
  inserted line to `buildRefusal2,`, and ran
  `inspectSkillImports(process.cwd(), path, content)` over the copy from a probe test collected by
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe
  .orkestrel/campaign/s3-2-instruments/skillImportsFlagsUnexportedBinding.test.ts.txt`. The probe passed, asserting exactly one
  violation whose message contains `buildRefusal2`. Deleted the planted copy
  (a scratch copy under the git-ignored probe directory (deleted)) and retired the probe test to
  `.orkestrel/campaign/s3-2-instruments/skillImportsFlagsUnexportedBinding.test.ts.txt`.

## Observation (not a criterion)

`npm run test:config` reddens on "keeps the committed host inventory aligned with the vendored
checkout bytes," naming this owned file as stale, because `host.json` has not been rebuilt after
the vendored edit. This matches the standing condition the brief names and requires no action from
this unit.

## Deviations

None. All measurements matched the brief.
